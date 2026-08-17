import React from 'react';
import { ArrowDown, Sparkles, Scissors, ShieldCheck, Ruler } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useScrollAnimation, staggerContainerVariants, staggerItemVariants } from '../hooks/useScrollAnimation';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreClick }) => {
  const { getVariants, isMobile } = useScrollAnimation();
  const containerVariants = getVariants(staggerContainerVariants);
  const itemVariants = getVariants(staggerItemVariants);

  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.8]);
  const scaleText = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section className="relative min-h-[90vh] lg:min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: isMobile ? 0 : bgY }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
          alt="Luksuzni modni atelje Jelena Erić unikatna odeća"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0.35 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform' }}
        />
        {/* Geometric Balance Overlays */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-[#1A1A1A]/40"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/60" />
      </motion.div>

      {/* Hero Content Container */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ y: isMobile ? 0 : contentY, scale: isMobile ? 1 : scaleText }}
      >
        
        {/* Subtle Gold Tagline Eyebrow */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#C5A059]/40 text-[#C5A059] text-[10px] sm:text-xs uppercase tracking-[0.25em] font-sans mb-8 bg-[#1A1A1A]/80 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Haute Couture & Unikatno Šivenje Po Meri</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#FCFBF7] tracking-tight leading-[1.12] mb-6 max-w-4xl"
        >
          Umetnost vanvremenske siluete i <span className="italic font-serif text-[#C5A059]">besprekornog</span> kroja
        </motion.h1>

        {/* Supporting Narrative */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-sm sm:text-base md:text-lg text-[#FCFBF7]/85 max-w-2xl font-light leading-relaxed mb-10 text-center"
        >
          Dobrodošli u atelje Jelene Erić. Svaki model stvara se ručno u Topoli od najplemenitije italijanske svile, kašmira i devičanske vune — krojeno po vašoj jedinstvenoj meri.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <motion.button
            id="hero-explore-collection-btn"
            type="button"
            onClick={onExploreClick}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(197, 160, 89, 0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-4 bg-[#C5A059] hover:bg-[#A7823B] text-black font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] transition-colors duration-300 shadow-md"
          >
            Istražite kolekciju
          </motion.button>
          <motion.button
            id="hero-book-fitting-btn"
            type="button"
            onClick={onOpenBooking}
            whileHover={{ scale: 1.03, backgroundColor: '#C5A059', color: '#000000' }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-4 border border-[#C5A059] bg-[#1A1A1A]/60 text-[#FCFBF7] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] transition-colors duration-300 backdrop-blur-sm"
          >
            Zakažite privatnu probu
          </motion.button>
        </motion.div>

        {/* Atelier Quality Hallmarks */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 mt-12 border-t border-[#C5A059]/30 w-full max-w-4xl text-left"
        >
          {[
            { icon: Scissors, title: '100% Ručni rad', desc: 'Tradicionalno kanvasiranje i fiksirani šavovi' },
            { icon: ShieldCheck, title: 'Plemeniti materijali', desc: 'Čista dudova svila iz Komoa i runska vuna' },
            { icon: Ruler, title: 'Šivenje po meri', desc: 'Individualna konstrukcija za vašu figuru' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex items-center gap-3.5 p-3.5 border border-[#C5A059]/30 bg-[#1A1A1A]/80 cursor-default"
            >
              <div className="p-2.5 text-[#C5A059] border border-[#C5A059]/40 bg-[#1A1A1A]">
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-[#FCFBF7] font-sans font-medium">{item.title}</h4>
                <p className="text-[11px] text-[#FCFBF7]/70 mt-0.5">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Down Scroll Indicator */}
      <motion.button
        onClick={onExploreClick}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#FCFBF7]/60 hover:text-[#C5A059] transition-colors p-2 flex flex-col items-center gap-1 z-10"
        aria-label="Skrolujte do galerije"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-[#FCFBF7]/50 font-sans">Kolekcija</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-[#C5A059]" />
        </motion.div>
      </motion.button>
    </section>
  );
};