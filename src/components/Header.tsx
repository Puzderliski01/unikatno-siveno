import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Heart, Trophy, Crown, LogIn, UserPlus, Home } from 'lucide-react';
import { FORMAT_RSD } from '../data/products';
import { useAuth } from '../lib/auth';
import { scrollToSection as scrollToSectionTo } from '../lib/scroll';
import { NotificationBell } from './NotificationBell';
import { CursorGlow } from './CursorGlow';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenUserProfile: () => void;
  onOpenVIPBenefits: () => void;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
}

export const Header: React.FC<HeaderProps> = React.memo(({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenUserProfile,
  onOpenVIPBenefits,
  onOpenLogin,
  onOpenSignup
}) => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) return;
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolled(window.scrollY > 40);
        scrollTimeoutRef.current = null;
      }, 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToSection = (id: string) => {
    scrollToSectionTo(id);
  };

  return (
    <>
      {/* Top Logo Bar - Mobile (kompaktno: zauzima ~72px, ne 107px) */}
      <div className="lg:hidden sticky top-0 z-40 liquid-glass">
        <div className="flex items-center justify-between gap-3 py-2.5 px-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex flex-col justify-center group text-left min-h-[44px]"
          >
            <h1 className="text-[15px] sm:text-base tracking-[0.28em] font-semibold uppercase text-[#c9a96e] group-hover:text-[#e8d098] transition-colors font-serif-luxury leading-tight">
              Unikatno šiveno
            </h1>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#c9a96e]/80 font-sans leading-tight mt-0.5">
              Jelena Erić
            </p>
          </a>
          <NotificationBell />
        </div>
      </div>

      {/* Desktop Header */}
      <header className="hidden lg:block sticky top-0 z-40">
        <nav ref={navRef} className={`transition-all duration-300 ${isScrolled ? 'liquid-glass scrolled' : 'liquid-glass'}`}>
          <CursorGlow parentRef={navRef} />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between lg:grid lg:grid-cols-3">
              
              {/* Desktop Left Nav Links */}
              <div className="flex items-center justify-start gap-8 font-sans text-xs tracking-[0.2em] uppercase text-[#e8e0d4]">
                {[
                  { id: 'kolekcija', label: 'Kolekcija' },
                  { id: 'o-radionici', label: 'O radionici' },
                  { id: 'kontakt', label: 'Kontakt' },
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-[#c9a96e] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c9a96e] hover:after:w-full after:transition-all"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Brand Logo Centered */}
              <div className="flex items-center justify-center">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-block group"
                >
                  <h1 className="text-xl tracking-[0.3em] font-semibold uppercase text-[#c9a96e] group-hover:text-[#e8d098] transition-colors font-serif-luxury">
                    Unikatno šiveno
                  </h1>
                  <p className="text-[11px] uppercase tracking-[0.5em] text-[#c9a96e]/80 -mt-1 font-sans">
                    Jelena Erić
                  </p>
                </a>
              </div>

              {/* Right Action Icons */}
              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={onOpenWishlist}
                  aria-label="Omiljeni modeli"
                  className="relative p-2 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors"
                >
                  <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-[#c9a96e] text-[#c9a96e]' : ''}`} />
                  {wishlistCount > 0 && (
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#c9a96e] text-[#0a0a0a] text-[9px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {user ? (
                  <button
                    type="button"
                    onClick={onOpenUserProfile}
                    aria-label="Moj profil"
                    className="p-2 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors"
                  >
                    <Trophy className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={onOpenLogin} className="p-2 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors" title="Prijava">
                      <LogIn className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={onOpenSignup} className="p-2 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors" title="Registracija">
                      <UserPlus className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <NotificationBell />

                <button
                  type="button"
                  onClick={onOpenVIPBenefits}
                  aria-label="VIP pogodnosti"
                  className="p-2 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors"
                >
                  <Crown className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenCart}
                  data-cart-icon
                  className="relative flex items-center gap-2 px-3 py-1.5 border-b border-[#c9a96e]/50 hover:border-[#c9a96e] text-[#e8e0d4] hover:text-[#c9a96e] transition-all group"
                >
                  <ShoppingBag className="w-4 h-4 text-[#c9a96e] group-hover:scale-110 transition-transform" />
                  <span className="text-xs uppercase tracking-widest font-sans font-medium">
                    Izbor ({cartCount})
                  </span>
                  {cartCount > 0 && (
                    <span className="text-[11px] font-mono text-[#c9a96e] font-semibold ml-1">
                      • {FORMAT_RSD(cartTotal)}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Nav Bar — 48px visine stavki, 11px natpisi, 20px ikonice */}
      <div className="lg:hidden mobile-bottom-nav">
        <div className="flex items-stretch justify-around px-1 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex-1 flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 text-[#e8e0d4] active:text-[#c9a96e] hover:text-[#c9a96e] transition-colors relative"
          >
            <Home className="w-5 h-5" />
            <span className="text-[11px] leading-none uppercase tracking-[0.06em] font-sans">Početna</span>
          </button>

          <button
            type="button"
            onClick={onOpenWishlist}
            className="relative flex-1 flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 text-[#e8e0d4] active:text-[#c9a96e] hover:text-[#c9a96e] transition-colors"
          >
            <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#c9a96e] text-[#c9a96e]' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-[calc(50%-1.4rem)] min-w-[16px] h-4 px-1 bg-[#c9a96e] text-[#0a0a0a] text-[9px] leading-none font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
            <span className="text-[11px] leading-none uppercase tracking-[0.06em] font-sans">Želje</span>
          </button>

          {user ? (
            <button
              type="button"
              onClick={onOpenUserProfile}
              className="flex-1 flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 text-[#e8e0d4] active:text-[#c9a96e] hover:text-[#c9a96e] transition-colors"
            >
              <Trophy className="w-5 h-5" />
              <span className="text-[11px] leading-none uppercase tracking-[0.06em] font-sans">Profil</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="flex-1 flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 text-[#e8e0d4] active:text-[#c9a96e] hover:text-[#c9a96e] transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <span className="text-[11px] leading-none uppercase tracking-[0.06em] font-sans">Prijava</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenVIPBenefits}
            className="flex-1 flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 text-[#e8e0d4] active:text-[#c9a96e] hover:text-[#c9a96e] transition-colors"
          >
            <Crown className="w-5 h-5" />
            <span className="text-[11px] leading-none uppercase tracking-[0.06em] font-sans">VIP</span>
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            data-cart-icon
            className="relative flex-1 flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 text-[#e8e0d4] active:text-[#c9a96e] hover:text-[#c9a96e] transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-[calc(50%-1.4rem)] min-w-[16px] h-4 px-1 bg-[#c9a96e] text-[#0a0a0a] text-[9px] leading-none font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-[11px] leading-none uppercase tracking-[0.06em] font-sans">Izbor</span>
          </button>
        </div>
      </div>
    </>
  );
});
