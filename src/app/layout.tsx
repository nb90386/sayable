import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Mono, Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/content/site";
import "./globals.css";
import "./effects.css";

// Display: Bricolage Grotesque, set condensed (wdth axis) for headlines.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  variable: "--font-bricolage",
  display: "swap",
});
// Reading: Atkinson Hyperlegible Next, designed by the Braille Institute for low-vision readers.
const atkinson = Atkinson_Hyperlegible_Next({ subsets: ["latin"], variable: "--font-atkinson", display: "swap" });
// Structure tags only.
const atkinsonMono = Atkinson_Hyperlegible_Mono({ subsets: ["latin"], variable: "--font-atkinson-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  title: { default: "Sayable · Document accessibility for public agencies", template: "%s · Sayable" },
  description: site.description,
  openGraph: { title: "Sayable", description: site.description, type: "website" },
};

export const viewport: Viewport = { themeColor: "#f6f5f1" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${bricolage.variable} ${atkinson.variable} ${atkinsonMono.variable}`}>
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
