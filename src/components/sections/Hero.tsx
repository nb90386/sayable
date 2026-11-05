import Link from "next/link";
import { ReadingPath } from "../hero/ReadingPath";
import { Ribbon } from "../Ribbon";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] sm:pt-[calc(var(--header-h)+3.5rem)]">
      <div className="wrap relative">
        <div className="grid-12 items-center gap-y-12">
          <div className="relative z-10 col-span-12 lg:col-span-6 lg:pb-10">
            <h1 id="hero-title" className="display text-[length:clamp(2.5rem,1.3rem+3.4vw,4.75rem)]">
              <span className="block" data-reveal="mask">A document can look right</span>
              <span className="block" data-reveal="mask" style={{ ["--d" as string]: "140ms" }}>
                <em>and still leave someone out.</em>
              </span>
            </h1>
            <p className="lede mt-8 !max-w-[38ch]" data-reveal style={{ ["--d" as string]: "320ms" }}>
              Sayable helps cities and counties find the public documents residents rely on, repair the structure screen
              readers depend on, and show exactly what was checked.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3" data-reveal style={{ ["--d" as string]: "440ms" }}>
              <Link href="/contact?topic=audit" className="btn">
                Request a Readiness Audit <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
              </Link>
              <Link href="#two-readers" className="link-quiet">
                See why it matters <span aria-hidden="true" data-icon="arrow-d"></span>
              </Link>
            </div>
          </div>

          <div className="relative col-span-12 lg:col-span-6">
            <div className="mx-auto max-w-[min(500px,92vw)] lg:mr-0">
              <ReadingPath />
            </div>
          </div>
        </div>
      </div>

      <Ribbon
        className="relative mt-4 h-[90px] sm:h-[150px] lg:-mt-10"
        d="M -60 40 C 240 160, 520 -10, 800 90 S 1250 180, 1500 60"
        viewBox="0 0 1440 180"
      />

      <div className="wrap">
        <dl className="grid grid-cols-2 gap-y-6 pb-6 md:grid-cols-4">
          {[
            ["Find", "Every publicly linked PDF, sorted by how residents use it."],
            ["Fix", "Safe structural repairs, with people for tables, forms and scans."],
            ["Check", "PDF/UA validation, a semantic review and a person."],
            ["Keep up", "New uploads checked before they reach the public."],
          ].map(([k, v]) => (
            <div key={k} className="pr-6">
              <dt className="title text-[1.35rem]">{k}</dt>
              <dd className="mt-1.5 max-w-[26ch] text-[0.95rem] leading-snug text-ink-soft">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
