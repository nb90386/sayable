import Link from "next/link";
import { PVB, PermitPage, regions, structure } from "../doc/permit";

/** Act 0. Both stories are on screen at once, so the format is understood before any scroll. */
export function Title() {
  return (
    <section data-sc-act="title" aria-labelledby="hero-title" className="split relative">
      <h1 id="hero-title" className="split-head is-title display text-[length:clamp(2.5rem,1.4rem+3.6vw,5rem)]">
        <span className="pb-6 lg:pb-10">A document can look right.</span>
        <span className="pb-6 lg:pb-10">
          And still <em>leave someone out.</em>
        </span>
      </h1>
      <div className="split-grid">
        <div className="split-l !pt-0">
          <p className="story-label lg:hidden" aria-hidden="true">
            What you see
          </p>
          <p className="lede !max-w-[34ch] lg:ml-auto lg:text-right">
            Sayable helps cities and counties find the public documents residents rely on, repair the structure assistive
            technology reads, and show exactly what was checked.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end">
            <Link href="#listen-title" className="link-quiet">
              Hear the difference <span aria-hidden="true" data-icon="arrow-d"></span>
            </Link>
            <Link href="/contact?topic=audit" className="btn">
              Request a Readiness Audit <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
            </Link>
          </div>
          <figure className="mt-12 lg:ml-auto lg:max-w-[30rem]">
            <svg viewBox={PVB} className="doc-sheet rotate-[-1.5deg]" role="img" aria-labelledby="hero-doc-cap">
              <PermitPage />
            </svg>
            <figcaption id="hero-doc-cap" className="mt-4 text-[0.9rem] text-muted lg:text-right">
              A residential permit application, as residents see it. Example document, fictional city.
            </figcaption>
          </figure>
        </div>

        <div className="split-r night on-night !pt-0">
          <p className="story-label lg:hidden" aria-hidden="true">
            What a screen reader gets
          </p>
          <p className="lede !max-w-[36ch]">
            The same file, as assistive technology receives it. No headings to jump to, five fields with no names, and the
            footer read first.
          </p>
          <ol className="mono mt-10 border-t text-[0.95rem] leading-[1.9]" style={{ borderColor: "var(--rule-night)" }} aria-label="Structure of the file as posted">
            <li className="border-b py-2.5" style={{ borderColor: "var(--rule-night)" }}>
              <span className="text-[color:var(--color-signal-night)]">1</span>&nbsp;&nbsp;{structure.find((s) => s.id === "footer")!.posted}
            </li>
            {structure
              .filter((s) => s.id !== "footer" && s.id !== "date")
              .map((s, i) => (
                <li key={s.id} className="border-b py-2.5" style={{ borderColor: "var(--rule-night)" }}>
                  <span className="text-[color:var(--color-signal-night)]">{i + 2}</span>&nbsp;&nbsp;
                  <span className={s.posted.includes("no name") || s.posted.startsWith("P \"Residential") ? "text-[color:var(--color-signal-night)]" : ""}>{s.posted}</span>
                </li>
              ))}
          </ol>
          <figure className="mt-12 max-w-[30rem]" aria-hidden="true">
            <svg viewBox={PVB} className="doc-sheet rotate-[1.2deg] opacity-90">
              <PermitPage />
              <rect width="850" height="1100" fill="rgb(17 20 24 / 0.12)" />
              {Object.entries(regions)
                .filter(([id]) => ["name", "phone", "address", "work", "signature"].includes(id))
                .map(([id, r]) => (
                  <g key={id}>
                    <rect x={r.x - 6} y={r.y - 6} width={r.w + 12} height={r.h + 12} rx="6" fill="none" stroke="#e4462b" strokeWidth="4" strokeDasharray="12 8" />
                    <g transform={`translate(${r.x + r.w - 214} ${r.y - 18})`} className="tagchip tagchip-bad">
                      <rect width="220" height="32" rx="16" />
                      <text x="16" y="22">
                        no accessible name
                      </text>
                    </g>
                  </g>
                ))}
            </svg>
          </figure>
        </div>
      </div>
    </section>
  );
}
