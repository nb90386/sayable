---
name: Sayable
description: The document has two stories. What you see on porcelain, what a screen reader gets on graphite, and a vermilion reading path between them that straightens as the structure is repaired.
colors:
  paper: "#f6f5f1"
  paper-deep: "#eceae3"
  sheet: "#ffffff"
  ink: "#121314"
  ink-soft: "#3a3d42"
  muted: "#5b5e63"
  signal: "#121314"
  signal-wash: "#e6e4dc"
  signal-light: "#f2f1ec"
  warm: "#e4462b"
  warm-wash: "#fbe3dc"
  ember: "#a32d17"
  ember-wash: "#fbe3dc"
  night: "#111418"
  night-raise: "#1b1f24"
  moon: "#f2f1ec"
  moon-muted: "#b4b7bd"
  signal-night: "#ff7a5c"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.4rem + 3.6vw, 5rem)"
    fontWeight: 640
    lineHeight: 0.95
    letterSpacing: "-0.022em"
    fontVariation: "\"wdth\" 88, \"opsz\" 96"
  display-close:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 1.9rem + 5vw, 6.5rem)"
    fontWeight: 640
    lineHeight: 0.95
    letterSpacing: "-0.022em"
    fontVariation: "\"wdth\" 88, \"opsz\" 96"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.8rem + 3.2vw, 4.75rem)"
    fontWeight: 620
    lineHeight: 0.98
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 90, \"opsz\" 72"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.3rem + 0.9vw, 2.1rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.015em"
    fontVariation: "\"wdth\" 88"
  lede:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.12rem + 0.4vw, 1.45rem)"
    fontWeight: 400
    lineHeight: 1.48
  body:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.03rem + 0.18vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 700
    lineHeight: 1.3
  structure:
    fontFamily: "Atkinson Hyperlegible Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0em"
    fontFeature: "\"zero\" 1"
rounded:
  sheet: "4px"
  control: "10px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 0.5rem + 2.4vw, 2.75rem)"
  stage-block: "clamp(3rem, 6vw, 6.5rem)"
  stage-inner: "clamp(2.5rem, 4vw, 4.5rem)"
  column: "40rem"
  max: "90rem"
  header: "4.25rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 1.45rem"
    height: "3.1rem"
  button-night:
    backgroundColor: "{colors.moon}"
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
    padding: "0 1.45rem"
    height: "3.1rem"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.45rem"
    height: "3.1rem"
  player-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 1.3rem"
    height: "3.1rem"
  player-button-night:
    backgroundColor: "{colors.moon}"
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
    padding: "0 1.3rem"
    height: "3.1rem"
  stamp:
    backgroundColor: "{colors.signal-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.4em 0.95em"
  document-sheet:
    backgroundColor: "{colors.sheet}"
    rounded: "{rounded.sheet}"
  text-field:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.75rem 0.875rem"
  divider-chip-seen:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "7px 14px 7px 16px"
  divider-chip-heard:
    backgroundColor: "{colors.night}"
    textColor: "{colors.moon}"
    rounded: "{rounded.pill}"
    padding: "7px 16px 7px 14px"
---

# Design System: Sayable

## Overview

**Creative North Star: "The Document Has Two Stories"**

Sayable sells triage and documented verification of public documents to cities and counties. The buyers are skeptical, procurement-minded and tired of "AI makes it compliant". So the site does not pitch. It shows one document twice. Every surface is a split stage: the visible story on porcelain at left ("What you see"), the accessible story on graphite at right ("What a screen reader gets"). Both halves always carry real content, and the comparison is the argument.

The signature is the divider, and **the divider is the reading path**. It is a fixed vermilion line between the two stories. At the top of the page it kinks, doubles back and carries knots where the reading order breaks. Every act straightens it a little. At the close it runs true, slides to the edge and fades out, and one porcelain page asks for one action: the collapse. On phones it becomes a thin line in the left gutter that straightens the same way.

The look is printed and practical. Porcelain paper, graphite night, ink pills and white US Letter sheets drawn in SVG. There is no photography, no generated imagery, no dashboard mockups. The only chromatic colour is a proofreader's vermilion, and it marks what is broken. Type is a condensed, optical-sized grotesque for claims, a low-vision reading face for everything else, and a mono that appears only where it shows document structure.

