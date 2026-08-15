import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { FORMAT_RSD } from '../data/products';

interface WishlistModalProps {
  isOpen: boolean;
  wishlistProducts: Product[];
  onClose: () => void;
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  wishlistProducts,
  onClose,
  onRemoveFromWishlist,
  onMoveToCart,
  onOpenDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="wishlist-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm font-sans"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-[#FCFBF7] border border-[#1A1A1A]/20 shadow-2xl overflow-hidden text-[#1A1A1A] my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#1A1A1A]/10 bg-[#F4F2EC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" />
            <h3 className="font-serif-luxury text-lg text-[#1A1A1A]">
              Vaša lista želja ({wishlistProducts.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-[#1A1A1A]/5 text-[#1A1A1A] transition-colors"
            aria-label="Zatvori listu želja"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-[#1A1A1A]/20 mx-auto mb-3" />
              <p className="font-serif-luxury text-lg text-[#1A1A1A] mb-2">Vaša lista želja je prazna</p>
              <p className="text-xs text-[#1A1A1A]/60 max-w-xs mx-auto mb-6">
                Kliknite na ikonu srca na bilo kom modelu kako biste ga sačuvali za kasnije razgledanje ili probu.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#FCFBF7] font-semibold text-xs uppercase tracking-wider transition-colors"
              >
                Pregledaj kolekciju
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3.5 bg-white border border-[#1A1A1A]/15 flex items-center gap-4 hover:border-[#C5A059] transition-colors shadow-sm"
                >
                  <img
                    src={product.images[0]}
                    alt={product.nameSr}
                    className="w-16 h-20 object-cover border border-[#1A1A1A]/10 flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onOpenDetails(product);
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4
                      className="font-serif-luxury text-base text-[#1A1A1A] hover:text-[#8C6D23] cursor-pointer truncate"
                      onClick={() => {
                        onClose();
                        onOpenDetails(product);
                      }}
                    >
                      {product.nameSr}
                    </h4>
                    <p className="text-[11px] text-[#1A1A1A]/70 line-clamp-1">{product.subtitleSr}</p>
                    <div className="font-mono text-xs font-semibold text-[#8C6D23] mt-1">
                      {FORMAT_RSD(product.priceRSD)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onMoveToCart(product)}
                      className="p-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#FCFBF7] font-semibold text-xs flex items-center gap-1.5 transition-colors"
                      title="Dodaj u korpu"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="hidden sm:inline">U korpu</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-2.5 hover:bg-[#1A1A1A]/5 text-[#1A1A1A]/40 hover:text-rose-600 transition-colors"
                      title="Ukloni iz liste želja"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
