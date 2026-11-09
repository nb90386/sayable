"use client";

import { m, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const STEPS = [
  { k: "Find", t: "Every PDF your public website links to, and the page it sits on." },
  { k: "Prioritize", t: "What residents use now first. Archived files flagged for your team to decide." },
  { k: "Repair", t: "The documents people need, fixed and checked by a person." },
  { k: "Verify", t: "Each file re-checked, with a record of what changed and what wasn’t claimed." },
  { k: "Keep up", t: "New agendas and notices made accessible before they go up." },
];

type Row = { id: string; file: string; from: string; issue: "fix" | "ok" | "old"; rank: number };
/** Sample rows for a fictional city. Illustrative only. */
const ROWS: Row[] = [
  { id: "a", file: "fee-schedule-2019.pdf", from: "/archive/fees", issue: "old", rank: 6 },
  { id: "b", file: "residential-permit.pdf", from: "/permits", issue: "fix", rank: 0 },
  { id: "c", file: "council-agenda-0414.pdf", from: "/council", issue: "fix", rank: 2 },
  { id: "d", file: "parks-map.pdf", from: "/parks", issue: "ok", rank: 4 },
  { id: "e", file: "utility-assistance-form.pdf", from: "/utilities", issue: "fix", rank: 1 },
  { id: "f", file: "budget-fy2025.pdf", from: "/finance", issue: "ok", rank: 3 },
  { id: "g", file: "minutes-2016-03.pdf", from: "/archive/council", issue: "old", rank: 5 },
];

/**
 * The deadline, then the work that comes before it. One workspace changes as
 * the reader scrolls: the site is found, its PDFs listed, sorted, repaired,
 * verified, and kept up. Native scroll only; reversible; still under reduced motion.
 * Dates checked against ada.gov first steps (November 8, 2026).
 */
export function Deadline() {
  const reduced = usePrefersReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: track, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const s = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length * 0.999)));
    setStep((prev) => (prev === s ? prev : s));
  });
  const rule = useTransform(p, [0.02, 0.98], [0, 1]);
  const shown = reduced ? STEPS.length - 1 : step;

  return (
    <section id="deadline" aria-labelledby="deadline-title" className="deadline" data-sc-act="deadline">
      <div className="wrap deadline-top">
        <div>
          <p className="deadline-date" aria-hidden="true">
            April 26, 2027
          </p>
          <h2 id="deadline-title" className="deadline-title">
            The deadline is approaching. Finding the work comes first.
          </h2>
        </div>
        <div className="deadline-rule-text">
          <p>
            <strong>April 26, 2027</strong> for state and local governments with a total population of 50,000 or more.
          </p>
          <p>
            <strong>April 26, 2028</strong> for smaller governments and for special district governments.
          </p>
          <p className="text-muted">The standard is WCAG 2.1 AA, under the Justice Department&rsquo;s ADA Title II web rule.</p>
        </div>
      </div>

      <div ref={track} className="dl-track" data-still={reduced ? "" : undefined}>
        <div className="dl-stage">
          <div className="wrap dl-grid">
            <ol className="dl-steps">
              <m.span aria-hidden="true" className="dl-rail" style={{ scaleY: reduced ? 1 : rule }} />
              {STEPS.map((s, i) => (
                <li key={s.k} data-on={i <= shown ? "" : undefined} data-current={i === shown ? "" : undefined}>
                  <span className="dl-k">{s.k}</span>
                  <span className="dl-t">{s.t}</span>
                </li>
              ))}
            </ol>
            <p className="dl-now" aria-hidden="true">
              {STEPS[shown]!.t}
            </p>
            <Workspace step={shown} />
          </div>
        </div>
      </div>

      <div className="wrap">
        <dl className="deadline-faq">
          <div>
            <dt>Does every old PDF need fixing?</dt>
            <dd>
              Not always. Archived files kept only for reference, and documents posted before the date that nobody needs to use a service, may be excepted.
              Your team decides and writes the decision down.
            </dd>
          </div>
          <div>
            <dt>Can we wait for the date?</dt>
            <dd>Residents can already ask for any document in a form they can use. That duty applies today.</dd>
          </div>
          <div>
            <dt>Is there a fine?</dt>
            <dd>
              Not an automatic one. People can complain to the Justice Department or go to court. In 2014 the{" "}
              <a href="https://archive.ada.gov/occ.htm" className="text-link" rel="noopener noreferrer">
                Orange County, Florida clerk
              </a>{" "}
              settled a complaint about scanned court PDFs by agreeing to fix them and train staff.
            </dd>
          </div>
        </dl>
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
            Our plain-English guide to the rule
          </a>
          .
        </p>
      </div>
    </section>
  );
}

/** One fictional city's work, in five states. Rows move with shared layout as they are sorted. */
function Workspace({ step }: { step: number }) {
  const sorted = step >= 1;
  const rows = sorted ? [...ROWS].sort((a, b) => a.rank - b.rank) : ROWS;
  return (
    <figure className="dl-work" aria-label="Illustration: a fictional city's PDFs being found, sorted, repaired, verified and kept up">
      <div className="dl-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <p>{step === 0 ? "aldercreek.example" : "City of Alder Creek · public PDFs"}</p>
        <p className="dl-count">{step === 0 ? "Crawling" : "1,284 PDFs found"}</p>
      </div>
      <ul className="dl-rows" aria-hidden="true">
        {step >= 4 ? (
          <m.li layout key="new" className="dl-row" data-kind="new" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
            <span className="dl-file">council-agenda-0512.pdf</span>
            <span className="dl-from">new this week</span>
            <span className="dl-state" data-s="check">
              Checked before posting
            </span>
          </m.li>
        ) : null}
        {rows.map((r) => {
          const fixed = r.issue === "fix" && step >= 2;
          const state = step < 1 ? "found" : r.issue === "old" ? "decide" : fixed ? (step >= 3 ? "verified" : "repaired") : r.issue === "fix" ? "fix" : "ok";
          return (
            <m.li layout transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }} key={r.id} className="dl-row" data-dim={sorted && r.issue === "old" ? "" : undefined}>
              <span className="dl-file">{r.file}</span>
              <span className="dl-from">{r.from}</span>
              <span className="dl-state" data-s={state}>
                {
                  {
                    found: "Found",
                    fix: "Fix first",
                    ok: "Minor issues",
                    decide: "Archive? Your team decides",
                    repaired: "Repaired",
                    verified: "Verified · record",
                  }[state]
                }
              </span>
            </m.li>
          );
        })}
      </ul>
      <figcaption>Illustration with sample files for a fictional city. Not real data.</figcaption>
    </figure>
  );
}
