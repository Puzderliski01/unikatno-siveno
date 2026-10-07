import React from 'react';
import LiquidGlass from 'liquid-glass-react';
import { useTheme } from '../hooks/useTheme';

/**
 * GlassLayer — tanki „liquid glass" sloj (liquid-glass-react) koji se postavlja
 * IZA sadržaja bilo kog host elementa.
 *
 * Kako radi:
 *  - sloj je `absolute inset-0 -z-10` → popunjava host, a zbog negativnog
 *    z-index-a crta se IZNAD host pozadine, a ISPOD host sadržaja (zato host
 *    mora biti stacking context: `isolate` klasa ili postojeći z-index);
 *  - biblioteka unutar sloja renderuje SVG filter (feDisplacementMap) koji
 *    prelama pozadinu + ivični sjaj (specular ring) + „tečnu" elastic reakciju
 *    na miš;
 *  - tintu, mutnoću i senku ostavljamo host klasi (.liquid-glass, .glass,
 *    .glass-chip, .glass-strong, .mobile-bottom-nav...) — vidi .lg-layer u
 *    index.css — tako da izgled ostaje isti kao pre, a dodaje se prelamanje.
 *
 * Napomena: Safari i Firefox ne prikazuju displacement (renderer ne podržava
 * url() u filter-u na isti način) — tada ostaje postojeći glass izgled iz CSS-a.
 */
interface GlassLayerProps {
  /** Zaobljenje prelamanja — mora da prati radijus hosta (oštri uglovi = 0). */
  cornerRadius?: number;
  /** Jačina prelamanja pozadine na ivicama. */
  displacementScale?: number;
  /** Elastičnost („tečni" odgovor na miš). 0 = statično. */
  elasticity?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  /** Element čije se kretanje miša prati (npr. ref navigacije) za elastic efekat. */
  mouseContainer?: React.RefObject<HTMLElement | null> | null;
  /** Svetla podloga ispod stakla; podrazumevano prati aktivnu temu. */
  overLight?: boolean;
  className?: string;
}

export const GlassLayer: React.FC<GlassLayerProps> = ({
  cornerRadius = 0,
  displacementScale = 40,
  elasticity = 0,
  blurAmount = 0.0625,
  saturation = 140,
  aberrationIntensity = 2,
  mouseContainer = null,
  overLight,
  className = '',
}) => {
  const { theme } = useTheme();
  const isLight = overLight ?? theme === 'light';
  const layerRef = React.useRef<HTMLDivElement | null>(null);

  // Biblioteka meri svoju veličinu (glassSize) samo na mount-u i na window
  // resize — a na mount-u često meri pre nego što je host postavljen (npr.
  // pre nego što loading screen nestane), pa ostanu default 270x69 i
  // dekorativni overlay-i (sjaj/senke) ne popune ploču. Re-dispatch resize-a
  // nakon mount-a, na ResizeObserver (promene border-box-a) i na periodično
  // proveravanje getBoundingClientRect (hvata i transformacije, npr.
  // scale-in animacije, na koje ResizeObserver ne reaguje) ispravlja to.
  React.useEffect(() => {
    const el = layerRef.current;
    if (!el) return;

    let last = { w: -1, h: -1 };
    let raf = 0;

    const check = () => {
      cancelAnimationFrame(raf);
      // sačekaj sledeći frame da se layout/transform stabilizuje
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const w = Math.round(r.width);
        const h = Math.round(r.height);
        if (w !== last.w || h !== last.h) {
          last = { w, h };
          window.dispatchEvent(new Event('resize'));
        }
      });
    };

    const raf1 = requestAnimationFrame(check);
    const t1 = window.setTimeout(check, 300);
    const t2 = window.setTimeout(check, 1200);
    const interval = window.setInterval(check, 300);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(check);
      ro.observe(el);
    }

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearInterval(interval);
      ro?.disconnect();
    };
  }, []);

  return (
    <div ref={layerRef} className={`lg-host absolute inset-0 -z-10 ${className}`} aria-hidden="true">
      <LiquidGlass
        className="lg-layer"
        style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%' }}
        padding="0"
        cornerRadius={cornerRadius}
        displacementScale={displacementScale}
        blurAmount={blurAmount}
        saturation={saturation}
        aberrationIntensity={aberrationIntensity}
        elasticity={elasticity}
        overLight={isLight}
        mode="standard"
        mouseContainer={mouseContainer}
      >
        {null}
      </LiquidGlass>
    </div>
  );
};

GlassLayer.displayName = 'GlassLayer';
