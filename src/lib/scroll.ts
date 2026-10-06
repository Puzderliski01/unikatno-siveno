/**
 * Pomoćne funkcije za skrolovanje do sekcija.
 *
 * Na telefonu je iznad sadržaja lepljivi gornji trak sa logotipom (`.liquid-glass`),
 * pa običan `scrollIntoView` sakrije naslov sekcje ispod njega. Ovde uvek merimo
 * stvarnu visinu vidljivog traka i ostavljamo malo vazduha.
 */

/** Visina vidljivog gornjeg traka (+ mali razmak). */
export const getHeaderOffset = (): number => {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>('header, .liquid-glass'));
  const visible = candidates.find((el) => el.offsetHeight > 0);
  return (visible?.offsetHeight ?? 0) + 8;
};

/** Glatko skroluje do sekcije tako da njen vrh ostane ispod gornjeg traka. */
export const scrollToSection = (id: string): void => {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
  window.scrollTo({ top, behavior: 'smooth' });
};
