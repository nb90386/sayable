"use client";

import { useId, useState } from "react";
import { PVB, PermitPage, regions as R } from "../doc/permit";

const regions: Record<string, { x: number; y: number; w: number; h: number }[]> = {
  fields: ["name", "phone", "address", "signature"].map((k) => R[k]!),
  heading: [R.title!],
  order: [R.footer!],
  group: [R.work!],
};

/** The page, with the region a finding names highlighted and a leader line into it. */
function RegionThumb({ id }: { id: string }) {
  const rs = regions[id] ?? [];
  const first = rs[0]!;
  const cy = first.y + first.h / 2;
  return (
    <svg viewBox={PVB} className="block h-auto w-full rounded-[4px] bg-sheet shadow-[0_1px_2px_rgb(0_0_0/0.08),0_8px_20px_-10px_rgb(0_0_0/0.35)]" aria-hidden="true">
      <PermitPage />
      <rect width="850" height="1100" fill="rgb(248 249 251 / 0.55)" />
      {rs.map((r, i) => (
        <rect key={id + i} x={r.x - 8} y={r.y - 8} width={r.w + 16} height={r.h + 16} rx="10" fill="rgb(229 82 31 / 0.16)" stroke="#e5521f" strokeWidth="9" />
      ))}
      <path d={`M -40 ${cy} C 10 ${cy}, ${first.x - 70} ${cy}, ${first.x - 10} ${cy}`} fill="none" stroke="#2458e8" strokeWidth="11" strokeLinecap="round" />
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
    title: "Form fields have no names",
    category: "form_labels",
    severity: "major",
    evidence: "Four text fields on page 1 have empty accessible names. A listener hears “Edit text, blank” with no way to tell them apart.",
    action: "Names drafted from the printed labels (“Applicant name”, “Daytime phone”, “Site address”, “Applicant signature”), then confirmed by a reviewer.",
    by: "Automatic, then reviewed",
    before: "Edit text, blank.",
    after: "Applicant name, edit text, required.",
  },
  {
    id: "heading",
    title: "Title is tagged as plain text",
    category: "heading_missing",
    severity: "major",
    evidence: "“Residential Permit Application” is tagged P. There is no heading to jump to.",
    action: "Retagged as H1. Visible content unchanged.",
    by: "Automatic, then reviewed",
    before: "Residential permit application.",
    after: "Residential Permit Application, heading level 1.",
  },
  {
    id: "order",
    title: "Footer is read first",
    category: "reading_order",
    severity: "major",
    evidence: "The form number and page count come before the title in the reading order.",
    action: "Footer marked as an artifact, so it is skipped; reading order set from the title down.",
    by: "Automatic, then reviewed",
    before: "Page 1 of 2. Residential permit application.",
    after: "Residential Permit Application, heading level 1.",
  },
  {
    id: "group",
    title: "Check boxes have no group",
    category: "form_labels",
    severity: "minor",
    evidence: "Three check boxes are announced without the question they answer.",
    action: "Grouped as “Type of work” with each box named. Grouping is always done by a person.",
    by: "A person",
    before: "Check box, not checked.",
    after: "Type of work: New construction, check box, not checked.",
  },
];

export function ReportExplorer() {
  const [sel, setSel] = useState(findings[0]!.id);
  const f = findings.find((x) => x.id === sel)!;
  const base = useId();

  return (
    <figure className="sheet overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b px-5 py-4 hairline sm:px-7">
        <span className="mono text-[0.85rem]">permit-application.pdf · v2</span>
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
                className={`flex w-full items-start gap-3 rounded-[6px] px-3 py-3 text-left transition-colors ${on ? "bg-signal-wash" : "hover:bg-paper"}`}
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
            <p className="rounded-[6px] bg-ember-wash px-4 py-3 text-[0.92rem]">
              <span className="block text-[0.78rem] font-[650] text-ember">Before, a listener hears</span>“{f.before}”
            </p>
            <p className="rounded-[6px] bg-signal-wash px-4 py-3 text-[0.92rem]">
              <span className="block text-[0.78rem] font-[650] text-signal">After</span>“{f.after}”
            </p>
          </div>
          <p className="stamp mt-6" aria-hidden="true">
            Checked
          </p>
        </div>
      </div>
      <figcaption className="border-t px-5 py-3 text-[0.85rem] text-muted hairline sm:px-7">
        Illustrative entries for the sample permit form on this page; listener lines are simulated. Every report ends: “This
        report is not a legal certification of compliance.”
      </figcaption>
    </figure>
  );
}
