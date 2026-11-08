---
name: Sayable
description: The public record, made readable. One permit form is the protagonist; scrolling shows what a screen reader meets, multiplies the form into a city's archive, sorts it, repairs one file and hands over its report.
colors:
  paper: "#ecebe7"
  paper-deep: "#e1dfd9"
  sheet: "#fbfaf8"
  surface: "#d9d6cf"
  ink: "#17150f"
  ink-soft: "#3d3931"
  muted: "#5f5a50"
  signal: "#1b5a45"
  signal-light: "#8ed3b2"
  warm: "#cf4520"
  ember: "#a33612"
  signal-night: "#ff9a72"
  night: "#141310"
  moon: "#eeede9"
  moon-muted: "#a7a49d"
typography:
  display:
    fontFamily: "Newsreader (opsz, variable), Iowan Old Style, Georgia, serif"
    fontWeight: 420
    letterSpacing: "-0.02em to -0.035em"
    lineHeight: "0.92 to 1.05"
  text:
    fontFamily: "Public Sans (variable), system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.03rem + 0.16vw, 1.15rem)"
    lineHeight: 1.58
  machine:
    fontFamily: "JetBrains Mono"
    use: "file names and accessible-name values only"
---

# Design System: Sayable

Rebuilt on 2026-11-08 (branch `sayable/creative-reconstruction-2026-11-08`). The earlier "object on seamless paper" system, with Onest, structure blue and mono labels, is retired. The backup tag `backup/pre-reconstruction-2026-11-08` holds it.

## North star: the public record, made readable

A city's documents are printed matter: notices, forms, agendas. Sayable's visual language comes from that world. Headlines are set like a public notice in a serif with optical sizes. Text is set in Public Sans, the typeface of the US Web Design System, which government buyers already read every day. Grounds are archive stone and carbon, like paper on a dark desk. Colour is rare, and it always means something.

The page is one story about one document. It is not a stack of feature sections.

## Colour

Colour has a job or it is not used. Nothing is coloured just to add an accent.

| Role | Token | Hex | Use | Contrast |
|---|---|---|---|---|
| Ground | paper | #ecebe7 | Page ground, header material | |
| Band | paper-deep | #e1dfd9 | Alternate band (comparison, How it works step two) | |
| Paper object | sheet | #fbfaf8 | Documents, reports, request forms | |
| Ink | ink | #17150f | Text, primary buttons (paper on ink) | 15.3:1 |
| Secondary text | ink-soft | #3d3931 | Body copy beside headlines | 9.6:1 |
| Quiet text | muted | #5f5a50 | Captions, notes, honesty labels | 5.7:1 on paper, 5.1:1 on band |
| Repaired, checked | signal (viridian) | #1b5a45 | Repaired structure, "available now" dots, links, focus ring | 6.8:1 |
| On carbon | signal-light | #8ed3b2 | "Check before posting" group, links in dark scenes | 10.7:1 on night |
| A problem a person hits | warm (vermilion) | #cf4520 | Broken structure as graphics: dashed field boxes, tangled reading path, "fix first" bars | 3.9:1, never small text |
| Problem as text | ember | #a33612 | Problem labels on the document | 5.7:1 |
| Problem on carbon | signal-night | #ff9a72 | "Fix first" strips in the archive, narration progress | 9.0:1 on night |
| Carbon | night | #141310 | Story chapters two to five, footer, closing band on pages | |
| Text on carbon | moon / moon-muted | #eeede9 / #a7a49d | | 15.9:1 / 7.5:1 |

