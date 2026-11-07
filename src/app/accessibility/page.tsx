import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSectionBlock as S } from "@/components/pages/LegalParts";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description:
    "How the Sayable website aims for WCAG 2.2 AA, what we test, known limitations, and how to report an accessibility problem.",
  alternates: { canonical: "/accessibility" },
};

const sections = [
  { id: "target", title: "Our target" },
  { id: "tested", title: "What we test" },
  { id: "built", title: "How it is built" },
  { id: "limits", title: "Known limitations" },
  { id: "report", title: "Report a problem" },
];

export default function AccessibilityPage() {
  return (
    <LegalLayout
      title="Accessibility statement"
      lede="We sell document accessibility, so this website has to meet the standard we ask of others. Here is what we aim for, what we test, and where we know it falls short."
      note="Last reviewed November 5, 2026"
      sections={sections}
      hideDraft
    >
      <S id="target" title="Our target">
        <p>
          We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. We are not claiming full
          conformance. Automated checks catch only part of what matters, and we have not completed testing with
          screen-reader users.
        </p>
      </S>

      <S id="tested" title="What we test">
        <ul>
          <li>Automated axe checks, run in Playwright on every page.</li>
          <li>Keyboard testing: every control can be reached and used without a mouse, with visible focus.</li>
          <li>Reduced motion: if your system asks for it, animation is turned off and illustrations show their finished state.</li>
          <li>Color contrast checks against AA ratios.</li>
          <li>Transcripts for the audio demos.</li>
        </ul>
      </S>

      <S id="built" title="How it is built">
        <p>
          The site uses semantic headings and landmarks, a skip link, labeled form fields with written error messages, and
          text alternatives for illustrations. No content is hidden behind an animation.
        </p>
      </S>

      <S id="limits" title="Known limitations">
        <ul>
          <li>We have not yet tested with screen-reader users.</li>
          <li>
            The document illustrations are SVG drawings of example pages, not real tagged PDFs. They come with text
            descriptions, but you cannot browse a tag structure with a screen reader the way you would in a real file.
          </li>
          <li>
            The inventory animation is decorative. On small screens there is a list alternative that carries the same
            information.
          </li>
          <li>The audio demos are illustrative narration made with an open-source text-to-speech model, not recordings of a screen reader.</li>
        </ul>
      </S>

      <S id="report" title="Report a problem">
        <p>
          If something on this site does not work for you, please use our{" "}
          <Link href="/contact" className="text-link">
            contact page
          </Link>{" "}
          and describe the page and what happened. We treat accessibility problems on our own site as bugs, and fix them
          first.
        </p>
      </S>
    </LegalLayout>
  );
}
