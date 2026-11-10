import type { CSSProperties } from "react";
import "@/app/pages-extra.css";

const n = (i: number) => ({ "--n": i }) as CSSProperties;

const counts = [
  { label: "Must fix", value: 212, color: "var(--color-warm)" },
  { label: "Archive candidate", value: 703, color: "var(--color-muted)" },
  { label: "Convert to web page", value: 96, color: "var(--color-signal)" },
  { label: "Take off the website", value: 273, color: "#8f8a7e" },
];
const total = counts.reduce((a, c) => a + c.value, 0);

/** The cover of a sample report, drawn in HTML. Every number is made up and labelled as such. */
export function SampleCover() {
  return (
    <figure className="mx-auto w-full max-w-[30rem]">
      <div className="relative">
        <div aria-hidden="true" className="au-under" />
        <div className="hx-doc relative flex flex-col p-6 sm:p-9" style={{ minHeight: "31rem" }}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.9rem] font-[640] tracking-[-0.02em]">Sayable</p>
            <p className="stamp !text-[0.78rem]">Sample. Fictional city.</p>
          </div>

          <p className="mt-10 text-[0.82rem] font-[600] text-muted">Readiness Audit report</p>
          <p className="mt-2 text-[length:clamp(1.9rem,1.4rem+1.6vw,2.5rem)] font-[650] leading-[1.02] tracking-[-0.04em]">City of Alder Creek</p>
          <p className="mono mt-3 text-[0.78rem] text-muted">www.aldercreek.example</p>
          <p className="mt-1 text-[0.9rem] text-ink-soft">Prepared March 3, 2026</p>

          <div className="mt-9 border-t pt-5 hairline">
            <p className="text-[0.82rem] font-[600] text-muted">What we found</p>
            <p className="numeral mt-2 text-[length:var(--step-3)] leading-none">
              1,284 <span className="text-[1rem] font-[500] tracking-[-0.01em] text-muted">PDFs found</span>
            </p>
            <div aria-hidden="true" className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-surface">
              {counts.map((c) => (
                <span key={c.label} style={{ width: `${(c.value / total) * 100}%`, background: c.color }} />
              ))}
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {counts.map((c) => (
                <div key={c.label}>
                  <dt className="flex items-center gap-2 text-[0.8rem] text-muted">
                    <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full" style={{ background: c.color }} />
                    {c.label}
                  </dt>
                  <dd className="numeral text-[1.4rem] leading-tight">{c.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-auto pt-8 text-[0.78rem] leading-snug text-muted">
            <span className="font-[600] text-ink-soft">Not legal advice.</span> This report describes what was checked. It is not a certification that any file or site is compliant.
          </p>
        </div>
      </div>
      <figcaption className="mt-6 text-[0.9rem] text-muted">Sample. Fictional city. All names and counts are made up to show the layout of a report.</figcaption>
    </figure>
  );
}

const inventory = [
  ["building-permit-application.pdf", "Must fix", "Form fields have no names"],
  ["agenda-packet-0312.pdf", "Must fix", "Tables read out of order"],
  ["utility-assistance-form.pdf", "Must fix", "Scanned image, no text"],
  ["fee-schedule-2019.pdf", "Take off the website", "Replaced by the 2025 schedule"],
  ["pool-hours-flyer.pdf", "Convert to web page", "Two pages, mostly text"],
] as const;

const mustFix = [
  ["building-permit-application.pdf", "Service form, fields have no names"],
  ["utility-assistance-form.pdf", "Service form, scanned image"],
  ["business-license-renewal.pdf", "Service form, untagged"],
  ["agenda-packet-0312.pdf", "Public meeting, tables out of order"],
  ["fee-schedule-2025.pdf", "Current fees, tables"],
] as const;

const tiers = [
  { name: "Simple text pages", share: 18 },
  { name: "Tables", share: 34 },
  { name: "Forms", share: 27 },
  { name: "Scans", share: 21 },
];

function Page({ title, pageNo, children }: { title: string; pageNo: string; children: React.ReactNode }) {
  return (
    <li className="hx-doc flex min-w-0 flex-col p-4 sm:p-5">
      <div className="flex items-baseline justify-between gap-3 border-b pb-3 hairline">
        <h3 className="title text-[1.05rem]">{title}</h3>
        <span className="text-[0.8rem] text-muted">{pageNo}</span>
      </div>
      <div className="mt-3 flex-1">{children}</div>
      <p className="mt-4 border-t pt-2.5 text-[0.8rem] text-muted hairline">Sample. Fictional city.</p>
    </li>
  );
}

/** Three pages from a sample report: inventory, must-fix list, remediation estimate by tier. */
export function ReportPages() {
  return (
    <ol className="grid gap-6 lg:grid-cols-3" aria-label="Three sample report pages">
      <Page title="Inventory" pageNo="Page 3">
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Sample inventory page, scrollable">
          <table className="w-full min-w-[17rem] border-collapse text-left text-[0.8rem]">
            <caption className="sr-only">Five sample inventory rows with a recommendation and reason for each file</caption>
            <thead>
              <tr className="text-muted">
                <th scope="col" className="pb-1.5 pr-2 font-[600]">File</th>
                <th scope="col" className="pb-1.5 font-[600]">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(([f, r, why]) => (
                <tr key={f} className="border-t align-top hairline">
                  <th scope="row" className="py-2 pr-2 text-left font-[400]">
                    <span className="mono block break-all text-[0.78rem] font-[500]">{f}</span>
                    <span className="block text-muted">{why}</span>
                  </th>
                  <td className="py-2 font-[560]">{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[0.78rem] text-muted">Five of 1,284 rows. The full list comes as a spreadsheet.</p>
      </Page>

      <Page title="Must-fix list" pageNo="Page 7">
        <ol className="text-[0.82rem]">
          {mustFix.map(([f, why], i) => (
            <li key={f} className="grid grid-cols-[1.4rem_1fr] border-t py-2 hairline first:border-t-0 first:pt-0">
              <span className="numeral text-[0.95rem] text-signal">{i + 1}</span>
              <span>
                <span className="mono block break-all text-[0.78rem] font-[500]">{f}</span>
                <span className="text-muted">{why}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-2 text-[0.78rem] text-muted">Service forms first, then public meeting files.</p>
      </Page>

      <Page title="Remediation estimate" pageNo="Page 12">
        <ul className="rise-group space-y-3.5" data-reveal>
          {tiers.map((t, i) => (
            <li key={t.name} className="text-[0.82rem]">
              <p className="flex items-baseline justify-between gap-3">
                <span className="font-[560]">{t.name}</span>
                <span className="numeral text-[0.95rem]">{t.share}%</span>
              </p>
              <div aria-hidden="true" className="mt-1.5 h-2 rounded-full bg-surface">
                <div className="au-bar bg-signal" style={{ ...n(i), width: `${t.share * 2}%` }} />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[0.78rem] text-muted">Share of estimated effort by type of page, so you can see where the hours go.</p>
      </Page>
    </ol>
  );
}

const funnel = [
  { t: "Crawled", d: "Your public website, and every PDF linked from it. Document portals you point us to are included.", w: 100, tone: "bg-ink/15" },
  { t: "Inventoried", d: "All PDFs found, each with the page that links to it, sorted into four groups.", w: 100, tone: "bg-ink/35" },
  { t: "Checked", d: "The must-fix files. If there are too many to check one by one, a stated sample, and the report says which.", w: 38, tone: "bg-signal" },
];

/** How the scope narrows from the whole site to the files that get check results. */
export function ScopeFunnel() {
  return (
    <figure>
      <ol className="rise-group border-t hairline" data-reveal>
        {funnel.map((f, i) => (
          <li key={f.t} className="grid items-center gap-x-8 gap-y-2 border-b py-5 hairline md:grid-cols-[11rem_1fr_minmax(0,22rem)]">
            <h3 className="title text-[1.35rem]">{f.t}</h3>
            <p className="max-w-[56ch] text-ink-soft">{f.d}</p>
            <div aria-hidden="true" className="h-3 w-full rounded-full bg-surface md:order-none">
              <div className={`au-bar ${f.tone}`} style={{ ...n(i), width: `${f.w}%` }} />
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-[0.85rem] text-muted">Bars show the idea, not a measured share.</figcaption>
    </figure>
  );
}
