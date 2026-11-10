---
name: Sayable
description: Making the invisible structure of public documents visible. One permit form is the protagonist. A reading line scans it, it becomes one card in the city's collection, the collection sorts itself into piles, the form returns and is repaired under the same line, and it hands over its record.
colors:
  paper: "#ecebe7"
  paper-deep: "#e1dfd9"
  sheet: "#fbfaf8"
  ink: "#17150f"
  ink-soft: "#3d3931"
  muted: "#5f5a50"
  signal: "#1b5a45"
  signal-light: "#8ed3b2"
  warm: "#cf4520"
  ember: "#a33612"
  signal-night: "#ff9a72"
  night: "#1f2b2a"
  dusk-lit: "#3a4a47"
  dawn: "#e7e2d7"
  moon: "#eeede9"
  moon-muted: "#a7a49d"
typography:
  display: { fontFamily: "Funnel Display (variable)", fontWeight: 500, letterSpacing: "-0.028em to -0.034em", lineHeight: "0.98 to 1.02" }
  text: { fontFamily: "Funnel Sans (variable)", fontSize: "clamp(1.0625rem, 1.03rem + 0.16vw, 1.15rem)", lineHeight: 1.5 }
  technical: { fontFamily: "system ui-monospace", use: "crawl logs, tag-tree nodes, cookie names only" }
---

# Design system: Sayable

Rebuilt on 2026-11-08, on branch `sayable/signature-experience-vNext`. The earlier systems are held by tags:

- Newsreader with carbon black: `backup/pre-signature-2026-11-08`
- Onest with structure blue: `backup/pre-reconstruction-2026-11-08`

The choices are documented in `FONT-AUDIT.md`, `docs/design-reference-study.md` and `docs/dependency-decisions.md`.

## North star

The public record, made readable. The page is one room with one document in it, and the light in the room changes as the story moves. Nothing is a feature card. Every effect is the reading line's doing: it reveals, marks, repairs and checks.

## Colour: one room, changing light

The story stage has a ground colour (`base`) and a pool of light (`lit`) that follows the document. Both are scrubbed with scroll, so there is never a cut.

| Chapter | Ground → light | Why |
|---|---|---|
| Hero and scan | Paper #e9e8e3 → #f6f5f1 | Daylight on the form. The problem is visible because the light is good. |
| One file to thousands, sorting | Mineral dusk #1f2b2a → #3a4a47 | The collection fills the room, and depth needs a darker ground. It is green-slate, never black, and its hue is related to the viridian of repair. The change runs across about 65 viewport-heights. |
| The repair | Morning #e7e2d7 → #f8f4ec | The light comes back as the form is fixed. Repair copy is dark on light at full contrast. |
| The record | Paper again | The same daylight as the opening. |
| Close and footer | The same mineral dusk | The ending rises from the bottom in the story's dusk, and the footer shares it. |

Roles:

