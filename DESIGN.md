---
name: Sayable
description: The Path to Understanding. One reading path runs through a public document, tangled where the structure is broken and calm once it is repaired.
colors:
  paper: "#f7f9f4"
  paper-deep: "#e9efe7"
  sheet: "#ffffff"
  ink: "#17211d"
  ink-soft: "#34423c"
  muted: "#56655d"
  signal: "#1d5347"
  signal-wash: "#dcebe4"
  warm: "#f0ae71"
  warm-wash: "#fcebdc"
  ember: "#a24a1c"
  ember-wash: "#fbe6d6"
  night: "#13362e"
  night-raise: "#1c463b"
  moon: "#f3f7f1"
  moon-muted: "#bcd0c6"
typography:
  display:
    fontFamily: "Source Serif 4, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.7rem, 1.7rem + 4.6vw, 5.75rem)"
    fontWeight: 380
    lineHeight: 0.98
    letterSpacing: "-0.022em"
    fontVariation: "opsz auto"
  display-italic:
    fontFamily: "Source Serif 4, Iowan Old Style, Georgia, serif"
    fontWeight: 360
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "Source Serif 4, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.3rem, 1.7rem + 3vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "opsz auto"
  section-title:
    fontFamily: "Source Serif 4, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.85rem, 1.5rem + 1.7vw, 2.9rem)"
    fontWeight: 420
    lineHeight: 1.06
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Source Serif 4, Iowan Old Style, Georgia, serif"
    fontSize: "1.45rem"
    fontWeight: 450
    lineHeight: 1.12
    letterSpacing: "-0.012em"
  lede:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.18rem, 1.1rem + 0.4vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.97rem + 0.18vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.3
  tag:
    fontFamily: "Fragment Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0em"
    fontFeature: "\"zero\" 1"
rounded:
  input: "3px"
  chip-sm: "8px"
  panel: "10px"
  sheet: "14px"
  field: "22px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 0.5rem + 2.4vw, 2.5rem)"
  column-gap: "clamp(1rem, 2vw, 2rem)"
  max: "86rem"
  header: "4.25rem"
  section-y: "6rem"
  section-y-lg: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.sheet}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3.1rem"
  button-night:
    backgroundColor: "{colors.warm}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3.1rem"
  button-quiet:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "2.75rem"
  segmented-toggle:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "4px"
  segmented-toggle-active:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "2.6rem"
  document-sheet:
    backgroundColor: "{colors.sheet}"
    rounded: "{rounded.sheet}"
  input-field:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.input}"
    padding: "0.75rem 0.875rem"
  seal:
    backgroundColor: "{colors.signal-wash}"
    textColor: "{colors.signal}"
    rounded: "{rounded.pill}"
    padding: "0.4em 0.9em"
  finding-before:
    backgroundColor: "{colors.ember-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "0.75rem 1rem"
  finding-after:
    backgroundColor: "{colors.signal-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "0.75rem 1rem"
---

# Design System: Sayable

## Overview

**Creative North Star: "The Path to Understanding"**

Sayable helps cities and counties make public documents usable by people who rely on screen readers. Its positioning is triage before remediation and documented checking afterwards, so the visual world has one job: to show what a screen reader actually goes through. The core idea is a single reading path through a public document. Where the structure is broken, the path tangles in apricot and snags on named problems. After Sayable's work it runs calm and evergreen through the content in order, one numbered node per block. The document is the product shot. The site shows the file itself, never a dashboard, and every claim is demonstrated on a page (docs/REFERENCES.md, principles 1 and 2).

The material is quiet and institutional, with some warmth. The ground is luminous porcelain. White document sheets sit on it with soft, layered paper shadows, sometimes turned a degree or two as if they had just been set down. Ink is a near-black green. Evergreen means resolved structure, and the same green, deepened, fills the night passages that hold the estimator, the footer and the supporting-page CTAs. Apricot appears only where the path snags. Rust is apricot's text-safe form. Density is editorial: one idea per act, large serif headings, and generous section padding (96–128px vertical).

