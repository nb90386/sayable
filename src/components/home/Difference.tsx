import Link from "next/link";

type Mark = "yes" | "no" | "part";
const ROWS: { task: string; checker: [Mark, string]; sayable: [Mark, string] }[] = [
  { task: "Finds problems in one PDF", checker: ["yes", "Yes"], sayable: ["yes", "Yes"] },
  { task: "Finds every PDF your website links to", checker: ["no", "No"], sayable: ["yes", "Yes"] },
  { task: "Sorts them by what residents use", checker: ["no", "No"], sayable: ["yes", "Yes, with your team"] },
  { task: "Fixes forms, tables and scans", checker: ["part", "In trained hands"], sayable: ["yes", "Done by people"] },
  { task: "Listens to the result with a screen reader", checker: ["no", "No"], sayable: ["yes", "Every repaired file"] },
  { task: "Costs", checker: ["yes", "Free or low cost"], sayable: ["part", "A paid service"] },
];

function Cell({ m, t }: { m: Mark; t: string }) {
  return (
    <span className="diff-cell" data-m={m}>
      <span aria-hidden="true" className="diff-mark" />
      {t}
    </span>
  );
}

/** Why not a checker: one sharp distinction, an honest ledger, and the long version a click away. */
export function Difference() {
  return (
    <section aria-labelledby="diff-title" className="diff">
      <div className="wrap">
        <div className="diff-intro">
          <h2 id="diff-title" className="headline max-w-[16ch]">
            A checker looks at one file. Your city has thousands.
          </h2>
          <p className="lede !max-w-[44ch]">
            Acrobat, PAC and ChatGPT are good at single documents, and firms like CommonLook and Equidox take on large projects too. What we add is the order of
            the work, and proof that it was done.
          </p>
        </div>

        <table className="diff-table">
          <caption className="sr-only">A PDF checker compared with Sayable</caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Task</span>
              </th>
              <th scope="col">A PDF checker</th>
              <th scope="col">Sayable</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.task}>
                <th scope="row">{r.task}</th>
                <td>
                  <Cell m={r.checker[0]} t={r.checker[1]} />
                </td>
                <td>
                  <Cell m={r.sayable[0]} t={r.sayable[1]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6 text-[0.95rem] text-muted">
          <Link href="/product#compare" className="text-link">
            Compare Acrobat, free checkers, ChatGPT and Sayable task by task
          </Link>
        </p>
      </div>
    </section>
  );
}
