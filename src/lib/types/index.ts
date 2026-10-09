export type MembershipStatus = "Active" | "Pending" | "Lapsed" | "Suspended";

export type GeopoliticalZone =
  | "North Central"
  | "North East"
  | "North West"
  | "South East"
  | "South South"
  | "South West";

export interface Member {
  id: string;
  membershipId: string;
  fullName: string;
  email: string;
  phone: string;
  tier: "Student" | "Associate" | "Certified Professional" | "Fellow" | "Corporate";
  status: MembershipStatus;
  specialisation: string[];
  zone: GeopoliticalZone;
  state: string;
  organisation: string;
  qualification: string;
  joinedDate: string;
  expiryDate: string;
  verified: boolean;
  avatarUrl?: string;
  bio?: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  code: "student" | "associate" | "certified" | "fellow" | "corporate";
  annualFee: number;
  currency: string;
  period: string;
  tagline: string;
  description: string;
  isPopular?: boolean;
  eligibility: string[];
  benefits: string[];
}

export interface Chapter {
  id: string;
  name: string;
  zone: GeopoliticalZone;
  statesCovered: string[];
  coordinator: string;
  coordinatorEmail: string;
  coordinatorPhone: string;
  meetingSchedule: string;
  memberCount: number;
  status: "Active" | "In Formation";
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: "Conference" | "Webinar" | "Workshop" | "Chapter Event";
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  venueName?: string;
  fee: number;
  cpdPoints: number;
  description: string;
  agenda?: { time: string; topic: string; speaker: string }[];
  speakers?: { name: string; role: string; org: string; avatarUrl?: string }[];
  featured?: boolean;
  capacity?: number;
  registeredCount?: number;
  bannerImage?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: "Policy & Standards" | "Association News" | "Case Study" | "Technical Guide";
  summary: string;
  content: string;
  author: string;
  authorRole: string;
  publishDate: string;
  readTime: string;
  coverImage?: string;
  featured?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  category: "ESIA Guidelines" | "Technical Brief" | "Policy Paper" | "Standard Operating Procedures";
  pages: number;
  publishedYear: number;
  downloadUrl: string;
  summary: string;
  fileSize: string;
  coverImage?: string;
}

export interface SponsorTier {
  tier: "Platinum" | "Gold" | "Bronze";
  amount: number;
  benefits: string[];
  color: string;
}

export interface PaymentTransaction {
  id: string;
  reference: string;
  memberId?: string;
  memberName: string;
  email: string;
  purpose: "Membership Dues" | "Registration Fee" | "Conference Ticket" | "Donation" | "Brochure Access";
  amount: number;
  method: "Card" | "Bank Transfer" | "USSD";
  status: "Successful" | "Pending" | "Failed";
  date: string;
}

export interface Application {
  id: string;
  applicationNumber: string;
  applicantName: string;
  email: string;
  phone: string;
  tier: string;
  specialisation: string;
  qualifications: string;
  status: "Pending Review" | "Under Evaluation" | "Approved" | "Information Requested" | "Rejected";
  submittedDate: string;
  documents: { name: string; type: string; size: string }[];
  reviewerNotes?: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  recipientName: string;
  membershipId: string;
  tier: string;
  specialisation: string;
  issueDate: string;
  expiryDate: string;
  status: "Valid" | "Expired" | "Revoked";
}
