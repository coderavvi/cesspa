"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Mail,
  Phone,
  LogIn,
  Search,
  ShieldCheck,
  Users,
  Award,
  BookOpen,
  Calendar,
  Heart,
  FileText,
  Compass,
  ArrowRight,
  GraduationCap,
  Building2,
  Camera,
  PlayCircle,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface DropdownItem {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavGroup {
  label: string;
  href?: string;
  items: DropdownItem[];
  featured?: {
    tag: string;
    title: string;
    description: string;
    href: string;
    actionText: string;
  };
}

const NAVIGATION_GROUPS: NavGroup[] = [
  {
    label: "Who We Are",
    href: "/about",
    featured: {
      tag: "GOVERNANCE",
      title: "Charter & Council of Trustees",
      description: "Uniting Nigeria's certified environmental & social safeguard practitioners under a unified statutory mandate.",
      href: "/about/board",
      actionText: "Meet the Board",
    },
    items: [
      {
        title: "About CESSPA",
        description: "Vision, mission, and national statutory objectives",
        href: "/about",
        icon: Compass,
      },
      {
        title: "President's Address",
        description: "Strategic inaugural address from the Secretariat",
        href: "/about/presidents-message",
        icon: Award,
      },
      {
        title: "Board of Trustees",
        description: "Distinguished governing council & fellows",
        href: "/about/board",
        icon: Users,
      },
      {
        title: "National Executives",
        description: "Operational leadership & zonal directorate",
        href: "/about/executives",
        icon: Building2,
      },
      {
        title: "Code of Ethics",
        description: "Mandatory professional conduct & standards",
        href: "/about/code-of-ethics",
        icon: ShieldCheck,
      },
      {
        title: "Secretariat & Contact",
        description: "Abuja headquarters, liaison offices & enquiries",
        href: "/about/contact",
        icon: Mail,
      },
    ],
  },
  {
    label: "ESIA Standards",
    href: "/#pillars",
    featured: {
      tag: "TECHNICAL FRAMEWORK",
      title: "The Three Pillars of ESIA",
      description: "Risk identification, participatory social safeguards, and continuous environmental monitoring.",
      href: "/#pillars",
      actionText: "Explore Framework",
    },
    items: [
      {
        title: "Pillar 1: Proactive Risk Screening",
        description: "Preventive planning before statutory capital deployment",
        href: "/#pillars",
        icon: ShieldCheck,
      },
      {
        title: "Pillar 2: Social Safeguards & Dignity",
        description: "Community trust, FPIC, and livelihood protection",
        href: "/#pillars",
        icon: Users,
      },
      {
        title: "Pillar 3: Lifelong Monitoring",
        description: "Post-approval ecological auditing & telemetry",
        href: "/#pillars",
        icon: Compass,
      },
      {
        title: "Regulatory Alignment",
        description: "EIA Act Cap E12, NESREA guidelines & World Bank ESS",
        href: "/resources",
        icon: FileText,
      },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    featured: {
      tag: "ACCREDITATION",
      title: "Elevate Your Professional Standing",
      description: "Gain statutory recognition, professional indemnification, and continuous professional development (CPD).",
      href: "/membership/register",
      actionText: "Apply for Induction",
    },
    items: [
      {
        title: "Tiers & Pricing",
        description: "Fellow, Full Member, Associate, Graduate & Student",
        href: "/membership",
        icon: Award,
        badge: "5 Tiers",
      },
      {
        title: "Apply for Membership",
        description: "Step-by-step accreditation & qualification upload",
        href: "/membership/register",
        icon: GraduationCap,
        badge: "Enrolling",
      },
      {
        title: "Annual Dues & Licensure",
        description: "Official renewal, good standing & CPD verification",
        href: "/membership/pay-dues",
        icon: FileText,
      },
      {
        title: "Certified Member Directory",
        description: "Verify accredited ESIA practitioners nationwide",
        href: "/directory",
        icon: Users,
      },
      {
        title: "Official Prospectus & Brochure",
        description: "Download the complete membership prospectus",
        href: "/membership/brochure",
        icon: BookOpen,
      },
    ],
  },
  {
    label: "Chapters & Events",
    href: "/events",
    featured: {
      tag: "ANNUAL SUMMIT",
      title: "CESSPA National Conference 2026",
      description: "The premier gathering of environmental & social practitioners in Abuja, FCT.",
      href: "/events/cesspa-national-conference-agm-2026",
      actionText: "View Conference Details",
    },
    items: [
      {
        title: "National Event Calendar",
        description: "AGMs, statutory symposiums & CPD workshops",
        href: "/events",
        icon: Calendar,
      },
      {
        title: "6 Geo-Political Chapters",
        description: "Zonal secretariats spanning 36 states + FCT",
        href: "/chapters",
        icon: Building2,
      },
      {
        title: "Field Symposium Gallery",
        description: "High-resolution photo archives of past summits",
        href: "/events/photos",
        icon: Camera,
      },
      {
        title: "Keynote Presentations",
        description: "Whitepapers, slide decks & technical papers",
        href: "/events/presentations",
        icon: FileText,
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    featured: {
      tag: "PUBLICATIONS",
      title: "2026 Technical ESIA Handbook",
      description: "The authoritative practice reference for environmental professionals in Nigeria.",
      href: "/resources",
      actionText: "Access Library",
    },
    items: [
      {
        title: "Publications & Guidelines",
        description: "Official standards manuals & baseline methodologies",
        href: "/resources",
        icon: BookOpen,
      },
      {
        title: "Insights & Editorial Blog",
        description: "Peer-reviewed essays & sustainability analysis",
        href: "/resources/blog",
        icon: FileText,
      },
      {
        title: "Masterclass Video Archive",
        description: "Recorded webinars, interviews & CPD lectures",
        href: "/resources/videos",
        icon: PlayCircle,
      },
    ],
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const pathname = usePathname();

  // Hide public header on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-3 sm:top-5 z-50 w-full px-3 sm:px-6 lg:px-8 transition-all duration-300">
      {/* =========================================================
          FLOATING ISLAND PILL NAVBAR (Behance 'Save Nature' UI)
      ========================================================= */}
      <nav
        className={cn(
          "max-w-[1360px] mx-auto rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4 border",
          isScrolled
            ? "bg-white/90 backdrop-blur-2xl shadow-[0_16px_45px_rgba(5,33,21,0.1)] border-white/80"
            : "bg-white/80 backdrop-blur-xl shadow-[0_10px_35px_rgba(5,33,21,0.06)] border-white/60"
        )}
      >
        {/* Brand Logo with Seal */}
        <div className="shrink-0">
          <Logo variant="full" size="md" />
        </div>

        {/* Center Pill Nav Links */}
        <div className="hidden xl:flex items-center gap-1.5">
          {NAVIGATION_GROUPS.map((group) => {
            const isOpen = activeDropdown === group.label;
            const isGroupActive = group.items.some(
              (item) => item.href !== "/" && pathname.startsWith(item.href)
            );

            return (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(group.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-2 rounded-full font-sans text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer",
                    isGroupActive || isOpen
                      ? "bg-forest-green text-white shadow-xs"
                      : "text-ink-dark/85 hover:text-forest-green hover:bg-black/5"
                  )}
                  onClick={() =>
                    setActiveDropdown(isOpen ? null : group.label)
                  }
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      isOpen ? "rotate-180 text-white" : "text-ink-muted",
                      isGroupActive && "text-white"
                    )}
                  />
                </button>

                {/* Floating Frosted Glass Mega-Dropdown */}
                {isOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[660px] animate-in fade-in-0 zoom-in-95 duration-200 z-50">
                    <div className="bg-white/95 backdrop-blur-2xl rounded-[28px] shadow-[0_30px_70px_-15px_rgba(5,33,21,0.22)] border border-heritage-gold/30 p-6 ring-1 ring-black/5 overflow-hidden">
                      {/* Gold Top Accent Line */}
                      <div className="h-1 bg-gradient-to-r from-forest-green via-heritage-gold to-forest-green rounded-full mb-5" />

                      <div className="grid grid-cols-12 gap-6">
                        {/* Nav Items Column */}
                        <div className={cn(group.featured ? "col-span-7" : "col-span-12", "space-y-1.5")}>
                          {group.items.map((item) => {
                            const IconComponent = item.icon;
                            const isCurrent = pathname === item.href;

                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  "flex items-start gap-3 p-2.5 rounded-2xl transition-all duration-200 group",
                                  isCurrent
                                    ? "bg-sage-mist text-forest-green"
                                    : "hover:bg-sage-mist/70 text-ink-dark"
                                )}
                              >
                                <div className="w-8 h-8 rounded-xl bg-forest-green/10 text-forest-green flex items-center justify-center shrink-0 group-hover:bg-forest-green group-hover:text-white transition-colors duration-200 mt-0.5">
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-sans font-semibold text-xs text-ink-dark group-hover:text-forest-green transition-colors">
                                      {item.title}
                                    </span>
                                    {item.badge && (
                                      <span className="text-[9px] font-sans font-bold px-2 py-0.5 rounded-full bg-heritage-gold/20 text-heritage-gold">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-ink-muted leading-tight mt-0.5 line-clamp-1">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        {/* Featured Spotlight Card */}
                        {group.featured && (
                          <div className="col-span-5 bg-gradient-to-br from-[#052115] to-[#0a3a24] rounded-2xl p-5 text-white flex flex-col justify-between border border-heritage-gold/30 relative overflow-hidden shadow-inner">
                            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-heritage-gold/15 blur-xl pointer-events-none" />

                            <div>
                              <span className="inline-block text-[10px] font-sans font-bold tracking-widest uppercase text-heritage-gold-soft bg-white/10 px-2.5 py-0.5 rounded-full">
                                {group.featured.tag}
                              </span>
                              <h4 className="font-serif font-bold text-lg mt-3 text-white leading-snug">
                                {group.featured.title}
                              </h4>
                              <p className="text-xs text-sage-mist/80 mt-1.5 leading-relaxed font-sans">
                                {group.featured.description}
                              </p>
                            </div>

                            <Link
                              href={group.featured.href}
                              className="mt-4 inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-heritage-gold-soft hover:text-white transition-colors group/feat"
                            >
                              <span>{group.featured.actionText}</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover/feat:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/sponsorship"
            className={cn(
              "px-3.5 py-2 rounded-full font-sans text-xs font-semibold tracking-wide transition-colors",
              pathname === "/sponsorship"
                ? "bg-forest-green text-white shadow-xs"
                : "text-ink-dark/85 hover:text-forest-green hover:bg-black/5"
            )}
          >
            Sponsorship
          </Link>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/directory"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-semibold text-ink-body hover:text-forest-green hover:bg-black/5 transition-colors"
            title="Verify Member on Registry"
          >
            <Search className="w-3.5 h-3.5 text-heritage-gold" />
            <span className="hidden lg:inline">Verify Member</span>
          </Link>

          <Link
            href="/login"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-semibold text-ink-dark hover:text-forest-green transition-colors"
          >
            <LogIn className="w-3.5 h-3.5 text-heritage-gold" />
            <span>Portal</span>
          </Link>

          <Link
            href="/membership/register"
            className="relative inline-flex items-center justify-center font-sans font-bold text-xs uppercase tracking-wider px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-forest-green via-[#0e4e30] to-forest-green text-white border border-heritage-gold/50 shadow-md hover:shadow-lg hover:border-heritage-gold transition-all duration-300 group overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Join CESSPA</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-heritage-gold/0 via-heritage-gold/25 to-heritage-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-full text-forest-green hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Toggle navigation drawer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* =========================================================
          MOBILE NAVIGATION DRAWER (Frosted Glass Accordion)
      ========================================================= */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-2 max-w-[1360px] mx-auto rounded-[28px] border border-brand-border bg-white/95 backdrop-blur-2xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-200 max-h-[80vh] overflow-y-auto">
          {/* Quick Status Pill */}
          <div className="p-3.5 rounded-2xl bg-sage-mist/60 border border-brand-border flex items-center justify-between">
            <span className="text-xs font-sans font-semibold text-forest-green">
              Chartered Body • Nigeria
            </span>
            <span className="text-[10px] font-sans font-bold text-heritage-gold uppercase tracking-wider">
              EIA Act Compliant
            </span>
          </div>

          {/* Nav Groups Accordion */}
          <div className="space-y-1">
            {NAVIGATION_GROUPS.map((group) => {
              const isAccordionOpen = mobileAccordion === group.label;

              return (
                <div key={group.label} className="border-b border-brand-border/40 py-1.5">
                  <button
                    onClick={() =>
                      setMobileAccordion(isAccordionOpen ? null : group.label)
                    }
                    className="w-full flex items-center justify-between py-2 text-left font-serif font-bold text-base text-ink-dark hover:text-forest-green transition-colors"
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-ink-muted transition-transform duration-200",
                        isAccordionOpen && "rotate-180 text-forest-green"
                      )}
                    />
                  </button>

                  {isAccordionOpen && (
                    <div className="pl-2 pr-1 py-2 space-y-1 bg-sage-mist/40 rounded-2xl my-1 animate-in fade-in-0 duration-150">
                      {group.items.map((item) => {
                        const IconComp = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-sans font-medium text-ink-body hover:bg-white hover:text-forest-green transition-colors"
                          >
                            <IconComp className="w-3.5 h-3.5 text-heritage-gold" />
                            <div className="flex-1">
                              <span className="block font-semibold">{item.title}</span>
                              <span className="text-[10px] text-ink-muted line-clamp-1">
                                {item.description}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/sponsorship"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 border-b border-brand-border/40 font-serif font-bold text-base text-ink-dark hover:text-forest-green"
            >
              Sponsorship
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href="/membership/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full font-sans font-bold text-xs uppercase tracking-wider bg-forest-green text-white hover:bg-deep-emerald shadow-md flex items-center justify-center gap-2"
            >
              <span>Join CESSPA Today</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full font-sans font-semibold text-xs border border-heritage-gold/50 text-forest-green hover:bg-sage-mist flex items-center justify-center gap-2"
            >
              <LogIn className="w-3.5 h-3.5 text-heritage-gold" />
              <span>Member Portal Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
