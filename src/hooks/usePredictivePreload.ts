import { useCallback, useRef, useEffect } from 'react';
import { Product } from '../types';

interface PredictivePreloadOptions {
  preloadOnHover?: boolean;
  preloadOnScroll?: boolean;
  preloadNextInCategory?: boolean;
  preloadPopularItems?: boolean;
  maxPreload?: number;
}

interface UserInteraction {
  productId: string;
  timestamp: number;
  type: 'view' | 'hover' | 'click';
}

export const usePredictivePreload = (
  products: Product[],
  options: PredictivePreloadOptions = {}
) => {
  const {
    preloadOnHover = true,
    preloadOnScroll = true,
    preloadNextInCategory = true,
    preloadPopularItems = true,
    maxPreload = 5
  } = options;

  const interactionHistory = useRef<UserInteraction[]>([]);
  const preloadedProducts = useRef<Set<string>>(new Set());
  const lastScrollPosition = useRef(0);

  // Track user interactions
  const trackInteraction = useCallback((productId: string, type: UserInteraction['type']) => {
    interactionHistory.current = [
      ...interactionHistory.current.filter(
        interaction => Date.now() - interaction.timestamp < 5 * 60 * 1000 // Keep last 5 minutes
      ),
      { productId, timestamp: Date.now(), type }
    ];
  }, []);

  // Get products likely to be viewed next based on history
  const getLikelyNextProducts = useCallback((currentProductId: string): Product[] => {
    // Find recent interactions with current product
    const recentInteractions = interactionHistory.current.filter(
      interaction =>
        interaction.productId === currentProductId &&
        Date.now() - interaction.timestamp < 30 * 1000 // Last 30 seconds
    );

    if (recentInteractions.length === 0) return [];

    // Get the current product
    const currentProduct = products.find(p => p.id === currentProductId);
    if (!currentProduct) return [];

    let likelyProducts: Product[] = [];

    // If user hovered/clicked, consider same category products
    if (preloadNextInCategory &&
        (recentInteractions.some(i => i.type === 'hover' || i.type === 'click'))) {
      const sameCategory = products
        .filter(p =>
          p.category === currentProduct.category &&
          p.id !== currentProductId &&
          !preloadedProducts.current.has(p.id)
        )
        .slice(0, maxPreload);

      likelyProducts = [...likelyProducts, ...sameCategory];
    }

    // Add popular items if enabled
    if (preloadPopularItems) {
      const popular = products
        .filter(p =>
          p.id !== currentProductId &&
          !preloadedProducts.current.has(p.id) &&
          (p.badge === 'LIMITED EDITION' || p.badge === '1 of 1' || p.badge === 'UNIKAT')
        )
        .slice(0, Math.max(0, maxPreload - likelyProducts.length));

      likelyProducts = [...likelyProducts, ...popular];
    }

    return likelyProducts.slice(0, maxPreload);
  }, [products, preloadNextInCategory, preloadPopularItems, maxPreload]);

  // Preload product images
  const preloadProductImages = useCallback((productsToPreload: Product[]) => {
    const imagesToPreload: string[] = [];

    productsToPreload.forEach(product => {
      // Add main image
      imagesToPreload.push(product.images[0]);
      // Add additional images (up to 2 more for efficiency)
      for (let i = 1; i < Math.min(product.images.length, 3); i++) {
        imagesToPreload.push(product.images[i]);
      }

      // Mark as preloaded
      product.images.forEach(img => preloadedProducts.current.add(img));
    });

    if (imagesToPreload.length > 0) {
      // Update the image preloader with new images
      // We need to recreate the hook with new images, but since we can't do that directly,
      // we'll create link elements manually for preloading
      imagesToPreload.forEach(src => {
        // Preload WebP/AVIF versions if they exist
        const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        const avifSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.avif');

        [src, webpSrc, avifSrc].forEach(url => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = url;
          document.head.appendChild(link);
        });
      });
    }
  }, []);

  // Handle hover events on product cards
  const handleProductHover = useCallback((productId: string) => {
    if (!preloadOnHover) return;

    trackInteraction(productId, 'hover');

    const likelyProducts = getLikelyNextProducts(productId);
    if (likelyProducts.length > 0) {
      preloadProductImages(likelyProducts);
    }
  }, [getLikelyNextProducts, preloadOnHover, preloadProductImages, trackInteraction]);

  // Handle product view events
  const handleProductView = useCallback((productId: string) => {
    trackInteraction(productId, 'view');

    // Preload images for this product immediately
    const product = products.find(p => p.id === productId);
    if (product) {
      preloadProductImages([product]);
    }

    // Also preload likely next products
    const likelyProducts = getLikelyNextProducts(productId);
    if (likelyProducts.length > 0) {
      preloadProductImages(likelyProducts);
    }
  }, [getLikelyNextProducts, preloadProductImages, products, trackInteraction]);

  // Handle scroll events for preloading based on position
  useEffect(() => {
    if (!preloadOnScroll) return;

    const handleScroll = () => {
      const currentPosition = window.scrollY;

      // If user has scrolled significantly, preload products in viewport
      if (Math.abs(currentPosition - lastScrollPosition.current) > 300) {
        lastScrollPosition.current = currentPosition;

        // In a real implementation, we would calculate which products are in viewport
        // For now, we'll preload a few popular products when user scrolls
        if (preloadPopularItems) {
          const popularProducts = products
            .filter(p =>
              p.badge === 'LIMITED EDITION' ||
              p.badge === '1 of 1' ||
              p.badge === 'UNIKAT'
            )
            .filter(p => !preloadedProducts.current.has(p.id))
            .slice(0, maxPreload);

          if (popularProducts.length > 0) {
            preloadProductImages(popularProducts);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [preloadOnScroll, preloadPopularItems, preloadProductImages, products, maxPreload]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear preloaded products tracking (optional)
      // preloadedProducts.current.clear();
    };
  }, []);

  return {
    handleProductHover,
    handleProductView,
    trackInteraction
  };
};