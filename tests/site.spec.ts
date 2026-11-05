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

test("lens and repair bench respond to keyboard", async ({ page }) => {
  test.setTimeout(30_000);
  await page.goto("/");
  const slider = page.getByLabel("Compare the visible page with its hidden structure");
  await slider.focus({ timeout: 5000 });
  const before = await slider.inputValue();
  await page.keyboard.press("ArrowRight");
  expect(await slider.inputValue()).not.toBe(before);
  await page.getByRole("radio", { name: "After repair" }).click({ timeout: 5000 });
  await expect(page.getByText("Heading level 1, Notice of Public Hearing.").first()).toBeVisible();
  await page.getByRole("button", { name: "Apply repair" }).click({ timeout: 5000 });
  await expect(page.getByRole("button", { name: "Undo repair" })).toBeVisible();
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
