"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useInView";
import { SplitAct } from "../split/SplitAct";

type Inputs = { pages: number; attention: number; exceptions: number; vendor: number; auto: number; autoCost: number; reviewMin: number; wage: number; monthly: number };
type Field = { key: keyof Inputs; label: string; hint: string; min: number; max: number; step: number; fmt: (v: number) => string };

const usd = (v: number) => (Math.abs(v) >= 1000 ? `$${Math.round(v).toLocaleString("en-US")}` : `$${v.toFixed(2)}`);
const num = (v: number) => Math.round(v).toLocaleString("en-US");
const pct = (v: number) => `${Math.round(v)}%`;

const fields: Field[] = [
  { key: "pages", label: "PDF pages on your public site", hint: "All publicly linked documents, counted in pages.", min: 2000, max: 300000, step: 1000, fmt: num },
  { key: "attention", label: "Share that needs review", hint: "Service documents and current material. An audit measures this.", min: 5, max: 100, step: 1, fmt: pct },
  { key: "exceptions", label: "Of those, share your team treats as exceptions", hint: "Your organization's determination, not Sayable's. Leave at 0% until you have made it.", min: 0, max: 60, step: 1, fmt: pct },
  { key: "vendor", label: "Manual remediation, per page", hint: "Washington State cooperative contract 02024 lists about $3.34 simple and $4.60 complex (our research; confirm current rates).", min: 1, max: 15, step: 0.25, fmt: usd },
  { key: "auto", label: "Share fit for automatic repair", hint: "Varies by document. In our research test, 13 of 32 sample pages passed with no hand work.", min: 0, max: 70, step: 1, fmt: pct },
  { key: "autoCost", label: "Automated repair and checks, per page", hint: "An assumption for this model, not a price.", min: 0.25, max: 4, step: 0.25, fmt: usd },
  { key: "reviewMin", label: "Staff review per automated page", hint: "Minutes a person spends confirming the result.", min: 0, max: 10, step: 0.5, fmt: (v) => `${v} min` },
  { key: "wage", label: "Staff cost per hour", hint: "Fully loaded, including benefits.", min: 25, max: 150, step: 5, fmt: (v) => `$${v}` },
  { key: "monthly", label: "New pages published each month", hint: "Everything new needs to work.", min: 0, max: 8000, step: 100, fmt: num },
];

function useTween(target: number) {
  const reduced = usePrefersReducedMotion();
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (reduced) {
      from.current = target;
      const r = requestAnimationFrame(() => setV(target));
      return () => cancelAnimationFrame(r);
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 480);
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
  return <span className={`tabular-nums ${className}`}>{usd(useTween(value))}</span>;
}

