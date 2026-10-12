"use client";

import React, { useState } from "react";
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  FileText,
  Download,
  X,
  ShieldCheck,
} from "lucide-react";
import { MOCK_APPLICATIONS } from "@/lib/data/mockData";
import { Application } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const handleUpdateStatus = (id: string, newStatus: Application["status"]) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider block">
            EVALUATION QUEUE
          </span>
          <h1 className="font-montserrat font-extrabold text-2xl text-slate-900 uppercase mt-0.5">
            Membership Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Dossiers submitted for peer evaluation by the Zonal Accreditation Panels.
          </p>
        </div>
      </div>

      {/* Applications Review Queue Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-montserrat uppercase text-[10px]">
                <th className="py-3 px-4">Application #</th>
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">Applied Category</th>
                <th className="py-3 px-4">Specialisation</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Panel Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-mono font-bold text-forest-green">
                    {app.applicationNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <strong className="text-slate-900 block">{app.applicantName}</strong>
                    <span className="text-[11px] text-slate-400">{app.email}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{app.tier}</td>
                  <td className="py-3.5 px-4 max-w-[200px] truncate">{app.specialisation}</td>
                  <td className="py-3.5 px-4 text-slate-500">{formatDate(app.submittedDate)}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-montserrat font-bold uppercase ${
                        app.status === "Approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : app.status === "Rejected"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedApp(app)}
                      className="px-3 py-1 rounded-lg bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-[10px] uppercase transition-colors"
                    >
                      Review Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Dossier Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-forest-green">
                  {selectedApp.applicationNumber}
                </span>
                <h3 className="font-montserrat font-extrabold text-xl text-slate-900">
                  {selectedApp.applicantName}
                </h3>
                <span className="text-xs text-slate-500">
                  Applying for <strong>{selectedApp.tier}</strong>
                </span>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Applicant Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 space-y-0.5">
                <span className="text-slate-400 text-[10px]">Email Address:</span>
                <p className="font-mono font-medium text-slate-900">{selectedApp.email}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 space-y-0.5">
                <span className="text-slate-400 text-[10px]">Phone Line:</span>
                <p className="font-medium text-slate-900">{selectedApp.phone}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 space-y-0.5">
                <span className="text-slate-400 text-[10px]">Credentials & Experience:</span>
                <p className="font-medium text-slate-900">{selectedApp.qualifications}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 space-y-0.5">
                <span className="text-slate-400 text-[10px]">Submission Date:</span>
                <p className="font-medium text-slate-900">{formatDate(selectedApp.submittedDate)}</p>
              </div>
            </div>

            {/* Documents Inspection */}
            <div>
              <span className="font-montserrat font-bold text-xs uppercase text-slate-700 block mb-2">
                Attached Verification Dossier ({selectedApp.documents.length} files):
              </span>
              <div className="space-y-2">
                {selectedApp.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-forest-green" />
                      <span className="font-medium text-slate-900">{doc.name}</span>
                      <span className="text-slate-400 font-mono text-[11px]">({doc.size})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`Opening preview for document: ${doc.name}`)}
                      className="text-forest-green hover:underline font-bold text-[11px]"
                    >
                      Preview File
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel Adjudication Controls */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Current Status: <strong className="uppercase text-slate-800">{selectedApp.status}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedApp.id, "Information Requested")}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 font-montserrat font-bold text-xs uppercase hover:bg-slate-50"
                >
                  Request Info
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedApp.id, "Rejected")}
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-montserrat font-bold text-xs uppercase"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedApp.id, "Approved")}
                  className="px-4 py-2 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase shadow-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve & Enrol
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
