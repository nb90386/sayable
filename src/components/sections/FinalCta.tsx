"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * Closing scene: scattered glyph fragments settle into the ordered lines of a
 * page — ambiguity into structure. Canvas runs only while visible and stops
 * once settled. Reduced motion draws the settled state once.
 */
function useOrderCanvas(ref: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GL = "PHTDLIFRAa/<>=#·01";
    type P = { x: number; y: number; tx: number; ty: number; vx: number; vy: number; g: string; a: number; hot: boolean };
    let ps: P[] = [];
    let w = 0, h = 0, raf = 0, visible = false, settled = false;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Target: a page of text lines on the right side (or bottom on small screens).
      const small = w < 768;
      const pw = small ? w * 0.78 : Math.min(w * 0.3, 380);
      const px = small ? (w - pw) / 2 : w * 0.64;
      const py = small ? h * 0.06 : h * 0.18;
      const lh = small ? 13 : 15;
      const lines = Math.floor((small ? h * 0.32 : h * 0.62) / lh);
      const step = 7;
      ps = [];
      for (let l = 0; l < lines; l++) {
        const isHead = l === 0 || l === 7 || l === 15;
        const len = isHead ? 0.55 : l % 6 === 5 ? 0.45 : 0.82 + ((l * 37) % 17) / 100;
        for (let x = 0; x < pw * Math.min(len, 1); x += isHead ? step - 2 : step) {
          const seed = Math.sin(l * 91.7 + x * 3.1) * 1e4;
          const r = seed - Math.floor(seed);
          ps.push({
            tx: px + x,
            ty: py + l * lh + (isHead ? -2 : 0),
            x: r * w,
            y: ((seed * 7) % 1 + 1) % 1 * h,
            vx: 0,
            vy: 0,
            g: GL[Math.floor(r * GL.length)]!,
            a: isHead ? 0.95 : 0.5,
            hot: isHead,
          });
        }
      }
      if (reduced) ps.forEach((p) => ((p.x = p.tx), (p.y = p.ty)));
      settled = false;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = "10px ui-monospace, monospace";
      let moving = 0;
      for (const p of ps) {
        if (!reduced) {
          const ax = (p.tx - p.x) * 0.012;
          const ay = (p.ty - p.y) * 0.012;
          p.vx = (p.vx + ax) * 0.88;
          p.vy = (p.vy + ay) * 0.88;
          p.x += p.vx;
          p.y += p.vy;
          if (Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.4) moving++;
        }
        const d = Math.min(1, (Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y)) / 120);
        ctx.globalAlpha = p.a * (0.35 + 0.65 * (1 - d));
        ctx.fillStyle = p.hot ? "#a99dff" : "#ecebf5";
        if (d < 0.05) ctx.fillRect(p.x, p.y - 3, p.hot ? 5 : 5.5, p.hot ? 3 : 2);
        else ctx.fillText(p.g, p.x, p.y);
      }
      ctx.globalAlpha = 1;
      if (reduced || moving === 0) settled = true;
    };

    const loop = () => {
      draw();
      if (visible && !settled) raf = requestAnimationFrame(loop);
      else raf = 0;
    };

    build();
    draw();
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible && !raf && !settled) raf = requestAnimationFrame(loop);
    }, { threshold: 0.25 });
    io.observe(canvas);
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        build();
        ps.forEach((p) => ((p.x = p.tx), (p.y = p.ty)));
        draw();
      }, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [ref]);
}

export function FinalCta() {
  const ref = useRef<HTMLCanvasElement>(null);
  useOrderCanvas(ref);
  return (
    <section aria-labelledby="cta-title" className="night on-night relative overflow-hidden border-b" style={{ borderColor: "var(--rule-night)" }}>
      <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="wrap relative pb-28 pt-[52vw] sm:pb-40 md:pt-44">
        <div className="max-w-[44rem]">
          <p className="eyebrow">Start here</p>
          <h2 id="cta-title" className="display mt-7 text-[length:var(--step-5)]">
            Start with what is <em>already posted.</em>
          </h2>
          <p className="lede mt-8 !max-w-[44ch]">
            Send us your public website. We will scope a readiness audit of the documents on it — what must be fixed,
            what can be archived, and what it will take — or talk through a small pilot first.
          </p>
          <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/contact?topic=audit" className="btn btn-night">
              Request an audit <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/contact?topic=pilot" className="link-quiet text-moon">
              Discuss a pilot <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