The reading path recurs as a single mechanism (REFERENCES principle 1):
- **Wordmark:** a filled sheet glyph with an S-curve path through it and an apricot terminal dot.
- **Hero:** the hearing notice, tangled path, four snag chips, then the evergreen path redraws with nodes 1–7 and tag chips.
- **Ribbons:** a wide pale band with a thin evergreen centre line that draws itself, carrying the path out of the hero and into the final CTA.
- **Lifecycle:** the same notice, overlaid with numbered reading-order nodes.
- **Verification:** the checks listed as a vertical line with nodes.
- **Final CTA:** the notice resolved, with the path and nodes complete and the "Checked · ready to post" seal.

The world rejects both the generic SaaS template and the records-room costume it replaces. Folder boards, index cards, stamp-pad violet and steel-cabinet night are retired and must not return.

**Key Characteristics:**
- One mechanism everywhere: a reading path that tangles on broken structure, then resolves.
- The document is the hero object: white 850×1100 sheets drawn in real SVG, with real paper shadows.
- Evergreen marks resolved structure. Apricot marks a snag. Nothing else is accented.
- Serif display with an italic turn, used only on the two bookends.
- Value shown in plain arithmetic, with the assumptions next to the numbers (REFERENCES principle 3).
- No borrowed proof: no logos, testimonials or counters (REFERENCES principle 5).

## Colors

A cool, green-tinted neutral system with one structural accent (evergreen) and one warning accent (apricot, with rust as its text-safe form).

### Primary
- **Evergreen** (`signal`): resolved structure. Used for primary pill buttons, repaired reading-path lines, numbered nodes, tag chips, structure boxes on the sheet, the active nav underline, headline emphasis words, focus rings, `accent-color` and `caret-color`.
- **Evergreen Wash** (`signal-wash`): selected states and "after" panels. Used for the active report tab, the "After" quote panel, the seal background and checked radio cards (50% alpha).

### Secondary
- **Apricot** (`warm`): where the path snags. Used for the tangled hero path, knot rings, underlines on quiet links and text links, the estimator range accent and its human-work bar, text selection, the primary button and emphasis words on night, and focus rings on night. It is never body text on a light ground.
- **Apricot Wash** (`warm-wash`): the fill inside a snag knot.
- **Rust** (`ember`): the text-safe warning. Used for snag chips (white text on rust), "Before" labels, form error text and borders, major-severity dashes, and the "fix" tone in the inventory.
- **Rust Wash** (`ember-wash`): "before" quote panels and the form error summary (60% alpha).

### Tertiary
- **Deep Evergreen Night** (`night`): the deep passages. Used for the estimator, the footer and the supporting-page CTA bands. Applied with `.night.on-night`, which switches emphasis and focus to apricot.
- **Night Raise** (`night-raise`): tracks and bands raised on night, such as estimator bar tracks and ribbons on night.
- **Moon** (`moon`) and **Moon Muted** (`moon-muted`): primary and secondary text on night.

### Neutral
- **Porcelain** (`paper`): the page ground, also the `theme-color`.
- **Pale Celadon** (`paper-deep`): recessed fields. Used for the lifecycle band, the audit section, the inventory field, the segmented-toggle track and the ribbon band.
- **Sheet White** (`sheet`): document sheets, forms, the report and quiet buttons.
- **Green-Black Ink** (`ink`): headings and body text.
- **Soft Ink** (`ink-soft`): ledes and secondary copy.
- **Muted Sage** (`muted`): hints, captions, metadata and disclaimers.
- **Rules:** hairlines are ink at 12% (`--rule`), strong rules are ink at 30% (`--rule-strong`), and rules on night are moon at 16% (`--rule-night`).

### Named Rules
**The Snag Rule.** Apricot and rust appear only where something is wrong or a person has to act: snags, errors, human-work bars, severity. Evergreen is the colour of things that work. Never reverse them.

