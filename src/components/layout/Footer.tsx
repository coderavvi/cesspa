"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#051d12] text-gray-300">
      {/* Pre-Footer Social Ribbon (Behance Style) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 2xl:px-8 pt-10">
        <div className="bg-[#16a34a] rounded-xl px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-[#4ade80]/20">
          <div className="flex items-center gap-3">
            <span className="font-heading font-bold text-lg sm:text-xl text-white tracking-wide">
              Connect with us on <span className="text-[#dcfce7]">Social Media</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/15 border border-[#86efac]/30 hover:bg-white text-white hover:text-[#16a34a] flex items-center justify-center transition-all"
              aria-label="X"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/15 border border-[#86efac]/30 hover:bg-white text-white hover:text-[#16a34a] flex items-center justify-center transition-all"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/15 border border-[#86efac]/30 hover:bg-white text-white hover:text-[#16a34a] flex items-center justify-center transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/15 border border-[#86efac]/30 hover:bg-white text-white hover:text-[#16a34a] flex items-center justify-center transition-all"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 2xl:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand & Contacts */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#4ade80] shadow-[0_0_12px_rgba(74,222,128,0.25)] bg-white shrink-0">
                <Image
                  src="/images/brand/logo.png"
                  alt="CESSPA Official Seal"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-black text-2xl text-white tracking-wide leading-none">
                    CESSPA
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]" />
                </div>
                <span className="text-[10px] text-[#86efac] font-bold tracking-wider uppercase mt-1 leading-tight">
                  Environmental &amp; Social Standards
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              Proactively restore environmental health through certified baseline standards, ESIA audits, and sustainable ecosystem safeguards across Nigeria.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                <span>Plot 742, Cadastral Zone B04, Jabi District, Abuja, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#4ade80] shrink-0" />
                <a href="tel:+2348032377721" className="hover:text-[#4ade80] transition-colors">+234 (0) 803 237 7721</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#4ade80] shrink-0" />
                <a href="mailto:secretariat@cesspa.org.ng" className="hover:text-[#4ade80] transition-colors">secretariat@cesspa.org.ng</a>
              </div>
            </div>
          </div>

          {/* Col 2: Company */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-5 tracking-wide">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-[#4ade80] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#4ade80] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#4ade80] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/about/executives" className="hover:text-[#4ade80] transition-colors">
                  Executive Council
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#4ade80] transition-colors">
                  Resources &amp; Publications
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-5 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/membership" className="hover:text-[#4ade80] transition-colors">
                  Certification &amp; Membership
                </Link>
              </li>
              <li>
                <Link href="/membership/directory" className="hover:text-[#4ade80] transition-colors">
                  Practitioner Directory
                </Link>
              </li>
              <li>
                <Link href="/#standards" className="hover:text-[#4ade80] transition-colors">
                  ESIA Benchmarks
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#4ade80] transition-colors">
                  Events and Programs
                </Link>
              </li>
              <li>
                <Link href="/secretariat" className="hover:text-[#4ade80] transition-colors">
                  Secretariat
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-5 tracking-wide">
              Newsletter
            </h4>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Subscribe to receive the latest environmental policy updates, gazettes, and national audit bulletins.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#22c55e] transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-[#16a34a] hover:bg-[#15803d] border border-[#4ade80]/30 text-white font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
              >
                <span>Subscribe Now</span>
                <ArrowRight className="w-4 h-4 text-[#86efac]" />
              </button>
            </form>

            {subscribed && (
              <div className="flex items-center gap-2 text-xs text-[#4ade80] mt-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you for subscribing!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 bg-[#03150d] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
          Copyright © 2026 CESSPA. Certified Environmental Specialists and Practitioners Association. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
