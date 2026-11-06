import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Row, Spec } from "@/components/pages/PageParts";
import { ClosingBand } from "@/components/pages/guide/GuideParts";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sayable is an early-stage company helping local governments make public PDFs accessible. Read our mission, the principles we work by, and where we are today.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        title="Public documents should work for everyone who needs them."
        lede="Sayable helps cities, counties and the agencies that publish for them find accessibility problems in their PDFs, repair them, and prove what was checked."
        note="Early-stage company. Service first."
      />
      <div className="wrap pb-24">
        <Row id="why" title="Why public documents matter">
          <p>
            Budgets, permit forms, meeting agendas, notices and plans are how a local government talks to the people
            it serves. For many services the PDF is the service: the form you fill in, the schedule you plan around.
          </p>
          <p>
            When that document cannot be read by a screen reader, or its fields have no names, a resident who is
            blind or has low vision, or who has a motor disability, cannot do what everyone else does without help.
          </p>
        </Row>
        <Row id="hard" title="Why the work is hard at scale">
          <p>
            A mid-sized site can link to thousands of PDFs, produced by many people in many tools over many years.
            Each department posts on its own schedule. Meeting packets arrive as one long file hours before a
            deadline.
          </p>
          <p>
            Software can repair a lot of routine structure. It cannot decide whether a description fits a photograph
            or whether a table&apos;s headers are right. Doing the whole job takes both, and a plan for the files that
            will be published next month.
          </p>
        </Row>
        <Row id="principles" title="Principles we work by">
          <Spec
            items={[
              "Report what was checked. Every result says which tests ran and which items a person reviewed.",
              "Never certify. We do not claim a document or a website is compliant. That is a legal conclusion, and it is not ours to make.",
              "People for the hard parts. Tables, forms, scans and judgment calls go to a human reviewer.",
              "Never change visible content automatically. Repairs touch structure, such as tags, order, alternative text and field names. What readers see stays as it is.",
              "Keep the original. The file you gave us is retained alongside the repaired version.",
            ]}
          />
        </Row>
        <Row id="stage" title="Where we are today">
          <p>
            Sayable is an early-stage company. We start as a service: the Readiness Audit is the way in, backed by
            our own software that checks and repairs files. Self-serve checking and monitoring are planned, and they
            are not available yet.
          </p>
          <p>
            We would rather say that plainly than imply a bigger operation. If you want to see how the work holds up,
            ask for a small sample first.
          </p>
          <p>
            <Link href="/how-it-works" className="text-link">How it works</Link> and{" "}
            <Link href="/verify" className="text-link">how we verify</Link> describe the process in detail, and the{" "}
            <Link href="/resources" className="text-link">guides</Link> are written to be useful whether or not you
            work with us.
          </p>
        </Row>
      </div>
      <ClosingBand
        title="Tell us what you publish."
        body="A short conversation about your site and your documents is enough to scope a Readiness Audit."
        primary={{ href: "/contact?topic=audit", label: "Request an audit" }}
        secondary={{ href: "/readiness-audit", label: "About the audit" }}
      />
    </>
  );
}
