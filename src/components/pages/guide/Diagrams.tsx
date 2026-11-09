import "@/app/pages-extra.css";


function Fig({ children, caption, label }: { children: React.ReactNode; caption: string; label: string }) {
  return (
    <figure className="gd" aria-label={label}>
      {children}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** Title II dates as a timeline. Dates match the guide's table. */
export function DatesDiagram() {
  const rows = [
    { when: "Now", who: "Everyone covered", what: "Accessible versions of documents on request, as a matter of existing ADA duties.", tone: "now" },
    { when: "April 26, 2027", who: "Total population of 50,000 or more", what: "WCAG 2.1 AA applies to web content, PDFs included.", tone: "fix" },
    { when: "April 26, 2028", who: "Under 50,000, and special district governments", what: "The same standard, one year later.", tone: "fix" },
  ];
  return (
    <Fig label="Timeline of the dates" caption="Dates as of November 2026, from the table above. Exceptions apply, and your counsel decides what applies to you.">
      <ol className="gd-time">
        {rows.map((r) => (
          <li key={r.when} data-tone={r.tone}>
            <span className="gd-time-dot" aria-hidden="true" />
            <p className="gd-time-when">{r.when}</p>
            <p className="gd-time-who">{r.who}</p>
            <p className="gd-time-what">{r.what}</p>
          </li>
        ))}
      </ol>
    </Fig>
  );
}

function MiniPage({ title, order }: { title: string; order?: [string, string, string] }) {
  const badge = (n?: string, bad?: boolean) => (n ? <span className="gd-badge" data-bad={bad ? "" : undefined}>{n}</span> : null);
  return (
    <div className="gd-page">
      <p className="gd-page-t">{title}</p>
      <div className="gd-sheet">
        <div className="gd-blk">{badge(order?.[0])}<span className="gd-h" />Title</div>
        <div className="gd-blk">{badge(order?.[1])}<span className="gd-l" /><span className="gd-l" /><span className="gd-l s" />Instructions</div>
        <div className="gd-blk gd-tb">{badge(order?.[2], true)}<span className="gd-tbh" /><span className="gd-l" /><span className="gd-l" />Fee table</div>
      </div>
    </div>
  );
}

/** A page as seen, and the same page in the order its tags give a screen reader. */
export function ReadingOrderDiagram() {
  return (
    <Fig
      label="Reading order: page as seen and tag order"
      caption="Illustrative sample. The page looks right, and a validator can confirm every block is tagged. The tag order still reads the fee table first. A screen reader follows the tags, not the page."
    >
      <div className="gd-pair">
        <MiniPage title="As you see it" />
        <MiniPage title="As a screen reader gets it: tag order 1, 2, 3" order={["2", "3", "1"]} />
      </div>
    </Fig>
  );
}

/** One row of an inventory, with each column labelled by why it is worth recording. */
export function InventoryRowDiagram() {
  const cols = [
    ["URL", "/files/building-permit-application.pdf", "Identifies the exact file"],
    ["Linking page", "/permits/apply", "Shows who relies on it"],
    ["Kind", "Service form, 2 pages", "Sets how much work it is"],
    ["Last changed", "March 2025", "Separates current from old"],
    ["Owner", "Planning department", "Tells you who decides"],
    ["Recommendation", "Fix", "With the reason in a note"],
  ];
  return (
    <Fig label="One row of an inventory" caption="Illustrative sample row, fictional city (Alder Creek). A spreadsheet with these columns is enough to start.">
      <div className="gd-row" role="list">
        {cols.map(([k, v, why]) => (
          <div key={k} role="listitem">
            <p className="gd-row-k">{k}</p>
            <p className="gd-row-v">{v}</p>
            <p className="gd-row-w">{why}</p>
          </div>
        ))}
      </div>
    </Fig>
  );
}

/** A fair report separates pass, fail, not checked and needs a person. */
export function ReportStatesDiagram() {
  const rows = [
    ["Document has a title and language", "Pass", "pass"],
    ["Every form field has a name", "Fail", "fail"],
    ["Fee table header cells", "Needs a person", "person"],
    ["Pages 96 to 99 (scan)", "Not checked", "none"],
  ] as const;
  return (
    <Fig label="Four result states in a fair report" caption="Illustrative sample. Not checked is not a pass, and items for a person are listed rather than skipped.">
      <table className="gd-states">
        <caption className="sr-only">A sample report with four items, each in a different state</caption>
        <thead className="sr-only">
          <tr><th scope="col">Item</th><th scope="col">State</th></tr>
        </thead>
        <tbody>
          {rows.map(([t, s, k]) => (
            <tr key={t}>
              <th scope="row">{t}</th>
              <td data-k={k}>{s}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fig>
  );
}
