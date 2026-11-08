# Creative reconstruction, 8 November 2026

Branch `sayable/creative-reconstruction-2026-11-08`, from backup tag `backup/pre-reconstruction-2026-11-08` (commit `e416ec9`). Production was not touched.

## The nine screenshots, before and after

| # | What was wrong | What it is now |
|---|---|---|
| 01 Hero | Huge heavy grotesk headline, "screen readers" in bright blue, a four-line paragraph with the deadline squeezed in, a small document floating in white | Two sentences. The headline is "Make your city's PDFs readable for everyone." in Newsreader, with no highlighted word. One supporting sentence says what Sayable does. The deadline is a one-line link to its own section. The permit form lies tilted at full width below, cropped by the fold, and is the first thing the story moves. |
| 02 As posted / After repair toggle | The visitor had to click to see the difference | No toggle. Scrolling darkens the page and draws the broken structure onto the form. Later the same form comes back and the structure turns from vermilion to viridian. Narration is optional, with a transcript. |
| 03 Orange 01–05 counters | Decorative numbers in mono | Removed everywhere: the homepage, product, verify, readiness audit and agencies pages. Numbers remain only where order is the content: the document's reading order and the audit request steps. |
| 04 Mono "Inbox" label | Mono used as decoration | The section was removed. The `.tag` style is now Public Sans. Mono is kept for file names and accessible-name values only. |
| 05 Five clickable stages | Giant headline, pill tabs, white space, roadmap shown as if available | One pinned scroll story with six scenes. Each scene says what is available now: free check, Readiness Audit, repair service. The product page lists the stages by availability, with "In development" and "Planned" marked by a hollow dot. |
| 06 Acrobat / ChatGPT wall | Two long paragraphs and a dense table | One heading, "A checker looks at one file. Your city has thousands.", one sentence that credits Acrobat, PAC, ChatGPT, CommonLook and Equidox, and a six-row ledger in which Sayable loses on cost. The full task table moved to `/product#compare`. |
| 07 Estimator | Five sliders and three explanations at once | "A city with 10,000 pages of PDFs on its website." One slider, two results with range bars, and the other assumptions behind "Change the assumptions". Hours only, never savings. |
| 08 Sample report | Dashboard layout, blank space, a "Checked" pill | The report explorer was deleted. In the story, the report is a paper sheet that slides over the form's edge: what was wrong (struck through), what changed, how it was re-checked, and "Not claimed: legal certification of compliance". There is no stamp or pill. |
| 09 How it works rows | Five identical numbered rows, long copy | Three buyer steps, each a different composition: the request as a small form, the crawl log and sorted piles at full width, and three choices with availability. Technical detail for IT and procurement sits behind four disclosures. |

## Skills and tools actually used

- **Apple Design** (emilkowalski/skills), installed to `~/.claude/skills/apple-design`. It shaped:
  - critically damped springs for the changing numbers
  - press at 0.97
  - a translucent header that changes material over dark chapters, with a reduced-transparency fallback
  - tracking that tightens with size
  - animating from the current scroll value, so every scene reverses cleanly
- **Scroll Craft** (nateherkai/scroll-craft), installed to `~/.claude/skills/scroll-craft`.
  - Page grammar: split stage was rejected, so this is an adapted filmic one-shot that hands off to editorial acts.
  - The signature move and the fingerprint row in `scrollcraft/FINGERPRINTS.md`.
  - The `shoot.mjs` harness. A local copy skips the engine-ready wait, because this is a Next.js page. It reports no dead scroll at 1440 or 390.
- **Impeccable** detector, run on `/`, `/how-it-works`, `/product` and `/readiness-audit`. Its cream-palette and line-length findings were fixed. The nested-card findings are drawings of real artifacts (a request form, report pages) and were kept.
- **Taste Skill** `inspect.mjs`, a browser inspector at 1440, 768 and 390.
  - Fixed: three-line headlines, small text, text against the phone edge, cream ground, line length.
  - Defended:
    - mono for file names
    - shadows on paper objects
    - no stock video
    - eyebrow-style labels above estimator figures, which are data labels
    - the "pinned text" warnings, which count opacity-0 copy in the pinned stage
- **Motion** (already installed, `motion` 14.9): scroll-linked transforms, the spring for the changing numbers, presence on the existing menus.
- **React ViewTransition** (React 19.3) for route changes, following the Next 16.4 view-transitions guide in `node_modules/next/dist/docs`.
- Not used:
  - **Transitions.dev** recipes were not installed. The site's existing transition tokens already match its timing guidance.
  - **REA** was not needed.
  - No GSAP, Lenis or WebGL was added.
- The reference sites (Apple, Miligram, RTM Audio and the others) were not browsed in this session. The direction comes from the brief's description of them and the owner's screenshots.

## Verification (all run)

- `tsc --noEmit`, `eslint src tests` and `next build` (29 routes) pass.
- Playwright on the production build: 76 passed, 4 skipped. The skipped tests are desktop-only checks skipped on the mobile project, plus two skipped by design. New tests:
  - the story advances by scroll and the chapter rail
  - narration is opt-in with a transcript
  - reduced motion gets still figures
  - the estimator works by keyboard
  - navigation starts at the top and Back restores the position
- axe WCAG 2.2 AA runs on every route at both widths.
- Width sweep of the homepage at 1440, 1280, 1024, 768, 390 and 360 shows no horizontal overflow and no console errors.
- Lighthouse mobile (simulated throttling), last runs:
  - `/`: performance 90, accessibility 100, CLS 0
  - `/how-it-works`: performance 89, accessibility 100
  - `/check`: performance 92, accessibility 100
  - Largest contentful paint stays at about 3.5 s against a first paint of 1.2 s. Switching both fonts to `display: optional` did not change it, so it is not a font-swap delay. It is not yet diagnosed.

## Known limitations

- The story has not been tried on a real phone. Headless Chrome cannot reproduce iOS scroll and compositing.
- No screen-reader user has tried the new homepage.
- The narration clips have still not been listened to by the owner.
- Largest contentful paint is about 3.5 s under simulated slow 4G, as above.
