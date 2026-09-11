import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk, Space_Mono, Montserrat, Anton } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import ContactModal from "@/components/ContactModal";
import { site } from "@/data/site";

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const punch = Montserrat({
  variable: "--font-punch",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const cond = Anton({
  variable: "--font-cond",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} ${punch.variable} ${cond.variable}`}>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <SmoothScroll />
        <Cursor />
        <ContactModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
