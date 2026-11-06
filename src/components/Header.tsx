"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cta, nav, type NavGroup } from "@/content/site";
import { track } from "@/lib/analytics";
import { DUR, EASE_OUT, STAGGER, popover, tUi, tUiExit } from "@/lib/motion";
import { Wordmark } from "./Wordmark";

const isActive = (pathname: string, g: NavGroup) =>
  g.href ? pathname === g.href || pathname.startsWith(`${g.href}/`) : !!g.items?.some((i) => pathname === i.href || pathname.startsWith(`${i.href}/`));

/** One dropdown group: a disclosure button with a popover that grows from it. */
function Group({
  g,
  open,
  setOpen,
  active,
  hovered,
  setHovered,
}: {
  g: NavGroup;
  open: boolean;
  setOpen: (label: string | null) => void;
  active: boolean;
  hovered: boolean;
  setHovered: (label: string | null) => void;
}) {
  const id = useId();
  const wrap = useRef<HTMLLIElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        btn.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, setOpen]);

  const pill = hovered || (open && !hovered) ? <motion.span layoutId="nav-pill" className="nav-pill" transition={reduced ? { duration: 0 } : { duration: DUR.ui, ease: EASE_OUT }} /> : null;

  return (
    <li
      ref={wrap}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        setHovered(g.label);
        clear();
        timer.current = setTimeout(() => setOpen(g.label), 90);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        setHovered(null);
        clear();
        timer.current = setTimeout(() => setOpen(null), 160);
      }}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(null);
      }}
    >
      {g.items ? (
        <button
          ref={btn}
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(open ? null : g.label)}
          className={`nav-link ${active ? "is-active" : ""}`}
        >
          {pill}
          <span className="relative">{g.label}</span>
          <motion.span
            aria-hidden="true"
            className="relative ml-1 inline-block text-muted"
            animate={{ rotate: open ? 180 : 0 }}
            transition={reduced ? { duration: 0 } : tUi}
            data-icon="chev-d"
          />
        </button>
      ) : (
        <Link href={g.href!} aria-current={active ? "page" : undefined} className={`nav-link ${active ? "is-active" : ""}`}>
          {pill}
          <span className="relative">{g.label}</span>
        </Link>
      )}
      {g.items ? (
        <AnimatePresence>
          {open ? (
            <motion.div
              id={id}
              key="panel"
              className="nav-pop"
              style={{ transformOrigin: "24px 0px" }}
              {...(reduced ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } } : popover)}
            >
              <ul>
                {g.items.map((it, i) => (
                  <motion.li
                    key={it.href}
                    initial={reduced ? false : { opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 0, transition: { ...tUi, delay: reduced ? 0 : 0.04 + i * STAGGER } }}
                  >
                    <Link href={it.href} className="nav-pop-link" onClick={() => setOpen(null)}>
                      <span className="block font-[600] text-ink">{it.label}</span>
                      {it.note ? <span className="mt-0.5 block text-[0.86rem] leading-snug text-muted">{it.note}</span> : null}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </li>
  );
}

export function Header() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setMenu(null);
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
      const items = [toggleRef.current, ...Array.from(panel.querySelectorAll<HTMLElement>("a,button"))].filter(Boolean) as HTMLElement[];
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

  let row = 0;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-b bg-paper hairline" : "border-b border-transparent bg-paper"
      }`}
      style={{ height: "var(--header-h)" }}
    >
      <div className="wrap flex h-full items-center justify-between gap-6">
        <Link href="/" className="relative z-10 -ml-1 rounded-sm px-1 py-2 no-underline" aria-label="Sayable home">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <LayoutGroup id="primary-nav">
            <ul className="flex items-center gap-0.5">
              {nav.map((g) => (
                <Group
                  key={g.label}
                  g={g}
                  open={menu === g.label}
                  setOpen={setMenu}
                  active={isActive(pathname, g)}
                  hovered={hovered === g.label}
                  setHovered={setHovered}
                />
              ))}
            </ul>
          </LayoutGroup>
        </nav>

        <div className="flex items-center gap-2">
          <Link href={cta.href} className="btn hidden !min-h-10 !px-4 text-sm sm:inline-flex" onClick={() => track("audit_cta_click", { from: "header" })}>
            {cta.label}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="press relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span className={`absolute left-0 top-0 h-[1.5px] w-6 bg-current transition-transform duration-200 ease-[var(--ease-out-expo)] ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-current transition-all duration-200 ease-[var(--ease-out-expo)] ${
                  open ? "w-6 -translate-y-[5.5px] -rotate-45" : "w-4"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            key="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: tUi }}
            exit={{ opacity: 0, transition: tUiExit }}
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto bg-paper lg:hidden"
          >
            <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pb-10 pt-4">
              {nav.map((g) => (
                <div key={g.label} className="border-b py-3 hairline">
                  {g.items ? <h2 className="pb-1 pt-2 text-[0.85rem] font-[600] text-muted">{g.label}</h2> : null}
                  <ul>
                    {(g.items ?? [{ href: g.href!, label: g.label }]).map((it) => {
                      const i = row++;
                      return (
                        <motion.li
                          key={it.href}
                          initial={reduced ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0, transition: { ...tUi, delay: reduced ? 0 : Math.min(i, 10) * STAGGER } }}
                        >
                          <Link
                            href={it.href}
                            aria-current={pathname === it.href ? "page" : undefined}
                            className="flex min-h-12 items-center text-[1.35rem] font-[600] tracking-[-0.02em] no-underline"
                          >
                            {it.label}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              <div className="mt-auto pt-10">
                <Link href={cta.href} className="btn w-full justify-between" onClick={() => track("audit_cta_click", { from: "mobile-menu" })}>
                  {cta.long} <span className="arrow" aria-hidden="true" data-icon="arrow-r"></span>
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
