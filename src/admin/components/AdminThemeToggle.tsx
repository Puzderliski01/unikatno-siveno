import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface AdminThemeToggleProps {
  className?: string;
}

export const AdminThemeToggle: React.FC<AdminThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2 text-[#e8e0d4]/50 hover:text-[#c9a96e] transition-colors ${className}`}
      title={theme === 'dark' ? 'Pređi na svetlu temu' : 'Pređi na tamnu temu'}
      aria-label="Promeni temu"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};
