import type { Metadata } from "next";
import Link from "next/link";
import { PermitSheet, SheetLegend } from "@/components/doc/PermitSheet";
import { PageCta, PageIntro, Reveal } from "@/components/pages/PageParts";
import { BeforeAfter, ProductMock } from "@/components/pages/ProductMock";
import { Workflow } from "@/components/pages/Workflow";
import { FileScope, OfferLadder } from "@/components/pages/ProductTables";
import { Compare } from "@/components/story/Compare";

export const metadata: Metadata = {
  title: "Services and scope",
  description: "How Sayable finds, repairs, verifies and tracks public PDFs: the five-stage workflow, what is available today, and the services built on it.",
  alternates: { canonical: "/product" },
};

const nowItems = [
  { name: "Free PDF check", href: "/check", d: "One file, plain-English findings. Runs in your browser; the file is never uploaded." },
  { name: "Readiness Audit", href: "/readiness-audit", d: "Inventory of every linked PDF, sorted, with a ranked list, effort estimate and plan. Flat fee, quoted in writing." },
  { name: "PDF repair", href: "/contact?topic=repair", d: "Done and checked by people. Software we are testing drafts routine fixes. Each file returns with a check report." },
];
const laterItems = [
  { name: "Agenda Desk", state: "soon", d: "Meeting packets repaired and checked on a clock. Limited pilot by arrangement, turnaround agreed in writing." },
  { name: "Team check before posting", state: "soon", d: "A version of the free check for staff that also fixes routine problems. In development." },
  { name: "Monitoring", state: "soon", d: "Notices new uploads and recurring problems. Planned. Not available." },
];

const stages = [
  { name: "Find", d: "Crawl the public site and list every linked PDF with the page that links to it.", who: "Software finds. A person reads the list.", now: true, status: "Available now" },
  { name: "Prioritize", d: "Sort into fix, convert, archive or delete, and rank the files residents use.", who: "A person ranks. Your team decides.", now: true, status: "Available now" },
  { name: "Repair", d: "Names, headings, reading order, tables and forms put right.", who: "Done by people. Software in testing drafts routine fixes.", now: true, status: "Available now, by people" },
  { name: "Verify", d: "veraPDF and our semantic check, then a person on tables, forms and scans.", who: "Software checks. A person reviews.", now: true, status: "Available now" },
  { name: "Keep up", d: "Notice new uploads and recurring problems before they pile up.", who: "Software watches. A person reviews.", now: false, status: "Planned. Not available" },
];

const details = [
  { id: "audit", t: "Readiness Audit", d: "Every linked PDF inventoried, must-fix files checked and ranked, one written report.", link: { href: "/readiness-audit", label: "What the audit includes" } },
  { id: "package", t: "Readiness Package", d: "The audit, then repair of the must-fix files. Tables, lists, reading order, scans and forms go to a person. Every file is re-checked after its last change." },
  { id: "agenda", t: "Agenda Desk", d: "Clerks send each packet as it is ready; we return it repaired and checked. A limited pilot while we measure how long real packets take." },
  { id: "check", t: "Check before posting", d: "The free check works today. Automatic fixing and team features are planned, not available." },
  { id: "partners", t: "Agency and overflow work", d: "The same process and checks for website agencies and remediation firms. Reports without Sayable branding on request." },
];

