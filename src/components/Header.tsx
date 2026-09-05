import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Heart, Menu, X, Trophy, Star, LogIn, UserPlus } from 'lucide-react';
import { FORMAT_RSD } from '../data/products';
import { Tooltip } from './Tooltip';
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
  const { user, profile, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'kolekcija', label: 'Kolekcija' },
    { id: 'o-radionici', label: 'O radionici' },
    { id: 'kontakt', label: 'Kontakt & Salon' },
  ];

  return (
    <header className="sticky top-0 z-40">
      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'liquid-glass scrolled'
            : 'liquid-glass'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between lg:grid lg:grid-cols-3">
            
            {/* Desktop Left Nav Links */}
            <div className="hidden lg:flex items-center justify-start gap-8 font-sans text-xs tracking-[0.2em] uppercase text-[#e8e0d4]">
              {navLinks.map((link) => (
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
            <div className="text-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-block group"
              >
                <h1 className="text-base sm:text-xl lg:text-2xl tracking-[0.3em] font-light uppercase text-[#c9a96e] group-hover:text-[#e8d098] transition-colors font-serif-luxury">
                  Unikatno šiveno
                </h1>
                <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[#c9a96e]/80 -mt-0.5 sm:-mt-1 font-sans">
                  Jelena Erić
                </p>
              </a>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center justify-end gap-0.5 sm:gap-2 lg:gap-4">
              {/* Wishlist Button */}
              <Tooltip placement="bottom" label={`Lista želja (${wishlistCount} predmeta)`}>
                <button
                  id="header-wishlist-btn"
                  type="button"
                  onClick={onOpenWishlist}
                  className="relative p-1 sm:p-1.5 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors"
                >
                  <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${wishlistCount > 0 ? 'fill-[#c9a96e] text-[#c9a96e]' : ''}`} />
                  {wishlistCount > 0 && (
                    <span className="absolute top-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#c9a96e] text-[#0a0a0a] text-[8px] sm:text-[9px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              </Tooltip>

              {/* User Profile / Auth Button */}
              {user ? (
                <Tooltip placement="bottom" label={`Profil korisnika${profile?.full_name ? ` - ${profile.full_name}` : ''}`}>
                  <button
                    id="header-user-profile-btn"
                    type="button"
                    onClick={onOpenUserProfile}
                    className="relative p-1 sm:p-1.5 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors"
                  >
                    <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </Tooltip>
              ) : (
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={onOpenLogin}
                    className="p-1 sm:p-1.5 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors"
                    title="Prijava"
                  >
                    <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onOpenSignup}
                    className="p-1 sm:p-1.5 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors"
                    title="Registracija"
                  >
                    <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              )}

              {/* VIP Benefits Button */}
              <Tooltip placement="bottom" label="VIP Benefiti">
                <button
                  id="header-vip-btn"
                  type="button"
                  onClick={onOpenVIPBenefits}
                  className="relative p-1 sm:p-1.5 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors"
                >
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </Tooltip>

              {/* Mini-Cart Trigger Button */}
              <Tooltip placement="bottom" label={`Korpa (${cartCount} artikala, ukupno ${FORMAT_RSD(cartTotal)})`}>
                <button
                  id="header-cart-btn"
                  type="button"
                  onClick={onOpenCart}
                  className="relative flex items-center gap-1 sm:gap-2 px-1 sm:px-2 py-1 border-b border-[#c9a96e]/50 hover:border-[#c9a96e] text-[#e8e0d4] hover:text-[#c9a96e] transition-all group"
                >
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c9a96e] group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline text-[10px] sm:text-xs uppercase tracking-widest font-sans font-medium">
                    Korpa ({cartCount})
                  </span>
                  {cartCount > 0 && (
                    <span className="sm:hidden w-3 h-3 sm:w-4 sm:h-4 bg-[#c9a96e] text-[#0a0a0a] text-[8px] sm:text-[9px] font-bold rounded-full flex items-center justify-center -mt-2 -mr-1">
                      {cartCount}
                    </span>
                  )}
                  {cartCount > 0 && (
                    <span className="hidden md:inline text-[11px] font-mono text-[#c9a96e] font-semibold ml-1">
                      • {FORMAT_RSD(cartTotal)}
                    </span>
                  )}
                </button>
              </Tooltip>

              {/* Mobile Menu Button */}
              <button
                id="mobile-menu-toggle-btn"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1 sm:p-1.5 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors"
                aria-label="Otvori navigacioni meni"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#c9a96e]/20 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left py-3 px-3 text-xs uppercase tracking-[0.2em] font-sans text-[#e8e0d4] hover:text-[#c9a96e] hover:bg-[#c9a96e]/5 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 mt-2 border-t border-[#c9a96e]/20 px-3">
                <div className="text-center text-xs text-[#e8e0d4]/70">
                  Salon: Topola • Tel: +381 636 160 71
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
});
