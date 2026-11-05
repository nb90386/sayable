import Link from "next/link";
import { LivingDocument } from "../hero/LivingDocument";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] sm:pt-[calc(var(--header-h)+4rem)]">
      {/* blueprint field that only lives behind the document */}
      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute right-0 top-0 h-[78%] w-full opacity-60 lg:w-[56%]"
        style={{ maskImage: "radial-gradient(ellipse 70% 60% at 60% 45%, #000 20%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 60% 45%, #000 20%, transparent 75%)" }}
      />
      <div className="wrap relative">
        <div className="grid-12 items-center gap-y-14">
          <div className="relative z-10 col-span-12 lg:col-span-7 lg:pb-16">
            <p className="eyebrow" data-reveal>Document accessibility for public agencies</p>
            <h1 id="hero-title" className="display mt-7 text-[length:clamp(2.75rem,1.3rem+5vw,6.1rem)]">
              <span className="block" data-reveal="mask">Every document</span>
              <span className="block" data-reveal="mask" style={{ ["--d" as string]: "120ms" }}>deserves to be</span>
              <span className="block" data-reveal="mask" style={{ ["--d" as string]: "240ms" }}>
                <em className="annot" data-reveal="mask" style={{ ["--d" as string]: "240ms" }}>understood.</em>
              </span>
            </h1>
            <p className="lede mt-8 !max-w-[40ch]" data-reveal style={{ ["--d" as string]: "380ms" }}>
              Sayable finds the public documents that need attention, repairs the hidden structure screen readers depend
              on, and checks every result before it reaches residents.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3" data-reveal style={{ ["--d" as string]: "480ms" }}>
              <Link href="#two-readers" className="btn">
                Explore Sayable <span className="arrow" aria-hidden="true">↓</span>
              </Link>
              <Link href="/contact" className="link-quiet">
                Request an audit <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:-ml-10 lg:-mr-6 xl:-mr-14">
            <div className="mx-auto max-w-[min(560px,92vw)] lg:max-w-none">
              <LivingDocument />
            </div>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 border-t hairline md:grid-cols-4" data-reveal>
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
