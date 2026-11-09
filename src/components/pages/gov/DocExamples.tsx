import { Reveal } from "@/components/pages/PageParts";

/**
 * Four everyday city documents, drawn small, with the problem a person would hit and why it matters.
 * Every document is fictional (City of Alder Creek). These are illustrations, not customer files.
 */

function Permit() {
  return (
    <div className="dx-sheet" role="img" aria-label="Sketch of a building permit application. The Applicant name, Parcel number and Description fields are boxed in dashed red because they have no names a screen reader can announce.">
      <h4>Building permit application</h4>
      <p className="sm">City of Alder Creek, Building Services</p>
      <div className="dx-field"><span>Applicant</span><span className="dx-box" data-bad="" /></div>
      <div className="dx-field"><span>Parcel number</span><span className="dx-box" data-bad="" /></div>
      <div className="dx-field"><span>Work type</span><span className="dx-box" /></div>
      <div className="dx-field"><span>Description</span><span className="dx-box" data-bad="" style={{ height: "2.4rem" }} /></div>
      <p className="dx-note"><b>Three fields have no name.</b> A screen reader says &ldquo;edit, blank&rdquo; for each.</p>
    </div>
  );
}

function Agenda() {
  return (
    <div className="dx-sheet" role="img" aria-label="Sketch of a council agenda packet page with a budget table. A note says the totals row is read before the headings.">
      <h4>City Council, regular meeting</h4>
      <p className="sm">Agenda item 6: budget amendment</p>
      <table className="dx-tbl" aria-hidden="true">
        <thead><tr><th>Fund</th><th>Was</th><th>Now</th></tr></thead>
        <tbody>
          <tr><td>Streets</td><td>$412,000</td><td>$455,000</td></tr>
          <tr><td>Parks</td><td>$98,000</td><td>$98,000</td></tr>
          <tr><td><b>Total</b></td><td><b>$510,000</b></td><td><b>$553,000</b></td></tr>
        </tbody>
      </table>
      <p className="dx-note"><b>Read out of order.</b> The totals come first, so the numbers have no headings.</p>
    </div>
  );
}

function Notice() {
  return (
    <div className="dx-sheet" role="img" aria-label="Sketch of a public notice that is a scanned image. A note says there is no text for a screen reader to read.">
      <h4>Notice of public hearing</h4>
      <p className="sm">Posted by the City Clerk</p>
      <div className="dx-line" style={{ width: "92%" }} />
      <div className="dx-line" style={{ width: "88%" }} />
      <div className="dx-line" style={{ width: "95%" }} />
      <div className="dx-line" style={{ width: "60%" }} />
      <span className="dx-flag" data-tone="bad">Scanned image, no text</span>
      <p className="dx-note"><b>It looks like a page. To a screen reader it is a picture.</b> The date and place are not readable.</p>
    </div>
  );
}

function Service() {
  return (
    <div className="dx-sheet" role="img" aria-label="Sketch of a utility assistance form after repair. Every field is named and the reading order runs from the title to the signature.">
      <h4>Utility assistance application</h4>
      <p className="sm">Water and sewer, Alder Creek</p>
      <div className="dx-field"><span>Account number</span><span className="dx-box" /></div>
      <div className="dx-field"><span>Household size</span><span className="dx-box" /></div>
      <div className="dx-field"><span>Signature</span><span className="dx-box" /></div>
      <span className="dx-flag" data-tone="ok">All fields named, in reading order</span>
      <p className="dx-note"><b>After repair.</b> Same page for a sighted reader. A screen reader hears each label.</p>
    </div>
  );
}

const docs = [
  {
    id: "permits",
    title: "Permit applications",
    fig: <Permit />,
    problem: "Fillable forms where the fields carry no names. A resident using a screen reader cannot tell which box is which.",
    why: "This is the file someone needs to start a project. If it fails, they need help for something everyone else does alone.",
  },
  {
    id: "agendas",
    title: "Meeting agendas and packets",
    fig: <Agenda />,
    problem: "Long files built in a hurry. Tables lose their headings and text is read in the wrong order.",
    why: "Residents use them to follow decisions that affect them, and they are posted on a deadline, every meeting.",
  },
  {
    id: "notices",
    title: "Public notices",
    fig: <Notice />,
    problem: "Scans of a signed paper page. There is no real text, so nothing to read aloud or to search.",
    why: "Hearing dates and appeal windows live here. Missing the notice can mean missing the chance to speak.",
  },
  {
    id: "forms",
    title: "Service forms",
    fig: <Service />,
    problem: "Assistance, license and renewal forms. The fix is small: name every field and put them in order.",
    why: "Residents who most need these services are often the ones least able to ask for a second version.",
  },
];

export function DocExamples() {
  return (
    <ul className="dx" aria-label="Four kinds of city document">
      {docs.map((d) => (
        <li key={d.id} id={d.id} className="dx-row">
          <Reveal className="dx-text">
            <h3>{d.title}</h3>
            <p>{d.problem}</p>
            <p className="dx-why">
              <span className="font-[600]">Why it matters: </span>
              {d.why}
            </p>
          </Reveal>
          <Reveal kind="depth" className="dx-fig">
            {d.fig}
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
