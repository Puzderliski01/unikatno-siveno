import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  staggerDelay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  tag: Tag = 'h2',
  delay = 0,
  staggerDelay = 30,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
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

  const words = text.split(' ');

  return (
    <Tag ref={ref as any} className={`text-reveal-container ${className}`} aria-label={text}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block overflow-hidden mr-[0.3em]">
          {word.split('').map((char, charIdx) => {
            const globalIdx = words.slice(0, wordIdx).join('').length + charIdx;
            return (
              <span
                key={charIdx}
                className={`text-reveal-char ${isVisible ? 'text-reveal-visible' : ''}`}
                style={{
                  animationDelay: isVisible ? `${delay + globalIdx * staggerDelay}ms` : undefined,
                }}
                aria-hidden="true"
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
};
