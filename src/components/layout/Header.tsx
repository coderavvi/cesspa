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
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { BRAND, NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Hide public header on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-forest-green text-sage-mist/90 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-forest-green/80">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`mailto:${BRAND.contact.email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-heritage-gold-soft" />
              <span className="hidden sm:inline">{BRAND.contact.email}</span>
            </a>
            <a
              href={`tel:${BRAND.contact.phone.split("/")[0]}`}
              className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-heritage-gold-soft" />
              <span>{BRAND.contact.phone}</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2.5 text-sage-mist/70">
              <a
                href={BRAND.contact.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-heritage-gold transition-colors"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <span>•</span>
              <a
                href={BRAND.contact.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-heritage-gold transition-colors"
                aria-label="X (Twitter)"
              >
                X (Twitter)
              </a>
              <span>•</span>
              <a
                href={BRAND.contact.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-heritage-gold transition-colors"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>

            <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-sage-mist/20">
              <Link
                href="/login"
                className="flex items-center gap-1 text-white hover:text-heritage-gold font-medium transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-heritage-gold" />
                <span>Member Login</span>
              </Link>
              <span className="text-sage-mist/40 hidden xs:inline">|</span>
              <Link
                href="/admin"
                className="text-[11px] text-heritage-gold-soft hover:text-white underline underline-offset-2 transition-colors hidden xs:inline"
              >
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={cn(
          "w-full transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-brand-border py-2.5"
            : "bg-white/90 backdrop-blur-xs border-b border-brand-border/60 py-3.5"
        )}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Logo variant="full" size="md" />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const hasDropdown = Boolean(item.children?.length);
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 font-montserrat text-xs font-bold uppercase tracking-wider transition-colors py-2",
                      isActive
                        ? "text-forest-green border-b-2 border-heritage-gold"
                        : "text-ink-dark hover:text-forest-green"
                    )}
                  >
                    {item.label}
                    {hasDropdown && (
                      <ChevronDown className="w-3 h-3 text-ink-muted group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasDropdown && (
                    <div
                      className={cn(
                        "absolute top-full left-0 w-64 pt-2 transition-all duration-200",
                        activeDropdown === item.label
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 translate-y-2 pointer-events-none"
                      )}
                    >
                      <div className="bg-white rounded-xl shadow-xl border border-brand-border p-2 space-y-1">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-3 py-2 rounded-lg text-xs font-semibold text-ink-body hover:bg-sage-mist hover:text-forest-green transition-colors",
                              pathname === child.href &&
                                "bg-forest-green/10 text-forest-green font-bold"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA & Mobile Controls */}
          <div className="flex items-center gap-3">
            <Link
              href="/membership/register"
              className="hidden sm:inline-flex items-center justify-center font-montserrat font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl border-2 border-heritage-gold bg-heritage-gold/10 text-forest-green hover:bg-forest-green hover:text-white hover:border-forest-green shadow-xs transition-all duration-300"
            >
              Join CESSPA
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-forest-green hover:bg-sage-mist transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-brand-border bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="border-b border-brand-border/40 py-1.5">
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-montserrat font-bold text-sm text-forest-green py-1"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-3 py-1 space-y-1 bg-sage-mist/40 rounded-lg my-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs font-medium text-ink-body py-1 hover:text-forest-green"
                        >
                          • {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                href="/membership/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider bg-forest-green text-white hover:bg-deep-emerald shadow-sm"
              >
                Join CESSPA Today
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl font-montserrat font-semibold text-xs border border-brand-border text-forest-green hover:bg-sage-mist"
              >
                Member Portal Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
