// Plays the "before" narration in a real browser and confirms playback, highlight and pause.
import { chromium } from "@playwright/test";
const b = await chromium.launch({ executablePath: process.env.PW_CHROME || undefined, args: ["--autoplay-policy=no-user-gesture-required"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
const btn = p.getByRole("button", { name: "Hear the problem" });
await btn.scrollIntoViewIfNeeded();
await btn.click();
await p.waitForTimeout(3500);
const state = await p.evaluate(() => {
  const a = document.querySelectorAll("audio")[0];
  const on = document.querySelector('.caption-line');const hl = document.querySelector('.hl.is-on, .hl-fixed.is-on');
  return { t: a.currentTime.toFixed(2), paused: a.paused, err: a.error && a.error.code, caption: on ? on.textContent : null, sheetHighlight: !!hl, pressed: document.querySelector('button[aria-pressed="true"]')?.textContent };
});
console.log(JSON.stringify(state));
await p.getByRole("button", { name: "Pause" }).click();
await p.waitForTimeout(300);
console.log("after pause:", await p.evaluate(() => document.querySelectorAll("audio")[0].paused));
await b.close();
