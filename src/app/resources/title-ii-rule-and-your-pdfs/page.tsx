import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout } from "@/components/pages/guide/GuideLayout";
import { DataTable, GuideSection, Note, OL, UL } from "@/components/pages/guide/GuideParts";
import { resources } from "@/content/resources";

const r = resources.find((x) => x.slug === "title-ii-rule-and-your-pdfs")!;

export const metadata: Metadata = {
  title: r.title,
  description:
    "A plain-English summary of the DOJ's ADA Title II web accessibility rule for PDFs: compliance dates, WCAG 2.1 AA, exceptions for older and archived documents, enforcement, and first steps. With links to the primary sources.",
  alternates: { canonical: `/resources/${r.slug}` },
  openGraph: { type: "article", title: r.title, modifiedTime: r.updated },
};

const contents = [
  { id: "what", label: "What the rule says" },
  { id: "dates", label: "Who has to act, and when" },
  { id: "excepted", label: "Which PDFs are excepted" },
  { id: "now", label: "What applies already" },
  { id: "enforced", label: "How it is enforced" },
  { id: "first", label: "What to do first" },
  { id: "sources", label: "Sources" },
];

const ext = { className: "text-link", rel: "noopener noreferrer" } as const;

export default function Page() {
  return (
    <GuideLayout
      title={r.title}
      summary="State and local governments must make their websites, and the documents on them, meet WCAG 2.1 AA. For governments of 50,000 people or more that starts on April 26, 2027. Not every old PDF has to be fixed, but anything people use to get a service does."
      readingMinutes={r.readingMinutes}
      updated={r.updated}
      contents={contents}
    >
      <Note>
        This is general information to help you plan, written in November 2026. It is not legal advice. The dates have moved once and could move
        again, so check the sources at the end before you rely on them.
      </Note>

      <GuideSection id="what" title="What the rule says">
        <p>
          In 2024 the Department of Justice added a section to its rules under Title II of the Americans with Disabilities Act. It requires state and
          local governments to make their web content and mobile apps meet the Web Content Accessibility Guidelines, version 2.1, level AA. That is a
          published technical standard, usually shortened to WCAG 2.1 AA.
        </p>
        <p>
          The rule covers &ldquo;conventional electronic documents&rdquo; too. In practice that means the PDFs, Word files, spreadsheets and slides
          on your website. For many cities, much of it is PDFs: forms, agendas, packets, notices, reports and maps.
        </p>
      </GuideSection>

      <GuideSection id="dates" title="Who has to act, and when">
        <p>
          An interim final rule published on April 20, 2026 set the current dates. Population is counted from the 2020 Census, and a city department
          goes by its city&apos;s population.
        </p>
        <DataTable
          caption="Compliance dates as of November 2026"
          head={["Who", "Date"]}
          rows={[
            ["State and local governments with 50,000 people or more", "April 26, 2027"],
            ["State and local governments under 50,000 people", "April 26, 2028"],
            ["Special district governments, whatever their size", "April 26, 2028"],
          ]}
        />
        <p>
          In May 2026 the National Federation of the Blind sued the Department of Justice, asking a court to undo the extension and restore the
          earlier dates. As of this writing we know of no ruling. DOJ has also said it may propose further changes. Plan for the dates above, and
          watch for news.
        </p>
      </GuideSection>

      <GuideSection id="excepted" title="Which PDFs are excepted">
        <p>The rule has exceptions. The ones that matter most for PDFs:</p>
        <UL>
          <li>
            Older documents. PDFs posted before your compliance date are excepted, unless people currently use them to apply for, get, or take part in
            a service or program. A current application form is not excepted just because it was posted years ago.
          </li>
          <li>
            Archives. Content made before the date, kept only for reference, research or recordkeeping, not changed since, and kept in an area clearly
            marked as an archive. All four conditions have to hold.
          </li>
          <li>Content posted by unrelated third parties, which your government doesn&apos;t control or pay for.</li>
          <li>Documents about a specific person, property or account that sit behind a password, such as an individual utility bill.</li>
        </UL>
        <p>
          An accessible alternate version, such as a web page in place of a PDF, is only allowed where making the original accessible is not
          possible for technical or legal reasons.
        </p>
        <Note>
          Deciding which of your files are excepted is your government&apos;s decision, usually with your attorney. Inventory tools, ours included,
          can sort files into likely groups. They should not make that call for you.
        </Note>
      </GuideSection>

      <GuideSection id="now" title="What applies already">
        <p>
          The compliance date is when the technical standard applies. Your other duties under Title II apply today. You must communicate
          effectively with people with disabilities, and your programs must be accessible. In practice, if a resident asks for an accessible version
          of a document, even an excepted one, you generally need to provide it.
        </p>
      </GuideSection>

      <GuideSection id="enforced" title="How it is enforced">
        <p>
          People can file a complaint with the Department of Justice, or with another federal agency for some programs, such as education. They can
          also sue. There is no automatic fine for an inaccessible document.
        </p>
        <p>
          Most cases end in an agreement. Past DOJ agreements with local governments have required websites and documents to meet a WCAG standard
          within months, a named accessibility coordinator, an independent consultant, staff training, testing with people with disabilities, and
          regular reports to DOJ for two or three years. Some included money: $10,000 to the complainant in a 2014 case about scanned court PDFs, and
          a commitment to spend at least $100,000 in a 2021 transit district agreement. Money damages in court are limited and usually require
          showing the discrimination was intentional.
        </p>
      </GuideSection>

      <GuideSection id="first" title="What to do first">
        <OL>
          <li>Find out what you have. List every PDF your website links to, and where it is linked from.</li>
          <li>Sort it. Forms and current service documents first. Older reference files may be excepted or archived.</li>
          <li>Fix what is left, starting with what residents use most, and check the results with a person, not only a tool.</li>
          <li>Stop the backlog growing: check new PDFs before they are posted.</li>
          <li>Write down what you decided and why. It helps when someone asks.</li>
        </OL>
        <p>
          You can start on step 3 today with our <Link href="/check" className="text-link">free PDF check</Link>, which runs in your browser. Our guide
          on <Link href="/resources/inventory-government-pdfs" className="text-link">inventorying your public PDFs</Link> covers steps 1 and 2.
        </p>
      </GuideSection>

      <GuideSection id="sources" title="Sources">
        <UL>
          <li>
            <a href="https://www.ada.gov/resources/web-rule-first-steps/" {...ext}>DOJ: First steps toward complying with the web rule</a>
          </li>
          <li>
            <a href="https://www.ada.gov/resources/small-entity-compliance-guide/" {...ext}>DOJ: Small entity compliance guide</a>
          </li>
          <li>
            <a href="https://www.govinfo.gov/app/details/FR-2026-04-20/2026-07663" {...ext}>Federal Register, April 20, 2026: interim final rule extending the dates</a>
          </li>
          <li>
            <a href="https://www.ada.gov/resources/web-guidance/" {...ext}>DOJ: Guidance on web accessibility and the ADA</a>
          </li>
          <li>
            <a href="https://archive.ada.gov/occ.htm" {...ext}>DOJ agreement with the Orange County, Florida Clerk of Courts (2014)</a>
          </li>
          <li>
            <a href="https://archive.ada.gov/denver_pca/denver_sa.html" {...ext}>DOJ agreement with the City and County of Denver (2018)</a>
          </li>
          <li>
            <a href="https://archive.ada.gov/champaign-urbana_sa.pdf" {...ext}>DOJ agreement with the Champaign-Urbana Mass Transit District (2021)</a>
          </li>
        </UL>
      </GuideSection>
    </GuideLayout>
  );
}
