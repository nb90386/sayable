"use client";

import { AnimatePresence, m, useTransform, type MotionValue } from "motion/react";
import { useEffect, useState } from "react";
import { DEADLINES, LEGAL_CHECKED, remainingMinutes, type DeadlineKey } from "@/lib/deadline";
import { EASE_OUT } from "@/lib/motion";
import { useNow } from "@/lib/useNow";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** One digit in a fixed-width slot. A changed digit settles in from above; the old one leaves below. */
function Digit({ d, still }: { d: string; still: boolean }) {
  return (
    <span className="cd-slot">
      <AnimatePresence initial={false} mode="popLayout">
        <m.span
          key={d}
          className="cd-digit"
          initial={still ? false : { y: "-50%", opacity: 0, filter: "blur(2px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={still ? { opacity: 0, transition: { duration: 0 } } : { y: "40%", opacity: 0, filter: "blur(2px)", transition: { duration: 0.15, ease: EASE_OUT } }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
        >
          {d}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

function Num({ v, pad, ready, still }: { v: number; pad: number; ready: boolean; still: boolean }) {
  const s = String(v).padStart(pad, "0");
  return (
    <span className="dm-num" data-ready={ready ? "" : undefined} data-v={ready ? s : undefined}>
      {ready ? s.split("").map((c, i) => <Digit key={s.length - i} d={c} still={still} />) : <span className="cd-slot">{"0".repeat(pad)}</span>}
    </span>
  );
}

/**
 * The live count, set as type: "in 167 days". Days only: the rule sets a date, not a time of day,
 * and hours and minutes read as sales urgency. Visual only; the sentence beside it is what
 * assistive technology reads.
 */
export function Countdown({ which, className = "" }: { which: DeadlineKey; className?: string }) {
  const t = useNow();
  const still = usePrefersReducedMotion();
  const d = DEADLINES[which];
  const r = t === null ? null : remainingMinutes(t, d.startsAtUtc);
  const ready = r !== null;
  return (
    <>
      <span className={`dm-count ${className}`} aria-hidden="true" data-passed={r?.passed ? "" : undefined}>
        {r?.passed ? (
          <span className="dm-u">The date has arrived</span>
        ) : r && r.days === 0 ? (
          <span className="dm-u">Less than a day</span>
        ) : (
          <>
            <span className="dm-u">in</span>
            <Num v={r?.days ?? 0} pad={3} ready={ready} still={still} />
            <span className="dm-u">days</span>
          </>
        )}
      </span>
      <span className="sr-only">
        {r === null ? "" : r.passed ? ` The date, ${d.date}, has arrived.` : ` About ${r.days} days remain until ${d.date}.`}
      </span>
    </>
  );
}

/**
 * The deadline as a precise line of type above the headline: what it is, the date, the live count,
 * who it applies to, the other date, and the fine print one click away. On wide screens the story
 * draws a line of light from the end of the count to the Sayable scan on the form.
 */
export function DeadlineMark({ which, setWhich }: { which: DeadlineKey; setWhich: (k: DeadlineKey) => void }) {
  const d = DEADLINES[which];
  const other: DeadlineKey = which === "large" ? "small" : "large";
  return (
    <div className="dm">
      <p className="dm-k">ADA Title II web rule · WCAG 2.1 AA</p>
      <p className="dm-row">
        <span className="dm-date">{d.date}</span>
        <Countdown which={which} />
      </p>
      <div className="dm-meta">
        <span>
          {which === "large" ? "For governments with a total population of 50,000 or more." : "For governments under 50,000 people, and all special districts."}
        </span>
        <button type="button" className="dm-switch" onClick={() => setWhich(other)}>
          {which === "large" ? "Under 50,000, or a special district? April 26, 2028" : "50,000 or more? April 26, 2027"}
        </button>
      </div>
      <div className="dm-meta dm-status">
        <span>
          Extension under court challenge<span className="dm-long">; no ruling as of {LEGAL_CHECKED}</span>.
        </span>
        <details className="dm-about">
          <summary>About this date</summary>
          <div className="dm-about-body">
            <p>
              Set by the Justice Department&rsquo;s ADA Title II web rule, as extended in April 2026. The standard is WCAG 2.1 AA. Total population means your
              2020 Census population, not the number of people you serve.
            </p>
            <p>
              The rule has exceptions, with conditions, for archived content and for some documents posted before the date. An audit flags candidates; your
              team and counsel decide.
            </p>
            <p>
              The count runs to the start of the date in Washington, D.C.; the rule sets a date, not a time of day. Dates in effect as of {LEGAL_CHECKED}. The
              extension is being challenged in court. <a href="#why-now">What that means</a>
            </p>
          </div>
        </details>
      </div>
      <p className="sr-only" aria-live="polite">
        {which === "large" ? "" : "Showing April 26, 2028, for governments under 50,000 people and special districts."}
      </p>
    </div>
  );
}

/**
 * A line of light from the end of the count to the left end of the Sayable scan on the form, so the
 * deadline is literally where the scan starts. Measured from the rendered elements; it fades as soon
 * as the visitor scrolls and the scan itself takes over. Wide screens only.
 */
export function Signal({ stage, p, deps }: { stage: React.RefObject<HTMLElement | null>; p: MotionValue<number>; deps: unknown }) {
  const [g, setG] = useState<{ x: number; y: number; w: number; a: number } | null>(null);
  // The story already sits about 1% in at the top of the page (it tucks under the header), so fades start after that.
  const o = useTransform(p, [0.016, 0.03], [1, 0]);
  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    const measure = () => {
      const count = root.querySelector(".hero-copy .dm-count");
      const line = root.querySelector(".story-doc .scan-line");
      if (!count || !line || window.innerWidth < 900) return setG(null);
      const r0 = root.getBoundingClientRect();
      const c = count.getBoundingClientRect();
      const l = line.getBoundingClientRect();
      const x1 = c.right - r0.left + 16;
      const y1 = c.top + c.height * 0.58 - r0.top;
      const x2 = l.left - r0.left + 3;
      const y2 = l.bottom - r0.top - 2;
      const w = Math.hypot(x2 - x1, y2 - y1);
      setG(w > 24 ? { x: x1, y: y1, w, a: Math.atan2(y2 - y1, x2 - x1) } : null);
    };
    measure();
    const doc = root.querySelector(".story-doc");
    doc?.addEventListener("animationend", measure);
    void document.fonts?.ready.then(measure);
    const t = setTimeout(measure, 1200);
    return () => {
      doc?.removeEventListener("animationend", measure);
      clearTimeout(t);
    };
  }, [stage, deps]);
  if (!g) return null;
  return (
    <m.span aria-hidden="true" className="dm-signal" style={{ left: g.x, top: g.y, width: g.w, rotate: `${g.a}rad`, opacity: o }}>
      <span />
    </m.span>
  );
}

/** At rest, the first problem is named on the form itself, before any scroll. Visual only. */
export function RestNote({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [0.02, 0.04], [1, 0]);
  return (
    <m.div className="rest-note" style={{ opacity: o }}>
      <span className="rest-note-n">1</span>
      <span>
        A screen reader reads this title as plain text, so a resident can&rsquo;t jump to it.
      </span>
    </m.div>
  );
}
