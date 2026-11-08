import Link from "next/link";
import { ClosingBand } from "./GuideParts";

export type Toc = { id: string; label: string }[];

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function GuideLayout({
  title,
  summary,
  readingMinutes,
  updated,
  contents,
  children,
}: {
  title: string;
  summary: string;
  readingMinutes: number;
  updated: string;
  contents: Toc;
  children: React.ReactNode;
}) {
  return (
    <>
      <article>
        <header className="wrap pt-[calc(var(--header-h)+3rem)] pb-12">
          <nav aria-label="Breadcrumb" className="text-[0.95rem] text-muted">
            <Link href="/resources" className="text-link">
              Resources
            </Link>
          </nav>
          <h1 className="display mt-6 max-w-[18ch] text-[length:clamp(2.4rem,1.4rem+3.8vw,4.8rem)]">{title}</h1>
          <p className="lede mt-8 !max-w-[52ch]">{summary}</p>
          <p className="mt-6 text-[0.85rem] text-muted">
            {readingMinutes} minute read, updated <time dateTime={updated}>{formatDate(updated)}</time>
          </p>
        </header>

        <div className="wrap grid-12 gap-y-10 pb-24">
          <nav aria-labelledby="toc-h" className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <h2 id="toc-h" className="title text-[1rem]">
                Contents
              </h2>
              <ol className="mt-4 space-y-2 border-t pt-4 text-[0.95rem] hairline">
                {contents.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} className="text-link !no-underline hover:!underline">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="col-span-12 max-w-[40rem] space-y-12 text-[length:var(--step-0)] leading-[1.6] text-ink-soft lg:col-span-8 lg:col-start-5">
            {children}
            <p className="border-t pt-6 text-[0.95rem] text-muted hairline">
              This guide is general information, not legal advice. Questions about what the law requires of your
              organization are for your counsel.
            </p>
          </div>
        </div>
      </article>
      <ClosingBand
        title="Start with a Readiness Audit."
        body="We inventory the PDFs your site links to, check them, and give you a ranked list of what to repair, archive or replace. Your team decides what happens next."
      />
    </>
  );
}
