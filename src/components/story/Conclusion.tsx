import Link from "next/link";

/** Closing chapter: one invitation, one lighter alternative. */
export function Conclusion() {
  return (
    <section data-sc-act="close" aria-labelledby="close-title" className="scene-dark from-deep to-night on-night pb-[clamp(7rem,14vh,10rem)] pt-[clamp(8rem,16vh,11rem)]">
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
          <Link href="/check" className="link-quiet">
            Or check one PDF first <span aria-hidden="true" data-icon="chev"></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
