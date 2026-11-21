import crypto from "crypto";

export const PAYSTACK_CONFIG = {
  publicKey:
    process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ||
    "pk_test_fc5d7f34f9311943a5d53f8fd30e8d60fd359d3b",
  secretKey:
    process.env.PAYSTACK_SECRET_KEY ||
    "sk_test_e9f65ce879fc20af15d8335704a8a27fc5088877",
  baseUrl: "https://api.paystack.co",
};

export interface PaystackInitParams {
  email: string;
  amount: number; // in Naira
  reference?: string;
  callbackUrl?: string;
  metadata?: Record<string, any>;
  channels?: string[];
}

export interface PaystackInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: "success" | "failed" | "abandoned";
    reference: string;
    amount: number; // in kobo
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    customer: {
      id: number;
      first_name?: string;
      last_name?: string;
      email: string;
      customer_code: string;
      phone?: string;
    };
    metadata?: Record<string, any>;
  };
}

export interface WebhookLogItem {
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

// In-memory ring buffer of recent webhook events for monitoring and inspection
export const RECENT_WEBHOOKS: WebhookLogItem[] = [];

export function recordWebhookEvent(item: WebhookLogItem) {
  RECENT_WEBHOOKS.unshift(item);
  if (RECENT_WEBHOOKS.length > 50) {
    RECENT_WEBHOOKS.pop();
  }
}

/**
 * Initialize a transaction on Paystack
 */
export async function initializeTransaction(
  params: PaystackInitParams
): Promise<PaystackInitResponse> {
  const reference =
    params.reference || `CESSPA-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;

  const customFields = [
    { display_name: "Payer Name", variable_name: "customer_name", value: params.metadata?.customerName || "CESSPA Member" },
    { display_name: "Purpose", variable_name: "purpose", value: params.metadata?.purpose || "General Payment" },
    ...(params.metadata?.membershipId ? [{ display_name: "Membership ID", variable_name: "membership_id", value: params.metadata.membershipId }] : []),
    ...(params.metadata?.tier ? [{ display_name: "Membership Grade", variable_name: "membership_tier", value: params.metadata.tier }] : []),
  ];

  const body = {
    email: params.email,
    amount: Math.round(params.amount * 100), // convert Naira to kobo
    reference,
    callback_url: params.callbackUrl,
    metadata: {
      ...params.metadata,
      custom_fields: customFields,
    },
    channels: params.channels || ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
  };

  const res = await fetch(`${PAYSTACK_CONFIG.baseUrl}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_CONFIG.secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Paystack initialization failed with status ${res.status}`);
  }

  return data;
}

/**
 * Verify a transaction on Paystack by its reference
 */
export async function verifyTransaction(reference: string): Promise<PaystackVerifyResponse> {
  const res = await fetch(
    `${PAYSTACK_CONFIG.baseUrl}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_CONFIG.secretKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Paystack verification failed with status ${res.status}`);
  }

  return data;
}

/**
 * Verify Paystack webhook HMAC-SHA512 signature
 */
export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;
  try {
    const hash = crypto
      .createHmac("sha512", PAYSTACK_CONFIG.secretKey)
      .update(rawBody)
      .digest("hex");
    return hash === signature;
  } catch {
    return false;
  }
}

/**
 * Compute HMAC-SHA512 signature for a payload (used for webhook test simulation)
 */
export function computeWebhookSignature(rawBody: string): string {
  return crypto
    .createHmac("sha512", PAYSTACK_CONFIG.secretKey)
    .update(rawBody)
    .digest("hex");
}
