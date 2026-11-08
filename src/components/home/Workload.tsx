"use client";

import { m, useReducedMotion, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { track } from "@/lib/analytics";

/** Hand-remediation minutes per page. Practitioner ranges; real documents vary widely. */
const MIN = { simple: [3, 12], complex: [15, 30] } as const;

const num = (v: number) => Math.round(v).toLocaleString("en-US");
const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
/** Round so the estimate never looks more precise than it is. */
const round = (v: number) => (v >= 1000 ? Math.round(v / 100) * 100 : v >= 100 ? Math.round(v / 10) * 10 : Math.round(v));

function hours(pages: number, complexShare: number) {
  const c = pages * complexShare;
  const s = pages - c;
  return [(s * MIN.simple[0] + c * MIN.complex[0]) / 60, (s * MIN.simple[1] + c * MIN.complex[1]) / 60] as const;
}

/** The page-count slider is logarithmic: 1,000 to 200,000 pages. */
const toPages = (x: number) => Math.round((1000 * Math.pow(200, x / 100)) / 500) * 500;
const toX = (pages: number) => (100 * Math.log(pages / 1000)) / Math.log(200);

/** A number that eases to its new value, in tabular figures, without bouncing. */
function Rolling({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const s = useSpring(value, { bounce: 0, duration: reduced ? 0 : 0.45 });
  useEffect(() => s.set(value), [s, value]);
  const text = useTransform(s, (v) => num(round(v)));
  return <m.span>{text}</m.span>;
}

type Adv = { inUse: number; complex: number; monthly: number; rate: number };

export function Workload() {
  const id = useId();
  const [x, setX] = useState(toX(10000));
  const [a, setA] = useState<Adv>({ inUse: 30, complex: 20, monthly: 300, rate: 0 });
  const pages = toPages(x);
  const share = a.complex / 100;
  const inUse = pages * (a.inUse / 100);
  const all = hours(pages, share);
  const first = hours(inUse, share);
  const monthly = hours(a.monthly, share);
  const max = Math.max(all[1], 1);
  const money = (h: readonly [number, number]) => (a.rate ? ` (about ${usd(h[0] * a.rate)} to ${usd(h[1] * a.rate)})` : "");

  const adv: { key: keyof Adv; label: string; min: number; max: number; step: number; show: (v: number) => string }[] = [
    { key: "inUse", label: "Share residents still use", min: 5, max: 100, step: 1, show: (v) => `${v}%` },
    { key: "complex", label: "Share that is forms, tables or scans", min: 0, max: 80, step: 1, show: (v) => `${v}%` },
    { key: "monthly", label: "New pages posted each month", min: 0, max: 3000, step: 50, show: (v) => num(v) },
    { key: "rate", label: "Cost of an hour of skilled work", min: 0, max: 150, step: 5, show: (v) => (v ? usd(v) : "Hours only") },
  ];

  return (
    <section aria-labelledby="work-title" className="work" data-sc-act="work">
      <div className="wrap">
        <h2 id="work-title" className="headline max-w-[18ch]">
          How much work might your city have?
        </h2>
        <p className="lede mt-5 !max-w-[46ch]">A worked example to start from. Every number here is a guess you can change.</p>

        <div className="work-scenario">
          <label htmlFor={`${id}-pages`} className="work-sentence">
            A city with <strong className="work-figure"><Rolling value={pages} /></strong> pages of PDFs on its website.
          </label>
          <input
            id={`${id}-pages`}
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
            onPointerUp={() => track("estimator_change", { field: "pages" })}
            aria-valuetext={`${num(pages)} pages`}
            className="work-range"
          />
          <div className="work-scale" aria-hidden="true">
            <span>1,000</span>
            <span>200,000</span>
          </div>
        </div>

        <div className="work-results">
          <div className="work-result" data-tone="all">
            <p className="work-k">Fix every page</p>
            <p className="work-v">
              <Rolling value={all[0]} /> to <Rolling value={all[1]} /> hours
            </p>
            <span aria-hidden="true" className="work-bar">
              <span className="hi" style={{ transform: `scaleX(${all[1] / max})` }} />
              <span className="lo" style={{ transform: `scaleX(${all[0] / max})` }} />
            </span>
          </div>
          <div className="work-result" data-tone="first">
            <p className="work-k">
              Fix the {num(round(inUse))} pages residents use, first
            </p>
            <p className="work-v">
              <Rolling value={first[0]} /> to <Rolling value={first[1]} /> hours
            </p>
            <span aria-hidden="true" className="work-bar">
              <span className="hi" style={{ transform: `scaleX(${first[1] / max})` }} />
              <span className="lo" style={{ transform: `scaleX(${first[0] / max})` }} />
            </span>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {num(pages)} pages. Fixing every page: {num(round(all[0]))} to {num(round(all[1]))} hours{money(all)}. Fixing the {num(round(inUse))} pages in use
          first: {num(round(first[0]))} to {num(round(first[1]))} hours{money(first)}.
        </p>
        <p className="work-after">
          After that, about {num(round(monthly[0]))} to {num(round(monthly[1]))} hours a month for new agendas and notices, unless they are made accessible
          before they go up.
          {a.rate ? (
            <>
              {" "}
              At {usd(a.rate)} an hour, the first pass is about {usd(first[0] * a.rate)} to {usd(first[1] * a.rate)}.
            </>
          ) : null}
        </p>

        <details className="work-details">
          <summary>Change the assumptions</summary>
          <div className="work-adv">
            {adv.map((f) => (
              <div key={f.key} className="work-adv-row">
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor={`${id}-${f.key}`} className="text-[0.95rem] font-[600]">
                    {f.label}
                  </label>
                  <output htmlFor={`${id}-${f.key}`} className="numeral text-[1.05rem]">
                    {f.show(a[f.key])}
                  </output>
                </div>
                <input
                  id={`${id}-${f.key}`}
                  type="range"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={a[f.key]}
                  onChange={(e) => setA((s) => ({ ...s, [f.key]: Number(e.target.value) }))}
                  aria-valuetext={f.show(a[f.key])}
                  className="work-range work-range-sm"
                />
              </div>
            ))}
            <div className="work-how">
              <p className="font-[650] text-ink">How the hours are worked out</p>
              <p>
                Simple pages at {MIN.simple[0]} to {MIN.simple[1]} minutes each; forms, tables and scans at {MIN.complex[0]} to {MIN.complex[1]} minutes. These
                are commonly quoted ranges for repair by hand. Software can speed up routine pages, but a person still has to check them, so the estimate does
                not count on it.
              </p>
            </div>
          </div>
        </details>

        <div className="work-foot">
          <p>An illustration from the numbers above. Not a quote and not a measured result. A Readiness Audit counts your real pages.</p>
          <Link href="/contact?topic=audit" className="btn shrink-0">
            Request a Readiness Audit
          </Link>
        </div>
      </div>
    </section>
  );
}
