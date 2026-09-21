export interface NavLink {
  label: string;
  href: string;
}

export type SkillCategory = "Frontend" | "Backend" | "Databases" | "Tools & DevOps";

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  detail?: string;
}

export interface ContactEntry {
  value: string;
  href: string;
}

export interface ContactInfo {
  label: string;
  entries: ContactEntry[];
  icon: "Mail" | "Phone" | "MapPin";
}

export type SocialPlatform = "Facebook" | "Instagram" | "TikTok" | "LinkedIn";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  icon: string;
}
