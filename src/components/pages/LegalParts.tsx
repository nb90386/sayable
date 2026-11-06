import { PageIntro } from "@/components/pages/PageParts";

export type LegalSection = { id: string; title: string };

/** Marks a detail that has not been confirmed yet. */
export function Tbc({ children }: { children?: React.ReactNode }) {
  return (
    <span className="mono rounded-[3px] bg-ember-wash px-1.5 py-0.5 text-[0.82em] text-ember">
      To be confirmed before launch{children ? `: ${children}` : ""}
    </span>
  );
}

/** Shared reading layout for legal and policy pages. */
export function LegalLayout({
  title,
  lede,
  note,
  sections,
  tbcItems,
  hideDraft,
  children,
}: {
  title: string;
  lede: string;
  note: string;
  sections: LegalSection[];
  tbcItems?: string[];
  hideDraft?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageIntro title={title} lede={lede} note={note} />
      <div className="wrap pb-28">
        {hideDraft ? null : (
        <aside
          aria-labelledby="draft-note"
          className="mb-12 max-w-[40rem] rounded-[6px] bg-paper-deep px-5 py-4 text-[0.97rem] text-ink-soft shadow-[inset_0_0_0_1px_var(--rule-strong)]"
        >
          <h2 id="draft-note" className="title text-ink">
            Review draft
          </h2>
          <p className="mt-2">
            This page is a draft. It has not been reviewed by a lawyer and may change before launch.
          </p>
          {tbcItems && tbcItems.length > 0 ? (
            <>
              <p className="mt-3 font-semibold text-ink">Still to be confirmed before launch:</p>
              <ul className="mt-1 list-disc pl-5">
                {tbcItems.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </>
          ) : null}
        </aside>
        )}
        <div className="grid-12 gap-y-10">
          <nav aria-label="On this page" className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <p className="font-[600] text-ink">Contents</p>
              <ol className="mt-3 border-t hairline">
                {sections.map((s) => (
                  <li key={s.id} className="border-b hairline">
                    <a href={`#${s.id}`} className="block py-2 text-[0.95rem] text-ink-soft hover:text-signal hover:underline">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <div className="legal-body col-span-12 max-w-[40rem] lg:col-span-8 lg:col-start-5">{children}</div>
        </div>
      </div>
    </>
  );
}

export function LegalSectionBlock({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t hairline py-10 first:border-t-0 first:pt-0">
      <h2 id={`${id}-title`} className="title text-[length:var(--step-2)] leading-[1.1] text-ink">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-ink-soft [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5">{children}</div>
    </section>
  );
}

export function DataTable({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={caption}>
      <table className="w-full min-w-[34rem] border-collapse text-left text-[0.95rem]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b-2 hairline text-ink">
            {head.map((h) => (
              <th key={h} scope="col" className="py-2 pr-4 align-bottom font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b hairline align-top">
              {r.map((c, j) => (
                <td key={j} className="py-3 pr-4">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
