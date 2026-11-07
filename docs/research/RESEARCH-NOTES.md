# Sayable research notes: verified facts for website copy

Compiled 2026-11-06. **All sources were accessed 2026-11-06** unless a row says otherwise. Not legal advice.

**Labels**
- **[FACT]**: read in the primary source this session.
- **[FACT-2]**: from a secondary source or a search-engine summary; the primary page was not opened.
- **[EST]**: an estimate or inference by me.
- **[UNVERIFIED]**: I could not confirm it.

**Use in copy:** quote only [FACT] items as fact. Re-check §1 dates against the Federal Register before launch.

---

## 1. Title II web rule: dates, standard, exceptions

### 1.1 Compliance dates [FACT]
| Entity | Date | Source |
|---|---|---|
| State/local government with total population **50,000+** (not a special district) | **April 26, 2027** | 28 CFR 35.200(b)(1), eCFR as of 2026-11-01: https://www.ecfr.gov/api/versioner/v1/full/2026-11-01/title-28.xml?part=35&section=35.200 |
| Population **under 50,000**, or **any special district government** | **April 26, 2028** | 28 CFR 35.200(b)(2), same eCFR link |

- **Where the dates come from.** The DOJ Interim Final Rule (IFR) *Extension of Compliance Dates…*, 91 FR 20902, FR Doc. 2026-07663, published and effective **April 20, 2026**. It moved the original dates of April 24, 2026 and April 26, 2027 back one year. Comments closed June 22, 2026 (RIN 1190-AA82, Docket CRT150).
  - https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web
  - PDF: https://www.govinfo.gov/content/pkg/FR-2026-04-20/pdf/2026-07663.pdf
  - The govinfo details page in the brief (https://www.govinfo.gov/app/details/FR-2026-04-20/2026-07663) is the same document; I read the Federal Register copy.
- **DOJ pages that state the same dates:**
  - First Steps: https://www.ada.gov/resources/web-rule-first-steps/
  - Small Entity Compliance Guide: https://www.ada.gov/resources/small-entity-compliance-guide/
  - Fact sheet: https://www.ada.gov/resources/2024-03-08-web-rule/ (the brief's `/notices/2024/03/08/web-rule/` now redirects here)
- **How population is set** (First Steps):
  - Use the 2020 decennial Census.
  - A department uses its parent government's population. For example, a county library branch in a county of 70,000 has the 2027 date.
  - Independent school districts use the 2022 SAIPE estimates.
  - Special districts (water, transit, mosquito abatement and similar) always get 2028.
- **Standard:** WCAG 2.1 Level A and AA success criteria and conformance requirements (35.200(b)). This applies to web content and mobile apps a public entity provides "directly or through contractual, licensing, or other arrangements" (35.200(a)).
- **Defenses:** fundamental alteration and undue burden (35.200(b), 35.204). The IFR notes that the agency head or a designee must make this assessment and put it in a written statement of reasons.

### 1.2 Anything since April 2026 that could change this
| Item | Status as of 2026-11-06 | Label / source |
|---|---|---|
| **Federal Register: any later DOJ web-rule NPRM or rule** | None found. An FR API search for "Accessibility of Web Information and Services" after 2026-04-21 returned only the 2026-08-14 Regulatory Agenda notice. | [FACT] https://www.federalregister.gov/api/v1/documents.json (query run 2026-11-06) |
| **What the IFR itself says** | "During the extension period, the Department will consider issuing an NPRM… on the substance of the 2024 final rule." "If the Department does not issue such an NPRM and if circumstances suggesting further delays… do not exist, the Department fully anticipates implementing the regulation at the new deadline." "Regardless of the compliance dates, covered entities have an ongoing obligation…" | [FACT] IFR preamble, FR link above |
| **Spring 2026 Unified Agenda** | Lists a possible NPRM under RIN 1190-AA82 to make provisions "less burdensome", with the timetable "To Be Determined" | [FACT-2] https://www.federalregister.gov/documents/2026/08/14/2026-16606/regulatory-agenda (search summary; agenda entry not opened) |
| **NFB v. DOJ** (D. Md., No. **1:26-cv-02007-RDB**, filed **May 21, 2026**) | Challenges the DOJ IFR and the HHS Section 504 extension under the APA (no good cause to skip notice and comment; arbitrary and capricious). Asks the court to vacate both and restore the original dates. **No ruling found.** One search summary mentioned a Sept 28, 2026 summary-judgment motion; I could not confirm it. | [FACT] complaint (case number in the file stamp): https://browngold.com/wp-content/uploads/2026/05/NFB-v.-DOJ_5-21-2026.pdf. [FACT-2] status: https://titleii.org/title-ii-updates (updated 2026-10-12: "no court ruling"); https://clearinghouse.net/case/48281/ ("ongoing"). PACER/CourtListener was not reachable. |

**[EST] Copy implication.** The dates are law today, but two things could move them in either direction:
- A ruling vacating the IFR would put the original dates back, and those have already passed for large entities.
- A substantive NPRM could narrow the rule.

Copy should say "currently April 26, 2027 / April 26, 2028" and link to ada.gov.

### 1.3 PDF-relevant exceptions, in plain English [FACT: 28 CFR 35.201, eCFR 2026-11-01; DOJ fact sheet and First Steps]
1. **Preexisting conventional electronic documents** (PDF, Word, slides, spreadsheets).
   - Covered: files already posted before your compliance date.
   - Lost if: the file is still used to apply for, get access to, or take part in a service (forms, applications, permit packets, current ordinances).
   - Never covered: anything posted after the date.
2. **Archived web content.** All four conditions must hold:
   - It was created before the date, or reproduces older physical media.
   - It is kept only for reference, research or recordkeeping.
   - It sits in a clearly marked archive area.
   - It has not been changed since it was archived.

   DOJ's own examples: council minutes created after the date are not covered even if posted in "archive", and neither is a current park map PDF.
3. **Third-party content** is excepted only if posted by a truly unaffiliated third party, such as a resident on a message board. An entity "can't contract away its responsibilities": a vendor posting on the city's behalf does not qualify.
4. **Individualized, password-protected or otherwise secured documents.** The document must be about a specific person, property or account and also secured. A billing-change notice posted for many people in the same portal is not excepted.
5. **Preexisting social media posts** (not usually relevant to PDFs).

**Conforming alternate versions** (28 CFR 35.202) [FACT]:
- They may be used "**only where it is not possible to make web content directly accessible due to technical or legal limitations**."
- DOJ fact sheet: entities "usually… should not have a main web page that is inaccessible and a separate accessible version."
- **[EST]** So "post an HTML copy instead of fixing the PDF" is not a general compliance path under the rule's text. No court ruling or DOJ guidance specifically addresses HTML-transcript products (see §3).

### 1.4 Obligations that apply now, independent of the technical dates [FACT]
- **28 CFR 35.160 (effective communication).**
  - Communications with people with disabilities must be "as effective as communications with others."
  - Auxiliary aids must be "provided in accessible formats, in a timely manner, and in such a way as to protect the privacy and independence of the individual."
  - The entity gives "primary consideration" to the person's request.
  - https://www.ecfr.gov/api/versioner/v1/full/2026-11-01/title-28.xml?part=35&section=35.160
- **Small Entity Guide:** "The ADA has always required…" effective communication, reasonable modifications and equal opportunity, and "these requirements still apply… before the rule's start dates."
- **Content covered by an exception:** "in many circumstances" it must still be provided in an accessible format on request (DOJ First Steps and fact sheet).
- **Program access:** applies regardless of dates (28 CFR 35.149–35.150).
- **ADA coordinator:** entities with 50+ employees must designate one and adopt grievance procedures (28 CFR 35.107).

---

## 2. Enforcement and consequences

### 2.1 How Title II is enforced [FACT unless marked]
- **Administrative complaints** (28 CFR 35.170–35.174, eCFR):
  - Filing: anyone may file within 180 days, with DOJ or the "designated agency".
  - Investigation: the agency investigates, may run compliance reviews, and seeks informal resolution.
  - Letter of Findings: if no resolution, the agency issues one that includes "a description of a remedy for each violation found (**including compensatory damages where appropriate**)."
  - Voluntary compliance agreement: must specify corrective action "within a stated period of time" and "provide for enforcement by the Attorney General."
  - Referral: if the entity refuses, the matter goes to the Attorney General.
- **Who investigates.** Under 28 CFR 35.190(b):
  - **Department of Education** (OCR): schools, colleges and libraries.
  - **HHS**: health and social services.
  - **DOT**: transportation.
  - **DOJ**: law enforcement, courts, and general government "support services".
- **Private lawsuits.** Under 35.172(d) a complainant may sue "at any time… whether or not the designated agency finds a violation."
  - Remedies follow Rehabilitation Act §505 / Title VI (42 U.S.C. 12133): https://www.law.cornell.edu/uscode/text/42/12133
  - The IFR itself cites the private right of action as the main litigation risk for entities.

### 2.2 What remedies look like [FACT]
- **Typical outcome:** injunctive relief through settlement agreements or consent decrees. These set a deadline to conform to WCAG, appoint a web accessibility coordinator, hire an independent consultant (often DOJ-approved), require training and testing with disabled users, and add periodic reports to DOJ over a 2–3 year term (see §2.3).
- **Compensatory damages are available only in limited circumstances:**
  - **Punitive damages are not available** under Title II §202 or Rehab Act §504: *Barnes v. Gorman*, 536 U.S. 181 (2002). https://www.law.cornell.edu/supct/html/01-682.ZS.html
  - **Emotional-distress damages are not recoverable** under the Rehabilitation Act: *Cummings v. Premier Rehab Keller*, 596 U.S. 212 (2022). https://www.law.cornell.edu/supremecourt/text/20-219
    - [EST] Courts are split on whether Cummings carries over to Title II. Do not state either way in copy.
  - **Money damages require intentional discrimination.** Many circuits apply "deliberate indifference": *Duvall v. County of Kitsap*, 260 F.3d 1124, 1138–39 (9th Cir. 2001). Negligence or "bureaucratic slippage" is not enough. [FACT-2] via a 2026 Ninth Circuit memorandum citing Duvall: https://cdn.ca9.uscourts.gov/datastore/opinions/2026/09/08/24-4756.pdf
  - **Attorney's fees** can be awarded to a prevailing party (42 U.S.C. 12205). [EST: statute not re-read this session]
- **No automatic fines.** Title II has no civil-penalty provision like the one in Title III. **Do not claim per-violation federal fines in copy.** [EST, based on the structure of 42 U.S.C. 12133; I did not find any Title II civil-penalty text.]

### 2.3 Real DOJ resolutions involving public-entity websites and documents [FACT: agreement text read]
| Entity | Date | Trigger | What was required |
|---|---|---|---|
| **City and County of Denver, CO** (Project Civic Access) | Signed **Jan 8, 2018**; 3-year term | DOJ compliance review | Keep a web accessibility coordinator. Hire a DOJ-approved independent consultant for annual evaluations, paid by Denver "without regard to the outcome". Adopt a WCAG 2.0 AA policy, train content staff, and write WCAG into performance evaluations. Test with automated tools and with blind, deaf and mobility-impaired testers. **Websites and online services, including third-party ones, conform to WCAG 2.0 AA within 6 months.** https://archive.ada.gov/denver_pca/denver_sa.html |
| **Orange County Clerk of Courts, FL** | Signed **July 2014** (DOJ signature dated 7/17/2014); 3-year term | Complaint by a blind attorney: filed court exhibits were **non-OCR, inaccessible PDFs** for more than 4 months | Provide documents in accessible formats on request "at no additional charge, in a timely manner". Make documents the Clerk creates accessible (WCAG 2.0 AA). Website conforms to WCAG 2.0 AA within 6 months. Annual training and quarterly complaint reports to DOJ. **$10,000 paid to the complainant**, explicitly including emotional distress, before the *Cummings* decision. https://archive.ada.gov/occ.htm |
| **Champaign-Urbana Mass Transit District, IL** (special district) | Signed **Dec 13–14, 2021**; 2-year term | Complaint about an inaccessible website and apps | **WCAG 2.1 AA** for all web pages and mobile apps. Web accessibility coordinator, independent consultant's written evaluation within 4 months, mandatory training, and an accessibility statement. Reports at 9, 15 and 21 months. **Invest at least $100,000** over the term. https://archive.ada.gov/champaign-urbana_sa.pdf |
| **Nueces County, TX** (PCA) | Signed **Jan 30, 2015** | Compliance review. DOJ lists it as a case where an online registration form was unusable with screen readers. | Web coordinator and independent consultant. Website and online services, including third-party ones, conform to WCAG 2.0 AA within 3 months; assessment of existing content within 24 months. https://archive.ada.gov/nueces_co_tx_pca/nueces_co_tx_sa.html |

- DOJ's current web guidance cites Denver, Jacksonville FL and Durham NC as PCA agreements with web terms. It also cites Nueces County and Miami University (consent decree). https://www.ada.gov/resources/web-guidance/
- I found **no 2025–2026 DOJ Title II web settlement** with a city or county. [EST] Recent federal enforcement in this area looks quiet; private suits and complaints remain the live risk.
- Older PCA agreements reference WCAG 2.0; the 2024 rule uses 2.1.

---

## 3. Competitors: what each does and what it leaves for city staff
| Product | Genuine strengths (official docs) | What it leaves for a city team | Source |
|---|---|---|---|
| **Adobe Acrobat Pro: Accessibility Checker + Autotag** | Industry-standard editor. The checker runs a full report; autotag adds structure; the Reading Order and Tags tools fix problems. The Auto-Tag API tags headings, tables, lists and paragraphs and outputs a report. | Adobe's own docs: "Logical reading order" and color contrast are "**Needs manual check**". Autotag "cannot always correctly interpret" multi-column text, irregular alignment, and **tables without borders**, and may tag decorative items as figures. API output "**is not guaranteed to comply with accessibility standards such as WCAG and PDF/UA**", and alt text and complex tables need review. | [FACT] https://developer.adobe.com/document-services/docs/overview/pdf-accessibility-auto-tag-api/. [FACT-2] helpx pages blocked (HTTP 403); quotes via search: https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html |
| **PAC (axes4)**: now **PAC 2026** (v26.1.0.0, released Mar 25, 2026); PAC 2024 superseded | Free, Windows, funded by the German labor ministry. Checks PDF/UA and WCAG. Screen-reader and structure preview. **New: local AI checks** that flag likely semantic errors, such as a visual heading not tagged as a heading, untagged images, and missing or unrecognized structures. | PAC's FAQ: AI "does **not replace human judgment**". It does **not** check alt-text correctness or **reading order** ("should still be checked by a human"). It recognizes tables and lists only as a whole, not rows, columns or items. A human still interprets results and fixes the file. | [FACT] https://pac.pdf-accessibility.org/en/resources/ai-checks ; https://pac.pdf-accessibility.org/en/download |
| **veraPDF** | Open-source (GPLv3+/MPLv2+) industry validator for all PDF/A and PDF/UA parts; formalizes each "shall" rule. Experimental WCAG 2.2 profiles. | "In cases of PDF/UA **only machine verifiable checks are performed**." It cannot judge meaning: whether headings, reading order, alt text or table relationships are right. It does not fix anything. | [FACT] https://docs.verapdf.org/validation/ ; https://github.com/veraPDF/veraPDF-library. verapdf.org was temporarily offline (PHP vulnerability notice). |
| **CommonLook (Allyant)**: "CommonLook PDF" (formerly PDF Global Access) | Desktop/web editor with "AI auto-tagging" and advanced and simplified editors. Free PDF Validator plugin for Acrobat. Clarity crawler finds PDFs on sites. High-volume templated automation. Remediation services "backed by our 100% conformance guarantee". Claims 2M pages remediated per year. On WA contract 02024 (§4). | Software: staff still need training and must review each file. Services: per-page cost, plus the city's own intake and QA. | [FACT] https://allyant.com/commonlook-accessibility-suite/ ; https://allyant.com/pdf-document-remediation-services/ |
| **Equidox** | SaaS remediation editor ("no deep accessibility knowledge" needed), Equidox AI for high-volume templated documents, and managed services. Alameda County CA approved a **3-year, $500,000 sole-source** Equidox PDF remediation agreement (term 1/28/26–2/28/29). | The AI product targets "repetitive, recurring documents". One-off, complex documents need an editor operator or services. | [FACT] https://equidox.co/ ; https://www.alamedacountyca.gov/board/bos_calendar/documents/DocsAgendaReg_02_10_26/GENERAL%20ADMINISTRATION/Regular%20Calendar/ITD_400006.pdf |
| **CivicPlus DocAccess** | Script-based: OCR + AI turn public PDFs, including scans, maps and handwriting, into **HTML transcripts** under the original link. "Complex pages get additional human review… at no extra cost." No staff workflow change. Translation. | **The original PDF is not remediated.** CivicPlus treats the HTML as the "primary accessible format". Fillable PDFs: users "download or open the original PDF to complete and submit." Only public PDFs; nothing behind a login. Whether HTML transcripts satisfy 35.202 is unsettled (§1.3). | [FACT] https://www.civicplus.help/docaccess/docs/docaccess-faqs |
| **Granicus** | Major government web/CMS and meetings vendor. Markets "continuous conformance". Its Monterey County webinar frames **19,000+ PDFs** and moving high-value content from PDFs to web pages. | I found **no official Granicus product doc for automatic PDF remediation**. The spec's "automatic PDF remediation preview" is [UNVERIFIED]. | [FACT] https://granicus.com/resource/beyond-remediation-monterey-countys-accessibility-strategy/ |
| **axesPDF / AbleDocs** | axesPDF (axes4, Switzerland, the PAC maker): full structure-tree editing, built-in PAC checks, screen-reader preview, new AI checks. axes4 states: "**Not every PDF can be made accessible through fully automated processes.** Particularly complex documents containing tables, forms, or flawed structures require professional post-processing." AbleDocs is a remediation-services group; it and axes4 announced a merger on July 1, 2020. | Expert desktop tool, so an expert operator is required. AbleDocs services: the city's intake and QA. AbleDocs' "$10M liability guarantee" claim is [FACT-2] (PDF Association member profile via search); abledocs.com was unreachable. | [FACT] https://www.axes4.com/en/software-services/axespdf. [FACT-2] https://www.businesswire.com/news/home/20200701005703/en/ |
| **General LLMs (ChatGPT etc.)** | Can read a PDF's extracted text. OpenAI's help pages say that on some plans or contexts it also reads page images and charts. Useful for drafting alt text and plain-language summaries. | OpenAI's docs describe text and image retrieval, **not reading or editing the PDF tag tree**. Output is a chat answer, not a tagged PDF with a conformance report. Any tag edits would need code plus validation. [EST] | [FACT-2] https://help.openai.com/en/articles/8555545-file-uploads-faq ; https://help.openai.com/en/articles/10416312-visual-retrieval-with-pdfs-faq |

**[EST] Copy guardrails:**
1. PAC 2026 now does some AI semantic checking. Do **not** say "standard checkers can't tell a heading from a paragraph". Say instead that free checkers do not verify reading order, alt text, or table cell relationships, and PAC says this itself.
2. Allyant and AbleDocs publicly offer guarantees. Sayable should not imply it is unique in standing behind its work.
3. Do not describe DocAccess as non-compliant. Say that it leaves the original PDF unchanged.

---

## 4. Pricing benchmarks
| Benchmark | Figures | Label / source |
|---|---|---|
| **WA DES cooperative contract 02024**: Document Accessibility & PDF Remediation. Effective 05-01-2026; term ends 04-30-2029; final end 04-30-2032. Price sheet "last updated June 9, 2026". | **The spec's figures are verified but mis-attributed.** **$3.34 simple / $4.60 complex per page** are **Optimal Solutions Group's** Category 1 (generic documents) ceilings for 1–2 page jobs at standard 2–3 business-day turnaround. They are not the contract-wide ceilings. Across the 12 contractors with Category 1 rates (1–2 pp, standard turnaround): **simple $2.88–$20.00 (median $4.70); complex $3.60–$35.00 (median $6.00)**. At 500+ pages: simple $1.50–$17.00 (median $4.00), complex $2.00–$26.25 (median $5.95). Category 4 (historical/aging documents, 1–2 pp): simple median $6.00, complex median $10.00. | [FACT] my tabulation of https://apps.des.wa.gov/contracting/02024p06.xlsx ; summary page https://apps.des.wa.gov/DESContracts/Home/ContractSummary/02024 |
| WA 02024 rules | Prices "are the maximum amounts contractors can charge, so don't hesitate to negotiate." Out-of-state local governments may use the contract by signing a WCCUA and a participating addendum with each contractor. Requires **WCAG 2.2 AA**, and PDFs must meet **PDF/UA (ISO 14289-1 or -2)**. Awardees include Allyant (NetCentric), BarrierBreak, Optimal, Prisma, iAccess Digital, Chax and others. | [FACT] https://apps.des.wa.gov/contracting/02024ContractSummaryPageFAQ.pdf |
| **City of Chandler, AZ**: agreement with AccessAbility Officer LLP, Oct 16, 2025–Oct 15, 2026, not to exceed **$150,000** | PDF remediation tiers: 1–20 pp **$10.00/page**; 21–50 $9.15; 51–100 $8.50; 101–200 $7.75; 201–500 $6.95. By file type: **standard $5.00/page; forms $10.00; OCR standard $23.15; OCR + forms $28.65**. Web audit phases total $71,610. Optional monitoring $6,000/month. | [FACT] https://public.destinyhosted.com/chanddocs/2025/CC/20251013_1975/8736_4936_Agreement_Final.pdf |
| **Alameda County, CA**: Equidox | $500,000 over 3 years (1/28/26–2/28/29), sole source as COTS software | [FACT] (§3 link) |
| Ohio State University supplier list | Allyant base **$5.00/page** (forms $50 simple / $100 complex per page); Deque **$15.00/page flat**, including forms | [FACT-2] https://das.osu.edu/resources/pdf-remediation-suppliers (now redirects; figures from a search summary; undated) |
| DocAccess annual fees | Clark County OH: $29,800 for the rest of 2026. A city in Alabama: $37,720 over 24 months. Clovis CA: $27,025/yr vs a $75,943 one-time "traditional" estimate. | [FACT-2] citizenportal.ai summaries. Clovis came from round-3 research; I could not find the primary staff report. |
| League City TX RFP 26-008 | Estimated $100k–$500k/yr, multiple vendors; files must pass the Acrobat checker "or equivalent" | [FACT-2] round-3 research (aggregator listings) |
| "AI-only ~$0.30/page" (spec) | Vendor marketing (CasoComply "from $0.30/page") | [FACT-2] vendor claim only |

**[EST] Implications:**
- The spec's "$3.34/$4.60 price ceiling" should be restated as "the lowest-priced awardee's 1–2 page ceiling".
- The median WA ceiling is about $4.70 simple and $6.00 complex. A real city contract (Chandler) pays $5–10 standard and $23 for scans.
- The spec's simple tier of about $1.50–2.00 is at or below the cheapest WA 500+ page rates.

---

## 5. Buyer roles and procurement

### 5.1 Who owns what (real postings and rules)
- **ADA coordinator.** Required for entities with 50+ employees (28 CFR 35.107) [FACT]. Where it sits varies by city:
  - **Santa Monica, CA:** Public Works, Architecture Services. Duties include the ADA work plan, self-evaluation and transition plan (2024 posting). https://www.governmentjobs.com/careers/santamonica/jobs/newprint/4475436
  - **Rockville, MD:** Department of the City Manager. Duties include "updating ADA information in the city's website." https://www.governmentjobs.com/careers/rockville/jobs/newprint/4608296
  - **Colorado Springs, CO:** Office of Accessibility, in the HR division. Sits on the Title II compliance committee (2025 posting). https://www.governmentjobs.com/careers/cosprings/jobs/newprint/4883197
- **Website / CMS.** Usually the Communications department [FACT]:
  - **Athens-Clarke County, GA:** Communications. "Administers all technical aspects, operations, and content" of the website, including the CMS and "vendor coordination", and "ensures ongoing compliance with ADA/WCAG" (Jan 2026 posting). https://www.governmentjobs.com/careers/athensclarke/jobs/newprint/5193604
  - **Brighton, CO:** Communications & Engagement, "Digital Media and Accessibility Specialist". Audits the site and remediates content (Jan 2026 posting). https://www.governmentjobs.com/careers/brightonco/jobs/newprint/5184873
- **Agenda publishing.** City clerk / deputy clerk prepare, post and distribute agenda packets [FACT-2: Sacramento, Fresno and Ripon postings via search].
  - Fresno's clerk-run agenda portal says it aims for WCAG 2.1 AA and offers "Accessible HTML" alongside each source PDF [FACT]: https://agendas.fresno.gov/en/accessibility
  - **California Brown Act** (Gov. Code 54954.2(a)(1)): agenda posted **at least 72 hours** before a regular meeting, including on the agency's website [FACT-2]: https://california.public.law/codes/ca_gov't_code_section_54954.2
- **DOJ's view.** Involve the ADA coordinator, web/IT staff and **procurement staff**. "Working with vendors doesn't mean your public entity is off the hook." [FACT] First Steps.

### 5.2 Purchasing thresholds (real cities) [FACT]
| City (approx. pop.) | Informal / quotes | Formal / who approves | Source |
|---|---|---|---|
| **Midland, TX** (~135k) | $3,000–$29,999.99: **3 written quotes or cooperative pricing**, approved by the department head and Purchasing. $30,000–$99,999.99: adds the General Services Director and **City Manager**. | **$100,000+:** sealed bid, City Council resolution. "Cooperative pricing may be used in lieu of quotations." | https://www.midlandtexas.gov/1421/Purchasing-FAQ |
| **Richmond, CA** (~115k), policy dated March 2026 | Under $3k: 1 quote. $3–5k: 2 quotes. **$5–50k: 3 quotes**, or for professional services an informal RFP/RFQ. | **"Professional service contracts exceeding $10,000 must be awarded by the City Council."** Formal process above $50k. | https://www.ci.richmond.ca.us/DocumentCenter/View/79052/Purchasing-Policy---March-2026-PDF |
| **Santa Monica, CA** (~90k) | Professional services: informal proposal **$25,000–$95,000** | **Formal RFP + Council above $95,000** | https://santamonica.gov/competitive-bidding-thresholds |

**[EST] Who signs a $5–25k services contract.** It varies:
- **Midland:** department head plus Purchasing, with no council action below $30k.
- **Richmond:** City Council for anything over $10k.
- **Santa Monica:** below the $25k informal-proposal floor. [UNVERIFIED] Department-level authority below $25k is not stated on the page.

The ADA coordinator or communications manager usually champions the purchase; the department head, purchasing or the city manager signs. Cooperative contracts such as WA 02024 can replace quotes in cities like Midland.

---

## 6. Document volume evidence
| Entity | Figure | Label / source |
|---|---|---|
| **Exeter, CA** (~10k pop.) | A proposer counted **1,101 PDF files, 30,213 pages within PDFs, 32,518 images in PDFs**, and 1,357 web pages. **The city said it "cannot independently confirm" these** and had "not completed a comprehensive inventory". Website redesign budget is about **$30,000**, and full-library remediation is not required. | [FACT] https://cityofexeter.ca.gov/wp-content/uploads/2026/09/responses-to-rfp.pdf |
| **Monterey County, CA** | "more than 19,000 PDFs" (Granicus webinar) | [FACT, vendor-framed] Granicus link in §3 |
| **Allyant** (vendor throughput) | 2M PDF pages remediated per year (self-reported) | [FACT, vendor claim] https://allyant.com/ |
| Contra Costa County, CA | about 400,000 PDF pages across 10 sites (2025 RFP) | **[UNVERIFIED]**: no primary listing found; govtribe blocked |
| Average government site: 847 PDFs | Vendor report | [UNVERIFIED] (round-3 secondary) |

**[EST]** The page count of a city's new agenda packets per year still has no primary-source figure. Count 10 real packets before quoting volume.

---

## 7. Could NOT verify
- NFB v. DOJ docket activity after the complaint, including the reported Sept 28 summary-judgment motion. No ruling found.
- The text of the Spring 2026 Unified Agenda entry (seen only in a search summary).
- Adobe helpx wording (HTTP 403). Quotes in §3 come from search summaries; the Adobe developer API page was read directly.
- The OSU per-page rates (page now redirects), Clovis DocAccess amounts, League City estimate, and the Contra Costa 400k-page RFP.
- A Granicus automatic PDF remediation product, AbleDocs' current ownership and its $10M guarantee, and current Equidox list prices.
- Whether *Cummings* applies to Title II damages (courts are split; I did not research this).
- A primary-source mid-size city clerk job description (city sites blocked; only search summaries).
