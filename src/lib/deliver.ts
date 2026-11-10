import { createHmac, randomUUID } from "node:crypto";
import { INTERESTS, ROLES, type ContactPayload } from "./contact";

/**
 * Where an inquiry goes. Two channels, both configured only on the server:
 *
 *  - Email through Resend's REST API: RESEND_API_KEY, CONTACT_TO_EMAIL (the owner's inbox,
 *    comma-separated for several) and CONTACT_FROM_EMAIL (a sender on a domain verified in Resend).
 *  - A signed JSON webhook (a CRM, a form backend, an automation): CONTACT_WEBHOOK_URL and
 *    optionally CONTACT_WEBHOOK_SECRET for an HMAC-SHA256 signature.
 *
 * A request counts as delivered only when at least one configured channel accepted it.
 * Nothing here ever runs in the browser; no address or key is shipped to the client.
 */
export type Lead = ContactPayload & { receivedAt: string; source: string; id: string };

const label = (list: readonly { value: string; label: string }[], v: string) => list.find((x) => x.value === v)?.label ?? v;

export function channels() {
  const email = process.env.RESEND_API_KEY?.trim() && process.env.CONTACT_TO_EMAIL?.trim() && process.env.CONTACT_FROM_EMAIL?.trim();
  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();
  return { email: !!email, webhook: !!webhook };
}

export function makeLead(p: ContactPayload): Lead {
  return { ...p, receivedAt: new Date().toISOString(), source: "sayable-site/contact", id: randomUUID() };
}

export function leadText(l: Lead) {
  return [
    `New request from the Sayable website`,
    ``,
    `Name: ${l.name}`,
    `Email: ${l.email}`,
    `Organization: ${l.organization}`,
    `Role: ${label(ROLES, l.role)}`,
    `Interested in: ${label(INTERESTS, l.interest)}`,
    `Website: ${l.website || "(not given)"}`,
    ``,
    `Message:`,
    l.message || "(none)",
    ``,
    `Received ${l.receivedAt} · request ${l.id}`,
    `Reply to this email to answer the sender directly.`,
  ].join("\n");
}

async function sendEmail(l: Lead) {
  const to = process.env.CONTACT_TO_EMAIL!.split(",").map((s) => s.trim()).filter(Boolean);
  // RESEND_API_URL exists only so delivery can be exercised against a local stand-in in tests.
  const res = await fetch(`${process.env.RESEND_API_URL?.trim() || "https://api.resend.com"}/emails`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.RESEND_API_KEY!.trim()}`,
      "content-type": "application/json",
      "idempotency-key": `contact/${l.id}`,
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL!.trim(),
      to,
      reply_to: [l.email],
      subject: `Sayable request: ${label(INTERESTS, l.interest)} · ${l.organization}`.slice(0, 180),
      text: leadText(l),
      tags: [{ name: "source", value: "contact_form" }],
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`email ${res.status}`);
}

async function sendWebhook(l: Lead) {
  const json = JSON.stringify(l);
  const headers: Record<string, string> = { "content-type": "application/json" };
  const secret = process.env.CONTACT_WEBHOOK_SECRET?.trim();
  if (secret) headers["x-sayable-signature"] = createHmac("sha256", secret).update(json).digest("hex");
  const res = await fetch(process.env.CONTACT_WEBHOOK_URL!.trim(), { method: "POST", headers, body: json, signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`webhook ${res.status}`);
}

/** Sends to every configured channel. Returns which ones accepted the request; never throws. */
export async function deliver(l: Lead) {
  const c = channels();
  const tasks: Promise<string>[] = [];
  if (c.email) tasks.push(sendEmail(l).then(() => "email"));
  if (c.webhook) tasks.push(sendWebhook(l).then(() => "webhook"));
  const settled = await Promise.allSettled(tasks);
  const ok = settled.flatMap((s) => (s.status === "fulfilled" ? [s.value] : []));
  const failed = settled.flatMap((s) => (s.status === "rejected" ? [String((s.reason as Error)?.message ?? s.reason)] : []));
  // Server log only: channel names and status codes, never the visitor's details.
  if (failed.length) console.error("contact delivery failed:", failed.join(", "), "request", l.id);
  return { ok, failed };
}
