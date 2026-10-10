export type ProductCategory = 
  | 'website'
  | 'management'
  | 'ecommerce'
  | 'finance'
  | 'hrm'
  | 'custom';

export interface ProductPricingPlan {
  id: string;
  name: string;
  price: number; // in VND
  billingCycle: 'tháng' | 'năm' | 'vĩnh viễn';
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface ProductFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  categoryName: string;
  description: string;
  longDescription: string;
  techStack: string[];
  basePrice: number; // 0 means 'Liên hệ báo giá'
  isPriceContact?: boolean;
  featuredBadge?: string;
  badgeVariant?: 'primary' | 'accent' | 'success' | 'warning';
  hasLiveDemo: boolean;
  demoUrl?: string;
  mockupType: 'ecommerce' | 'residence' | 'business' | 'sales' | 'hrm' | 'finance';
  previewImage?: string;
  screenshots: string[];
  features: ProductFeature[];
  plans: ProductPricingPlan[];
  faqs: ProductFAQ[];
  isPublished: boolean;
  rating: number;
  reviewsCount: number;
  createdAt: string;
  updatedAt: string;
}
