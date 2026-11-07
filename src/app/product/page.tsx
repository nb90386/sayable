import type { Metadata } from "next";
import Link from "next/link";
import { PermitSheet, SheetLegend } from "@/components/doc/PermitSheet";
import { PageCta, PageIntro, Row, Spec } from "@/components/pages/PageParts";
import { FileScope, OfferLadder } from "@/components/pages/ProductTables";

export const metadata: Metadata = {
  title: "Product",
  description: "How Sayable finds, repairs, verifies and tracks public PDFs: the five-stage workflow, what is available today, and the services built on it.",
  alternates: { canonical: "/product" },
};

const workflow = [
  {
    id: "discover",
    name: "Discover",
    does: "Crawl your public site, list every linked PDF, and sort each one by what it is and how residents use it.",
    who: "Software, reviewed by your team",
    when: "Available now, in the audit",
    now: true,
  },
  {
    id: "repair",
    name: "Repair",
    does: "Software we are testing drafts routine fixes and a person checks them. Tables, forms, reading order and scans are done by a person. Visible content is never changed.",
    who: "Software and people",
    when: "Available now, as a service",
    now: true,
  },
  {
    id: "verify",
    name: "Verify",
    does: "Check every file with the PDF/UA validator, a semantic check and human review, then report what each one found.",
    who: "Software and people",
    when: "Available now, as a service",
    now: true,
  },
  {
    id: "publish",
    name: "Publish",
    does: "Let staff check a document before it goes live, with plain-language fixes.",
    who: "Self-serve tool",
    when: "In development",
    now: false,
  },
  {
    id: "monitor",
    name: "Monitor",
    does: "Notice new uploads and recurring problems before they pile up again.",
    who: "Software",
    when: "Planned",
    now: false,
  },
];

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
    body: "Everything in the audit, followed by remediation of the documents that must be fixed. Routine structure is drafted by software and checked by a person. Tables, lists, reading order, scanned pages and forms go to a person. Every file is re-checked after its last change and delivered with its own check report.",
    spec: [
      "Software-drafted fixes limited to tags, order, alternative text and field names. Visible content is never changed.",
      "Human remediation for the parts software doesn't handle reliably",
      "A check report per file: what was checked, what changed, who changed it",
    ],
  },
  {
    id: "agenda",
    n: "Offer 03",
    title: "Agenda Desk",
    kicker: "Meeting packets, turned around on a clock.",
    body: "Clerks send each agenda packet as it's ready, and we return it repaired and checked before the posting deadline. We are offering this as a limited pilot, with the turnaround agreed in writing for each city, while we measure how long real packets take.",
    spec: ["Limited pilot, by arrangement", "Turnaround agreed in writing per city", "Same checks and reports as every other file"],
  },
  {
    id: "check",
    n: "Offer 04",
    title: "Check before posting",
    kicker: "Stop new problems at the door.",
    body: "Staff can check a PDF before posting it with our free check, today. It runs in the browser, so the file is never uploaded, and it explains what it finds in plain English. A team version that also fixes routine problems is planned, not available yet.",
    spec: ["Free single-file check: available now at /check", "Automatic fixing and team features: planned"],
  },
  {
    id: "partners",
    n: "Offer 05",
    title: "Agency and overflow work",
    kicker: "For agencies and remediation firms.",
    body: "The same process and the same checks, with reports that can carry your name on request. It's for website agencies with municipal clients and remediation firms with more work than hands.",
    spec: ["Per-page work scoped with you", "Reports without Sayable branding on request"],
  },
];

