"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content is fully visible without JS or with reduced motion. */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    // Anything already on screen is shown immediately so nothing flashes hidden.
    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.95) el.classList.add("is-in");
    });
    root.classList.add("js-motion");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => !el.classList.contains("is-in") && io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
