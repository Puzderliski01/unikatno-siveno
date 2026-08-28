import React from 'react';
import { Scissors, Feather } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useScrollAnimation, staggerItemVariants, scaleInVariants } from '../hooks/useScrollAnimation';

export const AboutSection: React.FC = React.memo(() => {
  const { getVariants, getInViewOptions, isMobile } = useScrollAnimation();
  const inViewOptions = getInViewOptions();
  
  const { scrollYProgress } = useScroll({
    offset: ['start end', 'end start'],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="o-radionici" className="py-24 bg-[#0a0a0a] text-[#e8e0d4] relative border-b border-[#c9a96e]/20 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={getVariants(staggerItemVariants)} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-medium mb-3">
            <Feather className="w-3.5 h-3.5" />
            <span>Filozofija & Zanatstvo</span>
          </motion.div>
          <motion.h2 variants={getVariants(staggerItemVariants)} className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#e8e0d4] tracking-tight mb-4">
            O radionici – Jelena Erić
          </motion.h2>
          <motion.div variants={getVariants(staggerItemVariants)} className="w-12 h-px bg-[#c9a96e] mx-auto mb-4" />
          <motion.p variants={getVariants(staggerItemVariants)} className="text-sm sm:text-base text-[#e8e0d4]/75 font-light leading-relaxed">
            Unikatno šiveno je atelier posvećen povratku autentičnom krojačkom zanatu, gde svaki odevni predmet nastaje kao umetničko delo krojeno za jednu ženu.
          </motion.p>
        </motion.div>

        {/* Story & Atelier Visuals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 overflow-hidden">
          
          {/* Visual Showcase (5 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewOptions}
            variants={getVariants(scaleInVariants)}
            className="lg:col-span-5"
          >
            <motion.div 
              className="relative aspect-[4/5] overflow-hidden border border-[#c9a96e]/40 shadow-xl bg-[#111111]"
              style={{ y: isMobile ? 0 : imageY }}
            >
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=75"
                alt="Radni sto ateljea Jelena Erić u Topoli sa krojačkim makazama i svilom"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width="800"
                height="1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Floating Quote Badge with Portrait */}
              <div className="absolute bottom-0 inset-x-0">
                <div className="mx-6 mb-6 bg-[#111111]/95 border border-[#c9a96e]/40 p-4 flex gap-4 items-start backdrop-blur-sm">
                  {/* Jelena Portrait */}
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 overflow-hidden border border-[#c9a96e]/40">
                    <img
                      src="/jelena.jpg"
                      alt="Jelena Erić"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      width="64"
                      height="64"
                    />
                  </div>
                  {/* Quote Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-serif-luxury text-xs sm:text-sm italic text-[#e8e0d4] leading-snug mb-1.5">
                      "Moda prolazi, ali kroj koji poštuje proporcije vašeg tela i prirodan materijal na koži ostaju večni."
                    </p>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#c9a96e] font-sans font-semibold block">
                      — Jelena Erić, osnivač i glavni kreator
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Narrative Text (7 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewOptions}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
            }}
            className="lg:col-span-7 space-y-6 lg:pl-6"
          >
            <motion.div variants={getVariants({
              hidden: { opacity: 0, x: 40 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            })} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c9a96e] font-semibold font-sans">
              <Scissors className="w-4 h-4" />
              <span>Spore mode & Lični pristup</span>
            </motion.div>

            <motion.h3 variants={getVariants({
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            })} className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#e8e0d4] font-light leading-snug">
              Stvaramo komade koji ne podležu sezonskim trendovima već postaju porodično nasleđe.
            </motion.h3>

            <motion.p variants={getVariants({
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            })} className="text-xs sm:text-sm text-[#e8e0d4]/80 font-light leading-relaxed">
              Nakon više od dve decenije rada u beogradskim modnim kućama, Jelena Erić je osnovala svoj atelje sa jasnom misijom: ponuditi ženama u Srbiji odeću besprekorne izrade kakva se retko sreće u doba brze industrijske proizvodnje.
            </motion.p>

            <motion.p variants={getVariants({
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            })} className="text-xs sm:text-sm text-[#e8e0d4]/80 font-light leading-relaxed">
              U našoj radionici u Topoli ne postoje serijske mašinske trake. Svaku večernju haljinu, strukirani blejzer ili kaput kroji i šije isti majstor od prve skice do završnog ručnog šava.
            </motion.p>

            {/* Atelier Key Stats */}
            <motion.div variants={getVariants({
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            })} className="grid grid-cols-3 gap-4 pt-6 border-t border-[#c9a96e]/30">
              <div>
                <div className="font-serif-luxury text-2xl sm:text-3xl text-[#c9a96e] font-normal">25+</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#e8e0d4]/70 mt-0.5 font-sans">Godina iskustva</div>
              </div>
              <div>
                <div className="font-serif-luxury text-2xl sm:text-3xl text-[#c9a96e] font-normal">100%</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#e8e0d4]/70 mt-0.5 font-sans">Unikatno</div>
              </div>
              <div>
                <div className="font-serif-luxury text-2xl sm:text-3xl text-[#c9a96e] font-normal">2.400+</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#e8e0d4]/70 mt-0.5 font-sans">Unikatnih kreacija</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
});