"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useInView, usePrefersReducedMotion } from "@/lib/useInView";

const lanes = [
  { name: "Active service documents", why: "Forms and pages residents use to get something done. These come first." },
  { name: "Needs accessibility repair", why: "Current files with missing tags, unnamed fields or broken reading order." },
  { name: "New publications", why: "Agendas and notices still being posted. Checking before upload stops the backlog growing." },
  { name: "Possible historical exception", why: "Older records kept for reference. Sayable flags them; your team decides." },
  { name: "Human policy review", why: "Duplicates, third-party files and anything that needs someone with authority." },
];

// Illustrative inventory for a fictional city. Not real data.
const files: { t: string; m: string; g: number }[] = [
  ["Building permit application", "/permits", 0], ["Business license renewal", "/finance", 0], ["Fee waiver request", "/clerk", 0], ["Utility assistance form", "/utilities", 0], ["Special event permit", "/events", 0], ["Records request form", "/clerk", 0], ["Pet license form", "/animal", 0], ["Tree removal permit", "/parks", 0],
  ["Fee schedule", "/finance", 1], ["Water quality report", "/utilities", 1], ["Zoning map legend", "/planning", 1], ["Transit route guide", "/transit", 1], ["Emergency prep guide", "/fire", 1], ["Recycling calendar", "/works", 1], ["Parking rules", "/police", 1], ["Grant guidelines", "/housing", 1],
  ["Council agenda packet", "/council", 2], ["Planning notice", "/planning", 2], ["Budget hearing notice", "/finance", 2], ["Parks commission agenda", "/parks", 2], ["Bid notice: water main", "/purchasing", 2], ["Road closure notice", "/works", 2],
  ["Council minutes, 2014", "/council", 3], ["Annual report, 2016", "/admin", 3], ["Closed bid results", "/purchasing", 3], ["Commission minutes, 2012", "/planning", 3], ["Budget, FY2013", "/finance", 3], ["Newsletter, 2011", "/admin", 3], ["Old fee schedule", "/finance", 3],
  ["Copy of fee schedule", "duplicate", 4], ["Consultant study", "third-party host", 4], ["Draft ordinance", "/clerk", 4], ["Scanned deed record", "/records", 4], ["Vendor brochure", "third-party host", 4],
].map(([t, m, g]) => ({ t: t as string, m: m as string, g: g as number }));

function rand(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}
const r2 = (n: number) => Math.round(n * 100) / 100;

export function Scale() {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "0px 0px -35% 0px" });
  const reduced = usePrefersReducedMotion();
  const [auto, setAuto] = useState(false);
  const [manual, setManual] = useState<boolean | null>(null);
  useEffect(() => {
    if (reduced || !inView) return;
    const t = setTimeout(() => setAuto(true), 500);
    return () => clearTimeout(t);
  }, [inView, reduced]);
  const sorted = manual ?? (reduced || auto);

  const placed = useMemo(() => {
    const count: number[] = [0, 0, 0, 0, 0];
    return files.map((f, i) => {
      const k = count[f.g]!++;
      return {
        ...f,
        i,
        sx: r2(24 + k * 9.4),
        sy: r2(f.g * 20 + 3.5),
        rx: r2(1 + rand(i) * 88),
        ry: r2(2 + rand(i + 50) * 84),
        rot: r2((rand(i + 9) - 0.5) * 22),
      };
    });
  }, []);

  return (
    <section data-sc-act="scale" aria-labelledby="scale-title" className="py-[clamp(7rem,14vh,11rem)]">
      <div className="wrap text-center">
        <h2 id="scale-title" className="headline mx-auto max-w-[17ch]">
          One form is a problem. <em>Thousands are a workload.</em>
        </h2>
        <p className="lede mx-auto mt-6 !max-w-[50ch]">
          Years of agendas, applications, reports and notices, all of them looking finished. Sayable reads every publicly
          linked file and sorts it by what it is and how residents use it, so the work starts where it matters.
        </p>
        <button type="button" className="btn btn-quiet mt-8 !min-h-11" onClick={() => setManual(!sorted)} aria-pressed={sorted}>
          {sorted ? "Show the unsorted collection" : "Sort the collection"}
        </button>
      </div>

      {/* desktop and tablet: one full-width field */}
      <div className="wrap mt-14 hidden md:block">
        <div ref={ref} className="relative h-[700px]" aria-hidden="true">
          {lanes.map((l, i) => (
            <div key={l.name} className={`absolute left-0 w-[22%] transition-opacity duration-700 ${sorted ? "opacity-100" : "opacity-0"}`} style={{ top: `${i * 20 + 3}%` }}>
              <p className="font-[600] leading-snug">{l.name}</p>
              <p className="mt-1 text-[0.85rem] leading-snug text-muted">{l.why}</p>
            </div>
          ))}
          {sorted ? <div className="absolute inset-x-0 top-0 h-full">{[1, 2, 3, 4].map((i) => <div key={i} className="absolute left-0 right-0 border-t hairline" style={{ top: `${i * 20}%` }} />)}</div> : null}
          {placed.map((d) => (
            <div
              key={d.i}
              className="inv-sheet w-[8.6%] rounded-[4px] bg-sheet px-2 py-2"
              style={{
                left: `${sorted ? d.sx : d.rx}%`,
                top: `${sorted ? d.sy : d.ry}%`,
                transform: `rotate(${sorted ? 0 : d.rot}deg)`,
                ["--dl" as string]: `${Math.round(rand(d.i + 3) * 300)}ms`,
              }}
            >
              <span className={`mb-1.5 block h-[3px] w-5 rounded-full ${sorted ? (d.g === 1 ? "bg-warm" : d.g === 4 ? "bg-ink" : d.g === 3 ? "bg-muted" : "bg-signal") : "bg-ink/15"}`} />
              <span className="line-clamp-2 block text-[0.72rem] font-[600] leading-[1.2]">{d.t}</span>
              <span className="mono block truncate text-[0.6rem] text-muted">{d.m}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[0.85rem] text-muted">Illustrative collection for a fictional city. Not real data.</p>
      </div>

      {/* phones: the same result as a readable list */}
      <div className="wrap mt-12 md:hidden">
        <ol className="border-t hairline">
          {lanes.map((l, gi) => (
            <li key={l.name} className="border-b py-5 hairline">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="title text-[1.15rem]">{l.name}</h3>
                <span className="numeral text-[1.1rem] text-muted">{files.filter((f) => f.g === gi).length}</span>
              </div>
              <p className="mt-1 text-[0.95rem] text-muted">{l.why}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {files.filter((f) => f.g === gi).map((f) => (
                  <li key={f.t} className="rounded-[4px] bg-sheet px-2 py-1 text-[0.8rem] shadow-[0_1px_2px_rgb(16_20_28/0.08)]">{f.t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[0.85rem] text-muted">Illustrative collection for a fictional city. Not real data.</p>
      </div>

      <p className="wrap mt-14 text-center text-[length:var(--step-1)] font-[560] tracking-[-0.02em]">
        Stop guessing which documents need attention.{" "}
        <Link href="#value-title" className="text-link">
          Estimate what sorting first could save
        </Link>
      </p>
    </section>
  );
}
