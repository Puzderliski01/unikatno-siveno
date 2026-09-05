import React, { useState } from 'react';
import { Sparkles, Mail, MapPin, Phone, ArrowRight, Instagram, Facebook } from 'lucide-react';
import { motion } from 'motion/react';
import { useScrollAnimation, fadeInUpVariants, staggerItemVariants } from '../hooks/useScrollAnimation';
import { Tooltip } from './Tooltip';

interface FooterProps {
  onShowToast: (title: string, desc: string, type: any) => void;
}

export const Footer: React.FC<FooterProps> = React.memo(({ onShowToast }) => {
  const { getVariants, getInViewOptions } = useScrollAnimation();
  const inViewOptions = getInViewOptions();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    onShowToast(
      'Uspešna prijava na bilten',
      'Obaveštavaćemo vas o novim ekskluzivnim kapsula kolekcijama i privatnim revijama.',
      'info'
    );
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
          className="p-4 sm:p-8 lg:p-10 bg-[#1a1a1a] border border-[#c9a96e]/30 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-lg relative overflow-hidden"
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
              Budite prvi koji će saznati za dolazak limitiranih modela i termine privatnih probnih dana.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="relative z-10 w-full lg:w-auto flex flex-col sm:flex-row gap-2 max-w-md">
            <input
              type="email"
              required
              placeholder="Unesite vašu email adresu"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="px-4 py-3 bg-[#111111] border border-[#e8e0d4]/20 focus:border-[#c9a96e] text-xs text-[#e8e0d4] placeholder-[#e8e0d4]/40 outline-none w-full sm:w-72 transition-colors"
            />
            <Tooltip placement="top" label={subscribed ? 'Već ste prijavljeni' : 'Prijavite se na bilten'}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-[#c9a96e] hover:bg-[#A7823B] text-black font-semibold text-xs uppercase tracking-[0.15em] transition-colors whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <span>{subscribed ? 'Prijavljeni' : 'Prijavite se'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </Tooltip>
          </form>
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
              <img
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
                href="https://www.instagram.com/jelena.ericc/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, backgroundColor: '#c9a96e', color: '#000000' }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/5 text-[#e8e0d4] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
            </Tooltip>
            <Tooltip placement="top" label="Facebook stranica ateljea">
              <motion.a
                href="https://www.instagram.com/jelena.ericc/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, backgroundColor: '#c9a96e', color: '#000000' }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/5 text-[#e8e0d4] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
            </Tooltip>
            </div>
          </motion.div>

          {/* Col 2: Nav Links */}
          <motion.div variants={getVariants(staggerItemVariants)}>
            <h4 className="font-serif-luxury text-base text-[#e8e0d4] uppercase tracking-wider mb-4">
              Navigacija
            </h4>
            <ul className="space-y-2.5 text-[#e8e0d4]/75">
              <li>
                <motion.button 
                  onClick={() => scrollTo('kolekcija')} 
                  whileHover={{ x: 4 }}
                  className="hover:text-[#c9a96e] transition-colors text-left"
                >
                  Kolekcija i galerija modela
                </motion.button>
              </li>
              <li>
                <motion.button 
                  onClick={() => scrollTo('o-radionici')} 
                  whileHover={{ x: 4 }}
                  className="hover:text-[#c9a96e] transition-colors text-left"
                >
                  O radionici & Jeleni Erić
                </motion.button>
              </li>
              <li>
                <motion.button 
                  onClick={() => scrollTo('kontakt')} 
                  whileHover={{ x: 4 }}
                  className="hover:text-[#c9a96e] transition-colors text-left"
                >
                  Kontakt & Lokacija
                </motion.button>
              </li>
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
              Salon Topola
            </h4>
            <div className="space-y-2 text-[#e8e0d4]/75 font-sans">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c9a96e] flex-shrink-0 mt-0.5" />
                <span>Topola</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#c9a96e] flex-shrink-0 mt-0.5" />
                <span>+381 636 160 71</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#c9a96e] flex-shrink-0 mt-0.5" />
                <span>kontakt@unikatnosiveno.rs</span>
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
          className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#e8e0d4]/50"
        >
          <Tooltip placement="top" label="Sva prava zadržana © 2026 Unikatno šiveno – Jelena Erić">
            <div>
              © {new Date().getFullYear()} UNIKATNO ŠIVENO – JELENA ERIĆ. Sva prava zadržana.
            </div>
          </Tooltip>
          <div className="flex items-center gap-4">
            <Tooltip placement="top" label="Izrađeno sa pažnjom u Topoli">
              <span>Izrađeno sa pažnjom u Topoli</span>
            </Tooltip>
            <Tooltip placement="top" label="Odvojnik">
              <span>•</span>
            </Tooltip>
            <Tooltip placement="top" label="Isporuka širom Srbije">
              <span>Isporuka širom Srbije</span>
            </Tooltip>
          </div>
        </motion.div>

      </div>
    </footer>
  );
});