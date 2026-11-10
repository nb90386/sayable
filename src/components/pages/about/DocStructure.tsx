import "@/app/pages-extra.css";

/**
 * A form with its hidden structure drawn: heading, field names and reading order.
 * Mirrors the scanner on the home page. Fictional document, fictional city.
 */
const rows = [
  { label: "Account number", name: "Account number", ok: true },
  { label: "Service address", name: "Service address", ok: true },
  { label: "Household size", name: "", ok: false },
  { label: "Signature", name: "Signature", ok: true },
] as const;

export function DocStructure() {
  return (
    <figure className="ds">
      <div
        className="ds-grid"
        role="img"
        aria-label="A utility assistance form shown with its hidden structure. The title is a heading, three fields have names a screen reader announces, and the household size field has no name. Reading order runs top to bottom."
      >
        <div className="ds-sheet" aria-hidden="true">
          <p className="ds-title">Utility assistance application</p>
          <p className="ds-sub">City of Alder Creek, Water and sewer</p>
          {rows.map((r) => (
            <div key={r.label} className="ds-field">
              <span>{r.label}</span>
              <span className="ds-box" data-bad={r.ok ? undefined : ""} />
            </div>
          ))}
        </div>
        <ol className="ds-tags" aria-hidden="true">
          <li data-ok="">
            <i>1</i>
            <span>Heading, level 1</span>
          </li>
          {rows.map((r, k) => (
            <li key={r.label} data-ok={r.ok ? "" : undefined}>
              <i>{k + 2}</i>
              <span>{r.ok ? `Field name: ${r.name}` : "No field name. Read aloud as “edit, blank”"}</span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="ds-cap">
        <span><b className="ds-key" data-ok="" aria-hidden="true" /> Structure in place</span>
        <span><b className="ds-key" aria-hidden="true" /> Missing</span>
        <span>Numbers show reading order. Sample document, fictional city.</span>
      </figcaption>
    </figure>
  );
}
