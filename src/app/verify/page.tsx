import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/pages/PageParts";
import { BuyerCta } from "@/components/pages/buyer/BuyerCta";

export const metadata: Metadata = {
  title: "Verification and quality",
  description:
    "Why one accessibility check is never enough. How Sayable layers veraPDF, a semantic check and human review, and what each layer catches and misses.",
  alternates: { canonical: "/verify" },
};

const layers = [
  {
    name: "veraPDF validation",
    what: "Checks the file's structure against PDF/UA-1, the PDF accessibility standard. It is the free, open-source reference validator.",
    catches: "Missing tags, missing document language, untitled documents, malformed structure.",
    misses: "Whether the tags are right. A table can be tagged as a table and still read in the wrong order.",
  },
  {
    name: "Semantic check (in testing)",
    what: "Our own software, still a research prototype, that compares the rendered page with its tags. It asks whether what a reader sees matches what a screen reader will announce. We use it as an extra layer, never instead of a person.",
    catches: "Broken table structure, wrong heading levels, text read out of order, tags that contradict the page.",
    misses: "Judgment calls. Whether alternative text is useful, or whether a form makes sense, needs a person.",
  },
  {
    name: "Human review",
    what: "A trained reviewer looks at the parts software handles unreliably: tables, forms, scans and complex reading order.",
    catches: "Unclear alternative text, confusing form labels, scanned pages with no real text.",
    misses: "A human review is a sample of attention, not a screen-reader study with disabled users. We say so in the report.",
  },
  {
    name: "Re-check after edits",
    what: "Every file goes through the first two checks again after its last change. A fix for one problem can create another.",
    catches: "Regressions introduced by a repair, or by a late manual edit.",
    misses: "Anything the first two checks cannot see. It repeats them, it does not add a new view.",
  },
];

const research = [
  { n: "13 of 15", d: "subtle, deliberately injected tag defects caught by the semantic check. Standard rule checks caught 0 of 15." },
  { n: "13 of 32", d: "real-world sample pages passed both the PDF/UA-1 validator and the semantic check with no hand work." },
  { n: "0 of 19", d: "false flags from the semantic check on real auto-tagged pages in the same test." },
];

const stillManual = [
  "No blind screen-reader users have confirmed our checker's verdicts yet. A study with real users is planned.",
  "Tables, lists and complex reading order still need a person. Our first attempt to automate them failed.",
  "Quality on long multi-page documents, scanned pages and form tab order has not been measured yet.",
  "Fonts that are not embedded usually need hand repair.",
];

const rules = [
  {
    t: "We report results. We do not certify compliance.",
    d: "You will not see us call a file compliant, certified or approved. We say what was checked and what happened: passed veraPDF PDF/UA-1 validation, passed the semantic check, reviewed by a person.",
  },
  {
    t: "Software never invents document text.",
    d: "Automatic fixes change tags, reading order, alternative text and field names. The words and the look of your document stay as you published them.",
  },
  {
    t: "Sorting is a recommendation.",
    d: "We suggest which documents to fix, archive, delete or convert, and give reasons. Your team decides.",
  },
  {
    t: "Public documents only.",
    d: "We work with documents that are already public. We do not process student, health, law enforcement or HR records, and our crawler never logs in.",
  },
  {
    t: "Every delivered file is re-checked.",
    d: "Nothing is marked delivered unless it passes both checks, or a person has overridden a result and written down why.",
  },
  {
    t: "No legal advice.",
    d: "We explain what the rules cover in plain language. Decisions about legal obligations belong to you and your counsel.",
  },
];

const evidence = [
  "The checks that ran, with the version of each tool",
  "Pass or fail for each check, and the reason for any failure",
  "What was changed, by software or by a person",
  "Who reviewed the file, and any override with the reason written down",
  "The date of the last check and the version of the file it applies to",
];

