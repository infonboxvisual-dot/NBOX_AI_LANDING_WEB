import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileScrollToTop from './components/MobileScrollToTop';
import { FuturisticLoader } from './components/FuturisticLoader';
import { getLenis } from './motion/lenisStore';
import Home from './pages/Home';
import { AnimatePresence, motion } from 'motion/react';

const Partners = lazy(() => import('./pages/Partners'));
const Courses = lazy(() => import('./pages/Courses'));
const Workspace = lazy(() => import('./pages/Workspace'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const CourseRenderAI = lazy(() => import('./pages/CourseRenderAI'));
const CourseVideoAI = lazy(() => import('./pages/CourseVideoAI'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <AppShell />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

function AppShell() {
  const location = useLocation();
  const hasMountedRef = useRef(false);

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    hasMountedRef.current = true;
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20 selection:text-on-primary">
      <Header />
      <div className="flex-grow pt-16 md:pt-[76px]">
        <Suspense
          fallback={
            <div className="flex min-h-[45vh] flex-grow items-center justify-center py-24">
              <FuturisticLoader size="lg" />
            </div>
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={
                hasMountedRef.current && location.pathname !== '/'
                  ? { opacity: 0, y: 22 }
                  : false
              }
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/enterprise" element={<Partners />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/workspace" element={<Workspace />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/courses/course-render-ai" element={<CourseRenderAI />} />
                <Route path="/courses/course-video-ai" element={<CourseVideoAI />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/cookies" element={<CookiePolicy />} />
                <Route path="/landing" element={<Navigate to="/" replace />} />
                <Route path="/home/academy/course-render-ai" element={<Navigate to="/courses/course-render-ai" replace />} />
                <Route path="/home/academy/course-video-ai" element={<Navigate to="/courses/course-video-ai" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </div>
      <MobileScrollToTop />
      <Footer />
    </div>
  );
}
