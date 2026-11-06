import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Row, Spec } from "@/components/pages/PageParts";
import { ClosingBand } from "@/components/pages/guide/GuideParts";

export const metadata: Metadata = {
  title: "Security and data handling",
  description:
    "What is in place on the Sayable website today, how documents are handled in audit engagements, what we do not claim, and how to report a security issue.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <>
      <PageIntro
        title="Security and data handling."
        lede="What this website does today, how we handle documents in an audit, and what we do not claim."
        note="Early-stage company. No security certifications."
      />
      <div className="wrap pb-24">
        <Row id="site" title="This website">
          <p>These are the measures in place on the Sayable marketing site today.</p>
          <Spec
            items={[
              "Served over HTTPS by Vercel, our host.",
              "Security headers: Content-Security-Policy, HTTP Strict Transport Security (HSTS), X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, X-Frame-Options: DENY, and a Permissions-Policy.",
              "The contact form is validated on the server and length-limited. It has a honeypot field and per-instance rate limiting, and it forwards messages to a private webhook only when one is configured.",
              "No third-party trackers. Optional analytics run only after you consent.",
              "Fonts and audio are self-hosted, so loading them sends nothing to other companies.",
            ]}
          />
          <p>
            See the <Link href="/privacy" className="text-link">privacy policy</Link> and{" "}
            <Link href="/cookies" className="text-link">cookie notice</Link> for what is collected and why.
          </p>
        </Row>
        <Row id="audits" title="Documents in audit engagements">
          <p>
            A Readiness Audit works on public documents by default: files your website already links to. We do not
            need access to your systems for that.
          </p>
          <p>
            If an engagement involves anything that is not public, we handle it under a written agreement. Handling,
            storage location and retention are agreed for each engagement before we receive the files. These are our
            commitments for client work, to be set out in that agreement, and not a description of fixed policy.
          </p>
        </Row>
        <Row id="claims" title="What we do not claim">
          <p>
            Sayable is an early-stage company. We do not hold security certifications, including SOC 2, and we do not
            say we do. If your procurement process requires a certification, we are not the right fit yet.
          </p>
          <p>
            If you have a security questionnaire, send it and we will answer honestly, including where the answer is
            that we have not built something yet.
          </p>
        </Row>
        <Row id="report" title="Reporting a security issue">
          <p>
            If you believe you have found a vulnerability on this website, tell us through the{" "}
            <Link href="/contact" className="text-link">contact form</Link>. We do not have a dedicated security
            email yet. Please do not include sensitive details in the first message. Say that it is a security report
            and we will reply to arrange a safer way to share the rest.
          </p>
        </Row>
      </div>
      <ClosingBand
        title="Questions about handling your documents?"
        body="Ask before you share anything. We can describe how an engagement would work and what we would put in writing."
        primary={{ href: "/contact", label: "Contact us" }}
        secondary={{ href: "/readiness-audit", label: "About the audit" }}
      />
    </>
  );
}
