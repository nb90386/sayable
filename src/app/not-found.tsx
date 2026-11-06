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
          <h1 className="display text-[length:clamp(2.6rem,1.4rem+4.4vw,5.2rem)]">This page isn&apos;t here.</h1>
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
          <div className="relative mx-auto w-full max-w-[280px]" aria-hidden="true">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-[2deg] rounded-[6px] bg-sheet shadow-[0_1px_2px_rgb(16_20_28/0.06)]" />
            <svg
              viewBox="0 0 240 310"
              className="relative w-full rounded-[6px] bg-sheet shadow-[0_2px_4px_rgb(16_20_28/0.06),0_28px_60px_-24px_rgb(16_20_28/0.35)]"
              focusable="false"
            >
              <rect x="24" y="28" width="96" height="11" rx="2" fill="var(--color-ink)" fillOpacity="0.85" />
              <g fill="var(--color-ink)" fillOpacity="0.18">
                <rect x="24" y="56" width="176" height="6" rx="2" />
                <rect x="24" y="72" width="150" height="6" rx="2" />
                <rect x="24" y="88" width="164" height="6" rx="2" />
                <rect x="24" y="236" width="160" height="6" rx="2" />
                <rect x="24" y="252" width="110" height="6" rx="2" />
              </g>
              <rect x="24" y="116" width="192" height="96" rx="5" fill="rgb(181 61 18 / 0.05)" stroke="var(--color-ember)" strokeWidth="1.8" strokeDasharray="6 5" />
              <rect x="64" y="154" width="112" height="22" rx="11" fill="var(--color-ember)" />
              <text x="120" y="169" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fill="#fff">page not found</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
