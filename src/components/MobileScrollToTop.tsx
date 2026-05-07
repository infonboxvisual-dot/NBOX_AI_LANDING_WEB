import { useEffect, useMemo, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { getLenis } from '../motion/lenisStore';

function isMobileLike(): boolean {
  if (typeof window === 'undefined') return false;
  const coarse = window.matchMedia?.('(pointer: coarse)')?.matches ?? false;
  const narrow = window.matchMedia?.('(max-width: 768px)')?.matches ?? false;
  return coarse || narrow;
}

export default function MobileScrollToTop() {
  const [visible, setVisible] = useState(false);
  const mobileLike = useMemo(() => isMobileLike(), []);

  useEffect(() => {
    if (!mobileLike) return;

    const onScroll = () => {
      setVisible(window.scrollY > 520);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileLike]);

  if (!mobileLike || !visible) return null;

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
      className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background/80 text-primary shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform active:scale-95"
    >
      <ArrowUp size={18} />
    </button>
  );
}

