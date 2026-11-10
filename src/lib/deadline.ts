/**
 * ADA Title II web rule compliance dates, as published by the Justice Department
 * (28 CFR 35.200, as extended by the interim final rule of April 20, 2026,
 * 91 FR, FR Doc. 2026-07663). Checked against ada.gov "First steps" on 2026-11-09.
 *
 * The rule sets a calendar date, not a time of day. The countdown runs to the
 * start of that date in Washington, D.C. (US Eastern Time). In late April the
 * Eastern zone is on daylight time (UTC-4), so midnight there is 04:00 UTC.
 */
export type DeadlineKey = "large" | "small";

export const DEADLINES: Record<DeadlineKey, { date: string; year: number; label: string; who: string; startsAtUtc: number }> = {
  large: {
    date: "April 26, 2027",
    year: 2027,
    label: "50,000 or more people",
    who: "State and local governments with a total population of 50,000 or more",
    startsAtUtc: Date.UTC(2027, 3, 26, 4, 0, 0),
  },
  small: {
    date: "April 26, 2028",
    year: 2028,
    label: "Under 50,000, or a special district",
    who: "Governments with a total population under 50,000, and special district governments",
    startsAtUtc: Date.UTC(2028, 3, 26, 4, 0, 0),
  },
};

export type Remaining = { days: number; hours: number; minutes: number; seconds: number; passed: boolean };

/** Whole units left until `target`. Never negative: once the date has begun, everything is zero and `passed` is true. */
export function remaining(now: number, target: number): Remaining {
  const ms = target - now;
  if (!(ms > 0)) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    passed: false,
  };
}
