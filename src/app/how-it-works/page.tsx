import type { Metadata } from "next";
import Link from "next/link";
import { PageCta, Reveal } from "@/components/pages/PageParts";
import { PageHero } from "@/components/pages/PageHero";
import { HeroFlow } from "@/components/pages/hiw/HeroFlow";
import { CheckColumns, CrawlLog, SortPiles, TagTreePair } from "@/components/pages/hiw/Artifacts";
import { StatusChips } from "@/components/pages/hiw/StageParts";

export const metadata: Metadata = {
  title: "How it works",
  description: "Share your website address. Sayable finds the PDFs it links to, checks them, and organizes what needs attention into a plan you decide on.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        layout="stack"
        title="From your city website to a clear plan."
        lede="Share your website address. We find the PDFs it links to, check them, and organize what needs attention."
      >
        <HeroFlow />
      </PageHero>

      <section aria-labelledby="hiw-1" className="wrap border-t pt-4 pb-16 hairline sm:pb-24">
        <h2 id="hiw-1" className="sr-only">
          Who does what
        </h2>
        <Reveal as="ol" className="sp-ledger">
          <li>
            <h3>You provide</h3>
            <ul>
              <li>Your website address</li>
              <li>Any agenda system or document portal you also use</li>
              <li>A 30-minute call about which services residents rely on</li>
            </ul>
            <p className="mt-4 text-[0.9rem] text-muted">No logins, no file exports, no documents sent to us. About an hour of your time.</p>
          </li>
          <li>
            <h3>Sayable does</h3>
            <ul>
              <li>Crawls your public site and records every linked PDF and the page that links to it</li>
              <li>Sorts each file with a recommendation and a reason</li>
              <li>Checks the files that matter</li>
            </ul>
            <div className="mt-4">
              <StatusChips items={[{ label: "Available now, as a service", state: "now" }]} />
            </div>
          </li>
          <li>
            <h3>You receive</h3>
            <ul>
              <li>A written report and the inventory as a spreadsheet</li>
              <li>A ranked must-fix list and an effort estimate</li>
              <li>A walkthrough with your team</li>
            </ul>
            <p className="mt-4 text-[0.9rem]">
              <Link href="/readiness-audit" className="text-link">
                See a sample report
              </Link>
            </p>
          </li>
        </Reveal>
      </section>

      {/* Step two: the work, at full width */}
      <section aria-labelledby="hiw-2" className="hiw-step hiw-band">
        <div className="wrap">
          <div className="hiw-two-head">
            <Reveal as="h2" id="hiw-2" className="hiw-title">
              What we do with your site.
            </Reveal>
            <div>
              <p className="hiw-body">
                A polite crawl finds every linked PDF. Each file then gets a recommendation with a reason. Your team makes the final call.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <CrawlLog />
          </div>
          <div className="mt-10">
            <SortPiles />
          </div>
        </div>
      </section>

      {/* Step three: the decision */}
      <section aria-labelledby="hiw-3" className="hiw-step">
        <div className="wrap">
          <Reveal as="h2" id="hiw-3" className="hiw-title max-w-[20ch]">
            Then you choose what happens next.
          </Reveal>
          <ul className="hiw-choices">
            <li>
              <h3>We repair the must-fix files</h3>
              <p>People do the work, with software for routine fixes. Every file comes back with a report.</p>
              <StatusChips items={[{ label: "Available now", state: "now" }]} />
            </li>
            <li>
              <h3>Your team works from the list</h3>
              <p>The ranked inventory tells your staff what to fix first and why. You can stop there.</p>
              <StatusChips items={[{ label: "Included in the audit", state: "now" }]} />
            </li>
            <li>
              <h3>New agendas, checked before posting</h3>
              <p>Each meeting packet comes back repaired and checked before it goes up.</p>
              <StatusChips items={[{ label: "Limited pilot", state: "soon" }]} />
            </li>
          </ul>
          <p className="mt-8 max-w-[60ch] text-[0.95rem] text-muted">Nothing continues unless you ask for it.</p>
        </div>
      </section>

      {/* The detail, for whoever has to approve it */}
      <section aria-labelledby="hiw-detail" className="hiw-step hiw-detail-wrap">
        <div className="wrap">
          <h2 id="hiw-detail" className="title text-[length:var(--step-2)]">
            The details, for IT and procurement
          </h2>
          <div className="hiw-details">
            <details>
              <summary>How we find your documents</summary>
              <div className="hiw-detail-body">
                <p>
                  We crawl your public website politely: we respect robots.txt, make at most one request per second, never log in and never get around access
                  controls. Every linked PDF is recorded with the page it was linked from and the words used to link it. Duplicates are found by file
                  fingerprint.
                </p>
              </div>
            </details>
            <details>
              <summary>How repairs are done</summary>
              <div className="hiw-detail-body">
                <p>
                  Untagged files get a first structure from an open-source auto-tagger. Our software, which is still in testing, proposes small edits: change a
                  role, add alternative text, mark a page number as decoration, reorder content. An edit is kept only if the file checks no worse afterwards.
                  Tables, lists, complex reading order, scans and form labels always go to a person.
                </p>
                <p>
                  The page should look the same afterwards. When a fix needs a visible change, such as replacing a scanned page with real text, we tell you before
                  we make it.
                </p>
                <div className="mt-6">
                  <TagTreePair />
                </div>
              </div>
            </details>
            <details>
              <summary>How we check the work</summary>
              <div className="hiw-detail-body">
                <p>
                  veraPDF, the open-source validator for PDF/UA-1, checks the technical structure. Our semantic check, still in testing, compares what a screen
                  reader would traverse with what a sighted reader sees. A person reviews every flag and every form, and listens to the result.{" "}
                  <Link href="/verify" className="text-link">
                    More on verification
                  </Link>
                  .
                </p>
                <div className="mt-6">
                  <CheckColumns />
                </div>
              </div>
            </details>
            <details>
              <summary>What is planned, not available yet</summary>
              <div className="hiw-detail-body">
                <p>
                  Software that watches your site for new uploads and reports recurring problems, such as a template that keeps producing untagged tables. Until
                  it exists, checking new uploads can be part of an ongoing service, scoped in writing. For single files, the free{" "}
                  <Link href="/check" className="text-link">
                    Check a PDF
                  </Link>{" "}
                  tool works today.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
      <PageCta />
    </>
  );
}
