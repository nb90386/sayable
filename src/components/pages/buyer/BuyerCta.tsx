import Link from "next/link";

type Action = { href: string; label: string };

/** Closing block for buyer pages: one primary action, one quiet secondary link. */
export function BuyerCta({
  id,
  title,
  body,
  primary,
  secondary,
}: {
  id: string;
  title: string;
  body: string;
  primary: Action;
  secondary?: Action;
}) {
  return (
    <section aria-labelledby={id} className="night on-night">
      <div className="wrap grid-12 gap-y-8 py-20 sm:py-28">
        <h2 id={id} className="headline col-span-12 lg:col-span-7">
          {title}
        </h2>
        <div className="col-span-12 self-end lg:col-span-4 lg:col-start-9">
          <p className="text-moon-muted">{body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href={primary.href} className="btn btn-night">
              {primary.label} <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
            </Link>
            {secondary ? (
              <Link href={secondary.href} className="link-quiet">
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
