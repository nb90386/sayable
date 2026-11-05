"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useInView, usePrefersReducedMotion } from "@/lib/useInView";

const groups = [
  { key: "service", name: "Active service documents", short: "Service", tone: "fix", why: "Forms, applications and pages residents use to get something done. These come first." },
  { key: "new", name: "New, check before posting", short: "New", tone: "signal", why: "Agendas and notices still being published. Checking them before upload stops the pile growing." },
  { key: "repair", name: "Needs accessibility repair", short: "Repair", tone: "fix", why: "Current documents with missing tags, unnamed fields or broken reading order." },
  { key: "historic", name: "Possible historical exception", short: "Archive?", tone: "muted", why: "Older records kept for reference. Sayable flags them; your team decides whether an exception applies." },
  { key: "policy", name: "Needs a policy decision", short: "Policy", tone: "warm", why: "Duplicates, third-party files and anything that needs a person with authority to decide." },
] as const;

type Key = (typeof groups)[number]["key"];

// Illustrative inventory, deterministic so server and client agree.
const docs: { t: string; m: string; g: Key }[] = [
  { t: "Building permit application", m: "/permits · 2024", g: "service" },
  { t: "Business license renewal", m: "/finance · 2025", g: "service" },
  { t: "Fee waiver request", m: "/clerk · 2023", g: "service" },
  { t: "Utility assistance form", m: "/utilities · 2025", g: "service" },
  { t: "Special event permit", m: "/events · 2024", g: "service" },
  { t: "Records request form", m: "/clerk · 2022", g: "service" },
  { t: "Council agenda packet", m: "/council · Nov 18", g: "new" },
  { t: "Planning notice", m: "/planning · Nov 12", g: "new" },
  { t: "Budget hearing notice", m: "/finance · Nov 20", g: "new" },
  { t: "Parks commission agenda", m: "/parks · Dec 2", g: "new" },
  { t: "Fee schedule", m: "/finance · 2025", g: "repair" },
  { t: "Water quality report", m: "/utilities · 2025", g: "repair" },
  { t: "Zoning map legend", m: "/planning · 2024", g: "repair" },
  { t: "Transit route guide", m: "/transit · 2025", g: "repair" },
  { t: "Emergency prep guide", m: "/fire · 2024", g: "repair" },
  { t: "Council minutes", m: "/council · 2014", g: "historic" },
  { t: "Annual report", m: "/admin · 2016", g: "historic" },
  { t: "Closed bid results", m: "/purchasing · 2015", g: "historic" },
  { t: "Commission minutes", m: "/planning · 2012", g: "historic" },
  { t: "Budget, FY2013", m: "/finance · 2013", g: "historic" },
  { t: "Copy of fee schedule", m: "/finance · duplicate", g: "policy" },
  { t: "Consultant study", m: "third-party host", g: "policy" },
  { t: "Draft ordinance", m: "/clerk · 2021", g: "policy" },
  { t: "Scanned deed record", m: "/records · 1998", g: "policy" },
];

