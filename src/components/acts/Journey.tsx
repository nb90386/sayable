import { SplitAct } from "../split/SplitAct";
import { PVB, PermitPage } from "../doc/permit";

type Line = { t: string; mark?: "bad" | "fixed" | "person" | "check" };

const stages: { id: string; name: string; title: string; body: string; lines: Line[] }[] = [
  {
    id: "discover",
    name: "Discover",
    title: "Find it, and find out what it is.",
    body: "The crawler reads only publicly linked files, respects robots.txt and keeps to one request per second. This file is linked from “Apply for a permit”, so it is a service document.",
    lines: [
      { t: "Found on /permits, linked as “Apply for a permit”" },
      { t: "No tags", mark: "bad" },
      { t: "5 fields with no accessible name", mark: "bad" },
      { t: "Reading order starts at the footer", mark: "bad" },
      { t: "Recommendation: must fix (your team confirms)" },
    ],
  },
  {
    id: "repair",
    name: "Repair",
    title: "Fix what is safe to fix. Hand the rest to a person.",
    body: "Automatic fixes change tags, reading order and field names. They never change what the page says or how it looks. Tables, lists and scans go to a person.",
    lines: [
      { t: 'H1 "Residential Permit Application"', mark: "fixed" },
      { t: 'Field names drafted from printed labels: "Applicant name", "Daytime phone" …', mark: "fixed" },
      { t: "Footer marked as artifact, so it is skipped", mark: "fixed" },
      { t: 'Check boxes grouped as "Type of work"', mark: "person" },
    ],
  },
  {
    id: "verify",
    name: "Verify",
    title: "Checked three ways before it leaves.",
    body: "Every file is re-checked after the last change: the veraPDF validator against PDF/UA-1, a semantic review of the page against its tags, and a person where the work was hard.",
    lines: [
      { t: "veraPDF 1.28, PDF/UA-1 profile: passed", mark: "check" },
      { t: "Semantic check: no major findings", mark: "check" },
      { t: "Reviewer: field names confirmed", mark: "check" },
    ],
  },
  {
    id: "publish",
    name: "Publish",
    title: "Delivered with its record.",
    body: "The repaired file goes back with a plain report of what was checked and changed. A self-serve check before posting is in development.",
    lines: [
      { t: "permit-application.pdf, version 2" },
      { t: "Original kept, unchanged" },
      { t: "Report: what was checked, what changed, who changed it" },
    ],
  },
  {
    id: "monitor",
    name: "Monitor",
    title: "Keep the next upload from undoing it.",
    body: "New uploads are noticed and checked. Recurring problems, like one template that always drops its field names, are traced to their source.",
    lines: [
      { t: "Agenda packet, Dec 8: checked", mark: "check" },
      { t: "Fee schedule v2: needs attention", mark: "bad" },
      { t: "Template BD-12: field names now kept", mark: "fixed" },
    ],
  },
];

const markClass: Record<string, string> = {
  bad: "text-[color:var(--color-signal-night)]",
  fixed: "text-moon",
  person: "text-moon",
  check: "text-moon",
};
const markWord: Record<string, string> = { bad: "Issue", fixed: "Automatic", person: "Person", check: "Passed" };

export function Journey() {
  return (
    <SplitAct
      act="journey"
      labelledBy="journey-title"
      head={
        <h2 id="journey-title" className="split-head headline">
          <span className="pb-8">The page never changes.</span>
          <span className="pb-8">Everything underneath does.</span>
        </h2>
      }
      left={
        <div className="h-full">
          <div className="lg:sticky lg:top-[18vh]">
            <p className="max-w-[38ch] text-ink-soft lg:ml-auto lg:text-right">
              Sayable fixes tags, order and names. It never invents text or alters what residents see.
            </p>
            <figure className="mt-8 lg:ml-auto lg:max-w-[26rem]">
              <svg viewBox={PVB} className="doc-sheet" role="img" aria-label="The same permit application, visually unchanged through every stage">
                <PermitPage />
              </svg>
              <figcaption className="mt-3 text-[0.85rem] text-muted lg:text-right">Visible content: identical at every stage.</figcaption>
            </figure>
          </div>
        </div>
      }
      right={
        <ol className="space-y-16 lg:space-y-24" aria-label="Stages">
          {stages.map((s, i) => (
            <li key={s.id} id={s.id} className="scroll-mt-28">
              <p className="font-[700] text-[color:var(--color-signal-night)]">
                {i + 1}. {s.name}
              </p>
              <h3 className="title mt-2 text-[length:var(--step-2)] text-moon">{s.title}</h3>
              <p className="mt-3 max-w-[48ch] text-moon-muted">{s.body}</p>
              <ul className="mono mt-6 border-t text-[0.9rem]" style={{ borderColor: "var(--rule-night)" }}>
                {s.lines.map((l) => (
                  <li key={l.t} className="flex items-baseline gap-3 border-b py-2.5" style={{ borderColor: "var(--rule-night)" }}>
                    {l.mark ? <span className={`w-[5.5rem] shrink-0 text-[0.78rem] ${markClass[l.mark]}`}>{markWord[l.mark]}</span> : <span className="w-[5.5rem] shrink-0" />}
                    <span className={l.mark === "bad" ? "text-[color:var(--color-signal-night)]" : "text-moon"}>{l.t}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      }
    />
  );
}
