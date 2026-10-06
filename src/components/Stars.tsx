import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarsProps {
  rating: number;
  size?: number;
  className?: string;
}

/**
 * Prikaz zvezdica sa delimičnim poljem (npr. 4,3 → tri pune i jedna delimična).
 * Koristi se na karticama proizvoda, u modalu detalja i u utiscima.
 */
export const Stars: React.FC<StarsProps> = ({ rating, size = 14, className = '' }) => {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  const starStyle = { width: size, height: size };

  return (
    <span
      role="img"
      aria-label={`Ocena ${rating.toFixed(1)} od 5`}
      className={`relative inline-flex leading-none ${className}`}
    >
      <span className="flex gap-[2px] opacity-25" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} style={starStyle} className="text-[#c9a96e]" />
        ))}
      </span>
      <span
        className="absolute left-0 top-0 h-full overflow-hidden"
        style={{ width: `${pct}%` }}
        aria-hidden="true"
      >
        <span className="flex gap-[2px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              style={starStyle}
              className="shrink-0 text-[#c9a96e] fill-[#c9a96e]"
            />
          ))}
        </span>
      </span>
    </span>
  );
};

interface StarInputProps {
  value: number;
  onChange: (value: number) => void;
  size?: number;
  id?: string;
}

/** Interaktivni birač ocene (1–5 zvezdica). */
export const StarInput: React.FC<StarInputProps> = ({ value, onChange, size = 26, id }) => {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;
  const starStyle = { width: size, height: size };

  return (
    <div
      id={id}
      role="radiogroup"
      aria-label="Vaša ocena"
      className="flex items-center gap-1"
      onMouseLeave={() => setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} ${n === 1 ? 'zvezdica' : 'zvezdica'}`}
          onMouseEnter={() => setHovered(n)}
          onFocus={() => setHovered(n)}
          onBlur={() => setHovered(0)}
          onClick={() => onChange(n)}
          className="p-0.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a96e]"
        >
          <Star
            style={starStyle}
            className={
              n <= active
                ? 'text-[#c9a96e] fill-[#c9a96e]'
                : 'text-[#e8e0d4]/30'
            }
          />
        </button>
      ))}
      <span className="ml-2 text-[11px] text-[#e8e0d4]/60 font-sans">
        {active ? `${active}/5` : 'Ocena'}
      </span>
    </div>
  );
};
