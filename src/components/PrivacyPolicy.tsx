import React from 'react';
import { ArrowLeft, Instagram, Mail, ShieldCheck } from 'lucide-react';
import { GlassLayer } from './GlassLayer';

const INSTAGRAM_URL = 'https://www.instagram.com/jelena.ericc/';
const CONTACT_EMAIL = 'jelena.ericc@gmail.com';

interface Section {
  title: string;
  body: React.ReactNode;
}

const sections: Section[] = [
  {
    title: '1. Ko smo i šta ovaj dokument pokriva',
    body: (
      <>
        Ova politika privatnosti objašnjava koje lične podatke prikupljamo, zašto ih prikupljamo
        i kako ih čuvamo kada posetite sajt <em>unikatno-siveno.vercel.app</em> u vlasništvu
        atelja <strong>Unikatno šiveno – Jelena Erić</strong>, Topola, Srbija.
        <br />
        <br />
        Sajt je prezentaciona galerija brenda. Na sajtu se <strong>ne vrši prodaja, poručivanje niti
        naplata</strong> — sve oko porudžbine dogovara se lično, van sajta.
      </>
    ),
  },
  {
    title: '2. Koji podaci se prikupljaju',
    body: (
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Nalog (samo ako se registrujete):</strong> email adresa i, opciono, ime i prezime.
          Registracija nije obavezna i nije potrebna za pregled kolekcije.
        </li>
        <li>
          <strong>Prijava na bilten:</strong> isključivo email adresa koju unesete u formu.
        </li>
        <li>
          <strong>Poruke koje nam pošaljete</strong> preko WhatsApp-a, Instagram-a ili emaila —
          obrađuju ih i čuvaju provajderi tih usluga, a ne preko ovog sajta.
        </li>
        <li>
          <strong>Tehnički podaci čuvani lokalno u vašem browseru</strong> (localStorage):
          izabrana tema, nedavno gledani modeli, vaš izbor i lista želja. Oni ostaju u vašem
          uređaju i ne šalju se nama.
        </li>
      </ul>
    ),
  },
  {
    title: '3. Zašto prikupljamo podatke',
    body: (
      <ul className="list-disc list-inside space-y-2">
        <li>da bismo odgovorili na vaša pitanja o modelima i materijalima;</li>
        <li>da bismo vam slali obaveštenja o novim modelima — samo ako ste se prijavili;</li>
        <li>da bi sajt radio onako kako je zamišljen (tema, izbor, lista želja).</li>
      </ul>
    ),
  },
  {
    title: '4. Nema prodaje ni naplate preko sajta',
    body: (
      <>
        Sajt ne prikuplja podatke o platnim karticama, ne naplaćuje novac i ne evidentira
        porudžbine. Ako se oko nekog komada dogovorimo, to se dešava isključivo direktnom
        komunikacijom, van ovog sajta.
      </>
    ),
  },
  {
    title: '5. Kolačići i praćenje',
    body: (
      <>
        Ne koristimo kolačiće za oglašavanje niti za praćenje korisnika kroz druge sajtove.
        Koristimo samo neophodnu lokalnu memoriju browsera opisanu u tački 2, koja služi da sajt
        zapamti vaša podešavanja. Saglasnost za kolačiće zbog toga nije potrebna.
      </>
    ),
  },
  {
    title: '6. Usluge trećih strana',
    body: (
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Vercel</strong> — hosting sajta (SAD/EU).</li>
        <li><strong>Supabase</strong> — baza podataka za naloge i prijave na bilten.</li>
        <li><strong>Google Fonts</strong> — isporuka fontova.</li>
        <li><strong>WhatsApp i Instagram (Meta)</strong> — komunikacija, kada kliknete na naše linkove.</li>
      </ul>
    ),
  },
  {
    title: '7. Koliko dugo čuvamo podatke',
    body: (
      <>
        Podatke čuvamo dok ne povučete saglasnost. Prijavu na bilten možete da otkažete u bilo
        kom trenutku — dovoljno je da nam pošaljete poruku, podatak brišemo istog dana.
      </>
    ),
  },
  {
    title: '8. Vaša prava',
    body: (
      <>
        U skladu sa Zakonom o zaštiti podataka o ličnosti (Republika Srbija) imate pravo da
        zatražite uvid, ispravku ili brisanje svojih podataka, kao i da povučete saglasnost za
        njihovo obrađivanje. Zahtev šaljete na {CONTACT_EMAIL}, a odgovaramo najkasnije u roku
        od 30 dana. Imate i pravo da se obratite Agenciji za zaštitu podataka o ličnosti.
      </>
    ),
  },
  {
    title: '9. Kontakt',
    body: (
      <>
        Za sva pitanja o privatnosti javite se na{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#c9a96e] hover:underline break-all">
          {CONTACT_EMAIL}
        </a>{' '}
        ili preko{' '}
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-[#c9a96e] hover:underline">
          Instagram profila
        </a>
        .
      </>
    ),
  },
  {
    title: '10. Izmene',
    body: (
      <>
        Ovaj dokument može biti ažuriran. Poslednja izmena: 5. oktobar 2026. godine.
      </>
    ),
  },
];

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e0d4]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 liquid-glass border-b border-[#c9a96e]/20">
        <GlassLayer cornerRadius={0} displacementScale={40} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 min-h-[44px] py-2 text-xs uppercase tracking-[0.2em] text-[#c9a96e] hover:text-[#e8d098] transition-colors font-sans"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Nazad na sajt</span>
          </a>
          <div className="text-right">
            <span className="font-serif-luxury text-sm sm:text-base tracking-[0.3em] uppercase text-[#c9a96e] block leading-tight">
              Unikatno šiveno
            </span>
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#c9a96e]/70 font-sans">
              Jelena Erić
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-5 h-5 text-[#c9a96e]" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#c9a96e] font-sans font-medium">
            Zaštita podataka
          </span>
        </div>

        <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#e8e0d4] tracking-tight mb-4">
          Politika privatnosti
        </h1>
        <div className="w-12 h-px bg-[#c9a96e] mb-6" />
        <p className="text-sm text-[#e8e0d4]/70 leading-relaxed font-light max-w-2xl mb-12">
          Jednostavno i bez sitnih slova: ovaj sajt služi da pogledate kolekciju i javite nam se.
          Podatke uzimamo samo kada ih vi dobrovoljno date — i čuvamo ih pažljivo.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="glass border border-[#c9a96e]/20 p-6 sm:p-7">
              <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#e8e0d4] font-normal mb-3">
                {section.title}
              </h2>
              <div className="text-sm text-[#e8e0d4]/75 leading-relaxed font-light font-sans">
                {section.body}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <a
            href="/"
            className="flex-1 py-4 bg-[#c9a96e] hover:bg-[#e8d098] text-[#0a0a0a] font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Nazad na kolekciju</span>
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex-1 py-4 border border-[#c9a96e]/40 hover:bg-[#c9a96e]/10 text-[#c9a96e] font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Pitanje o podacima</span>
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-4 border border-[#c9a96e]/40 hover:bg-[#c9a96e]/10 text-[#c9a96e] font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram</span>
          </a>
        </div>
      </main>
    </div>
  );
};