export default function ProductPage() {
  return (
    <>
      <PageIntro
        title="Find, fix and verify every public PDF."
        lede="A PDF accessibility service for public agencies, and one free tool. Here is what you can use today, and what is still being built."
      />

      <section aria-labelledby="avail-title" className="wrap pb-16 sm:pb-24">
        <h2 id="avail-title" className="sr-only">
          Available now and planned
        </h2>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
          <div>
            <Reveal as="h3" className="sp-h2 !text-[length:var(--step-2)]">Available now</Reveal>
            <ul className="mt-5 border-t hairline">
              {nowItems.map((i) => (
                <li key={i.name} className="border-b py-5 hairline">
                  <p className="hx-status" data-state="now">
                    <Link href={i.href} className="text-link">{i.name}</Link>
                  </p>
                  <p className="mt-1.5 max-w-[52ch] text-[0.975rem] text-ink-soft">{i.d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Reveal as="h3" className="sp-h2 !text-[length:var(--step-2)]">Pilot or planned</Reveal>
            <ul className="mt-5 border-t hairline">
              {laterItems.map((i) => (
                <li key={i.name} className="border-b py-5 hairline">
                  <p className="hx-status" data-state="soon">{i.name}</p>
                  <p className="mt-1.5 max-w-[52ch] text-[0.975rem] text-ink-soft">{i.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 text-[0.9rem] text-muted">
          <span className="hx-status" data-state="now">Filled dot: available now</span>
          <span className="mx-3" aria-hidden="true">/</span>
          <span className="hx-status" data-state="soon">Hollow ring: pilot or planned</span>
        </p>
      </section>

      <section aria-labelledby="wf-title" className="sp-section sp-band">
        <div className="wrap">
          <Reveal as="h2" id="wf-title" className="sp-h2 max-w-[24ch]">
            Five stages, one record
          </Reveal>
          <p className="sp-lede mt-4">Software finds and drafts. A person decides. Nothing is marked done until it is checked again.</p>
          <div className="mt-10">
            <Workflow stages={stages} label="The five stages and what is available" />
          </div>
        </div>
      </section>

      <section aria-labelledby="flow-title" className="sp-section">
        <div className="wrap">
          <Reveal as="h2" id="flow-title" className="sp-h2 max-w-[24ch]">
            From a finding to a reviewed fix
          </Reveal>
          <p className="sp-lede mt-4">Pick a file, then a finding. Each one has a plain-language version for a city manager, the technical detail for whoever repairs it, and where it stands in review.</p>
          <div className="mt-10">
            <ProductMock />
          </div>
        </div>
      </section>

      <section aria-labelledby="ba-title" className="sp-section sp-band">
        <div className="wrap">
          <div className="grid-12 items-start gap-y-6">
            <div className="col-span-12 lg:col-span-4">
              <Reveal as="h2" id="ba-title" className="sp-h2">
                The page does not change. What a reader hears does.
              </Reveal>
              <p className="mt-4 text-ink-soft">One form field, before and after repair. Switch the view to compare the structure behind it and what a screen reader says.</p>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <BeforeAfter />
            </div>
          </div>
        </div>
      </section>

      <figure className="wrap sp-section">
        <div className="mx-auto max-w-[760px]">
          <Reveal kind="depth">
            <PermitSheet
              layer="fixed"
              label="A sample permit application after the Repair and Verify stages: a level-one heading, every field named, and a reading order from the title to the date."
            />
          </Reveal>
          <SheetLegend layer="fixed" className="mt-6" />
        </div>
        <figcaption className="mx-auto mt-6 max-w-[56ch] text-center text-[0.95rem] text-ink-soft">
          What you get back: the same form, unchanged for sighted readers, with its structure named and ordered for everyone else.{" "}
          <span className="text-muted">Illustrative sample. Fictional city.</span>
        </figcaption>
      </figure>

      <section aria-labelledby="ladder-title" className="wrap pb-16 sm:pb-24">
        <Reveal as="h2" id="ladder-title" className="sp-h2 max-w-[22ch]">
          What it costs
        </Reveal>
        <p className="mt-4 max-w-[60ch] text-ink-soft">
          The check is free. We quote every paid job in writing before any work starts, and publish no prices.
        </p>
        <OfferLadder />
      </section>

      <section aria-labelledby="scope-title" className="wrap pb-16 sm:pb-24">
        <Reveal as="h2" id="scope-title" className="sp-h2 max-w-[22ch]">
          PDFs only. Here is what that covers.
        </Reveal>
        <p className="mt-4 max-w-[60ch] text-ink-soft">
          We do not work on Word, PowerPoint or Excel files, or on web pages.
        </p>
        <FileScope />
      </section>

      <div id="compare" className="scroll-mt-[var(--header-h)]">
        <Compare />
      </div>

      <section aria-labelledby="services-title" className="wrap pt-16 sm:pt-24">
        <h2 id="services-title" className="sp-h2">
          Each service in a line
        </h2>
        <dl className="mt-8 border-t hairline pb-16 sm:pb-24">
          {details.map((o) => (
            <div key={o.id} id={o.id} className="grid scroll-mt-[var(--header-h)] gap-x-10 gap-y-1 border-b py-5 hairline md:grid-cols-[14rem_1fr]">
              <dt className="sp-h3">{o.t}</dt>
              <dd className="max-w-[62ch] text-ink-soft">
                {o.d}
                {o.link ? (
                  <>
                    {" "}
                    <Link href={o.link.href} className="text-link">{o.link.label}</Link>.
                  </>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <PageCta />
    </>
  );
}
