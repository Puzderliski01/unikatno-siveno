import React, { useState } from 'react';
import { X, Calendar, MapPin, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface FittingBookingModalProps {
  isOpen: boolean;
  preselectedProduct: Product | null;
  onClose: () => void;
  onSubmitSuccess: (details: { fullName: string; date: string; time: string; location: string }) => void;
}

export const FittingBookingModal: React.FC<FittingBookingModalProps> = ({
  isOpen,
  preselectedProduct,
  onClose,
  onSubmitSuccess,
}) => {
  const [serviceType, setServiceType] = useState<string>(
    preselectedProduct ? 'proba_modela' : 'sivenje_po_meri'
  );
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-20');
  const [selectedTime, setSelectedTime] = useState<string>('16:00');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const timeSlots = [
    '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSubmitSuccess({
        fullName: fullName || 'Poštovana klijentkinjo',
        date: selectedDate,
        time: selectedTime,
        location: 'Atelje Topola'
      });
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="fitting-booking-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm"
      onClick={handleResetAndClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="relative w-full max-w-2xl bg-[#FCFBF7] border border-[#1A1A1A]/20 shadow-2xl overflow-hidden text-[#1A1A1A] my-auto max-h-[94vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Banner */}
        <div className="px-6 py-4 border-b border-[#1A1A1A]/10 bg-[#F4F2EC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C5A059]" />
            <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#1A1A1A] font-semibold">
              Privatna proba & Konsultacija
            </span>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1.5 hover:bg-[#1A1A1A]/5 text-[#1A1A1A] transition-colors"
            aria-label="Zatvori"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[#F4F2EC] border border-[#C5A059] flex items-center justify-center mx-auto mb-4 text-[#8C6D23]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1A1A1A] font-normal mb-2">
                Vaš termin je uspešno rezervisan
              </h3>
              <p className="text-xs sm:text-sm text-[#1A1A1A]/80 max-w-md mx-auto mb-6 leading-relaxed">
                Hvala vam, <strong className="text-black">{fullName || 'poštovana klijentkinjo'}</strong>. Jelena Erić i tim ateljea su rezervisali salon isključivo za vas.
              </p>

              {/* Luxury Pass Voucher */}
              <div className="bg-[#F4F2EC] border border-[#1A1A1A]/15 p-5 max-w-md mx-auto text-left text-xs mb-8">
                <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3 mb-3">
                  <span className="font-serif-luxury text-[#1A1A1A] tracking-widest text-[11px] font-bold">VOUCHER #JE-{Math.floor(1000 + Math.random() * 9000)}</span>
                  <span className="text-[10px] text-[#8C6D23] uppercase tracking-wider font-mono font-semibold">Potvrđeno</span>
                </div>
                <div className="space-y-2 text-[#1A1A1A]/80">
                  <div className="flex justify-between">
                    <span className="text-[#1A1A1A]/60">Lokacija:</span>
                    <strong className="text-[#1A1A1A]">Topola</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1A1A1A]/60">Datum i vreme:</span>
                    <strong className="text-[#1A1A1A]">{selectedDate} u {selectedTime}h</strong>
                  </div>
                  {preselectedProduct && (
                    <div className="flex justify-between">
                      <span className="text-[#1A1A1A]/60">Model za probu:</span>
                      <strong className="text-[#8C6D23]">{preselectedProduct.nameSr}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/38163616071"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-[#25D366]/10 border border-[#25D366] text-[#128C7E] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Potvrdite putem WhatsApp-a</span>
                </a>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#333333] text-[#FCFBF7] font-semibold uppercase tracking-wider text-xs transition-colors"
                >
                  Završi pregled
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Context banner if opened for a specific garment */}
              {preselectedProduct && (
                <div className="p-3.5 bg-[#F4F2EC] border border-[#C5A059]/40 flex items-center gap-3">
                  <img
                    src={preselectedProduct.images[0]}
                    alt={preselectedProduct.nameSr}
                    className="w-12 h-14 object-cover border border-[#1A1A1A]/10"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C6D23] font-semibold">Model za probu:</span>
                    <h4 className="font-serif-luxury text-sm text-[#1A1A1A] truncate">{preselectedProduct.nameSr}</h4>
                    <span className="text-[11px] text-[#1A1A1A]/70 font-mono">{preselectedProduct.priceRSD.toLocaleString('sr-RS')} RSD</span>
                  </div>
                </div>
              )}

              {/* 1. Salon Location */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold mb-2">
                  1. Atelje:
                </label>
                <div className="p-3.5 border border-[#C5A059] bg-[#C5A059]/10 text-[#1A1A1A] ring-1 ring-[#C5A059] flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-xs text-[#1A1A1A]">Atelje Topola</div>
                    <div className="text-[10px] text-[#8C6D23] mt-1 font-medium">Prisutna Jelena Erić</div>
                  </div>
                </div>
              </div>

              {/* 2. Service Type */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold mb-2">
                  2. Svrha posete / Tip usluge:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'proba_modela', label: 'Proba modela' },
                    { id: 'sivenje_po_meri', label: 'Izrada po meri' },
                    { id: 'vencanja_svečanosti', label: 'Venčanice & Toalete' },
                    { id: 'korektura', label: 'Korekcija / Savet' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceType(s.id)}
                      className={`p-2.5 border text-center transition-all ${
                        serviceType === s.id
                          ? 'bg-[#1A1A1A] text-[#FCFBF7] font-semibold border-[#1A1A1A]'
                          : 'bg-white border-[#1A1A1A]/15 text-[#1A1A1A] hover:bg-[#F4F2EC]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold mb-2">
                    3. Željeni datum:
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      min="2026-08-16"
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                      className="w-full p-2.5 bg-white border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold mb-2">
                    4. Slobodan termin:
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {timeSlots.slice(0, 4).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`py-2 text-[11px] font-mono border transition-all ${
                          selectedTime === t
                            ? 'bg-[#1A1A1A] text-[#FCFBF7] font-bold border-[#1A1A1A]'
                            : 'bg-white border-[#1A1A1A]/15 text-[#1A1A1A] hover:bg-[#F4F2EC]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Client Contact Details */}
              <div className="space-y-3 pt-2 border-t border-[#1A1A1A]/10">
                <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold">
                  5. Vaši kontakt podaci:
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Ime i prezime *"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Broj telefona (npr. +381 64 123 4567) *"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email adresa za potvrdu termina *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Posebne želje, povod (npr. matura, venčanje), ili unikatna zamisao kroja..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#1A1A1A] hover:bg-[#333333] text-[#FCFBF7] font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Rezervišemo termin...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>Zakažite privatnu probu sa Jelenom Erić</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-[#1A1A1A]/60 text-center">
                * Konsultacija i proba su besplatne i neobavezujuće. Salon se rezerviše na 60 minuta isključivo za vas.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
