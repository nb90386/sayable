# Design reference study

Inspected 2026-11-08 with headless Chromium (Playwright 1440×900 desktop, 390×844 mobile). For each site we took a first-viewport frame, then frames at regular scroll steps, driven by wheel events so the scroll libraries would react. We also recorded computed styles and DOM probes. Frames are in `docs/reference-study/<site>/`: `d00–d11` are desktop, `m00–m02` mobile, `s*` dense 600px steps, and `contact-*.jpg` are contact sheets. Everything below comes from those frames and probes. Motion is described from still frames, so easing, video and WebGL timing were **not** captured.

All nine sites loaded with HTTP 200. None blocked headless browsing. The Apple `/ipad/` page has become a store-style hub, so we also captured `https://www.apple.com/ipad-pro/` as the product-story reference.

---

## 1. Miligram (https://miligram.pt/, primary)

**Does well:** editorial art direction from a light serif and a single deep colour.
- **Type (measured):** headlines are `ivypresto-headline` weight 300, 62–86px, letter-spacing −0.2px. Body is `neue-haas-unica` 300/400/500. Italic Ivy Presto marks the emphasis word ("*método*", "*Branding*", "*respostas*") and is also used for buttons ("*Marcar Reunião*", "*Vamos Falar?*").
- **Colour (measured):** paper `#F5F4F4`, ink `#1A1A1A`, a single accent of deep green `#004536` (buttons and italic words), and dark chapters in `#1A1A1A` (frames d07–d09, for the portfolio, the FAQ lead-in and the footer).
- **Behaviours:** the hero headline types itself with a caret ("Real Bra|", d00, m00). A huge dark-green 3D "m" is cropped off the right edge (d00). A halftone dot sphere sits behind "Uma abordagem 360°" (d03). In the "Evolua com / *Branding* · *Design* · *Digital* · *Multimédia*" sequence (d04–d06) a fixed roman label stays left while an italic word and a tag list change on the right. Libraries: GSAP, ScrollTrigger and Lenis. No canvas.

**Relevance:** Sayable already uses Newsreader with Public Sans. Miligram shows how far a light serif can go when it is the only display voice and emphasis comes from italic plus one colour, not bold.
**Original equivalent:** reserve Newsreader *italic* in the repair colour (viridian) for the one word per chapter that names the outcome ("*readable*", "*verified*"). Keep a stable roman lead phrase beside the changing words.
**Do not copy:** the 3D monogram, the dot sphere, the typing caret or the gold/silver award badges.
**Limits:** we could not measure the typing speed. The page is in Portuguese.

## 2. RTM Audio (https://www.rtmaudio.com/, primary)

**Does well:** one product object stays continuous across five chapters.
- **Object persistence (s00–s12, d00–d05):** one rendered CXB plug-in panel lives on a `position: sticky` stage that fills the viewport (`div.stage`, 1440×900). The probe found a 1037×648 `<canvas>` and a `cinema/cxb3d/rt.js` script. In the hero the panel is tilted in strong perspective and bleeds off the right edge (s00). Each chapter rotates and re-places it: "CXB" sits lower left (s02–s03), "One knob moves the pair" centred (s04), "Depth and Speed" lower right (s06–s07). At "The instruments. *One rack.*" it settles flat, front-on, at a smaller size (s11). It then scrolls away and the *same* panel reappears as the first catalogue card (s13). Copy changes beside the object while the object never cuts.
- **Background:** almost constant. Measured `#0E0F10` through the story, `#0D0E0F` / `#090A0B` in the catalogue (s13+). Chapters differ in tone through warm radial glows behind each product card (d07–d09), not through a page-colour change.
- **Type/colour (measured):** "Söhne Breit" 500, h1 76px with −1.9px tracking, h2 49px. Warm off-white `#F0E9DC`, nav in sand `#D6C5A3`, and a tan accent on the second headline line (`#B08B5C`, "Not the volume."). JetBrains Mono for prices and licence labels.
- **Ending (d10–d11):** a dense "Pick the instrument your session needs" list, then "Any four plug-ins, one price. $169". The offer is the last thing on the page.

