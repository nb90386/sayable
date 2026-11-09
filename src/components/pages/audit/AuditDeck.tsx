"use client";

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import "@/app/pages-extra.css";

/**
 * A browsable sample Readiness Audit report. Every page is in the DOM (hidden when not selected) so the
 * content is readable without clicking. All names and numbers are made up: fictional City of Alder Creek.
 */

const buckets = [
  { name: "Must fix", value: 212, color: "var(--color-warm)", note: "Service documents residents use" },
  { name: "Archive candidate", value: 703, color: "var(--color-muted)", note: "Old reference material" },
  { name: "Convert to web page", value: 96, color: "var(--color-signal)", note: "Short and mostly text" },
  { name: "Delete candidate", value: 273, color: "#8f8a7e", note: "Duplicates and expired notices" },
];
const TOTAL = buckets.reduce((a, b) => a + b.value, 0);

const categories = [
  { name: "Reading order", files: 31, d: "Content is read in a different order than the page shows" },
  { name: "Form field labels", files: 27, d: "Fields announced as “edit, blank”" },
  { name: "Headings", files: 22, d: "Titles and sections not marked as headings" },
  { name: "Image descriptions", files: 19, d: "Seals, maps and charts with no useful description" },
  { name: "Tables", files: 16, d: "Header cells missing or rows tagged as plain text" },
];
const CHECKED = 48;

const priorities = [
  { f: "building-permit-application.pdf", why: "Residents apply with it. 11 form fields have no names.", act: "Repair now", effort: "Forms" },
  { f: "utility-assistance-form.pdf", why: "A scanned image with no text. Needed by people who ask for help paying a bill.", act: "Repair now", effort: "Scan" },
  { f: "business-license-renewal.pdf", why: "Untagged, so a screen reader finds no structure.", act: "Repair now", effort: "Forms" },
  { f: "agenda-packet-0312.pdf", why: "Public meeting file. Budget tables read out of order.", act: "Repair before the next meeting", effort: "Tables" },
  { f: "fee-schedule-2025.pdf", why: "Current fees in a table with no header cells.", act: "Repair, then re-check", effort: "Tables" },
];

const pages = [
  { id: "summary", tab: "Summary", n: 2, title: "Executive summary" },
  { id: "scope", tab: "Scope", n: 3, title: "What we looked at" },
  { id: "inventory", tab: "Inventory", n: 5, title: "The document inventory" },
  { id: "findings", tab: "Findings", n: 8, title: "Findings by issue" },
  { id: "priorities", tab: "Priorities", n: 12, title: "Recommended priorities" },
  { id: "evidence", tab: "Evidence and limits", n: 15, title: "Technical evidence and limitations" },
] as const;

const bar = (i: number) => ({ "--i": i }) as CSSProperties;

function Sheet({ n, title, children, id }: { n: number; title: string; children: ReactNode; id: string }) {
  return (
    <div className="dk-sheet">
      <div className="dk-sheet-head">
        <span>Readiness Audit report. City of Alder Creek</span>
        <span>Page {n}</span>
      </div>
      <h3 id={`${id}-h`} className="dk-sheet-title">
        {title}
      </h3>
      <div className="dk-sheet-body">{children}</div>
      <p className="dk-sheet-foot">Illustrative sample, fictional city. Not a client report.</p>
    </div>
  );
}

function Summary() {
  return (
    <>
      <p className="dk-lead">
        We found <strong>1,284 PDFs</strong> linked from www.aldercreek.example. <strong>212</strong> are files residents use to get or apply for a service. We recommend repairing those first, and deciding about the rest.
      </p>
      <dl className="dk-stats">
        {buckets.map((b) => (
          <div key={b.name}>
            <dt>
              <span aria-hidden="true" className="dk-dot" style={{ background: b.color }} />
              {b.name}
            </dt>
            <dd className="numeral">{b.value}</dd>
          </div>
        ))}
      </dl>
      <h4 className="dk-h4">What we recommend</h4>
      <ul className="dk-list">
        <li>Repair the five highest-ranked service files within the first month. They are listed on page 12.</li>
        <li>Ask department heads to confirm the 703 archive candidates and the 273 delete candidates. Nothing is removed without your decision.</li>
        <li>Move 96 short flyers to web pages, where they are easier to read on a phone.</li>
      </ul>
    </>
  );
}

