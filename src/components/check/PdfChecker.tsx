"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback, useId, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { DUR, EASE_OUT, STAGGER, tUi, tUiExit } from "@/lib/motion";
import { type CheckErrorCode, type CheckResult, type Finding, type Status, MAX_BYTES, MAX_PAGES } from "@/lib/pdfcheck";

const SAMPLES = [
  { file: "permit-untagged.pdf", label: "Permit form, untagged", note: "Printed to PDF the usual way" },
  { file: "notice-scanned.pdf", label: "Water notice, scanned", note: "A picture of a page" },
  { file: "permit-tagged.pdf", label: "Permit form, tagged", note: "Exported with tags" },
] as const;

const STATUS: Record<Status, { label: string; cls: string }> = {
  fail: { label: "Problem", cls: "st-fail" },
  warn: { label: "Worth fixing", cls: "st-warn" },
  person: { label: "A person must check", cls: "st-person" },
  pass: { label: "Looks fine", cls: "st-pass" },
  na: { label: "Not found", cls: "st-na" },
};

const ERRORS: Record<CheckErrorCode, string> = {
  "too-big": `That file is over ${MAX_BYTES / 1024 / 1024} MB. Try a smaller PDF, or send it to us and we will look at it.`,
  "not-pdf": "That file is not a PDF. This check only reads PDF files.",
  password: "That PDF is password protected, so we cannot open it. Remove the password and try again.",
  damaged: "That PDF looks damaged. Your PDF reader may still open it, but we could not read its structure.",
  empty: "That file is empty.",
  failed: "Something went wrong while reading that PDF. Please try again, or try a different file.",
};

type State =
  | { k: "idle" }
  | { k: "working"; name: string; done: number; total: number }
  | { k: "done"; name: string; sample: boolean; result: CheckResult }
  | { k: "error"; message: string };

function summary(r: CheckResult) {
  const { fail, warn, person } = r.counts;
  const bits: string[] = [];
  if (fail) bits.push(`${fail} ${fail === 1 ? "problem" : "problems"}`);
  if (warn) bits.push(`${warn} ${warn === 1 ? "thing" : "things"} worth fixing`);
  const lead = bits.length ? `We found ${bits.join(" and ")}.` : "The automated checks found no problems.";
  const tail = person ? ` ${person} ${person === 1 ? "item needs" : "items need"} a person to check.` : "";
  return lead + tail;
}

