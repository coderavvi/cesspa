import { PastEventPhoto } from "@/lib/types";
export type { PastEventPhoto };

export const PAST_EVENT_CATEGORIES = [
  "All",
  "Institutional Engagement",
  "Ministry Collaboration",
  "Academic Partnership",
  "Environmental Safeguards",
  "Regulatory Alignment",
  "Infrastructure Safeguards",
  "Ecological Restoration",
  "Certification Alignment",
] as const;

export const INITIAL_PAST_EVENT_PHOTOS: PastEventPhoto[] = [
  {
    id: "webinar-9th-lecture",
    title: "CESSPA 9th Monthly Lecture Webinar",
    location: "Virtual (Online)",
    date: "28 November 2026",
    image: "/images/events/cesspa-9th-monthly-lecture-webinar.jpg",
    caption:
      "CESSPA 9th Monthly Lecture Webinar on 'Stakeholder Engagement, Community Participation and Environmental Justice: Promoting Inclusive and Sustainable Development' delivered by Dr. Abdullahi Nafiu Zadawa, Deputy Centre Leader, Social Standard Node, SPESSE ATBU Bauchi.",
    category: "Academic Partnership",
    showOnHomepage: true,
  },
  {
    id: "visit-raamp",
    title: "Courtesy Visit to RAAMP National Coordinators",
    location: "NAIC Building, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-raamp.jpg",
    caption:
      "CESSPA courtesy visit the Rural Access and Agricultural Marketing Project (RAAMP) National COORDINATORS at the NAIC building Abuja.",
    category: "Institutional Engagement",
    showOnHomepage: true,
  },
  {
    id: "visit-nsspcp-fmwa",
    title: "Follow-up Visit to Nigerian Social Standard Practice Certificate Program",
    location: "Federal Ministry of Women Affairs, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-nsspcp-fmwa.jpg",
    caption:
      "CESSPA follow-up courtesy visit to the Nigerian Social Standard Practice Certificate program, Federal Ministry of Women Affairs Abuja.",
    category: "Ministry Collaboration",
    showOnHomepage: true,
  },
  {
    id: "visit-spesse-atbu",
    title: "Courtesy Visit to SPESSE Center Leader ATBU",
    location: "ATBU Bauchi",
    date: "November 2026",
    image: "/images/visits/visit-spesse-atbu.jpg",
    caption:
      "CESSPA courtesy visit to the SPESSE Center leader ATBU Bauchi.",
    category: "Academic Partnership",
    showOnHomepage: true,
  },
  {
    id: "visit-naggw",
    title: "Courtesy Visit to National Agency for the Great Green Wall (NAGGW)",
    location: "NAGGW Headquarters, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-naggw.jpg",
    caption:
      "CESSPA courtesy visit to the National Agency for the Great Green Wall (NAGGW), Abuja.",
    category: "Environmental Safeguards",
    showOnHomepage: true,
  },
  {
    id: "visit-nesrea",
    title: "Courtesy Visit to NESREA Headquarters",
    location: "NESREA Headquarters, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-nesrea.jpg",
    caption:
      "CESSPA courtesy visit to National Environmental Standards and Regulations Enforcement Agency (NESREA) Headquarters Abuja.",
    category: "Regulatory Alignment",
    showOnHomepage: true,
  },
  {
    id: "visit-tcn",
    title: "Courtesy Visit to Director Environmental Sustainability, TCN",
    location: "Transmission Company of Nigeria (TCN) Head Office, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-tcn.jpg",
    caption:
      "CESSPA courtesy visit to the Director Environmental Sustainability, Transmission Company of Nigeria, Head office Abuja.",
    category: "Infrastructure Safeguards",
    showOnHomepage: true,
  },
  {
    id: "visit-fmenv-ea",
    title: "Courtesy Visit to Director Environmental Assessment, FMEnv",
    location: "Federal Ministry of Environment, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-fmenv-ea.jpg",
    caption:
      "CESSPA courtesy visit to the Director Environmental Assessment, Federal Ministry of Environment Abuja.",
    category: "Regulatory Alignment",
    showOnHomepage: true,
  },
  {
    id: "visit-fmenv-desertification",
    title: "Courtesy Visit to Director Desertification, Land Degradation & Drought Management",
    location: "Federal Ministry of Environment, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-fmenv-desertification.jpg",
    caption:
      "CESSPA courtesy visit to the Director Desertification, Land Degradation and Drought Management, Federal Ministry of Environment Abuja.",
    category: "Ecological Restoration",
    showOnHomepage: true,
  },
  {
    id: "visit-nescp-fmenv",
    title: "Follow-up Visit to NESCP, Federal Ministry of Environment",
    location: "Federal Ministry of Environment, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-nescp-fmenv.jpg",
    caption:
      "CESSPA follow-up courtesy visit to the National Environmental Standard Certification Program, Federal Ministry of Environment Abuja.",
    category: "Certification Alignment",
    showOnHomepage: true,
  },
];

const STORAGE_KEY_PHOTOS = "cesspa_past_event_photos";
const STORAGE_KEY_HOMEPAGE_ENABLED = "cesspa_homepage_past_events_enabled";
export const PAST_EVENTS_UPDATED_EVENT = "cesspa_past_events_updated";

/**
 * Retrieve past event photos from localStorage or fallback to default initial records.
 */
export function getStoredPastEventPhotos(): PastEventPhoto[] {
  if (typeof window === "undefined") {
    return INITIAL_PAST_EVENT_PHOTOS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PHOTOS);
    if (!raw) return INITIAL_PAST_EVENT_PHOTOS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error("Failed to read past event photos from localStorage", err);
  }
  return INITIAL_PAST_EVENT_PHOTOS;
}

/**
 * Persist past event photos to localStorage and notify all listeners.
 */
export function savePastEventPhotos(photos: PastEventPhoto[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_PHOTOS, JSON.stringify(photos));
    window.dispatchEvent(new Event(PAST_EVENTS_UPDATED_EVENT));
  } catch (err) {
    console.error("Failed to persist past event photos to localStorage", err);
    throw err;
  }
}

/**
 * Check whether the past events gallery section on the homepage is enabled.
 */
export function getHomepagePastEventsEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const val = localStorage.getItem(STORAGE_KEY_HOMEPAGE_ENABLED);
    return val !== "false";
  } catch {
    return true;
  }
}

/**
 * Set whether the past events gallery section on the homepage is enabled.
 */
export function setHomepagePastEventsEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_HOMEPAGE_ENABLED, enabled ? "true" : "false");
    window.dispatchEvent(new Event(PAST_EVENTS_UPDATED_EVENT));
  } catch (err) {
    console.error("Failed to set homepage past events enabled state", err);
  }
}
