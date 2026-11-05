import Link from "next/link";

const contents = [
  ["Inventory of public PDFs", "Every publicly linked file, where it lives and what links to it."],
  ["Accessibility findings", "What each checked file gets wrong, in plain language."],
  ["Prioritized document list", "Service documents first, with the reasons for each placement."],
  ["Human-review flags", "Files that need a person or a policy decision, not a guess."],
  ["Remediation estimate", "Pages by difficulty, with a cost range for the work."],
  ["Action plan", "What to fix, archive or replace, and in what order."],
  ["Methodology and limits", "How it was checked, what was not, and why this is not legal advice."],
] as const;

const next = [
  ["Readiness Package", "Remediation of the must-fix files, each delivered with its check report."],
  ["Agenda Desk", "Meeting packets sent in and returned remediated, in time to post."],
  ["Check before posting", "A self-serve check for staff before upload. In development."],
] as const;

export function AuditOffer() {
  return (
    <section id="audit" aria-labelledby="audit-title" className="relative overflow-hidden bg-paper-deep pb-24 pt-24 sm:pb-32 sm:pt-28">
      <div className="wrap grid-12 items-center gap-y-14">
        {/* the deliverable, as a document */}
        <div className="relative col-span-12 lg:col-span-5" aria-hidden="true">
          <div className="relative mx-auto max-w-[440px]">
            <div className="sheet absolute inset-0 translate-x-6 translate-y-5 rotate-[3deg] opacity-70" />
            <div className="sheet absolute inset-0 translate-x-3 translate-y-2.5 rotate-[1.5deg] opacity-85" />
            <div className="sheet relative px-7 pb-8 pt-7 sm:px-9">
              <p className="text-[0.8rem] font-[600] text-muted">City of Alder Creek · example</p>
              <p className="title mt-3 text-[1.9rem]">Readiness Audit</p>
              <p className="mt-1 text-[0.9rem] text-ink-soft">Public documents on alder-creek.example</p>
              <ol className="mt-7 border-t hairline">
                {contents.map(([t], i) => (
                  <li key={t} className="flex items-baseline gap-3 border-b py-2.5 text-[0.9rem] hairline">
                    <span className="mono w-5 text-[0.75rem] text-signal">{i + 1}</span>
                    <span className="flex-1">{t}</span>
                    <span className="mono text-[0.75rem] text-muted">{[3, 6, 11, 14, 16, 19, 22][i]}</span>
                  </li>
                ))}
              </ol>
              <svg viewBox="0 0 300 40" className="mt-6 h-8 w-full" aria-hidden="true">
                <path d="M2 30 C 60 4, 90 38, 150 20 S 240 6, 298 18" fill="none" stroke="var(--color-signal)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <h2 id="audit-title" className="headline">
            Start with a <em>Readiness Audit.</em>
          </h2>
          <p className="lede mt-6 !max-w-[44ch]">
            A fixed-scope review of the documents on your public site, written for the people who have to decide what
            happens next.
          </p>

          <h3 className="mt-10 font-[650]">What you receive</h3>
          <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
            {contents.map(([t, d]) => (
              <li key={t} className="border-t py-3 hairline">
                <span className="block font-[600] leading-snug">{t}</span>
                <span className="mt-0.5 block text-[0.9rem] leading-snug text-ink-soft">{d}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-[650]">What it costs</h3>
              <p className="mt-2 text-[0.95rem] text-ink-soft">
                A flat fee set by the size of your site, quoted in writing before any work starts. Large or complex sites
                are scoped individually.
              </p>
            </div>
            <div>
              <h3 className="font-[650]">What comes after</h3>
              <ul className="mt-2 space-y-2 text-[0.95rem]">
                {next.map(([t, d]) => (
                  <li key={t}>
                    <span className="font-[600]">{t}.</span> <span className="text-ink-soft">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
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
      </div>
    </section>
  );
}
