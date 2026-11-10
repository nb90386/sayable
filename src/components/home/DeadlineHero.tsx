"use client";

import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { Segmented } from "@/components/motion/Segmented";
import { track } from "@/lib/analytics";
import { DEADLINES, remaining, type DeadlineKey } from "@/lib/deadline";
import { EASE_OUT } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** A clock that ticks on each whole second. The server snapshot is null, so the numbers only ever render on the client. */
let now = 0;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setTimeout> | undefined;
function schedule() {
  timer = setTimeout(
    () => {
      now = Date.now();
      listeners.forEach((l) => l());
      schedule();
    },
    1000 - (Date.now() % 1000) + 5,
  );
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  if (listeners.size === 1) {
    now = Date.now();
    schedule();
  }
  return () => {
    listeners.delete(cb);
    if (!listeners.size && timer) clearTimeout(timer);
  };
}
const read = () => now || Date.now();
const useNow = () =>
  useSyncExternalStore<number | null>(subscribe, read, () => null);

/** One digit in a fixed-width slot. A changed digit slides in from above while the old one leaves below. */
function Digit({ d, still }: { d: string; still: boolean }) {
  return (
    <span className="cd-slot">
      <AnimatePresence initial={false} mode="popLayout">
        <m.span
          key={d}
          className="cd-digit"
          initial={
            still ? false : { y: "-55%", opacity: 0, filter: "blur(2px)" }
          }
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={
            still
              ? { opacity: 0, transition: { duration: 0 } }
              : {
                  y: "45%",
                  opacity: 0,
                  filter: "blur(2px)",
                  transition: { duration: 0.15, ease: EASE_OUT },
                }
          }
          transition={{ duration: 0.22, ease: EASE_OUT }}
        >
          {d}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

function Unit({
  value,
  pad,
  label,
  still,
  ready,
}: {
  value: number;
  pad: number;
  label: string;
  still: boolean;
  ready: boolean;
}) {
  const s = String(value).padStart(pad, "0");
  return (
    <div className="cd-unit">
      <span className="cd-num" data-ready={ready ? "" : undefined}>
        {ready ? (
          s
            .split("")
            .map((c, i) => <Digit key={s.length - i} d={c} still={still} />)
        ) : (
          <span className="cd-slot">{"0".repeat(pad)}</span>
        )}
      </span>
      <span className="cd-label">{label}</span>
    </div>
  );
}

/**
 * The homepage opening: the federal date, a live count to it, and what Sayable does about it.
 * The count is computed from the visitor's clock against a fixed instant (the start of the date
 * in US Eastern Time). It renders only on the client, so the server HTML never disagrees with it.
 */
export function DeadlineHero() {
  const [which, setWhich] = useState<DeadlineKey>("large");
  const d = DEADLINES[which];
  const t = useNow();
  const still = usePrefersReducedMotion();
  const r = t === null ? null : remaining(t, d.startsAtUtc);
  const ready = r !== null;

  return (
    <section
      className="dh"
      aria-labelledby="hero-title"
      data-sc-act="deadline-hero"
    >
      <div aria-hidden="true" className="dh-light" />
      <div className="wrap dh-grid">
        <div className="dh-top">
          <p className="dh-rule">Federal ADA Title II web accessibility rule</p>
          <Segmented
            label="Which compliance date applies to your government"
            options={[
              { value: "large", label: "Population 50,000 or more" },
              { value: "small", label: "Under 50,000 or special district" },
            ]}
            value={which}
            onChange={setWhich}
            className="dh-seg"
          />
        </div>

        <div className="dh-main">
          <h1 id="hero-title" className="dh-h1">
            <span className="dh-date">{d.date}</span>
            <span className="dh-kicker">
              {which === "large"
                ? "The federal accessibility deadline for state and local governments with a total population of 50,000 or more."
                : "The federal accessibility deadline for governments with a total population under 50,000, and for special districts."}
            </span>
          </h1>

          <div
            className="dh-count"
            role="group"
            aria-label={`Time until ${d.date}`}
          >
            <div
              className="cd"
              aria-hidden="true"
              data-passed={r?.passed ? "" : undefined}
            >
              <Unit
                value={r?.days ?? 0}
                pad={3}
                label="days"
                still={still}
                ready={ready}
              />
              <Unit
                value={r?.hours ?? 0}
                pad={2}
                label="hours"
                still={still}
                ready={ready}
              />
              <Unit
                value={r?.minutes ?? 0}
                pad={2}
                label="minutes"
                still={still}
                ready={ready}
              />
              <Unit
                value={r?.seconds ?? 0}
                pad={2}
                label="seconds"
                still={still}
                ready={ready}
              />
            </div>
            <p className="sr-only">
              {r === null
                ? `The compliance date is ${d.date}.`
                : r.passed
                  ? `The compliance date, ${d.date}, has arrived.`
                  : `About ${r.days} days remain until ${d.date}.`}
            </p>
            <p className="cd-basis">
              {r?.passed
                ? `The compliance date arrived on ${d.date}.`
                : `Counted to the start of ${d.date} in Washington, D.C. The rule sets a date, not a time of day.`}
            </p>
          </div>
        </div>

        <div className="dh-foot">
          <p className="dh-lede">
            Websites, mobile apps and the documents posted on them must meet
            WCAG 2.1 AA, with some exceptions. Finding the PDFs that need
            attention is the first step. Sayable finds your public PDFs, shows
            which to fix first, and has people repair and check them.
          </p>
          <div className="dh-act">
            <div className="hero-actions !mt-0">
              <Link
                href="/contact?topic=audit"
                className="btn"
                onClick={() => track("audit_cta_click", { item: "hero" })}
              >
                Request a Readiness Audit{" "}
                <span
                  className="arrow"
                  aria-hidden="true"
                  data-icon="arrow-r"
                />
              </Link>
              <Link
                href="/readiness-audit#sample"
                className="btn btn-quiet"
                onClick={() => track("sample_report_view", { item: "hero" })}
              >
                See a sample report
              </Link>
            </div>
            <p className="dh-assure">
              A short form. We use it only to reply and scope the audit with
              you.{" "}
              <a href="#rule" className="text-link">
                Which date applies?
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
