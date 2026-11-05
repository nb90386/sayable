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
    body: "We ask where your documents live, roughly how many there are, which ones residents use to apply for things, and what your deadline is.",
  },
  {
    n: "02",
    title: "A small sample first",
    body: "We can start with a handful of your published documents, so you can see the inventory, the fixes and the check reports before committing to more.",
  },
  {
    n: "03",
    title: "A fixed written scope",
    body: "You get a plain description of what we'll inventory, check and repair, what stays with your team, and when each part will be delivered.",
  },
];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string | string[] }> }) {
  const { topic } = await searchParams;
  const defaultInterest = typeof topic === "string" ? topic : undefined;
  return (
    <div className="wrap pb-24 pt-[calc(var(--header-h)+4rem)] sm:pb-32">
      <div className="grid-12 gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <p className="eyebrow">Contact · Request an audit</p>
          <h1 className="display mt-7 text-[length:clamp(2.6rem,1.5rem+3.6vw,4.8rem)]">
            Tell us what you <em>publish.</em>
          </h1>
          <p className="lede mt-8">
            Cities, counties, agencies and the firms who publish for them. We reply from a person, not an autoresponder.
          </p>

          <h2 className="tag mt-14 !text-muted">What happens after you write</h2>
          <ol className="mt-4 border-t hairline">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b py-6 hairline">
                <span className="tag pt-1.5">{s.n}</span>
                <div>
                  <h3 className="font-serif text-[1.35rem] leading-snug tracking-[-0.01em]">{s.title}</h3>
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
