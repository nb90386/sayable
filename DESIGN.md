---
name: Sayable
description: Make document accessibility visible. The permit form is the product, shown large, centred and well lit, and the reader's scroll moves a blue scan line down it to reveal the hidden structure.
colors:
  paper: "#f8f9fb"
  paper-deep: "#eef1f5"
  sheet: "#ffffff"
  surface: "#e7ebf1"
  ink: "#12151b"
  ink-soft: "#3a414d"
  muted: "#535b69"
  signal: "#2458e8"
  signal-deep: "#1a44c2"
  signal-wash: "#e6edfd"
  signal-light: "#8fb0ff"
  warm: "#e5521f"
  ember: "#b53d12"
  ember-wash: "#fdebe3"
  night: "#10141c"
  moon: "#f3f5f8"
  moon-muted: "#a9b1bf"
typography:
  display:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.4rem + 4.2vw, 5.4rem)"
    fontWeight: 650
    lineHeight: 0.98
    letterSpacing: "-0.042em"
    fontFeature: "\"ss01\" 1"
  display-close:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.9rem, 1.9rem + 4.4vw, 6rem)"
    fontWeight: 650
    lineHeight: 0.98
    letterSpacing: "-0.042em"
    fontFeature: "\"ss01\" 1"
  headline:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.8rem + 3.1vw, 4.6rem)"
    fontWeight: 640
    lineHeight: 1.02
    letterSpacing: "-0.036em"
    fontFeature: "\"ss01\" 1"
  caption-line:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.3rem + 0.9vw, 2.15rem)"
    fontWeight: 560
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.022em"
  lede:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.12rem + 0.4vw, 1.45rem)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "-0.012em"
  body:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.03rem + 0.16vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.58
    letterSpacing: "-0.006em"
    fontFeature: "\"ss01\" 1"
  numeral:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 1.4rem + 1.4vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontFeature: "\"tnum\" 1"
  button:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 560
    lineHeight: 1
    letterSpacing: "-0.01em"
  label:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
    lineHeight: 1.4
  small:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 400
    lineHeight: 1.5
  annotation:
    fontFamily: "JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "-0.01em"
    fontFeature: "\"zero\" 1"
rounded:
  thumb: "4px"
  sheet: "6px"
  field: "10px"
  ui: "14px"
  workspace: "18px"
  pill: "999px"
spacing:
  gutter: "clamp(1.1rem, 0.5rem + 2.6vw, 3rem)"
  max: "82rem"
  header: "3.5rem"
  chapter: "clamp(7rem, 14vh, 11rem)"
  scene: "clamp(9rem, 18vh, 13rem)"
  stack-sm: "1.5rem"
  stack-md: "2.5rem"
  stack-lg: "3.5rem"
  stack-xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.sheet}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.4rem"
    height: "3rem"
  button-night:
    backgroundColor: "{colors.moon}"
    textColor: "{colors.night}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.4rem"
    height: "3rem"
  button-night-hover:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.night}"
  button-quiet:
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.4rem"
    height: "2.75rem"
  link-quiet:
    textColor: "{colors.signal}"
    typography: "{typography.button}"
    height: "3rem"
  link-quiet-night:
    textColor: "{colors.signal-light}"
  segmented-option:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.15rem"
    height: "2.6rem"
  segmented-option-selected:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  player-button:
    backgroundColor: "{colors.moon}"
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
    padding: "0 1.3rem"
    height: "3rem"
  stamp:
    backgroundColor: "{colors.signal-wash}"
    textColor: "{colors.signal-deep}"
    rounded: "{rounded.pill}"
    padding: "0.4em 0.9em"
  stamp-night:
    backgroundColor: "{colors.moon}"
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
  text-field:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "0.75rem 0.875rem"
  permit-sheet:
    backgroundColor: "{colors.sheet}"
    rounded: "{rounded.sheet}"
    width: "min(880px, 92vw)"
  workspace:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.workspace}"
    width: "1100px"
  report-sheet:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.ui}"
    width: "960px"
  finding-before:
    backgroundColor: "{colors.ember-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "0.75rem 1rem"
  finding-after:
    backgroundColor: "{colors.signal-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "0.75rem 1rem"
