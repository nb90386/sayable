"use client";

/**
 * Privacy choice, kept in localStorage (no cookies). `analytics: true` is the
 * only optional category. A Global Privacy Control signal counts as
 * "Essential only" until the visitor explicitly chooses otherwise.
 */
export type Consent = { v: 1; analytics: boolean; at: string };
const KEY = "sayable-consent";
const EVENT = "sayable:consent";

export function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    return c && c.v === 1 && typeof c.analytics === "boolean" ? c : null;
  } catch {
    return null;
  }
}

export function gpcEnabled() {
  return typeof navigator !== "undefined" && (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

export function writeConsent(analytics: boolean): Consent {
  const c: Consent = { v: 1, analytics, at: new Date().toISOString() };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    /* storage blocked: the choice applies to this page view only */
  }
  window.dispatchEvent(new CustomEvent<Consent>(EVENT, { detail: c }));
  return c;
}

/** Analytics is allowed only by an explicit choice. */
export function analyticsAllowed() {
  return readConsent()?.analytics === true;
}

export function onConsent(fn: (c: Consent) => void) {
  const h = (e: Event) => fn((e as CustomEvent<Consent>).detail);
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}
