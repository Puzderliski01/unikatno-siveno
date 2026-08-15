import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ShoppingBag, Calendar, Sparkles, Check, Ruler, Info, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { FORMAT_RSD } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  isWishlisted: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, customMeasurements?: any) => void;
  onBookFitting: (product: Product) => void;
  onOpenZoom: (product: Product, index: number) => void;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  isWishlisted,
  onClose,
  onAddToCart,
  onBookFitting,
  onOpenZoom,
  onToggleWishlist,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('S (36)');
  const [activeTab, setActiveTab] = useState<'opis' | 'materijali' | 'velicine' | 'isporuka'>('opis');
  const [addedAnimation, setAddedAnimation] = useState(false);
  
  // Custom bespoke measurement state
  const [isCustomTailored, setIsCustomTailored] = useState(false);
  const [customHeight, setCustomHeight] = useState('');
  const [customBust, setCustomBust] = useState('');
  const [customWaist, setCustomWaist] = useState('');
  const [customHips, setCustomHips] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  if (!isOpen || !product) return null;

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAdd = () => {
    const measurements = isCustomTailored
      ? { height: customHeight, bust: customBust, waist: customWaist, hips: customHips, notes: customNotes }
      : undefined;

    setAddedAnimation(true);
    onAddToCart(product, isCustomTailored ? 'Izrada po ličnim merama' : selectedSize, measurements);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div
      id="product-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl bg-[#FCFBF7] border border-[#1A1A1A]/20 shadow-2xl overflow-hidden text-[#1A1A1A] my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A]/10 bg-[#F4F2EC]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold">
              {product.categoryLabelSr}
            </span>
            {product.badge && (
              <span className="px-2 py-0.5 text-[10px] uppercase font-sans tracking-widest bg-[#C5A059]/15 text-[#8C6D23] border border-[#C5A059]/30">
                {product.badge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onToggleWishlist(product)}
              className={`p-2 border border-[#1A1A1A]/15 transition-colors ${
                isWishlisted ? 'bg-[#C5A059] text-black border-[#C5A059]' : 'hover:bg-[#1A1A1A]/5 text-[#1A1A1A]'
              }`}
              aria-label="Lista želja"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              id="product-modal-close-btn"
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-[#1A1A1A]/5 text-[#1A1A1A] transition-colors"
              aria-label="Zatvori modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body: 2 Columns */}
        <div className="overflow-y-auto flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image Carousel & Gallery (5 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECE8DF] border border-[#1A1A1A]/10 group">
              <img
                src={product.images[activeImageIndex]}
                alt={`${product.nameSr} - pogled ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-center cursor-zoom-in"
                onClick={() => onOpenZoom(product, activeImageIndex)}
              />

              {/* Carousel controls */}
              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 hover:bg-[#C5A059] text-black transition-colors shadow-md"
                    aria-label="Prethodna slika"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 hover:bg-[#C5A059] text-black transition-colors shadow-md"
                    aria-label="Sledeća slika"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Zoom pill CTA */}
              <button
                type="button"
                onClick={() => onOpenZoom(product, activeImageIndex)}
                className="absolute bottom-3 right-3 px-3 py-1.5 bg-[#1A1A1A]/85 hover:bg-[#C5A059] text-white hover:text-black backdrop-blur-md border border-white/10 text-xs flex items-center gap-1.5 transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Uvećaj</span>
              </button>

              <div className="absolute bottom-3 left-3 text-[10px] font-mono bg-white/90 text-black px-2 py-1 border border-black/10">
                {activeImageIndex + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 overflow-hidden flex-shrink-0 border transition-all ${
                      idx === activeImageIndex
                        ? 'border-[#C5A059] ring-2 ring-[#C5A059]/40 opacity-100'
                        : 'border-[#1A1A1A]/15 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Sličica ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Model sizing note */}
            <p className="text-[11px] text-[#1A1A1A]/70 italic flex items-center gap-1.5 font-sans">
              <Info className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
              <span>{product.modelInfo}</span>
            </p>
          </div>

          {/* Right Column: Garment Specs, Sizing, Tabs & Purchase Actions (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Product Title & Subtitle */}
              <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] font-normal leading-tight mb-2">
                {product.nameSr}
              </h2>
              <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-light mb-5 leading-relaxed font-sans">
                {product.subtitleSr}
              </p>

              {/* Price & Lead Time */}
              <div className="p-4 bg-[#F4F2EC] border border-[#1A1A1A]/10 mb-6 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60 font-sans">Cena kreacije</div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-semibold text-[#1A1A1A] font-mono tracking-tight">
                      {FORMAT_RSD(product.priceRSD)}
                    </span>
                    {product.originalPriceRSD && (
                      <span className="text-sm text-[#1A1A1A]/40 line-through font-mono">
                        {FORMAT_RSD(product.originalPriceRSD)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-[#8C6D23] font-sans font-semibold">Rok izrade</div>
                  <div className="text-xs text-[#1A1A1A] font-medium">{product.leadTimeDays.split('/')[0]}</div>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider text-[#1A1A1A] font-medium font-sans">
                    Izbor veličine / Prilagođavanje:
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveTab('velicine')}
                    className="text-xs text-[#8C6D23] hover:underline flex items-center gap-1 font-sans"
                  >
                    <Ruler className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Tabela veličina</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                  {product.sizes.map((size) => {
                    const isCustom = size.includes('merama') || size.includes('meri');
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setSelectedSize(size);
                          setIsCustomTailored(isCustom);
                        }}
                        className={`p-2.5 text-xs border text-center transition-all font-sans ${
                          selectedSize === size
                            ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold shadow-sm'
                            : 'bg-white hover:bg-[#F4F2EC] border-[#1A1A1A]/15 text-[#1A1A1A]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {/* Custom measurements input fields if "Izrada po ličnim merama" is selected */}
                {isCustomTailored && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-4 bg-[#F4F2EC] border border-[#C5A059]/40 text-xs font-sans"
                  >
                    <div className="flex items-center gap-1.5 text-[#8C6D23] font-semibold uppercase tracking-wider mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Unesite vaše mere (cm) za savršenu izradu:</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      <div>
                        <label className="block text-[10px] text-[#1A1A1A]/70 mb-1">Visina (cm)</label>
                        <input
                          type="text"
                          value={customHeight}
                          onChange={(e) => setCustomHeight(e.target.value)}
                          placeholder="npr. 175"
                          className="w-full p-2 bg-white border border-[#1A1A1A]/20 text-xs text-[#1A1A1A] outline-none focus:border-[#C5A059]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#1A1A1A]/70 mb-1">Grudi (cm)</label>
                        <input
                          type="text"
                          value={customBust}
                          onChange={(e) => setCustomBust(e.target.value)}
                          placeholder="npr. 88"
                          className="w-full p-2 bg-white border border-[#1A1A1A]/20 text-xs text-[#1A1A1A] outline-none focus:border-[#C5A059]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#1A1A1A]/70 mb-1">Struk (cm)</label>
                        <input
                          type="text"
                          value={customWaist}
                          onChange={(e) => setCustomWaist(e.target.value)}
                          placeholder="npr. 68"
                          className="w-full p-2 bg-white border border-[#1A1A1A]/20 text-xs text-[#1A1A1A] outline-none focus:border-[#C5A059]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#1A1A1A]/70 mb-1">Kukovi (cm)</label>
                        <input
                          type="text"
                          value={customHips}
                          onChange={(e) => setCustomHips(e.target.value)}
                          placeholder="npr. 94"
                          className="w-full p-2 bg-white border border-[#1A1A1A]/20 text-xs text-[#1A1A1A] outline-none focus:border-[#C5A059]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#1A1A1A]/70 mb-1">Posebna napomena (dužina šlepa, rukava):</label>
                      <input
                        type="text"
                        value={customNotes}
                        onChange={(e) => setCustomNotes(e.target.value)}
                        placeholder="Želim 5 cm duži porub za visoke potpetice..."
                        className="w-full p-2 bg-white border border-[#1A1A1A]/20 text-xs text-[#1A1A1A] outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  id="modal-add-to-cart-btn"
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 py-4 px-6 font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                    addedAnimation
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FCFBF7] shadow-md'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Dodato u vašu korpu!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                      <span>Dodaj u korpu ({FORMAT_RSD(product.priceRSD)})</span>
                    </>
                  )}
                </button>

                <button
                  id="modal-book-fitting-btn"
                  type="button"
                  onClick={() => {
                    onClose();
                    onBookFitting(product);
                  }}
                  className="py-4 px-6 border border-[#C5A059] bg-[#C5A059]/10 hover:bg-[#C5A059] text-[#1A1A1A] hover:text-black font-semibold text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#C5A059]" />
                  <span>Zakažite probu u salonu</span>
                </button>
              </div>

              {/* Information Tabs */}
              <div className="border-t border-[#1A1A1A]/10 pt-6">
                <div className="flex items-center gap-4 border-b border-[#1A1A1A]/10 pb-2 mb-4 overflow-x-auto font-sans">
                  <button
                    type="button"
                    onClick={() => setActiveTab('opis')}
                    className={`text-xs uppercase tracking-wider pb-2 relative transition-colors ${
                      activeTab === 'opis'
                        ? 'text-[#1A1A1A] font-bold after:content-[\'\'] after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#C5A059]'
                        : 'text-[#1A1A1A]/60 hover:text-black'
                    }`}
                  >
                    Opis & Detalji
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('materijali')}
                    className={`text-xs uppercase tracking-wider pb-2 relative transition-colors ${
                      activeTab === 'materijali'
                        ? 'text-[#1A1A1A] font-bold after:content-[\'\'] after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#C5A059]'
                        : 'text-[#1A1A1A]/60 hover:text-black'
                    }`}
                  >
                    Materijali i održavanje
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('velicine')}
                    className={`text-xs uppercase tracking-wider pb-2 relative transition-colors ${
                      activeTab === 'velicine'
                        ? 'text-[#1A1A1A] font-bold after:content-[\'\'] after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#C5A059]'
                        : 'text-[#1A1A1A]/60 hover:text-black'
                    }`}
                  >
                    Tabela veličina
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('isporuka')}
                    className={`text-xs uppercase tracking-wider pb-2 relative transition-colors ${
                      activeTab === 'isporuka'
                        ? 'text-[#1A1A1A] font-bold after:content-[\'\'] after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#C5A059]'
                        : 'text-[#1A1A1A]/60 hover:text-black'
                    }`}
                  >
                    Isporuka i probe
                  </button>
                </div>

                {/* Tab Content */}
                <div className="text-xs text-[#1A1A1A]/85 leading-relaxed font-sans">
                  {activeTab === 'opis' && (
                    <div className="space-y-4">
                      <p className="font-light">{product.descriptionSr}</p>
                      <p className="italic text-[#1A1A1A]/80 bg-[#F4F2EC] p-3 border border-[#1A1A1A]/10 font-serif">
                        "{product.storySr}"
                      </p>
                      <div>
                        <h4 className="text-[#1A1A1A] font-semibold uppercase tracking-wider text-[11px] mb-2">
                          Karakteristike modela:
                        </h4>
                        <ul className="space-y-1.5 list-disc list-inside text-[#1A1A1A]/80">
                          {product.features.map((feat, i) => (
                            <li key={i}>{feat}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'materijali' && (
                    <div className="space-y-4">
                      <div className="bg-[#F4F2EC] p-3 border border-[#1A1A1A]/10">
                        <span className="text-[#8C6D23] font-semibold uppercase tracking-wider block mb-1">
                          Sastav:
                        </span>
                        <p>{product.materialsAndCare.composition}</p>
                      </div>
                      <div className="bg-[#F4F2EC] p-3 border border-[#1A1A1A]/10">
                        <span className="text-[#8C6D23] font-semibold uppercase tracking-wider block mb-1">
                          Poreklo materijala i proizvodnja:
                        </span>
                        <p>{product.materialsAndCare.origin}</p>
                      </div>
                      <div>
                        <span className="text-[#1A1A1A] font-semibold uppercase tracking-wider block mb-1.5">
                          Uputstvo za održavanje:
                        </span>
                        <ul className="space-y-1 list-disc list-inside text-[#1A1A1A]/80">
                          {product.materialsAndCare.care.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'velicine' && (
                    <div className="space-y-4">
                      <p className="text-[11px] text-[#1A1A1A]/70">
                        Mere u tabeli predstavljaju preporučene telesne mere u centimetrima (cm). Za modele koji se šiju po meri, uzimanje mera se obavlja u našem salonu ili unosom ličnih parametara.
                      </p>
                      
                      <div className="overflow-x-auto border border-[#1A1A1A]/15">
                        <table className="w-full text-left border-collapse text-[11px]">
                          <thead>
                            <tr className="bg-[#F4F2EC] text-[#8C6D23] uppercase tracking-wider">
                              <th className="p-2 border-b border-[#1A1A1A]/15">Veličina (EU)</th>
                              <th className="p-2 border-b border-[#1A1A1A]/15">Grudi (cm)</th>
                              <th className="p-2 border-b border-[#1A1A1A]/15">Struk (cm)</th>
                              <th className="p-2 border-b border-[#1A1A1A]/15">Bokovi (cm)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#1A1A1A]/10 font-mono text-[#1A1A1A]">
                            <tr className="hover:bg-[#F4F2EC]">
                              <td className="p-2 font-bold">XS (34)</td>
                              <td className="p-2">82 – 85</td>
                              <td className="p-2">62 – 65</td>
                              <td className="p-2">88 – 91</td>
                            </tr>
                            <tr className="hover:bg-[#F4F2EC]">
                              <td className="p-2 font-bold">S (36)</td>
                              <td className="p-2">86 – 89</td>
                              <td className="p-2">66 – 69</td>
                              <td className="p-2">92 – 95</td>
                            </tr>
                            <tr className="hover:bg-[#F4F2EC]">
                              <td className="p-2 font-bold">M (38)</td>
                              <td className="p-2">90 – 93</td>
                              <td className="p-2">70 – 73</td>
                              <td className="p-2">96 – 99</td>
                            </tr>
                            <tr className="hover:bg-[#F4F2EC]">
                              <td className="p-2 font-bold">L (40)</td>
                              <td className="p-2">94 – 98</td>
                              <td className="p-2">74 – 78</td>
                              <td className="p-2">100 – 104</td>
                            </tr>
                            <tr className="hover:bg-[#F4F2EC]">
                              <td className="p-2 font-bold">XL (42)</td>
                              <td className="p-2">99 – 104</td>
                              <td className="p-2">79 – 84</td>
                              <td className="p-2">105 – 110</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === 'isporuka' && (
                    <div className="space-y-3">
                      <div className="flex items-start gap-2.5">
                        <Truck className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#1A1A1A] block">Post Express dostava u Srbiji:</strong>
                          <span>Isporuka u roku od 24h nakon završetka izrade na vašu kućnu adresu. Besplatna dostava za porudžbine iznad 25.000 RSD.</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#1A1A1A] block">Lično preuzimanje i finalna proba:</strong>
                          <span>U našem ateljeu u Topoli uz besplatne korekcije na licu mesta i čašu šampanjca.</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#1A1A1A] block">Garancija pristajanja:</strong>
                          <span>Ukoliko je potrebna sitna korekcija, naš atelje vrši sve naknadne prepravke potpuno besplatno.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