**The Text-Safe Warning Rule.** Apricot is a stroke, fill, underline or night-ground accent. Any warning text on a light ground uses rust.

**The Night Swap Rule.** Inside `.on-night`, the accent becomes apricot: emphasis words, buttons (`btn-night`), focus outlines, ribbon lines and the seal all swap. Evergreen line work does not appear on night.

## Typography

**Display Font:** Source Serif 4, variable, with the `opsz` axis and italics (fallback: Iowan Old Style, Georgia, serif)
**Body Font:** Hanken Grotesk (fallback: ui-sans-serif, system-ui)
**Label/Mono Font:** Fragment Mono 400 (fallback: ui-monospace, SF Mono, Menlo). Used for tags and data only.

**Character:** An editorial serif at display optical sizes (`font-optical-sizing: auto`), with light weights (380–450) and tight negative tracking, set over a plain, sturdy grotesk for reading and controls. Mono is reserved for things a machine would print: tags, file names, paths, arithmetic and dates.

### Hierarchy
The fluid scale runs from `--step--1` to `--step-5`, and every step is a `clamp()`.
- **Display** (380, hero `clamp(2.5rem, 1.3rem + 3.4vw, 4.75rem)`, final CTA `--step-5`, supporting-page h1 `clamp(2.6rem, 1.4rem + 4.4vw, 5.6rem)`, line-height 0.98, -0.022em): page-level h1s and the final CTA h2.
- **Headline** (400, `--step-4`, 1.02, -0.02em): home-page section h2s and night CTA h2s. The `<em>` inside is upright, colored evergreen on light and apricot on night.
- **Section title** (420, `--step-3`, 1.06, -0.018em): lifecycle stage h3s and supporting-page row h2s.
- **Title** (450, 1.25–1.9rem, 1.12, -0.012em): small serif heads such as the find/fix/check/keep-up terms, report finding titles, check names and the audit sheet title.
- **Lede** (Hanken 400, `--step-1`, 1.5, max 36–48ch, soft ink): one paragraph under a heading.
- **Body** (Hanken 400, `--step-0`, 1.6): running copy at 42–62ch.
- **Label** (Hanken 600–650, 0.78–1rem): buttons, form labels, legend terms and toggle options. Sentence case.
- **Tag** (Fragment Mono 400, 0.78rem, 1.4, 0 tracking, slashed zero): file names, metrics, arithmetic lines, stage names and footer column heads. Sentence case, no wide tracking.

### Named Rules
**The Two Bookends Rule.** The italic turn (Source Serif 4 italic, 360, colored evergreen) is allowed in exactly two places: the hero h1 ("…*and still leave someone out.*") and the final CTA h2 ("See what your *documents need.*"). Every other emphasis is upright and carried by color alone, as the `.headline em` style does.

**The Machine Voice Rule.** Mono means printed by software or measured. Never use it for prose, headings or buttons.

**The Sentence Case Rule.** No uppercase tracked labels in site UI. The only uppercase is inside the fictional document's own letterhead ("CITY OF ALDER CREEK"), which belongs to the artifact.

## Layout

- **Container:** `.wrap` is 100% wide up to `86rem`, with a fluid gutter `clamp(1rem, 0.5rem + 2.4vw, 2.5rem)`.
- **Grid:** `.grid-12` has 12 equal columns with a column gap of `clamp(1rem, 2vw, 2rem)`. The typical split is copy at 6–7 columns against an artifact at 5–6. Short supporting copy sits at 4 columns starting at column 9, bottom-aligned with a 7-column headline (`items-end`).
- **Header:** fixed, `4.25rem` tall. It is transparent at the top and becomes porcelain with a hairline after 8px of scroll. The hero clears it with `header-h + 2.5rem` (and `+3.5rem` from sm).
- **Rhythm:** sections use 96px top and bottom, rising to 112–128px from sm. The lifecycle uses 112–144px. Gaps inside a section step through 1.5, 3, 3.5 and 4rem.
- **Sticky artifact:** the lifecycle pins the document beside stage copy. Each stage gets a `min-h-[85vh]` article from md (60vh on mobile), and the active stage is chosen by an IntersectionObserver band at 62%/30%. The estimator pins a running total on mobile.
- **Breakpoints (Tailwind defaults):** sm 640, md 768, lg 1024. Below 768 the hero sheet loses its 3D tilt (`rotateZ(-1deg)` only), the lifecycle artifact caps at 34vh and pins under the header on a pale celadon strip, the monitor stream hides, inventory group names shorten (Service, New, Repair, Archive?, Policy), and nav collapses into a full-screen porcelain menu below lg.
- **Overflow:** the body uses `overflow-x: clip`. Ribbons and tilted sheets bleed visually but never scroll.

