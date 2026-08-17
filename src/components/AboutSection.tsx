import React from 'react';
import { Scissors, Feather } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useScrollAnimation, staggerItemVariants, scaleInVariants } from '../hooks/useScrollAnimation';

export const AboutSection: React.FC = () => {
  const { getVariants, getInViewOptions, isMobile } = useScrollAnimation();
  const inViewOptions = getInViewOptions();
  
  const { scrollYProgress } = useScroll({
    offset: ['start end', 'end start'],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  
  const steps = [
    {
      number: '01',
      title: 'Selekcija plemenitih vlakana',
      desc: 'Nabavljamo isključivo 100% prirodnu dudovu svilu iz regije Komo i devičansku vunu iz Bjele. Ne koristimo sintetičke mešavine.'
    },
    {
      number: '02',
      title: 'Individualna konstrukcija',
      desc: 'Svaki šablon se crta ručno prema preko 14 specifičnih tačaka vašeg tela, obezbeđujući anatomski besprekorno pristajanje.'
    },
    {
      number: '03',
      title: 'Haute Couture tehnike šivenja',
      desc: 'Reveri blejzera kanvasiraju se konjskom dlakom, a unutrašnji šavovi svilenih toaleta zatvaraju se francuskim duplim bodom.'
    },
    {
      number: '04',
      title: 'Salon proba & Finiširanje',
      desc: 'U našem intimnom salonu u Topoli isprobavate komad uz prisustvo same Jelene Erić, uz besplatne fine korekture.'
    }
  ];

  return (
    <section id="o-radionici" className="py-24 bg-[#FCFBF7] text-[#1A1A1A] relative border-b border-[#C5A059]/20 overflow-hidden">
      
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
          <motion.div variants={getVariants(staggerItemVariants)} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-medium mb-3">
            <Feather className="w-3.5 h-3.5" />
            <span>Filozofija & Zanatstvo</span>
          </motion.div>
          <motion.h2 variants={getVariants(staggerItemVariants)} className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] tracking-tight mb-4">
            O radionici – Jelena Erić
          </motion.h2>
          <motion.div variants={getVariants(staggerItemVariants)} className="w-12 h-px bg-[#C5A059] mx-auto mb-4" />
          <motion.p variants={getVariants(staggerItemVariants)} className="text-sm sm:text-base text-[#1A1A1A]/75 font-light leading-relaxed">
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
              className="relative aspect-[4/5] overflow-hidden border border-[#C5A059]/40 shadow-xl bg-[#F4F1EA]"
              style={{ y: isMobile ? 0 : imageY }}
            >
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85"
                alt="Radni sto ateljea Jelena Erić u Topoli sa krojačkim makazama i svilom"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Floating Quote Badge with Portrait */}
              <div className="absolute bottom-0 inset-x-0">
                <div className="mx-6 mb-6 bg-[#1A1A1A]/95 border border-[#C5A059]/40 p-4 flex gap-4 items-start backdrop-blur-sm">
                  {/* Jelena Portrait */}
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 overflow-hidden border border-[#C5A059]/40">
                    <img
                      src="/jelena.jpg"
                      alt="Jelena Erić"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Quote Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-serif-luxury text-xs sm:text-sm italic text-[#FCFBF7] leading-snug mb-1.5">
                      "Moda prolazi, ali kroj koji poštuje proporcije vašeg tela i prirodan materijal na koži ostaju večni."
                    </p>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-sans font-semibold block">
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
            })} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-semibold font-sans">
              <Scissors className="w-4 h-4" />
              <span>Spore mode & Lični pristup</span>
            </motion.div>

            <motion.h3 variants={getVariants({
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            })} className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] font-light leading-snug">
              Stvaramo komade koji ne podležu sezonskim trendovima već postaju porodično nasleđe.
            </motion.h3>

            <motion.p variants={getVariants({
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            })} className="text-xs sm:text-sm text-[#1A1A1A]/80 font-light leading-relaxed">
              Nakon više od decenije rada u pariskim i beogradskim modnim kućama, Jelena Erić je osnovala svoj atelje sa jasnom misijom: ponuditi ženama u Srbiji odeću besprekorne izrade kakva se retko sreće u doba brze industrijske proizvodnje.
            </motion.p>

            <motion.p variants={getVariants({
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            })} className="text-xs sm:text-sm text-[#1A1A1A]/80 font-light leading-relaxed">
              U našoj radionici u Topoli ne postoje serijske mašinske trake. Svaku večernju haljinu, strukirani blejzer ili svileni korset kroji i šije isti majstor od prve skice do završnog ručnog šava.
            </motion.p>

            {/* Atelier Key Stats */}
            <motion.div variants={getVariants({
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            })} className="grid grid-cols-3 gap-4 pt-6 border-t border-[#C5A059]/30">
              <div>
                <div className="font-serif-luxury text-2xl sm:text-3xl text-[#C5A059] font-normal">15+</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#1A1A1A]/70 mt-0.5 font-sans">Godina iskustva</div>
              </div>
              <div>
                <div className="font-serif-luxury text-2xl sm:text-3xl text-[#C5A059] font-normal">100%</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#1A1A1A]/70 mt-0.5 font-sans">Prirodne tkanine</div>
              </div>
              <div>
                <div className="font-serif-luxury text-2xl sm:text-3xl text-[#C5A059] font-normal">2.400+</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#1A1A1A]/70 mt-0.5 font-sans">Unikatnih kreacija</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* 4-Step Craftsmanship Process */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
          }}
          id="izrada-po-meri"
          className="pt-10"
        >
          <motion.div variants={getVariants(staggerItemVariants)} className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1A1A1A] mb-2 font-normal">
              Proces izrade po meri
            </h3>
            <p className="text-xs text-[#1A1A1A]/70 font-sans uppercase tracking-widest">Od prvog uzorka do gotovog remek-dela u četiri koraka</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.7, 
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1] 
                    } 
                  },
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white border border-[#1A1A1A]/15 hover:border-[#C5A059] p-6 transition-colors group shadow-sm cursor-default"
              >
                <div className="font-serif-luxury text-3xl font-light text-[#C5A059] group-hover:text-[#A7823B] transition-colors mb-3">
                  {step.number}
                </div>
                <h4 className="font-serif-luxury text-lg text-[#1A1A1A] mb-2 group-hover:text-[#C5A059] transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-[#1A1A1A]/70 font-light leading-relaxed font-sans">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};