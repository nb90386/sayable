# Sayable website — handoff (first complete version, Nov 4 2026, ~11 PM PT)

Branch `sayable-website` in `nb90386/Anything`, folder `sayable-site/` (separate from the PolyAlpha app at the repo root). Committed locally; **not pushed, not deployed**.

## Run
```
cd sayable-site && npm install
npm run dev                  # http://localhost:3100
npm run typecheck && npm run lint && npm run build
PW_CHROME=<chromium path, optional> npm run test:e2e   # needs the dev or prod server on :3100
node scripts/sections.mjs / <outDir> 1440               # per-section screenshots
node scripts/ovf.mjs / 360                              # horizontal-overflow report
```
In the Claude Code sandbox the dev server must run unsandboxed (Turbopack's FSEvents watcher is blocked).

## What exists
**Stack:** Next.js 16.4 App Router, React 19, strict TypeScript, Tailwind v4. No animation libraries; motion is CSS/SVG/canvas plus small hooks. All pages are static except `/contact` (reads `?topic=`) and `/api/contact`.

**Design system** (`src/app/globals.css`, `effects.css`): paper, ink, signal indigo, ember; fluid type scale; Newsreader (visible page), Schibsted Grotesk (interface), IBM Plex Mono (hidden structure); primitives in `@layer components`.

**Homepage** (`src/components/sections/`):
1. `Hero` + `hero/LivingDocument`: a fictional notice with a 3D-lifted structure layer. Tag outlines draw in, labels decode, and the reading order draws through the page. Pointer parallax and a structure toggle.
2. `TwoReaders` (`#two-readers`): a draggable or keyboard range lens comparing the visible page with the simulated screen-reader structure, before and after repair, with a transcript.
3. `Inventory`: 160 illustrative files sort into Must fix / Archive / Delete / Better as a web page, with a replay toggle.
4. `Lifecycle`: dark sticky scroll story; one document moves through Discover → Repair → Verify → Publish → Monitor.
5. `RepairBench`: pick a finding, apply the repair, and see the tag-tree diff and the simulated announcement. Tables are routed to a person, per spec §8.8.
6. `Audiences`: editorial list of four buyers.
7. `Verification`: layered checks, the report statement, and research figures labeled as research.
8. `FinalCta`: glyph particles settle into ordered page lines (canvas runs only while visible and stops once settled).

**Pages:** `/product`, `/how-it-works` (stage anchors), `/solutions`, `/approach`, `/contact`, `/accessibility`, `/privacy`. Shared parts are in `components/pages/PageParts.tsx`.

**Contact:** `POST /api/contact`:
- validation shared with the client (`lib/contact.ts`), honeypot, 12 KB cap, in-memory rate limit (5 per 10 min per IP);
- forwards to `CONTACT_WEBHOOK_URL`, signed with HMAC if `CONTACT_WEBHOOK_SECRET` is set;
- without a webhook it returns 503 `not_configured`, and the UI says nothing was sent and offers a copy-message option, plus mailto only if `NEXT_PUBLIC_CONTACT_EMAIL` is set.

## Verified (this session)
- `tsc --noEmit`, `eslint .` and `next build` are all clean.
- Playwright + axe (`tests/site.spec.ts`), at 1440 and 390, with reduced motion:
  - no axe violations for WCAG 2.0/2.1/2.2 A/AA on all 8 routes;
  - exactly one h1 per page, no horizontal overflow, no console errors;
  - every internal link returns 200;
  - the lens slider moves with the keyboard and the repair bench toggles;
  - the contact form shows inline errors;
  - the mobile menu closes on Escape and returns focus.
  - Result: 23 passed, 1 skipped by design.
- Screenshots reviewed: home at 1440 and 390, /contact, /product, /solutions, /how-it-works at 390. Overflow is checked at 360 for all routes.
- Fixed during review:
  - the lens range thumb was intercepting taps below the lens on mobile;
  - a hydration mismatch from float precision in the inventory;
  - long mono labels forced 160px of overflow on mobile;
  - scroll-reveals could hide headings, so reveals are now limited to the hero.

## Not verified / known limitations
- Lighthouse (mobile, production build, local), final run: **Performance 92**, LCP 3.4 s (simulated throttling; was 4.4 s before dropping Newsreader's opsz axis, which halved the font files). Earlier full run: Accessibility 100, Best Practices 96, SEO 100, CLS 0, TBT ≤ 90 ms. LCP is still above the 2.5 s target; next try is inlining critical CSS or subsetting the italic.
- No real screen-reader pass (VoiceOver or NVDA); 1024 and 768 checked for overflow (none) and the 1024 homepage reviewed; no Safari or Firefox runs.
- The screen-reader output on the site is simulated and labeled as such.
- The hero tag-decode effect shows scrambled glyphs for about 1 second on load (decorative; the hero is `aria-hidden` with a text description).
- The rate limiter is per instance and in memory. Use a shared store (for example Upstash or Vercel KV) before relying on it in production.


## Redesign pass (Nov 4–5 2026, Impeccable-led)
- **Impeccable**:
  - The skill is installed at user scope (`~/.claude/skills/impeccable`); no project-scope reinstall. Its design hook ran on every edit.
  - Steps used: `impeccable context`; init (PRODUCT.md written from the brief, no interview); new-work direction roll (`concept-seed`, seed:8e32e96647d1ab8e); direction contract at `.impeccable/surfaces/src-app-page-tsx.md`; craft floor; detector on `src/` and on http://localhost:3100; the `impeccable-finish-reviewer` subagent.
  - Code-led build, because no image generation was available.
- **Initial findings**:
  - The look sat in the "cream ground + italic serif + tracked mono labels" generated-UI cluster, and used banned default faces (Newsreader, IBM Plex).
  - Eyebrow kickers on every section; Unicode arrows standing in for icons; colored left-border callouts; a grid-line background.
- **Rendered detector results**: 49 findings after the first redesign pass, including a selector collision that collapsed the lifecycle column; **0** after fixes. Two advisories remain, both documented: the index-card ruling is deliberate world material, and a hero decode glyph overlap is transient.
- **New world: municipal records room.**
  - Palette: manila folder ground, index-card white, stamp-ink violet, errata red, steel-cabinet green-black for dark sections.
  - Type: Archivo (wide/condensed) for headings and tabs, Public Sans for reading, Courier Prime for the typewritten clerk's voice.
  - The hero notice sits in a tabbed folder; inventory files are tabbed folders; the closing section stamps the ordered page.
- **New Act Four**: `CostModel.tsx`, an interactive cost and effort model.
  - Seven inputs, three scenarios with the arithmetic shown, hours of hand work remaining, and the monthly run-rate.
  - Assumptions are labeled with their sources. It is not a quote.
  - A pinned summary on mobile.
- **Narrative order**: hero → two readers → inventory → lifecycle → repair bench → cost model → verification → audiences → CTA.
- **Copy**: em dashes cut; check-before-post described as in development wherever it appears.
- **Finish review** (Impeccable finish reviewer, fresh subagent):
  - First verdict: **fix**, with 8 material items: tab rail, acetate leaf, sample report finding, custody line in place of the card cascade, ledger rows in place of hero metrics, mobile inventory labels, mobile CTA overlap, price citation.
  - All 8 were applied and scored resolved. One mobile regression (tab truncation) and a leaf inset were then fixed and scored resolved.
  - Final verdict: **ship**, scoped to those scored items, not a whole-surface re-audit. The reviewer verified 390 only; 360 was checked by DOM measurement.
- **Final checks**: rendered detector 0 anti-patterns; 23/23 Playwright + axe; production build passes.
- **Lighthouse** (mobile, production build): Performance 94, Accessibility 100, Best Practices 96, SEO 100. LCP 3.0 s, CLS 0, TBT 0 ms.
- **Founder must confirm**: the "Washington State cooperative contract 02024 … $3.34 / $4.60" figure in the cost model hint (from spec §1).

## Next session
1. Lighthouse on a production build, plus a VoiceOver pass over the lens, the repair bench and the contact form.
2. Bring LCP under 2.5 s (inline critical CSS, subset fonts).
3. Configure the webhook and inbox, then deploy a Vercel preview.
4. Re-check the Title II compliance dates against the Federal Register before adding any date copy (the site currently avoids specific dates).

## Content rules (spec §3)
Never "compliant", "certified", "guaranteed" or "ADA approved". No testimonials, logos or invented metrics. Research numbers must be labeled as research. Triage is a recommendation.
