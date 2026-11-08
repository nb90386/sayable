"use client";

import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Item = { key: string; title: string; line: string; with: "audit" | "repair" };
const ITEMS: Item[] = [
  { key: "inventory", title: "Inventory", line: "Every PDF your site links to, and the page it sits on.", with: "audit" },
  { key: "findings", title: "Findings", line: "What is wrong with the files that matter, in plain words.", with: "audit" },
  { key: "priorities", title: "Priorities", line: "Forms and service documents first. Archive candidates flagged for your team.", with: "audit" },
  { key: "plan", title: "Effort and plan", line: "Where the hours go, and what to change so new files start clean.", with: "audit" },
  { key: "records", title: "Records", line: "For each repaired file: the fix, the re-check, the limits.", with: "repair" },
];

/** Miniature pages, drawn in the same hand as the permit form. Sample content. */
function Sheet({ k }: { k: string }) {
  const rows = (n: number, w: (i: number) => string) =>
    Array.from({ length: n }, (_, i) => <span key={i} className="rc-line" style={{ width: w(i) }} />);
  switch (k) {
    case "inventory":
      return (
        <div className="rc-grid">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="rc-row">
              <span className="rc-cell" style={{ width: "46%" }} />
              <span className="rc-cell" style={{ width: "28%" }} />
              <span className={`rc-dot ${i % 3 === 0 ? "is-fix" : i % 4 === 1 ? "is-check" : ""}`} />
            </div>
          ))}
        </div>
      );
    case "findings":
      return (
        <div className="grid gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span className={`rc-dot mt-[2px] ${i < 3 ? "is-fix" : ""}`} />
              <span className="grid flex-1 gap-1">{rows(2, (j) => (j ? "62%" : "92%"))}</span>
            </div>
          ))}
        </div>
      );
    case "priorities":
      return (
        <div className="grid gap-1.5">
          {[0.92, 0.8, 0.66, 0.5, 0.4, 0.3, 0.22].map((w, i) => (
            <span key={i} className={`rc-bar ${i < 3 ? "is-fix" : ""}`} style={{ width: `${w * 100}%` }} />
          ))}
        </div>
      );
    case "plan":
      return (
        <div className="grid gap-2">
          <div className="flex h-12 items-end gap-1.5">
            {[0.35, 0.6, 0.9, 0.5].map((h, i) => (
              <span key={i} className="rc-col" style={{ height: `${h * 100}%` }} />
            ))}
          </div>
          {rows(4, (i) => ["90%", "75%", "84%", "55%"][i]!)}
        </div>
      );
    default:
      return (
        <div className="grid gap-1.5">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="rc-dot is-check" />
              <span className="rc-line" style={{ width: `${[80, 66, 72, 50][i]}%` }} />
            </div>
          ))}
          <span className="rc-line mt-2" style={{ width: "90%" }} />
          <span className="rc-line" style={{ width: "60%" }} />
        </div>
      );
  }
}

function Fanned({ i, p, still, sheet, children }: { i: number; p: MotionValue<number>; still: boolean; sheet: React.ReactNode; children: React.ReactNode }) {
  const off = i - (ITEMS.length - 1) / 2;
  // From one neat packet to a spread on the desk.
  const x = useTransform(p, [0, 1], [`${-off * 92}%`, "0%"]);
  const rotate = useTransform(p, [0, 1], [off * 3.2, off * 0.6]);
  const y = useTransform(p, [0, 1], [Math.abs(off) * 10, Math.abs(off) * 6]);
  return (
    <li className="receive-item" style={{ zIndex: 10 - Math.abs(off) }}>
      <m.div className="receive-sheet" aria-hidden="true" style={still ? undefined : { x, rotate, y }}>
        {sheet}
      </m.div>
      {children}
    </li>
  );
}

/** What the city receives: the story's record widens into the whole deliverable. */
export function Receive() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "center 58%"] });
  return (
    <section aria-labelledby="receive-title" className="receive" data-sc-act="receive">
      <div className="wrap">
        <div className="receive-intro">
          <h2 id="receive-title" className="headline max-w-[16ch]">
            Not a score. A plan your team can work through.
          </h2>
          <p className="lede !max-w-[40ch]">
            A Readiness Audit gives you the first four. Every repaired file adds a record. Nothing ships as a percentage or a badge.
          </p>
        </div>
        <ol ref={ref} className="receive-row">
          {ITEMS.map((it, i) => (
            <Fanned key={it.key} i={i} p={scrollYProgress} still={!!reduced} sheet={<Sheet k={it.key} />}>
              <h3 className="receive-title">{it.title}</h3>
              <p className="receive-line">{it.line}</p>
              <p className="receive-with">{it.with === "audit" ? "Readiness Audit" : "With each repair"}</p>
            </Fanned>
          ))}
        </ol>
        <p className="mt-10 text-[0.95rem] text-muted">
          <Link href="/readiness-audit" className="text-link">
            What the audit includes, what you provide, and how long it takes
          </Link>
        </p>
      </div>
    </section>
  );
}
