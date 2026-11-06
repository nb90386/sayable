// Usage: node scripts/sweep.mjs <outDir> [widths] [routes...]
import { chromium } from "@playwright/test";
const [out = "shots", w = "1440,390", ...given] = process.argv.slice(2);
const routes = given.length ? given : ["/", "/product", "/readiness-audit", "/how-it-works", "/verify", "/solutions", "/solutions/government", "/solutions/agencies", "/resources", "/resources/inventory-government-pdfs", "/resources/what-a-pdf-audit-tells-you", "/resources/why-automated-checks-miss-problems", "/about", "/security", "/contact", "/accessibility", "/privacy", "/terms", "/cookies", "/nope"];
const b = await chromium.launch({ executablePath: process.env.PW_CHROME || undefined });
for (const width of w.split(",").map(Number)) {
  const ctx = await b.newContext({ viewport: { width, height: width < 800 ? 844 : 900 } });
  await ctx.addInitScript(() => localStorage.setItem("sayable-consent", JSON.stringify({ v: 1, analytics: false, at: "x" })));
  for (const r of routes) {
    const p = await ctx.newPage();
    const errs = [];
    p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 160)));
    p.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));
    await p.goto("http://localhost:3100" + r, { waitUntil: "networkidle" });
    const h = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 700) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(60); }
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(400);
    const info = await p.evaluate(() => ({ ovf: document.documentElement.scrollWidth - innerWidth, h1: document.querySelectorAll("h1").length, em: document.querySelectorAll("main em, main i").length, hashLinks: [...document.querySelectorAll('a[href="#"]')].length }));
    const name = `${out}/${r.replace(/\W+/g, "_") || "home"}-${width}.png`;
    await p.screenshot({ path: name, fullPage: true });
    console.log(width, r, JSON.stringify(info), errs.length ? "ERR " + errs.join(" | ") : "");
    await p.close();
  }
  await ctx.close();
}
await b.close();
