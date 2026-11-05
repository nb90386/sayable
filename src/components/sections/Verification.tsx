import Link from "next/link";

const layers = [
  { k: "Rules", t: "veraPDF, PDF/UA-1", d: "The free, open-source validator many buyers already use. It confirms the file is structurally sound." },
  { k: "Meaning", t: "Semantic review", d: "Compares the rendered page with its tags in screen-reader order: headings, reading order, tables, lists, alt text." },
  { k: "People", t: "Human review", d: "Forms, tables, scans and anything a check disputes are handled or confirmed by a person." },
  { k: "Record", t: "A plain report", d: "What was checked, what changed, who changed it, and the tool versions, for every file." },
];

const research = [
  { n: "13/15", d: "subtle tag defects caught by the semantic check in controlled tests, where standard rule checks caught 0 of 15." },
  { n: "13/32", d: "real-world sample pages that passed both the PDF/UA-1 validator and the semantic check with no hand work." },
  { n: "0/19", d: "false flags from the semantic check in the same test on real auto-tagged pages (0 of 19)." },
];

export function Verification() {
  return (
    <section aria-labelledby="ver-title" className="relative bg-paper-deep pb-28 pt-24 sm:pb-36 sm:pt-32">
      <div className="wrap">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="ver-title" className="headline mt-6">
              No single check is enough. <em>So we layer them.</em>
            </h2>
            <p className="mt-6 max-w-[42ch] text-ink-soft">
              A validator can pass a file whose headings are in the wrong place. A careful reviewer can miss a missing
              language tag. Sayable layers checks so each covers what the others cannot, and reports the results
              without overstating them.
            </p>
            <div className="mt-10 border border-signal/50 bg-sheet p-5">
              <p className="font-serif text-[1.25rem] leading-snug">
                &ldquo;Checked with veraPDF (PDF/UA-1 profile) and the Sayable semantic checker. This report is not a legal
                certification of compliance.&rdquo;
              </p>
              <p className="tag mt-3 !text-muted">The statement on every Sayable check report</p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <ol className="relative">
              {layers.map((l, i) => (
                <li
                  key={l.k}
                  className="sheet relative mb-3 grid grid-cols-[5.5rem_1fr] gap-4 p-5 sm:grid-cols-[7rem_1fr] sm:p-6"
                  style={{ marginLeft: `${i * 4}%`, marginRight: `${(3 - i) * 4}%` }}
                >
                  <span className="tag pt-1">
                    {String(i + 1).padStart(2, "0")} · {l.k}
                  </span>
                  <span>
                    <span className="block font-serif text-[1.35rem] leading-tight">{l.t}</span>
                    <span className="mt-1.5 block text-[0.95rem] text-ink-soft">{l.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-24 border-t border-ink/60 pt-10">
          <div className="grid-12 gap-y-8">
            <div className="col-span-12 md:col-span-4">
              <h3 className="font-serif text-[1.6rem] leading-tight">What our research shows so far</h3>
              <p className="mt-3 max-w-[36ch] text-[0.925rem] text-muted">
                Results from our own tests on sample and synthetic documents. These are preliminary benchmarks, not customer outcomes. Tables, lists,
                reading order and scanned pages still need people.{" "}
                <Link href="/approach" className="text-link">
                  Read our approach
                </Link>
                .
              </p>
            </div>
            <dl className="col-span-12 grid gap-8 sm:grid-cols-3 md:col-span-8">
              {research.map((r) => (
                <div key={r.n}>
                  <dt className="display text-[length:var(--step-4)]">{r.n}</dt>
                  <dd className="mt-3 text-[0.925rem] leading-relaxed text-ink-soft">{r.d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