export function Value() {
  const [v, setV] = useState<Inputs>({ pages: 40000, attention: 35, exceptions: 0, vendor: 4, auto: 40, autoCost: 1.5, reviewMin: 2, wage: 60, monthly: 600 });
  const base = useId();

  const review = v.pages * (v.attention / 100);
  const work = review * (1 - v.exceptions / 100);
  const autoPages = work * (v.auto / 100);
  const handPages = work - autoPages;
  const reviewCost = (v.reviewMin / 60) * v.wage;
  const baseline = v.pages * v.vendor;
  const sorted = work * v.vendor;
  const mixed = autoPages * (v.autoCost + reviewCost) + handPages * v.vendor;
  const staffHours = (autoPages * v.reviewMin) / 60;
  const monthlyHand = v.monthly * v.vendor;
  const monthlyMixed = v.monthly * (v.auto / 100) * (v.autoCost + reviewCost) + v.monthly * (1 - v.auto / 100) * v.vendor;
  const max = Math.max(baseline, 1);

  const rows = [
    { id: "a", name: "Remediate every page by hand", value: baseline, math: `${num(v.pages)} pages × ${usd(v.vendor)}` },
    { id: "b", name: "Sort first, remediate what needs it", value: sorted, math: `${num(work)} pages × ${usd(v.vendor)}` },
    { id: "c", name: "Sort first, automate what is safe, people for the rest", value: mixed, math: `${num(autoPages)} × (${usd(v.autoCost)} + ${usd(reviewCost)} review) + ${num(handPages)} × ${usd(v.vendor)}` },
  ];

  return (
    <SplitAct
      act="value"
      labelledBy="value-title"
      head={
        <h2 id="value-title" className="split-head headline">
          <span className="pb-8">Your numbers.</span>
          <span className="pb-8">What they would actually require.</span>
        </h2>
      }
      left={
        <form onSubmit={(e) => e.preventDefault()} aria-label="Workload estimator inputs">
          {/* phones: the result stays in view while the sliders move */}
          <div className="sticky top-0 z-20 -mx-[var(--gutter)] mb-6 grid grid-cols-3 gap-2 border-b bg-night px-[var(--gutter)] py-3 text-moon lg:hidden" aria-hidden="true">
            {[
              ["By hand", baseline],
              ["Sort first", sorted],
              ["Sort + automate", mixed],
            ].map(([l, val]) => (
              <span key={l as string} className="block">
                <span className="block text-[0.72rem] text-moon-muted">{l as string}</span>
                <Money value={val as number} className="title block text-[1.05rem]" />
              </span>
            ))}
          </div>
          <p className="max-w-[40ch] text-ink-soft lg:ml-auto lg:text-right">Move the numbers to match your site. Every result on the right is computed from them.</p>
          <ul className="mt-8 border-t hairline">
            {fields.map((f) => {
              const id = `${base}-${f.key}`;
              return (
                <li key={f.key} className="border-b py-4 hairline">
                  <div className="flex items-baseline justify-between gap-4">
                    <label htmlFor={id} className="font-[700] leading-snug">
                      {f.label}
                    </label>
                    <output htmlFor={id} className="mono shrink-0 tabular-nums">
                      {f.fmt(v[f.key])}
                    </output>
                  </div>
                  <input id={id} type="range" min={f.min} max={f.max} step={f.step} value={v[f.key]} onChange={(e) => setV((s) => ({ ...s, [f.key]: Number(e.target.value) }))} aria-describedby={`${id}-hint`} className="cost-range mt-2" />
                  <p id={`${id}-hint`} className="mt-1 text-[0.88rem] leading-snug text-muted">
                    {f.hint}
                  </p>
                </li>
              );
            })}
          </ul>
        </form>
      }
      right={
        <div aria-live="polite">
          <dl className="grid grid-cols-2 gap-6 border-b pb-6" style={{ borderColor: "var(--rule-night)" }}>
            <div>
              <dt className="text-[0.9rem] text-moon-muted">Pages to review</dt>
              <dd className="title mt-1 text-[2rem] tabular-nums">{num(review)}</dd>
            </div>
            <div>
              <dt className="text-[0.9rem] text-moon-muted">Pages needing remediation</dt>
              <dd className="title mt-1 text-[2rem] tabular-nums">{num(work)}</dd>
              {v.exceptions > 0 ? <dd className="mono text-[0.78rem] text-moon-muted">after your {pct(v.exceptions)} exception decision</dd> : null}
            </div>
          </dl>
          <ol className="relative mt-8 space-y-8 pl-11">
            <span aria-hidden="true" className="absolute bottom-6 left-[13px] top-3 border-l-2 border-moon/30" />
            {rows.map((r, i) => (
              <li key={r.id} className="relative">
                <span aria-hidden="true" className="absolute -left-11 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-moon text-[0.8rem] font-[700] text-night">
                  {i + 1}
                </span>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="max-w-[26ch] font-[700] leading-snug">{r.name}</span>
                  <Money value={r.value} className="title shrink-0 text-[clamp(1.7rem,1.2rem+1.4vw,2.6rem)] leading-none" />
                </div>
                <div className="mt-3 h-2.5 w-full rounded-full bg-night-raise" aria-hidden="true">
                  <div className={`cost-bar h-full rounded-full ${r.id === "c" ? "" : "bg-moon/60"}`} style={{ width: `${Math.max(1, (r.value / max) * 100)}%` }}>
                    {r.id === "c" ? (
                      <span className="flex h-full">
                        <span className="h-full bg-moon" style={{ width: `${mixed ? ((autoPages * (v.autoCost + reviewCost)) / mixed) * 100 : 0}%` }} />
                        <span className="h-full flex-1 bg-moon-muted/50" />
                      </span>
                    ) : null}
                  </div>
                </div>
                <p className="mono mt-2 text-[0.8rem] text-moon-muted">{r.math}</p>
              </li>
            ))}
          </ol>
          <dl className="mt-10 grid grid-cols-1 gap-6 border-t pt-7 sm:grid-cols-3" style={{ borderColor: "var(--rule-night)" }}>
            <div>
              <dt className="text-[0.9rem] text-moon-muted">Avoided by sorting first</dt>
              <dd className="title mt-1 text-[1.9rem]"><Money value={baseline - sorted} /></dd>
            </div>
            <div>
              <dt className="text-[0.9rem] text-moon-muted">Pages still done by hand</dt>
              <dd className="title mt-1 text-[1.9rem] tabular-nums">{num(handPages)}</dd>
            </div>
            <div>
              <dt className="text-[0.9rem] text-moon-muted">Staff review time</dt>
              <dd className="title mt-1 text-[1.9rem] tabular-nums">{num(staffHours)} h</dd>
            </div>
          </dl>
          <p className="mt-6">
            Each month after that, {num(v.monthly)} new pages cost about <strong className="tabular-nums">{usd(monthlyHand)}</strong> by hand, or <strong className="tabular-nums">{usd(monthlyMixed)}</strong> with routine pages automated and reviewed.
          </p>
          <p className="mt-6 max-w-[60ch] text-[0.88rem] leading-relaxed text-moon-muted">
            A hypothetical estimate from the numbers you entered, not a quote or a measured result. The automation share is one average; real documents vary, and tables, forms and scans usually need a person. Sayable does not decide which documents your organization must remediate.
          </p>
          <Link href="/contact?topic=audit" className="btn btn-night mt-8">
            Find out what your document inventory could actually require <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
          </Link>
        </div>
      }
    />
  );
}
