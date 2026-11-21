export const COOKIE_NAME = "cesspa_admin_session";

export interface AdminSession {
  id: string;
  email: string;
  name: string;
  role: string;
  exp: number;
}

const AUTH_SECRET =
  process.env.ADMIN_AUTH_SECRET || "cesspa-secretariat-admin-auth-key-2026-v1";

// Base64URL encoding (Edge and Node safe)
export function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Base64URL decoding (Edge and Node safe)
export function fromBase64Url(str: string): Uint8Array {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getSigningKey(secret = AUTH_SECRET): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Creates an HMAC-SHA256 signed session token
 */
export async function signSession(
  session: Omit<AdminSession, "exp">,
  expiresInSeconds = 86400 // 24 hours
): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullSession: AdminSession = { ...session, exp };
  const payloadStr = JSON.stringify(fullSession);
  const payloadB64 = toBase64Url(new TextEncoder().encode(payloadStr));

  const key = await getSigningKey();
  const signatureBytes = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payloadB64)
  );
  const sigB64 = toBase64Url(new Uint8Array(signatureBytes));

  return `${payloadB64}.${sigB64}`;
}

/**
 * Verifies and decodes an HMAC-SHA256 signed session token
 */
export async function verifySession(token: string): Promise<AdminSession | null> {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sigB64] = parts;

  try {
    const key = await getSigningKey();
    const signatureBytes = fromBase64Url(sigB64);
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes as unknown as BufferSource,
      new TextEncoder().encode(payloadB64)
    );
    if (!isValid) return null;

    const payloadJson = new TextDecoder().decode(fromBase64Url(payloadB64));
    const session = JSON.parse(payloadJson) as AdminSession;

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (session.exp && session.exp < now) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}
