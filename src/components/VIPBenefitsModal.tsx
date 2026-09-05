import React from 'react';
import { MOCK_USER } from '../data/mockUser';
import { VIP_TIERS, getVIPTierByLevel, calculateVIPProgress } from '../data/vipBenefits';
import { FORMAT_RSD } from '../data/products';
import { Trophy, Calendar, Users, Coin, ShieldCheck, Gift, Gift, Clock, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface VIPBenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VIPBenefitsModal: React.FC<VIPBenefitsModalProps> = ({ isOpen, onClose }) => {
  const { currentTier, nextTier, progress, pointsUntilNext } = calculateVIPProgress(
    MOCK_USER.loyaltyPoints,
    MOCK_USER.vipLevel
  );

  if (!isOpen) return null;

  return (
    <div
      id="vip-benefits-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl bg-[#0a0a0a] border border-[#e8e0d4]/20 shadow-2xl text-[#e8e0d4] max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-[#e8e0d4]/10 bg-[#111111]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-semibold">
              VIP Sistem & Benefiti
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="vip-benefits-close-btn"
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-[#e8e0d4]/5 text-[#e8e0d4] transition-colors"
              aria-label="Zatvori VIP sistem"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* VIP Content */}
        <div className="flex-1 min-h-0 overflow-hidden p-4 sm:p-6 gap-6">
          {/* Current VIP Status */}
          <div className="space-y-4">
            <div className="text-center py-6">
              <div className="w-24 h-24 bg-[#1a1a1a] flex items-center justify-center rounded-full border border-[#c9a96e]/20 mx-auto mb-4">
                <Trophy className="w-12 h-12 text-[#c9a96e]" />
              </div>
              <h2 className="font-serif-luxury text-xl text-[#e8e0d4] font-normal leading-snug">
                Vaš VIP status: {currentTier.name}
              </h2>
              {nextTier && (
                <div className="flex items-center justify-center space-x-4 mt-4">
                  <div className="w-8 h-0.5 bg-[#c9a96e]/20 flex-1"></div>
                  <div className={`w-8 h-0.5 bg-[#c9a96e] flex-${progress / 100}`}></div>
                  <div className="w-8 h-0.5 bg-[#c9a96e]/20 flex-1"></div>
                </div>
                <div className="flex items-center justify-center mt-2 text-xs text-[#e8e0d4]/70">
                  <span>{pointsUntilNext} poena do {nextTier.name} statusa</span>
                </div>
              )}
              {!nextTier && (
                <p className="text-xs text-[#e8e0d4]/70 mt-2">
                  Čestitamo! Dostigli ste najniži VIP status.
                </p>
              )}
            </div>

            {/* VIP Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-[#111111] p-4 border border-[#c9a96e]/20">
                <div className="text-[9px] uppercase tracking-wider text-[#c9a96e] mb-2">
                  Loyalty poeni
                </div>
                <div className="text-2xl font-semibold text-[#e8e0d4]">
                  {MOCK_USER.loyaltyPoints.toLocaleString()}
                </div>
              </div>
              <div className="bg-[#111111] p-4 border border-[#c9a96e]/20">
                <div className="text-[9px] uppercase tracking-wider text-[#c9a96e] mb-2">
                  Člana od
                </div>
                <div className="text-lg font-semibold text-[#e8e0d4]">
                  {new Date(MOCK_USER.joinDate).toLocaleDateString('sr-RS', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <div className="bg-[#111111] p-4 border border-[#c9a96e]/20">
                <div className="text-[9px] uppercase tracking-wider text-[#c9a96e] mb-2">
                  Exclusive pozivi
                </div>
                <div className="text-2xl font-semibold text-[#e8e0d4]">
                  {MOCK_USER.exclusiveInvitations.length}
                </div>
              </div>
              <div className="bg-[#111111] p-4 border border-[#c9a96e]/20">
                <div className="text-[9px] uppercase tracking-wider text-[#c9a96e] mb-2">
                  Kupovina
                </div>
                <div className="text-2xl font-semibold text-[#e8e0d4]">
                  {MOCK_USER.purchaseHistory.length}
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Tabs */}
          <div className="border-t border-[#e8e0d4]/10 pt-6">
            <div className="flex items-center gap-3 sm:gap-4 border-b border-[#e8e0d4]/10 pb-2 mb-4 font-sans">
              {VIP_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  className={`whitespace-nowrap text-xs uppercase tracking-wider pb-2 relative transition-colors ${
                    MOCK_USER.vipLevel === tier.id
                      ? 'text-[#e8e0d4] font-bold after:content-[\'\'] after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a96e]'
                      : 'text-[#e8e0d4]/60 hover:text-[#e8e0d4]'
                  }`}
                >
                  {tier.name}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {VIP_TIERS.map((tier) => (
                <div key={tier.id} className={`hidden ${MOCK_USER.vipLevel === tier.id ? 'block' : ''}`}>
                  <h3 className="text-[11px] uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-semibold mb-2">
                    {tier.name} Benefiti
                  </p>
                  <div className="space-y-3">
                    {tier.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {tier.id === 'platinum' && <Star className="w-3 h-3 text-[#c9a96e]" />}
                          {tier.id === 'gold' && <Users className="w-3 h-3 text-[#c9a96e]" />}
                          {tier.id === 'silver' && <ShieldCheck className="w-3 h-3 text-[#c9a96e]" />}
                          {tier.id === 'none' && <Coin className="w-3 h-3 text-[#c9a96e]" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm text-[#e8e0d4] font-medium">
                            {benefit}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Earn More Points */}
          <div className="border-t border-[#e8e0d4]/10 pt-6">
            <h3 className="text-[11px] uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-semibold mb-4">
              Kako da guadagnate više loyalty poena?
            </h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-[#111111] p-4 border border-[#c9a96e]/20">
                <div className="flex items-center justify-center mb-3">
                  <ShoppingBag className="w-6 h-6 text-[#c9a96e]" />
                </div>
                <p className="text-xs text-[#e8e0d4]/70">
                  Svaka potrošena 100 RSD = 1 poen
                </div>
              </div>
              <div className="bg-[#111111] p-4 border border-[#c9a96e]/20">
                <div className="flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-[#c9a96e]" />
                </div>
                <p className="text-xs text-[#e8e0d4]/70">
                  Preporučite prijatelja: 500 poena
                </div>
              </div>
              <div className="bg-[#111111] p-4 border border-[#c9a96e]/20">
                <div className="flex items-center justify-center mb-3">
                  <Calendar className="w-6 h-6 text-[#c9a96e]" />
                </div>
                <p className="text-xs text-[#e8e0d4]/70">
                  Monthly check-in: 50 poena
                </div>
              </div>
              <div className="bg-[#111111] p-4 border border-[#c9a96e]/20">
                <div className="flex items-center justify-center mb-3">
                  <Gift className="w-6 h-6 text-[#c9a96e]" />
                </div>
                <p className="text-xs text-[#e8e0d4]/70">
                  Rođendanski poklon: 1000 poena
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};