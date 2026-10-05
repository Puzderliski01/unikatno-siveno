import { createClient } from '@supabase/supabase-js';
import { Product, BlogPost, Notification } from '../types';

// Ako env varijable nisu unete (npr. na hosting koji ih nema), sajt mora i dalje
// da radi — koristimo bezopasan placeholder umesto da klijent baci grešku i
// cela aplikacija padne.
const rawUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(rawUrl && rawKey);

const supabaseUrl = rawUrl || 'https://placeholder.supabase.co';
const supabaseAnonKey = rawKey || 'placeholder-anon-key';

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
  stock_quantity: number | null;
  fabric_image: string | null;
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
    stockQuantity: db.stock_quantity ?? undefined,
    fabricImage: db.fabric_image ?? undefined,
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

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data;
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !data) return null;
  return data;
}

export async function fetchNotifications(): Promise<Notification[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error || !data) return [];
  return data.map(n => ({ ...n, read: false }));
}

/**
 * Prijava na bilten (newsletter).
 * Zahteva tabelu `subscribers` (vidi supabase-subscribers.sql).
 */
export async function subscribeToNewsletter(
  email: string
): Promise<{ ok: boolean; message: string }> {
  if (!isSupabaseConfigured) {
    return { ok: false, message: 'Prijava trenutno nije dostupna — pišite nam na email.' };
  }

  const { error } = await supabase.from('subscribers').insert({ email });

  if (error) {
    // 23505 = unique_violation → adresa je već prijavljena
    if (error.code === '23505') {
      return { ok: true, message: 'Već ste prijavljeni — javićemo vam nove modele.' };
    }
    return { ok: false, message: 'Prijava nije uspela. Pokušajte ponovo ili nam pišite na email.' };
  }

  return { ok: true, message: 'Hvala! Javićemo vam čim stignu novi unikatni komadi.' };
}
