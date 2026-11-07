import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Onest } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { ConsentManager } from "@/components/consent/ConsentManager";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import { SITE_URL, isProductionDeploy } from "@/content/url";
import "./globals.css";
import "./effects.css";

// One family for every role: Onest, a humanist grotesk, warm at display sizes and very clear at body sizes.
const onest = Onest({ subsets: ["latin"], variable: "--font-onest", display: "swap" });
// Document annotations only.
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap", preload: false });

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

export const viewport: Viewport = { themeColor: "#f8f9fb" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${onest.variable} ${jetbrains.variable}`}>
      <body>
        <a href="#main" className="skip-link sr-only-focusable">
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
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
