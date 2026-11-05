// Screenshot each top-level section: node scripts/sections.mjs <path> <outDir> <width>
// The fixed header is hidden for every shot after the first, so it never covers a section's content.
import { chromium } from "@playwright/test";
const [path = "/", out = ".", width = "1440"] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.PW_CHROME || undefined });
const p = await b.newPage({ viewport: { width: Number(width), height: Number(width) < 800 ? 844 : 900 } });
await p.goto("http://localhost:3100" + path, { waitUntil: "networkidle" });
const h = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 700) {
  await p.evaluate((yy) => window.scrollTo(0, yy), y);
  await p.waitForTimeout(60);
}
const secs = await p.locator("main > *, footer").all();
let i = 0;
for (const s of secs) {
  if (i === 1) await p.addStyleTag({ content: "header{visibility:hidden !important}" });
  await s.evaluate((el) => el.scrollIntoView({ block: "start" }));
  await p.waitForTimeout(1600);
  await s.screenshot({ path: `${out}/s${width}_${i++}.png` });
}
// full page from the document top, with the header restored
await p.addStyleTag({ content: "header{visibility:visible !important}" });
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(1800);
await p.screenshot({ path: `${out}/${Number(width) < 800 ? "mobile" : "desktop"}.png`, fullPage: true });
console.log("shots", i, "+ full page");
await b.close();
