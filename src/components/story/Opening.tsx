"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useScrollVars } from "@/lib/useScrollVars";
import { PVB } from "../doc/permit";
import { BrokenLayer, PermitSheet, SheetLegend } from "../doc/PermitSheet";

/**
 * Chapter 1. A centred claim over a large pinned document. Scrolling moves a
 * scan line down the page; above the line the hidden structure shows through.
 */
export function Opening() {
  const ref = useScrollVars<HTMLElement>({
    reducedValue: 1,
    // publish the rendered scan position for the Scroll Craft verification harness
    onProgress: (p) => {
      const el = ref.current;
      if (!el) return;
      const scan = Math.min(1, Math.max(0, (p - 0.06) / 0.74));
      const caption = Math.min(1, Math.max(0, (p - 0.6) * 5));
      el.setAttribute("data-sc-verify-state", `${scan.toFixed(2)}|${caption.toFixed(2)}`);
      // the resolved frame (scan done, caption shown) is an authored hold
      if (scan >= 1 && caption >= 1) el.setAttribute("data-sc-verify-hold", "true");
      else el.removeAttribute("data-sc-verify-hold");
    },
  });
  // Scroll Craft verification harness waits for this marker before sampling.
  useEffect(() => document.documentElement.classList.add("sc-ready"), []);
  return (
    <>
    <section ref={ref} data-sc-act="opening" aria-labelledby="hero-title" className="opening relative">
      <div className="opening-stage">
        <div className="opening-copy wrap text-center">
          <h1 id="hero-title" className="display mx-auto max-w-[19ch] text-[length:clamp(2.3rem,1.25rem+3.7vw,4.75rem)]">
            Many city PDFs can&apos;t be read by people who use <span className="tone">screen readers.</span>
          </h1>
          <p className="lede mx-auto mt-5 !max-w-[56ch] text-pretty !text-ink-soft">
            Sayable finds the PDFs on your website that have this problem, fixes them starting with the ones residents rely on most, and gives you a
            record of what was checked. Under the current federal ADA rule, cities of 50,000 or more residents must meet the WCAG 2.1 AA accessibility
            standard by April&nbsp;26,&nbsp;2027.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/check" className="btn">
              Check a PDF, free
            </Link>
            <Link href="/contact?topic=audit" className="btn btn-quiet">
              Request a Readiness Audit
            </Link>
          </div>
          <ul className="hero-points mx-auto mt-7" aria-label="At a glance">
            <li>The free check never uploads your file</li>
            <li>A person reviews every repair</li>
          </ul>
        </div>

        <div className="opening-doc">
          <div className="opening-tilt">
            <PermitSheet label="A residential permit application from a fictional city. As you scroll, a scan reveals its hidden structure: four text fields and three check boxes with no accessible name, a title tagged as plain text, and a footer that a screen reader reads first.">
              {null}
            </PermitSheet>
            <svg viewBox={PVB} className="opening-xray" aria-hidden="true">
              <rect width="850" height="1100" fill="rgb(36 88 232 / 0.035)" />
              <BrokenLayer />
            </svg>
            <div className="opening-scan" aria-hidden="true">
              <span className="mono">Reading structure</span>
            </div>
          </div>
        </div>


      </div>
    </section>
      <div className="opening-caption wrap text-center">
        <p>Under the paper: four text fields and three check boxes with no name, a title that is not a heading, and a footer read first.</p>
        <p className="mt-1 text-[0.85rem] font-[450] text-muted">Illustrative sample. Fictional city.</p>
        <SheetLegend layer="broken" className="mx-auto mt-6 max-w-[22rem] !text-[0.92rem] !font-[450]" />
      </div>
    </>
  );
}
