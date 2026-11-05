# Sayable website — handoff (stopped at the 10:30 PM PT cutoff, Nov 4 2026)

Branch `sayable-website` in `nb90386/Anything`. The site lives in `sayable-site/`, separate from the PolyAlpha app at the repo root. It has not been pushed or deployed.

## Run
```
cd sayable-site && npm install && npm run dev   # http://localhost:3100
npx tsc --noEmit                                 # passes
node scripts/shoot.mjs / <outDir> 1440,390 0     # screenshots + overflow/console check (set PW_CHROME to a chromium path, or run `npx playwright install`)
```
Inside the Claude Code sandbox, the dev server must run unsandboxed because Turbopack's FSEvents watcher is blocked.

## Done
- Next.js 16.4 App Router, React 19, TypeScript (strict), Tailwind v4. No animation libraries: motion is CSS/SVG plus a few small hooks.
- Design system in `src/app/globals.css`: tokens for paper, ink, signal indigo and ember, plus night variants; a fluid type scale; layout, type, button and surface primitives inside `@layer components`; focus styles; reduced-motion handling. Effects live in `src/app/effects.css`.
- Typefaces: Newsreader for the visible page, Schibsted Grotesk for the interface, IBM Plex Mono for the hidden structure. All are OFL, loaded through `next/font`.
- Wordmark (`Wordmark.tsx`): two offset sheets, one for the page and one for its structure.
- Header (`Header.tsx`): desktop nav, plus a mobile menu with `aria-expanded`, Escape to close, focus trap, scroll lock and focus return.
- Footer (`Footer.tsx`): nav, the five stages, legal links, and a "not legal advice / no certification" statement. The email shows only if `NEXT_PUBLIC_CONTACT_EMAIL` is set.
- Hero (`sections/Hero.tsx` + `hero/LivingDocument.tsx`): a fictional, clearly labeled city notice drawn in SVG. Its semantic layer floats in 3D above the page. Tag outlines draw in, tag labels decode, and a numbered reading-order path draws through the blocks. The hero also has pointer parallax, a "Show hidden structure" toggle (`aria-pressed`), a screen-reader description, and a static final state when reduced motion is on.
- `doc/notice.tsx`: the shared document artifact and its block geometry, meant for reuse in later sections.

## Not verified yet: do this first next session
- The last round of fixes has not been screenshotted:
  - chips moved into nested `<g>` because the CSS transform was overriding the SVG `transform`, so they rendered at the origin;
  - primitives moved into `@layer components` so Tailwind's `hidden` works, since `.btn` was showing on mobile;
  - hero headline resized and grid changed to 7/5.
- Nav links point to routes that don't exist yet (`/product`, `/how-it-works`, `/solutions`, `/approach`, `/contact`, `/accessibility`, `/privacy`), so they currently 404. "Explore Sayable" points to `#two-readers`, which doesn't exist either.
- No lint run, no production build, no axe or Playwright tests.

## Remaining, in priority order
1. Pages for every linked route, starting with `/contact`. Form plan: a server route `POST /api/contact` with validation, a honeypot and in-memory rate limiting. It forwards to `CONTACT_WEBHOOK_URL` when that is set. Otherwise it returns an honest "not connected, nothing was sent" response with a copy-message or mailto fallback. Never fake a successful send.
2. Homepage sections, following the brief's narrative:
   - "Two readers" lens (`#two-readers`): range-input slider comparing the visible page with simulated screen-reader structure, labeled as a simulation;
   - inventory triage field (Must fix / Archive / Delete / Convert, labeled illustrative, triage presented as a recommendation);
   - sticky dark Discover→Monitor lifecycle reusing the notice;
   - interactive repair bench (tables and lists route to a person, per spec §8.8);
   - editorial list of audiences;
   - verification and trust section using the research figures from spec §1, labeled as test results, not customer outcomes;
   - final CTA with a particle canvas resolving into ordered lines.
   Stub CSS hooks for some of these already exist in `effects.css`.
3. Lint, build, Playwright + `@axe-core/playwright` tests, screenshots at 1440/1024/768/390/360, Lighthouse.
4. Vercel preview, only after the above passes.

## Content rules (from `sayable-spec/SAYABLE-BUILD-SPEC.md` §3)
Never say "compliant", "certified", "guaranteed" or "ADA approved". No testimonials, client logos or invented metrics. Research numbers must be labeled as research. Re-check the Title II compliance dates (April 26, 2027 / 2028) against the Federal Register before publishing them.

## Config still needed
`CONTACT_WEBHOOK_URL` (+ optional `CONTACT_WEBHOOK_SECRET`) and `NEXT_PUBLIC_CONTACT_EMAIL`; see `.env.example`. The domain and mailbox don't exist yet.
