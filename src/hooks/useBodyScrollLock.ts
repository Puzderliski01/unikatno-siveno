import { useEffect } from 'react';

/**
 * Zaključava skrol stranice dok je preklapanje (modal / drawer) otvoreno.
 *
 * Na telefonu je ovo obavezno: dodir i prevlačenje unutar panela inače "prođu"
 * do stranice iza i ona se skroluje (scroll chaining).
 *
 * Radi se preko brojača da više preklapanja istovremeno (npr. modal + njegov
 * pod-modal) ne otključaju pozadinu prerano.
 */
let lockCount = 0;

export const useBodyScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return;

    lockCount += 1;
    if (lockCount === 1) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = '';
      }
    };
  }, [locked]);
};
