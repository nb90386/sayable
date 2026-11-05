import Link from "next/link";

/** Opening block shared by supporting pages: title, lede, and a structural margin note. */
export function PageIntro({
  title,
  lede,
  note,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  note?: string;
}) {
  return (
    <header className="wrap pt-[calc(var(--header-h)+4rem)] pb-16 sm:pb-24">
      <div className="grid-12 gap-y-8">
        <div className="col-span-12 lg:col-span-9">
          <h1 className="display mt-7 text-[length:clamp(2.6rem,1.4rem+4.4vw,5.6rem)]">{title}</h1>
        </div>
        <div className="col-span-12 grid gap-6 border-t pt-8 hairline md:col-span-10 md:col-start-3 md:grid-cols-[1fr_auto] lg:col-span-8 lg:col-start-5">
          <p className="lede !max-w-[46ch]">{lede}</p>
          {note ? <p className="tag self-start !text-muted md:text-right">{note}</p> : null}
        </div>
      </div>
    </header>
  );
}

/** An editorial row: heading on the left, body on the right. */
export function Row({
  id,
  title,
  kicker,
  children,
}: {
  /** Kept for callers; no longer rendered as a kicker. */
  n?: string;
  id?: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="border-t hairline py-12 sm:py-16">
      <div className="grid-12 gap-y-6">
        <div className="col-span-12 md:col-span-5">
          <h2 id={id ? `${id}-title` : undefined} className="font-serif text-[length:var(--step-3)] font-[760] leading-[1.02] tracking-[-0.03em]">
            {title}
          </h2>
          {kicker ? <p className="mt-4 max-w-[34ch] font-serif text-[1.15rem] text-ink-soft">{kicker}</p> : null}
        </div>
        <div className="prose-tight col-span-12 max-w-[62ch] text-ink-soft md:col-span-7">{children}</div>
      </div>
    </section>
  );
}

/** Closing invitation used at the foot of supporting pages. */
export function PageCta({ title = "Start with what you already publish.", body }: { title?: string; body?: string }) {
  return (
    <section aria-labelledby="page-cta" className="night on-night border-b" style={{ borderColor: "var(--rule-night)" }}>
      <div className="wrap grid-12 gap-y-8 py-20 sm:py-28">
        <h2 id="page-cta" className="headline col-span-12 lg:col-span-7">
          {title}
        </h2>
        <div className="col-span-12 self-end lg:col-span-4 lg:col-start-9">
          <p className="text-moon-muted">
            {body ??
              "Tell us about your site and your documents. We'll scope an audit, or start with a small sample so you can judge the work before committing."}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/contact" className="btn btn-night">
              Request an audit <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
            </Link>
            <Link href="/approach" className="link-quiet text-moon">
              How we report results
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Small mono list of tag-like specifics. */
export function Spec({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 border-t hairline">
      {items.map((it) => (
        <li key={it} className="flex gap-4 border-b py-3 text-[0.95rem] hairline">
          <span aria-hidden="true" className="tag pt-1">
            ›
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
