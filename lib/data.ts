import type {
  ContactInfo,
  EducationItem,
  ExperienceItem,
  NavLink,
  Skill,
  SocialLink,
} from "./types";

export const personalInfo = {
  name: "Kenneth John B. Bolilan",
  firstName: "Kenneth",
  title: "Full-Stack Web Developer",
  location: "Pasong Camachile I, General Trias City, Cavite",
  summary:
    "Experienced Full Stack Developer with a deep background in architecting scalable web solutions and managing complex data ecosystems. Expert in Node.js, with specialized proficiency in optimizing MySQL and MS SQL databases for high-performance production systems. Beyond technical implementation, I bring a proven history of leading agile development cycles and migrating large-scale datasets. I am passionate about high-quality software that solves organizational challenges through clean, and robust data integrity.",
  languages: ["Filipino", "English"],
};

export const contactInfo: ContactInfo[] = [
  {
    label: "Email",
    icon: "Mail",
    entries: [
      {
        value: "kennethjohnbolilan01@gmail.com",
        href: "mailto:kennethjohnbolilan01@gmail.com",
      },
    ],
  },
  {
    label: "Phone",
    icon: "Phone",
    entries: [
      { value: "0992-063-0421", href: "tel:+639920630421" },
      { value: "0975-325-9095", href: "tel:+639753259095" },
      { value: "0948-148-2819", href: "tel:+639481482819" },
    ],
  },
  {
    label: "Location",
    icon: "MapPin",
    entries: [{ value: "General Trias City, Cavite", href: "#" }],
  },
];

// TODO: replace "#" with the real profile URLs for each account before
// deploying — these are placeholders so the Contact section renders, but
// they don't link anywhere yet.
export const socialLinks: SocialLink[] = [
  { platform: "Facebook", href: "#", icon: "SiFacebook" },
  { platform: "Instagram", href: "#", icon: "SiInstagram" },
  { platform: "TikTok", href: "#", icon: "SiTiktok" },
  { platform: "LinkedIn", href: "#", icon: "TbBrandLinkedin" },
];

export const skills: Skill[] = [
  { name: "Vue.js", category: "Frontend", icon: "SiVuedotjs" },
  { name: "Axios", category: "Frontend", icon: "SiAxios" },
  { name: "Tailwind CSS", category: "Frontend", icon: "SiTailwindcss" },
  { name: "Node.js", category: "Backend", icon: "SiNodedotjs" },
  { name: "RESTful APIs", category: "Backend", icon: "TbApi" },
  { name: "MySQL", category: "Databases", icon: "SiMysql" },
  { name: "MS SQL", category: "Databases", icon: "TbSql" },
  { name: "CouchDB", category: "Databases", icon: "SiApachecouchdb" },
  { name: "Git", category: "Tools & DevOps", icon: "SiGit" },
  { name: "NPM/Yarn", category: "Tools & DevOps", icon: "SiNpm" },
];

export const experience: ExperienceItem[] = [
  {
    role: "Full-Stack Web Developer",
    company: "H.R.D. Singapore Pte Ltd",
    period: "December 2023 — Present",
    bullets: [
      "Web-based system development across the full stack",
      "Front End, Back End, and Database architecture",
      "Built Monitoring System and Checklist System",
      "Implemented CRUD operations for core business workflows",
    ],
  },
  {
    role: "On-the-Job Trainee",
    company: "STI College - Rosario",
    period: "March 2023 — June 2023",
    bullets: ["Computer Servicing and Maintenance", "Registrar Staff support"],
  },
];

export const education: EducationItem[] = [
  {
    degree: "BS Information Technology",
    school: "STI College - Rosario",
    period: "2019 — 2023",
    detail: "GPA 3.65",
  },
  {
    degree: "Senior High School — ICT Strand",
    school: "Fiat Lux Academe",
    period: "2017 — 2019",
  },
  {
    degree: "Junior High School",
    school: "Samuel Christian College",
    period: "2013 — 2017",
  },
];

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
