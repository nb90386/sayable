import "@/app/pages-extra.css";

const steps = [
  { name: "Finding", ex: "Form field 4 on page 2 has no name.", who: "software", whoLabel: "Software", limit: "Sees structure, not meaning." },
  { name: "Issue", ex: "A resident using a screen reader hears “edit, blank” and cannot tell what to enter.", who: "software", whoLabel: "Software, in plain words", limit: "A summary. The technical record keeps the detail." },
  { name: "Proposed correction", ex: "Name the field “Parcel number” and place it inside a Form element.", who: "both", whoLabel: "Software drafts, a person for hard parts", limit: "A draft, not a decision. Software never invents document text." },
  { name: "Automated validation", ex: "veraPDF (PDF/UA-1) and our semantic check run again on the changed file.", who: "software", whoLabel: "Software", limit: "A pass means these checks found nothing. It is not a compliance guarantee." },
  { name: "Human review", ex: "A reviewer compares the name with the printed label and listens to the result.", who: "person", whoLabel: "A person", limit: "A sample of attention, not a study with screen-reader users." },
];

/** Verification as a chain: each stage says who does it and what it cannot tell you. */
export function VerifyFlow() {
  return (
    <figure>
      <ol className="vf" aria-label="Verification, one finding from start to review">
        {steps.map((s) => (
          <li key={s.name} data-who={s.who}>
            <span className="vf-node" aria-hidden="true" />
            <h3 className="sp-h3">{s.name}</h3>
            <p className="vf-ex">{s.ex}</p>
            <p className="vf-who">{s.whoLabel}</p>
            <p className="vf-limit">
              <span>Cannot tell you</span>
              {s.limit}
            </p>
          </li>
        ))}
      </ol>
      <p className="vf-loop">If a check fails, or the reviewer disagrees, the file goes back to the correction and through every check again. A file is delivered only when both checks pass, or a person has overridden a result and written down why.</p>
      <figcaption className="mt-3 text-[0.9rem] text-muted">Illustrative sample. Fictional city (Alder Creek).</figcaption>
    </figure>
  );
}
