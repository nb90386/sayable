import type { Metadata } from "next";
import Link from "next/link";
import { TrackedLink } from "@/components/TrackedLink";
import { PageIntro } from "@/components/pages/PageParts";
import { GuideCover } from "@/components/pages/resources/Covers";
import { resourceHref, resources } from "@/content/resources";

const topics: Record<string, string> = {
  "title-ii-rule-and-your-pdfs": "The rule",
  "inventory-government-pdfs": "Finding your files",
  "what-a-pdf-audit-tells-you": "Audits",
  "why-automated-checks-miss-problems": "Automated checks",
};
const featured = resources.find((r) => r.slug === "title-ii-rule-and-your-pdfs")!;
const rest = resources.filter((r) => r !== featured);

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Plain-language guides for local governments on inventorying public PDFs, reading an accessibility audit, and what automated checks can and cannot find.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <PageIntro
        title="Guides for the people who run the website."
        lede="Short, practical writing on public PDFs: how to find them, how to read a check result, and where software stops and a person starts."
      />
      <section aria-labelledby="featured-h" className="wrap pb-16 sm:pb-24">
        <h2 id="featured-h" className="sr-only">
          Start here
        </h2>
        <article className="rs-feature">
          <TrackedLink href={resourceHref(featured.slug)} event="resource_open" label={featured.slug} className="rs-feature-cover" aria-hidden="true" tabIndex={-1}>
            <GuideCover slug={featured.slug} wide />
          </TrackedLink>
          <div className="rs-feature-text">
            <p className="rs-topic">Start here. {topics[featured.slug]}</p>
            <h3 className="display text-[length:var(--step-4)] !leading-[1.04]">
              <TrackedLink href={resourceHref(featured.slug)} event="resource_open" label={featured.slug} className="hover:text-signal">
                {featured.title}
              </TrackedLink>
            </h3>
            <p className="mt-5 max-w-[44ch] text-[length:var(--step-0)] text-ink-soft">{featured.summary}</p>
            <p className="mt-5 text-[0.9rem] text-muted">{featured.readingMinutes} minute read</p>
            <p className="mt-6">
              <TrackedLink href={resourceHref(featured.slug)} event="resource_open" label={`${featured.slug}-cta`} className="btn">
                Read the guide <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
              </TrackedLink>
            </p>
          </div>
        </article>
      </section>

      <section aria-labelledby="guides-h" className="sp-section sp-band">
        <div className="wrap">
          <h2 id="guides-h" className="sp-h2 max-w-[20ch]">
            Then go deeper
          </h2>
          <ol className="rs-grid mt-10">
            {rest.map((r) => (
              <li key={r.slug} className="rs-item">
                <TrackedLink href={resourceHref(r.slug)} event="resource_open" label={`${r.slug}-cover`} className="rs-cover-link" aria-hidden="true" tabIndex={-1}>
                  <GuideCover slug={r.slug} />
                </TrackedLink>
                <p className="rs-topic mt-5">{topics[r.slug]}</p>
                <h3 className="title mt-1.5 text-[length:var(--step-1)] !leading-[1.15]">
                  <TrackedLink href={resourceHref(r.slug)} event="resource_open" label={r.slug} className="hover:text-signal">
                    {r.title}
                  </TrackedLink>
                </h3>
                <p className="mt-3 text-[0.975rem] text-ink-soft">{r.summary}</p>
                <p className="mt-3 text-[0.9rem] text-muted">{r.readingMinutes} minute read</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap pb-24 pt-12">
        <p className="mt-10 max-w-[56ch] text-muted">
          These guides are general information, not legal advice. When you are ready to see what is on your own site,
          the <Link href="/readiness-audit" className="text-link">Readiness Audit</Link> is where we start.
        </p>
      </section>
    </>
  );
}
