import {
  MOCK_MEMBERS,
  MOCK_TIERS,
  MOCK_CHAPTERS,
  MOCK_EVENTS,
  MOCK_NEWS,
  MOCK_PUBLICATIONS,
  MOCK_PAYMENTS,
  MOCK_APPLICATIONS,
  MOCK_CERTIFICATES,
} from "../data/mockData";
import {
  Member,
  MembershipTier,
  Chapter,
  EventItem,
  NewsArticle,
  Publication,
  PaymentTransaction,
  Application,
  Certificate,
} from "../types";

export const memberService = {
  async getAll(): Promise<Member[]> {
    return MOCK_MEMBERS;
  },

  async getById(id: string): Promise<Member | null> {
    return MOCK_MEMBERS.find((m) => m.id === id || m.membershipId === id) || null;
  },

  async search(query: string, zone?: string, tier?: string): Promise<Member[]> {
    return MOCK_MEMBERS.filter((m) => {
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        m.fullName.toLowerCase().includes(q) ||
        m.membershipId.toLowerCase().includes(q) ||
        m.state.toLowerCase().includes(q) ||
        m.specialisation.some((s) => s.toLowerCase().includes(q));

      const matchesZone = !zone || zone === "All" || m.zone === zone;
      const matchesTier = !tier || tier === "All" || m.tier.includes(tier);

      return matchesQuery && matchesZone && matchesTier;
    });
  },
};

export const tierService = {
  async getAll(): Promise<MembershipTier[]> {
    return MOCK_TIERS;
  },

  async getByCode(code: string): Promise<MembershipTier | null> {
    return MOCK_TIERS.find((t) => t.code === code) || null;
  },
};

export const chapterService = {
  async getAll(): Promise<Chapter[]> {
    return MOCK_CHAPTERS;
  },

  async getByZone(zone: string): Promise<Chapter[]> {
    return MOCK_CHAPTERS.filter((c) => c.zone === zone);
  },
};

export const eventService = {
  async getAll(): Promise<EventItem[]> {
    return MOCK_EVENTS;
  },

  async getBySlug(slug: string): Promise<EventItem | null> {
    return MOCK_EVENTS.find((e) => e.slug === slug) || null;
  },
};

export const newsService = {
  async getAll(): Promise<NewsArticle[]> {
    return MOCK_NEWS;
  },

  async getBySlug(slug: string): Promise<NewsArticle | null> {
    return MOCK_NEWS.find((n) => n.slug === slug) || null;
  },
};

export const publicationService = {
  async getAll(): Promise<Publication[]> {
    return MOCK_PUBLICATIONS;
  },
};

export const paymentService = {
  async getAll(): Promise<PaymentTransaction[]> {
    return MOCK_PAYMENTS;
  },

  async initializePayment(params: {
    amount: number;
    email: string;
    purpose: string;
    reference?: string;
  }): Promise<{ status: "success"; reference: string; authorizationUrl: string }> {
    const reference =
      params.reference ||
      `CESSPA-SIM-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    return {
      status: "success",
      reference,
      authorizationUrl: `https://checkout.cesspa.org.ng/mock/${reference}`,
    };
  },

  async verifyPayment(reference: string): Promise<{ verified: boolean; message: string }> {
    return {
      verified: true,
      message: `Transaction ${reference} verified successfully via Sandbox simulation.`,
    };
  },
};

export const applicationService = {
  async getAll(): Promise<Application[]> {
    return MOCK_APPLICATIONS;
  },

  async submit(application: Partial<Application>): Promise<Application> {
    const newApp: Application = {
      id: `app-${Date.now()}`,
      applicationNumber: `APP-2026-${Math.floor(Math.random() * 9000 + 1000)}`,
      applicantName: application.applicantName || "Anonymous Applicant",
      email: application.email || "",
      phone: application.phone || "",
      tier: application.tier || "Certified Professional",
      specialisation: application.specialisation || "ESIA Safeguards",
      qualifications: application.qualifications || "Pending Review",
      status: "Pending Review",
      submittedDate: new Date().toISOString().split("T")[0],
      documents: application.documents || [],
    };
    return newApp;
  },
};

export const certificateService = {
  async getAll(): Promise<Certificate[]> {
    return MOCK_CERTIFICATES;
  },

  async verify(query: string): Promise<Certificate | null> {
    const q = query.trim().toUpperCase();
    return (
      MOCK_CERTIFICATES.find(
        (c) =>
          c.certificateNumber.toUpperCase() === q ||
          c.membershipId.toUpperCase() === q ||
          c.recipientName.toUpperCase().includes(q)
      ) || null
    );
  },
};
