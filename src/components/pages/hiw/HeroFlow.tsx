import type { CSSProperties } from "react";
import "@/app/pages-extra.css";

/**
 * First-screen visual for /how-it-works: website address, document inventory, findings report, action plan.
 * One drawing in four panels. All content is fictional (City of Alder Creek) and labelled as sample data.
 * The staged reveal is CSS only and is off with reduced motion, so the content is always readable.
 */

const st = (i: number) => ({ "--i": i }) as CSSProperties;

function Arrow() {
  return (
    <span className="hf-arrow" aria-hidden="true">
      <svg viewBox="0 0 24 12" width="24" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 6h20M16 1.5 21.5 6 16 10.5" />
      </svg>
    </span>
  );
}

export function HeroFlow() {
  return (
    <figure className="hf" aria-label="Sample flow from a website address to an action plan, using fictional data for the City of Alder Creek">
      <ol className="hf-row">
        <li className="hf-panel" style={st(0)}>
          <p className="hf-label">Website address</p>
          <div className="hf-sheet">
            <p className="hf-url mono">aldercreek.example</p>
            <ul className="hf-pages">
              <li>Permits</li>
              <li>Council agendas</li>
              <li>Utilities</li>
            </ul>
            <p className="hf-note">Links to PDFs on public pages</p>
          </div>
          <Arrow />
        </li>

        <li className="hf-panel" style={st(1)}>
          <p className="hf-label">Document inventory</p>
          <div className="hf-sheet">
            <p className="hf-big numeral">1,284</p>
            <p className="hf-note">PDFs found</p>
            <ul className="hf-files mono">
              <li>permit-form.pdf</li>
              <li>agenda-0312.pdf</li>
              <li>utility-form.pdf</li>
            </ul>
          </div>
          <Arrow />
        </li>

        <li className="hf-panel" style={st(2)}>
          <p className="hf-label">Findings report</p>
          <div className="hf-sheet">
            <p className="hf-line" data-tone="bad">
              <span aria-hidden="true" />
              Form fields with no names
            </p>
            <p className="hf-line" data-tone="bad">
              <span aria-hidden="true" />
              Scanned page, no text
            </p>
            <p className="hf-line" data-tone="bad">
              <span aria-hidden="true" />
              Table read out of order
            </p>
            <p className="hf-note">Each finding says what a screen reader would hit</p>
          </div>
          <Arrow />
        </li>

        <li className="hf-panel" style={st(3)}>
          <p className="hf-label">Action plan</p>
          <div className="hf-sheet">
            <ol className="hf-plan">
              <li>
                <span>Must fix</span>
                <b className="numeral">212</b>
              </li>
              <li>
                <span>Convert to web page</span>
                <b className="numeral">96</b>
              </li>
              <li>
                <span>Archive, you confirm</span>
                <b className="numeral">703</b>
              </li>
              <li>
                <span>Delete, you confirm</span>
                <b className="numeral">273</b>
              </li>
            </ol>
            <p className="hf-note">You decide what happens next</p>
          </div>
        </li>
      </ol>
      <figcaption className="hf-cap">Sample data for the fictional City of Alder Creek. Not a client report.</figcaption>
    </figure>
  );
}
