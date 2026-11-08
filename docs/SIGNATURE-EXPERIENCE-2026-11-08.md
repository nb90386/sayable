# Signature experience, 8 November 2026

Branch `sayable/signature-experience-vNext`, started from tag `backup/pre-signature-2026-11-08` (commit 3e16224). Older checkpoints are:

- `backup/pre-reconstruction-2026-11-08` (e416ec9), the Onest site with the original scanner
- `backup/original-site-2026-11-05`

Production was not touched.

The preview deployment is https://sayable-site-dxae9t3fh-neel-s-projects9.vercel.app. It is protected by Vercel Authentication and marked `noindex`.

## Latest screenshots, before and after

The after-captures are taken from the live preview: `docs/signature-captures/preview-desktop/sheet.png` and `preview-mobile/sheet.png`.

| Screenshot | Problem | Now |
|---|---|---|
| 01 hero washed out | The headline, lede and buttons faded during the scan. | The hero copy is at full opacity from the first frame, and a test asserts it. It scrolls away and never fades in place. The scanner is back, inside the document's own coordinates: one 1.6 s run on arrival, then scroll-driven. |
| 02 mono filename | `permit-application.pdf` was set in mono as decoration. | It is now muted Funnel Sans under a "Repair report" title. Mono is kept only for crawl logs, tag-tree nodes and cookie keys, using the system monospace. |
| 03 repair scene near black | A small PDF in a black void, with copy at low contrast. | The repair happens in morning light (#e7e2d7). The form is drawn at about 1.04 times the stage height ratio, close to full height. The copy is ink on light at full contrast, and the narration button is ink with paper text. |
| 04 scale scene abrupt black | A cut to black, tiny repeated tiles, a white serif, detached pills. | The dusk is gradual green-slate mineral (#1f2b2a), lit around the form, never black. About 118 cards of six recognisable kinds sit in projected depth with haze, and five are named. They sort along arcs into four piles. The serif and the chapter pills are gone. |

The nine earlier screenshots are covered in `docs/RECONSTRUCTION-2026-11-08.md`. Those fixes are kept: no 01–05 counters, no mono "Inbox" label, no click toggles, a concise comparison, a one-slider estimator, an honest report and three steps on How it works.

## The scanner: what was recovered

Original: `src/components/story/Opening.tsx` at e416ec9, with its CSS in `effects.css`.

Its mechanism was:

- a scan line whose position comes from scroll progress
- a structure overlay (`BrokenLayer`) clipped to the area above the line with `clip-path: inset(0 0 (1-s)*100% 0)`
- the reading path drawn by `stroke-dashoffset`
- the "Reading structure" label

That mechanism is reused, with three changes:

- The line and the clip now live inside the moving document, so the scan tracks the form through its 3D pose.
- The clip is an SVG `clipPath` updated without re-rendering.
- There is now a repair pass. The same line returns, with the fix above it and the problems below.

The opacity fade on the old hero copy (`1 - p*4`), which caused the washed-out look, was not carried over.

## Verification run on this build

- `tsc --noEmit` and `eslint src tests` pass (2 warnings, both unused variables). `next build` produces 29 routes.
- **Playwright on the production build: 78 passed, 4 skipped, 0 failed.** This includes:
  - axe WCAG A/AA checks on every route at desktop and mobile
  - the new hero test (full opacity, the scan runs, the skip link)
  - scroll and keyboard reach for every scene, and the header material in the dusk chapters
  - reduced-motion still figures
  - the estimator by keyboard, and navigation scroll restoration
- **Against the live preview** (OIDC header): 15 desktop tests passed, covering the hero, story, reduced motion, estimator, navigation, narration, the four PDF-checker tests, axe on /, /how-it-works and /contact, security headers and the contact form.
- **Scroll Craft `shoot`:** no dead scroll at 1440×900 (15.6 viewport-heights), at 390×844 (16.9) or under reduced motion (11.1).
- **Width sweep** at 1440, 1280, 1024, 768, 390 and 360: no horizontal overflow and no console errors.
- **Reverse scroll:** the frames match the forward frames.
- **Fast wheel**, down and back up on the dev server in headless Chrome: frame p50 was 16.7 ms and p95 33 ms, with 1 frame over 50 ms.
- **Lighthouse mobile** (simulated throttling) on the production build:

  | Route | Performance | Accessibility | Best practices | SEO | Other |
  |---|---|---|---|---|---|
  | / | 94–95 | 100 | | | LCP 2.9–3.1 s, TBT 40–50 ms, CLS ≈ 0 |
  | /how-it-works | 96 | 100 | 100 | 100 | |
  | /check | 96 | 100 | 100 | 100 | |

  The homepage first measured 63 with a TBT of 1,050 ms. The cause was React re-rendering the whole stage after the size and hero measurements. The fix memoises the stage and moves the scan line onto a transform.
- **Impeccable detect:** one finding left, nested cards. The paper documents are drawn as documents, and this was kept on purpose.
- **Taste Skill inspect:** findings fixed and defended are listed in the final report.

## Known limitations

- The story has not been tried on a real iPhone or Android phone. Headless Chromium does not reproduce iOS scroll and compositing.
- No screen-reader user has tried the new homepage.
- The narration clips have not been listened to by the owner. They were not re-recorded, and the repaired narration still matches the repaired form.
- The motion-blur trails and the scan particles were judged from still frames and the frame-time probe, not from a real-device recording.
- REA was not installed: it needs a global MCP configuration change and Node 26.12.1 or later. GSAP was evaluated and rejected (see `docs/dependency-decisions.md`).
- The contact form still has no delivery inbox configured. This blocker predates this work.
