import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageLightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  altText: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectIndex: (index: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  altText,
  onClose,
  onNext,
  onPrev,
  onSelectIndex
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNext, onPrev, onClose]);

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="image-lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-md p-4 sm:p-8 font-sans"
        onClick={onClose}
      >
        {/* Top bar controls */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-4 z-10" onClick={e => e.stopPropagation()}>
          <div className="text-xs uppercase tracking-widest text-[#e8e0d4] font-mono px-3 py-1 bg-[#111111]/10 border border-[#c9a96e]/40">
            {currentIndex + 1} / {images.length}
          </div>
          <button
            id="lightbox-close-btn"
            type="button"
            onClick={onClose}
            className="p-2.5 bg-[#111111]/10 hover:bg-[#c9a96e] text-[#e8e0d4] hover:text-[#e8e0d4] transition-colors duration-200"
            aria-label="Zatvori uvećani prikaz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              id="lightbox-prev-btn"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 bg-[#0a0a0a]/60 hover:bg-[#c9a96e] text-[#e8e0d4] hover:text-[#e8e0d4] border border-[#e8e0d4]/20 transition-colors z-10"
              aria-label="Prethodna fotografija"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              id="lightbox-next-btn"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 bg-[#0a0a0a]/60 hover:bg-[#c9a96e] text-[#e8e0d4] hover:text-[#e8e0d4] border border-[#e8e0d4]/20 transition-colors z-10"
              aria-label="Sledeća fotografija"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Main image */}
        <div
          className="relative max-w-5xl max-h-[80vh] flex items-center justify-center overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            src={images[currentIndex]}
            alt={`${altText} - uvećana fotografija ${currentIndex + 1}`}
            className="max-h-[75vh] w-auto object-contain shadow-2xl border border-[#e8e0d4]/30 bg-[#111111]"
          />
        </div>

        {/* Thumbnail row */}
        {images.length > 1 && (
          <div
            className="mt-6 flex items-center gap-3 max-w-full overflow-x-auto p-2"
            onClick={e => e.stopPropagation()}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectIndex(idx)}
                className={`relative w-16 h-20 overflow-hidden flex-shrink-0 border transition-all duration-200 ${
                  idx === currentIndex
                    ? 'border-[#c9a96e] ring-2 ring-[#c9a96e]/60 scale-105 opacity-100'
                    : 'border-[#e8e0d4]/20 opacity-50 hover:opacity-90'
                }`}
              >
                <img src={img} alt={`Sličica ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
