import type { ReactNode } from "react";

/**
 * One act of the split stage: the visible story on porcelain at left, the
 * accessible story on graphite at right. Both halves always carry real content.
 * On phones the halves stack, each with its own story label.
 */
export function SplitAct({
  act,
  labelledBy,
  head,
  left,
  right,
  className = "",
  leftClass = "",
  rightClass = "",
}: {
  act: string;
  labelledBy: string;
  head?: ReactNode;
  left: ReactNode;
  right: ReactNode;
  className?: string;
  leftClass?: string;
  rightClass?: string;
}) {
  return (
    <section data-sc-act={act} aria-labelledby={labelledBy} className={`split relative ${className}`}>
      {head}
      <div className="split-grid">
        <div className={`split-l ${leftClass}`}>
          <p className="story-label lg:hidden" aria-hidden="true">
            What you see
          </p>
          {left}
        </div>
        <div className={`split-r night on-night ${rightClass}`}>
          <p className="story-label lg:hidden" aria-hidden="true">
            What a screen reader gets
          </p>
          {right}
        </div>
      </div>
    </section>
  );
}
