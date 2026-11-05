import type { Metadata, Viewport } from "next";
import { Archivo, Courier_Prime, Public_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/content/site";
import "./globals.css";
import "./effects.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public", display: "swap" });
const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: { default: "Sayable — Every document deserves to be understood", template: "%s · Sayable" },
  description: site.description,
  openGraph: { title: "Sayable", description: site.description, type: "website" },
};

export const viewport: Viewport = { themeColor: "#d9bd84" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${archivo.variable} ${publicSans.variable} ${courier.variable}`}>
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
