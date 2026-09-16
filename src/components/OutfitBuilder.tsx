import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors, X, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { FORMAT_RSD } from '../data/products';
import { OptimizedImage } from './OptimizedImage';

interface OutfitBuilderProps {
  isOpen: boolean;
  onToggle: () => void;
  outfitItems: Product[];
  onRemove: (productId: string) => void;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const OutfitBuilder: React.FC<OutfitBuilderProps> = React.memo(({
  isOpen,
  onToggle,
  outfitItems,
  onRemove,
  onOpenDetails,
  onAddToCart,
}) => {
  const totalPrice = outfitItems.reduce((sum, p) => sum + p.priceRSD, 0);

  return (
    <>
      {/* Toggle Button - appears when items exist */}
      {outfitItems.length > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          type="button"
          onClick={onToggle}
          className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 z-45 flex items-center gap-2 px-4 py-2.5 bg-[#111111] border border-[#c9a96e]/40 text-[#c9a96e] text-xs font-sans uppercase tracking-wider hover:bg-[#1a1a1a] transition-colors shadow-lg"
        >
          <Scissors className="w-4 h-4" />
          <span>Outfit ({outfitItems.length})</span>
        </motion.button>
      )}

      {/* Outfit Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 20, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="outfit-builder-panel lg:bottom-20 lg:right-8"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#c9a96e]" />
                <span className="text-xs uppercase tracking-[0.15em] text-[#c9a96e] font-sans font-semibold">
                  Outfit Builder
                </span>
              </div>
              <button
                type="button"
                onClick={onToggle}
                className="p-1 text-[#e8e0d4]/60 hover:text-[#e8e0d4] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-none mb-3">
              {outfitItems.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-2 bg-[#0a0a0a] border border-[#c9a96e]/20 group"
                >
                  <div className="w-12 h-14 flex-shrink-0 overflow-hidden">
                    <OptimizedImage
                      src={product.images[0]}
                      alt={product.nameSr}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#e8e0d4] font-sans truncate">{product.nameSr}</p>
                    <p className="text-[10px] text-[#c9a96e] font-mono">{FORMAT_RSD(product.priceRSD)}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => onOpenDetails(product)}
                      className="p-1 text-[#e8e0d4]/60 hover:text-[#c9a96e] transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(product.id)}
                      className="p-1 text-[#e8e0d4]/60 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total + Action */}
            <div className="pt-3 border-t border-[#c9a96e]/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-[#e8e0d4]/60 font-sans">Ukupno outfit</span>
                <span className="text-sm font-semibold text-[#c9a96e] font-mono">{FORMAT_RSD(totalPrice)}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  outfitItems.forEach((p) => onAddToCart(p, p.sizes[1] || p.sizes[0]));
                }}
                className="w-full py-2.5 bg-[#c9a96e] text-[#0a0a0a] text-[10px] uppercase tracking-[0.15em] font-semibold font-sans flex items-center justify-center gap-2 hover:bg-[#b89a60] transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Dodaj sve u korpu</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
