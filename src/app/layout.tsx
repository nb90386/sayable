import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Onest } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/content/site";
import "./globals.css";
import "./effects.css";

// One family for every role: Onest, a humanist grotesk, warm at display sizes and very clear at body sizes.
const onest = Onest({ subsets: ["latin"], variable: "--font-onest", display: "swap" });
// Document annotations only.
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap", preload: false });

export const metadata: Metadata = {
  title: { default: "Sayable · Document accessibility for public agencies", template: "%s · Sayable" },
  description: site.description,
  openGraph: { title: "Sayable", description: site.description, type: "website" },
};

export const viewport: Viewport = { themeColor: "#f8f9fb" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${onest.variable} ${jetbrains.variable}`}>
      <body>
        <a href="#main" className="skip-link sr-only-focusable">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
