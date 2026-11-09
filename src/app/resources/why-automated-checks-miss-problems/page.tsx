import type { Metadata } from "next";
import Link from "next/link";
import { ReadingOrderDiagram } from "@/components/pages/guide/Diagrams";
import { GuideLayout } from "@/components/pages/guide/GuideLayout";
import { DataTable, GuideSection, H3, OL, UL } from "@/components/pages/guide/GuideParts";
import { resources } from "@/content/resources";

const r = resources.find((x) => x.slug === "why-automated-checks-miss-problems")!;

export const metadata: Metadata = {
  title: r.title,
  description:
    "Automated PDF checkers confirm structure exists, not that it is right. Which issues a machine detects or suggests, which need a person, and how to prioritize.",
  alternates: { canonical: `/resources/${r.slug}` },
  openGraph: { type: "article", title: r.title, modifiedTime: r.updated },
};

const contents = [
  { id: "gap", label: "The gap between present and correct" },
  { id: "table", label: "Detect, suggest or judge" },
  { id: "why", label: "Why the gap exists" },
  { id: "layers", label: "What a layered check looks like" },
  { id: "prioritize", label: "How to prioritize repairs" },
];

export default function Page() {
  return (
    <GuideLayout
      title={r.title}
      summary="A validator can tell you that a tag, a title or an alt-text field is present. It cannot tell you that the tag is right, the title is useful or the description matches the picture. That gap is where most real problems hide."
      readingMinutes={r.readingMinutes}
      updated={r.updated}
      contents={contents}
    >
      <GuideSection id="gap" title="The gap between present and correct">
        <p>
          PDF/UA-1 (ISO 14289-1) defines what a tagged, accessible PDF must contain. Validators such as veraPDF, an
          open-source tool, check files against it and are good at it. They are the right first test, and a file that
          fails them has real problems.
        </p>
        <p>
          But a validator checks structure, not sense. A file can pass with every figure tagged and every description
          reading &quot;image&quot;. A heading tag on the wrong line passes. A table whose first row is marked as
          headers when the real headers are in the first column passes. Each of these can leave a screen reader user
          unable to use the page, and each is invisible to the test.
        </p>
        <ReadingOrderDiagram />
      </GuideSection>

      <GuideSection id="table" title="Detect, suggest or judge">
        <p>
          Issues sort into three kinds. A machine can detect some with confidence. For others a machine can propose
          an answer that a person confirms. For the rest only a person can judge.
        </p>
        <DataTable
          caption="Issue types and who can settle them"
          head={["Issue", "Machine can detect", "Machine can suggest", "Only a person can judge"]}
          rows={[
            ["Document has no tags", "Yes", "Yes, a tag tree can be generated", "Whether the generated tree is right"],
            ["Missing document title or language", "Yes", "Yes, from file contents", "Whether the title is meaningful"],
            ["Image has no alternative text", "Yes", "Yes, a draft description", "Whether the text is accurate and useful, or whether the image is decorative"],
            ["Reading order", "Partly, by comparing tags to layout", "Yes, a likely order", "Whether the order makes sense to a listener, especially in columns and sidebars"],
            ["Heading levels", "Partly, skipped levels", "Yes, from font size and weight", "Whether the outline matches the document's real structure"],
            ["Table headers", "Whether header cells exist", "Yes, likely header rows and columns", "Whether the headers describe the data, and complex tables with merged cells"],
            ["Form field names and labels", "Whether names exist", "Yes, from nearby text", "Whether the label tells the user what to enter"],
            ["Links", "Whether a link is tagged", "Flags text such as 'click here'", "Whether the link text makes sense out of context"],
            ["Scanned pages (images of text)", "Yes, no real text present", "Yes, text recognition", "Whether recognized text is accurate, particularly with handwriting, stamps and poor scans"],
            ["Color contrast", "Partly, for text with known colors", "Yes", "Meaning carried by color alone, and contrast inside images"],
            ["Math, charts and maps", "That something is there", "Rarely", "Whether the alternative conveys the information"],
            ["Language of passages", "Partly", "Yes", "Whether foreign-language phrases are marked in the right places"],
          ]}
        />
      </GuideSection>

      <GuideSection id="why" title="Why the gap exists">
        <H3>Meaning is not in the file</H3>
        <p>
          A PDF stores where to draw marks on a page. Structure is an extra layer added alongside. Whether the layer
          matches what a sighted reader sees is a comparison between two things, and software that reads only one of
          them cannot make it.
        </p>
        <H3>Judgment depends on purpose</H3>
        <p>
          The right alt text for a photo of a park depends on why the photo is in the document. A map in a flood
          notice needs a description of what is flooded. The same map in a tourism brochure needs a different one. No
          tool knows which document it is in the middle of.
        </p>
        <H3>Passing can hide a failure</H3>
        <p>
          Automated repair tools that fill in missing fields can make a file pass while making it worse: a guessed
          label that is wrong is more misleading than a missing one, because it looks finished.
        </p>
      </GuideSection>

      <GuideSection id="layers" title="What a layered check looks like">
        <p>No single test is enough. We use three, and report on each separately:</p>
        <OL>
          <li>
            <strong>A validator</strong> (veraPDF against PDF/UA-1) for structure that can be checked mechanically.
          </li>
          <li>
            <strong>A semantic check</strong> that compares the rendered page with what its tags say, to catch
            things like text in the wrong order or a tagged table that does not match the visible one.
          </li>
          <li>
            <strong>Human review</strong> for the items in the right-hand column of the table above.
          </li>
        </OL>
        <p>
          The result is a report that says what was checked and by whom, not a certificate. See{" "}
          <Link href="/verify" className="text-link">how verification works</Link>.
        </p>
      </GuideSection>

      <GuideSection id="prioritize" title="How to prioritize repairs">
        <p>
          You will rarely repair everything at once. A sensible order, which you should adjust to your own
          circumstances:
        </p>
        <OL>
          <li>
            <strong>Forms and service documents first.</strong> Applications, permits, payment and registration
            forms. These are the files where a barrier stops someone from doing something they need to do.
          </li>
          <li>
            <strong>High-traffic documents.</strong> Use your web analytics to see which PDFs are opened most.
          </li>
          <li>
            <strong>Current content tied to decisions.</strong> Agendas, ordinances, budgets and notices where timing
            matters.
          </li>
          <li>
            <strong>New publications.</strong> Fix the process so new files start accessible. This stops the backlog
            from growing.
          </li>
          <li>
            <strong>Older and reference material.</strong> Decide whether to repair, archive or remove each file.
          </li>
        </OL>
        <p>
          Legal exposure is a separate question. Which documents carry risk, and how the Title II rule&apos;s exceptions
          apply to your archive, is a matter for your counsel. A prioritized list gives counsel something concrete to
          review. It does not replace the review.
        </p>
        <UL>
          <li>
            <Link href="/resources/inventory-government-pdfs" className="text-link">
              How to inventory your public PDFs
            </Link>
          </li>
          <li>
            <Link href="/resources/what-a-pdf-audit-tells-you" className="text-link">
              What a PDF accessibility audit can tell you
            </Link>
          </li>
        </UL>
      </GuideSection>
    </GuideLayout>
  );
}
