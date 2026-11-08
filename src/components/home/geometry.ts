/**
 * Geometry for the homepage document story. Everything is computed in stage
 * pixels from the stage size, so one set of keyframes drives every width.
 *
 * Coordinates are centre points. The archive is an illustration: tile counts,
 * groups and shares are invented for the picture and labelled as such on the page.
 */

export type Pt = { x: number; y: number; s: number };
export type Rect = { x: number; y: number; w: number; h: number };
export type Tile = { gx: number; gy: number; sx: number; sy: number; g: number; dist: number; delay: number; hero: boolean };
export type Group = { key: string; title: string; note: string; tone: "fix" | "decide" | "check"; x: number; y: number; w: number; count: number };

export type Geo = {
  W: number;
  H: number;
  narrow: boolean;
  docW: number;
  docH: number;
  tile: { w: number; h: number; k: number };
  region: Rect;
  doc: { a: Pt & { r: number }; b: Pt; grid: Pt; sorted: Pt; e: Pt; f: Pt };
  report: { x: number; y: number; w: number; from: number };
  tiles: Tile[];
  groups: Group[];
  /** lowest point of the sorted archive */
  sortedBottom: number;
};

/** Illustrative shares. Shown on the page as "illustration, not real data". */
const GROUPS: Omit<Group, "x" | "y" | "w" | "count">[] = [
  { key: "use", title: "Residents use these now", note: "Fix first", tone: "fix" },
  { key: "old", title: "Archived or out of date", note: "May be excepted. Your team decides.", tone: "decide" },
  { key: "hard", title: "Scans and complex tables", note: "Need a specialist", tone: "fix" },
  { key: "new", title: "Posted every month", note: "Check before posting", tone: "check" },
];
const SHARE = [0.22, 0.46, 0.12, 0.2];

/** Small deterministic random so the server and client draw the same archive. */
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
const RATIO = 1100 / 850;

/**
 * `figure` lays the same objects out for a static, centred illustration
 * (reduced motion and the no-animation fallback) instead of the scroll stage.
 */
