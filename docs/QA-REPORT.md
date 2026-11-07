# Sayable site QA report (report-only)

- **Date:** 2026-11-06. **Target:** http://localhost:3100 (live `next dev`). **Branch:** `sayable/premium-production-sprint-2026-11-05`, HEAD `86b10db`, working tree dirty (10 modified files, not touched by QA).
- **Mode:** report-only. No source edits, no commits. Probes were black-box, run in a real headless Chromium via Playwright.
- **Viewports:** 1440x900 and 390x844 (mobile + touch for the menu).
- **Pages:** `/`, `/check`, `/product`, `/how-it-works`, `/readiness-audit`, `/solutions/government`, `/verify`, `/security`, `/privacy`, `/contact?topic=audit|repair|pilot|bogus`.
- **Evidence:** screenshots in `.impeccable/review/sprint3/qa/` (file names are cited below); scripts in `scripts/tmp/qa-*.mjs`.
- **Caveat:** the dev server was serving edits made during the run. One home link label changed between two passes ("Guides for city teams" became "The rule and your PDFs, in plain English"). Re-check copy findings against the final build.

## What passed (checked, nothing material found)

- **Console:** no console errors or page errors on any of the 22 page/viewport loads. The only output was Motion's reduced-motion warning, which my reduced-motion context triggered.
- **Links:** every same-origin link on the tested pages returned 200. The 5 external links (ada.gov, govinfo.gov) were not fetched.
- **Layout:** no horizontal page scroll at 390 on any page. The wide tables on /product and /privacy sit in focusable, labelled `role=region` scrollers.
- **Italics:** no text with computed `font-style: italic` on any tested page at either width.
- **Audio demo:** play, pause, the As posted / After repair switch (`permit-before.mp3` → `permit-after.mp3`), "Play from the start", and the transcripts disclosure all work by keyboard.
- **Estimator:** the arithmetic matches the stated method at the defaults and at the extremes (40,000 pages × 30% gives 12,000 pages and 1,100 to 3,100 h). Arrow, PageUp, Home and End all work on all 5 sliders, and the focus ring is visible (2px blue).
- **Nav:** desktop dropdowns open with Enter, Tab moves into the items, Esc closes and returns focus, and an outside click closes them. The mobile menu moves focus in, traps Tab, closes on Esc and returns focus to "Open menu", locks body scroll, and closes on navigation.
- **Contact validation:** an empty submit shows a focused error summary ("4 things need attention") plus inline `aria-invalid` and `aria-describedby` messages. A bad email gets its own message. `?topic=` preselects the right radio (audit, repair, pilot).
- **Contact submit:** a valid submit gets a 503 `not_configured` response. The page says "Online requests aren't connected yet, so nothing was sent.", keeps the values, offers "Copy your message", and moves focus to the status.
- **/check bad files:** `.txt` → "That file is not a PDF". A renamed `.txt` → "not a PDF" (content sniffing works). A PNG → "not a PDF". A 0-byte `.pdf` → "That file is empty." A truncated `.pdf` → "That PDF looks damaged…". No POST requests were made, which matches "never uploaded".

## Findings (severity-ranked)

