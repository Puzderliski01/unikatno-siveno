import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface HangingLetterProps {
  char: string;
  index: number;
  totalChars: number;
  delay: number;
  mouseX: number;
  isHovered: boolean;
}

const HangingLetter: React.FC<HangingLetterProps> = React.memo(({
  char,
  index,
  delay,
  mouseX,
  isHovered,
}) => {
  const baseAngle = useMotionValue(0);
  const springAngle = useSpring(baseAngle, {
    stiffness: 120,
    damping: 12,
    mass: 0.8,
  });

  const yOffset = useTransform(springAngle, [-15, 0, 15], [-2, 0, 2]);

  useEffect(() => {
    if (char === ' ') return;
    // Staggered initial swing
    const timer = setTimeout(() => {
      baseAngle.set(8 - Math.random() * 16);
      setTimeout(() => baseAngle.set(0), 600);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, char, baseAngle]);

  useEffect(() => {
    if (isHovered && char !== ' ') {
      // Subtle reaction to cursor proximity
      baseAngle.set((mouseX - 0.5) * 12);
    }
  }, [isHovered, mouseX, char, baseAngle]);

  if (char === ' ') {
    return <span className="inline-block w-[0.3em]" />;
  }

  return (
    <span className="inline-block relative" style={{ transformOrigin: 'top center' }}>
      {/* Cord from top */}
      <span
        className="absolute left-1/2 -translate-x-1/2 -top-3 w-px h-3 bg-gradient-to-b from-[#c9a96e]/0 via-[#c9a96e]/30 to-[#c9a96e]/50"
      />
      {/* The letter */}
      <motion.span
        className="inline-block origin-top"
        style={{
          rotate: springAngle,
          y: yOffset,
        }}
      >
        {char}
      </motion.span>
    </span>
  );
});

interface HangingLettersProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
}

export const HangingLetters: React.FC<HangingLettersProps> = ({
  text,
  className = '',
  tag: Tag = 'h1',
  delay = 200,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseX, setMouseX] = useState(0.5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    setMouseX(Math.max(0, Math.min(1, x)));
  };

  const chars = text.split('');
  let charIndex = 0;

  return (
    <Tag
      ref={containerRef as any}
      className={`${className} cursor-default`}
      aria-label={text}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMouseX(0.5); }}
    >
      {chars.map((char, i) => {
        const currentIndex = charIndex;
        charIndex++;
        return (
          <span key={i} className="inline-block" style={{ opacity: isVisible ? 1 : 0 }}>
            <HangingLetter
              char={char}
              index={currentIndex}
              totalChars={chars.length}
              delay={isVisible ? delay + currentIndex * 45 : 0}
              mouseX={mouseX}
              isHovered={isHovered}
            />
          </span>
        );
      })}
    </Tag>
  );
};
