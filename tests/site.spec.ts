import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/product",
  "/readiness-audit",
  "/check",
  "/how-it-works",
  "/verify",
  "/solutions",
  "/solutions/government",
  "/solutions/agencies",
  "/resources",
  "/resources/title-ii-rule-and-your-pdfs",
  "/resources/inventory-government-pdfs",
  "/resources/what-a-pdf-audit-tells-you",
  "/resources/why-automated-checks-miss-problems",
  "/about",
  "/security",
  "/contact",
  "/accessibility",
  "/privacy",
  "/terms",
  "/cookies",
];

for (const route of routes) {
  test(`${route} has no axe WCAG A/AA violations, one h1, no overflow, no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() => localStorage.setItem("sayable-consent", JSON.stringify({ v: 1, analytics: false, at: "test" })));
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
  // audio demonstration: one player, a version switch, transcripts behind a disclosure
  const play = page.getByRole("button", { name: "Hear the problem" });
  await expect(play).toBeVisible();
  await page.getByRole("radio", { name: "After repair", exact: true }).click();
  await expect(page.getByRole("button", { name: "Hear the difference" })).toBeVisible();
  await page.getByText("Read both transcripts").click();
  await expect(page.getByRole("list", { name: "Transcript, as posted" })).toContainText("Edit text. Blank.");
  await expect(page.getByRole("list", { name: "Transcript, after repair" })).toContainText("Applicant name. Edit text. Required.");
  // product workspace: arrow keys move between stages
  const discover = page.getByRole("tab", { name: "Discover" });
  await discover.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Repair" })).toHaveAttribute("aria-selected", "true");
  // audio file is served
  const res = await page.request.get("/audio/permit-before.mp3");
  expect(res.status()).toBe(200);
  // sample report: arrow keys move between findings
  const firstTab = page.getByRole("tab", { name: "Form fields have no names" });
  await firstTab.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("tab", { name: "Title is tagged as plain text" })).toHaveAttribute("aria-selected", "true");
  // estimator: moving a slider changes the arithmetic
  const pages = page.getByLabel("PDF pages on your public website");
  await pages.focus();
  const out = page.locator("output").first();
  const was = await out.textContent();
  const sentence = page.locator("[aria-labelledby=value-title] [aria-live=polite] > p").first();
  const before = await sentence.textContent();
  await page.keyboard.press("ArrowRight");
  await expect(out).not.toHaveText(was ?? "");
  // the plain-English explanation follows the slider
  await expect(sentence).not.toHaveText(before ?? "");
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

test("unknown routes return a branded 404 and /approach redirects to /verify", async ({ page, request }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("link", { name: /readiness audit/i }).first()).toBeVisible();
  const r = await request.get("/approach", { maxRedirects: 0 });
  expect(r.status()).toBe(308);
  expect(r.headers()["location"]).toContain("/verify");
});

test("every sitemap URL resolves", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);
  expect(urls.length).toBeGreaterThan(15);
  for (const u of urls) expect((await request.get(u)).status(), u).toBe(200);
});

test("security headers are sent", async ({ request }) => {
  const h = (await request.get("/")).headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["x-frame-options"]).toBe("DENY");
});

test("consent: analytics never loads before an explicit choice, and the choice persists", async ({ page }) => {
  const insights: string[] = [];
  page.on("request", (r) => r.url().includes("/_vercel/insights") && insights.push(r.url()));
  await page.goto("/", { waitUntil: "networkidle" });
  const banner = page.getByRole("region", { name: "Privacy choices" });
  await expect(banner).toBeVisible();
  await expect(banner.getByRole("button", { name: "Essential only" })).toBeVisible();
  await expect(banner.getByRole("button", { name: "Allow analytics" })).toBeVisible();
  expect(insights).toEqual([]);
  await banner.getByRole("button", { name: "Essential only" }).click();
  await expect(banner).toBeHidden();
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByRole("region", { name: "Privacy choices" })).toBeHidden();
  expect(insights).toEqual([]);
  // preferences can be changed later from the footer
  await page.getByRole("button", { name: "Privacy choices" }).click();
  const dialog = page.getByRole("dialog", { name: "Privacy choices" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("switch", { name: "Anonymous analytics" })).not.toBeChecked();
  await dialog.getByRole("switch", { name: "Anonymous analytics" }).check();
  await dialog.getByRole("button", { name: "Save choices" }).click();
  await expect(dialog.getByRole("status")).toHaveText("Saved.");
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("sayable-consent") ?? "{}"));
  expect(stored.analytics).toBe(true);
  // the site itself sets no cookies
  expect(await page.context().cookies()).toEqual([]);
});

test("a Global Privacy Control signal suppresses the banner and analytics", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "globalPrivacyControl", { value: true }));
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("region", { name: "Privacy choices" })).toBeHidden();
});

test("desktop nav dropdown opens from its trigger and closes on Escape", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.addInitScript(() => localStorage.setItem("sayable-consent", JSON.stringify({ v: 1, analytics: false, at: "test" })));
  await page.goto("/");
  const trigger = page.getByRole("navigation", { name: "Primary" }).getByRole("button", { name: "Product" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("link", { name: /Readiness Audit/ }).first()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
});

test("analytics loads only after consent, and never carries form contents", async ({ page }) => {
  const insights: string[] = [];
  page.on("request", (r) => {
    if (/_vercel\/insights|vercel-scripts/.test(r.url())) insights.push(r.url() + " " + (r.postData() ?? ""));
  });
  await page.addInitScript(() => localStorage.setItem("sayable-consent", JSON.stringify({ v: 1, analytics: true, at: "test" })));
  await page.goto("/contact", { waitUntil: "networkidle" });
  expect(insights.some((u) => /script/.test(u))).toBe(true);
  await page.getByLabel("Name").fill("Pat Example");
  await page.getByLabel("Work email").fill("pat@example.gov");
  await page.waitForTimeout(300);
  expect(insights.join(" ")).not.toContain("pat@example.gov");
  expect(insights.join(" ")).not.toContain("Pat Example");
});

test.describe("Check a PDF", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("sayable-consent", JSON.stringify({ v: 1, analytics: false, at: "test" })));
  });

  test("samples give real, distinct findings", async ({ page }) => {
    await page.goto("/check");
    const settled = () => expect(page.locator("section[aria-labelledby=check-result]")).toHaveCount(1);
    const statusOf = (title: string) => page.locator(".check-row", { has: page.locator("h3", { hasText: title }) }).locator(".check-status");

    await page.getByRole("button", { name: /Permit form, untagged/ }).click();
    await expect(page.locator("#check-result")).toBeFocused();
    await expect(statusOf("Tags")).toHaveText("Problem");
    await expect(statusOf("Real text")).toHaveText("Looks fine");
    await expect(statusOf("Form fields")).toHaveText("Problem");

    await page.getByRole("button", { name: /Water notice, scanned/ }).click();
    await expect(page.getByText("Sample: Water notice, scanned")).toBeVisible();
    await settled();
    await expect(statusOf("Real text")).toHaveText("Problem");

    await page.getByRole("button", { name: /Permit form, tagged/ }).click();
    await expect(page.getByText("Sample: Permit form, tagged")).toBeVisible();
    await settled();
    await expect(statusOf("Tags")).toHaveText("Looks fine");
    await expect(statusOf("Language")).toHaveText("Looks fine");
    await expect(statusOf("Tables")).toHaveText("A person must check");
    await expect(statusOf("Form fields")).toHaveText("A person must check");
    await expect(statusOf("Reading order")).toHaveText("A person must check");
    // never a compliance verdict
    await expect(page.getByText(/compliant|certified|passes WCAG/i)).toHaveCount(0);
  });

  test("your own file is read locally and never uploaded", async ({ page }) => {
    const sent: string[] = [];
    page.on("request", (r) => {
      if (r.method() !== "GET" || !r.url().startsWith(new URL(page.url() || "http://x").origin)) sent.push(`${r.method()} ${r.url()}`);
    });
    await page.goto("/check");
    sent.length = 0;
    const res = await page.request.get("/samples/permit-tagged.pdf");
    await page.setInputFiles("input[type=file]", { name: "my-permit.pdf", mimeType: "application/pdf", buffer: await res.body() });
    await expect(page.locator("#check-result")).toBeVisible();
    await expect(page.getByText("Your file: my-permit.pdf")).toBeVisible();
    expect(sent, sent.join("\n")).toEqual([]);
  });

  test("bad files get clear errors", async ({ page }) => {
    await page.goto("/check");
    const alert = page.locator(".check-error");
    await page.setInputFiles("input[type=file]", { name: "notes.pdf", mimeType: "application/pdf", buffer: Buffer.from("just some text") });
    await expect(alert).toContainText("not a PDF");
    await expect(alert).toBeFocused();
    await page.setInputFiles("input[type=file]", { name: "huge.pdf", mimeType: "application/pdf", buffer: Buffer.concat([Buffer.from("%PDF-1.7\n"), Buffer.alloc(26 * 1024 * 1024)]) });
    await expect(alert).toContainText("over 25 MB");
    await page.setInputFiles("input[type=file]", { name: "broken.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.7\n1 0 obj garbage") });
    await expect(alert).toBeVisible();
    await expect(page.locator("#check-result")).toHaveCount(0);
  });
});
