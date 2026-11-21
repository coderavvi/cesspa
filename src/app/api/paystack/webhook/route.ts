import { NextRequest, NextResponse } from "next/server";
import {
  verifyWebhookSignature,
  recordWebhookEvent,
  RECENT_WEBHOOKS,
  PAYSTACK_CONFIG,
} from "@/lib/paystack";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-paystack-signature");
    const rawBody = await req.text();

    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      // Record failed attempt for auditing
      recordWebhookEvent({
        id: `wh-fail-${Date.now()}`,
        event: "unauthorized_signature",
        reference: "UNKNOWN",
        amount: 0,
        customerEmail: "unknown",
        status: "Rejected (401)",
        receivedAt: new Date().toISOString(),
        signatureValid: false,
        rawPayload: { error: "HMAC-SHA512 signature mismatch" },
      });

      return NextResponse.json(
        { status: false, message: "Invalid Paystack signature." },
        { status: 401 }
      );
    }

    const payload = JSON.parse(rawBody);
    const { event, data } = payload;

    // Log the valid incoming webhook event
    const amountInNaira = data?.amount ? Math.round(data.amount / 100) : 0;
    const ref = data?.reference || "N/A";
    const email = data?.customer?.email || "unknown";

    recordWebhookEvent({
      id: `wh-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      event: event || "unknown.event",
      reference: ref,
      amount: amountInNaira,
      customerEmail: email,
      status: data?.status || "processed",
      receivedAt: new Date().toISOString(),
      signatureValid: true,
      rawPayload: payload,
    });

    // Handle specific events
    switch (event) {
      case "charge.success":
        // In real production, this would credit member dues, issue certificate, or confirm event ticket
        // All statutory allocations (75% National vs 25% Chapter) can be triggered here
        break;

      case "transfer.success":
        // State Chapter remittance confirmation
        break;

      default:
        break;
    }

    return NextResponse.json({
      status: true,
      message: "Webhook processed and recorded successfully.",
      event,
      reference: ref,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error.message || "Failed to process webhook." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    service: "CESSPA Paystack Webhook Handler",
    endpoint: "/api/paystack/webhook",
    environment: "Paystack Test Mode",
    signatureAlgorithm: "HMAC-SHA512 (via x-paystack-signature header)",
    supportedEvents: [
      "charge.success",
      "transfer.success",
      "transfer.failed",
      "invoice.create",
      "invoice.payment_failed",
    ],
    secretKeyConfigured: Boolean(PAYSTACK_CONFIG.secretKey),
    publicKeyConfigured: Boolean(PAYSTACK_CONFIG.publicKey),
    testSimulatorUrl: "/admin/payments/webhook-test",
    totalEventsReceived: RECENT_WEBHOOKS.length,
    recentEvents: RECENT_WEBHOOKS.slice(0, 10),
  });
}
