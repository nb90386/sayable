# Launch checklist

Status as of 2026-11-06, sprint branch `sayable/premium-production-sprint-2026-11-05` ("make the business impossible to misunderstand"). "Verified" means a check ran in this sprint. The 2026-11-05 results are kept below where still relevant.

## Verified this sprint (2026-11-06)
- [x] `tsc --noEmit`, `eslint src tests`, `next build` pass (29 routes; new `/check` and `/resources/title-ii-rule-and-your-pdfs`).
- [x] Playwright + axe against the production build at 1440 and 390: see "Final numbers" below. New tests: the three sample PDFs give real, distinct findings; a visitor's own file is read with no upload (no non-GET or cross-origin request during the check); non-PDF, oversize and damaged files get clear errors; estimator explanation updates by keyboard.
- [x] The in-browser checker runs under the production CSP (worker self-hosted at `/pdfjs/`), no console errors.
- [x] Scroll Craft verifier, homepage 1440: no dead scroll (`scrollcraft/builds/sayable-apple/lab/sprint3-desktop`, not committed).
- [x] Audio: Kokoro-82M, Apache-2.0 weights and code, voice `af_heart`; durations match cue JSON within 0.5 ms (see `docs/AUDIO.md`). Not yet listened to by a person.
- [x] Legal facts, enforcement examples, competitor statements and price benchmarks checked against primary sources (`docs/research/RESEARCH-NOTES.md`).

## Launch blockers (must resolve before pointing customers at the site)
1. **No working lead path.** No destination is configured: no `CONTACT_WEBHOOK_URL`, no `NEXT_PUBLIC_CONTACT_EMAIL`, no Vercel env vars at all. The form honestly says nothing was sent. Fastest fix: create the business inbox, then `vercel env add NEXT_PUBLIC_CONTACT_EMAIL` (Preview and Production) and redeploy; the form then offers a pre-filled email. Full fix: also set `CONTACT_WEBHOOK_URL` (+ `CONTACT_WEBHOOK_SECRET`) to a receiving service you control, and send one test request end to end.
2. **Legal pages are review drafts.** Missing: legal entity name, registered address, privacy contact email, retention period, webhook provider, governing law. The strategy review notes the founder is a minor, so contracts likely need an LLC with an adult officer. Lawyer review needed.
3. **Analytics is not switched on** in the Vercel dashboard (code loads it only after consent).
4. **Canonical domain.** Set `NEXT_PUBLIC_SITE_URL` when a custom domain exists.
5. **Founder to listen to both narration clips** and approve the voice.

## Known risks
- Mobile Lighthouse LCP on the homepage is now 3.1 s (simulated slow 4G): the longer hero sentence is the LCP element and repaints on the web-font swap (FCP 1.2 s). `/check` 2.6 s, `/product` 2.5 s. Option: `display: "optional"` on the fonts, a typography decision.
- The free check is structural only. It does not run the full PDF/UA rule set (veraPDF/PAC do), cannot judge reading order, alt-text quality or table header associations, and the results page says so.
- Upload-for-repair (Stage B) is designed, not built (`docs/ENG-REVIEW.md`). There is no upload endpoint.
- The repair pipeline in the spec is not built; the Python experiments are research prototypes. The site says repairs are done by people with software "we are still testing".
- The rate limiter is per instance and in memory. CSP keeps `'unsafe-inline'` for scripts.
- No screen-reader user testing yet. Persona tests were simulated by a model, not real users.
- NFB v. DOJ (D. Md. 1:26-cv-02007) asks to restore the earlier Title II dates; no ruling found as of 2026-11-06. Recheck before each sale.

## Founder decisions still open
- **Price.** Not published. Strategy hypotheses (unapproved): audit $2,500 up to ~2,500 PDFs, $4,500 up to ~10,000; repair ~$5/standard page, $12–15 forms/tables/scans, $750 minimum. Verified market points: WA contract 02024 medians ~$4.70 simple / $6.00 complex per page for small jobs; Chandler, AZ (2025) $5 standard, $10 forms, $23.15 OCR.
- **Agenda Desk** is now labelled a limited pilot with turnaround agreed in writing; confirm whether to offer it at all.
- **Primary segment.** Site copy targets cities of 50,000+; the strategy picks California 50k–250k cities first for sales.

## Independent design review (Impeccable finish reviewer, 2026-11-05)
Fixed in this sprint: the unapproved price, the phone layout of the /verify comparison (now stacked below md), scroll hints on wide tables, one heading weight for all section headings, Spec lists at body size without decorative blue squares, eyebrow and mono labels removed (404, contact, legal contents), the legal draft note no longer uses a side stripe, the 404 sheet redrawn with an under-page and an ember "page not found" region, and the repaired permit sheet added to /product.

Still open (next design pass): give each /how-it-works stage its own composition instead of five identical rows; turn the /product services into one comparison table; soften the hard paper-to-night cuts on supporting pages; show a sample report cover on /readiness-audit.
