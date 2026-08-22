import React from 'react';
import { ArrowDown, Scissors, ShieldCheck, Ruler } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useScrollAnimation, staggerContainerVariants, staggerItemVariants } from '../hooks/useScrollAnimation';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { getVariants, isMobile } = useScrollAnimation();
  const containerVariants = isMobile ? undefined : getVariants(staggerContainerVariants);
  const itemVariants = isMobile ? undefined : getVariants(staggerItemVariants);

  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '15%' : '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], isMobile ? ['0%', '0%'] : ['0%', '-150%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], isMobile ? [1, 1] : [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  return (
    <div className="relative" style={{ height: isMobile ? '100vh' : '150vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* LAYER 1: HERRINGBONE TEXTURE BACKGROUND */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <motion.div
            className="absolute inset-0 bg-[#0a0a0a]"
            style={{ scale: bgScale }}
          />
          {isMobile ? (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=2000&q=80")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.4) contrast(1.2)'
              }}
            />
          ) : (
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=2000&q=80")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.4) contrast(1.2)'
              }}
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.3 }}
              transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </motion.div>

        {/* LAYER 2: DARK OVERLAY */}
        <motion.div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-[#0a0a0a]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/60" />
        </motion.div>

        {/* LAYER 3: MAIN CONTENT */}
        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center"
          initial={isMobile ? "visible" : "hidden"}
          animate="visible"
          variants={containerVariants}
          style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
        >
          <div className="flex flex-col items-center max-w-4xl">

            {/* DIAMOND LOGO */}
            <motion.div
              variants={itemVariants}
              className="mb-6 sm:mb-8"
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto">
                {/* Diamond shape */}
                <div className="absolute inset-0 border-2 border-[#c9a96e]/60 rotate-45 transform" />
                <div className="absolute inset-2 border border-[#c9a96e]/30 rotate-45 transform" />
                {/* Logo inside */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="Jelena Erić Logo"
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* MAIN HEADLINE */}
            <motion.h1
              variants={itemVariants}
              className="font-serif-luxury text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-[#e8e0d4] tracking-tight leading-[1.1] mb-6 px-2"
            >
              <span className="block sm:inline">Kolekcija.</span>{' '}
              <span className="block sm:inline">Unikatno šivenje</span>
            </motion.h1>

            {/* SUPPORTING TEXT */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-xs sm:text-sm md:text-lg text-[#e8e0d4]/80 max-w-2xl font-light leading-relaxed mb-6 sm:mb-10 text-center px-2"
            >
              Unikatno šiveno: Umetnost vanvremenske siluete i besprekornog kroja. Dobrodošli u galeriju Jelene Erić. Svaki model stvara se ručno od finih prirodnih materijala — krojenih s' ljubavlju i pažnjom prema svakom detalju.
            </motion.p>

            {/* CTA BUTTON */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto">
              <motion.button
                id="hero-explore-collection-btn"
                type="button"
                onClick={onExploreClick}
                whileHover={{ scale: 1.04, borderColor: '#c9a96e' }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-[#c9a96e] text-[#c9a96e] font-semibold text-xs sm:text-sm uppercase tracking-[0.25em] transition-all duration-300 hover:bg-[#c9a96e]/10"
              >
                Istražite kolekciju
              </motion.button>
            </motion.div>

            {/* 3 FEATURE ICONS */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-10 sm:pt-16 mt-10 sm:mt-14 border-t border-[#c9a96e]/25 w-full max-w-3xl"
            >
              {[
                { icon: Scissors, title: '100% Ručni rad', desc: 'Tradicionalno kanvasiranje i fiksirani šavovi' },
                { icon: ShieldCheck, title: 'Prirodni materijali', desc: 'Pažljivo birani da prijaju telu' },
                { icon: Ruler, title: 'Šivenje po meri', desc: 'Individualna konstrukcija za vašu figuru' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={isMobile ? { duration: 0 } : { duration: 0.8, delay: 1.2 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, borderColor: 'rgba(201, 169, 110, 0.6)', transition: { duration: 0.25 } }}
                  className="flex items-center gap-4 p-3 sm:p-4 border border-[#c9a96e]/25 bg-[#0a0a0a]/50 backdrop-blur-sm cursor-default group transition-colors duration-300"
                >
                  <div className="p-2.5 text-[#c9a96e] border border-[#c9a96e]/30 bg-[#0a0a0a] group-hover:bg-[#c9a96e]/10 transition-colors duration-300">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.15em] text-[#e8e0d4] font-sans font-medium group-hover:text-[#c9a96e] transition-colors duration-300">{item.title}</h4>
                    <p className="text-[11px] text-[#e8e0d4]/60 mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Down Scroll Indicator */}
        <motion.button
          onClick={onExploreClick}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#e8e0d4]/60 hover:text-[#c9a96e] transition-colors p-2 flex flex-col items-center gap-1 z-10"
          aria-label="Skrolujte do galerije"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#e8e0d4]/50 font-sans">Pomaknite se za više</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowDown className="w-4 h-4 text-[#c9a96e]" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};
