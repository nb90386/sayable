import { PVB, PermitPage, regions } from "./permit";

/** Broken structure, as the file is posted: what a screen reader actually meets. */
const brokenOrder = ["footer", "title", "address", "name", "signature", "work", "phone"];
/** Repaired structure: reading order and names. */
const fixedOrder = ["title", "intro", "name", "phone", "address", "work", "signature", "date"];

const fixedNames: Record<string, string> = {
  title: "H1",
  name: 'Field "Applicant name"',
  phone: 'Field "Daytime phone"',
  address: 'Field "Site address"',
  work: 'Group "Type of work"',
  signature: 'Field "Applicant signature"',
  date: 'Field "Date"',
};

const anchor = (id: string) => {
  const r = regions[id]!;
  return { x: r.x - 26, y: r.y + Math.min(r.h / 2, 22) };
};

function orderedPath(ids: string[], tangled: boolean) {
  let d = "";
  ids.forEach((id, i) => {
    const p = tangled ? { x: regions[id]!.x + regions[id]!.w * 0.55, y: regions[id]!.y + regions[id]!.h / 2 } : anchor(id);
    if (i === 0) {
      d = `M ${p.x} ${p.y}`;
      return;
    }
    const prevId = ids[i - 1]!;
    const q = tangled ? { x: regions[prevId]!.x + regions[prevId]!.w * 0.55, y: regions[prevId]!.y + regions[prevId]!.h / 2 } : anchor(prevId);
    if (tangled) {
      const s = i % 2 ? 1 : -1;
      d += ` C ${q.x + s * 120} ${q.y - 50}, ${p.x - s * 140} ${p.y + 60}, ${p.x} ${p.y}`;
    } else if (Math.abs(q.y - p.y) < 4) {
      d += ` C ${q.x} ${q.y - 64}, ${q.x} ${q.y - 64}, ${q.x + 52} ${q.y - 64} L ${p.x - 44} ${p.y - 64} C ${p.x} ${p.y - 64}, ${p.x} ${p.y - 64}, ${p.x} ${p.y}`;
    } else {
      const m = (q.y + p.y) / 2;
      d += ` C ${q.x - 18} ${m}, ${p.x - 18} ${m}, ${p.x} ${p.y}`;
    }
  });
  return d;
}

export function BrokenLayer() {
  const unnamed = ["name", "phone", "address", "work", "signature"];
  return (
    <g>
      <path d={orderedPath(brokenOrder, true)} fill="none" stroke="#e5521f" strokeWidth="2.4" strokeOpacity="0.85" strokeLinecap="round" className="sheet-path" pathLength={100} />
      {unnamed.map((id) => {
        const r = regions[id]!;
        return (
          <g key={id}>
            <rect x={r.x - 6} y={r.y - 6} width={r.w + 12} height={r.h + 12} rx="8" fill="rgb(229 82 31 / 0.06)" stroke="#e5521f" strokeWidth="2.4" strokeDasharray="10 7" />
            <g transform={`translate(${r.x + r.w - 196} ${r.y - 18})`}>
              <rect width="202" height="30" rx="15" fill="#e5521f" />
              <text x="16" y="20.5" fontFamily="var(--font-mono)" fontSize="14" fill="#fff">
                no accessible name
              </text>
            </g>
          </g>
        );
      })}
      <g transform={`translate(${regions.title!.x} ${regions.title!.y - 26})`}>
        <rect width="226" height="30" rx="15" fill="#fff" stroke="#e5521f" strokeWidth="2" />
        <text x="16" y="20.5" fontFamily="var(--font-mono)" fontSize="14" fill="#b53d12">
          tagged as text, not H1
        </text>
      </g>
      <g transform={`translate(${regions.footer!.x} ${regions.footer!.y - 40})`}>
        <rect width="178" height="30" rx="15" fill="#fff" stroke="#e5521f" strokeWidth="2" />
        <text x="16" y="20.5" fontFamily="var(--font-mono)" fontSize="14" fill="#b53d12">
          read first: footer
        </text>
      </g>
    </g>
  );
}

export function FixedLayer() {
  return (
    <g>
      <path d={orderedPath(fixedOrder, false)} fill="none" stroke="#2458e8" strokeWidth="3.2" strokeLinecap="round" className="sheet-path" pathLength={100} />
      {fixedOrder.map((id, i) => {
        const r = regions[id]!;
        const a = anchor(id);
        const label = fixedNames[id];
        const w = label ? label.length * 9.2 + 26 : 0;
        return (
          <g key={id}>
            <rect x={r.x - 6} y={r.y - 6} width={r.w + 12} height={r.h + 12} rx="8" fill="rgb(36 88 232 / 0.05)" stroke="#2458e8" strokeWidth="2" />
            {label ? (
              <g transform={`translate(${r.x + r.w - w + 6} ${r.y - 20})`}>
                <rect width={w} height="28" rx="14" fill="#2458e8" />
                <text x="13" y="19.5" fontFamily="var(--font-mono)" fontSize="14" fill="#fff">
                  {label}
                </text>
              </g>
            ) : null}
            <g transform={`translate(${a.x} ${a.y})`}>
              <circle r="15" fill="#12151b" />
              <text y="5.5" textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="600" fontSize="15" fill="#fff">
                {i + 1}
              </text>
            </g>
          </g>
        );
      })}
    </g>
  );
}

/**
 * The hero object: a physical sheet (page 2 just visible beneath), drawn in SVG.
 * `layer` chooses what the structure view shows; `children` can add overlays such as a scan line.
 */
export function PermitSheet({
  layer = "none",
  className = "",
  label,
  children,
}: {
  layer?: "none" | "broken" | "fixed";
  className?: string;
  label?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`permit ${className}`}>
      <div className="permit-under" aria-hidden="true" />
      <svg viewBox={PVB} className="permit-page" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
        <PermitPage />
        {layer === "broken" ? <BrokenLayer /> : null}
        {layer === "fixed" ? <FixedLayer /> : null}
        {children}
      </svg>
    </div>
  );
}
