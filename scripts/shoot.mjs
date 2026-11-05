// Usage: node scripts/shoot.mjs <path> <outDir> [widths=1440,390] [fullPage=1]
import { chromium } from "@playwright/test";
const [path = "/", out = "shots", w = "1440,390", full = "1"] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || undefined });
for (const width of w.split(",").map(Number)) {
  const page = await browser.newPage({ viewport: { width, height: width < 800 ? 844 : 900 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto("http://localhost:3100" + path, { waitUntil: "networkidle" });
  // scroll through so in-view effects run
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 500) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(120); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2600);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  const name = `${out}/${path.replace(/\W+/g, "_") || "home"}-${width}.png`;
  await page.screenshot({ path: name, fullPage: full === "1" });
  console.log(name, "overflowX=", overflow, errors.length ? "ERRORS: " + errors.join(" | ") : "");
  await page.close();
}
await browser.close();
