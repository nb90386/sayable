"use client";

import { useState } from "react";
import "@/app/pages-extra.css";

/**
 * Illustrative mock of how findings are organised: document list, selected file, findings with plain-language
 * and technical detail, and review state. Fictional City of Alder Creek. Not a login-in dashboard.
 */

type Stage = "found" | "drafted" | "reviewed";
type Finding = {
  id: string;
  plain: string;
  where: string;
  tech: string;
  fix: string;
  stage: Stage;
};
type Doc = { id: string; file: string; kind: string; pages: number; findings: Finding[] };

const docs: Doc[] = [
  {
    id: "permit",
    file: "building-permit-application.pdf",
    kind: "Service form",
    pages: 2,
    findings: [
      {
        id: "f1",
        plain: "Field 4 has no name. A screen reader says “edit, blank”.",
        where: "Page 2, Parcel number",
        tech: "Widget annotation has no /TU entry and is not inside a Form structure element.",
        fix: "Name the field “Parcel number” and put it inside a Form element.",
        stage: "reviewed",
      },
      {
        id: "f2",
        plain: "The title is not a heading, so there is nothing to jump to.",
        where: "Page 1, top",
        tech: "Text is tagged <P>. No <H1> in the structure tree.",
        fix: "Tag the title as a level-one heading.",
        stage: "drafted",
      },
      {
        id: "f3",
        plain: "The fee table is read before the instructions.",
        where: "Page 1, fee table",
        tech: "Structure order places <Table> before the instruction paragraphs. Visual order differs.",
        fix: "Move the table after the instructions in the tag order.",
        stage: "found",
      },
    ],
  },
  {
    id: "agenda",
    file: "agenda-packet-0312.pdf",
    kind: "Public meeting",
    pages: 180,
    findings: [
      {
        id: "g1",
        plain: "Budget table totals are read first.",
        where: "Page 41",
        tech: "Total row <TR> precedes header row in tag order. Header cells are tagged <TD>.",
        fix: "Reorder rows and mark the header row with <TH>.",
        stage: "drafted",
      },
      {
        id: "g2",
        plain: "A scanned letter has no real text.",
        where: "Pages 96 to 99",
        tech: "Page content is a single image. No text layer.",
        fix: "A person re-types or recognizes the text, then checks it against the scan.",
        stage: "found",
      },
    ],
  },
  {
    id: "fees",
    file: "fee-schedule-2025.pdf",
    kind: "Current fees",
    pages: 6,
    findings: [
      {
        id: "h1",
        plain: "Column headings are not marked, so a cell has no heading to read with it.",
        where: "Pages 2 to 6",
        tech: "Table has no <TH> cells and no Scope attributes.",
        fix: "Mark the first row as column headers.",
        stage: "reviewed",
      },
    ],
  },
];

const stageLabel: Record<Stage, string> = {
  found: "Found by software",
  drafted: "Fix drafted, awaiting a person",
  reviewed: "Reviewed by a person, re-checked",
};
const stageOrder: Stage[] = ["found", "drafted", "reviewed"];

export function ProductMock() {
  const [d, setD] = useState(0);
  const [f, setF] = useState(0);
  const doc = docs[d] ?? docs[0]!;
  const fi = Math.min(f, doc.findings.length - 1);
  const finding = doc.findings[fi] ?? doc.findings[0]!;
  const open = doc.findings.filter((x) => x.stage !== "reviewed").length;

  return (
    <figure className="pm">
      <div className="pm-bar" aria-hidden="true">
        <span /><span /><span />
        <b>Findings. City of Alder Creek</b>
      </div>
      <div className="pm-grid">
        <nav aria-label="Documents in this audit" className="pm-docs">
          <p className="pm-k">Documents</p>
          <ul>
            {docs.map((x, i) => {
              const left = x.findings.filter((y) => y.stage !== "reviewed").length;
              return (
                <li key={x.id}>
                  <button type="button" aria-current={d === i ? "true" : undefined} onClick={() => { setD(i); setF(0); }}>
                    <span className="pm-file">{x.file}</span>
                    <span className="pm-meta">
                      {x.kind}, {x.pages} {x.pages === 1 ? "page" : "pages"}
                    </span>
                    <span className="pm-meta" data-warm={left > 0 ? "" : undefined}>
                      {left > 0 ? `${left} to review` : "All reviewed"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <section aria-label={`Findings in ${doc.file}`} className="pm-list">
          <p className="pm-k">
            {doc.file}
            <span> {doc.findings.length} findings, {open} open</span>
          </p>
          <ul>
            {doc.findings.map((x, i) => (
              <li key={x.id}>
                <button type="button" aria-current={fi === i ? "true" : undefined} onClick={() => setF(i)}>
                  <span className="pm-dot" data-stage={x.stage} aria-hidden="true" />
                  <span>
                    <span className="pm-plain">{x.plain}</span>
                    <span className="pm-meta">{x.where}. {stageLabel[x.stage]}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Selected finding" className="pm-detail" aria-live="polite">
          <p className="pm-k">In plain language</p>
          <p className="pm-big">{finding.plain}</p>
          <p className="pm-k">Technical detail</p>
          <p className="pm-code">{finding.tech}</p>
          <p className="pm-k">Proposed correction</p>
          <p className="pm-fix">{finding.fix}</p>
          <p className="pm-k">Review</p>
          <ol className="pm-steps">
            {stageOrder.map((s, i) => (
              <li key={s} data-done={stageOrder.indexOf(finding.stage) >= i ? "" : undefined}>
                {stageLabel[s]}
              </li>
            ))}
          </ol>
        </section>
      </div>
      <figcaption>
        Illustrative mock. Fictional city. Findings reach you as a written report and a spreadsheet today. A self-serve dashboard like this is not available.
      </figcaption>
    </figure>
  );
}

/** One region of a form, as received and after repair, with what a screen reader says. */
export function BeforeAfter() {
  const [after, setAfter] = useState(false);
  return (
    <figure className="ba">
      <div className="ba-toggle" role="group" aria-label="Show the document region">
        <button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>As received</button>
        <button type="button" aria-pressed={after} onClick={() => setAfter(true)}>After repair</button>
      </div>
      <div className="ba-grid" data-after={after ? "" : undefined}>
        <div className="ba-page" aria-hidden="true">
          <p className="ba-page-h">Building permit application</p>
          <p className="ba-label">Parcel number</p>
          <div className="ba-box" />
          <p className="ba-label">Applicant name</p>
          <div className="ba-box" />
        </div>
        <div className="ba-read">
          <p className="pm-k">Tag structure</p>
          <p className="pm-code ba-swap">
            <span className="ba-b">{"<P> Parcel number"}<br />{"<Widget> (no name, outside any Form)"}</span>
            <span className="ba-a">{"<Form> Parcel number"}<br />{"  <Widget> name: Parcel number"}</span>
          </p>
          <p className="pm-k">A screen reader says</p>
          <p className="ba-say" aria-live="polite">
            <q>{after ? "Parcel number, edit text, blank" : "Edit text, blank"}</q>
          </p>
          <p className="ba-verdict" data-after={after ? "" : undefined}>
            {after ? "A person checked the name against the printed label. The page looks the same." : "A resident hears a blank field and has to guess what it is for."}
          </p>
        </div>
      </div>
      <figcaption>Illustrative sample. Fictional city. The visible page is identical in both views; only the structure behind it changes.</figcaption>
    </figure>
  );
}
