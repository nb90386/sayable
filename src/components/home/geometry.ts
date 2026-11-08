/**
 * Geometry for the homepage document story, in stage pixels, computed from the
 * stage size so one set of keyframes drives every width.
 *
 * The city's documents live in a shallow 3D volume in front of a camera: a card
 * at depth z is drawn at scale F / (F + z). Coordinates are centre points.
 * The collection is an illustration: counts, kinds and shares are invented for
 * the picture and labelled as such on the page.
 */

export type Pt = { x: number; y: number; s: number };
export type DocPt = Pt & { rx: number; ry: number };
export type Rect = { x: number; y: number; w: number; h: number };
export type Kind = "permit" | "agenda" | "notice" | "budget" | "minutes" | "form";
export type Card = {
  kind: Kind;
  /** projected position and scale in the city view */
  cx: number;
  cy: number;
  cs: number;
  /** depth haze, 0 near to 1 far */
  haze: number;
  /** where it starts, tucked behind the permit form */
  ox: number;
  oy: number;
  /** stack it is filed into, and its place in the pile */
  g: number;
  sx: number;
  sy: number;
  rot: number;
  appear: number;
  delay: number;
};
export type Stack = { key: string; title: string; note: string; tone: "fix" | "decide" | "check"; x: number; base: number; top: number; count: number; w: number };
export type Tag = { kind: Kind; label: string; x: number; y: number };

export type Geo = {
  W: number;
  H: number;
  narrow: boolean;
  docW: number;
  docH: number;
  card: { w: number; h: number };
  centre: { x: number; y: number };
  doc: { a: DocPt; b: DocPt; city: DocPt; stack: DocPt; e: DocPt; f: DocPt };
  report: { x: number; y: number; w: number; from: number };
  cards: Card[];
  stacks: Stack[];
  tags: Tag[];
};

/** Illustrative shares. Shown on the page as an illustration, not real data. */
const STACKS: Omit<Stack, "x" | "base" | "top" | "count" | "w">[] = [
  { key: "use", title: "Residents use these now", note: "Fix first", tone: "fix" },
  { key: "old", title: "Archived or out of date", note: "May be excepted. Your team decides.", tone: "decide" },
  { key: "hard", title: "Scans and complex tables", note: "Need a specialist", tone: "fix" },
  { key: "new", title: "Posted every month", note: "Check before posting", tone: "check" },
];
const SHARE = [0.24, 0.42, 0.13, 0.21];
const KINDS: Kind[] = ["agenda", "permit", "notice", "budget", "minutes", "form"];
const KIND_LABEL: Record<Kind, string> = {
  agenda: "Meeting agendas",
  permit: "Permit applications",
  notice: "Public notices",
  budget: "Budget reports",
  minutes: "Council minutes",
  form: "Inspection forms",
};

/** Small deterministic random so the server and client draw the same city. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const HEADER = 56;
export const RATIO = 1100 / 850;
const F = 900;

const overlaps = (a: Rect, b: Rect) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

/**
 * `figure` lays the same objects out for a static illustration (reduced motion)
 * instead of the scroll stage. `heroBottom` is the measured bottom of the hero copy.
 */