export default function ProductPage() {
  return (
    <>
      <PageIntro
        title="Find, fix and verify every public PDF."
        lede="Sayable is a PDF accessibility service for public agencies. We find the PDFs that need attention, repair them by hand with help from software we are still testing, and check every file the same way. One part is free and yours to use today: the PDF check."
        note="Discover › Repair › Verify › Publish › Monitor"
      />

      <figure className="wrap pb-20 sm:pb-28">
        <div className="mx-auto max-w-[760px]">
          <PermitSheet
            layer="fixed"
            label="A sample permit application after the Repair and Verify stages: a level-one heading, every field named, and a reading order from the title to the date."
          />
          <SheetLegend layer="fixed" className="mt-6" />
        </div>
        <figcaption className="mx-auto mt-6 max-w-[56ch] text-center text-[0.95rem] text-ink-soft">
          What you get back: the same form, unchanged for sighted readers, with its structure named and ordered for
          everyone else. <span className="text-muted">Illustrative sample. Fictional city.</span>
        </figcaption>
      </figure>

      <section aria-labelledby="workflow-title" className="wrap pb-20 sm:pb-28">
        <h2 id="workflow-title" className="headline max-w-[22ch] !text-[length:var(--step-3)]">
          One workflow. Three stages you can buy today.
        </h2>
        <p className="mt-4 max-w-[60ch] text-ink-soft">
          Every engagement runs on the same five stages. The first three are delivered by our team today. The last two
          are software we are building, and we label them that way everywhere.
        </p>
        <ol className="relative mt-12 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-5" aria-label="The five stages">
          <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-[2px] bg-[linear-gradient(90deg,var(--color-signal)_0_60%,var(--rule-strong)_60%_100%)] lg:block" />
          {workflow.map((w, i) => (
            <li key={w.id} id={w.id} className="relative border-t pt-5 hairline lg:border-t-0 lg:pr-6 lg:pt-0">
              <span
                aria-hidden="true"
                className={`relative hidden h-4 w-4 rounded-full border-[3px] border-paper lg:block ${w.now ? "bg-signal" : "bg-[var(--rule-strong)]"}`}
              />
              <p className="numeral text-[1.1rem] text-muted lg:mt-5">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="title mt-1 text-[1.35rem]">{w.name}</h3>
              <p className="mt-2 text-[0.95rem] leading-snug text-ink-soft">{w.does}</p>
              <dl className="mt-4 space-y-1 text-[0.85rem]">
                <div className="flex gap-2">
                  <dt className="text-muted">Who</dt>
                  <dd className="font-[560]">{w.who}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-muted">Status</dt>
                  <dd className={`font-[600] ${w.now ? "text-signal" : "text-muted"}`}>{w.when}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-[60ch] text-ink-soft">
          See the stages on a sample permit form on the{" "}
          <Link href="/#product-title" className="text-link">
            home page
          </Link>
          , or read{" "}
          <Link href="/verify" className="text-link">
            how verification works
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="ladder-title" className="wrap pb-20 sm:pb-28">
        <h2 id="ladder-title" className="headline max-w-[22ch] !text-[length:var(--step-3)]">
          What you can buy, and what is free.
        </h2>
        <p className="mt-4 max-w-[60ch] text-ink-soft">
          Most cities start with the free check or a Readiness Audit. We quote every paid job in writing before any work starts.
        </p>
        <OfferLadder />
      </section>

      <section aria-labelledby="scope-title" className="wrap pb-20 sm:pb-28">
        <h2 id="scope-title" className="headline max-w-[22ch] !text-[length:var(--step-3)]">
          PDFs only. Here is exactly what that covers.
        </h2>
        <p className="mt-4 max-w-[60ch] text-ink-soft">
          We focus on PDFs, the format cities use for most forms, agendas and notices. Doing one format well beats doing five badly. We
          don&apos;t work on Word, PowerPoint or Excel files, or on web pages.
        </p>
        <FileScope />
      </section>

      <section aria-labelledby="services-title" className="wrap">
        <h2 id="services-title" className="headline !text-[length:var(--step-3)]">
          Each service in detail
        </h2>
      </section>
      <div className="wrap pb-24">
        {offers.map((o) => (
          <Row key={o.id} id={o.id} n={o.n} title={o.title} kicker={o.kicker}>
            <p>{o.body}</p>
            <Spec items={o.spec} />
            {o.id === "audit" ? (
              <p className="mt-6">
                <Link href="/readiness-audit" className="text-link">
                  What the Readiness Audit includes and costs
                </Link>
              </p>
            ) : null}
          </Row>
        ))}
        <div className="border-t pt-10 hairline">
          <p className="max-w-[60ch] text-ink-soft">
            Want the mechanics? See{" "}
            <Link href="/how-it-works" className="text-link">
              how each stage works
            </Link>{" "}
            or{" "}
            <Link href="/verify" className="text-link">
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
