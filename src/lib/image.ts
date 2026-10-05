import { WEBP_ASSETS } from '../data/webpAssets';

/**
 * Vraća WebP putanju ako za dati fajl postoji WebP verzija,
 * u suprotnom originalnu putanju (JPG/PNG fallback).
 *
 * Primer: '/majice/collage/collage1.jpg' -> '/majice/collage/collage1.webp'
 */
export function webpSrc(src: string): string {
  if (!src || src.startsWith('data:') || src.startsWith('http')) return src;
  const webp = src.replace(/\.(jpe?g|png)$/i, '.webp');
  return WEBP_ASSETS.has(webp) ? webp : src;
}

/** True ako za putanju postoji WebP verzija. */
export function hasWebp(src: string): boolean {
  if (!src || src.startsWith('data:') || src.startsWith('http')) return false;
  return WEBP_ASSETS.has(src.replace(/\.(jpe?g|png)$/i, '.webp'));
}

/**
 * Vraća hardveru prilagođene verzije za srcSet (npr. 2x retina).
 * Koristi se tamo gde želimo davidenske širine; za sada samo 1x + 2x iste putanje,
 * jer imamo jednu dimenziju po slici.
 */
export function pictureSources(src: string): { webp?: string; fallback: string } {
  return { webp: hasWebp(src) ? webpSrc(src) : undefined, fallback: src };
}