### Named Rules
**The One Idea Per Act Rule.** Each home section carries one message and one artifact. The order is hero → two readers → inventory → lifecycle → estimator → verification → audit offer → final CTA. Don't add repeated three-up card rows between acts.

## Elevation & Depth

Depth comes from paper physics: white sheets cast soft, tinted, layered shadows on porcelain, and occasionally tilt in 3D. Everything else is flat and separated by hairlines or a tonal step to pale celadon.

### Shadow Vocabulary
- **Sheet** (`box-shadow: 0 1px 2px rgb(23 50 40 / 0.06), 0 10px 24px -10px rgb(23 50 40 / 0.14), 0 36px 72px -30px rgb(23 50 40 / 0.26)`): every document sheet, the report, the form and the hero notice.
- **Pill lift** (`box-shadow: 0 1px 0 rgb(255 255 255 / 0.12) inset, 0 10px 24px -14px rgb(19 54 46 / 0.7)`): filled buttons.
- **Toggle thumb** (`box-shadow: 0 1px 2px rgb(23 50 40 / 0.12), 0 4px 10px -4px rgb(23 50 40 / 0.2)`): the checked option in the segmented toggle.
- **Mini sheet** (`box-shadow: 0 1px 2px rgb(23 50 40 / 0.08), 0 6px 14px -8px rgb(23 50 40 / 0.25)`): the small document cards in the inventory.
- **Seal** (`box-shadow: 0 6px 16px -8px rgb(23 50 40 / 0.4)`): the seal laid over the final sheet.

### Named Rules
**The Paper Only Rule.** Only paper casts shadows: sheets, pills, toggle thumbs and the seal. Shadows are always green-tinted and soft. No hard offset shadows, glows or glass.

**The Set-Down Tilt Rule.** Sheets may turn slightly, as if set on a desk: hero `rotateX(4deg) rotateY(-7deg) rotateZ(-1.2deg)` with pointer parallax, final CTA `rotate(2deg)`, the audit stack 1.5° and 3°. Never more than about 3° in the plane.

## Shapes

- **Pills** (999px): every button, the segmented toggle, the seal, snag and tag chips on the sheet, and the skip link.
- **Sheets** (14px): document sheets, the report and the form.
- **Inventory field** (22px): the one large recessed field.
- **Panels** (10px): report tabs, before/after quote panels and the base input radius.
- **Mini sheets** (8px): inventory documents, and the structure boxes on the notice SVG (`rx=8`).
- **Fields** (3px): text inputs, selects and radio cards in the contact form.
- **Line work:** round caps, 2–4px strokes, `vector-effect: non-scaling-stroke`, and `pathLength=100` dash-draw. Nodes are 14–16px-radius circles with centred numerals.
- **Tone dashes:** short rounded bars (`h-1.5 w-5`, or `h-1 w-6` on mini sheets). They are legend keys and always sit beside a text label.

## Components

