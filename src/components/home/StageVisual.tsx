import { m, useMotionTemplate, useMotionValueEvent, useTransform, type MotionValue } from "motion/react";
import { useEffect, useId, useRef } from "react";
import { BrokenLayer, FixedLayer, brokenOrder, fixedOrder, orderedPath } from "@/components/doc/PermitSheet";
import { PVB, PermitPage, regions } from "@/components/doc/permit";
import type { Card, Geo, Kind } from "./geometry";
import { hex, mix, rgb, type Palette } from "./palette";

/**
 * Progress stops for the whole story (0 to 1 over the pinned track).
 * A hero, B the scan finds the problem, C one form becomes the city's collection,
 * D the collection sorts into piles, E the form comes back and is repaired, F its record.
 */
export const P = {
  aHold: 0.03,
  b0: 0.045,
  b1: 0.12,
  scan1: 0.235,
  path1: 0.255,
  c0: 0.27,
  c1: 0.37,
  cFull: 0.43,
  d0: 0.46,
  d1: 0.58,
  e0: 0.625,
  e1: 0.69,
  fix0: 0.705,
  fix1: 0.79,
  f0: 0.82,
  f1: 0.9,
} as const;

/**
 * What the Sayable scan finds on the sample form, in document order, in plain words,
 * and the illustrative correction that follows each one. `at` is where the element
 * starts and `fix` where its correction appears, as shares of the page height. The
 * scan line is driven only by scroll: nothing moves until the visitor scrolls. The
 * first finding is visible from the start, so the problem is clear before any scroll.
 * Technical identifiers live in the story's Technical details for specialists.
 */
export const FINDINGS = [
  {
    id: "title",
    at: 0,
    fix: 0.17,
    text: "This title isn\u2019t recognized as a heading.",
    fixText: "Now identified as the form\u2019s main heading.",
    detail: "Tagged as a paragraph (P); retagged as H1.",
    heard: "Residential permit application.",
    heardFixed: "Residential Permit Application. Heading level 1.",
  },
  {
    id: "name",
    at: 318 / 1100,
    fix: 318 / 1100 + 0.075,
    text: "A screen reader can\u2019t tell what this field is for.",
    fixText: "The field is now named \u201cApplicant name\u201d.",
    detail: "Field had no accessible name (empty TU), like seven others on the page, including the three check boxes.",
    heard: "Edit text. Blank.",
    heardFixed: "Applicant name. Edit text. Required.",
  },
  {
    id: "work",
    at: 652 / 1100,
    fix: 652 / 1100 + 0.075,
    text: "These checkboxes have no names and aren\u2019t grouped.",
    fixText: "Each option is labeled and grouped under its question.",
    detail: "Three check boxes, no names, no group label; now named and grouped as \u201cType of work\u201d.",
    heard: "Check box. Not checked. Check box. Not checked.",
    heardFixed: "Type of work. New construction, check box.",
  },
  {
    id: "footer",
    at: 1010 / 1100,
    fix: 0.975,
    text: "The page is read starting at the footer.",
    fixText: "The reading order now follows the page.",
    detail: "Tag order began with the footer text; footer now marked as an artifact and order follows the layout.",
    heard: "Page 1 of 2.",
    heardFixed: "Residential Permit Application. Heading level 1.",
  },
] as const;

/**
 * The scan position (share of the page) for a scroll progress `v`. Zero until the visitor scrolls.
 * On phones the form first travels up into view, so the scan waits until it has settled.
 */
