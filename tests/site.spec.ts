import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/product", "/how-it-works", "/solutions", "/approach", "/contact", "/accessibility", "/privacy"];

for (const route of routes) {
  test(`${route} has no axe WCAG A/AA violations, one h1, no overflow, no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.length} × ${v.nodes[0]?.target.join(" ")}`);
    expect(summary, summary.join("\n")).toEqual([]);
    await expect(page.locator("h1")).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test("internal links resolve", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const hrefs = await page.locator("a[href^='/']").evaluateAll((as) => as.map((a) => a.getAttribute("href")!.split("#")[0]!));
    hrefs.forEach((h) => seen.add(h || "/"));
  }
  for (const h of seen) {
    const res = await request.get(h);
    expect(res.status(), h).toBe(200);
  }
});

test("signature interactions work by keyboard", async ({ page }) => {
  test.setTimeout(30_000);
  await page.goto("/");
  // audio demonstration: both players have named, keyboard-operable controls and transcripts
  const problem = page.getByRole("button", { name: "Hear the problem" });
  const difference = page.getByRole("button", { name: "Hear the difference" });
  await expect(problem).toBeVisible();
  await expect(difference).toBeVisible();
  await problem.focus();
  await expect(problem).toBeFocused();
  await expect(page.getByRole("list", { name: "Transcript, as posted" })).toContainText("Edit text. Blank.");
  await expect(page.getByRole("list", { name: "Transcript, after repair" })).toContainText("Applicant name. Edit text. Required.");
  // audio file is served
  const res = await page.request.get("/audio/permit-before.m4a");
  expect(res.status()).toBe(200);
  // sample report: arrow keys move between findings
  const firstTab = page.getByRole("tab", { name: "Comment form fields have no names" });
  await firstTab.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("tab", { name: "Fee table has no header cells" })).toHaveAttribute("aria-selected", "true");
  // estimator: moving a slider changes the arithmetic
  const pages = page.getByLabel("PDF pages on your public site");
  await pages.focus();
  const out = page.locator("output").first();
  const was = await out.textContent();
  await page.keyboard.press("ArrowRight");
  await expect(out).not.toHaveText(was ?? "");
});

test("contact form validates and never fakes success", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /send|request/i }).last().click();
  await expect(page.locator("[aria-invalid='true']").first()).toBeVisible();
});

test("mobile menu opens, traps Escape, and closes", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toBeHidden();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});
