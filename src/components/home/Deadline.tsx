"use client";

import { m, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const STEPS = [
  { k: "Find", t: "Every PDF your public website links to, and the page it sits on." },
  { k: "Prioritize", t: "What residents use now first. Archived files flagged for your team to decide." },
  { k: "Repair", t: "The documents people need, fixed and checked by a person." },
  { k: "Verify", t: "Each file re-checked, with a record of what changed and what wasn’t claimed." },
  { k: "Keep up", t: "New agendas and notices checked before they go up. Repair of new packets is a limited pilot." },
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
        <h2 id="deadline-title" className="deadline-title">
          Most of the work happens before the date. Finding it comes first.
        </h2>
        <div id="rule" className="dl-rule" tabIndex={-1}>
          <p className="dl-rule-head">Which date applies</p>
          <dl className="dl-dates">
            <div>
              <dt>April 26, 2027</dt>
              <dd>State and local governments with a total population of 50,000 or more.</dd>
            </div>
            <div>
              <dt>April 26, 2028</dt>
              <dd>Governments with a total population under 50,000, and all special district governments.</dd>
            </div>
          </dl>
          <p className="dl-rule-note">
            Total population is your city or county&rsquo;s population in the 2020 Census, not the number of people you serve or your staff. The standard is
            WCAG 2.1 AA, for web content and mobile apps.
          </p>
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
        <div id="why-now" className="why-now">
          <h3 id="why-title" className="why-title">
            Why it matters now
          </h3>
          <dl className="why-list">
            <div>
              <dt>Residents can already ask.</dt>
              <dd>
                The ADA&rsquo;s effective communication duty applies today. Anyone can ask for a document in a form they can use, even when an exception
                covers the file.
              </dd>
            </div>
            <div>
              <dt>Complaints and lawsuits are how the rule is enforced.</dt>
              <dd>
                There is no automatic fine per document. People can complain to the Justice Department or sue in federal court, and settlements usually require
                repairing documents, training staff and reporting progress. In 2014 the{" "}
                <a href="https://archive.ada.gov/occ.htm" className="text-link" rel="noopener noreferrer">
                  Orange County, Florida clerk
                </a>{" "}
                settled a complaint about scanned court PDFs on those terms.
              </dd>
            </div>
            <div>
              <dt>The dates themselves are being challenged.</dt>
              <dd>
                In May 2026 the National Federation of the Blind sued the Justice Department in federal court in Maryland, arguing the one-year extension was
                issued unlawfully (
                <a href="https://clearinghouse.net/case/48281/" className="text-link" rel="noopener noreferrer">
                  No. 1:26-cv-02007
                </a>
                ). As of November 2026 the court has not ruled, and the dates above are the ones in effect. Filing the case did not change them.
              </dd>
            </div>
            <div>
              <dt>Not every old file needs fixing. Two exceptions, with conditions.</dt>
              <dd>
                <strong>Archived content:</strong> made before the date, kept only for reference, research or recordkeeping, not changed after it was archived,
                and kept in an area clearly marked as archived.{" "}
                <strong>Documents posted before the date</strong>, such as old PDFs, are also excepted, unless people use them now to apply for, get or take part
                in a service. New agendas and minutes posted after the date are covered. Your team decides case by case, with your counsel, and writes the
                decision down.
              </dd>
            </div>
          </dl>
          <p className="deadline-source">
            General information, not legal advice. Sources:{" "}
            <a href="https://www.ada.gov/resources/web-rule-first-steps/" className="text-link" rel="noopener noreferrer">
              ADA.gov first steps
            </a>
            ,{" "}
            <a href="https://www.govinfo.gov/app/details/FR-2026-04-20/2026-07663" className="text-link" rel="noopener noreferrer">
              the April 20, 2026 interim final rule
            </a>
            ,{" "}
            <a
              href="https://democracyforward.org/news/press-releases/national-federation-of-the-blind-sues-trump-vance-administration-over-delays-to-critical-website-accessibility-protections/"
              className="text-link"
              rel="noopener noreferrer"
            >
              the plaintiffs&rsquo; announcement
            </a>
            .{" "}
            <a href="/resources/title-ii-rule-and-your-pdfs" className="text-link">
              Our plain-English guide to the rule
            </a>
            .
          </p>
        </div>
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
              Pilot: checked before posting
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
