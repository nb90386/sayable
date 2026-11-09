import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Reveal } from "@/components/pages/PageParts";
import { ClosingBand } from "@/components/pages/guide/GuideParts";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sayable is an early-stage company helping local governments make public PDFs accessible. Our mission, the rules we work by, and what exists today.",
  alternates: { canonical: "/about" },
};

const rules = [
  ["We report what was checked.", "Every result says which tests ran and which items a person reviewed."],
  ["We never certify.", "We do not call a document or a website compliant. That is a legal conclusion, and it is not ours to make."],
  ["People take the hard parts.", "Tables, forms, scans and judgment calls go to a human reviewer."],
  ["We never change what readers see.", "Repairs touch structure: tags, order, alternative text, field names."],
  ["We keep your original.", "The file you gave us is retained alongside the repaired version."],
];

const today = [
  { name: "Free PDF check", state: "now", d: "In your browser. The file is never uploaded." },
  { name: "Readiness Audit", state: "now", d: "A service done by people, with software help." },
  { name: "PDF repair", state: "now", d: "Done and checked by people. Software we are testing drafts routine fixes." },
  { name: "Agenda Desk", state: "soon", d: "Limited pilot, by arrangement." },
  { name: "Team tools and monitoring", state: "soon", d: "Planned. Not available yet." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        title="Public documents should work for everyone who needs them."
        lede="Our mission: help cities, counties and the agencies that publish for them find accessibility problems in their PDFs, repair them, and show what was checked."
      />

      <section aria-labelledby="why" className="wrap pb-16 sm:pb-24">
        <div className="ab-split">
          <Reveal as="h2" id="why" className="sp-h2 max-w-[18ch]">
            For many services, the PDF is the service.
          </Reveal>
          <div className="prose-tight max-w-[56ch] text-ink-soft">
            <p>
              The permit form, the council agenda, the notice of a hearing. When a screen reader cannot read one, or its fields have no names, a resident who is blind, has low vision or a motor disability cannot do what everyone else does without help.
            </p>
            <p>
              A mid-sized city site can link to thousands of PDFs, made by many people in many tools over many years. Software can repair routine structure. It cannot judge whether a description fits a photograph or whether a table&apos;s headers are right. The job takes both, and a plan for next month&apos;s files.
            </p>
          </div>
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

      <section aria-labelledby="stage" className="sp-section">
        <div className="wrap ab-split">
          <div>
            <Reveal as="h2" id="stage" className="sp-h2 max-w-[16ch]">
              Where we are today
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

      <ClosingBand
        title="Tell us what you publish."
        body="A short conversation about your site and your documents is enough to scope a Readiness Audit."
        primary={{ href: "/contact?topic=audit", label: "Request an audit" }}
        secondary={{ href: "/readiness-audit", label: "About the audit" }}
      />
    </>
  );
}
