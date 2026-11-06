"use client";

import { LazyMotion } from "motion/react";

const load = () => import("./features").then((m) => m.default);

/** Motion features are fetched after hydration so they never delay the first paint. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={load} strict>
      {children}
    </LazyMotion>
  );
}
