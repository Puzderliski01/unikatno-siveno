import React, { useState } from 'react';
import { Eye, ZoomIn, ShoppingBag, Heart, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { FORMAT_RSD } from '../data/products';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onOpenDetails: (product: Product) => void;
  onOpenZoom: (product: Product, index?: number) => void;
  onQuickAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onOpenDetails,
  onOpenZoom,
  onQuickAddToCart,
  onToggleWishlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState<string>(product.sizes[1] || product.sizes[0]);
  const [isQuickAdding, setIsQuickAdding] = useState(false);
  const [addedJustNow, setAddedJustNow] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsQuickAdding(true);
    setTimeout(() => {
      onQuickAddToCart(product, selectedQuickSize);
      setIsQuickAdding(false);
      setAddedJustNow(true);
      setTimeout(() => setAddedJustNow(false), 2000);
    }, 300);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative bg-white border border-[#1A1A1A]/15 hover:border-[#C5A059] rounded-none overflow-hidden transition-colors duration-500 flex flex-col cursor-pointer shadow-sm hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenDetails(product)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4F1EA]">
        <motion.img
          src={product.images[0]}
          alt={product.nameSr}
          className="h-full w-full object-cover object-center"
          loading="lazy"
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform' }}
        />

        {/* Subtle Gradient Overlay at Bottom */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"
          animate={{ opacity: isHovered ? 0.7 : 0.3 }}
          transition={{ duration: 0.4 }}
        />

        {/* Top Badges & Wishlist Button */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          {product.badge ? (
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] uppercase font-sans tracking-[0.2em] font-medium bg-[#1A1A1A] text-[#FCFBF7] border border-[#C5A059]/40"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" />
              {product.badge}
            </motion.span>
          ) : (
            <span />
          )}

          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            className={`p-2 transition-all duration-300 ${
              isWishlisted
                ? 'bg-[#C5A059] text-black shadow-md'
                : 'bg-[#FCFBF7]/90 text-[#1A1A1A] hover:bg-[#C5A059] hover:text-black border border-[#1A1A1A]/20'
            }`}
            aria-label={isWishlisted ? 'Ukloni iz liste želja' : 'Dodaj u listu želja'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {/* Hover Quick Actions Reveal Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 bottom-0 p-3.5 flex flex-col gap-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Quick size selection chips */}
              <div className="flex items-center justify-center gap-1.5 flex-wrap bg-[#1A1A1A]/90 backdrop-blur-md p-1.5 border border-[#C5A059]/30">
                <span className="text-[9px] uppercase tracking-wider text-[#FCFBF7]/70 mr-1 font-sans">Veličina:</span>
                {product.sizes.slice(0, 4).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedQuickSize(size);
                    }}
                    className={`px-2 py-0.5 text-[9px] font-mono transition-colors ${
                      selectedQuickSize === size
                        ? 'bg-[#C5A059] text-black font-bold'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {size.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Action buttons row */}
              <div className="grid grid-cols-3 gap-1.5">
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenZoom(product, 0);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-2 px-1.5 bg-[#1A1A1A] hover:bg-black text-[#FCFBF7] hover:text-[#C5A059] text-[10px] font-sans tracking-widest uppercase flex items-center justify-center gap-1 transition-colors border border-white/10"
                  title="Uvećaj fotografiju"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="hidden sm:inline">Uvećaj</span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetails(product);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-2 px-1.5 bg-[#1A1A1A] hover:bg-black text-[#FCFBF7] hover:text-[#C5A059] text-[10px] font-sans tracking-widest uppercase flex items-center justify-center gap-1 transition-colors border border-white/10"
                  title="Pogledaj detalje"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="hidden sm:inline">Detalji</span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleQuickAdd}
                  disabled={isQuickAdding}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`py-2 px-1.5 font-medium text-[10px] font-sans tracking-widest uppercase flex items-center justify-center gap-1 transition-all ${
                    addedJustNow
                      ? 'bg-[#1A1A1A] text-[#C5A059]'
                      : 'bg-[#C5A059] hover:bg-[#A7823B] text-black'
                  }`}
                  title="Brzo dodaj u korpu"
                >
                  {addedJustNow ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Dodato</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Kupi</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#FCFBF7]">
        <div>
          {/* Category */}
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-medium mb-1.5">
            {product.categoryLabelSr}
          </div>

          {/* Title */}
          <h3 className="font-serif-luxury text-base sm:text-lg text-[#1A1A1A] font-normal leading-snug group-hover:text-[#C5A059] transition-colors duration-300 mb-1.5">
            {product.nameSr}
          </h3>

          {/* Subtitle / Short description snippet */}
          <p className="text-xs text-[#1A1A1A]/70 line-clamp-2 leading-relaxed font-light font-sans">
            {product.subtitleSr}
          </p>
        </div>

        {/* Price and Action Footer */}
        <div className="mt-4 pt-3.5 border-t border-[#1A1A1A]/10 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-semibold text-[#1A1A1A] tracking-wide font-mono">
              {FORMAT_RSD(product.priceRSD)}
            </span>
            {product.originalPriceRSD && (
              <span className="text-xs text-[#1A1A1A]/40 line-through font-mono">
                {FORMAT_RSD(product.originalPriceRSD)}
              </span>
            )}
          </div>

          <motion.span 
            className="text-[11px] text-[#C5A059] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 uppercase tracking-wider font-sans"
          >
            Detalji &rarr;
          </motion.span>
        </div>
      </div>
    </div>
  );
};