- **Vermilion (warm #cf4520, ember #a33612)** means something a person would get stuck on. It is used for the problem chips, dashed field boxes, the tangled reading path and the "fix first" pile edge.
- **Viridian (signal #1b5a45)** means repaired, checked or available. It is used for the reading line, the repaired structure, links and the focus ring.
- **On dusk:** text is moon #eeede9 (12.9:1), quiet text is moon-muted #a7a49d (6.4:1), links are signal-light #8ed3b2.
- No highlighted words in headlines, and no italics for emphasis.

## Typography

- **Funnel Display 500** for headlines, the deadline date, scene titles, report titles and figures. Tracking tightens with size. Line height is 0.98 on the hero and about 1.02 on scene titles.
- **Funnel Sans** for text, labels and controls. Labels are 600 in sentence case. There are no uppercase eyebrows.
- **Monospace** is used only where it means "machine text": crawl log lines, tag-tree nodes and the consent storage key. It is the system mono stack, with no web font.
- The fictional form keeps its own document fonts (Georgia, Helvetica) inside the SVG. It is the city's document, not the brand.

## The signature: one document, one continuous story

The story lives in `src/components/home/Story.tsx`, `StageVisual.tsx`, `geometry.ts` and `palette.ts`. It is one pinned stage: 820vh on desktop, 700vh on phones. Motion's `useScroll` is the only scroll controller. Every value is a pure function of scroll progress, so the story reverses exactly and survives resizes and deep links.

1. **Scan intro.** "Sayable reads the form the way a screen reader does." The form lies large on the right, turned a little towards the copy (rotateX 9°, rotateY -13°).
   - The reading line rests at the top edge until the visitor scrolls (no arrival run since Sprint 4).
   - This is the scanner from the original hero (`Opening.tsx` at commit e416ec9), recovered. The structure layer is clipped above the line, as it was, and the line now moves inside the document's own coordinate space.
2. **The scan.**
   - Scrolling continues the line down the form. Above it, the problems appear:
     - "tagged as text, not H1"
     - dashed vermilion boxes on the unnamed fields, with two name chips (not seven)
     - "read first: footer"
   - The tangled reading path then draws.
   - Where the line crosses an element, corner marks flash and a few particles leave its edges (a canvas inside the document).
   - The copy is "It looks fine. A screen reader hears something else.", with optional narration and a transcript.
3. **One file to thousands.**
   - The ground turns to dusk, and the form shrinks to one card at the centre of the room, outlined in viridian so you can follow it.
   - Over 100 documents come out from behind it into a shallow 3D volume. Each is projected at scale F/(F+z), with haze by depth.
   - The documents are six recognisable kinds: agendas, permits, notices, budgets, minutes and inspection forms. Five near cards carry their kind's name.
4. **Priorities.**
   - Every card travels on an arc onto one of four piles, each pile as tall as its illustrative share. The piles are:
     - residents use now
     - archived
     - scans and complex tables
     - posted every month
   - Sorted cards take their pile's colour on the top edge.
   - The permit form lands on top of "fix first".
   - While cards move fast, each draws three faint trailing copies. This is canvas motion blur and never touches text.
   - The copy says "The piles are an illustration, not real data".
5. **The repair.**
   - The piles sink back and the form lifts off its pile to near full height. The light becomes morning, and the problems reappear on the whole page.
   - The reading line returns. Above it the structure is repaired in viridian (names, order, heading); below it the problems remain.
   - The copy is "Then a person repairs them." It is honest about the software still being tested and the person who checks every fix.
6. **The record.**
   - The form settles at the centre.
   - Its report is revealed out from under the form's right edge by a mask. It shows finding, evidence, correction, re-check, the two other fixes and the limits.

What follows the stage:

- **What the city receives.** Five miniature sheets fan out of one packet, with one line each saying which offer provides it.
- **The deadline.**
- **The checker comparison.**
- **The estimator.**
- **The close.** The dusk rises from the bottom with a curved top edge, carrying the audit cover, the repaired form and its report, which settle into one stack. One sentence, one primary action, then the footer in the same dusk.

Reduced motion renders the same scenes as still figures in reading order, and the close without the rise. "Skip the story" is the first focusable element in the stage. Focusing any link inside a hidden scene scrolls the story to that scene.

## Motion tokens

| Interaction | Timing |
|---|---|
| Press | scale 0.97 |
| Menus and popovers | 200 ms open ease-out, 160 ms close, from the trigger at 0.95 (within the transitions.dev 250/150 range) |
| Route change | old page fades out in 120 ms, new page fades in 200 ms and rises 12 px after 100 ms; the header is excluded |
| Estimator figures | spring, bounce 0, 0.45 s |
| Hero scan run | 1.6 s, `cubic-bezier(0.45,0,0.2,1)`, once, after 0.45 s |
| Story, receive, close | scroll-scrubbed only: transform, opacity, clip-path, one canvas redraw per frame |

## Materials

- **Paper objects** (the form, its second page, reports, audit sheets) have a hairline edge, a contact shadow and a long soft shadow. Nothing else has a resting shadow.
- **Light** is a radial pool on the stage that follows the document, plus a warm glow behind the form card in the dusk.
- **The header** is translucent paper (`blur(18px) saturate(160%)`). Over the dusk chapters it becomes translucent mineral, and it is solid under reduced transparency.
- **Grain** is 6% soft-light on the story stage only.
- **Radius** is 3–4 px for paper and 12 px for UI surfaces and the report card. Buttons are pill-shaped.

## Components

- **Buttons:** ink pill with paper text. `btn-quiet` is an outline; `btn-night` is moon on dusk.
- **Status:** a filled viridian dot means available now; a hollow ring means planned or in pilot.
- **Comparison ledger:** six rows, and Sayable loses on cost.
- **Estimator:** one logarithmic slider. The other assumptions sit behind a disclosure. Hours only, never savings.

## Final pass additions (8 November 2026)

- **Sayable scan:**
  - The line starts at the top of the form.
  - Findings are explained in plain words in a numbered scan log, numbered to match the marks in the form's margin.
  - Technical identifiers appear only under "Technical details".
  - Never put developer jargon (H1, TU, artifact) on the main visual.
- **Deadline workspace:**
  - One fictional city's PDF list moves through Find, Prioritize, Repair, Verify and Keep up as the reader scrolls.
  - Rows re-sort with Motion shared layout.
  - Under reduced motion it is not pinned.
- **Motion tokens (CSS):** `--dur-press` 90ms, `--dur-fast` 150ms, `--dur-base` 220ms, `--dur-slow` 350ms, `--dur-enter` 220ms, `--dur-exit` 150ms, `--ease-out` cubic-bezier(0.22,1,0.36,1).
- **Motion tokens (JS, `src/lib/motion.ts`):** `DUR.ui` 0.22, `DUR.uiExit` 0.15, `POPOVER_FROM` 0.97.

## Market-ready additions (9 November 2026)

- **Deadline hero** (`DeadlineHero.tsx`, `src/lib/deadline.ts`): the date in Funnel Display 500 at up to 14.5rem, filled with a top-lit ink gradient and a one-pixel highlight below. Days, hours and minutes sit on paper tiles (sheet surface, inset top highlight, two-layer shadow). Changed digits slide 55% down into place over 220 ms, and the old digit leaves in 150 ms; reduced motion swaps them instantly. The numbers render only on the client, ticking on the minute. There are no seconds: this is a deadline for planning, not a sale.
- **Resident demo** (`Resident.tsx`): the form, held sticky beside the announcement list on desktop and pinned compact above it on phones. Vermilion dashes mark problem lines and fields; viridian marks repaired ones. The structure overlay reuses the scanner's broken and fixed layers.
- **Desktop privacy bar**: one slim pill along the bottom, at 1000px and wider.
- Supporting-page heroes (`PageHero.tsx`, `hiw/HeroFlow.tsx`, `about/DocStructure.tsx`, `solutions/Workflows.tsx`) use the same paper, Georgia document type, vermilion and viridian.
