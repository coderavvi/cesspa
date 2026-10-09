import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "CESSPA — Certified Environmental & Social Standards Professionals Association",
  description:
    "Nigeria's foremost professional body for Environmental & Social Standards, ESIA compliance, ecological monitoring, and sustainable development.",
  keywords: [
    "CESSPA",
    "Environmental Standards Nigeria",
    "ESIA Certification",
    "EIA Act Nigeria",
    "Ecological Safeguards",
    "Environmental Audit",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full bg-white text-ink-body font-sans selection:bg-leaf-green selection:text-white flex flex-col">
        <Suspense fallback={<div className="h-24 bg-[#072517]" />}>
          <Header />
        </Suspense>
        <main className="flex-1 w-full overflow-x-hidden">{children}</main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
