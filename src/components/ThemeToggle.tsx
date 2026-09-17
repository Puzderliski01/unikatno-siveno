import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = React.memo(({ theme, onToggle }) => {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className={`fixed top-20 right-4 lg:top-24 lg:right-8 z-40 p-2.5 backdrop-blur-md transition-all shadow-lg ${
        theme === 'dark'
          ? 'bg-[#111111]/90 border border-[#c9a96e]/30 text-[#c9a96e] hover:bg-[#1a1a1a]'
          : 'bg-white/90 border border-[#8b7346]/30 text-[#8b7346] hover:bg-[#f5f0e8]'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={theme === 'dark' ? 'Pređi na svetlu temu' : 'Pređi na tamnu temu'}
      aria-label="Promeni temu"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </motion.button>
  );
});
