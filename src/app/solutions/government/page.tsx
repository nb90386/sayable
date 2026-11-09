import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Reveal } from "@/components/pages/PageParts";
import { BuyerCta } from "@/components/pages/buyer/BuyerCta";
import { DocExamples } from "@/components/pages/gov/DocExamples";

export const metadata: Metadata = {
  title: "Sayable for cities and counties",
  description:
    "Why public PDFs matter to a city: the permit forms, agendas, notices and service forms residents use, what goes wrong in them, and how to sort the backlog before you repair it.",
  alternates: { canonical: "/solutions/government" },
};

const roles = [
  {
    who: "ADA coordinator",
    gets: "A sorted inventory with a reason for each file, check results, and a report for every repaired file.",
  },
  {
    who: "City clerk",
    gets: "The free check to use before posting. Repair of agenda packets is a pilot, with turnaround agreed in writing.",
  },
  {
    who: "Web or digital services manager",
    gets: "A spreadsheet of every linked PDF, the page that links to it, and a recommendation: fix, archive, delete or move to a web page.",
  },
  {
    who: "IT and purchasing",
    gets: "Public documents only, a check that never uploads files, and one flat audit fee quoted in writing before anything starts.",
  },
];

const sortSteps = [
  { t: "Inventory", d: "Every PDF linked from your public site, and the page that links to it." },
  { t: "Sort", d: "Must fix, archive candidate, delete candidate, or better as a web page." },
  { t: "Your team decides", d: "Archive and delete candidates are reviewed by your team. They are not repaired by default." },
  { t: "Repair what is left", d: "Only the must-fix files, in the order that serves residents first." },
];

export default function GovernmentPage() {
  return (
    <>
      <PageIntro
        title="Which of your PDFs would a resident get stuck on?"
        lede="The ADA Title II web rule applies WCAG 2.1 AA to a government's web content, PDFs included. The date is April 26, 2027 for governments with a total population of 50,000 or more, and April 26, 2028 for those under 50,000 and for special district governments."
        note="Some content is excepted, such as archived material and older documents not used to access current services. Your counsel decides what applies to you."
      />

      <section aria-labelledby="docs-title" className="wrap pb-12 sm:pb-20">
        <Reveal as="h2" id="docs-title" className="sp-h2 max-w-[22ch]">
          The documents residents actually use
        </Reveal>
        <p className="sp-lede mt-4">
          Four kinds of file cause most of the trouble. The sketches are fictional (City of Alder Creek), drawn to show the problem.
        </p>
        <DocExamples />
      </section>

      <section aria-labelledby="backlog" className="sp-section sp-band">
        <div className="wrap">
          <Reveal as="h2" id="backlog" className="sp-h2 max-w-[22ch]">
            Sort before you repair
          </Reveal>
          <p className="sp-lede mt-4">
            Most sites hold thousands of PDFs added over many years, and nobody has the full list. Repair cost follows the number of files, so the first move is to shrink the pile. We promise no savings figure. The audit gives you your own numbers.
          </p>
          <ol className="mt-10 grid border-t hairline md:grid-cols-4 md:gap-x-8">
            {sortSteps.map((s) => (
              <li key={s.t} className="border-b py-5 hairline md:border-b-0">
                <h3 className="sp-h3">{s.t}</h3>
                <p className="mt-2 text-[0.975rem] text-ink-soft">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="roles" className="sp-section">
        <div className="wrap grid-12 gap-y-8">
          <Reveal as="h2" id="roles" className="sp-h2 col-span-12 lg:col-span-4">
            What each person on your team gets
          </Reveal>
          <dl className="col-span-12 border-t hairline lg:col-span-7 lg:col-start-6">
            {roles.map((r) => (
              <div key={r.who} className="grid gap-x-6 gap-y-1 border-b py-5 hairline sm:grid-cols-[11rem_1fr]">
                <dt className="font-[600]">{r.who}</dt>
                <dd className="text-ink-soft">{r.gets}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="agenda-title" id="agenda" className="night on-night">
        <div className="wrap grid-12 gap-y-8 py-16 sm:py-24">
          <div className="col-span-12 lg:col-span-6">
            <h2 id="agenda-title" className="headline !text-[length:var(--step-3)]">
              Agenda packets on a clock
            </h2>
            <p className="mt-5 inline-flex items-center gap-2 text-[0.9rem] font-[600] text-moon-muted">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ boxShadow: "inset 0 0 0 1.5px var(--color-moon-muted)" }} />
              Limited pilot, by arrangement
            </p>
          </div>
          <div className="prose-tight col-span-12 max-w-[56ch] text-moon-muted lg:col-span-5 lg:col-start-8">
            <p>
              The council packet is 180 pages and has to be posted before the weekend. Clerks send each packet when it is ready. We return it repaired and checked, with a turnaround agreed in writing, aiming for 24 to 48 hours while we measure real packets.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="month" className="sp-section">
        <div className="wrap grid-12 gap-y-6">
          <Reveal as="h2" id="month" className="sp-h2 col-span-12 lg:col-span-4">
            Three things to do this month
          </Reveal>
          <ol className="col-span-12 grid list-decimal gap-3 pl-5 text-ink-soft lg:col-span-6 lg:col-start-6">
            <li>
              Run your most-used form through the <Link href="/check" className="text-link">free PDF check</Link>. It takes a minute and the file stays on your computer.
            </li>
            <li>Ask who in each department posts PDFs, and roughly how many. Nobody usually knows the total.</li>
            <li>
              Decide who owns the work and the budget, then <Link href="/contact?topic=audit" className="text-link">ask for a written audit quote</Link>.
            </li>
          </ol>
        </div>
      </section>

      <BuyerCta
        id="gov-cta"
        title="Find out what is on your site."
        body="The Readiness Audit gives you an inventory, a ranked list and a plan your team can act on. We report what was checked. We do not certify compliance or give legal advice."
        primary={{ href: "/contact?topic=audit", label: "Request a Readiness Audit" }}
        secondary={{ href: "/readiness-audit", label: "What the audit includes" }}
      />
    </>
  );
}
