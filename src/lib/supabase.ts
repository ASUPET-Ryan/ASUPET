import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cguthchefshejanxsxlc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNndXRoY2hlZnNoZWphbnhzeGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMDM5NDAsImV4cCI6MjA2OTg3OTk0MH0.2ui9PLctw0Il8ZjYIQkIOco5ZeuImw262fMnqAyeIGA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 数据类型定义
export interface BrandStory {
  id: string;
  title: { zh: string; en: string };
  content: { zh: string; en: string };
  timeline?: { zh: any[]; en: any[] };
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: { zh: string; en: string };
  position: { zh: string; en: string };
  bio?: { zh: string; en: string };
  credentials?: string[];
  avatar_url?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ProductSeries {
  id: string;
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  category: string;
  target_age: string;
  key_features: string[];
  image_url?: string;
  features?: {
    nutrition: { zh: string; en: string }[];
    benefits: { zh: string; en: string }[];
  };
  created_at: string;
}

export interface NewsCategory {
  id: string;
  name_en: string;
  name_zh: string;
  description_en?: string;
  description_zh?: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface News {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  excerpt?: {
    zh: string;
    en: string;
  };
  content: {
    zh: string;
    en: string;
  };
  category: { zh: string; en: string };
  category_id?: string;
  news_categories?: NewsCategory;
  publish_date: string;
  featured_image_url?: string;
  tags?: string[];
  author?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  inquiry_type: 'partnership' | 'media' | 'general';
  message: string;
  preferred_language: 'zh' | 'en';
  processed?: boolean;
  created_at?: string;
}

export interface MediaItem {
  id: string;
  url: string;
  alt_text?: {
    zh: string;
    en: string;
  };
  caption?: {
    zh: string;
    en: string;
  };
  width?: number;
  height?: number;
  format?: string;
  entity_type?: string;
  entity_id?: string;
  created_at: string;
}