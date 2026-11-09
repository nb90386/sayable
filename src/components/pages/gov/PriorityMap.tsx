import "@/app/pages-extra.css";

const lanes = [
  {
    tone: "review",
    name: "Needs review",
    d: "Found in the inventory, not yet looked at by a person.",
    files: [
      ["parks-reservation-form.pdf", "Not yet checked"],
      ["planning-commission-minutes-2025.pdf", "Not yet checked"],
    ],
  },
  {
    tone: "fix",
    name: "Potential remediation",
    d: "Residents use it to get or apply for a service, and a problem was found.",
    files: [
      ["building-permit-application.pdf", "Field names missing"],
      ["utility-assistance-form.pdf", "Scanned, no text"],
    ],
  },
  {
    tone: "policy",
    name: "Policy decision required",
    d: "Might fit an exception, such as archived content. Your team and counsel decide.",
    files: [
      ["budget-report-2016.pdf", "Archive? Counsel decides"],
      ["water-notice-2019.pdf", "Still linked from a live page"],
    ],
  },
  {
    tone: "done",
    name: "Completed review",
    d: "Repaired and re-checked, or moved to a web page. The record stays with the file.",
    files: [
      ["fee-schedule-2025.pdf", "Repaired, re-checked"],
      ["pool-hours-flyer.pdf", "Moved to a web page"],
    ],
  },
  {
    tone: "future",
    name: "Future publishing workflow",
    d: "New files checked before they are posted, so the backlog stops growing.",
    files: [["Planned workflow", "Not available today"]],
  },
] as const;

/** Five places a file can be, with fictional examples. A sorting aid, not a legal determination. */
export function PriorityMap() {
  return (
    <figure>
      <ol className="pmap" aria-label="Where a document can sit while you prioritize">
        {lanes.map((l) => (
          <li key={l.name} data-tone={l.tone}>
            <h3 className="sp-h3">
              <span className="pmap-dot" aria-hidden="true" />
              {l.name}
            </h3>
            <p className="pmap-d">{l.d}</p>
            <ul>
              {l.files.map(([f, s]) => (
                <li key={f}>
                  <span className="pmap-f">{f}</span>
                  <span className="pmap-s">{s}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 max-w-[70ch] text-[0.9rem] text-muted">
        Illustrative sample, fictional city (Alder Creek). Sorting is a recommendation that your team reviews. It does not decide what the law requires of you.
      </figcaption>
    </figure>
  );
}
