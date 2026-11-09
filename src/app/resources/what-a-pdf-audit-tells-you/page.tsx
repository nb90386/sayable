import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout } from "@/components/pages/guide/GuideLayout";
import { GuideSection, H3, Note, UL } from "@/components/pages/guide/GuideParts";
import { resources } from "@/content/resources";

const r = resources.find((x) => x.slug === "what-a-pdf-audit-tells-you")!;

export const metadata: Metadata = {
  title: r.title,
  description:
    "What a PDF accessibility audit report should contain, how to read its results, and the questions it leaves open, such as legal status and real-world usability.",
  alternates: { canonical: `/resources/${r.slug}` },
  openGraph: { type: "article", title: r.title, modifiedTime: r.updated },
};

const contents = [
  { id: "is", label: "What an audit is" },
  { id: "tells", label: "What it can tell you" },
  { id: "cant", label: "What it can't tell you" },
  { id: "rules", label: "The rules in brief" },
  { id: "read", label: "How to read a report" },
  { id: "ask", label: "Questions to ask any provider" },
];

export default function Page() {
  return (
    <GuideLayout
      title={r.title}
      summary="An audit is a measurement, not a verdict. It tells you what was checked and what was found. It does not tell you that your documents are compliant, and any report that says so deserves a second look."
      readingMinutes={r.readingMinutes}
      updated={r.updated}
      contents={contents}
    >
      <GuideSection id="is" title="What an audit is">
        <p>
          A PDF accessibility audit takes a defined set of documents, checks each one against stated tests, and
          reports the results. Good ones also help you decide what to do next: which files matter most, which are
          cheap to fix, which could be retired.
        </p>
        <p>
          The set matters as much as the tests. An audit of ten files you chose tells you about ten files. An audit
          of everything your site links to tells you about your site. Our guide on{" "}
          <Link href="/resources/inventory-government-pdfs" className="text-link">
            inventorying public PDFs
          </Link>{" "}
          covers how to build that set.
        </p>
      </GuideSection>

      <GuideSection id="tells" title="What it can tell you">
        <UL>
          <li>How many documents you publish, where they live, and who owns them.</li>
          <li>
            Which files fail machine-checkable tests, such as having no tags, no document language, no title, or
            form fields without names.
          </li>
          <li>Which kinds of problems are most common across your documents, so repair effort can be estimated.</li>
          <li>Which documents are service-critical and which are reference material.</li>
          <li>
            Where the effort will go: files that are mostly text are quick, while tables, forms and scanned pages
            take longer.
          </li>
          <li>A starting order for repair, with reasons you can explain to colleagues and the public.</li>
        </UL>
      </GuideSection>

      <GuideSection id="cant" title="What it can't tell you">
        <UL>
          <li>
            <strong>Whether you comply with the law.</strong> That is a legal conclusion. An audit supplies facts for
            counsel to use; it does not supply the conclusion.
          </li>
          <li>
            <strong>Whether a person using a screen reader can use the file.</strong> Passing tests is not the same
            as working in practice. Only a human review gets close, and ideally one involving people who use
            assistive technology.
          </li>
          <li>
            <strong>Whether alternative text is meaningful</strong>, whether the reading order matches the visual
            order, or whether a table&apos;s headers are right. A tool can see that these things exist. It cannot judge
            whether they are correct. The{" "}
            <Link href="/resources/why-automated-checks-miss-problems" className="text-link">
              next guide
            </Link>{" "}
            goes through this in detail.
          </li>
          <li>
            <strong>What is in the files you did not give it.</strong> Documents behind logins, on other domains or
            not yet published are outside the set.
          </li>
          <li>
            <strong>What will happen next month.</strong> An audit is a snapshot. New files arrive weekly.
          </li>
        </UL>
      </GuideSection>

      <GuideSection id="rules" title="The rules in brief">
        <p>
          The US Department of Justice published a rule in 2024 under Title II of the Americans with Disabilities Act
          (28 CFR part 35, subpart H) that adopts WCAG 2.1 Level AA as the technical standard for web content and
          mobile apps of state and local governments. PDFs posted on a public website are within its reach.
        </p>
        <p>
          As originally written, compliance dates were April 24, 2026 for entities with a total population of 50,000 or
          more and April 26, 2027 for smaller entities and special district governments. In April 2026 the
          Department published an interim final rule that moved each date back a year, to April 26, 2027 and April
          26, 2028 respectively. The standard itself did not change. See the{" "}
          <a href="https://www.ada.gov/resources/web-rule-first-steps/" className="text-link">
            ADA.gov guidance on first steps
          </a>{" "}
          and the{" "}
          <a
            href="https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web"
            className="text-link"
          >
            Federal Register notice
          </a>
          . Dates can change again, so check ada.gov for the current dates.
        </p>
        <p>
          The rule includes exceptions, among them for archived web content and for preexisting conventional
          electronic documents, and each comes with conditions. For example, the exception for older documents does
          not cover those currently used to apply for, access or participate in a service. Reading those conditions
          against your own files is a job for counsel.
        </p>
        <Note>
          For PDFs, the related technical standard is PDF/UA-1 (ISO 14289-1), and veraPDF is an open-source validator
          for it. Passing PDF/UA-1 is a useful signal. The ADA rule does not name it as the legal test.
        </Note>
      </GuideSection>

      <GuideSection id="read" title="How to read a report">
        <H3>Look for what was checked</H3>
        <p>
          A useful report lists the tests it ran, the tool and version, and how many files were in scope. If it says
          only &quot;87% accessible&quot; with no method, you cannot act on it or compare it with the next one.
        </p>
        <H3>Separate pass, fail and not checked</H3>
        <p>
          A fair report has three states. Items nobody examined are not passes. Be wary of any score that counts
          untested things as fine.
        </p>
        <H3>Look for human review notes</H3>
        <p>
          The things software cannot judge should appear as items for a person to review, not be silently skipped.
          Ask who reviewed them and when.
        </p>
        <H3>Read the recommendations as proposals</H3>
        <p>
          Retire, archive, repair or convert to a web page are recommendations. Your team knows which documents are
          still in use. The decision belongs to you.
        </p>
      </GuideSection>

      <GuideSection id="ask" title="Questions to ask any provider">
        <UL>
          <li>What exactly did you check, and with which tools?</li>
          <li>What do you call a pass? Is it a validator result, a human review, or both?</li>
          <li>Which items in your report did a person look at?</li>
          <li>Do you change visible content? Do you keep the original file?</li>
          <li>Will you tell me what you did not check?</li>
        </UL>
        <p>
          Our <Link href="/readiness-audit" className="text-link">Readiness Audit</Link> is built around those
          answers, and <Link href="/verify" className="text-link">how we verify</Link> explains the checks in full.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
