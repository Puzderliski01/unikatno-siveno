export interface Product {
  id: string;
  nameSr: string;
  subtitleSr: string;
  category: 'sve' | 'haljine' | 'blejzeri' | 'svila' | 'aksesoari' | 'majice' | 'suknje' | 'tunike';
  categoryLabelSr: string;
  priceRSD: number;
  originalPriceRSD?: number;
  badge?: string;
  descriptionSr: string;
  storySr: string;
  features: string[];
  materialsAndCare: {
    composition: string;
    origin: string;
    care: string[];
  };
  sizes: string[];
  images: string[];
  isCustomizable: boolean;
  leadTimeDays: string;
  modelInfo: string;
  stockQuantity?: number;
  fabricImage?: string;
}

export interface CartItem {
  id: string; // unique item instance id
  product: Product;
  size: string;
  quantity: number;
  customMeasurements?: {
    height?: string;
    bust?: string;
    waist?: string;
    hips?: string;
    notes?: string;
  };
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  joinDate: string;
  loyaltyPoints: number;
  vipLevel: 'none' | 'silver' | 'gold' | 'platinum';
  purchaseHistory: PurchaseHistoryItem[];
  wishlist: string[]; // Product IDs
  exclusiveInvitations: ExclusiveInvitation[];
}

export interface PurchaseHistoryItem {
  id: string;
  date: string;
  productId: string;
  productName: string;
  size: string;
  price: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface ExclusiveInvitation {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'new_collection' | 'private_sale' | 'event' | 'limited_edition';
  expiresAt?: string;
  isRsvp: boolean;
  rsvpStatus?: 'pending' | 'accepted' | 'declined';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Recenzija / komentar (tabela `product_reviews` u Supabase-u).
 * `product_id = null` → opšti utisak o ateljeu, u suprotnom komentar modela.
 * `status = 'pending'` komentari nikad ne idu na javni prikaz — vidi ih samo
 * autor (lokalno) i admin u panelu.
 */
export interface Review {
  id: string;
  created_at: string;
  product_id: string | null;
  user_id?: string | null;
  author_name: string;
  city?: string;
  rating: number;
  title?: string;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  /** istinito samo za komentare sačuvane na uređaju (van Supabase-a) */
  local?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'promo' | 'order' | 'system';
  target: 'all' | 'logged_in' | 'vip';
  link?: string;
  read: boolean;
  created_at: string;
}
