import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, ChevronRight, Lamp, Sun, Moon } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const navItems = [
    { name: t('nav.home'), path: '#home' },
    { name: t('nav.partners'), path: '#partners' },
    { name: t('nav.academy'), path: '#academy' },
    { name: t('nav.workspace'), path: '#workspace' },
    { name: language === 'vi' ? 'DỊCH VỤ AI' : 'AI SERVICES', path: '#services' },
    { name: t('nav.contact'), path: '#contact' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        closeMenu();
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-primary/15 shadow-[0_0_30px_rgba(255,107,0,0.05)]">
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, '#home')}
          className="text-xl md:text-2xl font-black tracking-tighter uppercase text-on-surface font-headline"
        >
          NBOX AI
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => scrollToSection(e, item.path)}
                className="font-headline font-bold tracking-tighter uppercase transition-colors duration-300 pb-1 text-sm text-on-surface/70 hover:text-primary"
              >
                {item.name}
              </a>
            );
          })}
        </nav>

         <div className="flex items-center space-x-3 md:space-x-4 ml-auto md:ml-0">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-on-surface/10 flex items-center justify-center text-on-surface hover:border-primary hover:text-primary transition-all bg-on-surface/5 backdrop-blur-sm shadow-lg group active:scale-90"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            <span className="relative group-hover:rotate-12 transition-transform">
              {theme === 'light' ? <Lamp size={18} /> : <Sun size={18} />}
            </span>
          </button>
          
          <button 
            onClick={toggleLanguage}
            className="w-10 h-10 rounded-full border border-on-surface/10 flex items-center justify-center text-on-surface font-headline font-black text-xs md:text-sm hover:border-primary hover:text-primary transition-all bg-on-surface/5 backdrop-blur-sm shadow-lg group active:scale-90"
            title={language === 'en' ? 'Switch to Vietnamese' : 'Switch to English'}
          >
            <span className="relative group-hover:scale-110 transition-transform">
              {language === 'en' ? 'E' : 'V'}
            </span>
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-on-surface hover:text-primary transition-colors"
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
            className="md:hidden bg-background/95 border-b border-primary/10 overflow-hidden"
          >
            <nav className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => {
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => scrollToSection(e, item.path)}
                    className="flex items-center justify-between font-headline font-bold uppercase tracking-widest py-3 border-b border-on-surface/5 transition-colors text-on-surface/70"
                  >
                    <span>{item.name}</span>
                    <ChevronRight size={16} className="opacity-30" />
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
