// Usage: node scripts/clip.mjs <url-path> <out.png> [width=1440] [y=0] [h=1400]
import { chromium } from "@playwright/test";
const [path, out, w = "1440", y = "0", h = "1400"] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.PW_CHROME });
const p = await b.newPage({ viewport: { width: +w, height: 900 } });
await p.addInitScript(() => localStorage.setItem("sayable-consent", JSON.stringify({ v: 1, analytics: false, at: "x" })));
await p.goto("http://localhost:3100" + path, { waitUntil: "networkidle" });
await p.waitForTimeout(500);
await p.screenshot({ path: out, fullPage: true, clip: { x: 0, y: +y, width: +w, height: +h } });
await b.close();
