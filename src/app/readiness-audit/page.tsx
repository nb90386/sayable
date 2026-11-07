import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/pages/PageParts";
import { BuyerCta } from "@/components/pages/buyer/BuyerCta";
import { ReportPages, SampleCover, ScopeFunnel } from "@/components/pages/audit/SampleReport";

export const metadata: Metadata = {
  title: "Readiness Audit",
  description:
    "A written inventory of every PDF on your public website, sorted into fix, archive, delete or move to the web, with a ranked list and an effort estimate.",
  alternates: { canonical: "/readiness-audit" },
};

const buckets = [
  {
    name: "Must fix",
    text: "Documents people use to apply for, get or take part in a service. Permit applications, utility assistance forms, current fee schedules.",
  },
  {
    name: "Archive candidate",
    text: "Old reference material that no one needs to act on. Your team confirms it meets the conditions for a clearly marked archive.",
  },
  {
    name: "Delete candidate",
    text: "Duplicates, expired notices, superseded drafts. Nothing is removed unless your team agrees.",
  },
  {
    name: "Convert to web page",
    text: "A two-page hours-and-locations flyer that residents would rather read on their phone. Moving it can be cheaper than repairing it.",
  },
];

const deliverables = [
  { t: "A written report", d: "Plain language, written for a city manager and an ADA coordinator. It says what we looked at, what we found and what we recommend." },
  { t: "The full inventory as a spreadsheet", d: "Every PDF, the page that links to it, and the recommendation with the reason." },
  { t: "A ranked list", d: "Must-fix files in the order we suggest working on them, with forms and service documents first." },
  { t: "An effort estimate", d: "By type of page: simple text pages, tables, forms and scans. It shows where the hours go." },
  { t: "A recommended plan", d: "What to do first, what to leave, and what to put in place so new files start clean." },
];

const provide = [
  { t: "Your public website address", d: "Required. This is where the crawl starts." },
  { t: "A 30-minute call", d: "Someone who knows the website and can say where documents live. This is also where we scope the audit and answer your questions." },
  { t: "One contact", d: "Someone who can answer questions and receive the report." },
  { t: "Known document locations", d: "Optional but helpful. Document portals, agenda systems or file libraries that are public but hard to find by following links." },
  { t: "Priority services", d: "Optional. A short list of services residents rely on most, so we can rank those first." },
];

const steps = [
  { n: "1", t: "Send a request", d: "Your website address and a contact. A few minutes, no documents and no logins." },
  { n: "2", t: "Short call", d: "We ask about your site, your team and your timing. Thirty minutes is usually enough." },
  { n: "3", t: "Written quote", d: "We send a scope and one flat fee in writing, based on the size of your site. Nothing starts until you agree to it." },
  { n: "4", t: "Audit", d: "We crawl your public site, inventory the files and check the ones that matter." },
  { n: "5", t: "Report and review", d: "You get the report and the spreadsheet, and we walk your team through them." },
];

