/**
 * In-browser PDF accessibility check.
 *
 * Runs entirely on the visitor's device with pdf.js in a Web Worker. The file
 * is never uploaded, stored or sent anywhere. These are automated, structural
 * checks only: they can show that something is missing, never that a document
 * is accessible. Anything that needs judgement is reported as "needs a person".
 */

export const MAX_BYTES = 25 * 1024 * 1024;
export const MAX_PAGES = 400;

export type Status = "pass" | "fail" | "warn" | "person" | "na";

export type Finding = {
  id: string;
  title: string;
  status: Status;
  /** What we found, in plain words. */
  detail: string;
  /** Why it matters to someone using assistive technology. */
  why: string;
  /** What to do about it. Omitted when nothing is needed. */
  fix?: string;
};

export type CheckResult = {
  pages: number;
  pagesChecked: number;
  bytes: number;
  producer: string | null;
  findings: Finding[];
  counts: { fail: number; warn: number; person: number; pass: number };
};

export type CheckErrorCode = "too-big" | "not-pdf" | "password" | "damaged" | "empty" | "failed" | "cancelled" | "timeout";

/** A check that takes longer than this is stopped, so a hostile file cannot hold the tab. */
export const TIME_LIMIT_MS = 90_000;

export class CheckError extends Error {
  constructor(public code: CheckErrorCode) {
    super(code);
  }
}

type StructNode = { role?: string; alt?: string; children?: StructNode[] };

const HEADING = /^H[1-6]?$/;

function walk(node: StructNode | null | undefined, visit: (n: StructNode) => void) {
  if (!node) return;
  visit(node);
  for (const c of node.children ?? []) if (c && typeof c === "object" && "role" in c) walk(c as StructNode, visit);
}

/** Cheap signature check before handing bytes to the parser. */
export function looksLikePdf(head: Uint8Array) {
  const s = new TextDecoder("latin1").decode(head.subarray(0, 1024));
  return s.includes("%PDF-");
}

const plural = (n: number, one: string, many = `${one}s`) => `${n.toLocaleString("en-US")} ${n === 1 ? one : many}`;

