"use client";

import Link from "next/link";
import { track, type EventName } from "@/lib/analytics";

/** A Next.js link that records one consent-gated, anonymous event when followed. */
export function TrackedLink({
  event,
  label,
  ...props
}: React.ComponentProps<typeof Link> & { event: EventName; label: string }) {
  return <Link {...props} onClick={() => track(event, { item: label })} />;
}
