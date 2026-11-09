# Sayable — final polish feedback (November 8, 2026)

These screenshots are user-provided visual evidence of the EXISTING site. Examine actual current code and browser output before changing anything.

## Screenshot 01: Hero scanner
- The scanner line currently crosses horizontally through the middle of the sample permit form and has a `Reading structure` label. Begin the scan at the TOP of the document and move down as the narrative proceeds. Replace label with a brand-specific, nontechnical term such as `Sayable scan`.
- `tagged as text, not H1` is development jargon. Translate it into resident-language: `This title isn't recognized as a heading.` Another example: `This field has no label, so a screen reader may not say what belongs here.`
- Preserve the detailed permit-document visualization, but ensure text remains legible, the actual findings are explanatory, and the scanner never obstructs critical content/controls. No random particles or annotations with no role.
- Current hero copy is improved. Consider reducing supporting text and making the differentiation and CTA immediately evident. Keep the primary conversion `Request a Readiness Audit`, with a real self-service option only if it works.
- Check the 50/50 hero composition, big unused lower-left space, and proportions at 1440/1024/390. Explore a more unified composition without losing the hero scanner.

## Screenshot 02: Deadline / timeline
- The April 26, 2027 date is clear, but the section has a huge text-and-blank-space imbalance; the actual customer work is represented by a tiny 5-step timeline and miniature paragraphs.
- Replace this with an immersive, understandable visual: website → document inventory → issue prioritization → remediation → evidence/ongoing publishing. Animate as part of a scroll-driven timeline with progressive details; avoid click-required tabs and overlong pinning.
- Shorten or relocate the caveat blocks at bottom; use clearly structured FAQ and context links; do not omit meaningful legal qualifiers.
- Correct `governments serving 50,000 people or more` to the legally accurate total-population description. Verify against current DOJ resources and relevant exceptions before launch.
- Include an immediate connection to an Audit CTA in or directly after this section. Make next steps tangible and demonstrate the initial deliverable.

## The two biggest product communication goals
1. An unfamiliar city clerk or manager understands within 5 seconds what Sayable does, why the documents matter, how it reduces manual work, and what the next action is.
2. The visual effects are part of *one* purposeful story and do not replace clarity or trust. Show a genuine sample report, readable PDFs, realistic findings, defensible assumptions, privacy behavior, and what is actually available today.

## Supporting pages
- Product/How It Works/Solutions/Resources/Company: design meaningful but restrained entrance and navigation transitions; small dropdowns 150–250ms, faster exits, anchored origin, shared layout where applicable, no bounce on routine UI.
- Distinct visual composition for each page, not identical six-section layouts. Fewer words and meaningful product illustrations, no incidental badges or arbitrary mono typography.
- Preserve browser Back/Forward, focus management, logical new-page scroll positioning, keyboard navigation and reduced-motion support.

## Engineering and brand guardrails
- Protect existing Git work; preview only; no production mutation.
- Review legal sources, support for file types and advertised features, actual submission delivery, and security before claims.
- Test real scroll sequences and motion at multiple viewport widths and reduced motion; screenshots alone cannot show animation quality.
- Do not misrepresent samples as customer evidence or prototype features as commercial offerings.
