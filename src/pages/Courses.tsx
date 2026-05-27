import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import Academy from './Academy';
import { useNavigate } from 'react-router-dom';

export default function Courses() {
  const { language } = useLanguage();

  useSEO({
    title: language === 'vi' ? 'NBOX Academy - Khóa học AI Kiến trúc thực chiến' : 'NBOX Academy - Practical Architectural AI Courses',
    description: language === 'vi'
      ? 'Khóa học AI thực chiến dành cho kiến trúc sư, nhà thiết kế và môi giới bất động sản. Làm chủ quy trình AI Render và AI Video tăng x5 hiệu suất.'
      : 'Practical AI courses for architects, designers, and real estate agents. Master AI Render and AI Video workflows to boost performance by 5X.',
    canonicalPath: '/courses'
  });

  const navigate = useNavigate();

  return (
    <main className="scroll-smooth overflow-hidden">
      <Academy />

      <section id="academy-cta" className="mx-auto max-w-7xl px-6 pb-20 pt-16 md:px-8 md:pb-32 md:pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary-container to-surface p-12 shadow-[0_0_80px_rgba(255,107,0,0.15)] md:rounded-[3rem] md:p-32"
        >
          <div className="absolute inset-0 bg-white/10"></div>
          <div className="relative z-10 text-center">
            <h2 className="mb-8 font-headline text-3xl font-black uppercase leading-tight tracking-tighter text-on-primary md:mb-12 md:text-8xl">
              {language === 'vi' ? 'SẴN SÀNG LÀM CHỦ AI ĐỈNH CAO?' : 'READY TO MASTER TOP-TIER AI?'}
            </h2>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="rounded-xl bg-on-surface px-10 py-4 font-headline text-sm font-black uppercase tracking-[0.2em] text-surface shadow-2xl transition-transform hover:scale-105 md:rounded-2xl md:px-16 md:py-8 md:text-xl"
            >
              {language === 'vi' ? 'ĐĂNG KÝ NGAY' : 'REGISTER NOW'}
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
