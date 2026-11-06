import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

const routes = [
  { href: "/", label: "Home", note: "Start from the top." },
  { href: "/readiness-audit", label: "Readiness Audit", note: "See what we check and what you get." },
  { href: "/product", label: "Product", note: "How the inventory, fixes and reports fit together." },
  { href: "/resources", label: "Resources", note: "Guides and sample material." },
  { href: "/contact", label: "Contact", note: "Tell us what you were looking for." },
];

export default function NotFound() {
  return (
    <div className="wrap pb-24 pt-[calc(var(--header-h)+4rem)] sm:pb-32">
      <div className="grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <p className="mono text-muted">404</p>
          <h1 className="display mt-5 text-[length:clamp(2.6rem,1.4rem+4.4vw,5.2rem)]">This page isn&apos;t here.</h1>
          <p className="lede mt-8">
            The link may be old, or the address may have a typo. These pages are a good place to pick up.
          </p>
          <ul className="mt-10 max-w-[44ch] border-t hairline">
            {routes.map((r) => (
              <li key={r.href} className="border-b hairline">
                <Link href={r.href} className="flex flex-wrap items-baseline justify-between gap-x-6 py-4 hover:text-signal">
                  <span className="title text-[1.2rem]">{r.label}</span>
                  <span className="text-[0.92rem] text-muted">{r.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <svg viewBox="0 0 240 310" className="mx-auto w-full max-w-[260px]" aria-hidden="true" focusable="false">
            <rect x="22" y="18" width="196" height="274" rx="6" fill="var(--color-sheet)" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="1.5" />
            <rect x="44" y="44" width="92" height="10" rx="2" fill="var(--color-ink)" fillOpacity="0.8" />
            <g fill="var(--color-ink)" fillOpacity="0.2">
              <rect x="44" y="72" width="152" height="6" rx="2" />
              <rect x="44" y="88" width="132" height="6" rx="2" />
              <rect x="44" y="104" width="146" height="6" rx="2" />
              <rect x="44" y="232" width="140" height="6" rx="2" />
              <rect x="44" y="248" width="96" height="6" rx="2" />
            </g>
            <rect x="44" y="132" width="152" height="80" rx="4" fill="none" stroke="var(--color-signal)" strokeWidth="2" strokeDasharray="7 6" />
            <text x="120" y="178" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="22" fill="var(--color-signal)">?</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
