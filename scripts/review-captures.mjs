import { chromium } from "@playwright/test";
const OUT = ".impeccable/review/pages";
const routes = { "readiness-audit": "/readiness-audit", verify: "/verify", "solutions-government": "/solutions/government", "solutions-agencies": "/solutions/agencies", product: "/product", "how-it-works": "/how-it-works", resources: "/resources", "resources-why-automated-checks-miss-problems": "/resources/why-automated-checks-miss-problems", about: "/about", security: "/security", privacy: "/privacy", cookies: "/cookies", "404": "/this-page-does-not-exist" };
const b = await chromium.launch({ executablePath: process.env.PW_CHROME });
const ctxFor = async (width) => {
  const c = await b.newContext({ viewport: { width, height: width < 800 ? 844 : 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  await c.addInitScript(() => localStorage.setItem("sayable-consent", JSON.stringify({ v: 1, analytics: false, at: "x" })));
  return c;
};
const settle = async (p) => {
  await p.evaluate(() => document.fonts.ready);
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 600) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(50); }
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(400);
};
for (const [name, width] of [["desktop", 1440], ["mobile", 390]]) {
  const c = await ctxFor(width);
  for (const [slug, r] of Object.entries(routes)) {
    const p = await c.newPage();
    await p.goto("http://localhost:3100" + r, { waitUntil: "networkidle" });
    await settle(p);
    await p.screenshot({ path: `${OUT}/${slug}-${name}.png`, fullPage: true });
    await p.close();
  }
  await c.close();
}
const c = await ctxFor(1440);
for (const slug of ["readiness-audit", "verify"]) {
  const p = await c.newPage();
  await p.goto("http://localhost:3100" + routes[slug], { waitUntil: "networkidle" });
  await settle(p);
  await p.keyboard.press("Tab"); // skip link
  for (let i = 0; i < 9; i++) await p.keyboard.press("Tab"); // past header nav and CTA
  await p.waitForTimeout(200);
  const focused = await p.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 60));
  await p.screenshot({ path: `${OUT}/focus-${slug}.png` });
  console.log("focus", slug, "->", focused);
  await p.close();
}
const p = await c.newPage();
await p.goto("http://localhost:3100/contact", { waitUntil: "networkidle" });
await settle(p);
await p.getByRole("button", { name: /send request/i }).click();
await p.waitForTimeout(400);
console.log("after empty submit, focus on:", await p.evaluate(() => document.activeElement?.tagName + " " + (document.activeElement?.textContent || "").trim().slice(0, 60)));
await p.screenshot({ path: `${OUT}/contact-form-error-desktop.png`, fullPage: true });
await b.close();
