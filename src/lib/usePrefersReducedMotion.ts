"use client";
import { useSyncExternalStore } from "react";

const RM = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(RM);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const read = () => window.matchMedia(RM).matches;

/**
 * Hydration-safe reduced-motion preference. The server cannot know it, so the
 * first client render matches the server (false) and the real value follows
 * immediately after. CSS enforces the reduced end states in the meantime.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, read, () => false);
}
