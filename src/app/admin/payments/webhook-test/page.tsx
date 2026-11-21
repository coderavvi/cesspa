"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Send,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Code,
  Terminal,
} from "lucide-react";
import { formatNaira } from "@/lib/utils";

interface WebhookLog {
  id: string;
  event: string;
  reference: string;
  amount: number;
  customerEmail: string;
  status: string;
  receivedAt: string;
  signatureValid: boolean;
  rawPayload: any;
}

export default function WebhookTestPage() {
  const [copied, setCopied] = useState(false);
  const [eventData, setEventData] = useState({
    event: "charge.success",
    email: "practitioner@cesspa.org.ng",
    amount: "10000",
    purpose: "Membership Dues",
    reference: "CESSPA-WH-883901",
    useValidSignature: true,
  });

  const [loading, setLoading] = useState(false);
  const [responseLog, setResponseLog] = useState<{
    status: number;
    signature: string;
    payload: any;
    response: any;
  } | null>(null);

  const [recentLogs, setRecentLogs] = useState<WebhookLog[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const webhookUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/api/paystack/webhook`
      : "http://localhost:3000/api/paystack/webhook";

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchRecentLogs = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/paystack/webhook");
      const json = await res.json();
      if (json.recentEvents) {
        setRecentLogs(json.recentEvents);
      }
    } catch {
      // ignore
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setEventData((prev) => ({
      ...prev,
      reference: `CESSPA-WH-${Math.floor(100000 + Math.random() * 900000)}`,
    }));
    fetchRecentLogs();
  }, []);

  const handleSendTestWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseLog(null);

    const amountInKobo = Math.round(Number(eventData.amount) * 100);
    const payload = {
      event: eventData.event,
      data: {
        id: Math.floor(Math.random() * 9000000 + 1000000),
        domain: "test",
        status: eventData.event === "charge.success" ? "success" : "failed",
        reference: eventData.reference,
        amount: amountInKobo,
        message: null,
        gateway_response: "Approved",
        paid_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        channel: "card",
        currency: "NGN",
        ip_address: "127.0.0.1",
        metadata: {
          purpose: eventData.purpose,
          custom_fields: [{ display_name: "Purpose", variable_name: "purpose", value: eventData.purpose }],
        },
        customer: {
          id: 881234,
          first_name: "Valued",
          last_name: "Member",
          email: eventData.email,
          customer_code: "CUS_test123",
          phone: "+2348030001122",
        },
      },
    };

    const rawBody = JSON.stringify(payload);

    try {
      // We will compute the signature or tamper with it if testing invalid signature
      let signature = "";
      if (eventData.useValidSignature) {
        // Fetch signature from helper endpoint or compute on client if needed
        // For security, our test dispatcher endpoint computes the HMAC
        const sigRes = await fetch("/api/paystack/test-signature", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rawBody }),
        });
        const sigJson = await sigRes.json();
        signature = sigJson.signature;
      } else {
        signature = "tampered_invalid_signature_hex_1234567890abcdef";
      }

      const res = await fetch("/api/paystack/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-paystack-signature": signature,
        },
        body: rawBody,
      });

      const resJson = await res.json();
      setResponseLog({
        status: res.status,
        signature,
        payload,
        response: resJson,
      });

      // Refresh log
      await fetchRecentLogs();

      // Regenerate reference for next test
      setEventData((prev) => ({
        ...prev,
        reference: `CESSPA-WH-${Date.now().toString().slice(-6)}`,
      }));
    } catch (err: any) {
      setResponseLog({
        status: 500,
        signature: "N/A",
        payload,
        response: { error: err.message },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/payments"
            className="p-1 rounded-md text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
              Paystack Webhook Test Console
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Verify webhook event listeners, HMAC-SHA512 cryptographic signatures, and payment notifications
            </p>
          </div>
        </div>

        <a
          href="https://dashboard.paystack.com/#/settings/developer"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
        >
          <span>Paystack Developer Dashboard</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

      {/* Webhook Endpoint Card */}
      <div className="p-5 rounded-lg border border-slate-200 bg-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider font-mono">
                Live Webhook URL
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Add this endpoint to your Paystack Dashboard (Settings &gt; Developer &gt; Webhook URL).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <code className="px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-xs font-mono text-[#0B4A2B] font-semibold break-all">
              {webhookUrl}
            </code>
            <button
              type="button"
              onClick={handleCopyUrl}
              className="px-3 py-1.5 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy URL"}</span>
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Secret Key</span>
            <span className="font-mono font-medium text-slate-800">sk_test_e9f65c...088877</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Public Key</span>
            <span className="font-mono font-medium text-slate-800">pk_test_fc5d7f...0e8d60</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Signature Header</span>
            <span className="font-mono font-medium text-slate-800">x-paystack-signature (HMAC-SHA512)</span>
          </div>
        </div>
      </div>

      {/* Main Split: Simulator on Left (6 cols), Live Output on Right (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Test Dispatcher Form */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-lg border border-slate-200 bg-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#0B4A2B]" />
                Simulate Webhook Dispatch
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-[#0B4A2B] border border-emerald-200">
                Sandbox Mode
              </span>
            </div>

            <form onSubmit={handleSendTestWebhook} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Event Type</label>
                <select
                  value={eventData.event}
                  onChange={(e) => setEventData({ ...eventData, event: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B] bg-white font-mono"
                >
                  <option value="charge.success">charge.success (Payment Successful)</option>
                  <option value="transfer.success">transfer.success (Chapter Remittance Sent)</option>
                  <option value="invoice.create">invoice.create (Dues Invoice Generated)</option>
                  <option value="invoice.payment_failed">invoice.payment_failed (Payment Failed)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Customer Email</label>
                  <input
                    type="email"
                    required
                    value={eventData.email}
                    onChange={(e) => setEventData({ ...eventData, email: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Amount (₦)</label>
                  <input
                    type="number"
                    required
                    value={eventData.amount}
                    onChange={(e) => setEventData({ ...eventData, amount: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Purpose</label>
                  <select
                    value={eventData.purpose}
                    onChange={(e) => setEventData({ ...eventData, purpose: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B] bg-white"
                  >
                    <option value="Membership Dues">Membership Dues</option>
                    <option value="Registration Fee">Registration Fee</option>
                    <option value="Conference Ticket">Conference Ticket</option>
                    <option value="Donation">Endowment Donation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Transaction Reference</label>
                  <input
                    type="text"
                    required
                    value={eventData.reference}
                    onChange={(e) => setEventData({ ...eventData, reference: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>
              </div>

              {/* Signature Test Option */}
              <div className="p-3 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="block font-medium text-slate-800">Sign with Valid HMAC-SHA512</span>
                  <span className="block text-[11px] text-slate-500">
                    {eventData.useValidSignature
                      ? "Legitimate Paystack secret key signature"
                      : "Tampered signature (will verify rejection 401)"}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={eventData.useValidSignature}
                  onChange={(e) => setEventData({ ...eventData, useValidSignature: e.target.checked })}
                  className="w-4 h-4 text-[#0B4A2B] rounded border-slate-300 focus:ring-[#0B4A2B]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? "Transmitting Webhook..." : "Send Test Webhook to Endpoint"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Response Inspector */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-lg border border-slate-200 bg-white space-y-4 min-h-[380px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
                <Code className="w-4 h-4 text-[#0B4A2B]" />
                Webhook Execution Result
              </h2>
              {responseLog && (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold ${
                    responseLog.status === 200
                      ? "bg-emerald-50 text-[#0B4A2B] border border-emerald-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  HTTP {responseLog.status} {responseLog.status === 200 ? "OK" : "ERROR"}
                </span>
              )}
            </div>

            {responseLog ? (
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Signature Header Generated
                  </span>
                  <div className="p-2 rounded-md bg-slate-50 border border-slate-200 font-mono text-[10px] text-slate-700 break-all select-all">
                    {responseLog.signature}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Endpoint Response Body
                  </span>
                  <pre className="p-3 rounded-md bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-48 leading-relaxed">
                    {JSON.stringify(responseLog.response, null, 2)}
                  </pre>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Sent Payload
                  </span>
                  <pre className="p-3 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[10px] overflow-x-auto max-h-36 leading-relaxed">
                    {JSON.stringify(responseLog.payload, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="py-24 text-center text-slate-400 text-xs">
                Fill the form on the left and click &quot;Send Test Webhook&quot; to inspect real-time endpoint execution.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Webhook Event Logs */}
      <div className="p-5 rounded-lg border border-slate-200 bg-white space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="font-heading font-bold text-sm text-slate-900">
              Webhook Event Audit Trail
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Live audit of incoming requests received by /api/paystack/webhook
            </p>
          </div>

          <button
            type="button"
            onClick={fetchRecentLogs}
            disabled={refreshing}
            className="px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 inline-flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${refreshing ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        {recentLogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-medium">
                  <th className="py-2 px-3">Received At</th>
                  <th className="py-2 px-3">Event</th>
                  <th className="py-2 px-3">Reference</th>
                  <th className="py-2 px-3">Customer</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Signature Verification</th>
                  <th className="py-2 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-3 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                      {new Date(log.receivedAt).toLocaleTimeString()}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[#0B4A2B] font-semibold">
                      {log.event}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">
                      {log.reference}
                    </td>
                    <td className="py-2.5 px-3 text-slate-800">
                      {log.customerEmail}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-medium">
                      {log.amount > 0 ? formatNaira(log.amount) : "—"}
                    </td>
                    <td className="py-2.5 px-3">
                      {log.signatureValid ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#0B4A2B] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>HMAC Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-rose-600 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>Invalid Signature</span>
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-slate-400">
            No webhook events recorded yet. Send a test webhook above or make a payment through Paystack to record events.
          </div>
        )}
      </div>
    </div>
  );
}
