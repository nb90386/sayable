"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useInView";

type Inputs = {
  pages: number;
  attention: number;
  vendor: number;
  auto: number;
  autoCost: number;
  reviewMin: number;
  wage: number;
  monthly: number;
};

type Field = { key: keyof Inputs; label: string; hint: string; min: number; max: number; step: number; fmt: (v: number) => string };

const usd = (v: number) => (Math.abs(v) >= 1000 ? `$${Math.round(v).toLocaleString("en-US")}` : `$${v.toFixed(2)}`);
const num = (v: number) => Math.round(v).toLocaleString("en-US");
const pct = (v: number) => `${Math.round(v)}%`;

const fields: Field[] = [
  { key: "pages", label: "PDF pages on your public site", hint: "All publicly linked documents, counted in pages.", min: 2000, max: 300000, step: 1000, fmt: num },
  { key: "attention", label: "Share that needs attention", hint: "Service documents and current material. An audit measures this; your team decides.", min: 5, max: 100, step: 1, fmt: pct },
  { key: "vendor", label: "Manual remediation, per page", hint: "Washington State cooperative contract 02024 lists about $3.34 simple and $4.60 complex (our research; confirm current rates).", min: 1, max: 15, step: 0.25, fmt: usd },
  { key: "auto", label: "Share fit for automatic repair", hint: "In our research test, 13 of 32 sample pages passed with no hand work. Treat higher values with care.", min: 0, max: 70, step: 1, fmt: pct },
  { key: "autoCost", label: "Automated repair and checks, per page", hint: "An assumption for this model, not a price.", min: 0.25, max: 4, step: 0.25, fmt: usd },
  { key: "reviewMin", label: "Staff review per automated page", hint: "Minutes a person spends confirming the result.", min: 0, max: 10, step: 0.5, fmt: (v) => `${v} min` },
  { key: "wage", label: "Staff cost per hour", hint: "Fully loaded, including benefits.", min: 25, max: 150, step: 5, fmt: (v) => `$${v}` },
  { key: "monthly", label: "New pages published each month", hint: "Agendas, notices, forms. Everything new needs to work.", min: 0, max: 8000, step: 100, fmt: num },
];

/** Count toward a value with an exponential ease; instant under reduced motion. */
function useTween(target: number, reduced: boolean) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (reduced) {
      from.current = target;
      const t = requestAnimationFrame(() => setV(target));
      return () => cancelAnimationFrame(t);
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 520);
      const e = t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const cur = a + (target - a) * e;
      from.current = cur;
      setV(cur);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced]);
  return v;
}

function Money({ value, className = "" }: { value: number; className?: string }) {
  const reduced = usePrefersReducedMotion();
  const v = useTween(value, reduced);
  return <span className={`tabular-nums ${className}`}>{usd(v)}</span>;
}

