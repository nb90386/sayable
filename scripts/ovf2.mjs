import { chromium } from "@playwright/test";
const b = await chromium.launch({ executablePath: process.env.PW_CHROME });
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
const r = await p.evaluate((sel) => {
  const root = document.querySelector(sel);
  return [...root.querySelectorAll("*")].filter(e => e.scrollWidth > e.clientWidth + 2 || e.getBoundingClientRect().right > 392).slice(0, 12).map(e => e.tagName + "." + String(e.className?.baseVal ?? e.className).slice(0, 50) + " r=" + Math.round(e.getBoundingClientRect().right) + " sw=" + e.scrollWidth + " cw=" + e.clientWidth);
}, process.argv[2] || "#two-readers");
console.log(r.join("\n")); await b.close();
