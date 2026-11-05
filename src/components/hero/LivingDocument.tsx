"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useInView";
import { NoticePage, VB, blocks, fields, nodePoint, readingPath, thCells } from "../doc/notice";

const GLYPHS = "‹›/=#·:_01ΔHPTLFR";

/** Scramble text toward its final value as `t` goes 0 → 1. */
function decode(final: string, t: number, seed: number) {
  if (t >= 1) return final;
  const reveal = Math.floor(final.length * t);
  let out = final.slice(0, reveal);
  for (let i = reveal; i < final.length; i++) {
    const c = final[i]!;
    out += c === " " ? " " : GLYPHS[(i * 7 + seed + Math.floor(t * 40)) % GLYPHS.length];
  }
  return out;
}

/**
 * Hero visual: the visible page, with its semantic structure layer floating
 * above it in space. Structure assembles once on load, then can be toggled.
 */
export function LivingDocument() {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState(0); // 0 page, 1 outlines, 2 tags, 3 reading order
  const [decodeT, setDecodeT] = useState(0);
  const [show, setShow] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);

  // Entrance choreography.
  useEffect(() => {
    if (reduced) return;
    const t1 = setTimeout(() => setPhase(1), 700);
    const t2 = setTimeout(() => setPhase(2), 1350);
    const t3 = setTimeout(() => setPhase(3), 2100);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [reduced]);

  // Tag text decode, one rAF loop for all tags.
  useEffect(() => {
    if (phase < 2 || decodeT >= 1) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
      setDecodeT(t);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Pointer parallax: lerped CSS variables, only while the pointer moves.
  useEffect(() => {
    if (reduced) return;
    const el = stageRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const on = show ? (reduced ? 3 : phase) : 0;
  const dt = reduced ? 1 : decodeT;
  const ordered = blocks.filter((b) => b.order);

  return (
    <div className="living-doc relative" data-phase={on}>
      <div ref={stageRef} className="ld-stage" aria-hidden="true">
        <div className="ld-rig">
          {/* The visible page */}
          <svg viewBox={VB} className="ld-page sheet block h-auto w-full" role="presentation">
            <NoticePage />
          </svg>

          {/* The hidden structure, lifted off the page */}
          <svg viewBox={VB} className="ld-structure absolute inset-0 h-full w-full overflow-visible" role="presentation">
            <g className="ld-leaf">
              <rect x="-8" y="-18" width="866" height="1136" rx="2" className="ld-leaf-sheet" />
              <rect x="-8" y="-18" width="866" height="30" className="ld-leaf-hinge" />
              <circle cx="150" cy="-3" r="6.5" className="ld-leaf-punch" />
              <circle cx="700" cy="-3" r="6.5" className="ld-leaf-punch" />
            </g>
            <g className="ld-outlines">
              {blocks.map((b) => (
                <rect
                  key={b.id}
                  x={b.x - 8}
                  y={b.y - 8}
                  width={b.w + 16}
                  height={b.h + 16}
                  rx="3"
                  pathLength={100}
                  className={b.order ? "ld-box" : "ld-box ld-box-artifact"}
                />
              ))}
              {thCells.map((c, i) => (
                <rect key={i} x={c.x + 4} y={c.y + 4} width={c.w - 8} height={c.h - 8} pathLength={100} className="ld-box ld-box-th" />
              ))}
              {fields.map((f, i) => (
                <rect key={i} x={f.x - 3} y={f.y - 3} width={f.w + 6} height={f.h + 6} pathLength={100} className="ld-box ld-box-th" />
              ))}
            </g>

            <g className="ld-tags">
              {blocks.map((b, i) => {
                const label = decode(b.tag, dt, i * 3);
                const w = b.tag.length * 8.4 + 18;
                const x = b.id === "seal" ? b.x + b.w - w + 8 : b.x + b.w + 8 - w;
                const y = b.y - 30;
                return (
                  <g key={b.id} transform={`translate(${x} ${y})`}>
                    <g className={b.order ? "ld-tag" : "ld-tag ld-tag-artifact"}>
                      <rect width={w} height="22" rx="2" />
                      <text x="9" y="15.5">
                        {label}
                      </text>
                    </g>
                  </g>
                );
              })}
              {thCells.map((c, i) => (
                <g key={i} transform={`translate(${c.x + c.w - 36} ${c.y + 12})`}>
                  <g className="ld-tag ld-tag-mini">
                    <rect width="28" height="20" rx="2" />
                    <text x="6" y="14">TH</text>
                  </g>
                </g>
              ))}
              {fields.map((f, i) => (
                <g key={i} transform={`translate(${f.x + 8} ${f.y + 9})`}>
                  <g className="ld-tag ld-tag-mini">
                    <rect width={f.name.length * 7.6 + 12} height="20" rx="2" />
                    <text x="6" y="14">{decode(f.name, dt, 20 + i)}</text>
                  </g>
                </g>
              ))}
            </g>

            <g className="ld-order">
              <path d={readingPath()} pathLength={100} className="ld-path" />
              {ordered.map((b) => {
                const p = nodePoint(b);
                return (
                  <g key={b.id} transform={`translate(${p.x} ${p.y})`} className="ld-node" style={{ ["--o" as string]: b.order }}>
                    <circle r="13" />
                    <text y="4.5" textAnchor="middle">
                      {b.order}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pl-1">
        <p className="tag !text-ink-soft">ACC-2026-0412 · example notice, fictional city</p>
        <button
          type="button"
          aria-pressed={show}
          onClick={() => setShow((v) => !v)}
          className="group inline-flex min-h-11 items-center gap-3 text-sm font-[540]"
        >
          <span
            aria-hidden="true"
            className={`relative h-5 w-9 rounded-full border transition-colors duration-300 ${show ? "border-signal bg-signal" : "border-ink/40 bg-transparent"}`}
          >
            <span
              className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full transition-all duration-500 ease-[var(--ease-out-expo)] ${
                show ? "left-[18px] bg-white" : "left-[2px] bg-ink/60"
              }`}
            />
          </span>
          Show hidden structure
        </button>
      </div>

      <p className="sr-only">
        Illustration: a city notice of public hearing. Its hidden structure is shown as labels — a level-one heading, two
        paragraphs, a level-two heading, a fee table with header cells, a map with alternative text, and a comment form
        whose two fields have names — connected by a numbered reading order from 1 to 7. The letterhead seal and page
        footer are marked as artifacts so a screen reader skips them.
      </p>
    </div>
  );
}
