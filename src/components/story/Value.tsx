"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { track } from "@/lib/analytics";

type Inputs = { pages: number; inUse: number; complex: number; monthly: number; rate: number };
type Field = { key: keyof Inputs; label: string; hint: string; min: number; max: number; step: number; fmt: (v: number) => string };

const num = (v: number) => Math.round(v).toLocaleString("en-US");
const pct = (v: number) => `${Math.round(v)}%`;
const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
/** Round big hour counts so the estimate never looks more precise than it is. */
const hrs = (v: number) => (v >= 1000 ? Math.round(v / 100) * 100 : v >= 100 ? Math.round(v / 10) * 10 : Math.round(v)).toLocaleString("en-US");

/** Hand-remediation time per page, in minutes. Practitioner ranges; they vary widely with the document. */
const MIN = { simple: [3, 12], complex: [15, 30] } as const;

const fields: Field[] = [
  { key: "pages", label: "PDF pages on your public website", hint: "Every page of every PDF your site links to. If you don't know, that is normal. An audit counts them.", min: 1000, max: 300000, step: 1000, fmt: num },
  { key: "inUse", label: "Share still in use", hint: "Pages people use to apply, pay, take part or stay informed. Older reference files may be excepted. Your team makes that call.", min: 5, max: 100, step: 1, fmt: pct },
  { key: "complex", label: "Share that is forms, tables or scans", hint: "These take a person much longer per page.", min: 0, max: 80, step: 1, fmt: pct },
  { key: "monthly", label: "New pages posted each month", hint: "Agendas, packets, notices. Each one posted after the date has to be accessible.", min: 0, max: 5000, step: 50, fmt: num },
  { key: "rate", label: "Cost of an hour of skilled work", hint: "Your own figure, for staff or a contractor. Set it to $0 to see hours only.", min: 0, max: 150, step: 5, fmt: (v) => (v ? usd(v) : "Hours only") },
];

function hours(pages: number, complexShare: number) {
  const c = pages * complexShare;
  const s = pages - c;
  return [(s * MIN.simple[0] + c * MIN.complex[0]) / 60, (s * MIN.simple[1] + c * MIN.complex[1]) / 60] as const;
}

