"use client";

import { useInView } from "@/lib/useInView";

/**
 * The reading path between sections: a wide pale band with a thin line that
 * draws itself when it scrolls into view. Purely decorative.
 */
export function Ribbon({
  d = "M -40 120 C 220 30, 420 210, 720 120 S 1180 20, 1480 110",
  band = 64,
  viewBox = "0 0 1440 220",
  className = "",
}: {
  d?: string;
  band?: number;
  viewBox?: string;
  className?: string;
}) {
  const [ref, inView] = useInView<SVGSVGElement>({ rootMargin: "0px 0px -10% 0px" });
  return (
    <svg ref={ref} viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true" className={`ribbon ${inView ? "is-in" : ""} ${className}`}>
      <path d={d} className="ribbon-band" strokeWidth={band} />
      <path d={d} className="ribbon-line" pathLength={100} />
    </svg>
  );
}
