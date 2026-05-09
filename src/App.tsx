import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileScrollToTop from './components/MobileScrollToTop';
import { FuturisticLoader } from './components/FuturisticLoader';
import { getLenis } from './motion/lenisStore';
import Home from './pages/Home';

const Partners = lazy(() => import('./pages/Partners'));
const Courses = lazy(() => import('./pages/Courses'));
const Workspace = lazy(() => import('./pages/Workspace'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const CourseRenderAI = lazy(() => import('./pages/CourseRenderAI'));
const CourseVideoAI = lazy(() => import('./pages/CourseVideoAI'));

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

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20 selection:text-on-primary">
      <Header />
      <div className="flex-grow">
        <Suspense
          fallback={
            <div className="flex min-h-[45vh] flex-grow items-center justify-center py-24">
              <FuturisticLoader size="lg" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/enterprise" element={<Partners />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses/course-render-ai" element={<CourseRenderAI />} />
            <Route path="/courses/course-video-ai" element={<CourseVideoAI />} />
            <Route path="/landing" element={<Navigate to="/" replace />} />
            <Route path="/home/academy/course-render-ai" element={<Navigate to="/courses/course-render-ai" replace />} />
            <Route path="/home/academy/course-video-ai" element={<Navigate to="/courses/course-video-ai" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
      <MobileScrollToTop />
      <Footer />
    </div>
  );
}
