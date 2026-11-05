---
name: Sayable
description: A municipal records room that finally knows what is in it; folder board, index-card sheets, stamp-pad violet, errata red, steel-cabinet night.
colors:
  folder-board: "#d9bd84"
  folder-board-deep: "#cdae6f"
  folder-manila: "#c9a663"
  index-sheet: "#fbfaf6"
  ink: "#1b1a16"
  ink-soft: "#2f2b21"
  ink-muted: "#4a3c1d"
  stamp-violet: "#3b2db8"
  stamp-violet-bright: "#5a4ae0"
  stamp-violet-wash: "#e4e0fb"
  errata-red: "#8f1915"
  errata-wash: "#f7dcd6"
  cabinet-night: "#18211d"
  cabinet-night-raise: "#222d28"
  night-paper: "#f1ede2"
  night-paper-muted: "#b9b6a6"
  stamp-violet-night: "#b7adff"
  rule: "rgb(27 26 22 / 0.18)"
  rule-strong: "rgb(27 26 22 / 0.4)"
  rule-night: "rgb(236 235 245 / 0.14)"
typography:
  display:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(2.9rem, 1.6rem + 6vw, 7.4rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(2.4rem, 1.7rem + 3.4vw, 4.6rem)"
    fontWeight: 760
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 100"
  headline-sm:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(1.9rem, 1.5rem + 1.9vw, 3.1rem)"
    fontWeight: 760
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 720
    lineHeight: 1.25
  tab-label:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(0.7rem, 0.55rem + 0.35vw, 0.9rem)"
    fontWeight: 700
    letterSpacing: "0.02em"
    fontVariation: "'wdth' 75"
  stamp:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontWeight: 800
    letterSpacing: "0.04em"
    fontVariation: "'wdth' 125"
  lede:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.1rem + 0.45vw, 1.45rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0em"
  button:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.975rem"
    fontWeight: 560
    letterSpacing: "-0.005em"
rounded:
  file-edge: "1px"
  sheet: "2px"
  control: "3px"
  folder: "6px"
spacing:
  gutter: "clamp(1rem, 0.5rem + 2.4vw, 2.5rem)"
  column-gap: "clamp(1rem, 2vw, 2rem)"
  container: "88rem"
  header: "4.25rem"
  section-y: "6rem"
  section-y-wide: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.folder-board}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 1.35rem 0 1.4rem"
    height: "3rem"
  button-night:
    backgroundColor: "{colors.night-paper}"
    textColor: "{colors.cabinet-night}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 1.35rem 0 1.4rem"
    height: "3rem"
  input-field:
    backgroundColor: "{colors.index-sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0.75rem 0.875rem"
  index-sheet:
    backgroundColor: "{colors.index-sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
  manila-folder:
    backgroundColor: "{colors.folder-manila}"
    rounded: "{rounded.folder}"
    padding: "clamp(1rem, 3vw, 2.25rem)"
  folder-tab:
    backgroundColor: "{colors.folder-manila}"
    typography: "{typography.tab-label}"
    rounded: "{rounded.folder}"
    padding: "0.5rem 0.6rem 0.4rem"
  stamp-mark:
    textColor: "{colors.stamp-violet}"
    typography: "{typography.stamp}"
    rounded: "{rounded.control}"
    padding: "0.25em 0.6em 0.2em"
  accession-label:
    textColor: "{colors.stamp-violet}"
    typography: "{typography.label}"
  night-passage:
    backgroundColor: "{colors.cabinet-night}"
    textColor: "{colors.night-paper}"
---

# Design System: Sayable

## Overview

**Creative North Star: "The Municipal Records Room"**

The site is a working records room that finally knows what is in it. The ground is the manila folder board itself: warm, matte, and committed, covering most of every light surface rather than sitting behind content as a tint. On that board sit index-card sheets, nearly white and lightly lifted, which carry the documents, findings and readouts. Verified structure is marked in stamp-pad violet; barriers and defects are marked in errata red; the long explanatory passages (lifecycle, closing invitation, footer) drop into the green-black of a steel filing cabinet.

Type does the filing. Archivo, with its width axis put to work, is the label maker: wide and heavy for headlines, condensed and uppercase for folder tabs, extra-wide for rubber stamps. Public Sans reads the body plainly. Courier Prime is the typewritten clerk's voice for accession numbers, field names, captions and every "this is illustrative" disclosure. The rhythm is a 12-column grid inside an 88rem container, with generous section breaks and hairline rules doing the dividing instead of boxes.

The world rejects the category's SaaS hero-plus-card-grid and the cream-serif editorial default. There are no decorative color gradients and no glow; depth is paper on board, not light on glass.

