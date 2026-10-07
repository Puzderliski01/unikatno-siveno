import React, { useState, useRef, useCallback } from 'react';
import { Eye, ZoomIn, ShoppingBag, Heart, Check, Tag, Scissors } from 'lucide-react';
import { GlassLayer } from './GlassLayer';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { FORMAT_RSD } from '../data/products';
import { OptimizedImage } from './OptimizedImage';
import { usePredictivePreload } from '../hooks/usePredictivePreload';
import { Stars } from './Stars';
import { formatAvg, ReviewStats } from '../lib/reviews';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onOpenDetails: (product: Product) => void;
  onOpenZoom: (product: Product, index?: number) => void;
  onQuickAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  onAddToOutfit?: (product: Product) => void;
  isInOutfit?: boolean;
  stockQuantity?: number;
  /** prosečna ocena i broj odobrenih recenzija (ako ih ima) */
  reviewStat?: ReviewStats;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({
  product,
  isWishlisted,
  onOpenDetails,
  onOpenZoom,
  onQuickAddToCart,
  onToggleWishlist,
  onAddToOutfit,
  isInOutfit,
  stockQuantity,
  reviewStat,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState<string>(product.sizes[1] || product.sizes[0]);
  const [isQuickAdding, setIsQuickAdding] = useState(false);
  const [addedJustNow, setAddedJustNow] = useState(false);
  const [flyAnimation, setFlyAnimation] = useState<{ x: number; y: number; img: string } | null>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { handleProductHover } = usePredictivePreload([product], { preloadOnHover: true, preloadNextInCategory: false });

  const handleMouseEnter = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsHovered(true);
    handleProductHover(product.id);
  }, [handleProductHover, product.id]);

  const handleMouseLeave = useCallback(() => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
    setTiltStyle({});
  }, []);

  const handleOverlayMouseEnter = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsHovered(true);
  }, []);

  const handleOverlayMouseLeave = useCallback(() => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  }, []);

  // 3D Tilt effect on mouse move
  const handleMouseMoveTilt = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });
  }, []);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsQuickAdding(true);

    // Fly-to-cart animation
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const cartEl = document.querySelector('[data-cart-icon]');
      const cartRect = cartEl?.getBoundingClientRect();
      if (cartRect) {
        setFlyAnimation({
          x: cartRect.left - rect.left,
          y: cartRect.top - rect.top,
          img: product.images[0],
        });
        setTimeout(() => setFlyAnimation(null), 700);
      }
    }

    setTimeout(() => {
      onQuickAddToCart(product, selectedQuickSize);
      setIsQuickAdding(false);
      setAddedJustNow(true);
      setTimeout(() => setAddedJustNow(false), 2000);
    }, 300);
  };

  // Real-time stock count from Supabase
  const stockCount = stockQuantity !== undefined
    ? stockQuantity
    : product.badge === 'UNIKAT' ? 1
    : product.badge === '1 of 1' ? 1
    : null;

  return (
    <div
      ref={cardRef}
      id={`product-card-${product.id}`}
      className="group relative bg-[#111111] border border-[#c9a96e]/20 hover:border-[#c9a96e]/60 rounded-none overflow-hidden flex flex-col cursor-pointer shadow-sm hover:shadow-[0_8px_40px_rgba(201,169,110,0.25)] transition-shadow"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMoveTilt}
      onClick={() => onOpenDetails(product)}
      style={tiltStyle}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1a1a1a]">
        <OptimizedImage
          src={product.images[0]}
          alt={product.nameSr}
          className="h-full w-full object-cover object-center"
          loading="lazy"
          priority={false}
        />

        {/* Subtle Gradient Overlay at Bottom — na telefonu znatno tanji da smetnje ne prekrivaju modela */}
        <div className="absolute inset-0 pointer-events-none opacity-40 sm:opacity-100">
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent pointer-events-none"
            style={{ opacity: isHovered ? 0.7 : 0.5 }}
          />
        </div>

        {/* Top Badges & Wishlist Button — desktop/srednji ekran; na telefonu premešteno u telo kartice */}
        <div className="hidden sm:flex absolute top-3 inset-x-3 items-center justify-between z-30">
          {product.badge ? (
            <span className="glass-chip inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] uppercase font-sans tracking-wider font-medium text-[#c9a96e] border border-[#c9a96e]/40">
              <Tag className="w-2 h-2 text-[#c9a96e]" />
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          <button
            type="button"
            aria-label={isWishlisted ? `Ukloni ${product.nameSr} iz omiljenih` : `Dodaj ${product.nameSr} u omiljene`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`glass-chip p-2.5 sm:p-2 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 flex items-center justify-center transition-all duration-300 z-40 border border-[#c9a96e]/20 ${isWishlisted ? 'bg-[#c9a96e] text-[#0a0a0a] shadow-md' : 'text-[#e8e0d4] hover:bg-[#c9a96e] hover:text-[#0a0a0a]'}`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Stock indicator - bottom left, below gradient (samo van telefona) */}
        {stockCount !== null && stockCount <= 3 && stockCount > 0 && (
          <div className="hidden sm:block absolute bottom-3 left-3 z-30">
            <div className="stock-pulse">
              <span className="stock-pulse-dot" />
              <span className="glass-chip text-[11px] uppercase tracking-wider text-red-400 font-sans font-medium border border-[#c9a96e]/20 px-2 py-0.5">
                Još {stockCount}
              </span>
            </div>
          </div>
        )}

        {/* Out of stock overlay */}
        {stockCount !== null && stockCount <= 0 && (
          <div className="absolute inset-0 bg-[#0a0a0a]/70 flex items-center justify-center z-30">
            <span className="text-xs uppercase tracking-[0.2em] text-[#e8e0d4]/80 font-sans font-semibold glass-chip px-4 py-2 border border-[#c9a96e]/30">
              Rasprodato
            </span>
          </div>
        )}

        {/* Fly-to-cart animation element */}
        {flyAnimation && (
          <div
            className="fly-to-cart"
            style={{
              left: 0,
              top: 0,
              animation: 'flyToCart 0.7s cubic-bezier(0.25, 0.09, 0.4, 0.93) forwards',
            }}
          >
            <img src={flyAnimation.img} alt="" />
          </div>
        )}

        {/* Hover Quick Actions Reveal Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="hidden sm:flex absolute inset-x-0 bottom-0 p-3 flex-col gap-2 z-20"
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={handleOverlayMouseEnter}
              onMouseLeave={handleOverlayMouseLeave}
            >
              {/* Quick size selection chips */}
              <div className="isolate glass-strong flex items-center justify-center gap-1 flex-wrap backdrop-blur-md p-1.5 border border-[#c9a96e]/30">
                <GlassLayer cornerRadius={0} displacementScale={36} />
                <span className="text-[9px] uppercase tracking-wider text-[#e8e0d4]/70 mr-1 font-sans">Veličina:</span>
                {product.sizes.slice(0, 4).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedQuickSize(size);
                    }}
                    className={`px-2 py-0.5 text-[9px] font-mono transition-colors ${selectedQuickSize === size ? 'bg-[#c9a96e] text-[#0a0a0a] font-bold' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    {size.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Action buttons row */}
              <div className="grid grid-cols-4 gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenZoom(product, 0);
                  }}
                  className="py-2 px-1.5 bg-[#0a0a0a] hover:bg-[#111111] text-[#e8e0d4] hover:text-[#c9a96e] text-[11px] font-sans tracking-widest uppercase flex items-center justify-center gap-1 transition-colors border border-[#c9a96e]/20"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#c9a96e]" />
                  <span className="hidden sm:inline">Uvećaj</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetails(product);
                  }}
                  className="py-2 px-1.5 bg-[#0a0a0a] hover:bg-[#111111] text-[#e8e0d4] hover:text-[#c9a96e] text-[11px] font-sans tracking-widest uppercase flex items-center justify-center gap-1 transition-colors border border-[#c9a96e]/20"
                >
                  <Eye className="w-3.5 h-3.5 text-[#c9a96e]" />
                  <span className="hidden sm:inline">Detalji</span>
                </button>

                {onAddToOutfit && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToOutfit(product);
                    }}
                    className={`py-2 px-1.5 text-[11px] font-sans tracking-widest uppercase flex items-center justify-center gap-1 transition-all border ${
                      isInOutfit
                        ? 'bg-[#c9a96e]/20 border-[#c9a96e]/60 text-[#c9a96e]'
                        : 'bg-[#0a0a0a] hover:bg-[#111111] text-[#e8e0d4] hover:text-[#c9a96e] border-[#c9a96e]/20'
                    }`}
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isInOutfit ? 'Outfit' : 'Outfit'}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleQuickAdd}
                  disabled={isQuickAdding}
                  className={`py-2 px-1.5 font-medium text-[11px] font-sans tracking-widest uppercase flex items-center justify-center gap-1 transition-all ${addedJustNow ? 'bg-[#0a0a0a] text-[#c9a96e]' : 'bg-[#c9a96e] hover:bg-[#a7823b] text-[#0a0a0a]'}`}
                >
                  {addedJustNow ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Dodato</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">U izbor</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Card Body */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2 sm:space-y-4">
          {/* Category — na telefonu uz nju ide i badge koji je ranije prekrivao sliku */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-medium">
              {product.categoryLabelSr}
            </div>
            {product.badge && (
              <span className="sm:hidden glass-chip inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] uppercase font-sans tracking-wider font-medium text-[#c9a96e] border border-[#c9a96e]/40">
                <Tag className="w-2.5 h-2.5 text-[#c9a96e]" />
                {product.badge}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif-luxury text-sm sm:text-lg text-[#e8e0d4] font-normal leading-snug group-hover:text-[#c9a96e] transition-colors duration-300">
            {product.nameSr}
          </h3>

          {/* Subtitle */}
          <p className="text-xs sm:text-xs text-[#e8e0d4]/70 line-clamp-2 leading-relaxed font-light font-sans">
            {product.subtitleSr}
          </p>

          {/* Ocena iz recenzija (prikazuje se samo ako postoji barem jedna) */}
          {reviewStat && reviewStat.count > 0 && (
            <div className="flex items-center gap-1.5 pt-0.5">
              <Stars rating={reviewStat.avg} size={12} />
              <span className="text-[11px] text-[#e8e0d4]/70 font-mono">{formatAvg(reviewStat.avg)}</span>
              <span className="text-[11px] text-[#e8e0d4]/40 font-sans">
                ({reviewStat.count})
              </span>
            </div>
          )}
        </div>

        {/* Price and Action Footer */}
        <div className="mt-4 sm:mt-6 pt-3 border-t border-[#c9a96e]/20">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-xs sm:text-base font-semibold text-[#e8e0d4] tracking-wide font-mono">
                {FORMAT_RSD(product.priceRSD)}
              </span>
              {product.originalPriceRSD && (
                <span className="text-[11px] sm:text-xs text-[#e8e0d4]/40 line-through font-mono">
                  {FORMAT_RSD(product.originalPriceRSD)}
                </span>
              )}
              {/* Zaliha — na telefonu umesto preko slike */}
              {stockCount !== null && stockCount <= 3 && stockCount > 0 && (
                <span className="sm:hidden text-[11px] uppercase tracking-wider text-red-400 font-sans font-medium">
                  Još {stockCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-[11px] sm:text-[11px] text-[#c9a96e] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 uppercase tracking-wider font-sans">
                Detalji &rarr;
              </span>

              {/* Omiljeni — na telefonu pored cene, umesto preko slike */}
              <button
                type="button"
                aria-label={isWishlisted ? `Ukloni ${product.nameSr} iz omiljenih` : `Dodaj ${product.nameSr} u omiljene`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(product);
                }}
                className={`sm:hidden flex items-center justify-center min-h-[44px] min-w-[44px] -my-2 transition-colors ${isWishlisted ? 'text-[#c9a96e]' : 'text-[#e8e0d4]/70 hover:text-[#c9a96e]'}`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
