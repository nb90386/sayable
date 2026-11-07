export type Resource = {
  slug: string;
  title: string;
  summary: string;
  readingMinutes: number;
  /** ISO date of the last substantive update. */
  updated: string;
};

export const resources: Resource[] = [
  {
    slug: "title-ii-rule-and-your-pdfs",
    title: "The ADA Title II web rule and your PDFs, in plain English",
    summary:
      "Who it covers, the dates, which PDFs are excepted and which are not, how it is enforced, and what to do first.",
    readingMinutes: 8,
    updated: "2026-11-06",
  },
  {
    slug: "inventory-government-pdfs",
    title: "How to inventory your public PDFs",
    summary:
      "Three ways to build the list, what to record for each file, and how to sort it into work you can plan.",
    readingMinutes: 9,
    updated: "2026-11-05",
  },
  {
    slug: "what-a-pdf-audit-tells-you",
    title: "What a PDF accessibility audit can tell you (and what it can't)",
    summary:
      "What an audit report should contain, how to read it, and which questions it leaves open.",
    readingMinutes: 7,
    updated: "2026-11-05",
  },
  {
    slug: "why-automated-checks-miss-problems",
    title: "Why automated PDF checks can't catch everything",
    summary:
      "Which problems a machine can detect, which it can only suggest, and which need a person, plus how to prioritize repairs.",
    readingMinutes: 8,
    updated: "2026-11-05",
  },
];

export const resourceHref = (slug: string) => `/resources/${slug}`;
