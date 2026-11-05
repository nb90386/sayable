import Link from "next/link";

const receive = [
  ["Document inventory", "Every publicly linked file: where it lives, what links to it, and what kind of document it is."],
  ["Accessibility findings", "What each checked file gets wrong, in plain language, with the evidence."],
  ["Prioritization", "Service documents first, with the reason for every placement."],
  ["Remediation estimate", "Pages by difficulty, with a cost range for the work."],
  ["Human-review flags", "Files that need a person, or a policy decision your team makes."],
  ["Report and action plan", "What to fix, archive or replace, in what order, and what it will take."],
] as const;

const steps = [
  ["A short scoping call", "Where your documents live, roughly how many there are, and your deadlines."],
  ["A written quote", "A flat fee set by the size and complexity of your inventory, before any work starts."],
  ["Your audit", "Delivered as a report your team can act on, with a walkthrough."],
] as const;

/** Chapter 7. The first engagement, presented as a product. */
export function Offer() {
  return (
    <section id="audit" data-sc-act="offer" aria-labelledby="offer-title" className="bg-paper-deep py-[clamp(7rem,14vh,11rem)]">
      <div className="wrap text-center">
        <h2 id="offer-title" className="headline mx-auto max-w-[14ch]">
          Start with a Readiness Audit.
        </h2>
        <p className="lede mx-auto mt-6 !max-w-[48ch]">
          A fixed-scope review of the documents on your public site, written for the people who decide what happens next.
        </p>
      </div>

      {/* the deliverable, as an object */}
      <div className="wrap mt-14" aria-hidden="true">
        <div className="relative mx-auto h-[300px] max-w-[640px] sm:h-[360px]">
          <div className="absolute inset-x-[10%] top-8 h-[88%] rotate-[-3deg] rounded-[6px] bg-sheet shadow-[var(--shadow-sheet)]" />
          <div className="absolute inset-x-[6%] top-4 h-[92%] rotate-[2deg] rounded-[6px] bg-sheet shadow-[var(--shadow-sheet)]" />
          <div className="absolute inset-x-0 top-0 h-full rounded-[6px] bg-sheet px-8 py-8 text-left shadow-[var(--shadow-sheet)] sm:px-12 sm:py-10">
            <p className="text-[0.8rem] font-[600] text-muted">City of Alder Creek · example</p>
            <p className="title mt-2 text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)]">Readiness Audit</p>
            <p className="text-[0.95rem] text-muted">Public documents on alder-creek.example</p>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t pt-5 hairline">
              {[
                ["Inventory", "2,418 files"],
                ["Must fix", "612"],
                ["Person review", "141"],
              ].map(([k, n]) => (
                <div key={k}>
                  <p className="text-[0.78rem] text-muted">{k}</p>
                  <p className="numeral text-[clamp(1.3rem,1rem+1vw,1.9rem)]">{n}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[0.78rem] text-muted">Sample cover with fictional figures.</p>
          </div>
        </div>
      </div>

      <div className="wrap mt-16">
        <h3 className="sr-only">What you receive</h3>
        <ul className="mx-auto grid max-w-[1100px] gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {receive.map(([t, d]) => (
            <li key={t}>
              <p className="title text-[1.15rem]">{t}</p>
              <p className="mt-1.5 text-[0.95rem] text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="wrap mt-16">
        <div className="mx-auto max-w-[1100px] border-t pt-10 hairline">
          <h3 className="title text-center text-[1.35rem]">How buying it works</h3>
          <ol className="mt-8 grid gap-8 sm:grid-cols-3">
            {steps.map(([t, d], i) => (
              <li key={t} className="text-center">
                <span aria-hidden="true" className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[0.9rem] font-[600] text-paper">
                  {i + 1}
                </span>
                <p className="title mt-3 text-[1.05rem]">{t}</p>
                <p className="mx-auto mt-1 max-w-[30ch] text-[0.92rem] text-muted">{d}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-10 max-w-[60ch] text-center text-[0.95rem] text-muted">
            After the audit: remediation of the must-fix files, agenda packets returned in time to post, and a check-before-post
            tool for staff, which is in development.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/contact?topic=audit" className="btn">
              Request a Readiness Audit
            </Link>
            <Link href="/contact?topic=pilot" className="link-quiet">
              Discuss a pilot <span aria-hidden="true" data-icon="chev"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