---

# Design System: Sayable

## Overview

**Creative North Star: "The Object on Seamless Paper"**

Sayable presents a public document the way a hardware company presents a device: one object, large, centred and lit on a luminous cool-white ground, with nothing competing for it. The object is a fictional city's residential permit application, drawn as a white sheet with a second page just visible beneath and a deep soft shadow. Every claim the site makes is demonstrated on that sheet. Positioning carries straight into the visuals. Sayable is about triage and evidence, so the system shows structure and reports what was checked. It never decorates with "compliance" imagery.

The signature is **the structure scan**. In the opening, the sheet sits tilted in a pinned stage below a centred two-line claim. Scrolling flattens it and moves a thin blue scan line down the page. Above the line the paper looks as residents see it. Below the line the hidden structure shows through: dashed ember boxes on five unnamed fields, a pill saying the title is "tagged as text, not H1", and a tangled ember reading path that starts at the footer. The same sheet returns at the close with its structure repaired: a straight blue reading path, numbered order, named fields and a "Checked" stamp. The page is a filmic one-shot. Chapters are centred or full width, and the ground drifts between light and dark through soft gradients, never hard cuts.

The mood is calm, premium, precise and human. Density is low in the story chapters and tighter inside product surfaces (the workspace, the report, the estimator), where the UI is allowed to look like software.

**Key Characteristics:**
- One hero object, the permit sheet, recurs from the opening to the close.
- One accent, structure blue. Ember appears only where a relationship is broken.
- Onest in every role. JetBrains Mono appears only where the text is document structure or computed data.
- Centred chapter heads over full-width demonstrations. No chapter is a 50/50 split.
- Pill-shaped actions and controls. Shadows only on paper and product windows.
- Every illustration, sample and voice is labelled for what it is.

## Colors

The palette is luminous cool white and ink, with one structure blue and a sparse, functional ember. Dark scenes use a blue-black night with moonlight text.

