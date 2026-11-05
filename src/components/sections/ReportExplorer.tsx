"use client";

import { useId, useState } from "react";
import { NoticePage, VB, blocks, fields, thCells } from "../doc/notice";

const b = (id: string) => blocks.find((x) => x.id === id)!;
const regions: Record<string, { x: number; y: number; w: number; h: number }[]> = {
  fields,
  table: thCells,
  heading: [b("h1"), b("h2")],
  alt: [b("figure")],
};

/** The page, with the region a finding names highlighted and a leader line into it. */
function RegionThumb({ id }: { id: string }) {
  const rs = regions[id] ?? [];
  const first = rs[0]!;
  const cy = first.y + first.h / 2;
  return (
    <svg viewBox={VB} className="block h-auto w-full rounded-[8px] bg-sheet shadow-[0_1px_2px_rgb(23_50_40/0.1),0_8px_20px_-10px_rgb(23_50_40/0.35)]" aria-hidden="true">
      <NoticePage />
      <rect width="850" height="1100" fill="rgb(247 249 244 / 0.7)" />
      {rs.map((r, i) => (
        <rect key={id + i} x={r.x - 8} y={r.y - 8} width={r.w + 16} height={r.h + 16} rx="10" fill="rgb(240 174 113 / 0.35)" stroke="#a24a1c" strokeWidth="9" />
      ))}
      <path d={`M -40 ${cy} C 10 ${cy}, ${first.x - 70} ${cy}, ${first.x - 10} ${cy}`} fill="none" stroke="#1d5347" strokeWidth="11" strokeLinecap="round" />
    </svg>
  );
}

type Finding = {
  id: string;
  title: string;
  category: string;
  severity: "major" | "minor";
  evidence: string;
  action: string;
  by: "Automatic, then reviewed" | "A person";
  before: string;
  after: string;
};

const findings: Finding[] = [
  {
    id: "fields",
    title: "Comment form fields have no names",
    category: "form_labels",
    severity: "major",
    evidence: "Two text fields on page 1 have empty accessible names. A listener hears “Edit text, blank” twice.",
    action: "Field names drafted from the printed labels (“Your name”, “Your comment”), then confirmed by a reviewer.",
    by: "Automatic, then reviewed",
    before: "Edit text, blank.",
    after: "Your name, edit text.",
  },
  {
    id: "table",
    title: "Fee table has no header cells",
    category: "table_headers",
    severity: "major",
    evidence: "Row 1 (“Permit type, Current, Proposed”) is tagged as ordinary cells, so numbers are read without column names.",
    action: "Row 1 retagged as header cells with column scope. Visible content unchanged.",
    by: "A person",
    before: "Permit type. Current. Proposed. Building, residential. 85. 92.",
    after: "Permit type: Building, residential. Current: $85. Proposed: $92.",
  },
  {
    id: "heading",
    title: "Title is tagged as a paragraph",
    category: "heading_missing",
    severity: "major",
    evidence: "“Notice of Public Hearing” is tagged P. There is no heading to navigate to.",
    action: "Retagged H1; “Proposed fee schedule” retagged H2 to match the visible hierarchy.",
    by: "Automatic, then reviewed",
    before: "Notice of Public Hearing.",
    after: "Heading level 1, Notice of Public Hearing.",
  },
  {
    id: "alt",
    title: "Map has no text alternative",
    category: "alt_text",
    severity: "minor",
    evidence: "The location map is announced as “Image” with no description.",
    action: "Alternative text added: “Map: Council Chambers, 410 Main Street.”",
    by: "Automatic, then reviewed",
    before: "Image.",
    after: "Map: Council Chambers, 410 Main Street.",
  },
];

export function ReportExplorer() {
  const [sel, setSel] = useState(findings[0]!.id);
  const f = findings.find((x) => x.id === sel)!;
  const base = useId();

  return (
    <figure className="sheet overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b px-5 py-4 hairline sm:px-7">
        <span className="mono text-[0.85rem]">notice-of-public-hearing.pdf · v2</span>
        <span className="mono text-[0.8rem] text-muted">Sample report · fictional city</span>
      </div>

      <div className="grid sm:grid-cols-[minmax(0,15rem)_1fr]">
        <div role="tablist" aria-label="Findings" aria-orientation="vertical" className="border-b p-2 hairline sm:border-b-0 sm:border-r">
          {findings.map((x, i) => {
            const on = x.id === sel;
            return (
              <button
                key={x.id}
                id={`${base}-tab-${x.id}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={`${base}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => setSel(x.id)}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
                  e.preventDefault();
                  const n = (i + (e.key === "ArrowDown" ? 1 : findings.length - 1)) % findings.length;
                  setSel(findings[n]!.id);
                  document.getElementById(`${base}-tab-${findings[n]!.id}`)?.focus();
                }}
                className={`flex w-full items-start gap-3 rounded-[10px] px-3 py-3 text-left transition-colors ${on ? "bg-signal-wash" : "hover:bg-paper"}`}
              >
                <span aria-hidden="true" className={`mt-1.5 h-1.5 w-4 shrink-0 rounded-full ${x.severity === "major" ? "bg-ember" : "bg-warm"}`} />
                <span className="text-[0.92rem] font-[600] leading-snug">{x.title}</span>
              </button>
            );
          })}
          <div className="mt-3 hidden px-3 pb-3 sm:block">
            <p className="mb-2 text-[0.78rem] font-[600] text-muted">Where it is on the page</p>
            <RegionThumb id={f.id} />
          </div>
        </div>

        <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${f.id}`} className="px-5 pb-7 pt-5 sm:px-7">
          <div className="mb-4 w-[9rem] sm:hidden">
            <RegionThumb id={f.id} />
          </div>
          <p className="mono text-[0.8rem] text-ember">
            {f.severity} · {f.category}
          </p>
          <h3 className="title mt-2 text-[1.45rem]">{f.title}</h3>
          <dl className="mt-5 grid grid-cols-1 gap-y-1 text-[0.95rem] sm:grid-cols-[7.5rem_1fr] sm:gap-y-3">
            <dt className="text-[0.85rem] font-[600] text-muted">Evidence</dt>
            <dd className="mb-2 sm:mb-0">{f.evidence}</dd>
            <dt className="text-[0.85rem] font-[600] text-muted">Change</dt>
            <dd className="mb-2 sm:mb-0">{f.action}</dd>
            <dt className="text-[0.85rem] font-[600] text-muted">Made by</dt>
            <dd className="mb-2 sm:mb-0">{f.by}</dd>
            <dt className="text-[0.85rem] font-[600] text-muted">Re-checked</dt>
            <dd>veraPDF 1.28, PDF/UA-1 profile: passed. Semantic check: no major findings.</dd>
          </dl>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <p className="rounded-[10px] bg-ember-wash px-4 py-3 text-[0.92rem]">
              <span className="block text-[0.78rem] font-[650] text-ember">Before, a listener hears</span>“{f.before}”
            </p>
            <p className="rounded-[10px] bg-signal-wash px-4 py-3 text-[0.92rem]">
              <span className="block text-[0.78rem] font-[650] text-signal">After</span>“{f.after}”
            </p>
          </div>
          <p className="stamp mt-6" aria-hidden="true">
            Checked
          </p>
        </div>
      </div>
      <figcaption className="border-t px-5 py-3 text-[0.85rem] text-muted hairline sm:px-7">
        Illustrative entries for the fictional notice on this page; listener lines are simulated. Every report ends: “This
        report is not a legal certification of compliance.”
      </figcaption>
    </figure>
  );
}
