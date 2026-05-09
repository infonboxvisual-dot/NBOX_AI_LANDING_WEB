import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, ChevronRight } from 'lucide-react';
import { getLenis } from '../motion/lenisStore';

function isMobileLike(): boolean {
  if (typeof window === 'undefined') return false;
  const coarse = window.matchMedia?.('(pointer: coarse)')?.matches ?? false;
  const narrow = window.matchMedia?.('(max-width: 768px)')?.matches ?? false;
  return coarse || narrow;
}

type NavItem = {
  name: string;
  path: string;
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileLike, setMobileLike] = useState(() => isMobileLike());

  const navItems: NavItem[] = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.academy'), path: '/courses' },
    { name: t('nav.workspace'), path: '/workspace' },
    { name: t('nav.partners'), path: '/enterprise' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const onResize = () => setMobileLike(isMobileLike());
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

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

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const goNav = (path: string) => {
    closeMenu();
    if (location.pathname === path) {
      scrollToTop();
      return;
    }
    navigate(path);
  };

  return (
    <header
      className="site-header sticky top-0 z-50 h-16 w-full border-b border-primary/10 bg-background/72 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.24)] md:h-[76px]"
    >
      <div className="flex h-full w-full items-center justify-between gap-4 px-6 md:gap-6 md:px-8">
        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={() => goNav('/')}
            className="group flex items-center gap-3 font-headline text-xl font-black uppercase tracking-[0.22em] text-on-surface md:text-2xl"
          >
            <span>NBOX AI</span>
          </button>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const active = isActivePath(item.path);
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => goNav(item.path)}
                className={`rounded-full px-4 py-2 font-headline text-xs font-black uppercase tracking-[0.22em] transition-colors duration-300 ${
                  active ? 'bg-primary/15 text-primary' : 'text-on-surface/65 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center space-x-3 md:space-x-4">
          <button
            onClick={toggleLanguage}
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-on-surface/5 font-headline text-xs font-black text-on-surface transition-all hover:text-primary active:scale-90"
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
                const active = isActivePath(item.path);
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => goNav(item.path)}
                    className={`flex items-center justify-between border-b border-on-surface/5 py-3 font-headline text-sm font-black uppercase tracking-[0.24em] transition-colors ${
                      active ? 'text-primary' : 'text-on-surface/70'
                    }`}
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