**Key Characteristics:**
- A two-ground split stage (porcelain and graphite) carries every homepage act. Supporting pages use the same grounds as one column.
- One signature: the divider is the reading path, tangled at the top, straight by the close, then gone.
- Vermilion is the red pen. It means broken structure, and the colour retreats as the page resolves.
- The document is the product shot: a fictional city's permit form, drawn as an SVG sheet and shown before and after.
- Honest proof: labelled text-to-speech audio, a calculator that shows its arithmetic, preliminary benchmarks presented as preliminary.
- Accessibility is designed in, not added on: Atkinson Hyperlegible, transcripts, keyboard-operable demos and full reduced-motion paths.

## Colors

Two neutral grounds, one ink and one red pen. Primary emphasis is ink, not a colour.

### Primary
- **Proof Ink** (`ink`, also exposed as `signal`): every primary action pill on porcelain, headings, the repaired document's reading-order spine and numbered circles, the "fixed" highlight stroke, the active-nav underline and the range-input accent. Wherever the system says "this is right", it says it in ink.

### Secondary
- **Proofreader's Vermilion** (`warm`): the divider line and its knots, the 4px highlight stroke and 16% fill on a broken element during narration, dashed outlines and "no accessible name" chips on unnamed fields, the minor-severity dot in the report, and the underline under a headline's emphasised words. Never body text: on porcelain it is a stroke and fill colour only.
- **Deep Ember** (`ember`): the text-safe vermilion for porcelain. Display-type emphasis (`em` in display headlines), report severity labels, "Before, a listener hears" labels, form error text and error borders. It is also the global focus ring and the caret.
- **Night Vermilion** (`signal-night`): vermilion's graphite-side form. Broken-structure items in the right-hand lists ("Field · no name", "Issue" rows), the title's numbered reading order, `em` in night-side headlines, and the focus ring on graphite.
- **Pen Wash** (`warm-wash`, `ember-wash`, the same value): the soft pink behind the currently spoken line in the "as posted" transcript and behind "Before" quotes in the report.

### Neutral
- **Porcelain** (`paper`): the visible story's ground, the close, every supporting page, the browser theme colour.
- **Porcelain Deep** (`paper-deep`): reserved deeper paper tone; rarely used.
- **Sheet White** (`sheet`): documents, inventory tiles, the report and the contact form. White is always paper, never the page.
- **Graphite** (`night`): the accessible story's ground, the footer and the supporting-page CTA band.
- **Graphite Raised** (`night-raise`): estimator bar tracks on graphite.
- **Moon** (`moon`): text on graphite and the night-side action pill. Doubles as `signal-light`.
- **Moon Muted** (`moon-muted`): secondary text, story labels and honesty notes on graphite.
- **Ink Soft** (`ink-soft`) and **Muted** (`muted`): secondary text and captions on porcelain (muted measures about 6:1 on porcelain).
- **Ink Wash** (`signal-wash`): the "Checked" stamp, the selected report tab and "After" quotes.
- **Rules**: hairlines at ink 13% (`rgb(18 19 20 / 0.13)`), strong rules at ink 32%, night rules at moon 16%.

### Named Rules
**The Red Pen Rule.** Vermilion (in any of its three tones) marks broken structure: an unnamed field, a missing heading, reading order that starts at the footer, a finding's severity, an error. If nothing is broken, nothing is red. The interaction layer (focus ring, text selection, caret) borrows the pen because it marks where the reader is working. That is the only exception.

**The Retreating Pen Rule.** Red diminishes as the story resolves. The divider's knots fade with its amplitude, repaired sheets use ink highlights instead of vermilion, and the close is ink on porcelain.

**The Ink Is Primary Rule.** Calls to action are ink pills on porcelain and moon pills on graphite. There is no brand-coloured button.

## Typography

**Display Font:** Bricolage Grotesque, a variable font loaded with its `wdth` and `opsz` axes (fallback ui-sans-serif, system-ui). It is exposed as `--font-serif` for historical reasons, but it is a grotesque.
**Body Font:** Atkinson Hyperlegible Next, from the Braille Institute, designed for low-vision readers (fallback ui-sans-serif, system-ui).
**Structure Font:** Atkinson Hyperlegible Mono with slashed zero (`"zero" 1`), not preloaded (fallback ui-monospace, SF Mono, Menlo).

