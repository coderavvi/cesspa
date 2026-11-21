"use client";

import React, { useState } from "react";
import { Download, Search, Check, QrCode } from "lucide-react";
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
            Accreditation &amp; Certificates
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Appendix III: Digital Governance • Statutory Registry of Certified Practice Seals
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert("Simulated: Exporting full certificate verification ledger...")}
            className="px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" /> Export Registry
          </button>
        </div>
      </div>

      {/* Main Workspace (Asymmetric Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Certificate List (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, cert #, or member ID..."
              className="w-full pl-8 pr-3 py-1.5 rounded-md border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B4A2B]"
            />
          </div>

          <div className="divide-y divide-slate-100 border-y border-slate-200">
            {filtered.map((cert) => {
              const isSelected = selectedCert.id === cert.id;
              return (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className={`py-3 px-2 cursor-pointer transition-colors text-xs ${
                    isSelected ? "bg-slate-100/70" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{cert.recipientName}</div>
                      <div className="font-mono text-[11px] text-[#0B4A2B]">{cert.certificateNumber}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        {cert.status}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5">{cert.tier}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Certificate Inspector & Digital Credential (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 bg-white border border-slate-200 rounded-lg space-y-5">
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#0B4A2B] font-bold block">
                  CERTIFICATE OF ACCREDITATION
                </span>
                <h3 className="font-heading font-bold text-base text-slate-900 mt-0.5">
                  {selectedCert.recipientName}
                </h3>
                <div className="font-mono text-xs text-slate-500 mt-0.5">
                  ID: {selectedCert.membershipId} • Cert: {selectedCert.certificateNumber}
                </div>
              </div>

              <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-center">
                <QrCode className="w-6 h-6 text-slate-700" />
              </div>
            </div>

            <div className="space-y-2 text-xs divide-y divide-slate-100 text-slate-700">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Membership Grade:</span>
                <span className="font-semibold text-slate-900">{selectedCert.tier}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Domain / Node:</span>
                <span>{selectedCert.specialisation}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Issuing Body:</span>
                <span>CESSPA National Secretariat, Abuja</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Valid Through:</span>
                <span>{formatDate(selectedCert.expiryDate)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Legal Authority:</span>
                <span>CAMA 2020 • SPESSE Node</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-[#0B4A2B] font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Registry Verification Active
              </span>
              <button
                type="button"
                onClick={() => alert(`Simulated: Generating PDF credential for ${selectedCert.recipientName}`)}
                className="px-3 py-1.5 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}