const notIncluded = [
  "Repairing the documents. That is a separate scope, and you choose whether to do it with us.",
  "Legal advice. We explain what the rules cover in plain language. Your counsel decides what applies to you.",
  "A compliance determination. We report what was checked. We do not say a file or a site is compliant.",
  "Documents behind logins, unless we agree otherwise in writing.",
  "Other file types. Sayable works on PDFs only, not Word, PowerPoint, Excel or web pages.",
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
          Check results come from the PDF/UA-1 validator veraPDF and our own semantic check. Neither one is a full accessibility test, and the report says what each one can and cannot see. For the numbers from our own tests, see{" "}
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
          Yes. The audit stands on its own. You can use the report to plan work with your own staff, another vendor or us. If you want a smaller first step, we can talk about a{" "}
          <Link href="/contact?topic=pilot" className="text-link">
            pilot on a limited set of files
          </Link>
          .
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
        lede="The Readiness Audit is a written inventory of every PDF on your public website, sorted by what to do with it, with check results for the files that count."
        note="Public documents only"
      />

      <div className="wrap pb-20 sm:pb-28">
        <div className="grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <dl className="border-t hairline">
              {[
                ["Scope", "Your public website and the PDFs linked from it."],
                ["Your time", "One 30-minute call, then a review of the report."],
                ["Price", "One flat fee, quoted in writing after the call, based on the size of your site."],
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
              <Link href="/contact?topic=pilot" className="link-quiet">
                Discuss a pilot
              </Link>
            </div>
            <p className="mt-4 max-w-[44ch] text-[0.9rem] text-muted">
              The audit is a human-assisted service, available now. It does not commit you to any further work.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <SampleCover />
          </div>
        </div>
      </div>

      <section aria-labelledby="who" className="border-t hairline py-16 sm:py-24">
        <div className="wrap grid-12 gap-y-6">
          <h2 id="who" className="headline col-span-12 !text-[length:var(--step-3)] lg:col-span-5">
            Who it is for
          </h2>
          <div className="prose-tight col-span-12 max-w-[60ch] text-ink-soft lg:col-span-6 lg:col-start-7">
            <p>
              Cities, counties and special districts that publish documents online and are not sure what is out there. Often the website has been growing for fifteen years. Nobody owns the PDF library. Someone has been asked to make sure it works for everyone.
            </p>
            <p>
              The audit also suits a clerk or IT director who needs a number and a plan before asking for budget.
            </p>
            <p>
              The ADA Title II web rule date is April 26, 2027 for cities with 50,000 or more residents, and April 26, 2028 for smaller governments and special districts. An inventory is the first step toward knowing what that means for your site.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="assessed" className="border-t hairline py-16 sm:py-24">
        <div className="wrap">
          <div className="grid-12 gap-y-6">
            <h2 id="assessed" className="headline col-span-12 !text-[length:var(--step-3)] lg:col-span-5">
              What we assess
            </h2>
            <div className="prose-tight col-span-12 max-w-[60ch] text-ink-soft lg:col-span-6 lg:col-start-7">
              <p>
                The scope is plain: your public website and the PDFs linked from it. Every PDF we find is inventoried. Check results come from the must-fix files, or from a stated sample when there are too many to check one by one.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <ScopeFunnel />
          </div>
          <h3 className="title mt-16 text-[length:var(--step-2)]">Every file goes into one of four groups</h3>
          <dl className="mt-6 border-t hairline">
            {buckets.map((b) => (
              <div key={b.name} className="grid gap-x-8 gap-y-2 border-b py-6 hairline md:grid-cols-[16rem_1fr]">
                <dt className="title text-[1.35rem]">{b.name}</dt>
                <dd className="max-w-[62ch] text-ink-soft">{b.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-[62ch] text-[0.95rem] text-muted">
            Sorting is a recommendation with reasons. Your team makes the decision. The rules for archived content have conditions, and the report reminds you of them.
          </p>
        </div>
      </section>

      <section aria-labelledby="receive" className="border-t bg-paper-deep/50 py-16 hairline sm:py-24">
        <div className="wrap">
          <h2 id="receive" className="headline !text-[length:var(--step-3)]">
            What&rsquo;s in the report
          </h2>
          <ol className="mt-8 grid border-t hairline md:grid-cols-2 md:gap-x-12">
            {deliverables.map((d, i) => (
              <li key={d.t} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b py-5 hairline">
                <span className="tag pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="title text-[1.15rem]">{d.t}</h3>
                  <p className="mt-1.5 text-[0.975rem] text-ink-soft">{d.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <h3 className="title mt-14 text-[length:var(--step-2)]">Three pages from a sample report</h3>
          <div className="mt-6">
            <ReportPages />
          </div>
          <p className="mt-6 max-w-[62ch] text-[0.9rem] text-muted">
            Sample. Fictional city. Made-up files and numbers, to show the shape of the report. It is not a real client report, and the estimate shows effort, not a price.
          </p>
        </div>
      </section>

      <section aria-labelledby="provide" className="border-t hairline py-16 sm:py-24">
        <div className="wrap grid-12 gap-y-8">
          <h2 id="provide" className="headline col-span-12 !text-[length:var(--step-3)] lg:col-span-5">
            What we need from you
          </h2>
          <ul className="col-span-12 border-t hairline lg:col-span-6 lg:col-start-7">
            {provide.map((p) => (
              <li key={p.t} className="border-b py-5 hairline">
                <h3 className="title text-[1.15rem]">{p.t}</h3>
                <p className="mt-1.5 text-ink-soft">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="scoping" className="border-t hairline py-16 sm:py-24">
        <div className="wrap">
          <h2 id="scoping" className="headline !text-[length:var(--step-3)]">
            How to request one
          </h2>
          <ol className="relative mt-12 grid gap-y-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6">
            <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-[2px] bg-signal/25 lg:block" />
            {steps.map((s) => (
              <li key={s.n} className="relative border-t pt-4 hairline lg:border-t-0 lg:pt-0">
                <span aria-hidden="true" className="relative hidden h-4 w-4 rounded-full border-[3px] border-paper bg-signal lg:block" />
                <p className="numeral mt-3 text-[1.6rem] lg:mt-5">
                  <span className="sr-only">Step </span>
                  {s.n}
                </p>
                <h3 className="title mt-2 text-[1.15rem]">{s.t}</h3>
                <p className="mt-2 text-[0.975rem] text-ink-soft">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid-12 gap-y-8 border-t pt-8 hairline">
            <div className="col-span-12 lg:col-span-5">
              <h3 className="title text-[length:var(--step-2)]">How long it takes</h3>
            </div>
            <div className="prose-tight col-span-12 max-w-[60ch] text-ink-soft lg:col-span-6 lg:col-start-7">
              <p>
                It depends on how big your site is and how many files need checking. A small site takes less time than a large one. We do not promise a date before we have seen your site. The written quote sets out the schedule, and you agree to it before anything starts.
              </p>
              <div className="mt-6">
                <Link href="/contact?topic=audit" className="btn">
                  Request a Readiness Audit <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="limits" className="border-t hairline py-16 sm:py-24">
        <div className="wrap grid-12 gap-y-8">
          <h2 id="limits" className="headline col-span-12 !text-[length:var(--step-3)] lg:col-span-5">
            What is not included
          </h2>
          <ul className="col-span-12 border-t hairline lg:col-span-6 lg:col-start-7">
            {notIncluded.map((n) => (
              <li key={n} className="border-b py-4 text-ink-soft hairline">
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="price" className="night on-night">
        <div className="wrap grid-12 gap-y-6 py-16 sm:py-24">
          <h2 id="price" className="headline col-span-12 !text-[length:var(--step-3)] lg:col-span-5">
            Price
          </h2>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="numeral text-[clamp(2rem,1.4rem+2.4vw,3.4rem)]">One flat fee, in writing</p>
            <p className="mt-4 max-w-[52ch] text-moon-muted">
              The fee is set by the size of your site and quoted in writing after a short scoping call. You see the price before anything starts, and the audit does not commit you to any further work.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq" className="py-16 sm:py-24">
        <div className="wrap grid-12 gap-y-8">
          <h2 id="faq" className="headline col-span-12 !text-[length:var(--step-3)] lg:col-span-4">
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
        secondary={{ href: "/contact?topic=pilot", label: "Discuss a pilot" }}
      />
    </>
  );
}
