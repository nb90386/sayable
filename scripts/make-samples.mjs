// Builds the three sample PDFs used by /check. Fictional city, fictional form.
//   permit-untagged.pdf  a printed-to-PDF form with no tags, title or language
//   permit-tagged.pdf    the same form exported with tags, title and language
//   notice-scanned.pdf   a page that is only a picture of text, like a scan
// Run: PW_CHROME=<chromium path> node scripts/make-samples.mjs
import { chromium } from "playwright";

const form = (title) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title>
<style>
  @page { size: Letter; margin: 0.7in; }
  body { font: 11pt/1.4 Helvetica, Arial, sans-serif; color: #12151b; }
  header { display: flex; justify-content: space-between; border-bottom: 2px solid #12151b; padding-bottom: 8px; }
  h1 { font-size: 18pt; margin: 18px 0 4px; }
  h2 { font-size: 12pt; margin: 22px 0 8px; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  label { display: block; font-size: 9pt; color: #535b69; margin-bottom: 3px; }
  .box { border: 1px solid #9aa1ad; height: 26px; border-radius: 3px; }
  .checks span { display: inline-block; margin-right: 18px; }
  .checks span::before { content: ""; display: inline-block; width: 11px; height: 11px; border: 1px solid #535b69; margin-right: 6px; vertical-align: -1px; }
  table { border-collapse: collapse; width: 100%; font-size: 10pt; }
  th, td { border: 1px solid #c9ced8; padding: 5px 8px; text-align: left; }
  footer { margin-top: 28px; font-size: 9pt; color: #535b69; }
</style></head><body>
<header><strong>City of Alder Creek</strong><span>Building Division</span></header>
<h1>Residential permit application</h1>
<p>Complete all sections and sign below. Applications missing a signature will be returned.</p>
<h2>1. Applicant</h2>
<div class="row"><div><label>Full name</label><div class="box"></div></div><div><label>Daytime phone</label><div class="box"></div></div></div>
<div style="margin-top:12px"><label>Property address</label><div class="box"></div></div>
<h2>2. Type of work</h2>
<p class="checks"><span>New construction</span><span>Addition</span><span>Repair or alteration</span></p>
<h2>3. Fees</h2>
<table><thead><tr><th scope="col">Project value</th><th scope="col">Permit fee</th><th scope="col">Plan review</th></tr></thead>
<tbody><tr><td>Up to $5,000</td><td>$120</td><td>$60</td></tr><tr><td>$5,001 to $25,000</td><td>$310</td><td>$155</td></tr><tr><td>Over $25,000</td><td>$540</td><td>$270</td></tr></tbody></table>
<h2>4. Signature</h2>
<div class="row"><div><label>Applicant signature</label><div class="box"></div></div><div><label>Date</label><div class="box"></div></div></div>
<footer>Sample document for demonstration. The City of Alder Creek is fictional.</footer>
</body></html>`;

const notice = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
  body { margin: 0; background: #f4f1ea; font: 15px/1.5 Georgia, serif; color: #1d1d1d; }
  .page { width: 816px; height: 1056px; padding: 70px; box-sizing: border-box; filter: contrast(0.92) blur(0.3px); transform: rotate(-0.6deg); }
  h1 { font: bold 24px Helvetica, Arial, sans-serif; letter-spacing: 0.04em; }
</style></head><body><div class="page">
<p>CITY OF ALDER CREEK · PUBLIC WORKS</p>
<h1>NOTICE OF WATER SERVICE INTERRUPTION</h1>
<p>Water service on Larch Street between 4th Avenue and 9th Avenue will be shut off on Tuesday from 9:00 a.m. to 3:00 p.m. for main replacement.</p>
<p>Please store drinking water in advance. Residents who need assistance or bottled water delivery should call the Public Works office before Monday at noon.</p>
<p>Sample document for demonstration. The City of Alder Creek is fictional.</p>
</div></body></html>`;

const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || undefined });
const page = await browser.newPage();

await page.setContent(form(""));
await page.pdf({ path: "public/samples/permit-untagged.pdf", format: "Letter", tagged: false, outline: false, printBackground: true });

await page.setContent(form("Residential permit application, City of Alder Creek"));
await page.pdf({ path: "public/samples/permit-tagged.pdf", format: "Letter", tagged: true, outline: true, printBackground: true });

await page.setViewportSize({ width: 816, height: 1056 });
await page.setContent(notice);
const png = await page.screenshot({ type: "jpeg", quality: 72 });
await page.setContent(
  `<!doctype html><html><head><style>@page{size:Letter;margin:0}body{margin:0}img{width:8.5in;height:11in;display:block}</style></head><body><img src="data:image/jpeg;base64,${png.toString("base64")}"></body></html>`,
);
await page.pdf({ path: "public/samples/notice-scanned.pdf", format: "Letter", tagged: false, printBackground: true });

await browser.close();
console.log("samples written to public/samples");
