# Redesign audit: why the previous Sayable site still read as generated (Nov 5 2026)

Baseline captures (gitignored) are in `docs/screens/zc-before/`. The version audited is tag `pre-zero-compromise`.

## Typography
- **The type was a familiar editorial default.** Source Serif 4 display with an italic turn on the opening and closing lines, over a grotesk body (`src/app/layout.tsx`, `.display em.turn`). That is the "fashionable serif + italic" pattern the Impeccable catalog flags, and the detector flagged both bookends (`italic-serif-display`).
- **Hierarchy was flat.** Every section opened with the same `.headline` at `--step-4` plus a right-hand lede (Two Readers, Estimator, Trust, Audit). The reviewer flagged this as a repeated opening formula.
- **Mono was used as decoration.** Labels such as "What you see" and "Software check" were set in Fragment Mono even though they carry no data.

## Composition
- **The hero was a split template.** Copy on the left, the product on the right, a feature row underneath (`sections/Hero.tsx`). Impeccable's persuade rules call this "the template whatever world paints it".
- **One section skeleton, repeated.** `grid-12` with a heading at 7 columns and a paragraph at 4 opened five sections in a row.
- **Cards everywhere.** White rounded sheets with the same 14px radius and the same three-layer shadow on every object: the hero sheet, report, audit packet, lifecycle and inventory tiles.
- **Pinned dead space.** The lifecycle used `min-h-[85vh]` stage articles, so most of the scroll showed an unchanged pinned sheet (`sections/Lifecycle.tsx`).

## Color
- **The palette was a known AI default.** Porcelain, evergreen and apricot: the "cream / sage / terracotta" family, with an evergreen night band.
- **The accent had two meanings.** Apricot marked snags, then also served as decoration in ribbons and links. It had to be policed with revision notes.

## Motion
- **The ribbons were decorative.** `Ribbon.tsx` drew a wave between sections. It carried no information, and it resembled the reference site's flowing band.
- **Reveal masks on headlines.** These had to be dialed back because they hid content in captures.

## Content
- **Too many abstract claims.** "Find / Fix / Check / Keep up" was a four-up feature row.
- **No sound at all.** The site described screen-reader output without letting anyone hear an example.

## Product experience
- **Three demos of the same idea.** The demonstrations were strong but fragmented: hero toggle, lens and report all showed "before/after" in different visual languages.
- **No narrative frame on mobile.** It was a stacked version of desktop.

## What the rebuild does about each
See `scrollcraft/builds/sayable/BRIEF.md` and DESIGN.md. In short:
- **Split stage.** The whole page is two columns, "What you see" and "What a screen reader gets". It ends with the accessible column winning.
- **New type and color.** Bricolage Grotesque, Atkinson Hyperlegible, and porcelain/graphite/vermilion. Vermilion marks only what is broken.
- **Audio.** An audio before/after on a permit form, with transcripts.
- **One signature move.** The divider is the reading path.
- **One peak.** The audio comparison.
- **A designed mobile composition.**