**Character:** A condensed, slightly quirky grotesque makes the claims. The reading face does the work. The mono shows up only when the content is structure (tags, field names, file paths, timings, arithmetic), so the mono reads as the voice of the file.

### Fluid scale
Seven steps, all `clamp()`: step -1 `0.85→0.9rem`, step 0 `1.0625→1.1875rem` (body), step 1 `1.2→1.45rem` (lede), step 2 `1.5→2.1rem` (stage titles), step 3 `2→3.3rem` (supporting-page row headings), step 4 `2.5→4.75rem` (act headlines), step 5 `3→6.5rem` (the close).

### Hierarchy
- **Display** (640, `wdth` 88, `opsz` 96, line-height 0.95, -0.022em): the homepage title across the split (`clamp(2.5rem, 1.4rem + 3.6vw, 5rem)`), the close at step 5 and supporting-page intros (`clamp(2.6rem, 1.4rem + 4.4vw, 5.6rem)`). `em` inside display is upright, not italic, and turns ember (night vermilion on graphite).
- **Headline** (620, `wdth` 90, `opsz` 72, step 4, line-height 0.98, -0.02em): every act heading, split across both stories. `em` keeps its colour and gets a vermilion underline (0.06em thick, offset 0.12em).
- **Title** (600, `wdth` 88, line-height 1.1, -0.015em): stage titles at step 2, group and check names at 1.35–1.45rem, and estimator figures at 1.5–2.6rem with tabular numerals.
- **Lede** (400, step 1, line-height 1.48, max 38ch): one framing sentence per opening. It is ink-soft on porcelain and moon-muted on graphite.
- **Body** (400, step 0, line-height 1.6): paragraphs at 38–48ch inside a column, `text-wrap: pretty`.
- **Label** (700, 0.78–0.9rem, sentence case): story labels, divider chips, the stamp, form labels (560) and report field names (600). Never uppercase and never tracked.
- **Structure** (mono 400, 0.75–0.95rem): tag lists, file metadata, player timings, estimator outputs and arithmetic, report filenames.

### Named Rules
**The Mono Means Structure Rule.** Mono appears only where the text is document structure or computed data. Labels that carry no data are set in the reading face.

**The Upright Emphasis Rule.** Emphasis in display type is colour or underline, never italic.

**The Condensed Claim Rule.** Display and headline always carry their `wdth` setting (88–90). A Bricolage headline at default width is off-system.

## Layout

**The split stage.** Every homepage act is a `section` with two halves: a porcelain left and a graphite right. At 1024px and wider they sit side by side as equal columns (`1fr 1fr`). Below 1024px they stack: the left story first, then the right, each opened by a story label ("What you see" / "What a screen reader gets") with a hairline running to the edge.

- Halves are padded `clamp(3rem, 6vw, 6.5rem)` vertically and by the gutter horizontally. On desktop the inner edge (toward the divider) gets an extra `clamp(2.5rem, 4vw, 4.5rem)` so content never touches the line.
- Children of each half are capped at 40rem. On desktop the left half's content is pushed to the divider (`margin-left: auto`) and its text is usually right-aligned, so both stories read toward the centre line.
- **One heading, two halves.** An act's heading is a single `h1`/`h2` whose two `span`s sit on the two grounds: "Same form." | "Two very different readings." It reads as one sentence to assistive technology and as two claims to the eye. On desktop the left span is right-aligned. The title variant clears the header height plus `clamp(2.5rem, 1rem + 4vw, 5.5rem)`.
- Act order is fixed by the story: Title, Listen, Scale, Journey, Value, Trust, Close. Each act declares `data-sc-act`, which feeds the divider's chapter label.
- **The close is not split.** It is one porcelain `wrap` on the 12-column grid (copy in 6 columns, the repaired sheet in 5 starting at column 8).

**Supporting pages** use the 12-column grid inside `wrap` (max 90rem, fluid gutter `clamp(1rem, 0.5rem + 2.4vw, 2.75rem)`, column gap `clamp(1rem, 2vw, 2rem)`): an intro with the display title at 9 columns and the lede below a hairline, offset to column 5. Editorial rows put the heading in 5 columns and the body in 7 (max 62ch). A graphite CTA band closes each page.

**Breakpoints:** 640px (`sm`, two-column fields and grids), 768px (`md`, footer columns), 1024px (`lg`, the split opens, the divider switches from gutter to centre), 1280px (`xl`, the homepage header shows its nav).

