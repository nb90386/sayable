export const INTERESTS = [
  { value: "audit", label: "A readiness audit" },
  { value: "pilot", label: "A pilot on a sample of documents" },
  { value: "agenda", label: "Agenda and meeting-packet turnaround" },
  { value: "partner", label: "Partnership or white-label work" },
] as const;

export const ROLES = [
  { value: "ada", label: "ADA coordinator" },
  { value: "clerk", label: "Clerk or records" },
  { value: "web", label: "Web or communications" },
  { value: "it", label: "IT" },
  { value: "agency", label: "Website agency" },
  { value: "remediation", label: "Accessibility or remediation firm" },
  { value: "other", label: "Something else" },
] as const;

export type ContactPayload = {
  name: string;
  email: string;
  organization: string;
  role: string;
  interest: string;
  website: string;
  message: string;
};
export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

export const LIMITS = { name: 120, email: 200, organization: 160, website: 300, message: 4000 };

export function str(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export function validateContact(body: Record<string, unknown>) {
  const p: ContactPayload = {
    name: str(body.name),
    email: str(body.email),
    organization: str(body.organization),
    role: str(body.role),
    interest: str(body.interest),
    website: str(body.website),
    message: str(body.message),
  };
  const errors: ContactErrors = {};
  if (!p.name) errors.name = "Enter your name.";
  else if (p.name.length > LIMITS.name) errors.name = "Name is too long.";
  if (!p.email) errors.email = "Enter your work email.";
  else if (p.email.length > LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email))
    errors.email = "Enter an email address like name@city.gov.";
  if (!p.organization) errors.organization = "Enter your organization.";
  else if (p.organization.length > LIMITS.organization) errors.organization = "Organization name is too long.";
  if (!ROLES.some((r) => r.value === p.role)) errors.role = "Choose the role closest to yours.";
  if (!INTERESTS.some((r) => r.value === p.interest)) errors.interest = "Choose what you'd like to discuss.";
  if (p.website) {
    try {
      const u = new URL(/^https?:\/\//i.test(p.website) ? p.website : `https://${p.website}`);
      if (!u.hostname.includes(".") || p.website.length > LIMITS.website) throw new Error("bad");
    } catch {
      errors.website = "Enter a web address like www.city.gov, or leave it blank.";
    }
  }
  if (p.message.length > LIMITS.message) errors.message = `Keep the message under ${LIMITS.message} characters.`;
  return { payload: p, errors };
}

