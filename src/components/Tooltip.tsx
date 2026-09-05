import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  label: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ children, label, placement = 'top' }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      const updatePosition = () => {
        const rect = tooltipRef.current.getBoundingClientRect();
        let top, left;
        if (placement === 'top') {
          top = rect.top - tooltipRef.current.offsetHeight - 8;
          left = rect.left + rect.width / 2 - tooltipRef.current.offsetWidth / 2;
        } else if (placement === 'bottom') {
          top = rect.bottom + 8;
          left = rect.left + rect.width / 2 - tooltipRef.current.offsetWidth / 2;
        } else if (placement === 'left') {
          top = rect.top + rect.height / 2 - tooltipRef.current.offsetHeight / 2;
          left = rect.left - tooltipRef.current.offsetWidth - 8;
        } else if (placement === 'right') {
          top = rect.top + rect.height / 2 - tooltipRef.current.offsetHeight / 2;
          left = rect.right + 8;
        }
        tooltipRef.current.style.top = `${top + window.scrollY}px`;
        tooltipRef.current.style.left = `${left + window.scrollX}px`;
        tooltipRef.current.classList.add('show');
      };

      updatePosition();
      const handleMouseMove = (e: MouseEvent) => updatePosition();
      document.addEventListener('mousemove', handleMouseMove);
      tooltipRef.current._handleMouseMove = handleMouseMove;

      return () => {
        document.removeEventListener('mousemove', tooltipRef.current._handleMouseMove);
        tooltipRef.current.classList.remove('show');
      };
    }
  }, [showTooltip, placement]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      ref={tooltipRef}
    >
      {children}
      {showTooltip && (
        <div
          className={`luxury-tooltip luxury-tooltip-${placement}`}
          role="tooltip"
        >
          {label}
        </div>
      )}
    </div>
  );
};