**Responsive behaviour.** Phones get a composed stack, not a squeezed desktop. Story labels name each half. The estimator pins a running total ("Sort, then automate") to the top of the graphite half. The report explorer moves its region thumbnail above the panel. The inventory drops from 3 to 2 columns. `overflow-x: clip` on body guarantees no sideways scroll.

### Named Rules
**The Both Halves Carry Content Rule.** Neither half is ever decoration or empty. If a point has no accessible-story counterpart, it does not belong in a split act.

**The Story Order Rule.** Visible first, accessible second, on every viewport.

## Elevation & Depth

Depth is mostly tonal: porcelain against graphite, white sheets against both. Shadows belong only to paper objects (things that could be printed) and to the divider's floating chips.

### Shadow Vocabulary
- **Sheet** (`0 1px 1px rgb(18 19 20 / 0.06), 0 18px 40px -22px rgb(18 19 20 / 0.45)`): documents, the report and the contact form on porcelain.
- **Sheet on night** (`0 1px 0 rgb(255 255 255 / 0.04), 0 24px 50px -24px rgb(0 0 0 / 0.8)`): documents on graphite.
- **Tile** (`0 1px 1px rgb(0 0 0 / 0.05), 0 10px 22px -14px rgb(0 0 0 / 0.4)`): inventory file tiles.
- **Chip float** (`0 6px 18px -10px rgb(0 0 0 / 0.5)`, act chip `0 4px 12px -8px`): the divider's side labels and chapter label.

### Named Rules
**The Only Paper Casts Shadows Rule.** Buttons, inputs, list rows and panels on the page ground are flat. A shadow says "this is a sheet of paper".

## Shapes

- **Documents** have a 4px corner (`rounded.sheet`), nearly square like real paper. Hero sheets tilt slightly (-1.5° visible, 1.2° accessible). Inventory tiles tilt pseudo-randomly between -3° and 3°, rounded so server and client agree.
- **Actions, stamps, chips and divider labels** are full pills (999px).
- **Controls** (text fields, radio cards, report tabs and quote panels) use a 10px corner (`rounded.control`).
- **Rules, not boxes.** Lists are separated by top and bottom hairlines. Cards are not a structural device.
- **Drawn icons** are mask-image SVGs coloured with `currentColor`: arrow right, arrow down, play, pause and check. 2px round-cap strokes, about 1em. No icon fonts, no glyph icons.
- **The wordmark**: a 20×26 ink sheet (4px corner) with a porcelain S-shaped reading path through it, ending in a vermilion knot. Set beside "Sayable" in Bricolage 500 at 1.5rem, -0.02em.

## Components

### Buttons
Ink and moon pills, confident and plain.
- **Shape:** full pill (999px), min height 3.1rem, 0 1.45rem padding, 700 at 1rem. A trailing drawn arrow is 0.7rem from the label.
- **Primary:** ink on porcelain. **Night:** moon pill with graphite text on graphite grounds. **Quiet:** transparent with a 1.5px inset `currentColor` ring.
- **Hover:** background mixes 14% toward the foreground (quiet: 8% `currentColor` wash). The arrow nudges 3px right on `ease-out-expo` over 0.4s. **Active:** 1px press down. **Focus:** the global ring.
- **Quiet link:** a 700 text link with a 1.5px underline at 45% opacity, offset 0.28em, going solid on hover. Min height 3rem. Used for the secondary action beside a pill ("Hear the difference", "Discuss a pilot").
- One primary action, one destination: Request a Readiness Audit (`/contact?topic=audit`).

### Navigation
- **Header:** 4.25rem tall. On the homepage it is absolute and transparent over the split, the nav appears at 1280px+ and the CTA is a moon pill. On other pages it is fixed, turning porcelain with a hairline after 8px of scroll, and the nav appears at 1024px+.
- **Links:** 480 at 0.95rem in ink-soft, going ink on hover. A 1px ink underline grows from the left on hover and stays on the current page (`aria-current`). 44px targets.
- **Mobile:** a two-line toggle that morphs to a cross. A full-height porcelain panel lists Bricolage links at 2rem, separated by hairlines, with the CTA pill pinned at the bottom. Escape closes it, focus is trapped, scroll is locked and items stagger in by 40ms.
- **Footer:** graphite, with the wordmark, a Bricolage line ("Public documents that read as clearly as they look."), site and stage link columns, and the disclaimer that Sayable does not certify legal compliance.

