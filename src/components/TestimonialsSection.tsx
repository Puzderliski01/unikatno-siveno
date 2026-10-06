import React, { useState, useEffect, useMemo } from 'react';
import { X, Quote, PenLine, Sparkles, Clock3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Review } from '../types';
import { computeStats, formatAvg, formatReviewDate, mergeLocalPending, recenzijeLabel } from '../lib/reviews';
import { useScrollAnimation, fadeInUpVariants, staggerItemVariants } from '../hooks/useScrollAnimation';
import { Stars } from './Stars';
import { ReviewForm } from './ReviewForm';

interface TestimonialsSectionProps {
  products: Product[];
  /** sve odobrene recenzije (modeli + opšti utisci o ateljeu) */
  reviews: Review[];
  onReviewSubmitted: () => void;
  onOpenDetails: (product: Product) => void;
}

const MAX_VISIBLE = 9;

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  products,
  reviews,
  onReviewSubmitted,
  onOpenDetails,
}) => {
  const { getVariants, getInViewOptions } = useScrollAnimation();
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const stats = useMemo(() => computeStats(reviews), [reviews]);
  // Prikaz uključuje i lokalne komentare koji čekaju odobrenje (vidi ih samo autor)
  const visible = useMemo(
    () =>
      [...mergeLocalPending(reviews)]
        .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
        .slice(0, MAX_VISIBLE),
    [reviews]
  );

  const productById = useMemo(() => {
    const map: Record<string, Product> = {};
    for (const p of products) map[p.id] = p;
    return map;
  }, [products]);

  useEffect(() => {
    if (isComposerOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isComposerOpen]);

  return (
    <section id="utisci" className="py-20 bg-[#0a0a0a] text-[#e8e0d4] relative border-b border-[#c9a96e]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={getInViewOptions()}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div
            variants={getVariants(staggerItemVariants)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-medium mb-3"
          >
            <Quote className="w-3.5 h-3.5" />
            <span>Utisci klijentki</span>
          </motion.div>
          <motion.h2
            variants={getVariants(staggerItemVariants)}
            className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#e8e0d4] tracking-tight mb-4"
          >
            Reči onih koji nose naše kreacije
          </motion.h2>
          <motion.div
            variants={getVariants(staggerItemVariants)}
            className="w-12 h-px bg-[#c9a96e] mx-auto mb-4"
          />
          <motion.p
            variants={getVariants(staggerItemVariants)}
            className="text-sm sm:text-base text-[#e8e0d4]/75 font-light leading-relaxed"
          >
            Svaki komad nosi priču svoje vlasnice. Ovde su iskustva onih koje su
            nam poverile svoje mere, svoje prilike i svoj stil.
          </motion.p>

          {/* Ukupna ocena */}
          {stats.count > 0 && (
            <motion.div
              variants={getVariants(staggerItemVariants)}
              className="inline-flex items-center gap-3 mt-6 px-5 py-3 bg-[#111111] border border-[#c9a96e]/30"
            >
              <span className="text-2xl font-serif-luxury text-[#c9a96e] leading-none">
                {formatAvg(stats.avg)}
              </span>
              <Stars rating={stats.avg} size={15} />
              <span className="text-[10px] uppercase tracking-wider text-[#e8e0d4]/55 font-sans border-l border-[#e8e0d4]/15 pl-3">
                {stats.count} {recenzijeLabel(stats.count)}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Karte utisaka */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
            {visible.map((review, index) => {
              const product = review.product_id ? productById[review.product_id] : undefined;
              return (
                <motion.figure
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={getInViewOptions()}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col p-5 sm:p-6 bg-[#111111] border border-[#c9a96e]/20 hover:border-[#c9a96e]/50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <Stars rating={review.rating} size={14} />
                    <span className="text-[10px] text-[#e8e0d4]/35 font-sans">
                      {formatReviewDate(review.created_at)}
                    </span>
                  </div>

                  {review.title && (
                    <figcaption className="text-[11px] uppercase tracking-[0.18em] text-[#c9a96e] font-sans font-semibold mb-2">
                      {review.title}
                    </figcaption>
                  )}

                  <blockquote className="text-sm text-[#e8e0d4]/85 leading-relaxed font-light font-sans flex-1 whitespace-pre-line">
                    “{review.comment}”
                  </blockquote>

                  <div className="mt-4 pt-3 border-t border-[#e8e0d4]/10 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs text-[#e8e0d4] font-medium font-sans truncate">
                        {review.author_name}
                        {review.city ? (
                          <span className="text-[#e8e0d4]/45 font-normal"> · {review.city}</span>
                        ) : null}
                      </div>
                      {product && (
                        <button
                          type="button"
                          onClick={() => onOpenDetails(product)}
                          className="mt-1 text-[10px] uppercase tracking-wider text-[#a08540] hover:text-[#c9a96e] transition-colors font-sans truncate max-w-full text-left"
                        >
                          {product.nameSr} →
                        </button>
                      )}
                    </div>
                    {review.status === 'pending' && (
                      <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#c9a96e] bg-[#c9a96e]/10 border border-[#c9a96e]/30 px-1.5 py-0.5 font-sans flex-shrink-0">
                        <Clock3 className="w-2.5 h-2.5" />
                        Čeka odobrenje
                      </span>
                    )}
                  </div>
                </motion.figure>
              );
            })}
          </div>
        ) : (
          <div className="mb-10 p-10 text-center border border-dashed border-[#e8e0d4]/15 bg-[#111111]">
            <Quote className="w-6 h-6 text-[#c9a96e]/60 mx-auto mb-3" />
            <p className="text-sm text-[#e8e0d4]/65 font-sans leading-relaxed max-w-md mx-auto">
              Još nema objavljenih utisaka. Ako ste nosili neku od naših kreacija,
              podelite prvi — pomoći ćete drugim damama da izaberu pravi kroj.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsComposerOpen(true)}
            className="shine-btn inline-flex items-center gap-2 px-8 py-4 border border-[#c9a96e] text-[#c9a96e] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#c9a96e]/10 transition-colors font-sans"
          >
            <PenLine className="w-4 h-4" />
            Ostavi svoj utisak
          </button>
        </div>
      </div>

      {/* Composer (modal) */}
      <AnimatePresence>
        {isComposerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
            onClick={() => setIsComposerOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 15 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl my-8 bg-[#0a0a0a] border border-[#e8e0d4]/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8e0d4]/10 bg-[#111111]">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#c9a96e] font-sans font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Vaš utisak o ateljeu
                </div>
                <button
                  type="button"
                  onClick={() => setIsComposerOpen(false)}
                  className="p-2 hover:bg-[#e8e0d4]/5 text-[#e8e0d4] transition-colors"
                  aria-label="Zatvori"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <ReviewForm
                  productId={null}
                  products={products}
                  allowProductChoice
                  bare
                  onSubmitted={() => {
                    onReviewSubmitted();
                    // Zadržimo poruku o uspehu sekund-dva pre zatvaranja
                    setTimeout(() => setIsComposerOpen(false), 2600);
                  }}
                  onCancel={() => setIsComposerOpen(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
