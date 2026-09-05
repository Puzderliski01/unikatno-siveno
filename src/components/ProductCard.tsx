import React, { useState } from 'react';
import { Eye, ZoomIn, ShoppingBag, Heart, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { FORMAT_RSD } from '../data/products';
import { OptimizedImage } from './OptimizedImage';
import { usePredictivePreload } from '../hooks/usePredictivePreload';
import { Tooltip } from './Tooltip';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onOpenDetails: (product: Product) => void;
  onOpenZoom: (product: Product, index?: number) => void;
  onQuickAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({
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
  const { handleProductHover } = usePredictivePreload([product], { preloadOnHover: true, preloadNextInCategory: false });

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
      className="group relative bg-[#111111] border border-[#c9a96e]/20 hover:border-[#c9a96e]/60 rounded-none overflow-hidden transition-all duration-500 flex flex-col cursor-pointer shadow-sm hover:shadow-[0_8px_40px_rgba(201,169,110,0.25)]"
      onMouseEnter={(e) => {
        setIsHovered(true);
        handleProductHover(product.id);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenDetails(product)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1a1a1a] pt-6 studio-light-overlay">
        <OptimizedImage
          src={product.images[0]}
          alt={product.nameSr}
          className="h-full w-full object-cover object-center transition-transform duration-700"
          loading="lazy"
          priority={false}
        />

        {/* Subtle Gradient Overlay at Bottom */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent"
          animate={{ opacity: isHovered ? 0.9 : 0.5 }}
          transition={{ duration: 0.4 }}
        />

        {/* Top Badges & Wishlist Button */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          {product.badge ? (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] uppercase font-sans tracking-[0.2em] font-medium bg-[#0a0a0a] text-[#c9a96e] border border-[#c9a96e]/40"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#c9a96e]" />
              {product.badge}
            </motion.span>
          ) : (
            <span />
          )}

          <Tooltip placement="left" label={isWishlisted ? 'Ukloni iz liste želja' : 'Dodaj u listu želja'}>
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product);
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              className={`p-2 transition-all duration-300 ${isWishlisted ? 'bg-[#c9a96e] text-[#0a0a0a] shadow-md' : 'bg-[#0a0a0a]/90 text-[#e8e0d4] hover:bg-[#c9a96e] hover:text-[#0a0a0a] border border-[#c9a96e]/20'}`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-center' : ''}`} />
            </motion.button>
          </Tooltip>
        </div>

        {/* Hover Quick Actions Reveal Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 bottom-0 p-3.5 flex flex-col gap-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Quick size selection chips */}
              <div className="flex items-center justify-center gap-1.5 flex-wrap bg-[#0a0a0a]/95 backdrop-blur-md p-1.5 border border-[#c9a96e]/30">
                <span className="text-[9px] uppercase tracking-wider text-[#e8e0d4]/70 mr-1 font-sans">Veličina:</span>
                {product.sizes.slice(0, 4).map((size) => (
                  <Tooltip placement="top" label={size}>
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
                  </Tooltip>
                ))}
              </div>

              {/* Action buttons row */}
              <div className="grid grid-cols-3 gap-1.5">
                <Tooltip placement="top" label="Uvećaj fotografiju">
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenZoom(product, 0);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-1.5 bg-[#0a0a0a] hover:bg-[#111111] text-[#e8e0d4] hover:text-[#c9a96e] text-[10px] font-sans tracking-widest uppercase flex items-center justify-center gap-1 transition-colors border border-[#c9a96e]/20"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-[#c9a96e]" />
                    <span className="hidden sm:inline">Uvećaj</span>
                  </motion.button>
                </Tooltip>

                <Tooltip placement="top" label="Pogledaj detalje">
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetails(product);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-1.5 bg-[#0a0a0a] hover:bg-[#111111] text-[#e8e0d4] hover:text-[#c9a96e] text-[10px] font-sans tracking-widest uppercase flex items-center justify-center gap-1 transition-colors border border-[#c9a96e]/20"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#c9a96e]" />
                    <span className="hidden sm:inline">Detalji</span>
                  </motion.button>
                </Tooltip>

                <Tooltip placement="top" label="Brzo dodaj u korpu">
                  <motion.button
                    type="button"
                    onClick={handleQuickAdd}
                    disabled={isQuickAdding}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`py-2 px-1.5 font-medium text-[10px] font-sans tracking-widest uppercase flex items-center justify-center gap-1 transition-all ${addedJustNow ? 'bg-[#0a0a0a] text-[#c9a96e]' : 'bg-[#c9a96e] hover:bg-[#a7823b] text-[#0a0a0a]'}`}
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
                </Tooltip>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Card Body */}
      <div className="p-6 sm:p-6 flex-1 flex flex-col justify-between bg-[#111111]">
        <div className="space-y-4">
          {/* Category */}
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-medium">
            {product.categoryLabelSr}
          </div>

          {/* Title */}
          <h3 className="font-serif-luxury text-base sm:text-lg text-[#e8e0d4] font-normal leading-snug group-hover:text-[#c9a96e] transition-colors duration-300">
            {product.nameSr}
          </h3>

          {/* Subtitle / Short description snippet */}
          <p className="text-xs text-[#e8e0d4]/70 line-clamp-2 leading-relaxed font-light font-sans">
            {product.subtitleSr}
          </p>
        </div>

        {/* Price and Action Footer */}
        <div className="mt-6 pt-3.5 border-t border-[#c9a96e]/20 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-semibold text-[#e8e0d4] tracking-wide font-mono">
              {FORMAT_RSD(product.priceRSD)}
            </span>
            {product.originalPriceRSD && (
              <span className="text-xs text-[#e8e0d4]/40 line-through font-mono">
                {FORMAT_RSD(product.originalPriceRSD)}
              </span>
            )}
          </div>

          <motion.span 
            className="text-[11px] text-[#c9a96e] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 uppercase tracking-wider font-sans"
          >
            Detalji &rarr;
          </motion.span>
        </div>
      </div>
    </div>
  );
});
