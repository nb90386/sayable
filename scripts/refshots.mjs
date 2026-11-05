// Research captures of external reference sites: node scripts/refshots.mjs <outDir> <name=url>...
// Viewport shots at a few scroll depths, desktop and mobile. For design research only; never shipped.
import { chromium } from "@playwright/test";
const [out, ...pairs] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.PW_CHROME || undefined });
for (const pair of pairs) {
  const [name, url] = pair.split("=");
  for (const [w, h, depths] of [
    [1440, 900, [0, 1, 2, 3, 4, 6, 8]],
    [390, 844, [0, 1, 3]],
  ]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    try {
      await p.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await p.waitForTimeout(3500);
      for (const d of depths) {
        await p.evaluate((y) => window.scrollTo(0, y), d * h);
        await p.waitForTimeout(1200);
        await p.screenshot({ path: `${out}/${name}-${w}-${d}.png` });
      }
      console.log("ok", name, w);
    } catch (e) {
      console.log("fail", name, w, String(e).slice(0, 120));
    }
    await p.close();
  }
}
await b.close();
