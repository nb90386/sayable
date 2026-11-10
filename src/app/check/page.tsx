import type { Metadata } from "next";
import Link from "next/link";
import { PdfChecker } from "@/components/check/PdfChecker";

export const metadata: Metadata = {
  title: "Check a PDF",
  description:
    "A free accessibility check for one PDF. It runs in your browser, so the file is never uploaded. See missing tags, titles, language, scanned pages and unnamed form fields in plain English.",
  alternates: { canonical: "/check" },
};

export default function CheckPage() {
  return (
    <>
      <header className="wrap pt-[calc(var(--header-h)+3.5rem)] pb-10">
        <div className="max-w-[46rem]">
          <h1 className="display text-[length:clamp(2.4rem,1.4rem+3vw,4rem)]">Check a PDF.</h1>
          <p className="lede mt-6 !max-w-[44ch]">
            See what a screen reader would struggle with in one of your PDFs, explained in plain English. It takes a few seconds and the file never
            leaves your computer.
          </p>
        </div>
      </header>

      <section aria-label="PDF check" className="wrap pb-20">
        <div className="max-w-[52rem]">
          <PdfChecker />
        </div>
      </section>

      <section aria-labelledby="how-title" className="border-t hairline">
        <div className="wrap grid gap-10 py-16 md:grid-cols-2 md:gap-16">
          <div>
            <h2 id="how-title" className="title text-ink">
              How this check works
            </h2>
            <p className="mt-4 max-w-[52ch] text-ink-soft">
              Your browser opens the PDF with pdf.js, the open-source PDF reader built into Firefox, and reads its structure: tags, title, language, text,
              form fields, image descriptions, headings and tables. Nothing is sent to Sayable or anyone else. Close the tab and it is gone.
            </p>
            <p className="mt-4 max-w-[52ch] text-ink-soft">
              It looks for the problems software can see for certain. It does not run the full PDF/UA rule set the way a dedicated validator does, and it cannot
              judge meaning. Treat it as a first look, not a verdict.
            </p>
          </div>
          <div>
            <h2 className="title text-ink">What it means for your city</h2>
            <p className="mt-4 max-w-[52ch] text-ink-soft">
              One file is easy to check. A city website usually links to thousands. The hard part is knowing which of them people rely on to apply for
              something, which can be archived, and which need a person to repair.
            </p>
            <p className="mt-4">
              <Link href="/readiness-audit" className="text-link">
                What a Readiness Audit covers
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