### Primary
- **Structure Blue** (#2458e8): structure made visible. Used for the scan line and its label pill, repaired reading paths, region outlines and name pills on the fixed layer, primary pill buttons, quiet links, the active nav underline, focus rings, selection, caret and range accents, "Automatic" and "Passed" marks in the workspace, the method line in Trust, and the automated share of the cost bar. White on blue is 5.78:1.
- **Deep Structure Blue** (#1a44c2): text on the blue wash, as in the "Checked" stamp (6.75:1).
- **Blue Wash** (#e6edfd): the selected finding row, the "After" listener line, and the stamp ground. Blue text on the wash is 4.92:1.
- **Moonlit Blue** (#8fb0ff): blue on night, used for display emphasis, links and focus rings in dark scenes (8.62:1 on night). On light ground it marks the person-remediated share of the cost bar.

### Secondary
- **Ember** (#e5521f): a broken relationship, as a graphic. Used for dashed outlines on unnamed fields, the tangled reading path, filled "no accessible name" pills, the highlight that follows the spoken element in the "As posted" audio, minor-severity dots, and the "Needs accessibility repair" lane marker. It is 3.78:1 on white, so it is not a text colour for small type.
- **Ember Text** (#b53d12): ember used as text. Used for "tagged as text, not H1" and "read first: footer" pill labels, issue rows in the workspace, the severity and category line in a finding, form error messages, invalid-field borders, and major-severity dots (5.77:1 on white).
- **Ember Wash** (#fdebe3): the "Before, a listener hears" line and the error summary ground.

### Neutral
- **Luminous Paper** (#f8f9fb): the page ground, the header, the mobile menu, and the colour every dark scene fades back to.
- **Cool Band** (#eef1f5): alternating chapter bands (the estimator and the offer) and the stage behind the sheet in the workspace.
- **Sheet White** (#ffffff): documents, product windows, form surfaces and the selected segment.
- **Cool Track** (#e7ebf1): empty tracks, such as the cost-bar trough.
- **Ink** (#12151b): primary text, numbered order markers on the repaired sheet, step numerals, and the "Person" mark.
- **Soft Ink** (#3a414d): secondary body text, nav links at rest, and the stage line in the workspace.
- **Muted** (#535b69): ledes, hints, captions, honesty labels, and secondary headline clauses (6.5:1 on paper, 6.04:1 on the band).
- **Night** (#10141c): the ground of cinematic scenes (the audio chapter and the close) and the footer.
- **Moon** (#f3f5f8): text and buttons on night.
- **Moon Muted** (#a9b1bf): secondary text on night (8.54:1).
- Hairlines are ink at 10% (`rgb(18 21 27 / 0.1)`), strong rules ink at 24%, and night rules moon at 14%.

### Named Rules
**The Blue Is Structure Rule.** Blue marks structure that has been made visible: the scan, a named field, a reading order, a passed check, the next action. If an element is decorative and not structural or actionable, it is not blue.

**The Ember Is a Broken Relationship Rule.** Ember marks a relationship that is broken: a field with no name, a title that is not a heading, a footer read first, a finding's severity, a form error. If nothing is broken, nothing is ember. The one exception is the reading-path knot in the logo. Ember never fills a button and is never used for hover.

**The Wash Pairing Rule.** A wash always carries its own family's text: ember text on the ember wash, deep blue or blue on the blue wash.

## Typography

**Display Font:** Onest (with ui-sans-serif, system-ui)
**Body Font:** Onest
**Label/Mono Font:** JetBrains Mono, 400 and 500, for document annotations and computed data only

**Character:** One humanist grotesk for every role. It feels warm at 650 weight with tight tracking at display sizes, and stays very clear at body size with stylistic set 01 on. The mono reads as the machine's voice: what the file says about itself.

### Hierarchy
- **Display** (650, clamp(2.5rem → 5.4rem), 0.98, -0.042em): the opening claim only, on two lines: "Public documents, / readable by everyone." Supporting-page H1s use the same role at clamp(2.6rem → 5.6rem).
- **Display Close** (650, clamp(2.9rem → 6rem)): the closing claim in the final dark scene.
- **Headline** (640, clamp(2.5rem → 4.6rem), 1.02, -0.036em): every chapter head, centred, held to 14–17ch. A second clause in `<em>` turns Muted (Moon Muted on night) and stays upright.
- **Caption Line** (560, clamp(1.5rem → 2.15rem), 1.3): the live line of spoken text under the audio player.
- **Title** (600, 1.05–1.45rem, 1.15, -0.022em): stage statuses, finding titles, method steps, deliverables and sub-section heads.
- **Lede** (400, clamp(1.2rem → 1.45rem), 1.45): one paragraph under each chapter head, Muted, centred, 42–50ch.
- **Body** (400, clamp(1.0625rem → 1.1875rem), 1.58, -0.006em): running text, 54–72ch.
- **Numeral** (600, -0.04em, tabular figures): estimator results, research benchmarks and audit cover counts.
- **Label** (600, 0.75–0.88rem): definition terms ("Evidence", "Change", "Made by"), workspace marks, and lane names.
- **Annotation** (JetBrains Mono 400, 0.8rem, -0.01em, slashed zero): file names, structure pills on the sheet ("no accessible name", "Field \"Applicant name\""), the scan label "Reading structure", finding categories, URL paths in the inventory, estimator formulas and slider outputs.

### Named Rules
**The One Family Rule.** Onest sets every reading role, from 5.4rem display down to 0.75rem labels. Hierarchy comes from size, weight (400, 560, 600, 640, 650) and tracking, never from a second display face. The only other typefaces live inside the drawn document, which uses Georgia for its title and Helvetica for its fields because it is a city's own form.

**The Mono Is the File Talking Rule.** Mono appears only where the text is something the file or the computation says: a tag, a field name, a path, a formula, a computed value. Headings, section labels and UI copy are never mono.

**The Upright Emphasis Rule.** Emphasis in display and headline type is colour, never italic. It is blue in the opening, Muted in chapter heads, and ember (`em.broken`) for a broken word.

## Layout

The spatial model is a centred column over full-width stages. The content wrap is 82rem wide with a fluid gutter of clamp(1.1rem → 3rem). Every story chapter opens the same way: a centred headline, a centred lede, and at most one centred control or action row. A single demonstration follows at a fixed, generous measure: the sheet at up to 880px in the opening, 760px in the audio chapter and 680px at the close; the workspace and estimator at 1100px; the report at 960px; and the inventory field at the full wrap width.

Vertical rhythm is set by chapter padding: clamp(7rem, 14vh, 11rem) for light chapters and clamp(9rem, 18vh, 13rem) for dark scenes, to leave room for their soft edges. Head-to-demonstration gaps step at 2.5rem, 3.5rem and 4rem. The fixed header is 3.5rem tall, and anchors account for it with scroll padding.

Chapter order follows the story: opening scan; hear the form twice (dark); the collection sorted; one file through five stages; the estimator (band); method and sample report; the audit offer (band); the resolved form (dark). Bands on #eef1f5 alternate with paper. Dark scenes enter and leave through 5–10rem gradients.

**Responsive:** breakpoints are 480px, 640px (sm), 768px (md) and 1024px (lg). Below 768px the opening stage shortens to 210vh, the sheet travels by svh units with a gentler 14° tilt, and the scan label pill is hidden. On phones the inventory field becomes a readable ordered list of the five lanes with counts. The estimator pins a three-figure result bar under the header while the sliders move. The workspace stacks its side panel above the sheet. The player drops waveform bars beyond 24 below 480px. Primary nav collapses into a full-screen menu below 1024px.

### Named Rules
**The Centred Chapter Rule.** Story chapters are centred heads over full-width or centred demonstrations. No story chapter is a 50/50 split with a divider. Two equal columns appear only inside a component, to set a before and after side by side (transcripts, listener lines). Asymmetric 12-column rows remain on supporting pages and the contact form, which are task layouts, not storytelling.

**The One Object per Chapter Rule.** Each chapter has one demonstration. The permit sheet is the only hero object; the workspace, the report and the audit cover are product surfaces that hold it or describe it.

**The No Visible Sequence Rule.** The homepage carries no chapter numbers or progress readout. Numbers appear only where order is the content: the repaired reading order on the sheet and the three buying steps.

## Elevation & Depth

Depth means paper and product windows on a lit ground. Only objects cast shadows: the sheet, its under-page, the workspace, the inventory sheets, the selected segment and report thumbnails. Buttons, inputs, list rows and chapter backgrounds are flat. In dark scenes the sheet takes a heavier, near-black shadow and its under-page turns cool grey (#dfe3ea).

### Shadow Vocabulary
- **Sheet** (`0 0.5px 0 rgb(255 255 255 / 0.9) inset, 0 1px 2px rgb(16 20 28 / 0.06), 0 18px 36px -18px rgb(16 20 28 / 0.22), 0 60px 110px -50px rgb(16 20 28 / 0.38)`): the permit page, the audit cover stack, the report and the form surface.
- **Under-page** (`0 1px 2px rgb(16 20 28 / 0.06), 0 20px 40px -24px rgb(16 20 28 / 0.3)`, rotated 1.1°): page 2 beneath the permit.
- **Sheet on Night** (`0 1px 0 rgb(255 255 255 / 0.05), 0 40px 90px -40px rgb(0 0 0 / 0.9), 0 2px 6px rgb(0 0 0 / 0.4)`): the permit in dark scenes.
- **Workspace** (`0 0.5px 0 rgb(255 255 255 / 0.9) inset, 0 2px 4px rgb(16 20 28 / 0.06), 0 40px 90px -40px rgb(16 20 28 / 0.45)`): the product window.
- **Loose Sheet** (`0 1px 1px rgb(16 20 28 / 0.06), 0 10px 22px -12px rgb(16 20 28 / 0.32)`): file cards in the inventory field.
- **Selected Segment** (`0 1px 2px rgb(0 0 0 / 0.12), 0 4px 12px -6px rgb(0 0 0 / 0.25)`): the chosen option in a segmented control.

### Named Rules
**The Only Objects Cast Shadows Rule.** A shadow says "this is a sheet or a window you could pick up". Nothing else is lifted.

**The Soft Edge Rule.** Ground changes between paper and night are gradients 5–10rem tall (clamp(5rem, 14vh, 10rem)), never a hard horizontal cut.

## Shapes

Documents have gently rounded corners (6px) because they are paper. Product windows are softer: the report and form surfaces use 14px and the workspace 18px. Fields use 10px. Every action and control is a full pill (999px): buttons, segmented controls, the player, stamps and the structure pills drawn on the sheet. Small file cards and thumbnails use 4px. Region outlines drawn on the sheet use a 10px radius in document units. Broken regions are dashed (10 7) and repaired regions solid.

**The Pill Means Interactive or Labelled Rule.** A full pill is either something you press or a label the system attaches (a stamp, a structure pill). Containers are never pills.

## Components

### Buttons
- **Shape:** full pill (999px), 3rem minimum height, 1.4rem side padding, 1.02rem at 560 weight.
- **Primary:** white on Structure Blue. Hover mixes 12% black into the blue in OKLab, press scales to 0.98, and a trailing arrow nudges 2px on hover. Used for "Request a Readiness Audit" and form submission.
- **Night:** Night text on a Moon pill, turning pure white on hover. This is the primary action inside dark scenes.
- **Quiet:** transparent with a 1.5px inset rule at ink 24% and a 6% current-colour wash on hover. Used for in-chapter toggles such as "Sort the collection".
- **Quiet link:** blue text with a small chevron, 3rem tall, underlined on hover. It sits beside a primary button as the secondary action ("Hear the difference", "Discuss a pilot").

### Segmented Control
A pill track (ink at 6% on light, white at 10% on night) with 4px padding holds pill options 2.6rem tall. The selected option is a white pill with ink text and the selected-segment shadow. It is a radiogroup for "As posted / After repair" and a tablist with arrow-key roving for the five workspace stages.

### Audio Player (signature)
One player under one sheet in the dark audio chapter. It is a translucent pill (white at 8%) holding a Moon pill button (play/pause with a drawn icon, labelled "Hear the problem" or "Hear the difference"), a waveform of 44 rounded bars driven by an analyser (played bars at full opacity, unplayed at 38%), and a round replay button. As the narration plays, the spoken region on the sheet lights up: ember for "As posted", blue for "After repair". The spoken words appear in the caption line beneath.

**Honesty labels are part of the component and are never removed:** a footnote under the player reads "Illustrative narration made with macOS text-to-speech. It is not a recording of VoiceOver, NVDA or any screen reader, and the form is a sample, not a customer document." Both transcripts are available in a "Read both transcripts" disclosure. Under reduced motion the waveform is replaced by a plain progress bar.

### The Permit Sheet (signature)
The hero object, drawn as SVG in an 850×1100 space (US Letter at 100 dpi), with named regions for every element the narration speaks. It has three layers:
- **Paper:** the form as residents see it.
- **Broken:** dashed ember outlines, filled ember "no accessible name" pills, outlined ember pills with ember text, and a tangled ember reading path.
- **Fixed:** solid blue outlines, blue name pills in mono, a straight blue reading path, and ink order circles numbered 1–8.

The sheet always sits on its rotated under-page. Every instance has a text equivalent describing what the structure shows.

### Structure Scan (signature)
The opening section is 220vh tall (210vh on phones) with a sticky 100svh stage. Scroll progress `--p` drives everything in CSS, with no per-frame React render. The copy rises and fades out by 25% progress. The sheet untilts from 22° rotateX to flat and rises by 46% of its height. The scan line (2px blue, full sheet width plus 2% each side) travels from top to bottom between 6% and 80% progress. Above it, a clip-path reveals the broken layer under a 3.5% blue tint, and the reading path draws on via dash offset. A blue mono pill rides the line reading "Reading structure". From 60% a caption fades in over a paper gradient, stating what the scan found and labelled "Illustrative sample. Fictional city."

### Workspace
An 18px-radius white window (max 1100px) with a hairline title bar showing the file name in mono and "Illustrative interface · sample data". A 17rem side panel holds the stage name, its status as a title, and marked rows (Issue in ember text; Automatic and Passed in blue; Person in ink). The sheet sits on the cool band at the right. Stages are switched by the segmented tablist above. The sheet's visible content never changes; only its structure layer does.

### Report Explorer
A white 14px sheet (max 960px). The header shows the file name and "Sample report · fictional city" in mono. A vertical tablist of findings uses a severity dot (ember for major, warm ember for minor) and a blue-wash selected state. A thumbnail of the page highlights the named region in ember, with a blue leader line pointing into it. The panel shows the finding title, then an evidence, change, made-by and re-checked definition list, then a pair of ember-wash "Before, a listener hears" and blue-wash "After" lines, then the "Checked" stamp. The caption states that listener lines are simulated and that every report "is not a legal certification of compliance."

### Estimator
Full-width results come first: four large numerals, then three cost rows with pill bars (ink at 70% for by hand, ink at 35% for sort first, and blue split from moonlit blue for sort plus automate). The formula under each row is set in mono. A three-column grid of native range inputs with blue accents follows, each with a mono blue output and a hint. Bars ease over 0.6s and figures tween over 480ms, with no tween under reduced motion. A muted disclaimer sits beside the final call to action.

### Stamp
A pill reading "Checked" with a drawn check, deep blue on the blue wash (night on moon in dark scenes). It marks a verified result only.

### Inputs / Fields
White fields with a 10px radius, a hairline border and 0.75rem × 0.875rem padding. Focus turns the border blue and adds a 2px blue ring at 25%. Invalid fields take an ember-text border, with the error in ember text below and an ember-wash summary at the top listing links to each field. Radio choices are 10px hairline tiles that turn blue-bordered on a half wash when checked.

### Navigation
A fixed 3.5rem paper bar that gains a hairline when scrolled. It holds the wordmark (a small ink sheet with a paper reading path and an ember knot, beside "Sayable" at 500 weight) and nav links in Soft Ink at 0.95rem/480, each with a 1px blue underline that grows from the left on hover and stays for the current page. A compact primary pill sits at right. Below 1024px a two-line toggle opens a full-screen paper menu with 2rem links staggered in at 40ms, a focus trap, Escape to close, and scroll lock.

### Footer
A night block with the wordmark, a one-line promise, site and stage links in Moon, the non-certification line, and an oversized outlined "Sayable" wordmark at moon 30% as the closing signature.

## Do's and Don'ts

### Do:
- **Do** present the permit sheet large and centred, on its under-page with the sheet shadow, as the subject of every story chapter that demonstrates something.
- **Do** use Structure Blue (#2458e8) for structure made visible and for the next action, and Moonlit Blue (#8fb0ff) for both on night.
- **Do** use ember only where a relationship is broken: Ember (#e5521f) for graphics, Ember Text (#b53d12) for type.
- **Do** open every story chapter with a centred headline (640, held to 14–17ch), a centred Muted lede, and one demonstration.
- **Do** enter and leave every dark scene through a 5–10rem gradient from paper.
- **Do** label every sample, illustration and voice where it appears: "Illustrative sample. Fictional city.", "Illustrative interface · sample data", "Sample report · fictional city", and the text-to-speech disclaimer.
- **Do** give every drawn document a text equivalent describing its structure, and every audio demonstration a transcript.
- **Do** drive scroll scenes from a single `--p` progress variable in CSS, and give each a reduced-motion state that shows the resolved frame statically.
- **Do** keep pill shapes for actions, controls and system labels, and 6px corners for paper.

### Don't:
- **Don't** split a story chapter 50/50 or bring back a fixed divider between halves.
- **Don't** add chapter numbers, progress readouts or eyebrow labels above headlines.
- **Don't** use ember for hover, emphasis, branding or a button.
- **Don't** set headings, section labels or UI copy in JetBrains Mono.
- **Don't** introduce a second display face. Onest carries every role; only the drawn city form keeps its own Georgia and Helvetica.
- **Don't** italicise emphasis in display or headline type.
- **Don't** put white small text on Ember (#e5521f), which is 3.78:1. Use Ember Text (#b53d12) on white instead.
- **Don't** cast shadows from buttons, inputs, rows or bands.
- **Don't** cut hard between paper and night.
- **Don't** show compliance badges, testimonials, client logos or invented metrics. The "Checked" stamp marks a reported check, never a certification.
