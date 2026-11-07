import Link from "next/link";

const SOURCES = [
  { href: "https://www.ada.gov/resources/web-rule-first-steps/", label: "DOJ: First steps toward complying with the web rule" },
  { href: "https://www.govinfo.gov/app/details/FR-2026-04-20/2026-07663", label: "Federal Register, April 20, 2026: the rule that set the current dates" },
  { href: "https://www.ada.gov/resources/small-entity-compliance-guide/", label: "DOJ: Small entity compliance guide" },
];

/** Plan backwards from the date: the work that has to happen first, in months, for a mid-sized city. Illustrative, not a promise. */
const PLAN = [
  { t: "Find every PDF", d: "Most cities don't know how many files their website links to. Often it is thousands." },
  { t: "Decide what's covered", d: "Older files kept only for reference may be excepted. Forms and current notices are not." },
  { t: "Budget and buy", d: "Quotes, approvals and purchasing take time, and they happen before any repair starts." },
  { t: "Repair and check", d: "Simple pages go fast. Forms, tables and scans take a person, page by page." },
  { t: "Keep new files right", d: "Agendas and notices keep arriving. Each one posted after the date has to be accessible." },
];

/** Chapter: the deadline, stated plainly with its sources. No countdown, no alarm. */
export function WhyNow() {
  return (
    <section data-sc-act="why-now" aria-labelledby="why-now-title" className="scene-dark on-night join-prev pb-[clamp(6rem,13vh,10rem)] pt-[clamp(3rem,8vh,6rem)]">
      <div className="wrap">
        <div className="mx-auto max-w-[1100px]">
          <h2 id="why-now-title" className="headline max-w-[18ch] text-moon">
            Your accessibility deadline <span className="tone">is coming.</span>
          </h2>
          <p className="lede mt-6 !max-w-[58ch] !text-moon-muted">
            In 2024 the Department of Justice adopted a rule under Title II of the Americans with Disabilities Act. It requires state and local
            governments to make their websites and the documents on them meet a standard called WCAG 2.1 AA. The dates depend on your population.
          </p>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-[14px] bg-white/10 md:grid-cols-2">
            <div className="bg-night-raise p-7 sm:p-9">
              <dt className="text-[0.95rem] font-[600] text-moon-muted">State and local governments with 50,000 people or more</dt>
              <dd className="mt-3">
                <span className="numeral block text-[length:clamp(2.2rem,1.6rem+2vw,3.4rem)] leading-none text-moon">April 26, 2027</span>
              </dd>
            </div>
            <div className="bg-night-raise p-7 sm:p-9">
              <dt className="text-[0.95rem] font-[600] text-moon-muted">Governments under 50,000 people, and special districts</dt>
              <dd className="mt-3">
                <span className="numeral block text-[length:clamp(2.2rem,1.6rem+2vw,3.4rem)] leading-none text-moon">April 26, 2028</span>
              </dd>
            </div>
          </dl>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="grid content-start gap-4 text-moon-muted">
              <h3 className="title text-[1.25rem] text-moon">What the date does and doesn&apos;t mean</h3>
              <p>
                It is the date the technical standard applies. Your duty to communicate effectively with residents who have disabilities already exists, so a
                resident can ask for an accessible version of a document today.
              </p>
              <p>
                Not every old PDF has to be fixed. The rule has exceptions, for example for older documents that nobody needs to use a service, and for
                content kept in a clearly marked archive. Documents people use to apply for, pay for or take part in something are not excepted. Deciding
                which files fall where is your call, and it is usually where the biggest savings are.
              </p>
            </div>
            <div>
              <h3 className="title text-[1.25rem] text-moon">Why months, not weeks</h3>
              <ol className="mt-4 grid gap-0">
                {PLAN.map((p, i) => (
                  <li key={p.t} className="grid grid-cols-[2rem_1fr] gap-x-3 border-t border-white/10 py-3.5">
                    <span className="mono pt-0.5 text-[0.85rem] text-signal-night">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-[600] text-moon">{p.t}</p>
                      <p className="mt-0.5 text-[0.95rem] text-moon-muted">{p.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-[0.92rem] text-moon-muted">
            <p className="font-[600] text-moon">Sources</p>
            <ul className="mt-2 grid gap-1.5">
              {SOURCES.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="text-link text-moon" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-[62ch]">
              These are the dates as of November 2026. A lawsuit filed in May 2026 (National Federation of the Blind v. DOJ) asks a court to restore
              the earlier dates, and DOJ has said it may propose changes, so they could move. Population is counted from the 2020 Census. This is
              general information, not legal advice. <Link href="/resources/title-ii-rule-and-your-pdfs" className="text-link text-moon">The rule and your PDFs, in plain English</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
