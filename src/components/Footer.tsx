import React, { useState } from 'react';
import { Sparkles, Scissors, ShieldCheck, Mail, MapPin, Phone, ArrowRight, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onShowToast: (title: string, desc: string, type: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onShowToast }) => {
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
    <footer className="bg-[#1A1A1A] border-t border-[#C5A059]/40 text-[#FCFBF7] font-sans pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Atelier Invitation Bar */}
        <div className="p-8 sm:p-10 bg-[#242424] border border-[#C5A059]/30 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Privatni krug ateljea</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FCFBF7] mb-2 font-normal">
              Prijavite se za obaveštenja o novim unikatnim komadima
            </h3>
            <p className="text-xs text-[#FCFBF7]/75 leading-relaxed font-light">
              Budite prvi koji će saznati za dolazak limitiranih rolna italijanske svile i termine privatnih probnih dana.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2 max-w-md">
            <input
              type="email"
              required
              placeholder="Unesite vašu email adresu"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="px-4 py-3 bg-[#1A1A1A] border border-[#FCFBF7]/20 focus:border-[#C5A059] text-xs text-[#FCFBF7] placeholder-[#FCFBF7]/40 outline-none w-full sm:w-72"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#C5A059] hover:bg-[#A7823B] text-black font-semibold text-xs uppercase tracking-[0.15em] transition-colors whitespace-nowrap flex items-center justify-center gap-1.5"
            >
              <span>{subscribed ? 'Prijavljeni' : 'Prijavite se'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* 4 Columns Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 text-xs">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Unikatno šiveno – Jelena Erić"
                className="h-10 w-auto object-contain"
              />
              <div>
                <span className="font-serif-luxury text-lg font-normal tracking-[0.15em] text-[#FCFBF7] block">
                  UNIKATNO ŠIVENO
                </span>
                <span className="font-serif text-xs tracking-[0.25em] text-[#C5A059] uppercase block font-light">
                  Jelena Erić • Atelier Topola
                </span>
              </div>
            </div>
            <p className="text-[#FCFBF7]/70 leading-relaxed font-light font-sans">
              Ekskluzivni modni atelje posvećen izradi unikatne ženske odeće od najfinije svile, vune i kašmira.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/jelena.ericc/"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/5 hover:bg-[#C5A059] text-[#FCFBF7] hover:text-black transition-colors"
                aria-label="Instagram profil ateljea"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/jelena.ericc/"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/5 hover:bg-[#C5A059] text-[#FCFBF7] hover:text-black transition-colors"
                aria-label="Facebook stranica ateljea"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Nav Links */}
          <div>
            <h4 className="font-serif-luxury text-base text-[#FCFBF7] uppercase tracking-wider mb-4">
              Navigacija
            </h4>
            <ul className="space-y-2.5 text-[#FCFBF7]/75">
              <li>
                <button onClick={() => scrollTo('kolekcija')} className="hover:text-[#C5A059] transition-colors">
                  Kolekcija i galerija modela
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('o-radionici')} className="hover:text-[#C5A059] transition-colors">
                  O radionici & Jeleni Erić
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('izrada-po-meri')} className="hover:text-[#C5A059] transition-colors">
                  Proces izrade po meri
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-[#C5A059] transition-colors text-[#C5A059]">
                  Zakazivanje termina za probu &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Materials & Heritage */}
          <div>
            <h4 className="font-serif-luxury text-base text-[#FCFBF7] uppercase tracking-wider mb-4">
              Naši standardi
            </h4>
            <ul className="space-y-2.5 text-[#FCFBF7]/75">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                100% Prirodna Mulberry svila
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                Italijanska devičanska vuna Super 130s
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                Mongolski organski kašmir
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                Ručno rađeni šavovi i dugmad
              </li>
            </ul>
          </div>

          {/* Col 4: Atelier Locations */}
          <div>
              <h4 className="font-serif-luxury text-base text-[#FCFBF7] uppercase tracking-wider mb-4">
              Salon Topola
            </h4>
            <div className="space-y-2 text-[#FCFBF7]/75 font-sans">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>Topola</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>+381 636 160 71</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>kontakt@unikatnosiveno.rs</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright & Serbian Business Details */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FCFBF7]/50">
          <div>
            © {new Date().getFullYear()} UNIKATNO ŠIVENO – JELENA ERIĆ. Sva prava zadržana. PIB: 112938492 • MB: 21894021
          </div>
          <div className="flex items-center gap-4">
            <span>Izrađeno sa pažnjom u Topoli</span>
            <span>•</span>
            <span>Isporuka širom Srbije</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