export function PdfChecker() {
  const reduced = useReducedMotion();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const [state, setState] = useState<State>({ k: "idle" });
  const [over, setOver] = useState(false);

  const run = useCallback(async (name: string, load: () => Promise<ArrayBuffer>, sample: boolean) => {
    setState({ k: "working", name, done: 0, total: 0 });
    try {
      const [{ checkPdf }, data] = await Promise.all([import("@/lib/pdfcheck"), load()]);
      const result = await checkPdf(data, (done, total) => setState({ k: "working", name, done, total }));
      setState({ k: "done", name, sample, result });
      // Count that a check ran. Never the file name, size or findings.
      track("pdf_check_run", { source: sample ? "sample" : "own-file" });
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch (e) {
      const code = ((e as { code?: CheckErrorCode })?.code ?? "failed") as CheckErrorCode;
      setState({ k: "error", message: ERRORS[code] ?? ERRORS.failed });
    }
  }, []);

  const onFile = (f: File | undefined | null) => {
    if (!f) return;
    if (f.size > MAX_BYTES) return setState({ k: "error", message: ERRORS["too-big"] });
    void run(f.name, () => f.arrayBuffer(), false);
  };

  const onSample = (file: string, label: string) =>
    void run(
      label,
      async () => {
        const res = await fetch(`/samples/${file}`);
        if (!res.ok) throw new Error("sample");
        return res.arrayBuffer();
      },
      true,
    );

  const busy = state.k === "working";
  const enter = reduced ? { opacity: 0 } : { opacity: 0, y: 8 };

  return (
    <div className="grid gap-10">
      <div
        className={`check-drop ${over ? "is-over" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          if (!busy) onFile(e.dataTransfer.files?.[0]);
        }}
      >
        <svg aria-hidden="true" viewBox="0 0 40 48" className="h-12 w-10 text-signal">
          <path d="M4 3h22l10 10v32H4z" fill="var(--color-sheet)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M26 3v10h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M11 24h18M11 30h18M11 36h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".55" />
        </svg>
        <div className="grid gap-1 text-center">
          <p className="text-[1.15rem] font-[600] text-ink">Drop a PDF here, or choose one</p>
          <p className="text-[0.95rem] text-muted">
            Up to {MAX_BYTES / 1024 / 1024} MB. We check the first {MAX_PAGES} pages.
          </p>
        </div>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          disabled={busy}
          onChange={(e) => {
            onFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        <label htmlFor={inputId} className={`btn ${busy ? "pointer-events-none opacity-60" : ""}`}>
          Choose a PDF
        </label>
        <p className="check-private">
          <span aria-hidden="true" data-icon="lock" />
          Your file stays on this device. It is read by your browser and never uploaded.
        </p>
      </div>

      <div>
        <h2 className="text-[0.95rem] font-[600] text-muted">No PDF to hand? Try one of ours.</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {SAMPLES.map((s) => (
            <li key={s.file}>
              <button type="button" className="check-sample press" disabled={busy} onClick={() => onSample(s.file, s.label)}>
                <span className="block font-[600] text-ink">{s.label}</span>
                <span className="block text-[0.88rem] text-muted">{s.note}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div aria-live="polite" className="min-h-[1px]">
        <AnimatePresence mode="popLayout" initial={false}>
          {state.k === "working" ? (
            <m.div key="working" initial={enter} animate={{ opacity: 1, y: 0, transition: tUi }} exit={{ opacity: 0, transition: tUiExit }} className="check-working">
              <p className="font-[600] text-ink">
                Checking {state.name}
                {state.total ? `: page ${state.done} of ${state.total}` : "…"}
              </p>
              <div className="check-bar" role="progressbar" aria-label="Check progress" aria-valuemin={0} aria-valuemax={state.total || 1} aria-valuenow={state.done}>
                <span style={{ transform: `scaleX(${state.total ? state.done / state.total : 0.04})` }} />
              </div>
            </m.div>
          ) : null}

          {state.k === "error" ? (
            <m.div key="error" role="alert" initial={enter} animate={{ opacity: 1, y: 0, transition: tUi }} exit={{ opacity: 0, transition: tUiExit }} className="check-error">
              <p>{state.message}</p>
            </m.div>
          ) : null}

          {state.k === "done" ? (
            <m.section key={`done-${state.name}`} aria-labelledby="check-result" initial={enter} animate={{ opacity: 1, y: 0, transition: tUi }} exit={{ opacity: 0, transition: tUiExit }} className="grid gap-8">
              <header className="grid gap-3 border-t pt-8 hairline">
                <p className="text-[0.95rem] text-muted">
                  {state.sample ? "Sample" : "Your file"}: {state.name} · {state.result.pages.toLocaleString("en-US")} {state.result.pages === 1 ? "page" : "pages"}
                  {state.result.pagesChecked < state.result.pages ? `, first ${state.result.pagesChecked} checked` : ""}
                </p>
                <h2 id="check-result" ref={resultRef} tabIndex={-1} className="title max-w-[30ch] text-ink outline-none">
                  {summary(state.result)}
                </h2>
                <p className="max-w-[60ch] text-ink-soft">
                  These are automated checks of the file&apos;s structure. They can show that something is missing. They cannot show that the PDF works for
                  everyone, so this is not a compliance result.
                </p>
              </header>

              <ol className="check-list">
                {state.result.findings.map((f, i) => (
                  <FindingRow key={f.id} f={f} i={i} reduced={!!reduced} />
                ))}
              </ol>

              <aside className="check-limits" aria-labelledby="limits-title">
                <h3 id="limits-title" className="font-[600] text-ink">
                  What this check cannot tell you
                </h3>
                <ul>
                  <li>Whether the reading order matches the page.</li>
                  <li>Whether image descriptions and field names are accurate.</li>
                  <li>Whether table headers point to the right cells.</li>
                  <li>Colour contrast, and whether colour alone carries meaning.</li>
                  <li>Whether the document makes sense when heard, start to finish.</li>
                </ul>
                <p>
                  Those need a person, ideally with a screen reader. It is the part of the work most tools leave to you, and the part{" "}
                  <Link href="/verify">our review covers</Link>.
                </p>
              </aside>

              <div className="grid gap-3 md:grid-cols-2">
                <Link href="/contact?topic=repair" className="check-next">
                  <span className="block font-[600] text-ink">Need this document fixed?</span>
                  <span className="block text-ink-soft">Send it to us for a repair quote. A person reviews every file we return.</span>
                </Link>
                <Link href="/contact?topic=audit" className="check-next">
                  <span className="block font-[600] text-ink">Hundreds of PDFs like this?</span>
                  <span className="block text-ink-soft">A Readiness Audit finds every PDF on your website and shows which to fix first.</span>
                </Link>
              </div>
            </m.section>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FindingRow({ f, i, reduced }: { f: Finding; i: number; reduced: boolean }) {
  const s = STATUS[f.status];
  return (
    <m.li
      className="check-row"
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0, transition: { duration: DUR.ui, ease: EASE_OUT, delay: reduced ? 0 : 0.08 + i * STAGGER } }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-[1.08rem] font-[620] text-ink">{f.title}</h3>
        <span className={`check-status ${s.cls}`}>{s.label}</span>
      </div>
      <p className="mt-1 text-ink">{f.detail}</p>
      <p className="mt-2 text-[0.95rem] text-ink-soft">{f.why}</p>
      {f.fix ? (
        <p className="mt-2 text-[0.95rem] text-ink-soft">
          <span className="font-[600] text-ink">What to do: </span>
          {f.fix}
        </p>
      ) : null}
    </m.li>
  );
}
