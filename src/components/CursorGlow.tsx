import React, { useEffect, useRef } from 'react';

/**
 * A subtle gold light that follows the cursor on glass elements.
 * Attach to the parent container that should have the glow effect.
 */
export const CursorGlow: React.FC<{ parentRef: React.RefObject<HTMLElement | null> }> = ({ parentRef }) => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    const glow = document.createElement('div');
    glow.className = 'absolute pointer-events-none z-[1] rounded-full transition-opacity duration-300 opacity-0';
    glow.style.cssText = `
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      will-change: left, top;
    `;
    parent.style.position = parent.style.position || 'relative';
    parent.appendChild(glow);
    glowRef.current = glow;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      glow.style.opacity = '0';
    };

    parent.addEventListener('mousemove', handleMouseMove, { passive: true });
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      if (glow.parentNode) glow.parentNode.removeChild(glow);
    };
  }, [parentRef]);

  return null;
};
