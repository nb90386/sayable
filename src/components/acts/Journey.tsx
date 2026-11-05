"use client";

import { useEffect, useRef, useState } from "react";
import { SplitAct } from "../split/SplitAct";
import { PVB, PermitPage, regions } from "../doc/permit";

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

const names: Record<string, string> = {
  title: "H1",
  name: 'Field "Applicant name"',
  phone: 'Field "Daytime phone"',
  address: 'Field "Site address"',
  work: 'Group "Type of work"',
  signature: 'Field "Applicant signature"',
  date: 'Field "Date"',
};
const fieldIds = ["name", "phone", "address", "work", "signature"];

/** The hidden layer for each stage, drawn over the unchanged visible page. */
function StageLayer({ stage }: { stage: string }) {
  if (stage === "discover")
    return (
      <g>
        {fieldIds.map((id) => {
          const r = regions[id]!;
          return <rect key={id} x={r.x - 6} y={r.y - 6} width={r.w + 12} height={r.h + 12} rx="6" fill="rgb(228 70 43 / 0.08)" stroke="#e4462b" strokeWidth="4" strokeDasharray="12 8" />;
        })}
        <g transform="translate(64 1000)">
          <rect width="230" height="34" rx="17" fill="#e4462b" />
          <text x="16" y="23" fontFamily="var(--font-mono)" fontSize="15" fill="#fff">read first: footer</text>
        </g>
      </g>
    );
  if (stage === "repair" || stage === "verify" || stage === "publish" || stage === "monitor")
    return (
      <g>
        {Object.entries(names).map(([id, l]) => {
          const r = regions[id]!;
          const w = l.length * 9.4 + 26;
          return (
            <g key={id}>
              <rect x={r.x - 6} y={r.y - 6} width={r.w + 12} height={r.h + 12} rx="6" fill="rgb(18 19 20 / 0.03)" stroke="#121314" strokeWidth="2" />
              <g transform={`translate(${r.x + r.w - w + 6} ${r.y - 20})`} className="tagchip">
                <rect width={w} height="28" rx="14" />
                <text x="12" y="19.5">{l}</text>
              </g>
            </g>
          );
        })}
        {stage !== "repair" ? (
          <g transform="translate(560 960)">
            <rect width="226" height="40" rx="20" fill="#121314" />
            <text x="22" y="26" fontFamily="var(--font-sans)" fontWeight="700" fontSize="17" fill="#fff">
              {stage === "verify" ? "3 checks passed" : stage === "publish" ? "Version 2 · report" : "Watching new uploads"}
            </text>
          </g>
        ) : null}
      </g>
    );
  return null;
}

export function Journey() {
  const [active, setActive] = useState("discover");
  const listRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const items = Array.from(listRef.current?.querySelectorAll<HTMLElement>("li[id]") ?? []);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -50% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  const current = stages.find((s) => s.id === active)!;

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
              <svg viewBox={PVB} className="doc-sheet" role="img" aria-label={`The same permit application, visually unchanged. Hidden layer shown for the ${current.name} stage.`}>
                <PermitPage />
                <StageLayer stage={active} />
              </svg>
              <figcaption className="mt-3 text-[0.85rem] text-muted lg:text-right" aria-live="polite">
                {current.name}. Visible content: identical at every stage.
              </figcaption>
            </figure>
          </div>
        </div>
      }
      right={
        <ol ref={listRef} className="space-y-16 lg:space-y-24" aria-label="Stages">
          {stages.map((s) => (
            <li key={s.id} id={s.id} className="scroll-mt-28">
              <h3 className="title text-[length:var(--step-2)] text-moon">
                {s.name}: {s.title.charAt(0).toLowerCase() + s.title.slice(1)}
              </h3>
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