export function Value() {
  const [v, setV] = useState<Inputs>({ pages: 40000, inUse: 30, complex: 20, monthly: 400, rate: 0 });
  const base = useId();

  const share = v.complex / 100;
  const scope = v.pages * (v.inUse / 100);
  const all = hours(v.pages, share);
  const sorted = hours(scope, share);
  const monthly = hours(v.monthly, share);
  const range = (h: readonly [number, number]) => `${hrs(h[0])} to ${hrs(h[1])} hours`;
  const money = (h: readonly [number, number]) => (v.rate ? `, about ${usd(h[0] * v.rate)} to ${usd(h[1] * v.rate)}` : "");

  const bars = [
    { id: "all", label: "Fix everything", pages: v.pages, h: all, lo: "bg-ink/55", hi: "bg-ink/20" },
    { id: "sorted", label: "Fix what's in use", pages: scope, h: sorted, lo: "bg-signal", hi: "bg-signal/30" },
  ];
  const max = Math.max(all[1], 1);

  return (
    <section data-sc-act="value" aria-labelledby="value-title" className="bg-paper-deep py-[clamp(7rem,14vh,11rem)]">
      <div className="wrap text-center">
        <h2 id="value-title" className="headline mx-auto max-w-[17ch]">
          The cheapest page to fix is the one <span className="tone">you don&apos;t have to.</span>
        </h2>
        <p className="lede mx-auto mt-6 !max-w-[54ch]">
          Most of the cost of PDF accessibility is skilled hours. Sorting your files before anyone starts repairing them changes how many hours you need.
          Put in rough numbers and see the arithmetic.
        </p>
      </div>

      {/* phones: the result stays in view while the sliders move */}
      <div className="sticky top-[var(--header-h)] z-20 mt-10 border-y bg-sheet py-2.5 hairline lg:hidden" aria-hidden="true">
        <p className="wrap flex justify-between gap-3 text-[0.88rem]">
          <span className="text-muted">
            In repair: <span className="numeral font-[600] text-ink">{num(scope)} pages</span>
          </span>
          <span className="numeral font-[600] text-ink">{range(sorted)}</span>
        </p>
      </div>

      <div className="wrap mt-14">
        <div className="mx-auto grid max-w-[1100px] gap-12 border-t border-ink/20 pt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <form onSubmit={(e) => e.preventDefault()} aria-label="Your assumptions">
            <h3 className="title text-[1.2rem]">Your assumptions</h3>
            <ul className="mt-2">
              {fields.map((f) => {
                const id = `${base}-${f.key}`;
                return (
                  <li key={f.key} className="border-b py-4 hairline">
                    <div className="flex items-baseline justify-between gap-4">
                      <label htmlFor={id} className="text-[0.95rem] font-[560] leading-snug">
                        {f.label}
                      </label>
                      <output htmlFor={id} className="mono shrink-0 tabular-nums text-signal">
                        {f.fmt(v[f.key])}
                      </output>
                    </div>
                    <input
                      id={id}
                      type="range"
                      min={f.min}
                      max={f.max}
                      step={f.step}
                      value={v[f.key]}
                      onChange={(e) => setV((s) => ({ ...s, [f.key]: Number(e.target.value) }))}
                      onPointerUp={() => track("estimator_change", { field: f.key })}
                      onKeyUp={() => track("estimator_change", { field: f.key })}
                      aria-describedby={`${id}-hint`}
                      className="cost-range mt-2"
                    />
                    <p id={`${id}-hint`} className="mt-1 text-[0.84rem] leading-snug text-muted">
                      {f.hint}
                    </p>
                  </li>
                );
              })}
            </ul>
          </form>

          <div aria-live="polite" className="grid content-start gap-8">
            <p className="text-[clamp(1.15rem,1rem+0.5vw,1.4rem)] leading-[1.45] text-ink">
              With these assumptions, about <strong className="numeral font-[620]">{num(scope)}</strong> of your {num(v.pages)} pages would move into
              repair. Fixing them by hand would take roughly <strong className="numeral font-[620]">{range(sorted)}</strong> of skilled work
              {money(sorted)}. Repairing everything would take {range(all)}
              {money(all)}.
            </p>

            <div className="grid gap-5" aria-hidden="true">
              {bars.map((b) => (
                <div key={b.id}>
                  <div className="flex items-baseline justify-between gap-4 text-[0.95rem]">
                    <span className="font-[600] text-ink">{b.label}</span>
                    <span className="mono text-muted">{num(b.pages)} pages</span>
                  </div>
                  <div className="relative mt-2 h-3 rounded-full bg-surface">
                    {/* the solid part is the low end of the range, the pale part runs to the high end */}
                    <div className={`cost-bar absolute inset-y-0 left-0 rounded-full ${b.hi}`} style={{ width: `${(b.h[1] / max) * 100}%` }} />
                    <div className={`cost-bar absolute inset-y-0 left-0 rounded-full ${b.lo}`} style={{ width: `${Math.max(0.6, (b.h[0] / max) * 100)}%` }} />
                  </div>
                  <p className="mono mt-1.5 text-[0.8rem] text-muted">{range(b.h)}{b.id === "all" ? " (dark: low end, light: high end)" : ""}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[12px] bg-sheet p-5 text-[0.92rem] text-ink-soft shadow-[inset_0_0_0_1px_rgb(18_21_27/0.08)]">
              <p className="font-[600] text-ink">How the hours are worked out</p>
              <p className="mt-1.5">
                Simple pages at {MIN.simple[0]} to {MIN.simple[1]} minutes each, forms, tables and scans at {MIN.complex[0]} to {MIN.complex[1]} minutes.
                These are commonly quoted ranges for repair by hand, and real documents vary widely. Software can speed up routine pages, but a person still
                has to check them, so we don&apos;t count on it here.
              </p>
              <p className="mt-3">
                After that, the {num(v.monthly)} pages you post each month add about {range(monthly)} a month, unless they are made accessible before they are
                posted.
              </p>
            </div>

            <div>
              <p className="font-[600] text-ink">What only a real inventory can tell you</p>
              <ul className="mt-2 grid list-disc gap-1 pl-5 text-[0.95rem] text-ink-soft">
                <li>How many PDFs and pages your website actually links to.</li>
                <li>Which are forms, tables and scans.</li>
                <li>Which may be excepted, for your team to decide.</li>
                <li>Which already pass, and which have problems a person must fix.</li>
              </ul>
            </div>

            <div className="flex flex-col items-start gap-4 border-t pt-6 hairline sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[44ch] text-[0.86rem] leading-relaxed text-muted">
                An illustration from the numbers you entered. Not a quote, a measured result, or a legal judgement about what you must fix.
              </p>
              <Link href="/contact?topic=audit" className="btn shrink-0">
                Get your real numbers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
