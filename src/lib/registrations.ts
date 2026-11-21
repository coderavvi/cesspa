import { EventRegistration } from "@/lib/types";
import { MOCK_EVENT_REGISTRATIONS } from "@/lib/data/mockData";

export const REGISTRATIONS_STORAGE_KEY = "cesspa_event_registrations";

/**
 * Retrieve all registered attendees from localStorage, falling back to mock records
 */
export function getStoredRegistrations(): EventRegistration[] {
  if (typeof window === "undefined") return MOCK_EVENT_REGISTRATIONS;
  try {
    const raw = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return MOCK_EVENT_REGISTRATIONS;
}

/**
 * Persist registrations to localStorage and notify all listeners
 */
export function saveRegistrations(items: EventRegistration[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("cesspa_registrations_updated"));
  } catch {
    // ignore
  }
}

/**
 * Get all registered attendees for a specific event
 */
export function getRegistrationsForEvent(eventId: string): EventRegistration[] {
  const all = getStoredRegistrations();
  return all.filter((r) => r.eventId === eventId);
}

/**
 * Record a new attendee registration
 */
export function addEventRegistration(
  reg: Omit<EventRegistration, "id" | "registeredAt">
): EventRegistration {
  const all = getStoredRegistrations();
  const newReg: EventRegistration = {
    ...reg,
    id: `reg-${Date.now()}`,
    registeredAt: new Date().toISOString().replace("T", " ").slice(0, 16),
  };
  const updated = [newReg, ...all];
  saveRegistrations(updated);
  return newReg;
}

/**
 * Update check-in status of an attendee
 */
export function updateRegistrationStatus(
  id: string,
  status: EventRegistration["status"]
): EventRegistration[] {
  const all = getStoredRegistrations();
  const updated = all.map((r) => (r.id === id ? { ...r, status } : r));
  saveRegistrations(updated);
  return updated;
}
