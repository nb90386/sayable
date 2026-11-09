import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Request an audit",
  description: "Ask Sayable for a document accessibility readiness audit, a pilot on a sample of documents, or agenda turnaround.",
};

const steps = [
  {
    n: "01",
    title: "A short scoping call",
    body: "Where your documents live, roughly how many there are, which ones residents use to apply for things, and your timing.",
  },
  {
    n: "02",
    title: "Optionally, a small sample first",
    body: "Ask for a handful of your published documents to be done first, to judge the work before committing to more.",
  },
  {
    n: "03",
    title: "A written scope and fee",
    body: "What we will inventory, check or repair, what stays with your team, one flat fee for an audit, and the schedule. Nothing starts until you agree.",
  },
];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string | string[] }> }) {
  const { topic } = await searchParams;
  const defaultInterest = typeof topic === "string" ? topic : undefined;
  return (
    <div className="wrap pb-24 pt-[calc(var(--header-h)+4rem)] sm:pb-32">
      <div className="grid-12 gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <h1 className="display mt-7 text-[length:clamp(2.6rem,1.5rem+3.6vw,4.8rem)]">
            Tell us what you <span className="tone">publish.</span>
          </h1>
          <p className="lede mt-8">
            Cities, counties, agencies and the firms who publish for them. Tell us your website and what you need; we will reply to set up a short call.
          </p>

          <h2 className="title mt-14 text-[1.15rem]">What happens after you write</h2>
          <ol className="mt-4 border-t hairline">
            {steps.map((s) => (
              <li key={s.title} className="border-b py-6 hairline">
                <div>
                  <h3 className="sp-h3">{s.title}</h3>
                  <p className="mt-2 text-[0.975rem] text-ink-soft">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-[44ch] text-[0.9rem] text-muted">
            Sayable gives inventories, check results and recommendations. We don&apos;t give legal advice, and your team
            makes the final decisions about what to archive or remove.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:pl-8">
          <ContactForm contactEmail={site.contactEmail} defaultInterest={defaultInterest} />
        </div>
      </div>
    </div>
  );
}
