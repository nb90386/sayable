import type { Metadata } from "next";
import { PageCta, PageIntro, Spec } from "@/components/pages/PageParts";
import { stages } from "@/content/site";

export const metadata: Metadata = {
  title: "How it works",
  description: "How Sayable discovers, repairs, verifies, publishes and monitors accessible public documents.",
};

const detail: Record<string, { title: string; body: string[]; spec: string[]; who: string }> = {
  discover: {
    title: "Find every document, then decide what matters.",
    body: [
      "We crawl your public website politely: we respect robots.txt, make at most one request per second, never log in and never get around access controls. Every linked PDF is recorded along with the page it was linked from and the words used to link it.",
      "Each file is inspected. Is it tagged? Does it have a form? Is it a scan? Are there tables? Then it gets a recommendation with reasons. A permit application linked as “Apply” is a must-fix. Minutes from a closed fiscal year that nothing links to may be an archive candidate. These are recommendations; your team decides.",
    ],
    spec: ["Same-site crawling plus document hosts you confirm", "Duplicates detected by file fingerprint", "Must fix · Archive candidate · Delete candidate · Convert to web page"],
    who: "Software, reviewed by a person",
  },
  repair: {
    title: "Fix the structure. Never the words.",
    body: [
      "Untagged files get an initial structure from an open-source auto-tagger. Our software then compares the tags with the rendered page and proposes small edits: change a role, add alternative text, mark a page number as decoration, reorder top-level content. Each edit is applied only if the result checks no worse than before.",
      "Some things still need hands, so they go to a person: tables, lists, complex reading order, scanned pages, fonts that aren't embedded, and form labels, which are always checked.",
    ],
    spec: ["Edits limited to roles, order, alt text and field names", "Visible content stays identical", "Anything that fails re-checking goes to a person"],
    who: "Automation first, people for the hard parts",
  },
  verify: {
    title: "Three kinds of checking, because one isn't enough.",
    body: [
      "First, veraPDF, the open-source validator for the PDF/UA-1 standard, checks the file's technical structure. Second, our semantic check compares what a screen reader would traverse with what a sighted reader sees: headings that look like headings but aren't tagged, tables without header cells, content read out of order. Third, a person reviews whatever either check flags, and every form.",
      "Rule checks can pass a document that still makes no sense when read aloud. That gap is why the semantic check exists.",
    ],
    spec: ["veraPDF, PDF/UA-1 profile", "Sayable semantic check, page by page", "Human review with a written reason for any override"],
    who: "Software and people",
  },
  publish: {
    title: "Deliver files that are ready to post.",
    body: [
      "A file is only marked delivered after it has passed both checks following its final change, or after a person has overridden a result and written down why. Each file comes with a report you can keep on record.",
      "The report states plainly what was checked and what the results were. It is not a legal certification of compliance, and it says so.",
    ],
    spec: ["Per-file report: checks run, results, changes made, by whom", "Planned: a check-before-posting page for staff"],
    who: "Software, signed off by a person",
  },
  monitor: {
    title: "Keep new problems from piling up.",
    body: [
      "Publishing never stops. Agendas, notices and fee schedules keep arriving. Ongoing work covers new uploads as they appear and recurring issues, such as a template that keeps producing untagged tables, so they can be fixed at the source.",
      "Monitoring is on our roadmap, and today it runs as a service. We'll tell you exactly which parts are automated when we scope your work.",
    ],
    spec: ["New-document detection on your public site", "Recurring-issue patterns reported to your team"],
    who: "Service today; more automation over time",
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro
        title={
          <>
            One document, <em>five stages.</em>
          </>
        }
        lede="The same file moves from a messy public website to a checked, documented, ready-to-post result. Here is what happens at each step, and who does it."
        note="Software proposes · checks decide · people finish"
      />

      <nav aria-label="Stages" className="wrap">
        <ol className="flex flex-wrap gap-x-8 gap-y-2 border-y py-4 hairline">
          {stages.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="inline-flex min-h-10 items-center gap-2 no-underline hover:text-signal">
                {s.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="wrap pb-24">
        {stages.map((s) => {
          const d = detail[s.id]!;
          return (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="grid-12 gap-y-6 border-b py-16 hairline sm:py-24">
              <div className="col-span-12 md:col-span-4">
                <p className="title text-[length:var(--step-2)]">{s.name}</p>
                <p className="mt-2 font-[700] text-ink-soft">{d.who}</p>
              </div>
              <div className="col-span-12 md:col-span-7 md:col-start-6">
                <h2 id={`${s.id}-title`} className="headline !text-[length:var(--step-3)]">
                  {d.title}
                </h2>
                <div className="prose-tight mt-6 max-w-[62ch] text-ink-soft">
                  {d.body.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
                <Spec items={d.spec} />
              </div>
            </section>
          );
        })}
      </div>
      <PageCta />
    </>
  );
}
