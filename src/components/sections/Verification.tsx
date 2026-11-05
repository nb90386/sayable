import Link from "next/link";

const custody = [
  { who: "machine", t: "veraPDF, PDF/UA-1 profile", d: "The free, open-source validator many buyers already run. Confirms the file is structurally sound." },
  { who: "machine", t: "Semantic review", d: "Compares the rendered page with its tags in screen-reader order: headings, reading order, tables, lists, alt text." },
  { who: "person", t: "Human review", d: "Forms, tables, scans and anything a check disputes are handled or confirmed by a person." },
  { who: "person", t: "A plain report", d: "What was checked, what changed, who changed it, and the tool versions, for every file." },
] as const;

const research = [
  { n: "13 of 15", d: "subtle tag defects caught by the semantic check in controlled tests. Standard rule checks caught 0 of 15." },
  { n: "13 of 32", d: "real-world sample pages that passed both the PDF/UA-1 validator and the semantic check with no hand work." },
  { n: "0 of 19", d: "false flags from the semantic check on real auto-tagged pages in the same test." },
];

export function Verification() {
  return (
    <section aria-labelledby="ver-title" className="relative bg-paper-deep pb-24 pt-24 sm:pb-32 sm:pt-28">
      <div className="wrap">
        <div className="grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="ver-title" className="headline">
              No single check is enough. <em>So we layer them.</em>
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
                          c.who === "machine" ? "border-l-2 border-signal" : "border-l border-dashed border-ink/60"
                        }`}
                      />
                    ) : null}
                    <span className={`relative mt-1.5 h-3 w-3 ${c.who === "machine" ? "bg-signal" : "border border-ink bg-paper-deep"}`} />
                  </span>
                  <span>
                    <span className="block font-serif text-[1.25rem] font-[720] leading-tight">{c.t}</span>
                    <span className="mt-1 block text-[0.95rem] text-ink-soft">{c.d}</span>
                    <span className="mono mt-1 block text-[0.8rem] text-ink-soft">{c.who === "machine" ? "Software check" : "Person"}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* sample report entry */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <figure className="sheet relative">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b px-5 py-3 hairline sm:px-7">
                <span className="mono text-[0.85rem]">ACC-2026-0412 · notice-of-public-hearing.pdf</span>
                <span className="mono text-[0.8rem] text-muted">Page 1 of 2</span>
              </div>
              <div className="px-5 pb-7 pt-5 sm:px-7">
                <p className="mono text-[0.85rem] text-ember">Finding 2 of 4 · major · table_headers</p>
                <p className="mt-2 font-serif text-[1.35rem] font-[720] leading-tight">The fee table has no header cells.</p>
                <dl className="mt-5 grid grid-cols-1 gap-x-4 gap-y-1 text-[0.95rem] sm:grid-cols-[7.5rem_1fr] sm:gap-y-3">
                  <dt className="mono text-[0.85rem] text-muted">Evidence</dt>
                  <dd className="mb-2 sm:mb-0">Row 1 (&ldquo;Permit type, Current, Proposed&rdquo;) is tagged TD, so listeners hear numbers with no column names.</dd>
                  <dt className="mono text-[0.85rem] text-muted">Change</dt>
                  <dd className="mb-2 sm:mb-0">Row 1 cells retagged TH with column scope. Visible content unchanged.</dd>
                  <dt className="mono text-[0.85rem] text-muted">Made by</dt>
                  <dd className="mb-2 sm:mb-0">A person. Tables are not regrouped automatically.</dd>
                  <dt className="mono text-[0.85rem] text-muted">Re-checked</dt>
                  <dd>veraPDF 1.28, PDF/UA-1 profile: passed. Semantic check: no major findings. Reviewer sign-off recorded.</dd>
                </dl>
                <p className="stamp mt-7 text-[1.1rem]" aria-hidden="true">
                  Checked
                </p>
              </div>
              <figcaption className="border-t px-5 py-3 text-[0.85rem] text-muted hairline sm:px-7">
                Sample report entry for the fictional notice used on this page. Every report ends: &ldquo;This report is
                not a legal certification of compliance.&rdquo;
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-20 grid-12 gap-y-6">
          <div className="col-span-12 md:col-span-4">
            <h3 className="font-serif text-[1.6rem] font-[740] leading-tight">What our research shows so far</h3>
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
                <span className="font-serif text-[1.45rem] font-[760] tabular-nums">{r.n}</span>
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
