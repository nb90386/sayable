import { chromium } from "@playwright/test";
const b = await chromium.launch({ executablePath: process.env.PW_CHROME });
for (const rm of ["no-preference", "reduce"]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.emulateMedia({ reducedMotion: rm });
  await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 700) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(60); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(1500);
  // visibility audit: any section with computed opacity 0 or visibility hidden?
  const hidden = await p.evaluate(() => [...document.querySelectorAll("main section")].map(s => { const cs = getComputedStyle(s); return s.getAttribute("aria-labelledby") + ":" + cs.opacity + "/" + cs.visibility; }));
  console.log(rm, hidden.join(" "));
  await p.screenshot({ path: process.argv[2] + "/full-" + rm + ".png", fullPage: true });
  await p.close();
}
await b.close();
