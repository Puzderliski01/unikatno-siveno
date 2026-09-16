import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  sizes?: string;
  onClick?: () => void;
}

function getImageBase(src: string): { base: string; ext: string } | null {
  const match = src.match(/^(.+)(\.[^.]+)$/);
  if (!match) return null;
  return { base: match[1], ext: match[2] };
}

function getSrcSet(base: string, ext: string, widths: number[]): string {
  // For future CDN: ?w=400&f=webp
  // For now: just returns original with width hints
  return widths
    .map((w) => `${base}${ext} ${w}w`)
    .join(', ');
}

const FORMATS = [
  { type: 'image/avif', ext: '.avif' },
  { type: 'image/webp', ext: '.webp' },
];

const RESPONSIVE_WIDTHS = [320, 480, 640, 800, 1024, 1280];
const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
  priority = false,
  sizes = DEFAULT_SIZES,
  onClick,
}) => {
  const [isInView, setIsInView] = useState(!loading || loading === 'eager');
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (loading === 'eager' || priority) {
      setIsInView(true);
      return;
    }

    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, priority]);

  const imageInfo = getImageBase(src);

  // Generate blur placeholder (dominant color extraction not possible without canvas, use gray)
  const blurPlaceholder = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxMTExMTEiLz48L3N2Zz4=';

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      onClick={onClick}
    >
      {/* Blur placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-[#111111] animate-pulse"
          style={{
            backgroundImage: `url(${blurPlaceholder})`,
            backgroundSize: 'cover',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
      )}

      {isInView && imageInfo ? (
        <picture>
          {/* AVIF source */}
          <source
            type="image/avif"
            srcSet={getSrcSet(imageInfo.base, '.avif', RESPONSIVE_WIDTHS)}
            sizes={sizes}
          />
          {/* WebP source */}
          <source
            type="image/webp"
            srcSet={getSrcSet(imageInfo.base, '.webp', RESPONSIVE_WIDTHS)}
            sizes={sizes}
          />
          {/* Original format fallback */}
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading={loading}
            width={width}
            height={height}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            sizes={sizes}
            srcSet={getSrcSet(imageInfo.base, imageInfo.ext, RESPONSIVE_WIDTHS)}
            onLoad={() => setIsLoaded(true)}
          />
        </picture>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading={loading}
          width={width}
          height={height}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
