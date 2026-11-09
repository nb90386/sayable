import { Reveal } from "@/components/pages/PageParts";

/** One finding travelling to its review. Illustrative: a fictional file from the City of Alder Creek. */
export function FindingReview() {
  return (
    <figure>
      <Reveal kind="depth" className="fr">
        <div className="fr-card" data-tone="bad">
          <p className="fr-k">1. Finding</p>
          <h3>A form field has no name</h3>
          <p className="text-[0.95rem] text-ink-soft">
            Field 4 of 11 on page 2 of <span className="mono">building-permit-application.pdf</span>. A screen reader would say &ldquo;edit, blank.&rdquo;
          </p>
          <p className="hx-status" data-state="soon">Software found it</p>
        </div>
        <span className="fr-arrow" aria-hidden="true" data-icon="arrow-r" />
        <div className="fr-card" data-tone="ok">
          <p className="fr-k">2. Draft fix and review</p>
          <h3>A person checks the fix</h3>
          <p className="fr-diff" aria-label="Proposed change: name the field Parcel number">
            <span className="del">- name: (none)</span>
            <br />
            <span className="add">+ name: Parcel number</span>
          </p>
          <p className="text-[0.95rem] text-ink-soft">
            Software drafts the name. A reviewer confirms it matches the printed label, then the file is checked again. The visible page does not change.
          </p>
          <p className="hx-status" data-state="now">Approved, re-checked</p>
        </div>
      </Reveal>
      <figcaption className="mt-4 text-[0.9rem] text-muted">Illustrative. Fictional city. Routine fixes are drafted by software we are still testing; a person reviews each one.</figcaption>
    </figure>
  );
}
