import React, { useState } from 'react';
import { Sparkles, Mail, MapPin, Phone, ArrowRight, Instagram, Facebook, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useScrollAnimation, fadeInUpVariants, staggerItemVariants } from '../hooks/useScrollAnimation';
import { Tooltip } from './Tooltip';
import { subscribeToNewsletter } from '../lib/supabase';
import { scrollToSection } from '../lib/scroll';
import { Img } from './Img';

const INSTAGRAM_URL = 'https://www.instagram.com/jelena.ericc/';
const FACEBOOK_URL = 'https://www.facebook.com/people/Unikatno-%C5%A1iveno-Jelena-Eri%C4%87/100063482086585/';
const CONTACT_EMAIL = 'jelena.ericc@gmail.com';

interface FooterProps {
  onShowToast: (title: string, desc: string, type: any) => void;
}

export const Footer: React.FC<FooterProps> = React.memo(({ onShowToast }) => {
  const { getVariants, getInViewOptions } = useScrollAnimation();
  const inViewOptions = getInViewOptions();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    const result = await subscribeToNewsletter(email);
    setIsSubmitting(false);

    onShowToast(
      result.ok ? 'Prijava na bilten' : 'Prijava nije uspela',
      result.message,
      'info'
    );

    if (result.ok) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollTo = (id: string) => {
    scrollToSection(id);
  };

  return (
    <footer className="bg-[#111111] border-t border-[#c9a96e]/40 text-[#e8e0d4] font-sans pt-16 pb-12 footer-bg-animate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Atelier Invitation Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={{
            hidden: { opacity: 0, y: 50, scale: 0.98 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="lift-hover p-4 sm:p-8 lg:p-10 bg-[#1a1a1a] border border-[#c9a96e]/30 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-lg relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#c9a96e]/5 via-transparent to-[#c9a96e]/5" />
          
          <div className="relative z-10 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#c9a96e] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Privatni krug ateljea</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#e8e0d4] mb-2 font-normal">
              Prijavite se za obaveštenja o novim unikatnim komadima
            </h3>
            <p className="text-xs text-[#e8e0d4]/75 leading-relaxed font-light">
              Budite prvi koji će saznati za dolazak limitiranih modela i nove komade u kolekciji.
            </p>
          </div>

          <div className="relative z-10 w-full lg:w-auto max-w-md">
            <form onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Unesite vašu email adresu"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                disabled={isSubmitting}
                className="px-4 py-3.5 min-h-[44px] bg-[#111111] border border-[#e8e0d4]/20 focus:border-[#c9a96e] text-[13px] text-[#e8e0d4] placeholder-[#e8e0d4]/40 outline-none w-full sm:w-72 transition-colors disabled:opacity-60"
              />
              <Tooltip placement="top" label={subscribed ? 'Već ste prijavljeni' : 'Prijavite se na bilten'}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="shine-btn px-6 py-3.5 min-h-[44px] bg-[#c9a96e] hover:bg-[#A7823B] text-black font-semibold text-[13px] uppercase tracking-[0.15em] transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 disabled:opacity-60"
                >
                  <span>{isSubmitting ? 'Šaljemo...' : subscribed ? 'Prijavljeni' : 'Prijavite se'}</span>
                  {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </motion.button>
              </Tooltip>
            </form>
            <p className="text-[11px] text-[#e8e0d4]/70 mt-2 leading-relaxed">
              Email adresu koristimo isključivo za slanje obaveštenja o novim modelima. Više o
              tome u <a href="/politika-privatnosti" className="underline hover:text-[#c9a96e] py-1 inline-block">politici privatnosti</a>.
            </p>
          </div>
        </motion.div>

        {/* 4 Columns Footer Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 text-xs"
        >
          
          {/* Col 1: Brand Info */}
          <motion.div variants={getVariants(staggerItemVariants)} className="space-y-4">
            <div className="flex items-center gap-3">
              <Img
                src="/logo.png"
                alt="Unikatno šiveno – Jelena Erić"
                className="h-10 w-auto object-contain"
                loading="lazy"
                decoding="async"
                width="40"
                height="40"
              />
              <div>
                <span className="font-serif-luxury text-lg font-normal tracking-[0.15em] text-[#e8e0d4] block">
                  UNIKATNO ŠIVENO
                </span>
                <span className="font-serif text-xs tracking-[0.25em] text-[#c9a96e] uppercase block font-light">
                  Jelena Erić • Atelier Topola
                </span>
              </div>
            </div>
            <p className="text-[#e8e0d4]/70 leading-relaxed font-light font-sans">
              Ekskluzivni modni atelje posvećen izradi unikatne ženske odeće od najfinije svile, vune i kašmira.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Tooltip placement="top" label="Instagram profil ateljea">
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Instagram"
                className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center bg-white/5 text-[#e8e0d4] hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </Tooltip>
            <Tooltip placement="top" label="Facebook stranica ateljea">
              <motion.a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Facebook"
                className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center bg-white/5 text-[#e8e0d4] hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
            </Tooltip>
            </div>
          </motion.div>

          {/* Col 2: Nav Links */}
          <motion.div variants={getVariants(staggerItemVariants)}>
            <h4 className="font-serif-luxury text-base text-[#e8e0d4] uppercase tracking-wider mb-4">
              Navigacija
            </h4>
            <ul className="space-y-1 text-[#e8e0d4]/75">
              {[
                { id: 'kolekcija', label: 'Kolekcija i galerija modela' },
                { id: 'o-radionici', label: 'O radionici & Jeleni Erić' },
                { id: 'kontakt', label: 'Kontakt & Lokacija' },
              ].map((link, idx) => (
                <li key={link.id}>
                  <motion.button 
                    onClick={() => scrollTo(link.id)} 
                    whileHover={{ x: 4 }}
                    className="hanging-link hover:text-[#c9a96e] transition-colors text-left pl-3 w-full min-h-[44px] py-2.5 flex items-center text-[13px]"
                    style={{ 
                      transformOrigin: 'top center',
                      animationDelay: `${idx * 0.1}s`,
                    }}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Materials & Heritage */}
          <motion.div variants={getVariants(staggerItemVariants)}>
            <h4 className="font-serif-luxury text-base text-[#e8e0d4] uppercase tracking-wider mb-4">
              Naši standardi
            </h4>
            <ul className="space-y-2.5 text-[#e8e0d4]/75">
              {[
                'Prirodni materijali, pažljivo birani',
                'Svaki šav, svaki konac promišljeno prožet u svaki odevni predmet',
                'Autentični i originalni modeli sa 1 od 1 primercima',
                'Brza i pouzdana komunikacija',
              ].map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={inViewOptions}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[#c9a96e]" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4: Atelier Locations */}
          <motion.div variants={getVariants(staggerItemVariants)}>
            <h4 className="font-serif-luxury text-base text-[#e8e0d4] uppercase tracking-wider mb-4">
              Atelje Topola
            </h4>
            <div className="space-y-1 text-[#e8e0d4]/75 font-sans">
              <div className="flex items-center gap-2 min-h-[44px] py-1.5">
                <MapPin className="w-4 h-4 text-[#c9a96e] flex-shrink-0" />
                <span className="text-[13px]">Topola, Srbija — posete po dogovoru</span>
              </div>
              <div className="flex items-center gap-2 min-h-[44px] py-1.5">
                <Phone className="w-4 h-4 text-[#c9a96e] flex-shrink-0" />
                <a
                  href="https://wa.me/38163616071"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#c9a96e] transition-colors text-[13px] flex items-center min-h-[44px] flex-1"
                >
                  +381 636 160 71 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2 min-h-[44px] py-1.5">
                <Mail className="w-4 h-4 text-[#c9a96e] flex-shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[#c9a96e] transition-colors break-all text-[13px] flex items-center min-h-[44px] flex-1">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Bottom Legal Copyright & Serbian Business Details */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={getVariants(fadeInUpVariants)}
          className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#e8e0d4]/70"
        >
          <Tooltip placement="top" label="Sva prava zadržana © 2026 Unikatno šiveno – Jelena Erić">
            <div>
              © {new Date().getFullYear()} UNIKATNO ŠIVENO – JELENA ERIĆ. Sva prava zadržana.
            </div>
          </Tooltip>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
            <a href="/politika-privatnosti" className="hover:text-[#c9a96e] transition-colors py-3 inline-flex items-center min-h-[44px]">
              Politika privatnosti
            </a>
            <span className="text-[#e8e0d4]/60 hidden sm:inline">•</span>
            <Tooltip placement="top" label="Izrađeno sa pažnjom u Topoli">
              <span className="py-2 inline-block">Izrađeno sa pažnjom u Topoli</span>
            </Tooltip>
            <span className="text-[#e8e0d4]/60 hidden sm:inline">•</span>
            <Tooltip placement="top" label="Posete ateljeu isključivo po dogovoru">
              <span className="py-2 inline-block">Posete ateljeu po dogovoru</span>
            </Tooltip>
          </div>
        </motion.div>

      </div>
    </footer>
  );
});