import React from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import { Product } from '../types';
import { FORMAT_RSD } from '../data/products';
import { OptimizedImage } from './OptimizedImage';

interface RecentlyViewedProps {
  productIds: string[];
  allProducts: Product[];
  onOpenDetails: (product: Product) => void;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = React.memo(({
  productIds,
  allProducts,
  onOpenDetails,
}) => {
  const viewedProducts = productIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  if (viewedProducts.length === 0) return null;

  return (
    <div className="recently-viewed-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-3.5 h-3.5 text-[#c9a96e]" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9a96e] font-sans font-medium">
            Viđeno ranije
          </span>
        </div>
        <div className="recently-viewed-scroll">
          {viewedProducts.map((product) => (
            <motion.div
              key={product.id}
              className="recently-viewed-item"
              whileHover={{ y: -4 }}
              onClick={() => onOpenDetails(product)}
            >
              <div className="overflow-hidden mb-2">
                <OptimizedImage
                  src={product.images[0]}
                  alt={product.nameSr}
                  className="w-[140px] h-[180px] object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] text-[#e8e0d4]/80 font-sans truncate">{product.nameSr}</p>
              <p className="text-[10px] text-[#c9a96e] font-mono">{FORMAT_RSD(product.priceRSD)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});
