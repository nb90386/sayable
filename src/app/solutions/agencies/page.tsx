import type { Metadata } from "next";
import { PageIntro } from "@/components/pages/PageParts";
import { BuyerCta } from "@/components/pages/buyer/BuyerCta";

export const metadata: Metadata = {
  title: "Sayable for agencies and firms",
  description:
    "For website agencies with government clients and remediation firms: audit a client's document library before launch, add a second check, or hand off overflow work.",
  alternates: { canonical: "/solutions/agencies" },
};

const moments = [
  {
    when: "Before a launch",
    t: "Audit the client's document library",
    d: "The design is approved and the new site is ready. Then the client mentions 4,000 PDFs coming along unchanged. A Readiness Audit tells you what is in the library, which files matter and what the effort looks like, before the launch date is at risk.",
  },
  {
    when: "Before delivery",
    t: "A second check on finished work",
    d: "You or your client's vendor already repaired a batch. We check the files independently and return a report of what passed and what did not.",
  },
  {
    when: "When you are full",
    t: "Overflow remediation",
    d: "An RFP asks for twice your usual volume. We take part of the work, scoped per project, with the same checks and reports on every file.",
  },
  {
    when: "When the client asks",
    t: "Reports without Sayable branding",
    d: "On request, reports can be delivered without Sayable branding, so you can hand them on as part of your own deliverable. The details are agreed in the scope.",
  },
];

const rows = [
  ["Readiness Audit of a client's public site", "Yes. Flat fee, quoted in writing."],
  ["Remediation of must-fix documents", "Yes. Scoped per project."],
  ["Independent check of existing work", "Yes."],
  ["Reports without Sayable branding", "On request."],
  ["Integrations, APIs or white-label software", "Not offered."],
];

export default function AgenciesPage() {
  return (
    <>
      <PageIntro
        title="Your client's site is ready. Their PDF library may not be."
        lede="For website agencies with government clients and remediation firms that want a careful partner for document work."
        note="Service, not software"
      />

      <section aria-labelledby="moments" className="border-t hairline py-16 sm:py-24">
        <div className="wrap">
          <h2 id="moments" className="headline max-w-[16ch] !text-[length:var(--step-3)]">
            Where we fit in your work
          </h2>
          <ol className="mt-10 border-t hairline">
            {moments.map((m, i) => (
              <li key={m.t} className="grid-12 gap-y-3 border-b py-8 hairline">
                <p className="tag col-span-12 md:col-span-2">{String(i + 1).padStart(2, "0")} {m.when}</p>
                <h3 className="title col-span-12 text-[1.35rem] md:col-span-4">{m.t}</h3>
                <p className="col-span-12 max-w-[58ch] text-ink-soft md:col-span-6">{m.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="scope" className="border-t bg-paper-deep/50 py-16 hairline sm:py-24">
        <div className="wrap grid-12 gap-y-8">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="scope" className="headline !text-[length:var(--step-3)]">
              What is on offer, plainly
            </h2>
            <p className="mt-6 max-w-[42ch] text-ink-soft">
              Sayable is a service: people doing the work, with software we are still testing for the routine parts. You send us work and we send back repaired, checked files and reports. We are not offering a tool you plug into your own systems.
            </p>
          </div>
          <div className="col-span-12 overflow-x-auto lg:col-span-6 lg:col-start-7" tabIndex={0} role="region" aria-label="What is and is not offered">
            <table className="w-full min-w-[26rem] border-collapse text-left">
              <caption className="sr-only">What Sayable offers to agencies and firms</caption>
              <thead>
                <tr className="border-y hairline text-[0.85rem] text-muted">
                  <th scope="col" className="py-3 pr-5 font-[700]">Work</th>
                  <th scope="col" className="py-3 font-[700]">Available</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([a, b]) => (
                  <tr key={a} className="border-b align-top hairline">
                    <th scope="row" className="py-4 pr-5 font-[500]">{a}</th>
                    <td className="py-4 text-ink-soft">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="method" className="border-t hairline py-16 sm:py-24">
        <div className="wrap grid-12 gap-y-6">
          <h2 id="method" className="headline col-span-12 !text-[length:var(--step-3)] lg:col-span-5">
            Checked the same way every time
          </h2>
          <div className="prose-tight col-span-12 max-w-[60ch] text-ink-soft lg:col-span-6 lg:col-start-7">
            <p>
              Every file gets a veraPDF PDF/UA-1 check, a semantic check against the rendered page, human review where needed, and a re-check after the last edit. Each file comes with a report of what was checked.
            </p>
            <p>
              We report results. We do not certify compliance or give legal advice, so you will not find those claims in anything we hand you.
            </p>
          </div>
        </div>
      </section>

      <BuyerCta
        id="agency-cta"
        title="Talk through a client project."
        body="Tell us about the client, the size of the library and the date that matters. We will tell you honestly whether and how we can help."
        primary={{ href: "/contact?topic=partner", label: "Talk to us about a partnership" }}
        secondary={{ href: "/readiness-audit", label: "See the Readiness Audit" }}
      />
    </>
  );
}
