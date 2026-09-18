import { useEffect, useRef, useCallback } from 'react';

/**
 * Tracks scroll velocity and sets --swing CSS variable on root.
 * Elements can use var(--swing) in transform for scroll-reactive sway.
 */
export const useScrollSwing = () => {
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const velocity = useRef(0);
  const rafId = useRef<number>(0);

  const update = useCallback(() => {
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      const dy = window.scrollY - lastScrollY.current;
      // Smooth velocity (exponential moving average)
      velocity.current = velocity.current * 0.85 + (dy / dt) * 15 * 0.15;
    }
    lastScrollY.current = window.scrollY;
    lastTime.current = now;

    // Clamp swing between -8 and 8 degrees
    const swing = Math.max(-8, Math.min(8, velocity.current));
    document.documentElement.style.setProperty('--swing', `${swing}deg`);
    document.documentElement.style.setProperty('--swing-abs', `${Math.abs(swing)}`);

    rafId.current = requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId.current);
  }, [update]);
};
