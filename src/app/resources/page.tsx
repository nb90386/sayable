import type { Metadata } from "next";
import Link from "next/link";
import { TrackedLink } from "@/components/TrackedLink";
import { PageIntro } from "@/components/pages/PageParts";
import { resourceHref, resources } from "@/content/resources";

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
      <section aria-labelledby="guides-h" className="wrap pb-24">
        <h2 id="guides-h" className="sr-only">
          Guides
        </h2>
        <ol className="border-t hairline">
          {resources.map((r) => (
            <li key={r.slug} className="border-b py-10 hairline sm:py-12">
              <div className="grid-12 gap-y-4">
                <h3 className="title col-span-12 text-[length:var(--step-2)] !leading-[1.1] md:col-span-7">
                  <TrackedLink href={resourceHref(r.slug)} event="resource_open" label={r.slug} className="hover:text-signal">
                    {r.title}
                  </TrackedLink>
                </h3>
                <div className="col-span-12 md:col-span-4 md:col-start-9">
                  <p className="text-ink-soft">{r.summary}</p>
                  <p className="mt-3 text-[0.85rem] text-muted">{r.readingMinutes} minute read</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-[56ch] text-muted">
          These guides are general information, not legal advice. When you are ready to see what is on your own site,
          the <Link href="/readiness-audit" className="text-link">Readiness Audit</Link> is where we start.
        </p>
      </section>
    </>
  );
}
