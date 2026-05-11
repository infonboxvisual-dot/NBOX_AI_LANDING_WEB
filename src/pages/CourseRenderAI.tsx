import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getLenis } from '../motion/lenisStore';
import { MaterialIcon } from '../components/MaterialIcon';

export default function CourseRenderAI() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  useLayoutEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const content = {
    vi: {
      title: "Khóa học Render AI Thực Chiến",
      subtitle: "Dùng AI để tăng tốc & nâng cấp toàn bộ quy trình diễn họa",
      target: ["Kiến trúc sư", "3D Artist / Diễn họa viên", "Doanh nghiệp kiến trúc & bất động sản"],
      goal: "Nhanh hơn – Tốt hơn – Hiệu quả hơn",
      problems: [
        "Render tốn nhiều thời gian",
        "Workflow phức tạp, nhiều bước lặp lại",
        "Áp lực deadline & chất lượng ngày càng cao"
      ],
      definition: {
        title: "Render AI là gì?",
        items: ["Ánh sáng", "Vật liệu", "Bối cảnh", "Hậu kỳ hình ảnh"],
        benefits: ["Rút ngắn thời gian render", "Tăng chất lượng output", "Tối ưu quy trình"]
      },
      learning: [
        "AI nên dùng ở bước nào trong workflow",
        "Cách kết hợp AI với pipeline hiện tại",
        "Cách kiểm soát chất lượng khi dùng AI",
        "Thực hành trực tiếp với Ứng dụng Render AI của NBOX"
      ],
      differences: [
        "100% thực chiến từ kinh nghiệm làm nghề",
        "Không lý thuyết lan man",
        "Học → áp dụng ngay",
        "Có tool riêng để thực hành"
      ],
      results: [
        "Render nhanh hơn rõ rệt",
        "Hình ảnh đẹp & ổn định hơn",
        "Workflow tối ưu hơn",
        "Tăng hiệu suất & giá trị nghề nghiệp"
      ],
      philosophy: {
        title: "Triết lý đào tạo",
        quote: "“Học để dùng được ngay trong công việc”",
        desc: "Không biến bạn thành “AI expert lý thuyết”. Tập trung: dùng đúng lúc, dùng đúng cách, kiểm soát được kết quả."
      },
      urgency: "AI đang trở thành tiêu chuẩn ngành. Ai làm chủ sớm → có lợi thế lớn. Đây không chỉ là kỹ năng, mà là lợi thế cạnh tranh dài hạn."
    },
    en: {
      title: "Real-World AI Render Course",
      subtitle: "Applying AI to accelerate & upgrade the entire visualization process",
      target: ["Architects", "3D Artists / Visualizers", "Architectural & Real Estate Businesses"],
      goal: "Faster – Better – More Effective",
      problems: [
        "Rendering takes too much time",
        "Complex workflow with many repetitive steps",
        "Increasing pressure on deadlines & quality"
      ],
      definition: {
        title: "What is AI Render?",
        items: ["Lighting", "Materials", "Context", "Post-production"],
        benefits: ["Shorten rendering time", "Increase output quality", "Optimize workflow"]
      },
      learning: [
        "Where to use AI in the workflow",
        "How to combine AI with the current pipeline",
        "How to control quality when using AI",
        "Direct practice with NBOX AI Render App"
      ],
      differences: [
        "100% practical from career experience",
        "No rambling theories",
        "Learn → apply immediately",
        "Custom tool for practice"
      ],
      results: [
        "Significantly faster rendering",
        "More beautiful & stable images",
        "Optimized workflow",
        "Increased performance & career value"
      ],
      philosophy: {
        title: "Training Philosophy",
        quote: "“Learn to use immediately in work”",
        desc: "Don't turn you into a “theoretical AI expert”. Focus: use at the right time, use the right way, control the result."
      },
      urgency: "AI is becoming the industry standard. Those who master it early have a huge advantage. This is not just a skill, but a long-term competitive edge."
    }
  };

  const d = language === 'vi' ? content.vi : content.en;

  return (
    <main className="min-h-screen pt-20 pb-32 px-6 md:px-8 bg-background overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/5 blur-[180px] rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        <button
          type="button"
          onClick={() => navigate('/courses', { replace: true })}
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-12 group cursor-pointer rounded-lg border-0 bg-transparent p-0 text-left font-inherit"
        >
          <MaterialIcon name="west" className="size-[18px] shrink-0 transition-transform group-hover:-translate-x-1" strokeWidth={2} />
          <span className="font-headline font-bold uppercase text-xs tracking-widest">{t('academy.detail.back')}</span>
        </button>

        {/* Hero */}
        <section className="mb-20">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-primary text-[10px] uppercase font-headline font-black tracking-widest">{t('academy.detail.courseDetails')}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-tight mb-6 text-on-surface">
            {d.title}
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant italic border-l-4 border-primary pl-6">
            {d.subtitle}
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Left Column */}
          <div className="space-y-16">
            {/* Target & Goal */}
            <div className="glass-card p-8 md:p-12 rounded-3xl border border-on-surface/10 space-y-8">
              <div>
                <h3 className="text-primary font-headline font-black uppercase tracking-widest text-sm mb-4">{t('academy.detail.for')}</h3>
                <ul className="space-y-3">
                  {d.target.map((t, i) => (
                    <li key={i} className="flex gap-3 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <p className="text-on-surface font-medium">{t}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-8 border-t border-on-surface/10">
                <h3 className="text-primary font-headline font-black uppercase tracking-widest text-sm mb-4">{t('academy.detail.goal')}</h3>
                <p className="text-2xl font-headline font-black text-on-surface">{d.goal}</p>
              </div>
            </div>

            {/* Problems */}
            <div className="space-y-6">
              <h3 className="text-3xl font-headline font-black uppercase tracking-tighter text-on-surface">{t('academy.detail.problems')}</h3>
              <div className="space-y-4">
                {d.problems.map((p, i) => (
                  <div key={i} className="flex gap-4 items-center glass-card p-5 rounded-xl border border-on-surface/10 hover:border-red-500/20 transition-colors">
                     <MaterialIcon name="error" className="size-5 shrink-0 text-red-500" strokeWidth={2} />
                     <p className="text-on-surface-variant font-medium">{p}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What is AI Render */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-headline font-black uppercase tracking-tighter mb-4 text-on-surface">{d.definition.title}</h3>
                <p className="text-on-surface-variant mb-6">{language === 'vi' ? 'Dùng AI cho:' : 'Applying AI into:'}</p>
                <div className="grid grid-cols-2 gap-4">
                  {d.definition.items.map((item, i) => (
                    <div key={i} className="glass-card p-4 rounded-xl border border-on-surface/10 text-center">
                       <p className="text-on-surface font-bold">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {d.definition.benefits.map((b, i) => (
                   <span key={i} className="px-4 py-2 rounded-lg bg-green-500/10 text-green-600 border border-green-500/20 text-xs font-bold uppercase tracking-widest">
                     {b}
                   </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            {/* Learning content */}
            <div className="glass-card p-8 md:p-12 rounded-3xl border border-on-surface/10 bg-primary/5">
              <h3 className="text-3xl font-headline font-black uppercase tracking-tighter mb-8 text-on-surface">{t('academy.detail.learn')}</h3>
              <ul className="space-y-6">
                {d.learning.map((l, i) => (
                  <li key={i} className="flex gap-4">
                    <MaterialIcon name="check_circle" className="size-5 shrink-0 text-primary" strokeWidth={2} />
                    <p className="text-on-surface-variant font-medium leading-relaxed">{l}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-10 font-headline font-black text-primary uppercase italic text-sm tracking-widest">{language === 'vi' ? '👉 Không chỉ học tool — mà học cách dùng đúng' : '👉 Not just tools — learn to use them right'}</p>
            </div>

            {/* Results */}
            <div className="space-y-8">
               <h3 className="text-3xl font-headline font-black uppercase tracking-tighter text-on-surface">{t('academy.detail.outcomes')}</h3>
               <div className="grid grid-cols-1 gap-4">
                 {d.results.map((r, i) => (
                   <div key={i} className="flex gap-4 p-5 glass-card rounded-xl border border-on-surface/10 border-l-4 border-l-green-500">
                      <p className="text-on-surface font-bold">{r}</p>
                   </div>
                 ))}
               </div>
            </div>

            {/* Philosophy */}
            <div className="p-8 rounded-3xl border-2 border-dashed border-primary/30 relative">
               <div className="absolute top-0 right-0 p-4">
                  <MaterialIcon name="format_quote" className="size-14 shrink-0 text-primary/20 md:size-16" strokeWidth={1.25} />
               </div>
               <h4 className="text-primary font-headline font-black uppercase tracking-widest text-sm mb-4">{t('academy.detail.philosophy')}</h4>
               <p className="text-2xl font-headline font-black text-on-surface mb-4">{d.philosophy.quote}</p>
               <p className="text-on-surface-variant leading-relaxed italic">{d.philosophy.desc}</p>
            </div>
          </div>
        </div>

        {/* Urgency & CTA */}
        <section className="mt-24 text-center space-y-12 bg-surface-container p-12 md:p-20 rounded-[3rem] border border-on-surface/10">
          <p className="text-xl md:text-2xl text-on-surface font-medium max-w-3xl mx-auto leading-relaxed">
            {d.urgency}
          </p>
          <div className="flex flex-col items-center gap-6">
            <button className="bg-primary text-on-primary px-12 py-6 rounded-2xl font-headline font-black uppercase tracking-widest shadow-[0_0_50px_rgba(255,122,47,0.4)] hover:scale-105 transition-transform text-lg" onClick={() => window.open('https://m.me/tranminhnhat.nbox', '_blank')}>
              {t('academy.detail.register')}
            </button>
            <p className="text-on-surface-variant font-bold uppercase tracking-[0.3em] text-[10px]">
              {language === 'vi' ? 'GIỚI HẠN SỐ LƯỢNG HỌC VIÊN MỖI KHÓA' : 'LIMITED SEATS PER COURSE'}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
