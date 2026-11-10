"use client";
import { useSyncExternalStore } from "react";

/**
 * A clock that ticks on each whole minute. The server snapshot is null, so anything
 * time-dependent renders only on the client and the server HTML never disagrees with it.
 * The snapshot stays the same between ticks, or React would re-render on every check.
 */
let now = 0;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setTimeout> | undefined;
function schedule() {
  timer = setTimeout(() => {
    now = Date.now();
    listeners.forEach((l) => l());
    schedule();
  }, 60_000 - (Date.now() % 60_000) + 5);
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
const read = () => {
  if (!now) now = Date.now();
  return now;
};
export const useNow = () => useSyncExternalStore<number | null>(subscribe, read, () => null);
