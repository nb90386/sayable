import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Reveal } from "@/components/pages/PageParts";
import { BuyerCta } from "@/components/pages/buyer/BuyerCta";
import { ReportPages, SampleCover, ScopeFunnel } from "@/components/pages/audit/SampleReport";

export const metadata: Metadata = {
  title: "Readiness Audit",
  description:
    "A written inventory of every PDF on your public website, sorted into fix, archive, delete or move to the web, with a ranked list and an effort estimate.",
  alternates: { canonical: "/readiness-audit" },
};

const buckets = [
  { name: "Must fix", tone: "var(--color-warm)", text: "Files people use to apply for, get or take part in a service: permit applications, utility assistance forms, current fee schedules." },
  { name: "Convert to web page", tone: "var(--color-signal)", text: "A two-page hours flyer residents would rather read on a phone. Moving it can cost less than repairing it." },
  { name: "Archive candidate", tone: "#8a93a3", text: "Old reference material nobody acts on. Your team confirms it meets the conditions for a clearly marked archive." },
  { name: "Delete candidate", tone: "#b9bec8", text: "Duplicates, expired notices, superseded drafts. Nothing is removed unless your team agrees." },
];

const deliverables = [
  { t: "A written report", d: "Plain language for a city manager and an ADA coordinator: what we looked at, what we found, what we recommend." },
  { t: "The inventory, as a spreadsheet", d: "Every PDF, the page that links to it, and a recommendation with the reason." },
  { t: "A ranked list", d: "Must-fix files in the order we suggest working on them, service documents first." },
  { t: "An effort estimate", d: "By type of page (text, tables, forms, scans), so you can see where the hours go." },
  { t: "A recommended plan", d: "What to do first, what to leave, and how to keep new files clean." },
];

const after = [
  { t: "You send a request", who: "You", d: "Your website address and a contact. No documents, no logins." },
  { t: "A 30-minute call", who: "You and us", d: "Where documents live, which services residents rely on, your timing. We answer your questions." },
  { t: "A written quote", who: "Us", d: "A scope and one flat fee, sized to your site. Nothing starts until you agree to it." },
  { t: "The audit", who: "Us", d: "We crawl your public site, inventory every linked PDF and check the files that matter." },
  { t: "Report and walkthrough", who: "You and us", d: "You receive the report and spreadsheet, and we go through them with your team." },
];

const need = [
  ["Your public website address", "Where the crawl starts."],
  ["Someone who knows where documents live", "For the call. Portals or agenda systems that are public but hard to find by links help a lot."],
  ["One contact", "To answer questions and receive the report."],
];

const notIncluded = [
  "Repair of the documents. That is a separate scope, and you choose who does it.",
  "Legal advice or a compliance determination. We report what was checked.",
  "Documents behind logins, unless agreed in writing.",
  "File types other than PDF.",
];

const faqs = [
  {
    q: "How is this different from a free PDF checker?",
    a: (
      <>
        <p>A free checker looks at one file at a time and reports technical errors. It does not tell you which of your 3,000 files matter.</p>
        <p>
          The audit starts with the whole site. It finds every linked PDF, shows where each one lives, and sorts them by what you should do. Then it checks the files that need it. You end up with a plan, not a pile of error messages.
        </p>
      </>
    ),
  },
  {
    q: "How reliable are the results?",
    a: (
      <>
        <p>
          The inventory depends on what is publicly linked, so files that are only reachable through a search box or a login can be missed. You can tell us where to look.
        </p>
        <p>
          Check results come from the PDF/UA-1 validator veraPDF and our own semantic check, which is still in testing. Neither one is a full accessibility test, and the report says what each one can and cannot see. For the numbers from our own tests, see{" "}
          <Link href="/verify" className="text-link">
            verification and quality
          </Link>
          . Those are preliminary benchmarks on sample documents, not customer outcomes.
        </p>
      </>
    ),
  },
  {
    q: "What needs human review?",
    a: (
      <>
        <p>
          Sorting is a recommendation, so your team reviews it. Archive and delete decisions are yours. On our side, a person looks at anything the software is unsure about, and tables, forms and scanned pages are never left to software alone.
        </p>
      </>
    ),
  },
  {
    q: "Can we review the findings before committing to more?",
    a: (
      <>
        <p>
          Yes. The audit stands on its own. You can use the report to plan work with your own staff, another vendor or us. If you want a smaller first step, say so in your request and we can scope a limited set of files.
        </p>
      </>
    ),
  },
  {
    q: "How is sensitive information handled?",
    a: (
      <>
        <p>
          We work with public documents only by default. Our crawler fetches publicly linked files, respects robots.txt, never logs in and does not try to get around access controls. We do not process student, health, law enforcement or HR records. More on our{" "}
          <Link href="/security" className="text-link">
            security page
          </Link>
          .
        </p>
      </>
    ),
  },
];

