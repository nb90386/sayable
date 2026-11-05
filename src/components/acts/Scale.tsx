import Link from "next/link";
import { SplitAct } from "../split/SplitAct";

// Illustrative inventory for a fictional city. Not real data.
const files: { t: string; m: string; g: number }[] = [
  { t: "Building permit application", m: "/permits · 2024", g: 0 },
  { t: "Council agenda packet", m: "/council · Nov 18", g: 1 },
  { t: "Fee schedule", m: "/finance · 2025", g: 2 },
  { t: "Council minutes", m: "/council · 2014", g: 3 },
  { t: "Copy of fee schedule", m: "/finance · duplicate", g: 4 },
  { t: "Business license renewal", m: "/finance · 2025", g: 0 },
  { t: "Planning notice", m: "/planning · Nov 12", g: 1 },
  { t: "Water quality report", m: "/utilities · 2025", g: 2 },
  { t: "Annual report", m: "/admin · 2016", g: 3 },
  { t: "Consultant study", m: "third-party host", g: 4 },
  { t: "Fee waiver request", m: "/clerk · 2023", g: 0 },
  { t: "Budget hearing notice", m: "/finance · Nov 20", g: 1 },
  { t: "Zoning map legend", m: "/planning · 2024", g: 2 },
  { t: "Closed bid results", m: "/purchasing · 2015", g: 3 },
  { t: "Draft ordinance", m: "/clerk · 2021", g: 4 },
  { t: "Utility assistance form", m: "/utilities · 2025", g: 0 },
  { t: "Parks commission agenda", m: "/parks · Dec 2", g: 1 },
  { t: "Transit route guide", m: "/transit · 2025", g: 2 },
  { t: "Commission minutes", m: "/planning · 2012", g: 3 },
  { t: "Scanned deed record", m: "/records · 1998", g: 4 },
  { t: "Special event permit", m: "/events · 2024", g: 0 },
  { t: "Emergency prep guide", m: "/fire · 2024", g: 2 },
  { t: "Budget, FY2013", m: "/finance · 2013", g: 3 },
  { t: "Records request form", m: "/clerk · 2022", g: 0 },
];

const groups = [
  { name: "Active service documents", why: "Forms and pages residents use to get something done. These come first." },
  { name: "New, check before posting", why: "Agendas and notices still being published. Checking them before upload stops the pile growing." },
  { name: "Needs accessibility repair", why: "Current documents with missing tags, unnamed fields or broken reading order." },
  { name: "Possible historical exception", why: "Older records kept for reference. Sayable flags them; your team decides whether an exception applies." },
  { name: "Needs a policy decision", why: "Duplicates, third-party files and anything that needs a person with authority to decide." },
];

function rot(i: number) {
  const x = Math.sin(i * 12.9898 + 4.1) * 43758.5453;
  return Math.round(((x - Math.floor(x)) - 0.5) * 60) / 10; // -3°..3°, rounded so server and client agree
}

export function Scale() {
  return (
    <SplitAct
      act="scale"
      labelledBy="scale-title"
      head={
        <h2 id="scale-title" className="split-head headline">
          <span className="pb-8">One file is a problem.</span>
          <span className="pb-8">Thousands are a workload.</span>
        </h2>
      }
      left={
        <div>
          <p className="max-w-[40ch] text-ink-soft lg:ml-auto lg:text-right">
            A city site can hold years of agendas, forms, reports and notices. Every one of them looks finished.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-3" aria-label="Sample of public files, as listed on the site">
            {files.map((f, i) => (
              <li
                key={f.t}
                className="rounded-[4px] bg-sheet px-3 py-2.5 shadow-[0_1px_1px_rgb(0_0_0/0.05),0_10px_22px_-14px_rgb(0_0_0/0.4)]"
                style={{ transform: `rotate(${rot(i)}deg)` }}
              >
                <span className="block truncate text-[0.88rem] font-[700] leading-tight">{f.t}</span>
                <span className="mono block truncate text-[0.75rem] text-muted">{f.m}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.85rem] text-muted lg:text-right">Illustrative collection for a fictional city. Not real data.</p>
        </div>
      }
      right={
        <div>
          <p className="max-w-[40ch] text-moon-muted">
            Sayable reads every publicly linked file and sorts it by what it is and how residents use it. The value is
            knowing what needs attention, and why, before anyone pays to remediate it.
          </p>
          <ol className="mt-10 space-y-5">
            {groups.map((g, gi) => {
              const mine = files.filter((f) => f.g === gi);
              return (
                <li key={g.name} className="border-t pt-4" style={{ borderColor: "var(--rule-night)" }}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="title text-[1.35rem] text-moon">{g.name}</h3>
                    <span className="mono shrink-0 text-[0.85rem] text-moon-muted">{mine.length} of {files.length}</span>
                  </div>
                  <p className="mt-1.5 max-w-[46ch] text-[0.95rem] text-moon-muted">{g.why}</p>
                  <p className="mono mt-2 truncate text-[0.78rem] text-moon-muted/80">{mine.map((m) => m.t).join(" · ")}</p>
                </li>
              );
            })}
          </ol>
          <p className="mt-8 font-[700]">
            Stop guessing which documents need attention.{" "}
            <Link href="#value-title" className="text-link">
              Estimate what sorting first could save
            </Link>
            .
          </p>
        </div>
      }
    />
  );
}
