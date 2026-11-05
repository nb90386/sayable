/**
 * The recurring artifact: a fictional city's "Notice of Public Hearing".
 * Drawn in one 850×1100 coordinate space (US Letter at 100 dpi) so the visible
 * page and every structural overlay line up at any size.
 */

export const VB = "0 0 850 1100";

export type Block = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tag: string;
  /** reading-order position; undefined = artifact (skipped by assistive tech) */
  order?: number;
};

export const blocks: Block[] = [
  { id: "seal", x: 722, y: 58, w: 76, h: 76, tag: "Artifact" },
  { id: "h1", x: 64, y: 168, w: 560, h: 62, tag: "H1", order: 1 },
  { id: "sub", x: 64, y: 234, w: 520, h: 34, tag: "P", order: 2 },
  { id: "body", x: 64, y: 292, w: 700, h: 90, tag: "P", order: 3 },
  { id: "h2", x: 64, y: 412, w: 360, h: 40, tag: "H2", order: 4 },
  { id: "table", x: 64, y: 466, w: 722, h: 192, tag: "Table · 4 rows", order: 5 },
  { id: "figure", x: 64, y: 700, w: 340, h: 250, tag: 'Figure alt="Map: 410 Main Street"', order: 6 },
  { id: "form", x: 446, y: 700, w: 340, h: 250, tag: "Form · 2 named fields", order: 7 },
  { id: "foot", x: 64, y: 1018, w: 722, h: 30, tag: "Artifact" },
];

export const thCells = [
  { x: 64, y: 466, w: 330, h: 44 },
  { x: 394, y: 466, w: 196, h: 44 },
  { x: 590, y: 466, w: 196, h: 44 },
];

export const fields = [
  { x: 470, y: 790, w: 292, h: 40, name: 'TU "Your name"' },
  { x: 470, y: 862, w: 292, h: 62, name: 'TU "Your comment"' },
];

const serif = "var(--font-serif)";
const sans = "var(--font-sans)";
const mono = "var(--font-mono)";

