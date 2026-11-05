"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cta, nav } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function Header() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Focus management, Escape, scroll lock and focus containment for the mobile menu.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = [toggleRef.current, ...Array.from(panel.querySelectorAll<HTMLElement>("a,button"))].filter(
        Boolean,
      ) as HTMLElement[];
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (!firstEl || !lastEl) return;
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <header
      className={`${home && !open ? "absolute" : "fixed"} inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        (scrolled && !home) || open ? "border-b bg-paper hairline" : "border-b border-transparent bg-transparent"
      }`}
      style={{ height: "var(--header-h)" }}
    >
      <div className={`flex h-full items-center justify-between gap-6 ${home ? "px-[var(--gutter)]" : "wrap"}`}>
        <Link href="/" className="relative z-10 -ml-1 rounded-sm px-1 py-2 no-underline" aria-label="Sayable home">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className={`hidden ${home ? "mr-auto xl:block" : "lg:block"}`}>
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="group relative inline-flex min-h-11 items-center px-3.5 text-[0.95rem] font-[480] text-ink-soft no-underline transition-colors hover:text-ink"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3.5 bottom-2 h-px origin-left bg-signal transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href={cta.href} className={`btn hidden !min-h-10 !px-4 text-sm sm:inline-flex ${home ? "btn-night" : ""}`}>
            {cta.label}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={`relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-sm ${home ? "xl:hidden" : "lg:hidden"} ${home && !open ? "lg:text-moon" : ""}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-6 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-current transition-all duration-500 ease-[var(--ease-out-expo)] ${
                  open ? "w-6 -translate-y-[5.5px] -rotate-45" : "w-4"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className={`fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto bg-paper ${home ? "xl:hidden" : "lg:hidden"}`}
      >
        <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pb-10 pt-6">
          <ul className="border-t hairline">
            {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
              <li key={item.href} className="border-b hairline">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="menu-item flex items-baseline justify-between py-4 font-serif text-[2rem] leading-tight tracking-[-0.02em] no-underline"
                  style={{ ["--i" as string]: i }}
                >
                  {item.label}
                  <span className="tag !text-muted">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <Link href={cta.href} className="btn w-full justify-between">
              {cta.label} <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
