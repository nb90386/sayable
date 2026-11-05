"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView, usePrefersReducedMotion } from "@/lib/useInView";

const piles = [
  { key: "fix", short: "Fix", name: "Must fix", color: "var(--color-ember)", share: 0.38, why: "Has a form, is linked from a service page such as “Apply for a permit”, or is a current agenda." },
  { key: "archive", short: "Archive", name: "Archive candidate", color: "var(--color-signal)", share: 0.34, why: "Older minutes and closed-year reports kept only for reference, not linked from a service page." },
  { key: "delete", short: "Delete", name: "Delete candidate", color: "var(--color-muted)", share: 0.16, why: "Exact duplicates of another file, expired notices, empty or broken files." },
  { key: "convert", short: "Web page", name: "Better as a web page", color: "var(--color-ink)", share: 0.12, why: "One or two pages of plain text that belongs on the site itself." },
] as const;

const N = 160;

// Deterministic pseudo-random so server and client agree.
function rand(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function Inventory() {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "0px 0px -30% 0px" });
  const reduced = usePrefersReducedMotion();
  const [auto, setAuto] = useState(false);
  const [manual, setManual] = useState<boolean | null>(null);
  useEffect(() => {
    if (reduced || !inView) return;
    const t = setTimeout(() => setAuto(true), 350);
    return () => clearTimeout(t);
  }, [inView, reduced]);
  const sorted = manual ?? (reduced || auto);
  const setSorted = (fn: (v: boolean) => boolean) => setManual(fn(sorted));

  const dots = useMemo(() => {
    const counts = piles.map((p) => Math.round(p.share * N));
    const out: { pile: number; idx: number; i: number }[] = [];
    let i = 0;
    counts.forEach((c, pile) => {
      for (let k = 0; k < c; k++) out.push({ pile, idx: k, i: i++ });
    });
    // interleave so the scattered state mixes piles
    return out.sort((a, b) => rand(a.i + 3) - rand(b.i + 3));
  }, []);

  return (
    <section aria-labelledby="inv-title" className="relative border-t pb-28 pt-24 hairline sm:pb-36 sm:pt-32">
      <div className="wrap">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="inv-title" className="headline mt-6 !text-[length:var(--step-3)]">
              Start with the whole inventory, <em>not a guess.</em>
            </h2>
            <p className="mt-6 max-w-[40ch] text-ink-soft">
              A city site can hold thousands of PDFs. Not all of them need the same work. Sayable crawls what is publicly
              linked, then sorts each file by what it is and how residents use it.
            </p>
            <p className="mt-4 max-w-[40ch] text-ink-soft">
              Every pile is a recommendation with reasons attached. Your team decides what gets archived or removed.
            </p>
            <button type="button" className="link-quiet mt-6 text-sm" onClick={() => setSorted((v) => !v)} aria-pressed={sorted}>
              {sorted ? "Show the unsorted inventory" : "Sort the inventory"}
            </button>
          </div>

          <div className="col-span-12 lg:col-span-8 lg:pl-8">
            <div ref={ref} className="sheet blueprint relative overflow-hidden p-4 sm:p-6" aria-hidden="true">
              <div className="relative aspect-[16/10] w-full">
                {dots.map((d) => {
                  const col = d.pile;
                  const perRow = 6;
                  const r = Math.floor(d.idx / perRow);
                  const c = d.idx % perRow;
                  const sx = 25 * col + 2.2 + c * 3.5;
                  const sy = 14 + r * 7.2;
                  const x = sorted ? sx : 2 + rand(d.i) * 94;
                  const y = sorted ? sy : 4 + rand(d.i + 99) * 86;
                  const rot = sorted ? 0 : (rand(d.i + 7) - 0.5) * 60;
                  return (
                    <span
                      key={d.i}
                      className="inv-dot"
                      style={{
                        left: `${x.toFixed(3)}%`,
                        top: `${y.toFixed(3)}%`,
                        transform: `rotate(${rot.toFixed(2)}deg)`,
                        ["--s" as string]: "clamp(6px, 1.5vw, 15px)",
                        ["--dl" as string]: `${Math.round(rand(d.i + 5) * 380)}ms`,
                        backgroundColor: sorted ? piles[d.pile]!.color : "rgb(14 16 32 / 0.55)",
                      }}
                    />
                  );
                })}
                <div className={`absolute inset-x-0 top-0 grid grid-cols-4 transition-opacity duration-700 ${sorted ? "opacity-100" : "opacity-0"}`}>
                  {piles.map((p) => (
                    <span key={p.key} className="tag truncate pl-[0.5%] !text-ink-soft">
                      <span className="sm:hidden">{p.short}</span>
                      <span className="hidden sm:inline">{p.name}</span>
                    </span>
                  ))}
                </div>
              </div>
              <p className="tag mt-3 !text-muted">Illustrative inventory · 160 files · proportions are an example</p>
            </div>

            <dl className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {piles.map((p) => (
                <div key={p.key} className="border-t py-5 hairline">
                  <dt className="flex items-center gap-3 font-serif text-[1.3rem]">
                    <span aria-hidden="true" className="inline-block h-4 w-3 rounded-[1px]" style={{ background: p.color }} />
                    {p.name}
                  </dt>
                  <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{p.why}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
