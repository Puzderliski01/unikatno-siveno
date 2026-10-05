import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Ruler, Sparkles, HeartHandshake } from 'lucide-react';
import { useScrollAnimation, fadeInUpVariants, staggerItemVariants } from '../hooks/useScrollAnimation';
import { Img } from './Img';

const STEPS = [
  {
    icon: Sparkles,
    title: 'Razgovor i ideja',
    text: 'Sve počinje kafom i pričom. Slušamo šta vam treba, gde ćete nositi model i kakav osećaj želite da imate.',
  },
  {
    icon: Ruler,
    title: 'Mere i skica',
    text: 'Precizno merenje, krojenje po vašoj figuri i skica u kojoj zajedno doterujemo svaki detalj pre nego što makaze dotaknu tkaninu.',
  },
  {
    icon: Scissors,
    title: 'Ručno šivenje',
    text: 'Svaki šav je ručno postavljen. Nema trake, nema prečica — samo vreme, strpljenje i iskustvo stečeno godinama rada.',
  },
  {
    icon: HeartHandshake,
    title: 'Poslednja proba',
    text: 'Model se dokusuruje na vama. Tek kada stoji savršeno, odlazi u vaše ruke — sa ponekom sitnicom koja ga čini samo vašim.',
  },
];

export const BehindTheScenes: React.FC = React.memo(() => {
  const { getVariants, getInViewOptions } = useScrollAnimation();
  const inViewOptions = getInViewOptions();

  return (
    <section id="iza-scene" className="py-16 sm:py-20 bg-[#0a0a0a] relative border-b border-[#c9a96e]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div
            variants={getVariants(staggerItemVariants)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-medium mb-3"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Iza scene</span>
          </motion.div>
          <motion.h2
            variants={getVariants(staggerItemVariants)}
            className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-light text-[#e8e0d4] tracking-tight mb-3"
          >
            Kako nastaje jedan unikatni model
          </motion.h2>
          <motion.div variants={getVariants(staggerItemVariants)} className="w-12 h-px bg-[#c9a96e] mx-auto mb-3" />
          <motion.p variants={getVariants(staggerItemVariants)} className="text-xs sm:text-sm text-[#e8e0d4]/65 font-sans font-light">
            Četiri koraka između prve kafe i dana kada haljina postane vaša
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Slike — proces rada */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewOptions}
            variants={getVariants(fadeInUpVariants)}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-[#c9a96e]/30 bg-[#111111] col-span-2 sm:col-span-1">
              <Img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=75"
                alt="Radni sto sa krojačkim makazama i tkaninom u ateljeu"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.2em] text-[#c9a96e] font-sans bg-[#0a0a0a]/80 px-2 py-1 border border-[#c9a96e]/30">
                Krojenje
              </span>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden border border-[#c9a96e]/30 bg-[#111111] col-span-2 sm:col-span-1">
              <Img
                src="/jelena.jpg"
                alt="Jelena Erić u svom ateljeu"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.2em] text-[#c9a96e] font-sans bg-[#0a0a0a]/80 px-2 py-1 border border-[#c9a96e]/30">
                Jelena Erić
              </span>
            </div>

            <div className="col-span-2 bg-[#111111] border border-[#c9a96e]/20 p-5 sm:p-6">
              <p className="font-serif-luxury text-base sm:text-lg italic text-[#e8e0d4]/90 leading-relaxed">
                „Ne šijem komade. Šijem trenutke u kojima se žena oseća kao sebe —
                tek toliko drugačije da se okrene za njom.“
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#c9a96e] font-sans">
                Jelena Erić, osnivačica
              </p>
            </div>
          </motion.div>

          {/* Koraci procesa */}
          <div className="space-y-0">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={inViewOptions}
                variants={getVariants(fadeInUpVariants)}
                className="flex gap-4 sm:gap-6 py-5 border-b border-[#e8e0d4]/10 last:border-0"
              >
                <div className="flex-shrink-0 flex flex-col items-center">
                  <span className="w-10 h-10 border border-[#c9a96e]/40 flex items-center justify-center text-[#c9a96e] bg-[#111111]">
                    <step.icon className="w-4 h-4" />
                  </span>
                  <span className="mt-2 text-[10px] font-mono text-[#e8e0d4]/40">0{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif-luxury text-lg sm:text-xl text-[#e8e0d4] mb-1.5">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-[#e8e0d4]/65 font-sans leading-relaxed">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

BehindTheScenes.displayName = 'BehindTheScenes';

export default BehindTheScenes;