function rand(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const toneClass: Record<string, string> = {
  fix: "bg-ember",
  signal: "bg-signal",
  muted: "bg-muted",
  warm: "bg-warm",
};

export function Inventory() {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "0px 0px -30% 0px" });
  const reduced = usePrefersReducedMotion();
  const [auto, setAuto] = useState(false);
  const [manual, setManual] = useState<boolean | null>(null);
  useEffect(() => {
    if (reduced || !inView) return;
    const t = setTimeout(() => setAuto(true), 400);
    return () => clearTimeout(t);
  }, [inView, reduced]);
  const sorted = manual ?? (reduced || auto);

  const placed = useMemo(() => {
    const counts: Record<string, number> = {};
    return docs.map((d, i) => {
      const col = groups.findIndex((g) => g.key === d.g);
      const row = (counts[d.g] = (counts[d.g] ?? 0) + 1) - 1;
      return {
        ...d,
        i,
        col,
        sx: col * 20 + 0.6,
        sy: 13 + row * 13.5,
        rx: 2 + rand(i) * 76,
        ry: 3 + rand(i + 40) * 78,
        rot: (rand(i + 9) - 0.5) * 26,
      };
    });
  }, []);

  return (
    <section aria-labelledby="inv-title" className="relative pb-24 pt-20 sm:pb-32 sm:pt-24">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <h2 id="inv-title" className="headline col-span-12 lg:col-span-7">
            Thousands of files. <em>Not all of them need the same work.</em>
          </h2>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="max-w-[44ch] text-ink-soft">
              Sayable reads every publicly linked document and sorts it by what it is and how residents use it. The value
              is knowing what needs attention, and why, before anyone pays to remediate it.
            </p>
            <button type="button" className="btn btn-quiet mt-6 !min-h-11 text-[0.95rem]" onClick={() => setManual(!sorted)} aria-pressed={sorted}>
              {sorted ? "Show it unsorted" : "Sort the collection"}
            </button>
          </div>
        </div>

        <div ref={ref} className="relative mt-12 overflow-hidden rounded-[22px] bg-paper-deep p-3 sm:p-5" aria-hidden="true">
          <div className="relative h-[430px] w-full sm:h-[460px] lg:h-[440px]">
            <div className={`absolute inset-x-0 top-0 grid grid-cols-5 gap-2 transition-opacity duration-700 ${sorted ? "opacity-100" : "opacity-0"}`}>
              {groups.map((g) => (
                <p key={g.key} className="flex items-center gap-2 text-[0.78rem] font-[650] leading-tight text-ink sm:text-[0.85rem]">
                  <span className={`h-1.5 w-5 shrink-0 rounded-full ${toneClass[g.tone]}`} />
                  <span className="sm:hidden">{g.short}</span>
                  <span className="hidden sm:inline">{g.name}</span>
                </p>
              ))}
            </div>
            {placed.map((d) => (
              <div
                key={d.i}
                className="inv-sheet w-[19%] rounded-[8px] bg-sheet px-2 py-1.5 shadow-[0_1px_2px_rgb(23_50_40/0.08),0_6px_14px_-8px_rgb(23_50_40/0.25)] sm:px-3 sm:py-2"
                style={{
                  left: `${(sorted ? d.sx : d.rx).toFixed(2)}%`,
                  top: `${(sorted ? d.sy : d.ry).toFixed(2)}%`,
                  transform: `rotate(${(sorted ? 0 : d.rot).toFixed(2)}deg)`,
                  ["--dl" as string]: `${Math.round(rand(d.i + 3) * 320)}ms`,
                }}
              >
                <span className={`mb-1 block h-1 w-6 rounded-full ${sorted ? toneClass[groups[d.col]!.tone] : "bg-ink/15"}`} />
                <span className="block truncate text-[0.62rem] font-[650] leading-tight sm:text-[0.78rem]">{d.t}</span>
                <span className="mono block truncate text-[0.55rem] text-muted sm:text-[0.68rem]">{d.m}</span>
              </div>
            ))}
          </div>
          <p className="mono mt-2 px-1 text-[0.75rem] text-muted">Illustrative collection for a fictional city. Not real data.</p>
        </div>

        <dl className="mt-12 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-5">
          {groups.map((g) => (
            <div key={g.key}>
              <dt className="flex items-center gap-2.5 font-[650] leading-snug">
                <span aria-hidden="true" className={`h-1.5 w-5 shrink-0 rounded-full ${toneClass[g.tone]}`} />
                {g.name}
              </dt>
              <dd className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{g.why}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-14 max-w-[60ch] font-serif text-[length:var(--step-2)] leading-snug">
          Stop guessing which documents need attention.{" "}
          <Link href="#estimator" className="text-link">
            Estimate what sorting first could save
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
