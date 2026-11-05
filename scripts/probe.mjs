import { chromium } from "@playwright/test";
const b = await chromium.launch({ executablePath: process.env.PW_CHROME });
for (const w of [1440, 1024, 390]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  const r = await p.evaluate(() => {
    const sec = document.querySelector("[aria-labelledby=lc-title]");
    const h3 = sec.querySelector("article h3");
    const art = h3.closest("article");
    const cs = getComputedStyle(sec);
    return { secBg: cs.backgroundColor, artW: art.clientWidth, h3sw: h3.scrollWidth, h3cw: h3.clientWidth, artBg: getComputedStyle(art).backgroundColor };
  });
  console.log(w, JSON.stringify(r));
  await p.close();
}
await b.close();
