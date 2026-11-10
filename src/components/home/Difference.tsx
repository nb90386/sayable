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
    <section aria-labelledby="diff-title" className="diff" data-sc-act="diff">
      <div className="wrap">
        <div className="diff-intro">
          <h2 id="diff-title" className="headline max-w-[19ch]">
            Checking one PDF is not the same as managing a city&rsquo;s documents.
          </h2>
          <p className="lede !max-w-[44ch]">
            A single-file checker is useful, and your team may already have one. A backlog also needs the files found, the ones residents use put first,
            repairs made by people, and a record of each check. That is the work we organize.
          </p>
        </div>

        <table className="diff-table">
          <caption className="sr-only">Checking one file compared with a Sayable audit and repair</caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Task</span>
              </th>
              <th scope="col">Checking one file</th>
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
            See the work compared, task by task
          </Link>
        </p>
      </div>
    </section>
  );
}
