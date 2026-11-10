import Link from "next/link";
import type { ReactNode } from "react";
import "@/app/pages-extra.css";

/* Small drawings of what each person handles. All names, files and counts are fictional (City of Alder Creek). */


/** Hero index: four minis, each a link to the workflow below. */
export function ArtifactStrip() {
  const row = (t: string, tag: string, bad = false) => (
    <span className="sx-r" data-bad={bad ? "" : undefined}>
      <span>{t}</span>
      <b>{tag}</b>
    </span>
  );
  const items = [
    {
      id: "clerks",
      who: "City clerks",
      art: "Agenda packet",
      body: (
        <>
          <span className="sx-h">City Council, May 12</span>
          {row("Item 4 · Consent agenda", "6 pp")}
          {row("Item 6 · Budget amendment", "Table", true)}
          {row("Item 9 · Scanned letter", "Scan", true)}
        </>
      ),
    },
    {
      id: "ada",
      who: "ADA coordinators",
      art: "Request log",
      body: (
        <>
          <span className="sx-h">Accessible format requests</span>
          {row("Agenda, large print", "Done")}
          {row("Permit form, screen reader", "Open", true)}
          {row("Parks map, description", "Done")}
        </>
      ),
    },
    {
      id: "it",
      who: "IT and digital teams",
      art: "Website file list",
      body: (
        <>
          <span className="sx-h">aldercreek.example</span>
          {row("permit-form.pdf", "Fix first", true)}
          {row("parks-map.pdf", "Minor")}
          {row("fees-2019.pdf", "Archive?")}
        </>
      ),
    },
    {
      id: "agencies",
      who: "Website agencies",
      art: "Client sites",
      body: (
        <>
          <span className="sx-h">Your clients</span>
          {row("Alder Creek", "1,284 PDFs")}
          {row("Birch County", "412 PDFs")}
          {row("Cedar Valley Water District", "96 PDFs")}
        </>
      ),
    },
  ];
  return (
    <ul className="sx-strip" aria-label="Who this is for">
      {items.map((it, k) => (
        <li key={it.id} style={{ "--k": k } as React.CSSProperties}>
          <a href={`#${it.id}`} className="sx-mini">
            <span className="sx-sheet" aria-hidden="true">
              {it.body}
            </span>
            <span className="sx-mini-who">{it.who}</span>
            <span className="sx-mini-art">{it.art}</span>
          </a>
        </li>
      ))}
      <li className="sx-strip-note" aria-hidden="true">Sample documents for fictional places.</li>
    </ul>
  );
}

export function AgendaPacket() {
  return (
    <div className="sx-paper" role="img" aria-label="Sketch of a council agenda packet page: a heading, a list of items and a budget table. The totals row is read before the table headings.">
      <p className="sx-doc-h">City Council, regular meeting</p>
      <p className="sx-doc-s">Agenda packet, 42 pages. Item 6: budget amendment</p>
      <table className="dx-tbl" aria-hidden="true">
        <thead><tr><th>Fund</th><th>Was</th><th>Now</th></tr></thead>
        <tbody>
          <tr><td>Streets</td><td>$412,000</td><td>$455,000</td></tr>
          <tr><td>Parks</td><td>$98,000</td><td>$98,000</td></tr>
          <tr data-bad=""><td><b>Total</b></td><td><b>$510,000</b></td><td><b>$553,000</b></td></tr>
        </tbody>
      </table>
      <p className="dx-note"><b>Read out of order.</b> The totals are read before the headings.</p>
    </div>
  );
}

export function RequestLog() {
  const rows = [
    ["Permit application: screen reader cannot read the fields", "Open", "bad"],
    ["Hearing notice is a scanned image", "Open", "bad"],
    ["Pool schedule: table has no headers", "Repaired and checked", "ok"],
  ] as const;
  return (
    <div className="sx-paper" role="img" aria-label="Sketch of an accessibility request log with three fictional requests, two open and one repaired and checked.">
      <p className="sx-doc-h">Accessibility requests</p>
      <p className="sx-doc-s">City of Alder Creek. Sample entries</p>
      <ul aria-hidden="true" className="sx-log">
        {rows.map(([t, s, tone]) => (
          <li key={t}>
            <span>{t}</span>
            <em data-tone={tone}>{s}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFiles() {
  const rows = [
    ["/permits/", "building-permit-application.pdf", "Untagged", "bad"],
    ["/council/", "agenda-packet-0312.pdf", "Tables to check", "bad"],
    ["/utilities/", "utility-assistance-form.pdf", "Scan, no text", "bad"],
    ["/parks/", "pool-hours-flyer.pdf", "Short, mostly text", ""],
    ["/finance/", "fee-schedule-2019.pdf", "Duplicate of 2025", ""],
  ] as const;
  return (
    <div className="sx-paper sx-paper-wide" role="img" aria-label="Sketch of a website file list: five PDFs, each with the folder it lives in and what a check found.">
      <p className="sx-doc-h">Files on www.aldercreek.example</p>
      <ul aria-hidden="true" className="sx-files">
        {rows.map(([d, f, c, tone]) => (
          <li key={f}>
            <span className="mono">{d}<b>{f}</b></span>
            <em data-tone={tone}>{c}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ClientSites() {
  const rows = [
    ["Alder Creek (city)", "Library before launch"],
    ["Birch County", "Second check on repaired files"],
    ["Cedar Valley Water District", "Overflow repair work"],
  ] as const;
  return (
    <div className="sx-paper" role="img" aria-label="Sketch of an agency's list of three fictional client sites, each with the document job under way.">
      <p className="sx-doc-h">Client sites</p>
      <p className="sx-doc-s">Fictional examples</p>
      <ul aria-hidden="true" className="sx-clients">
        {rows.map(([c, j]) => (
          <li key={c}>
            <b>{c}</b>
            <span>{j}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Gives({ items }: { items: string[] }) {
  return (
    <ul className="sx-gives">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export function Hurts({ children }: { children: ReactNode }) {
  return <p className="sx-hurts">{children}</p>;
}

export function More({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="link-quiet">
      {children} <span aria-hidden="true" data-icon="arrow-r"></span>
    </Link>
  );
}
