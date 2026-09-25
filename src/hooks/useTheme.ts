import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';

let currentTheme: Theme = readStoredTheme();
const listeners = new Set<(theme: Theme) => void>();

function readStoredTheme(): Theme {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore (private mode)
  }
  // Update meta theme-color for mobile browser chrome
  const meta = document.getElementById('theme-color-meta') as HTMLMetaElement | null;
  if (meta) meta.content = theme === 'light' ? '#f5f0e8' : '#0a0a0a';
}

export function setTheme(theme: Theme) {
  if (theme !== currentTheme) {
    currentTheme = theme;
    listeners.forEach((listener) => listener(theme));
  }
  applyTheme(theme);
}

export function toggleTheme() {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

export function useTheme() {
  const [theme, setLocalTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    const listener = (next: Theme) => setLocalTheme(next);
    listeners.add(listener);
    setLocalTheme(currentTheme);
    applyTheme(currentTheme);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return { theme, setTheme, toggleTheme };
}
