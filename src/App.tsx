import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
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
          <div className="flex flex-col min-h-screen bg-background selection:bg-primary/30">
            <Header />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/academy/course-render-ai" element={<CourseRenderAI />} />
                <Route path="/academy/course-video-ai" element={<CourseVideoAI />} />
                {/* Fallback to home */}
                <Route path="*" element={<Home />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}


