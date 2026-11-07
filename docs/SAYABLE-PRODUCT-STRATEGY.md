# Sayable product strategy (review board, 2026-11-06)

Inputs: `../sayable-spec/SAYABLE-BUILD-SPEC.md` §1, §2, §17; `../startup-research/` 00, 05, 06, 08, 10, 11, 12 and `round2/` scans; `PRODUCT.md`, `LAUNCH-CHECKLIST.md`.
Labels: **[E]** evidence in those files, **[A]** assumption nobody has checked, **[H]** pricing or product hypothesis. No buyer has been interviewed, so every commercial claim here is unvalidated.
Ground truth: the website is the only built product. Research prototypes (c01 semantic check, c02 fix loop, c03 PDF/UA finishing, c04 form-field names) live in `startup-research/experiments`. There is no crawler and no production pipeline. The in-browser "Check a PDF" tool is being built now.

## 1. Decisions on one screen

| Decision | Call | Founder must confirm? |
|---|---|---|
| Primary segment | Cities of 50k+, California first, that do not already have a CivicPlus DocAccess contract | Yes |
| Secondary channel | Web agencies that build and run municipal sites (referral or white-label) | Yes |
| First paid product | Readiness Audit (a service: inventory, triage, sample checks, cost estimate) | Already in spec |
| Free tier | Yes: the in-browser check, unlimited, no account, no upload | Yes |
| Published prices | Not yet. Site keeps "flat fee, quoted in writing" | Founder decision (open) |
| Do not sell yet | Check-before-post subscription; Agenda Desk at spec prices; white-label to remediation vendors | Yes |

## 2. Ideal customer

Scores are 1 to 5, where 5 is best for Sayable now. For procurement, 5 means easy to buy. For existing solutions, 5 means the field is open.

| Segment | Urgency | Volume | Budget | Reach | Procurement | Existing solutions | Pain | Pilot credibility | Recurring | Total /45 |
|---|---|---|---|---|---|---|---|---|---|---|
| **Mid-sized cities 50k+** | 5 | 4 | 4 | 4 | 3 | 2 | 4 | 5 | 4 | **35** |
| Counties 50k+ | 5 | 5 | 4 | 3 | 2 | 2 | 5 | 4 | 4 | 34 |
| Public-sector web agencies | 3 | 3 | 3 | 4 | 5 | 3 | 2 | 3 | 4 | 30 |
| Remediation vendors (white-label) | 3 | 4 | 2 | 4 | 5 | 1 | 2 | 2 | 3 | 26 |
| Small municipalities (<50k) | 2 | 1 | 1 | 3 | 4 | 3 | 3 | 2 | 2 | 21 |
| Special districts | 2 | 2 | 3 | 2 | 3 | 3 | 2 | 2 | 2 | 21 |

Basis:
- **Cities.** April 26, 2027 is 171 days away [E]. Agenda packets give an assumed 10–30k new pages a year [A, spec §17]. Real 2026 spending ran $7.5k–60k per body [E]. Several California city managers can sign $10k–50k without a formal bid (Berkeley, Aliso Viejo, South El Monte) [E]. The documents are public, so value can be shown before first contact [E]. Weak spot: CivicPlus wins through contracts cities already hold [E].
- **Counties.** The same deadline and higher pain: Kane and Des Moines counties pulled or limited documents [E]. But buying went to board votes (Umatilla passed 2-1; Clark and Klamath also went to the board) [E]. Departments are fragmented, and one county RFP cited ~400k pages [E]. That would swamp a service that depends on people.
- **Agencies.** No RFP, and a sale is a business invoice. Overflow demand is unproven ("weak" in round-2 scan) [E]. Competitors such as Skynet and Accessible.org already offer white-label [E].
- **Remediation vendors.** They are competitors with their own tools and LLM QA [E, red team]. They push the per-page price toward $0.06–0.50 [E]. Sayable has no pipeline to white-label yet.
- **Small towns and special districts.** Their date is 2028. Budgets are thin, and many will default to removing content [E]. Platte River Power Authority shows that utilities do buy [E]. Treat this group as 2027 pipeline, not this sprint.

**Primary: California cities of 50k–250k people [A: population band], Bay Area first so meetings can be in person.** Cities beat counties despite the near tie for three reasons:
- Approval is faster: a city manager can sign where a county needs a board vote.
- A city's volume fits a labor-bound service.
- The clerk's agenda flow gives a concrete recurring wedge after the audit.

Counties become the second segment once two city references exist.

