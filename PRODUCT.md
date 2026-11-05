# Product

<!-- impeccable:product-schema 1 -->

> Source: written from the founder's written briefs (Nov 4 2026) and `../sayable-spec/SAYABLE-BUILD-SPEC.md`. The brief told the agent to proceed without an interview round; items marked *(inferred)* were not confirmed by the founder.

## Platform

web

## Users
Public-sector buyers and the people who carry document work for them: city managers, municipal IT directors, ADA coordinators, city clerks and records staff, web/communications managers. Secondary: municipal website agencies and accessibility remediation firms with overflow work. They are skeptical, busy, budget-conscious, and evaluate vendors through procurement.

## Product Purpose
Sayable helps cities and counties make their public documents (mostly PDFs) usable with screen readers. It inventories every publicly linked document, recommends which must be fixed, archived, deleted or converted, repairs the ones that matter (software for routine structure, people for tables, forms and scans), and checks every delivered file with veraPDF (PDF/UA-1), a semantic check, and human review. Success: a buyer requests a Readiness Audit.

## Positioning
Triage before remediation: knowing which documents need work and why, then independent, documented verification of the result. Not "AI makes everything compliant."

## Operating Context
Municipal websites with years of agendas, minutes, permit applications, fee schedules, notices and forms; third-party hosts (Granicus, CivicPlus, Legistar). ADA Title II rule (28 CFR Part 35 Subpart H) compliance dates; agenda posting deadlines; buyers check deliverables with Acrobat's checker, PAC 2024 and veraPDF.

## Capabilities and Constraints
- Offers: Readiness Audit, Readiness Package (audit + remediation), Agenda Desk (packet turnaround), Check-before-post (planned, not available), white-label.
- Fixes change tags, order, alt text and field names only; never document text. Tables and lists go to a person in v1.
- Public documents only. Triage is a recommendation; the customer decides.
- No backend lead capture configured yet; the contact route forwards to a webhook only when configured.

## Brand Commitments
- Never claim "compliant", "certified", "guaranteed compliant", "100% accessible" or "ADA approved".
- No testimonials, client logos, partnerships or invented metrics.
- Name: Sayable.

## Evidence on Hand
Preliminary research benchmarks only (spec §1): 13 of 32 real sample pages passed veraPDF + semantic check with no hand work; semantic check caught 13 of 15 subtle injected defects vs 0 of 15 for rule checks; 0 of 19 false flags on real auto-tagged pages; ~$0.004–$0.15 AI cost per page; market price ceiling ~$3.34/page simple and ~$4.60 complex on a public cooperative contract; human remediation 3–12 min per standard page (practitioner sources). No customers, no case studies, no audio clips yet.

## Product Principles
1. Show the document, not the pitch: every claim is demonstrated on a document.
2. Prioritize before spending: the cheapest page is the one that does not need remediation.
3. Report what was checked, never what was promised.
4. People handle what software cannot do reliably.

## Accessibility & Inclusion
The site itself targets WCAG 2.2 AA; interactive demos must work by keyboard and with reduced motion, with text equivalents for visuals.
