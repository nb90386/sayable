import Link from "next/link";

type Action = { href: string; label: string };

/**
 * Opening block with a visual. "split": text left, visual right from lg. "stack": text on top, a wide visual below.
 * Used by the pages that open with an illustration instead of a headline alone.
 */
export function PageHero({
  title,
  lede,
  primary,
  secondary,
  layout = "split",
  children,
}: {
  title: React.ReactNode;
  lede: React.ReactNode;
  primary?: Action;
  secondary?: Action;
  layout?: "split" | "stack";
  children: React.ReactNode;
}) {
  return (
    <header className="pg-hero wrap" data-layout={layout}>
      <div className="pg-hero-text">
        <h1 className="display pg-hero-title">{title}</h1>
        <p className="lede pg-hero-lede">{lede}</p>
        {primary ? (
          <div className="pg-hero-actions">
            <Link href={primary.href} className="btn">
              {primary.label} <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
            </Link>
            {secondary ? (
              <Link href={secondary.href} className="link-quiet">
                {secondary.label}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="pg-hero-visual">{children}</div>
    </header>
  );
}
