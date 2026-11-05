import Link from "next/link";
import { ReportExplorer } from "../sections/ReportExplorer";

const method = [
  { t: "Structural validation", d: "veraPDF against PDF/UA-1: tags, language, metadata, fonts.", who: "Software" },
  { t: "Semantic analysis", d: "The rendered page compared with its tags, in reading order.", who: "Software" },
  { t: "Human review", d: "Forms, tables, scans and anything a check disputes.", who: "Person" },
  { t: "Recheck after edits", d: "Every file checked again after its last change.", who: "Software" },
  { t: "Versioned output", d: "The original kept; each version says what changed.", who: "Record" },
  { t: "Evidence report", d: "What was checked, the results, and who signed off.", who: "Record" },
];

const research = [
  { n: "13 of 15", d: "subtle tag defects found by the semantic check in controlled tests; standard rule checks found 0 of 15." },
  { n: "13 of 32", d: "real-world sample pages that passed the PDF/UA-1 validator and the semantic check with no hand work." },
  { n: "0 of 19", d: "false flags from the semantic check on real auto-tagged pages in the same test." },
];

/** Chapter 6. Credibility from the method itself, not from logos. */
export function Trust() {
  return (
    <section data-sc-act="trust" aria-labelledby="trust-title" className="py-[clamp(7rem,14vh,11rem)]">
      <div className="wrap text-center">
        <h2 id="trust-title" className="headline mx-auto max-w-[15ch]">
          Every claim comes with <em>its evidence.</em>
        </h2>
        <p className="lede mx-auto mt-6 !max-w-[50ch]">
          No single check catches everything, so Sayable layers them and reports which one found what. It reports results;
          it does not certify legal compliance.
        </p>
      </div>

      <div className="wrap mt-14">
        <ol className="relative mx-auto grid max-w-[1100px] gap-y-8 sm:grid-cols-3 lg:grid-cols-6" aria-label="How every file is checked">
          <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-[2px] bg-signal/25 lg:block" />
          {method.map((m) => (
            <li key={m.t} className="relative pr-4">
              <span aria-hidden="true" className="relative block h-4 w-4 rounded-full border-[3px] border-paper bg-signal" />
              <h3 className="title mt-4 text-[1.05rem]">{m.t}</h3>
              <p className="mt-1.5 text-[0.9rem] leading-snug text-muted">{m.d}</p>
              <p className="mt-2 text-[0.78rem] font-[600] text-signal">{m.who}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="wrap mt-16">
        <div className="mx-auto max-w-[960px]">
          <ReportExplorer />
        </div>
      </div>

      <div className="wrap mt-16">
        <div className="mx-auto max-w-[960px]">
          <h3 className="title text-center text-[1.35rem]">What our research shows so far</h3>
          <p className="mx-auto mt-2 max-w-[60ch] text-center text-[0.95rem] text-muted">
            Preliminary benchmarks from our own tests on sample and synthetic documents in 2026, not customer outcomes.{" "}
            <Link href="/approach" className="text-link">
              Methods and limits
            </Link>
          </p>
          <dl className="mt-8 grid gap-8 text-center sm:grid-cols-3">
            {research.map((r) => (
              <div key={r.n}>
                <dt className="numeral text-[2.4rem] leading-none">{r.n}</dt>
                <dd className="mx-auto mt-3 max-w-[30ch] text-[0.92rem] text-muted">{r.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
