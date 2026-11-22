# Sayable website

This repository is the marketing and product website for Sayable, a service that helps cities and public agencies make their published PDFs usable with screen readers. It is a Next.js App Router site. It explains the offer (a Readiness Audit, PDF repair, and pilot or planned services), walks through the ADA Title II web rule dates, and links to plain-language guides. It also includes one working tool: a free PDF accessibility check that runs entirely in the visitor's browser. Everything else that looks like product (the homepage document scan, the workspace mock, the sample report, the inventory rows, the estimator figures) is an illustration that uses a fictional city and form. The audit, repair and verification services described on the site are carried out outside this codebase. This repository contains no crawler, repair pipeline, upload endpoint, accounts or customer data.

## Routes

All routes live under `src/app/`.

| Route | What it is |
|---|---|
| `/` | Homepage: a scroll-driven story built from `src/components/home/` (`Story`, `Receive`, `Resident`, `Deadline`, `Difference`, `Workload`, `Close`) |
| `/check` | Free in-browser PDF check (see below) |
| `/product` | Offer overview with "available now" and "pilot or planned" status for each service |
| `/readiness-audit` | What the paid audit covers, with a sample report and FAQ |
| `/how-it-works` | The service stages, each with its own illustrative artifact |
| `/verify` | How the structural, semantic and human checks differ |
| `/solutions`, `/solutions/government`, `/solutions/agencies` | Pages for each audience |
| `/resources` and four guides | `title-ii-rule-and-your-pdfs`, `inventory-government-pdfs`, `what-a-pdf-audit-tells-you`, `why-automated-checks-miss-problems` |
| `/about`, `/security`, `/contact` | Company, security practices, request form (`/contact?topic=...` preselects the interest) |
| `/accessibility`, `/privacy`, `/terms`, `/cookies` | Policy pages. Privacy, terms and cookies show a "Review draft" notice and "To be confirmed before launch" placeholders |
| `POST /api/contact` | Contact form endpoint (Node runtime) |
| Generated | `sitemap.xml`, `robots.txt`, Open Graph images (root, `/product`, `/readiness-audit`, `/resources`, `/solutions/government`), `icon.svg`, `apple-icon`, branded 404 |

`/approach` permanently redirects to `/verify` (`next.config.ts`).

## Features verified in source

**In-browser PDF check** (`src/lib/pdfcheck.ts`, `src/components/check/PdfChecker.tsx`)
- Parses the file with `pdfjs-dist` in a dedicated Web Worker. The file is never uploaded. The worker and its cmaps and standard fonts are self-hosted under `public/pdfjs/`, and `scripts/copy-pdfjs.mjs` refreshes them.
- Reports on tags, real text vs. scanned images, document title, language, form field names, image descriptions, headings, tables and bookmarks. Reading order is always marked as needing a person.
- Limits: 25 MB, the first 400 pages, a 90-second time limit, and a Stop button that terminates the worker. Non-PDF, empty, password-protected and damaged files each get their own error.
- Three sample PDFs for a fictional city sit in `public/samples/` and are built by `scripts/make-samples.mjs` (uses `pdf-lib`).
- These checks look at structure only. The page itself says they are not a full PDF/UA validation and cannot judge meaning.

**Contact form** (`src/components/forms/ContactForm.tsx`, `src/app/api/contact/route.ts`, `src/lib/contact.ts`, `src/lib/deliver.ts`)
- Client and server share the same validation. The server also has a honeypot field, a 12,000-character body cap, and an in-memory rate limit of 5 requests per 10 minutes per IP.
- Delivery goes to whichever channels are configured: email through the Resend REST API, a JSON webhook (HMAC-SHA256 signed when a secret is set), or both. A request succeeds only if at least one channel accepts it.
- With no channel configured, the API returns `503 not_configured` and the form says nothing was sent. It then offers "Copy your message", plus a `mailto:` link if a public contact email is set. The form never shows success unless the server confirms delivery.

**Deadline countdown** (`src/lib/deadline.ts`, `src/components/home/DeadlineMark.tsx`)
- Shows a whole-day countdown to the Title II compliance dates hard-coded in `deadline.ts` (April 26, 2027 and April 26, 2028), counted from the start of each date in US Eastern time. Visitors can switch between the two dates. The count never goes negative. The source comment records when the dates were last checked against primary sources.

