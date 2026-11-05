"use client";

import { useState } from "react";
import { NoticePage, VB, blocks, fields, thCells } from "../doc/notice";

type Issue = {
  id: string;
  title: string;
  region: { x: number; y: number; w: number; h: number }[];
  before: string[];
  after: string[];
  hearBefore: string;
  hearAfter: string;
  who: "auto" | "person";
  whoNote: string;
};

const b = (id: string) => blocks.find((x) => x.id === id)!;

const issues: Issue[] = [
  {
    id: "heading",
    title: "Title tagged as an ordinary paragraph",
    region: [b("h1"), b("h2")],
    before: ['P   "Notice of Public Hearing"', 'P   "Proposed fee schedule"'],
    after: ['H1  "Notice of Public Hearing"', 'H2  "Proposed fee schedule"'],
    hearBefore: "Notice of Public Hearing.",
    hearAfter: "Heading level 1, Notice of Public Hearing.",
    who: "auto",
    whoNote: "Automatic role change, then re-checked.",
  },
  {
    id: "table",
    title: "Fee table without header cells",
    region: thCells,
    before: ["Table", "  TR  TD Permit type · TD Current · TD Proposed", "  TR  TD Building, residential · TD $85 · TD $92"],
    after: ["Table", "  TR  TH Permit type · TH Current · TH Proposed", "  TR  TD Building, residential · TD $85 · TD $92"],
    hearBefore: "Permit type. Current. Proposed. Building, residential. 85. 92.",
    hearAfter: "Row 2. Permit type: Building, residential. Current: $85. Proposed: $92.",
    who: "person",
    whoNote: "Tables go to a person. Automatic table regrouping is not shipped.",
  },
  {
    id: "field",
    title: "Form fields with no accessible name",
    region: fields,
    before: ["Form", '  Widget  TU ""', '  Widget  TU ""'],
    after: ["Form", '  Widget  TU "Your name"', '  Widget  TU "Your comment"'],
    hearBefore: "Edit text, blank.",
    hearAfter: "Your name, edit text.",
    who: "auto",
    whoNote: "Names are drafted from the printed labels, then spot-checked by a person.",
  },
  {
    id: "alt",
    title: "Map image with no description",
    region: [b("figure")],
    before: ["Figure  Alt —"],
    after: ['Figure  Alt "Map: Council Chambers, 410 Main Street"'],
    hearBefore: "Image.",
    hearAfter: "Map: Council Chambers, 410 Main Street.",
    who: "auto",
    whoNote: "Drafted alt text, reviewed. The page itself is never changed.",
  },
];

export function RepairBench() {
  const [sel, setSel] = useState(issues[0]!.id);
  const [fixed, setFixed] = useState<Record<string, boolean>>({});
  const issue = issues.find((i) => i.id === sel)!;
  const isFixed = !!fixed[sel];
  const count = Object.values(fixed).filter(Boolean).length;

  return (
    <section aria-labelledby="bench-title" className="relative overflow-hidden pb-28 pt-28 sm:pb-36 sm:pt-36">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <h2 id="bench-title" className="headline mt-6">
              Small changes to the tags. <em>A different document</em> to a listener.
            </h2>
          </div>
          <p className="col-span-12 max-w-[44ch] text-ink-soft lg:col-span-4 lg:col-start-9">
            Pick a problem, apply the repair, and see what changes in the tag tree and in what a screen reader announces.
            <span className="tag mt-3 block !text-muted">Illustrative example · nothing is uploaded or processed</span>
          </p>
        </div>

        <div className="mt-14 grid-12 gap-y-8">
          {/* issue list */}
          <fieldset className="col-span-12 lg:col-span-4">
            <legend className="tag !text-muted">Findings on this page · {count} of 4 repaired</legend>
            <div className="mt-4 border-t hairline">
              {issues.map((i, n) => (
                <label
                  key={i.id}
                  className={`group flex cursor-pointer items-start gap-4 border-b py-4 pr-2 transition-colors hairline ${sel === i.id ? "bg-sheet" : "hover:bg-sheet/60"}`}
                >
                  <input type="radio" name="issue" value={i.id} checked={sel === i.id} onChange={() => setSel(i.id)} className="peer sr-only" />
                  <span
                    aria-hidden="true"
                    className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.7rem] mono transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal ${
                      fixed[i.id] ? "border-signal bg-signal text-white" : sel === i.id ? "border-ink" : "border-ink/30"
                    }`}
                  >
                    {fixed[i.id] ? "✓" : n + 1}
                  </span>
                  <span className="pl-0">
                    <span className="block font-[540] leading-snug">{i.title}</span>
                    <span className={`tag mt-1.5 block ${i.who === "person" ? "!text-ember" : "!text-muted"}`}>
                      {i.who === "person" ? "Routed to a person" : "Automatic, then checked"}
                      {fixed[i.id] ? " · repaired" : ""}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            <button type="button" className="link-quiet mt-4 text-sm" onClick={() => setFixed({})} disabled={count === 0}>
              Reset example
            </button>
          </fieldset>

          {/* page */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <div className="sheet relative" aria-hidden="true">
              <svg viewBox={VB} className="block h-auto w-full">
                <NoticePage />
                <rect width="850" height="1100" fill="rgb(243 239 230 / 0.35)" />
                {issue.region.map((r, k) => (
                  <rect
                    key={sel + k}
                    x={r.x - 6}
                    y={r.y - 6}
                    width={r.w + 12}
                    height={r.h + 12}
                    rx="3"
                    fill={isFixed ? "rgb(68 51 214 / 0.08)" : "rgb(178 58 12 / 0.08)"}
                    stroke={isFixed ? "#4433d6" : "#b23a0c"}
                    strokeWidth="3"
                    strokeDasharray={isFixed ? undefined : "10 7"}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* tree + output */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <div className="night on-night p-5 sm:p-6">
              <p className="tag !text-moon-muted">Tag tree</p>
              <pre className="mono mt-3 overflow-x-auto whitespace-pre text-[0.78rem] leading-[1.8]">
                {issue.before.map((line, k) => {
                  const changed = line !== issue.after[k];
                  if (!changed) return <span key={k} className="block text-moon-muted">{line}</span>;
                  return isFixed ? (
                    <span key={k} className="block">
                      <span className="block text-moon-muted line-through decoration-ember/80">{line}</span>
                      <span className="block text-signal-night">{issue.after[k]}</span>
                    </span>
                  ) : (
                    <span key={k} className="block text-[#ff8a5c]">{line}</span>
                  );
                })}
              </pre>
              <div className="mt-6 border-t pt-5" style={{ borderColor: "var(--rule-night)" }}>
                <p className="tag !text-moon-muted">A screen reader would say (simulated)</p>
                <p className="mt-2 font-serif text-[1.25rem] leading-snug" aria-live="polite">
                  &ldquo;{isFixed ? issue.hearAfter : issue.hearBefore}&rdquo;
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <button type="button" className="btn" onClick={() => setFixed((f) => ({ ...f, [sel]: !f[sel] }))} aria-pressed={isFixed}>
                {isFixed ? "Undo repair" : "Apply repair"}
              </button>
              <p className="max-w-[30ch] text-[0.875rem] text-muted">{issue.whoNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
