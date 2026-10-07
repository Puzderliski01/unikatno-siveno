import React from 'react';
import { X, Trash2, Plus, Minus, ListChecks, MessageCircle, Copy, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem } from '../types';
import { FORMAT_RSD } from '../data/products';
import { Img } from './Img';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface CartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onShareWhatsApp: () => void;
  onCopyForInstagram: () => void;
  onExploreCollection: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onShareWhatsApp,
  onCopyForInstagram,
  onExploreCollection,
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.priceRSD * item.quantity, 0);

  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full sm:max-w-md glass-strong border-l border-[#e8e0d4]/20 text-[#e8e0d4] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#e8e0d4]/10 flex items-center justify-between glass-inner">
            <div className="flex items-center gap-2.5">
              <ListChecks className="w-5 h-5 text-[#c9a96e]" />
              <h2 className="font-serif-luxury text-xl text-[#e8e0d4]">
                Vaš izbor ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              id="cart-drawer-close-btn"
              type="button"
              onClick={onClose}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-[#e8e0d4]/5 text-[#e8e0d4] transition-colors"
              aria-label="Zatvori izbor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* How it works */}
          <div className="glass-inner p-3.5 border-b border-[#e8e0d4]/10 text-xs font-sans text-[#e8e0d4]/75 leading-relaxed">
            Sakupljene modele pošaljite nam porukom — oko porudžbine i dogovaramo se lično.
            Na sajtu nema online plaćanja.
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 glass-inner border border-[#e8e0d4]/10 flex items-center justify-center text-[#e8e0d4]/40 mb-4">
                  <ListChecks className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-xl text-[#e8e0d4] mb-2">Vaš izbor je prazan</h3>
                <p className="text-xs text-[#e8e0d4]/60 max-w-xs mb-6">
                  Istražite kolekciju unikatnih toaleta, sakoa i svilenih bluza i dodajte modele
                  koji vam se dopadaju.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExploreCollection();
                  }}
                  className="px-6 py-3.5 min-h-[44px] bg-[#e8e0d4] text-[#0a0a0a] hover:bg-[#c9a96e] font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  Istražite kolekciju
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 glass-inner border border-[#e8e0d4]/15 flex gap-3.5 items-start shadow-sm"
                  >
                    <Img
                      src={item.product.images[0]}
                      alt={item.product.nameSr}
                      className="w-16 h-20 object-cover border border-[#e8e0d4]/10 flex-shrink-0"
                      loading="lazy"
                      decoding="async"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif-luxury text-sm text-[#e8e0d4] leading-snug line-clamp-1">
                        {item.product.nameSr}
                      </h4>
                      <div className="text-[11px] text-[#c9a96e] mt-0.5 font-mono">
                        Veličina: {item.size}
                      </div>

                      {item.customMeasurements && (
                        <div className="text-[11px] text-[#e8e0d4]/70 mt-0.5 italic">
                          Šiveno po meri (V:{item.customMeasurements.height || '-'}cm, G:{item.customMeasurements.bust || '-'}cm)
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#e8e0d4]/20 glass-inner">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-2 sm:p-1 text-[#e8e0d4]/70 hover:text-[#e8e0d4]"
                            aria-label="Smanji količinu"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono text-[#e8e0d4] font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 sm:p-1 text-[#e8e0d4]/70 hover:text-[#e8e0d4]"
                            aria-label="Povećaj količinu"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-xs font-semibold text-[#e8e0d4]">
                          {FORMAT_RSD(item.product.priceRSD * item.quantity)}
                        </span>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#e8e0d4]/40 hover:text-rose-600 p-1 transition-colors"
                          aria-label="Ukloni artikal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer / Share CTA */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-[#e8e0d4]/10 glass-inner space-y-3 font-sans">
              <div className="flex items-center justify-between text-xs text-[#e8e0d4]/80">
                <span>Vrednost izbora:</span>
                <span className="font-mono text-[#c9a96e] font-bold text-sm">{FORMAT_RSD(subtotal)}</span>
              </div>

              <button
                id="cart-share-whatsapp-btn"
                type="button"
                onClick={() => {
                  onClose();
                  onShareWhatsApp();
                }}
                className="w-full py-5 sm:py-4 bg-[#e8e0d4] hover:bg-[#c9a96e] text-[#0a0a0a] font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pošalji izbor na WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="cart-copy-instagram-btn"
                type="button"
                onClick={() => {
                  onClose();
                  onCopyForInstagram();
                }}
                className="w-full py-3.5 border border-[#c9a96e]/40 bg-[#0a0a0a] hover:bg-[#c9a96e]/10 text-[#c9a96e] font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                <span>Kopiraj za Instagram DM</span>
              </button>

              <p className="text-[11px] text-[#e8e0d4]/50 text-center leading-relaxed pt-1">
                Sajt ne vrši prodaju niti naplatu — porudžbinu dogovaramo lično, porukom.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