export function geometry(W: number, H: number, figure = false): Geo {
  const narrow = W < 900;
  const g = Math.max(16, Math.min(48, W * 0.035));
  const top = figure ? 0 : HEADER;

  // Visual zone: on phones the lower part of the stage belongs to the copy.
  const vz: Rect = narrow && !figure ? { x: g, y: top + 8, w: W - 2 * g, h: H * 0.57 - top - 8 } : { x: g, y: top, w: W - 2 * g, h: H - top };

  const docW = narrow ? Math.min(W * 0.66, (vz.h - 24) / RATIO, 420) : Math.min(W * 0.34, ((H - top) * 0.72) / RATIO, 560);
  const docH = docW * RATIO;
  const cy = vz.y + vz.h / 2;

  const tw = narrow ? 16 : 26;
  const tile = { w: tw, h: tw * RATIO, k: 0.74 };
  const gap = narrow ? 5 : 8;

  // Where the archive lives.
  const region: Rect = figure
    ? { x: g, y: 12, w: W - 2 * g, h: H - 24 }
    : narrow
      ? { x: g, y: vz.y, w: vz.w, h: vz.h }
      : { x: g, y: H * 0.4, w: W - 2 * g, h: H * 0.6 - g - 52 };

  // Archive grid, centred in the region.
  const cw = tile.w + gap;
  const ch = tile.h + gap;
  const cols = Math.max(5, Math.floor((region.w + gap) / cw));
  const rows = Math.max(4, Math.floor((region.h + gap) / ch));
  const ox = region.x + (region.w - (cols * cw - gap)) / 2 + tile.w / 2;
  const oy = region.y + (region.h - (rows * ch - gap)) / 2 + tile.h / 2;
  const hc = Math.floor(cols / 2);
  const hr = Math.floor(rows / 2);
  const maxD = Math.hypot(Math.max(hc, cols - hc), Math.max(hr, rows - hr));

  const rand = rng(7);
  const raw: { gx: number; gy: number; g: number; dist: number; delay: number; hero: boolean }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const hero = c === hc && r === hr;
      const u = rand();
      let grp = 0;
      let acc = 0;
      for (let i = 0; i < SHARE.length; i++) {
        acc += SHARE[i]!;
        if (u <= acc) {
          grp = i;
          break;
        }
        grp = i;
      }
      raw.push({
        gx: ox + c * cw,
        gy: oy + r * ch,
        g: hero ? 0 : grp,
        dist: Math.hypot(c - hc, r - hr) / maxD,
        delay: rand() * 0.3,
        hero,
      });
    }
  }

  // Sorted layout: each group packs its tiles under a label, smaller, like filed paper.
  const counts = GROUPS.map((_, i) => raw.filter((t) => t.g === i).length);
  const sw = tile.w * tile.k;
  const sh = tile.h * tile.k;
  const sgap = gap * tile.k;
  const scw = sw + sgap;
  const sch = sh + sgap;
  const label = narrow ? 34 : 70;
  const groups: Group[] = [];
  const slots: { x: number; y: number }[][] = [];

  if (narrow) {
    // Stacked bands, height proportional to how many rows each group needs.
    const gcols = Math.max(4, Math.floor((region.w + sgap) / scw));
    const need = counts.map((n) => label + Math.ceil(n / gcols) * sch);
    const total = need.reduce((a, b) => a + b, 0);
    const spare = Math.max(0, (region.h - total) / (GROUPS.length + 1));
    let y = region.y + Math.min(spare, 18);
    GROUPS.forEach((meta, i) => {
      groups.push({ ...meta, x: region.x, y, w: region.w, count: counts[i]! });
      const list: { x: number; y: number }[] = [];
      for (let k = 0; k < counts[i]!; k++) {
        list.push({ x: region.x + sw / 2 + (k % gcols) * scw, y: y + label + sh / 2 + Math.floor(k / gcols) * sch });
      }
      slots.push(list);
      y += need[i]! + Math.min(spare, 18);
    });
  } else {
    // Columns, width proportional to the group's share, never narrower than its label.
    const between = 28;
    const avail = region.w - between * (GROUPS.length - 1);
    const minW = Math.min(190, avail / 4);
    const widths = counts.map((n) => Math.max(minW, (avail * n) / Math.max(1, raw.length)));
    const scale = avail / widths.reduce((a, b) => a + b, 0);
    let x = region.x;
    GROUPS.forEach((meta, i) => {
      const w = widths[i]! * scale;
      const gcols = Math.max(2, Math.floor((w + sgap) / scw));
      groups.push({ ...meta, x, y: region.y, w, count: counts[i]! });
      const list: { x: number; y: number }[] = [];
      for (let k = 0; k < counts[i]!; k++) {
        list.push({ x: x + sw / 2 + (k % gcols) * scw, y: region.y + label + sh / 2 + Math.floor(k / gcols) * sch });
      }
      slots.push(list);
      x += w + between;
    });
  }

  const used = GROUPS.map(() => 0);
  const tiles: Tile[] = [];
  // The hero tile takes the first slot of its group so the story can find it again.
  const ordered = [...raw].sort((a, b) => Number(b.hero) - Number(a.hero));
  for (const t of ordered) {
    const slot = slots[t.g]![used[t.g]!++]!;
    tiles.push({ ...t, sx: slot.x, sy: slot.y });
  }
  const heroTile = tiles[0]!;
  const tileS = tile.w / docW;

  const doc = figure
    ? {
        a: { x: W / 2, y: H / 2, s: Math.min(1, (H - 24) / docH), r: 0 },
        b: { x: W / 2, y: H / 2, s: Math.min(1, (H - 24) / docH) },
        grid: { x: heroTile.gx, y: heroTile.gy, s: tileS },
        sorted: { x: heroTile.sx, y: heroTile.sy, s: tileS * tile.k },
        e: { x: W / 2, y: H / 2, s: Math.min(1, (H - 24) / docH) },
        f: { x: narrow ? W / 2 : W * 0.36, y: H / 2, s: Math.min(0.82, (H - 24) / docH) },
      }
    : narrow
      ? {
          a: { x: W / 2, y: H * 0.74 + (docH * 1.06) / 2, s: 1.06, r: 16 },
          b: { x: W / 2, y: cy, s: 1 },
          grid: { x: heroTile.gx, y: heroTile.gy, s: tileS },
          sorted: { x: heroTile.sx, y: heroTile.sy, s: tileS * tile.k },
          e: { x: W / 2, y: cy, s: 1 },
          f: { x: W * 0.4, y: cy - 10, s: 0.8 },
        }
      : {
          a: { x: W / 2, y: H * 0.5 + (docH * 1.55) / 2, s: 1.55, r: 26 },
          b: { x: W * 0.6, y: top + (H - top) / 2, s: 1 },
          grid: { x: heroTile.gx, y: heroTile.gy, s: tileS },
          sorted: { x: heroTile.sx, y: heroTile.sy, s: tileS * tile.k },
          e: { x: W * 0.48, y: top + (H - top) / 2, s: 1 },
          f: { x: W * 0.5, y: top + (H - top) / 2, s: 0.86 },
        };

  const reportW = narrow ? Math.min(W - 2 * g - 8, 380) : Math.min(470, W * 0.32);
  const report = figure
    ? { x: narrow ? W / 2 : W * 0.66, y: H / 2, w: narrow ? Math.min(W - 2 * g, 380) : Math.min(440, W * 0.4), from: W + 60 }
    : narrow
      ? { x: W / 2 + 8, y: cy + 16, w: reportW, from: W + reportW }
      : { x: W * 0.5 + docW * 0.43 + reportW * 0.42, y: top + (H - top) / 2 + 20, w: reportW, from: W + reportW };

  const sortedBottom = Math.max(...tiles.map((t) => t.sy)) + sh / 2;
  return { W, H, narrow, docW, docH, tile, region, doc, report, tiles, groups, sortedBottom };
}
