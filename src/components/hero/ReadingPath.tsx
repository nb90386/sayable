"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useInView";
import { NoticePage, VB, blocks, fields, thCells } from "../doc/notice";

type State = "posted" | "fixed";

const by = (id: string) => blocks.find((b) => b.id === id)!;

/** Where a screen reader goes on the untagged file: footer first, then a scramble. */
const tangledOrder = ["foot", "seal", "h1", "form", "body", "table", "figure", "sub", "h2"];
/** The reading order after repair. */
const fixedOrder = ["h1", "sub", "body", "h2", "table", "figure", "form"];

const centre = (id: string) => {
  const b = by(id);
  return { x: b.x + b.w * 0.42, y: b.y + Math.min(b.h * 0.5, 40) };
};

function tangledPath() {
  const pts = tangledOrder.map(centre);
  let d = `M ${pts[0]!.x} ${pts[0]!.y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]!;
    const b = pts[i]!;
    // exaggerated, alternating handles make the line overshoot and loop back on itself
    const s = i % 2 ? 1 : -1;
    const k = 0.55;
    d += ` C ${a.x + s * 260 * k} ${a.y - 140 * k}, ${b.x - s * 300 * k} ${b.y + 160 * k}, ${b.x} ${b.y}`;
  }
  return d;
}

function fixedPath() {
  const pts = fixedOrder.map((id) => {
    const b = by(id);
    return { x: b.x - 24, y: b.y + Math.min(b.h / 2, 26) };
  });
  let d = `M ${pts[0]!.x} ${pts[0]!.y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]!;
    const b = pts[i]!;
    if (Math.abs(a.y - b.y) < 4) d += ` C ${a.x + 70} ${a.y - 52}, ${b.x - 70} ${b.y - 52}, ${b.x} ${b.y}`;
    else {
      const m = (a.y + b.y) / 2;
      d += ` C ${a.x - 18} ${m}, ${b.x - 18} ${m}, ${b.x} ${b.y}`;
    }
  }
  return { d, pts };
}

const snags = [
  { id: "foot", label: "Footer read first", dx: -10, dy: 34 },
  { id: "h1", label: "Title is plain text", dx: 150, dy: -46 },
  { id: "table", label: "No header cells", dx: 250, dy: -36 },
  { id: "form", label: "Fields have no names", dx: 60, dy: 96 },
];

const fixedTags: Record<string, string> = {
  h1: "H1",
  sub: "P",
  body: "P",
  h2: "H2",
  table: "Table · header cells",
  figure: 'Figure · alt "Map: 410 Main St"',
  form: "Form · 2 named fields",
};

export function ReadingPath() {
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<State>("posted");
  const [run, setRun] = useState(0); // bump to replay the choreography
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const fixed = fixedPath();

  const play = useCallback(() => {
    timers.current.forEach(clearTimeout);
    setState("posted");
    setRun((r) => r + 1);
    timers.current = [setTimeout(() => setState("fixed"), 3200)];
  }, []);

  // Autoplay once on load (reduced motion: show the resolved document, still switchable).
  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => setState("fixed"), 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(play, 350);
    return () => {
      clearTimeout(t);
      timers.current.forEach(clearTimeout);
    };
  }, [reduced, play]);

  // A little physical tilt with the pointer, fine pointers only.
  useEffect(() => {
    if (reduced) return;
    const el = stageRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(loop) : 0;
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

  const choose = (s: State) => {
    timers.current.forEach(clearTimeout);
    setState(s);
  };

  return (
    <div className="rp" data-state={state} key={run}>
      <div ref={stageRef} className="rp-stage" aria-hidden="true">
        <svg viewBox={VB} className="rp-sheet block h-auto w-full">
          <NoticePage />

          {/* tangled path: the untagged file */}
          <g className="rp-tangle">
            <path d={tangledPath()} pathLength={100} className="rp-tangle-line" />
            {snags.map((s, i) => {
              const c = centre(s.id);
              const w = s.label.length * 9.2 + 26;
              return (
                <g key={s.id} className="rp-snag" style={{ ["--i" as string]: i }}>
                  <circle cx={c.x} cy={c.y} r="13" className="rp-knot" />
                  <circle cx={c.x} cy={c.y} r="5" className="rp-knot-core" />
                  <g transform={`translate(${Math.min(c.x + s.dx - w / 2, 850 - w - 8)} ${c.y + s.dy})`}>
                    <rect width={w} height="30" rx="15" className="rp-snag-chip" />
                    <text x="13" y="20" className="rp-snag-text">
                      {s.label}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* resolved structure */}
          <g className="rp-fix">
            {blocks
              .filter((b) => b.order)
              .map((b, i) => (
                <rect
                  key={b.id}
                  x={b.x - 8}
                  y={b.y - 8}
                  width={b.w + 16}
                  height={b.h + 16}
                  rx="8"
                  className="rp-box"
                  style={{ ["--i" as string]: i }}
                />
              ))}
            {thCells.map((c, i) => (
              <rect key={i} x={c.x + 3} y={c.y + 3} width={c.w - 6} height={c.h - 6} rx="4" className="rp-th" />
            ))}
            {fields.map((f, i) => (
              <rect key={i} x={f.x - 2} y={f.y - 2} width={f.w + 4} height={f.h + 4} rx="4" className="rp-th" />
            ))}
            <path d={fixed.d} pathLength={100} className="rp-fix-line" />
            {fixed.pts.map((p, i) => (
              <g key={i} transform={`translate(${p.x} ${p.y})`} className="rp-node" style={{ ["--i" as string]: i }}>
                <circle r="15" />
                <text y="5.5" textAnchor="middle">
                  {i + 1}
                </text>
              </g>
            ))}
            {fixedOrder.map((id, i) => {
              const b = by(id);
              const label = fixedTags[id]!;
              const w = label.length * 8.6 + 22;
              return (
                <g key={id} transform={`translate(${b.x + b.w - w + 8} ${b.y - 24})`}>
                  <g className="rp-chip" style={{ ["--i" as string]: i }}>
                    <rect width={w} height="26" rx="13" />
                    <text x="11" y="17.5">
                      {label}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div role="radiogroup" aria-label="Show the document" className="rp-toggle">
          {(
            [
              ["posted", "As posted"],
              ["fixed", "After Sayable"],
            ] as const
          ).map(([v, l]) => (
            <button key={v} type="button" role="radio" aria-checked={state === v} onClick={() => choose(v)}>
              {l}
            </button>
          ))}
        </div>
        {!reduced ? (
          <button type="button" onClick={play} className="link-quiet !min-h-11 text-[0.95rem]">
            <span data-icon="play" aria-hidden="true"></span> Replay the reading path
          </button>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        {state === "posted"
          ? "Illustration, as posted: a city notice of public hearing without tags. The reading path starts at the page footer, then jumps between the seal, title, comment form and fee table. Four problems are marked: footer read first, title is plain text, the table has no header cells, and the form fields have no names."
          : "Illustration, after Sayable: the same notice with structure. The reading path now runs in order from the level-one heading, through the paragraphs, the level-two heading, the fee table with header cells, the map with alternative text, to the comment form with two named fields."}
      </p>
    </div>
  );
}