**Relevance:** this is the closest model to Sayable's permit PDF. One object stays on screen and is re-posed to explain each step.
**Original equivalent:** keep the permit sheet on a sticky stage. Tilt it slightly at intake, show it flat and front-on while the reading line scans, pull it back small as the inventory appears, and bring it forward again for the repair. At the end, the same sheet becomes the first row of the verification report, as RTM's panel becomes the catalogue card.
**Do not copy:** the skeuomorphic hardware look, Söhne Breit, the sand-on-charcoal palette, or "Judge X. Not Y." headline phrasing.
**Limits:** we saw canvas rotation only between frames, so there are no interpolation curves. On mobile the panel is oversized behind the headline (m00), which hurts contrast; Sayable should avoid this.

## 3. Möbius (https://mobius.framer.website/, primary)

**Does well:** typographic choreography on a single white ground.
- **Type (measured):** "Inter Display" 800, the h1 wordmark at 240px with −12px tracking, "Ideas in Motion." at 160px with −8px. Body is Inter Display 500 at 20/32. Black `#000` on white `#FFF` everywhere, so the background never shifts (all dense frames measured `rgb(255,255,255)`).
- **Behaviours:** in the hero, a stack of tilted photo cards overlaps the giant wordmark (s00). Next, scattered words fly in from the edges ("rity", "imaginat", "turnin", s01) and assemble into a centred sentence (s02). Then an "Ideas in Motion." marquee runs in two rows, one solid and one ghosted, while a central image card grows from a strip at the bottom (s03) to a large centred card (s04) and changes its image. There are sticky service chapters "A/ B/ C/ D/" with the label pinned left (s05–s09), and large numerals "25 / 42 / 83" used as photo masks (s11–s14). The probe found 13 `position: sticky` elements, Lenis, and Framer.
- **Ending (d11):** the 240px wordmark returns over the newsletter and legal links, bookending the hero.

**Relevance:** Möbius keeps continuity through repeated type and one growing frame, not through colour. The card that grows from a strip into a centred frame behind moving type is a good model for the sheet multiplying into the inventory.
**Original equivalent:** let the single permit sheet shrink into one tile of the inventory grid while the chapter headline keeps moving behind it. Reuse the hero line or wordmark in the closing chapter.
**Do not copy:** words flying in from the edges, numeral-shaped photo masks, the marquee or the template layout. It is a sellable Framer template.
**Limits:** we have no Framer motion values. The marquee speed was not measurable.

## 4. Apple iPad (https://www.apple.com/ipad/) and iPad Pro (https://www.apple.com/ipad-pro/)

- **/ipad/:** a lineup hub with product chips, a horizontal "Explore the lineup" carousel, "Why Apple", "iPad essentials" and an accordion (d00–d05). The background alternates `#FFFFFF` and `#F5F5F7`. Fonts: SF Pro Display 600 (h1 80px, −1.2px), SF Pro Text. No scroll story.
- **/ipad-pro/:** a 30,838px page, all black (`#000`, `#161617` and `#1D1D1F` near the end). It is built from short statement chapters: centred two-line headlines such as "Ultra Retina XDR. The world's most advanced display." (d04) and "Magic Keyboard. Precision at your fingertips." (d06). Each sits on near-empty black with the device in a different pose: the hero (d00), a thin edge-on profile (d05), the screen with UI (d02, d07). It uses 17 videos and a sticky local nav. It ends with "Why Apple is the best place to shop iPad" and a comparison grid (d08–d09).
- **apple.com home:** a stack of full-width tiles, black and `#F5F5F7`, then a two-up grid (d00–d06). Each tile has a centred name, one line and two pill CTAs.

**Relevance:** one headline per viewport, lots of empty space, and the product posed differently each time. Sayable's chapters should each carry a single two-line claim.
**Do not copy:** SF Pro, the pill CTA pairs, the black/`F5F5F7` tile rhythm or product-name-as-headline.
**Limits:** most motion is in videos, which we did not capture.

## 5. Incroy (https://www.incroy.com/)