**Key Characteristics:**
- Manila folder board as the dominant light ground; index-card white only where a document or record sits.
- Stamp-pad violet means "structure that was verified"; errata red means "barrier or finding". Neither is decoration.
- Archivo's width axis carries the hierarchy: wdth 112 display, 100 headline, 75 tabs, 125 stamps.
- Courier Prime for every machine or clerk annotation: accession numbers, tags, disclosures.
- Hairline rules divide; sheets lift softly; folders and tabs give the world its silhouette.
- Steel-cabinet night passages for the long explanatory and closing sections.

## Colors

A warm, papery records palette: manila and off-white grounds, brown-black ink, one violet ink for verified structure, one red ink for errata, and a green-black cabinet for dark passages.

### Primary
- **Stamp-Pad Violet** (stamp-violet): the ink of verified structure. Headline emphasis (the `em` inside display and headline type renders upright in violet, never italic), structure boxes and reading-order paths in the document demonstrations, the custody line for machine checks, accession labels, the focus ring, text selection, form accent and caret, and the automated share of the cost bar.
- **Bright Violet** (stamp-violet-bright): only the 2px structure line that sweeps under a primary button on hover and focus.
- **Violet Wash** (stamp-violet-wash): fill behind small structure tags on the acetate leaf; never a section background.
- **Night Violet** (stamp-violet-night): the violet translated for the cabinet-night ground: headline emphasis, focus ring, link hover and stamps on dark passages.

### Secondary
- **Errata Red** (errata-red): barriers, defects and findings ("Finding 2 of 4 · major"), invalid form fields, the "before" reading order in the two-readers demonstration, and the person-fixed share of the cost bar.
- **Errata Wash** (errata-wash): the light ground behind an errata note; used sparingly.

### Neutral
- **Folder Board** (folder-board): the page ground, body background, theme color and scrollbar track. It is the committed surface, not a tint.
- **Folder Board Deep** (folder-board-deep): a slightly darker board for inset swatches and person-review markers on the custody line.
- **Manila Folder** (folder-manila): the folder itself and its tabs; one step darker than the board so a folder reads as an object lying on it. Tabs step further down the manila range by mixing toward a dark manila brown.
- **Index Sheet** (index-sheet): document pages, report figures, form fields, the cost model section and confirmation panels.
- **Ink** (ink): primary text and the primary button ground.
- **Ink Soft** (ink-soft): ledes and secondary reading text.
- **Ink Muted** (ink-muted): labels, captions, hints and disclosures on board or sheet (5.9:1 on the board).
- **Cabinet Night** (cabinet-night) and **Cabinet Night Raise** (cabinet-night-raise): the dark passage ground and its one raised panel step.
- **Night Paper** (night-paper) and **Night Paper Muted** (night-paper-muted): text on cabinet night.
- **Rule / Rule Strong / Rule Night** (rule, rule-strong, rule-night): translucent ink hairlines for dividers, input strokes and link underlines; the night rule on dark passages.

### Named Rules
**The Two Inks Rule.** Violet is reserved for verified structure and red for barriers. If a violet or red mark does not mean "checked" or "wrong", it does not get the ink.

**The Board Is The Ground Rule.** Light surfaces sit on the manila board. Index-card white appears only where a document, record or form sits on that board; never flood a whole page in sheet white to look "clean".

## Typography

**Display Font:** Archivo, variable with the wdth axis (with Arial Narrow, sans-serif)
**Body Font:** Public Sans (with ui-sans-serif, system-ui)
**Label/Mono Font:** Courier Prime, 400 and 700 (with Courier New)

**Character:** A municipal label maker paired with a plain civic reading face, annotated by a typewriter. The width axis is the system's main expressive tool; weights stay heavy and tracking stays tight on headings.

Note: the build's token for the Archivo role is still named `--font-serif`; it is a sans. Treat the role as "display", not as a serif.

### Hierarchy
The fluid scale runs seven steps clamped from 360px to 1600px viewports (step -1 through step 5, roughly a minor sixth).
- **Display** (800, wdth 112, step 5 for the closing invitation; the hero clamps 2.3 to 4rem and supporting-page intros 2.6 to 5.6rem; line-height 0.92, tracking -0.035em): page-opening and closing statements only.
- **Headline** (760, wdth 100, step 4, line-height 0.98, tracking -0.03em): section headings. A step-3 size at line-height 1.02 serves narrower column headings and supporting-page row headings.
- **Title** (720 to 760, roughly 1.25 to 1.6rem, tight leading): finding titles, check names, sub-panel headings.
- **Lede** (400, step 1, line-height 1.5, ink soft, 34ch default and up to 48ch): the paragraph directly under a headline.
- **Body** (400, step 0, line-height 1.6, 40 to 62ch): reading text.
- **Label** (Courier Prime 400, 0.8125rem, line-height 1.4, no tracking, sentence case): accession numbers, tags, field names, captions, disclosures. Defaults to violet; set in ink muted when it is a caption rather than verified structure.
- **Tab label** (Archivo 700, wdth 75, uppercase, tracking 0.02em, 0.7 to 0.9rem): folder tabs only.
- **Stamp** (Archivo 800, wdth 125, uppercase, tracking 0.04em): rubber-stamp marks only.

