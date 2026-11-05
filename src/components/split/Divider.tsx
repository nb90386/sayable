"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The signature move. The divider between the two stories is the document's
 * reading path. At the top of the page it kinks and doubles back, with vermilion
 * knots where the order breaks; every act straightens it; at the close it runs
 * true and travels to the edge as the two stories become one.
 * Desktop draws it vertically between the columns; phones draw it down the left gutter.
 */
const N = 26;

function noise(i: number) {
  const x = Math.sin(i * 91.17 + 3.7) * 43758.5453;
  return x - Math.floor(x);
}

function geometry(p: number, width: number) {
  const mid = width / 2;
  const amp = Math.pow(Math.max(0, 1 - p * 1.12), 1.35); // 1 → 0 across the page
  const pts: { x: number; y: number; k: number }[] = [];
  for (let i = 0; i <= N; i++) {
    const y = (i / N) * 1000;
    const n = noise(i) - 0.5;
    const kink = i % 3 === 1 ? 2.2 : 1; // every third point jumps harder: broken order
    const dx = n * width * 0.86 * amp * kink;
    const x = Math.round(Math.max(2, Math.min(width - 2, mid + dx)) * 100) / 100;
    pts.push({ x, y: Math.round(y * 100) / 100, k: Math.abs(dx) / (width * 0.5) });
  }
  let d = `M ${pts[0]!.x.toFixed(2)} ${pts[0]!.y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]!;
    const b = pts[i]!;
    // a doubling-back loop on the worst kinks while the order is still broken
    const back = amp > 0.35 && i % 5 === 2 ? -1 : 1;
    const c1y = a.y + (b.y - a.y) * (back < 0 ? 1.2 : 0.4);
    const c2y = a.y + (b.y - a.y) * (back < 0 ? -0.2 : 0.6);
    d += ` C ${a.x.toFixed(2)} ${c1y.toFixed(1)}, ${b.x.toFixed(2)} ${c2y.toFixed(1)}, ${b.x.toFixed(2)} ${b.y}`;
  }
  return { d, knots: pts.filter((q) => q.k > 0.38), amp };
}

export function Divider() {
  const [p, setP] = useState(0);
  const [act, setAct] = useState("title");
  const [collapsed, setCollapsed] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const acts = Array.from(document.querySelectorAll<HTMLElement>("[data-sc-act]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const name = (e.target as HTMLElement).dataset.scAct ?? "";
          setAct(name);
          setCollapsed(name === "close");
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    acts.forEach((a) => io.observe(a));
    // Scroll Craft verification harness waits for this marker before sampling.
    document.documentElement.classList.add("sc-ready");
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf.current);
      raf.current = 0;
      io.disconnect();
    };
  }, []);

  const desk = geometry(p, 40);
  const phone = geometry(p, 9);
  const names: Record<string, string> = {
    title: "As posted",
    listen: "Listen",
    scale: "The inventory",
    journey: "One document, five stages",
    value: "What it would take",
    trust: "What is checked",
    close: "Both stories match",
  };

  return (
    <div
      aria-hidden="true"
      className={`divider ${collapsed ? "is-collapsed" : ""} ${act === "title" ? "at-title" : ""} ${desk.amp < 0.15 ? "is-calm" : ""}`}
      data-sc-verify-state={`${desk.amp.toFixed(2)}|${act}|${collapsed ? 1 : 0}`}
      data-sc-verify-hold={collapsed ? "true" : undefined}
    >
      <svg className="divider-desk" viewBox="0 0 40 1000" preserveAspectRatio="none">
        <path d={desk.d} className="divider-line" />
        {desk.knots.map((k, i) => (
          <circle key={i} cx={k.x} cy={k.y} r="3.2" className="divider-knot" style={{ opacity: Math.min(1, desk.amp * 1.6) }} />
        ))}
      </svg>
      <svg className="divider-phone" viewBox="0 0 9 1000" preserveAspectRatio="none">
        <path d={phone.d} className="divider-line" />
      </svg>
      <div className="divider-chrome">
        <span className="divider-sides">
          <span>What you see</span>
          <span>What a screen reader gets</span>
        </span>
        <span className="divider-act">{names[act] ?? ""}</span>
      </div>
    </div>
  );
}
