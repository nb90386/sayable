"use client";

import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const STEPS = [
  { k: "Find", t: "List every PDF your website links to." },
  { k: "Sort", t: "Decide what residents use, what is archived, what is hard." },
  { k: "Repair", t: "Fix the documents people need, hardest first." },
  { k: "Check", t: "Confirm each file reads correctly, and keep the record." },
  { k: "Keep up", t: "Make new agendas and notices accessible before they go up." },
];

/**
 * The deadline, given its own moment. The date is the headline; the timeline
 * draws itself as the reader scrolls, and shows the work, not a countdown.
 * Dates: 28 CFR 35.200 as amended April 20, 2026 (see docs/research/RESEARCH-NOTES.md).
 */
export function Deadline() {
  const reduced = useReducedMotion();
  const line = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: line, offset: ["start 85%", "end 55%"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="deadline" aria-labelledby="deadline-title" className="deadline">
      <div className="wrap">
        <h2 id="deadline-title" className="deadline-head">
          <span className="deadline-date">April 26, 2027</span>
          <span className="deadline-sub">
            is the federal web accessibility deadline for state and local governments serving 50,000 people or more.
          </span>
        </h2>
        <p className="deadline-small">Smaller governments and special districts have until April 26, 2028.</p>

        <div className="deadline-work">
          <p className="deadline-lead">The work takes months, not weeks, and most of it happens before anyone repairs a page.</p>
          <ol ref={line} className="deadline-line">
            <m.span aria-hidden="true" className="deadline-rule" style={{ scaleX: reduced ? 1 : draw }} />
            {STEPS.map((s, i) => (
              <DeadlineStep key={s.k} i={i} k={s.k} t={s.t} p={draw} reduced={!!reduced} />
            ))}
          </ol>
        </div>

        <div className="deadline-facts">
          <p>
            <strong>Some older files may be excepted</strong> if they are archived and nobody needs them to use a service. Your team decides, and documents the
            decision.
          </p>
          <p>
            <strong>Residents can already ask</strong> for any document in a form they can use. That duty applies today, before either date.
          </p>
          <p>
            <strong>There is no automatic fine.</strong> Residents can complain to the Justice Department or go to court. In 2014 the{" "}
            <a href="https://archive.ada.gov/occ.htm" className="text-link" rel="noopener noreferrer">
              Orange County, Florida clerk
            </a>{" "}
            settled a complaint about scanned court PDFs, agreeing to fix its documents, train staff, and report on progress.
          </p>
        </div>
        <p className="deadline-source">
          Sources:{" "}
          <a href="https://www.ada.gov/resources/web-rule-first-steps/" className="text-link" rel="noopener noreferrer">
            ADA.gov first steps
          </a>
          ,{" "}
          <a href="https://www.ada.gov/resources/small-entity-compliance-guide/" className="text-link" rel="noopener noreferrer">
            small entity compliance guide
          </a>
          . A lawsuit filed in May 2026 asks a court to restore the earlier dates; there is no ruling yet.{" "}
          <a href="/resources/title-ii-rule-and-your-pdfs" className="text-link">
            Read our plain-English guide to the rule
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function DeadlineStep({ i, k, t, p, reduced }: { i: number; k: string; t: string; p: MotionValue<number>; reduced: boolean }) {
  const at = i / (STEPS.length - 1);
  const o = useTransform(p, [Math.max(0, at - 0.12), at], [0.25, 1]);
  return (
    <m.li className="deadline-step" style={{ opacity: reduced ? 1 : o }}>
      <span aria-hidden="true" className="deadline-knot" />
      <span className="deadline-k">{k}</span>
      <span className="deadline-t">{t}</span>
    </m.li>
  );
}
