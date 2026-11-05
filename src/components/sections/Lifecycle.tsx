"use client";

import { useEffect, useRef, useState } from "react";
import { stages } from "@/content/site";
import { NoticePage, VB, blocks, thCells, fields } from "../doc/notice";

const detail: Record<string, { title: string; body: string; points: string[] }> = {
  discover: {
    title: "Find it, and find out what it is.",
    body: "The crawler reads only publicly linked files, respects robots.txt and keeps to one request per second. Each PDF is checked for tags, forms, scans and tables, then placed in a pile with its reasons.",
    points: ["Found on /planning/hearings", "Linked as “Comment on fee changes”", "No tags · 2 unnamed fields · table"],
  },
  repair: {
    title: "Fix what is safe to fix. Hand the rest to a person.",
    body: "Automatic fixes change tags, reading order, alt text and field names. They never change what the page says or how it looks. Tables, lists and scanned pages go to a person.",
    points: ["Auto · headings, metadata, language", "Auto · field names from printed labels", "Person · table header cells"],
  },
  verify: {
    title: "Checked three ways before it leaves.",
    body: "Every file is re-checked after the last change: the veraPDF validator for PDF/UA-1, Sayable’s semantic review of the page against its tags, and a person where the work was hard.",
    points: ["veraPDF · PDF/UA-1 profile", "Semantic check · no major findings", "Person · table reviewed"],
  },
  publish: {
    title: "A check before the upload button.",
    body: "Nothing goes live unchecked. Agenda packets can come back remediated in time for their posting deadline, and a self-serve check-before-post page for staff is in development.",
    points: ["Ready to post", "Report attached", "Nothing claims “compliant”"],
  },
  monitor: {
    title: "Keep the inventory from growing back.",
    body: "New uploads are noticed and checked. Recurring problems, like one template that always drops its labels, are traced to their source so they stop repeating.",
    points: ["Agenda packet · Dec 8 · checked", "Fee schedule v2 · needs attention", "Template issue · traced"],
  },
};

