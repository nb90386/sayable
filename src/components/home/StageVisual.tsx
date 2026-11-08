import { m, useMotionValueEvent, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import { BrokenLayer, FixedLayer } from "@/components/doc/PermitSheet";
import { PVB, PermitPage } from "@/components/doc/permit";
import type { Geo } from "./geometry";

/**
 * Progress stops for the whole story (0 to 1 over the pinned track).
 * A: hero, B: the hidden problem, C: one becomes thousands, D: the sort,
 * E: the repair, F: the record.
 */
export const P = {
  aHold: 0.05,
  b0: 0.11,
  b1: 0.16,
  bOut: 0.28,
  c0: 0.3,
  c1: 0.42,
  d0: 0.47,
  d1: 0.61,
  e0: 0.65,
  e1: 0.72,
  fix0: 0.75,
  fix1: 0.8,
  f0: 0.84,
  f1: 0.9,
} as const;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** The pile of public documents, drawn on one canvas: hundreds of sheets for the cost of one layer. */
function Archive({ p, geo }: { p: MotionValue<number>; geo: Geo }) {
  const ref = useRef<HTMLCanvasElement>(null);

  const draw = (v: number) => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (c.width !== Math.round(geo.W * dpr) || c.height !== Math.round(geo.H * dpr)) {
      c.width = Math.round(geo.W * dpr);
      c.height = Math.round(geo.H * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, geo.W, geo.H);
    if (v < P.c0 - 0.005 || v > P.e1 + 0.01) return;

    const pc = clamp01((v - P.c0) / (P.c1 - P.c0));
    const pd = clamp01((v - P.d0) / (P.d1 - P.d0));
    const fade = 1 - clamp01((v - P.e0) / (P.e1 - P.e0 - 0.02));
    const heroShown = v > P.c1 - 0.004 && v < P.e0;
    const { w, h, k } = geo.tile;

    for (const t of geo.tiles) {
      if (t.hero && !heroShown) continue;
      const appear = t.hero ? 1 : clamp01((pc * 1.35 - t.dist) / 0.3);
      if (appear <= 0) continue;
      const tt = ease(clamp01((pd - t.delay) / 0.7));
      const x = t.gx + (t.sx - t.gx) * tt;
      const y = t.gy + (t.sy - t.gy) * tt;
      const s = (0.55 + 0.45 * appear) * (1 + (k - 1) * tt);
      const tw = w * s;
      const th = h * s;
      // Archived files settle back once sorted; the rest stay bright.
      const dim = t.g === 1 ? 1 - 0.5 * tt : 1;
      ctx.globalAlpha = appear * fade * dim;
      ctx.fillStyle = "#efe9dc";
      ctx.fillRect(x - tw / 2, y - th / 2, tw, th);
      ctx.fillStyle = "rgba(23,21,15,0.32)";
      ctx.fillRect(x - tw / 2 + tw * 0.14, y - th / 2 + th * 0.14, tw * 0.56, Math.max(1, th * 0.05));
      ctx.fillStyle = "rgba(23,21,15,0.16)";
      for (let l = 0; l < 3; l++) ctx.fillRect(x - tw / 2 + tw * 0.14, y - th / 2 + th * (0.32 + l * 0.14), tw * 0.72, Math.max(0.6, th * 0.03));
      if (tt > 0.02 && t.g !== 1) {
        ctx.globalAlpha = appear * fade * clamp01(tt * 2);
        ctx.fillStyle = t.g === 3 ? "#8ed3b2" : "#ff9a72";
        ctx.fillRect(x - tw / 2, y - th / 2, tw, Math.max(2, th * 0.09));
      }
    }
    ctx.globalAlpha = 1;
  };

  useMotionValueEvent(p, "change", draw);
  useEffect(() => {
    draw(p.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo]);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}

/**
 * Everything the visitor looks at in the story: the permit form, the archive it
 * belongs to, and the report that comes back. Purely visual; the words live in
 * the copy layer. `p` can be a live scroll value or a fixed one for static figures.
 */
export function StageVisual({ p, geo, children }: { p: MotionValue<number>; geo: Geo; children?: React.ReactNode }) {
  const { doc, report } = geo;
  const stops = [0, P.aHold, P.b1, P.bOut, P.c1, P.e0 - 0.01, P.e0, P.e1, P.f0, P.f1, 1];
  const x = useTransform(p, stops, [doc.a.x, doc.a.x, doc.b.x, doc.b.x, doc.grid.x, doc.sorted.x, doc.sorted.x, doc.e.x, doc.e.x, doc.f.x, doc.f.x]);
  const y = useTransform(p, stops, [doc.a.y, doc.a.y, doc.b.y, doc.b.y, doc.grid.y, doc.sorted.y, doc.sorted.y, doc.e.y, doc.e.y, doc.f.y, doc.f.y]);
  const scale = useTransform(p, stops, [doc.a.s, doc.a.s, doc.b.s, doc.b.s, doc.grid.s, doc.sorted.s, doc.sorted.s, doc.e.s, doc.e.s, doc.f.s, doc.f.s]);
  const rotateX = useTransform(p, [0, P.aHold, P.b1], [doc.a.r, doc.a.r, 0]);
  const docOpacity = useTransform(p, [P.c1 - 0.012, P.c1 - 0.002, P.e0 - 0.004, P.e0], [1, 0, 0, 1]);
  // The page casts a deeper shadow while it is close to the reader.
  const shadow = useTransform(p, [0, P.b1, P.c0, P.c1], [0.5, 1, 1, 0]);

  const broken = useTransform(p, [P.b0, P.b1, P.c0, P.c0 + 0.04, P.e0 + 0.01, P.e1 - 0.02, P.fix0, P.fix1 - 0.01], [0, 1, 1, 0, 0, 1, 1, 0]);
  const brokenDraw = useTransform(p, [P.b0 + 0.01, P.b1 + 0.07, P.e0 + 0.01, P.e1], [0, 1, 1, 1]);
  const fixed = useTransform(p, [P.fix0, P.fix1], [0, 1]);
  const fixedDraw = useTransform(p, [P.fix0 + 0.005, P.fix1 + 0.03], [0, 1]);

  const rx = useTransform(p, [P.f0, P.f1], [report.from, report.x]);
  const rOpacity = useTransform(p, [P.f0, P.f0 + 0.03], [0, 1]);
  const rRotate = useTransform(p, [P.f0, P.f1], [4, -1.2]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Archive p={p} geo={geo} />
      <div className="absolute inset-0" style={{ perspective: 2200, perspectiveOrigin: "50% 30%" }}>
        <m.div
          className="story-doc"
          style={{ width: geo.docW, height: geo.docH, marginLeft: -geo.docW / 2, marginTop: -geo.docH / 2, x, y, scale, rotateX, opacity: docOpacity }}
        >
          <m.div className="story-doc-shadow" style={{ opacity: shadow }} />
          <svg viewBox={PVB} className="story-doc-page">
            <PermitPage />
            <m.g style={{ opacity: broken, ["--draw" as string]: brokenDraw }}>
              <BrokenLayer />
            </m.g>
            <m.g style={{ opacity: fixed, ["--draw" as string]: fixedDraw }}>
              <FixedLayer />
            </m.g>
          </svg>
        </m.div>
        <m.div
          className="story-report"
          style={{ width: report.w, marginLeft: -report.w / 2, x: rx, y: report.y, rotate: rRotate, opacity: rOpacity }}
        >
          <ReportCard />
        </m.div>
      </div>
      {children}
    </div>
  );
}

/** The record that comes back with a repaired file. Sample content for the fictional form. */
export function ReportCard() {
  const rows: [string, string][] = [
    ["Seven form fields had no spoken name", "Named from the labels printed beside them"],
    ["Reading order started at the footer", "Now follows the page, top to bottom"],
    ["Title was tagged as plain text", "Tagged as the main heading"],
  ];
  return (
    <div className="report-card">
      <div className="flex items-baseline justify-between gap-4 border-b pb-3 hairline">
        <p className="mono text-[0.78rem] text-ink-soft">permit-application.pdf</p>
        <p className="text-[0.74rem] font-[600] text-muted">Sample report</p>
      </div>
      <ol className="mt-1">
        {rows.map(([was, now]) => (
          <li key={was} className="grid grid-cols-[0.6rem_1fr] gap-x-3 border-b py-3 hairline">
            <span className="mt-[0.45rem] h-2 w-2 rounded-full bg-warm" />
            <span>
              <span className="block text-[0.9rem] leading-snug text-ink-soft line-through decoration-warm/60">{was}</span>
              <span className="mt-0.5 block text-[0.95rem] font-[600] leading-snug text-ink">{now}</span>
            </span>
          </li>
        ))}
      </ol>
      <dl className="mt-3 grid gap-1.5 text-[0.84rem] leading-snug">
        <div className="flex gap-2">
          <dt className="w-[6.2rem] shrink-0 text-muted">Re-checked</dt>
          <dd className="text-ink">PAC and veraPDF, free tools you can run too</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-[6.2rem] shrink-0 text-muted">Listened to</dt>
          <dd className="text-ink">By a person, with a screen reader</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-[6.2rem] shrink-0 text-muted">Not claimed</dt>
          <dd className="text-ink">Legal certification of compliance</dd>
        </div>
      </dl>
    </div>
  );
}
