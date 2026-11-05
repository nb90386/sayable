import Link from "next/link";
import { PVB, PermitPage, regions } from "../doc/permit";

const receive = [
  ["Inventory of public PDFs", "Every publicly linked file, where it lives and what links to it."],
  ["Accessibility findings", "What each checked file gets wrong, in plain language."],
  ["Prioritized document list", "Service documents first, with the reasons for each placement."],
  ["Human-review flags", "Files that need a person or a policy decision."],
  ["Remediation estimate", "Pages by difficulty, with a cost range for the work."],
  ["Action plan", "What to fix, archive or replace, and in what order."],
] as const;

const order = ["title", "intro", "name", "phone", "address", "work", "signature", "date"];

/** The collapse: the divider has left, and the two stories are now one. */
export function Close() {
  return (
    <section data-sc-act="close" aria-labelledby="close-title" className="relative bg-paper pb-24 pt-24 sm:pb-32 sm:pt-32">
      <div className="wrap grid-12 items-start gap-y-14">
        <div className="col-span-12 lg:col-span-6">
          <h2 id="close-title" className="display text-[length:var(--step-5)]">
            Now both stories say the <em>same thing.</em>
          </h2>
          <p className="lede mt-7 !max-w-[42ch]">
            Start with a Readiness Audit: a fixed-scope review of the documents on your public site, written for the people
            who decide what happens next.
          </p>

          <h3 className="mt-12 font-[700]">What you receive</h3>
          <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
            {receive.map(([t, d]) => (
              <li key={t} className="border-t py-3 hairline">
                <span className="block font-[700] leading-snug">{t}</span>
                <span className="mt-0.5 block text-[0.95rem] leading-snug text-ink-soft">{d}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <p className="text-[0.95rem] text-ink-soft">
              <strong className="text-ink">Cost.</strong> A flat fee set by the size of your site, quoted in writing before any
              work starts. Large or complex sites are scoped individually.
            </p>
            <p className="text-[0.95rem] text-ink-soft">
              <strong className="text-ink">After the audit.</strong> Remediation of the must-fix files, agenda packets returned in
              time to post, and a check-before-post tool (in development).
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link href="/contact?topic=audit" className="btn">
              Request a Readiness Audit <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
            </Link>
            <Link href="/contact?topic=pilot" className="link-quiet">
              Discuss a pilot
            </Link>
          </div>
        </div>

        <figure className="col-span-12 lg:col-span-5 lg:col-start-8">
          <svg viewBox={PVB} className="doc-sheet" role="img" aria-label="The permit application after repair: every field named, read in order from the heading to the date">
            <PermitPage />
            <path
              d={order.reduce((d, id, i) => {
                const r = regions[id]!;
                const x = 30;
                const y = r.y + 16;
                return d + (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
              }, "")}
              fill="none"
              stroke="#121314"
              strokeWidth="3"
            />
            {order.map((id, i) => {
              const r = regions[id]!;
              return (
                <g key={id}>
                  <rect x={r.x - 8} y={r.y - 8} width={r.w + 16} height={r.h + 16} rx="8" fill="rgb(18 19 20 / 0.03)" stroke="#121314" strokeWidth="2" />
                  <g transform={`translate(30 ${r.y + 16})`}>
                    <circle r="15" fill="#121314" />
                    <text y="5.5" textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" fontSize="15" fill="#fff">
                      {i + 1}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
          <figcaption className="mt-4 flex flex-wrap items-center gap-3 text-[0.9rem] text-muted">
            <span className="stamp">
              <span aria-hidden="true" data-icon="check"></span> Checked
            </span>
            The same form, read in order. Example document.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
