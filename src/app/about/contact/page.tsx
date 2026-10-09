"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Globe2,
  Building2,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { BRAND } from "@/lib/constants";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Membership & Certification Inquiry",
    zone: "North Central",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="GET IN TOUCH" lightMode={true}>
            NATIONAL SECRETARIAT & CHAPTER DIRECTORY
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            Contact CESSPA
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Have questions regarding certification, dues verification, event registrations, or corporate partnerships?
            Our Secretariat team is ready to assist you.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl p-6 sm:p-8 bg-white border border-brand-border shadow-sm space-y-6">
              <h3 className="font-montserrat font-extrabold text-xl text-ink-dark uppercase">
                National Secretariat
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-ink-body">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink-dark font-montserrat">Headquarters:</strong>
                    <span>{BRAND.contact.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink-dark font-montserrat">Email:</strong>
                    <a
                      href={`mailto:${BRAND.contact.email}`}
                      className="text-forest-green underline hover:text-heritage-gold"
                    >
                      {BRAND.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink-dark font-montserrat">Telephone Lines:</strong>
                    <span>{BRAND.contact.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink-dark font-montserrat">Secretariat Hours:</strong>
                    <span>Monday – Friday: 08:30 AM – 05:00 PM (WAT)</span>
                  </div>
                </div>
              </div>

              {/* Socials Block */}
              <div className="pt-4 border-t border-brand-border space-y-2">
                <span className="font-montserrat font-bold text-xs uppercase text-ink-dark block">
                  Official Channels:
                </span>
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                  <a
                    href={BRAND.contact.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-sage-mist hover:bg-forest-green hover:text-white transition-colors"
                  >
                    LinkedIn @cesspa_ng
                  </a>
                  <a
                    href={BRAND.contact.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-sage-mist hover:bg-forest-green hover:text-white transition-colors"
                  >
                    X @cesspa_ng
                  </a>
                  <a
                    href={BRAND.contact.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-sage-mist hover:bg-forest-green hover:text-white transition-colors"
                  >
                    Instagram @cesspanigeria
                  </a>
                </div>
              </div>
            </div>

            {/* Simulated Interactive Map Card */}
            <div className="rounded-3xl p-6 bg-forest-green text-white space-y-4 shadow-md overflow-hidden relative">
              <div className="flex items-center justify-between">
                <span className="font-montserrat font-bold text-xs text-heritage-gold-soft uppercase tracking-wider">
                  ABUJA SECRETARIAT MAP
                </span>
                <Building2 className="w-5 h-5 text-heritage-gold" />
              </div>

              <div className="aspect-16/9 rounded-xl bg-deep-emerald border border-sage-mist/20 flex flex-col items-center justify-center p-4 text-center">
                <MapPin className="w-8 h-8 text-heritage-gold animate-bounce" />
                <span className="font-montserrat font-bold text-xs mt-2">
                  Plot 742, Cadastral Zone B04, Jabi, Abuja
                </span>
                <span className="text-[11px] text-sage-mist/70 mt-1">
                  GPS: 9.0765° N, 7.4253° E
                </span>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-brand-border shadow-sm">
            <h3 className="font-montserrat font-extrabold text-2xl text-ink-dark uppercase mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted mb-6">
              Complete the form below and an administrative officer from the relevant geopolitical desk will contact you within 24 business hours.
            </p>

            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-leaf-green flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-montserrat font-bold text-xl text-forest-green">
                  Inquiry Dispatched Successfully
                </h4>
                <p className="text-xs sm:text-sm text-ink-body max-w-md mx-auto">
                  Thank you for reaching out to CESSPA. A confirmation has been logged under ticket reference #CESSPA-INQ-{Math.floor(Math.random() * 8999 + 1000)}.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-forest-green text-white font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-deep-emerald transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Kalu Oti"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="kalu.oti@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 803 000 0000"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                      Geopolitical Zone
                    </label>
                    <select
                      value={formData.zone}
                      onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green bg-white"
                    >
                      <option value="North Central">North Central (Abuja/Jos/Makurdi)</option>
                      <option value="South West">South West (Lagos/Ibadan/Abeokuta)</option>
                      <option value="South South">South South (Port Harcourt/Benin/Uyo)</option>
                      <option value="South East">South East (Enugu/Awka/Owerri)</option>
                      <option value="North West">North West (Kano/Kaduna/Sokoto)</option>
                      <option value="North East">North East (Bauchi/Maiduguri/Yola)</option>
                      <option value="International">International / Diaspora</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                    Subject of Inquiry *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green bg-white"
                  >
                    <option value="Membership & Certification Inquiry">Membership & Certification Inquiry</option>
                    <option value="Dues & Payment Verification">Annual Dues & Payment Verification</option>
                    <option value="Event / Conference Registration">Conference & CPD Workshop Inquiry</option>
                    <option value="Corporate Partnership & Sponsorship">Corporate Partnership & Sponsorship</option>
                    <option value="Ethics / Safeguard Grievance">Ethics & Professional Conduct Matter</option>
                    <option value="Media & Press Inquiry">Media & Press Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                    Message Detail *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding your inquiry or request..."
                    className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-heritage-gold" />
                  Submit Official Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
