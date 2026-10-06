import React, { useState } from 'react';
import { MapPin, Mail, Clock, MessageCircle, Instagram, ChevronDown, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useScrollAnimation, fadeInUpVariants, staggerItemVariants } from '../hooks/useScrollAnimation';

interface ContactSectionProps {
  onShowToast: (title: string, desc: string, type: any) => void;
}

const WHATSAPP_URL = 'https://wa.me/38163616071';
const INSTAGRAM_URL = 'https://www.instagram.com/jelena.ericc/';
const CONTACT_EMAIL = 'jelena.ericc@gmail.com';

export const ContactSection: React.FC<ContactSectionProps> = React.memo(() => {
  const { getVariants, getInViewOptions } = useScrollAnimation();
  const inViewOptions = getInViewOptions();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Kako da poručim model koji mi se dopada?',
      a: 'Cena je prikazana uz svaki model. Model koji vam se dopada dodajte u izbor i pošaljite nam ga porukom preko WhatsApp-a ili Instagram DM-a — tada se dogovaramo o dostupnosti, rokovima i načinu primopredaje. Na sajtu nema online plaćanja niti porudžbenice.',
    },
    {
      q: 'Da li mogu da dođem u atelje?',
      a: 'Da, ali isključivo po najavi i dogovoru. Javite nam se porukom i dogovorićemo termin koji vam odgovara.',
    },
    {
      q: 'Koliko traje izrada unikatnog modela po meri?',
      a: 'Za modele iz aktuelne kolekcije rok izrade i prilagođavanja je 4 do 7 radnih dana. Za potpuno nove unikatne večernje toalete po posebnoj skici, javite se 3 do 4 nedelje pre željenog događaja.',
    },
    {
      q: 'Kako funkcionišu naknadne korekcije i prepravke?',
      a: 'Sve sitne korekcije za modele sašivene u našem ateljeu su potpuno besplatne. Ako nakon primopredaje primetite potrebu za sitnim prilagođavanjem, ono se dogovara individualno.',
    },
  ];

  return (
    <section id="kontakt" className="py-24 bg-[#0a0a0a] text-[#e8e0d4] relative border-b border-[#c9a96e]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atelje & Konsultacije</span>
          </motion.div>
          <motion.h2 variants={getVariants(staggerItemVariants)} className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#e8e0d4] tracking-tight mb-4">
            Kontakt & Konsultacije
          </motion.h2>
          <motion.div variants={getVariants(staggerItemVariants)} className="w-12 h-px bg-[#c9a96e] mx-auto mb-4" />
          <motion.p variants={getVariants(staggerItemVariants)} className="text-sm sm:text-base text-[#e8e0d4]/75 font-light leading-relaxed">
            Javite se WhatsApp-om ili Instagram porukom — razgovaramo o modelima, materijalima i rokovima.
          </motion.p>
        </motion.div>

        {/* 2-Column Info & Direct Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 overflow-hidden">
          
          {/* Left Column: Atelier Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewOptions}
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="bg-[#111111] border border-[#c9a96e]/40 p-6 sm:p-7 relative overflow-hidden shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#c9a96e] font-sans font-semibold">Atelje & radionica</span>
                <span className="text-xs text-[#e8e0d4] flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#c9a96e] animate-pulse" />
                  Rad po dogovoru
                </span>
              </div>
              <h3 className="font-serif-luxury text-2xl text-[#e8e0d4] mb-2 font-normal">Atelje Topola</h3>
              <p className="text-xs text-[#e8e0d4]/70 leading-relaxed font-sans">
                Posete ateljeu su moguće isključivo po najavi i dogovoru, kako bismo svakoj
                klijentkinji obezbedili punu privatnost i posvećenost.
              </p>

              <div className="space-y-2.5 text-xs text-[#e8e0d4]/80 mt-4 font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#c9a96e] flex-shrink-0 mt-0.5" />
                  <span>Topola, Srbija</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#c9a96e] flex-shrink-0 mt-0.5" />
                  <span>Termini isključivo po dogovoru</span>
                </div>
                <div className="flex items-center gap-3 min-h-[44px] py-1.5">
                  <MessageCircle className="w-4 h-4 text-[#c9a96e] flex-shrink-0" />
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#c9a96e] transition-colors font-mono flex items-center min-h-[44px] flex-1"
                  >
                    +381 636 160 71
                  </a>
                </div>
                <div className="flex items-center gap-3 min-h-[44px] py-1.5">
                  <Mail className="w-4 h-4 text-[#c9a96e] flex-shrink-0" />
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[#c9a96e] transition-colors break-all flex items-center min-h-[44px] flex-1">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#c9a96e]/15 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 min-h-[44px] bg-[#c9a96e] hover:bg-[#e8d098] border border-[#c9a96e] text-[#0a0a0a] text-xs uppercase tracking-[0.15em] transition-all flex items-center gap-2 font-sans font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 min-h-[44px] bg-transparent hover:bg-[#c9a96e]/10 border border-[#c9a96e]/30 text-[#e8e0d4] text-xs uppercase tracking-[0.15em] transition-all flex items-center gap-2 font-sans"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#c9a96e]" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Direct Message */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewOptions}
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="lg:col-span-6 bg-[#111111] border border-[#c9a96e]/20 p-6 sm:p-8 shadow-sm flex flex-col justify-center"
          >
            <h3 className="font-serif-luxury text-2xl text-[#e8e0d4] mb-2 font-normal">Pišite nam direktno</h3>
            <p className="text-xs text-[#e8e0d4]/70 mb-6 leading-relaxed font-sans">
              Imate pitanje o modelu, materijalu ili želite procenu za unikatnu kreaciju po meri?
              Poruka stiže direktno do Jelene — bez forma i čekanja.
            </p>

            <div className="space-y-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-[#c9a96e] hover:bg-[#b89a60] text-[#0a0a0a] font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 font-sans shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pošaljite poruku preko WhatsApp-a</span>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 border border-[#c9a96e]/40 hover:bg-[#c9a96e]/10 text-[#c9a96e] font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 font-sans"
              >
                <Instagram className="w-4 h-4" />
                <span>Pišite nam u Instagram DM</span>
              </a>
            </div>

            <p className="text-[11px] text-[#e8e0d4]/70 mt-5 leading-relaxed font-sans">
              Ili nam pišite na{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#c9a96e] hover:underline py-1 inline-block">
                {CONTACT_EMAIL}
              </a>
              . Odgovaramo u toku dana.
            </p>
          </motion.div>
        </div>

        {/* FAQ Accordion Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={getVariants(fadeInUpVariants)}
          className="pt-10 border-t border-[#c9a96e]/20 max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#e8e0d4] mb-2 font-normal">
              Često postavljana pitanja
            </h3>
            <p className="text-xs text-[#e8e0d4]/70 uppercase tracking-widest font-sans">Sve što treba da znate o poručivanju i unikatnom šivenju</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={inViewOptions}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="bg-[#111111] border border-[#c9a96e]/20 overflow-hidden transition-colors shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif-luxury text-base sm:text-lg text-[#e8e0d4] hover:text-[#c9a96e] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#c9a96e] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#e8e0d4]/80 leading-relaxed font-light border-t border-[#c9a96e]/15 font-sans">
                      {faq.a}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
});
