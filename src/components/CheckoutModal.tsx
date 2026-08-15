import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, Building2, Sparkles, ArrowLeft, QrCode } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem, CheckoutFormData } from '../types';
import { FORMAT_RSD } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onOrderCompleted: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  cartItems,
  onClose,
  onOrderCompleted,
}) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    city: 'Topola',
    postalCode: '34310',
    address: '',
    apartment: '',
    note: '',
    shippingMethod: 'post_express',
    paymentMethod: 'pouzece',
    cardNumber: '4111 •••• •••• 4242',
    cardExpiry: '08/28',
    cardCvv: '•••',
    isGiftWrap: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    trackingCode: string;
    totalRSD: number;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.priceRSD * item.quantity, 0);
  const isFreeShipping = subtotal >= 25000 || formData.shippingMethod !== 'post_express';
  const shippingCost = isFreeShipping ? 0 : 450;
  const total = subtotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `JE-SRB-${Math.floor(10000 + Math.random() * 90000)}`;
      const trackingCode = `PE${Math.floor(10000000 + Math.random() * 90000000)}RS`;
      setConfirmedOrder({
        orderId,
        trackingCode,
        totalRSD: total,
      });
      setIsSubmitting(false);
      onOrderCompleted(orderId);
    }, 700);
  };

  const serbianCities = [
    { name: 'Topola', zip: '34310' },
    { name: 'Beograd', zip: '11000' },
    { name: 'Novi Sad', zip: '21000' },
    { name: 'Niš', zip: '18000' },
    { name: 'Kragujevac', zip: '34000' },
    { name: 'Subotica', zip: '24000' },
    { name: 'Pančevo', zip: '26000' },
    { name: 'Čačak', zip: '32000' },
    { name: 'Zrenjanin', zip: '23000' },
    { name: 'Kraljevo', zip: '36000' },
    { name: 'Valjevo', zip: '14000' },
    { name: 'Kruševac', zip: '37000' },
    { name: 'Sombor', zip: '25000' },
  ];

  return (
    <div
      id="checkout-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="relative w-full max-w-4xl bg-[#FCFBF7] border border-[#1A1A1A]/20 shadow-2xl overflow-hidden text-[#1A1A1A] my-auto max-h-[94vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1A1A1A]/10 bg-[#F4F2EC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-[#1A1A1A] tracking-widest text-xs font-semibold uppercase">
              UNIKATNO ŠIVENO — ATELIER PORUDŽBINA
            </span>
            <span className="text-[10px] text-[#1A1A1A]/70 uppercase bg-white px-2 py-0.5 border border-[#1A1A1A]/10">
              Isporuka samo u Republici Srbiji
            </span>
          </div>
          <button
            id="checkout-modal-close-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-[#1A1A1A]/5 text-[#1A1A1A] transition-colors"
            aria-label="Zatvori kasu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          {confirmedOrder ? (
            /* Order Success Receipt */
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[#F4F2EC] border border-[#C5A059] flex items-center justify-center mx-auto mb-4 text-[#8C6D23]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif-luxury text-3xl text-[#1A1A1A] mb-2 font-normal">
                Hvala vam na porudžbini
              </h3>
              <p className="text-xs sm:text-sm text-[#1A1A1A]/80 max-w-md mx-auto mb-6">
                Vaša porudžbina je zabeležena u ateljeu Jelene Erić. Poslali smo detalje na{' '}
                <strong className="text-black">{formData.email || 'vašu email adresu'}</strong>.
              </p>

              {/* Fiscal Receipt Mockup */}
              <div className="bg-[#F4F2EC] border border-[#1A1A1A]/15 p-6 max-w-md mx-auto text-left text-xs mb-8 space-y-3 font-mono">
                <div className="text-center border-b border-[#1A1A1A]/10 pb-3">
                  <div className="font-serif-luxury text-sm text-[#1A1A1A] font-bold">UNIKATNO ŠIVENO D.O.O.</div>
                  <div className="text-[10px] text-[#1A1A1A]/60 font-sans">Topola • PIB: 112938492</div>
                  <div className="text-[11px] text-[#8C6D23] mt-1 font-semibold">Broj porudžbine: {confirmedOrder.orderId}</div>
                </div>

                <div className="space-y-1.5 text-[#1A1A1A]/80 text-[11px] pt-1">
                  <div className="flex justify-between">
                    <span>Primalac:</span>
                    <strong className="text-[#1A1A1A] font-sans">{formData.fullName || 'Jelena Petrović'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Adresa:</span>
                    <span className="text-[#1A1A1A] font-sans">{formData.address || 'Knez Mihailova 10'}, {formData.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Način isporuke:</span>
                    <span className="text-[#1A1A1A] font-sans">
                      {formData.shippingMethod === 'post_express'
                        ? `Post Express (${confirmedOrder.trackingCode})`
                        : 'Lično preuzimanje u salonu'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plaćanje:</span>
                    <span className="text-[#1A1A1A] font-sans">
                      {formData.paymentMethod === 'pouzece'
                        ? 'Pouzećem gotovinom kuriru'
                        : formData.paymentMethod === 'platna_kartica'
                        ? 'Platna kartica DinaCard / Visa'
                        : 'Direktna uplata na račun'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#1A1A1A]/10 pt-3 flex justify-between text-sm font-bold text-[#1A1A1A]">
                  <span>Ukupno (RSD):</span>
                  <span className="text-[#8C6D23]">{FORMAT_RSD(confirmedOrder.totalRSD)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#FCFBF7] font-semibold text-xs uppercase tracking-widest transition-all"
              >
                Povratak u atelje
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Form Details (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Podaci o kupcu */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold mb-3 flex items-center gap-2">
                    <span>1. Podaci o kupcu u Srbiji</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Ime i prezime *"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="tel"
                        required
                        placeholder="Broj telefona (npr. +381 64 123 4567) *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email adresa *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Adresa za dostavu */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold mb-3">
                    2. Adresa u Srbiji
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <select
                          value={formData.city}
                          onChange={(e) => {
                            const cityObj = serbianCities.find((c) => c.name === e.target.value);
                            setFormData({
                              ...formData,
                              city: e.target.value,
                              postalCode: cityObj ? cityObj.zip : formData.postalCode,
                            });
                          }}
                          className="w-full p-2.5 bg-white border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] outline-none cursor-pointer"
                        >
                          {serbianCities.map((city) => (
                            <option key={city.name} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Poštanski broj"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className="w-full p-2.5 bg-white border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <input
                          type="text"
                          required
                          placeholder="Ulica i broj *"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full p-2.5 bg-white border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Stan/Sprat"
                          value={formData.apartment}
                          onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                          className="w-full p-2.5 bg-white border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Način isporuke u Srbiji */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold mb-3">
                    3. Način dostave (Srbija)
                  </h3>
                  <div className="space-y-2">
                    <label
                      className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                        formData.shippingMethod === 'post_express'
                          ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#1A1A1A]'
                          : 'border-[#1A1A1A]/15 bg-white text-[#1A1A1A] hover:bg-[#F4F2EC]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="post_express"
                          checked={formData.shippingMethod === 'post_express'}
                          onChange={() => setFormData({ ...formData, shippingMethod: 'post_express' })}
                          className="accent-[#C5A059]"
                        />
                        <div>
                          <div className="text-xs font-semibold">Post Express kurirska služba</div>
                          <div className="text-[11px] text-[#1A1A1A]/70">Dostava na adresu danas za sutra širom Srbije</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#8C6D23] font-semibold">
                        {isFreeShipping ? 'Besplatno' : '450 RSD'}
                      </span>
                    </label>

                    <label
                      className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                        formData.shippingMethod === 'atelier_topola'
                          ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#1A1A1A]'
                          : 'border-[#1A1A1A]/15 bg-white text-[#1A1A1A] hover:bg-[#F4F2EC]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="atelier_topola"
                          checked={formData.shippingMethod === 'atelier_topola'}
                          onChange={() => setFormData({ ...formData, shippingMethod: 'atelier_topola' })}
                          className="accent-[#C5A059]"
                        />
                        <div>
                          <div className="text-xs font-semibold">Lično preuzimanje u Ateljeu Topola</div>
                          <div className="text-[11px] text-[#1A1A1A]/70">Topola (uz probu na licu mesta)</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#8C6D23] font-semibold">Besplatno</span>
                    </label>
                  </div>
                </div>

                {/* 4. Način plaćanja (RSD) */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold mb-3">
                    4. Način plaćanja (u RSD)
                  </h3>
                  <div className="space-y-2">
                    <label
                      className={`p-3 border flex items-start gap-3 cursor-pointer transition-all ${
                        formData.paymentMethod === 'pouzece'
                          ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#1A1A1A]'
                          : 'border-[#1A1A1A]/15 bg-white text-[#1A1A1A] hover:bg-[#F4F2EC]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pouzece"
                        checked={formData.paymentMethod === 'pouzece'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'pouzece' })}
                        className="accent-[#C5A059] mt-0.5"
                      />
                      <div>
                        <div className="text-xs font-semibold flex items-center gap-1.5">
                          <Banknote className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>Plaćanje pouzećem (gotovinom kuriru)</span>
                        </div>
                        <div className="text-[11px] text-[#1A1A1A]/70 mt-0.5">
                          Plaćate u dinarima (RSD) kuriru Post Express-a prilikom preuzimanja pošiljke.
                        </div>
                      </div>
                    </label>

                    <label
                      className={`p-3 border flex items-start gap-3 cursor-pointer transition-all ${
                        formData.paymentMethod === 'platna_kartica'
                          ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#1A1A1A]'
                          : 'border-[#1A1A1A]/15 bg-white text-[#1A1A1A] hover:bg-[#F4F2EC]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="platna_kartica"
                        checked={formData.paymentMethod === 'platna_kartica'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'platna_kartica' })}
                        className="accent-[#C5A059] mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="text-xs font-semibold flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>Platna kartica (DinaCard / Visa / Mastercard u RSD)</span>
                        </div>
                        
                        {formData.paymentMethod === 'platna_kartica' && (
                          <div className="mt-3 p-3 bg-[#F4F2EC] border border-[#1A1A1A]/10 space-y-2">
                            <input
                              type="text"
                              placeholder="Broj kartice"
                              value={formData.cardNumber}
                              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                              className="w-full p-2 bg-white border border-[#1A1A1A]/20 text-xs font-mono text-[#1A1A1A]"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="MM/GG"
                                value={formData.cardExpiry}
                                onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                                className="w-full p-2 bg-white border border-[#1A1A1A]/20 text-xs font-mono text-[#1A1A1A]"
                              />
                              <input
                                type="text"
                                placeholder="CVV"
                                value={formData.cardCvv}
                                onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                                className="w-full p-2 bg-white border border-[#1A1A1A]/20 text-xs font-mono text-[#1A1A1A]"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </label>

                    <label
                      className={`p-3 border flex items-start gap-3 cursor-pointer transition-all ${
                        formData.paymentMethod === 'ips_racun'
                          ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#1A1A1A]'
                          : 'border-[#1A1A1A]/15 bg-white text-[#1A1A1A] hover:bg-[#F4F2EC]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="ips_racun"
                        checked={formData.paymentMethod === 'ips_racun'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'ips_racun' })}
                        className="accent-[#C5A059] mt-0.5"
                      />
                      <div>
                        <div className="text-xs font-semibold flex items-center gap-1.5">
                          <QrCode className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>Instant plaćanje NBS IPS QR kodom / Račun ateljea</span>
                        </div>
                        <div className="text-[11px] text-[#1A1A1A]/70 mt-0.5">
                          Račun: 265-1100310001234-56 (Raiffeisen Banka) • Skenirajte mobilnom bankom
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary & Confirm (5 cols) */}
              <div className="lg:col-span-5 bg-[#F4F2EC] border border-[#1A1A1A]/15 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl text-[#1A1A1A] mb-4 pb-2 border-b border-[#1A1A1A]/10">
                    Pregled porudžbine
                  </h3>

                  <div className="space-y-3 max-h-52 overflow-y-auto pr-1 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-[#1A1A1A]/10">
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="font-medium text-[#1A1A1A] truncate">{item.product.nameSr}</div>
                          <div className="text-[10px] text-[#1A1A1A]/60">Vel: {item.size} × {item.quantity} kom</div>
                        </div>
                        <span className="font-mono text-[#1A1A1A] font-semibold">
                          {FORMAT_RSD(item.product.priceRSD * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-xs text-[#1A1A1A]/80 border-t border-[#1A1A1A]/10 pt-3">
                    <div className="flex justify-between">
                      <span>Međuzbir:</span>
                      <span className="font-mono text-[#1A1A1A]">{FORMAT_RSD(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dostava (Srbija):</span>
                      <span className="font-mono text-[#1A1A1A]">
                        {shippingCost === 0 ? 'Besplatno' : FORMAT_RSD(shippingCost)}
                      </span>
                    </div>
                    {formData.isGiftWrap && (
                      <div className="flex justify-between text-[11px] text-[#8C6D23]">
                        <span>Satensko pakovanje:</span>
                        <span>Uključeno (0 RSD)</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-[#1A1A1A] pt-3 border-t border-[#1A1A1A]/10">
                      <span className="font-serif-luxury">Ukupan iznos:</span>
                      <span className="font-mono text-[#8C6D23] font-bold">{FORMAT_RSD(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#1A1A1A] hover:bg-[#333333] text-[#FCFBF7] font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Obrađujemo porudžbinu...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                        <span>Potvrdite porudžbinu ({FORMAT_RSD(total)})</span>
                      </>
                    )}
                  </button>

                  <div className="text-[10px] text-center text-[#1A1A1A]/60 space-y-1">
                    <p>Zaštita potrošača garantovana u skladu sa zakonima Republike Srbije.</p>
                    <p>Mogućnost zamene veličine i besplatne prepravke u salonu.</p>
                  </div>
                </div>
              </div>

            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
