"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Award, ShieldCheck, Download, Search, CheckCircle2, QrCode } from "lucide-react";
import { MOCK_CERTIFICATES } from "@/lib/data/mockData";
import { Certificate } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>(MOCK_CERTIFICATES);
  const [selectedCert, setSelectedCert] = useState<Certificate>(MOCK_CERTIFICATES[0]);
  const [search, setSearch] = useState("");

  const filtered = certificates.filter(
    (c) =>
      c.recipientName.toLowerCase().includes(search.toLowerCase()) ||
      c.certificateNumber.toLowerCase().includes(search.toLowerCase()) ||
      c.membershipId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider block">
            ACCREDITATION & ISSUANCE
          </span>
          <h1 className="font-montserrat font-extrabold text-2xl text-slate-900 uppercase mt-0.5">
            Certification & Cryptographic Seals
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Preview, generate, and verify authorized practice credentials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Certificate Registry Table (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-montserrat font-extrabold text-sm text-slate-900 uppercase">
              Issued Certificates
            </h3>
            <span className="text-xs text-slate-400 font-mono">{filtered.length} Valid</span>
          </div>

          <div className="space-y-2">
            {filtered.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all text-xs ${
                  selectedCert.id === cert.id
                    ? "border-forest-green bg-forest-green/5 ring-2 ring-forest-green/20"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 font-montserrat block">
                    {cert.recipientName}
                  </strong>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                    {cert.status}
                  </span>
                </div>
                <p className="font-mono text-[11px] text-forest-green mt-0.5">
                  {cert.certificateNumber}
                </p>
                <p className="text-[11px] text-slate-500">{cert.tier} • {cert.specialisation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Certificate Parchment Preview (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-montserrat font-bold text-slate-500 uppercase">
              Official Parchment Preview
            </span>
            <button
              type="button"
              onClick={() => alert(`Simulated: Generating high-resolution printable PDF certificate for ${selectedCert.recipientName}`)}
              className="px-4 py-2 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" /> Download Printable PDF
            </button>
          </div>

          {/* Certificate Template Card */}
          <div className="relative rounded-3xl p-8 sm:p-12 bg-white border-4 border-heritage-gold/50 shadow-2xl text-center space-y-6 overflow-hidden">
            {/* Subtle background seal watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <div className="relative w-80 h-80">
                <Image src="/images/brand/logo.png" alt="Seal Watermark" fill className="object-contain" />
              </div>
            </div>

            {/* Header: Association & Logo */}
            <div className="relative z-10 flex flex-col items-center space-y-2">
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-heritage-gold">
                <Image src="/images/brand/logo.png" alt="CESSPA Official Seal" fill className="object-cover" />
              </div>
              <div>
                <span className="font-montserrat font-extrabold text-xs text-forest-green tracking-widest uppercase block">
                  CERTIFIED ENVIRONMENTAL AND SOCIAL STANDARDS PROFESSIONALS ASSOCIATION
                </span>
                <span className="text-[10px] text-slate-500 tracking-wide uppercase">
                  FEDERAL REPUBLIC OF NIGERIA
                </span>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="relative z-10 space-y-1">
              <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-widest block">
                CERTIFICATE OF ACCREDITED PRACTICE
              </span>
              <p className="text-xs text-slate-600 italic">This is to certify that</p>
              <h2 className="quote-font text-2xl sm:text-3xl font-bold text-forest-green pt-1">
                {selectedCert.recipientName}
              </h2>
            </div>

            {/* Certification Body Text */}
            <div className="relative z-10 max-w-lg mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                having fulfilled all statutory academic benchmarks, demonstrated requisite field experience,
                and pledged adherence to the <strong>CESSPA Code of Professional Ethics</strong>, is hereby accredited as a
              </p>
              <p className="font-montserrat font-extrabold text-base text-slate-900 uppercase my-2 py-1 bg-sage-mist/60 rounded-xl border border-heritage-gold/30">
                {selectedCert.tier}
              </p>
              <p className="text-xs text-slate-500">
                Authorized practice domain: <strong>{selectedCert.specialisation}</strong>
              </p>
            </div>

            {/* Signatures & Seal Row */}
            <div className="relative z-10 pt-6 border-t border-heritage-gold/30 flex items-end justify-between text-xs">
              <div className="text-left space-y-1">
                <span className="font-cormorant italic text-base font-bold text-forest-green block">
                  Dr. Amina G. Bello
                </span>
                <div className="w-28 h-px bg-slate-400" />
                <span className="text-[10px] text-slate-500 block">President of Council</span>
              </div>

              {/* Gold Embossed Seal Emblem */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-heritage-gold/20 border-2 border-heritage-gold flex items-center justify-center text-heritage-gold font-montserrat font-extrabold text-[10px] uppercase text-center p-1 shadow-inner">
                  OFFICIAL SEAL
                </div>
                <span className="font-mono text-[9px] text-slate-400 mt-1">
                  {selectedCert.certificateNumber}
                </span>
              </div>

              <div className="text-right space-y-1">
                <span className="font-cormorant italic text-base font-bold text-forest-green block">
                  Dr. Joshua M. Akor
                </span>
                <div className="w-28 h-px bg-slate-400 ml-auto" />
                <span className="text-[10px] text-slate-500 block">Secretary General</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
