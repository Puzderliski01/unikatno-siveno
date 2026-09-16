import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';

interface UserBehavior {
  viewedProducts: string[];
  viewedCategories: Record<string, number>;
  viewedPriceRanges: Record<string, number>;
  wishlistedProducts: string[];
  cartedProducts: string[];
  viewedSizes: Record<string, number>;
  lastVisit: number;
}

const STORAGE_KEY = 'user-behavior';
const DECAY_DAYS = 30;

function getStoredBehavior(): UserBehavior {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    viewedProducts: [],
    viewedCategories: {},
    viewedPriceRanges: {},
    wishlistedProducts: [],
    cartedProducts: [],
    viewedSizes: {},
    lastVisit: Date.now(),
  };
}

function saveBehavior(behavior: UserBehavior) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(behavior));
  } catch {}
}

function getPriceRange(price: number): string {
  if (price < 5000) return 'budget';
  if (price < 8000) return 'mid';
  if (price < 10000) return 'premium';
  return 'luxury';
}

function calculateProductScore(
  product: Product,
  behavior: UserBehavior
): number {
  let score = 0;

  // Category affinity: +15 for viewed categories
  const catCount = behavior.viewedCategories[product.categoryLabelSr] || 0;
  score += Math.min(catCount * 3, 15);

  // Price range affinity: +10
  const priceRange = getPriceRange(product.priceRSD);
  const priceCount = behavior.viewedPriceRanges[priceRange] || 0;
  score += Math.min(priceCount * 2, 10);

  // Size affinity: +8
  const preferredSize = Object.entries(behavior.viewedSizes).sort((a, b) => b[1] - a[1])[0];
  if (preferredSize && product.sizes.includes(preferredSize[0])) {
    score += 8;
  }

  // Boost wishlisted items: +20
  if (behavior.wishlistedProducts.includes(product.id)) {
    score += 20;
  }

  // Boost carted items: +25
  if (behavior.cartedProducts.includes(product.id)) {
    score += 25;
  }

  // Boost featured: +5
  if (product.badge === 'LIMITED EDITION' || product.badge === 'UNIKAT') {
    score += 5;
  }

  // Boost customizable: +3
  if (product.isCustomizable) {
    score += 3;
  }

  // Recency of viewed products: +12 if recently viewed
  const viewIdx = behavior.viewedProducts.indexOf(product.id);
  if (viewIdx !== -1 && viewIdx < 5) {
    score += 12 - viewIdx * 2;
  }

  return score;
}

export function usePersonalization(products: Product[]) {
  const [behavior, setBehavior] = useState<UserBehavior>(getStoredBehavior);

  // Decay old behavior
  useEffect(() => {
    const daysSinceLastVisit = (Date.now() - behavior.lastVisit) / (1000 * 60 * 60 * 24);
    if (daysSinceLastVisit > DECAY_DAYS) {
      setBehavior({
        ...behavior,
        viewedCategories: {},
        viewedPriceRanges: {},
        viewedSizes: {},
        lastVisit: Date.now(),
      });
    }
  }, []);

  // Track product view
  const trackView = useCallback((product: Product) => {
    setBehavior((prev) => {
      const updated = { ...prev };
      // Add to viewed (max 50)
      updated.viewedProducts = [
        product.id,
        ...updated.viewedProducts.filter((id) => id !== product.id),
      ].slice(0, 50);
      // Increment category
      updated.viewedCategories = {
        ...updated.viewedCategories,
        [product.categoryLabelSr]: (updated.viewedCategories[product.categoryLabelSr] || 0) + 1,
      };
      // Increment price range
      const pr = getPriceRange(product.priceRSD);
      updated.viewedPriceRanges = {
        ...updated.viewedPriceRanges,
        [pr]: (updated.viewedPriceRanges[pr] || 0) + 1,
      };
      updated.lastVisit = Date.now();
      saveBehavior(updated);
      return updated;
    });
  }, []);

  // Track wishlist toggle
  const trackWishlist = useCallback((productId: string, isAdding: boolean) => {
    setBehavior((prev) => {
      const updated = { ...prev };
      if (isAdding) {
        updated.wishlistedProducts = [...new Set([...updated.wishlistedProducts, productId])];
      } else {
        updated.wishlistedProducts = updated.wishlistedProducts.filter((id) => id !== productId);
      }
      saveBehavior(updated);
      return updated;
    });
  }, []);

  // Track cart add
  const trackCart = useCallback((product: Product) => {
    setBehavior((prev) => {
      const updated = { ...prev };
      updated.cartedProducts = [...new Set([...updated.cartedProducts, product.id])];
      saveBehavior(updated);
      return updated;
    });
  }, []);

  // Track size view
  const trackSize = useCallback((size: string) => {
    setBehavior((prev) => {
      const updated = { ...prev };
      updated.viewedSizes = {
        ...updated.viewedSizes,
        [size]: (updated.viewedSizes[size] || 0) + 1,
      };
      saveBehavior(updated);
      return updated;
    });
  }, []);

  // Get personalized product order
  const getPersonalizedProducts = useCallback((): Product[] => {
    if (behavior.viewedProducts.length === 0 && behavior.wishlistedProducts.length === 0) {
      return products; // No behavior yet, return default order
    }

    const scored = products.map((product) => ({
      product,
      score: calculateProductScore(product, behavior),
    }));

    scored.sort((a, b) => b.score - a.score);
    return scored.map((s) => s.product);
  }, [products, behavior]);

  // Get recommended products (top 6)
  const getRecommended = useCallback((): Product[] => {
    return getPersonalizedProducts().slice(0, 6);
  }, [getPersonalizedProducts]);

  // Has behavior data?
  const hasBehavior = behavior.viewedProducts.length > 0 ||
    behavior.wishlistedProducts.length > 0 ||
    behavior.cartedProducts.length > 0;

  return {
    trackView,
    trackWishlist,
    trackCart,
    trackSize,
    getPersonalizedProducts,
    getRecommended,
    hasBehavior,
  };
}
