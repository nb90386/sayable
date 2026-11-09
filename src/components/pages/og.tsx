import { ImageResponse } from "next/og";
import type { ReactNode } from "react";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG = { INK: "#17150f", PAPER: "#ecebe7", SHEET: "#fbfaf8", NIGHT: "#1f2b2a", SIGNAL: "#1b5a45", WARM: "#cf4520", MUTED: "#5f5a50", RULE: "#c9c5bb" };

/** Funnel Display from Google Fonts as TTF (satori cannot read woff2). Falls back to the bundled sans if it fails. */
async function loadFont(text: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Funnel+Display:wght@500&text=${encodeURIComponent(text)}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** Shared frame: wordmark, headline and a line of support on the left; a document motif on the right. */
export async function ogImage({ title, sub, foot, motif }: { title: string; sub: string; foot: string; motif: ReactNode }) {
  const font = await loadFont(`${title}${sub}${foot}Sayable`);
  const family = font ? "Funnel Display" : "sans-serif";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: OG.PAPER, color: OG.INK, fontFamily: family }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 56px 76px", width: 660 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="30" height="35" viewBox="0 0 24 28">
              <rect x="1" y="1" width="20" height="26" rx="4" fill={OG.INK} />
              <path d="M5 7.5c5 0 9 1.5 9 4.5s-8 2.5-8 6 4 4 10 4" fill="none" stroke={OG.PAPER} strokeWidth="1.9" strokeLinecap="round" />
              <circle cx="19.5" cy="22" r="3.2" fill={OG.WARM} stroke={OG.INK} strokeWidth="1.2" />
            </svg>
            <span style={{ fontSize: 34, fontWeight: font ? 500 : 600, letterSpacing: -1 }}>Sayable</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 68, fontWeight: font ? 500 : 700, letterSpacing: -2.4, lineHeight: 1.04 }}>{title}</span>
            <span style={{ marginTop: 26, fontSize: 28, lineHeight: 1.35, color: OG.MUTED, maxWidth: 540 }}>{sub}</span>
          </div>
          <span style={{ fontSize: 22, color: OG.MUTED }}>{foot}</span>
        </div>
        <div style={{ display: "flex", position: "relative", width: 540, height: 630 }}>{motif}</div>
      </div>
    ),
    { ...OG_SIZE, fonts: font ? [{ name: "Funnel Display", data: font, weight: 500, style: "normal" }] : undefined },
  );
}

const shadow = "0 30px 60px -20px rgba(16,20,28,0.35), 0 0 0 1px rgba(18,21,27,0.06)";