Rules:
- **Vermilion means a person would get stuck.** Nothing else is vermilion.
- **Viridian means repaired, checked or available.** It is also the link and focus colour, because a link is the action that is available.
- **No highlighted words in headlines.** Emphasis comes from what the sentence says.
- The paper is a low-chroma stone, not cream. Both Impeccable and the Taste Skill inspector flagged the earlier cream (#f3efe7) as a reflexive "tasteful" ground.

## Typography

- **Display: Newsreader**, weight 420, optical sizing on. Used for headlines, the deadline date, scene titles and large figures. Tracking tightens as size grows: about -0.02em at headline size and -0.035em on the date.
- **Text: Public Sans**, at 1.0625–1.15rem with 1.58 leading. Labels are 0.82–0.9rem at weight 600, in sentence case. There are no uppercase eyebrows.
- **Machine: JetBrains Mono**, only for genuine identifiers such as `permit-application.pdf`, crawl paths and accessible names (`Field "Applicant name"`). It is never used for section labels, step counters or decoration.
- No italics for emphasis. Curly apostrophes and quotes.
- Numbers that change (the estimator) use tabular lining figures and ease to their new value without bouncing.

Scale (fluid): body `--step-0`, lede `--step-1`, sub-heading `--step-2`, section heading `--step-3` and `--step-4`, hero `clamp(2.6rem, 1.3rem + 3.7vw, 5.1rem)`, deadline date up to 9.5rem.

## Composition

- **One focal point per screen.** In the story, the document or the archive is the focal point. Copy sits beside it, never on top of it. On phones the screen splits: the visual takes the top 53% and the copy the rest.
- **Anchors vary by scene.** The hero copy runs across the top. The problem copy sits left, the scale and priorities copy at the top, the repair copy right, and the record copy left again.
- **No 50/50 splits, no repeated rows, no numbered steps unless the order matters.** The only remaining numbers are the reading-order markers on the document and the request steps on the audit page, where order is the content.
- Rules (hairlines) separate ledgers and tables. Cards are reserved for paper objects: documents, reports and the request form.

## Materials and depth

- **Paper objects** have a soft offset shadow and a hairline edge. Nothing else has a resting shadow.
- **The header** is a translucent paper material (`backdrop-filter: blur(18px) saturate(160%)`). It turns to carbon over dark chapters (`html[data-hdr="night"]`) and goes solid with reduced transparency.
- **The page edge.** `main` has rounded lower corners and casts a shadow onto the carbon footer, so the site ends like a sheet lifted off a desk. The footer stays in normal flow, so nothing in it is ever covered.
- Fine grain sits on the story stage only, as a pseudo-element at 7% soft-light.

## The signature: one document, one story

`src/components/home/Story.tsx`, `StageVisual.tsx` and `geometry.ts`.

A single pinned stage (680vh on desktop, 600vh on phones) driven by Motion's `useScroll`. Every visual is computed from the stage size, and every scene is reversible.

1. **Hero.** The form lies tilted below the headline, cropped by the fold. Its position comes from the measured height of the hero copy.
2. **The problem.** The ground darkens, the form stands up, and its broken structure draws in: unnamed fields, a title tagged as text, and a reading path that starts at the footer. Narration is opt-in, labelled and has a transcript.
3. **The scale.** The form shrinks into one tile of a canvas archive of 300–500 sheets, which appear outward from it.
4. **Priorities.** The tiles sort into four groups, labelled "Illustration, not real data".
5. **The repair.** The same tile comes back out as the form. Vermilion structure gives way to viridian, and a person-checked repair is described honestly.
6. **The record.** The ground lightens and the sample report slides in over the form's edge.

A chapter rail (desktop) jumps to any scene. Focusing anything inside a hidden scene scrolls to it. Reduced motion renders the same scenes as still figures.

## Motion

Motion (`motion/react`, LazyMotion `m`) drives everything. CSS transitions are kept for hover and press only.

| Interaction | Timing |
|---|---|
| Press | scale 0.97, 60ms in |
| Menus and popovers | 200ms ease-out, exits 160ms, from the trigger at 0.95 |
| List stagger | 30ms |
| Route change | old page fades in 120ms, new page fades in 200ms and rises 12px, after 100ms. Header excluded (`view-transition-name: site-header`) |
| Estimator figures | spring, bounce 0, 0.45s |
| Story | scroll-linked only: transform, opacity, and one canvas redraw per frame inside the archive window |

- Route transitions use React 19.3 `<ViewTransition>` in `app/template.tsx`.
- `data-scroll-behavior="smooth"` on `<html>` lets Next turn smooth scrolling off during navigation. This removes the visible scroll back to the top that the owner disliked.
- Back restores the previous scroll position. Reduced motion shortens route fades to 80ms and 120ms, with no movement.

## Components

- **Buttons:** ink pill with paper text. Hover mixes in 28% viridian. `btn-quiet` is an outline, `btn-night` is paper on carbon.
- **Status:** a dot and a label. Filled viridian means available now; a hollow ring means planned or pilot. No filled pills.
- **Comparison ledger** (homepage): six rows, two columns, dot marks. Sayable visibly loses on cost.
- **Workload estimate:** one logarithmic slider (1,000 to 200,000 pages, default 10,000). The other assumptions stay behind a disclosure. Two results with range bars, a live sentence for screen readers, and no savings claims.
- **Deadline:** the date as the headline, a five-step line (Find, Sort, Repair, Check, Keep up) whose rule and dots draw with scroll while the text stays at full contrast, then three facts and sources.
