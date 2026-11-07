# Engineering review: self-service PDF check (Stage A) and gated upload design (Stage B)

Target: the files named in the brief, read at commit `2a29519` plus uncommitted edits made by another session during this review (PdfChecker.tsx focus/aria changes, a field-name hedge at pdfcheck.ts:282). Line numbers are for the working tree on 2026-11-06. Framework: gstack `plan-eng-review`, answered by the reviewer from code (see the review log at the end). Evidence kinds: **[read]** static read, **[src]** pdf.js 6.4.299 source in `node_modules/pdfjs-dist/build`, **[probe]** a live local probe.

## Verdict

Stage A is honest and privacy-clean: the file never leaves the device, and the copy never claims compliance. But the two safety controls it relies on, the 90 s timeout and the Stop button, do not reliably work against a hostile file, and one check reports false problems on correctly built forms. Fix M1–M5 before promoting `/check` as the primary CTA. Stage B is not built (correct). Its design is below.

## A. Stage A (shipped, client-side)

### Data flow and trust boundaries

```
 visitor file (untrusted bytes)
   │ File.arrayBuffer()                      PdfChecker.tsx:89
   ▼
 main thread: size cap, "%PDF-" in first 1 KB    pdfcheck.ts:66-68
   │ data.slice(0) copied to pdf.js
   ▼
 pdf.js API (main) ──postMessage──► Web Worker /pdfjs/pdf.worker.min.mjs  <- parses untrusted PDF
   │                                  │ GET /pdfjs/cmaps/*, /pdfjs/standard_fonts/* (same origin, static)
   ▼                                  ▼
 findings (plain objects) ─► React UI (file name rendered as text, no HTML)
   │
   └─ only if consent.analytics === true: track("pdf_check_run",{source})  PdfChecker.tsx:71, analytics.ts:20
```

Privacy, confirmed [read]: no upload path exists. The only server endpoint is `/api/contact` (route.ts:20), which never receives the file. Requests during a check are same-origin GETs for code chunks, the worker, cmaps and standard fonts. None of them carries file data. The analytics event carries one fixed label and fires only after an explicit opt-in (consent.ts:39-41). `<Analytics/>` mounts only then (ConsentManager.tsx:68). No other telemetry SDK exists (grep for sentry/posthog/datadog/sendBeacon: none). The file name stays in the DOM only. The existing test (site.spec.ts, "your own file is read locally") covers the opt-out path only; see T4.

### CSP

The production policy (next.config.ts:15) is `script-src 'self' 'unsafe-inline'` with no `worker-src`, so worker loading falls back to `script-src`. A same-origin module worker is allowed [read]. `connect-src 'self'` covers the cmap and font fetches. pdf.js 6.4.299 has no `isEvalSupported` option (it no longer uses `eval`), and text and structure extraction does not load wasm [src], so no `'unsafe-eval'` or `'wasm-unsafe-eval'` is needed. If page rendering or image decoding is added later, revisit `wasm-unsafe-eval` and `wasmUrl`. **Not verified live**: `localhost:3100` serves the dev policy (`'unsafe-eval'`, `ws:`) [probe: curl], the deployed site returns 404 for `/check` [probe], and a headless-browser probe under the production policy was blocked by the sandbox. Playwright runs only against dev (playwright.config.ts `baseURL`), so a production CSP regression would ship unseen. See M4.

### Findings, ranked

**M1 MUST: Stop and the timeout cannot kill a busy worker, and the UI can hang forever.** (confidence 8) [src]
`stop()` calls `void task.destroy()` (pdfcheck.ts:87, 380). In pdf.js, `PDFDocumentLoadingTask.destroy()` awaits `WorkerTransport.destroy()`, which sends `"Terminate"` to the worker and waits for the reply before `PDFWorker.destroy()` calls `worker.terminate()` (pdf.mjs:15557-15570, 16486-16511). A worker stuck in a long synchronous decode never replies, so it is never terminated. `MessageHandler.destroy()` only removes its listener (pdf.mjs:9065) and never rejects pending calls. So `await task.promise` (:98), `await doc.getPage` (:138) and the `Promise.all` at :139-143 never settle, `guard()` never runs, and the screen stays on "Checking…" with Stop doing nothing.
Fix: own the worker. Create `const w = new Worker("/pdfjs/pdf.worker.min.mjs", { type: "module" })` and `const worker = new pdfjs.PDFWorker({ port: w })`, then pass `getDocument({ ..., worker })`. In `stop()`, call `w.terminate()` synchronously, then destroy. Race every await against a `stopped` promise (a 6-line `until(p)` helper) so `checkPdf` rejects at once with `cancelled`/`timeout`. Terminate in `finally`.

