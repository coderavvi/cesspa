export const COOKIE_NAME = "cesspa_admin_session";

export const DEFAULT_ADMIN_EMAIL = "admin@cesspa.org.ng";
export const DEFAULT_PASSWORD_DISPLAY = "Admin@2026!";
export const DEFAULT_ADMIN_NAME = "Secretariat Administrator";
export const DEFAULT_ADMIN_ROLE = "Super Administrator";

export interface StoredCredentials {
  email: string;
  name: string;
  role: string;
  salt: string;
  passwordHash: string;
  updatedAt: string;
}

export const DEFAULT_CREDENTIALS: StoredCredentials = {
  email: DEFAULT_ADMIN_EMAIL,
  name: DEFAULT_ADMIN_NAME,
  role: DEFAULT_ADMIN_ROLE,
  salt: "a4b5c6d7e8f90123456789abcdef0123",
  passwordHash: "c4f0baecb67441f033f2ce66dde51ff1fdae20655a9f110f060e3cb7e89e0e9b",
  updatedAt: "2026-11-21T00:00:00.000Z",
};