/** The visible page. Pure SVG, no interactivity. */
export function NoticePage() {
  return (
    <g>
      <rect width="850" height="1100" fill="var(--color-sheet)" />
      {/* letterhead */}
      <text x="64" y="86" fontFamily={sans} fontSize="15" letterSpacing="3.2" fontWeight="600" fill="#34423c">
        CITY OF ALDER CREEK
      </text>
      <text x="64" y="110" fontFamily={sans} fontSize="14" fill="#56655d">
        Planning Division · 410 Main Street
      </text>
      <g transform="translate(760 96)" fill="none" stroke="#34423c" strokeWidth="1.4">
        <circle r="34" />
        <circle r="27" strokeDasharray="2 3" />
        <path d="M-12 8 L0 -14 L12 8 Z M-16 12 H16" />
      </g>
      <line x1="64" y1="140" x2="786" y2="140" stroke="#17211d" strokeOpacity="0.5" />

      <text x="64" y="216" fontFamily={serif} fontSize="50" fill="#17211d" letterSpacing="-1">
        Notice of Public Hearing
      </text>
      <text x="64" y="258" fontFamily={serif} fontStyle="italic" fontSize="23" fill="#34423c">
        Proposed changes to residential permit fees
      </text>

      <g fontFamily={sans} fontSize="18" fill="#34423c">
        <text x="64" y="314">The Planning Commission will hold a public hearing on Tuesday,</text>
        <text x="64" y="342">December 8 at 6:00 p.m. in Council Chambers to consider the</text>
        <text x="64" y="370">fee schedule below. Anyone may comment in person or in writing.</text>
      </g>

      <text x="64" y="442" fontFamily={serif} fontSize="28" fill="#17211d">
        Proposed fee schedule
      </text>

      {/* table */}
      <g fontFamily={sans} fontSize="16.5">
        <rect x="64" y="466" width="722" height="44" fill="#e3ebe4" />
        <g fill="#17211d" fontWeight="600">
          <text x="80" y="494">Permit type</text>
          <text x="410" y="494">Current</text>
          <text x="606" y="494">Proposed</text>
        </g>
        <g fill="#34423c">
          <text x="80" y="540">Building, residential</text>
          <text x="410" y="540">$85</text>
          <text x="606" y="540">$92</text>
          <text x="80" y="588">Accessory dwelling unit</text>
          <text x="410" y="588">$120</text>
          <text x="606" y="588">$120</text>
          <text x="80" y="636">Fence over six feet</text>
          <text x="410" y="636">$40</text>
          <text x="606" y="636">$44</text>
        </g>
        <g stroke="#17211d" strokeOpacity="0.2">
          <line x1="64" y1="558" x2="786" y2="558" />
          <line x1="64" y1="606" x2="786" y2="606" />
          <line x1="64" y1="658" x2="786" y2="658" strokeOpacity="0.5" />
        </g>
      </g>

      {/* map figure */}
      <g>
        <rect x="64" y="700" width="340" height="212" fill="#eef2ec" />
        <g stroke="#17211d" strokeOpacity="0.28" strokeWidth="9" fill="none" strokeLinecap="round">
          <path d="M64 780 H404" />
          <path d="M200 700 V912" />
          <path d="M64 870 C150 860 260 900 404 840" strokeWidth="5" />
        </g>
        <g stroke="#ffffff" strokeWidth="1.6" strokeDasharray="6 6" fill="none">
          <path d="M64 780 H404" />
          <path d="M200 700 V912" />
        </g>
        <rect x="248" y="724" width="70" height="40" fill="#c7d3cb" />
        <circle cx="283" cy="744" r="9" fill="#17211d" />
        <text x="64" y="938" fontFamily={sans} fontSize="14" fill="#56655d">
          Council Chambers, 410 Main Street
        </text>
      </g>

      {/* comment form */}
      <g fontFamily={sans}>
        <text x="446" y="722" fontSize="19" fontWeight="600" fill="#17211d">
          Submit a written comment
        </text>
        <text x="470" y="776" fontSize="14" fill="#56655d">
          Name
        </text>
        <rect x="470" y="790" width="292" height="40" fill="#fff" stroke="#17211d" strokeOpacity="0.4" />
        <text x="470" y="852" fontSize="14" fill="#56655d">
          Comment
        </text>
        <rect x="470" y="862" width="292" height="62" fill="#fff" stroke="#17211d" strokeOpacity="0.4" />
        <rect x="446" y="700" width="340" height="250" fill="none" stroke="#17211d" strokeOpacity="0.16" />
      </g>

      <line x1="64" y1="1012" x2="786" y2="1012" stroke="#17211d" strokeOpacity="0.2" />
      <text x="64" y="1040" fontFamily={mono} fontSize="13" fill="#56655d">
        Example document · fictional city
      </text>
      <text x="786" y="1040" fontFamily={mono} fontSize="13" fill="#56655d" textAnchor="end">
        Page 1 of 2
      </text>
    </g>
  );
}

/** Rough left-margin anchor for a block's reading-order node. */
export function nodePoint(b: Block) {
  return { x: b.x - 26, y: b.y + Math.min(b.h / 2, 24) };
}

/** A smooth path that visits every ordered block, weaving out to each block's edge. */
export function readingPath() {
  const ordered = blocks.filter((b) => b.order).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  let d = "";
  ordered.forEach((b, i) => {
    const p = nodePoint(b);
    if (i === 0) d += `M ${p.x} ${p.y}`;
    else {
      const prev = nodePoint(ordered[i - 1]!);
      if (Math.abs(prev.y - p.y) < 4) d += ` C ${prev.x + 60} ${prev.y - 46}, ${p.x - 60} ${p.y - 46}, ${p.x} ${p.y}`;
      else {
        const midY = (prev.y + p.y) / 2;
        d += ` C ${prev.x - 16} ${midY}, ${p.x - 16} ${midY}, ${p.x} ${p.y}`;
      }
    }
  });
  return d;
}
