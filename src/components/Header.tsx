import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, Sparkles, Phone, Scissors } from 'lucide-react';
import { FORMAT_RSD } from '../data/products';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#1A1A1A] text-[#FCFBF7] text-[10px] sm:text-xs py-2 px-4 text-center font-sans tracking-[0.2em] uppercase border-b border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden md:inline-flex items-center gap-1.5 text-[#C5A059]">
            <Scissors className="w-3.5 h-3.5" />
            Unikatno šivenje po meri
          </span>
          <span className="mx-auto md:mx-0 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            Besplatna dostava u Srbiji za porudžbine preko 10.000 RSD
            <span className="hidden sm:inline text-[#C5A059]">•</span>
            <span className="hidden sm:inline text-[#FCFBF7]/80">Salon: Topola</span>
          </span>
          <div className="hidden lg:flex items-center gap-4 text-[#FCFBF7]/80">
            <a href="tel:+38163616071" className="hover:text-[#C5A059] transition-colors flex items-center gap-1 font-mono">
              <Phone className="w-3 h-3 text-[#C5A059]" />
              +381 636 160 71
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 border-b border-[#C5A059]/30 ${
          isScrolled
            ? 'bg-[#FCFBF7]/95 backdrop-blur-md py-3 shadow-md'
            : 'bg-[#FCFBF7] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1A1A1A] hover:text-[#C5A059] transition-colors"
            aria-label="Otvori navigacioni meni"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Left Nav Links */}
          <div className="hidden lg:flex items-center gap-8 font-sans text-xs tracking-[0.2em] uppercase text-[#1A1A1A]">
            <button
              onClick={() => scrollToSection('kolekcija')}
              className="hover:text-[#C5A059] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all"
            >
              Kolekcija
            </button>
            <button
              onClick={() => scrollToSection('o-radionici')}
              className="hover:text-[#C5A059] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all"
            >
              O radionici
            </button>
            <button
              onClick={() => scrollToSection('kontakt')}
              className="hover:text-[#C5A059] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all"
            >
              Kontakt & Salon
            </button>
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
              <h1 className="text-xl sm:text-2xl tracking-[0.3em] font-light uppercase text-[#1A1A1A] group-hover:text-[#C5A059] transition-colors font-serif-luxury">
                Unikatno šiveno
              </h1>
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] -mt-1 font-sans">
                Jelena Erić
              </p>
            </a>
          </div>

          {/* Right Action Icons & Booking CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Wishlist Button */}
            <button
              id="header-wishlist-btn"
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2 text-[#1A1A1A] hover:text-[#C5A059] transition-colors"
              aria-label={`Lista želja (${wishlistCount} predmeta)`}
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#C5A059] text-[#C5A059]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#1A1A1A] text-[#FCFBF7] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Mini-Cart Trigger Button */}
            <button
              id="header-cart-btn"
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-1.5 border-b border-[#1A1A1A] hover:border-[#C5A059] text-[#1A1A1A] hover:text-[#C5A059] transition-all group"
              aria-label={`Korpa (${cartCount} artikala, ukupno ${FORMAT_RSD(cartTotal)})`}
            >
              <ShoppingBag className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
              <span className="text-xs uppercase tracking-widest font-sans font-medium">
                Korpa ({cartCount})
              </span>
              {cartCount > 0 && (
                <span className="hidden md:inline text-[11px] font-mono text-[#C5A059] font-semibold ml-1">
                  • {FORMAT_RSD(cartTotal)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#C5A059]/30 bg-[#FCFBF7] px-6 py-6 space-y-4">
            <button
              onClick={() => scrollToSection('kolekcija')}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] font-sans text-[#1A1A1A] hover:text-[#C5A059]"
            >
              Kolekcija
            </button>
            <button
              onClick={() => scrollToSection('o-radionici')}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] font-sans text-[#1A1A1A] hover:text-[#C5A059]"
            >
              O radionici
            </button>
            <button
              onClick={() => scrollToSection('kontakt')}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] font-sans text-[#1A1A1A] hover:text-[#C5A059]"
            >
              Kontakt & Salon
            </button>
            <div className="pt-4 border-t border-[#C5A059]/20 flex flex-col gap-3">
              <div className="text-center text-xs text-[#1A1A1A]/70">
                Salon: Topola • Tel: +381 636 160 71
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
