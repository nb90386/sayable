# Launch checklist

Status as of 2026-11-05, sprint branch `sayable/premium-production-sprint-2026-11-05`. "Verified" means a check ran in this sprint.

## Verified
- [x] `tsc --noEmit`, `eslint src tests`, `next build` pass (27 routes, all static except `/contact` and `/api/contact`).
- [x] Playwright + axe (WCAG 2.0/2.1/2.2 A and AA tags), desktop 1440 and mobile 390, against the production build: 56 passed, 2 skipped (device-specific). Covers all 19 routes plus internal links, sitemap URLs, 404, `/approach` redirect, security headers, keyboard demos, form validation, nav dropdown keyboard behavior, mobile menu, consent banner, consent persistence, GPC, and no cookies set.
- [x] No horizontal overflow, one h1 per page, no italic emphasis, no `href="#"`, at 1440 and 390 on every route.
- [x] Impeccable rendered detector: 0 findings on all 22 checked pages after fixes.
- [x] Lighthouse (production build, local): desktop 100/100/100/100; mobile performance 94 (home) and 95 (Readiness Audit), accessibility, best practices and SEO 100. CLS 0.
- [x] Security headers: CSP, HSTS (1 year, no preload), nosniff, Referrer-Policy, X-Frame-Options DENY, COOP, Permissions-Policy. Previews also send `X-Robots-Tag: noindex` and `robots.txt` disallows all outside production.
- [x] No secrets in the repo; no Vercel environment variables exist yet.

## Launch blockers (must resolve before pointing customers at the site)
1. **Contact form does not deliver.** `CONTACT_WEBHOOK_URL` (and optionally `CONTACT_WEBHOOK_SECRET`) are not set in Vercel, so the form honestly says nothing was sent. Also set `NEXT_PUBLIC_CONTACT_EMAIL`.
2. **Legal pages are review drafts.** Missing: legal entity name, registered address, privacy contact email, retention period, webhook service provider, governing law. Privacy, Terms and Cookies say so visibly. They need a lawyer's review.
3. **Analytics is not switched on.** The code mounts Vercel Web Analytics only after consent, but Web Analytics must be enabled for the project in the Vercel dashboard. Until then the script request 404s after a visitor allows analytics.
4. **Canonical domain.** Canonicals and the sitemap use `https://sayable-site.vercel.app`. Set `NEXT_PUBLIC_SITE_URL` when a custom domain exists.

## Known risks
- Mobile LCP is 2.9 to 3.1 s under Lighthouse's simulated slow 4G (target 2.5 s). The LCP element is the h1 text; render delay comes from CSS, fonts and the framework bundle.
- The rate limiter is per server instance and in memory. For real traffic add Vercel Firewall rate limiting or a shared store.
- CSP keeps `'unsafe-inline'` for scripts because Next.js inlines bootstrap scripts; nonces would make every page dynamic.
- Screen-reader testing with VoiceOver or NVDA users has not been done. Automated checks do not prove WCAG conformance.
- The ADA Title II dates were moved by DOJ's April 2026 interim final rule (now April 26, 2027 and April 26, 2028). The guides cite the Federal Register; recheck before launch.
- `npm audit` could not reach the advisory endpoint from the sandbox; run it once with network access.
