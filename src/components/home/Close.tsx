"use client";

import { m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { PermitSheet } from "@/components/doc/PermitSheet";

/**
 * The ending. The story's dusk rises from the bottom of the page with a curved
 * edge and carries the result up with it: the audit, the repaired form and its
 * record, settling into one stack. One sentence, one action, then the footer,
 * which is the same dusk. Nothing is hidden behind the motion.
 */
export function Close() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const rise = useTransform(p, [0.05, 0.62], ["78%", "0%"]);
  const radius = useTransform(p, [0.05, 0.62], ["50% 50% 0 0 / 22vh 22vh 0 0", "50% 50% 0 0 / 0vh 0vh 0 0"]);
  const settle = useTransform(p, [0.2, 0.7], [0, 1]);
  const r1 = useTransform(settle, [0, 1], [-16, -5]);
  const x1 = useTransform(settle, [0, 1], [-110, -18]);
  const r2 = useTransform(settle, [0, 1], [12, 3]);
  const x2 = useTransform(settle, [0, 1], [110, 22]);
  const y0 = useTransform(settle, [0, 1], [70, 0]);
  // The header turns to the dusk material once the flood has reached it.
  useMotionValueEvent(p, "change", (v) => {
    const html = document.documentElement;
    if (v > 0.56) html.dataset.hdr = "night";
    else if (html.dataset.hdr && v > 0) delete html.dataset.hdr;
  });

  return (
    <section ref={ref} aria-labelledby="close-title" className="close" data-sc-act="close">
      <div className="close-stage">
        <m.div className="close-flood on-night" style={reduced ? undefined : { y: rise, borderRadius: radius }}>
          <div className="wrap close-grid">
            <div className="close-copy">
              <h2 id="close-title" className="close-title">
                Know what you have. Fix what residents need first.
              </h2>
              <p className="close-lede">One flat fee, quoted in writing before you commit. You get the inventory, the findings, the priorities and a plan.</p>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href="/contact?topic=audit" className="btn btn-night">
                  Request a Readiness Audit <span className="arrow" aria-hidden="true" data-icon="arrow-r" />
                </Link>
                <Link href="/check" className="close-quiet">
                  Or check one PDF first, free
                </Link>
              </div>
            </div>

            <div className="close-stack" aria-hidden="true">
              <m.div className="close-sheet close-cover" style={reduced ? { rotate: -5, x: -18 } : { rotate: r1, x: x1, y: y0 }}>
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
              <m.div className="close-sheet close-report" style={reduced ? { rotate: 3, x: 22 } : { rotate: r2, x: x2, y: y0 }}>
                <p className="text-[0.8rem] font-[650]">Repair report</p>
                <p className="text-[0.74rem] text-muted">permit-application.pdf</p>
                {["Fields named", "Reading order fixed", "Heading tagged", "Listened to"].map((t) => (
                  <p key={t} className="mt-1.5 flex items-center gap-1.5 text-[0.76rem]">
                    <span className="text-signal" data-icon="check" />
                    {t}
                  </p>
                ))}
              </m.div>
              <m.div className="close-permit" style={reduced ? undefined : { y: y0 }}>
                <PermitSheet layer="fixed" />
              </m.div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
