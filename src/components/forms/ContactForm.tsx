"use client";

import { useId, useRef, useState } from "react";
import { INTERESTS, LIMITS, ROLES, validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "not_configured" }
  | { kind: "error"; message: string };

const FIELD_ORDER: (keyof ContactPayload)[] = ["name", "email", "organization", "role", "interest", "website", "message"];
const LABELS: Record<keyof ContactPayload, string> = {
  name: "Name",
  email: "Work email",
  organization: "Organization",
  role: "Your role",
  interest: "What you'd like to discuss",
  website: "Public website",
  message: "Anything we should know",
};

const inputCls =
  "mt-2 block w-full rounded-[10px] border bg-sheet px-3.5 py-3 text-[1rem] text-ink transition-[border-color,box-shadow] duration-300 placeholder:text-muted/70 hairline focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/25 aria-[invalid=true]:border-ember";

function composeMessage(p: ContactPayload) {
  const interest = INTERESTS.find((i) => i.value === p.interest)?.label ?? p.interest;
  const role = ROLES.find((r) => r.value === p.role)?.label ?? p.role;
  return [
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    `Organization: ${p.organization}`,
    `Role: ${role}`,
    `Interested in: ${interest}`,
    p.website ? `Website: ${p.website}` : null,
    "",
    p.message,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export function ContactForm({ contactEmail, defaultInterest }: { contactEmail: string | null; defaultInterest?: string }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [last, setLast] = useState<ContactPayload | null>(null);
  const [copied, setCopied] = useState(false);

  const id = (f: string) => `${uid}-${f}`;
  const err = (f: keyof ContactPayload) =>
    errors[f] ? { "aria-invalid": true as const, "aria-describedby": id(`${f}-err`) } : {};

  function read(): Record<string, unknown> {
    const fd = new FormData(formRef.current!);
    return Object.fromEntries(fd.entries());
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const raw = read();
    const { payload, errors: found } = validateContact(raw);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus({ kind: "idle" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setLast(payload);
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, company_fax: raw.company_fax ?? "" }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; message?: string; errors?: ContactErrors };
      if (res.ok && data.ok) {
        setStatus({ kind: "sent" });
        formRef.current?.reset();
      } else if (data.code === "not_configured") {
        setStatus({ kind: "not_configured" });
      } else if (data.code === "invalid" && data.errors) {
        setErrors(data.errors);
        setStatus({ kind: "idle" });
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      } else {
        setStatus({ kind: "error", message: data.message ?? "Something went wrong. Nothing was sent; please try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Nothing was sent; check your connection and try again." });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  async function copy() {
    if (!last) return;
    try {
      await navigator.clipboard.writeText(composeMessage(last));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const errorList = FIELD_ORDER.filter((f) => errors[f]);

  if (status.kind === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="sheet p-8 sm:p-10">
        <p className="tag">Request received</p>
        <h2 className="mt-4 font-serif text-[length:var(--step-2)] leading-tight">Thank you. Your request reached us.</h2>
        <p className="mt-4 text-ink-soft">We read every request ourselves and reply from a person, usually within two business days.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="sheet relative p-6 sm:p-10" aria-describedby={id("intro")}>
      <p id={id("intro")} className="tag !text-muted">
        All fields are required unless marked optional.
      </p>

      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 border border-ember/50 bg-ember-wash/60 px-4 py-3 text-[0.95rem] text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
        >
          <p className="font-[600]">
            {errorList.length === 1 ? "One thing needs attention" : `${errorList.length} things need attention`}:
          </p>
          <ul className="mt-1.5 list-disc pl-5">
            {errorList.map((f) => (
              <li key={f}>
                <a className="text-link" href={`#${id(f)}`}>
                  {LABELS[f]}: {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <Field label={LABELS.name} htmlFor={id("name")} error={errors.name} errId={id("name-err")}>
          <input id={id("name")} name="name" autoComplete="name" maxLength={LIMITS.name} className={inputCls} {...err("name")} />
        </Field>
        <Field label={LABELS.email} htmlFor={id("email")} error={errors.email} errId={id("email-err")}>
          <input id={id("email")} name="email" type="email" autoComplete="email" inputMode="email" maxLength={LIMITS.email} className={inputCls} {...err("email")} />
        </Field>
        <Field label={LABELS.organization} htmlFor={id("organization")} error={errors.organization} errId={id("organization-err")}>
          <input id={id("organization")} name="organization" autoComplete="organization" maxLength={LIMITS.organization} className={inputCls} {...err("organization")} />
        </Field>
        <Field label={LABELS.role} htmlFor={id("role")} error={errors.role} errId={id("role-err")}>
          <select id={id("role")} name="role" defaultValue="" className={`${inputCls} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23121314' stroke-width='1.5'/%3E%3C/svg%3E\")" }} {...err("role")}>
            <option value="" disabled>
              Choose one
            </option>
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="mt-8" {...(errors.interest ? { "aria-describedby": id("interest-err") } : {})} id={id("interest")}>
        <legend className="text-[0.95rem] font-[560]">{LABELS.interest}</legend>
        {errors.interest && (
          <p id={id("interest-err")} className="mt-1 text-[0.9rem] text-ember">
            {errors.interest}
          </p>
        )}
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {INTERESTS.map((it) => (
            <label
              key={it.value}
              className="group flex min-h-12 cursor-pointer items-center gap-3 rounded-[10px] border px-3.5 py-2.5 text-[0.95rem] transition-colors hairline hover:border-ink/40 has-[:checked]:border-signal has-[:checked]:bg-signal-wash/50"
            >
              <input type="radio" name="interest" value={it.value} defaultChecked={it.value === defaultInterest} className="h-4 w-4 accent-[var(--color-signal)]" />
              {it.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-6">
        <Field label={LABELS.website} optional htmlFor={id("website")} error={errors.website} errId={id("website-err")} hint="Where your documents are published, e.g. www.city.gov">
          <input id={id("website")} name="website" inputMode="url" autoComplete="url" maxLength={LIMITS.website} className={inputCls} {...err("website")} aria-describedby={errors.website ? id("website-err") : id("website-hint")} />
        </Field>
        <Field label={LABELS.message} optional htmlFor={id("message")} error={errors.message} errId={id("message-err")} hint="Deadlines, document volume, the kinds of files you publish.">
          <textarea id={id("message")} name="message" rows={5} maxLength={LIMITS.message} className={`${inputCls} resize-y`} {...err("message")} aria-describedby={errors.message ? id("message-err") : id("message-hint")} />
        </Field>
      </div>

      {/* Honeypot — hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("company_fax")}>Leave this empty</label>
        <input id={id("company_fax")} name="company_fax" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6 hairline">
        <p className="max-w-[36ch] text-[0.85rem] text-muted">
          Please don&apos;t include personal, health, student or law-enforcement information. See our{" "}
          <a href="/privacy" className="text-link">
            privacy notice
          </a>
          .
        </p>
        <button type="submit" className="btn disabled:opacity-70" disabled={status.kind === "sending"} aria-disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Send request"} <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="focus:outline-none">
        {status.kind === "not_configured" && last && (
          <div className="mt-6 border border-signal/50 bg-signal-wash/50 px-4 py-4 text-[0.95rem]">
            <p className="font-[600]">Online requests aren&apos;t connected yet, so nothing was sent.</p>
            <p className="mt-1.5 text-ink-soft">
              Your details are still in the form.{" "}
              {contactEmail ? "You can email them to us directly, or copy them for later." : "You can copy them to send once our inbox is live."}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {contactEmail && (
                <a
                  className="link-quiet"
                  href={`mailto:${contactEmail}?subject=${encodeURIComponent(`Sayable request from ${last.organization}`)}&body=${encodeURIComponent(composeMessage(last))}`}
                >
                  Email {contactEmail} <span aria-hidden="true" data-icon="arrow-r"></span>
                </a>
              )}
              <button type="button" onClick={copy} className="link-quiet">
                {copied ? "Copied to clipboard" : "Copy your message"}
              </button>
            </div>
          </div>
        )}
        {status.kind === "error" && (
          <p role="alert" className="mt-6 border border-ember/50 bg-ember-wash/60 px-4 py-3 text-[0.95rem]">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  errId,
  hint,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errId: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-[0.95rem] font-[560]">
        {label}
        {optional ? <span className="ml-2 font-normal text-muted">(optional)</span> : null}
      </label>
      {hint && !error ? (
        <p id={`${htmlFor}-hint`} className="mt-0.5 text-[0.85rem] text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={errId} className="mt-1.5 text-[0.9rem] text-ember">
          {error}
        </p>
      ) : null}
    </div>
  );
}
