# Sayable — November 8, 2026, latest feedback

## Screenshot 1: Current scanner

The initial visible permit document still shows a green scan line partway through its content. The request is for a genuinely scroll-synchronized before-to-after product story:
- At the top of the page / initial load, render an **unfixed** permit with visually discoverable accessibility issues. The scanner should be at its initial top edge but **not autoplay**. Even if the page sits idle for 10 seconds, neither the scan line nor its remediation state should advance.
- When the **user scrolls**, the scanner follows their scroll progress down the PDF. Its movement and each finding are mapped to concrete parts of the document; content near each finding explains the issue in plain English. As progress advances beyond each finding, the **illustrative repair state** becomes visible with clear before/after evidence. Never imply that scrolling has actually repaired a real uploaded file.
- Scrolling backwards must reverse the animation cleanly. Fast scrolling, window resize, refreshing at a nonzero scroll position, and reduced-motion/keyboard alternatives all need tests.
- The scanner must flow into the document collection/inventory scene without a jarring reset, duplicated PDF, or black flash. No generic tabs or click-through required to understand it.

## Screenshot 2: Ten inspiration sites mentioned in a video screenshot
1. https://land-book.com/ — premium layouts and section rhythm
2. https://supahero.io/ — hero references; site now notes integration with screensdesign
3. https://pricingpages.design/ — audits/offers/scoping, price clarity, contact-sales
4. https://socialproofexamples.com/ — real proof patterns, no fake customers/logos
5. https://reallygoodemails.com/ — confirmation and onboarding email
6. https://deck.gallery/ — polished sample audit reports and diagrams
7. https://posts.design/ — brand graphics and visual consistency
8. https://adfolio.design/ — concise B2B conversion and benefit messaging
9. https://navbar.gallery/ — navigation and dropdown quality
10. https://ogimage.gallery/ — custom social preview images

## Supporting page visual problems
- Product, How It Works, Solutions/Government, Readiness Audit, Verify, Resources, About and Company should be visually rich and credible, without meaningless blank areas or walls of copy.
- Use sample document inventories, before/after evidence, workflow diagrams, report covers and actual product UI where verified. All sample numbers marked illustrative, never fabricated customer metrics.
- Charts must communicate grounded figures (actual metrics or clearly labeled scenarios with transparent formulas). Do not add 'statistics' just to fill space.
- Refresh typography, motion and CTA design across all public pages, not only the homepage.

## Final constraints
- Existing Next.js project; protect original; preview only, not production.
- Preserve real business claims and distinctions between working functionality, service-supported work, demos and planned features.
- Fix actual contact-form delivery and other launch blockers if possible; do not invent configurations.
- Test rendered result, accessibility and mobile; verify preview URL, do not invent.
