import { LucideIcon } from "lucide-react";

export interface ClinicInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  tipawLink: string;
  hours: { day: string; hours: string }[]; // Horaires Magasin
  consultationHours: { day: string; hours: string }[]; // Horaires RDV
  // New CMS fields for Home Page
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string; // Changed from LucideIcon to string for storage
  features: string[];
  faqs: { question: string; answer: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: 'Alimentation' | 'Soins' | 'Médicaments' | 'Accessoires';
  requiresValidation: boolean; // True if order needs vet approval (meds)
}

export interface DataContextType {
  clinicInfo: ClinicInfo;
  services: Service[];
  team: TeamMember[];
  blogPosts: BlogPost[];
  products: Product[];
  updateClinicInfo: (info: ClinicInfo) => void;
  updateService: (id: string, service: Service) => void;
  updateTeamMember: (id: string, member: TeamMember) => void;
  addTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  updateBlogPost: (id: string, post: BlogPost) => void;
  addBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  resetToDefaults: () => void;
}