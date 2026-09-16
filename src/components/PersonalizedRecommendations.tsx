import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { FORMAT_RSD } from '../data/products';
import { OptimizedImage } from './OptimizedImage';
import { useScrollAnimation, staggerItemVariants } from '../hooks/useScrollAnimation';

interface PersonalizedRecommendationsProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
}

export const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = React.memo(({
  products,
  onOpenDetails,
}) => {
  const { getVariants, getInViewOptions } = useScrollAnimation();
  const inViewOptions = getInViewOptions();

  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-[#0a0a0a] text-[#e8e0d4] relative border-b border-[#c9a96e]/20">
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
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <motion.div variants={getVariants(staggerItemVariants)} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preporučujemo za vas</span>
          </motion.div>
          <motion.h2 variants={getVariants(staggerItemVariants)} className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-light text-[#e8e0d4] tracking-tight mb-3">
            Modeli koje bi vam se mogli svideti
          </motion.h2>
          <motion.div variants={getVariants(staggerItemVariants)} className="w-12 h-px bg-[#c9a96e] mx-auto mb-3" />
          <motion.p variants={getVariants(staggerItemVariants)} className="text-xs sm:text-sm text-[#e8e0d4]/65 font-light">
            Na osnovu vaših prethodnih poseta i preferencija
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOptions}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group cursor-pointer"
              onClick={() => onOpenDetails(product)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#111111] border border-[#c9a96e]/15 hover:border-[#c9a96e]/50 transition-all mb-3">
                <OptimizedImage
                  src={product.images[0]}
                  alt={product.nameSr}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-[#c9a96e]" />
                </div>
                {product.badge && (
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[8px] uppercase font-sans tracking-wider bg-[#0a0a0a] text-[#c9a96e] border border-[#c9a96e]/30">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#c9a96e] font-sans">
                  {product.categoryLabelSr}
                </p>
                <h4 className="text-xs font-serif-luxury text-[#e8e0d4] group-hover:text-[#c9a96e] transition-colors leading-snug line-clamp-2">
                  {product.nameSr}
                </h4>
                <p className="text-[10px] font-mono text-[#e8e0d4]/70">{FORMAT_RSD(product.priceRSD)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
