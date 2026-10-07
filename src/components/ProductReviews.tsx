import React, { useState } from 'react';
import { MessageSquareQuote, PenLine, Clock3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Review } from '../types';
import { ReviewStats, formatAvg, formatReviewDate, recenzijeLabel } from '../lib/reviews';
import { Stars } from './Stars';
import { ReviewForm } from './ReviewForm';

interface ProductReviewsProps {
  /** vidljive recenzije ovog modela (odobrene + autorova lokalna pending) */
  reviews: Review[];
  /** statistika računa se isključivo iz odobrenih recenzija */
  stats: ReviewStats;
  /** ID modela za koji se piše komentar */
  productId: string;
  onSubmitted: () => void;
}

/** Jedan komentar u listi. */
const ReviewItem: React.FC<{ review: Review }> = ({ review }) => (
  <motion.article
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className="p-4 glass-inner border border-[#e8e0d4]/10"
  >
    <div className="flex items-start justify-between gap-3 mb-2">
      <div className="flex items-center gap-2">
        <Stars rating={review.rating} size={13} />
        <span className="text-[11px] text-[#e8e0d4]/50 font-mono">{review.rating}/5</span>
      </div>
      <span className="text-[11px] text-[#e8e0d4]/35 font-sans whitespace-nowrap">
        {formatReviewDate(review.created_at)}
      </span>
    </div>

    {review.title && (
      <h5 className="text-xs font-semibold text-[#c9a96e] uppercase tracking-wider mb-1.5 font-sans">
        {review.title}
      </h5>
    )}

    <p className="text-xs text-[#e8e0d4]/85 leading-relaxed font-light font-sans whitespace-pre-line">
      {review.comment}
    </p>

    <div className="mt-3 pt-2 border-t border-[#e8e0d4]/10 flex items-center justify-between gap-2">
      <span className="text-[11px] text-[#e8e0d4]/70 font-sans">
        <span className="text-[#e8e0d4] font-medium">{review.author_name}</span>
        {review.city ? <span className="text-[#e8e0d4]/45"> · {review.city}</span> : null}
      </span>
      {review.status === 'pending' && (
        <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#c9a96e] bg-[#c9a96e]/10 border border-[#c9a96e]/30 px-1.5 py-0.5 font-sans">
          <Clock3 className="w-2.5 h-2.5" />
          Čeka odobrenje
        </span>
      )}
    </div>
  </motion.article>
);

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  stats,
  productId,
  onSubmitted,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const hasReviews = reviews.length > 0;

  return (
    <div className="space-y-5">
      {/* Sažetak ocena */}
      <div className="glass border border-[#c9a96e]/25 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-start">
          {/* Prosečna ocena */}
          <div className="flex-shrink-0 text-center sm:text-left">
            {stats.count > 0 ? (
              <>
                <div className="text-4xl font-serif-luxury text-[#e8e0d4] leading-none">
                  {formatAvg(stats.avg)}
                </div>
                <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                  <Stars rating={stats.avg} size={14} />
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-[#e8e0d4]/50 font-sans">
                  {stats.count} {recenzijeLabel(stats.count)}
                </div>
              </>
            ) : (
              <div className="text-[11px] uppercase tracking-wider text-[#e8e0d4]/50 font-sans max-w-[10rem]">
                Još nema komentara za ovaj model
              </div>
            )}
          </div>

          {/* Raspodela zvezdica */}
          {stats.count > 0 && (
            <div className="flex-1 w-full space-y-1.5">
              {[5, 4, 3, 2, 1].map((star, idx) => {
                const count = stats.distribution[idx];
                const pct = Math.round((count / stats.count) * 100);
                return (
                  <div key={star} className="flex items-center gap-2 text-[11px] font-sans">
                    <span className="w-3 text-[#e8e0d4]/60 font-mono">{star}</span>
                    <span className="text-[#c9a96e]">★</span>
                    <div className="flex-1 h-1.5 bg-[#0a0a0a] border border-[#e8e0d4]/10 overflow-hidden">
                      <div
                        className="h-full bg-[#c9a96e] transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-6 text-right text-[#e8e0d4]/45 font-mono">{count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CTA za novi komentar */}
        {!isFormOpen && (
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="mt-4 w-full sm:w-auto px-5 py-3.5 min-h-[44px] border border-[#c9a96e]/40 bg-[#0a0a0a] hover:bg-[#c9a96e]/10 text-[#c9a96e] text-[11px] uppercase tracking-[0.2em] font-sans font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <PenLine className="w-3.5 h-3.5" />
            Ostavi komentar i ocenu
          </button>
        )}
      </div>

      {/* Forma za komentar */}
      <AnimatePresence initial={false}>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ReviewForm
              productId={productId}
              onSubmitted={() => {
                onSubmitted();
                // Zadržimo poruku o uspehu sekund-dva pre zatvaranja forme
                setTimeout(() => setIsFormOpen(false), 2600);
              }}
              onCancel={() => setIsFormOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista komentara */}
      {hasReviews ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#a08540] font-sans font-semibold">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#c9a96e]" />
            <span>Iskustva kupaca</span>
          </div>
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      ) : (
        !isFormOpen && (
          <div className="p-6 text-center border border-dashed border-[#e8e0d4]/15 glass-inner">
            <MessageSquareQuote className="w-5 h-5 text-[#c9a96e]/60 mx-auto mb-2" />
            <p className="text-xs text-[#e8e0d4]/60 font-sans leading-relaxed">
              Budite prvi koji će podeliti iskustvo sa ovim modelom.
              <br />
              Vaša pomoć drugim damama da odaberu pravu veličinu i kroj.
            </p>
          </div>
        )
      )}
    </div>
  );
};
