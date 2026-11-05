"use client";

import Link from "next/link";
import { useId, useState } from "react";

type Field = {
  key: keyof Inputs;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
};

type Inputs = {
  docs: number;
  pages: number;
  mustFix: number;
  manualCost: number;
  autoShare: number;
  autoCost: number;
  monthly: number;
};

const usd = (v: number) => (v >= 100 ? `$${Math.round(v).toLocaleString("en-US")}` : `$${v.toFixed(2)}`);
const num = (v: number) => Math.round(v).toLocaleString("en-US");
const pct = (v: number) => `${Math.round(v)}%`;

const fields: Field[] = [
  { key: "docs", label: "Public documents on your site", hint: "Every PDF linked from public pages.", min: 200, max: 20000, step: 100, format: num },
  { key: "pages", label: "Average pages per document", hint: "Agendas run long; notices are short.", min: 1, max: 40, step: 1, format: num },
  { key: "mustFix", label: "Share that needs remediation", hint: "Forms, service pages, current agendas. The audit measures this; your team decides.", min: 5, max: 100, step: 1, format: pct },
  { key: "manualCost", label: "Manual remediation, per page", hint: "Washington State cooperative contract 02024 lists about $3.34 a page simple, $4.60 complex (our research; confirm current rates).", min: 1, max: 15, step: 0.25, format: usd },
  { key: "autoShare", label: "Routine pages fixed by software, then checked", hint: "In our research test, 13 of 32 sample pages (41%) passed with no hand work.", min: 0, max: 70, step: 1, format: pct },
  { key: "autoCost", label: "Cost per automated, checked page", hint: "An assumption for this model, not a price.", min: 0.25, max: 4, step: 0.25, format: usd },
  { key: "monthly", label: "New documents published per month", hint: "Everything posted from now on needs to work.", min: 0, max: 600, step: 10, format: num },
];

const MINUTES_PER_HAND_PAGE = 7.5; // midpoint of the 3–12 minute practitioner range for standard pages