- **Colour flood (f00–f08):** after "What in the world wide web has happened to websites?" with its chat and sticky-note props, a purple `#6053E5` shape rises from the bottom with a convex curved top edge. It covers the viewport in about 1.5 screens of scroll (f03→f06). "That's where we come in" then resolves letter by letter in a serif (f07–f08). GSAP with SplitText, ScrollTrigger, Lenis, Barba, Webflow.
- **Type:** "Suisseintl Book" 400 for headlines (48px, −2.16px), Inter for body. "Blaak" serif and "Indie Flower" are loaded for accents ("*your last*", "*get started?*").
- **Ending (e00–e06, d09–d11):** a pale lavender gradient panel with "Ready to *get started?*", one paragraph and a single "Chat with us" button, then a quiet footer. Underneath is a fixed, `aria-hidden` `.overscroll_container` holding a CMS list of messages ("You made it to the bottom", "Go on, Let go!", "This is it.", "Nothing left down here", in several languages). It is revealed when the user keeps pulling past the end. In headless wheel tests the footer lifted about 15px over a curved grey edge (e01–e04), but the message itself stayed at opacity ≈0. **We saw the mechanism but not the visible effect.**

**Relevance:** the curved flood is a clean "problem → answer" chapter change. The ending pairs one calm action with a reward for scrolling past it.
**Original equivalent:** move from the stone paper into the carbon "deadline" chapter with a straight, document-like edge, such as a page sliding over a page, not a blob. At the very end, a past-the-end pull could show a single line of the verification log ("Checked 14:02 — 0 failures"), but it must be decorative and `aria-hidden`.
**Do not copy:** the purple, the curved flood shape, the joke messages or the hand-drawn notes.

## 6. Davide Carusio (https://www.davidecarusio.it/en)

- **Background shift (d00–d04, m00–m01):** cream `#F9EFE7` hero with a huge "davide carusio" wordmark. Inside a sticky title container (`.sticky-title-container`) the page darkens to `#1C1C1B` for "Why do you need a website that actually works?" (d01). It then grades through warm grey (d02–d03) back to cream (d04), while lines fade in one at a time ("Search is where most people meet you first. / No results, …"). A 1440×3150 `<canvas>` and the Unicorn Studio script are present, so the gradient is probably canvas-driven, but we did not confirm it. A fixed grain layer is also present.
- **Type:** Geist 500–700 (h2 64px, −1.6px tracking), Geistmono for small labels. Services list in carbon with a dim/active state (d07). The wordmark returns in the footer (d09).

**Relevance:** this is the clearest example of a **scroll-scrubbed background tone shift** between chapters: dark for the problem, warm light for the answer.
**Do not copy:** the giant name lockup, Geist or the cream/carbon pair as-is.

## 7. Premotio (https://premotio.com/)

- A loader (d00), then a hero "Designed already / Now make it (move)" (m00). Next, "Start with the good part" over a tilted grid of cards (d01), and a sticky category list ("Carousels … → Grids … → Trails") whose arrow advances with scroll while the cards rearrange (d02–d03, `.story__stage` sticky). A 14px fixed "scroll ruler" with tick marks runs down the right edge on every frame.
- **Ending (d09):** a black footer with "Motion ready before you are", a giant wordmark, and "Keep scrolling to open premotio ↓". A fixed `.handoff-layer` turns overscroll into navigation into the app.
- Fonts: Inter Tight 500. Ground `#F5F5F7`, ink `#1D1D1F`.

**Relevance:** the arrow-in-list progress marker and the scroll-to-hand-off ending.
**Do not copy:** the scroll ruler as decoration, the parenthetical "(move)" wordplay, or the card grids.

## 8. transitions.dev (https://transitions.dev/library.html and /detail.html?t=…)

The library lists 43+ recipes. **Pro-only** (sidebar badge): Organic shimmer, Pro gradient text, Image generation placeholder, Spinner to check morph, Confetti burst, Gooey plus menu, Card stack hover, Drag & drop with physics, Image open tilt, Delete with smoky dissolve, Get Pro button. **Free:** everything else, including Menu dropdown, Dropdown menu morph, Modal, Panel reveal, Page side-by-side, Tabs sliding, Tooltip, Accordion, Toast, Texts reveal, Skeleton reveal, Number subtle change, Spinning counter, Success check, Error shake, Icon swap and Banner stacking. Free recipes install with `npx transitions-dev add --free`. **No "popover" or "shared element" recipe exists.** The nearest are Dropdown menu morph and Tooltip.

Tokens read from the free CSS:

