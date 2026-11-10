# Operation Market Ready: 9 November 2026

Branch `sayable/market-ready-sprint`. Backup tag `backup/pre-market-ready-2026-11-09` (at c663d00). The preview is protected by Vercel Authentication; production was not touched.

## What changed

**Homepage, in order**

1. **The deadline.** The date (April 26, 2027) is set large, with a live count of days, hours and minutes to the start of that date in Washington, D.C. A toggle shows the 2028 date for governments under 50,000 and special districts. The count is computed on the client only, and its snapshot is stable between ticks. It reaches zero only when the date begins and never goes negative. Under the count, a dated line says the dates are in effect as of November 9, 2026, that the extension is being challenged, and links to the explanation. The page states what Sayable does and offers *Request a Readiness Audit* and *See a sample report*.
2. **The resident.** A fictional resident who is blind opens the permit application. The section shows the form beside what a screen reader announces, as posted and after repair, with each line explained. Choosing a line marks the field. *Show the structure a screen reader gets* overlays the broken or repaired structure. The narration plays only when asked (Kokoro-82M, Apache-2.0) and is labelled as an illustrative text-to-speech narration, not a recording of a screen reader. It has play, pause, seek, replay and a loading state, and an error state that points to the written lines.
3. **The scan.** This is the scroll-driven scanner from Sprint 4, unchanged in behaviour. It now opens with "Sayable reads the form the way a screen reader does." and tells screen-reader users where the findings are listed.
4. **The rest of the page.**
   - Collection, priorities, repair and record: unchanged.
   - *Start with a clear picture of your documents.* now includes how the audit is quoted, plus routes for clerks, ADA coordinators, IT, agencies and procurement.
   - *Most of the work happens before the date.* has a which-date-applies card, the five-step workspace (with *Keep up* marked as a pilot), and *Why it matters now*. That covers effective communication today, how the rule is enforced (no automatic fine; the Orange County clerk settlement), the NFB challenge, and both exceptions with their conditions.
   - Comparison without brand names, estimator, close.

**Competitor names** (Acrobat, CommonLook, Equidox, CivicPlus, ChatGPT, PAC) were removed from all sales copy, including /product's comparison, which now names kinds of tool. veraPDF and NVDA still appear on /verify as the method, not as competitors. The PDF checker's repair tips still mention Acrobat where that is the tool a clerk would use.

**How it works, Company, Solutions**

- **How it works:** "From your city website to a clear plan." The first screen shows the flow: website address, inventory, findings, plan.
- **Company:** "Public services run on PDFs that not every resident can use." It pairs a document-structure visual with why Sayable exists, what it offers today, how it works, and how to get involved. No team, customers or credentials were invented.
- **Solutions:** "For the teams responsible for public PDFs." A strip of four readable sample artifacts leads to distinct workflows for clerks, ADA coordinators, IT and agencies.

**Inquiry delivery** (`src/lib/deliver.ts`) supports two channels, configured on the server only:

- **Email via Resend:** `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- **Signed webhook:** `CONTACT_WEBHOOK_URL`, optional `CONTACT_WEBHOOK_SECRET`.

A request is confirmed only when at least one channel accepts it. With neither configured, the form says plainly that nothing was sent, and the visitor's answers stay in the form.

## Verified facts

| Claim | Source | Checked |
|---|---|---|
| 2027 for total population 50,000+ (not special districts); 2028 for under 50,000 and special districts | ada.gov First steps; FR Doc. 2026-07663 | 9 Nov 2026 |
| Total population = 2020 Census, not people served or staff | ada.gov First steps | 9 Nov 2026 |
| WCAG 2.1 AA; web content and mobile apps; five exceptions | ada.gov First steps | 9 Nov 2026 |
| *NFB v. DOJ*, No. 1:26-cv-02007 (D. Md.), filed 21 May 2026, APA challenge to the extension, no ruling | Civil Rights Litigation Clearinghouse docket (last entry 13 Jul 2026) | 9 Nov 2026 |

**Re-check before outreach:** the docket, on CourtListener or PACER.

## Tests and measurements

**Production build:** 96 passed, 6 skipped, 0 failed. New tests cover:

- the countdown in four time zones, plus the 2028 toggle, one minute before the date, the date itself, after it, and minute ticks
- the resident demo
- form failure, where every answer is kept and nothing is falsely confirmed
- form success

**Live preview:** 33 key tests passed, 3 skipped.

**Real delivery path, against local stand-ins for Resend and a webhook:**

- the email carried a bearer key, an idempotency key and reply-to set to the sender
- the webhook carried an HMAC signature
- one failed channel still delivers
- both failed returns 502 and "Nothing was sent"
- requests are rate-limited after five
- server logs contain no visitor details

No email went to anyone.

**Overflow:** none on ten routes at 1440, 1280, 1024, 768, 390 and 360.

**Lighthouse mobile** (local production build):

| Page | Performance | LCP | Blocking time |
|---|---|---|---|
| / | 94 | 3.0 s | 110 ms |
| /how-it-works | 95 | | |
| /about | 96 | | |
| /solutions | 96 | | |
| /contact | 96 | | |

Accessibility, best practices and SEO scored 100 on all five. The first homepage run scored 59, with a 1,290 ms blocking task. The cause was the countdown snapshot returning a fresh time on every check, and it was fixed.

## Simulated buyer reviews

Six agent reviews were run, each in one role: city clerk, ADA coordinator, IT director, city manager, website agency, and blind screen-reader user. **These are simulations, not interviews.** Real screen-reader testing by blind users is still required.

**Fixed after the reviews**

- "Delete candidate" became "Take off the website", with a records-retention note.
- The two exceptions are stated separately, with their conditions.
- *Keep up* is labelled as a pilot.
- A dated legal-status line sits under the count.
- The seconds were removed from the count (read as sales pressure).
- Finding counts are consistent: four kinds of problem, eight unnamed fields.
- The scan copy now works without sight.
- A quote basis was added near the offer.
- Role routes were added for clerks, ADA, IT, agencies and procurement.
- The contact form has *City manager or administrator*, *Finance or procurement*, and *A written quote for budgeting*.
- The privacy bar on desktop no longer covers the hero.
- The estimator's assumptions are labelled as rough ranges.

**Checked and found not to apply**

- The scan stage is already `aria-hidden`, so its repeated sample copies don't reach screen readers.
- The honeypot field is already hidden from assistive technology.

**Need the owner (see blockers)**

- A named company and person, an address and a direct email
- Privacy-page placeholders
- A default for file handling and transfer during repair
- Crawler user-agent and allowlisting
- Agenda pilot terms: posting windows, packet limits, how late items are handled
- Whether reports are delivered in an accessible format
- Who does the screen-reader review, with which software

## Launch gate

| Gate | Status |
|---|---|
| Design complete | Yes, for this pass |
| Technically ready | Yes for the build, navigation, accessibility checks and mobile. **No for inquiries** until a delivery channel is configured in Vercel. |
| Content verified | Dates and litigation, yes. Company identity, privacy details, the Agenda Desk turnaround, the veraPDF and screen-reader review claims, and repair file handling need the owner. |
| Outreach ready | **No.** Two P0 items remain: inquiries can't reach anyone, and the vendor is unidentified (legal entity, a person, contact details, placeholders on the privacy page). |
