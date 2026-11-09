/**
 * Original covers for the guides, drawn from document motifs: sheets, grids, bars, reading paths.
 * Decorative: the guide title next to each cover carries the meaning, so they are aria-hidden.
 */
const INK = "#17150f";
const PAPER = "#ecebe7";
const SHEET = "#fbfaf8";
const NIGHT = "#1f2b2a";
const WARM = "#cf4520";
const SIGNAL = "#1b5a45";
const RULE = "#c9c5bb";
const FONT = "var(--font-funnel-display), ui-sans-serif, system-ui, sans-serif";

function Lines({ x, y, w, n, gap = 12, fill = RULE, last = 0.6 }: { x: number; y: number; w: number; n: number; gap?: number; fill?: string; last?: number }) {
  return (
    <>
      {Array.from({ length: n }).map((_, i) => (
        <rect key={i} x={x} y={y + i * gap} width={i === n - 1 ? w * last : w} height="5" rx="2.5" fill={fill} />
      ))}
    </>
  );
}

/** The rule and its dates: two sheets on dark ground, one per date. */
function Rule({ wide }: { wide?: boolean }) {
  return wide ? (
    <svg viewBox="0 0 640 440" role="presentation" aria-hidden="true" className="rs-cover">
      <rect width="640" height="440" fill={NIGHT} />
      <g transform="rotate(-4 200 230)">
        <rect x="70" y="60" width="270" height="330" rx="6" fill={SHEET} />
        <text x="96" y="118" fontFamily={FONT} fontWeight="500" fontSize="50" fill={INK} letterSpacing="-1.5">2027</text>
        <text x="96" y="146" fontFamily={FONT} fontSize="16" fill="#5f5a50">April 26</text>
        <rect x="96" y="168" width="218" height="1.5" fill={INK} />
        <Lines x={96} y={190} w={218} n={5} gap={16} />
        <rect x="96" y="290" width="150" height="26" rx="13" fill="#dcebe1" />
        <text x="110" y="308" fontFamily={FONT} fontWeight="600" fontSize="14" fill="#134535">50,000 or more</text>
      </g>
      <g transform="rotate(3 450 250)">
        <rect x="320" y="90" width="260" height="320" rx="6" fill={PAPER} />
        <text x="346" y="148" fontFamily={FONT} fontWeight="500" fontSize="50" fill={INK} letterSpacing="-1.5">2028</text>
        <text x="346" y="176" fontFamily={FONT} fontSize="16" fill="#5f5a50">April 26</text>
        <rect x="346" y="198" width="208" height="1.5" fill={INK} />
        <Lines x={346} y={220} w={208} n={4} gap={16} />
        <rect x="346" y="310" width="190" height="26" rx="13" fill="#f6e0d5" />
        <text x="360" y="328" fontFamily={FONT} fontWeight="600" fontSize="14" fill="#a33612">Under 50,000, districts</text>
      </g>
    </svg>
  ) : (
    <svg viewBox="0 0 320 400" role="presentation" aria-hidden="true" className="rs-cover">
      <rect width="320" height="400" fill={NIGHT} />
      <g transform="rotate(-4 120 200)">
        <rect x="36" y="70" width="170" height="230" rx="5" fill={SHEET} />
        <text x="54" y="122" fontFamily={FONT} fontWeight="500" fontSize="38" fill={INK} letterSpacing="-1.2">2027</text>
        <rect x="54" y="140" width="134" height="1.5" fill={INK} />
        <Lines x={54} y={158} w={134} n={5} gap={15} />
      </g>
      <g transform="rotate(4 220 240)">
        <rect x="130" y="130" width="160" height="220" rx="5" fill={PAPER} />
        <text x="148" y="182" fontFamily={FONT} fontWeight="500" fontSize="38" fill={INK} letterSpacing="-1.2">2028</text>
        <rect x="148" y="200" width="124" height="1.5" fill={INK} />
        <Lines x={148} y={218} w={124} n={4} gap={15} />
      </g>
    </svg>
  );
}

