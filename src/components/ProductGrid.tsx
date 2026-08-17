import React, { useState, useMemo } from 'react';
import { Sparkles, SlidersHorizontal, Search, Scissors, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { motion } from 'motion/react';
import { useScrollAnimation, fadeInUpVariants, staggerItemVariants } from '../hooks/useScrollAnimation';

interface ProductGridProps {
  products: Product[];
  wishlistIds: string[];
  onOpenDetails: (product: Product) => void;
  onOpenZoom: (product: Product, index?: number) => void;
  onQuickAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  onOpenCustomBespoke: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  wishlistIds,
  onOpenDetails,
  onOpenZoom,
  onQuickAddToCart,
  onToggleWishlist,
  onOpenCustomBespoke,
}) => {
  const { getVariants, getInViewOptions } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState<string>('sve');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');

  const categories = [
    { id: 'sve', label: 'Sve kreacije' },
    { id: 'haljine', label: 'Haljine' },
    { id: 'blejzeri', label: 'Blejzeri & Kaputi' },
    { id: 'svila', label: 'Korseti' },
    { id: 'majice', label: 'Majice' },
    { id: 'suknje', label: 'Suknje' },
    { id: 'aksesoari', label: 'Aksesoari' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory = activeCategory === 'sve' || p.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        p.nameSr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitleSr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabelSr.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.priceRSD - b.priceRSD);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.priceRSD - a.priceRSD);
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.nameSr.localeCompare(b.nameSr));
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  const inViewOptions = getInViewOptions();

  return (
    <section id="kolekcija" className="py-20 bg-[#FCFBF7] text-[#1A1A1A] relative border-b border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <motion.div variants={getVariants(staggerItemVariants)} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kolekcija Ateljea</span>
          </motion.div>
          <motion.h2 variants={getVariants(staggerItemVariants)} className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] tracking-tight mb-4">
            Galerija unikatnih modela
          </motion.h2>
          <motion.div variants={getVariants(staggerItemVariants)} className="w-12 h-px bg-[#C5A059] mx-auto mb-4" />
          <motion.p variants={getVariants(staggerItemVariants)} className="text-sm sm:text-base text-[#1A1A1A]/75 font-light leading-relaxed">
            Svaki komad u našoj kolekciji predstavlja sinergiju vrhunskih prirodnih materijala, preciznog ručnog kroja i mogućnosti personalizacije prema vašoj želji.
          </motion.p>
        </motion.div>

        {/* Filters & Search Control Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={getVariants(fadeInUpVariants)}
          className="bg-[#F4F1EA] border border-[#C5A059]/30 rounded-none p-4 mb-10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 text-xs font-sans uppercase tracking-[0.15em] transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#1A1A1A] text-[#FCFBF7] font-semibold shadow-sm'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#FCFBF7] hover:text-[#C5A059] border border-[#1A1A1A]/10'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Search Input */}
            <div className="relative flex-1 md:w-56">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pretraži modele..."
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none transition-colors"
              />
            </div>

            {/* Sort Selector */}
            <div className="relative flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="pl-3 pr-8 py-1.5 bg-white border border-[#1A1A1A]/20 focus:border-[#C5A059] text-xs text-[#1A1A1A] outline-none appearance-none cursor-pointer"
              >
                <option value="default">Sortiranje: Istaknuto</option>
                <option value="price-asc">Cena: Rastuće</option>
                <option value="price-desc">Cena: Opadajuće</option>
                <option value="name">Naziv: A-Z</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/50 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Product Grid Results */}
        {filteredAndSortedProducts.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewOptions}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.7, 
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1] 
                    } 
                  },
                }}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
              >
                <ProductCard
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onOpenDetails={onOpenDetails}
                  onOpenZoom={onOpenZoom}
                  onQuickAddToCart={onQuickAddToCart}
                  onToggleWishlist={onToggleWishlist}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 border border-[#C5A059]/30 bg-white p-8">
            <p className="font-serif-luxury text-xl text-[#1A1A1A] mb-2">Nije pronađen nijedan model za odabrane kriterijume.</p>
            <p className="text-xs text-[#1A1A1A]/60 mb-6">Pokušajte sa resetovanjem pretrage ili kategorije.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('sve');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-[#C5A059] text-black text-xs font-semibold uppercase tracking-wider"
            >
              Prikaži celu kolekciju
            </button>
          </div>
        )}

        {/* Custom Bespoke Atelier CTA Strip */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={{
            hidden: { opacity: 0, y: 60, scale: 0.98 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="mt-16 p-8 sm:p-10 bg-[#1A1A1A] text-[#FCFBF7] border border-[#C5A059]/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#C5A059]/5 via-transparent to-[#C5A059]/5" />
          
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-semibold mb-2 font-sans">
              <Scissors className="w-4 h-4" />
              <span>Personalizovana kreacija po vašoj skici</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FCFBF7] font-normal mb-2">
              Želite unikatni model kreiran isključivo za vas?
            </h3>
            <p className="text-xs sm:text-sm text-[#FCFBF7]/80 font-light leading-relaxed">
              Jelena Erić nudi uslugu kompletne izrade večernjih toaleta, venčanica i odela po unikatnim zamislima klijentkinja uz konsultaciju i izbor uzoraka tkanina u salonu.
            </p>
          </div>

          <motion.button
            type="button"
            onClick={onOpenCustomBespoke}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(197, 160, 89, 0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="relative z-10 flex-shrink-0 px-8 py-4 bg-[#C5A059] hover:bg-[#A7823B] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-colors duration-300 flex items-center gap-2 group shadow-md"
          >
            <span>Zakažite konsultaciju za izradu</span>
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};