### Buttons
Full pills that feel solid and pressable.
- **Primary** (`.btn`): evergreen fill, white 600 text at 1rem, 3.1rem tall, 1.5rem side padding, with a trailing drawn arrow icon. The header version is 2.5rem tall.
- **Night** (`.btn-night`): apricot fill with ink text. Used only on night.
- **Quiet** (`.btn-quiet`): sheet fill with a 1px inset strong-rule ring that becomes a 1.5px evergreen ring on hover. Used for in-section controls such as "Sort the collection".
- **Hover / Active:** lifts 1px, background darkens 12% (`color-mix` in oklab), and the arrow slides 3px. Timing is 0.45s ease-out-expo. Active returns to rest.
- **Disabled:** 70% opacity with `aria-disabled`.

### Links
- **Quiet link** (`.link-quiet`): 600 text with a 2px apricot underline drawn as a background. On hover the underline wipes out to the right and the text turns evergreen (apricot on night). Minimum height 3rem.
- **Text link** (`.text-link`): an inline underline, 1.5px apricot, offset 0.2em. Hover turns it evergreen.

### Segmented toggle
A pale celadon pill track with 4px padding holding pill options (2.6rem tall, 600 weight, 0.95rem). The checked option becomes a white thumb with the toggle shadow. It uses `role="radiogroup"` with `aria-checked`. The hero uses it for "As posted / After Sayable" and Two Readers for the version switch.

### Document sheet (signature)
The fictional City of Alder Creek "Notice of Public Hearing", drawn once in an 850×1100 SVG coordinate space (US Letter at 100dpi) so the page and every overlay line up at any size. It has a letterhead, a seal, a serif title with an italic subtitle, a fee table, a map figure and a comment form. Overlays are built from these parts:
- **Structure boxes:** rounded 8px rectangles at evergreen 4% fill with a 1.6–2px evergreen stroke. Header cells and fields get a 9–10% evergreen tint.
- **Nodes:** evergreen circles (r 15–16) with white Hanken 700 numerals that mark reading order.
- **Annotation chips:** pills on the sheet. Repaired tags (H1, P, "Table · header cells") are evergreen with white Fragment Mono. Snags ("Footer read first", "Title is plain text") are rust with white Hanken 600, each anchored to an apricot knot ring with a rust core.
- **Path:** apricot 3.2px for the tangle, evergreen 3.2–4px for the resolved route.
Every sheet that carries meaning has an `aria-hidden` SVG plus a text equivalent (live region, sr-only list or visible copy).

### Ribbon
A full-bleed SVG with `preserveAspectRatio="none"`: a 64px pale celadon band (night-raise on night) with a 2px evergreen centre line (apricot on night) that dash-draws over 2.4s ease-in-out-quint when it scrolls into view. It is decorative and `aria-hidden`, and sits 90–170px tall between acts.

### Seal
A pill with Hanken 700 at 0.9rem and evergreen text on evergreen wash. On night it is ink on apricot. The words carry the state, and the seal needs no leading mark. It reads "Checked · ready to post" and only appears on resolved documents.

### Inputs / Fields
- **Style:** sheet fill, 1px hairline border, 3px radius, 0.75rem × 0.875rem padding, 1rem ink text. Labels sit above in Hanken 560 at 0.95rem, with "(optional)" in muted text and hints in muted text at 0.85rem.
- **Focus:** the border turns evergreen with a 2px evergreen ring at 25%.
- **Error:** `aria-invalid` turns the border rust and shows rust error text below. A rust-wash summary at the top links to each field.
- **Radio cards:** at least 3rem tall with a hairline border. Checked cards get an evergreen border and a 50% evergreen-wash fill (`:has(:checked)`).

### Navigation
- **Desktop (lg and up):** Hanken 480 at 0.95rem in soft ink, turning ink on hover, with a 1px evergreen underline that scales in from the left (0.5s ease-out-expo). The current page keeps the line and `aria-current`.
- **Mobile:** a two-line burger that morphs into an X and opens a full-screen porcelain panel. Items are Source Serif at 2rem with hairline separators and stagger in by 45ms each. A full-width primary pill sits at the foot. Focus is trapped, Escape closes the panel and returns focus, and scroll is locked.

