/**
 * Chapter: what an inaccessible PDF costs, followed through one document.
 * Each cost carries a small artifact so it reads as a situation, not a claim.
 * The resident and staff scenes are illustrative; the legal scene cites real DOJ agreements (see docs/research/RESEARCH-NOTES.md).
 */
export function Consequences() {
  return (
    <section data-sc-act="consequences" aria-labelledby="cost-title" className="py-[clamp(7rem,14vh,11rem)]">
      <div className="wrap">
        <div className="mx-auto max-w-[1100px]">
          <h2 id="cost-title" className="headline max-w-[18ch]">
            What one inaccessible form <span className="tone">can cost.</span>
          </h2>
          <p className="lede mt-6 !max-w-[56ch]">
            Take the permit application above. Here is what can happen when it stays as it is. Not every city sees every one of these, but most see some.
          </p>

          <ol className="mt-14 grid gap-0">
            <li className="cost-row">
              <div>
                <p className="cost-k">For the resident</p>
                <h3 className="title text-[1.35rem] text-ink">She can&apos;t apply without help.</h3>
                <p className="mt-3 max-w-[52ch] text-ink-soft">
                  A resident who is blind opens the form with her screen reader, software that reads the screen aloud. She hears &ldquo;edit text, blank&rdquo;
                  five times and can&apos;t tell which box is for her phone number. She has to ask someone else to fill in her own application, or call city
                  hall and wait.
                </p>
              </div>
              <figure className="cost-art" aria-hidden="true">
                <p className="mono text-[0.82rem] text-muted">What she hears</p>
                <p className="mt-2 grid gap-1 text-[0.98rem] text-ink">
                  <span>&ldquo;Page 1 of 2.&rdquo;</span>
                  <span>&ldquo;Edit text. Blank.&rdquo;</span>
                  <span>&ldquo;Edit text. Blank.&rdquo;</span>
                  <span className="text-muted">&ldquo;Edit text. Blank.&rdquo;</span>
                </p>
              </figure>
            </li>

            <li className="cost-row">
              <div>
                <p className="cost-k">For your staff</p>
                <h3 className="title text-[1.35rem] text-ink">Someone rebuilds it by hand, under pressure.</h3>
                <p className="mt-3 max-w-[52ch] text-ink-soft">
                  A request for an accessible version lands in the clerk&apos;s inbox. Someone who isn&apos;t trained for it spends an afternoon in Acrobat. The
                  next time the form is revised, the problem comes back. Multiply that by every department that posts PDFs.
                </p>
              </div>
              <figure className="cost-art" aria-hidden="true">
                <p className="mono text-[0.82rem] text-muted">Inbox</p>
                <div className="mt-2 rounded-[8px] bg-sheet p-3 text-[0.92rem] shadow-[inset_0_0_0_1px_rgb(18_21_27/0.08)]">
                  <p className="font-[600] text-ink">Accessible version of permit form?</p>
                  <p className="text-muted">I use a screen reader and can&apos;t fill this in…</p>
                </div>
              </figure>
            </li>

            <li className="cost-row">
              <div>
                <p className="cost-k">For your budget</p>
                <h3 className="title text-[1.35rem] text-ink">Paying for the wrong pages.</h3>
                <p className="mt-3 max-w-[52ch] text-ink-soft">
                  Without an inventory, there are two bad choices. Fix everything, including old files that may be excepted and that nobody opens. Or wait,
                  and do the work later on someone else&apos;s schedule. Both cost more than knowing what you have first.
                </p>
              </div>
              <figure className="cost-art" aria-hidden="true">
                <p className="mono text-[0.82rem] text-muted">Example inventory</p>
                <div className="mt-3 grid gap-2 text-[0.86rem]">
                  <div>
                    <div className="h-2.5 rounded-full bg-ink/25" />
                    <p className="mt-1 text-muted">40,000 pages on the website</p>
                  </div>
                  <div>
                    <div className="h-2.5 w-[30%] rounded-full bg-signal" />
                    <p className="mt-1 text-ink">12,000 still in use</p>
                  </div>
                </div>
              </figure>
            </li>

            <li className="cost-row">
              <div>
                <p className="cost-k">For the city</p>
                <h3 className="title text-[1.35rem] text-ink">A complaint, and years of reporting.</h3>
                <p className="mt-3 max-w-[52ch] text-ink-soft">
                  Residents can complain to the Department of Justice or take a city to court under Title II. When DOJ resolves a case, it usually asks the
                  city to fix its website and documents, adopt a policy, train staff and report progress, often for several years. Money damages are limited
                  and usually require showing the discrimination was intentional. There is no automatic fine for a single PDF, and no vendor, including us,
                  can make the duty go away.
                </p>
              </div>
              <figure className="cost-art">
                <p className="mono text-[0.82rem] text-muted">A real case</p>
                <blockquote className="mt-2 text-[0.95rem] text-ink">
                  <p>
                    In 2014 a blind attorney complained that court documents from the Orange County Clerk of Courts in Florida were scanned PDFs that a
                    screen reader could not read. The settlement with DOJ required accessible documents on request, an accessible website within six months, staff
                    training, quarterly reports, and $10,000 to the complainant.
                  </p>
                </blockquote>
                <figcaption className="mt-3 text-[0.84rem] text-muted">
                  <a href="https://archive.ada.gov/occ.htm" className="text-link" rel="noopener noreferrer">
                    Read the agreement on ada.gov
                  </a>
                  . Denver&apos;s 2018 agreement had similar terms for its whole website, over three years.{" "}
                  <a href="https://archive.ada.gov/denver_pca/denver_sa.html" className="text-link" rel="noopener noreferrer">
                    Denver agreement
                  </a>
                </figcaption>
              </figure>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
