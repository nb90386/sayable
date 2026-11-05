import Link from "next/link";
import { NoticePage, VB, blocks, nodePoint, readingPath } from "../doc/notice";
import { Ribbon } from "../Ribbon";

/** The opening document, resolved: the reading path runs in order and every block has its structure. */
function ResolvedSheet() {
  const ordered = blocks.filter((b) => b.order);
  return (
    <svg viewBox={VB} className="block h-auto w-full rounded-[14px] bg-sheet shadow-[var(--shadow-sheet)]" aria-hidden="true">
      <NoticePage />
      {ordered.map((b) => (
        <rect key={b.id} x={b.x - 8} y={b.y - 8} width={b.w + 16} height={b.h + 16} rx="8" fill="rgb(29 83 71 / 0.04)" stroke="#1d5347" strokeWidth="2" />
      ))}
      <path d={readingPath()} fill="none" stroke="#1d5347" strokeWidth="4" strokeLinecap="round" />
      {ordered.map((b) => {
        const p = nodePoint(b);
        return (
          <g key={b.id} transform={`translate(${p.x} ${p.y})`}>
            <circle r="16" fill="#1d5347" />
            <text y="6" textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" fontSize="16" fill="#fff">
              {b.order}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden pb-24 pt-16 sm:pb-32">
      <Ribbon className="h-[120px] sm:h-[170px]" d="M -60 150 C 260 20, 560 190, 860 90 S 1200 10, 1500 120" viewBox="0 0 1440 200" />
      <div className="wrap grid-12 items-center gap-y-12">
        <div className="col-span-12 lg:col-span-6">
          <h2 id="cta-title" className="display text-[length:var(--step-5)]">
            See what your <em>documents need.</em>
          </h2>
          <p className="lede mt-7 !max-w-[42ch]">
            Send us your public website. We&rsquo;ll scope a Readiness Audit of the documents on it: what must be fixed,
            what can wait for your team&rsquo;s decision, and what the work will take.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link href="/contact?topic=audit" className="btn">
              Request a Readiness Audit <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
            </Link>
            <Link href="/contact?topic=pilot" className="link-quiet">
              Discuss a pilot
            </Link>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <div className="relative mx-auto max-w-[420px] rotate-[2deg]">
            <ResolvedSheet />
            <p className="stamp absolute -bottom-4 left-6 shadow-[0_6px_16px_-8px_rgb(23_50_40/0.4)]" aria-hidden="true">
              Checked · ready to post
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
