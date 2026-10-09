import type { Metadata } from "next";
import { Montserrat, Inter, Cormorant_Garamond } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CESSPA — Certified Environmental & Social Standards Professionals Association",
  description:
    "The unified professional body for Environmental & Social (E&S) standards professionals in Nigeria. Raising the standard of ESIA, safeguards, monitoring, and sustainable development.",
  keywords: [
    "CESSPA",
    "ESIA Nigeria",
    "Environmental Safeguards",
    "Social Safeguards",
    "EIA Act Nigeria",
    "NESREA",
    "Sustainable Development",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${cormorant.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-ink-body selection:bg-forest-green selection:text-white">
        <Suspense fallback={<div className="h-20 bg-white" />}>
          <Header />
        </Suspense>
        <main className="flex-1 w-full">{children}</main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