| # | Sev | Page | What | Evidence | Suggested fix |
|---|-----|------|------|----------|---------------|
| 1 | High | /security, /contact | There is no working way to reach Sayable. /security says to report vulnerabilities "through the contact form", says "We do not have a dedicated security email yet", and invites security questionnaires. The form is not connected, and the submit state only says "send once our inbox is live", with no email or phone. | `contact-repair-submitted-390.png`; /security text; POST /api/contact → 503 `not_configured` | Publish one monitored email address (or `security.txt`) now and show it in the not-connected state and on /security. Otherwise hide the form CTAs until the webhook is live. |
| 2 | High | / | The count of unnamed fields contradicts itself. The hero says "five fields with no name". The resident story says she hears "edit text, blank" **five** times. The "As posted" transcript and audio have **four** "Edit text. Blank." lines, the "What she hears" card shows three, and the evidence report says "**Four** text fields on page 1 have empty accessible names". | `home-first-screen-1440.png`, `home-transcript-1440.png`, `home-edge-cost-title-1440.png`, `strip` of trust section | Pick one model of the sample form (for example, 4 text fields plus 1 check-box group = 5 issues) and make the hero, story, transcript, card and report say the same thing. Precision is the pitch. |
| 3 | High | /verify, /solutions/government, /how-it-works, / | The pages disagree about what software does today, and some overclaim. /product: "repair them by hand with help from software we are still testing"; "forms … are done by a person". Home evidence card: field names "Made by: Automatic, then reviewed". /how-it-works: "Our software then compares the tags … and proposes small edits" (present tense, not labelled as testing). /verify and /solutions/government: "Every file is checked with the veraPDF validator and a semantic check", while home labels the semantic check "Software, in testing". | page text from the sweep (`scripts/tmp/qa-sweep.mjs`); home trust strip | Use one status vocabulary everywhere (Available / In testing / Planned). Add "in testing" wherever the semantic check or auto-repair is named. Change "Automatic, then reviewed" to match "forms are done by a person". |
| 4 | Med | / vs /product | The Publish stage has two different statuses. On home, the Publish tab reads as a live deliverable ("The repaired file goes back with a plain report…"). /product says Publish is check-before-post, "In development", and that "the last two are software we are building". Home labels Monitor as planned but not Publish. | `home-stage-monitor-1440.png`; /product text | Give the Publish tab on home the same "In development" label, or rename the stages so "deliver" and "check-before-post" are separate. |
| 5 | Med | /check | The free check cannot show the home page's headline problem. Both "Permit form" samples report "No fillable form fields found", but home tells the story of this permit form's five unnamed fields. A visitor who clicks through from the story sees nothing about fields. | `check-sample-1-1440.png`, `check-sample-tagged-1440.png` | Ship the untagged sample as a fillable form with unnamed fields, so the check flags them, or rename the samples so they do not look like the home form. |
| 6 | Med | /check | Focus and error placement. After every bad-file error (10 of 10 runs), focus falls to `<body>`. After a sample loads, focus went to the result H2 in 6 of 8 runs and to `<body>` in 2 (the first 1440 run and the 390 tagged run). Errors render below the three sample cards, about y=875 at 1440, away from the drop zone. Each error sits in both `role=alert` and an `aria-live=polite` region, so it may be announced twice. | `check-error-notpdf-1440.png`; `scripts/tmp/qa-check.mjs`, `qa-check2.mjs` output | Show the error inside the drop zone, keep focus on "Choose a PDF" (or move it to the error), use a single live region, and always focus the result heading when results arrive. |
| 7 | Med | / | A bright white horizontal glow band sits between two dark sections (problem → deadline). It reads as a rendering glitch. Each dark → light change is an 80px gray gradient smear. | `home-edge-why-now-title-1440.png`, `home-edge-cost-title-1440.png`, `home-edge-close-title-1440.png` | Remove the band. Join same-color sections with no seam, and use one clean, deliberate edge (hard cut or short tonal step) for light/dark changes. |
| 8 | Med | / estimator | Sliders have no `aria-valuetext`. A screen reader hears "30", not "30 percent". The cost slider shows "Hours only" at $0, but assistive tech hears "0". | `scripts/tmp/qa-home.mjs` output (`vt: null` on all 5) | Set `aria-valuetext` ("30 percent", "40,000 pages", "Hours only" or "$45 per hour"). |
| 9 | Med | / scale section | The toggle sets `aria-pressed="true"` while its label says "Show the unsorted collection" and the sorted view is showing. After a click it flips to `false` and "Sort the collection". The label and the state both change, so a screen reader hears contradictory state. | `home-sorted-1440.png`, `home-unsorted-1440.png`; probe output | Keep one fixed label with `aria-pressed` (for example "Unsorted view"), or drop `aria-pressed` and keep the changing label. |
| 10 | Med | / | The copy contradicts itself on the deadline. The H2 says "The federal deadline is set." and the footnote says the dates "could move" (NFB v. DOJ, possible DOJ changes). The hero states "must meet … by April 26, 2027" with no hedge. | `home-edge-why-now-title-1440.png` | Use "The federal dates are in the rule." or "The deadline is on the calendar." and add "(as of Nov 2026)" to the hero sentence. |
| 11 | Med | / | Repetition. The CTA pair "Request a Readiness Audit / Discuss a pilot" appears twice within about 600px (end of the offer section, then the close section). The permit form sheet appears 5 times (hero, problem, stages, evidence thumbnail, close). The home page is 20,190px tall at 1440 across 12 sections. | `home-edge-close-title-1440.png`; `home-1440.png` | Drop the CTA pair from the offer section (or from the close). Reuse the form at most 3 times. Trim the cost and why-months blocks. |
| 12 | Med | site-wide | CTA and page names drift. "Request an Audit" (nav), "Request a citywide audit" (hero), "Request a Readiness Audit" (offer, close, mobile menu) and "Get your real numbers" all go to the same URL. /product is "Product" in the nav, "Services and scope" in the dropdown and mobile menu, and "Overview" in the footer. | CTA dump in `qa-home.mjs` output; nav dump in `qa-nav-contact.mjs` | Use one CTA verb and noun ("Request a Readiness Audit") and one name for /product. |
| 13 | Low | / estimator | The legend "(dark: low end, light: high end)" is chart jargon. The cost value "Hours only" is set in mono accent type, so it reads like a number. "36 to 100 hours a month" mixes exact and rounded figures (the high end is 104). | `home-estimator-keyboard-1440.png` | Add a two-swatch legend and write "Not set (hours only)". Round both ends the same way. |
| 14 | Low | / stages | The tablist supports Arrow keys, but End and Home do nothing (End stayed on "Repair"). | `qa-home.mjs` output | Add Home and End per the ARIA tabs pattern. |
| 15 | Low | / (390) | The mobile stage list numbers issues by reading order ("1 Footer is read first … 7 Phone field has no name") and says "Check boxes have no names", while desktop says "Check boxes have no group". | `home-edge-compare-title-390.png`, `strip-home-390-4` | Separate the reading-order numbers from the issue list and use one issue name. |
| 16 | Low | / | Typography: a widow ("26, 2027.") ends the hero paragraph at 1440. Headings use straight apostrophes ("can't", "doesn't", "don't"), while body copy uses curly ones ("We’ll", "PDF’s"). | `home-first-screen-1440.png` | Add `text-wrap: pretty` (or a no-break space in the date) and use curly quotes everywhere. |
| 17 | Low | /contact | A filled honeypot returns "The request could not be read." That is misleading if an autofill tool ever fills it, although the field is `aria-hidden`, `tabindex=-1` and `autocomplete=off`. Radio and checkbox controls are 16x16. | `qa-nav-contact.mjs` output (400 `bad_request`) | Return a neutral "Thanks" for honeypot hits, and make sure the label rows are 44px tap targets. |
| 18 | Info | all (dev only) | The Next.js dev "N" badge overlaps the cookie banner's "Essential only" button at both widths. It is dev-only, but it hides a control in local QA. | `home-first-screen-390.png` | None for prod. Move the badge (`devIndicators.position`) when doing QA. |

