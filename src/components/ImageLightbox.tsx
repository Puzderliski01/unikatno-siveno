import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSwipe } from '../hooks/useSwipe';
import { Img } from './Img';
import { webpSrc } from '../lib/image';

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

const MIN_SCALE = 1;
const DEFAULT_MAX_SCALE = 3;
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

/**
 * Puni zoom prikaz:
 *   • točak miša → uvećanje tačno pod kursorom
 *   • prevlačenje mišem / prstom → pomeranje po uvećanoj slici
 *   • dvoklik → uvećanje 2,5× / nazad na 100%
 *   • + / − / 0 na tastaturi, kao i dugmad za preciznu kontrolu
 *   • gornja granica je realna rezolucija slike (da ne bude mutno)
 */
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
  const [scale, setScale] = useState(1);
  // Da li uređaj ima dodir (nema miša) — menja tekst uputa i očekivanja za zoom
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const scaleRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });
  const maxScaleRef = useRef(DEFAULT_MAX_SCALE);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const sync = useCallback((nextScale: number, nextOffset: { x: number; y: number }) => {
    scaleRef.current = nextScale;
    offsetRef.current = nextOffset;
    setScale(nextScale);
    setOffset(nextOffset);
  }, []);

  const resetZoom = useCallback(() => {
    sync(1, { x: 0, y: 0 });
  }, [sync]);

  /** Granica pomeranja — slika ne sme da "otkliza" iz kadra. */
  const clampOffset = useCallback((t: { x: number; y: number }, targetScale: number) => {
    const stage = stageRef.current;
    const img = imgRef.current;
    if (!stage || !img) return t;
    const rect = img.getBoundingClientRect();
    const current = scaleRef.current || 1;
    const baseW = rect.width / current;
    const baseH = rect.height / current;
    const maxX = Math.max(0, (baseW * targetScale - stage.clientWidth) / 2);
    const maxY = Math.max(0, (baseH * targetScale - stage.clientHeight) / 2);
    return {
      x: clamp(t.x, -maxX, maxX),
      y: clamp(t.y, -maxY, maxY),
    };
  }, []);

  /**
   * Uvećanje oko tačke `u` (koordinata u odnosu na centar bine).
   * Zadržava tačku pod kursorom na istom mestu na ekranu.
   */
  const zoomAt = useCallback(
    (nextScale: number, ux: number, uy: number) => {
      const current = scaleRef.current;
      const target = clamp(nextScale, MIN_SCALE, maxScaleRef.current);
      if (target <= MIN_SCALE) {
        sync(1, { x: 0, y: 0 });
        return;
      }
      const factor = 1 - target / current;
      const t = offsetRef.current;
      const moved = {
        x: t.x + (ux - t.x) * factor,
        y: t.y + (uy - t.y) * factor,
      };
      sync(target, clampOffset(moved, target));
    },
    [clampOffset, sync]
  );

  const zoomFromCenter = useCallback(
    (factor: number) => {
      zoomAt(scaleRef.current * factor, 0, 0);
    },
    [zoomAt]
  );

  // --- Native wheel listener (mora passive:false da bi sprečio skrol stranice)
  useEffect(() => {
    if (!isOpen) return;
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = stage.getBoundingClientRect();
      const ux = e.clientX - (rect.left + rect.width / 2);
      const uy = e.clientY - (rect.top + rect.height / 2);
      const factor = Math.exp(-e.deltaY * 0.0018);
      zoomAt(scaleRef.current * factor, ux, uy);
    };

    stage.addEventListener('wheel', handleWheel, { passive: false });
    return () => stage.removeEventListener('wheel', handleWheel);
  }, [isOpen, zoomAt]);

  // --- Native touch listeners: prevlačenje (pan) i pinch zoom
  useEffect(() => {
    if (!isOpen) return;
    const stage = stageRef.current;
    if (!stage) return;

    let panStart: { x: number; y: number; ox: number; oy: number } | null = null;
    let pinchStart: {
      dist: number;
      scale: number;
      ux: number;
      uy: number;
      ox: number;
      oy: number;
    } | null = null;

    const dist2 = (t: TouchList) => {
      const dx = t[0].clientX - t[1].clientX;
      const dy = t[0].clientY - t[1].clientY;
      return Math.hypot(dx, dy);
    };

    const centerOf = (t: TouchList) => ({
      x: (t[0].clientX + t[1].clientX) / 2,
      y: (t[0].clientY + t[1].clientY) / 2,
    });

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        panStart = null;
        const rect = stage.getBoundingClientRect();
        const mid = centerOf(e.touches);
        pinchStart = {
          dist: dist2(e.touches) || 1,
          scale: scaleRef.current,
          ux: mid.x - (rect.left + rect.width / 2),
          uy: mid.y - (rect.top + rect.height / 2),
          ox: offsetRef.current.x,
          oy: offsetRef.current.y,
        };
      } else if (e.touches.length === 1 && scaleRef.current > 1) {
        pinchStart = null;
        panStart = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          ox: offsetRef.current.x,
          oy: offsetRef.current.y,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchStart) {
        e.preventDefault();
        const ns = clamp(
          pinchStart.scale * ((dist2(e.touches) || 1) / pinchStart.dist),
          MIN_SCALE,
          maxScaleRef.current
        );
        const factor = 1 - ns / (pinchStart.scale || 1);
        const moved = {
          x: pinchStart.ox + (pinchStart.ux - pinchStart.ox) * factor,
          y: pinchStart.oy + (pinchStart.uy - pinchStart.oy) * factor,
        };
        if (ns <= MIN_SCALE) sync(1, { x: 0, y: 0 });
        else sync(ns, clampOffset(moved, ns));
        return;
      }

      if (e.touches.length === 1 && panStart && scaleRef.current > 1) {
        e.preventDefault();
        const t = e.touches[0];
        const next = {
          x: panStart.ox + (t.clientX - panStart.x),
          y: panStart.oy + (t.clientY - panStart.y),
        };
        sync(scaleRef.current, clampOffset(next, scaleRef.current));
      }
    };

    const onTouchEnd = () => {
      pinchStart = null;
      panStart = null;
    };

    stage.addEventListener('touchstart', onTouchStart, { passive: true });
    stage.addEventListener('touchmove', onTouchMove, { passive: false });
    stage.addEventListener('touchend', onTouchEnd, { passive: true });
    stage.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      stage.removeEventListener('touchstart', onTouchStart);
      stage.removeEventListener('touchmove', onTouchMove);
      stage.removeEventListener('touchend', onTouchEnd);
      stage.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [isOpen, clampOffset, sync]);

  // --- Tastatura: Escape, strelice, + / − / 0
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        zoomFromCenter(1.4);
      }
      if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        zoomFromCenter(1 / 1.4);
      }
      if (e.key === '0') {
        e.preventDefault();
        resetZoom();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNext, onPrev, onClose, zoomFromCenter, resetZoom]);

  // Zaključaj skrol stranice dok je lightbox otvoren
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = document.getElementById('product-detail-modal') ? 'hidden' : '';
    };
  }, [isOpen]);

  // Reset zuma pri promeni slike
  useEffect(() => {
    resetZoom();
    setIsDragging(false);
    dragRef.current = null;
  }, [currentIndex, isOpen, resetZoom]);

  // Swipe gest (samo na 100% — dok je uvećano, prevlačenje pomerа sliku)
  const swipeHandlers = useSwipe({
    onSwipeLeft: onNext,
    onSwipeRight: onPrev,
    threshold: 50,
  });

  const handleImgLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const current = scaleRef.current || 1;
    const rendered = rect.width / current;
    if (rendered <= 0) return;
    // Dozvoljeno do realne rezolucije, minimum 2×, maksimum 4×
    maxScaleRef.current = clamp(img.naturalWidth / rendered, 2, 4);
  };

  // --- Miš: prevlačenje i dvoklik
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scaleRef.current <= 1 || e.button !== 0) return;
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      ox: offsetRef.current.x,
      oy: offsetRef.current.y,
    };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    const next = {
      x: drag.ox + (e.clientX - drag.x),
      y: drag.oy + (e.clientY - drag.y),
    };
    sync(scaleRef.current, clampOffset(next, scaleRef.current));
  };

  const endDrag = () => {
    dragRef.current = null;
    setIsDragging(false);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (scaleRef.current > 1) {
      resetZoom();
      return;
    }
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ux = e.clientX - (rect.left + rect.width / 2);
    const uy = e.clientY - (rect.top + rect.height / 2);
    zoomAt(2.5, ux, uy);
  };

  if (!isOpen || images.length === 0) return null;

  const isZoomed = scale > 1.01;

  return (
    <AnimatePresence>
      <motion.div
        id="image-lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-md p-4 sm:p-8 font-sans select-none"
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
            className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center bg-[#111111]/10 hover:bg-[#c9a96e] text-[#e8e0d4] hover:text-[#e8e0d4] transition-colors duration-200"
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

        {/* Main image stage */}
        <div
          ref={stageRef}
          className="relative max-w-5xl w-full max-h-[74vh] flex items-center justify-center overflow-hidden touch-pan-y"
          style={{
            cursor: isDragging ? 'grabbing' : isZoomed ? 'grab' : 'zoom-in',
            touchAction: isZoomed ? 'none' : undefined,
          }}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onDoubleClick={handleDoubleClick}
          {...(scale === 1 ? swipeHandlers : {})}
        >
          <div
            className="will-change-transform"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
              transition: isDragging ? 'none' : 'transform 0.18s ease-out',
            }}
          >
            <motion.img
              key={currentIndex}
              ref={imgRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={webpSrc(images[currentIndex])}
              alt={`${altText} - uvećana fotografija ${currentIndex + 1}`}
              onLoad={handleImgLoad}
              draggable={false}
              className="max-h-[68vh] w-auto max-w-full object-contain shadow-2xl border border-[#e8e0d4]/30 bg-[#111111]"
            />
          </div>

          {/* Indicator uvećanja */}
          {isZoomed && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-[#111111]/90 text-[11px] font-mono text-[#c9a96e] border border-[#c9a96e]/40 pointer-events-none">
              {Math.round(scale * 100)}%
            </div>
          )}
        </div>

        {/* Zoom controls */}
        <div
          className="mt-4 flex items-center gap-1 bg-[#111111]/90 border border-[#c9a96e]/30 p-1"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => zoomFromCenter(1 / 1.4)}
            disabled={scale <= 1.01}
            className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#e8e0d4] hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-colors disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-[#e8e0d4]"
            aria-label="Umanji"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="px-2 text-[11px] font-mono text-[#e8e0d4] min-w-[3.2rem] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => zoomFromCenter(1.4)}
            disabled={scale >= maxScaleRef.current - 0.01}
            className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#e8e0d4] hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-colors disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-[#e8e0d4]"
            aria-label="Uvećaj"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-[#c9a96e]/25 mx-1" />
          <button
            type="button"
            onClick={resetZoom}
            disabled={scale <= 1.01}
            className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#e8e0d4] hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-colors disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-[#e8e0d4]"
            aria-label="Vrati na 100%"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Thumbnail row */}
        {images.length > 1 && (
          <div
            className="mt-5 flex items-center gap-3 max-w-full overflow-x-auto p-2"
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
                <Img src={img} alt={`Sličica ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Hint — prilagođen dodiru ili mišu */}
        <div className="mt-3 text-center text-[11px] uppercase tracking-[0.15em] text-[#e8e0d4]/55 px-4">
          {isTouchDevice
            ? 'Širite prstima za uvećanje · pomerajte prstom po slici'
            : 'Točak miša ili +/− za zoom · prevucite za pomeranje · dvoklik za 100%'}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
