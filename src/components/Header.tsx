import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Heart, Trophy, Star, LogIn, UserPlus, Home, Sparkles, Phone } from 'lucide-react';
import { FORMAT_RSD } from '../data/products';
import { useAuth } from '../lib/auth';

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
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Logo Bar - Mobile */}
      <div className="lg:hidden sticky top-0 z-40 liquid-glass">
        <div className="flex items-center justify-center py-2.5">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-block group"
          >
            <h1 className="text-base tracking-[0.3em] font-light uppercase text-[#c9a96e] group-hover:text-[#e8d098] transition-colors font-serif-luxury">
              Unikatno šiveno
            </h1>
            <p className="text-[8px] uppercase tracking-[0.4em] text-[#c9a96e]/80 -mt-0.5 font-sans">
              Jelena Erić
            </p>
          </a>
        </div>
      </div>

      {/* Desktop Header */}
      <header className="hidden lg:block sticky top-0 z-40">
        <nav className={`transition-all duration-300 ${isScrolled ? 'liquid-glass scrolled' : 'liquid-glass'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between lg:grid lg:grid-cols-3">
              
              {/* Desktop Left Nav Links */}
              <div className="flex items-center justify-start gap-8 font-sans text-xs tracking-[0.2em] uppercase text-[#e8e0d4]">
                {[
                  { id: 'kolekcija', label: 'Kolekcija' },
                  { id: 'o-radionici', label: 'O radionici' },
                  { id: 'kontakt', label: 'Kontakt & Salon' },
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
                  <h1 className="text-xl tracking-[0.3em] font-light uppercase text-[#c9a96e] group-hover:text-[#e8d098] transition-colors font-serif-luxury">
                    Unikatno šiveno
                  </h1>
                  <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a96e]/80 -mt-1 font-sans">
                    Jelena Erić
                  </p>
                </a>
              </div>

              {/* Right Action Icons */}
              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={onOpenWishlist}
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

                <button
                  type="button"
                  onClick={onOpenVIPBenefits}
                  className="p-2 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors"
                >
                  <Star className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenCart}
                  className="relative flex items-center gap-2 px-3 py-1.5 border-b border-[#c9a96e]/50 hover:border-[#c9a96e] text-[#e8e0d4] hover:text-[#c9a96e] transition-all group"
                >
                  <ShoppingBag className="w-4 h-4 text-[#c9a96e] group-hover:scale-110 transition-transform" />
                  <span className="text-xs uppercase tracking-widest font-sans font-medium">
                    Korpa ({cartCount})
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

      {/* Mobile Bottom Nav Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 liquid-glass border-t border-[#c9a96e]/25">
        <div className="flex items-center justify-around py-2 px-2">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center gap-0.5 p-1.5 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors min-w-[48px]"
          >
            <Home className="w-4 h-4" />
            <span className="text-[8px] uppercase tracking-wider font-sans">Početna</span>
          </button>

          <button
            type="button"
            onClick={onOpenWishlist}
            className="relative flex flex-col items-center gap-0.5 p-1.5 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors min-w-[48px]"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-[#c9a96e] text-[#c9a96e]' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-2 w-3 h-3 bg-[#c9a96e] text-[#0a0a0a] text-[7px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
            <span className="text-[8px] uppercase tracking-wider font-sans">Želje</span>
          </button>

          {user ? (
            <button
              type="button"
              onClick={onOpenUserProfile}
              className="flex flex-col items-center gap-0.5 p-1.5 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors min-w-[48px]"
            >
              <Trophy className="w-4 h-4" />
              <span className="text-[8px] uppercase tracking-wider font-sans">Profil</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="flex flex-col items-center gap-0.5 p-1.5 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors min-w-[48px]"
            >
              <LogIn className="w-4 h-4" />
              <span className="text-[8px] uppercase tracking-wider font-sans">Prijava</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenVIPBenefits}
            className="flex flex-col items-center gap-0.5 p-1.5 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors min-w-[48px]"
          >
            <Star className="w-4 h-4" />
            <span className="text-[8px] uppercase tracking-wider font-sans">VIP</span>
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex flex-col items-center gap-0.5 p-1.5 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors min-w-[48px]"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-2 w-3 h-3 bg-[#c9a96e] text-[#0a0a0a] text-[7px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-[8px] uppercase tracking-wider font-sans">Korpa</span>
          </button>
        </div>
      </div>
    </>
  );
});