### Inputs / Fields
- **Style:** white field, hairline border, 10px corner, 0.75rem × 0.875rem padding, 1rem ink text. Labels at 560 above, hints in muted at 0.85rem, "(optional)" in muted.
- **Focus:** border goes ink with a 2px ink ring at 25%.
- **Error:** ember border and `aria-invalid`. Ember error text is linked by `aria-describedby`, and an error summary with jump links sits on an ember-wash panel.
- **Radio cards:** a hairline 10px card with the ink-accent radio; when checked, an ink border on a half ink-wash.
- **Range (estimator):** native range with an ink accent, 1.75rem hit height, value echoed in a mono `output`.

### The Divider (signature)
The reading path. A fixed, `aria-hidden` SVG layer above the stage.
- **Desktop (1024px+):** a 40px-wide band at the page's centre, viewBox `0 0 40 1000` stretched to full height. A 2px vermilion stroke (non-scaling, round caps) runs through 27 points. The amplitude is `max(0, 1 - 1.12p)^1.35` of scroll progress p, so it reaches straight at about 89% of the page. Every third point kinks 2.2× harder, and while amplitude is above 0.35 the worst segments double back. Vermilion knots (r 3.2) sit at the most displaced points, and their opacity follows the amplitude.
- **Chrome:** at the bottom of the viewport, a split pill reads "What you see" (porcelain) | "What a screen reader gets" (graphite, with a 1px vermilion seam). Above it sits a porcelain chip naming the current act: As posted, Listen, The inventory, One document, five stages, What it would take, What is checked, Both stories match.
- **Collapse:** when the close reaches mid-viewport, the line translates 50vw to the edge over 1.1s (`ease-in-out-quint`) and fades out, and the chrome fades over 0.6s. Scrolling back reverses it.
- **Phones:** the same geometry in a 9px-wide line in the left gutter (x = 1px). No knots and no chrome; story labels do the naming.

### Split Act
A section that takes a split heading, a left node and a right node, and renders the two grounds with phone story labels. The right half always carries `on-night`, which flips focus ring, lede, hairline and emphasis colours to their graphite forms.

### Document illustration language
- **The artifact:** one recurring document, a "Residential Permit Application" from the fictional City of Alder Creek, Building Division (Form BD-12). It is drawn in an 850×1100 viewBox (US Letter at 100dpi), with every spoken element held in a named region (seal, title, intro, name, phone, address, work, signature, date, footer). A second document, a "Notice of Public Hearing", serves the report.
- **Inside the sheet, the document keeps its own type:** Georgia for its title, Helvetica/Arial for its labels, grey #9a9da2 field strokes with 3px corners. Brand fonts never appear inside a city's file.
- **Broken (as posted):** dashed vermilion outlines (4px, `12 8`) around unnamed fields with vermilion "no accessible name" chips. On the night side a 12% graphite veil at 0.9 opacity is added. During narration a vermilion highlight (16% fill, 4px stroke, 0.25s fade) follows the spoken element.
- **Repaired:** ink highlights (6% fill, 4px stroke), ink tag chips in mono 15px white ("H1", `Field "Applicant name"`), and in the close numbered ink circles (r 15) joined by a 3px ink spine down the margin: the reading order made visible.
- **Every sheet is captioned as an example:** "Example document, fictional city". Visible content is identical before and after; only structure changes.

### Audio demonstration (the peak)
- **Two players, one per story:** "Hear the problem" (ink pill, porcelain) and "Hear the difference" (moon pill, graphite), each with a quiet "Play from the start". Only one story speaks at a time. Buttons expose `aria-pressed` and swap play/pause icons and labels.
- **Waveform:** 36 bars driven by a live Web Audio analyser, `currentColor` at 28% with played bars at full opacity. With reduced motion it becomes a 6px progress bar. A mono line shows elapsed time, duration and the number of spoken elements.
- **Synchronised evidence:** the spoken region highlights on the sheet, and the matching line highlights in a numbered transcript (pen wash on porcelain, moon at 12% on graphite).
- **Honesty labels (required, verbatim in spirit):** "Illustrative narration generated with macOS text-to-speech. It is not a recording of VoiceOver, NVDA or any screen reader, and the form is a sample, not a customer document." Audio loads with `preload="none"`. Transcripts carry the same content as text.