**M2 MUST: a failed worker silently falls back to parsing on the main thread.** (confidence 8) [src]
If `new Worker()` throws or fires `error` (404 after a deploy, a CSP change, a stale file), pdf.js runs `#setupFakeWorker()`. That imports the worker module into the page and parses on the main thread (pdf.mjs:16269-16337). It also sets the static `#isWorkerDisabled`, so every later check in that tab runs on the main thread too. In that mode a hostile file freezes the tab, and neither the timer nor Stop can run. The M1 change removes this path: `#initializeFromPort` has no fallback (pdf.mjs:16262-16267). Also add `w.addEventListener("error", () => stop("failed"))`.

**M3 MUST: Stop pressed early is ignored, and results appear after the user stopped.** (confidence 9) [read]
`run()` loads the file and the module (PdfChecker.tsx:67) before `checkPdf` starts, and `checkPdf` awaits `import("pdfjs-dist")` (pdfcheck.ts:70) before it registers the abort listener (:91). An `abort` event that fires before then is lost, because `addEventListener` on an already-aborted signal never fires. The check then completes and shows findings, even though the user pressed Stop and expected "Check stopped. Nothing was kept." Fix: check `signal?.aborted` at entry and again after the import. In `run()`, drop any result or error when `abort.current !== ctrl` (lines 69 and 75 are unguarded).

**M4 MUST: the production CSP and worker path is untested.** (confidence 9) [read+probe]
Add a CI step that runs `next build && next start` and the "Check a PDF" suite against it. Assert two things: the page logs no `Setting up fake worker` console warning and no `securitypolicyviolation`, and `page.on("worker")` sees `/pdfjs/pdf.worker.min.mjs`. This is the only check that catches a CSP edit, a missing worker file or a worker/API version mismatch before users see "Something went wrong".

**M5 MUST: radio groups and multi-widget fields are reported as unnamed when they are named.** (confidence 9) [src+probe]
pdf.js reads `TU` from the widget dictionary only and does not inherit it (pdf.worker.mjs:53790; `FT` is inherited at :53793). A Node probe built a radio group and a text field, each with `/TU` on the parent field. pdf.js returned `alternativeText: ""` for both kids, and the control field with its own `/TU` returned `"Full name"` (scratchpad `tu-probe.mjs`). pdfcheck.ts:162-168 therefore reports "no spoken name" with status **Problem** for a correctly built form. Radio groups are common on government forms. It also counts widgets, not fields, so a 5-option radio group counts as 5 fields. The hedge added at :282 does not change the status. Fix: group widgets by `fieldName`. A group with no widget `TU` and more than one widget, or one whose widget has a `/Parent`, gets status `person` with the copy "may be named on the field group; check in Acrobat". Count each group once.

**SHOULD, in priority order**

| ID | Where | Problem | Fix |
|---|---|---|---|
| S1 | pdfcheck.ts:148-150, 174, 184 | Any struct element on a page counts as "tagged", so a page with one tagged paragraph and 90% untagged text is "Looks fine" (false pass). A `MarkInfo` flag with no tree is handled correctly (:173-174, :192). | Call `getTextContent({ includeMarkedContent: true })` (the same call) and measure the characters inside `beginMarkedContentProps` with an `id` versus outside any marked content. Warn when more than 10% is untagged. |
| S2 | :157-158 | `TH` is counted over the whole document, so one good table hides a table with no headers. | Count `TH` per `Table` subtree in `walk`, and fail any table that has none. |
| S3 | :150-160 | Elements that span pages are serialized once per page, so counts are inflated ("2 tables" for one). | Report "tables on N pages", or dedupe by the TH `structId` where present. |
| S4 | :165 | Push buttons are skipped, so an unnamed "Submit" or "Print" button passes. | Include them, with "button" wording. |
| S5 | :144, :247 | Language comes from page 1 text, and any non-empty string passes ("x", "English"). If page 1 fails to parse, the result is a false fail. | Use `meta.info.Language` (the catalog `/Lang`, pdf.worker.mjs:59855) and check BCP 47 shape. |
| S6 | :145-146 | Fonts with no ToUnicode map produce garbage characters that count as "real text" (false pass). | Flag a page as untrustworthy when U+FFFD or private-use code points make up more than 30% of its characters. |
| S7 | :120, :226 | Placeholder titles pass ("Untitled", "Microsoft Word - x.docx", `*.pdf`). | Warn on these patterns. |
| S8 | :125 | `MarkInfo.Suspects: true` is ignored. | Warn: "the authoring tool marked these tags as unreliable". |
| S9 | whole check | No memory cap: a 25 MB file can inflate to gigabytes inside the worker, and a worker OOM can kill the tab's renderer. A web page cannot set a hard cap. | M1 limits CPU. Lower `TIME_LIMIT_MS` to 45 s, and show a "send it to us" message on worker `error`. Say in the docs that the check is best-effort against hostile files. |
| S10 | PdfChecker.tsx:171 | The `aria-live` progress text announces every page (up to 400 announcements). | Update the live text at start, every 25%, and at the end. Keep the `progressbar` for continuous progress. |
| S11 | scripts/copy-pdfjs.mjs | Copying the worker is manual and not wired into npm scripts. A pdfjs-dist bump causes a version-mismatch error on every check. | Run it from `postinstall`, and add a unit test that `pdf.worker.min.mjs` contains `pdfjsVersion = <package version>`. |
| S12 | PdfChecker.tsx:96 | The sample fetch ignores the abort signal. | Pass `{ signal: ctrl.signal }`. |

