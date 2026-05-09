import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Menu, X, ChevronRight } from 'lucide-react';
import { getLenis } from '../motion/lenisStore';

function isMobileLike(): boolean {
  if (typeof window === 'undefined') return false;
  const coarse = window.matchMedia?.('(pointer: coarse)')?.matches ?? false;
  const narrow = window.matchMedia?.('(max-width: 768px)')?.matches ?? false;
  return coarse || narrow;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomeRoute = location.pathname === '/home';
  const [mobileLike, setMobileLike] = useState(() => isMobileLike());
  
  const navItems = [
    { name: t('nav.home'), hash: null },
    { name: t('nav.partners'), hash: 'partners' },
    { name: t('nav.academy'), hash: 'academy' },
    { name: t('nav.workspace'), hash: 'workspace' },
    { name: language === 'vi' ? 'DỊCH VỤ AI' : 'AI SERVICES', hash: 'services' },
    { name: t('nav.contact'), hash: 'footer' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const onResize = () => setMobileLike(isMobileLike());
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (mobileLike) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { duration: 0.9, easing: (t) => 1 - Math.pow(1 - t, 3) });
      return;
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = (immediate?: boolean) => {
    if (mobileLike) {
      window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
      return;
    }

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, immediate ? { immediate: true } : { duration: 0.9, easing: (t) => 1 - Math.pow(1 - t, 3) });
      return;
    }

    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
  };

  const waitForAndScroll = (id: string) => {
    let frames = 0;
    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        scrollToId(id);
        return;
      }
      frames += 1;
      if (frames < 180) requestAnimationFrame(tick);
    };
    tick();
  };

  const onNavHome = () => {
    closeMenu();
    if (!isHomeRoute) {
      navigate('/home', { replace: false });
      // After route change, scroll to top.
      requestAnimationFrame(() => scrollToTop(true));
      return;
    }
    navigate('/home', { replace: false });
    scrollToTop();
  };

  const onNavHash = (hash: string) => {
    closeMenu();

    if (!isHomeRoute) {
      navigate(`/home#${hash}`, { replace: false });
      waitForAndScroll(hash);
      return;
    }

    // Update URL hash and scroll.
    navigate(`/home#${hash}`, { replace: false });
    scrollToId(hash);
  };

  return (
    <header
      className="site-header sticky top-0 z-50 h-16 w-full border-b border-primary/10 bg-background/72 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.24)] md:h-[76px]"
    >
      <div className="flex h-full w-full items-center justify-between gap-4 px-6 md:gap-6 md:px-8">
        <div className="flex items-center gap-2 md:gap-3">
          {isHomeRoute && (
            <button
              type="button"
              onClick={() => navigate('/', { replace: true })}
              className="hidden h-10 w-10 items-center justify-center text-on-surface/70 transition-colors hover:border-primary/30 hover:text-primary md:flex md:h-11 md:w-11"
              title={language === 'vi' ? 'Về trang cinematic' : 'Back to cinematic intro'}
              aria-label={language === 'vi' ? 'Về trang cinematic' : 'Back to cinematic intro'}
            >
              <ArrowLeft size={14} />
            </button>
          )}

          <button
            type="button"
            onClick={onNavHome}
            className="group flex items-center gap-3 font-headline text-xl font-black uppercase tracking-[0.22em] text-on-surface md:text-2xl"
          >
            <span>NBOX AI</span>
          </button>
        </div>
        
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            return (
              <button
                key={item.hash ?? 'home'}
                type="button"
                onClick={() => (item.hash ? onNavHash(item.hash) : onNavHome())}
                className="rounded-full px-4 py-2 font-headline text-xs font-black uppercase tracking-[0.22em] text-on-surface/65 transition-colors duration-300 hover:bg-primary/10 hover:text-primary"
              >
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center space-x-3 md:space-x-4">
          <button 
            onClick={toggleLanguage}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-on-surface/5 font-headline text-xs font-black text-on-surface transition-all hover:text-primary active:scale-90"
            title={language === 'en' ? 'Switch to Vietnamese' : 'Switch to English'}
          >
            <span className="relative transition-transform group-hover:scale-110">
              {language === 'en' ? 'E' : 'V'}
            </span>
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-on-surface transition-colors hover:text-primary md:hidden"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-primary/10 bg-background/96 md:hidden"
          >
              <nav className="flex flex-col space-y-4 p-6">
              {navItems.map((item) => {
                return (
                  <button
                    key={item.hash ?? 'home'}
                    type="button"
                    onClick={() => (item.hash ? onNavHash(item.hash) : onNavHome())}
                      className="flex items-center justify-between border-b border-on-surface/5 py-3 font-headline text-sm font-black uppercase tracking-[0.24em] text-on-surface/70 transition-colors"
                  >
                    <span>{item.name}</span>
                    <ChevronRight size={16} className="opacity-30" />
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
