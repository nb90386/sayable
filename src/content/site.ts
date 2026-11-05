export const site = {
  name: "Sayable",
  description:
    "Sayable helps public agencies find, repair, verify and publish accessible documents: with automated structure checks, semantic review and people for the hard parts.",
  /** Public business inbox. Unset until the domain and mailbox exist — see README. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null,
};

export const nav = [
  { href: "/product", label: "Product" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/solutions", label: "Solutions" },
  { href: "/approach", label: "Our approach" },
] as const;

export const cta = { href: "/contact?topic=audit", label: "Request a Readiness Audit" } as const;

export const stages = [
  {
    id: "discover",
    n: "01",
    name: "Discover",
    line: "Inventory every public document and sort what must be fixed from what can be archived.",
  },
  {
    id: "repair",
    n: "02",
    name: "Repair",
    line: "Apply safe structural fixes automatically. Route tables, forms and scans to a person.",
  },
  {
    id: "verify",
    n: "03",
    name: "Verify",
    line: "Check every file with the PDF/UA validator, a semantic review and human judgment.",
  },
  {
    id: "publish",
    n: "04",
    name: "Publish",
    line: "Check a document before it goes live, with plain-language fixes for staff.",
  },
  {
    id: "monitor",
    n: "05",
    name: "Monitor",
    line: "Notice new uploads and recurring problems before they pile up again.",
  },
] as const;

export type StageId = (typeof stages)[number]["id"];
