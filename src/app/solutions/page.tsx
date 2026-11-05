import type { Metadata } from "next";
import Link from "next/link";
import { PageCta, PageIntro } from "@/components/pages/PageParts";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Document accessibility work for cities and counties, clerks and agenda teams, municipal website agencies and accessibility firms.",
};

const audiences = [
  {
    id: "cities",
    who: "Cities and counties",
    moment: "The ADA coordinator has a deadline, a website with thousands of PDFs, and no clear idea which ones matter.",
    need: "A defensible starting point: what's on the site, what residents actually use, and a plan for the rest.",
    offer: "Readiness Audit, then the Readiness Package for must-fix documents.",
    href: "/product#audit",
  },
  {
    id: "clerks",
    who: "Clerks and agenda teams",
    moment: "It's Thursday afternoon. The council packet is 180 pages, and it has to be posted before the weekend.",
    need: "Accessible packets that don't push back the posting schedule.",
    offer: "Agenda Desk: packets returned remediated and checked on an agreed clock.",
    href: "/product#agenda",
  },
  {
    id: "agencies",
    who: "Municipal website agencies",
    moment: "A city client's new site launches next quarter, and the document library is coming along unchanged.",
    need: "A partner who handles documents properly, under your name, without slowing the launch.",
    offer: "White-label remediation and verification, scoped per project.",
    href: "/product#partners",
  },
  {
    id: "firms",
    who: "Accessibility and remediation firms",
    moment: "Your team is good at this, and booked solid. Meanwhile an RFP is asking for twice your usual volume.",
    need: "Overflow capacity, or an independent second check on work already done.",
    offer: "Overflow remediation and independent verification reports.",
    href: "/product#partners",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Solutions"
        title={
          <>
            Built for the people who <em>publish</em> public information.
          </>
        }
        lede="Different teams meet the same problem at different moments. Here's where we fit for each of them."
        note="Public documents only"
      />
      <div className="wrap pb-24">
        <ol>
          {audiences.map((a, i) => (
            <li key={a.id} id={a.id} className="grid-12 gap-y-6 border-t py-14 hairline sm:py-20">
              <div className="col-span-12 lg:col-span-4">
                <p className="tag !text-muted">{String(i + 1).padStart(2, "0")} / 04</p>
                <h2 className="mt-4 font-serif text-[length:var(--step-3)] leading-[1.02] tracking-[-0.02em]">{a.who}</h2>
              </div>
              <blockquote className="col-span-12 font-serif text-[length:var(--step-2)] italic leading-[1.25] text-ink-soft lg:col-span-5">
                <p>{a.moment}</p>
              </blockquote>
              <dl className="col-span-12 grid content-start gap-5 text-[0.975rem] lg:col-span-3">
                <div>
                  <dt className="tag !text-muted">What they need</dt>
                  <dd className="mt-1.5">{a.need}</dd>
                </div>
                <div>
                  <dt className="tag !text-muted">Where we start</dt>
                  <dd className="mt-1.5">
                    <Link href={a.href} className="text-link">
                      {a.offer}
                    </Link>
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
        <p className="border-t pt-8 text-[0.9rem] text-muted hairline">
          The scenes above are illustrations of common situations, not customer stories.
        </p>
      </div>
      <PageCta />
    </>
  );
}
