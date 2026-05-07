import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { setLenis } from './lenisStore';

const CURSOR_ID = 'orchestrated-cursor';

function shouldDisableSmoothScroll(): boolean {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)')?.matches ?? false;
  const narrowViewport = window.matchMedia('(max-width: 768px)')?.matches ?? false;
  return reducedMotion || coarsePointer || narrowViewport;
}

export function initMotionCore(): () => void {
  // Force system cursor mode and remove any legacy orchestrated cursor artifacts.
  document.documentElement.classList.remove('has-orchestrated-cursor');
  document.getElementById(CURSOR_ID)?.remove();

  gsap.registerPlugin(ScrollTrigger);

  let lenis: Lenis | null = null;
  let lenisEnabled = false;
  const onGsapTick = (time: number) => {
    // GSAP ticker provides seconds; Lenis expects milliseconds.
    lenis?.raf(time * 1000);
  };

  const enableLenis = () => {
    if (lenisEnabled) return;
    lenisEnabled = true;
    lenis = new Lenis({
      duration: 1.15,
      lerp: 0.065,
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.1,
      syncTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Keep one timing source for both scroll smoothing and GSAP timelines.
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(onGsapTick);
    setLenis(lenis);
  };

  const disableLenis = () => {
    if (!lenisEnabled) return;
    lenisEnabled = false;
    gsap.ticker.remove(onGsapTick);
    lenis?.destroy();
    lenis = null;
    setLenis(null);
    // Lenis can leave classes/inline styles that break sticky positioning.
    document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-scrolling', 'lenis-stopped');
    document.body.classList.remove('lenis', 'lenis-smooth', 'lenis-scrolling', 'lenis-stopped');
    document.documentElement.removeAttribute('data-lenis-prevent');
    document.body.removeAttribute('data-lenis-prevent');
    document.documentElement.style.removeProperty('overflow');
    document.body.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('height');
    document.body.style.removeProperty('height');
    // Ensure ScrollTrigger recalculates positions after switching scroll mode.
    ScrollTrigger.refresh();
  };

  const syncLenisState = () => {
    if (shouldDisableSmoothScroll()) {
      disableLenis();
    } else {
      enableLenis();
    }
    ScrollTrigger.refresh();
  };

  // Initial state.
  syncLenisState();

  const onResize = () => {
    syncLenisState();
  };

  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', onResize, { passive: true });

  return () => {
    window.removeEventListener('resize', onResize);
    window.removeEventListener('orientationchange', onResize);

    disableLenis();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}
