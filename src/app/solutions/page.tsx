import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/pages/PageParts";
import { BuyerCta } from "@/components/pages/buyer/BuyerCta";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Document accessibility work for cities and counties, their clerks and agenda teams, and for the website agencies and remediation firms that serve them.",
  alternates: { canonical: "/solutions" },
};

const paths = [
  {
    id: "government",
    who: "Cities, counties and districts",
    moment: "The ADA coordinator has a deadline, a website with thousands of PDFs, and no clear idea which ones matter.",
    start: "Start with a Readiness Audit: an inventory, a ranked list and a plan.",
    href: "/solutions/government",
    cta: "Solutions for government",
  },
  {
    id: "agencies",
    who: "Agencies and remediation firms",
    moment: "A city client's new site launches next quarter, and the document library is coming along unchanged.",
    start: "Audit the library before launch, add a second check, or hand off overflow work.",
    href: "/solutions/agencies",
    cta: "Solutions for agencies and firms",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageIntro
        title="Built for the people who publish public information."
        lede="Different teams meet the same problem at different moments. Pick the one closest to yours."
        note="Public documents only"
      />

      <div className="wrap pb-16">
        <ul className="border-t hairline">
          {paths.map((p) => (
            <li key={p.id} className="grid-12 gap-y-5 border-b py-12 hairline sm:py-16">
              <h2 className="headline col-span-12 !text-[length:var(--step-3)] lg:col-span-5">{p.who}</h2>
              <div className="col-span-12 lg:col-span-6 lg:col-start-7">
                <p className="text-[length:var(--step-1)] leading-[1.35] text-ink-soft">{p.moment}</p>
                <p className="mt-4 max-w-[52ch] text-ink-soft">{p.start}</p>
                <Link href={p.href} className="link-quiet mt-4">
                  {p.cta} <span aria-hidden="true" data-icon="arrow-r"></span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[62ch] text-ink-soft">
          Clerks and agenda teams: it is Thursday afternoon and the council packet has to be posted before the weekend. See the{" "}
          <Link href="/solutions/government#agenda" className="text-link">
            Agenda Desk section for government teams
          </Link>
          .
        </p>
        <p className="mt-6 max-w-[62ch] text-[0.9rem] text-muted">
          The situations above are illustrations of common moments, not customer stories.
        </p>
      </div>

      <BuyerCta
        id="solutions-cta"
        title="Start with what you already publish."
        body="Tell us about your site and your documents. We will scope an audit, or start with a small sample so you can judge the work first."
        primary={{ href: "/contact?topic=audit", label: "Request a Readiness Audit" }}
        secondary={{ href: "/readiness-audit", label: "What the audit includes" }}
      />
    </>
  );
}
