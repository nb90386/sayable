import { NextResponse } from "next/server";
import { str, validateContact } from "@/lib/contact";
import { channels, deliver, makeLead } from "@/lib/deliver";

export const runtime = "nodejs";

/** Best-effort in-memory limiter: 5 requests per 10 minutes per IP, per server instance. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_HITS;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, code: "rate_limited", message: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 12_000) throw new Error("too large");
    body = JSON.parse(raw) as Record<string, unknown>;
    if (!body || typeof body !== "object") throw new Error("bad");
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request", message: "The request could not be read." }, { status: 400 });
  }

  // Honeypot: real people never see or fill this field. Respond the same way as a bad request.
  if (str(body.company_fax)) {
    return NextResponse.json({ ok: false, code: "bad_request", message: "The request could not be read." }, { status: 400 });
  }

  const { payload, errors } = validateContact(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 400 });
  }

  const c = channels();
  if (!c.email && !c.webhook) {
    return NextResponse.json(
      { ok: false, code: "not_configured", message: "Online requests are not connected yet. Nothing was sent." },
      { status: 503 },
    );
  }

  const lead = makeLead(payload);
  const { ok } = await deliver(lead);
  if (!ok.length) {
    return NextResponse.json(
      { ok: false, code: "delivery_failed", message: "We couldn't deliver your request. Nothing was sent; please try again." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, id: lead.id });
}