**Motion and scroll system**
- Uses `motion` (`motion/react`) through `LazyMotion`, which loads its features after hydration (`src/components/motion/MotionProvider.tsx`, `features.ts`). Shared tokens for easing, durations, stagger, press scale and popovers are in `src/lib/motion.ts`. A segmented control with a shared-layout knob is in `src/components/motion/Segmented.tsx`. The header nav uses a shared `layoutId` pill.
- The homepage scan scene (`src/components/home/Story.tsx`, `StageVisual.tsx`) is driven by `useScroll` scroll progress. Other homepage sections use `src/lib/useScrollVars.ts`, which writes section progress to a CSS variable `--p` once per animation frame while the section is in view.
- Route changes use React's `ViewTransition` in `src/app/template.tsx`.
- With reduced motion turned on, `--p` is pinned and the homepage story renders as still figures (`story-still`).
- `scrollcraft/` holds the briefs and lab reports from a Scroll Craft design and verification pass. The Scroll Craft engine is not part of the site. The homepage sections only carry its `data-sc-act` markers. `MOTION-SYSTEM.md` documents the motion tokens.

**Illustrative narration**
- `public/audio/permit-before.mp3` and `permit-after.mp3` are text-to-speech narrations of the sample form, with cue timings in `src/content/audio-cues.json`. They play only when the visitor starts them, and the page labels them as text-to-speech, not screen-reader recordings. Two generator scripts are included: `scripts/make-audio-kokoro.py` and `scripts/make-audio.mjs` (macOS `say`). `docs/AUDIO.md` covers the model and licences.

**Consent-gated analytics** (`src/lib/consent.ts`, `src/lib/analytics.ts`, `src/components/consent/`)
- Vercel Web Analytics (`<Analytics />`) mounts only after the visitor explicitly allows it. The choice is stored in `localStorage` (no cookies). A Global Privacy Control signal counts as "essential only".
- Custom events come from a fixed typed list, and their properties are fixed labels with no form contents.

**Security headers and indexing** (`next.config.ts`, `src/app/robots.ts`, `src/content/url.ts`)
- Every route sends CSP, HSTS (outside dev), `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`, COOP and `Permissions-Policy`. Preview deployments also get `X-Robots-Tag: noindex`.
- `robots.txt` and page metadata allow indexing only for production deploys.

## Architecture

**Stack** (versions as locked in `package-lock.json`)

| Package | Version |
|---|---|
| next | 16.4.5 |
| react / react-dom | 19.3.1 |
| typescript | 5.9.3 |
| tailwindcss / @tailwindcss/postcss | 4.3.4 |
| motion | 14.9.1 |
| pdfjs-dist | 6.4.299 |
| @vercel/analytics | 2.0.1 |
| eslint / eslint-config-next | 9.39.5 / 16.4.5 |
| @playwright/test, @axe-core/playwright | 1.64.1, 4.14.0 |

Fonts are Funnel Display and Funnel Sans, loaded through `next/font/google` in `src/app/layout.tsx`.

**Layout**

```
src/app/          routes, metadata, OG images, global CSS (globals.css, effects.css, pages-extra.css)
src/components/   Header, Footer, home/ (homepage scenes), pages/ (per-page parts), check/, forms/,
                  consent/, motion/, doc/ (the fictional permit sheet), story/
src/content/      site config, resource list, canonical URL, audio cue timings
src/lib/          pdf check, contact validation and delivery, deadline math, consent, analytics,
                  motion tokens, small hooks
public/           pdf.js worker and data, sample PDFs, narration MP3s
tests/            Playwright end-to-end suite (site.spec.ts)
scripts/          capture, overflow, audio and sample-generation utilities (Playwright/Node)
scrollcraft/      Scroll Craft briefs and lab reports (not used at runtime)
```

**Data flow**
- Nearly all content is static TSX and TypeScript data. No database or CMS is used.
- `/contact` reads `?topic=` from `searchParams`.
- Browser → `POST /api/contact` → Resend and/or webhook, depending on server env vars. Nothing is stored.
- PDF check: file → `ArrayBuffer` → pdf.js worker in the browser → findings rendered in place. There is no network request for the file.
- Analytics: after consent, the client sends events to Vercel Web Analytics.

## Setup

No Node version is pinned: `package.json` has no `engines` field and there is no `.nvmrc`.

```sh
npm ci
npm run dev        # next dev on http://localhost:3100
```

Other scripts: `npm run build`, `npm start` (also on port 3100), `npm run typecheck`, `npm run lint`, `npm run test:e2e`.