/** A findings list: rows with a status dot and two text bars; one row selected. */
export function FindingsMotif() {
  const rows = [OG.WARM, OG.WARM, OG.SIGNAL, OG.WARM, OG.SIGNAL];
  return (
    <div style={{ position: "absolute", left: 20, top: 90, width: 470, height: 450, display: "flex", flexDirection: "column", background: OG.SHEET, borderRadius: 14, boxShadow: shadow, padding: "26px 26px" }}>
      <div style={{ display: "flex", width: 150, height: 14, background: OG.INK, borderRadius: 4, marginBottom: 20 }} />
      {rows.map((c, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", height: 62, borderTop: `1.5px solid ${OG.RULE}`, background: i === 1 ? "#f6e0d5" : "transparent", padding: i === 1 ? "0 10px" : 0 }}>
          <div style={{ display: "flex", width: 18, height: 18, borderRadius: 9, background: c, marginRight: 16 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", width: 240 - (i % 3) * 30, height: 11, background: OG.INK, opacity: 0.75, borderRadius: 4 }} />
            <div style={{ display: "flex", width: 170, height: 9, background: OG.RULE, borderRadius: 4, marginTop: 9 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Five lanes of different heights with a coloured top edge. */
export function LanesMotif() {
  const lanes = [
    { c: OG.MUTED, h: 250 },
    { c: OG.WARM, h: 340 },
    { c: OG.INK, h: 200 },
    { c: OG.SIGNAL, h: 290 },
    { c: "#b9b5ab", h: 150 },
  ];
  return (
    <div style={{ position: "absolute", left: 10, top: 90, width: 500, height: 450, display: "flex", alignItems: "flex-end", gap: 12 }}>
      {lanes.map((l, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", width: 88, height: l.h, background: OG.SHEET, borderRadius: 8, boxShadow: shadow, borderTop: `7px solid ${l.c}`, padding: "16px 12px" }}>
          <div style={{ display: "flex", width: "100%", height: 9, background: OG.RULE, borderRadius: 4 }} />
          <div style={{ display: "flex", width: "70%", height: 9, background: OG.RULE, borderRadius: 4, marginTop: 10 }} />
          <div style={{ display: "flex", width: "100%", height: 34, border: `1.5px solid ${OG.RULE}`, borderRadius: 5, marginTop: 20, borderStyle: i === 4 ? "dashed" : "solid" }} />
        </div>
      ))}
    </div>
  );
}

/** A report cover with a bar chart. */
export function ReportMotif() {
  const bars = [380, 300, 240, 190, 140];
  return (
    <div style={{ position: "absolute", left: 40, top: 60, width: 440, height: 510, display: "flex", flexDirection: "column", background: OG.SHEET, borderRadius: 12, boxShadow: shadow, padding: "40px 38px" }}>
      <div style={{ display: "flex", width: 90, height: 12, background: OG.INK, borderRadius: 4 }} />
      <span style={{ display: "flex", fontSize: 44, fontWeight: 500, marginTop: 30, letterSpacing: -1.2 }}>City of Alder Creek</span>
      <div style={{ display: "flex", width: 330, height: 2, background: OG.INK, marginTop: 20 }} />
      {bars.map((w, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", marginTop: i === 0 ? 34 : 20 }}>
          <div style={{ display: "flex", width: 44, height: 9, background: OG.RULE, borderRadius: 4, marginRight: 14 }} />
          <div style={{ display: "flex", width: w * 0.62, height: 24, background: OG.WARM, opacity: 1 - i * 0.12, borderRadius: 4 }} />
        </div>
      ))}
    </div>
  );
}

/** Three guide covers fanned out. */
export function GuidesMotif() {
  const sheet = (left: number, top: number, rot: number, bg: string, bar: string, k: number) => (
    <div key={k} style={{ position: "absolute", left, top, width: 270, height: 350, display: "flex", flexDirection: "column", background: bg, borderRadius: 8, boxShadow: shadow, transform: `rotate(${rot}deg)`, padding: "30px 28px" }}>
      <div style={{ display: "flex", width: 120, height: 34, background: bar, borderRadius: 5 }} />
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} style={{ display: "flex", width: i === 4 ? 110 : 214, height: 9, background: bg === OG.NIGHT ? "#44524f" : OG.RULE, borderRadius: 4, marginTop: i === 0 ? 34 : 16 }} />
      ))}
    </div>
  );
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 540, height: 630, display: "flex" }}>
      {sheet(30, 150, -7, OG.NIGHT, OG.WARM, 0)}
      {sheet(150, 90, 3, OG.SHEET, OG.INK, 1)}
      {sheet(250, 190, 9, OG.PAPER, OG.SIGNAL, 2)}
    </div>
  );
}

/** The homepage motif: the sample form with the Sayable scan line partway down, problem above corrected. */
export function ScanMotif() {
  const row = (top: number, w: number, fixed: boolean | null) => (
    <div style={{ position: "absolute", left: 36, top, width: w, height: 30, borderRadius: 4, display: "flex", border: fixed === null ? `2px solid ${OG.RULE}` : fixed ? `3px solid ${OG.SIGNAL}` : `3px dashed ${OG.WARM}`, background: fixed === null ? "#fff" : fixed ? "rgba(27,90,69,0.06)" : "rgba(207,69,32,0.07)" }} />
  );
  return (
    <div style={{ position: "relative", width: 400, height: 500, display: "flex", background: OG.SHEET, borderRadius: 6, boxShadow: "0 40px 80px -40px rgba(20,18,12,0.5)" }}>
      <div style={{ position: "absolute", left: 36, top: 34, width: 200, height: 8, background: "#3a3d42", display: "flex" }} />
      <div style={{ position: "absolute", left: 30, top: 58, width: 300, height: 40, borderRadius: 6, border: `3px solid ${OG.SIGNAL}`, display: "flex" }} />
      <div style={{ position: "absolute", left: 230, top: 46, padding: "4px 12px", borderRadius: 999, background: OG.SIGNAL, color: "#fff", fontSize: 18, display: "flex" }}>Heading</div>
      {row(130, 328, true)}
      {row(186, 160, true)}
      {row(260, 328, false)}
      {row(316, 328, false)}
      {row(392, 200, null)}
      <div style={{ position: "absolute", left: -18, right: -18, top: 240, height: 4, background: OG.SIGNAL, display: "flex" }} />
      <div style={{ position: "absolute", right: -6, top: 212, padding: "6px 14px", borderRadius: 999, background: OG.SIGNAL, color: "#fff", fontSize: 18, display: "flex" }}>Sayable scan</div>
    </div>
  );
}
