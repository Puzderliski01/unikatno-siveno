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

export const ToastContainer: React.FC<ToastProps> = React.memo(({ toasts, onDismiss }) => {
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
            className="pointer-events-auto bg-[#111111] border border-[#c9a96e]/20 text-[#e8e0d4] p-4 shadow-2xl flex items-start gap-3"
          >
            <div className="p-2 bg-[#0a0a0a] border border-[#c9a96e]/40 text-[#c9a96e] flex-shrink-0">
              {toast.type === 'cart' && <ShoppingBag className="w-5 h-5" />}
              {toast.type === 'wishlist' && <Heart className="w-5 h-5 fill-[#c9a96e] text-[#c9a96e]" />}
              {toast.type === 'booking' && <Calendar className="w-5 h-5" />}
              {toast.type === 'info' && <CheckCircle2 className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold tracking-wide text-[#e8e0d4] font-serif-luxury">{toast.title}</h4>
              <p className="text-xs text-[#e8e0d4]/70 mt-0.5 leading-relaxed">{toast.description}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-[#e8e0d4]/40 hover:text-[#e8e0d4] p-1 transition-colors"
              aria-label="Zatvori obaveštenje"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});
