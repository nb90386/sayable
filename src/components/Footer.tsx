import Link from "next/link";
import { nav, site, stages } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="night on-night relative overflow-hidden">
      <div className="wrap pb-10 pt-20 sm:pt-28">
        <div className="grid-12 gap-y-14">
          <div className="col-span-12 md:col-span-6">
            <Link href="/" className="inline-block text-moon no-underline" aria-label="Sayable home">
              <Wordmark />
            </Link>
            <p className="mt-6 max-w-[30ch] font-serif text-[1.65rem] leading-[1.2] tracking-[-0.015em] text-moon">
              Public documents that read as clearly as they look.
            </p>
            <p className="mt-6 max-w-[44ch] text-[0.95rem] text-moon-muted">
              Document accessibility audits, remediation and independent verification for cities, counties and the
              teams who publish for them.
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-6 md:col-span-3">
            <h2 className="text-[0.85rem] font-[600] text-moon-muted">Site</h2>
            <ul className="mt-5 space-y-1">
              {[...nav, { href: "/contact", label: "Contact" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-10 items-center text-moon no-underline hover:text-signal-night">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-3">
            <h2 className="text-[0.85rem] font-[600] text-moon-muted">The work</h2>
            <ol className="mt-5 space-y-1">
              {stages.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/how-it-works#${s.id}`}
                    className="inline-flex min-h-10 items-center gap-3 text-moon no-underline hover:text-signal-night"
                  >
                                        {s.name}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-20 grid gap-8 border-t pt-8 text-[0.875rem] text-moon-muted md:grid-cols-[1fr_auto]" style={{ borderColor: "var(--rule-night)" }}>
          <p className="max-w-[70ch]">
            Sayable reports what was checked and what the results were. We do not certify legal compliance, and nothing
            on this site is legal advice.{" "}
            {site.contactEmail ? (
              <>
                Write to{" "}
                <a className="text-link text-moon" href={`mailto:${site.contactEmail}`}>
                  {site.contactEmail}
                </a>
                .
              </>
            ) : null}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            <li>
              <Link href="/accessibility" className="inline-flex min-h-10 items-center text-moon no-underline hover:text-signal-night">
                Accessibility statement
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="inline-flex min-h-10 items-center text-moon no-underline hover:text-signal-night">
                Privacy
              </Link>
            </li>
            <li className="inline-flex min-h-10 items-center">© {new Date().getFullYear()} Sayable</li>
          </ul>
        </div>
      </div>
      {/* Oversized structural signature: the wordmark rendered as its tag outline */}
      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap px-[var(--gutter)] pb-4 font-serif leading-[0.8] tracking-[-0.05em] text-transparent"
        style={{ fontSize: "clamp(5rem, 22vw, 22rem)", WebkitTextStroke: "1px rgb(228 70 43 / 0.55)", fontWeight: 300 }}
      >
        Sayable
      </p>
    </footer>
  );
}
