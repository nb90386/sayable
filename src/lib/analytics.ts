"use client";

import { track as vaTrack } from "@vercel/analytics";
import { analyticsAllowed } from "./consent";

/** The only events the site records. Properties are fixed labels, never personal data. */
export type EventName =
  | "audit_cta_click"
  | "contact_form_start"
  | "contact_form_success"
  | "demo_play"
  | "estimator_change"
  | "sample_report_view"
  | "resource_open"
  | "pdf_check_run";

type Props = Record<string, string | number | boolean>;

export function track(name: EventName, props?: Props) {
  if (typeof window === "undefined" || !analyticsAllowed()) return;
  try {
    vaTrack(name, props);
  } catch {
    /* analytics is optional; never break the page */
  }
}