function Scope() {
  return (
    <>
      <div className="dk-split">
        <div>
          <h4 className="dk-h4">Included</h4>
          <ul className="dk-list">
            <li>Public pages on www.aldercreek.example, followed to a depth of five links.</li>
            <li>The public agenda portal you pointed us to.</li>
            <li>Every PDF linked from those pages: 1,284 files.</li>
          </ul>
        </div>
        <div>
          <h4 className="dk-h4">Not included</h4>
          <ul className="dk-list">
            <li>Documents behind a login or a search box with no links.</li>
            <li>Files that are not PDFs.</li>
            <li>Repair of any file.</li>
          </ul>
        </div>
      </div>
      <h4 className="dk-h4">How the work narrows</h4>
      <ol className="dk-narrow">
        <li>
          <span>Crawled</span>
          <span className="dk-track" aria-hidden="true"><i style={{ width: "100%", background: "var(--rule-strong)" }} /></span>
          <span>1,284 PDFs found</span>
        </li>
        <li>
          <span>Inventoried</span>
          <span className="dk-track" aria-hidden="true"><i style={{ width: "100%", background: "var(--color-muted)" }} /></span>
          <span>All 1,284 sorted into four groups</span>
        </li>
        <li>
          <span>Checked</span>
          <span className="dk-track" aria-hidden="true"><i style={{ width: `${Math.max(4, (CHECKED / TOTAL) * 100)}%`, background: "var(--color-signal)" }} /></span>
          <span>{CHECKED} of the 212 must-fix files, a stated sample</span>
        </li>
      </ol>
    </>
  );
}