export default function ReadinessAuditPage() {
  return (
    <>
      <PageIntro
        title="Know which PDFs matter before you fix any of them."
        lede="A written inventory of every PDF on your public website, sorted by what to do with it, with check results for the files that count."
      />

      <div className="wrap pb-16 sm:pb-24">
        <div className="grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <dl className="border-t hairline">
              {[
                ["Scope", "Your public website and the PDFs linked from it."],
                ["Your time", "One 30-minute call, then a walkthrough of the report."],
                ["Cost", "One flat fee, quoted in writing after the call. No price is published, because it depends on the size of your site."],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-x-6 gap-y-1 border-b py-4 hairline sm:grid-cols-[6rem_1fr]">
                  <dt className="text-[0.85rem] font-[600] text-muted">{k}</dt>
                  <dd className="text-ink-soft">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link href="/contact?topic=audit" className="btn">
                Request a Readiness Audit <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
              </Link>
            </div>
            <p className="mt-4 flex max-w-[44ch] items-start gap-2 text-[0.9rem] text-muted">
              <span className="hx-status" data-state="now">Available now</span>
              <span>A service done by people with software help. It does not commit you to repairs.</span>
            </p>
          </div>
          <Reveal kind="depth" className="col-span-12 lg:col-span-6 lg:col-start-7">
            <SampleCover />
          </Reveal>
        </div>
      </div>

      <section aria-labelledby="receive" className="sp-section sp-band">
        <div className="wrap">
          <Reveal as="h2" id="receive" className="sp-h2 max-w-[20ch]">
            What you receive
          </Reveal>
          <ul className="mt-8 grid border-t hairline md:grid-cols-2 md:gap-x-12 lg:grid-cols-3">
            {deliverables.map((d) => (
              <li key={d.t} className="border-b py-5 hairline">
                <h3 className="sp-h3">{d.t}</h3>
                <p className="mt-1.5 text-[0.975rem] text-ink-soft">{d.d}</p>
              </li>
            ))}
          </ul>
          <Reveal as="h3" className="sp-h3 mt-14 !text-[length:var(--step-2)]">
            Three pages from a sample report
          </Reveal>
          <Reveal kind="depth" className="mt-6">
            <ReportPages />
          </Reveal>
          <p className="mt-6 max-w-[62ch] text-[0.9rem] text-muted">
            Sample. Fictional city (City of Alder Creek, aldercreek.example). The files and numbers are made up to show the shape of the report. It is not a client report, and the estimate shows effort, not a price.
          </p>
        </div>
      </section>

      <section aria-labelledby="assessed" className="sp-section">
        <div className="wrap">
          <div className="grid-12 gap-y-6">
            <Reveal as="h2" id="assessed" className="sp-h2 col-span-12 lg:col-span-5">
              How the files are sorted
            </Reveal>
            <p className="col-span-12 max-w-[56ch] text-ink-soft lg:col-span-6 lg:col-start-7">
              Every PDF we find is inventoried and placed in one of four groups. Sorting is a recommendation with reasons, and your team makes the decision. The ADA Title II web rule dates are April 26, 2027 for governments with a total population of 50,000 or more, and April 26, 2028 for those under 50,000 and special district governments. An inventory is the first step toward knowing what that means for your site.
            </p>
          </div>
          <dl className="mt-10 grid gap-x-12 border-t hairline md:grid-cols-2">
            {buckets.map((b) => (
              <div key={b.name} className="border-b py-5 hairline">
                <dt className="flex items-center gap-2.5 sp-h3">
                  <span aria-hidden="true" className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: b.tone }} />
                  {b.name}
                </dt>
                <dd className="mt-1.5 max-w-[52ch] text-[0.975rem] text-ink-soft">{b.text}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12">
            <ScopeFunnel />
          </div>
        </div>
      </section>

      <section aria-labelledby="scoping" className="sp-section sp-band">
        <div className="wrap">
          <Reveal as="h2" id="scoping" className="sp-h2 max-w-[24ch]">
            What happens after you request one
          </Reveal>
          <ol className="au-after mt-10">
            {after.map((s) => (
              <li key={s.t}>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <p className="who">{s.who}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-[62ch] text-ink-soft">
            We do not promise a date before we have seen your site. The written quote sets out the schedule, and you agree to it before anything starts.
          </p>
        </div>
      </section>

      <section aria-labelledby="provide" className="sp-section">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <Reveal as="h2" id="provide" className="sp-h2">
              What we need from you
            </Reveal>
            <ul className="mt-6 border-t hairline">
              {need.map(([t, d]) => (
                <li key={t} className="border-b py-4 hairline">
                  <h3 className="font-[600]">{t}</h3>
                  <p className="mt-1 text-[0.975rem] text-ink-soft">{d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <h2 id="limits" className="sp-h2">
              What is not included
            </h2>
            <ul className="mt-6 border-t hairline">
              {notIncluded.map((n) => (
                <li key={n} className="border-b py-4 text-[0.975rem] text-ink-soft hairline">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq" className="pb-16 sm:pb-24">
        <div className="wrap grid-12 gap-y-8">
          <h2 id="faq" className="sp-h2 col-span-12 lg:col-span-4">
            Questions buyers ask
          </h2>
          <div className="col-span-12 border-t hairline lg:col-span-7 lg:col-start-6">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b hairline">
                <summary className="flex min-h-[3.5rem] cursor-pointer list-none items-center justify-between gap-6 py-4 title text-[1.15rem] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="text-signal transition-transform group-open:rotate-90" data-icon="chev"></span>
                </summary>
                <div className="prose-tight max-w-[60ch] pb-6 text-ink-soft">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <BuyerCta
        id="audit-cta"
        title="Start with an inventory."
        body="Tell us your website address and who we should talk to. We will set up a short call and send a written scope."
        primary={{ href: "/contact?topic=audit", label: "Request a Readiness Audit" }}
      />
    </>
  );
}
