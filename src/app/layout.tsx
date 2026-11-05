import type { Metadata, Viewport } from "next";
import { Fragment_Mono, Hanken_Grotesk, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/content/site";
import "./globals.css";
import "./effects.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-source-serif",
  display: "swap",
});
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });
const fragment = Fragment_Mono({ subsets: ["latin"], weight: "400", variable: "--font-fragment", display: "swap", preload: false });

export const metadata: Metadata = {
  title: { default: "Sayable · Document accessibility for public agencies", template: "%s · Sayable" },
  description: site.description,
  openGraph: { title: "Sayable", description: site.description, type: "website" },
};

export const viewport: Viewport = { themeColor: "#f7f9f4" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${sourceSerif.variable} ${hanken.variable} ${fragment.variable}`}>
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
