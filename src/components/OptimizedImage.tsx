import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  sizes?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
  priority = false,
  sizes
}) => {
  // Generate WebP and AVIF URLs by replacing extension
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const avifSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.avif');

  return (
    <picture>
      {/* AVIF source (best compression) */}
      <source
        srcSet={avifSrc}
        type="image/avif"
        priority={priority}
      />
      {/* WebP source (good compression) */}
      <source
        srcSet={webpSrc}
        type="image/webp"
        priority={priority}
      />
      {/* Fallback to original format */}
      <source
        srcSet={src}
        type={`image/${src.split('.').pop()}`}
        priority={priority}
      />

      {/* img element for backward compatibility */}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        style={{ willChange: 'transform, opacity' }}
      />
    </picture>
  );
};

// Hook for preloading critical images
export const useImagePreloader = (images: string[]) => {
  React.useEffect(() => {
    images.forEach((src) => {
      // Preload WebP/AVIF versions if they exist
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      const avifSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.avif');

      [src, webpSrc, avifSrc].forEach((url) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
      });
    });
  }, [images]);
};

export default OptimizedImage;