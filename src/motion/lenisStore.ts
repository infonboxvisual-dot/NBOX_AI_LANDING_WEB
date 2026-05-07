import type Lenis from 'lenis';

let currentLenis: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  currentLenis = lenis;
  (window as unknown as { __lenis?: Lenis | null }).__lenis = lenis;
}

export function getLenis(): Lenis | null {
  return currentLenis;
}

