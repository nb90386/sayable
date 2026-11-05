"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useScrollVars } from "@/lib/useScrollVars";
import { PVB } from "../doc/permit";
import { BrokenLayer, PermitSheet } from "../doc/PermitSheet";

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
    <section ref={ref} data-sc-act="opening" aria-labelledby="hero-title" className="opening relative">
      <div className="opening-stage">
        <div className="opening-copy wrap text-center">
          <h1 id="hero-title" className="display mx-auto text-[length:clamp(2.5rem,1.4rem+4.2vw,5.4rem)]">
            <span className="block">Public documents,</span> <span className="block">readable by everyone.</span>
          </h1>
          <p className="lede mx-auto mt-5 !max-w-[42ch]">
            Sayable finds the documents residents rely on, repairs the structure screen readers depend on, and shows exactly
            what was checked.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/contact?topic=audit" className="btn">
              Request a Readiness Audit
            </Link>
            <Link href="#problem-title" className="link-quiet">
              Hear the difference <span aria-hidden="true" data-icon="chev"></span>
            </Link>
          </div>
        </div>

        <div className="opening-doc">
          <div className="opening-tilt">
            <PermitSheet label="A residential permit application from a fictional city. As you scroll, a scan reveals its hidden structure: five fields with no accessible name, a title tagged as plain text, and a footer that a screen reader reads first.">
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

        <p className="opening-caption wrap text-center" aria-hidden="true">
          Under the paper: five fields with no name, a title that is not a heading, and a footer read first.
          <span className="mt-1 block text-[0.85rem] text-muted">Illustrative sample. Fictional city.</span>
        </p>
      </div>
    </section>
  );
}
