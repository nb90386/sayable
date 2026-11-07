// Builds the three sample PDFs used by /check. Fictional city, fictional form.
//   permit-untagged.pdf  a printed-to-PDF form with no tags, title or language
//   permit-tagged.pdf    the same form exported with tags, title and language
//   notice-scanned.pdf   a page that is only a picture of text, like a scan
// Run: PW_CHROME=<chromium path> node scripts/make-samples.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { PDFDocument, PDFHexString, PDFName } from "pdf-lib";
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
<div class="row"><div><label>Full name</label><div class="box" data-f="Applicant name"></div></div><div><label>Daytime phone</label><div class="box" data-f="Daytime phone"></div></div></div>
<div style="margin-top:12px"><label>Property address</label><div class="box" data-f="Property address"></div></div>
<h2>2. Type of work</h2>
<p class="checks"><span data-c="Type of work: new construction">New construction</span><span data-c="Type of work: addition">Addition</span><span data-c="Type of work: repair or alteration">Repair or alteration</span></p>
<h2>3. Fees</h2>
<table><thead><tr><th scope="col">Project value</th><th scope="col">Permit fee</th><th scope="col">Plan review</th></tr></thead>
<tbody><tr><td>Up to $5,000</td><td>$120</td><td>$60</td></tr><tr><td>$5,001 to $25,000</td><td>$310</td><td>$155</td></tr><tr><td>Over $25,000</td><td>$540</td><td>$270</td></tr></tbody></table>
<h2>4. Signature</h2>
<div class="row"><div><label>Applicant signature</label><div class="box" data-f="Applicant signature"></div></div><div><label>Date</label><div class="box" data-f="Date signed"></div></div></div>
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

/**
 * Lay real AcroForm fields over the drawn boxes. With names=false the fields
 * have no tooltip (TU), which is how many "fillable" city forms ship; with
 * names=true each field gets the spoken name of its printed label.
 */
async function addFields(file, boxes, names) {
  const doc = await PDFDocument.load(readFileSync(file));
  const form = doc.getForm();
  const page = doc.getPage(0);
  const H = page.getHeight();
  // Put TU on the field and on its widget: some readers, pdf.js included, only look at the widget.
  const name = (f, label) => {
    if (!names) return;
    const tu = PDFHexString.fromText(label);
    f.acroField.dict.set(PDFName.of("TU"), tu);
    for (const w of f.acroField.getWidgets()) w.dict.set(PDFName.of("TU"), tu);
  };
  boxes.forEach((b, i) => {
    const rect = { x: b.x, y: H - b.y - b.h, width: b.w, height: b.h, borderWidth: 0 };
    if (b.kind === "text") {
      const f = form.createTextField(`Text${i + 1}`);
      f.addToPage(page, rect);
      name(f, b.label);
    } else {
      const f = form.createCheckBox(`Check${i + 1}`);
      f.addToPage(page, rect);
      name(f, b.label);
    }
  });
  writeFileSync(file, await doc.save());
}

// Where the boxes land on a Letter page with 0.7in margins, in PDF points.
async function measure(page) {
  await page.emulateMedia({ media: "print" });
  await page.setViewportSize({ width: Math.round((8.5 - 1.4) * 96), height: 1200 });
  return page.evaluate(() => {
    const pt = (v) => v * 0.75, m = 0.7 * 72;
    const out = [];
    document.querySelectorAll("[data-f]").forEach((e) => {
      const r = e.getBoundingClientRect();
      out.push({ kind: "text", label: e.dataset.f, x: m + pt(r.left), y: m + pt(r.top), w: pt(r.width), h: pt(r.height) });
    });
    document.querySelectorAll("[data-c]").forEach((e) => {
      const r = e.getBoundingClientRect();
      out.push({ kind: "check", label: e.dataset.c, x: m + pt(r.left), y: m + pt(r.top + (r.height - 13) / 2), w: pt(13), h: pt(13) });
    });
    return out;
  });
}

const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || undefined });
const page = await browser.newPage();

await page.setContent(form(""));
const boxes = await measure(page);
await page.pdf({ path: "public/samples/permit-untagged.pdf", format: "Letter", tagged: false, outline: false, printBackground: true });
await addFields("public/samples/permit-untagged.pdf", boxes, false);

await page.setContent(form("Residential permit application, City of Alder Creek"));
await page.pdf({ path: "public/samples/permit-tagged.pdf", format: "Letter", tagged: true, outline: true, printBackground: true });
await addFields("public/samples/permit-tagged.pdf", boxes, true);
await page.emulateMedia({ media: "screen" });

await page.setViewportSize({ width: 816, height: 1056 });
await page.setContent(notice);
const png = await page.screenshot({ type: "jpeg", quality: 72 });
await page.setContent(
  `<!doctype html><html><head><style>@page{size:Letter;margin:0}body{margin:0}img{width:8.5in;height:11in;display:block}</style></head><body><img src="data:image/jpeg;base64,${png.toString("base64")}"></body></html>`,
);
await page.pdf({ path: "public/samples/notice-scanned.pdf", format: "Letter", tagged: false, printBackground: true });

await browser.close();
console.log("samples written to public/samples");