export const scanFrom = (v: number, narrow = false) => {
  const from = narrow ? P.b1 - 0.01 : 0;
  return clamp01((v - from) / (P.scan1 - from));
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ── The city's collection, drawn on one canvas ─────────────────────────────

type CardState = { x: number; y: number; w: number; h: number; a: number; haze: number; rot: number; tone: number };

function cardState(c: Card, v: number, geo: Geo): CardState | null {
  const pc = clamp01((v - P.c0) / (P.cFull - P.c0));
  const t = ease(clamp01((pc * 1.5 - c.appear * 0.7 - c.delay * 0.6) / 0.55));
  if (t <= 0) return null;
  const pd = clamp01((v - P.d0) / (P.d1 - P.d0));
  const td = ease(clamp01((pd - c.delay) / 0.75));
  const pe = clamp01((v - P.e0) / (P.e1 - P.e0));

  // out from behind the form into the room
  let x = lerp(c.ox, c.cx, t);
  let y = lerp(c.oy, c.cy, t);
  let s = lerp(c.cs * 0.35, c.cs, t);
  if (td > 0) {
    // along a gentle arc onto its pile
    const mx = (c.cx + c.sx) / 2;
    const my = Math.min(c.cy, c.sy) - (geo.narrow ? 40 : 90);
    const u = 1 - td;
    x = u * u * c.cx + 2 * u * td * mx + td * td * c.sx;
    y = u * u * c.cy + 2 * u * td * my + td * td * c.sy;
    s = lerp(c.cs, 0.92, td);
  }
  // the piles settle back while the form comes forward
  y += pe * 26;
  s *= 1 - 0.12 * pe;
  return {
    x,
    y,
    w: geo.card.w * s,
    h: geo.card.h * s,
    a: t * (1 - pe),
    haze: lerp(c.haze, 0, td),
    rot: c.rot * td,
    tone: td,
  };
}

function drawCard(ctx: CanvasRenderingContext2D, kind: Kind, st: CardState, group: number, pal: Palette, ground: [number, number, number], alpha: number) {
  const { x, y, w, h, haze } = st;
  const paper = mix(pal.sheet, ground, haze * 0.82);
  ctx.save();
  ctx.translate(x, y);
  if (st.rot) ctx.rotate(st.rot);
  ctx.globalAlpha = alpha;
  // contact shadow, stronger when near
  ctx.fillStyle = `rgba(0,0,0,${0.22 * (1 - haze)})`;
  ctx.fillRect(-w / 2 + w * 0.03, -h / 2 + h * 0.035, w, h);
  ctx.fillStyle = rgb(paper);
  ctx.fillRect(-w / 2, -h / 2, w, h);
  const ink = rgb(mix(pal.ink, paper, 0.35 + haze * 0.5));
  const faint = rgb(mix(pal.ink, paper, 0.72 + haze * 0.2));
  const l = -w / 2 + w * 0.12;
  const iw = w * 0.76;
  const T = -h / 2 + h * 0.1;
  const lh = Math.max(0.7, h * 0.022);
  ctx.fillStyle = ink;
  ctx.fillRect(l, T, iw * 0.44, lh);
  ctx.fillRect(l, T + h * 0.07, iw * (kind === "notice" ? 0.9 : 0.66), Math.max(1, h * 0.045));
  if (w > 16) {
    ctx.fillStyle = faint;
    ctx.strokeStyle = faint;
    ctx.lineWidth = Math.max(0.5, w * 0.008);
    const b = T + h * 0.2;
    if (kind === "permit" || kind === "form") {
      for (let i = 0; i < 4; i++) ctx.strokeRect(l, b + i * h * 0.15, iw * (i === 1 ? 0.5 : 1), h * 0.07);
    } else if (kind === "budget") {
      for (let i = 0; i < 7; i++) ctx.fillRect(l, b + i * h * 0.085, iw, lh * 0.7);
      for (let i = 1; i < 4; i++) ctx.fillRect(l + (iw * i) / 4, b, lh * 0.7, h * 0.52);
    } else if (kind === "agenda") {
      for (let i = 0; i < 7; i++) {
        ctx.fillRect(l, b + i * h * 0.085, w * 0.04, lh * 1.4);
        ctx.fillRect(l + w * 0.08, b + i * h * 0.085, iw * (0.5 + ((i * 37) % 40) / 100), lh);
      }
    } else if (kind === "notice") {
      ctx.strokeRect(l, b, iw, h * 0.34);
      for (let i = 0; i < 4; i++) ctx.fillRect(l + iw * 0.08, b + h * 0.06 + i * h * 0.07, iw * 0.84, lh);
      for (let i = 0; i < 3; i++) ctx.fillRect(l, b + h * 0.42 + i * h * 0.07, iw, lh);
    } else {
      for (let i = 0; i < 11; i++) ctx.fillRect(l, b + i * h * 0.058, iw * (i % 4 === 3 ? 0.6 : 1), lh);
    }
  }
  // the pile's colour, on the top edge, once it has been sorted
  if (st.tone > 0.02 && group !== 1) {
    ctx.globalAlpha = alpha * clamp01(st.tone * 1.6);
    ctx.fillStyle = group === 3 ? pal.check : pal.fix;
    ctx.fillRect(-w / 2, -h / 2, w, Math.max(2, h * 0.06));
  }
  ctx.restore();
}

function City({ p, geo, pal }: { p: MotionValue<number>; geo: Geo; pal: Palette }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const last = useRef({ v: 0, t: 0 });
  const dusk = hex(pal.dusk.base);

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
    const now = performance.now();
    const dt = Math.max(8, now - last.current.t);
    const vel = Math.abs(v - last.current.v) / dt;
    last.current = { v, t: now };
    if (v < P.c0 - 0.004 || v > P.e1 + 0.01) return;

    // Shadows under the piles once they start to form.
    const pd = clamp01((v - P.d0) / (P.d1 - P.d0));
    const pe = clamp01((v - P.e0) / (P.e1 - P.e0));
    if (pd > 0) {
      for (const s of geo.stacks) {
        const g = ctx.createRadialGradient(s.x, s.base + 4, 2, s.x, s.base + 4, geo.card.w * 0.9);
        g.addColorStop(0, `rgba(0,0,0,${0.35 * pd * (1 - pe)})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(s.x - geo.card.w, s.base - 10, geo.card.w * 2, 30);
      }
    }

    // Motion blur: while the collection is moving fast, draw where each card just was, faintly.
    const moving = (v > P.c0 && v < P.cFull) || (v > P.d0 && v < P.d1 + 0.02);
    const trail = moving ? Math.min(0.012, vel * 40) : 0;
    for (const card of geo.cards) {
      if (trail > 0.0015) {
        for (let k = 3; k >= 1; k--) {
          const g = cardState(card, v - trail * k, geo);
          if (g) drawCard(ctx, card.kind, g, card.g, pal, dusk, g.a * 0.13);
        }
      }
      const st = cardState(card, v, geo);
      if (st) drawCard(ctx, card.kind, st, card.g, pal, dusk, st.a);
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

// ── The scan: a reading line that tracks the form ──────────────────────────

const ELEMENTS = ["title", "intro", "name", "phone", "address", "work", "signature", "date", "footer"] as const;
const PROBLEM = new Set(["title", "name", "phone", "address", "work", "signature", "footer"]);
const DOC_H = 1100;

/**
 * Light, particles and corner marks where the line crosses the form's structure.
 * Everything is a pure function of the scan position, so scrolling back plays it backwards.
 */
function ScanFx({ scan, phase, docW }: { scan: MotionValue<number>; phase: MotionValue<number>; docW: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const draw = () => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const back = Math.min(1400, Math.round(docW * Math.min(2, window.devicePixelRatio || 1) * 1.3));
    const backH = Math.round(back * (DOC_H / 850));
    if (c.width !== back) {
      c.width = back;
      c.height = backH;
    }
    const k = back / 850;
    ctx.setTransform(k, 0, 0, k, 0, 0);
    ctx.clearRect(0, 0, 850, DOC_H);
    const ph = phase.get(); // 0 hidden, 1 problem scan, 2 repair scan
    const on = ph > 0.5;
    if (!on) return;
    const s = scan.get();
    const live = s > 0.001 && s < 0.999;
    const y = s * DOC_H;
    const repair = ph > 1.5;
    const hot = repair ? [27, 140, 100] : [207, 69, 32];
    const line = repair ? "27,110,82" : "27,90,69";

    // a soft band of light just behind the line
    if (live) {
    const band = ctx.createLinearGradient(0, y - 150, 0, y);
    band.addColorStop(0, `rgba(${line},0)`);
    band.addColorStop(1, `rgba(${line},0.09)`);
    ctx.fillStyle = band;
    ctx.fillRect(0, y - 150, 850, 150);

    for (const id of ELEMENTS) {
      const r = regions[id]!;
      const d = y - r.y;
      if (d < -10 || d > r.h + 140) continue;
      const flagged = repair || PROBLEM.has(id);
      const col = flagged ? hot : [40, 44, 42];
      // corner marks flash as the line enters, then settle
      const flash = clamp01(1 - Math.abs(d - Math.min(r.h, 40)) / 90);
      ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.25 + 0.6 * flash})`;
      ctx.lineWidth = 2.2;
      const L = 14;
      const x0 = r.x - 8;
      const x1 = r.x + r.w + 8;
      const y0 = r.y - 8;
      const y1 = Math.min(r.y + r.h + 8, y);
      ctx.beginPath();
      ctx.moveTo(x0, y0 + L);
      ctx.lineTo(x0, y0);
      ctx.lineTo(x0 + L, y0);
      ctx.moveTo(x1 - L, y0);
      ctx.lineTo(x1, y0);
      ctx.lineTo(x1, y0 + L);
      if (y1 > y0 + L) {
        ctx.moveTo(x0, y1 - L);
        ctx.lineTo(x0, y1);
        ctx.moveTo(x1, y1 - L);
        ctx.lineTo(x1, y1);
      }
      ctx.stroke();
      // particles thrown off where the line meets the element's edges
      for (let i = 0; i < 9; i++) {
        const e = ((i * 53) % 97) / 97;
        const born = r.y + e * Math.max(r.h, 24);
        const age = (y - born) / 70;
        if (age < 0 || age > 1) continue;
        const side = i % 2 ? 1 : -1;
        const px = (side > 0 ? x1 : x0) + side * age * (18 + ((i * 29) % 20));
        const py = born - age * (6 + (i % 3) * 5);
        const a = (1 - age) * (flagged ? 0.9 : 0.5);
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${a})`;
        const sz = 3 + (i % 3);
        ctx.fillRect(px - sz / 2, py - sz / 2, sz, sz);
      }
    }
    }

    // Numbered marks in the margin, matching the findings listed beside the form.
    if (!repair) {
      FINDINGS.forEach((f, n) => {
        const r = regions[f.id]!;
        const a = n === 0 ? 1 : clamp01((s - f.at) / 0.03);
        if (a <= 0) return;
        const cy = r.y + Math.min(r.h / 2, 24);
        ctx.globalAlpha = a;
        ctx.fillStyle = s >= f.fix ? "#1b5a45" : "#a33612";
        ctx.beginPath();
        ctx.arc(34, cy, 19, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "600 21px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(n + 1), 34, cy + 1);
        ctx.globalAlpha = 1;
      });
    }
  };
  useMotionValueEvent(scan, "change", draw);
  useMotionValueEvent(phase, "change", draw);
  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docW]);
  return <canvas ref={ref} aria-hidden="true" className="scan-fx" />;
}

const CHIP: Record<string, string> = { title: "Heading", name: "\u201cApplicant name\u201d", work: "\u201cType of work\u201d, grouped" };

/** One finding on the form: its problem while the scan is on it, then its illustrative correction. */
function Correction({ f, first, scan }: { f: (typeof FINDINGS)[number]; first: boolean; scan: MotionValue<number> }) {
  const broken = useTransform(scan, (s) => (s >= f.fix ? clamp01(1 - (s - f.fix) / 0.02) : first ? 1 : clamp01((s - f.at) / 0.02)));
  const fixed = useTransform(scan, (s) => clamp01((s - f.fix) / 0.02));
  if (f.id === "footer") {
    return (
      <>
        <m.path style={{ opacity: broken }} d={orderedPath(brokenOrder, true)} fill="none" stroke="#cf4520" strokeWidth="2.6" strokeOpacity="0.9" strokeLinecap="round" />
        <m.path style={{ opacity: fixed }} d={orderedPath(fixedOrder, false)} fill="none" stroke="#1b5a45" strokeWidth="3.2" strokeLinecap="round" />
      </>
    );
  }
  const r = regions[f.id]!;
  const label = CHIP[f.id] ?? "";
  const w = label.length * 8.6 + 30;
  return (
    <>
      <m.rect style={{ opacity: broken }} x={r.x - 6} y={r.y - 6} width={r.w + 12} height={r.h + 12} rx="8" fill="rgb(207 69 32 / 0.07)" stroke="#cf4520" strokeWidth="2.6" strokeDasharray="10 7" />
      <m.g style={{ opacity: fixed }}>
        <rect x={r.x - 6} y={r.y - 6} width={r.w + 12} height={r.h + 12} rx="8" fill="rgb(27 90 69 / 0.06)" stroke="#1b5a45" strokeWidth="2.4" />
        <g transform={`translate(${r.x + r.w - w + 6} ${r.y - 22})`}>
          <rect width={w} height="30" rx="15" fill="#1b5a45" />
          <text x="15" y="20.5" fontFamily="var(--font-sans)" fontWeight="600" fontSize="15" fill="#fff">
            {label}
          </text>
        </g>
      </m.g>
    </>
  );
}

/** The four findings and their corrections, all driven by the same scan position. */
function ScanCorrections({ scan }: { scan: MotionValue<number> }) {
  return (
    <g>
      {FINDINGS.map((f, i) => (
        <Correction key={f.id} f={f} first={i === 0} scan={scan} />
      ))}
    </g>
  );
}

/** A clip rectangle that follows a motion value without re-rendering. */
function ClipRect({ box }: { box: MotionValue<number[]> }) {
  const ref = useRef<SVGRectElement>(null);
  const set = (b: number[]) => {
    ref.current?.setAttribute("y", String(b[0]));
    ref.current?.setAttribute("height", String(Math.max(0, b[1]!)));
  };
  useMotionValueEvent(box, "change", set);
  useEffect(() => set(box.get()), [box]);
  return <rect ref={ref} x="-60" width="970" y="-60" height="0" />;
}

// ── The stage ───────────────────────────────────────────────────────────────

/**
 * Everything the visitor looks at in the story: the permit form, the city's
 * collection it belongs to, and the report that comes back. Purely visual; the
 * words live in the copy layer. `p` can be a live scroll value or a fixed one.
 */
export function StageVisual({
  p,
  geo,
  pal,
  children,
  docTag,
}: {
  p: MotionValue<number>;
  geo: Geo;
  pal: Palette;
  children?: React.ReactNode;
  /** Something that travels with the document itself (in its 3D space), e.g. the deadline tab. */
  docTag?: React.ReactNode;
}) {
  const uid = useId().replace(/:/g, "");
  const { doc, report } = geo;
  const stops = [0, P.aHold, P.b1, P.c0, P.c1, P.d0, P.d1, P.e0, P.e1, P.fix1 + 0.008, P.f0 + 0.03, 1];
  const pick = (k: "x" | "y" | "s") => [doc.a, doc.a, doc.b, doc.b, doc.city, doc.city, doc.stack, doc.stack, doc.e, doc.e, doc.f, doc.f].map((d) => d[k]);
  const x = useTransform(p, stops, pick("x"));
  const y = useTransform(p, stops, pick("y"));
  const scale = useTransform(p, stops, pick("s"));
  const rotateX = useTransform(p, [0, P.aHold, P.b1], [doc.a.rx, doc.a.rx, 0]);
  const rotateY = useTransform(p, [0, P.aHold, P.b1], [doc.a.ry, doc.a.ry, 0]);
  // The form never leaves: in the city it is a card among cards, lit a little brighter.
  const glow = useTransform(p, [P.c0, P.c1, P.d1, P.e0, P.e1], [0, 1, 1, 0.6, 0.35]);
  const ring = useTransform(p, [P.c1 - 0.02, P.c1, P.e0, P.e0 + 0.02], [0, 1, 1, 0]);

  // Scan position, as a share of the page height.
  const scanB = useTransform(p, (v) => scanFrom(v, geo.narrow));
  const scanE = useTransform(p, [P.fix0, P.fix1], [0, 1]);
  const scan = useTransform([p, scanB, scanE] as MotionValue<number>[], ([v, b, e]: number[]) => (v! < (P.c0 + P.e0) / 2 ? b! : e!));
  const phase = useTransform(p, (v): number => (v < P.scan1 + 0.004 ? 1 : v > P.fix0 - 0.004 && v < P.fix1 + 0.004 ? 2 : 0));
  const scanY = useTransform(scan, (s) => s * geo.docH);
  const lineO = useTransform([p, scan] as MotionValue<number>[], ([v, s]: number[]) => {
    const inB = v! < P.scan1;
    const inE = v! > P.fix0 && v! < P.fix1;
    return (inB || inE) && s! < 0.996 ? 1 : 0;
  });
  const labelB = useTransform(p, (v) => (v < P.c0 ? 1 : 0));

  // Layers on the page. In the scan, the problems show above the line; in the repair, the fix shows above it and the problems below.
  const mid = (P.c0 + P.e0) / 2;
  const brokenB = useTransform(p, [0, P.c0, P.c0 + 0.025], [1, 1, 0]);
  const brokenE = useTransform(p, [P.e0 + 0.02, P.e1 - 0.005], [0, 1]);
  const brokenDraw = useTransform(p, [P.scan1 - 0.01, P.path1, P.e0, P.e1], [0, 1, 1, 1]);
  const brokenBox = useTransform([p, scan] as MotionValue<number>[], ([v, s]: number[]) => (v! < mid ? [-60, s! * DOC_H + 60] : [s! * DOC_H, DOC_H + 60 - s! * DOC_H]));
  const fixedBox = useTransform(scan, (s) => [-60, s * DOC_H + 60]);
  const fixedO = useTransform(p, [P.fix0 - 0.005, P.fix0], [0, 1]);
  const fixedDraw = useTransform(p, [P.fix0, P.fix1 + 0.03], [0, 1]);

  const rx = useTransform(p, [P.f0 + 0.015, P.f1], [report.from, report.x]);
  const rReveal = useTransform(p, [P.f0 + 0.015, P.f1 - 0.02], [135, 0]);
  const rOpacity = useTransform(p, [P.f0 + 0.01, P.f0 + 0.02], [0, 1]);
  const rClip = useMotionTemplate`inset(-40px calc(${rReveal}% - 40px) -80px -40px)`;
  const rRotate = useTransform(p, [P.f0 + 0.015, P.f1], [2, -1]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <City p={p} geo={geo} pal={pal} />
      <div className="absolute inset-0" style={{ perspective: 2000, perspectiveOrigin: "60% 40%" }}>
        <m.div className="story-doc" style={{ width: geo.docW, height: geo.docH, marginLeft: -geo.docW / 2, marginTop: -geo.docH / 2, x, y, scale, rotateX, rotateY }}>
          <m.div className="story-doc-glow" style={{ opacity: glow }} />
          <m.div className="story-doc-ring" style={{ opacity: ring }} />
          <div className="story-doc-under" />
          <svg viewBox={PVB} className="story-doc-page">
            <defs>
              <clipPath id={`broken-${uid}`}>
                <ClipRect box={brokenBox} />
              </clipPath>
              <clipPath id={`fixed-${uid}`}>
                <ClipRect box={fixedBox} />
              </clipPath>
            </defs>
            <PermitPage />
            <m.g style={{ opacity: brokenB }}>
              <g clipPath={`url(#broken-${uid})`}>
                <BrokenLayer plain noPath skip={["name", "work"]} />
              </g>
              <ScanCorrections scan={scanB} />
            </m.g>
            <m.g style={{ opacity: brokenE, ["--draw" as string]: brokenDraw }}>
              <g clipPath={`url(#broken-${uid})`}>
                <BrokenLayer plain />
              </g>
            </m.g>
            <m.g style={{ opacity: fixedO, ["--draw" as string]: fixedDraw }} clipPath={`url(#fixed-${uid})`}>
              <FixedLayer />
            </m.g>
          </svg>
          <ScanFx scan={scan} phase={phase} docW={geo.docW} />
          <m.div className="scan-line" style={{ y: scanY, opacity: lineO }}>
            <m.span style={{ opacity: labelB }}>Sayable scan</m.span>
          </m.div>
          {docTag}
        </m.div>
        <m.div className="story-report" style={{ width: report.w, marginLeft: -report.w / 2, x: rx, y: report.y, rotate: rRotate, opacity: rOpacity }}>
          <m.div className="report-clip" style={{ clipPath: rClip }}>
            <ReportCard />
          </m.div>
        </m.div>
      </div>
      {children}
    </div>
  );
}

/** The record that comes back with a repaired file. Sample content for the fictional form. */
export function ReportCard() {
  return (
    <div className="report-card">
      <div className="report-head">
        <div>
          <p className="report-title">Repair report</p>
          <p className="report-file">permit-application.pdf</p>
        </div>
        <p className="report-sample">Sample · fictional city</p>
      </div>
      <dl className="report-finding">
        <div>
          <dt>Finding</dt>
          <dd>Eight form fields have no accessible name</dd>
        </div>
        <div>
          <dt>Evidence</dt>
          <dd>The fields carry no name or tooltip, so a screen reader says &ldquo;edit text, blank&rdquo;</dd>
        </div>
        <div>
          <dt>Correction</dt>
          <dd>Each field named from the label printed beside it</dd>
        </div>
        <div>
          <dt>Re-checked</dt>
          <dd>Automated PDF/UA checks, then a person listened with a screen reader</dd>
        </div>
      </dl>
      <ul className="report-more">
        <li>
          <span>Reading order started at the footer</span> Now follows the page
        </li>
        <li>
          <span>Title tagged as plain text</span> Now the main heading
        </li>
      </ul>
      <p className="report-limit">
        <strong>Limits</strong> Plain-language wording was not reviewed. This is a record of the work, not a legal certification.
      </p>
    </div>
  );
}
