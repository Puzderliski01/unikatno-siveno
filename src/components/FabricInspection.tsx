import React, { useState } from 'react';
import { X, ZoomIn, Zap, Ruler, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tooltip } from './Tooltip';

interface FabricInspectionProps {
  productImage: string;
  fabricDetails: {
    weaveType: string;
    threadCount: string;
    materialFeel: string;
    lightReflection: string;
    durability: string;
    careNotes: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export const FabricInspection: React.FC<FabricInspectionProps> = ({
  productImage,
  fabricDetails,
  isOpen,
  onClose
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - lastPosition.x,
        y: e.clientY - lastPosition.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setIsZooming(true);
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoomLevel(prev => Math.min(Math.max(prev + delta, 0.5), 5));
    setTimeout(() => setIsZooming(false), 150);
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  if (!isOpen) return null;

  return (
    <div
      id="fabric-inspection-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl h-[90vh] bg-[#0a0a0a] border border-[#c9a96e]/20 flex flex-col overflow-hidden text-[#e8e0d4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c9a96e]/10 bg-[#111111]">
          <h2 className="font-serif-luxury text-xl font-light text-[#e8e0d4]">
            Mikroskop Pregled Tkanine
          </h2>
          <div className="flex items-center gap-2">
            <Tooltip placement="bottom" label="Ponovo centrova">
              <button
                type="button"
                onClick={handleResetView}
                className="p-2 hover:bg-[#c9a96e]/10 text-[#c9a96e] transition-colors"
              >
                <Ruler className="w-4 h-4" />
              </button>
            </Tooltip>
            <Tooltip placement="bottom" label="Zatvori">
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-[#c9a96e]/10 text-[#e8e0d4] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col sm:flex-row">
          {/* Image Viewer */}
          <div className={`flex-1 relative bg-[#111111] overflow-hidden perspective-1000 ${isZooming ? 'luxury-hover' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onWheel={handleWheel}
            style={{ touchAction: 'none' }}
          >
            <div className="absolute inset-0 studio-light-overlay"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
                transformOrigin: 'top left',
                willChange: 'transform'
              }}
            >
              <img
                src={productImage}
                alt="Fabric detail inspection"
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
              />

              {/* Zoom indicator */}
              <div className="absolute top-3 right-3 px-2 py-1 bg-[#0a0a0a]/80 text-[9px] font-mono text-[#c9a96e] border border-[#c9a96e]/30">
                {Math.round(zoomLevel * 100)}x zoom
              </div>

              {/* Crosshair for precision */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#c9a96e]/50" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#c9a96e]/50" />
              </div>
            </div>
          </div>

          {/* Fabric Details Panel */}
          <div className="w-full sm:w-64 bg-[#111111] border-t sm:border-t-0 sm:border-l border-[#c9a96e]/20 px-4 py-4 overflow-y-auto max-h-[40vh] sm:max-h-none">
            <div className="space-y-4">
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[#c9a96e] font-sans font-semibold mb-2">
                  Svojstva tkanine
                </h3>
                <div className="space-y-2 text-xs text-[#e8e0d4]/80 font-sans">
                  <div className="flex items-start">
                    <Zap className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#c9a96e]" />
                    <span className="ml-2">Tip kanvasa: {fabricDetails.weaveType}</span>
                  </div>
                  <div className="flex items-start">
                    <Zap className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#c9a96e]" />
                    <span className="ml-2">Broj niти: {fabricDetails.threadCount}</span>
                  </div>
                  <div className="flex items-start">
                    <Ruler className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#c9a96e]" />
                    <span className="ml-2">Osjet na dodir: {fabricDetails.materialFeel}</span>
                  </div>
                  <div className="flex items-start">
                    <ZoomIn className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#c9a96e]" />
                    <span className="ml-2">Otkalibanje svetla: {fabricDetails.lightReflection}</span>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#c9a96e]" />
                    <span className="ml-2">Izdržljivost: {fabricDetails.durability}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[#c9a96e] font-sans font-semibold mb-2">
                  Saveti za nego
                </h3>
                <ul className="space-y-1 text-xs text-[#e8e0d4]/70 font-sans list-disc list-inside">
                  {fabricDetails.careNotes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="px-4 py-2 text-center text-[9px] text-[#e8e0d4]/60 border-t border-[#c9a96e]/10 bg-[#111111]">
          <span>Klikovacite i povucite za pomeranje, roliranje miša za zoom</span>
        </div>
      </motion.div>
    </div>
  );
};