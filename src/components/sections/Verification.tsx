import Link from "next/link";
import { ReportExplorer } from "./ReportExplorer";

const custody = [
  { who: "machine", t: "Structural validation", d: "veraPDF against the PDF/UA-1 profile: tags, language, metadata, fonts." },
  { who: "machine", t: "Semantic analysis", d: "The rendered page compared with its tags in reading order: headings, tables, lists, alt text." },
  { who: "person", t: "Human review", d: "Forms, tables, scans and anything a check disputes are handled or confirmed by a person." },
  { who: "machine", t: "Revalidation after changes", d: "Every file is checked again after the last edit, before it is delivered." },
  { who: "person", t: "Versioned files, documented findings", d: "The original is kept. Each version lists what changed, who changed it, and the tool versions." },
] as const;

const research = [
  { n: "13 of 15", d: "subtle tag defects caught by the semantic check in controlled tests. Standard rule checks caught 0 of 15." },
  { n: "13 of 32", d: "real-world sample pages that passed both the PDF/UA-1 validator and the semantic check with no hand work." },
  { n: "0 of 19", d: "false flags from the semantic check on real auto-tagged pages in the same test." },
];

export function Verification() {
  return (
    <section aria-labelledby="ver-title" className="relative pb-24 pt-24 sm:pb-32 sm:pt-28">
      <div className="wrap">
        <div className="grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-5 lg:pr-6">
            <h2 id="ver-title" className="headline">
              No single check is enough. So we layer them.
            </h2>
            <p className="mt-6 max-w-[44ch] text-ink-soft">
              A validator can pass a file whose headings are in the wrong place. A careful reviewer can miss a missing
              language tag. Each check covers what the others cannot, and the report says which one found what.
            </p>

            {/* custody line: solid where software checked, dashed where a person did */}
            <ol className="relative mt-10" aria-label="How every file is checked">
              {custody.map((c, i) => (
                <li key={c.t} className="relative grid grid-cols-[1.75rem_1fr] gap-4 pb-7 last:pb-0">
                  <span aria-hidden="true" className="relative flex justify-center">
                    {i < custody.length - 1 ? (
                      <span
                        className={`absolute bottom-[-0.5rem] top-4 w-0 ${
                          c.who === "machine" ? "border-l-2 border-signal" : "border-l-2 border-dashed border-signal/50"
                        }`}
                      />
                    ) : null}
                    <span className="relative mt-1.5 h-3 w-3 rounded-full bg-signal" />
                  </span>
                  <span>
                    <span className="title block text-[1.25rem]">{c.t}</span>
                    <span className="mt-1 block text-[0.95rem] text-ink-soft">{c.d}</span>
                    <span className="mt-1 block text-[0.82rem] font-[600] text-signal">{c.who === "machine" ? "Software check" : "Person"}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <ReportExplorer />
          </div>
        </div>

        <div className="mt-20 grid-12 gap-y-6">
          <div className="col-span-12 md:col-span-4">
            <h3 className="title text-[1.6rem]">What our research shows so far</h3>
            <p className="mt-3 max-w-[36ch] text-[0.925rem] text-ink-soft">
              Preliminary benchmarks from our own tests on sample and synthetic documents, not customer outcomes.
              Tables, lists, reading order and scanned pages still need people.{" "}
              <Link href="/approach" className="text-link">
                Read our approach
              </Link>
              .
            </p>
          </div>
          <ul className="col-span-12 md:col-span-8">
            {research.map((r) => (
              <li
                key={r.n}
                className="grid grid-cols-[6rem_1fr] items-baseline gap-x-4 gap-y-1 border-t border-ink/40 py-4 last:border-b sm:grid-cols-[8rem_1fr_auto]"
              >
                <span className="title text-[1.45rem] tabular-nums">{r.n}</span>
                <span className="text-[0.95rem] text-ink-soft">{r.d}</span>
                <span className="mono col-start-2 text-[0.8rem] text-ink-soft sm:col-start-auto">Preliminary</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
