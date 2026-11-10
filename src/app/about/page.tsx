import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/pages/PageParts";
import { PageHero } from "@/components/pages/PageHero";
import { DocStructure } from "@/components/pages/about/DocStructure";
import { ClosingBand } from "@/components/pages/guide/GuideParts";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Sayable exists: public information lives in PDFs that many residents cannot use on their own. What we offer today, how we work, and how to get involved.",
  alternates: { canonical: "/about" },
};

const rules = [
  ["Findings in plain language.", "Each finding says what a person using a screen reader would hit, not only which rule failed."],
  ["A person reviews every fix.", "Software still in testing drafts routine edits. Tables, forms, scans and judgment calls go to a human reviewer."],
  ["A record of each check.", "Every result says which tests ran, which items a person reviewed, and what we did not claim."],
  ["We never certify.", "We do not call a document or a website compliant. That is a legal conclusion, and it is not ours to make."],
  ["Readers see the same page.", "Repairs touch structure: tags, order, alternative text, field names. We keep your original alongside the repaired file."],
];

const today = [
  { name: "Free PDF check", state: "now", d: "In your browser. The file is never uploaded." },
  { name: "Readiness Audit", state: "now", d: "A service done by people, with software help." },
  { name: "PDF repair", state: "now", d: "Done and checked by people. Software we are testing drafts routine fixes." },
  { name: "Agenda Desk", state: "soon", d: "Limited pilot, by arrangement." },
  { name: "Team tools and monitoring", state: "soon", d: "Planned. Not available yet." },
];

const involve = [
  { t: "Request a Readiness Audit", d: "An inventory of the PDFs your site links to, a ranked list of what to fix first, and a plan.", href: "/contact?topic=audit", cta: "Request an audit" },
  { t: "Talk about a pilot", d: "If you publish meeting packets on a deadline, we can talk about the limited Agenda Desk pilot.", href: "/contact", cta: "Start a conversation" },
  { t: "Tell us what screen-reader users hit", d: "If you rely on a screen reader, we want to hear which documents fail you and what a good result sounds like.", href: "/contact", cta: "Send feedback" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Public services run on PDFs that not every resident can use."
        lede="Permits, agendas and notices often live in PDFs. When a file has no structure, a resident who uses a screen reader cannot read it or fill it in without help. Sayable helps cities and counties find those problems and fix them."
        primary={{ href: "/contact?topic=audit", label: "Request an audit" }}
        secondary={{ href: "/readiness-audit", label: "About the audit" }}
      >
        <DocStructure />
      </PageHero>

      <section aria-labelledby="why" className="sp-section sp-band">
        <div className="wrap ab-split">
          <div>
            <Reveal as="h2" id="why" className="sp-h2 max-w-[18ch]">
              Why we started, and why now.
            </Reveal>
            <div className="prose-tight mt-5 max-w-[54ch] text-ink-soft">
              <p>
                A mid-sized city site can link to thousands of PDFs, made by many people in many tools over many years. Software can repair routine structure. It cannot judge whether a description fits a photograph or whether a table&apos;s headers are right. The job takes both, and a plan for next month&apos;s files.
              </p>
              <p>
                The federal ADA Title II web rule, with WCAG 2.1 AA as the standard, makes the backlog concrete. It has two dates.
              </p>
            </div>
          </div>
          <dl className="ab-deadlines">
            <div>
              <dt>April 26, 2027</dt>
              <dd>State and local governments with a total population of 50,000 or more, other than special district governments.</dd>
            </div>
            <div>
              <dt>April 26, 2028</dt>
              <dd>Smaller governments and special district governments.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="stage" className="sp-section">
        <div className="wrap ab-split">
          <div>
            <Reveal as="h2" id="stage" className="sp-h2 max-w-[16ch]">
              What we offer today
            </Reveal>
            <p className="mt-5 max-w-[44ch] text-ink-soft">
              Sayable is an early-stage company that starts as a service. We would rather say that plainly than imply a bigger operation. To see how the work holds up, ask for a small sample first.
            </p>
            <p className="mt-4 max-w-[44ch] text-ink-soft">
              See <Link href="/how-it-works" className="text-link">how it works</Link>, <Link href="/verify" className="text-link">how we verify</Link>, or the{" "}
              <Link href="/resources" className="text-link">guides</Link>, which are written to be useful whether or not you work with us.
            </p>
          </div>
          <ul className="ab-list">
            {today.map((t) => (
              <li key={t.name} className="grid gap-1 border-b py-4 hairline first:border-t">
                <span className="hx-status" data-state={t.state}>{t.name}</span>
                <span className="text-ink-soft">{t.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="rules-title" className="sp-section sp-band">
        <div className="wrap ab-split">
          <Reveal as="h2" id="rules-title" className="sp-h2 max-w-[16ch]">
            How we work
          </Reveal>
          <dl className="ab-list">
            {rules.map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="involve" className="sp-section">
        <div className="wrap">
          <Reveal as="h2" id="involve" className="sp-h2 max-w-[18ch]">
            Ways to get involved
          </Reveal>
          <ul className="ab-involve mt-8">
            {involve.map((i) => (
              <li key={i.t}>
                <h3>{i.t}</h3>
                <p>{i.d}</p>
                <Link href={i.href} className="link-quiet">
                  {i.cta} <span aria-hidden="true" data-icon="arrow-r"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingBand
        title="Tell us what you publish."
        body="A short conversation about your site and your documents is enough to scope a Readiness Audit."
        primary={{ href: "/contact?topic=audit", label: "Request an audit" }}
        secondary={{ href: "/readiness-audit", label: "About the audit" }}
      />
    </>
  );
}