export function CostModel() {
  const [v, setV] = useState<Inputs>({ pages: 40000, attention: 35, vendor: 4, auto: 40, autoCost: 1.5, reviewMin: 2, wage: 60, monthly: 600 });
  const base = useId();

  const attnPages = v.pages * (v.attention / 100);
  const autoPages = attnPages * (v.auto / 100);
  const handPages = attnPages - autoPages;
  const reviewCostPerPage = (v.reviewMin / 60) * v.wage;

  const baseline = v.pages * v.vendor;
  const prioritized = attnPages * v.vendor;
  const mixed = autoPages * (v.autoCost + reviewCostPerPage) + handPages * v.vendor;
  const staffHours = (autoPages * v.reviewMin) / 60;

  const monthlyHand = v.monthly * v.vendor;
  const monthlyMixed = v.monthly * (v.auto / 100) * (v.autoCost + reviewCostPerPage) + v.monthly * (1 - v.auto / 100) * v.vendor;

  const max = Math.max(baseline, 1);
  const rows = [
    { id: "a", name: "Remediate every page by hand", value: baseline, math: `${num(v.pages)} pages × ${usd(v.vendor)}` },
    { id: "b", name: "Sort first, remediate what needs it", value: prioritized, math: `${num(attnPages)} pages × ${usd(v.vendor)}` },
    {
      id: "c",
      name: "Sort first, automate what is safe, people for the rest",
      value: mixed,
      math: `${num(autoPages)} × (${usd(v.autoCost)} + ${usd(reviewCostPerPage)} review) + ${num(handPages)} × ${usd(v.vendor)}`,
    },
  ];

  return (
    <section id="estimator" aria-labelledby="cost-title" className="night on-night relative pb-24 pt-24 sm:pb-32 sm:pt-28">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <h2 id="cost-title" className="headline col-span-12 lg:col-span-7">
            The cheapest page to fix is <em>the one you never had to.</em>
          </h2>
          <p className="col-span-12 max-w-[46ch] text-moon-muted lg:col-span-4 lg:col-start-9">
            Move the numbers to match your site. The estimator shows where the work goes when you sort first, what software
            can take on, and what still needs people.
          </p>
        </div>

        <div className="mt-14 border-t border-[color:var(--rule-night)]">
          <div className="grid-12 !gap-x-0">
            <form
              className="col-span-12 border-b border-[color:var(--rule-night)] py-6 lg:col-span-5 lg:border-b-0 lg:border-r lg:py-10 lg:pr-10"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Workload estimator inputs"
            >
              <div
                aria-hidden="true"
                className="sticky top-[var(--header-h)] z-10 -mx-[var(--gutter)] mb-4 flex items-baseline justify-between gap-3 border-b border-[color:var(--rule-night)] bg-night px-[var(--gutter)] py-3 lg:hidden"
              >
                <span className="text-[0.85rem] leading-tight text-moon-muted">Sort, then automate</span>
                <Money value={mixed} className="font-serif text-[1.5rem]" />
                <span className="mono text-[0.78rem] text-moon-muted">vs {usd(baseline)}</span>
              </div>
              <ul>
                {fields.map((f) => {
                  const id = `${base}-${f.key}`;
                  return (
                    <li key={f.key} className="border-b border-[color:var(--rule-night)] py-4 first:pt-0 last:border-b-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <label htmlFor={id} className="font-[600] leading-snug">
                          {f.label}
                        </label>
                        <output htmlFor={id} className="mono shrink-0 text-[1rem] tabular-nums text-warm">
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
                        aria-describedby={`${id}-hint`}
                        className="cost-range mt-2 w-full"
                      />
                      <p id={`${id}-hint`} className="mt-1 text-[0.85rem] leading-snug text-moon-muted">
                        {f.hint}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </form>

            <div className="col-span-12 py-8 lg:col-span-7 lg:py-10 lg:pl-12" aria-live="polite">
              <p className="mono text-[0.9rem] text-moon-muted">
                {num(v.pages)} pages, {pct(v.attention)} need attention = <strong className="text-moon">{num(attnPages)} pages</strong>
              </p>
              <ol className="mt-7 space-y-8">
                {rows.map((r) => (
                  <li key={r.id}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="max-w-[28ch] font-[600] leading-snug">{r.name}</span>
                      <Money value={r.value} className="shrink-0 font-serif text-[clamp(1.7rem,1.2rem+1.5vw,2.6rem)] leading-none" />
                    </div>
                    <div className="mt-3 h-3 w-full rounded-full bg-night-raise" aria-hidden="true">
                      <div
                        className={`cost-bar h-full rounded-full ${r.id === "a" ? "bg-moon/70" : r.id === "b" ? "bg-moon-muted/50" : ""}`}
                        style={{ width: `${Math.max(1, (r.value / max) * 100)}%` }}
                      >
                        {r.id === "c" ? (
                          <span className="flex h-full">
                            <span className="h-full bg-signal-light" style={{ width: `${mixed ? ((autoPages * (v.autoCost + reviewCostPerPage)) / mixed) * 100 : 0}%` }} />
                            <span className="h-full flex-1 bg-warm" />
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <p className="mono mt-2 text-[0.8rem] text-moon-muted">{r.math}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem] text-moon-muted">
                <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-5 rounded-full bg-signal-light" /> Automated, checked and reviewed</span>
                <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-5 rounded-full bg-warm" /> Remediated by a person</span>
              </div>

              <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-[color:var(--rule-night)] pt-7 sm:grid-cols-3">
                <div>
                  <dt className="text-[0.9rem] text-moon-muted">Work avoided by sorting first</dt>
                  <dd className="mt-1 font-serif text-[1.9rem] leading-tight"><Money value={baseline - prioritized} /></dd>
                  <dd className="mono text-[0.78rem] text-moon-muted">{num(v.pages - attnPages)} pages not remediated</dd>
                </div>
                <div>
                  <dt className="text-[0.9rem] text-moon-muted">Pages still fixed by hand</dt>
                  <dd className="mt-1 font-serif text-[1.9rem] leading-tight tabular-nums">{num(handPages)}</dd>
                  <dd className="mono text-[0.78rem] text-moon-muted">tables, forms, scans and the rest</dd>
                </div>
                <div>
                  <dt className="text-[0.9rem] text-moon-muted">Staff review time</dt>
                  <dd className="mt-1 font-serif text-[1.9rem] leading-tight tabular-nums">{num(staffHours)} hours</dd>
                  <dd className="mono text-[0.78rem] text-moon-muted">{num(autoPages)} pages × {v.reviewMin} min</dd>
                </div>
              </dl>
              <p className="mt-6 text-[1rem] leading-relaxed">
                Each month after that, {num(v.monthly)} new pages cost about <strong className="tabular-nums">{usd(monthlyHand)}</strong> by
                hand, or <strong className="tabular-nums">{usd(monthlyMixed)}</strong> with routine pages automated and reviewed.
              </p>

              <p className="mt-7 max-w-[62ch] text-[0.85rem] leading-relaxed text-moon-muted">
                A hypothetical estimate from the numbers you entered, not a quote or a measured customer result. It does not
                decide which documents your organization must remediate. Complex tables, forms and scans usually cost more than
                the average page.
              </p>
              <Link href="/contact?topic=audit" className="btn btn-night mt-8">
                Get a readiness estimate for your organization <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