| Recipe | Open / in | Close / out | Easing | Other |
|---|---|---|---|---|
| Menu dropdown | 250ms | 150ms | `cubic-bezier(0.22,1,0.36,1)` | scale 0.97→1, closes to 0.99, origin-aware |
| Dropdown morph | 350ms | 250ms | open `cubic-bezier(0.34,1.25,0.64,1)` (overshoot), close `(0.22,1,0.36,1)` | radius 40→20px, 200ms cross-fade, 2px blur |
| Modal | 250ms | 150ms | `(0.22,1,0.36,1)` | scale 0.96 |
| Tabs sliding | 250ms | — | `(0.22,1,0.36,1)` | pill moves via translateX + width; snaps without transition on first paint and resize |
| Page side-by-side | 250ms | 250ms | `(0.22,1,0.36,1)` | 8px slide, 3px blur |
| Tooltip | 150ms after 80ms delay | 50ms | ease-out | travels 160ms between triggers |
| Accordion | 250ms | 250ms | `(0.22,1,0.36,1)` | |
| Panel reveal | 400ms | 350ms | `(0.22,1,0.36,1)` | 2px blur |
| Toast | 350ms | 250ms | `(0.22,1,0.36,1)` | 16px rise, scale 0.97 |
| Texts reveal | 500ms | — | `(0.22,1,0.36,1)` | 12px rise, 40ms stagger, 3px blur |

Every recipe defines a `prefers-reduced-motion: reduce` block that sets `transition: none`. The Accessibility doc says to animate only transform, opacity and filter, and never to convey state through motion alone.

---

## Decisions for Sayable

1. **One sheet, one stage.** The permit PDF stays on a single sticky stage from the hero to the repair, re-posed and never re-mounted (RTM s00→s11): slightly tilted at intake, flat and front-on while the reading line scans, small as one tile among the inventory, then forward again for the repair.
2. **The sheet turns into the report.** At the verification chapter the same element shrinks into the first row of the report, as RTM's panel turns into catalogue card s13. There is no cross-fade to a new illustration.
3. **Background tone tracks the argument, scrubbed rather than cut.** Use stone paper for intake and inventory, grade to carbon for the deadline and problem chapter, then return to paper for the repair and verification (Carusio d00→d04). Interpolate the colour across about one viewport of scroll on a fixed backdrop layer, not on the section boxes.
4. **Change tone within a chapter through light, not hue.** Inside the dark chapter, separate priority groups with a soft warm glow or a single vermilion edge behind the active group (RTM d07–d09), not with new background colours.
5. **One claim per viewport.** Each chapter gets one short headline with empty space around the object (iPad Pro d04, d06). *Superseded:* the earlier idea of italic emphasis borrowed from Miligram was dropped. The owner bans italic emphasis, and the type moved to Funnel Display (see FONT-AUDIT.md).
6. **Show progress in the copy, not a widget.** The chapter label stays fixed on the left and the active step moves (Miligram's "Evolua com", Premotio's "→ Grids"). Do not add a decorative scroll ruler.
7. **A quiet, single-action ending, bookended.** Close with one sentence, one primary action ("Send us your inventory") and the hero line restated small (Möbius d11, Incroy e00). An optional past-the-end pull may show one verification-log line, `aria-hidden`, with nothing important behind it.
8. **UI micro-motion on the free transitions.dev scale.** Use 250ms open and 150ms close with `cubic-bezier(0.22,1,0.36,1)` for menus, modals, tabs and route changes (8px, 3px blur). Use 500ms with a 40ms stagger for headline reveals. Keep the overshoot curve only for the one button-to-surface morph. Every transition gets a reduced-motion `none` path.
9. **Mobile composition is its own design.** Do not shrink the desktop stage. Put the sheet below the headline and never behind the text (RTM m00 shows the failure mode).


## How these decisions were applied (8 November 2026)

- **1 and 2.** One sheet persists from the hero to the record. Rather than shrinking into a report row, the report is masked out from under the sheet's edge, so the sheet stays readable as the evidence.
- **3.** The tone shift is scrubbed, but the dark chapter is the collection (dusk, mineral #1f2b2a), not the problem. The problem is shown in daylight on the form, where the copy stays at full contrast.
- **4.** Light, not hue, follows the document: a radial pool of light, and a warm glow behind the form card.
- **7.** The close takes Incroy's rising curved flood as a principle and makes it original: Sayable's own dusk rises with the result in it, and the footer continues in the same dusk. There is no past-the-end message.
- **8.** The site's menu and route tokens already sit inside the transitions.dev range.
- **9.** Phones get their own composition: the visual takes the top 55%, the copy the rest, and the piles form a 2×2 grid.
