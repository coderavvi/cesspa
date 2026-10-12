"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Calendar,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { BRAND, NIGERIA_ZONES } from "@/lib/constants";

export default function SecretariatPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "Membership & Certification",
    zone: "North Central",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          HERO BANNER
      ========================================================================== */}
      <section className="bg-linear-to-b from-[#051d12] to-[#072517] text-white py-16 lg:py-24 relative overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="NATIONAL HEADQUARTERS" lightMode={true}>
            ADMINISTRATIVE &amp; REGULATORY SECRETARIAT
          </Eyebrow>
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase mt-3 max-w-4xl">
            CESSPA National Secretariat
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mt-4 leading-relaxed font-sans">
            The national administrative headquarters for the Certified Environmental and Social Standards
            Professionals Association (CESSPA). Reach our administrative registry, membership desk, and
            regulatory liaison officers.
          </p>
        </div>
      </section>

      {/* =========================================================================
          KEY CREDENTIALS: PHONE, EMAIL, OFFICE (Client Priority Highlights)
      ========================================================================== */}
      <Section variant="ivory">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16a34a] block mb-2 font-mono">
              DIRECT REACH
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0e1e17]">
              Official Secretariat Contacts
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              For practitioner accreditations, statutory notifications, event partnerships, and institutional inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Office */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#dcfce7] text-[#16a34a] flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                    Headquarters
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#0e1e17] mt-1">
                    National Office
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="font-medium text-[#0e1e17]">
                    {BRAND.contact.address}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                    <Clock className="w-4 h-4 text-[#16a34a] shrink-0" />
                    <span>Mon – Fri: 08:30 AM – 05:00 PM (WAT)</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <a
                  href="https://maps.google.com/?q=Jabi+District+Abuja+Nigeria"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16a34a] hover:text-[#15803d]"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card 2: Phone */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#dcfce7] text-[#16a34a] flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                    Telephony Lines
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#0e1e17] mt-1">
                    Direct Phone Lines
                  </h3>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <span className="text-xs text-gray-500 block">Mobile Hotline &amp; WhatsApp:</span>
                    <a
                      href="tel:+2348032377721"
                      className="font-bold text-[#0e1e17] hover:text-[#16a34a] text-base"
                    >
                      +234 (0) 803 237 7721
                    </a>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Abuja Secretariat Landline:</span>
                    <a
                      href="tel:+23492914400"
                      className="font-semibold text-gray-700 hover:text-[#16a34a]"
                    >
                      +234 (0) 9 291 4400
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <a
                  href="tel:+2348032377721"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16a34a] hover:text-[#15803d]"
                >
                  <span>Call Primary Hotline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card 3: Email */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#dcfce7] text-[#16a34a] flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                    Electronic Mail
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#0e1e17] mt-1">
                    Official Inquiries
                  </h3>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <span className="text-xs text-gray-500 block">National Secretariat Registry:</span>
                    <a
                      href="mailto:secretariat@cesspa.org.ng"
                      className="font-bold text-[#0e1e17] hover:text-[#16a34a] text-sm break-all"
                    >
                      secretariat@cesspa.org.ng
                    </a>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">General Information Desk:</span>
                    <a
                      href="mailto:info@cesspa.org.ng"
                      className="font-semibold text-gray-700 hover:text-[#16a34a] text-sm break-all"
                    >
                      info@cesspa.org.ng
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <a
                  href="mailto:secretariat@cesspa.org.ng"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16a34a] hover:text-[#15803d]"
                >
                  <span>Send Direct Email</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* =========================================================================
          INQUIRY FORM & OPERATIONAL DETAILS
      ========================================================================== */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Administrative Brief */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16a34a] block mb-2 font-mono">
                  REGULATORY ENGAGEMENT
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0e1e17] leading-tight">
                  Engage the Secretariat Desk
                </h2>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  Our Secretariat team coordinates practitioner verification with the Federal Ministry
                  of Environment, NESREA, and institutional development partners across all six geopolitical zones.
                </p>
              </div>

              <div className="bg-[#f9fbf9] border border-gray-200 rounded-2xl p-6 space-y-4 text-xs sm:text-sm text-gray-700">
                <h4 className="font-heading font-bold text-sm text-[#0e1e17] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                  Secretariat Mandates
                </h4>
                <ul className="space-y-2 text-xs text-gray-600 list-disc list-inside">
                  <li>Issuance and renewal of Annual Practicing Licences</li>
                  <li>Accreditation of ESIA Lead Consultants and Reviewers</li>
                  <li>Disciplinary complaints &amp; Ethics Tribunal proceedings</li>
                  <li>Hosting of Annual National Conferences and AGM</li>
                </ul>
              </div>

              <div className="border border-gray-100 rounded-2xl p-6 space-y-3">
                <h4 className="font-heading font-bold text-sm text-[#0e1e17]">
                  Quick Navigation
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Link
                    href="/membership"
                    className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-[#16a34a] hover:text-white text-xs font-semibold text-gray-700 transition-colors"
                  >
                    Membership Grades
                  </Link>
                  <Link
                    href="/events"
                    className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-[#16a34a] hover:text-white text-xs font-semibold text-gray-700 transition-colors"
                  >
                    Events and Programs
                  </Link>
                  <Link
                    href="/resources"
                    className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-[#16a34a] hover:text-white text-xs font-semibold text-gray-700 transition-colors"
                  >
                    Resources
                  </Link>
                  <Link
                    href="/about/executives"
                    className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-[#16a34a] hover:text-white text-xs font-semibold text-gray-700 transition-colors"
                  >
                    Executive Council
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-[#f9fbf9] border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xs">
              <h3 className="font-heading font-extrabold text-xl text-[#0e1e17]">
                Submit an Official Inquiry
              </h3>
              <p className="text-xs text-gray-500 mt-1 mb-6">
                All communications are routed directly to the appropriate Secretariat portfolio officer.
              </p>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-[#dcfce7] border border-[#86efac] text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#16a34a] mx-auto" />
                  <h4 className="font-heading font-bold text-lg text-[#072517]">
                    Inquiry Received by Secretariat
                  </h4>
                  <p className="text-xs text-[#0f5132] max-w-md mx-auto">
                    Thank you for reaching out. An official acknowledgment has been queued, and our desk officer will respond to <strong>{formData.email}</strong> within 1–2 business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-5 py-2 rounded-lg bg-[#16a34a] text-white text-xs font-bold hover:bg-[#15803d]"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Achi Mohammed"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-hidden focus:border-[#16a34a] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.org.ng"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-hidden focus:border-[#16a34a] bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234 ..."
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-hidden focus:border-[#16a34a] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Inquiry Category *
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-hidden focus:border-[#16a34a] bg-white"
                      >
                        <option value="Membership & Certification">Membership &amp; Certification</option>
                        <option value="Annual Dues Verification">Annual Dues Verification</option>
                        <option value="Events & Conferences">Events and Programs Registration</option>
                        <option value="Publications & Standards">Resources &amp; Guidelines</option>
                        <option value="Corporate Partnership">Corporate Partnership &amp; Sponsorship</option>
                        <option value="Other Secretariat Enquiries">General Secretariat Inquiries</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Message / Inquiry Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please provide details of your inquiry, registration ID (if applicable), or institutional background..."
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-hidden focus:border-[#16a34a] bg-white resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Secretariat Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ZONAL LIAISON CHAPTERS
      ========================================================================== */}
      <Section variant="ivory">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16a34a] block mb-2 font-mono">
              FEDERATION COVERAGE
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0e1e17]">
              Geopolitical Zonal Desks
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              CESSPA operates decentralized zonal desks coordinating professional practitioners across all 36 States and the FCT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NIGERIA_ZONES.map((zone) => (
              <div
                key={zone.name}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:border-[#16a34a]/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-bold text-base text-[#0e1e17]">
                    {zone.name} Zone
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#dcfce7] text-[#16a34a] font-bold">
                    {zone.states.length} Jurisdictions
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {zone.states.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
