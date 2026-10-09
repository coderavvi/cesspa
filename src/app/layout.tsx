import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full bg-[#edf3ea] text-ink-body font-sans selection:bg-forest-green selection:text-white p-2 sm:p-4 lg:p-6">
        {/* Behance 'Save Nature' Floating Canvas Frame */}
        <div className="w-full max-w-[1640px] mx-auto rounded-[28px] sm:rounded-[38px] lg:rounded-[44px] bg-ivory shadow-[0_25px_80px_rgba(5,33,21,0.08)] border border-white/80 ring-1 ring-black/5 overflow-hidden flex flex-col min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-3rem)]">
          <Suspense fallback={<div className="h-20 bg-white" />}>
            <Header />
          </Suspense>
          <main className="flex-1 w-full">{children}</main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
