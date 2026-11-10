import Link from "next/link";

type Mark = "yes" | "part" | "no";
type Cell = { m: Mark; t: string };

const TOOLS = ["A PDF editor", "A free checker", "A general AI assistant", "Sayable"] as const;

/** Tasks, not features. Each tool is described by what it actually does for a city team. */
const TASKS: { task: string; cells: [Cell, Cell, Cell, Cell] }[] = [
  {
    task: "Find every PDF your website links to",
    cells: [
      { m: "no", t: "Works one file at a time" },
      { m: "no", t: "Works one file at a time" },
      { m: "no", t: "Can't see your whole site" },
      { m: "yes", t: "Inventory of every linked PDF" },
    ],
  },
  {
    task: "Decide which ones to fix first",
    cells: [
      { m: "no", t: "Not its job" },
      { m: "no", t: "Not its job" },
      { m: "part", t: "General advice" },
      { m: "yes", t: "Sorted by how residents use them, for your team to decide" },
    ],
  },
  {
    task: "Find technical problems in a file",
    cells: [
      { m: "yes", t: "Built-in checker, with some items left to check by hand" },
      { m: "yes", t: "Thorough rule checks against the PDF standard" },
      { m: "part", t: "Can comment on a file, but is not a validator" },
      { m: "yes", t: "Standard validators, plus our own checks" },
    ],
  },
  {
    task: "Repair tags, field names and reading order",
    cells: [
      { m: "part", t: "Yes, by a trained person. Automatic tagging is only a start" },
      { m: "no", t: "Checks only" },
      { m: "no", t: "Explains the steps; doesn't reliably edit a PDF's tags" },
      { m: "yes", t: "Done for you" },
    ],
  },
  {
    task: "Write image descriptions",
    cells: [
      { m: "part", t: "You write them" },
      { m: "no", t: "Checks they exist" },
      { m: "yes", t: "Good at drafting. Someone must check them" },
      { m: "yes", t: "Drafted, then checked by a person" },
    ],
  },
  {
    task: "Confirm it makes sense when read aloud",
    cells: [
      { m: "part", t: "Left to you" },
      { m: "part", t: "Some previews help a trained reviewer" },
      { m: "no", t: "Can't listen to your PDF" },
      { m: "yes", t: "A person reviews every repaired file" },
    ],
  },
  {
    task: "Cost to your city",
    cells: [
      { m: "yes", t: "A licence you may already have" },
      { m: "yes", t: "Free" },
      { m: "yes", t: "Low, per seat" },
      { m: "part", t: "A paid service, quoted in writing per job" },
    ],
  },
  {
    task: "Run it yourself, whenever you like",
    cells: [
      { m: "yes", t: "Yes, if someone is trained" },
      { m: "yes", t: "Yes" },
      { m: "yes", t: "Yes" },
      { m: "part", t: "Our free check, yes. Repairs run on an agreed schedule" },
    ],
  },
  {
    task: "Keep a record of what was checked",
    cells: [
      { m: "part", t: "One report per file" },
      { m: "part", t: "One report per file" },
      { m: "no", t: "A chat history" },
      { m: "yes", t: "Per-file reports and one summary" },
    ],
  },
];

const MARK: Record<Mark, string> = { yes: "Does this", part: "Partly", no: "Doesn't do this" };

function Glyph({ m }: { m: Mark }) {
  return <span aria-hidden="true" className={`cmp-glyph cmp-${m}`} />;
}

/** Chapter: the honest answer to "we already have tools for this". Tools are named by kind, not by brand. */
export function Compare() {
  return (
    <section data-sc-act="compare" aria-labelledby="compare-title" className="py-[clamp(7rem,14vh,11rem)]">
      <div className="wrap">
        <div className="mx-auto max-w-[1100px]">
          <h2 id="compare-title" className="headline max-w-[18ch]">
            Why not use the tools we already have?
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-12">
            <p className="lede !max-w-[48ch]">Keep using them. They are good tools. But finding a problem in one file is a small part of the work.</p>
            <p className="max-w-[54ch] text-ink-soft">
              A PDF editor can repair a file in the hands of someone trained to use it, and an AI assistant can draft a good image description. Neither tells you which
              of your thousands of PDFs need fixing, and neither confirms that a repaired file makes sense when heard. A checker can pass a file whose tags
              exist but are wrong. That is the work Sayable takes on: the inventory, the sorting, the hard pages, and a record your staff can re-check in
              the same free tools.
            </p>
            <p className="max-w-[54ch] text-ink-soft md:col-start-2">
              Other remediation firms and products do much of this work too, and some of it very well. Whoever you talk to, including us, ask how they
              find your files, decide what to fix, and check the result with a person.
            </p>
          </div>

          {/* wide screens: one table */}
          <div className="relative mt-12 hidden overflow-x-auto md:block" role="region" aria-label="Who does which task" tabIndex={0}>
            <table className="cmp-table">
              <caption className="sr-only">Which tool does which part of the work</caption>
              <thead>
                <tr>
                  <th scope="col">The task</th>
                  {TOOLS.map((t) => (
                    <th key={t} scope="col" className={t === "Sayable" ? "is-us" : ""}>
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TASKS.map((r) => (
                  <tr key={r.task}>
                    <th scope="row">{r.task}</th>
                    {r.cells.map((c, i) => (
                      <td key={i} className={i === 3 ? "is-us" : ""}>
                        <Glyph m={c.m} />
                        <span className="sr-only">{MARK[c.m]}: </span>
                        {c.t}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* phones: one block per task */}
          <ol className="mt-10 grid gap-0 md:hidden" aria-label="Who does which task">
            {TASKS.map((r) => (
              <li key={r.task} className="border-t py-5 hairline">
                <h3 className="font-[620] text-ink">{r.task}</h3>
                <ul className="mt-3 grid gap-2 text-[0.93rem]">
                  {r.cells.map((c, i) => (
                    <li key={i} className={`grid grid-cols-[1.1rem_1fr] gap-x-2 ${i === 3 ? "font-[560] text-ink" : "text-ink-soft"}`}>
                      <Glyph m={c.m} />
                      <p>
                        <span className="font-[600]">{TOOLS[i]}: </span>
                        <span className="sr-only">{MARK[c.m]}. </span>
                        {c.t}
                      </p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-6 rounded-[14px] bg-paper-deep p-7 sm:p-9 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="title text-[1.35rem] text-ink">Try the first step yourself</h3>
              <p className="mt-2 max-w-[56ch] text-ink-soft">
                Our free check reads one PDF in your browser and explains what it finds in plain English, including what it can&apos;t judge. The file is
                never uploaded.
              </p>
            </div>
            <Link href="/check" className="btn justify-self-start">
              Check a PDF
            </Link>
          </div>
          <p className="mt-4 text-[0.84rem] text-muted">
            Describes each kind of tool in general, as of November 2026. Individual products differ; tell us if something here seems wrong.
          </p>
        </div>
      </div>
    </section>
  );
}
