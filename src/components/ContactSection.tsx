import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, ChevronDown, Sparkles, CheckCircle2, Calendar } from 'lucide-react';

interface ContactSectionProps {
  onOpenBooking: () => void;
  onShowToast: (title: string, desc: string, type: any) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking, onShowToast }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      onShowToast(
        'Poruka uspešno poslata',
        'Jelena Erić ili asistent ateljea će vam odgovoriti u roku od nekoliko sati.',
        'info'
      );
      setTimeout(() => setSent(false), 4000);
      setName('');
      setEmail('');
      setMessage('');
    }, 600);
  };

  const faqs = [
    {
      q: 'Koliko traje izrada unikatnog modela po meri?',
      a: 'Za modele iz naše aktuelne kolekcije rok izrade i prilagođavanja je 4 do 7 radnih dana. Za potpuno nove unikatne večernje toalete ili venčanice po posebnoj skici, preporučujemo zakazivanje konsultacije 3 do 4 nedelje pre željenog događaja.'
    },
    {
      q: 'Da li je zakazivanje probe obavezno za posetu salonu?',
      a: 'Da, kako bismo svakoj klijentkinji obezbedili punu privatnost, diskreciju i posvećenost Jelene Erić, posete našem salonu u Topoli odvijaju se isključivo uz prethodno zakazan termin.'
    },
    {
      q: 'Kako funkcionišu naknadne korekcije i prepravke?',
      a: 'Sve korekcije za modele sašivene u našem ateljeu su potpuno besplatne. Ukoliko nakon preuzimanja ili probe primetite potrebu za sitnim prilagođavanjem, naš tim to rešava u roku od 24–48h.'
    },
    {
      q: 'Kako se vrši dostava i plaćanje van Topole?',
      a: 'Šaljemo osiguranom Post Express kurirskom službom danas za sutra na teritoriji cele Srbije. Plaćanje možete izvršiti pouzećem gotovinom kuriru, platnom karticom ili direktnom uplatom na račun ateljea. Za sve iznose preko 25.000 RSD dostava je besplatna.'
    }
  ];

  return (
    <section id="kontakt" className="py-24 bg-[#FCFBF7] text-[#1A1A1A] relative border-b border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Salon & Konsultacije</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] tracking-tight mb-4">
            Kontakt & Zakazivanje termina
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-[#1A1A1A]/75 font-light leading-relaxed">
            Posetite naš salon u Topoli za privatnu probu, izbor uzoraka svile i razgovor o vašoj sledećoj toaleti.
          </p>
        </div>

        {/* 2-Column Info & Message Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          
          {/* Left Column: Atelier Salon Addresses & Hours (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Atelier Card */}
            <div className="bg-white border border-[#C5A059]/40 p-6 sm:p-7 relative overflow-hidden shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-sans font-semibold">Glavni salon & radionica</span>
                <span className="text-xs text-[#1A1A1A] flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                  Otvoreno za probe
                </span>
              </div>
              <h3 className="font-serif-luxury text-2xl text-[#1A1A1A] mb-2 font-normal">Atelje Topola</h3>
              
              <div className="space-y-2.5 text-xs text-[#1A1A1A]/80 mt-4 font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span>Topola</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span>Pon – Pet: 10:00 – 20:00 | Subota: 10:00 – 16:00 (uz najavu)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <a href="tel:+38163616071" className="hover:text-[#C5A059] transition-colors font-mono">
                    +381 636 160 71
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <a href="mailto:atelijer@unikatnosiveno.rs" className="hover:text-[#C5A059] transition-colors">
                    atelijer@unikatnosiveno.rs
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1A1A1A]/10 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#A7823B] text-black font-semibold text-xs uppercase tracking-[0.15em] transition-all flex items-center gap-2 font-sans"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Zakažite termin</span>
                </button>
                <a
                  href="https://wa.me/38163616071"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-white hover:bg-[#F4F1EA] border border-[#1A1A1A]/20 text-[#1A1A1A] text-xs uppercase tracking-[0.15em] transition-all flex items-center gap-2 font-sans"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>WhatsApp / Viber</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Form (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-[#1A1A1A]/15 p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif-luxury text-2xl text-[#1A1A1A] mb-2 font-normal">Pošaljite nam direktan upit</h3>
            <p className="text-xs text-[#1A1A1A]/70 mb-6 leading-relaxed font-sans">
              Imate pitanje o modelima, specifičnom materijalu ili želite procenu za vašu unikatnu kreaciju? Pišite nam direktno.
            </p>

            {sent ? (
              <div className="py-12 text-center text-[#C5A059]">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-serif-luxury text-xl text-[#1A1A1A] mb-1">Hvala na poruci!</h4>
                <p className="text-xs text-[#1A1A1A]/80 font-sans">Odgovorićemo vam u najkraćem mogućem roku.</p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] mb-1.5 font-medium font-sans">
                    Vaše ime i prezime:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="npr. Ana Jovanović"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-[#FCFBF7] border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] mb-1.5 font-medium font-sans">
                    Email adresa:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ana.jovanovic@primer.rs"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-[#FCFBF7] border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] mb-1.5 font-medium font-sans">
                    Vaša poruka ili pitanje:
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Zanima me izrada večernje toalete od smaragdno zelene svile za venčanje u septembru..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-[#FCFBF7] border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 bg-[#1A1A1A] hover:bg-black text-[#FCFBF7] hover:text-[#C5A059] font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 font-sans shadow-md"
                >
                  {isSending ? (
                    <span>Šaljemo poruku...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Pošaljite poruku ateljeu</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="pt-10 border-t border-[#C5A059]/20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1A1A1A] mb-2 font-normal">
              Često postavljana pitanja
            </h3>
            <p className="text-xs text-[#1A1A1A]/70 uppercase tracking-widest font-sans">Sve što treba da znate o poručivanju i unikatnom šivenju</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-[#1A1A1A]/15 overflow-hidden transition-colors shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif-luxury text-base sm:text-lg text-[#1A1A1A] hover:text-[#C5A059] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C5A059] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#1A1A1A]/80 leading-relaxed font-light border-t border-[#1A1A1A]/10 font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