export default function VerifyPage() {
  return (
    <>
      <PageIntro
        title="One check is never enough."
        lede="A PDF can pass a validator and still be unreadable with a screen reader. Sayable layers automated checks with human review and reports each result separately."
        note="Technical validation, not a legal determination"
      />

      <section aria-labelledby="layers" className="border-t hairline py-16 sm:py-24">
        <div className="wrap">
          <div className="grid-12 gap-y-6">
            <h2 id="layers" className="headline col-span-12 !text-[length:var(--step-3)] lg:col-span-5">
              What each layer catches, and what it misses
            </h2>
            <p className="col-span-12 max-w-[56ch] text-ink-soft lg:col-span-6 lg:col-start-7">
              Take a council agenda packet with a budget table. The validator confirms the table is tagged. The semantic check notices that the tags put the totals row first. A reviewer decides whether the column headings make sense. Each layer sees something the others do not.
            </p>
          </div>

          <ol className="mt-10 border-t hairline md:hidden">
            {layers.map((l) => (
              <li key={l.name} className="border-b py-6 hairline">
                <h3 className="title text-[1.2rem]">{l.name}</h3>
                <dl className="mt-3 space-y-3 text-ink-soft">
                  <div>
                    <dt className="text-[0.85rem] font-[600] text-muted">What it does</dt>
                    <dd className="mt-0.5">{l.what}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.85rem] font-[600] text-muted">Catches</dt>
                    <dd className="mt-0.5">{l.catches}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.85rem] font-[600] text-muted">Misses</dt>
                    <dd className="mt-0.5">{l.misses}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
          <div className="mt-12 hidden md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Comparison of verification layers: what each checks, catches and misses</caption>
              <thead>
                <tr className="border-y hairline text-[0.85rem] text-muted">
                  <th scope="col" className="w-[16%] py-3 pr-5 font-[700]">Layer</th>
                  <th scope="col" className="w-[28%] py-3 pr-5 font-[700]">What it does</th>
                  <th scope="col" className="w-[28%] py-3 pr-5 font-[700]">Catches</th>
                  <th scope="col" className="w-[28%] py-3 font-[700]">Misses</th>
                </tr>
              </thead>
              <tbody>
                {layers.map((l) => (
                  <tr key={l.name} className="border-b align-top hairline">
                    <th scope="row" className="title py-6 pr-5 text-[1.1rem]">{l.name}</th>
                    <td className="py-6 pr-5 text-[0.975rem] text-ink-soft">{l.what}</td>
                    <td className="py-6 pr-5 text-[0.975rem] text-ink-soft">{l.catches}</td>
                    <td className="py-6 text-[0.975rem] text-ink-soft">{l.misses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="two-verdicts" className="border-t py-16 hairline sm:py-24">
        <div className="wrap">
          <h2 id="two-verdicts" className="headline max-w-[22ch] !text-[length:var(--step-3)]">
            Same file, two verdicts
          </h2>
          <p className="mt-4 max-w-[60ch] text-ink-soft">
            An illustrative permit form after a quick repair. Every automated check passes. A person listening to it finds three problems a resident
            would hit straight away.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-[14px] bg-sheet p-6 shadow-[inset_0_0_0_1px_rgb(18_21_27/0.1)] sm:p-8">
              <p className="mono text-[0.82rem] text-muted">Automated checks</p>
              <ul className="mt-4 grid gap-3">
                {[
                  "PDF/UA-1 validator: no errors",
                  "Document is tagged, with a title and language",
                  "Every form field has a name",
                  "Every image has a description",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-ink">
                    <span className="check-status st-pass shrink-0">Pass</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[14px] bg-sheet p-6 shadow-[inset_0_0_0_1px_rgb(18_21_27/0.1)] sm:p-8">
              <p className="mono text-[0.82rem] text-muted">A person with a screen reader</p>
              <ul className="mt-4 grid gap-3">
                {[
                  ["The phone field is announced as \u201cApplicant name\u201d.", "The names exist, but two were copied from the wrong label."],
                  ["The fee table is read before the instructions.", "The tags are in an order the page is not."],
                  ["The city seal is described as \u201cimage1\u201d.", "A description is present, so the check counts it."],
                ].map(([t, d]) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="check-status st-fail shrink-0">Fail</span>
                    <span>
                      <span className="block text-ink">{t}</span>
                      <span className="block text-[0.92rem] text-muted">{d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-[0.84rem] text-muted">Illustrative example. Fictional city. Problems like these regularly pass automated checks, which confirm that names, tags and descriptions exist, not that they are right.</p>
        </div>
      </section>

      <section aria-labelledby="evidence" className="border-t bg-paper-deep/50 py-16 hairline sm:py-24">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="evidence" className="headline !text-[length:var(--step-3)]">
              Versioned output and an evidence report
            </h2>
            <p className="mt-6 max-w-[44ch] text-ink-soft">
              Each delivered file keeps its history. If you replace a fee schedule next year, the new version is checked on its own and the old record stays intact. Every file comes with a report that you can show to a board, an auditor or a resident who asks.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="sheet p-6 sm:p-8">
              <h3 className="title text-[1.15rem]">What a check report records</h3>
              <ul className="mt-5 border-t hairline">
                {evidence.map((e) => (
                  <li key={e} className="border-b py-3 hairline">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="research" className="border-t hairline py-16 sm:py-24">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="research" className="headline !text-[length:var(--step-3)]">
              What our tests show, and what they do not
            </h2>
            <p className="mt-6 max-w-[40ch] text-[0.95rem] text-muted">
              Preliminary internal benchmarks on sample and synthetic documents. They are not customer outcomes, and small samples can shift as we test more.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <dl className="border-t hairline">
              {research.map((r) => (
                <div key={r.n} className="grid gap-x-8 gap-y-2 border-b py-7 hairline sm:grid-cols-[11rem_1fr]">
                  <dt className="numeral text-[2.4rem] leading-none">{r.n}</dt>
                  <dd className="text-ink-soft">{r.d}</dd>
                </div>
              ))}
            </dl>
            <h3 className="title mt-12 text-[1.15rem]">Still unproven or still manual</h3>
            <ul className="mt-4 grid gap-3 text-[0.975rem] text-ink-soft sm:grid-cols-2">
              {stillManual.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="rules" className="border-t hairline py-16 sm:py-24">
        <div className="wrap">
          <h2 id="rules" className="headline !text-[length:var(--step-3)]">
            The rules we hold ourselves to
          </h2>
          <ol className="grid-12 mt-10">
            {rules.map((r, i) => (
              <li key={r.t} className={`col-span-12 grid grid-cols-[3rem_1fr] gap-x-4 border-t py-7 hairline md:col-span-6 ${i % 2 ? "md:pl-8" : "md:pr-8"}`}>
                <span className="tag pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="title text-[1.25rem]">{r.t}</h3>
                  <p className="mt-2 max-w-[52ch] text-ink-soft">{r.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-[62ch] border-t pt-6 text-[0.95rem] text-muted hairline">
            Technical validation is not a legal compliance determination. For how verification fits into the whole process, see{" "}
            <Link href="/how-it-works" className="text-link">
              how Sayable works
            </Link>
            .
          </p>
        </div>
      </section>

      <BuyerCta
        id="verify-cta"
        title="Hold us to it."
        body="An audit shows you the check results for your own must-fix files, with the evidence behind each one."
        primary={{ href: "/readiness-audit", label: "See the Readiness Audit" }}
        secondary={{ href: "/contact", label: "Contact us" }}
      />
    </>
  );
}
