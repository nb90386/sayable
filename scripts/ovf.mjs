import { chromium } from "@playwright/test";
const b = await chromium.launch({ executablePath: process.env.PW_CHROME });
const p = await b.newPage({ viewport: { width: Number(process.argv[3]||390), height: 844 } });
await p.goto("http://localhost:3100" + (process.argv[2]||"/"), { waitUntil: "networkidle" });
const h = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 600) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(80); }
await p.waitForTimeout(1500);
const r = await p.evaluate(() => {
  const out = [];
  for (const s of document.querySelectorAll("main > *, footer, header")) out.push(s.tagName + "#" + (s.id || s.getAttribute("aria-labelledby")) + " sw=" + s.scrollWidth);
  out.push("doc sw=" + document.documentElement.scrollWidth);
  return out;
});
console.log(r.join("\n"));
await b.close();
