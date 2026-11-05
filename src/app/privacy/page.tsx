import type { Metadata } from "next";
import { PageIntro, Row } from "@/components/pages/PageParts";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What the Sayable website collects, and what it doesn't.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        title={
          <>
            We collect <em>very little.</em>
          </>
        }
        lede="A short, plain notice about this website. When we do paid work, data handling is set out in the written agreement for that work."
        note="Last updated November 2026"
      />
      <div className="wrap pb-28">
        <Row n="01" title="What we collect">
          <p>
            Only what you type into the contact form: your name, work email, organization, role, what you&apos;d like to
            discuss, an optional website address and an optional message. We use it to reply to you and scope the work
            you asked about. We don&apos;t sell it or share it for marketing.
          </p>
        </Row>
        <Row n="02" title="Where it goes">
          <p>
            Form submissions are sent from our server to one configured destination that we control. While that
            destination isn&apos;t set up, the form tells you so and nothing is sent or stored.
          </p>
          <p>Our hosting provider may keep standard server logs, such as IP address and time of request, for security and abuse prevention.</p>
        </Row>
        <Row n="03" title="No tracking">
          <p>
            This site doesn&apos;t use analytics, advertising pixels or tracking cookies, and doesn&apos;t set cookies of its own.
            Fonts are served from our own domain.
          </p>
        </Row>
        <Row n="04" title="Documents">
          <p>
            Please don&apos;t send us documents containing personal, health, student or law-enforcement information. We work
            with documents that are already public.
          </p>
        </Row>
      </div>
    </>
  );
}