export async function checkPdf(data: ArrayBuffer, onProgress?: (done: number, total: number) => void, signal?: AbortSignal): Promise<CheckResult> {
  if (data.byteLength === 0) throw new CheckError("empty");
  if (data.byteLength > MAX_BYTES) throw new CheckError("too-big");
  if (!looksLikePdf(new Uint8Array(data))) throw new CheckError("not-pdf");

  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

  const task = pdfjs.getDocument({
    data: new Uint8Array(data.slice(0)),
    cMapUrl: "/pdfjs/cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "/pdfjs/standard_fonts/",
    enableXfa: false,
    stopAtErrors: false,
    verbosity: 0,
  });

  // Destroying the loading task terminates the worker, which stops any parsing in progress.
  let stopped: CheckErrorCode | null = null;
  const stop = (code: CheckErrorCode) => {
    stopped = code;
    void task.destroy();
  };
  const timer = setTimeout(() => stop("timeout"), TIME_LIMIT_MS);
  const onAbort = () => stop("cancelled");
  signal?.addEventListener("abort", onAbort, { once: true });
  const guard = () => {
    if (stopped) throw new CheckError(stopped);
  };

  let doc;
  try {
    doc = await task.promise;
  } catch (e) {
    const name = (e as { name?: string })?.name;
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
    guard();
    if (name === "PasswordException") throw new CheckError("password");
    if (name === "InvalidPDFException") throw new CheckError("damaged");
    throw new CheckError("failed");
  }

  try {
    const pages = doc.numPages;
    const pagesChecked = Math.min(pages, MAX_PAGES);
    const [meta, markInfo, outline, prefs] = await Promise.all([
      doc.getMetadata().catch(() => null),
      doc.getMarkInfo().catch(() => null),
      doc.getOutline().catch(() => null),
      doc.getViewerPreferences().catch(() => null),
    ]);
    const info = (meta?.info ?? {}) as Record<string, unknown>;
    const xmpTitle = meta?.metadata?.get("dc:title") ?? null;
    const title = String(xmpTitle || info.Title || "").trim();
    const producer = String(info.Producer || info.Creator || "").trim() || null;
    const displayTitle = prefs?.get?.("DisplayDocTitle") === true;

    let lang: string | null = null;
    const markedFlag = !!markInfo?.Marked;
    let structPages = 0;
    let figures = 0;
    let figuresNoAlt = 0;
    let headings = 0;
    let tables = 0;
    let tableHeaders = 0;
    let fields = 0;
    let fieldsNoName = 0;
    const imageOnlyPages: number[] = [];

    for (let p = 1; p <= pagesChecked; p++) {
      guard();
      const page = await doc.getPage(p);
      const [text, tree, annots] = await Promise.all([
        page.getTextContent().catch(() => null),
        page.getStructTree().catch(() => null),
        page.getAnnotations().catch(() => [] as unknown[]),
      ]);
      if (p === 1) lang = text?.lang ?? null;
      const chars = (text?.items ?? []).reduce((n, it) => n + ("str" in it ? it.str.trim().length : 0), 0);
      if (chars < 3) imageOnlyPages.push(p);

      const root = tree as StructNode | null;
      if (root && (root.children?.length ?? 0) > 0) {
        structPages++;
        walk(root, (n) => {
          const r = n.role ?? "";
          if (r === "Figure") {
            figures++;
            if (!n.alt || !n.alt.trim()) figuresNoAlt++;
          } else if (HEADING.test(r)) headings++;
          else if (r === "Table") tables++;
          else if (r === "TH") tableHeaders++;
        });
      }

      for (const a of annots as Array<Record<string, unknown>>) {
        if (a.subtype !== "Widget" || a.hidden) continue;
        const ft = a.fieldType as string | undefined;
        if (ft === "Btn" && a.pushButton) continue;
        fields++;
        if (!String(a.alternativeText ?? "").trim()) fieldsNoName++;
      }
      page.cleanup();
      onProgress?.(p, pagesChecked);
    }

    // Only a real structure tree counts. A Marked flag with no tree is a false promise.
    const tagged = structPages > 0;
    const findings: Finding[] = [];
    const scanned = imageOnlyPages.length;

    findings.push(
      tagged
        ? {
            id: "tags",
            title: "Tags",
            status: "pass",
            detail: `The file has tags${structPages < pagesChecked ? ` on ${plural(structPages, "page")} of ${pagesChecked}` : " on every page we checked"}.`,
            why: "Tags tell a screen reader what each part of the page is: a heading, a paragraph, a table, a form field.",
            fix: structPages < pagesChecked ? "Pages without tags will be read as one block of text, or skipped. Tag those pages." : undefined,
          }
        : {
            id: "tags",
            title: "Tags",
            status: "fail",
            detail: markedFlag ? "The file says it is tagged, but we found no tag structure on any page." : "This PDF has no tags.",
            why: "Without tags, a screen reader has to guess what the page contains and in what order. Headings, tables and form labels are lost.",
            fix: "The document needs to be tagged. Acrobat's autotag is a starting point, but its result needs checking by a person.",
          },
    );
    if (tagged && structPages < pagesChecked) findings[0]!.status = "warn";

    findings.push(
      scanned === 0
        ? {
            id: "text",
            title: "Real text",
            status: "pass",
            detail: "Every page we checked has selectable text.",
            why: "Text that exists as characters can be read aloud, searched, and enlarged without blurring.",
          }
        : {
            id: "text",
            title: "Real text",
            status: "fail",
            detail:
              scanned === pagesChecked
                ? "No page has readable text. This looks like a scan or a picture of a document."
                : `${plural(scanned, "page")} ${scanned === 1 ? "has" : "have"} no readable text (${imageOnlyPages.slice(0, 8).join(", ")}${scanned > 8 ? ", …" : ""}). They may be scans.`,
            why: "A screen reader cannot read a picture of words. To it, a scanned page is blank.",
            fix: "Run text recognition (OCR), then have a person correct the recognised text and tag it.",
          },
    );

    findings.push(
      title
        ? {
            id: "title",
            title: "Document title",
            status: displayTitle ? "pass" : "warn",
            detail: displayTitle ? `Title: "${title.slice(0, 120)}".` : `It has a title ("${title.slice(0, 120)}"), but the file is set to show its file name instead.`,
            why: "The title is the first thing announced when the file opens. A file name like scan_0042.pdf tells nobody what they have opened.",
            fix: displayTitle ? undefined : "Turn on Initial View → Show: Document Title in the PDF's properties.",
          }
        : {
            id: "title",
            title: "Document title",
            status: "fail",
            detail: "The file has no title.",
            why: "Someone using a screen reader hears the file name instead, which rarely says what the document is.",
            fix: "Add a descriptive title in the document properties and set it to display.",
          },
    );

    findings.push(
      lang
        ? {
            id: "lang",
            title: "Language",
            status: "pass",
            detail: `The document language is set (${lang}).`,
            why: "The language setting tells a screen reader which pronunciation to use.",
          }
        : {
            id: "lang",
            title: "Language",
            status: "fail",
            detail: "No document language is set.",
            why: "Without it, a screen reader may read English text with the wrong pronunciation rules, or the other way round.",
            fix: "Set the document language in the PDF's properties (for example, English).",
          },
    );

    if (fields > 0) {
      findings.push(
        fieldsNoName === 0
          ? {
              id: "fields",
              title: "Form fields",
              status: "person",
              detail: `All ${plural(fields, "form field")} have a spoken name.`,
              why: "Each field needs a name that says what to type, like “Applicant phone number”.",
              fix: "A person should confirm each name is correct and that the tab order follows the form.",
            }
          : {
              id: "fields",
              title: "Form fields",
              status: "fail",
              detail: `${plural(fieldsNoName, "form field")} of ${fields} ${fieldsNoName === 1 ? "has" : "have"} no spoken name.`,
              why: "A screen reader announces an unnamed field as just “edit text” or “check box”. The person filling it in cannot tell which box is which.",
              fix: "Give every field a tooltip (its accessible name) that matches its visible label, then check the tab order.",
            },
      );
    } else {
      findings.push({
        id: "fields",
        title: "Form fields",
        status: "na",
        detail: "No fillable form fields found.",
        why: "If this is a form people print and fill by hand, consider whether it should be fillable or offered as a web form.",
      });
    }

    if (tagged) {
      findings.push(
        figures === 0
          ? {
              id: "alt",
              title: "Image descriptions",
              status: "na",
              detail: "No images are tagged as figures.",
              why: "If the pages do contain meaningful images or charts, they are not tagged, and a screen reader will skip them.",
            }
          : figuresNoAlt === 0
            ? {
                id: "alt",
                title: "Image descriptions",
                status: "person",
                detail: `All ${plural(figures, "tagged image")} have a description.`,
                why: "Descriptions only help when they say what the image shows. Software cannot judge that.",
                fix: "A person should read each description against its image.",
              }
            : {
                id: "alt",
                title: "Image descriptions",
                status: "fail",
                detail: `${plural(figuresNoAlt, "tagged image")} of ${figures} ${figuresNoAlt === 1 ? "has" : "have"} no description.`,
                why: "Images without a description are skipped or announced as “graphic”, so maps, charts and photos carry no information.",
                fix: "Write a short description for each meaningful image. Mark purely decorative ones as artifacts.",
              },
      );
      findings.push({
        id: "headings",
        title: "Headings",
        status: headings > 0 ? "pass" : pagesChecked > 2 ? "warn" : "na",
        detail: headings > 0 ? `${plural(headings, "heading")} found.` : "No headings are tagged.",
        why: "Screen reader users jump between headings to find the section they need, the way sighted readers skim.",
        fix: headings > 0 ? undefined : pagesChecked > 2 ? "Tag section titles as headings, in order." : undefined,
      });
      if (tables > 0) {
        findings.push({
          id: "tables",
          title: "Tables",
          status: tableHeaders > 0 ? "person" : "fail",
          detail:
            tableHeaders > 0
              ? `${plural(tables, "table")} found, with header cells.`
              : `${plural(tables, "table")} found, with no header cells.`,
          why: "Header cells let a screen reader say which column and row each number belongs to. Without them, a fee table is a list of numbers.",
          fix:
            tableHeaders > 0
              ? "A person should check the headers point to the right cells."
              : "Mark the header row and column. Complex tables often need a person to restructure them.",
        });
      }
    }

    if (pages >= 20) {
      const n = outline?.length ?? 0;
      findings.push({
        id: "bookmarks",
        title: "Bookmarks",
        status: n > 0 ? "pass" : "warn",
        detail: n > 0 ? `The document has ${plural(n, "top-level bookmark")}.` : `The document is ${pages} pages long and has no bookmarks.`,
        why: "In long documents, bookmarks are how people move between sections without paging through everything.",
        fix: n > 0 ? undefined : "Add bookmarks for each main section, usually generated from the headings.",
      });
    }

    findings.push({
      id: "order",
      title: "Reading order",
      status: tagged ? "person" : "fail",
      detail: tagged ? "Software cannot confirm the order the page is read in." : "Without tags there is no defined reading order.",
      why: "A form read out of order makes no sense: a footer first, then fields, then their labels.",
      fix: "A person needs to listen to it, or step through the tags, and compare against the page.",
    });

    const counts = { fail: 0, warn: 0, person: 0, pass: 0 };
    for (const f of findings) if (f.status !== "na") counts[f.status]++;

    return { pages, pagesChecked, bytes: data.byteLength, producer, findings, counts };
  } catch (e) {
    guard();
    throw e instanceof CheckError ? e : new CheckError("failed");
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
    void task.destroy();
  }
}
