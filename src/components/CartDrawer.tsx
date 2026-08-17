import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Gift, Truck, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem } from '../types';
import { FORMAT_RSD } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onExploreCollection: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreCollection,
}) => {
  const [isGiftWrap, setIsGiftWrap] = useState(true);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.priceRSD * item.quantity, 0);
  const freeShippingThreshold = 10000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingCost = isFreeShipping || subtotal === 0 ? 0 : 450;
  const total = subtotal + shippingCost;

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
          className="w-screen max-w-md bg-[#FCFBF7] border-l border-[#1A1A1A]/20 text-[#1A1A1A] flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-[#F4F2EC]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
              <h2 className="font-serif-luxury text-xl text-[#1A1A1A]">
                Vaša korpa ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              id="cart-drawer-close-btn"
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-[#1A1A1A]/5 text-[#1A1A1A] transition-colors"
              aria-label="Zatvori korpu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar (Serbia) */}
          <div className="bg-[#ECE8DF] p-3.5 border-b border-[#1A1A1A]/10 text-xs font-sans">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[#1A1A1A]/80 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                {isFreeShipping ? (
                  <strong className="text-[#8C6D23]">Ostvarili ste besplatnu Post Express dostavu!</strong>
                ) : (
                  <span>
                    Dodajte još <strong className="text-[#8C6D23] font-mono">{FORMAT_RSD(remainingForFreeShipping)}</strong> za besplatnu dostavu u Srbiji
                  </span>
                )}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#1A1A1A]/10 overflow-hidden">
              <div
                className="h-full bg-[#C5A059] transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 bg-[#F4F2EC] border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A]/40 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-xl text-[#1A1A1A] mb-2">Vaša korpa je prazna</h3>
                <p className="text-xs text-[#1A1A1A]/60 max-w-xs mb-6">
                  Istražite našu kolekciju unikatnih toaleta, vunenih sakoa i svilenih bluza krojeni po meri.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExploreCollection();
                  }}
                  className="px-6 py-3 bg-[#1A1A1A] text-[#FCFBF7] hover:bg-[#333333] font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  Istražite kolekciju
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white border border-[#1A1A1A]/15 flex gap-3.5 items-start shadow-sm"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.nameSr}
                      className="w-16 h-20 object-cover border border-[#1A1A1A]/10 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif-luxury text-sm text-[#1A1A1A] leading-snug line-clamp-1">
                        {item.product.nameSr}
                      </h4>
                      <div className="text-[11px] text-[#8C6D23] mt-0.5 font-mono">
                        Veličina: {item.size}
                      </div>

                      {item.customMeasurements && (
                        <div className="text-[10px] text-[#1A1A1A]/70 mt-0.5 italic">
                          Šiveno po meri (V:{item.customMeasurements.height || '-'}cm, G:{item.customMeasurements.bust || '-'}cm)
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#1A1A1A]/20 bg-[#F4F2EC]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[#1A1A1A]/70 hover:text-black"
                            aria-label="Smanji količinu"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono text-[#1A1A1A] font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#1A1A1A]/70 hover:text-black"
                            aria-label="Povećaj količinu"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-xs font-semibold text-[#1A1A1A]">
                          {FORMAT_RSD(item.product.priceRSD * item.quantity)}
                        </span>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#1A1A1A]/40 hover:text-rose-600 p-1 transition-colors"
                          aria-label="Ukloni artikal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Gift Wrap Offer */}
                <div className="p-3.5 bg-[#F4F2EC] border border-[#C5A059]/40 flex items-start gap-3 text-xs">
                  <Gift className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-[#1A1A1A]">
                      <input
                        type="checkbox"
                        checked={isGiftWrap}
                        onChange={(e) => setIsGiftWrap(e.target.checked)}
                        className="accent-[#C5A059]"
                      />
                      <span>Luksuzno satensko pakovanje ateljea (Besplatno)</span>
                    </label>
                    <p className="text-[10px] text-[#1A1A1A]/70 mt-1">
                      Kutija sa zlatotiskom, mirišljavim svilastim papirom i personalizovanom porukom Jelene Erić.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer / Checkout CTA */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-[#1A1A1A]/10 bg-[#F4F2EC] space-y-3 font-sans">
              <div className="space-y-1.5 text-xs text-[#1A1A1A]/80">
                <div className="flex justify-between">
                  <span>Međuzbir:</span>
                  <span className="font-mono text-[#1A1A1A]">{FORMAT_RSD(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dostava u Srbiji (Post Express):</span>
                  <span className="font-mono text-[#1A1A1A]">
                    {shippingCost === 0 ? (
                      <span className="text-[#8C6D23] uppercase font-bold text-[10px]">Besplatna</span>
                    ) : (
                      FORMAT_RSD(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#1A1A1A] pt-2 border-t border-[#1A1A1A]/10">
                  <span className="font-serif-luxury text-base">Ukupno za plaćanje:</span>
                  <span className="font-mono text-[#1A1A1A] font-bold">{FORMAT_RSD(total)}</span>
                </div>
              </div>

              <button
                id="cart-proceed-checkout-btn"
                type="button"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-4 bg-[#1A1A1A] hover:bg-[#333333] text-[#FCFBF7] font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Poručite odmah (Srbija)</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-[#1A1A1A]/50 pt-1">
                <span>• Sigurna kupovina</span>
                <span>• Plaćanje pouzećem ili karticom</span>
                <span>• Topola</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
