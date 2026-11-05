import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Row } from "@/components/pages/PageParts";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description: "How the Sayable website is built for accessibility, its known limitations, and how to report a problem.",
};

export default function AccessibilityPage() {
  return (
    <>
      <PageIntro
        eyebrow="Accessibility statement"
        title={
          <>
            This site should work <em>for everyone.</em>
          </>
        }
        lede="We sell document accessibility, so this website has to meet the standard we ask of others. Here's what we aim for, what we test, and where we know it falls short."
        note="Last reviewed November 2026"
      />
      <div className="wrap pb-28">
        <Row n="01" title="Our target">
          <p>
            We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. We are not claiming full
            conformance. Automated checks catch only part of what matters, and we haven&apos;t completed testing with
            screen-reader users.
          </p>
        </Row>
        <Row n="02" title="How it's built">
          <p>
            The site uses semantic headings and landmarks, visible keyboard focus, a skip link, labeled form fields with
            written error messages, and colors chosen to meet AA contrast ratios. The interactive illustrations can be used with a
            keyboard and have text descriptions.
          </p>
          <p>
            If your system asks for reduced motion, animation is turned off and every illustration appears in its finished
            state. No content is hidden behind an animation.
          </p>
        </Row>
        <Row n="03" title="Known limitations">
          <p>
            The illustrated documents on this site are drawings of example pages, not real PDFs. They are described in
            text, but you can&apos;t browse their tag structure with a screen reader the way you would a real tagged file.
            The &ldquo;what a screen reader might announce&rdquo; passages are simulations written by us, not recordings.
          </p>
        </Row>
        <Row n="04" title="Tell us about a problem">
          <p>
            If something on this site doesn&apos;t work for you, please{" "}
            <Link href="/contact" className="text-link">
              contact us
            </Link>{" "}
            and describe the page and what happened. Choose &ldquo;Something else&rdquo; as your role if none fit. We
            treat accessibility problems on our own site as bugs, and fix them first.
          </p>
        </Row>
      </div>
    </>
  );
}