**Answers for an unfamiliar city employee (first screen, 1440 and 390):**

- **What it does:** yes, from the paragraph ("finds the PDFs … fixes the ones residents use most … record of what was checked").
- **Who it is for:** cities, implied by "city PDFs". Counties and special districts only appear further down.
- **Why now:** yes, the April 26, 2027 date is in the first screen.
- **What to click:** clear, two buttons. But "Check a PDF" leads to a sample that cannot show the field problem the page is about (finding 5).

## Design review: top 8 visual fixes

1. **Section seams:** remove the white glow band between the dark problem and deadline sections, and replace the gray gradient smears with a hard edge or a short tonal step (finding 7). It is the most "broken-looking" moment on the page.
2. **Hero composition:** right now it is the generic centered SaaS hero (centered H1, two pill buttons, check-mark chips), and the real asset, the annotated permit form, starts below the fold, half hidden by the cookie banner. Put the form beside the headline at 1440 so the first screen shows the product, not the pitch.
3. **The two-tone H2 tic:** about 9 H2s end in a gray second clause ("is set.", "can cost.", "The page never changes."). Once it is a signature; nine times it is a template. Keep it on one or two headings.
4. **Repeated assets and CTAs:** the form sheet appears 5 times, and the CTA pair twice in a row (finding 11). Cut both, which also shortens the 20,190px page.
5. **Alignment rule:** H2s switch between centered (problem, scale, stages, cost, evidence, offer, close) and left (deadline, consequences, comparison) with no visible logic. Pick one rule: centered for chapter openers, left for working sections.
6. **Rhythm:** every section is 1,550 to 2,200px tall with the same big-H2, lede, block pattern. Vary the density. The consequences cards and the five "why months" steps could be half as tall.
7. **/check error state:** render errors inside the drop zone with the file name, in the same 940px column, not below the sample cards (finding 6).
8. **Estimator output:** the low and high bars need a real legend, and the mono accent value style should be reserved for actual numbers (finding 13). The ledger itself (tabular figures, plain sentence result) is the best-designed block on the page. Keep it.