export function Lifecycle() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-62% 0px -30% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const stage = stages[active]!.id;

  return (
    <section aria-labelledby="lc-title" className="relative bg-paper-deep">
      <div className="wrap pt-28 sm:pt-36">
        <h2 id="lc-title" className="headline mt-6 max-w-[18ch]">
          One document, <em>start to finish.</em>
        </h2>
        <p className="lede mt-6 !max-w-[48ch]">
          Five stages, one system. Follow the same hearing notice from the day it is found to the day it is posted, and
          every upload after that.
        </p>
      </div>

      <div className="wrap grid-12 pb-28 pt-16 sm:pb-36">
        {/* Sticky artifact */}
        <div className="max-md:contents md:col-span-6 lg:col-span-7">
          <div className="sticky top-[var(--header-h)] z-10 col-span-12 self-start bg-paper-deep pb-4 pt-3 max-md:-mx-[var(--gutter)] max-md:px-[var(--gutter)] md:top-[calc(var(--header-h)+3rem)] md:bg-transparent md:pb-6 md:pt-0">
            <ol className="mb-5 grid grid-cols-5 gap-1.5" aria-hidden="true">
              {stages.map((s, i) => (
                <li key={s.id}>
                  <span className={`block h-[2px] transition-colors duration-500 ${i <= active ? "bg-signal" : "bg-ink/15"}`} />
                  <span className={`tag mt-2 block transition-colors ${i === active ? "!text-ink" : "!text-muted"}`}>
                    <span className="hidden sm:inline">{s.n} </span>
                    {s.name}
                  </span>
                </li>
              ))}
            </ol>
            <StageArtifact stage={stage} />
          </div>
        </div>

        {/* Stage copy */}
        <div className="col-span-12 md:col-span-6 md:pl-8 lg:col-span-5 lg:pl-14">
          {stages.map((s, i) => {
            const d = detail[s.id]!;
            return (
              <article
                key={s.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-i={i}
                className="flex min-h-[60vh] flex-col justify-center py-12 md:min-h-[85vh]"
              >
                <h3 className="font-serif text-[length:var(--step-3)] font-[420] leading-[1.06] tracking-[-0.018em]">
                  <span className="sr-only">{s.name}: </span>
                  {d.title}
                </h3>
                <p className="mt-5 max-w-[42ch] text-ink-soft">{d.body}</p>
                <ul className="mt-7 border-t" style={{ borderColor: "var(--rule)" }}>
                  {d.points.map((p) => (
                    <li key={p} className="mono border-b py-3 text-[0.82rem] text-ink" style={{ borderColor: "var(--rule)" }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StageArtifact({ stage }: { stage: string }) {
  const on = (s: string | string[]) => ((Array.isArray(s) ? s : [s]).includes(stage) ? "lc-layer is-on" : "lc-layer");
  const ordered = blocks.filter((b) => b.order);
  return (
    <div className="relative mx-auto max-w-[30rem] md:max-w-none" aria-hidden="true">
      <div className="relative" style={{ perspective: "1600px" }}>
        <div
          className="relative transition-transform duration-[1200ms] ease-[var(--ease-out-expo)]"
          style={{ transform: stage === "publish" ? "translateY(-2%) rotateX(4deg)" : stage === "monitor" ? "scale(0.82) translateX(-8%)" : "none" }}
        >
          <svg viewBox={VB} className="sheet mx-auto block h-auto max-h-[34vh] w-auto md:max-h-[70vh] md:w-full" preserveAspectRatio="xMidYMin meet">
            <NoticePage />
            {/* DISCOVER: barriers flagged */}
            <g className={on("discover")}>
              <rect width="850" height="1100" fill="rgb(19 54 46 / 0.04)" />
              {[blocks[1]!, blocks[5]!, blocks[7]!].map((b, i) => (
                <g key={b.id}>
                  <rect x={b.x - 8} y={b.y - 8} width={b.w + 16} height={b.h + 16} fill="rgb(162 74 28 / 0.06)" stroke="#a24a1c" strokeWidth="2" strokeDasharray="7 6" />
                  <g transform={`translate(${b.x + b.w - 190} ${b.y - 34})`}>
                    <rect width="198" height="28" rx="14" fill="#a24a1c" />
                    <text x="10" y="18" fontFamily="var(--font-sans)" fontWeight="600" fontSize="14" fill="#fff">
                      {["no heading tag", "no table headers", "2 fields unnamed"][i]}
                    </text>
                  </g>
                </g>
              ))}
              <g transform="translate(470 30)">
                <rect width="316" height="34" rx="17" fill="#a24a1c" />
                <text x="14" y="23" fontFamily="var(--font-sans)" fontWeight="600" fontSize="15" fill="#fff">
                  Must fix: form on a service page
                </text>
              </g>
            </g>
            {/* REPAIR + VERIFY: structure in place */}
            <g className={on(["repair", "verify", "publish", "monitor"])}>
              {blocks.map((b) => (
                <rect key={b.id} x={b.x - 8} y={b.y - 8} width={b.w + 16} height={b.h + 16} rx="3" fill="none" stroke={b.order ? "#1d5347" : "#87998e"} strokeWidth="1.6" strokeDasharray={b.order ? undefined : "3 4"} />
              ))}
              {thCells.map((c, i) => (
                <rect key={i} x={c.x + 4} y={c.y + 4} width={c.w - 8} height={c.h - 8} fill="rgb(29 83 71 / 0.1)" />
              ))}
              {fields.map((f, i) => (
                <text key={i} x={f.x + 8} y={f.y + 24} fontFamily="var(--font-mono)" fontSize="14" fill="#1d5347">
                  {f.name}
                </text>
              ))}
              {ordered.map((b) => (
                <g key={b.id} transform={`translate(${b.x - 26} ${b.y + 20})`}>
                  <circle r="14" fill="#1d5347" />
                  <text textAnchor="middle" y="5" fontFamily="var(--font-sans)" fontWeight="600" fontSize="14" fill="#fff">
                    {b.order}
                  </text>
                </g>
              ))}
            </g>
            <g className={on("repair")}>
              <g transform="translate(560 640)">
                <rect width="226" height="34" rx="17" fill="#1d5347" />
                <text x="14" y="23" fontFamily="var(--font-sans)" fontWeight="600" fontSize="14.5" fill="#fff">
                  Person: table headers
                </text>
              </g>
            </g>
            {/* VERIFY: three checks */}
            <g className={on("verify")}>
              <rect x="200" y="380" width="450" height="236" rx="18" fill="#13362e" />
              {["veraPDF  PDF/UA-1", "Semantic review", "Human review"].map((t, i) => (
                <g key={t} transform={`translate(230 ${430 + i * 62})`}>
                  <circle r="14" cx="10" cy="-6" fill="none" stroke="#9fd3bf" strokeWidth="2" />
                  <path d="M3 -6 l5 5 l9 -10" stroke="#9fd3bf" strokeWidth="2.4" fill="none" />
                  <text x="44" fontFamily="var(--font-sans)" fontWeight="600" fontSize="19" fill="#fff">
                    {t}
                  </text>
                  <text x="390" textAnchor="end" fontFamily="var(--font-mono)" fontSize="15" fill="#bcd0c6">
                    passed
                  </text>
                </g>
              ))}
            </g>
            {/* PUBLISH: ready stamp */}
            <g className={on("publish")}>
              <g transform="translate(520 30)">
                <rect width="266" height="38" rx="19" fill="#1d5347" />
                <text x="16" y="26" fontFamily="var(--font-sans)" fontWeight="600" fontSize="16" fill="#fff">
                  Ready to post · report attached
                </text>
              </g>
            </g>
          </svg>

          {/* MONITOR: stream of new documents */}
          <div className={`${on("monitor")} absolute -right-3 top-[8%] hidden w-[46%] space-y-3 md:block`}>
            {[
              ["Agenda packet · Dec 8", "checked", "#9fd3bf"],
              ["Fee schedule · v2", "needs attention", "#f0ae71"],
              ["Minutes · Nov 17", "checked", "#9fd3bf"],
              ["Bid notice · Water main", "checked", "#9fd3bf"],
            ].map(([n, s, c]) => (
              <div key={n} className="border bg-sheet px-4 py-3" style={{ borderColor: "var(--rule)" }}>
                <p className="text-[0.85rem] text-ink">{n}</p>
                <p className="mono mt-1 text-[0.72rem]" style={{ color: c }}>
                  {s}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
