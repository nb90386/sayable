export const site = {
  name: "Sayable",
  description:
    "Sayable helps cities and counties find accessibility problems in their public PDFs, prioritize what matters, and get documents repaired and verified.",
  /** Public business inbox. Unset until the domain and mailbox exist — see README. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null,
};

export type NavLink = { href: string; label: string; note?: string };
export type NavGroup = { label: string; href?: string; items?: NavLink[] };

/** Primary navigation. Groups open a small popover; plain entries are links. */
export const nav: NavGroup[] = [
  {
    label: "Product",
    items: [
      { href: "/product", label: "Product overview", note: "Discover, repair, verify, publish, monitor" },
      { href: "/readiness-audit", label: "Readiness Audit", note: "The starting point: what you have and what it needs" },
      { href: "/verify", label: "Verification", note: "How every file is checked, and what that proves" },
    ],
  },
  { label: "How it works", href: "/how-it-works" },
  {
    label: "Solutions",
    items: [
      { href: "/solutions/government", label: "Cities and counties", note: "Clerks, ADA coordinators, IT and web teams" },
      { href: "/solutions/agencies", label: "Agencies and firms", note: "Website agencies and remediation partners" },
      { href: "/solutions", label: "All solutions" },
    ],
  },
  { label: "Resources", href: "/resources" },
  {
    label: "Company",
    items: [
      { href: "/about", label: "About Sayable" },
      { href: "/security", label: "Security and data" },
      { href: "/accessibility", label: "Accessibility" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

/** Flat list of every primary destination, for the mobile menu and footer. */
export const navLinks: NavLink[] = nav.flatMap((g) => (g.items ? g.items : [{ href: g.href!, label: g.label }]));

export const cta = { href: "/contact?topic=audit", label: "Request an Audit", long: "Request a Readiness Audit" } as const;

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
    line: "Draft routine structural fixes with software, checked by a person. Tables, forms and scans are done by hand.",
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
