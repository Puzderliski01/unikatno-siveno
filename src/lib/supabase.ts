import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DbProduct {
  id: string;
  created_at: string;
  name_sr: string;
  subtitle_sr: string;
  description_sr: string;
  story_sr: string;
  category: string;
  category_label_sr: string;
  price_rsd: number;
  original_price_rsd: number | null;
  lead_time_days: string;
  badge: string | null;
  sizes: string[];
  features: string[];
  materials_composition: string;
  materials_origin: string;
  materials_care: string[];
  model_info: string;
  images: string[];
  thumbnail: string;
  featured: boolean;
  active: boolean;
}
