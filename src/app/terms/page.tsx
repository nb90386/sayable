import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSectionBlock as S, Tbc } from "@/components/pages/LegalParts";

export const metadata: Metadata = {
  title: "Website terms of use",
  description:
    "The terms for using the Sayable website: what the demos and samples are, acceptable use, intellectual property, disclaimers and limits.",
  alternates: { canonical: "/terms" },
};

const sections = [
  { id: "purpose", title: "What this site is for" },
  { id: "demos", title: "Demos, samples and research" },
  { id: "advice", title: "No legal advice" },
  { id: "use", title: "Acceptable use" },
  { id: "ip", title: "Intellectual property" },
  { id: "links", title: "Links to other sites" },
  { id: "disclaimers", title: "Disclaimers" },
  { id: "liability", title: "Limitation of liability" },
  { id: "paid", title: "Paid services" },
  { id: "changes", title: "Changes" },
  { id: "law", title: "Governing law" },
  { id: "contact", title: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Website terms of use"
      lede="The rules for using this website. They do not cover paid work, which has its own written agreement."
      note="Last updated November 5, 2026"
      sections={sections}
      tbcItems={["Legal entity name", "Governing law and jurisdiction", "Final wording of disclaimers and liability limits"]}
    >
      <S id="purpose" title="What this site is for">
        <p>
          This website, operated by <Tbc>legal entity name</Tbc> (&ldquo;Sayable&rdquo;), explains our document accessibility
          services and lets you get in touch. By using it you agree to these terms. If you do not agree, please do not use
          the site.
        </p>
      </S>

      <S id="demos" title="Demos, samples and research">
        <ul>
          <li>The audio demos are illustrative narration made with an open-source text-to-speech model (Kokoro). They are not recordings of a screen reader.</li>
          <li>The sample documents are fictional. Any resemblance to a real document or person is accidental.</li>
          <li>
            Research figures are preliminary internal benchmarks. They may change and should not be treated as a guarantee
            of results on your documents.
          </li>
        </ul>
      </S>

      <S id="advice" title="No legal advice">
        <p>
          Nothing on this site is legal advice, and nothing on it is a determination that any document, website or
          organization does or does not comply with any law or standard. Talk to your own counsel about your obligations.
        </p>
      </S>

      <S id="use" title="Acceptable use">
        <p>Please do not:</p>
        <ul>
          <li>scrape or crawl the site in a way that harms or overloads the service;</li>
          <li>attack, probe or try to break into the site, or interfere with its security;</li>
          <li>submit other people&apos;s personal data through the contact form without their permission;</li>
          <li>send sensitive or confidential documents through the contact form;</li>
          <li>use the site to break the law or to harm others.</li>
        </ul>
        <p>
          If you believe you have found a security problem, please tell us through the{" "}
          <Link href="/contact" className="text-link">
            contact page
          </Link>
          . See also our{" "}
          <Link href="/security" className="text-link">
            security page
          </Link>
          .
        </p>
      </S>

      <S id="ip" title="Intellectual property">
        <p>
          The content and design of this site belong to Sayable. You may view it and share links to it. Please do not
          copy or reuse it without asking. Names and marks of other companies belong to their owners, and mentioning them
          does not imply endorsement.
        </p>
      </S>

      <S id="links" title="Links to other sites">
        <p>
          We may link to other websites. We do not control them and are not responsible for their content or practices.
        </p>
      </S>

      <S id="disclaimers" title="Disclaimers">
        <p>
          This section is a draft pending legal review. The site and its content are provided as they are, without
          promises that they are complete, current, always available or free of errors. We do not guarantee that they
          will meet your needs.
        </p>
      </S>

      <S id="liability" title="Limitation of liability">
        <p>
          This section is a draft pending legal review. To the extent the law allows, Sayable is not liable for losses
          that come from using or being unable to use this website, or from relying on its content. Nothing here limits
          liability that cannot be limited by law.
        </p>
      </S>

      <S id="paid" title="Paid services">
        <p>
          Audits, remediation and other paid work are governed by a separate written agreement. These website terms do not
          cover that work.
        </p>
      </S>

      <S id="changes" title="Changes">
        <p>
          We may update these terms. The date at the top shows when they last changed. Using the site after a change means
          you accept the new terms.
        </p>
      </S>

      <S id="law" title="Governing law">
        <p>
          These terms are governed by the laws of <Tbc>governing law and jurisdiction</Tbc>.
        </p>
      </S>

      <S id="contact" title="Contact">
        <p>
          Questions about these terms: use our{" "}
          <Link href="/contact" className="text-link">
            contact page
          </Link>
          . How we handle personal data is described in the{" "}
          <Link href="/privacy" className="text-link">
            privacy notice
          </Link>
          .
        </p>
      </S>
    </LegalLayout>
  );
}
