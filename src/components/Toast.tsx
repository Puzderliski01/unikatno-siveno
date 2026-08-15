import React from 'react';
import { CheckCircle2, Heart, ShoppingBag, Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'booking' | 'info';
  title: string;
  description: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none font-sans">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto bg-[#FCFBF7] border border-[#1A1A1A]/20 text-[#1A1A1A] p-4 shadow-2xl flex items-start gap-3"
          >
            <div className="p-2 bg-[#F4F2EC] border border-[#C5A059]/40 text-[#8C6D23] flex-shrink-0">
              {toast.type === 'cart' && <ShoppingBag className="w-5 h-5" />}
              {toast.type === 'wishlist' && <Heart className="w-5 h-5 fill-[#C5A059] text-[#C5A059]" />}
              {toast.type === 'booking' && <Calendar className="w-5 h-5" />}
              {toast.type === 'info' && <CheckCircle2 className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold tracking-wide text-[#1A1A1A] font-serif-luxury">{toast.title}</h4>
              <p className="text-xs text-[#1A1A1A]/70 mt-0.5 leading-relaxed">{toast.description}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-[#1A1A1A]/40 hover:text-black p-1 transition-colors"
              aria-label="Zatvori obaveštenje"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
