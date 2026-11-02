import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { JsonLd, organizationJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

/* Q17: Playfair Display for headings, Inter for body and buttons.
   Self-hosted via next/font — no render-blocking request to Google,
   and `display: swap` so text paints immediately. */

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} — Natural Concretes, Absolutes & Essential Oils`,
    template: `%s | ${site.brand}`,
  },
  description: site.positioning,
  applicationName: site.brand,
  authors: [{ name: site.legalName }],
  keywords: [
    "jasmine sambac absolute",
    "jasmine grandiflorum absolute",
    "tuberose absolute",
    "vetiver oil India",
    "natural concretes absolutes manufacturer",
    "essential oil supplier Tamil Nadu",
    "aromatic ingredients India",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: `${site.brand} — ${site.legalName}`,
  },
};

/* Brief #9 / Q20: zoom must stay enabled. The floralaromatics.in
   criticism was specifically that mobile zoom was disabled. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#122a1e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