export function CostModel() {
  const [v, setV] = useState<Inputs>({ docs: 3000, pages: 8, mustFix: 35, manualCost: 4, autoShare: 40, autoCost: 1.5, monthly: 60 });
  const base = useId();

  const totalPages = v.docs * v.pages;
  const fixPages = totalPages * (v.mustFix / 100);
  const autoPages = fixPages * (v.autoShare / 100);
  const handPages = fixPages - autoPages;

  const a = totalPages * v.manualCost; // fix everything by hand
  const b = fixPages * v.manualCost; // prioritize, then by hand
  const c = autoPages * v.autoCost + handPages * v.manualCost; // prioritize + automate routine pages
  const hours = (handPages * MINUTES_PER_HAND_PAGE) / 60;
  const monthlyPages = v.monthly * v.pages;
  const monthlyHand = monthlyPages * v.manualCost;
  const monthlyMixed = monthlyPages * (v.autoShare / 100) * v.autoCost + monthlyPages * (1 - v.autoShare / 100) * v.manualCost;

  const max = Math.max(a, 1);
  const rows = [
    { id: "a", name: "Remediate every page by hand", value: a, math: `${num(totalPages)} pages × ${usd(v.manualCost)}` },
    { id: "b", name: "Sort first, then remediate what needs it", value: b, math: `${num(fixPages)} pages × ${usd(v.manualCost)}` },
    {
      id: "c",
      name: "Sort first, automate routine pages, people for the rest",
      value: c,
      math: `${num(autoPages)} × ${usd(v.autoCost)} + ${num(handPages)} × ${usd(v.manualCost)}`,
    },
  ];

  return (
    <section id="cost" aria-labelledby="cost-title" className="relative bg-sheet pb-24 pt-24 sm:pb-32 sm:pt-28">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <h2 id="cost-title" className="headline col-span-12 lg:col-span-7">
            The cheapest page to fix is the one <em>you never had to.</em>
          </h2>
          <p className="col-span-12 max-w-[46ch] text-ink-soft lg:col-span-4 lg:col-start-9">
            Put in rough numbers for your site. The model shows where the work goes when you sort the inventory
            before remediating, and what still needs people.
          </p>
        </div>

        <div className="mt-14 grid-12 gap-y-12">
          <form className="col-span-12 lg:col-span-5" onSubmit={(e) => e.preventDefault()} aria-label="Cost model inputs">
            <div
              aria-hidden="true"
              className="sticky top-[var(--header-h)] z-10 -mx-[var(--gutter)] flex items-baseline justify-between gap-4 border-b bg-sheet px-[var(--gutter)] py-3 hairline lg:hidden"
            >
              <span className="text-[0.85rem] leading-tight text-ink-soft">Sort first, then automate</span>
              <span className="display text-[1.5rem] tabular-nums">{usd(c)}</span>
              <span className="mono text-[0.8rem] text-muted">vs {usd(a)}</span>
            </div>
            <ul className="border-t border-ink/60">
              {fields.map((f) => {
                const id = `${base}-${f.key}`;
                return (
                  <li key={f.key} className="border-b py-4 hairline">
                    <div className="flex items-baseline justify-between gap-4">
                      <label htmlFor={id} className="font-[600] leading-snug">
                        {f.label}
                      </label>
                      <output htmlFor={id} className="mono shrink-0 text-[1.05rem] tabular-nums text-signal">
                        {f.format(v[f.key])}
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
                      className="cost-range mt-3 w-full"
                    />
                    <p id={`${id}-hint`} className="mt-1.5 text-[0.85rem] leading-snug text-muted">
                      {f.hint}
                    </p>
                  </li>
                );
              })}
            </ul>
          </form>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7" aria-live="polite">
            <p className="mono text-[0.95rem] text-ink-soft">
              {num(v.docs)} documents × {v.pages} pages = <strong className="text-ink">{num(totalPages)} pages</strong>
            </p>
            <ol className="mt-6 space-y-7">
              {rows.map((r) => (
                <li key={r.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-[620] leading-snug">{r.name}</span>
                    <span className="display shrink-0 text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] tabular-nums">{usd(r.value)}</span>
                  </div>
                  <div className="mt-2.5 h-9 w-full bg-paper/50" aria-hidden="true">
                    <div
                      className={`cost-bar h-full ${r.id === "a" ? "bg-ink/80" : r.id === "b" ? "bg-ink-soft/60" : ""}`}
                      style={{ width: `${Math.max(0.6, (r.value / max) * 100)}%` }}
                    >
                      {r.id === "c" ? (
                        <span className="flex h-full">
                          <span className="h-full bg-signal" style={{ width: `${c ? ((autoPages * v.autoCost) / c) * 100 : 0}%` }} />
                          <span className="h-full flex-1 bg-ember" />
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <p className="mono mt-1.5 text-[0.85rem] text-muted">{r.math}</p>
                </li>
              ))}
            </ol>

            <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-ink/60 pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-[0.9rem] text-ink-soft">Work avoided by sorting first</dt>
                <dd className="display mt-1 text-[2rem] tabular-nums">{usd(a - b)}</dd>
                <dd className="mono text-[0.8rem] text-muted">{num(totalPages - fixPages)} pages not remediated</dd>
              </div>
              <div>
                <dt className="text-[0.9rem] text-ink-soft">Hand work that remains</dt>
                <dd className="display mt-1 text-[2rem] tabular-nums">{num(hours)} hours</dd>
                <dd className="mono text-[0.8rem] text-muted">{num(handPages)} pages × {MINUTES_PER_HAND_PAGE} min</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[0.9rem] text-ink-soft">Each month after that</dt>
                <dd className="mt-1 text-[1.05rem]">
                  <span className="tabular-nums">{num(monthlyPages)}</span> new pages:{" "}
                  <strong className="tabular-nums">{usd(monthlyHand)}</strong> by hand, or{" "}
                  <strong className="tabular-nums">{usd(monthlyMixed)}</strong> with routine pages automated and checked.
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[0.85rem]">
              <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="inline-block h-3 w-5 bg-signal" /> Automated, then checked</span>
              <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="inline-block h-3 w-5 bg-ember" /> Fixed by a person</span>
            </div>

            <p className="mt-8 max-w-[60ch] text-[0.85rem] leading-relaxed text-muted">
              Illustrative arithmetic on the numbers you entered. It is not a quote, a customer result, or a legal
              assessment of which documents your organization must remediate. Hand time uses the midpoint of a 3–12
              minute practitioner range for standard pages; complex tables take longer.
            </p>
            <Link href="/contact?topic=audit" className="btn mt-8">
              Get an inventory and estimate for your site <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
