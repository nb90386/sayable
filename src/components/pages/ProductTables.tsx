import Link from "next/link";

type Avail = "now" | "service" | "limited" | "no";
const AV: Record<Avail, { label: string; cls: string }> = {
  now: { label: "Available now", cls: "st-pass" },
  service: { label: "Service, available now", cls: "st-person" },
  limited: { label: "Pilot by arrangement", cls: "st-warn" },
  no: { label: "Not supported", cls: "st-na" },
};

const OFFERS: { name: string; href: string; who: string; get: string; work: string; price: string; av: Avail }[] = [
  {
    name: "Free PDF check",
    href: "/check",
    who: "Anyone with one PDF",
    get: "Plain-English findings for one file, in your browser",
    work: "Software, on your computer",
    price: "Free",
    av: "now",
  },
  {
    name: "PDF repair",
    href: "/contact?topic=repair",
    who: "Teams with specific documents to fix",
    get: "Repaired files, each with a check report",
    work: "People, with software for routine fixes",
    price: "Quoted per batch, by page count and difficulty",
    av: "service",
  },
  {
    name: "Readiness Audit",
    href: "/readiness-audit",
    who: "Cities planning for the deadline",
    get: "Inventory of every linked PDF, sorted, with an effort estimate and plan",
    work: "Software and people",
    price: "One flat fee, quoted in writing",
    av: "service",
  },
  {
    name: "Readiness Package",
    href: "#package",
    who: "Cities that want the work done",
    get: "The audit, then repair of the must-fix files",
    work: "People, with software for routine fixes",
    price: "Quoted after the audit",
    av: "service",
  },
  {
    name: "Agenda Desk",
    href: "#agenda",
    who: "Clerks posting meeting packets",
    get: "Each packet returned repaired and checked",
    work: "People, with software for routine fixes",
    price: "Agreed per pilot",
    av: "limited",
  },
];

/** The offer ladder in one table: what each thing is, who does it, what it costs, whether you can buy it today. */
export function OfferLadder() {
  return (
    <div className="relative mt-10 overflow-x-auto" role="region" aria-label="Sayable services compared" tabIndex={0}>
      <table className="cmp-table min-w-[760px]">
        <caption className="sr-only">Sayable services compared</caption>
        <thead>
          <tr>
            <th scope="col">Service</th>
            <th scope="col">For</th>
            <th scope="col">You get</th>
            <th scope="col">Who does the work</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {OFFERS.map((o) => (
            <tr key={o.name}>
              <th scope="row">
                <Link href={o.href} className="text-link">
                  {o.name}
                </Link>
              </th>
              <td>{o.who}</td>
              <td>{o.get}</td>
              <td>{o.work}</td>
              <td>{o.price}</td>
              <td>
                <span className={`check-status ${AV[o.av].cls}`}>{AV[o.av].label}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type Can = "yes" | "part" | "no";
const SCOPE: { kind: string; check: [Can, string]; repair: [Can, string] }[] = [
  { kind: "PDFs made from Word, InDesign or similar", check: [ "yes", "Tags, title, language, text, headings" ], repair: [ "yes", "The common case" ] },
  { kind: "Scanned PDFs", check: [ "yes", "Flags pages with no readable text" ], repair: [ "part", "Text recognition, then a person corrects and tags it. Slower" ] },
  { kind: "Fillable PDF forms", check: [ "yes", "Finds fields with no spoken name" ], repair: [ "yes", "Field names and tab order, checked by a person" ] },
  { kind: "Tables in PDFs", check: [ "part", "Finds tables with no header cells" ], repair: [ "part", "By a person. Complex tables take longest" ] },
  { kind: "Images and charts in PDFs", check: [ "part", "Finds tagged images with no description" ], repair: [ "yes", "Descriptions drafted, then checked by a person" ] },
  { kind: "Very long PDFs", check: [ "part", "Up to 25 MB; first 400 pages" ], repair: [ "yes", "Quoted individually" ] },
  { kind: "Word, PowerPoint, Excel files", check: [ "no", "Not supported" ], repair: [ "no", "Not supported yet" ] },
  { kind: "Web pages (HTML)", check: [ "no", "Not supported" ], repair: [ "no", "Outside what we do" ] },
];
const CAN: Record<Can, string> = { yes: "Yes", part: "Partly", no: "No" };

/** What Sayable works on, by file type. PDF only, said plainly. */
export function FileScope() {
  return (
    <div className="relative mt-10 overflow-x-auto" role="region" aria-label="Supported file types" tabIndex={0}>
      <table className="cmp-table min-w-[680px]">
        <caption className="sr-only">What the free check and the repair service handle, by file type</caption>
        <thead>
          <tr>
            <th scope="col">File type</th>
            <th scope="col">Free check</th>
            <th scope="col">Repair service</th>
          </tr>
        </thead>
        <tbody>
          {SCOPE.map((r) => (
            <tr key={r.kind}>
              <th scope="row">{r.kind}</th>
              {[r.check, r.repair].map(([c, t], i) => (
                <td key={i}>
                  <span aria-hidden="true" className={`cmp-glyph cmp-${c}`} />
                  <span className="sr-only">{CAN[c]}: </span>
                  {t}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