**Secondary channel: web agencies that build city sites.** They reach the same buyer without government procurement, and they want a launch-audit line item. Sayable is not ready to supply remediation vendors at their price points.

## 3. Champion, budget owner, approver (primary segment)

| Role | Who in a 50k–250k city | What they need from Sayable |
|---|---|---|
| Champion (audit) | Web or digital services manager, often in Communications or IT | A number: how many PDFs, how many matter, and what that costs. A report they can forward |
| Champion (recurring) | City Clerk or Deputy Clerk (agenda packets, minutes) | Packets that pass checks within the 72-hour posting window, with no new software to learn |
| Risk owner / influencer | ADA coordinator (often in HR, Public Works or the City Manager's office) | Evidence of what was checked, a complaint path, and no "compliant" claims |
| Budget owner | IT Director or Communications Director (website budget line); sometimes the City Manager's office from a Title II plan [A] | A fixed fee that fits an existing line, and proof that Acrobat plus staff time costs more |
| Approver | City Manager under the small-purchase limit; City Council (consent agenda) above it [E for CA thresholds] | Fixed scope, a fixed fee, short terms, and no auto-renewal |
| Gatekeepers | Purchasing (vendor registration, W-9, insurance certificate) and the City Attorney (terms, liability wording) | A legal entity, insurance, and careful claims. **The founder is a minor, so an LLC with an adult officer is a precondition** [E] |

## 4. Problem severity and why now

- **Severity.** At an assumed 20k new pages a year [A] and 3–12 minutes per page [E], in-house remediation costs about 1,000–4,000 staff hours a year. Few cities have that capacity. Observed behavior shows the pain:
  - Counties removed documents (Clear Creek, Bismarck, Des Moines County) [E].
  - 17 local bodies bought in 2026 [E].
  - Only 37% of federal agencies' top-viewed documents were fully conformant [E].
  - The people hurt are residents using screen readers, who lose access to public information.
- **Why now.**
  - The deadline is fixed at April 26, 2027 for 50k+ entities, and the rule was extended only once [E].
  - Auto-tagging became free in 2025–26, so "tagged" is cheap while "correct" still is not [E].
  - Models make triage and checking cheap: $0.004–0.15 per page in research [E].
- **Risk to urgency.**
  - NFB v. DOJ could restore earlier dates.
  - DOJ said it may change the substance of the rule [E].
  - Recheck the Federal Register before every quote.

## 5. Office-hours diagnostic (startup mode, pre-product route: Q1–Q4)

Answers below come from the evidence files. The founder was not available to answer.

- **Q1 Demand reality.** There is no Sayable-specific demand: zero interviews, pilots or payments [E]. The strongest proxy is that money already moves: Tuscaloosa paid $37,720, Umatilla $59,340, Story County $7,500 unbudgeted [E]. That is demand for *remediation*, not for Sayable. Position: demand for the category is real, and demand for this vendor is unknown. **What would change this:** one paid audit, or written purchase intent naming a budget owner (T2).
- **Q2 Status quo.** Today's workarounds:
  - Staff fix documents in Acrobat.
  - Bodies buy the CivicPlus add-on through their CMS contract.
  - Some stop posting packets ("agendas only, packets on request") [E].

  The workaround costs staff hours, plus lost access for residents. The status quo is real and painful, which is a good sign.
- **Q3 Desperate specificity.** The research names organizations, not people: Manteca City Clerk, Exeter and League City (active RFPs), the founder's own college accessibility office [E]. Position: the most desperate person is a clerk at a city that has already pulled packets or issued an RFP. **Assignment:** find the clerk's name for five such cities before writing more site copy.
- **Q4 Narrowest wedge.** The smallest thing someone pays for this week is a fixed-fee Readiness Audit on their own public PDFs. It needs no login and no integration. The free version is a 15-document sample report built from public files, which is test T2 in `12-customer-validation-plan.md`.

Premises adopted (self-agreed, founder to confirm):
1. Sell a service first, because buyers pay for finished documents, not for verification alone [E, round 2].
2. Triage is the wedge: the cheapest page is the one that does not need fixing.
3. The in-browser check builds trust and generates leads. It is not revenue.
4. Never claim compliance (FTC accessiBe order).

## 6. Existing alternatives

| Alternative | What it actually does | Gap for a mid-sized city |
|---|---|---|
| DIY Acrobat Pro | Auto-tag, tag editor, Accessibility Checker | The checker confirms tags exist. Reading order is a manual check. The work needs a skilled person, at 3–12 min/page and 15–30 for tables [E] |
| PAC 2024 | Free, rigorous PDF/UA (Matterhorn) checks plus a screen-reader preview, on Windows | It diagnoses but does not fix, and it is aimed at experts |
| ChatGPT | Drafts alt text, summaries and field labels | It does not write tags into the PDF or validate them. Pasting city documents into it raises data-handling questions |
| CommonLook (Allyant) | Pro remediation software plus services; "100% conformance" guarantee [E] | Expert tool; services cost $5–15/page [E] |
| Equidox | AI-assisted remediation software (Alameda County: $500k over 3 years) [E] | A license plus staff time; triage is still the city's job |
| CivicPlus DocAccess (with AudioEye) | HTML versions of PDFs, bundled into CMS contracts [E] | Wins by contract inertia. The city stays liable for the output [E] |
| Granicus | Meeting/agenda platform, captions, automatic PDF remediation preview [E] | Owns the agenda flow for its own customers only |
| AbleDocs | Remediation services and software; $10M liability guarantee claimed [E] | Enterprise bureau, priced and sold for scale |
| Remediation bureaus | Per-page done-for-you: WA co-op $3.34/$4.60 per page; offshore $0.50–5 [E] | No triage; quality varies; the buyer can't check the work |

**"We already have Acrobat and ChatGPT. Why should we pay you?"** (116 words)

> Keep both. Acrobat is the right tool for fixing one PDF, and ChatGPT can draft alt text. Neither tells you which of your thousands of posted PDFs the rule covers; archived and older documents can be excepted, so the first saving is what you don't fix. Acrobat's checker confirms tags exist, not that they are right, and leaves reading order as a manual check. ChatGPT doesn't edit a PDF's tag structure or validate it against PDF/UA. Hand remediation takes 3 to 12 minutes a page, 15 to 30 for tables. We do the inventory, the triage and the hard pages, and every file comes with a check report your staff can re-run in PAC or veraPDF.

## 7. Differentiation: what is real

| Layer | Status | What can honestly be said |
|---|---|---|
| Website, guides, sample-report explorer | **Real** | Live build that passed axe at 1440 and 390 (checklist) |
| In-browser Check a PDF (tags, title, language, text layer, form names, figure alt, headings, bookmarks, tables) | **Real once shipped** | Structural presence checks; the file never leaves the device |
| Readiness Audit | **Service** (manual, plus scripts written per engagement) | "We inventory and sort your public PDFs and give you a written report." The crawler is a spec milestone and does not exist [E] |
| Assisted remediation | **Service** (a person, standard tools, prototype scripts) | "People fix tables, forms and scans; every file is re-checked with veraPDF and reviewed by a person." |
| Semantic check | **Prototype** (c01) | Research result only: 13/15 subtle defects caught vs 0/15 for rule checks, on fixtures, not validated by blind users [E] |
| AI fix loop, PDF/UA finishing, form-field names | **Prototype** (c02–c04) | 41–47% of 32 sample pages passed with no hand work [E]; not measured on city documents |
| Check-before-post, Agenda Desk SLA intake, evidence log, dashboard | **Planned** | Say "planned"; never show these as available |

The real edge today is the triage judgment, the service on hard pages, and independent re-checks. The software edge is earned only after T1 (blind-user agreement) and T5 (automated clearance on real documents).

## 8. Offer ladder and pricing hypotheses

| Rung | Sellable now? | Price hypothesis [H] | Reasoning |
|---|---|---|---|
| 1. Self-service check | **Yes, free** | $0, unlimited, no account | Marginal cost is close to zero, and nothing leaves the device, so there is no data-custody or procurement hurdle. Acrobat and PAC are free too, so it cannot command a price. Its job is the first "show the document" moment and a route into rung 3 |
| 2. Assisted remediation | **Yes, as a scoped batch after an audit** | Standard pages **$5**, complex pages (forms, tables, scans) **$12–15**, minimum order **$750** | Assume every page is touched by a person, because no pipeline exists. At $35/h loaded [A] and 6 minutes per page, labor is $3.50, a ~30% margin at $5. If the prototype's ~40% no-touch rate holds on city files (unmeasured), margin rises toward ~58%. The spec's $1.50–2 rate is a post-automation target, gated on T5 ≤15% flagged. Sits inside vendor list prices ($3–12) [E] and above the WA co-op rate; triage lowers the total bill instead |
| 3. Readiness Audit | **Yes (lead offer)** | **$2,500** up to ~2,500 public PDFs; **$4,500** up to ~10,000; custom above. 50% credited toward remediation within 90 days | Labor is an assumed 15–30 h: crawl script, triage review, 30–50 sampled files in PAC/veraPDF, written report. That is $85–165/h. Vendor-published audits run $1,250–2,750 [E]. Both tiers sit under every small-purchase limit found ($10k–50k) [E] and likely under P-card limits [A]. Inside the spec's internal band; **not published until the founder approves** |
| 4. Managed document accessibility (Agenda Desk) | **No, not at spec prices** | If offered: **$1,500/month including 250 pages**, $5 per page over, 5-business-day turnaround until capacity is proven | The spec's $500–1,500/month is margin-negative. A city posting 20k pages a year posts ~1,670 a month; at 4 min/page that is ~110 hours, so $1,500 works out to ~$13/h. Price by page cap. A 24–48 h SLA from a solo, full-time student is a promise Sayable cannot yet keep |

Rungs 2 and 3 are sellable now as services, once the LLC and invoicing exist. Rung 1 is free. Rung 4 and the $99–299 Check-before-post plan wait until there is something to charge for beyond the free check: batch history, the semantic layer, auto-fix.

## 9. CEO review (selective expansion)

**0A Premise challenge.** The plan solves the real pain, which is the staff hours and the uncertainty about which files matter. It does not chase a proxy. The risky premise is that the website is the bottleneck. It is not. The bottlenecks are:
- No legal entity.
- Zero buyer conversations.
- A contact form that does not deliver (launch blocker 1).

Do-nothing cost: the 2027 buying window closes around Q1 2027 [E].

**0C Dream state**
```
 CURRENT                         THIS PLAN (sprint + 6 wks)           12-MONTH IDEAL
 site + prototypes,          ->  free check live, contact works,  ->  10-25 CA cities audited, 2-3 on
 0 buyers, no entity,            20 sample reports sent, 2 paid       remediation batches, measured
 prices unapproved               audits, LLC formed                   labor/page and flag rate, counties
                                                                      next, checker validated by blind users
```

**0D Alternatives (self-decided).**
- **A, audit-led service** (free check, then sample report, then audit, then batch): *chosen*, because money flows to finished documents.
- **B, tool-led SaaS first:** rejected. There is nothing to charge for beyond the free check, and no evidence of willingness to pay.
- **C, channel-led white-label first:** rejected as primary because demand is unproven and it hides the brand. Kept as the secondary channel.

**Cherry-picks** (each self-decided; the founder may overturn):

| # | Proposal | Effort | Decision | Why |
|---|---|---|---|---|
| 1 | "What a screen reader announces first": a missing title means it reads the filename | S | ACCEPTED | The clearest single "aha" in plain language |
| 2 | Per-finding "fix it yourself in Acrobat" guidance | S | ACCEPTED | Builds trust; honest about what DIY can do |
| 3 | Downloadable result summary (champion forwards it to the budget owner) | S/M | ACCEPTED | This is the internal sales motion |
| 4 | Batch check of many files, still in-browser, with CSV export | M | DEFERRED | Strong bridge to the audit; do it after single-file ships and is stable on mobile |
| 5 | Check by URL | M | SKIPPED | Needs a server proxy and breaks the "never leaves your device" promise |
| 6 | AI semantic check on the site | L | DEFERRED | Needs server secrets, public documents only, and T1 first |
| 7 | Public benchmark of city documents | L | DEFERRED | Good distribution, but needs T1 data and a careful tone |
| 8 | Pricing page | S | SKIPPED | Founder has not approved prices |

**10x check.** Turn the free check into the city's own inventory: hundreds of files checked locally in minutes, ending in "you have 1,240 PDFs; ~300 likely need work". The audit then sells itself. That is item 4, deferred one sprint.

**Check-tool failure modes** (Sections 2–4 and 8, strategy depth). Each needs a plain message, never a crash or a false pass:
- Encrypted or password-protected files.
- Corrupt or non-PDF files.
- XFA forms (limited in pdf.js).
- Packets of 500+ pages: show progress and a cancel button, and bound memory on phones.
- Scans with an invisible OCR layer: "text layer found" is not the same as "readable".
- Tagged files with wrong tags: always show "what this check cannot judge".
- The pdf.js worker blocked by CSP: it is served from `/pdfjs/` under `script-src 'self'`; verify in a production build.
- Analytics: events never include file names or contents, only consented counts.

**Section 10 trajectory.** The free check is reversible (5/5) and reuses the existing design system. The one-way doors are publishing prices and SLA promises, so leave both to the founder.

**Section 11 UX.** Flow: drop or choose a file → progress → results (summary first: "a screen reader will…") → per-finding detail → "what this check cannot judge" → next step (fix it yourself / request an audit). Each state needs loading, empty, error, partial (some pages failed) and success views, keyboard operation, and live-region announcements. Recommend `/plan-design-review` on the tool before it merges.

## 10. Website sprint: top 8, ranked by effect on understanding and willingness to pay

1. **Ship Check a PDF with an honest scope.** Results in plain language, the "announced first" line (pick 1), and a visible "what this check cannot judge" panel covering reading order, table header correctness and alt text quality. Include proof that nothing is uploaded.
2. **Make contact deliver, and hand off from the check.** Set the webhook and email (launch blocker 1). Add a "request an audit for documents like this" link that pre-fills summary counts only, never the file or its name unless the user types it.
3. **Sample Readiness Audit report.** A fictional city, as a downloadable PDF that itself passes veraPDF and PAC. It makes the deliverable, and therefore the fee, concrete. Extends `ReportExplorer`; the design pass already lists it as open.
4. **Scope estimator: "how many of your PDFs does the rule likely cover?"** Explain the exceptions (archived, preexisting, and when they stop applying). Output documents and staff hours, not Sayable prices.
5. **"Already have Acrobat and ChatGPT?" section** on `/verify` and `/solutions/government`, using §6's answer and table.
6. **Role routing on `/solutions/government`.** One line each for the clerk, web manager, IT director, ADA coordinator and city manager, covering what each gets and what each must approve.
7. **Procurement and data-handling one-pager.** Fixed fee, written scope, public documents only, no compliance claims, and how a small purchase works. List entity and insurance facts only once they exist.
8. **Agency partner page tightened** for the secondary channel: referral or white-label terms, a sample deliverable with Sayable branding off, and a free 5-file sample.

Deprioritize: new motion or scroll work, a Check-before-post sign-up, any price table, testimonials (none exist).

## 11. Risks and evidence gaps

| Risk or gap | Why it matters | How to close it |
|---|---|---|
| No buyer has been asked anything | Every price and segment call above is inference | T2: 20 free sample reports to California city web managers and clerks; pass = 2 paid audits or written intent with a named budget owner |
| Pages per city are unmeasured | Drives audit tiers, labor and Agenda Desk viability | T3: count 12 months of posted PDFs for 5 cities (1 day, $0) |
| Founder's labor per page is unmeasured | The remediation margin depends on it | Time 50 real public pages in Acrobat and PAC, split by type |
| Capacity cliff before April 2027 | A solo student founder can deliver ~1,700 pages a month at best [E, round 2] | Cap concurrent engagements at 2–3 and prefer audits, which use fewer hours per dollar |
| Minor founder: entity, insurance, contracts | Cities cannot register an individual minor; contracts can be voidable [E] | LLC with an adult officer plus general liability insurance before the first invoice |
| Incumbent bundling (CivicPlus, Granicus, Siteimprove PDF agent) | Cities on contract default to the add-on | Target cities not on DocAccess; sell triage and hard pages as a complement |
| Rule changes (NFB v. DOJ, DOJ rulemaking) | Urgency could rise or fall | Short, per-deliverable contracts; recheck the Federal Register before quoting |
| The free check creates false confidence | "Tagged" is not "accessible"; FTC precedent | Fixed "cannot judge" panel and no pass/compliant badge |
| No blind-user validation (spec §17) | Software claims beyond structure are unearned | T1 with 4–5 paid screen-reader users on 30 documents |

Questions for the first five buyers (past behavior only, from `12-customer-validation-plan.md`):
- Who checked your last posted PDF, and with what?
- What did you spend on document accessibility in the last two years?
- What is the largest amount you can sign without a bid?
- Have you removed or stopped posting anything?
- Who loses their job if April 2027 goes badly?

## 12. gstack review log

- **`gstack-office-hours`: loaded** with the Skill tool, and `sections/phase-2a-startup-diagnostic.md` read.
  - Ran: Phase 1 context (files above), startup mode (set by the caller), pre-product stage, forcing questions Q1–Q4 answered from evidence (§5), Phase 3 premises (self-agreed), Phase 4 alternatives (self-decided, §9 0D).
  - Not run:
    - The `gstack-skill-start` preamble, telemetry, builder-profile, learnings and brain-cache steps, because they write outside this repo.
    - AskUserQuestion gates, because no founder was available; answers are marked as self-decided.
    - Phase 2.75 landscape web search; relied on the research scans dated 2026-11-02/03 instead.
    - Phase 3.5 Codex or subagent second opinion.
    - Visual mockups and wireframe.
    - Phase 5 design doc in `~/.gstack`; this file replaces it inside the repo.
    - Spec review loop and Phase 6 handoff.
- **`gstack-plan-ceo-review`: loaded** in selective expansion mode (set by the caller). `sections/review-sections.md` was skimmed: Mode Quick Reference, the decision procedure, Sections 10–11.
  - Ran, at strategy depth: 0A premise challenge, 0C dream state, 0D alternatives, 0G hold checks and the cherry-pick ceremony (self-decided), 10x check, delight items, Sections 2–4 and 8 as check-tool failure modes, Sections 10 and 11.
  - Not run:
    - Preamble, platform and base-branch detection, the pre-review git audit, and the landscape web search.
    - `gstack-plan-reality` rows.
    - 0H CEO-plan archive and spec-review metrics in `~/.gstack`; writing outside the repo is forbidden.
    - Adversarial spec-review subagent and the Codex outside voice.
    - Updates to TODOS.md and the task JSONL.
    - Review log and dashboard, and the exit-plan-mode gate.
    - Sections 1, 5, 6, 7 and 9 (architecture, code quality, tests, performance, deploy), because there is no implementation plan to review yet.
- Nothing was committed, deployed or paid for. Other in-progress files in the working tree (`public/pdfjs/`, `public/samples/`, scripts) were not touched.

## 13. File-scope capability matrix (verified from code, 2026-11-06)

Evidence: the only shipped Sayable software is this website. `src/lib/pdfcheck.ts` (in-browser check, pdf.js 6.4.299) is the only code that reads customer files, and it runs on the visitor's device. The repair/verify pipeline in `sayable-spec/SAYABLE-BUILD-SPEC.md` is a specification; the Python experiments in `startup-research/experiments/c01–c04` are research prototypes, not production code. Repair is therefore a human-delivered service using standard tools (Acrobat, PAC, veraPDF) plus the prototypes where they have been shown to work.

| File type | Upload | Parse | Inspect (free check) | Repair | Verify | Human review | Status |
|---|---|---|---|---|---|---|---|
| Born-digital PDF | Local only (never uploaded) | Yes (pdf.js) | Tags, title, language, text layer, headings, tables, figure alt, form-field names, bookmarks | Service | Service (PAC/veraPDF + person) | Reading order, alt quality, table structure | Check: available now. Repair/verify: service now |
| Scanned PDF | Local only | Yes | Detects pages with no text | Service: OCR + person | Service | Always | Service now, slower |
| Interactive PDF form | Local only | Yes | Fields without accessible names (TU) | Service | Service | Names, tab order | Service now |
| PDF tables | Local only | Yes | Tables without TH cells (tagged files) | Service, by a person | Service | Always | Service now |
| Images in PDFs | Local only | Yes | Tagged figures without Alt/ActualText | Service: drafted, person checks | Service | Always | Service now |
| Large/complex PDF | Up to 25 MB | First 400 pages | As above | Quoted individually | Service | Yes | Check limited; service now |
| Word / PowerPoint / Excel | No | No | No | No | No | n/a | Not supported |
| HTML pages | No | No | No | No | No | n/a | Not supported (out of scope) |

Not checked by the free tool and stated on the results page: reading-order correctness, alt-text accuracy, table header associations, colour contrast, full PDF/UA-1 rule set (use veraPDF/PAC), meaning when heard.

## 14. Decisions implemented in the sprint (2026-11-06)

- Hero names the problem, the buyer and the deadline in two sentences; primary CTA is the free check, secondary the citywide audit.
- Primary segment on the site: cities of 50,000+ (California-first stays a sales choice, not site copy, so the site does not exclude other states).
- Self-service Stage A shipped as a genuinely working, in-browser check with three generated sample PDFs. No server upload endpoint exists, so there is no file custody, storage, retention or processing-cost risk. Stage B (private beta uploads for repair) remains gated on: file-type and signature validation server-side, size/page limits, isolated parsing with resource limits, malware screening, private storage with short-lived links, retention and deletion rules, provider disclosure, and rate limits. None of that is built.
- No prices published. The estimator works in skilled hours from visitor-entered numbers; the unverified Washington State rates were removed.
- Agenda Desk is a limited pilot by arrangement; automatic fixing, team tools and monitoring are labelled planned.
