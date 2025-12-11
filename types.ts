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
  cv?: {
    education: string[];
    experience: string[];
    specializations: string[];
    certifications?: string[];
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  content?: string; // Full content for CMS
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Changed to number for calculations
  imageUrl: string;
  category: 'Alimentation' | 'Soins' | 'Médicaments' | 'Accessoires';
  requiresValidation: boolean; // True if order needs vet approval (meds)
  stock?: number;
  sku?: string;
}

// New Cart and Order types
export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  petName?: string;
  petType?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
  notes?: string;
  requiresValidation: boolean;
}

// CMS Page types
export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaDescription?: string;
  isPublished: boolean;
  lastModified: string;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document';
  size: number;
  uploadDate: string;
}

export interface Testimonial {
  id: string;
  name: string;
  petName: string;
  petType: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  isApproved: boolean;
}

export interface DataContextType {
  clinicInfo: ClinicInfo;
  services: Service[];
  team: TeamMember[];
  blogPosts: BlogPost[];
  products: Product[];
  orders: Order[];
  pages: Page[];
  media: MediaFile[];
  testimonials: Testimonial[];
  updateClinicInfo: (info: ClinicInfo) => void;
  updateService: (id: string, service: Service) => void;
  updateTeamMember: (id: string, member: TeamMember) => void;
  addTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  updateBlogPost: (id: string, post: BlogPost) => void;
  addBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  updateProduct: (id: string, product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, order: Order) => void;
  addPage: (page: Page) => void;
  updatePage: (id: string, page: Page) => void;
  deletePage: (id: string) => void;
  addMedia: (media: MediaFile) => void;
  deleteMedia: (id: string) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (id: string, testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  resetToDefaults: () => void;
}

// Cart Context
export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}