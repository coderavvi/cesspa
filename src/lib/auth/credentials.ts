import fs from "fs";
import path from "path";
import {
  DEFAULT_CREDENTIALS,
  StoredCredentials,
  DEFAULT_PASSWORD_DISPLAY,
} from "./constants";

export { DEFAULT_CREDENTIALS, DEFAULT_PASSWORD_DISPLAY };
export type { StoredCredentials };

const CREDENTIALS_FILE = path.join(
  process.cwd(),
  "src",
  "lib",
  "data",
  "adminCredentials.json"
);

export function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function fromHex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

/**
 * PBKDF2 with 100,000 iterations of SHA-256
 */
export async function hashPasswordWithSalt(
  password: string,
  saltHex: string
): Promise<string> {
  const enc = new TextEncoder();
  const saltBytes = fromHex(saltHex);
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBytes as unknown as BufferSource,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );
  return toHex(new Uint8Array(derivedBits));
}

export function getCredentials(): StoredCredentials {
  try {
    if (fs.existsSync(CREDENTIALS_FILE)) {
      const raw = fs.readFileSync(CREDENTIALS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && parsed.email && parsed.passwordHash && parsed.salt) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Failed to read credentials file, fallback to defaults:", err);
  }
  return DEFAULT_CREDENTIALS;
}

export function saveCredentials(creds: StoredCredentials) {
  try {
    const dir = path.dirname(CREDENTIALS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(creds, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write credentials file:", err);
  }
}

export async function verifyAdminCredentials(
  email: string,
  plainPassword: string
): Promise<{
  success: boolean;
  user?: { email: string; name: string; role: string };
}> {
  const current = getCredentials();
  if (email.trim().toLowerCase() !== current.email.toLowerCase()) {
    return { success: false };
  }
  const computedHash = await hashPasswordWithSalt(plainPassword, current.salt);
  if (computedHash === current.passwordHash) {
    return {
      success: true,
      user: {
        email: current.email,
        name: current.name,
        role: current.role,
      },
    };
  }
  return { success: false };
}

export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const current = getCredentials();

  // Validate current password
  const currentHash = await hashPasswordWithSalt(currentPassword, current.salt);
  if (currentHash !== current.passwordHash) {
    return { success: false, error: "The current password you provided is incorrect." };
  }

  // Validate new password rules
  if (!newPassword || newPassword.length < 8) {
    return {
      success: false,
      error: "New password must be at least 8 characters in length.",
    };
  }

  if (newPassword === currentPassword) {
    return {
      success: false,
      error: "New password must be different from your current password.",
    };
  }

  // Generate new 16-byte cryptographic salt and compute hash
  const newSaltBytes = crypto.getRandomValues(new Uint8Array(16));
  const newSaltHex = toHex(newSaltBytes);
  const newPasswordHash = await hashPasswordWithSalt(newPassword, newSaltHex);

  const updated: StoredCredentials = {
    ...current,
    salt: newSaltHex,
    passwordHash: newPasswordHash,
    updatedAt: new Date().toISOString(),
  };

  saveCredentials(updated);
  return { success: true };
}

export function resetDemoCredentials(): StoredCredentials {
  saveCredentials(DEFAULT_CREDENTIALS);
  return DEFAULT_CREDENTIALS;
}
