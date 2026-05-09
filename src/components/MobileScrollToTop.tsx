import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { getLenis } from '../motion/lenisStore';

const SHOW_AFTER_PX = 520;

function readScrollY(): number {
  const lenis = getLenis();
  if (lenis) {
    return lenis.scroll;
  }
  return window.scrollY || document.documentElement.scrollTop || 0;
}

export default function MobileScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let offLenis: (() => void) | undefined;

    const sync = () => {
      setVisible(readScrollY() > SHOW_AFTER_PX);
    };

    const attachLenis = () => {
      offLenis?.();
      offLenis = undefined;
      const lenis = getLenis();
      if (lenis) {
        offLenis = lenis.on('scroll', sync);
      }
      sync();
    };

    sync();
    window.addEventListener('scroll', sync, { passive: true });
    attachLenis();
    window.addEventListener('resize', attachLenis, { passive: true });

    return () => {
      offLenis?.();
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', attachLenis);
    };
  }, []);

  if (!visible) return null;

  const onClick = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.9, easing: (t) => 1 - Math.pow(1 - t, 3) });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll to top"
      className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background/80 text-primary shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform active:scale-95 md:bottom-8 md:right-8"
    >
      <ArrowUp size={18} />
    </button>
  );
}
