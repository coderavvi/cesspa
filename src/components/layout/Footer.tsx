"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { BRAND } from "@/lib/constants";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="relative bg-forest-green text-sage-mist overflow-hidden pt-0">
      {/* Curved wave top edge with thin gold hairline accent */}
      <WaveDivider position="top" fillColor="#0b4a2b" hasGoldHairline={true} height={60} />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Newsletter Strip */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-deep-emerald/70 border border-sage-mist/20 backdrop-blur-xs flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-md">
            <span className="text-xs font-montserrat font-bold text-heritage-gold-soft uppercase tracking-wider">
              STAY INFORMED & COMPLIANT
            </span>
            <h3 className="text-xl sm:text-2xl font-montserrat font-extrabold text-white mt-1">
              Subscribe to the CESSPA Safeguards Digest
            </h3>
            <p className="text-xs sm:text-sm text-sage-mist/80 mt-1">
              Receive quarterly regulatory updates, ESIA practice advisories, and CPD event notices.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-leaf-accent/20 border border-leaf-accent/40 rounded-xl text-xs text-white">
                <CheckCircle2 className="w-5 h-5 text-leaf-accent shrink-0" />
                <span>Thank you! You are subscribed to official CESSPA bulletins.</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email address"
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-sage-mist/30 text-white placeholder-sage-mist/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-heritage-gold transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-heritage-gold hover:bg-heritage-gold-soft text-forest-green font-montserrat font-bold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  Subscribe
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Link Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-sage-mist/15 text-xs">
          {/* Brand Info (2 cols) */}
          <div className="col-span-2 space-y-4">
            <Logo variant="full" size="md" lightMode={true} />
            <p className="text-sage-mist/80 text-xs sm:text-sm leading-relaxed max-w-sm">
              The unified professional body bridging certification and ethical practice for Environmental & Social standards practitioners across Nigeria.
            </p>
            <div className="space-y-2 text-sage-mist/85 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-heritage-gold shrink-0 mt-0.5" />
                <span>{BRAND.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-heritage-gold shrink-0" />
                <a href={`mailto:${BRAND.contact.email}`} className="hover:text-white transition-colors">
                  {BRAND.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-heritage-gold shrink-0" />
                <span>{BRAND.contact.phone}</span>
              </div>
            </div>
          </div>

          {/* Col: Who We Are */}
          <div className="space-y-3">
            <h4 className="font-montserrat font-bold text-white uppercase tracking-wider text-xs border-b border-heritage-gold/40 pb-1 inline-block">
              Who We Are
            </h4>
            <ul className="space-y-2 text-sage-mist/80">
              <li><Link href="/about" className="hover:text-white transition-colors">About CESSPA</Link></li>
              <li><Link href="/about/presidents-message" className="hover:text-white transition-colors">President's Message</Link></li>
              <li><Link href="/about/board" className="hover:text-white transition-colors">Board of Trustees</Link></li>
              <li><Link href="/about/executives" className="hover:text-white transition-colors">National Executives</Link></li>
              <li><Link href="/about/code-of-ethics" className="hover:text-white transition-colors">Code of Ethics</Link></li>
              <li><Link href="/about/contact" className="hover:text-white transition-colors">Contact Directory</Link></li>
            </ul>
          </div>

          {/* Col: Membership */}
          <div className="space-y-3">
            <h4 className="font-montserrat font-bold text-white uppercase tracking-wider text-xs border-b border-heritage-gold/40 pb-1 inline-block">
              Membership
            </h4>
            <ul className="space-y-2 text-sage-mist/80">
              <li><Link href="/membership" className="hover:text-white transition-colors">Plan & Pricing</Link></li>
              <li><Link href="/membership/register" className="hover:text-white transition-colors">Registration Wizard</Link></li>
              <li><Link href="/membership/pay-dues" className="hover:text-white transition-colors">Pay Annual Dues</Link></li>
              <li><Link href="/directory" className="hover:text-white transition-colors">Find a Professional</Link></li>
              <li><Link href="/membership/brochure" className="hover:text-white transition-colors">Download Brochure</Link></li>
            </ul>
          </div>

          {/* Col: Events & Programs */}
          <div className="space-y-3">
            <h4 className="font-montserrat font-bold text-white uppercase tracking-wider text-xs border-b border-heritage-gold/40 pb-1 inline-block">
              Programs & Media
            </h4>
            <ul className="space-y-2 text-sage-mist/80">
              <li><Link href="/events" className="hover:text-white transition-colors">Event Calendar</Link></li>
              <li><Link href="/events/photos" className="hover:text-white transition-colors">Event Photos</Link></li>
              <li><Link href="/events/presentations" className="hover:text-white transition-colors">Public Presentations</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Publications Library</Link></li>
              <li><Link href="/resources/blog" className="hover:text-white transition-colors">Insights & Articles</Link></li>
            </ul>
          </div>

          {/* Col: Chapters & Support */}
          <div className="space-y-3">
            <h4 className="font-montserrat font-bold text-white uppercase tracking-wider text-xs border-b border-heritage-gold/40 pb-1 inline-block">
              Engagement
            </h4>
            <ul className="space-y-2 text-sage-mist/80">
              <li><Link href="/chapters" className="hover:text-white transition-colors">6 Geopolitical Chapters</Link></li>
              <li><Link href="/sponsorship" className="hover:text-white transition-colors">Corporate Sponsorship</Link></li>
              <li><Link href="/donate" className="hover:text-white transition-colors">Donate to CESSPA</Link></li>
              <li><Link href="/admin" className="hover:text-heritage-gold-soft transition-colors font-medium">Council Admin Login</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip: Social Handles & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sage-mist/70">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-white">Socials:</span>
            <a
              href={BRAND.contact.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-heritage-gold transition-colors"
            >
              @cesspa_ng (LinkedIn)
            </a>
            <span>•</span>
            <a
              href={BRAND.contact.socials.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:text-heritage-gold transition-colors"
            >
              @cesspa_ng (X)
            </a>
            <span>•</span>
            <a
              href={BRAND.contact.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-heritage-gold transition-colors"
            >
              @cesspanigeria (IG)
            </a>
          </div>

          <div className="text-center sm:text-right">
            <p>© 2026 CESSPA. All rights reserved.</p>
            <p className="text-[10px] text-sage-mist/50 mt-0.5">
              Recognized under Federal Ministry of Environment guidelines & Nigerian EIA regulatory framework.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