/** A spreadsheet of files with the linking page and a recommendation. */
function Inventory() {
  const rows = [WARM, RULE, RULE, SIGNAL, RULE, WARM, RULE];
  return (
    <svg viewBox="0 0 320 400" role="presentation" aria-hidden="true" className="rs-cover">
      <rect width="320" height="400" fill={PAPER} />
      <rect x="34" y="56" width="252" height="290" rx="5" fill={SHEET} />
      <rect x="34" y="56" width="252" height="34" rx="5" fill={INK} />
      <rect x="48" y="70" width="70" height="6" rx="3" fill={PAPER} />
      <rect x="140" y="70" width="60" height="6" rx="3" fill={PAPER} opacity="0.6" />
      <rect x="226" y="70" width="46" height="6" rx="3" fill={PAPER} opacity="0.6" />
      {rows.map((c, i) => (
        <g key={i}>
          <rect x="34" y={90 + i * 36} width="252" height="1" fill={RULE} />
          <rect x="48" y={106 + i * 36} width={78 + ((i * 17) % 24)} height="6" rx="3" fill={INK} opacity="0.75" />
          <rect x="140" y={106 + i * 36} width={50 + ((i * 11) % 18)} height="6" rx="3" fill={RULE} />
          <circle cx="236" cy={109 + i * 36} r="5" fill={c} />
          <rect x="248" y={106 + i * 36} width="26" height="6" rx="3" fill={RULE} />
        </g>
      ))}
      <rect x="34" y="198" width="252" height="36" fill="none" stroke={INK} strokeWidth="2" rx="2" />
    </svg>
  );
}

/** A report cover with a bar chart of findings. */
function Audit() {
  const bars = [190, 150, 120, 96, 70];
  return (
    <svg viewBox="0 0 320 400" role="presentation" aria-hidden="true" className="rs-cover">
      <rect width="320" height="400" fill="#e1dfd9" />
      <rect x="44" y="40" width="232" height="320" rx="5" fill={SHEET} />
      <rect x="64" y="64" width="60" height="7" rx="3.5" fill={INK} />
      <text x="64" y="112" fontFamily={FONT} fontWeight="500" fontSize="28" fill={INK} letterSpacing="-0.8">Audit</text>
      <rect x="64" y="126" width="120" height="1.5" fill={INK} />
      {bars.map((w, i) => (
        <g key={i}>
          <rect x="64" y={160 + i * 32} width="28" height="6" rx="3" fill={RULE} />
          <rect x="100" y={156 + i * 32} width={w * 0.6} height="14" rx="3" fill={WARM} opacity={1 - i * 0.12} />
        </g>
      ))}
      <rect x="64" y="326" width="90" height="5" rx="2.5" fill={RULE} />
    </svg>
  );
}

/** A page where tags pass but the reading path jumps. */
function Checks() {
  return (
    <svg viewBox="0 0 320 400" role="presentation" aria-hidden="true" className="rs-cover">
      <rect width="320" height="400" fill={NIGHT} />
      <rect x="52" y="44" width="216" height="312" rx="5" fill={SHEET} />
      <rect x="72" y="68" width="110" height="14" rx="3" fill={INK} />
      <Lines x={72} y={100} w={176} n={3} gap={14} />
      <rect x="72" y="156" width="176" height="62" rx="3" fill="none" stroke={RULE} strokeWidth="1.5" />
      <rect x="72" y="156" width="176" height="16" fill={RULE} opacity="0.5" />
      <Lines x={72} y={242} w={176} n={4} gap={14} />
      <path d="M 60 75 C 30 120, 30 200, 60 187 S 50 270, 60 255" fill="none" stroke={WARM} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" />
      <circle cx="60" cy="75" r="11" fill={SIGNAL} stroke={SHEET} strokeWidth="3" />
      <circle cx="60" cy="255" r="11" fill={WARM} stroke={SHEET} strokeWidth="3" />
      <circle cx="60" cy="187" r="11" fill={SIGNAL} stroke={SHEET} strokeWidth="3" />
      <path d="M 237 302 l 8 9 l 17 -19" fill="none" stroke={SIGNAL} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GuideCover({ slug, wide }: { slug: string; wide?: boolean }) {
  switch (slug) {
    case "title-ii-rule-and-your-pdfs":
      return <Rule wide={wide} />;
    case "inventory-government-pdfs":
      return <Inventory />;
    case "what-a-pdf-audit-tells-you":
      return <Audit />;
    default:
      return <Checks />;
  }
}
