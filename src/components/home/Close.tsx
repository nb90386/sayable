"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { PermitSheet } from "@/components/doc/PermitSheet";

/**
 * The ending. The pile from the story has become three neat things: the audit,
 * the repaired form, and its report. They settle into one stack as the reader
 * arrives, and the page then lifts away to show the footer underneath.
 */
export function Close() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const p = reduced ? null : scrollYProgress;
  const s1 = useTransform(scrollYProgress, [0, 1], [-14, -5]);
  const x1 = useTransform(scrollYProgress, [0, 1], [-90, -18]);
  const s2 = useTransform(scrollYProgress, [0, 1], [10, 3]);
  const x2 = useTransform(scrollYProgress, [0, 1], [90, 22]);
  const y0 = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <section ref={ref} aria-labelledby="close-title" className="close" data-sc-act="close">
      <div className="wrap close-grid">
        <div className="close-stack" aria-hidden="true">
          <m.div className="close-sheet close-cover" style={p ? { rotate: s1, x: x1, y: y0 } : { rotate: -5, x: -18 }}>
            <p className="text-[0.78rem] font-[600] text-muted">Sample, fictional city</p>
            <p className="mt-3 font-display text-[1.45rem] leading-[1.05]">PDF Readiness Audit</p>
            <p className="mt-1 text-[0.8rem] text-muted">City of Alder Creek</p>
            <div className="mt-5 grid gap-1.5">
              {[
                ["Found", "w-[88%]"],
                ["Residents use", "w-[34%] bg-warm"],
                ["Need a specialist", "w-[14%] bg-warm/60"],
                ["May be excepted", "w-[46%]"],
              ].map(([k, w]) => (
                <div key={k}>
                  <p className="text-[0.72rem] text-muted">{k}</p>
                  <div className={`mt-0.5 h-1.5 rounded-full bg-ink/25 ${w}`} />
                </div>
              ))}
            </div>
          </m.div>
          <m.div className="close-sheet close-report" style={p ? { rotate: s2, x: x2, y: y0 } : { rotate: 3, x: 22 }}>
            <p className="mono text-[0.7rem] text-muted">permit-application.pdf</p>
            <p className="mt-2 text-[0.8rem] font-[650]">Repair report</p>
            {["Fields named", "Reading order fixed", "Heading tagged", "Listened to"].map((t) => (
              <p key={t} className="mt-1.5 flex items-center gap-1.5 text-[0.76rem]">
                <span className="text-signal" data-icon="check" />
                {t}
              </p>
            ))}
          </m.div>
          <m.div className="close-permit" style={p ? { y: y0 } : undefined}>
            <PermitSheet layer="none" />
          </m.div>
        </div>

        <div className="close-copy">
          <h2 id="close-title" className="close-title">
            Know what you have. Fix what residents need first.
          </h2>
          <p className="lede mt-6">
            A Readiness Audit lists every PDF on your website, sorts them, and gives you an effort estimate and a plan. One flat fee, quoted in writing before
            you commit.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/contact?topic=audit" className="btn">
              Request a Readiness Audit <span className="arrow" aria-hidden="true" data-icon="arrow-r" />
            </Link>
            <Link href="/check" className="link-quiet !text-ink underline decoration-[var(--rule-strong)] underline-offset-[0.25em]">
              Or check one PDF first, free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
