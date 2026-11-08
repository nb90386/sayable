import { ViewTransition } from "react";

/**
 * Route changes: the old page fades out quickly, the new one fades in and rises
 * a few pixels. The header is named separately so it never moves. Templates
 * remount on every navigation, which is what lets enter and exit fire.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