function Inventory() {
  return (
    <>
      <p className="dk-lead-sm">Every PDF, by recommendation. The full list, with the page that links to each file, comes as a spreadsheet.</p>
      <div className="dk-stack" role="img" aria-label="A bar divided into four parts: must fix 212, archive candidate 703, convert to web page 96, delete candidate 273">
        {buckets.map((b) => (
          <span key={b.name} style={{ width: `${(b.value / TOTAL) * 100}%`, background: b.color }} />
        ))}
      </div>
      <table className="dk-chart">
        <caption className="sr-only">Number of PDFs by recommendation, out of 1,284</caption>
        <thead className="sr-only">
          <tr><th scope="col">Recommendation</th><th scope="col">Files</th><th scope="col">Share</th></tr>
        </thead>
        <tbody>
          {buckets.map((b, i) => (
            <tr key={b.name}>
              <th scope="row">
                <span aria-hidden="true" className="dk-dot" style={{ background: b.color }} />
                {b.name}
                <small>{b.note}</small>
              </th>
              <td className="dk-bar-cell" aria-hidden="true">
                <span className="dk-bar" style={{ ...bar(i), width: `${(b.value / 703) * 100}%`, background: b.color }} />
              </td>
              <td className="numeral dk-num">{b.value}</td>
              <td className="dk-pct">{Math.round((b.value / TOTAL) * 100)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Findings() {
  return (
    <>
      <p className="dk-lead-sm">
        Problems in the {CHECKED} must-fix files we checked, counted as files affected. One file can have more than one problem.
      </p>
      <table className="dk-chart">
        <caption className="sr-only">Files affected by each type of problem, out of {CHECKED} files checked</caption>
        <thead className="sr-only">
          <tr><th scope="col">Problem</th><th scope="col">Files affected</th></tr>
        </thead>
        <tbody>
          {categories.map((c, i) => (
            <tr key={c.name}>
              <th scope="row">
                {c.name}
                <small>{c.d}</small>
              </th>
              <td className="dk-bar-cell" aria-hidden="true">
                <span className="dk-bar" style={{ ...bar(i), width: `${(c.files / CHECKED) * 100}%`, background: "var(--color-warm)" }} />
              </td>
              <td className="numeral dk-num">{c.files}</td>
              <td className="dk-pct">of {CHECKED}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="dk-note">Reading order and form labels affect the most files, and they are the problems a resident feels first.</p>
    </>
  );
}

function Priorities() {
  return (
    <>
      <p className="dk-lead-sm">Service documents first, then public meeting files. Five of the 212 must-fix files are shown here.</p>
      <ol className="dk-rank">
        {priorities.map((p, i) => (
          <li key={p.f}>
            <span className="dk-rank-n numeral" aria-hidden="true">{i + 1}</span>
            <div>
              <p className="dk-file">{p.f}</p>
              <p className="dk-why">{p.why}</p>
            </div>
            <p className="dk-act">
              <span className="sr-only">Suggested action: </span>
              {p.act}
              <small>{p.effort}</small>
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}

function Evidence() {
  return (
    <>
      <div className="dk-scroll" tabIndex={0} role="region" aria-label="Technical evidence for one file, scrollable">
        <table className="dk-ev">
          <caption>
            building-permit-application.pdf, as received
          </caption>
          <thead>
            <tr><th scope="col">Check</th><th scope="col">Result</th><th scope="col">Detail</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">veraPDF, PDF/UA-1</th><td data-r="fail">3 failures</td><td>Form fields with no name (no /TU entry)</td></tr>
            <tr><th scope="row">Semantic check (in testing)</th><td data-r="fail">2 flags</td><td>Fee table tagged after the signature block</td></tr>
            <tr><th scope="row">Person review</th><td data-r="fail">Confirmed</td><td>Field 4 label does not match its printed label</td></tr>
          </tbody>
        </table>
      </div>
      <h4 className="dk-h4">Limitations</h4>
      <ul className="dk-list">
        <li>The inventory holds what is publicly linked. Files reachable only by search or login can be missed.</li>
        <li>Counts of checked files are a stated sample when there are too many to check one by one.</li>
        <li>Automated checks confirm that structure exists, not that it is right. A person reviews tables, forms and scans.</li>
        <li>This report describes what was checked. It is not a compliance determination or legal advice.</li>
      </ul>
    </>
  );
}

const bodies = { summary: Summary, scope: Scope, inventory: Inventory, findings: Findings, priorities: Priorities, evidence: Evidence };

export function AuditDeck() {
  const uid = useId();
  const [cur, setCur] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number) => {
    const next = (i + pages.length) % pages.length;
    setCur(next);
    tabs.current[next]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go(cur + 1); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go(cur - 1); }
    else if (e.key === "Home") { e.preventDefault(); go(0); }
    else if (e.key === "End") { e.preventDefault(); go(pages.length - 1); }
  };

  return (
    <div className="dk">
      <div className="dk-tabs" role="tablist" aria-label="Pages of the sample report" onKeyDown={onKey}>
        {pages.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => { tabs.current[i] = el; }}
            role="tab"
            type="button"
            id={`${uid}-t-${p.id}`}
            aria-selected={cur === i}
            aria-controls={`${uid}-p-${p.id}`}
            tabIndex={cur === i ? 0 : -1}
            onClick={() => setCur(i)}
          >
            <span className="dk-tab-n">Page {p.n}</span>
            <span className="dk-tab-t">{p.tab}</span>
          </button>
        ))}
      </div>
      <div className="dk-stage">
        {pages.map((p, i) => {
          const Body = bodies[p.id];
          return (
            <div
              key={p.id}
              role="tabpanel"
              id={`${uid}-p-${p.id}`}
              aria-labelledby={`${uid}-t-${p.id}`}
              hidden={cur !== i}
              className="dk-panel"
            >
              <Sheet n={p.n} title={p.title} id={`${uid}-${p.id}`}>
                <Body />
              </Sheet>
            </div>
          );
        })}
      </div>
    </div>
  );
}
