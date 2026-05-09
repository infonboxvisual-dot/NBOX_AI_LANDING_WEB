import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileScrollToTop from './components/MobileScrollToTop';
import Home from './pages/Home';
import IntroPage from './pages/IntroPage';
import Partners from './pages/Partners';
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
  const isIntroRoute = location.pathname === '/';

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20 selection:text-on-primary">
      {!isIntroRoute && <Header />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/home" element={<Home />} />
          {/* Back-compat */}
          <Route path="/landing" element={<Navigate to="/home" replace />} />
          {/* Courses live under /home/academy/... to match hash-based IA */}
          <Route path="/home/academy/course-render-ai" element={<CourseRenderAI />} />
          <Route path="/home/academy/course-video-ai" element={<CourseVideoAI />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
      {!isIntroRoute && <MobileScrollToTop />}
      {!isIntroRoute && <Footer />}
    </div>
  );
}