### Named Rules
**The Width Axis Rule.** Hierarchy is carried by Archivo's width, not by switching families: 112 for display, 100 for headlines, 75 for tabs, 125 for stamps. Never fake width with letter-spacing or a second display face.

**The Upright Emphasis Rule.** Emphasis inside a heading stays upright at the heading's own weight and changes only to violet. No italics in headings, and never gradient-filled text.

**The Typed Annotation Rule.** Anything a clerk or a machine would write on the record (accession numbers, tag names, "Illustrative example", "Preliminary") is set in Courier Prime at label size, in sentence case.

## Layout

A 12-column grid (column gap clamp 1 to 2rem) inside a centered container of 88rem with a fluid gutter of clamp 1 to 2.5rem. Headings typically take 6 to 8 columns with ledes or body offset to the right half; supporting pages use a 5/7 split of heading and body in hairline-ruled rows. The fixed header is 4.25rem tall and scroll padding clears it.

Sections are separated by generous vertical space (6rem, rising to 7 to 9rem at the sm breakpoint and up) and by single hairline top borders, never by card stacks. Fact strips (the hero's four "Checked against" facts) are hairline-divided definition lists, two columns on mobile and four from md. Sticky readouts (cost total, lifecycle step rail) pin below the header on small screens.

Breakpoints are Tailwind's defaults (sm 640px, md 768px, lg 1024px), with a 767px max-width query flattening the hero folder's 3D tilt on phones.

**The Hairline Divides Rule.** Group with space and a single translucent ink rule. Do not wrap sections or list items in bordered cards.

## Elevation & Depth

Depth is physical paper, not light. Three surfaces exist: the board (flat), the folder (a manila object with a soft cast shadow and an inset top highlight), and the index sheet (lifted with a layered, soft paper shadow). Dark passages are flat; their one raised step is a tonal change to cabinet night raise with a night rule border. The hero adds real perspective: the folder rig tilts in 3D and the acetate structure leaf lifts off the page in Z when it hinges open.

### Shadow Vocabulary
- **Sheet lift** (`0 1px 0 rgb(255 255 255 / 0.8) inset, 0 1px 2px rgb(14 16 32 / 0.06), 0 12px 24px -8px rgb(14 16 32 / 0.12), 0 40px 80px -24px rgb(30 24 90 / 0.22)`): every index sheet: document pages, report figures, form confirmation.
- **Folder cast** (`0 1px 0 rgb(255 255 255 / 0.35) inset, 0 18px 40px -18px rgb(60 40 5 / 0.55)`): the manila folder on the board.
- **Button rest** (`0 1px 0 rgb(255 255 255 / 0.12) inset, 0 8px 24px -12px rgb(14 16 32 / 0.6)`): primary buttons.

### Named Rules
**The Paper Not Light Rule.** Shadows are soft paper casts with a downward offset and negative spread. No glow, no colored halos, no hard offset block shadows.

## Shapes

Records have nearly square corners. Sheets take 2px, buttons, inputs and stamps take 3px, inventory file chips take 1px. The folder breaks the rule on purpose: 2px at the top-left where its tab attaches and 6px elsewhere, with tabs rounded 5 to 6px on top only. The folder tab is a real silhouette, built as a pseudo-element on the folder or as a rail of tabs stepped down the manila range, each sunk 2px lower than the one before.

Index-card ruling is drawn with CSS lines: one faint violet rule every 2rem and a single red margin rule at 2.75rem. A three-pixel dot tooth can grain a sheet. Inventory files are drawn as tiny tabbed folders. The acetate leaf is a clear violet-tinted sheet with a hinge strip and punched holes in folder manila. The custody line is solid 2px violet for machine checks and dashed 1px ink for person review.

Circles appear only in functional controls (the lens drag knob, toggle switches, check indicators). The drawn icon family is a single 1.8px square-capped stroke set, masked to the current color (right and down arrows).

## Components

### Buttons
Heavy, dark and quiet until touched.
- **Shape:** near-square corners (3px), minimum height 3rem.
- **Primary:** ink ground with folder-board text, Public Sans 560, trailing drawn arrow.
- **Hover / Focus:** lifts 1px; a 2px bright-violet structure line sweeps in from the left along the bottom edge (0.6s, ease-out-expo); the arrow nudges 3px right. Active returns to rest.
- **Night:** inverted on cabinet night: night-paper ground, cabinet-night text.
- **Quiet link:** a text action with a 1px underline drawn as a background line that retracts left-to-right on hover while the text turns violet. Inline text links use a 1px underline in rule strong at 0.2em offset that darkens to current color on hover.

### Inputs / Fields
- **Style:** index-sheet ground, 1px rule stroke, 3px corners, 0.75rem by 0.875rem padding, 1rem text, muted placeholder.
- **Focus:** stroke turns violet with a 2px violet ring at 25% opacity.
- **Error:** stroke turns errata red. Choice rows share the same stroke and corner with a 3rem minimum height.

### Navigation
Public Sans 480 at 0.95rem in ink soft, 2.75rem tall targets. Hover darkens to ink; a 1px violet line scales in from the left under the current or hovered item. Mobile opens a full-sheet menu of large Archivo items with Courier accession numbers, entering with a 45ms stagger. The footer is a cabinet-night passage with label-set column headings in night paper muted.

### Index Sheet
The record surface. Index-sheet ground, 2px corners, sheet-lift shadow. Report figures carry a Courier header line (accession number and file name, page count), an errata-red finding line, an Archivo title, a Courier-keyed definition list (Evidence, Change, Made by, Re-checked), a stamp, and a hairline-topped caption.

### Manila Folder and Tab Rail
The hero's signature object. A manila folder with 6px corners and the folder cast holds the notice; above it a rail of five uppercase condensed tabs (Discover, Repair, Verify, Publish, Monitor), the current one in full manila and level, the rest stepping darker and lower.

### Stamp Mark
A rubber-stamp in extra-wide Archivo 800, uppercase, violet, with a 2px border in current color, 3px corners, rotated -4 degrees and multiplied onto the paper. On night passages it switches to night violet with normal blending. It marks a completed check ("Checked · Ready to post"), never a heading.

### Custody Line
The verification sequence as one continuous vertical line. Machine checks are a solid 2px violet segment with a filled violet square marker; person review is a dashed 1px ink segment with an outlined square on folder board deep. Each step carries an Archivo title, Public Sans description, and a Courier "Software check" or "Person" label.

### Acetate Leaf
The structure layer of the living document: a clear sheet tinted 5% violet with a 60% violet stroke, a hinge strip and manila punch holes, hinged over the notice in two crisp steps (90ms, steps(2)). Structure boxes draw in by stroke offset, tags rise into place, and the reading-order path traces through numbered ink nodes.

### Motion
Motion is an enhancement only: content is visible without script, and reduced motion collapses every transition and flattens the 3D rig. Three easings: ease-out-quart (`cubic-bezier(0.25, 1, 0.5, 1)`), ease-out-expo (`cubic-bezier(0.16, 1, 0.3, 1)`, the default), ease-in-out-quint (`cubic-bezier(0.83, 0, 0.17, 1)`, reading-order path only). Reveals translate 18px and fade over 0.9 to 1.1s, or wipe in with a top-down clip mask for headline lines, staggered by 120ms. The contract asked for crisp hinged steps; the build applies stepped timing to the acetate leaf alone and uses long ease-out-expo glides elsewhere.

## Do's and Don'ts

### Do:
- **Do** keep the manila folder board as the light ground and put documents on index sheets that lift off it with the sheet-lift shadow.
- **Do** use stamp-pad violet only for verified structure and errata red only for barriers and findings, with night violet on cabinet-night passages.
- **Do** set headline emphasis upright, at the heading's weight, in violet.
- **Do** carry hierarchy through Archivo's width axis: 112 display, 100 headline, 75 tabs, 125 stamps.
- **Do** set accession numbers, tags, captions and "illustrative" or "preliminary" disclosures in Courier Prime at label size.
- **Do** divide with hairline rules and space; use the custody line (solid machine, dashed person) whenever a sequence of checks is shown.
- **Do** keep every motion optional: visible by default, collapsed under reduced motion.

### Don't:
- **Don't** use decorative color gradients, gradient text, or glow. Linear gradients are allowed only as drawing tools for ruling, underlines and paper tooth.
- **Don't** put eyebrows or kickers above headings; the accession label belongs to records and captions, not to section openers.
- **Don't** build SaaS hero-plus-card-grid layouts or wrap sections in bordered cards.
- **Don't** fall back to the cream-serif editorial look; there is no serif in this system.
- **Don't** use hard offset block shadows or colored halos; shadows are soft paper casts.
- **Don't** use text glyphs as icons; use the drawn single-stroke icon family.
- **Don't** use a stamp as a heading or as decoration without a completed check behind it.
