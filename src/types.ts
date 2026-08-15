export interface Product {
  id: string;
  nameSr: string;
  subtitleSr: string;
  category: 'sve' | 'haljine' | 'blejzeri' | 'svila' | 'aksesoari' | 'majice' | 'suknje';
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

export interface FittingBooking {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  atelierLocation: 'topola';
  modelId?: string;
  modelName?: string;
  serviceType: 'proba_modela' | 'sivenje_po_meri' | 'korektura' | 'vencanja_svečanosti';
  measurements?: {
    height?: string;
    bust?: string;
    waist?: string;
    hips?: string;
  };
  notes?: string;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  postalCode: string;
  address: string;
  apartment?: string;
  note?: string;
  shippingMethod: 'post_express' | 'atelier_topola';
  paymentMethod: 'pouzece' | 'platna_kartica' | 'ips_racun';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  isGiftWrap: boolean;
  giftNote?: string;
}
