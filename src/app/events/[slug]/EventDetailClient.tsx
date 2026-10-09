"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Clock,
  Award,
  Users,
  CheckCircle2,
  CreditCard,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { PaymentModal } from "@/components/shared/PaymentModal";
import { EventItem } from "@/lib/types";
import { formatDate, formatNaira } from "@/lib/utils";

export function EventDetailClient({ event }: { event: EventItem }) {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [registered, setRegistered] = useState(false);

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
            <span className="text-sage-mist text-xs">
              Accredited for {event.cpdPoints} CPD Points
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
                <span>Attendance certificate and CPD log endorsed by the CESSPA Practice Directorate.</span>
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {event.speakers.map((spk, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-sage-mist/50 border border-brand-border text-center space-y-2">
                      <div className="w-14 h-14 mx-auto rounded-full bg-forest-green text-white flex items-center justify-center font-montserrat font-bold text-base shadow-xs">
                        {spk.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-montserrat font-bold text-sm text-ink-dark">{spk.name}</h4>
                        <p className="text-[11px] text-forest-green font-medium">{spk.role}</p>
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
                    {event.fee === 0 ? "Free / RSVP" : formatNaira(event.fee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Capacity:</span>
                  <span>{event.capacity || 500} Delegates</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Registered to Date:</span>
                  <span className="font-semibold text-leaf-green">{event.registeredCount || 340} Confirmed</span>
                </div>
              </div>

              {registered ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700 mx-auto" />
                  <p className="text-xs font-bold text-emerald-800">Registration Confirmed!</p>
                  <p className="text-[11px] text-ink-body">
                    Your delegate badge ticket reference has been logged.
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPaymentOpen(true)}
                  className="w-full py-4 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4 text-heritage-gold" />
                  {event.fee === 0 ? "Confirm RSVP Registration" : "Purchase Delegate Pass"}
                </button>
              )}

              <div className="pt-2 text-center text-[11px] text-ink-muted">
                Group bookings & corporate delegations: <a href="mailto:events@cesspa.org.ng" className="text-forest-green underline">events@cesspa.org.ng</a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        title={event.title}
        purpose="Conference Ticket"
        amount={event.fee || 1000}
        customerName="Practitioner Delegate"
        customerEmail="delegate@cesspa.org.ng"
        metadata={{
          eventSlug: event.slug,
          cpdPoints: event.cpdPoints,
        }}
        onSuccess={() => {
          setRegistered(true);
          setIsPaymentOpen(false);
        }}
      />
    </div>
  );
}
