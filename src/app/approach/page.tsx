import type { Metadata } from "next";
import { PageCta, PageIntro } from "@/components/pages/PageParts";

export const metadata: Metadata = {
  title: "Our approach",
  description: "The rules Sayable works by, and what our research has and hasn't shown yet.",
};

const rules = [
  {
    title: "We report results. We don't certify compliance.",
    body: "You'll never see us call a file “compliant”, “certified”, “100% accessible” or “ADA approved”. We tell you what was checked and what happened: passed veraPDF PDF/UA-1 validation, passed the semantic check, reviewed by a person.",
  },
  {
    title: "Software never invents document text.",
    body: "Automatic fixes change tags, reading order, alternative text and field names. The words and the look of your document stay exactly as you published them.",
  },
  {
    title: "Triage is a recommendation.",
    body: "We suggest which documents to fix, archive, delete or convert, and give reasons. Your team decides. Archive rules have conditions, and the report reminds you of them.",
  },
  {
    title: "Public documents only.",
    body: "We work with documents that are already public. We don't process student, health, law-enforcement or HR records, and our crawler never logs in.",
  },
  {
    title: "Every delivered file is re-checked.",
    body: "After the last change, every file goes through both checks again. Nothing is marked delivered unless it passes, or a person has overridden a result and written down why.",
  },
  {
    title: "No legal advice.",
    body: "We explain what the rules cover in plain language and point you to the source. Decisions about legal obligations belong to you and your counsel.",
  },
];

const research = [
  { figure: "13 of 32", text: "real-world sample pages passed both the PDF/UA-1 validator and our semantic check with no human work, after our full automated pipeline." },
  { figure: "13 of 15", text: "subtle, deliberately injected tag defects were caught by our semantic check. Standard rule checks caught none of the 15." },
  { figure: "0 of 19", text: "false flags on real auto-tagged pages whose structure was actually fine, in the same test set." },
];

export default function ApproachPage() {
  return (
    <>
      <PageIntro
        title={
          <>
            Say what was checked. <em>Nothing more.</em>
          </>
        }
        lede="Accessibility has a credibility problem: too many tools promise results they can't deliver. These are the rules we work by."
      />

      <div className="wrap pb-20">
        <ol className="grid-12 gap-y-0">
          {rules.map((r, i) => (
            <li key={r.title} className={`col-span-12 grid grid-cols-[3rem_1fr] gap-x-4 border-t py-8 hairline md:col-span-6 ${i % 2 ? "md:pl-8" : "md:pr-8"}`}>
              <span className="tag pt-2">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="font-serif text-[length:var(--step-2)] leading-[1.15] tracking-[-0.015em]">{r.title}</h2>
                <p className="mt-3 max-w-[52ch] text-ink-soft">{r.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <section aria-labelledby="research" className="border-t bg-paper-deep/50 hairline">
        <div className="wrap grid-12 gap-y-10 py-20 sm:py-28">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="research" className="headline mt-6 !text-[length:var(--step-3)]">
              What our tests show, <em>and what they don&apos;t.</em>
            </h2>
            <p className="mt-6 max-w-[40ch] text-[0.95rem] text-ink-soft">
              These results come from our own research on test documents and a public benchmark set. They are not customer
              outcomes, and small samples like these can shift as we test more.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <dl className="border-t hairline">
              {research.map((r) => (
                <div key={r.figure} className="grid gap-x-8 gap-y-2 border-b py-7 hairline sm:grid-cols-[11rem_1fr]">
                  <dt className="font-serif text-[2.6rem] leading-none tracking-[-0.03em]">{r.figure}</dt>
                  <dd className="text-ink-soft">{r.text}</dd>
                </div>
              ))}
            </dl>
            <h3 className="tag mt-12 !text-muted">Still unproven or still manual</h3>
            <ul className="mt-4 grid gap-3 text-[0.975rem] text-ink-soft sm:grid-cols-2">
              <li>No blind screen-reader users have confirmed our checker&apos;s verdicts yet. A study with real users is planned.</li>
              <li>Tables, lists and complex reading order still need a person. Our first attempt to automate them failed.</li>
              <li>Quality on long multi-page documents, scanned pages and form tab order hasn&apos;t been measured yet.</li>
              <li>Fonts that aren&apos;t embedded usually need hand repair.</li>
            </ul>
          </div>
        </div>
      </section>
      <PageCta title="Hold us to it." />
    </>
  );
}
