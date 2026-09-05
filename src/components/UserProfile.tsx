import React from 'react';
import { MOCK_USER, getWishlistProducts, getPurchaseHistoryWithDetails } from '../data/mockUser';
import { Product } from '../types';
import { FORMAT_RSD } from '../data/products';
import { Eye, ShoppingBag, Sparkles, Trophy, Calendar, Users, Check, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const wishlistProducts = getWishlistProducts();
  const purchaseHistory = getPurchaseHistoryWithDetails();

  if (!isOpen) return null;

  return (
    <div
      id="user-profile-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl bg-[#0a0a0a] border border-[#e8e0d4]/20 shadow-2xl text-[#e8e0d4] max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-[#e8e0d4]/10 bg-[#111111]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-semibold">
              Profil korisnika
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="user-profile-close-btn"
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-[#e8e0d4]/5 text-[#e8e0d4] transition-colors"
              aria-label="Zatvori profil"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="flex-1 min-h-0 overflow-hidden p-4 sm:p-6 gap-6">
          {/* User Info Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center rounded-full border border-[#c9a96e]/20">
                <Sparkles className="w-8 h-8 text-[#c9a96e]" />
              </div>
              <div className="space-y-1">
                <h2 className="font-serif-luxury text-xl text-[#e8e0d4] font-normal leading-snug">
                  {MOCK_USER.fullName}
                </h2>
                <p className="text-sm text-[#e8e0d4]/70 flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-[#c9a96e]" />
                  <span>Članica od {new Date(MOCK_USER.joinDate).toLocaleDateString('sr-RS', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </p>
              </div>
            </div>

            {/* VIP Status */}
            <div className="flex items-center gap-4 bg-[#111111] p-4 rounded-none border border-[#c9a96e]/20">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#c9a96e]" />
                <span className="text-xs uppercase tracking-wider text-[#c9a96e]">VIP Status</span>
              </div>
              <div className="flex-1 space-x-4 text-right">
                <span className="font-semibold text-[18px]">
                  {MOCK_USER.vipLevel === 'none' ? 'Standard' : MOCK_USER.vipLevel.toUpperCase()}
                </span>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`w-2 h-2 bg-[#c9a96e] ${level <= (
                        MOCK_USER.vipLevel === 'silver' ? 2 :
                        MOCK_USER.vipLevel === 'gold' ? 3 :
                        MOCK_USER.vipLevel === 'platinum' ? 4 : 0
                      ) ? '' : '/20'} rounded-full`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Loyalty Points */}
            <div className="flex items-center gap-4 bg-[#111111] p-4 rounded-none border border-[#c9a96e]/20">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c9a96e]" />
                <span className="text-xs uppercase tracking-wider text-[#c9a96e]">Loyalty poeni</span>
              </div>
              <div className="flex-1 text-right font-semibold text-[24px]">
                {MOCK_USER.loyaltyPoints.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t border-[#e8e0d4]/10 pt-6">
            <div className="flex items-center gap-3 sm:gap-4 border-b border-[#e8e0d4]/10 pb-2 mb-4 font-sans">
              <button
                type="button"
                className={`whitespace-nowrap text-xs uppercase tracking-wider pb-2 relative transition-colors ${
                  'purchase-history'
                    ? 'text-[#e8e0d4] font-bold after:content-[\'\'] after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a96e]'
                    : 'text-[#e8e0d4]/60 hover:text-[#e8e0d4]'
                }`}
              >
                Povijest kupovina
              </button>
              <button
                type="button"
                className={`whitespace-nowrap text-xs uppercase tracking-wider pb-2 relative transition-colors ${
                  'wishlist'
                    ? 'text-[#e8e0d4] font-bold after:content-[\'\'] after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a96e]'
                    : 'text-[#e8e0d4]/60 hover:text-[#e8e0d4]'
                }`}
              >
                Lista želja
              </button>
              <button
                type="button"
                className={`whitespace-nowrap text-xs uppercase tracking-wider pb-2 relative transition-colors ${
                  'exclusive'
                    ? 'text-[#e8e0d4] font-bold after:content-[\'\'] after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a96e]'
                    : 'text-[#e8e0d4]/60 hover:text-[#e8e0d4]'
                }`}
              >
                Eksklusivni pozivi
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {/* Purchase History Tab */}
              <div className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-semibold mb-2">
                  Povijest kupovina
                </h3>

                {purchaseHistory.length > 0 ? (
                  purchaseHistory.map((item) => (
                    <div key={item.id} className="border border-[#e8e0d4]/10 p-4 flex items-center gap-4">
                      <div className="w-20 h-24 flex-shrink-0">
                        <motion.img
                          src={item.product.images[0]}
                          alt={item.product.nameSr}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-serif-luxury text-sm text-[#e8e0d4] font-normal">
                          {item.product.nameSr}
                        </h4>
                        <p className="text-xs text-[#e8e0d4]/70">
                          {item.product.subtitleSr}
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="font-mono">{FORMAT_RSD(item.price)}</span>
                          <span className="text-[#e8e0d4]/50">|</span>
                          <span>{item.size}</span>
                          <span className="text-[#e8e0d4]/50">|</span>
                          <span className={`
                            px-2 py-0.5 text-[9px] rounded
                            ${item.status === 'delivered' ? 'bg-[#1a1a1a] text-[#c9a96e]' :
                              item.status === 'processing' ? 'bg-[#1a1a1a] text-[#a08540]' :
                              item.status === 'shipped' ? 'bg-[#1a1a1a] text-[#c9a96e]/50' :
                              item.status === 'cancelled' ? 'bg-[#1a1a1a]/20 text-[#e8e0d4]/50' :
                                                            'bg-[#1a1a1a]/20 text-[#e8e0d4]/50'}
                          `}>
                            {item.status === 'delivered' && 'Isporučeno'}
                            {item.status === 'processing' && 'U obradi'}
                            {item.status === 'shipped' && 'U transporte'}
                            {item.status === 'cancelled' && 'Otkaženo'}
                            {item.status === 'confirmed' && 'Potvrđeno'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-[#e8e0d4]/50">
                    Nema kupovina u povijesti
                  </p>
                )}
              </div>

              {/* Wishlist Tab */}
              <div className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-semibold mb-2">
                  Lista želja
                </h3>

                {wishlistProducts.length > 0 ? (
                  wishlistProducts.map((product) => (
                    <div key={product.id} className="border border-[#e8e0d4]/10 p-4 flex items-center gap-4">
                      <div className="w-20 h-24 flex-shrink-0">
                        <motion.img
                          src={product.images[0]}
                          alt={product.nameSr}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-serif-luxury text-sm text-[#e8e0d4] font-normal">
                          {product.nameSr}
                        </h4>
                        <p className="text-xs text-[#e8e0d4]/70">
                          {product.subtitleSr}
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="font-mono">{FORMAT_RSD(product.priceRSD)}</span>
                          <ShoppingBag className="w-3 h-3 text-[#c9a96e]" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-[#e8e0d4]/50">
                    Lista želja je prazna
                  </p>
                )}
              </div>

              {/* Exclusive Invitations Tab */}
              <div className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-semibold mb-2">
                  Eksklusivni pozivi
                </h3>

                {MOCK_USER.exclusiveInvitations.length > 0 ? (
                  MOCK_USER.exclusiveInvitations.map((inv) => (
                    <div key={inv.id} className="border border-[#e8e0d4]/10 p-4 flex items-center gap-4">
                      <div className="w-20 h-24 flex-shrink-0">
                        <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                          <Users className="w-6 h-6 text-[#c9a96e]" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-serif-luxury text-sm text-[#e8e0d4] font-normal">
                          {inv.title}
                        </h4>
                        <p className="text-xs text-[#e8e0d4]/70">
                          {inv.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="font-mono">
                            {new Date(inv.date).toLocaleDateString('sr-RS', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          {inv.expiresAt && (
                            <>
                              <span className="text-[#e8e0d4]/50 mx-2">|</span>
                              <span className="text-[9px] text-[#a08540]">
                                Važi do: {new Date(inv.expiresAt).toLocaleDateString('sr-RS', {
                                  day: 'numeric',
                                  month: 'short'
                                })}
                              </span>
                            </>
                          )}
                        </div>
                        {inv.isRsvp && (
                          <div className="mt-2 flex items-center gap-2 text-[9px]">
                            <span className="text-[#e8e0d4]/50">RSVP:</span>
                            <span className={`px-2 py-0.5 rounded
                              ${inv.rsvpStatus === 'accepted' ? 'bg-[#1a1a1a] text-[#c9a96e]' :
                                inv.rsvpStatus === 'declined' ? 'bg-[#1a1a1a]/20 text-[#e8e0d4]/50' :
                                                              'bg-[#1a1a1a] text-[#a08540]'}
                            `}>
                              {inv.rsvpStatus === 'pending' && 'Na čekanju'}
                              {inv.rsvpStatus === 'accepted' && 'Prihvaćeno'}
                              {inv.rsvpStatus === 'declined' && 'Odbaceno'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-[#e8e0d4]/50">
                    Nema eksklusivnih poziva
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};