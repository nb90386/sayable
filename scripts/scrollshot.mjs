// Viewport screenshots while scrolling through one section: node scripts/scrollshot.mjs <selector> <outDir> <width> <steps>
import { chromium } from "@playwright/test";
const [sel = "#lc-title", out = ".", width = "390", steps = "4"] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.PW_CHROME || undefined });
const p = await b.newPage({ viewport: { width: Number(width), height: Number(width) < 800 ? 844 : 900 } });
await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
const top = await p.evaluate((s) => document.querySelector(s).closest("section").getBoundingClientRect().top + scrollY, sel);
const h = await p.evaluate((s) => document.querySelector(s).closest("section").offsetHeight, sel);
for (let i = 0; i < Number(steps); i++) {
  await p.evaluate((y) => scrollTo(0, y), top + (h * (i + 0.6)) / (Number(steps) + 0.5));
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}/scroll${width}_${i}.png` });
}
await b.close();
console.log("done");
