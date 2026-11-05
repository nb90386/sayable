import Link from "next/link";
import { PermitSheet } from "../doc/PermitSheet";

/** Chapter 8. The opening document returns, its structure now readable in order. */
export function Conclusion() {
  return (
    <section data-sc-act="close" aria-labelledby="close-title" className="scene-dark on-night pb-[clamp(9rem,18vh,13rem)] pt-[clamp(9rem,18vh,13rem)]">
      <div className="wrap text-center">
        <h2 id="close-title" className="display mx-auto max-w-[14ch] text-[length:var(--step-5)]">
          See what your documents need.
        </h2>
        <p className="lede mx-auto mt-6 !max-w-[46ch]">
          Send us your public website. We&rsquo;ll scope a Readiness Audit of the documents on it and tell you what the work
          will take.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/contact?topic=audit" className="btn btn-night">
            Request a Readiness Audit
          </Link>
          <Link href="/contact?topic=pilot" className="link-quiet">
            Discuss a pilot <span aria-hidden="true" data-icon="chev"></span>
          </Link>
        </div>
      </div>
      <div className="wrap mt-16">
        <figure className="mx-auto max-w-[680px]">
          <PermitSheet layer="fixed" label="The permit application from the opening, repaired: a level-one heading, every field named, and a reading order from the title to the date." />
          <figcaption className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[0.92rem] text-moon-muted">
            <span className="stamp">
              <span aria-hidden="true" data-icon="check"></span> Checked
            </span>
            The same form, read in order. Example document.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
