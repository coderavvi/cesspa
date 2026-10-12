export const BRAND = {
  name: "CESSPA",
  fullName: "Certified Environmental and Social Standards Professionals Association",
  shortDescription:
    "The unified professional body for Environmental & Social (E&S) standards professionals in Nigeria.",
  taglines: {
    primary: "Let's raise the standard.",
    secondary: "Assess first. Mitigate early. Develop responsibly.",
    tertiary: "Enhancing Standards for Sustainability",
  },
  coreMessage:
    "Environmental sustainability must include people. Sustainable development protects both the environment and the people who depend on it.",
  formula: "Peace + Participation + Protection + Respect = More Responsible Development",
  contact: {
    email: "secretariat@cesspa.org.ng",
    phone: "+234 (0) 803 237 7721 / +234 (0) 9 291 4400",
    address: "Plot 742, Cadastral Zone B04, Jabi District, Abuja, FCT, Nigeria",
    website: "https://www.cesspa.org.ng",
    socials: {
      linkedin: "https://linkedin.com/company/cesspa_ng",
      twitter: "https://x.com/cesspa_ng",
      facebook: "https://facebook.com/cesspa_ng",
      instagram: "https://instagram.com/cesspanigeria",
    },
  },
  colors: {
    forestGreen: "#0B4A2B",
    deepEmerald: "#08331F",
    leafGreen: "#2E7D32",
    leafAccent: "#6DAF3F",
    heritageGold: "#B8892B",
    heritageGoldSoft: "#D9B45C",
    ivory: "#F7F9F5",
    sageMist: "#EEF3EA",
    white: "#FFFFFF",
    inkDark: "#0E2A1C",
    inkBody: "#3E5347",
    inkMuted: "#7A8C82",
    border: "#DCE6D8",
    navyBlue: "#1A3A5C",
  },
};

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About CESSPA", href: "/about" },
      { label: "Governing Board", href: "/about/board" },
      { label: "Executive Council", href: "/about/executives" },
      { label: "President's Message", href: "/about/presidents-message" },
      { label: "Code of Ethics", href: "/about/code-of-ethics" },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    children: [
      { label: "Membership Grades", href: "/membership" },
      { label: "Practitioner Directory", href: "/membership/directory" },
      { label: "Register New Member", href: "/membership/register" },
      { label: "Pay Annual Dues", href: "/membership/pay-dues" },
      { label: "Membership Brochure", href: "/membership/brochure" },
    ],
  },
  {
    label: "Events and Programs",
    href: "/events",
    children: [
      { label: "Event Calendar", href: "/events" },
      { label: "Event Photos", href: "/events/photos" },
      { label: "Public Presentations", href: "/events/presentations" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Publications & Guidelines", href: "/resources" },
      { label: "Insights & Blog", href: "/resources/blog" },
      { label: "Video Gallery", href: "/resources/videos" },
    ],
  },
  {
    label: "Secretariat",
    href: "/secretariat",
  },
];

export const NIGERIA_ZONES = [
  {
    name: "North Central",
    states: ["Benue", "Kogi", "Kwara", "Nasarawa", "Niger", "Plateau", "FCT Abuja"],
  },
  {
    name: "North East",
    states: ["Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe"],
  },
  {
    name: "North West",
    states: ["Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Sokoto", "Zamfara"],
  },
  {
    name: "South East",
    states: ["Abia", "Anambra", "Ebonyi", "Enugu", "Imo"],
  },
  {
    name: "South South",
    states: ["Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Rivers"],
  },
  {
    name: "South West",
    states: ["Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"],
  },
];
