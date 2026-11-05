import Link from "next/link";
import { SplitAct } from "../split/SplitAct";
import { ReportExplorer } from "../sections/ReportExplorer";

const software = [
  { t: "Structural validation", d: "veraPDF against the PDF/UA-1 profile: tags, language, metadata, fonts." },
  { t: "Semantic analysis", d: "The rendered page compared with its tags in reading order: headings, tables, lists, alt text." },
  { t: "Revalidation after every change", d: "Each file is checked again after the last edit, before it is delivered." },
];
const people = [
  { t: "Human review", d: "Forms, tables, scans and anything a check disputes are handled or confirmed by a person." },
  { t: "Versioned files, documented findings", d: "The original is kept. Each version lists what changed, who changed it, and the tool versions." },
];
const research = [
  { n: "13 of 15", d: "subtle tag defects caught by the semantic check in controlled tests; standard rule checks caught 0 of 15." },
  { n: "13 of 32", d: "real-world sample pages that passed the PDF/UA-1 validator and the semantic check with no hand work." },
  { n: "0 of 19", d: "false flags from the semantic check on real auto-tagged pages in the same test." },
];

export function Trust() {
  return (
    <SplitAct
      act="trust"
      labelledBy="trust-title"
      head={
        <h2 id="trust-title" className="split-head headline">
          <span className="pb-8">What software checks.</span>
          <span className="pb-8">What people check.</span>
        </h2>
      }
      left={
        <div>
          <ol className="border-t hairline">
            {software.map((s) => (
              <li key={s.t} className="border-b py-5 hairline lg:text-right">
                <h3 className="title text-[1.4rem]">{s.t}</h3>
                <p className="mt-1.5 text-ink-soft lg:ml-auto lg:max-w-[40ch]">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 lg:text-right">
            <h3 className="title text-[1.4rem]">What our research shows so far</h3>
            <p className="mt-2 text-[0.95rem] text-ink-soft lg:ml-auto lg:max-w-[42ch]">
              Preliminary benchmarks from our own tests on sample and synthetic documents (2026), not customer outcomes.{" "}
              <Link href="/approach" className="text-link">
                Methods and limits
              </Link>
              .
            </p>
            <ul className="mt-6 border-t hairline">
              {research.map((r) => (
                <li key={r.n} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b py-4 text-left hairline">
                  <span className="title text-[1.5rem] tabular-nums">{r.n}</span>
                  <span className="text-[0.95rem] text-ink-soft">{r.d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
      right={
        <div>
          <ol className="border-t" style={{ borderColor: "var(--rule-night)" }}>
            {people.map((s) => (
              <li key={s.t} className="border-b py-5" style={{ borderColor: "var(--rule-night)" }}>
                <h3 className="title text-[1.4rem] text-moon">{s.t}</h3>
                <p className="mt-1.5 max-w-[42ch] text-moon-muted">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-ink">
            <ReportExplorer />
          </div>
          <p className="mt-6 max-w-[52ch] text-[0.88rem] text-moon-muted">
            Sayable reports what was checked and what the results were. It does not certify legal compliance.
          </p>
        </div>
      }
    />
  );
}
