# Final craftsmanship pass, 8 November 2026

Branch `sayable/final-craftsmanship-pass`, from tag `backup/pre-final-polish-2026-11-08`. The preview is https://sayable-site-5a3brn41q-neel-s-projects9.vercel.app (Vercel Authentication, `noindex`). Production is unchanged.

The before screenshots are in `docs/sayable_final_polish_feedback_2026_11_08/`. The after screenshots, taken from the live preview, are in `docs/final-pass-captures/desktop/sheet.png` and `docs/final-pass-captures/mobile/sheet.png`.

## Changes

- **Sayable scan.**
  - The line starts at the top of the form.
  - On arrival it runs once to just below the title, revealing the first finding. Scroll then carries it down the page in document order.
  - The label is "Sayable scan".
  - The technical chips and the seven reading-order numbers are gone from the form. Four numbered margin marks remain.
  - A numbered scan log beside the form explains each finding in plain words as the line reaches it:
    - This title isn't recognized as a heading.
    - A screen reader can't tell what this field is for.
    - These checkboxes have no names and aren't grouped.
    - The page is read starting at the footer.
  - The technical identifiers for specialists (P instead of H1, empty TU, footer not marked as an artifact) are in "Technical details".
  - On phones the log sits inside the scene copy. On shorter desktops it grows one finding at a time.
- **Hero.**
  - Shorter lede: "Sayable finds the accessibility problems in your city's public PDFs, shows what to fix first, repairs them, and records every check."
  - The scan log fills the empty lower-left area with the product's own output.
- **Deadline.**
  - The date is still the visual moment, with a new headline: "The deadline is approaching. Finding the work comes first."
  - Total-population wording for 2027, and 2028 for smaller governments and special districts, with WCAG 2.1 AA, checked against ada.gov today.
  - A pinned workspace for a fictional city follows (300vh). As you scroll it goes through Find (crawling), Prioritize (rows re-sort with shared layout, archive rows flagged for the team), Repair, Verify, and Keep up (a new agenda arrives already checked).
  - Then three short answers: old PDFs, waiting for the date, fines. Sources follow.
  - The offer comes straight after: "Start with a clear picture of your documents.", with the audit CTA.
- **Motion.**
  - The transitions.dev agent scan went from 55 to 81. Changes:
    - motion tokens: `--dur-fast` 150, `--dur-base` 220, `--dur-slow` 350, `--dur-exit` 150, `--ease-out`
    - hover transitions
    - an exit transition on the consent dialog
    - dead CSS from older versions removed
  - Popovers open in 220 ms, close in 150 ms and start at scale 0.97. The success panel no longer overshoots.
  - The hosted `fix` was not run: it needs a transitions.dev account, which the owner must create in a browser. Revamp is a paid plan.
- **Supporting pages.** Revised; see `docs/CONTENT-AUDIT-2026-11-08.md`. Government shows four document examples, Readiness Audit leads with deliverables and next steps, How it works uses a provide / do / receive ledger, Product separates available from planned, and About states the mission without invented people.

## Verification

- `tsc` and `eslint` pass, and `next build` succeeds.
- Playwright on the production build: 81 passed, 5 skipped, 0 failed. New tests cover:
  - the scan starting at the top
  - plain-language findings, with no "tagged as text, not H1"
  - the deadline's population wording, scroll steps from Find to Keep up, and the offer after it
- Against the live preview, with the OIDC header: 11 desktop tests passed.
- Lighthouse mobile:

  | Route | Performance | Accessibility | Best practices | SEO | LCP | TBT |
  |---|---|---|---|---|---|---|
  | / | 94 | 100 | 100 | 100 | 3.0 s | 20 ms |
  | /solutions/government | 100 | 100 | 100 | 100 | 1.7 s | |
  | /readiness-audit | 95 | 100 | 100 | 100 | 2.9 s | |

- Scroll Craft: no dead scroll at 1440 (18.2 viewport-heights) or 390 (19.0).
- No horizontal overflow at 1440, 1280, 1024, 768, 390 or 360.
- Impeccable: only nested-card notes remain (documents drawn as documents). The tiny text in the government sketches was fixed.
- Taste Skill: the same defended findings as the previous pass.
