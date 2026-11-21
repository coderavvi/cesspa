"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  CreditCard,
  ArrowLeft,
  Share2,
  X,
  ArrowRight,
  ShieldCheck,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { PaymentModal } from "@/components/shared/PaymentModal";
import { EventItem } from "@/lib/types";
import { formatDate, formatNaira } from "@/lib/utils";
import { addEventRegistration } from "@/lib/registrations";

export function EventDetailClient({ event }: { event: EventItem }) {
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [registeredRef, setRegisteredRef] = useState("");

  const [delegateForm, setDelegateForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleOpenRegistration = () => {
    setRegModalOpen(true);
  };

  const handleSubmitRegistrationForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delegateForm.fullName || !delegateForm.email || !delegateForm.phone) {
      alert("Please provide your full name, email, and phone number.");
      return;
    }

    setRegModalOpen(false);

    if (event.fee === 0) {
      // Complimentary / Free Registration
      const ref = `CESSPA-REG-${Date.now().toString().slice(-6)}`;
      addEventRegistration({
        eventId: event.id,
        eventTitle: event.title,
        fullName: delegateForm.fullName,
        email: delegateForm.email,
        phone: delegateForm.phone,
        feePaid: 0,
        reference: ref,
      });

      setRegisteredRef(ref);
      setRegistered(true);
    } else {
      // Paid registration: Proceed to Paystack payment
      setIsPaymentOpen(true);
    }
  };

  const handlePaymentSuccess = (ref: string) => {
    addEventRegistration({
      eventId: event.id,
      eventTitle: event.title,
      fullName: delegateForm.fullName,
      email: delegateForm.email,
      phone: delegateForm.phone,
      feePaid: event.fee,
      reference: ref,
    });

    setRegisteredRef(ref);
    setRegistered(true);
    setIsPaymentOpen(false);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-forest-green text-white py-14 lg:py-18 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-montserrat font-bold uppercase tracking-wider text-heritage-gold-soft hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Event Calendar
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-heritage-gold text-forest-green font-montserrat font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded">
              {event.category}
            </span>
          </div>

          <h1 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-5xl text-white uppercase max-w-4xl leading-tight">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-sage-mist/90 pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-heritage-gold" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-heritage-gold" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-heritage-gold" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </section>

      <Section variant="ivory">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content (Description, Agenda, Speakers) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Event Flyer Banner */}
            {event.bannerImage && (
              <div className="bg-white rounded-3xl p-3 border border-brand-border shadow-xs overflow-hidden">
                <img
                  src={event.bannerImage}
                  alt={event.title}
                  className="w-full max-h-96 object-cover rounded-2xl"
                />
              </div>
            )}

            {/* Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-4">
              <h2 className="font-montserrat font-extrabold text-xl text-ink-dark uppercase">
                Program Overview & Objectives
              </h2>
              <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
                {event.description}
              </p>
              <div className="p-4 rounded-xl bg-sage-mist/50 border border-brand-border/60 text-xs text-ink-dark flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-leaf-green shrink-0" />
                <span>Official registration confirmed by CESSPA secretariat.</span>
              </div>
            </div>

            {/* Agenda */}
            {event.agenda && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
                <h2 className="font-montserrat font-extrabold text-xl text-ink-dark uppercase">
                  Schedule of Proceedings
                </h2>
                <div className="space-y-4">
                  {event.agenda.map((slot, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-sage-mist/40 border border-brand-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <span className="font-mono text-xs font-bold text-forest-green block">
                          {slot.time}
                        </span>
                        <h4 className="font-montserrat font-bold text-sm text-ink-dark">
                          {slot.topic}
                        </h4>
                      </div>
                      <span className="text-xs text-ink-muted italic sm:text-right shrink-0">
                        {slot.speaker}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Speakers */}
            {event.speakers && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
                <h2 className="font-montserrat font-extrabold text-xl text-ink-dark uppercase">
                  Distinguished Faculty & Speakers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {event.speakers.map((spk, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-sage-mist/30 border border-brand-border/60 text-center space-y-2">
                      <div className="w-16 h-16 rounded-full bg-forest-green/10 border-2 border-heritage-gold/40 mx-auto flex items-center justify-center font-montserrat font-bold text-forest-green text-lg">
                        {spk.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-montserrat font-bold text-sm text-ink-dark">{spk.name}</h4>
                        <p className="text-xs text-forest-green font-medium">{spk.role}</p>
                        <p className="text-[10px] text-ink-muted">{spk.org}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Registration Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl p-6 sm:p-8 bg-white border border-brand-border shadow-md space-y-6 sticky top-28">
              <div>
                <span className="text-[10px] font-montserrat font-bold text-heritage-gold uppercase tracking-widest block">
                  DELEGATE ACCESS PASS
                </span>
                <h3 className="font-montserrat font-extrabold text-2xl text-ink-dark mt-0.5">
                  Register For Event
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-sage-mist/50 border border-brand-border space-y-2 text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="text-ink-muted">Standard Fee:</span>
                  <span className="font-montserrat font-extrabold text-2xl text-forest-green">
                    {event.fee === 0 ? "Complimentary" : formatNaira(event.fee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Capacity:</span>
                  <span>{event.capacity || 500} Delegates</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Registered to Date:</span>
                  <span className="font-semibold text-leaf-green">{event.registeredCount || 6} Confirmed</span>
                </div>
              </div>

              {registered ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                  <div>
                    <p className="text-sm font-bold text-emerald-900">Registration Confirmed!</p>
                    <p className="text-xs text-emerald-700 mt-1">
                      Welcome, <span className="font-semibold">{delegateForm.fullName}</span>. Your delegate seat is secured.
                    </p>
                  </div>
                  {registeredRef && (
                    <div className="p-2 rounded-md bg-white border border-emerald-200 font-mono text-[11px] text-emerald-800">
                      Ticket Ref: {registeredRef}
                    </div>
                  )}
                  <p className="text-[11px] text-emerald-600">
                    A confirmation circular has been logged on the secretariat registry.
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleOpenRegistration}
                  className="w-full py-4 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-heritage-gold" />
                  {event.fee === 0 ? "Register Delegate Seat (Free)" : "Purchase Delegate Pass"}
                </button>
              )}

              <div className="pt-2 text-center text-[11px] text-ink-muted">
                Group bookings &amp; corporate delegations: <a href="mailto:events@cesspa.org.ng" className="text-forest-green underline">events@cesspa.org.ng</a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Delegate Registration Information Modal */}
      {regModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="max-w-lg w-full bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-widest block">
                  Event Registration
                </span>
                <h3 className="font-heading font-extrabold text-xl text-slate-900 mt-0.5">
                  {event.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRegModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitRegistrationForm} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={delegateForm.fullName}
                    onChange={(e) => setDelegateForm({ ...delegateForm, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={delegateForm.email}
                    onChange={(e) => setDelegateForm({ ...delegateForm, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={delegateForm.phone}
                    onChange={(e) => setDelegateForm({ ...delegateForm, phone: e.target.value })}
                    placeholder="e.g. 08012345678"
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>
              </div>

              <div className="p-3 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 font-medium">Registration Fee:</span>
                <span className="font-heading font-extrabold text-base text-[#0B4A2B]">
                  {event.fee === 0 ? "Free" : formatNaira(event.fee)}
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRegModalOpen(false)}
                  className="px-3 py-2 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{event.fee === 0 ? "Complete Registration" : "Proceed to Payment"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Paystack Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        title={`Event Registration: ${event.title}`}
        purpose="Conference Ticket"
        amount={event.fee || 1000}
        customerName={delegateForm.fullName}
        customerEmail={delegateForm.email}
        metadata={{
          eventId: event.id,
          eventSlug: event.slug,
          phone: delegateForm.phone,
        }}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
