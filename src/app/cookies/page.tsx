import type { Metadata } from "next";
import Link from "next/link";
import { ConsentSettingsButton } from "@/components/consent/ConsentSettingsButton";
import { DataTable, LegalLayout, LegalSectionBlock as S } from "@/components/pages/LegalParts";

export const metadata: Metadata = {
  title: "Cookies and storage",
  description:
    "This site sets no cookies. See the one item it keeps in your browser, what optional analytics does, and how to change your choice.",
  alternates: { canonical: "/cookies" },
};

const sections = [
  { id: "answer", title: "The short answer" },
  { id: "items", title: "What is stored" },
  { id: "choices", title: "Essential only or Allow analytics" },
  { id: "change", title: "Change your choice" },
  { id: "gpc", title: "Global Privacy Control" },
  { id: "more", title: "More information" },
];

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Cookies and storage"
      lede="This site sets no cookies. Here is the one thing it stores in your browser, and what the optional analytics does."
      note="Last updated November 5, 2026"
      sections={sections}
    >
      <S id="answer" title="The short answer">
        <p>
          This site sets no cookies of its own. It stores one item in your browser&apos;s localStorage to remember your
          privacy choice. Optional analytics loads only if you allow it.
        </p>
      </S>

      <S id="items" title="What is stored">
        <DataTable
          caption="Items stored or loaded by this site"
          head={["Item", "Type", "Purpose", "Kept"]}
          rows={[
            [
              <code key="a" className="mono">sayable-consent</code>,
              "localStorage, essential",
              "Remembers your privacy choice (whether analytics is allowed) and the date you made it",
              "Until you clear your site data",
            ],
            [
              "Vercel Web Analytics",
              "Optional, cookieless",
              "Counts page views and anonymous actions, such as the audio demo being played",
              "Loads only after you choose Allow analytics",
            ],
          ]}
        />
        <p>
          Vercel describes Web Analytics as cookieless and as not tracking visitors across sites. Events never include
          names, emails, organization names, message text or document contents.
        </p>
      </S>

      <S id="choices" title="Essential only or Allow analytics">
        <ul>
          <li>
            Essential only: analytics never loads. We keep only the <code className="mono">sayable-consent</code> item so
            we do not ask again.
          </li>
          <li>
            Allow analytics: Vercel Web Analytics loads, and we may record page views and anonymous counts of these
            actions: audit call-to-action clicked, contact form started, contact form submitted successfully, audio demo
            played, workload estimator adjusted, and sample report viewed.
          </li>
        </ul>
        <p>If you make no choice, analytics does not load.</p>
      </S>

      <S id="change" title="Change your choice">
        <p>
          You can change your choice at any time, here or from the Privacy choices link in the footer.
        </p>
        <p>
          <ConsentSettingsButton className="btn btn-quiet">Open privacy choices</ConsentSettingsButton>
        </p>
      </S>

      <S id="gpc" title="Global Privacy Control">
        <p>
          If your browser sends a Global Privacy Control signal, we treat it as a choice of Essential only by default, so
          analytics will not load. You can still choose Allow analytics yourself afterwards.
        </p>
      </S>

      <S id="more" title="More information">
        <p>
          See the{" "}
          <Link href="/privacy" className="text-link">
            privacy notice
          </Link>{" "}
          for how we handle personal data, including the contact form.
        </p>
      </S>
    </LegalLayout>
  );
}