**Design calibration:** light ground, one blue accent, a bold grotesk display face, a serif only inside the sample document, mono for labels. It avoids purple gradients and icon-circle grids. The compare table honestly marks Sayable "Partly" on two rows. The weakest moments are the hero template and the repetition, not the palette.

## gstack review log

- **Skills loaded (Skill tool):** `gstack-qa-only` and `gstack-design-review`.
- **qa-only preamble:** `gstack-skill-start --skill qa-only` ran and returned `SKILL_START_PROTO: 1`, `SESSION_KIND: interactive`, `REPO_MODE: solo`, `TELEMETRY: off`. Its update-check egress to github.com was denied by the sandbox. Its telemetry-consent instruction block was **not** asked: this was a delegated report-only run with no human at the prompt, so it was deferred.
- **Section files read:** `gstack-qa-only/sections/exploratory.md` (full), `gstack-qa/sections/qa-patterns.md` (first 120 of 226 lines: modes, orient, links) and `gstack-qa-only/sections/reporting.md` (finalize rules). Not read: `gstack-qa/sections/scope.md` and `browser-setup.md`.
- **Browser drivers:**
  - Aside: not installed (`command -v aside` empty).
  - gstack `$B`: `gstack-browser-ensure` printed `BROWSER_UNAVAILABLE Chromium installed but did not launch`, and `$B goto` failed the same way.
  - Fallback: Playwright with the given `chrome-headless-shell-1247`, `chromiumSandbox: false`. The first launch inside the Bash sandbox failed with `bootstrap_check_in … Permission denied (1100)`, so browser scripts ran with the Bash sandbox disabled.
- **Scripts run** (`scripts/tmp/`):
  - `qa-probe.mjs`: launch check.
  - `qa-sweep.mjs`: 11 URLs × 2 widths; screenshots, console, overflow, italics, headings, links, small targets, plus a GET of every internal link.
  - `qa-home.mjs`: first screen, section edges, audio, transcript, sort toggle, stages, keyboard sliders.
  - `qa-strip.mjs`: slices full-page shots for review.
  - `qa-check.mjs`, `qa-check2.mjs`, `qa-check3.mjs`: samples, 5 bad files, focus, tab order.
  - `qa-nav-contact.mjs`: dropdowns, mobile menu, contact validation.
  - `qa-contact2.mjs`: valid submit, topics.
  - `qa-last.mjs`: table scrollers, stage labels.
- **Methodology applied:** design-review Phases 1 to 5 by hand (first impression, rendered system, page audit, flows, cross-page consistency) and the qa-only black-box browser method (orient, links, flows, unhappy paths).
- **Skipped steps:**
  - **design-review:** the clean-tree commit/stash gate (report-only, the tree belongs to the user), the fix loop (Phases 8 and 9), DESIGN.md token check, impeccable detector scan, Codex and Claude outside voices, letter grades and baseline JSON.
  - **qa-only:** the `exploration-NNN.json` checkpoint, `gstack-qa-deadline` and `gstack-qa-evidence` bookkeeping, the `.gstack/qa-reports/` and project-copy outputs (the caller fixed this path instead), and `gstack-skill-end` telemetry.
- **Not tested:** real screen readers (VoiceOver/NVDA), drag-and-drop upload, files over 25 MB or 400 pages, a real multi-page PDF, contact with a configured webhook, other pages (/about, /resources, /solutions/agencies, /accessibility, /terms, /cookies), and tablet widths.
