import React from 'react';
import { ArrowDown, Sparkles, Scissors, ShieldCheck, Ruler } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useScrollAnimation, staggerContainerVariants, staggerItemVariants } from '../hooks/useScrollAnimation';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { getVariants, isMobile } = useScrollAnimation();
  const containerVariants = getVariants(staggerContainerVariants);
  const itemVariants = getVariants(staggerItemVariants);

  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '20%' : '40%']);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1.15]);
  const bgBlur = useTransform(scrollYProgress, [0.4, 0.8], [0, 6]);
  const overlayY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '10%' : '20%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [0.4, 0.6, 0.9]);
  const decorY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const decorOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.6, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-100%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.92]);

  return (
    <div className="relative" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* LAYER 1: BACKGROUND IMAGE */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <motion.img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
            alt="Luksuzni modni atelje Jelena Erić unikatna odeća"
            className="w-full h-full object-cover object-center"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.45 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'transform', filter: useTransform(bgBlur, (v) => `brightness(0.75) contrast(1.05) blur(${v}px) saturate(1.1)`) }}
          />
        </motion.div>

        {/* LAYER 2: DARK OVERLAY */}
        <motion.div className="absolute inset-0 z-[1]" style={{ y: overlayY }}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/50 to-[#0c0c0e]/30"
            style={{ opacity: overlayOpacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/70 via-transparent to-[#0c0c0e]/70" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0c0c0e]/60 to-transparent" />
        </motion.div>

        {/* LAYER 3: DECORATIVE GEOMETRIC ELEMENTS */}
        <motion.div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ y: decorY, opacity: decorOpacity }}
        >
          <div className="absolute top-24 left-8 sm:left-16">
            <div className="w-24 h-px bg-[#C5A059]/40" />
            <div className="w-px h-24 bg-[#C5A059]/40" />
          </div>
          <div className="absolute bottom-24 right-8 sm:right-16">
            <div className="w-24 h-px bg-[#C5A059]/40 ml-auto" />
            <div className="w-px h-24 bg-[#C5A059]/40 ml-auto" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#C5A059]/10 rotate-45" />
        </motion.div>

        {/* LAYER 4: MAIN CONTENT */}
        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
        >
          <div className="flex flex-col items-center max-w-4xl">

            {/* REVEAL 1: Eyebrow Tagline */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-5 py-2 border border-[#C5A059]/30 text-[#C5A059] text-[10px] sm:text-xs uppercase tracking-[0.3em] font-sans mb-10 bg-[#0c0c0e]/60 backdrop-blur-md"
              whileHover={{ borderColor: 'rgba(197, 160, 89, 0.6)', backgroundColor: 'rgba(197, 160, 89, 0.1)', scale: 1.02, transition: { duration: 0.3 } }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Unikatno Šivenje</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            </motion.div>

            {/* REVEAL 2: Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-light text-[#FCFBF7] tracking-tight leading-[1.1] mb-8"
            >
              Umetnost vanvremenske siluete i{' '}
              <span className="italic font-serif text-[#C5A059] relative">
                besprekornog
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-px bg-[#C5A059]/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'left' }}
                />
              </span>
              {' '}kroja
            </motion.h1>

            {/* REVEAL 3: Supporting Narrative */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-sm sm:text-base md:text-lg text-[#FCFBF7]/80 max-w-2xl font-light leading-relaxed mb-12 text-center"
            >
              Dobrodošli u galeriju Jelene Erić. Svaki model stvara se ručno od finih prirodnih materijala — krojenih s' ljubavlju i pažnjom prema svakom detalju.
            </motion.p>

            {/* REVEAL 4: Action Button */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto">
              <motion.button
                id="hero-explore-collection-btn"
                type="button"
                onClick={onExploreClick}
                whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(197, 160, 89, 0.35)', backgroundColor: '#A7823B' }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-10 py-4 bg-[#C5A059] text-black font-semibold text-xs sm:text-sm uppercase tracking-[0.25em] transition-all duration-300 shadow-lg"
              >
                Istražite kolekciju
              </motion.button>
            </motion.div>

            {/* REVEAL 5: Quality Hallmarks */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-16 mt-14 border-t border-[#C5A059]/25 w-full max-w-3xl"
            >
              {[
                { icon: Scissors, title: '100% Ručni rad', desc: 'Tradicionalno kanvasiranje i fiksirani šavovi' },
                { icon: ShieldCheck, title: 'Prirodni materijali', desc: 'Pažljivo birani da prijaju telu' },
                { icon: Ruler, title: 'Šivenje po meri', desc: 'Individualna konstrukcija za vašu figuru' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, borderColor: 'rgba(197, 160, 89, 0.6)', transition: { duration: 0.25 } }}
                  className="flex items-center gap-4 p-4 border border-[#C5A059]/25 bg-[#0c0c0e]/50 backdrop-blur-sm cursor-default group transition-colors duration-300"
                >
                  <div className="p-2.5 text-[#C5A059] border border-[#C5A059]/30 bg-[#0c0c0e] group-hover:bg-[#C5A059]/10 transition-colors duration-300">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.15em] text-[#FCFBF7] font-sans font-medium group-hover:text-[#C5A059] transition-colors duration-300">{item.title}</h4>
                    <p className="text-[11px] text-[#FCFBF7]/60 mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
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
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowDown className="w-4 h-4 text-[#C5A059]" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};
