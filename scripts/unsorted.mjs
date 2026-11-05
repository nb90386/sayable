// Capture the inventory in its unsorted (tangled) state: node scripts/unsorted.mjs <outDir> <width>
import { chromium } from "@playwright/test";
const [out = ".", width = "1440"] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.PW_CHROME || undefined });
const p = await b.newPage({ viewport: { width: Number(width), height: Number(width) < 800 ? 844 : 900 } });
await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await p.addStyleTag({ content: "header{visibility:hidden !important}" });
const sec = p.locator("section[aria-labelledby=inv-title]");
await sec.evaluate((el) => el.scrollIntoView({ block: "start" }));
await p.waitForTimeout(1800); // let it auto-sort first
const toggle = p.locator("section[aria-labelledby=inv-title] button[aria-pressed]");
await toggle.scrollIntoViewIfNeeded();
await p.waitForTimeout(1500);
if ((await toggle.getAttribute("aria-pressed")) === "true") await toggle.click();
await sec.evaluate((el) => el.scrollIntoView({ block: "start" }));
await p.waitForTimeout(1800);
await sec.screenshot({ path: `${out}/s${width}_2_unsorted.png` });
await b.close();
console.log("ok", width);
