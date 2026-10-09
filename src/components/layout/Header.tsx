"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Mail,
  Phone,
  Search,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  BookOpen,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "About",
      href: "/about",
      dropdown: [
        { label: "About CESSPA", href: "/about", icon: ShieldCheck, desc: "Nigeria's statutory E&S standards association" },
        { label: "Governing Board", href: "/about/board", icon: Users, desc: "Eminent trustees & environmental leadership" },
        { label: "Executive Council", href: "/about/executives", icon: Award, desc: "National council & portfolio directors" },
        { label: "President's Address", href: "/about/presidents-message", icon: BookOpen, desc: "Strategic vision for Nigerian ecology" },
      ],
    },
    {
      label: "Services",
      href: "/#services",
      dropdown: [
        { label: "ESIA Studies & Safeguards", href: "/#services", icon: ShieldCheck, desc: "Statutory environmental & social impacts" },
        { label: "Audits & Compliance", href: "/#services", icon: Award, desc: "Statutory FMEnv & NESREA verification" },
        { label: "Remediation & Ecology", href: "/#services", icon: Sparkles, desc: "Pollution response & ecosystem restoration" },
      ],
    },
    { label: "Standards", href: "/#standards" },
    {
      label: "Membership",
      href: "/membership",
      dropdown: [
        { label: "Membership Grades", href: "/membership", icon: Users, desc: "Fellows, Associates, and Corporate registers" },
        { label: "Practitioner Directory", href: "/membership/directory", icon: Award, desc: "Verify registered professional seals" },
        { label: "Membership Brochure", href: "/membership/brochure", icon: BookOpen, desc: "Charter, rights, and ethical mandates" },
      ],
    },
    { label: "Insights", href: "/resources/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full z-50 sticky top-0 transition-all">
      {/* Top Utility Bar (Behance Style) */}
      <div className="bg-[#051d12] text-gray-300 text-xs border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/95 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#4ade80]" />
              Federal Capital Territory, Abuja, Nigeria
            </span>
            <span className="text-white/20">|</span>
            <a
              href="mailto:secretariat@cesspa.org.ng"
              className="flex items-center gap-1.5 text-white/95 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#4ade80]" />
              secretariat@cesspa.org.ng
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="tel:+2348032377721"
              className="flex items-center gap-1.5 text-white/95 hover:text-white transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#4ade80]" />
              +234 (0) 803 237 7721
            </a>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-3">
              <span className="text-[#86efac] text-[11px] uppercase tracking-wider font-bold">Follow Us:</span>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 rounded flex items-center justify-center text-white/90 hover:text-[#4ade80] transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 rounded flex items-center justify-center text-white/90 hover:text-[#4ade80] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 rounded flex items-center justify-center text-white/90 hover:text-[#4ade80] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#072517] border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo with Official CESSPA Seal */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#4ade80] shadow-[0_0_12px_rgba(74,222,128,0.35)] group-hover:scale-105 transition-transform bg-white shrink-0">
              <Image
                src="/images/brand/logo.png"
                alt="CESSPA Official Seal"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-2xl text-white tracking-wide leading-none">
                  CESSPA
                </span>
                <span className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]" />
              </div>
              <span className="text-[10px] text-[#86efac] font-bold tracking-wider uppercase mt-1 leading-tight hidden sm:block">
                Environmental &amp; Social Standards • Nigeria
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const hasDropdown = Boolean(item.dropdown);

              if (hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-2 text-sm font-semibold transition-all rounded-md",
                        activeDropdown === item.label || isActive
                          ? "text-[#4ade80] bg-[#16a34a]/25 border border-[#4ade80]/30 shadow-xs"
                          : "text-white/90 hover:text-[#4ade80]"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-[#86efac]" />
                    </button>

                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 w-72 bg-[#092e1d] border border-[#4ade80]/20 rounded-xl shadow-2xl py-2 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        {item.dropdown?.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="flex items-start gap-3 px-4 py-2.5 hover:bg-white/10 transition-colors group"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="p-1.5 rounded-lg bg-[#16a34a]/30 text-[#4ade80] border border-[#4ade80]/30 group-hover:bg-[#16a34a] group-hover:text-white transition-colors mt-0.5">
                              <sub.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-[#4ade80] transition-colors">
                                {sub.label}
                              </div>
                              <div className="text-xs text-[#86efac]/80 mt-0.5 leading-snug">
                                {sub.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-semibold transition-all rounded-md",
                    isActive
                      ? "text-[#4ade80] font-bold bg-[#16a34a]/25 border border-[#4ade80]/30 shadow-xs"
                      : "text-white/90 hover:text-[#4ade80] hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/resources/blog"
              className="p-2 text-white/90 hover:text-[#4ade80] hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Search or Publications"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              href="/membership"
              className="bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95 border border-[#4ade80]/30"
            >
              <span>Get Certified</span>
              <ArrowRight className="w-4 h-4 text-[#86efac]" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#072517] border-b border-white/10 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((item) => (
            <div key={item.label} className="border-b border-white/5 pb-2">
              <Link
                href={item.href}
                className="block py-2 text-base font-semibold text-white hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
              {item.dropdown && (
                <div className="pl-4 space-y-2 mt-1">
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block text-sm text-white/80 hover:text-white py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4">
            <Link
              href="/membership"
              className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white text-center font-bold py-3 rounded-lg flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Get Certified</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