export function geometry(W: number, H: number, figure = false, heroBottom = 0): Geo {
  const narrow = W < 900;
  const g = Math.max(16, Math.min(48, W * 0.035));
  const top = figure ? 0 : HEADER;
  const avail = H - top;

  // Phones: the visual owns the top of the stage, the copy the bottom.
  const vzH = narrow && !figure ? H * 0.55 - top : avail;
  const docW = narrow ? Math.min(W * 0.72, (vzH - 20) / RATIO, 440) : Math.min(W * 0.36, (avail * 0.86) / RATIO, 620);
  const docH = docW * RATIO;
  const midY = top + vzH / 2;

  const cardW = narrow ? 46 : 84;
  const card = { w: cardW, h: cardW * RATIO };
  const centre = narrow ? { x: W / 2, y: top + vzH * 0.5 } : { x: figure ? W / 2 : W * 0.62, y: top + avail * 0.5 };

  // Keep the near cards out of the words.
  const copyBox: Rect = figure
    ? { x: -1, y: -1, w: 0, h: 0 }
    : narrow
      ? { x: 0, y: H * 0.55, w: W, h: H }
      : { x: 0, y: top, w: Math.min(W * 0.36, 30 * 16 + g), h: avail * 0.62 };

  const rand = rng(11);
  const N = narrow ? 70 : 118;
  const cards: Card[] = [];
  let guard = 0;
  while (cards.length < N && guard++ < N * 40) {
    // more cards far away than near, like a room full of filing
    const z = Math.pow(rand(), 0.85) * 2000 + 120;
    const s = F / (F + z);
    const spanX = (narrow ? W * 0.62 : W * 0.56) / s;
    const spanY = (narrow ? vzH * 0.62 : avail * 0.62) / s;
    const x = (rand() * 2 - 1) * spanX;
    const y = (rand() * 2 - 1) * spanY;
    const px = centre.x + x * s;
    const py = centre.y + y * s;
    const w = card.w * s;
    const h = card.h * s;
    const r: Rect = { x: px - w / 2, y: py - h / 2, w, h };
    if (px < -w || px > W + w || py < top - h * 0.3 || py > (narrow && !figure ? H * 0.56 : H) + h * 0.2) continue;
    if (s > 0.3 && overlaps(r, copyBox)) continue;
    // a clear space around the permit form, so it stays the thing you follow
    if (Math.abs(px - centre.x) < card.w * 0.95 && Math.abs(py - centre.y) < card.h * 0.95) continue;
    const u = rand();
    let grp = 0;
    let acc = 0;
    for (let i = 0; i < SHARE.length; i++) {
      acc += SHARE[i]!;
      grp = i;
      if (u <= acc) break;
    }
    cards.push({
      kind: KINDS[Math.floor(rand() * KINDS.length)]!,
      cx: px,
      cy: py,
      cs: s,
      haze: Math.min(1, z / 2300),
      ox: centre.x + (rand() - 0.5) * card.w * 0.4,
      oy: centre.y + (rand() - 0.5) * card.h * 0.3,
      g: grp,
      sx: 0,
      sy: 0,
      rot: 0,
      appear: Math.min(1, Math.hypot(px - centre.x, py - centre.y) / Math.hypot(W * 0.6, H * 0.6)),
      delay: rand() * 0.25,
    });
  }
  // draw far to near
  cards.sort((a, b) => a.cs - b.cs);

  // Stacks: piles of paper on one floor, height in proportion to their share.
  const counts = STACKS.map((_, i) => cards.filter((c) => c.g === i).length);
  const pileStep = narrow ? 1.5 : 2.4;
  const stacks: Stack[] = [];
  STACKS.forEach((meta, i) => {
    let x: number;
    let base: number;
    let w: number;
    if (narrow) {
      w = W * 0.44;
      x = W * (i % 2 === 0 ? 0.27 : 0.73);
      base = top + vzH * (i < 2 ? 0.4 : 0.84);
    } else {
      const span = Math.min(W * 0.5, 820);
      const left = (figure ? W / 2 : W * 0.63) - span / 2;
      x = left + (span / 3) * i;
      base = top + avail * 0.7;
      w = Math.min(208, (span / 3) * 0.94);
    }
    stacks.push({ ...meta, x, base, top: base - counts[i]! * pileStep - card.h * 0.92, count: counts[i]!, w });
  });
  const filled = STACKS.map(() => 0);
  const r2 = rng(5);
  // Fill each pile from the bottom; the permit form ends up on top of the first.
  for (const c of [...cards].sort((a, b) => b.cs - a.cs)) {
    const k = filled[c.g]!++;
    const st = stacks[c.g]!;
    c.sx = st.x + (r2() - 0.5) * 5;
    c.sy = st.base - card.h * 0.46 - k * pileStep;
    c.rot = (r2() - 0.5) * 0.06;
  }

  // A few near cards carry a label in the city view, one of each kind.
  const tags: Tag[] = [];
  if (!figure) {
    const seen = new Set<Kind>();
    for (const c of [...cards].sort((a, b) => b.cs - a.cs)) {
      if (seen.has(c.kind) || c.cs < 0.42) continue;
      if (c.cx < g + 60 || c.cx > W - g - 60) continue;
      if (tags.some((t) => Math.abs(t.x - c.cx) < 150 && Math.abs(t.y - c.cy) < 60)) continue;
      seen.add(c.kind);
      tags.push({ kind: c.kind, label: KIND_LABEL[c.kind], x: c.cx, y: c.cy + (card.h * c.cs) / 2 + 6 });
      if (tags.length >= (narrow ? 3 : 5)) break;
    }
  }

  const sCard = (card.w * 1.35) / docW;
  const topOf0 = stacks[0]!;
  const stackPt: DocPt = { x: topOf0.x, y: topOf0.base - card.h * 0.62 - counts[0]! * pileStep - pileStep * 2, s: sCard, rx: 0, ry: 0 };

  const flat = (x: number, y: number, s: number): DocPt => ({ x, y, s, rx: 0, ry: 0 });
  let doc: Geo["doc"];
  if (figure) {
    const s = Math.min(1, (H - 24) / docH);
    doc = {
      a: flat(W / 2, H / 2, s),
      b: flat(W / 2, H / 2, s),
      city: flat(centre.x, centre.y, sCard),
      stack: stackPt,
      e: flat(W / 2, H / 2, s),
      f: flat(narrow ? W / 2 : W * 0.36, H / 2, Math.min(0.82, s)),
    };
  } else if (narrow) {
    const sA = Math.min((W * 0.9) / docW, 1.35);
    doc = {
      a: { x: W / 2, y: Math.max(H * 0.62, heroBottom + 28) + (docH * sA) / 2, s: sA, rx: 14, ry: 0 },
      b: flat(W / 2, midY, 1),
      city: flat(centre.x, centre.y, sCard),
      stack: stackPt,
      e: flat(W / 2, midY, 1),
      f: flat(W * 0.4, midY - 6, 0.82),
    };
  } else {
    const sA = Math.min((W * 0.44) / docW, 1.3);
    doc = {
      a: { x: W * 0.735, y: top + avail * 0.1 + (docH * sA) / 2, s: sA, rx: 9, ry: -13 },
      b: flat(W * 0.64, top + avail / 2, 1),
      city: flat(centre.x, centre.y, sCard),
      stack: stackPt,
      e: flat(W * 0.39, top + avail / 2, 1.04),
      f: flat(W * 0.5, top + avail / 2, 0.86),
    };
  }

  const reportW = narrow ? Math.min(W - 2 * g - 8, 380) : Math.min(500, W * 0.33);
  const report = figure
    ? { x: narrow ? W / 2 : W * 0.68, y: H / 2, w: narrow ? Math.min(W - 2 * g, 380) : Math.min(460, W * 0.42), from: W / 2 }
    : narrow
      ? { x: W / 2 + 8, y: midY - 4, w: reportW, from: W / 2 }
      : { x: W * 0.5 + docW * 0.86 * 0.38 + reportW * 0.42, y: top + avail / 2 + 16, w: reportW, from: W * 0.5 + docW * 0.86 * 0.15 };

  return { W, H, narrow, docW, docH, card, centre, doc, report, cards, stacks, tags };
}
