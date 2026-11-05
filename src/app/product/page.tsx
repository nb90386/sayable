import type { Metadata } from "next";
import Link from "next/link";
import { PageCta, PageIntro, Row, Spec } from "@/components/pages/PageParts";

export const metadata: Metadata = {
  title: "Product",
  description: "Readiness audits, remediation with check reports, agenda turnaround and check-before-posting for public documents.",
};

const offers = [
  {
    id: "audit",
    n: "Offer 01",
    title: "Readiness Audit",
    kicker: "Know what you have before you fix any of it.",
    body: "We inventory every PDF linked from your public website and sort each one into a recommendation: must fix, archive candidate, delete candidate, or better as a web page. Must-fix files are checked and ranked by risk. Forms and documents people use to apply for services come first.",
    spec: [
      "Inventory of publicly linked documents, with where each one is linked from",
      "Recommendations with reasons, which your team reviews and decides on",
      "Check results for must-fix files, or for a sample if the set is very large",
      "Effort estimate by page type: simple pages versus tables, forms and scans",
      "A written report and the full inventory as a spreadsheet",
    ],
  },
  {
    id: "package",
    n: "Offer 02",
    title: "Readiness Package",
    kicker: "The audit, then the repairs.",
    body: "Everything in the audit, followed by remediation of the documents that must be fixed. Routine structure is repaired automatically. Tables, lists, reading order, scanned pages and forms go to a person. Every file is re-checked after its last change and delivered with its own check report.",
    spec: [
      "Automatic fixes limited to tags, order, alternative text and field names. Visible content is never changed.",
      "Human remediation for the parts software doesn't handle reliably",
      "A check report per file: what was checked, what changed, who changed it",
    ],
  },
  {
    id: "agenda",
    n: "Offer 03",
    title: "Agenda Desk",
    kicker: "Meeting packets, turned around on a clock.",
    body: "Clerks send each agenda packet as it's ready. We return it remediated and checked, aiming for a 24 to 48 hour turnaround, so posting deadlines and accessibility don't compete.",
    spec: ["Upload or email intake", "Turnaround timers agreed in writing", "Same checks and reports as every other file"],
  },
  {
    id: "check",
    n: "Offer 04",
    title: "Check before posting",
    kicker: "Stop new problems at the door.",
    body: "A simple page where staff drop in a PDF before publishing it. They get a pass or fail, plain-language explanations of what to fix, and an optional automatic fix for routine structure. This one is still in development.",
    spec: ["Planned self-serve tool, not yet available", "Check-only mode of the same pipeline"],
  },
  {
    id: "partners",
    n: "Offer 05",
    title: "White-label and overflow",
    kicker: "For agencies and remediation firms.",
    body: "The same process, delivered under your name. It's for website agencies with municipal clients and remediation firms with more work than hands.",
    spec: ["Per-page work scoped with you", "Reports without Sayable branding on request"],
  },
];

export default function ProductPage() {
  return (
    <>
      <PageIntro
        title={
          <>
            Five ways in, <em>one standard</em> of checking.
          </>
        }
        lede="Sayable starts as a service backed by our own software: we find what needs attention, repair it with automation and people, and verify every file the same way."
        note="Discover › Repair › Verify › Publish › Monitor"
      />
      <div className="wrap pb-24">
        {offers.map((o) => (
          <Row key={o.id} id={o.id} n={o.n} title={o.title} kicker={o.kicker}>
            <p>{o.body}</p>
            <Spec items={o.spec} />
          </Row>
        ))}
        <div className="border-t pt-10 hairline">
          <p className="max-w-[60ch] text-ink-soft">
            Want the mechanics? See{" "}
            <Link href="/how-it-works" className="text-link">
              how each stage works
            </Link>{" "}
            or{" "}
            <Link href="/approach" className="text-link">
              the rules we hold ourselves to
            </Link>
            .
          </p>
        </div>
      </div>
      <PageCta />
    </>
  );
}
