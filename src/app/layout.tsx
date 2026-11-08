import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { ConsentManager } from "@/components/consent/ConsentManager";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import { SITE_URL, isProductionDeploy } from "@/content/url";
import "./globals.css";
import "./effects.css";

// One superfamily, so headlines and text never clash. Funnel Display for headlines, figures and the wordmark;
// Funnel Sans for text and controls. Both SIL Open Font License. Chosen from a rendered audition (FONT-AUDIT.md).
const funnelDisplay = Funnel_Display({ subsets: ["latin"], variable: "--font-funnel-display", display: "swap", weight: "variable" });
const funnelSans = Funnel_Sans({ subsets: ["latin"], variable: "--font-funnel-sans", display: "swap", weight: "variable" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Sayable · PDF accessibility for cities and public agencies", template: "%s · Sayable" },
  description: site.description,
  applicationName: "Sayable",
  alternates: { canonical: "/" },
  openGraph: { title: "Sayable · PDF accessibility for cities", description: site.description, type: "website", siteName: "Sayable", locale: "en_US", url: "/" },
  twitter: { card: "summary_large_image", title: "Sayable · PDF accessibility for cities", description: site.description },
  // Previews and local builds stay out of search results.
  robots: isProductionDeploy ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#ecebe7" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" data-scroll-behavior="smooth" className={`${funnelDisplay.variable} ${funnelSans.variable}`}>
      <body>
        <a href="#main" className="skip-link sr-only-focusable">
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="site-main outline-none">
            {children}
          </main>
          <Footer />
          <RevealObserver />
          <ConsentManager />
        </MotionProvider>
      </body>
    </html>
  );
}
