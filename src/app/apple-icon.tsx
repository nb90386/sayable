import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon: the document mark on ink. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#17150f" }}>
        <svg width="120" height="140" viewBox="0 0 24 28">
          <rect x="1" y="1" width="20" height="26" rx="4" fill="#f3efe7" />
          <path d="M5 7.5c5 0 9 1.5 9 4.5s-8 2.5-8 6 4 4 10 4" fill="none" stroke="#1b5a45" strokeWidth="1.9" strokeLinecap="round" />
          <circle cx="19.5" cy="22" r="3.2" fill="#cf4520" stroke="#17150f" strokeWidth="1.2" />
        </svg>
      </div>
    ),
    size,
  );
}
