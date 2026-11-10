import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageHero";
import { BuyerCta } from "@/components/pages/buyer/BuyerCta";
import { Reveal } from "@/components/pages/PageParts";
import { AgendaPacket, ArtifactStrip, ClientSites, Gives, Hurts, More, RequestLog, SiteFiles } from "@/components/pages/solutions/Workflows";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Public PDF accessibility work for city clerks, ADA coordinators, IT and digital teams, and the website agencies that serve local governments.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        title="For the teams responsible for public PDFs."
        lede="City clerks, accessibility coordinators, and digital teams face the same document backlog from different directions."
        primary={{ href: "/contact?topic=audit", label: "Request a Readiness Audit" }}
        secondary={{ href: "/readiness-audit", label: "See the sample report" }}
      >
        <ArtifactStrip />
      </PageHero>

      {/* City clerks: the featured workflow */}
      <section id="clerks" aria-labelledby="clerks-h" className="sp-section border-t hairline" style={{ scrollMarginTop: "6rem" }}>
        <div className="wrap sx-flow" data-kind="clerk">
          <Reveal kind="depth">
            <AgendaPacket />
          </Reveal>
          <div>
            <p className="sx-who">City clerks</p>
            <Reveal as="h2" id="clerks-h">Agendas and packets, posted on a deadline.</Reveal>
            <Hurts>A packet is assembled from many departments&apos; files, often the day before the meeting. Budget tables and scanned attachments are where a screen reader gives up.</Hurts>
            <Gives items={[
              "Each packet repaired by people, with software for routine fixes, and checked before it goes up",
              "A report with every file: what was checked and what a person reviewed",
              "A limited Agenda Desk pilot, by arrangement, for ongoing meetings",
            ]} />
            <div className="sx-links"><More href="/solutions/government#agenda">About the Agenda Desk pilot</More></div>
          </div>
        </div>
      </section>

      {/* ADA coordinators: band, text left */}
      <section id="ada" aria-labelledby="ada-h" className="sp-section sp-band" style={{ scrollMarginTop: "6rem" }}>
        <div className="wrap sx-flow" data-kind="ada">
          <div>
            <p className="sx-who">ADA coordinators</p>
            <Reveal as="h2" id="ada-h">A deadline, a request log, and no ranked list.</Reveal>
            <Hurts>Requests arrive one document at a time. Behind them sit thousands of files nobody has counted, and no way to say which ones residents depend on.</Hurts>
            <Gives items={[
              "An inventory of every PDF your public pages link to, with the page that links to it",
              "Findings in plain language, ranked by who uses the file",
              "Records of each check, including what was not claimed, to keep with your file",
            ]} />
            <div className="sx-links">
              <More href="/solutions/government">Solutions for government</More>
            </div>
          </div>
          <Reveal kind="depth">
            <RequestLog />
          </Reveal>
        </div>
      </section>

      {/* IT and digital teams: wide artifact over two columns */}
      <section id="it" aria-labelledby="it-h" className="sp-section" style={{ scrollMarginTop: "6rem" }}>
        <div className="wrap">
          <p className="sx-who">IT and digital teams</p>
          <Reveal as="h2" id="it-h" className="sp-h2 max-w-[24ch]">Every PDF on the site, and where it came from.</Reveal>
          <div className="mt-8">
            <Reveal kind="depth">
              <SiteFiles />
            </Reveal>
          </div>
          <div className="sx-it-cols">
            <div>
              <p>What hurts</p>
              <Hurts>The CMS accepts any upload. Files pile up across departments and old links, and nobody can say which are duplicates, scans or untagged forms.</Hurts>
            </div>
            <div>
              <p>What Sayable gives you</p>
              <Gives items={[
                "The inventory as a spreadsheet, with file type and findings per row",
                "Duplicates and archive candidates your team confirms before anything is removed",
                "A free in-browser check for single files, which never uploads the document",
              ]} />
            </div>
          </div>
        </div>
      </section>

      {/* Agencies: asymmetric, small artifact */}
      <section id="agencies" aria-labelledby="agencies-h" className="sp-section sp-band" style={{ scrollMarginTop: "6rem" }}>
        <div className="wrap sx-flow" data-kind="agency">
          <Reveal kind="depth">
            <ClientSites />
          </Reveal>
          <div>
            <p className="sx-who">Public-sector website agencies</p>
            <Reveal as="h2" id="agencies-h">The site is new. The PDFs are not.</Reveal>
            <Hurts>You build the site. The thousands of PDFs behind it are the client&apos;s, and they set the accessibility result anyway.</Hurts>
            <Gives items={[
              "Audit a client library before launch, so the scope is known",
              "A second check on files your team already repaired",
              "Overflow repair work, done by people and checked, with a report per file",
            ]} />
            <div className="sx-links"><More href="/solutions/agencies">Solutions for agencies and firms</More></div>
          </div>
        </div>
        <div className="wrap">
          <p className="sx-closer">The workflows above are illustrations with fictional documents and cities, not customer stories.</p>
        </div>
      </section>

      <BuyerCta
        id="solutions-cta"
        title="Start with what you already publish."
        body="Tell us about your site and your documents. We will scope an audit, or start with a small sample so you can judge the work first."
        primary={{ href: "/contact?topic=audit", label: "Request a Readiness Audit" }}
        secondary={{ href: "/readiness-audit", label: "See the sample report" }}
      />
    </>
  );
}
