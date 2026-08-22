import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X } from 'lucide-react';
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
      <div className="bg-[#111111] text-[#e8e0d4] text-[10px] sm:text-xs py-2 px-4 text-center font-sans tracking-[0.2em] uppercase border-b border-[#c9a96e]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <span className="flex items-center gap-2">
            Besplatna dostava u Srbiji za porudžbine preko 10.000 RSD
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 border-b border-[#c9a96e]/20 ${
          isScrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md py-3 shadow-md'
            : 'bg-[#0a0a0a] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Desktop Left Nav Links */}
          <div className="hidden lg:flex items-center gap-8 font-sans text-xs tracking-[0.2em] uppercase text-[#e8e0d4]">
            <button
              onClick={() => scrollToSection('kolekcija')}
              className="hover:text-[#c9a96e] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c9a96e] hover:after:w-full after:transition-all"
            >
              Kolekcija
            </button>
            <button
              onClick={() => scrollToSection('o-radionici')}
              className="hover:text-[#c9a96e] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c9a96e] hover:after:w-full after:transition-all"
            >
              O radionici
            </button>
            <button
              onClick={() => scrollToSection('kontakt')}
              className="hover:text-[#c9a96e] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c9a96e] hover:after:w-full after:transition-all"
            >
              Kontakt & Salon
            </button>
          </div>

          {/* Brand Logo Centered */}
          <div className="text-center flex-shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block group"
            >
              <h1 className="text-xl sm:text-2xl tracking-[0.3em] font-light uppercase text-[#c9a96e] group-hover:text-[#e8d098] transition-colors font-serif-luxury">
                Unikatno šiveno
              </h1>
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a96e]/80 -mt-1 font-sans">
                Jelena Erić
              </p>
            </a>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Wishlist Button */}
            <button
              id="header-wishlist-btn"
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors"
              aria-label={`Lista želja (${wishlistCount} predmeta)`}
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#c9a96e] text-[#c9a96e]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#c9a96e] text-[#0a0a0a] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Mini-Cart Trigger Button */}
            <button
              id="header-cart-btn"
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-1.5 border-b border-[#c9a96e]/50 hover:border-[#c9a96e] text-[#e8e0d4] hover:text-[#c9a96e] transition-all group"
              aria-label={`Korpa (${cartCount} artikala, ukupno ${FORMAT_RSD(cartTotal)})`}
            >
              <ShoppingBag className="w-4 h-4 text-[#c9a96e] group-hover:scale-110 transition-transform" />
              <span className="text-xs uppercase tracking-widest font-sans font-medium">
                Korpa ({cartCount})
              </span>
              {cartCount > 0 && (
                <span className="hidden md:inline text-[11px] font-mono text-[#c9a96e] font-semibold ml-1">
                  • {FORMAT_RSD(cartTotal)}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors"
              aria-label="Otvori navigacioni meni"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#c9a96e]/20 bg-[#0a0a0a] px-6 py-6 space-y-4">
            <button
              onClick={() => scrollToSection('kolekcija')}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] font-sans text-[#e8e0d4] hover:text-[#c9a96e]"
            >
              Kolekcija
            </button>
            <button
              onClick={() => scrollToSection('o-radionici')}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] font-sans text-[#e8e0d4] hover:text-[#c9a96e]"
            >
              O radionici
            </button>
            <button
              onClick={() => scrollToSection('kontakt')}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] font-sans text-[#e8e0d4] hover:text-[#c9a96e]"
            >
              Kontakt & Salon
            </button>
            <div className="pt-4 border-t border-[#c9a96e]/20 flex flex-col gap-3">
              <div className="text-center text-xs text-[#e8e0d4]/70">
                Salon: Topola • Tel: +381 636 160 71
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
