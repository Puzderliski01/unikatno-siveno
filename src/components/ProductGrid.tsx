import React, { useState, useMemo } from 'react';
import { Sparkles, SlidersHorizontal, Search, LayoutGrid, LayoutList, Columns2, Columns3, Columns4, Grid2x2 } from 'lucide-react';
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
}

export const ProductGrid: React.FC<ProductGridProps> = React.memo(({
  products,
  wishlistIds,
  onOpenDetails,
  onOpenZoom,
  onQuickAddToCart,
  onToggleWishlist,
}) => {
  const { getVariants, getInViewOptions } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState<string>('sve');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');
  const [gridCols, setGridCols] = useState<1 | 2 | 3 | 4>(3);
  // Price range filters
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  // Material filters
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  // Customizable filter
  const [isCustomizableOnly, setIsCustomizableOnly] = useState<boolean>(false);

  // Extract unique materials for filter options
  const uniqueMaterials = useMemo(() => {
    const materialsSet = new Set<string>();
    products.forEach(product => {
      materialsSet.add(product.materialsAndCare.composition);
      materialsSet.add(product.materialsAndCare.origin);
    });
    return Array.from(materialsSet).sort();
  }, [products]);

  const categories = [
    { id: 'sve', label: 'Sve kreacije' },
    { id: 'haljine', label: 'Haljine' },
    { id: 'tunike', label: 'Tunike' },
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

      // Price range filter
      const matchesPrice = (!minPrice || p.priceRSD >= minPrice) && (!maxPrice || p.priceRSD <= maxPrice);

      // Material filter - check if product has any of the selected materials in composition
      const matchesMaterials = selectedMaterials.length === 0 || selectedMaterials.some(material => p.materialsAndCare.composition.toLowerCase().includes(material.toLowerCase()));

      // Customizable filter
      const matchesCustomizable = !isCustomizableOnly || p.isCustomizable;

      return matchesCategory && matchesSearch && matchesPrice && matchesMaterials && matchesCustomizable;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.priceRSD - b.priceRSD);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.priceRSD - a.priceRSD);
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.nameSr.localeCompare(b.nameSr));
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy, minPrice, maxPrice, selectedMaterials, isCustomizableOnly]);

  const inViewOptions = getInViewOptions();

  return (
    <section id="kolekcija" className="py-20 bg-[#0a0a0a] text-[#e8e0d4] relative border-b border-[#c9a96e]/20">
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
          <motion.div variants={getVariants(staggerItemVariants)} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kolekcija Ateljea</span>
          </motion.div>
          <motion.h2 variants={getVariants(staggerItemVariants)} className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#e8e0d4] tracking-tight mb-4">
            Galerija unikatnih modela
          </motion.h2>
          <motion.div variants={getVariants(staggerItemVariants)} className="w-12 h-px bg-[#c9a96e] mx-auto mb-4" />
          <motion.p variants={getVariants(staggerItemVariants)} className="text-sm sm:text-base text-[#e8e0d4]/75 font-light leading-relaxed">
            Svaki komad u našoj kolekciji predstavlja sinergiju vrhunskih prirodnih materijala, preciznog ručnog kroja i mogućnosti personalizacije prema vašoj želji.
          </motion.p>
        </motion.div>

        {/* Filters & Search Control Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={getVariants(fadeInUpVariants)}
          className="bg-[#111111] border border-[#c9a96e]/20 rounded-none p-4 mb-10 flex flex-col md:flex-row items-center justify-between gap-4"
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
                    ? 'bg-[#c9a96e] text-[#0a0a0a] font-semibold shadow-sm'
                    : 'bg-[#1a1a1a] text-[#e8e0d4] hover:bg-[#c9a96e]/10 hover:text-[#c9a96e] border border-[#c9a96e]/20'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Advanced Filters */}
          <div className="flex items-center gap-4 w-full md:w-auto flex-wrap">
            {/* Material Filters */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-[#e8e0d4]/70">
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Materijali</span>
                </div>
                <button
                  onClick={() => setSelectedMaterials([])}
                  className="p-1 text-[#e8e0d4]/50 hover:text-[#c9a96e] transition-colors hidden md:block"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                </button>
              </div>
              <div className="mt-2 space-y-1">
                {uniqueMaterials.map((material) => (
                  <label key={material} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(material)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMaterials([...selectedMaterials, material]);
                        } else {
                          setSelectedMaterials(selectedMaterials.filter(m => m !== material));
                        }
                      }}
                      className="w-4 h-4 text-[#c9a96e] border border-[#c9a96e]/20 focus:ring-[#c9a96e]"
                    />
                    <span className="text-xs">{material}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Customizable Filter */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={isCustomizableOnly}
                  onChange={(e) => setIsCustomizableOnly(e.target.checked)}
                  className="w-4 h-4 text-[#c9a96e] border border-[#c9a96e]/20 focus:ring-[#c9a96e]"
                />
                <span>Samo prilagođeno</span>
              </label>
            </div>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Grid Layout Selector */}
            <div className="flex items-center gap-1 border border-[#c9a96e]/20 p-1">
              {[
                { cols: 1 as const, icon: LayoutList, label: '1 kolona', mobileOnly: true },
                { cols: 2 as const, icon: Columns2, label: '2 kolone', mobileOnly: true },
                { cols: 3 as const, icon: Columns3, label: '3 kolone', mobileOnly: false },
                { cols: 4 as const, icon: Columns4, label: '4 kolone', mobileOnly: false },
              ].map(({ cols, icon: Icon, label, mobileOnly }) => (
                <button
                  key={cols}
                  type="button"
                  onClick={() => setGridCols(cols)}
                  title={label}
                  className={`p-2 transition-colors ${
                    mobileOnly ? '' : 'hidden sm:block'
                  } ${
                    gridCols === cols
                      ? 'bg-[#c9a96e] text-[#0a0a0a]'
                      : 'text-[#e8e0d4]/50 hover:text-[#c9a96e]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Price Range Filters */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="number"
                  value={minPrice || ''}
                  onChange={(e) => setMinPrice(e.target.value === '' ? null : parseInt(e.target.value))}
                  placeholder="Min cena"
                  className="w-24 pl-3 pr-3 py-2 bg-[#1a1a1a] border border-[#c9a96e]/20 focus:border-[#c9a96e] text-xs text-[#e8e0d4] outline-none transition-colors"
                />
              </div>
        </div>

            {/* Search Input */}
            <div className="relative flex-1 md:w-56">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#e8e0d4]/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pretraži modele..."
                className="w-full pl-9 pr-3 py-2.5 sm:py-1.5 bg-[#1a1a1a] border border-[#c9a96e]/20 focus:border-[#c9a96e] text-xs text-[#e8e0d4] placeholder-[#e8e0d4]/40 outline-none transition-colors"
              />
            </div>

            {/* Sort Selector */}
            <div className="relative flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="pl-3 pr-8 py-2.5 sm:py-1.5 bg-[#1a1a1a] border border-[#c9a96e]/20 focus:border-[#c9a96e] text-xs text-[#e8e0d4] outline-none appearance-none cursor-pointer"
              >
                <option value="default">Sortiranje: Istaknuto</option>
                <option value="price-asc">Cena: Rastuće</option>
                <option value="price-desc">Cena: Opadajuće</option>
                <option value="name">Naziv: A-Z</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#e8e0d4]/50 pointer-events-none" />
            </div>
          </div>

        </motion.div>

        {/* Product Grid Results */}
        {filteredAndSortedProducts.length > 0 ? (
          <motion.div
            whileInView="visible"
            viewport={inViewOptions}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className={`grid gap-4 sm:gap-6 ${
              gridCols === 1 ? 'grid-cols-1' : gridCols === 2 ? 'grid-cols-2' : gridCols === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileInView={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
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
          <div className="text-center py-20 border border-[#c9a96e]/20 bg-[#111111] p-8">
            <p className="font-serif-luxury text-xl text-[#e8e0d4] mb-2">Nije pronađen nijedan model za odabrane kriterijume.</p>
            <p className="text-xs text-[#e8e0d4]/60 mb-6">Pokušajte sa resetovanjem pretrage ili kategorije.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('sve');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-[#c9a96e] text-[#0a0a0a] text-xs font-semibold uppercase tracking-wider"
            >
              Prikaži celu kolekciju
            </button>
          </div>
        )}

      </div>
    </section>
  );
});
