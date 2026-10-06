import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ShoppingBag, Sparkles, Check, Ruler, Info, ShieldCheck, MessageCircle, Heart, Scissors, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, Review } from '../types';
import { FORMAT_RSD } from '../data/products';
import { OptimizedImage } from './OptimizedImage';
import { usePredictivePreload } from '../hooks/usePredictivePreload';
import { FabricInspection } from './FabricInspection';
import { useSwipe } from '../hooks/useSwipe';
import { Img } from './Img';
import { Stars } from './Stars';
import { ProductReviews } from './ProductReviews';
import { computeStats, formatAvg, mergeLocalPending, recenzijeLabel, ReviewStats } from '../lib/reviews';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  isWishlisted: boolean;
  /** sve odobrene recenzije (modela filtrira sam modal) */
  reviews: Review[];
  onClose: () => void;
  onAddToCart: (product: Product, size: string, customMeasurements?: any) => void;
  onOpenZoom: (product: Product, index: number) => void;
  onToggleWishlist: (product: Product) => void;
  onAddToOutfit?: (product: Product) => void;
  isInOutfit?: boolean;
  onReviewSubmitted?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  isWishlisted,
  reviews,
  onClose,
  onAddToCart,
  onOpenZoom,
  onToggleWishlist,
  onAddToOutfit,
  isInOutfit,
  onReviewSubmitted,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('S (36)');
  const [activeTab, setActiveTab] = useState<'opis' | 'materijali' | 'velicine' | 'isporuka' | 'recenzije'>('opis');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Profesionalna lupa — prati kursor preko slike (samo na uređajima sa mišem).
  // Transform se piše direktno u DOM, bez re-rendera pri svakom potezu miša.
  const zoomLayerRef = useRef<HTMLDivElement>(null);
  const zoomBadgeRef = useRef<HTMLDivElement>(null);
  const canHover = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    []
  );

  const LENS_SCALE = 2.4;

  const resetLens = useCallback(() => {
    if (zoomLayerRef.current) zoomLayerRef.current.style.transform = '';
    if (zoomBadgeRef.current) zoomBadgeRef.current.style.opacity = '0';
  }, []);

  const handleLensMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canHover || !zoomLayerRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const fx = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      const fy = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
      // Tačka pod kursorom ostaje na istom mestu, ostatak slike "ulazi" u kadar
      const shiftX = (1 - LENS_SCALE) * (fx - 0.5) * 100;
      const shiftY = (1 - LENS_SCALE) * (fy - 0.5) * 100;
      zoomLayerRef.current.style.transform = `translate(${shiftX}%, ${shiftY}%) scale(${LENS_SCALE})`;
      if (zoomBadgeRef.current) zoomBadgeRef.current.style.opacity = '1';
    },
    [canHover]
  );

  const handleLensLeave = useCallback(() => {
    resetLens();
  }, [resetLens]);

  const { handleProductView } = usePredictivePreload(product ? [product] : [], {
    preloadOnHover: false,
    preloadOnScroll: false,
    preloadNextInCategory: true,
    preloadPopularItems: true
  });
  
  // Custom bespoke measurement state
  const [isCustomTailored, setIsCustomTailored] = useState(false);
  const [customHeight, setCustomHeight] = useState('');
  const [customBust, setCustomBust] = useState('');
  const [customWaist, setCustomWaist] = useState('');
  const [customHips, setCustomHips] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [isFabricOpen, setIsFabricOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Call predictive preload when product changes or modal opens
  useEffect(() => {
    if (product) {
      handleProductView(product.id);
    }
  }, [product, handleProductView]);

  // Swipe gesture — must be BEFORE early return (Rules of Hooks)
  const handleNextImage = useCallback(() => {
    if (product) setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  }, [product]);

  const handlePrevImage = useCallback(() => {
    if (product) setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  }, [product]);

  const swipeHandlers = useSwipe({
    onSwipeLeft: handleNextImage,
    onSwipeRight: handlePrevImage,
    threshold: 40,
  });

  // Lupu ugasimo kad se promeni slika ili zatvori modal
  useEffect(() => {
    resetLens();
  }, [activeImageIndex, isOpen, resetLens]);

  // Recenzije i statistika za trenutni model
  const approvedForProduct = useMemo(
    () => (product ? reviews.filter((r) => r.product_id === product.id) : []),
    [reviews, product]
  );
  const reviewStats = useMemo(() => computeStats(approvedForProduct), [approvedForProduct]);
  const visibleReviews = useMemo(
    () => mergeLocalPending(approvedForProduct, product?.id ?? null),
    [approvedForProduct, product]
  );

  if (!isOpen || !product) return null;

  const stockCount = product.stockQuantity ?? (product.badge === 'UNIKAT' ? 1 : product.badge === '1 of 1' ? 1 : null);

  // Generate fabric details from product composition
  const fabricDetails = {
    weaveType: product.materialsAndCare.composition.includes('Lan') ? 'Tkanje ravnomernog kanvasa'
      : product.materialsAndCare.composition.includes('Svil') ? 'Mekani žersej sa sjajem'
      : product.materialsAndCare.composition.includes('Pamuk') ? 'Fin pamučni keper'
      : product.materialsAndCare.composition.includes('Vun') ? 'Vuneni flanel'
      : 'Standardno tkanje',
    threadCount: product.materialsAndCare.composition.includes('Lan') ? '280 niti/cm²'
      : product.materialsAndCare.composition.includes('Svil') ? '320 niti/cm²'
      : '240 niti/cm²',
    materialFeel: product.materialsAndCare.composition.includes('Svil') ? 'Sjajna i hladna na dodir'
      : product.materialsAndCare.composition.includes('Lan') ? 'Teksturisana i prozračna'
      : product.materialsAndCare.composition.includes('Pamuk') ? 'Meka i udobna'
      : 'Prijatna na koži',
    lightReflection: product.materialsAndCare.composition.includes('Svil') ? 'Visok sjaj, svetlosna igra'
      : product.materialsAndCare.composition.includes('Lan') ? 'Mat završnica sa blagim odsjajem'
      : 'Blagi prirodni sjaj',
    durability: 'Izdržljiva za svakodnevno nošenje',
    careNotes: product.materialsAndCare.care,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full max-h-[100dvh] sm:h-auto sm:max-h-[90vh] max-w-5xl bg-[#0a0a0a] border border-[#e8e0d4]/20 shadow-2xl text-[#e8e0d4] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls — breadcrumb samo na desktopu */}
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-4 border-b border-[#e8e0d4]/10 bg-[#111111] flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            {/* Luxury Breadcrumb (desktop) */}
            <nav className="luxury-breadcrumb hidden sm:flex">
              <button onClick={onClose} className="hover:text-[#c9a96e] transition-colors">Početna</button>
              <span className="luxury-breadcrumb-separator">&#9672;</span>
              <button onClick={onClose} className="hover:text-[#c9a96e] transition-colors">Kolekcija</button>
              <span className="luxury-breadcrumb-separator">&#9672;</span>
              <span className="luxury-breadcrumb-current">{product.nameSr}</span>
            </nav>
            {/* Mobilni: kratak naslov modela */}
            <span className="sm:hidden text-[11px] uppercase tracking-[0.18em] text-[#c9a96e] font-sans truncate">
              {product.nameSr}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Outfit Button */}
            {onAddToOutfit && (
              <button
                type="button"
                onClick={() => onAddToOutfit(product)}
                className={`px-3 py-2 min-h-[44px] min-w-[44px] justify-center border transition-all text-xs font-sans uppercase tracking-wider flex items-center gap-1.5 ${
                  isInOutfit
                    ? 'bg-[#c9a96e]/20 border-[#c9a96e]/60 text-[#c9a96e]'
                    : 'border-[#e8e0d4]/15 text-[#e8e0d4] hover:bg-[#e8e0d4]/5'
                }`}
                aria-label={isInOutfit ? 'Ukloni iz outfita' : 'Dodaj u outfit'}
                title={isInOutfit ? 'Ukloni iz outfita' : 'Dodaj u outfit'}
              >
                <Scissors className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isInOutfit ? 'U outfitu' : 'Outfit'}</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => onToggleWishlist(product)}
              className={`p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#e8e0d4]/15 transition-colors ${
                isWishlisted ? 'bg-[#c9a96e] text-black border-[#c9a96e]' : 'hover:bg-[#e8e0d4]/5 text-[#e8e0d4]'
              }`}
              aria-label="Lista želja"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              id="product-modal-close-btn"
              type="button"
              onClick={onClose}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-[#e8e0d4]/5 text-[#e8e0d4] transition-colors"
              aria-label="Zatvori modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Image + Details — JEDAN skrol kontejner (bez ugnježdenog skrolovania) */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 p-0 lg:p-6 gap-0 lg:gap-8 overflow-y-auto overscroll-contain">
          
          {/* Left Column: Image (pun preliv na telefonu) */}
          <div className="lg:col-span-6">
            <div
              className="relative aspect-square sm:aspect-[3/4] w-full overflow-hidden bg-[#111111] border border-[#e8e0d4]/10 group studio-light-overlay touch-pan-y"
              {...swipeHandlers}
              onMouseMove={handleLensMove}
              onMouseLeave={handleLensLeave}
            >
              {/* Profesionalna lupa: slika se uvećava oko tačke pod kursorom.
                  Transform se piše direktno u DOM (bez re-rendera pokreta). */}
              <div
                ref={zoomLayerRef}
                className="w-full h-full"
                style={{ willChange: 'transform', transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                <OptimizedImage
                  src={product.images[activeImageIndex]}
                  alt={`${product.nameSr} - pogled ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover object-center cursor-zoom-in"
                  onClick={() => onOpenZoom(product, activeImageIndex)}
                />
              </div>

              {/* Indikator uvećanja (vidljiv dok je lupa aktivna) */}
              {canHover && (
                <div
                  ref={zoomBadgeRef}
                  aria-hidden="true"
                  className="absolute top-3 right-3 px-2 py-1 bg-[#111111]/90 text-[11px] font-mono text-[#c9a96e] border border-[#c9a96e]/40 opacity-0 transition-opacity duration-200 pointer-events-none"
                >
                  2,4×
                </div>
              )}

              {/* Carousel controls */}
              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-3 sm:p-2.5 bg-[#111111]/90 hover:bg-[#c9a96e] text-[#e8e0d4] transition-colors shadow-md"
                    aria-label="Prethodna slika"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 sm:p-2.5 bg-[#111111]/90 hover:bg-[#c9a96e] text-[#e8e0d4] transition-colors shadow-md"
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
                className="absolute bottom-3 right-3 min-h-[44px] px-3 py-1.5 bg-[#111111]/85 hover:bg-[#c9a96e] text-[#e8e0d4] hover:text-[#0a0a0a] backdrop-blur-md border border-[#e8e0d4]/10 text-xs flex items-center gap-1.5 transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Uvećaj</span>
              </button>

              <div className="absolute bottom-3 left-3 text-[11px] font-mono bg-[#111111]/90 text-[#e8e0d4] px-2 py-1 border border-[#e8e0d4]/10">
                {activeImageIndex + 1} / {product.images.length}
              </div>
            </div>

            {/* Mobilni indikator slika (thumbnail traka je skrivena ispod 640px) */}
            {product.images.length > 1 && (
              <div className="sm:hidden flex items-center justify-center gap-1 py-2">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`Prikaži sliku ${idx + 1}`}
                    className="min-h-[36px] min-w-[36px] flex items-center justify-center"
                  >
                    <span
                      className={`block w-1.5 h-1.5 rounded-full transition-colors ${
                        idx === activeImageIndex ? 'bg-[#c9a96e]' : 'bg-[#e8e0d4]/30'
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="hidden sm:flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 overflow-hidden flex-shrink-0 border transition-all ${
                      idx === activeImageIndex
                        ? 'border-[#c9a96e] ring-2 ring-[#c9a96e]/40 opacity-100'
                        : 'border-[#e8e0d4]/15 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <OptimizedImage src={img} alt={`Sličica ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Model sizing note */}
            <p className="text-[11px] text-[#e8e0d4]/70 italic flex items-center gap-1.5 font-sans">
              <Info className="w-3.5 h-3.5 text-[#c9a96e] flex-shrink-0" />
              <span>{product.modelInfo}</span>
            </p>
          </div>

          {/* Right Column: Details — deo istog skrola, ne zaseban */}
          <div className="lg:col-span-6 min-h-0 px-4 sm:px-6 pt-5 pb-8 lg:p-0">
            <div>
              {/* Product Title & Subtitle */}
              <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#e8e0d4] font-normal leading-tight mb-2">
                {product.nameSr}
              </h2>
              <p className="text-xs sm:text-sm text-[#e8e0d4]/75 font-light mb-5 leading-relaxed font-sans">
                {product.subtitleSr}
              </p>

              {/* Ocena i broj recenzija — klik vodi na tab sa komentarima */}
              <button
                type="button"
                onClick={() => setActiveTab('recenzije')}
                className="group/rating -mt-2 mb-5 py-2.5 min-h-[44px] flex items-center gap-2 text-left"
              >
                {reviewStats.count > 0 ? (
                  <>
                    <Stars rating={reviewStats.avg} size={14} />
                    <span className="text-xs text-[#e8e0d4] font-mono">{formatAvg(reviewStats.avg)}</span>
                    <span className="text-xs text-[#e8e0d4]/45 underline decoration-[#c9a96e]/40 underline-offset-2 group-hover/rating:text-[#c9a96e] font-sans">
                      {reviewStats.count} {recenzijeLabel(reviewStats.count)}
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-[#e8e0d4]/45 underline decoration-[#c9a96e]/40 underline-offset-2 group-hover/rating:text-[#c9a96e] font-sans">
                    Budite prvi da komentarišete ovaj model
                  </span>
                )}
              </button>

              {/* Price & Lead Time */}
              <div className="p-4 bg-[#111111] border border-[#e8e0d4]/10 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#e8e0d4]/60 font-sans">Cena kreacije</div>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-2xl sm:text-3xl font-semibold text-[#e8e0d4] font-mono tracking-tight">
                        {FORMAT_RSD(product.priceRSD)}
                      </span>
                      {product.originalPriceRSD && (
                        <span className="text-sm text-[#e8e0d4]/40 line-through font-mono">
                          {FORMAT_RSD(product.originalPriceRSD)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[11px] uppercase tracking-wider text-[#a08540] font-sans font-semibold">Rok izrade</div>
                    <div className="text-xs text-[#e8e0d4] font-medium">{product.leadTimeDays.split('/')[0]}</div>
                  </div>
                </div>

                {/* Stock Indicator */}
                {stockCount !== null && stockCount <= 3 && (
                  <div className="flex items-center gap-2 pt-2 border-t border-[#e8e0d4]/10">
                    <div className="stock-pulse">
                      <span className="stock-pulse-dot" />
                    </div>
                    <span className="text-[11px] uppercase tracking-wider text-red-400 font-sans font-medium">
                      Još samo {stockCount} {stockCount === 1 ? 'komad' : 'komada'} preostalo
                    </span>
                  </div>
                )}
              </div>

              {/* Size Selector — prazna lista veličina ne sme da ostavi praznu rupu */}
              <div className="mb-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label className="text-xs uppercase tracking-wider text-[#e8e0d4] font-medium font-sans">
                    Izbor veličine / Prilagođavanje:
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveTab('velicine')}
                    className="text-xs text-[#a08540] hover:underline flex items-center gap-1 font-sans min-h-[44px] py-2 -my-2"
                  >
                    <Ruler className="w-3.5 h-3.5 text-[#c9a96e]" />
                    <span>Tabela veličina</span>
                  </button>
                </div>

                {product.sizes.length === 0 && (
                  <p className="text-xs text-[#e8e0d4]/70 bg-[#111111] border border-[#e8e0d4]/10 px-3 py-2.5 font-sans">
                    Veličinu i kroj dogovaramo lično — javite nam se porukom ili u ateljeu.
                  </p>
                )}

                <div className={`grid grid-cols-3 gap-2 ${product.sizes.length === 0 ? 'hidden' : ''}`}>
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
                        className={`min-h-[44px] py-2.5 px-2 text-[12px] border text-center transition-all font-sans ${
                          selectedSize === size
                            ? 'bg-[#c9a96e] text-black border-[#c9a96e] font-bold shadow-sm'
                            : 'bg-[#1a1a1a] hover:bg-[#111111] border-[#e8e0d4]/15 text-[#e8e0d4]'
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
                    className="mt-4 p-4 bg-[#111111] border border-[#c9a96e]/40 text-xs font-sans"
                  >
                    <div className="flex items-center gap-1.5 text-[#a08540] font-semibold uppercase tracking-wider mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#c9a96e]" />
                      <span>Unesite vaše mere (cm) za savršenu izradu:</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      <div>
                        <label className="block text-[11px] text-[#e8e0d4]/70 mb-1">Visina (cm)</label>
                        <input
                          type="text"
                          value={customHeight}
                          onChange={(e) => setCustomHeight(e.target.value)}
                          placeholder="npr. 175"
                          className="w-full p-2 bg-[#1a1a1a] border border-[#e8e0d4]/20 text-xs text-[#e8e0d4] outline-none focus:border-[#c9a96e]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#e8e0d4]/70 mb-1">Grudi (cm)</label>
                        <input
                          type="text"
                          value={customBust}
                          onChange={(e) => setCustomBust(e.target.value)}
                          placeholder="npr. 88"
                          className="w-full p-2 bg-[#1a1a1a] border border-[#e8e0d4]/20 text-xs text-[#e8e0d4] outline-none focus:border-[#c9a96e]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#e8e0d4]/70 mb-1">Struk (cm)</label>
                        <input
                          type="text"
                          value={customWaist}
                          onChange={(e) => setCustomWaist(e.target.value)}
                          placeholder="npr. 68"
                          className="w-full p-2 bg-[#1a1a1a] border border-[#e8e0d4]/20 text-xs text-[#e8e0d4] outline-none focus:border-[#c9a96e]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#e8e0d4]/70 mb-1">Kukovi (cm)</label>
                        <input
                          type="text"
                          value={customHips}
                          onChange={(e) => setCustomHips(e.target.value)}
                          placeholder="npr. 94"
                          className="w-full p-2 bg-[#1a1a1a] border border-[#e8e0d4]/20 text-xs text-[#e8e0d4] outline-none focus:border-[#c9a96e]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#e8e0d4]/70 mb-1">Posebna napomena (dužina suknje, pantalona, rukava):</label>
                      <input
                        type="text"
                        value={customNotes}
                        onChange={(e) => setCustomNotes(e.target.value)}
                        placeholder="Želim 5 cm duži porub za visoke potpetice..."
                        className="w-full p-2 bg-[#1a1a1a] border border-[#e8e0d4]/20 text-xs text-[#e8e0d4] outline-none focus:border-[#c9a96e]"
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Primary Action Buttons — na telefonu je akcija u fiksnoj traci ispod */}
              <div className="hidden lg:flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  id="modal-add-to-cart-btn"
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 py-5 sm:py-4 px-6 font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                    addedAnimation
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#111111] hover:bg-[#1a1a1a] text-[#e8e0d4] shadow-md'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Dodato u vaš izbor!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#c9a96e]" />
                      <span>Dodaj u izbor ({FORMAT_RSD(product.priceRSD)})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Information Tabs */}
              <div className="border-t border-[#e8e0d4]/10 pt-6">
                <div className="sticky top-0 z-10 -mx-4 px-4 sm:mx-0 sm:px-0 bg-[#0a0a0a] flex items-center gap-2 sm:gap-4 border-b border-[#e8e0d4]/10 pb-1 mb-4 font-sans overflow-x-auto scrollbar-none scroll-fade-x">
                  <button
                    type="button"
                    onClick={() => setActiveTab('opis')}
                    className={`whitespace-nowrap text-[12px] uppercase tracking-wider pb-2 min-h-[44px] flex items-center relative transition-colors ${
                      activeTab === 'opis'
                        ? 'text-[#e8e0d4] font-bold after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a96e]'
                        : 'text-[#e8e0d4]/60 hover:text-[#e8e0d4]'
                    }`}
                  >
                    Opis & Detalji
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('materijali')}
                    className={`whitespace-nowrap text-[12px] uppercase tracking-wider pb-2 min-h-[44px] flex items-center relative transition-colors ${
                      activeTab === 'materijali'
                        ? 'text-[#e8e0d4] font-bold after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a96e]'
                        : 'text-[#e8e0d4]/60 hover:text-[#e8e0d4]'
                    }`}
                  >
                    Materijali
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('velicine')}
                    className={`whitespace-nowrap text-[12px] uppercase tracking-wider pb-2 min-h-[44px] flex items-center relative transition-colors ${
                      activeTab === 'velicine'
                        ? 'text-[#e8e0d4] font-bold after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a96e]'
                        : 'text-[#e8e0d4]/60 hover:text-[#e8e0d4]'
                    }`}
                  >
                    Veličine
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('isporuka')}
                    className={`whitespace-nowrap text-[12px] uppercase tracking-wider pb-2 min-h-[44px] flex items-center relative transition-colors ${
                      activeTab === 'isporuka'
                        ? 'text-[#e8e0d4] font-bold after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a96e]'
                        : 'text-[#e8e0d4]/60 hover:text-[#e8e0d4]'
                    }`}
                  >
                    Poručivanje
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('recenzije')}
                    className={`whitespace-nowrap text-[12px] uppercase tracking-wider pb-2 min-h-[44px] flex items-center relative transition-colors flex items-center gap-1.5 ${
                      activeTab === 'recenzije'
                        ? 'text-[#e8e0d4] font-bold after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a96e]'
                        : 'text-[#e8e0d4]/60 hover:text-[#e8e0d4]'
                    }`}
                  >
                    <Star className="w-3 h-3 text-[#c9a96e]" />
                    <span>Recenzije</span>
                    {reviewStats.count > 0 && (
                      <span className="text-[9px] bg-[#c9a96e]/15 text-[#c9a96e] border border-[#c9a96e]/35 px-1.5 py-px font-mono">
                        {reviewStats.count}
                      </span>
                    )}
                  </button>
                </div>

                {/* Tab Content */}
                <div className="text-xs text-[#e8e0d4]/85 leading-relaxed font-sans">
                  {activeTab === 'opis' && (
                    <div className="space-y-4">
                      {product.descriptionSr && <p className="font-light">{product.descriptionSr}</p>}
                      {product.storySr && (
                        <p className="italic text-[#e8e0d4]/80 bg-[#111111] p-3 border border-[#e8e0d4]/10 font-serif">
                          "{product.storySr}"
                        </p>
                      )}
                      {product.features.length > 0 && (
                        <div>
                          <h4 className="text-[#e8e0d4] font-semibold uppercase tracking-wider text-[11px] mb-2">
                            Karakteristike modela:
                          </h4>
                          <ul className="space-y-1.5 list-disc list-inside text-[#e8e0d4]/80">
                            {product.features.map((feat, i) => (
                              <li key={i}>{feat}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {!product.descriptionSr && !product.storySr && product.features.length === 0 && (
                        <p className="text-[#e8e0d4]/70 bg-[#111111] p-3 border border-[#e8e0d4]/10 font-sans">
                          Detaljan opis ovog modela pripremamo — javite nam se i rado ćemo vam
                          poslati sve informacije o kroju, materijalu i roku izrade.
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === 'materijali' && (
                    <div className="space-y-4">
                      <div className="bg-[#111111] p-3 border border-[#e8e0d4]/10">
                        <span className="text-[#a08540] font-semibold uppercase tracking-wider block mb-1">
                          Sastav:
                        </span>
                        <p>{product.materialsAndCare.composition}</p>
                      </div>
                      <div className="bg-[#111111] p-3 border border-[#e8e0d4]/10">
                        <span className="text-[#a08540] font-semibold uppercase tracking-wider block mb-1">
                          Poreklo materijala i proizvodnja:
                        </span>
                        <p>{product.materialsAndCare.origin}</p>
                      </div>
                      <div>
                        <span className="text-[#e8e0d4] font-semibold uppercase tracking-wider block mb-1.5">
                          Uputstvo za održavanje:
                        </span>
                        <ul className="space-y-1 list-disc list-inside text-[#e8e0d4]/80">
                          {product.materialsAndCare.care.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      {product.fabricImage && (
                        <div className="mb-4">
                          <div className="text-[11px] uppercase tracking-[0.15em] text-[#a08540] font-sans font-semibold mb-2">Materijal izbliza</div>
                          <div className="relative w-full aspect-[16/9] bg-[#111111] border border-[#e8e0d4]/10 overflow-hidden cursor-pointer" onClick={() => setIsFabricOpen(true)}>
                            <Img src={product.fabricImage} alt="Materijal izbliza" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-[#c9a96e]/90 text-[#0a0a0a] text-[9px] uppercase tracking-wider font-sans font-semibold flex items-center gap-1">
                              <ZoomIn className="w-3 h-3" /> Uvećaj
                            </div>
                          </div>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setIsFabricOpen(true)}
                        className="w-full py-3 border border-[#c9a96e]/40 bg-[#111111] hover:bg-[#1a1a1a] text-[#c9a96e] text-xs uppercase tracking-[0.15em] font-sans font-semibold transition-all flex items-center justify-center gap-2"
                      >
                        <ZoomIn className="w-4 h-4" />
                        <span>Pregledaj tkaninu izbliza</span>
                      </button>
                    </div>
                  )}

                  {activeTab === 'velicine' && (
                    <div className="space-y-4">
                      <p className="text-xs text-[#e8e0d4]/70">
                        Mere u tabeli predstavljaju preporučene telesne mere u centimetrima (cm). Za modele koji se šiju po meri, mere se uzimaju dogovorom — lično, u dogovoreno vreme, ili unosom vaših parametara.
                      </p>
                      
                      <div className="border border-[#e8e0d4]/15">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#111111] text-[#a08540] uppercase tracking-wider">
                              <th className="p-2 border-b border-[#e8e0d4]/15">Veličina</th>
                              <th className="p-2 border-b border-[#e8e0d4]/15">Grudi</th>
                              <th className="p-2 border-b border-[#e8e0d4]/15">Struk</th>
                              <th className="p-2 border-b border-[#e8e0d4]/15">Bokovi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#e8e0d4]/10 font-mono text-[#e8e0d4]">
                            <tr className="hover:bg-[#111111]">
                              <td className="p-2 font-bold">XS (34)</td>
                              <td className="p-2">82–85</td>
                              <td className="p-2">62–65</td>
                              <td className="p-2">88–91</td>
                            </tr>
                            <tr className="hover:bg-[#111111]">
                              <td className="p-2 font-bold">S (36)</td>
                              <td className="p-2">86–89</td>
                              <td className="p-2">66–69</td>
                              <td className="p-2">92–95</td>
                            </tr>
                            <tr className="hover:bg-[#111111]">
                              <td className="p-2 font-bold">M (38)</td>
                              <td className="p-2">90–93</td>
                              <td className="p-2">70–73</td>
                              <td className="p-2">96–99</td>
                            </tr>
                            <tr className="hover:bg-[#111111]">
                              <td className="p-2 font-bold">L (40)</td>
                              <td className="p-2">94–98</td>
                              <td className="p-2">74–78</td>
                              <td className="p-2">100–104</td>
                            </tr>
                            <tr className="hover:bg-[#111111]">
                              <td className="p-2 font-bold">XL (42)</td>
                              <td className="p-2">99–104</td>
                              <td className="p-2">79–84</td>
                              <td className="p-2">105–110</td>
                            </tr>
                            <tr className="hover:bg-[#111111]">
                              <td className="p-2 font-bold">2XL (44)</td>
                              <td className="p-2">105–109</td>
                              <td className="p-2">85-88</td>
                              <td className="p-2">111-115</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === 'isporuka' && (
                    <div className="space-y-3">
                      <div className="flex items-start gap-2.5">
                        <MessageCircle className="w-4 h-4 text-[#c9a96e] flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#e8e0d4] block">Poručivanje u dogovoru:</strong>
                          <span>
                            Model dodajte u izbor i pošaljite nam ga porukom preko WhatsApp-a ili
                            Instagram DM-a. Oko porudžbine, rokova i načina primopredaje dogovaramo
                            se lično — na sajtu nema online plaćanja.
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-[#c9a96e] flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#e8e0d4] block">Garancija pristajanja:</strong>
                          <span>Ukoliko je potrebna sitna korekcija, naš atelje vrši sve naknadne prepravke potpuno besplatno.</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'recenzije' && (
                    <ProductReviews
                      reviews={visibleReviews}
                      stats={reviewStats}
                      productId={product.id}
                      onSubmitted={() => onReviewSubmitted?.()}
                    />
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Mobilna akciona traka — cena i "Dodaj u izbor" uvek vidljivi */}
        <div className="lg:hidden flex-shrink-0 border-t border-[#c9a96e]/25 bg-[#111111] px-4 py-3 flex items-center gap-3">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-[#a08540] font-sans font-semibold leading-none mb-1">
              Cena kreacije
            </div>
            <div className="text-[15px] font-semibold font-mono text-[#e8e0d4] leading-none">
              {FORMAT_RSD(product.priceRSD)}
            </div>
          </div>
          <button
            id="modal-add-to-cart-btn-mobile"
            type="button"
            onClick={handleAdd}
            className={`flex-1 min-h-[48px] px-4 font-semibold text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 ${
              addedAnimation
                ? 'bg-emerald-700 text-white'
                : 'bg-[#c9a96e] hover:bg-[#A7823B] text-black shadow-md'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>Dodato u izbor!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Dodaj u izbor</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Fabric Inspection Modal */}
      <FabricInspection
        isOpen={isFabricOpen}
        onClose={() => setIsFabricOpen(false)}
        productImage={product.fabricImage || product.images[0]}
        fabricDetails={fabricDetails}
      />
    </div>
  );
};
