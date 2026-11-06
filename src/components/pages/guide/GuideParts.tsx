import Link from "next/link";

export function GuideSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28 border-t pt-10 hairline">
      <h2 id={`${id}-h`} className="title text-[length:var(--step-2)] !leading-[1.1] text-ink">
        {title}
      </h2>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="title pt-3 text-[length:var(--step-1)] text-ink">{children}</h3>;
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc space-y-2 pl-6 marker:text-signal">{children}</ul>;
}

export function OL({ children }: { children: React.ReactNode }) {
  return <ol className="list-decimal space-y-2 pl-6 marker:text-signal">{children}</ol>;
}

export function Note({ children }: { children: React.ReactNode }) {
  return <p className="border-l-2 border-signal bg-signal-wash px-5 py-4 text-ink-soft">{children}</p>;
}

/** Scrollable, captioned data table with column headers. */
export function DataTable({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: string[];
  rows: string[][];
}) {
  return (
    <>
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={caption}>
      <table className="w-full min-w-[40rem] border-collapse text-left text-[0.95rem]">
        <caption className="pb-3 text-left text-muted">{caption}</caption>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="border-b border-ink/30 px-3 py-2 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="border-b px-3 py-3 align-top font-medium hairline">
                    {c}
                  </th>
                ) : (
                  <td key={i} className="border-b px-3 py-3 align-top text-ink-soft hairline">
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="mt-2 text-[0.85rem] text-muted md:hidden">Scroll the table sideways to see every column.</p>
    </>
  );
}

/** Closing band shared by guides and supporting pages. */
export function ClosingBand({
  title,
  body,
  primary = { href: "/readiness-audit", label: "See the Readiness Audit" },
  secondary = { href: "/contact?topic=audit", label: "Request an audit" },
}: {
  title: string;
  body: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section aria-labelledby="closing-h" className="night on-night">
      <div className="wrap grid-12 gap-y-8 py-20 sm:py-28">
        <h2 id="closing-h" className="headline col-span-12 lg:col-span-7">
          {title}
        </h2>
        <div className="col-span-12 self-end lg:col-span-4 lg:col-start-9">
          <p className="text-moon-muted">{body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href={primary.href} className="btn btn-night">
              {primary.label}
            </Link>
            <Link href={secondary.href} className="link-quiet text-moon">
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
