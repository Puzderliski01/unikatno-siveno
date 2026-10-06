import { supabase, isSupabaseConfigured } from './supabase';
import { Review } from '../types';

/**
 * Logika za recenzije i utiske.
 *
 * - Javno se prikazuju SAMO odobrene recenzije (`status = 'approved'`).
 * - Nova recenzija uvek ide kao `pending` i čeka odobrenje u admin panelu.
 * - Ako Supabase nije konfigurisan (npr. lokalni razvoj), komentar se čuva
 *   lokalno na uređaju — vidi ga samo autor, označen kao "čeka odobrenje".
 */

export interface ReviewStats {
  count: number;
  avg: number;
  /** broj recenzija za 5, 4, 3, 2 i 1 zvezdicu */
  distribution: [number, number, number, number, number];
}

const LOCAL_PENDING_KEY = 'pendingReviews';
const MAX_LOCAL_PENDING = 10;

/** Prosečna ocena i raspodela zvezdica (računa se isključivo iz odobrenih). */
export function computeStats(reviews: Review[]): ReviewStats {
  const distribution: ReviewStats['distribution'] = [0, 0, 0, 0, 0];
  let sum = 0;
  for (const r of reviews) {
    const rating = Math.min(5, Math.max(1, Math.round(r.rating)));
    distribution[5 - rating] += 1;
    sum += rating;
  }
  return {
    count: reviews.length,
    avg: reviews.length ? sum / reviews.length : 0,
    distribution,
  };
}

/** Statistika po proizvodu: `{ [productId]: stats }`. */
export function buildStatsMap(reviews: Review[]): Record<string, ReviewStats> {
  const byProduct: Record<string, Review[]> = {};
  for (const r of reviews) {
    if (!r.product_id) continue;
    (byProduct[r.product_id] ||= []).push(r);
  }
  const map: Record<string, ReviewStats> = {};
  for (const id of Object.keys(byProduct)) map[id] = computeStats(byProduct[id]);
  return map;
}

/** 4.83 → "4,8" (srpski decimalni zarez). */
export function formatAvg(avg: number): string {
  return avg.toFixed(1).replace('.', ',');
}

/** 1 → "1 recenzija", 3 → "3 recenzije", 5 → "5 recenzija". */
export function recenzijeLabel(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  const jeRecenzija = mod10 === 1 && mod100 !== 11;
  const jeRecenzije = mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14);
  return jeRecenzija ? 'recenzija' : jeRecenzije ? 'recenzije' : 'recenzija';
}

