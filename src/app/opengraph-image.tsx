import { ImageResponse } from "next/og";

export const alt = "Sayable: accessible documents, less guesswork. A permit form with its reading order drawn through it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#12151b";
const PAPER = "#f8f9fb";
const SIGNAL = "#2458e8";
const MUTED = "#535b69";

/** Social preview: the claim on the left, the signature document on the right with its reading path. */
export default function OpengraphImage() {
  const rows = [
    { w: 300, label: "2" },
    { w: 300, label: "3" },
    { w: 210, label: "4" },
    { w: 300, label: "5" },
  ];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: PAPER, color: INK, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 0 64px 80px", width: 640 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="30" height="35" viewBox="0 0 24 28">
              <rect x="1" y="1" width="20" height="26" rx="4" fill={INK} />
              <path d="M5 7.5c5 0 9 1.5 9 4.5s-8 2.5-8 6 4 4 10 4" fill="none" stroke={PAPER} strokeWidth="1.9" strokeLinecap="round" />
              <circle cx="19.5" cy="22" r="3.2" fill="#e5521f" stroke={INK} strokeWidth="1.2" />
            </svg>
            <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>Sayable</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3.5, lineHeight: 1 }}>Accessible documents.</span>
            <span style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3.5, lineHeight: 1.05, color: SIGNAL }}>Less guesswork.</span>
            <span style={{ marginTop: 28, fontSize: 28, lineHeight: 1.35, color: MUTED, maxWidth: 520 }}>
              Find the accessibility problems in public PDFs, fix what matters first, and verify every file.
            </span>
          </div>
          <span style={{ fontSize: 22, color: MUTED }}>Readiness Audits for cities, counties and the teams who publish for them</span>
        </div>
        <div style={{ display: "flex", position: "relative", width: 560, height: 630 }}>
          <div
            style={{
              position: "absolute",
              left: 70,
              top: 70,
              width: 420,
              height: 560,
              display: "flex",
              flexDirection: "column",
              background: "#ffffff",
              borderRadius: 14,
              boxShadow: "0 30px 60px -20px rgba(16,20,28,0.35), 0 0 0 1px rgba(18,21,27,0.06)",
              padding: "44px 40px",
            }}
          >
            <div style={{ display: "flex", width: 200, height: 22, background: INK, borderRadius: 4 }} />
            <div style={{ display: "flex", width: 140, height: 10, background: "#c9ced8", borderRadius: 3, marginTop: 14 }} />
            {rows.map((r) => (
              <div key={r.label} style={{ display: "flex", flexDirection: "column", marginTop: 26 }}>
                <div style={{ display: "flex", width: 110, height: 9, background: "#9aa1ad", borderRadius: 3 }} />
                <div style={{ display: "flex", width: r.w, height: 34, border: "1.5px solid #c9ced8", borderRadius: 6, marginTop: 8 }} />
              </div>
            ))}
          </div>
          <svg width="560" height="630" viewBox="0 0 560 630" style={{ position: "absolute", left: 0, top: 0 }}>
            <path d="M 58 140 C 30 200, 70 240, 58 300 S 30 400, 58 460 S 80 540, 58 600" fill="none" stroke={SIGNAL} strokeWidth="4" strokeLinecap="round" />
            {[140, 255, 340, 425, 510].map((y) => (
              <circle key={y} cx="58" cy={y} r="13" fill={SIGNAL} stroke={PAPER} strokeWidth="5" />
            ))}
          </svg>
        </div>
      </div>
    ),
    size,
  );
}
