import type { Metadata } from "next";
import Link from "next/link";
import { ConsentSettingsButton } from "@/components/consent/ConsentSettingsButton";
import { DataTable, LegalLayout, LegalSectionBlock as S, Tbc } from "@/components/pages/LegalParts";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "What the Sayable website collects, why, who handles it, how long it is kept, and the choices you have, including analytics consent.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  { id: "who", title: "Who we are" },
  { id: "collect", title: "What we collect and why" },
  { id: "form", title: "The contact form" },
  { id: "analytics", title: "Analytics and consent" },
  { id: "storage", title: "Browser storage" },
  { id: "logs", title: "Server logs" },
  { id: "providers", title: "Service providers" },
  { id: "sharing", title: "Sharing" },
  { id: "retention", title: "Retention" },
  { id: "security", title: "Security" },
  { id: "rights", title: "Your choices and rights" },
  { id: "children", title: "Children" },
  { id: "changes", title: "Changes" },
  { id: "contact", title: "Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy notice"
      lede="What this website collects, why, who handles it, and the choices you have. Written plainly."
      note="Last updated November 5, 2026"
      sections={sections}
      tbcItems={[
        "Legal entity name",
        "Registered address",
        "Privacy contact email",
        "Retention period for contact form submissions",
        "Service provider that receives form submissions",
      ]}
    >
      <S id="who" title="Who we are">
        <p>
          This notice covers the Sayable marketing website. Sayable is operated by <Tbc>legal entity name</Tbc>, at{" "}
          <Tbc>registered address</Tbc>. We decide why and how personal data collected through this site is used.
        </p>
        <p>
          Paid work, such as audits and remediation, is covered by a separate written agreement, which sets out how
          client documents and data are handled. This notice does not.
        </p>
      </S>

      <S id="collect" title="What we collect and why">
        <DataTable
          caption="Data collected through this website"
          head={["Data", "Why", "When"]}
          rows={[
            ["Contact form details", "To reply to you and scope the work you ask about", "Only if you submit the form"],
            ["Your privacy choice, stored in your browser", "To remember whether analytics is allowed", "When you make a choice"],
            ["Anonymous usage events", "To see which pages and features are useful", "Only if you choose Allow analytics"],
            ["Standard request data (IP address, user agent, request time)", "To serve and protect the site", "Every visit"],
          ]}
        />
        <p>
          There is no newsletter, no account system and no advertising on this site. We do not sell personal data.
        </p>
      </S>

      <S id="form" title="The contact form">
        <p>
          The form asks for your name, work email, organization, role and topic. A website address and a message are
          optional. A hidden field catches automated bots. Your details are checked on our server and forwarded to one
          private destination that Sayable controls, so that a person can reply.
        </p>
        <p>
          That destination is not configured yet. Until it is, the form says so, and nothing is sent or stored.
        </p>
        <p>
          Please do not put other people&apos;s personal information, or sensitive or confidential documents, in the form.
          Rate limiting uses your IP address, held in server memory for up to 10 minutes. It is not stored.
        </p>
      </S>

      <S id="analytics" title="Analytics and consent">
        <p>
          Optional analytics uses Vercel Web Analytics, which Vercel describes as cookieless and as not tracking visitors
          across sites. It loads only after you choose Allow analytics. If you choose Essential only, or make no choice,
          it never loads.
        </p>
        <p>When allowed, we may record page views and anonymous counts of these actions:</p>
        <ul>
          <li>Audit call-to-action clicked</li>
          <li>Contact form started</li>
          <li>Contact form submitted successfully</li>
          <li>Audio demo played</li>
          <li>Workload estimator adjusted</li>
          <li>Sample report viewed</li>
        </ul>
        <p>
          Events never include names, emails, organization names, message text or document contents. You can change your
          choice at any time with the Privacy choices link in the footer, or here:{" "}
          <ConsentSettingsButton>Open privacy choices</ConsentSettingsButton>. More detail is on the{" "}
          <Link href="/cookies" className="text-link">
            cookies and storage page
          </Link>
          .
        </p>
      </S>

      <S id="storage" title="Browser storage">
        <p>
          This site sets no cookies of its own. It stores one item in your browser&apos;s localStorage, under the key{" "}
          <code className="mono">sayable-consent</code>. It holds your privacy choice and the date you made it, and it is
          needed to remember that choice. Clearing your site data removes it.
        </p>
      </S>

      <S id="logs" title="Server logs">
        <p>
          The site is hosted on Vercel and served over HTTPS. Vercel processes standard request data, such as IP address,
          user agent and request time, to serve and protect the site.
        </p>
        <p>
          Fonts and audio files are hosted by us. Your browser makes no requests to Google or other font hosts.
        </p>
      </S>

      <S id="providers" title="Service providers">
        <ul>
          <li>Vercel hosts the site and, if you allow it, provides Web Analytics.</li>
          <li>
            Contact form submissions are forwarded to a private webhook controlled by Sayable. The service that receives
            them is <Tbc>provider name</Tbc>.
          </li>
        </ul>
      </S>

      <S id="sharing" title="Sharing">
        <p>
          We do not share personal data from this site for marketing. We may disclose information if the law requires it,
          or to protect the rights, safety or security of people or the service.
        </p>
      </S>

      <S id="retention" title="Retention">
        <p>
          Contact form submissions are kept for <Tbc>retention period</Tbc>. Rate-limit data is held in server memory for
          up to 10 minutes and is not stored. Your <code className="mono">sayable-consent</code> item stays in your
          browser until you clear it.
        </p>
      </S>

      <S id="security" title="Security">
        <p>
          The site is served over HTTPS. Form input is validated on the server, abusive traffic is rate limited, and form
          data goes to a single private destination. No system is perfectly secure. For more, see our{" "}
          <Link href="/security" className="text-link">
            security page
          </Link>
          .
        </p>
      </S>

      <S id="rights" title="Your choices and rights">
        <p>
          You can ask us to tell you what personal data we hold about you, correct it, or delete it. Send the request
          through our{" "}
          <Link href="/contact" className="text-link">
            contact page
          </Link>
          . We may need to confirm it is you before acting.
        </p>
        <p>
          The rights you have depend on where you live. For example, California residents may have rights under the
          CCPA/CPRA, and people in some other places have similar rights. We have not decided which laws apply to us, and
          will update this notice once we have.
        </p>
        <p>
          You can also change your analytics choice at any time with{" "}
          <ConsentSettingsButton>Privacy choices</ConsentSettingsButton>.
        </p>
      </S>

      <S id="children" title="Children">
        <p>
          This site is for organizations, not for children, and is not directed to them. Please do not send us
          information about children.
        </p>
      </S>

      <S id="changes" title="Changes">
        <p>
          We will update this page when our practices change and revise the date at the top.
        </p>
      </S>

      <S id="contact" title="Contact">
        <p>
          Questions about this notice or requests about your data: use our{" "}
          <Link href="/contact" className="text-link">
            contact page
          </Link>
          . A dedicated privacy email is <Tbc>privacy contact email</Tbc>.
        </p>
      </S>
    </LegalLayout>
  );
}