### Estimator
Inputs on porcelain (nine labelled ranges with mono outputs and sourced hints). Results on graphite: two headline counts, three numbered scenarios with tween-animated dollar figures (480ms expo, instant with reduced motion), 10px pill bars (`cost-bar`, 0.6s width transition) and the arithmetic in mono beneath each figure. The results sit in an `aria-live="polite"` region and end with the label "A hypothetical estimate … not a quote or a measured result."

### Report Explorer
A white sheet with a mono filename header, a vertical tablist of findings (arrow-key navigation, severity dot: ember major, vermilion minor) and a panel with the mono severity·category label, the title, an Evidence/Change/Made by/Re-checked list, Before (ember wash) and After (ink wash) quotes, and the "Checked" stamp. The caption states that the entries are illustrative and that listener lines are simulated.

### Stamp
An ink-wash pill (700 at 0.9rem) with a drawn check: "Checked". It is inverted to moon on graphite. It marks a verified result, and it is the only celebratory device.

### Usage examples
- **A new split act:** `SplitAct` with `act="…"`, a `split-head headline` `h2` whose left span states what is seen and whose right span states what is heard; the left half right-aligned toward the divider; the right half carrying the structural truth in mono lists with night rules; any broken item in night vermilion.
- **Showing a defect:** draw it on a sheet (vermilion dashed outline plus a vermilion chip), list it on graphite in night vermilion, and show its repaired form in ink. Never colour the explanatory prose.
- **A supporting page:** `PageIntro` (display title, lede and optional mono margin note), `Row`s on hairlines, then `PageCta` on graphite with a moon pill.
- **A claim with a number:** a title-weight figure with tabular numerals, the source or limit in a muted line beside it, and "preliminary" wherever it applies.

## Do's and Don'ts

### Do:
- **Do** keep every homepage act split: porcelain (#f6f5f1) visible story left, graphite (#111418) accessible story right, both carrying real content.
- **Do** let the divider be the only signature. It straightens with scroll, collapses at the close and becomes a gutter line on phones.
- **Do** reserve vermilion for broken structure. Use `warm` for strokes and fills, `ember` for text on porcelain and `signal-night` on graphite.
- **Do** set display and headline in Bricolage with `wdth` 88–90 and `opsz` set, weights 600–640, and upright colour emphasis.
- **Do** use the mono only for tags, field names, paths, timings and arithmetic.
- **Do** draw documents as SVG sheets at 850×1100, white with a 4px corner and the sheet shadow, captioned as examples from a fictional city.
- **Do** label every simulated thing as simulated: TTS audio, sample reports, illustrative inventories, hypothetical estimates, preliminary benchmarks.
- **Do** give every demo a text equivalent (transcripts, structure lists, live-region results) and a keyboard path.
- **Do** honour reduced motion: transitions collapse to near-zero, waveforms become progress bars, tweens jump, smooth scroll and menu entrances are off, and content is visible by default.
- **Do** keep targets at least 44px for primary controls (pills 3.1rem, nav 2.75rem) and the focus ring at 2.5px ember with a 3px offset (night vermilion on graphite).

### Don't:
- **Don't** use vermilion as decoration: no red links, red hovers, red numerals on healthy items, red outlines on the wordmark, red section accents.
- **Don't** add a second accent colour, gradients, glows or glass. Primary emphasis is ink.
- **Don't** use a split hero followed by a feature row: the split is the whole page or nothing.
- **Don't** repeat card grids or give every object the same rounded card. Separate content with hairlines; only paper gets a shadow.
- **Don't** set italic serif display or italic emphasis turns (the previous world's pattern).
- **Don't** set kickers, eyebrows or uppercase tracked labels above headings, and don't number section labels.
- **Don't** set labels that carry no data in mono.
- **Don't** use photography, generated imagery, stock illustration, product dashboards that do not exist, logo walls, testimonials or invented metrics.
- **Don't** imply a screen-reader recording, a customer document or a compliance certificate. Never write "compliant", "certified" or "100% accessible".
- **Don't** add decorative motion: no drifting ribbons, spotlights, magnets, auto-playing loops or reveal masks that hide headlines.
- **Don't** use glyph or emoji icons or icon fonts; icons are drawn masks in `currentColor`.
