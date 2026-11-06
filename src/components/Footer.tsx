import Link from "next/link";
import { site } from "@/content/site";
import { ConsentSettingsButton } from "./consent/ConsentSettingsButton";
import { Wordmark } from "./Wordmark";

const footerCols = [
  {
    title: "Product",
    links: [
      { href: "/product", label: "Overview" },
      { href: "/readiness-audit", label: "Readiness Audit" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/verify", label: "Verification" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/solutions/government", label: "Cities and counties" },
      { href: "/solutions/agencies", label: "Agencies and firms" },
      { href: "/resources", label: "Resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/security", label: "Security" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="night on-night relative overflow-hidden">
      <div className="wrap pb-10 pt-20 sm:pt-28">
        <div className="grid-12 gap-y-14">
          <div className="col-span-12 md:col-span-6">
            <Link href="/" className="inline-block text-moon no-underline" aria-label="Sayable home">
              <Wordmark />
            </Link>
            <p className="mt-6 max-w-[30ch] text-[1.6rem] font-[600] leading-[1.2] tracking-[-0.025em] text-moon">
              Public documents that read as clearly as they look.
            </p>
            <p className="mt-6 max-w-[44ch] text-[0.95rem] text-moon-muted">
              Document accessibility audits, remediation and independent verification for cities, counties and the
              teams who publish for them.
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:col-span-6">
            {footerCols.map((c) => (
              <div key={c.title}>
                <h2 className="text-[0.85rem] font-[600] text-moon-muted">{c.title}</h2>
                <ul className="mt-4 space-y-0.5">
                  {c.links.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="inline-flex min-h-10 items-center text-[0.95rem] text-moon no-underline hover:text-signal-light">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
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
            {[
              { href: "/accessibility", label: "Accessibility" },
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/cookies", label: "Cookies" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-10 items-center text-moon no-underline hover:text-signal-light">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <ConsentSettingsButton className="inline-flex min-h-10 items-center text-moon hover:text-signal-light" />
            </li>
            <li className="inline-flex min-h-10 items-center">© {new Date().getFullYear()} Sayable</li>
          </ul>
        </div>
      </div>
      {/* Oversized structural signature: the wordmark rendered as its tag outline */}
      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap px-[var(--gutter)] pb-4 font-serif leading-[0.8] tracking-[-0.05em] text-transparent"
        style={{ fontSize: "clamp(5rem, 22vw, 22rem)", WebkitTextStroke: "1px rgb(243 245 248 / 0.28)", fontWeight: 300 }}
      >
        Sayable
      </p>
    </footer>
  );
}