Error states [read]: `empty`, `too-big`, `not-pdf`, `password`, `damaged`, `failed`, `cancelled` and `timeout` each map to plain copy (PdfChecker.tsx:24-33). The error box takes focus (:76, :185), and the result heading takes focus (:72, :197). Gaps: there is no specific state for worker load failure (it becomes `failed` after M2), and an M1 hang has no visible state at all.

### Test review (Stage A)

```
CODE PATHS (pdfcheck.ts)                         USER FLOWS (/check)
├─ guards empty/too-big/not-pdf [★★ site.spec:248-260]  ├─ sample → result, focus  [★★★ :201-232]
├─ password / damaged          [GAP]                   ├─ own file, no upload      [★★ :234-246, opt-out only]
├─ timeout / cancel            [GAP] [→E2E]            ├─ Stop mid-check           [GAP] [→E2E]
├─ fake-worker fallback        [GAP] [→E2E prod build] ├─ Stop before parse (M3)   [GAP] [→E2E]
├─ tags: none / MarkInfo-only / partial  [★ none/full only] ├─ analytics opt-in payload [GAP]
├─ fields: merged / parent TU / radio    [★★ merged only]  ├─ keyboard-only run + axe on results [GAP]
├─ figures alt / ActualText    [GAP]                   └─ 400-page cap message     [GAP]
└─ lang / title / bookmarks    [★★ lang+title pass, fail paths untested]
COVERAGE: 6/17 paths with ★★ or better
```

Tests to add, with value cards:
- **T1** E2E: Stop during a slow file returns to the "Check stopped" state within 2 s, and no result renders. Value: protects=Stop works; fails_when=M1/M3 regress; why_new=no cancel test; seam=none; no_claim=a real CPU-bound hostile file (generated fixture).
- **T2** E2E on a production build: the worker starts, with no fake-worker warning and no CSP violation (M4). Value: protects=worker isolation under the real CSP; fails_when=CSP/asset/version drift; why_new=the suite runs on dev only; seam=none; no_claim=Safari/Firefox.
- **T3** Extend `scripts/make-samples.mjs` fixtures: a radio group with a parent `TU`, a partially tagged page, an untagged-header table, MarkInfo without a tree, and a password-protected file. Assert each status in the existing sample test. Value: protects=check correctness; fails_when=M5/S1/S2 regress; why_new=samples cover only the simple cases; seam=none; no_claim=real-world authoring tools.
- **T4** Extend "read locally": with analytics allowed, assert the only non-static request is `/_vercel/insights` and that no request URL or body contains the file name. Value: protects=privacy claim; fails_when=props grow; why_new=the current test runs opt-out only; seam=none; no_claim=Vercel's own server-side handling.
- **T5** Run axe and a keyboard-only pass on the result and error states, both projects.

### Performance

The main thread holds about 2× the file in memory (the buffer plus `slice(0)`, pdfcheck.ts:74), which is fine at 25 MB. Each page runs three parallel worker calls, then `page.cleanup()`. Up to 400 progress `setState` calls are cheap. No server cost. No other issues.

## B. Stage B design: private-beta uploads for paid repair (not built)

Grounded in SAYABLE-BUILD-SPEC.md §3 (rules 2 and 7), §5 (Supabase, plus a Python worker on a VPS), §9 (AI), §12 (worker) and §13 (security). Assumptions are marked **[A]**.

