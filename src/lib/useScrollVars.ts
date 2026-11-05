"use client";
import { useEffect, useRef } from "react";

/**
 * Writes the section's scroll progress (0 → 1 across its scrollable length) to
 * the CSS variable --p on the element, once per frame while it is near view.
 * No React re-render per frame: everything that moves reads --p in CSS.
 * Under reduced motion --p is pinned to `reducedValue`.
 */
export function useScrollVars<T extends HTMLElement>(opts: { reducedValue?: number; onProgress?: (p: number) => void } = {}) {
  const ref = useRef<T | null>(null);
  const { reducedValue = 1, onProgress } = opts;
  const cb = useRef(onProgress);
  useEffect(() => {
    cb.current = onProgress;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", String(reducedValue));
      cb.current?.(reducedValue);
      return;
    }
    let raf = 0;
    let visible = true;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / span));
      el.style.setProperty("--p", p.toFixed(4));
      cb.current?.(p);
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible) onScroll();
    });
    io.observe(el);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      raf = 0;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedValue]);
  return ref;
}
