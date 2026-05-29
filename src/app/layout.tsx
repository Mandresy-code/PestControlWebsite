import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://eseis-pestcontrol.fr"),
  title: {
    default: "ESEIS Pest Control — L'hygiène, sans bruit.",
    template: "%s | ESEIS Pest Control",
  },
  description:
    "Société de lutte antiparasitaire professionnelle. Dératisation, désinsectisation, punaises de lit, désinfection. Techniciens Certibiocide. Astreinte 24/7.",
  keywords: [
    "lutte antiparasitaire",
    "dératisation",
    "désinsectisation",
    "punaises de lit",
    "IPM",
    "Certibiocide",
    "pest control",
    "ESEIS",
    "BCR-i",
  ],
  authors: [{ name: "ESEIS Pest Control" }],
  creator: "ESEIS Pest Control",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://eseis-pestcontrol.fr",
    siteName: "ESEIS Pest Control",
    title: "ESEIS Pest Control — L'hygiène, sans bruit.",
    description:
      "Lutte antiparasitaire professionnelle. IPM · Certibiocide · Astreinte 24/7.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ESEIS Pest Control — L'hygiène, sans bruit.",
    description: "Lutte antiparasitaire professionnelle. IPM · Certibiocide · Astreinte 24/7.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-16 focus:py-8 focus:bg-navy-900 focus:text-white focus:rounded-md focus:text-body"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