```
browser (authed, untrusted) ──1 POST /api/uploads {name,size,sha256,attest}──► Next.js API (Vercel, never parses PDFs)
     │                         ◄─2 signed upload URL (10 min, 1 object)──── auth, quota, size ≤25 MB, attest checkbox
     └─3 PUT bytes ──► Storage bucket quarantine/{org}/{upload_id}  (private, 25 MB cap, application/pdf only)
                         │ 4 POST /api/uploads/{id}/complete → jobs row (status=received)
                         ▼
             isolated worker (one throwaway container per job, no secrets but a job-scoped token)
               validate → scan → move to originals/{org}/{id} | reject + delete
                         │ human repair (Acrobat/PAC/veraPDF on a locked-down VM) → outputs/{org}/{id}
                         ▼
 portal "Download" ──5 authz check──► signed GET (10 min, minted on click, never emailed or logged)
```

**Trust boundaries.** (1) The browser is untrusted. (2) The API is trusted and holds the anon key only, plus RLS (spec rule 7). It never reads file bytes. (3) Storage is private, with no public bucket. (4) The worker is the most dangerous zone because it parses hostile bytes, so it is isolated and holds no long-lived credentials. (5) Staff machines open customer PDFs, so repair runs in a VM with Acrobat JavaScript disabled and Protected Mode on.

**Server-side validation.** At intent: declared size ≤ 25 MB, an extension and declared type of PDF, a name ≤ 200 characters stored as metadata only (never used in a path), and the spec §13 attestation. At storage: the bucket enforces a 25 MB file limit and `application/pdf`. **[A]** Supabase supports per-bucket `fileSizeLimit`/`allowedMimeTypes` and `createSignedUploadUrl`/`createSignedUrl`; verify against current docs before building (the Context7 lookup failed: `fetch failed`). In the worker: re-measure the real size; require `%PDF-` within the first 1024 bytes and a parseable xref; run `qpdf --check`; reject encrypted files (status `password`); open with pikepdf and require pages ≤ 400 and objects ≤ 500k; cap total decompressed stream bytes at 1 GB; verify the client sha256.

**Parsing isolation and limits.** One job per container (or microVM), non-root, read-only root filesystem, `tmpfs` scratch space wiped on exit, egress allowlisted to the storage and AI hosts only. Limits: 2 GB memory, 1 vCPU, 128 pids, 120 s wall clock per tool step, 10 min per job, JVM `-Xmx1g` for veraPDF (spec §12: 4 GB VPS, Java tools run one at a time). A killed step means `failed`; retry twice, then `needs_human` (spec §12).

**Malware screening.** Run ClamAV (`clamd`, signatures updated daily) inside the worker image, which costs nothing. Add a structural screen: flag `/JavaScript`, `/JS`, `/Launch`, `/EmbeddedFile`, `/RichMedia`, `/XFA`, and `/OpenAction` or `/AA` with JavaScript. Hold flagged files for a person. Delivered outputs never contain JavaScript or embedded files. Do not use VirusTotal: uploading files there shares them with its partners. A commercial private-scan API is a later option. **[A]** ClamAV plus the structural screen is enough for a beta with public documents only.

**Storage, separation, retention.** Object paths are `{bucket}/{org_id}/{upload_id}/…` with UUIDv4 IDs. RLS on `storage.objects` matches the first folder to the caller's org membership, and the server generates every path. Only the worker's service key crosses orgs. Signed links are minted per request after an authz check, last 10 minutes, are never stored, and are written to `events` (who, object, when). Retention: quarantine is deleted at 24 h; rejected files are deleted immediately, keeping only the hash and reason; originals and outputs are deleted 30 days **[A, spec says "N days"]** after delivery by a daily job, with an audit event and a customer "delete now" button. The worker's tmpfs is wiped after every job.

**Logs.** Structured logs with allowlisted fields only: `upload_id`, `org_id`, size, page count, sha256, step, error code, durations. Never log file names (they can name people), document text, tool stderr (veraPDF and qpdf messages can quote content; store it as a private job artifact instead), or signed URLs and tokens. Error reporting scrubs bodies and query strings. A test seeds a canary string in a fixture and asserts that it never appears in logs.

**AI provider.** Before upload, the screen states that page images may be sent to Anthropic to draft tags and alt text, under API terms with no training, and that a person reviews every change. Controls: a per-org `ai_allowed` flag (default off for beta **[A]**), per-upload attestation, and the worker checking the flag before every call. Per spec rule 2, public documents only until a DPA and zero-data-retention terms are signed. Log calls per spec §9 (model, tokens, cost, page hash, no content). The daily cost cap and an env kill switch go to `needs_human`.

**Auth, rate limits, abuse.** Invite-only Supabase Auth (magic link), no self-signup in beta, and an Origin check on the POST routes. Use a durable limiter (Postgres counter or KV), not the per-instance in-memory map in route.ts:7-18. Limits: 20 uploads per user per day; 200 files or 2 GB per org per day; 3 concurrent jobs per org; upload intents expire after 10 min. Add a global "uploads paused" flag, a hash denylist, and reject-and-delete on malware.

