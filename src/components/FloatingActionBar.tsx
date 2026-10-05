import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Instagram, X, Plus, Sun, Moon } from 'lucide-react';

interface FloatingActionBarProps {
  onWhatsApp: () => void;
  onInstagram: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = React.memo(({
  onWhatsApp,
  onInstagram,
  theme,
  onToggleTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fab-container">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              transition={{ delay: 0.15, duration: 0.25 }}
              type="button"
              onClick={onToggleTheme}
              className="fab-action"
              title={theme === 'dark' ? 'Svetla tema' : 'Tamna tema'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              transition={{ delay: 0.1, duration: 0.25 }}
              type="button"
              onClick={() => { onInstagram(); setIsOpen(false); }}
              className="fab-action"
              title="Instagram DM"
            >
              <Instagram className="w-4 h-4" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              transition={{ delay: 0.05, duration: 0.25 }}
              type="button"
              onClick={() => { onWhatsApp(); setIsOpen(false); }}
              className="fab-action"
              title="WhatsApp poruka"
            >
              <MessageCircle className="w-4 h-4" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fab-main"
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        title="Brze akcije"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </motion.button>
    </div>
  );
});
