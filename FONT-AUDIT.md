# Font and colour audit, 8 November 2026

## Why the old system had to go

The reconstruction used Newsreader (a serif) for headlines, Public Sans for text and JetBrains Mono for file names and labels. The owner's screenshots show the problem: three families with different construction met in the same view. The large serif fought the sans navigation and buttons, and the monospaced `permit-application.pdf` label looked decorative rather than technical. The headlines were also set light (weight 420), so on the dark chapters they looked thin and grey.

## How the audition was run

The same Sayable content was set in every candidate: navigation and wordmark, the hero headline, the supporting line, both buttons, a section heading, a large changing figure, and the report interface. Each treatment was rendered in Chromium at 1440 px and at 390 px (2x), using the real fonts from Google Fonts.

The generator and the screenshots are in `scripts/tmp/audit/` (not committed). The evidence is kept in `docs/font-audit/`:

- `hero-7-treatments.jpg`: the first seven treatments, hero only
- `all-desktop.jpg`: the first seven treatments, the whole comparison frame at 1440 px
- `finalists-desktop.jpg`: Funnel, Funnel with Atkinson, Atkinson alone, Familjen
- `finalists-mobile.jpg`: Funnel, Funnel with Atkinson, Schibsted, the old Newsreader system, at 390 px

| | Treatment | What the screenshots showed | Verdict |
|---|---|---|---|
| A | Newsreader + Public Sans (the old system) | The serif was elegant, but it clashed with the sans UI and looked thin on dark. | Rejected |
| B | Schibsted Grotesk, one family | Solid and newsy, but close to a default grotesk at display size. | Rejected: too generic |
| C | Bricolage Grotesque (88 width, 96 opsz) + Hanken Grotesk | Compressed and fashionable. At hero size it read as a trend, not an institution. | Rejected |
| D | **Funnel Display + Funnel Sans** | One superfamily. The open, slightly squared curves are recognisable, the weights are calm, and the text cut is wide and very legible at 16–18 px. | **Chosen** |
| E | Familjen Grotesk + Public Sans | Its single-storey "a" has character, but looked quirky and start-up at display size. | Runner-up for display |
| F | Host Grotesk, one family | Clean but anonymous. | Rejected |
| G | Wix Madefor Display + Text | Competent, close to Inter in feel. | Rejected: generic |
| H | Funnel Display + Atkinson Hyperlegible Next | Atkinson's accessibility story suits the product. But its default slashed zero makes "50,000" and "2027" read like code. | Rejected for prose figures |
| I | Atkinson Hyperlegible Next, one family | The same slashed zeros, and heavier at display size. | Rejected |

The UI UX Pro Max typography data was consulted (`typography.csv`: Lexend + Source Sans 3, IBM Plex Sans, Atkinson Hyperlegible, Libre Bodoni + Public Sans and others). Its government recommendations lean on Atkinson and Plex, which led to treatments H and I. It was used as a reference, not adopted.

## The chosen system

| Role | Family | Settings |
|---|---|---|
| Display: headlines, the date, large figures, the wordmark in the header | Funnel Display, variable | Weight 500. Tracking about -0.028em at heading size and -0.034em on the hero. Line height 0.98–1.02. |
| Text and controls | Funnel Sans, variable | 1.0625–1.15rem body with 1.5 leading. Labels at 600. Tabular figures where numbers change. |
| Technical identifiers only | The system monospace (`ui-monospace`, SF Mono, Menlo) | Only for crawl logs, tag-tree nodes and cookie names on the inner pages. No web font is downloaded for it. |
| The fictional permit form | Georgia and Helvetica inside the SVG | The document keeps its own realistic typography. It is a city's form, not Sayable's brand. |

Licences: Funnel Display and Funnel Sans are under the SIL Open Font License 1.1 (Google Fonts). They are served by `next/font/google` and self-hosted at build time, so no request goes to Google. No proprietary or Apple font is used.

Tokens: `--font-display` and `--font-sans` are set in `src/app/globals.css`, and the font loading is in `src/app/layout.tsx`.

Changes made with the switch:

- Every heading role moved from weight 420 to 500, with tighter tracking.
- The `.mono` class was removed from file names, report labels, reading-time notes, page numbers and section labels on `/verify`, `/resources`, the guides, the sample audit report and How it works.
- The repaired-document chips in the permit SVG are now set in Funnel Sans at 600 instead of mono.

## Colour treatments

The same hero and the two collection scenes, the city view and the sorted piles, were rendered in three treatments. The evidence is in `docs/font-audit/palette-3-treatments.jpg`.

| Treatment | Collection ground | Result |
|---|---|---|
| Bright editorial | Deep stone #d3d1c9 | The depth disappeared. Cards on stone read as a flat grid, and light copy on stone failed contrast, which would have meant a second set of text colours. |
| **Deep mineral** | Green-slate #1f2b2a, lit to #3a4a47 around the form | **Chosen.** It is dark enough for depth and for the paper to glow, and clearly not black. Its hue is related to the viridian used for repairs, so dusk and repair belong to one family. |
| Civic ink | Blue-black #1b2135 | Distinctive, but it reads as a generic corporate navy, and it pulls away from the paper and viridian. |

The final journey is described in `DESIGN.md`. In short: daylight on the form, then a gradual dusk across about 65 viewport-heights of scroll while the collection fills the room. The morning returns for the repair, and daylight comes back for the record. The close and the footer share the same dusk.
