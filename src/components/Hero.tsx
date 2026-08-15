import React from 'react';
import { ArrowDown, Sparkles, Scissors, ShieldCheck, Ruler } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreClick }) => {
  return (
    <section className="relative min-h-[88vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
      {/* Background Image with Luxury Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
          alt="Luksuzni modni atelje Jelena Erić unikatna odeća"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-10000 ease-out"
        />
        {/* Geometric Balance Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/70 to-[#1A1A1A]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-transparent to-[#1A1A1A]/80" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        
        {/* Subtle Gold Tagline Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#C5A059]/40 text-[#C5A059] text-[10px] sm:text-xs uppercase tracking-[0.25em] font-sans mb-8 bg-[#1A1A1A]/80 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Haute Couture & Unikatno Šivenje Po Meri</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#FCFBF7] tracking-tight leading-[1.12] mb-6 max-w-4xl"
        >
          Umetnost vanvremenske siluete i <span className="italic font-serif text-[#C5A059]">besprekornog</span> kroja
        </motion.h1>

        {/* Supporting Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-sans text-sm sm:text-base md:text-lg text-[#FCFBF7]/85 max-w-2xl font-light leading-relaxed mb-10 text-center"
        >
          Dobrodošli u atelje Jelene Erić. Svaki model stvara se ručno u Topoli od najplemenitije italijanske svile, kašmira i devičanske vune — krojeno po vašoj jedinstvenoj meri.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-explore-collection-btn"
            type="button"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 bg-[#C5A059] hover:bg-[#A7823B] text-black font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-md"
          >
            Istražite kolekciju
          </button>
          <button
            id="hero-book-fitting-btn"
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 border border-[#C5A059] bg-[#1A1A1A]/60 hover:bg-[#C5A059] hover:text-black text-[#FCFBF7] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-sm"
          >
            Zakažite privatnu probu
          </button>
        </motion.div>

        {/* Atelier Quality Hallmarks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 mt-12 border-t border-[#C5A059]/30 w-full max-w-4xl text-left"
        >
          <div className="flex items-center gap-3.5 p-3.5 border border-[#C5A059]/30 bg-[#1A1A1A]/80">
            <div className="p-2.5 text-[#C5A059] border border-[#C5A059]/40 bg-[#1A1A1A]">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.15em] text-[#FCFBF7] font-sans font-medium">100% Ručni rad</h4>
              <p className="text-[11px] text-[#FCFBF7]/70 mt-0.5">Tradicionalno kanvasiranje i fiksirani šavovi</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 border border-[#C5A059]/30 bg-[#1A1A1A]/80">
            <div className="p-2.5 text-[#C5A059] border border-[#C5A059]/40 bg-[#1A1A1A]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.15em] text-[#FCFBF7] font-sans font-medium">Plemeniti materijali</h4>
              <p className="text-[11px] text-[#FCFBF7]/70 mt-0.5">Čista dudova svila iz Komoa i runska vuna</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 border border-[#C5A059]/30 bg-[#1A1A1A]/80">
            <div className="p-2.5 text-[#C5A059] border border-[#C5A059]/40 bg-[#1A1A1A]">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.15em] text-[#FCFBF7] font-sans font-medium">Šivenje po meri</h4>
              <p className="text-[11px] text-[#FCFBF7]/70 mt-0.5">Individualna konstrukcija za vašu figuru</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <button
        onClick={onExploreClick}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#FCFBF7]/60 hover:text-[#C5A059] transition-colors p-2 flex flex-col items-center gap-1 z-10"
        aria-label="Skrolujte do galerije"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-[#FCFBF7]/50 font-sans">Kolekcija</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-[#C5A059]" />
      </button>
    </section>
  );
};
