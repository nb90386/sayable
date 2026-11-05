"use client";

import { useId, useState } from "react";
import { NoticePage, VB, blocks } from "../doc/notice";

type Mode = "before" | "after";

/** What each block "is" to assistive technology, before and after repair. */
const reading: Record<Mode, { id: string; label: string; say: string }[]> = {
  before: [
    { id: "foot", label: "P", say: "Example document, fictional city. Page 1 of 2." },
    { id: "seal", label: "Image · no alt", say: "Image." },
    { id: "h1", label: "P", say: "Notice of Public Hearing." },
    { id: "form", label: "Edit text · no name", say: "Edit text, blank. Edit text, blank." },
    { id: "body", label: "P", say: "The Planning Commission will hold a public hearing on Tuesday, December 8…" },
    { id: "table", label: "P", say: "Permit type Current Proposed Building residential 85 92 Accessory dwelling unit 120 120…" },
    { id: "figure", label: "Image · no alt", say: "Image." },
    { id: "sub", label: "P", say: "Proposed changes to residential permit fees." },
    { id: "h2", label: "P", say: "Proposed fee schedule." },
  ],
  after: [
    { id: "h1", label: "H1", say: "Heading level 1, Notice of Public Hearing." },
    { id: "sub", label: "P", say: "Proposed changes to residential permit fees." },
    { id: "body", label: "P", say: "The Planning Commission will hold a public hearing on Tuesday, December 8…" },
    { id: "h2", label: "H2", say: "Heading level 2, Proposed fee schedule." },
    { id: "table", label: "Table · TH", say: "Table, 3 columns, 4 rows. Permit type: Building, residential. Current: $85. Proposed: $92…" },
    { id: "figure", label: 'Figure · alt', say: "Map: Council Chambers, 410 Main Street." },
    { id: "form", label: "Form · named", say: "Your name, edit text. Your comment, edit text." },
  ],
};

export function TwoReaders() {
  const [split, setSplit] = useState(46);
  const [mode, setMode] = useState<Mode>("before");
  const rangeId = useId();
  const seq = reading[mode];

  return (
    <section id="two-readers" aria-labelledby="two-readers-title" className="relative pb-24 pt-24 sm:pb-32 sm:pt-28">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <h2 id="two-readers-title" className="headline col-span-12 md:col-span-6">
            One page. <em>Two readers.</em>
          </h2>
          <p className="lede col-span-12 !max-w-[46ch] md:col-span-6 md:col-start-7">
            A sighted resident sees a heading, a fee table and a comment form. A screen reader only gets what the
            file&rsquo;s hidden tags describe. When the tags are missing, the same page comes out as a jumble.
          </p>
        </div>

        <div className="mt-16 grid-12 gap-y-10">
          {/* Lens */}
          <div className="col-span-12 lg:col-span-7">
            <div className="lens-wrap relative select-none">
              <div className="mb-3 flex justify-between gap-4" aria-hidden="true">
                <span className="tag !text-ink-soft">What you see</span>
                <span className="tag text-right !text-ink-soft">What the screen reader gets</span>
              </div>
              <div className="sheet relative overflow-hidden" aria-hidden="true">
                <svg viewBox={VB} className="block h-auto w-full">
                  <NoticePage />
                </svg>
                <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
                  <StructureView mode={mode} />
                </div>
                <div className="pointer-events-none absolute inset-y-0" style={{ left: `${split}%` }}>
                  <div className="absolute inset-y-0 -left-px w-[2px] bg-signal" />
                  <div className="lens-handle-knob absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-paper shadow-lg">
                    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M6 1 1 6l5 5M16 1l5 5-5 5" />
                    </svg>
                  </div>
                  
                </div>
              </div>
              <label htmlFor={rangeId} className="sr-only">
                Compare the visible page with its hidden structure
              </label>
              <div className="absolute inset-x-0 bottom-0 top-8 overflow-hidden">
              <input
                id={rangeId}
                type="range"
                min={0}
                max={100}
                value={split}
                onChange={(e) => setSplit(Number(e.target.value))}
                aria-valuetext={`${100 - split}% of the page shows hidden structure`}
                className="lens-range"
              />
              </div>
            </div>
            <p className="tag mt-4 !text-muted">Drag, or use arrow keys. Simulated example, not recorded screen-reader output.</p>
          </div>

          {/* Transcript */}
          <div className="col-span-12 lg:col-span-5 lg:pl-6">
            <div role="radiogroup" aria-label="Document version" className="inline-flex border hairline p-1">
              {(["before", "after"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={mode === m}
                  onClick={() => setMode(m)}
                  className={`min-h-11 px-4 text-sm font-[540] transition-colors ${mode === m ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"}`}
                >
                  {m === "before" ? "Untagged, as posted" : "After repair"}
                </button>
              ))}
            </div>
            <h3 className="mt-8 font-serif text-[1.6rem] leading-tight">
              {mode === "before" ? "What a listener might hear" : "What a listener should hear"}
            </h3>
            <ol className="mt-5 border-t hairline" aria-live="polite">
              {seq.map((r, i) => (
                <li key={mode + r.id} className="grid grid-cols-[2.25rem_1fr] gap-3 border-b py-3.5 hairline">
                  <span className={`tag mt-1 ${mode === "before" ? "!text-ember" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className={`tag ${mode === "before" ? "!text-ember" : ""}`}>{r.label}</span>
                    <span className="mt-1 block text-[0.975rem] leading-snug text-ink-soft">&ldquo;{r.say}&rdquo;</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-[44ch] text-[0.95rem] text-muted">
              {mode === "before"
                ? "No headings to jump between, a table read as a run of numbers, and two form fields nobody can identify. The footer is read first."
                : "Headings, a real table with header cells, a described map and named fields, in the order a sighted reader would follow."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StructureView({ mode }: { mode: Mode }) {
  const seq = reading[mode];
  const pos = new Map(seq.map((r, i) => [r.id, { n: i + 1, label: r.label }]));
  const bad = mode === "before";
  return (
    <svg viewBox={VB} className="block h-full w-full">
      <rect width="850" height="1100" fill="#18211d" />
      <g stroke="rgb(236 235 245 / 0.06)">
        {Array.from({ length: 34 }, (_, i) => (
          <line key={i} x1="0" x2="850" y1={i * 34} y2={i * 34} />
        ))}
      </g>
      {blocks.map((b) => {
        const p = pos.get(b.id);
        const skipped = !p;
        const color = skipped ? "#55586a" : bad ? "#ff8a5c" : "#a99dff";
        return (
          <g key={b.id}>
            <rect
              x={b.x - 6}
              y={b.y - 6}
              width={b.w + 12}
              height={b.h + 12}
              rx="3"
              fill={skipped ? "none" : bad ? "rgb(255 138 92 / 0.07)" : "rgb(169 157 255 / 0.08)"}
              stroke={color}
              strokeWidth="1.5"
              strokeDasharray={skipped ? "4 5" : undefined}
            />
            <text x={b.x + b.w - (p ? 40 : 10)} y={b.y + 22} textAnchor="end" fontFamily="var(--font-mono)" fontSize="19" fill={color}>
              {skipped ? "Artifact · skipped" : p.label}
            </text>
            {p ? (
              <g transform={`translate(${b.x + b.w - 14} ${b.y + 10})`}>
                <circle r="17" fill={color} />
                <text textAnchor="middle" y="6.5" fontFamily="var(--font-mono)" fontSize="17" fontWeight="500" fill="#18211d">
                  {p.n}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
