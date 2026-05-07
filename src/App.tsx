import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileScrollToTop from './components/MobileScrollToTop';
import Home from './pages/Home';
import IntroPage from './pages/IntroPage';
import Partners from './pages/Partners';
import Academy from './pages/Academy';
import CourseRenderAI from './pages/CourseRenderAI';
import CourseVideoAI from './pages/CourseVideoAI';
import Workspace from './pages/Workspace';
import Contact from './pages/Contact';
import Services from './pages/Services';

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
          <Route path="/landing" element={<Home />} />
          <Route path="/academy/course-render-ai" element={<CourseRenderAI />} />
          <Route path="/academy/course-video-ai" element={<CourseVideoAI />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      {!isIntroRoute && <MobileScrollToTop />}
      {!isIntroRoute && <Footer />}
    </div>
  );
}


