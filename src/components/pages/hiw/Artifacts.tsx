import type { CSSProperties } from "react";
import "@/app/pages-extra.css";
import { Check, n } from "./StageParts";

/* ---------------------------------------------------------------- 1. Discover */

const crawl = [
  { dir: "/files/permits/", file: "building-permit-application.pdf", from: "/permits", text: "Apply", chips: [["Form", ""], ["Untagged", "broken"]] },
  { dir: "/files/council/", file: "agenda-packet-0312.pdf", from: "/council/agendas", text: "March 12 packet", chips: [["Tables", ""], ["Tagged", ""]] },
  { dir: "/files/utilities/", file: "utility-assistance-form.pdf", from: "/utilities", text: "Get help paying", chips: [["Scan, no text", "broken"]] },
  { dir: "/files/parks/", file: "pool-hours-flyer.pdf", from: "/parks", text: "Pool hours", chips: [["2 pages", ""], ["Mostly text", ""]] },
  { dir: "/files/finance/", file: "fee-schedule-2019.pdf", from: "/finance (old link)", text: "Fees", chips: [["Duplicate of 2025", ""]] },
  { dir: "/files/minutes/", file: "2016-03-minutes.pdf", from: "", text: "", chips: [["Tagged", ""]] },
] as const;

/** A crawl log: every PDF found, with the page and words that link to it. */
export function CrawlLog() {
  return (
    <figure>
      <div className="hx-doc overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b px-4 py-3 hairline sm:px-6">
          <p className="mono text-[0.8rem] text-ink">crawl of www.aldercreek.example</p>
          <p className="mono text-[0.75rem] text-muted">robots.txt respected · 1 request per second · no logins</p>
        </div>
        <ol className="rise-group" data-reveal aria-label="Sample crawl log, six rows">
          {crawl.map((r, i) => (
            <li key={r.file} className="rise hx-crawl-row" style={n(i)}>
              <p className="mono break-all text-[0.82rem] leading-snug text-muted">
                {r.dir}
                <span className="font-[500] text-ink">{r.file}</span>
              </p>
              {r.from ? (
                <p className="text-[0.9rem] text-ink-soft">
                  <span className="text-muted">Linked from </span>
                  <span className="mono text-[0.82rem]">{r.from}</span>
                  <span className="text-muted">, as </span>“{r.text}”
                </p>
              ) : (
                <p className="text-[0.9rem] text-muted">No page links to it</p>
              )}
              <ul className="flex flex-wrap gap-1.5 md:justify-end">
                {r.chips.map(([c, tone]) => (
                  <li key={c} className="hx-chip" data-tone={tone}>
                    {c}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mono border-t px-4 py-3 text-[0.75rem] text-muted hairline sm:px-6">6 of 1,284 rows shown</p>
      </div>
      <figcaption className="mt-4 max-w-[60ch] text-[0.9rem] text-muted">
        Sample. Fictional city. Each PDF is logged with the page that links to it, the words used for the link, and what the file is: form, scan, tables, tagged or not.
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------- 2. Prioritize */

const piles = [
  {
    name: "Must fix",
    count: "212",
    why: "People use these to apply for, get or take part in a service.",
    files: ["building-permit-application.pdf", "utility-assistance-form.pdf", "agenda-packet-0312.pdf"],
    dot: "bg-warm",
    edges: 5,
    tilt: "-0.5deg",
  },
  {
    name: "Archive candidate",
    count: "703",
    why: "Old reference material. Your team confirms it meets the archive conditions.",
    files: ["2016-03-minutes.pdf", "annual-report-2014.pdf", "budget-2015.pdf"],
    dot: "bg-muted",
    edges: 9,
    tilt: "0.4deg",
  },
  {
    name: "Convert to web page",
    count: "96",
    why: "Short and mostly text. Residents would rather read it on a phone.",
    files: ["pool-hours-flyer.pdf", "recycling-schedule.pdf", "park-rules.pdf"],
    dot: "bg-signal",
    edges: 3,
    tilt: "-0.3deg",
  },
] as const;

/** Edges of a stack of sheets: a white sheet then a hairline, repeated. */
const edgeShadow = (k: number) =>
  Array.from({ length: k }, (_, j) => `0 ${(j + 1) * 3}px 0 -1px #fff, 0 ${(j + 1) * 3 + 1}px 0 -1px rgb(23 21 15 / 0.16)`).join(", ");

/** Three paper piles: where each kind of file lands after the recommendation. */
export function SortPiles() {
  return (
    <figure>
      <ul className="rise-group grid gap-x-8 gap-y-10 md:grid-cols-3" data-reveal aria-label="Sample sort of 1,284 files into groups">
        {piles.map((p, i) => (
          <li key={p.name} className="rise hx-pile" style={{ ...n(i * 3), "--edges": p.edges, "--tilt": p.tilt, "--edge-shadow": edgeShadow(p.edges) } as CSSProperties}>
            <div className="top hx-doc p-5">
              <p className="flex items-center gap-2 text-[0.85rem] font-[600]">
                <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${p.dot}`} />
                {p.name}
              </p>
              <p className="numeral mt-3 text-[length:var(--step-3)] leading-none">{p.count}</p>
              <p className="mt-1 text-[0.8rem] text-muted">files in this sample</p>
              <ul className="mono mt-4 space-y-1.5 border-t pt-3 text-[0.78rem] text-ink-soft hairline">
                {p.files.map((f) => (
                  <li key={f} className="break-all">
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.9rem] text-ink-soft">{p.why}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-9 max-w-[62ch] text-[0.95rem] text-ink-soft">
        A fourth group, Delete candidate (273 files here), holds duplicates and expired notices, such as <span className="mono text-[0.85rem]">fee-schedule-2019.pdf</span>. Nothing is removed unless your team agrees.
      </p>
      <figcaption className="mt-3 max-w-[60ch] text-[0.9rem] text-muted">Sample. Fictional city. Counts are made up to show the shape of a result.</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ 3. Repair */

type Node = { tag: string; text: string; note?: string; state?: "broken" | "fixed" | "person"; kids?: Node[] };

const before: Node[] = [
  { tag: "P", text: "Building Permit Application", note: "Title is text, not a heading", state: "broken" },
  { tag: "Figure", text: "City seal", note: "No alternative text", state: "broken" },
  {
    tag: "Form",
    text: "8 fields",
    kids: [
      { tag: "Field", text: "Text box", note: "No accessible name", state: "broken" },
      { tag: "Field", text: "Text box", note: "No accessible name", state: "broken" },
    ],
  },
  { tag: "P", text: "Page 1 of 2", note: "Read aloud as content", state: "broken" },
  { tag: "Table", text: "Fee table", note: "Sent to a person", state: "person" },
];

const after: Node[] = [
  { tag: "H1", text: "Building Permit Application", note: "Role changed", state: "fixed" },
  { tag: "Figure", text: "City seal", note: "Alt text added", state: "fixed" },
  {
    tag: "Form",
    text: "8 fields",
    kids: [
      { tag: "Field", text: "Applicant name", note: "Named", state: "fixed" },
      { tag: "Field", text: "Parcel number", note: "Named", state: "fixed" },
    ],
  },
  { tag: "Artifact", text: "Page 1 of 2", note: "Marked as decoration", state: "fixed" },
  { tag: "Table", text: "Fee table", note: "Person fixes headers", state: "person" },
];

function Tree({ nodes, start = 0 }: { nodes: Node[]; start?: number }) {
  let k = start;
  const walk = (list: Node[]) => (
    <ul>
      {list.map((nd, idx) => {
        const i = k++;
        return (
          <li key={`${nd.tag}-${idx}`} className="rise" style={n(i)}>
            <div className="hx-node" data-state={nd.state}>
              <span className="t">{nd.tag}</span>
              <span>{nd.text}</span>
              {nd.note ? (
                <span className="hx-chip ml-auto" data-tone={nd.state === "broken" ? "broken" : nd.state === "fixed" ? "fixed" : ""}>
                  {nd.note}
                </span>
              ) : null}
            </div>
            {nd.kids ? walk(nd.kids) : null}
          </li>
        );
      })}
    </ul>
  );
  return <div className="hx-tree">{walk(nodes)}</div>;
}

/** The same file's tag tree before and after repair. The words never change. */
export function TagTreePair() {
  return (
    <figure>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="hx-doc p-4 sm:p-6">
          <p className="flex items-center justify-between gap-3 text-[0.85rem] font-[600]">
            Before
            <span className="text-[0.8rem] font-[400] text-muted">as the file arrived</span>
          </p>
          <div className="mt-4">
            <p className="hx-node t mono !mb-0 !pb-1 !pt-0 text-[0.8rem] font-[500]">Document</p>
            <Tree nodes={before} />
          </div>
        </div>
        <div className="hx-doc rise-group p-4 sm:p-6" data-reveal>
          <p className="flex items-center justify-between gap-3 text-[0.85rem] font-[600]">
            After
            <span className="text-[0.8rem] font-[400] text-muted">structure repaired</span>
          </p>
          <div className="mt-4">
            <p className="hx-node t mono !mb-0 !pb-1 !pt-0 text-[0.8rem] font-[500]">Document</p>
            <Tree nodes={after} start={1} />
          </div>
        </div>
      </div>
      <figcaption className="mt-4 max-w-[56ch] text-[0.9rem] text-muted">
        Sample. Fictional city. Software changes the title&rsquo;s role, adds alt text, names the form fields and marks the page number as decoration. The table is handed to a
        person. The visible text of the page is identical before and after.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ 4. Verify */

const auto = [
  ["veraPDF, PDF/UA-1 profile", "Technical structure of the file", "Passed"],
  ["Semantic check, page by page", "Headings, table headers, reading order against the visible page", "Passed"],
  ["Both checks run again", "After the last change to the file", "Passed"],
] as const;
const human = [
  ["Every form", "Each field name read against the page", "Reviewed"],
  ["Anything either check flagged", "A person looks at it and decides", "Reviewed"],
  ["Any override", "A written reason is kept with the file", "None needed"],
] as const;

function Col({ title, mark, who, rows, offset }: { title: string; mark: string; who: "software" | "person"; rows: readonly (readonly [string, string, string])[]; offset: number }) {
  return (
    <section aria-label={title} className="hx-doc rise-group p-4 sm:p-6" data-reveal>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="title text-[1.15rem]">{title}</h3>
        <span className="hx-mark" data-who={who}>
          {mark}
        </span>
      </div>
      <ul className="mt-4 border-t hairline">
        {rows.map((r, i) => (
          <li key={r[0]} className="rise grid grid-cols-[1.25rem_1fr_auto] items-start gap-x-3 border-b py-3.5 hairline" style={n(i + offset)}>
            <Check n={i + offset} />
            <div>
              <p className="font-[560]">{r[0]}</p>
              <p className="mt-0.5 text-[0.9rem] text-ink-soft">{r[1]}</p>
            </div>
            <p className="mono text-[0.78rem] text-signal-deep">{r[2]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Two columns: what software checks, what a person reviews. */
export function CheckColumns() {
  return (
    <figure>
      <div className="grid gap-5 lg:grid-cols-2">
        <Col title="Automated checks" mark="Automatic" who="software" rows={auto} offset={0} />
        <Col title="Human review" mark="Person" who="person" rows={human} offset={0} />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-5 hairline">
        <span className="stamp">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
            <path d="M5 10.5l3.2 3.2L15 6.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Checked
        </span>
        <p className="max-w-[60ch] text-[0.95rem] text-ink-soft">A file moves on only when both columns are clear, or when a person has overridden a result and written down why.</p>
      </div>
      <figcaption className="mt-3 max-w-[60ch] text-[0.9rem] text-muted">Sample result for one file. Fictional city.</figcaption>
    </figure>
  );
}

/* ----------------------------------------------------------------- 5. Deliver */

/** A delivered file beside the report that travels with it. */
export function DeliveryPair() {
  return (
    <figure>
      <div className="grid items-start gap-6 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:gap-0">
        {/* The file */}
        <div className="relative sm:mt-10 sm:-mr-6">
          <div className="hx-doc p-4 sm:p-5">
            <p className="break-all text-[0.8rem] text-muted">building-permit-application.pdf</p>
            <div aria-hidden="true" className="mt-4 space-y-2.5">
              <div className="h-3 w-3/4 rounded-sm bg-ink/80" />
              <div className="h-2 w-1/2 rounded-sm bg-ink/15" />
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[0, 1, 2, 3].map((k) => (
                  <div key={k} className="h-6 rounded-[3px] border border-signal/70" />
                ))}
              </div>
              <div className="space-y-1.5 pt-2">
                <div className="h-1.5 w-full rounded-sm bg-ink/12" />
                <div className="h-1.5 w-11/12 rounded-sm bg-ink/12" />
                <div className="h-1.5 w-4/5 rounded-sm bg-ink/12" />
              </div>
            </div>
            <p className="mt-5 text-[0.85rem] font-[600]">The repaired file</p>
            <p className="mt-0.5 text-[0.85rem] text-muted">Ready for your web team to post.</p>
          </div>
        </div>
        {/* The report */}
        <div className="relative">
          <div aria-hidden="true" className="au-under !hidden sm:!block" />
          <div className="hx-doc relative z-10 p-4 sm:py-6 sm:pl-10 sm:pr-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="title text-[1.05rem]">Report for this file</h3>
              <span className="stamp">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
                  <path d="M5 10.5l3.2 3.2L15 6.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Checked
              </span>
            </div>
            <dl className="mt-4 border-t text-[0.9rem] hairline">
              {[
                ["Checks run", "veraPDF (PDF/UA-1), semantic check, human review of the form"],
                ["Results", "Both checks passed after the last change"],
                ["Changes made", "Title role, 1 alt text, 8 field names, page number"],
                ["Made by", "Software, 1 change reviewed by a person"],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-x-4 border-b py-2.5 hairline sm:grid-cols-[6.5rem_1fr]">
                  <dt className="font-[600] text-muted">{k}</dt>
                  <dd className="text-ink-soft">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[0.8rem] text-muted">Not a legal certification of compliance.</p>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 max-w-[60ch] text-[0.9rem] text-muted">Sample. Fictional city. One report accompanies each delivered file, and you keep both on record.</figcaption>
    </figure>
  );
}
