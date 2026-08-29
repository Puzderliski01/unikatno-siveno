import { createClient } from '@supabase/supabase-js';
import { Product } from '../types';

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

export function dbProductToProduct(db: DbProduct): Product {
  return {
    id: db.id,
    nameSr: db.name_sr,
    subtitleSr: db.subtitle_sr,
    category: db.category as Product['category'],
    categoryLabelSr: db.category_label_sr,
    priceRSD: db.price_rsd,
    originalPriceRSD: db.original_price_rsd ?? undefined,
    badge: db.badge ?? undefined,
    descriptionSr: db.description_sr,
    storySr: db.story_sr,
    features: db.features,
    materialsAndCare: {
      composition: db.materials_composition,
      origin: db.materials_origin,
      care: db.materials_care,
    },
    sizes: db.sizes,
    images: db.images,
    isCustomizable: db.sizes.some(s => s.includes('merama') || s.includes('meri')),
    leadTimeDays: db.lead_time_days,
    modelInfo: db.model_info,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data.map(dbProductToProduct);
}
