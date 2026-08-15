import React from 'react';
import { Scissors, Sparkles, Feather, Compass, CheckCircle2, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-medium mb-3">
            <Feather className="w-3.5 h-3.5" />
            <span>Filozofija & Zanatstvo</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] tracking-tight mb-4">
            O radionici – Jelena Erić
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-[#1A1A1A]/75 font-light leading-relaxed">
            Unikatno šiveno je atelier posvećen povratku autentičnom krojačkom zanatu, gde svaki odevni predmet nastaje kao umetničko delo krojeno za jednu ženu.
          </p>
        </div>

        {/* Story & Atelier Visuals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-[#C5A059]/40 shadow-xl bg-[#F4F1EA]">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85"
                alt="Radni sto ateljea Jelena Erić u Topoli sa krojačkim makazama i svilom"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Floating Quote Badge */}
              <div className="absolute bottom-6 inset-x-6 bg-[#1A1A1A]/95 text-[#FCFBF7] border border-[#C5A059]/40 p-4">
                <p className="font-serif-luxury text-sm italic text-[#FCFBF7] leading-snug mb-1">
                  "Moda prolazi, ali kroj koji poštuje proporcije vašeg tela i prirodan materijal na koži ostaju večni."
                </p>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-sans font-semibold block">
                  — Jelena Erić, osnivač i glavni kreator
                </span>
              </div>
            </div>

            {/* Overlapping Secondary Image */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-44 h-56 overflow-hidden border border-[#C5A059]/30 shadow-2xl bg-[#FCFBF7]">
              <img
                src="https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=800&q=85"
                alt="Detalj ručnog boda i svilenog konca"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Narrative Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6 lg:pl-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-semibold font-sans">
              <Scissors className="w-4 h-4" />
              <span>Spore mode & Lični pristup</span>
            </div>

            <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] font-light leading-snug">
              Stvaramo komade koji ne podležu sezonskim trendovima već postaju porodično nasleđe.
            </h3>

            <p className="text-xs sm:text-sm text-[#1A1A1A]/80 font-light leading-relaxed">
              Nakon više od decenije rada u pariskim i beogradskim modnim kućama, Jelena Erić je osnovala svoj atelje sa jasnom misijom: ponuditi ženama u Srbiji odeću besprekorne izrade kakva se retko sreće u doba brze industrijske proizvodnje.
            </p>

            <p className="text-xs sm:text-sm text-[#1A1A1A]/80 font-light leading-relaxed">
              U našoj radionici u Topoli ne postoje serijske mašinske trake. Svaku večernju haljinu, strukirani blejzer ili svileni korset kroji i šije isti majstor od prve skice do završnog ručnog šava.
            </p>

            {/* Atelier Key Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#C5A059]/30">
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
            </div>
          </div>

        </div>

        {/* 4-Step Craftsmanship Process */}
        <div id="izrada-po-meri" className="pt-10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1A1A1A] mb-2 font-normal">
              Proces izrade po meri
            </h3>
            <p className="text-xs text-[#1A1A1A]/70 font-sans uppercase tracking-widest">Od prvog uzorka do gotovog remek-dela u četiri koraka</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white border border-[#1A1A1A]/15 hover:border-[#C5A059] p-6 transition-all group shadow-sm"
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
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