**Failure states (each visible to the customer).** Over quota or too big: 4xx with plain copy. Upload URL expired or the PUT failed: retry, which creates a new intent. Rejected (not a PDF, password, over 400 pages, flagged): status plus reason, file deleted. Worker crash or timeout: retried, then "a person is looking at it". Storage or API outage: 503 "nothing was saved". AI unavailable: human queue (spec §9). Download link expired: mint a new one from the portal.

**Stage B test plan.** Unit: validators against fixtures (polyglot HTML+`%PDF`, header after 1 KB, ZIP/PDF, encrypted, 401 pages, a deflate bomb, a JavaScript-bearing file, EICAR embedded in a PDF). RLS: a user in org A cannot list, read or sign org B paths (SQL tests). Signed links expire after 10 min. Resource limits: the bomb is killed at the memory cap and the job ends `failed`, not hung. Log redaction: the canary never appears in logs. Retention: a time-shifted run of the deletion job. Rate limits: a 21st upload returns 429. AI-off orgs make zero provider calls (mocked provider). E2E: upload → status → download happy path, plus each rejection message. Gate: all of these pass before the first beta invite.

## Not in scope

Building Stage B; a PDF/UA rule engine (veraPDF stays server-side and human-run); a nonce-based CSP; Safari and Firefox runs (worth adding after M4).

## Implementation tasks (Stage A)

- [ ] T-M1/M2/M3 (P1, human ~4h / CC ~30min) pdfcheck.ts, PdfChecker.tsx: own the worker, hard-terminate it, race awaits, check aborts early. Verify: T1, T2.
- [ ] T-M4 (P1, human ~2h / CC ~20min) CI: production-build Playwright job. Verify: T2 in CI.
- [ ] T-M5 (P1, human ~2h / CC ~15min) group fields by name; add the parent-`TU` fixture. Verify: T3.
- [ ] T-S1..S12 (P2) per the table above; T4 and T5 tests.

Sequential implementation, no parallelization opportunity (M1–M3 and M5 share pdfcheck.ts).

## gstack review log

- Ran: `gstack-plan-eng-review` loaded with the Skill tool. Ran the preamble `gstack-skill-start` (`SESSION_KIND: interactive`, `TELEMETRY: off`), `gstack-context-recovery`, design and CEO doc lookup (none found), `gstack-decision-search` (empty), `gstack-learnings-search` (none), `gstack-plan-reality rows --phase eng`, `gstack-review-read` (`NO_REVIEWS`), and `git log` on the reviewed paths (no reverts). Then the Scope Challenge, Sections 1–4 (architecture, code quality, tests, performance), and the failure-mode and test diagrams above.
- Answered by the reviewer, not the founder: scope gate = user-named files; the complexity gate tripped (9 files) → "Original arrangement" (the fixes touch 3 files); every MUST was set to "apply". These are assumptions for the founder to confirm.
- Skipped: the telemetry consent prompt and the feature-overlay marker (telemetry, and writes outside the repo); the cross-project learnings question (needs the founder); the Aside/WebSearch research step (in-distribution knowledge plus the pdf.js source instead); Outside Voice via Codex (would send repo code off-machine; recorded as skipped, not clean); the test-plan artifact, task JSONL, TODOS.md, `gstack-review-log`, decision and learning logs, and skill-end telemetry (all write outside the repo or are telemetry); the navigation question.
- Probes: curl of the local and deployed headers; a Node run of pdf.js legacy on a generated AcroForm (M5 confirmed). A production `next build` (Turbopack refused the symlinked node_modules; the webpack build was stopped) and a headless-Chromium run under the production CSP were attempted. The sandbox blocked the browser launch, and the bypass was denied, so the CSP and hang findings rest on source reads.

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 (not persisted to the gstack log) | ISSUES OPEN | 5 MUST, 12 SHOULD, 11 test gaps, 1 critical gap (M1: silent hang) |
| Outside Review | Codex | Independent 2nd opinion | 0 | skipped | not run: off-machine send |

- **OUTSIDE COVERAGE:** codex, plan-review, skipped. No native fallback run.
- **VERDICT:** NOT CLEARED. Eng review open: fix M1–M5.

**UNRESOLVED DECISIONS:**
- Founder: confirm the reviewer-answered scope and the MUST dispositions above.
- Founder: Stage B retention period (30 days assumed), AI default (off assumed), malware approach (ClamAV plus the structural screen assumed).
