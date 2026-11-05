import Link from "next/link";
import { LivingDocument } from "../hero/LivingDocument";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] sm:pt-[calc(var(--header-h)+4rem)]">
      <div className="wrap relative">
        <div className="grid-12 items-center gap-y-14">
          <div className="relative z-10 col-span-12 lg:col-span-7 lg:pb-16">
            <h1 id="hero-title" className="display mt-2 text-[length:clamp(2.3rem,1rem+3.7vw,4.6rem)]">
              <span className="block" data-reveal="mask">A document can look</span>
              <span className="block" data-reveal="mask" style={{ ["--d" as string]: "120ms" }}>perfectly readable</span>
              <span className="block" data-reveal="mask" style={{ ["--d" as string]: "240ms" }}>
                <em>and still shut someone out.</em>
              </span>
            </h1>
            <p className="lede mt-8 !max-w-[42ch]" data-reveal style={{ ["--d" as string]: "380ms" }}>
              Sayable sorts a city&rsquo;s public documents, repairs the hidden structure screen readers depend on, and
              shows exactly what was checked before anything is posted.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3" data-reveal style={{ ["--d" as string]: "480ms" }}>
              <Link href="/contact?topic=audit" className="btn">
                Request a Readiness Audit <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
              </Link>
              <Link href="#two-readers" className="link-quiet">
                Hear what a screen reader gets <span aria-hidden="true" data-icon="arrow-d"></span>
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:-mr-6 xl:-mr-14">
            <div className="folder mx-auto mt-10 max-w-[min(600px,94vw)] lg:mt-6 lg:max-w-none" data-tab="Planning Division · Notices · ACC-2026-0412">
              <LivingDocument />
            </div>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 border-t hairline md:grid-cols-4">
          {[
            ["Checked against", "PDF/UA-1 with veraPDF"],
            ["Reviewed for", "meaning, not just rules"],
            ["Hard parts go to", "a person"],
            ["Every file ships with", "a plain check report"],
          ].map(([k, v], i) => (
            <div key={k} className={`py-5 pr-4 ${i > 0 ? "md:border-l md:pl-6 hairline" : ""} ${i % 2 === 1 ? "border-l pl-4 hairline md:pl-6" : ""} ${i > 1 ? "border-t md:border-t-0 hairline" : ""}`}>
              <dt className="tag !text-muted">{k}</dt>
              <dd className="mt-1.5 font-serif text-[1.15rem] leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
