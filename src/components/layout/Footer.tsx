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
  Heart,
  ShieldCheck,
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
    <footer className="relative bg-[#052115] text-sage-mist overflow-hidden pt-0 border-t border-heritage-gold/20">
      {/* Curved wave top edge with thin gold hairline accent */}
      <WaveDivider position="top" fillColor="#052115" hasGoldHairline={true} height={50} />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Newsletter Strip (Da Vinci Editorial Style) */}
        <div className="mb-14 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0a3a24] to-[#062417] border border-heritage-gold/30 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-lg space-y-1">
            <span className="text-[11px] font-sans font-bold text-heritage-gold-soft uppercase tracking-widest">
              OFFICIAL REGULATORY BULLETINS
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
              Subscribe to the CESSPA Safeguards Digest
            </h3>
            <p className="text-xs sm:text-sm font-sans text-sage-mist/80 pt-1 leading-relaxed">
              Quarterly regulatory advisories, Nigerian ESIA practice bulletins, and accredited CPD masterclass notices delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-2 p-3.5 bg-leaf-accent/20 border border-leaf-accent/40 rounded-2xl text-xs font-sans text-white">
                <CheckCircle2 className="w-5 h-5 text-leaf-accent shrink-0" />
                <span>Thank you. You are subscribed to official CESSPA regulatory updates.</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email"
                  required
                  className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-sage-mist/30 text-white placeholder-sage-mist/60 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-heritage-gold font-sans transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-heritage-gold hover:bg-heritage-gold-soft text-forest-green font-sans font-bold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Subscribe
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Link Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-sage-mist/15 text-xs font-sans">
          {/* Brand Info (2 cols) */}
          <div className="col-span-2 space-y-4">
            <Logo variant="full" size="md" lightMode={true} />
            <p className="text-sage-mist/80 text-xs sm:text-sm leading-relaxed max-w-sm font-sans">
              The unified professional body bridging statutory certification and ethical practice for Environmental & Social standards practitioners across Nigeria.
            </p>
            <div className="space-y-2.5 text-sage-mist/85 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-heritage-gold shrink-0 mt-0.5" />
                <span>{BRAND.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-heritage-gold shrink-0" />
                <a href={`mailto:${BRAND.contact.email}`} className="hover:text-white transition-colors">
                  {BRAND.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-heritage-gold shrink-0" />
                <span>{BRAND.contact.phone}</span>
              </div>
            </div>
          </div>

          {/* Col: Who We Are */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base border-b border-heritage-gold/40 pb-1.5 inline-block">
              Governance
            </h4>
            <ul className="space-y-2 text-sage-mist/80">
              <li><Link href="/about" className="hover:text-heritage-gold-soft transition-colors">About CESSPA</Link></li>
              <li><Link href="/about/presidents-message" className="hover:text-heritage-gold-soft transition-colors">President's Address</Link></li>
              <li><Link href="/about/board" className="hover:text-heritage-gold-soft transition-colors">Board of Trustees</Link></li>
              <li><Link href="/about/executives" className="hover:text-heritage-gold-soft transition-colors">National Executives</Link></li>
              <li><Link href="/about/code-of-ethics" className="hover:text-heritage-gold-soft transition-colors">Code of Ethics</Link></li>
              <li><Link href="/about/contact" className="hover:text-heritage-gold-soft transition-colors">Secretariat Directory</Link></li>
            </ul>
          </div>

          {/* Col: Membership */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base border-b border-heritage-gold/40 pb-1.5 inline-block">
              Membership
            </h4>
            <ul className="space-y-2 text-sage-mist/80">
              <li><Link href="/membership" className="hover:text-heritage-gold-soft transition-colors">5 Professional Tiers</Link></li>
              <li><Link href="/membership/register" className="hover:text-heritage-gold-soft transition-colors">Register as Member</Link></li>
              <li><Link href="/membership/pay-dues" className="hover:text-heritage-gold-soft transition-colors">Pay Annual Dues</Link></li>
              <li><Link href="/directory" className="hover:text-heritage-gold-soft transition-colors">Verify a Practitioner</Link></li>
              <li><Link href="/membership/brochure" className="hover:text-heritage-gold-soft transition-colors">Official Prospectus</Link></li>
            </ul>
          </div>

          {/* Col: Events & Programs */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base border-b border-heritage-gold/40 pb-1.5 inline-block">
              Programs & CPD
            </h4>
            <ul className="space-y-2 text-sage-mist/80">
              <li><Link href="/events" className="hover:text-heritage-gold-soft transition-colors">National Conference 2026</Link></li>
              <li><Link href="/events/photos" className="hover:text-heritage-gold-soft transition-colors">Field Photo Archive</Link></li>
              <li><Link href="/events/presentations" className="hover:text-heritage-gold-soft transition-colors">Public Presentations</Link></li>
              <li><Link href="/resources" className="hover:text-heritage-gold-soft transition-colors">Standards Library</Link></li>
              <li><Link href="/resources/blog" className="hover:text-heritage-gold-soft transition-colors">Insights & Articles</Link></li>
            </ul>
          </div>

          {/* Col: Chapters & Support */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base border-b border-heritage-gold/40 pb-1.5 inline-block">
              Engagement
            </h4>
            <ul className="space-y-2 text-sage-mist/80">
              <li><Link href="/chapters" className="hover:text-heritage-gold-soft transition-colors">6 Geopolitical Chapters</Link></li>
              <li><Link href="/sponsorship" className="hover:text-heritage-gold-soft transition-colors">Corporate Sponsorship</Link></li>
              <li><Link href="/donate" className="hover:text-heritage-gold-soft transition-colors">Public Impact Fund</Link></li>
              <li><Link href="/login" className="hover:text-heritage-gold-soft transition-colors font-medium">Member Portal Login</Link></li>
              <li><Link href="/admin" className="hover:text-heritage-gold-soft transition-colors text-[11px] opacity-70">Council Gateway</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip: Social Handles & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-sage-mist/70">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-white">Official Handles:</span>
            <a
              href={BRAND.contact.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-heritage-gold transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href={BRAND.contact.socials.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:text-heritage-gold transition-colors"
            >
              X (Twitter)
            </a>
            <span>•</span>
            <a
              href={BRAND.contact.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-heritage-gold transition-colors"
            >
              Instagram
            </a>
          </div>

          <div className="text-center sm:text-right">
            <p>© 2026 CESSPA. Certified Environmental and Social Standards Professionals Association.</p>
            <p className="text-[10px] text-sage-mist/50 mt-0.5">
              Operating in compliance with the Federal Ministry of Environment & EIA Act Cap E12 LFN 2004.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
