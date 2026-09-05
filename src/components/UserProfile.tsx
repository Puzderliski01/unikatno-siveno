import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS, FORMAT_RSD } from '../data/products';
import { ShoppingBag, Trophy, Calendar, Users, Check, Heart, X, Loader2, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderItem {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  items: Array<{
    name: string;
    size: string;
    price: number;
    quantity: number;
  }>;
}

interface WishlistItem {
  id: string;
  product_id: string;
  product?: Product;
}

export const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, profile, refreshProfile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('purchase-history');
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchUserData();
    }
  }, [isOpen, user]);

  const fetchUserData = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const [ordersResult, wishlistResult] = await Promise.all([
        supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('wishlists')
          .select('*')
          .eq('user_id', user.id)
      ]);

      if (ordersResult.data) {
        setOrders(ordersResult.data);
      }

      if (wishlistResult.data) {
        const itemsWithProducts = await Promise.all(
          wishlistResult.data.map(async (item) => {
            const product = PRODUCTS.find(p => p.id === item.product_id);
            return { ...item, product };
          })
        );
        setWishlistItems(itemsWithProducts);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  if (!isOpen || !user) return null;

  const vipLevel = profile?.vip_level || 'none';
  const vipLevelNumber = vipLevel === 'silver' ? 2 : vipLevel === 'gold' ? 3 : vipLevel === 'platinum' ? 4 : 0;

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
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#e8e0d4]/60 hover:text-[#e8e0d4] hover:bg-[#e8e0d4]/5 transition-colors"
              title="Odjavi se"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">Odjavi se</span>
            </button>
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
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* User Info Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center rounded-full border border-[#c9a96e]/20">
                <span className="text-2xl font-serif-luxury text-[#c9a96e]">
                  {profile?.full_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div className="space-y-1">
                <h2 className="font-serif-luxury text-xl text-[#e8e0d4] font-normal leading-snug">
                  {profile?.full_name || 'Korisnik'}
                </h2>
                <p className="text-sm text-[#e8e0d4]/70 flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-[#c9a96e]" />
                  <span>Članica od {new Date(user.created_at).toLocaleDateString('sr-RS', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </p>
                <p className="text-xs text-[#e8e0d4]/50">{user.email}</p>
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
                  {vipLevel === 'none' ? 'Standard' : vipLevel.toUpperCase()}
                </span>
                <div className="flex space-x-2 justify-end">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`w-2 h-2 bg-[#c9a96e] ${level <= vipLevelNumber ? '' : '/20'} rounded-full`}
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
                {profile?.loyalty_points?.toLocaleString() || '0'}
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t border-[#e8e0d4]/10 pt-6">
            <div className="flex items-center gap-2 sm:gap-4 border-b border-[#e8e0d4]/10 pb-2 mb-4 font-sans overflow-x-auto scrollbar-none">
              <button
                type="button"
                className={`whitespace-nowrap text-[11px] sm:text-xs uppercase tracking-wider pb-2 relative transition-colors flex-shrink-0 ${
                  activeTab === 'purchase-history'
                    ? 'text-[#e8e0d4] font-bold after:content-[\'\'] after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a96e]'
                    : 'text-[#e8e0d4]/60 hover:text-[#e8e0d4]'
                }`}
                onClick={() => setActiveTab('purchase-history')}
              >
                Kupovine
              </button>
              <button
                type="button"
                className={`whitespace-nowrap text-[11px] sm:text-xs uppercase tracking-wider pb-2 relative transition-colors flex-shrink-0 ${
                  activeTab === 'wishlist'
                    ? 'text-[#e8e0d4] font-bold after:content-[\'\'] after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a96e]'
                    : 'text-[#e8e0d4]/60 hover:text-[#e8e0d4]'
                }`}
                onClick={() => setActiveTab('wishlist')}
              >
                Lista želja
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 text-[#c9a96e] animate-spin" />
                </div>
              ) : (
                <>
                  {activeTab === 'purchase-history' && (
                    <div className="space-y-4">
                      <h3 className="text-[11px] uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-semibold mb-2">
                        Istorija kupovina
                      </h3>

                      {orders.length > 0 ? (
                        orders.map((order) => (
                          <div key={order.id} className="border border-[#e8e0d4]/10 p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="text-xs text-[#e8e0d4]/50">
                                {new Date(order.created_at).toLocaleDateString('sr-RS', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </div>
                              <span className={`
                                px-2 py-0.5 text-[9px] rounded
                                ${order.status === 'delivered' ? 'bg-[#1a1a1a] text-[#c9a96e]' :
                                  order.status === 'processing' ? 'bg-[#1a1a1a] text-[#a08540]' :
                                  order.status === 'shipped' ? 'bg-[#1a1a1a] text-[#c9a96e]/50' :
                                  order.status === 'cancelled' ? 'bg-[#1a1a1a]/20 text-[#e8e0d4]/50' :
                                                                'bg-[#1a1a1a]/20 text-[#e8e0d4]/50'}
                              `}>
                                {order.status === 'delivered' && 'Isporučeno'}
                                {order.status === 'processing' && 'U obradi'}
                                {order.status === 'shipped' && 'U transportu'}
                                {order.status === 'cancelled' && 'Otkazano'}
                                {order.status === 'confirmed' && 'Potvrđeno'}
                              </span>
                            </div>
                            {order.items?.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 py-2 border-t border-[#e8e0d4]/5">
                                <div className="w-12 h-14 flex-shrink-0 bg-[#1a1a1a] flex items-center justify-center">
                                  <ShoppingBag className="w-4 h-4 text-[#c9a96e]" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-serif-luxury text-sm text-[#e8e0d4]">{item.name}</p>
                                  <p className="text-xs text-[#e8e0d4]/50">Veličina: {item.size}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-mono text-sm">{FORMAT_RSD(item.price)}</p>
                                  <p className="text-xs text-[#e8e0d4]/50">x{item.quantity}</p>
                                </div>
                              </div>
                            ))}
                            <div className="mt-3 pt-3 border-t border-[#e8e0d4]/10 flex justify-between items-center">
                              <span className="text-xs text-[#e8e0d4]/50">Ukupno</span>
                              <span className="font-mono font-semibold">{FORMAT_RSD(order.total_amount)}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center py-8 text-[#e8e0d4]/50">
                          Nema kupovina u istoriji
                        </p>
                      )}
                    </div>
                  )}
                  {activeTab === 'wishlist' && (
                    <div className="space-y-4">
                      <h3 className="text-[11px] uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-semibold mb-2">
                        Lista želja
                      </h3>

                      {wishlistItems.length > 0 ? (
                        wishlistItems.map((item) => (
                          <div key={item.id} className="border border-[#e8e0d4]/10 p-4 flex items-center gap-4">
                            <div className="w-20 h-24 flex-shrink-0">
                              {item.product?.images?.[0] ? (
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.nameSr}
                                  className="w-full h-full object-cover object-center"
                                />
                              ) : (
                                <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                                  <Heart className="w-4 h-4 text-[#c9a96e]" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 space-y-2">
                              <h4 className="font-serif-luxury text-sm text-[#e8e0d4] font-normal">
                                {item.product?.nameSr || 'Proizvod'}
                              </h4>
                              <p className="text-xs text-[#e8e0d4]/70">
                                {item.product?.subtitleSr || ''}
                              </p>
                              <div className="flex items-center gap-4 text-xs">
                                <span className="font-mono">{FORMAT_RSD(item.product?.priceRSD || 0)}</span>
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
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
