import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Scissors, ShieldCheck, Ruler } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { HangingLetters } from './HangingLetters';
import { Img } from './Img';
import { GlassLayer } from './GlassLayer';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = React.memo(({ onExploreClick }) => {
  const { isMobile } = useScrollAnimation();
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-80%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);

  // Mobile: simple static hero with video fallback
  if (isMobile) {
    return (
      <div className="relative w-full bg-[#0a0a0a] dark-context">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-105"
            style={{ filter: 'blur(1px) brightness(0.55) contrast(1.15) saturate(0.9)' }}
            onEnded={() => setVideoEnded(true)}
            onError={() => setVideoFailed(true)}
          >
            <source src="/videos/video1.mp4" type="video/mp4" />
          </video>

          {videoFailed && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=800&q=60")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.4) contrast(1.2)'
              }}
            />
          )}
        </div>

        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-[#0a0a0a]/90" />
          {/* Meki centralni scrim — tekst preko videa ostaje čitljiv u obe teme */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(10,10,10,0.55), rgba(10,10,10,0) 75%)' }}
          />
        </div>
        <div className="relative z-10 max-w-md mx-auto px-6 py-14 flex flex-col items-center justify-center text-center min-h-[65vh]">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-3">
            <Img src="/logo.png" alt="Jelena Erić Logo" className="w-full h-full object-contain" loading="eager" decoding="async" fetchPriority="high" width="128" height="128" />
          </div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#e8e0d4] tracking-tight leading-[1.1] mb-2.5">
            Kolekcija. Unikatno šivenje
          </h1>
          <p className="font-sans text-[13px] text-[#e8e0d4]/80 font-light leading-relaxed mb-5">
            Umetnost vanvremenske siluete i besprekornog kroja.
          </p>
          <button
            id="hero-explore-collection-btn"
            type="button"
            ref={ctaRef}
            onClick={onExploreClick}
            className="shine-btn isolate bg-[#0a0a0a]/40 backdrop-blur-sm px-8 py-3.5 min-h-[48px] border-2 border-[#c9a96e] text-[#c9a96e] font-semibold text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:bg-[#c9a96e]/10 mb-6"
          >
            <GlassLayer cornerRadius={0} displacementScale={64} elasticity={0.15} mouseContainer={ctaRef} overLight={false} />
            Istražite kolekciju
          </button>
          <div className="flex flex-col gap-2 w-full">
            {[
              { icon: Scissors, title: '100% Ručni rad', desc: 'Tradicionalno kanvasiranje i fiksirani šavovi' },
              { icon: ShieldCheck, title: 'Prirodni materijali', desc: 'Pažljivo birani da prijaju telu' },
              { icon: Ruler, title: 'Šivenje po meri', desc: 'Individualna konstrukcija za vašu figuru' },
            ].map((item) => (
              <div key={item.title} className="glass-chip isolate flex items-center gap-3 p-2.5 border border-[#c9a96e]/25">
                <GlassLayer cornerRadius={0} displacementScale={36} overLight={false} />
                <div className="p-1.5 text-[#c9a96e] border border-[#c9a96e]/30 glass-inner flex-shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <h2 className="text-[11px] uppercase tracking-[0.15em] text-[#e8e0d4] font-sans font-medium">{item.title}</h2>
                  <p className="text-xs text-[#e8e0d4]/60 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop: parallax hero with video background
  return (
    <div className="relative dark-context" style={{ height: '120vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video Background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <motion.div className="absolute inset-0 bg-[#0a0a0a]" style={{ scale: bgScale }} />

          {/* Video container */}
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-105"
              style={{ filter: 'blur(1.5px) brightness(0.5) contrast(1.2) saturate(0.85)' }}
              onEnded={() => setVideoEnded(true)}
              onError={() => setVideoFailed(true)}
            >
              <source src="/videos/video1.mp4" type="video/mp4" />
            </video>

            {videoFailed && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=1200&q=70")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.4) contrast(1.2)'
                }}
              />
            )}
          </div>
        </motion.div>

        {/* Overlay - gradients + vignette + grain for quality masking */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/30 to-[#0a0a0a]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/50" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.6) 100%)' }} />
          {/* Meki centralni scrim — sadržaj u sredini "seče" video i ostaje čitljiv */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(10,10,10,0.5), rgba(10,10,10,0) 75%)' }} />
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
        >
          <div className="flex flex-col items-center max-w-4xl">
            {/* Logo */}
            <motion.div
              className="mb-6 sm:mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto">
                <Img src="/logo.png" alt="Jelena Erić Logo" className="w-full h-full object-contain" loading="eager" decoding="async" fetchPriority="high" width="320" height="320" />
              </div>
            </motion.div>

            {/* Headline — hanging letters that sway on springs */}
            <HangingLetters
              text="Kolekcija. Unikatno šivenje"
              tag="h1"
              className="font-serif-luxury text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-[#e8e0d4] tracking-tight leading-[1.1] mb-6 text-center"
              delay={400}
            />

            {/* Text */}
            <motion.p
              className="font-sans text-xs sm:text-sm md:text-lg text-[#e8e0d4]/90 max-w-2xl font-light leading-relaxed mb-6 sm:mb-10 text-center px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Unikatno šiveno: Umetnost vanvremenske siluete i besprekornog kroja. Dobrodošli u galeriju Jelene Erić. Svaki model stvara se ručno od finih prirodnih materijala — krojenih s' ljubavlju i pažnjom prema svakom detalju.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                id="hero-explore-collection-btn"
                type="button"
                ref={ctaRef}
                onClick={onExploreClick}
                className="shine-btn isolate bg-[#0a0a0a]/40 backdrop-blur-sm px-10 py-4 border-2 border-[#c9a96e] text-[#c9a96e] font-semibold text-xs sm:text-sm uppercase tracking-[0.25em] transition-all duration-300 hover:bg-[#c9a96e]/10"
              >
                <GlassLayer cornerRadius={0} displacementScale={64} elasticity={0.15} mouseContainer={ctaRef} overLight={false} />
                Istražite kolekciju
              </button>
            </motion.div>

            {/* Feature icons */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-10 sm:pt-12 mt-10 sm:mt-12 border-t border-[#c9a96e]/25 w-full max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {[
                { icon: Scissors, title: '100% Ručni rad', desc: 'Tradicionalno kanvasiranje i fiksirani šavovi' },
                { icon: ShieldCheck, title: 'Prirodni materijali', desc: 'Pažljivo birani da prijaju telu' },
                { icon: Ruler, title: 'Šivenje po meri', desc: 'Individualna konstrukcija za vašu figuru' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, borderColor: 'rgba(201, 169, 110, 0.6)', transition: { duration: 0.25 } }}
                  className="glass-chip isolate flex items-center gap-4 p-3 sm:p-4 border border-[#c9a96e]/25 cursor-default group transition-colors duration-300"
                >
                  <GlassLayer cornerRadius={0} displacementScale={36} overLight={false} />
                  <div className="p-2.5 text-[#c9a96e] border border-[#c9a96e]/30 glass-inner group-hover:bg-[#c9a96e]/10 transition-colors duration-300">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs uppercase tracking-[0.15em] text-[#e8e0d4] font-sans font-medium group-hover:text-[#c9a96e] transition-colors duration-300">{item.title}</h2>
                    <p className="text-[11px] text-[#e8e0d4]/60 mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={onExploreClick}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#e8e0d4]/60 hover:text-[#c9a96e] transition-colors p-2 flex flex-col items-center gap-1 z-10"
          aria-label="Skrolujte do galerije"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#e8e0d4]/70 font-sans">Skrolujte</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowDown className="w-4 h-4 text-[#c9a96e]" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
});