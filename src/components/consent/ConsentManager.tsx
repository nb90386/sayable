"use client";

import { Analytics } from "@vercel/analytics/next";
import { AnimatePresence, motion, useAnimate, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gpcEnabled, onConsent, readConsent, writeConsent } from "@/lib/consent";
import { EASE_OUT, tUi, tUiExit } from "@/lib/motion";

/**
 * Privacy choices. A small banner on first visit, a settings dialog on demand,
 * and Vercel Web Analytics mounted only after an explicit "Allow analytics".
 */
export function ConsentManager() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [banner, setBanner] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [saved, setSaved] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(false);
  const opener = useRef<Element | null>(null);
  const [saveBtn, animate] = useAnimate<HTMLButtonElement>();

  useEffect(() => {
    const c = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read browser-only storage after hydration
    setAllowed(c?.analytics === true);
    setBanner(!c && !gpcEnabled());
    setReady(true);
    const off = onConsent((n) => setAllowed(n.analytics));
    const open = () => {
      opener.current = document.activeElement;
      setDraft(readConsent()?.analytics === true);
      setSaved(0);
      dialog.current?.showModal();
    };
    window.addEventListener("sayable:open-consent", open);
    return () => {
      off();
      window.removeEventListener("sayable:open-consent", open);
    };
  }, []);

  const choose = (analytics: boolean) => {
    writeConsent(analytics);
    setBanner(false);
  };
  const saveDialog = () => {
    writeConsent(draft);
    setBanner(false);
    setSaved((n) => n + 1);
    if (!reduced && saveBtn.current) animate(saveBtn.current, { scale: [1, 1.035, 1] }, { duration: 0.36, ease: EASE_OUT, times: [0, 0.4, 1] });
    setTimeout(() => dialog.current?.close(), reduced ? 0 : 420);
  };

  return (
    <>
      {allowed ? <Analytics /> : null}
      <AnimatePresence>
        {ready && banner ? (
          <motion.section
            key="banner"
            aria-label="Privacy choices"
            className="consent-banner"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: tUi }}
            exit={reduced ? { opacity: 0, transition: tUiExit } : { opacity: 0, y: 8, transition: tUiExit }}
          >
            <p className="text-[0.95rem] leading-snug">
              This site sets no cookies. With your permission we count page visits and a few anonymous clicks using
              cookieless Vercel Web Analytics.{" "}
              <Link href="/cookies" className="text-link">
                Details
              </Link>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="btn btn-quiet press !min-h-11 !px-4 text-[0.95rem]" onClick={() => choose(false)}>
                Essential only
              </button>
              <button type="button" className="btn btn-quiet press !min-h-11 !px-4 text-[0.95rem]" onClick={() => choose(true)}>
                Allow analytics
              </button>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <dialog
        ref={dialog}
        aria-labelledby="consent-title"
        className="consent-dialog"
        onClose={() => (opener.current as HTMLElement | null)?.focus?.()}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="p-6 sm:p-8">
          <h2 id="consent-title" className="title text-[1.4rem]">
            Privacy choices
          </h2>
          <p className="mt-2 text-[0.95rem] text-muted">Your choice is stored in this browser only. You can change it at any time.</p>
          <ul className="mt-6 border-t hairline">
            <li className="flex items-start justify-between gap-6 border-b py-4 hairline">
              <div>
                <p className="font-[600]">Essential storage</p>
                <p className="mt-1 text-[0.9rem] text-muted">Remembers this choice. No cookies. Always on.</p>
              </div>
              <span className="mt-1 shrink-0 text-[0.9rem] font-[600] text-muted">Always on</span>
            </li>
            <li className="flex items-start justify-between gap-6 border-b py-4 hairline">
              <div>
                <label htmlFor="consent-analytics" className="font-[600]">
                  Anonymous analytics
                </label>
                <p id="consent-analytics-desc" className="mt-1 text-[0.9rem] text-muted">
                  Cookieless page and click counts by Vercel Web Analytics. Never your name, email or messages.
                </p>
              </div>
              <input
                id="consent-analytics"
                type="checkbox"
                role="switch"
                aria-describedby="consent-analytics-desc"
                className="switch mt-1"
                checked={draft}
                onChange={(e) => setDraft(e.target.checked)}
              />
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button ref={saveBtn} type="button" className="btn press !min-h-11" onClick={saveDialog}>
              Save choices
            </button>
            <button type="button" className="btn btn-quiet press !min-h-11" onClick={() => dialog.current?.close()}>
              Cancel
            </button>
            <p role="status" className="text-[0.9rem] text-muted">
              {saved ? "Saved." : ""}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