Read `AGENTS.md` before changing framework code. It notes that this Next.js version differs from older conventions and points to the docs bundled in `node_modules/next/dist/docs/`.

## Environment variables

Copy `.env.example` to `.env.local`. It defines:

- `CONTACT_WEBHOOK_URL`: server only. When set, contact requests are POSTed to this URL as JSON.
- `CONTACT_WEBHOOK_SECRET`: server only, optional. HMAC secret for the `X-Sayable-Signature` header.
- `NEXT_PUBLIC_CONTACT_EMAIL`: public. The inbox shown on the site and used for the `mailto:` fallback.

The code also reads these, which are not listed in `.env.example`:

- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`: email delivery through Resend. All three must be set.
- `RESEND_API_URL`: optional override of the Resend endpoint, intended for a local stand-in during tests.
- `NEXT_PUBLIC_SITE_URL`: canonical origin for metadata, sitemap and robots.
- `VERCEL_ENV`: set by the platform. It controls preview-only CSP allowances, `noindex`, and production indexing.
- Test/tooling only: `BASE_URL`, `PW_CHROME`, `VERCEL_OIDC_TOKEN` (Playwright), plus script-specific variables in `scripts/`.

## Checks

Results for this tree, run on 2026-11-22:

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Clean |
| `npx eslint .` | 0 errors, 1 warning (unused variable) |
| Unit tests | None exist |
| `npm run test:e2e` (Playwright) | Not run |
| `next build` | Not run |

The Playwright suite (`tests/site.spec.ts`, config in `playwright.config.ts`) covers:
- axe WCAG A/AA scans, a single h1 and no horizontal overflow on each route
- internal and sitemap links
- countdown behavior across time zones and edge dates
- scroll-driven homepage scenes and reduced motion
- the estimator by keyboard
- contact form validation and failure handling
- the mobile menu and nav dropdowns
- 404 and redirect behavior
- security headers
- consent and GPC
- PDF check samples, local-only reading, Stop and bad-file errors

It runs desktop (1440×900) and mobile (390×844) projects. The config has no `webServer` entry, so start the dev or production server on port 3100 first, or point `BASE_URL` at another server.

## Current limitations

- **Contact form:** nothing is delivered until a delivery channel is configured. Without one, every submission returns `not_configured`.
- **Rate limiting:** the limiter is in memory and per server instance, so it is not shared across instances.
- **PDF check:** structural checks only. It does not run full PDF/UA validation, assess reading order, alt-text quality or table header associations, or check beyond the first 400 pages.
- **Illustrative content:** the homepage scan, the product workspace mock, the sample report, the inventory rows and the workload estimate all use fictional data. The narration is text-to-speech.
- **Service only:** the crawl, triage, repair and verification described on the site happen outside this repository. No upload endpoint or customer-facing app exists here.
- **Policy pages:** privacy, terms and cookies are unreviewed drafts with open placeholders.
- **CSP:** `script-src` keeps `'unsafe-inline'`, which Next.js needs for its inline bootstrap scripts without nonces.
- **Stale references in docs:** many dated docs (handoffs, sprint reports) describe earlier designs and refer to branches, tags and paths in the original monorepo that do not exist here. When docs and `src/` disagree, `src/` is current.

## Project docs

- `PRODUCT.md`: users, positioning, offers and brand commitments
- `SITE-MAP.md`: routes and the buyer question each one answers
- `DESIGN.md`: current design system (Funnel type, paper/ink/signal palette). `.impeccable/design.json` predates it (generated 2026-11-05) and describes an earlier system.
- `MOTION-SYSTEM.md`: motion tokens and where they are used
- `FONT-AUDIT.md`: typeface selection
- `HANDOFF.md`: running build log across several superseded redesigns
- `LAUNCH-CHECKLIST.md`: launch blockers, known risks, open decisions
- `docs/AUDIO.md`: narration model, licences and regeneration
- `docs/ENG-REVIEW.md`: engineering review of the in-browser check and a design for a gated upload, which is not built
- `docs/research/RESEARCH-NOTES.md`, `docs/REFERENCES.md`: legal and market research notes, design references
- `docs/QA-REPORT.md`, `docs/dependency-decisions.md`, and dated sprint reports in `docs/`

## History

This repository's history was extracted from a larger monorepo with `git subtree split` of its `sayable-site/` folder.
