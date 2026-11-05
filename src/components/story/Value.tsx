"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useInView";

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
    <section data-sc-act="value" aria-labelledby="value-title" className="bg-paper-deep py-[clamp(7rem,14vh,11rem)]">
      <div className="wrap text-center">
        <h2 id="value-title" className="headline mx-auto max-w-[16ch]">
          The cheapest page to fix is the one <em>you never had to.</em>
        </h2>
        <p className="lede mx-auto mt-6 !max-w-[50ch]">
          Put in rough numbers for your site. Every figure below is computed from them, and every formula is shown.
        </p>
      </div>

      {/* phones: the result stays in view while the sliders move */}
      <div className="sticky top-[var(--header-h)] z-20 mt-10 border-y bg-sheet py-3 hairline md:hidden" aria-hidden="true">
        <div className="wrap grid grid-cols-3 gap-2">
          {[
            ["By hand", baseline],
            ["Sort first", sorted],
            ["Sort + automate", mixed],
          ].map(([l, val]) => (
            <span key={l as string}>
              <span className="block text-[0.72rem] text-muted">{l as string}</span>
              <Money value={val as number} className="numeral block text-[1.05rem]" />
            </span>
          ))}
        </div>
      </div>

      <div className="wrap mt-14" aria-live="polite">
        <div className="mx-auto max-w-[1100px] border-t border-ink/20 pt-10">
          <dl className="grid grid-cols-2 gap-6 border-b pb-8 hairline md:grid-cols-4">
            <div>
              <dt className="text-[0.88rem] text-muted">Pages to review</dt>
              <dd className="numeral mt-1 text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)]">{num(review)}</dd>
            </div>
            <div>
              <dt className="text-[0.88rem] text-muted">Needing remediation</dt>
              <dd className="numeral mt-1 text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)]">{num(work)}</dd>
            </div>
            <div>
              <dt className="text-[0.88rem] text-muted">Still done by hand</dt>
              <dd className="numeral mt-1 text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)]">{num(handPages)}</dd>
            </div>
            <div>
              <dt className="text-[0.88rem] text-muted">Staff review time</dt>
              <dd className="numeral mt-1 text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)]">{num(staffHours)} h</dd>
            </div>
          </dl>

          <ol className="mt-8 space-y-7">
            {rows.map((r) => (
              <li key={r.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <span className="font-[560]">{r.name}</span>
                  <Money value={r.value} className="numeral text-[clamp(1.6rem,1.2rem+1.3vw,2.4rem)] leading-none" />
                </div>
                <div className="mt-3 h-3 w-full rounded-full bg-surface" aria-hidden="true">
                  <div className={`cost-bar h-full rounded-full ${r.id === "a" ? "bg-ink/70" : r.id === "b" ? "bg-ink/35" : ""}`} style={{ width: `${Math.max(1, (r.value / max) * 100)}%` }}>
                    {r.id === "c" ? (
                      <span className="flex h-full">
                        <span className="h-full bg-signal" style={{ width: `${mixed ? ((autoPages * (v.autoCost + reviewCost)) / mixed) * 100 : 0}%` }} />
                        <span className="h-full flex-1 bg-signal-light" />
                      </span>
                    ) : null}
                  </div>
                </div>
                <p className="mono mt-2 text-[0.8rem] text-muted">{r.math}</p>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem] text-muted">
            <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-2 w-5 rounded-full bg-signal" /> Automated, checked and reviewed</span>
            <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-2 w-5 rounded-full bg-signal-light" /> Remediated by a person</span>
          </div>

          <div className="mt-10 border-t pt-8 hairline">
            <p className="text-[1.02rem]">
              Avoided by sorting first: <Money value={baseline - sorted} className="numeral font-[600]" />. Each month after that,{" "}
              {num(v.monthly)} new pages cost about <strong className="numeral">{usd(monthlyHand)}</strong> by hand, or{" "}
              <strong className="numeral">{usd(monthlyMixed)}</strong> with routine pages automated and reviewed.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} aria-label="Workload estimator inputs" className="mt-10 border-t pt-8 hairline">
            <h3 className="title text-[1.2rem]">Your assumptions</h3>
            <ul className="mt-4 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
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
                    <input id={id} type="range" min={f.min} max={f.max} step={f.step} value={v[f.key]} onChange={(e) => setV((s) => ({ ...s, [f.key]: Number(e.target.value) }))} aria-describedby={`${id}-hint`} className="cost-range mt-2" />
                    <p id={`${id}-hint`} className="mt-1 text-[0.84rem] leading-snug text-muted">
                      {f.hint}
                    </p>
                  </li>
                );
              })}
            </ul>
          </form>

          <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[62ch] text-[0.86rem] leading-relaxed text-muted">
              A hypothetical estimate from the numbers you entered, not a quote or a measured result. The automation share is one average; real documents vary, and tables, forms and scans usually need a person. Sayable does not decide which documents your organization must remediate.
            </p>
            <Link href="/contact?topic=audit" className="btn shrink-0">
              Find out what your document inventory could actually require
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
