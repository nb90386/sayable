import type { Metadata } from "next";
import Link from "next/link";
import { PageCta, PageIntro, Spec } from "@/components/pages/PageParts";
import { CheckColumns, CrawlLog, DeliveryPair, SortPiles, TagTreePair } from "@/components/pages/hiw/Artifacts";
import { StageFacts, StageLabel } from "@/components/pages/hiw/StageParts";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "How it works",
  description: "What you provide, what Sayable does at each stage, what needs a person, and what you get back, from the first inventory to checked documents.",
  alternates: { canonical: "/how-it-works" },
};

const stageNav = [
  { id: "discover", name: "Discover" },
  { id: "prioritize", name: "Prioritize" },
  { id: "repair", name: "Repair" },
  { id: "verify", name: "Verify" },
  { id: "deliver", name: "Deliver and manage" },
];

function Copy({ id, title, body, spec }: { id: string; title: string; body: ReactNode[]; spec?: string[] }) {
  return (
    <div>
      <h2 id={`${id}-title`} className="headline !text-[length:var(--step-3)]">
        {title}
      </h2>
      <div className="prose-tight mt-6 max-w-[62ch] text-ink-soft">
        {body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {spec ? <Spec items={spec} /> : null}
    </div>
  );
}

const journey = [
  { step: "You send your website address", body: "A short form. No documents, no logins, no files to export.", you: "About 5 minutes" },
  { step: "We scope it together", body: "A short call about where your documents live and what residents use most. Then a written scope and a fixed price.", you: "One call" },
  { step: "We inventory and check", body: "We crawl your public site, sort every PDF and check the ones that matter. We may ask you to confirm other places documents are hosted.", you: "Answer a question or two" },
  { step: "You review the findings", body: "A written report, the full inventory as a spreadsheet and a walkthrough. Your team decides what is archived, removed or fixed.", you: "One review meeting" },
  { step: "You choose what happens next", body: "Repairs by us, the Agenda Desk for new packets, or your own team working from the ranked list. Nothing continues unless you ask.", you: "Your decision" },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro
        title="From a website address to documents you can stand behind."
        lede="What you send us, what we do at each stage, what needs a person, and what you get back."
        note="Software proposes · checks decide · people finish"
      />

      <section aria-labelledby="journey-title" className="wrap pb-20 sm:pb-28">
        <div className="grid-12 gap-y-6">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="journey-title" className="headline !text-[length:var(--step-3)]">
              Your side of the work
            </h2>
            <p className="mt-4 max-w-[34ch] text-ink-soft">
              Most of the effort is ours. Here is everything we ask of your team, from first contact to a decision.
            </p>
            <Link href="/readiness-audit" className="link-quiet mt-4">
              What the audit includes <span aria-hidden="true" data-icon="chev"></span>
            </Link>
          </div>
          <ol className="col-span-12 border-t hairline lg:col-span-8">
            {journey.map((j, i) => (
              <li key={j.step} className="grid gap-x-6 gap-y-1 border-b py-5 hairline sm:grid-cols-[3rem_1fr_11rem]">
                <span className="numeral text-[1.4rem] text-signal">{i + 1}</span>
                <div>
                  <h3 className="title text-[1.15rem]">{j.step}</h3>
                  <p className="mt-1 text-[0.95rem] text-ink-soft">{j.body}</p>
                </div>
                <p className="text-[0.88rem] text-muted sm:text-right">
                  <span className="sr-only">Your time: </span>
                  {j.you}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <h2 className="sr-only">The five stages</h2>
      <nav aria-label="Stages" className="wrap">
        <ol className="flex flex-wrap gap-x-8 gap-y-2 border-y py-4 hairline">
          {stageNav.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="inline-flex min-h-10 items-center gap-2 no-underline hover:text-signal">
                <span aria-hidden="true" className="mono text-[0.8rem] text-muted">
                  {i + 1}
                </span>
                {s.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* 1. Discover: wide crawl log under a two-column head */}
      <section id="discover" aria-labelledby="discover-title" className="py-16 sm:py-24">
        <div className="wrap">
          <div className="grid-12 gap-y-8">
            <div className="col-span-12 md:col-span-4">
              <StageLabel num={1} name="Discover" status={[{ label: "Delivered now as a service", state: "now" }]} />
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <Copy
                id="discover"
                title="Find every document."
                body={[
                  "We crawl your public website politely: we respect robots.txt, make at most one request per second, never log in and never get around access controls. Every linked PDF is recorded along with the page it was linked from and the words used to link it.",
                  "Each file is then inspected. Is it tagged? Does it have a form? Is it a scan? Are there tables?",
                ]}
                spec={["Same-site crawling plus document hosts you confirm", "Duplicates detected by file fingerprint"]}
              />
            </div>
          </div>
          <div className="mt-12">
            <CrawlLog />
          </div>
          <div className="mt-10">
            <StageFacts
              provide="Your public website address, plus any document portals or agenda systems you want included."
              returns="An inventory of every linked PDF, the page that links it, and what kind of file it is."
              who={["software", "person"]}
              whoNote="Software crawls and inspects. A person reviews the result."
            />
          </div>
        </div>
      </section>

      {/* 2. Prioritize: three piles on a band */}
      <section id="prioritize" aria-labelledby="prioritize-title" className="bg-paper-deep/60 py-16 sm:py-24">
        <div className="wrap">
          <div className="max-w-[46rem]">
            <StageLabel num={2} name="Prioritize" status={[{ label: "Delivered now as a service", state: "now" }]} />
            <div className="mt-8">
              <Copy
                id="prioritize"
                title="Sort the pile into decisions."
                body={[
                  "Each file gets a recommendation with reasons. A permit application linked as “Apply” is a must-fix. Minutes from a closed fiscal year that nothing links to may be an archive candidate. These are recommendations; your team decides.",
                ]}
              />
            </div>
          </div>
          <div className="mt-12">
            <SortPiles />
          </div>
          <div className="mt-12">
            <StageFacts
              provide="A short talk about which services residents rely on most, then your decision on each recommendation."
              returns="A reason for every file, and a ranked list of the must-fix files."
              who={["software", "person"]}
              whoNote="Software proposes. A person reviews. You decide."
            />
          </div>
        </div>
      </section>

      {/* 3. Repair: text rail on the left, tag trees on the right */}
      <section id="repair" aria-labelledby="repair-title" className="py-16 sm:py-24">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <StageLabel num={3} name="Repair" status={[{ label: "Delivered now, human-assisted", state: "now" }]} />
            <div className="mt-8">
              <Copy
                id="repair"
                title="Fix the structure. Never the words."
                body={[
                  "Untagged files get an initial structure from an open-source auto-tagger. Our software then compares the tags with the rendered page and proposes small edits: change a role, add alternative text, mark a page number as decoration, reorder top-level content. Each edit is applied only if the result checks no worse than before.",
                  "Some things still need hands, so they go to a person: tables, lists, complex reading order, scanned pages, fonts that aren't embedded, and form labels, which are always checked.",
                ]}
                spec={["Edits limited to roles, order, alt text and field names", "Visible content stays identical", "Anything that fails re-checking goes to a person"]}
              />
            </div>
            <div className="mt-8">
              <dl className="grid gap-5 border-t pt-6 hairline">
                <div>
                  <dt className="text-[0.85rem] font-[600] text-muted">You provide</dt>
                  <dd className="mt-1.5 text-[0.975rem] text-ink-soft">Your go-ahead on which files to repair.</dd>
                </div>
                <div>
                  <dt className="text-[0.85rem] font-[600] text-muted">Sayable returns</dt>
                  <dd className="mt-1.5 text-[0.975rem] text-ink-soft">Repaired copies with the visible content unchanged, and a list of every change.</dd>
                </div>
                <div>
                  <dt className="text-[0.85rem] font-[600] text-muted">Who does the work</dt>
                  <dd className="mt-1.5 text-[0.975rem] text-ink-soft">
                    <span className="mb-2 flex flex-wrap gap-1.5">
                      <span className="hx-mark" data-who="software">Software</span>
                      <span className="hx-mark" data-who="person">Person</span>
                    </span>
                    Automation first, people for the hard parts.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pt-3">
            <TagTreePair />
          </div>
        </div>
      </section>

      {/* 4. Verify: two checklists on a band */}
      <section id="verify" aria-labelledby="verify-title" className="bg-paper-deep/60 py-16 sm:py-24">
        <div className="wrap">
          <div className="grid-12 gap-y-8">
            <div className="col-span-12 md:col-span-4">
              <StageLabel num={4} name="Verify" status={[{ label: "Delivered now, human-assisted", state: "now" }]} />
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-7 lg:col-start-6">
              <Copy
                id="verify"
                title="Three kinds of checking, because one isn't enough."
                body={[
                  "First, veraPDF, the open-source validator for the PDF/UA-1 standard, checks the file's technical structure. Second, our semantic check, still a research prototype, compares what a screen reader would traverse with what a sighted reader sees: headings that look like headings but aren't tagged, tables without header cells, content read out of order. Third, a person reviews whatever either check flags, and every form.",
                  "Rule checks can pass a document that still makes no sense when read aloud. That gap is why the semantic check exists.",
                ]}
              />
            </div>
          </div>
          <div className="mt-12">
            <CheckColumns />
          </div>
          <div className="mt-12">
            <StageFacts
              provide="Nothing. Your team can read the results as they come back."
              returns="Check results for every delivered file: validator output, semantic findings and reviewer notes."
              who={["software", "person"]}
              whoNote="Software runs both checks. A person reviews every form and every flag."
            />
          </div>
        </div>
      </section>

      {/* 5. Deliver and manage: file and report pair, then the planned part */}
      <section id="deliver" aria-labelledby="deliver-title" className="py-16 sm:py-24">
        <div className="wrap">
          <div className="grid-12 items-start gap-y-10">
            <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:row-start-1">
              <StageLabel
                num={5}
                name="Deliver and manage"
                status={[
                  { label: "Files and reports: delivered now", state: "now" },
                  { label: "Publishing integration: in development", state: "soon" },
                  { label: "Monitoring: planned", state: "soon" },
                ]}
              />
              <div className="mt-8">
                <Copy
                  id="deliver"
                  title="Deliver files that are ready to post."
                  body={[
                    "A file is only marked delivered after it has passed both checks following its final change, or after a person has overridden a result and written down why. Each file comes with a report you can keep on record.",
                    "The report states plainly what was checked and what the results were. It is not a legal certification of compliance, and it says so.",
                  ]}
                />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-1 lg:row-start-1">
              <DeliveryPair />
            </div>
          </div>

          <div className="mt-12">
            <StageFacts
              provide="A way to post the files: your web team uploads them, or tells us how your site takes them. And who should receive the reports."
              returns="Repaired PDFs, each with its report. Your team posts them."
              who={["software", "person"]}
              whoNote="Software assembles the report. A person signs off before delivery."
            />
          </div>

          <div id="monitor" className="mt-14 grid-12 gap-y-4 rounded-[14px] border-[1.5px] border-dashed p-6 sm:p-8" style={{ borderColor: "var(--rule-strong)" }}>
            <div className="col-span-12 lg:col-span-5">
              <h3 className="title text-[length:var(--step-2)]">Keep new problems from piling up.</h3>
              <p className="mt-3 text-[0.85rem] font-[600] text-muted">Monitoring software is planned, not available yet.</p>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <div className="prose-tight max-w-[62ch] text-ink-soft">
                <p>
                  Publishing never stops. Agendas, notices and fee schedules keep arriving. Ongoing work covers new uploads as they appear and recurring issues, such as a template that keeps producing untagged tables, so they can be fixed at the source.
                </p>
                <p>
                  Until the software exists, reviewing new uploads can be part of an ongoing service, scoped in writing, and we tell you exactly which parts are automated. For single files, our free <Link href="/check" className="text-link">Check a PDF</Link> tool runs in your browser today.
                </p>
              </div>
              <Spec items={["New-document detection on your public site (planned)", "Recurring-issue patterns reported to your team"]} />
            </div>
          </div>
        </div>
      </section>
      <PageCta />
    </>
  );
}