export function formatReviewDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('sr-Latn-RS', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

/** Sve odobrene recenzije (modeli + opšti utisci), najnovije prvo. */
export async function fetchApprovedReviews(): Promise<Review[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('product_reviews')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(500);

  if (error || !data) {
    if (error) console.warn('fetchApprovedReviews:', error.message);
    return [];
  }
  return data as Review[];
}

// ---------------------------------------------------------------------------
// Lokalne (neobjavljene) recenzije — rezervni režim + "vidim svoj komentar"
// ---------------------------------------------------------------------------

function readLocalPending(): Review[] {
  try {
    const raw = JSON.parse(localStorage.getItem(LOCAL_PENDING_KEY) || '[]');
    return Array.isArray(raw) ? (raw as Review[]) : [];
  } catch {
    return [];
  }
}

function writeLocalPending(list: Review[]) {
  try {
    localStorage.setItem(LOCAL_PENDING_KEY, JSON.stringify(list.slice(-MAX_LOCAL_PENDING)));
  } catch {
    /* privatni režim / pun storage — ignoriši */
  }
}

export function getLocalPendingReviews(): Review[] {
  if (typeof localStorage === 'undefined') return [];
  return readLocalPending().filter((r) => r.status === 'pending');
}

/**
 * Spaja serverke odobrene recenzije sa lokalnim čekajućim (da autor vidi svoj
 * komentar dok ne prođe moderaciju). Lokalni unosi koji su već stigli sa
 * servera (odobreni) se preskaču da ne bude dupliranja.
 *
 * @param productId `undefined` → svi lokalni; `null` → samo opšti utisci;
 *                  string → samo komentari tog modela.
 */
export function mergeLocalPending(serverReviews: Review[], productId?: string | null): Review[] {
  const serverIds = new Set(serverReviews.map((r) => r.id));
  const local = getLocalPendingReviews().filter(
    (r) =>
      !serverIds.has(r.id) &&
      (productId === undefined || (r.product_id ?? null) === productId)
  );
  if (!local.length) return serverReviews;
  return [...local, ...serverReviews];
}

// ---------------------------------------------------------------------------
// Slanje nove recenzije
// ---------------------------------------------------------------------------

export interface SubmitReviewInput {
  productId: string | null;
  authorName: string;
  city?: string;
  rating: number;
  title?: string;
  comment: string;
  userId?: string | null;
  /** skriveno polje za botove — ako je popunjeno, tiho prekidamo */
  honeypot?: string;
}

export interface SubmitReviewResult {
  ok: boolean;
  message: string;
}

function validate(input: SubmitReviewInput): string | null {
  if (input.honeypot) return null; // bot — tiho prihvatimo
  const name = input.authorName.trim();
  const comment = input.comment.trim();
  if (name.length < 2) return 'Unesite vaše ime (najmanje 2 slova).';
  if (name.length > 80) return 'Ime je predugo (maksimalno 80 znakova).';
  if (!Number.isFinite(input.rating) || input.rating < 1 || input.rating > 5)
    return 'Izaberite ocenu od 1 do 5 zvezdica.';
  if (comment.length < 10) return 'Komentar je prekratak — napisite bar 10 znakova.';
  if (comment.length > 2000) return 'Komentar je predugačak (maksimalno 2000 znakova).';
  return null;
}

function saveLocally(input: SubmitReviewInput): Review {
  const review: Review = {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    created_at: new Date().toISOString(),
    product_id: input.productId,
    user_id: input.userId ?? null,
    author_name: input.authorName.trim(),
    city: input.city?.trim() || '',
    rating: Math.round(input.rating),
    title: input.title?.trim() || '',
    comment: input.comment.trim(),
    status: 'pending',
    local: true,
  };
  const list = readLocalPending();
  // bez dupliranja istog komentara
  const duplicate = list.some(
    (r) =>
      r.comment === review.comment &&
      r.author_name === review.author_name &&
      r.product_id === review.product_id
  );
  if (!duplicate) writeLocalPending([...list, review]);
  return review;
}

export async function submitReview(input: SubmitReviewInput): Promise<SubmitReviewResult> {
  const validationError = validate(input);
  if (validationError) return { ok: false, message: validationError };

  const payload = {
    product_id: input.productId,
    user_id: input.userId || null,
    author_name: input.authorName.trim(),
    city: input.city?.trim() || '',
    rating: Math.round(input.rating),
    title: input.title?.trim() || '',
    comment: input.comment.trim(),
    status: 'pending' as const,
  };

  // Bot je popunio skriveno polje — pravimo se da je poslato, ali ne pišemo nigde.
  if (input.honeypot) return { ok: true, message: 'Hvala! Vaš komentar je poslat.' };

  if (!isSupabaseConfigured) {
    saveLocally(input);
    return {
      ok: true,
      message: 'Hvala! Komentar je sačuvan na ovom uređaju i čeka odobrenje.',
    };
  }

  try {
    const { error } = await supabase.from('product_reviews').insert([payload]);
    if (error) {
      console.warn('submitReview:', error.message);
      saveLocally(input);
      return {
        ok: true,
        message: 'Hvala! Komentar je sačuvan na ovom uređaju i čeka odobrenje.',
      };
    }
    return {
      ok: true,
      message: 'Hvala! Komentar je poslat i biće objavljen nakon odobrenja.',
    };
  } catch (err) {
    console.warn('submitReview:', err);
    saveLocally(input);
    return {
      ok: true,
      message: 'Hvala! Komentar je sačuvan na ovom uređaju i čeka odobrenje.',
    };
  }
}
