"use client";

import { useId, useState } from "react";
import { PVB, PermitPage, regions } from "../doc/permit";
import { BrokenLayer, FixedLayer } from "../doc/PermitSheet";

type Row = { t: string; k: "issue" | "auto" | "person" | "pass" | "info" };
const stages: { id: string; name: string; line: string; rows: Row[]; status: string }[] = [
  {
    id: "discover",
    name: "Discover",
    line: "Find every publicly linked file and learn what it is. This one is linked as “Apply for a permit”, so it is a service document.",
    status: "Must fix · your team confirms",
    rows: [
      { t: "Found on /permits", k: "info" },
      { t: "No tags", k: "issue" },
      { t: "5 fields with no accessible name", k: "issue" },
      { t: "Footer read before the title", k: "issue" },
    ],
  },
  {
    id: "repair",
    name: "Repair",
    line: "Software fixes tags, order and field names, never the visible text. Tables, forms needing judgement and scans go to a person.",
    status: "4 of 5 fixed automatically",
    rows: [
      { t: "Title tagged as H1", k: "auto" },
      { t: "Field names from printed labels", k: "auto" },
      { t: "Footer marked as artifact", k: "auto" },
      { t: "Check boxes grouped “Type of work”", k: "person" },
    ],
  },
  {
    id: "verify",
    name: "Verify",
    line: "Every file is checked again after its last change: the PDF/UA-1 validator, a semantic review against the page, and a person where the work was hard.",
    status: "3 checks passed",
    rows: [
      { t: "veraPDF 1.28, PDF/UA-1", k: "pass" },
      { t: "Semantic check, no major findings", k: "pass" },
      { t: "Reviewer confirmed field names", k: "pass" },
    ],
  },
  {
    id: "publish",
    name: "Publish",
    line: "The repaired file goes back with a plain report of what was checked and what changed. The original is kept.",
    status: "Version 2 · report attached",
    rows: [
      { t: "permit-application.pdf, version 2", k: "info" },
      { t: "Original kept, unchanged", k: "info" },
      { t: "Report: checks, changes, who made them", k: "info" },
    ],
  },
  {
    id: "monitor",
    name: "Monitor",
    line: "New uploads are noticed and checked, and recurring problems are traced to the template that causes them.",
    status: "Watching new uploads",
    rows: [
      { t: "Agenda packet, Dec 8: checked", k: "pass" },
      { t: "Fee schedule v2: needs attention", k: "issue" },
      { t: "Template BD-12 now keeps field names", k: "auto" },
    ],
  },
];

const mark: Record<Row["k"], [string, string]> = {
  issue: ["Issue", "text-ember"],
  auto: ["Automatic", "text-signal"],
  person: ["Person", "text-ink"],
  pass: ["Passed", "text-signal"],
  info: ["", "text-muted"],
};

export function Product() {
  const [i, setI] = useState(0);
  const base = useId();
  const s = stages[i]!;
  const layer = s.id === "discover" ? "broken" : "fixed";

  return (
    <section id="product" data-sc-act="product" aria-labelledby="product-title" className="py-[clamp(7rem,14vh,11rem)]">
      <div className="wrap text-center">
        <h2 id="product-title" className="headline mx-auto max-w-[15ch]">
          One file, five stages. <em>The page never changes.</em>
        </h2>
        <p className="lede mx-auto mt-6 !max-w-[48ch]">
          Sayable changes what assistive technology reads, never what residents see. Step through the work on a single
          document.
        </p>

        <div role="tablist" aria-label="Stages" className="seg mt-10 max-w-full overflow-x-auto">
          {stages.map((st, n) => (
            <button
              key={st.id}
              id={`${base}-tab-${st.id}`}
              role="tab"
              type="button"
              aria-selected={n === i}
              aria-controls={`${base}-panel`}
              tabIndex={n === i ? 0 : -1}
              onClick={() => setI(n)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                e.preventDefault();
                const next = (i + (e.key === "ArrowRight" ? 1 : stages.length - 1)) % stages.length;
                setI(next);
                document.getElementById(`${base}-tab-${stages[next]!.id}`)?.focus();
              }}
            >
              {st.name}
            </button>
          ))}
        </div>
        <p className="mx-auto mt-6 min-h-[3.2em] max-w-[54ch] text-[1.05rem] text-ink-soft" aria-live="polite">
          {s.line}
        </p>
      </div>

      <div className="wrap mt-10">
        <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${s.id}`} className="workspace mx-auto max-w-[1100px]">
          <div className="flex items-center justify-between gap-4 border-b px-5 py-3 hairline">
            <span className="flex items-center gap-2.5">
              <span className="mono text-[0.82rem] text-ink-soft">permit-application.pdf</span>
            </span>
            <span className="text-[0.82rem] font-[560] text-muted">Illustrative interface · sample data</span>
          </div>
          <div className="grid md:grid-cols-[17rem_1fr]">
            <aside className="border-b p-5 text-left hairline md:border-b-0 md:border-r" aria-label={`${s.name} details`}>
              <p className="text-[0.8rem] font-[600] text-muted">{s.name}</p>
              <p className="title mt-1 text-[1.15rem]">{s.status}</p>
              <ul className="mt-5 space-y-3">
                {s.rows.map((r) => (
                  <li key={r.t} className="text-[0.92rem] leading-snug">
                    {mark[r.k][0] ? <span className={`block text-[0.75rem] font-[600] ${mark[r.k][1]}`}>{mark[r.k][0]}</span> : null}
                    <span className={r.k === "issue" ? "text-ember" : "text-ink"}>{r.t}</span>
                  </li>
                ))}
              </ul>
            </aside>
            <div className="bg-paper-deep/60 px-6 py-8 sm:px-12">
              <div className="mx-auto max-w-[520px]">
                <svg viewBox={PVB} className="permit-page" aria-label={`The permit application during ${s.name}. Visible content unchanged.`} role="img">
                  <PermitPage />
                  {layer === "broken" ? <BrokenLayer /> : <FixedLayer />}
                  {s.id !== "discover" && s.id !== "repair" ? (
                    <g transform={`translate(${regions.date!.x - 40} 960)`}>
                      <rect width="266" height="40" rx="20" fill="#12151b" />
                      <text x="22" y="26" fontFamily="var(--font-sans)" fontWeight="600" fontSize="17" fill="#fff">
                        {s.status}
                      </text>
                    </g>
                  ) : null}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
