# Content audit, supporting pages (2026-11-08)

Each route has one visitor question. "Answers?" is the state before this pass.

| Route | Visitor question | Answered before? | Change |
|---|---|---|---|
| /product | What can it actually do? | Partly: five-stage list buried under a long offer list | Opens with "Available now" vs "Pilot or planned" (status dots). New finding-to-review mockup. Per-offer prose cut to a one-line list; ids #audit #package #agenda #check #partners kept. |
| /how-it-works | What happens after I contact you? | Yes, but spread over three tall sections | Opens with You provide / Sayable does / You receive. Crawl log and sort piles kept as the "what we do" evidence. Request mockup removed (duplicated the list). |
| /solutions/government | Why does this matter to my city? | Abstract (roles, concerns) | Four fictional document sketches (permit, agenda, notice, service form), each with the problem and why it matters. Budget, QA and procurement sections merged or cut. Deadline text uses total-population wording and notes exceptions. |
| /solutions, /solutions/agencies | Which path is mine? | Yes | Shortened; uppercase-style tag labels removed. |
| /readiness-audit | What do I receive? | Yes, but 12 sections | Hero (cost, scope, one CTA) then What you receive + sample report pages, How files are sorted, What happens after you request, needs / not included, FAQ. Price band and pilot links removed. Single CTA: /contact?topic=audit. |
| /verify | How do you check the result? | Yes | Not changed. |
| /resources (+ guides) | Where can I learn? | Yes | Only the 50,000 wording fixed ("total population"). |
| /about | Who is behind this, what is the mission? | Mission yes, who no | Mission, how we work, availability list. No people are named because none were supplied (see below). |
| /contact | How do I start? | Yes | Form untouched. Steps copy tightened; "We reply from a person" removed. |
| /security | What happens to our information? | Yes | Not changed. |

Shared: `Reveal` (PageParts) wraps the existing `data-reveal` observer: 8px rise, 220ms ease-out, reduced motion = none. `pages-extra.css` is now imported by PageParts so its classes apply to every subpage.

## Needs owner confirmation
- Who is behind Sayable: add founder or reviewer names and background if you want them shown. Nothing is invented.
- Agenda Desk "24 to 48 hour" target, "software in testing", and veraPDF/semantic-check claims on /verify were left as already written; confirm they are still accurate.
- Whether a contact reply time can be promised.
