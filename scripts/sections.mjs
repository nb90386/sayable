// Screenshot each top-level section: node scripts/sections.mjs <path> <outDir> <width>
import { chromium } from "@playwright/test";
const [path = "/", out = ".", width = "1440"] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.PW_CHROME || undefined });
const p = await b.newPage({ viewport: { width: Number(width), height: Number(width) < 800 ? 844 : 900 } });
await p.goto("http://localhost:3100" + path, { waitUntil: "networkidle" });
const secs = await p.locator("main > *, footer").all();
let i = 0;
for (const s of secs) {
  await s.scrollIntoViewIfNeeded();
  await p.waitForTimeout(1600);
  await s.screenshot({ path: `${out}/s${width}_${i++}.png` });
}
console.log("shots", i);
await b.close();
