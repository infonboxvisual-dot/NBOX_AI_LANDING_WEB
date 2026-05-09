import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileScrollToTop from './components/MobileScrollToTop';
import { getLenis } from './motion/lenisStore';
import Home from './pages/Home';
import Partners from './pages/Partners';
import Courses from './pages/Courses';
import Workspace from './pages/Workspace';
import Services from './pages/Services';
import Contact from './pages/Contact';
import CourseRenderAI from './pages/CourseRenderAI';
import CourseVideoAI from './pages/CourseVideoAI';

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
      </div>
      <MobileScrollToTop />
      <Footer />
    </div>
  );
}
