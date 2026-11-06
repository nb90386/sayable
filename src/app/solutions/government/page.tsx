import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/pages/PageParts";
import { BuyerCta } from "@/components/pages/buyer/BuyerCta";

export const metadata: Metadata = {
  title: "Sayable for cities and counties",
  description:
    "Document accessibility for city managers, IT directors, clerks and ADA coordinators: sort the backlog, fix what matters, verify every file, keep new ones on track.",
  alternates: { canonical: "/solutions/government" },
};

const concerns = [
  {
    id: "access",
    t: "Public access to information",
    d: "A resident who uses a screen reader cannot apply for a building permit if the form has no field names. The same goes for utility assistance forms and council agenda packets. These are the files where a gap stops someone from using a service.",
  },
  {
    id: "backlog",
    t: "A backlog nobody can see",
    d: "Most sites have thousands of PDFs added over many years, by many departments. Nobody has a full list. The first job is to find out what is there.",
  },
  {
    id: "priorities",
    t: "Deciding what matters first",
    d: "Not every file deserves the same effort. We rank must-fix documents by how people use them, so forms and current service documents come before a 2014 newsletter.",
  },
];

const sortSteps = [
  { n: "1", t: "Inventory", d: "Every PDF linked from your public site, and the page that links to it." },
  { n: "2", t: "Sort", d: "Must fix, archive candidate, delete candidate, or better as a web page." },
  { n: "3", t: "Your team reviews", d: "Archive and delete candidates are reviewed by your team. They are not remediated by default." },
  { n: "4", t: "Repair what is left", d: "Only the must-fix files, in the order that serves residents first." },
];

const procurement = [
  "The Readiness Audit is a flat fee, with an indicative starting range of $1,500 to $5,000 by entity size. We aim to price it to fit small-purchase approval where possible.",
  "The scope is written down and quoted before anything starts.",
  "The audit stands on its own. You are not committing to repairs by buying it.",
  "Work is limited to public documents.",
];

export default function GovernmentPage() {
  return (
    <>
      <PageIntro
        title="Your documents are part of your front door."
        lede="For city managers, IT directors, clerks and ADA coordinators who publish PDFs and need to know which ones work for everyone."
        note="Public documents only"
      />

      <section aria-labelledby="problems" className="border-t hairline py-16 sm:py-24">
        <div className="wrap">
          <h2 id="problems" className="headline max-w-[18ch] !text-[length:var(--step-3)]">
            What you are dealing with
          </h2>
          <div className="mt-10 border-t hairline">
            {concerns.map((c) => (
              <div key={c.id} id={c.id} className="grid-12 gap-y-3 border-b py-8 hairline">
                <h3 className="title col-span-12 text-[1.35rem] md:col-span-4">{c.t}</h3>
                <p className="col-span-12 max-w-[60ch] text-ink-soft md:col-span-7 md:col-start-6">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="budget" className="border-t bg-paper-deep/50 py-16 hairline sm:py-24">
        <div className="wrap">
          <div className="grid-12 gap-y-6">
            <h2 id="budget" className="headline col-span-12 !text-[length:var(--step-3)] lg:col-span-5">
              Budgeting: sort before you repair
            </h2>
            <div className="prose-tight col-span-12 max-w-[60ch] text-ink-soft lg:col-span-6 lg:col-start-7">
              <p>
                Repair costs follow the number of files. So the cheapest move is to shrink the pile before anyone touches a file.
              </p>
              <p>
                We sort first. Files that look like archive or delete candidates are reviewed by your team. They are not remediated by default. What is left is the work to price. We do not promise a savings figure, because it depends on what your site holds. The audit gives you your own numbers.
              </p>
            </div>
          </div>
          <ol className="relative mt-12 grid gap-y-8 md:grid-cols-4 md:gap-x-6">
            <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-[2px] bg-signal/25 md:block" />
            {sortSteps.map((s) => (
              <li key={s.n} className="relative border-t pt-4 hairline md:border-t-0 md:pt-0">
                <span aria-hidden="true" className="relative hidden h-4 w-4 rounded-full border-[3px] border-paper bg-signal md:block" />
                <p className="numeral mt-3 text-[1.6rem] md:mt-5">{s.n}</p>
                <h3 className="title mt-2 text-[1.15rem]">{s.t}</h3>
                <p className="mt-2 text-[0.975rem] text-ink-soft">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="quality" className="border-t hairline py-16 sm:py-24">
        <div className="wrap grid-12 gap-y-6">
          <h2 id="quality" className="headline col-span-12 !text-[length:var(--step-3)] lg:col-span-5">
            Quality assurance you can show a board
          </h2>
          <div className="prose-tight col-span-12 max-w-[60ch] text-ink-soft lg:col-span-6 lg:col-start-7">
            <p>
              Every file is checked with the veraPDF validator and a semantic check, reviewed by a person where needed, and checked again after the last edit. Each file gets its own report.
            </p>
            <p>
              We report what was checked and what happened. We do not say a file is compliant, and we do not give legal advice. See{" "}
              <Link href="/verify" className="text-link">
                how verification works
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="agenda-title" id="agenda" className="night on-night">
        <div className="wrap grid-12 gap-y-8 py-16 sm:py-24">
          <div className="col-span-12 lg:col-span-6">
            <h2 id="agenda-title" className="headline !text-[length:var(--step-3)]">
              Ongoing publication: the Agenda Desk
            </h2>
          </div>
          <div className="prose-tight col-span-12 max-w-[56ch] text-moon-muted lg:col-span-5 lg:col-start-8">
            <p>
              It is Thursday afternoon. The council packet is 180 pages and it has to be posted before the weekend. Clerks send each packet when it is ready. We return it repaired and checked.
            </p>
            <p>
              We aim for a 24 to 48 hour turnaround, agreed in writing, so the posting deadline and accessibility do not compete. Every packet gets the same checks and the same report as any other file.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="procurement" className="border-t hairline py-16 sm:py-24">
        <div className="wrap grid-12 gap-y-8">
          <h2 id="procurement" className="headline col-span-12 !text-[length:var(--step-3)] lg:col-span-5">
            Procurement
          </h2>
          <ul className="col-span-12 border-t hairline lg:col-span-6 lg:col-start-7">
            {procurement.map((p) => (
              <li key={p} className="border-b py-4 text-ink-soft hairline">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BuyerCta
        id="gov-cta"
        title="Find out what is on your site."
        body="The Readiness Audit gives you an inventory, a ranked list and a plan your team can act on."
        primary={{ href: "/contact?topic=audit", label: "Request a Readiness Audit" }}
        secondary={{ href: "/readiness-audit", label: "What the audit includes" }}
      />
    </>
  );
}
