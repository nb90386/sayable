import Link from "next/link";

const rows = [
  {
    n: "i",
    who: "Cities and counties",
    scene: "Thousands of PDFs, one deadline, and no clear list of which ones matter.",
    what: "A readiness audit of every publicly linked document, sorted into piles with reasons, then remediation of the files residents actually use.",
    href: "/solutions#cities",
  },
  {
    n: "ii",
    who: "Clerks and document teams",
    scene: "Tuesday’s agenda packet has to be posted by Friday, and it is 140 pages.",
    what: "Packets sent in and returned remediated with a check report, in time for posting rules — plus a check-before-post step for everyday uploads.",
    href: "/solutions#clerks",
  },
  {
    n: "iii",
    who: "Municipal web agencies",
    scene: "Your client asks whether the PDFs are covered by the redesign. They are not.",
    what: "White-label inventory, remediation and check reports you can hand to the client under your own process.",
    href: "/solutions#agencies",
  },
  {
    n: "iv",
    who: "Accessibility professionals",
    scene: "The queue is full, and the next contract needs independent verification.",
    what: "Overflow remediation, and a second set of checks — validator, semantic review and a person — on files your team produced.",
    href: "/solutions#specialists",
  },
];

export function Audiences() {
  return (
    <section aria-labelledby="aud-title" className="border-t pb-28 pt-24 hairline sm:pb-36 sm:pt-32">
      <div className="wrap">
        <div className="grid-12 gap-y-6">
          <p className="eyebrow col-span-12 md:col-span-4">Who it is for</p>
          <h2 id="aud-title" className="headline col-span-12 md:col-span-8">
            Built for the people <em>who post the PDFs.</em>
          </h2>
        </div>
        <ol className="mt-16 border-t border-ink/70">
          {rows.map((r) => (
            <li key={r.n} className="group border-b hairline">
              <Link href={r.href} className="grid-12 items-baseline gap-y-3 py-9 no-underline sm:py-11">
                <span className="col-span-2 font-serif text-[1.4rem] italic text-muted md:col-span-1">{r.n}.</span>
                <span className="col-span-10 md:col-span-3">
                  <span className="block font-serif text-[length:var(--step-2)] leading-[1.1] tracking-[-0.015em] transition-colors group-hover:text-signal">
                    {r.who}
                  </span>
                </span>
                <span className="col-span-12 font-serif text-[1.2rem] italic leading-snug text-ink-soft md:col-span-4 md:pr-6">
                  {r.scene}
                </span>
                <span className="col-span-12 flex items-start justify-between gap-6 text-[0.975rem] text-ink-soft md:col-span-4">
                  {r.what}
                  <span aria-hidden="true" className="mt-1 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
