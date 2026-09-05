import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  label: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ children, label, placement = 'top' }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showTooltip && tooltipRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;

      let top = 0;
      let left = 0;

      if (placement === 'top') {
        top = triggerRect.top + window.scrollY - tooltipEl.offsetHeight - 8;
        left = triggerRect.left + window.scrollX + triggerRect.width / 2 - tooltipEl.offsetWidth / 2;
      } else if (placement === 'bottom') {
        top = triggerRect.bottom + window.scrollY + 8;
        left = triggerRect.left + window.scrollX + triggerRect.width / 2 - tooltipEl.offsetWidth / 2;
      } else if (placement === 'left') {
        top = triggerRect.top + window.scrollY + triggerRect.height / 2 - tooltipEl.offsetHeight / 2;
        left = triggerRect.left + window.scrollX - tooltipEl.offsetWidth - 8;
      } else if (placement === 'right') {
        top = triggerRect.top + window.scrollY + triggerRect.height / 2 - tooltipEl.offsetHeight / 2;
        left = triggerRect.right + window.scrollX + 8;
      }

      tooltipEl.style.top = `${top}px`;
      tooltipEl.style.left = `${left}px`;
      tooltipEl.classList.add('show');
    }

    return () => {
      if (tooltipRef.current) {
        tooltipRef.current.classList.remove('show');
      }
    };
  }, [showTooltip, placement]);

  return (
    <>
      <div
        ref={triggerRef}
        className="contents"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <div
          ref={tooltipRef}
          className="luxury-tooltip luxury-tooltip-${placement}"
          role="tooltip"
        >
          {label}
        </div>
      )}
    </>
  );
};
