"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
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
  Calendar,
  Camera,
  FileText,
  Video,
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
      label: "Membership",
      href: "/membership",
      dropdown: [
        { label: "Membership Brochure", href: "/membership/brochure", icon: BookOpen, desc: "Charter, rights, and ethical mandates" },
        { label: "Membership Prices", href: "/membership", icon: Users, desc: "Fellows, Associates, and Corporate pricing tiers" },
        { label: "Pay Annual Dues", href: "/membership/pay-dues", icon: Sparkles, desc: "Annual dues payment & confirmation" },
        { label: "Register New Member", href: "/membership/register", icon: ShieldCheck, desc: "Accreditation application portal" },
        { label: "Practitioner Directory", href: "/directory", icon: Award, desc: "Verify registered professional seals" },
      ],
    },
    {
      label: "Events and Programs",
      href: "/events",
      dropdown: [
        { label: "Event Calendar", href: "/events", icon: Calendar, desc: "National summits, workshops & forums" },
        { label: "Event Photos", href: "/events/photos", icon: Camera, desc: "Photo gallery of past national convenings" },
        { label: "Public Presentations", href: "/events/presentations", icon: FileText, desc: "Technical papers & stakeholder decks" },
      ],
    },
    {
      label: "Resources",
      href: "/resources",
      dropdown: [
        { label: "Publications & Guidelines", href: "/resources", icon: BookOpen, desc: "Statutory compendiums & ESIA manuals" },
        { label: "Insights & Articles", href: "/resources/blog", icon: Sparkles, desc: "Policy briefs & expert commentary" },
        { label: "Video Gallery", href: "/resources/videos", icon: Video, desc: "Recorded webinars & technical briefings" },
      ],
    },
    {
      label: "Secretariat",
      href: "/secretariat",
    },
  ];

  return (
    <header className="w-full z-50 sticky top-0 transition-all">

      {/* Main Navbar */}
      <div className="bg-[#072517] border-b border-white/10 shadow-lg">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 2xl:px-8 h-20 flex items-center justify-between gap-2 xl:gap-4">
          {/* Brand Logo with Official CESSPA Seal */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#4ade80] shadow-[0_0_12px_rgba(74,222,128,0.35)] group-hover:scale-105 transition-transform bg-white shrink-0">
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
                <span className="font-heading font-black text-xl sm:text-2xl text-white tracking-wide leading-none">
                  CESSPA
                </span>
                <span className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]" />
              </div>
              <span className="text-[10px] text-[#86efac] font-bold tracking-wider uppercase mt-1 leading-tight hidden xl:block">
                Environmental &amp; Social Standards • Nigeria
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 2xl:gap-2">
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
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1 xl:gap-1.5 px-2 py-1.5 xl:px-2.5 xl:py-2 2xl:px-3 text-xs xl:text-[13px] 2xl:text-sm font-semibold rounded-md whitespace-nowrap shrink-0 border transition-colors duration-150",
                        activeDropdown === item.label || isActive
                          ? "text-[#4ade80] bg-[#16a34a]/25 border-[#4ade80]/30 shadow-xs"
                          : "text-white/90 hover:text-[#4ade80] hover:bg-white/5 border-transparent"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 text-[#86efac] shrink-0",
                          activeDropdown === item.label ? "rotate-180 text-[#4ade80]" : "rotate-0"
                        )}
                      />
                    </Link>

                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 pt-1.5 z-50">
                        <div className="w-72 bg-[#092e1d] border border-[#4ade80]/20 rounded-xl shadow-2xl py-2">
                          {item.dropdown?.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="flex items-start gap-3 px-4 py-2.5 hover:bg-white/10 transition-colors group"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="p-1.5 rounded-lg bg-[#16a34a]/30 text-[#4ade80] border border-[#4ade80]/30 group-hover:bg-[#16a34a] group-hover:text-white transition-colors mt-0.5 shrink-0">
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
                    "px-2 py-1.5 xl:px-2.5 xl:py-2 2xl:px-3 text-xs xl:text-[13px] 2xl:text-sm font-semibold rounded-md whitespace-nowrap shrink-0 border transition-colors duration-150",
                    isActive
                      ? "text-[#4ade80] bg-[#16a34a]/25 border-[#4ade80]/30 shadow-xs"
                      : "text-white/90 hover:text-[#4ade80] hover:bg-white/5 border-transparent"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3.5 shrink-0">
            <Link
              href="/resources/blog"
              className="p-1.5 xl:p-2 text-white/90 hover:text-[#4ade80] hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Search or Publications"
            >
              <Search className="w-4 h-4 xl:w-5 xl:h-5" />
            </Link>

            <Link
              href="/membership"
              className="bg-[#16a34a] hover:bg-[#15803d] text-white text-xs xl:text-sm font-bold px-3.5 py-2 xl:px-5 xl:py-2.5 rounded-lg flex items-center gap-1.5 xl:gap-2 transition-all shadow-md hover:shadow-lg active:scale-95 border border-[#4ade80]/30 whitespace-nowrap"
            >
              <span>Get Certified</span>
              <ArrowRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#86efac]" />
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