### Estimator (night)
Range inputs use `accent-color` apricot, with apricot mono outputs and plain-language hints. Results are bars on a night-raise track (pill, 12px tall) that animate width over 0.7s. Every line shows its arithmetic in mono beneath it, followed by a written assumptions paragraph.

### Inventory
24 mini sheets on a pale celadon field. They start scattered and rotated (±13°), then sort into five columns with staggered 1.2s ease-out-expo moves. Tone dashes key each group, and a mono disclaimer labels the data as illustrative.

### Report explorer
A sheet with a mono file-name header, vertical tabs (10px radius, evergreen-wash when active), and a panel holding a definition list (Evidence, Change, Made by, Re-checked) plus rust-wash "Before" and evergreen-wash "After" quote panels.

### Motion and reduced motion

- **Easing:** ease-out-expo `cubic-bezier(0.16, 1, 0.3, 1)` for arrivals and state changes, ease-out-quart `cubic-bezier(0.25, 1, 0.5, 1)` for fades, and ease-in-out-quint `cubic-bezier(0.83, 0, 0.17, 1)` for path drawing.
- **Path draw:** the tangle takes 2.2s and the fix 1.9s. Snags pop in one after another, 0.35s apart, starting at 0.9s, and the view switches to fixed at 3.2s. Nodes and chips stagger 0.2–0.22s. Replaying remounts the sequence.
- **Reveal:** content is visible by default and motion only enhances it (`.js-motion`). Elements rise 14px and fade in over 0.9–1.1s, and headings unmask line by line with a 140ms offset.
- **Pointer tilt:** fine pointers only, eased at 0.07 per frame. It is off for reduced motion and below 768px.
- **Reduced motion:** all durations collapse to 0.001ms. Paths render fully drawn, the hero opens on the resolved state and can still be toggled, Replay is hidden, and reveals show at rest.

## Do's and Don'ts

### Do:
- **Do** make the document the hero object of every act: a white sheet with the sheet shadow and 14px radius, drawn in the shared 850×1100 coordinate space.
- **Do** carry the reading path wherever a new surface needs a signature: nodes for order, evergreen for resolved, apricot knots and rust chips for snags.
- **Do** use the italic turn only on the hero h1 and the final CTA h2. Everywhere else, emphasis is an upright evergreen word (apricot on night).
- **Do** use full pills for every action, with one evergreen primary per view ("Request a Readiness Audit").
- **Do** give every illustration a text equivalent and every interactive demo keyboard operation: radiogroups, a range input for the lens, tabs with arrow keys.
- **Do** keep focus visible: a 2px evergreen outline with a 3px offset, apricot on night, and touch targets of at least 2.75rem.
- **Do** label illustrative data as illustrative ("Illustrative collection for a fictional city. Not real data.") and show the arithmetic behind every number.
- **Do** respect `prefers-reduced-motion` by showing the end state, not a frozen midpoint.

### Don't:
- **Don't** add eyebrows or kickers: no small labels above headings. The `eyebrow` prop on PageIntro is accepted but deliberately not rendered.
- **Don't** use status dots: no pulsing or "live" dots and no colored dots standing in for state. Tone dashes are legend keys and always sit beside their text label.
- **Don't** use gradient text, gradient washes, glows or glass. The only gradient in the build is the solid-colour underline on quiet links.
- **Don't** build generic cards: no icon-title-text card grids and no three-up feature rows. Information sits in definition lists, hairline-ruled lists or on the document itself.
- **Don't** use fake proof: no client logos, testimonials, counters, star ratings or invented metrics. Research benchmarks appear only when labeled preliminary.
- **Don't** use apricot for text on light grounds. Use rust.
- **Don't** reintroduce the records-room world: no folder board, index cards, stamp-pad violet, errata red or steel-cabinet night.
- **Don't** set uppercase tracked labels, mono prose or system display faces.
- **Don't** tilt sheets past about 3° in the plane, and don't give anything that is not paper a shadow.
