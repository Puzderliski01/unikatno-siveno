import React, { useEffect, useRef, useCallback } from 'react';

export const CursorEffects: React.FC = React.memo(() => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const trailDotsRef = useRef<HTMLDivElement[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const trailPositions = useRef<Array<{ x: number; y: number }>>([]);
  const rafRef = useRef<number>(0);

  const createTrailDots = useCallback(() => {
    const container = document.body;
    const dots: HTMLDivElement[] = [];
    for (let i = 0; i < 8; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      dot.style.width = `${Math.max(2, 5 - i * 0.5)}px`;
      dot.style.height = `${Math.max(2, 5 - i * 0.5)}px`;
      container.appendChild(dot);
      dots.push(dot);
      trailPositions.current.push({ x: 0, y: 0 });
    }
    return dots;
  }, []);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Add custom cursor class
    document.body.classList.add('luxury-cursor');

    // Create spotlight
    const spotlight = document.createElement('div');
    spotlight.className = 'cursor-spotlight';
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    // Create trail dots
    const dots = createTrailDots();
    trailDotsRef.current = dots;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const { x, y } = mousePos.current;

      // Update spotlight
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${x}px`;
        spotlightRef.current.style.top = `${y}px`;
      }

      // Update trail with delay effect
      trailPositions.current[0] = { x, y };
      for (let i = 1; i < trailPositions.current.length; i++) {
        const prev = trailPositions.current[i - 1];
        const curr = trailPositions.current[i];
        const ease = 0.35 - i * 0.02;
        curr.x += (prev.x - curr.x) * ease;
        curr.y += (prev.y - curr.y) * ease;
      }

      trailDotsRef.current.forEach((dot, i) => {
        const pos = trailPositions.current[i];
        if (pos) {
          dot.style.transform = `translate(${pos.x - 2}px, ${pos.y - 2}px)`;
          dot.style.opacity = `${0.4 - i * 0.05}`;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
      document.body.classList.remove('luxury-cursor');
      if (spotlight.parentNode) spotlight.parentNode.removeChild(spotlight);
      dots.forEach((d) => { if (d.parentNode) d.parentNode.removeChild(d); });
    };
  }, [createTrailDots]);

  return null;
});
