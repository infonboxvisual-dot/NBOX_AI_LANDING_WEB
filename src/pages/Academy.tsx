import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Academy() {
  const { t, language } = useLanguage();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const courses = [
    {
      title: language === 'vi' ? 'Khóa Render AI' : 'AI Render Masterclass',
      tools: 'RunningHub, NBOX Render, Flow, Highfield, Freepik',
      format: language === 'vi' ? 'Video Online' : 'Online Video',
      content: language === 'vi' ? [
        'Render nội/ngoại thất',
        'Đồng bộ góc nhìn',
        'Cách cải thiện, upscale hình ảnh đúng cách'
      ] : [
        'Interior/Exterior Rendering',
        'Camera View Synchronization',
        'Pro image enhancement & upscaling'
      ],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVDsovsMsejbbUgvR4XUyJsJ6AhicCZcHuM0kmVg5u42Mq543StzfDl_9dFCWtVljFda__dRKYVkJ5X0978C34UXwgxCUj_Uv4YkhaLbe-0WvbZoStH_AgqC6RdVk5v0WCHPT0gH2_Sh-QWIYJQd7l8H6UbPDQeFG4FHOkAd4EmTboi93PB-JP9s8FrsSGkDFmtsYbMFcoYeK1pD0j5BU_bA3snZNifzDTBE0QK4sKraj6aJVg7ghzN0bXden73qa2Kg_ltBvR1oM',
      link: '#',
      detailLink: '/courses/course-render-ai'
    },
    {
      title: language === 'vi' ? 'Khóa Video AI' : 'AI Video Production',
      tools: 'Kling AI, VEO 3, Capcut',
      format: language === 'vi' ? 'Video Online' : 'Online Video',
      content: language === 'vi' ? [
        'Tạo video kiến trúc',
        'Công thức tạo prompt chuẩn',
        'Tạo video thay đổi áo quần, phim hoạt hình, tvc giới thiệu sản phẩm,...'
      ] : [
        'Architectural Video Creation',
        'Standardized Prompt Formulas',
        'Clothes swap, animation, product TVCs,...'
      ],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACqGCgxZ_UYRyfxhYQmivHEfWXpZanlFhl755j3al3x6ilpB6MmrV1wlUFB0VuYdpBaAMrJeafQvFGQd-EpjGvrJpJHuAUVGKuuv3s_KuLhnuUglG9y9SdkqXCVmMiDpMa1dmBatNlxqqQM7VXPAciF_nrCR7R-tZDAMthsbVJ87XYaDlc7vyCKa9BrRk08mxSGpF6QN0-t20qNiJRxxAjYSCSmHmUoLuTaVk23t6eIu3Xox3wv9muzda6avvkjmzXs8rrDFgtplA',
      link: '#',
      detailLink: '/courses/course-video-ai'
    }
  ];

  const testimonials = language === 'vi' ? [
    { name: 'KTS. Hoàng Anh', role: 'Designer', text: 'Trước đây mình khá “ngợp” vì có quá nhiều tool AI nhưng không biết áp dụng thế nào. Sau khóa Render AI của NBOX, mình đã hiểu rõ nên dùng AI ở bước nào, tối ưu ra sao và rút ngắn thời gian làm việc đáng kể.' },
    { name: 'Minh Nhật', role: 'Architect', text: 'Mình làm diễn họa nhiều năm nên khá “khó tính” với tool mới. Nhưng khóa học của NBOX đã giúp mình áp dụng AI vào dự án thật và thấy hiệu quả rõ ràng, mình cũng đã thay đổi cách nhìn về AI rất nhiều.' },
    { name: 'Thanh Hằng', role: 'Interior Designer', text: 'Điểm mình thích nhất là khóa học không dạy lan man mà đi thẳng vào vấn đề thực tế, có lộ trình học rõ ràng. Học xong mình có thể tự tối ưu workflow bằng AI, tiết kiệm rất nhiều thời gian.' },
    { name: 'Quốc Bảo', role: 'Visualizer', text: 'Trước đây mỗi lần chỉnh sửa hình ảnh rất mất thời gian, đặc biệt là ánh sáng và vật liệu. Sau khóa Render AI, mình xử lý nhanh hơn rất nhiều mà chất lượng vẫn đảm bảo.' },
    { name: 'Diệu Linh', role: 'Real Estate Agent', text: 'Khóa Video AI giúp mình tạo được các video dự án nhanh hơn trước rất nhiều. Quan trọng là video trực quan hơn nên khách hàng cũng dễ tiếp cận hơn khi mình gửi thông tin.' },
    { name: 'Mạnh Hùng', role: '3D Artist', text: 'Điều mình đánh giá cao ở NBOX Academy là tính thực tế. Không phải học xong để đó, mà có thể áp dụng ngay vào công việc hiện tại.' },
    { name: 'Lê Nam', role: 'Architect', text: 'Trước đây mình gần như chưa biết gì về AI, nhưng khóa học hướng dẫn khá rõ ràng và dễ hiểu. Sau khóa học mình đã có thể ứng dụng AI vào công việc hiện tại.' },
    { name: 'Mai Phương', role: 'Student', text: 'Việc có App AI riêng đi kèm khóa học là điểm mình thấy rất khác biệt. Không cần phải tự mò quá nhiều tool bên ngoài, học xong là có thể dùng ngay.' },
    { name: 'Thế Vinh', role: 'Project Manager', text: 'Khóa học không chỉ giúp mình biết thêm về AI, mà thay đổi cách mình làm việc hằng ngày. Đây là điều mình thấy đáng giá nhất.' },
    { name: 'Ngọc Lan', role: 'Freelancer', text: 'Sau khi học Render AI, mình tiếp tục đăng ký Video AI vì thấy cách dạy rất thực tế và dễ áp dụng. Đây là một trong những khóa học hiếm mà mình thấy “đáng tiền”.' },
  ] : [
    { name: 'Arch. Hoang Anh', role: 'Designer', text: 'I used to feel "overwhelmed" by many AI tools but didn\'t know how to apply them. After the NBOX AI Render course, I clearly understood where to use AI, how to optimize it, and significantly shorten my working time.' },
    { name: 'Minh Nhat', role: 'Architect', text: 'I\'ve been doing visualization for many years, so I\'m quite "picky" with new tools. But the NBOX course helped me apply AI to real projects and see clear results. My view of AI has changed a lot.' },
    { name: 'Thanh Hang', role: 'Interior Designer', text: 'What I liked most is that the course gets straight to the point with a clear learning path. After finishing, I can optimize my workflow with AI and save a lot of time.' },
    { name: 'Quoc Bao', role: 'Visualizer', text: 'Previously, editing images took a lot of time, especially lighting and materials. After the AI Render course, I process them much faster while maintaining quality.' },
    { name: 'Dieu Linh', role: 'Real Estate Agent', text: 'The AI Video course helped me create project videos much faster than before. Most importantly, visually intuitive videos make it easier for clients to get information.' },
    { name: 'Manh Hung', role: '3D Artist', text: 'What I appreciate about NBOX Academy is its practicality. You don\'t just learn and leave it there; you can apply it immediately to your current work.' },
    { name: 'Le Nam', role: 'Architect', text: 'I knew almost nothing about AI before, but the course is very clear and easy to understand. After finishing, I was able to apply AI to my current job.' },
    { name: 'Mai Phuong', role: 'Student', text: 'Having a private AI App with the course is a major differentiator. No need to look for external tools; you can use it immediately after learning.' },
    { name: 'The Vinh', role: 'Project Manager', text: 'The course didn\'t just teach me about AI; it changed how I work daily. This is what I value most.' },
    { name: 'Ngoc Lan', role: 'Freelancer', text: 'After Rent AI, I signed up for AI Video because the teaching is very practical and easy to apply. This is one of the rare courses I find "worth the money".' },
  ];

  const faqs = language === 'vi' ? [
    { 
      q: 'Khóa học là online hay offline?', 
      a: 'Học viên sẽ được học qua video bài giảng online. Giúp bạn linh hoạt về thời gian và địa điểm.' 
    },
    { 
      q: 'Khóa học có được cập nhật khi AI thay đổi không?', 
      a: 'Nội dung khóa học được cập nhật liên tục theo sự phát triển của AI. Bạn chỉ cần đăng ký một lần và có thể truy cập, học tập lâu dài với các nội dung mới.' 
    },
    { 
      q: 'Tôi có được hỗ trợ trong quá trình học không?', 
      a: 'Khi trở thành học viên, bạn sẽ được add vào group Zalo và có admin luôn sẵn sàng giải đáp và hỗ trợ 24/7.' 
    },
    { 
      q: 'NBOX AI có gói dùng thử miễn phí không?', 
      a: 'Hàng tuần, Facebook Trần Minh Nhật đều sẽ tung ra những slot trải nghiệm cho mọi người dùng thử.' 
    },
    { 
      q: 'Thời hạn sử dụng app và khóa học là bao lâu?', 
      a: 'Cả khóa học và app đều có giá trị vĩnh viễn, bạn chỉ cần mua 1 lần và sử dụng trọn đời.' 
    },
    { 
      q: 'Có chi phí phát sinh trong quá trình sử dụng không?', 
      a: 'NBOX AI không thu phí duy trì app. Chỉ khi tạo ảnh, bạn sẽ cần trả phí API. Nói một cách dễ hiểu là NBOX tặng bạn “chiếc xe”, bạn cần tự đổ “xăng” khi sử dụng.' 
    },
    { 
      q: 'App có xuất được ảnh 4K không?', 
      a: 'App xuất được ảnh 4K nhé, đảm bảo chất lượng sắc nét phục vụ cho dự án.' 
    },
  ] : [
    { 
      q: 'Is the course online or offline?', 
      a: 'Students will learn through online video lectures, giving you flexibility in time and location.' 
    },
    { 
      q: 'Is the course updated as AI changes?', 
      a: 'The course content is continuously updated according to AI developments. You only need to register once and can access and study for a long time with new content.' 
    },
    { 
      q: 'Will I be supported during the course?', 
      a: 'Once you become a student, you will be added to a Zalo group with admins always ready to answer and support 24/7.' 
    },
    { 
      q: 'Does NBOX AI have a free trial?', 
      a: 'Every week, Tran Minh Nhat\'s Facebook page releases trial slots for everyone to test.' 
    },
    { 
      q: 'How long can I use the app and the course?', 
      a: 'Both the course and the app have lifelong value; you only need to buy once and use it forever.' 
    },
    { 
      q: 'Are there any hidden costs during use?', 
      a: 'NBOX AI does not charge app maintenance fees. You only pay API fees when creating images. Simply put, NBOX gives you "the car", and you provide the "gas".' 
    },
    { 
      q: 'Can the app export 4K images?', 
      a: 'The app can export 4K images, ensuring sharp quality for projects.' 
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <main className="editorial-grid overflow-hidden pt-8 space-y-8 md:space-y-12 md:pt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center pt-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-4"
        >
          <h1 className="text-3xl md:text-6xl font-headline font-black uppercase tracking-tighter text-on-surface">
            {language === 'vi' ? (
              <>CÁC KHÓA HỌC <span className="italic">HIỆN CÓ</span></>
            ) : (
              <>AVAILABLE <span className="italic">COURSES</span></>
            )}
          </h1>
        </motion.div>
      </div>

      {/* Courses */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {courses.map((course, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl md:rounded-[1.5rem] overflow-hidden border border-on-surface/10 hover:border-primary/30 transition-all flex flex-col"
            >
              <div className="h-48 md:h-60 relative overflow-hidden">
                 <img src={course.image} className="w-full h-full object-cover" alt={course.title} />
                 <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-background to-transparent">
                    <h3 className="text-xl md:text-2xl font-headline font-black uppercase text-on-surface tracking-tight">{course.title}</h3>
                 </div>
              </div>
              <div className="p-6 md:p-8 space-y-6 flex-grow flex flex-col justify-between">
                <div className="space-y-4 text-on-surface-variant">
                   <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary">{t('academy.card.tools')}:</span>
                      <p className="text-on-surface text-xs md:text-sm font-medium">{course.tools}</p>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary">{t('academy.card.format')}:</span>
                      <p className="text-on-surface text-xs md:text-sm font-medium">{course.format}</p>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary">{t('academy.card.content')}:</span>
                      <ul className="text-on-surface space-y-1.5">
                        {course.content.map((item, idx) => (
                          <li key={idx} className="flex gap-2 text-[10px] md:text-xs text-on-surface-variant">
                             <span className="text-primary">•</span> {item}
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
                
                <div className="space-y-3">
                  {course.detailLink && (
                    <Link 
                      to={course.detailLink}
                      className="block w-full py-3 md:py-4 rounded-lg border border-primary/30 text-primary font-headline font-black uppercase tracking-[0.1em] text-xs md:text-sm text-center hover:bg-primary/5 transition-colors"
                    >
                      {t('course.render.details')}
                    </Link>
                  )}
                  <a 
                    href={course.link}
                    className="block w-full py-3 md:py-4 rounded-lg bg-primary text-on-primary-fixed font-headline font-black uppercase tracking-[0.1em] text-xs md:text-sm text-center shadow-[0_0_20px_rgba(255,122,47,0.2)] hover:scale-[1.02] transition-transform"
                  >
                    {t('academy.course.link')}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="bg-surface-container py-20 md:py-32 px-6 md:px-8 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
             <h2 className="text-3xl md:text-6xl font-headline font-black uppercase tracking-tighter max-w-4xl mx-auto text-on-surface">
                {t('academy.testimonials.title')}
             </h2>
          </div>
          
          <div className="relative h-[300px] md:h-[250px] max-w-4xl mx-auto">
             <AnimatePresence mode='wait'>
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-12"
                >
                   <span className="material-symbols-outlined text-primary text-5xl md:text-7xl opacity-20 mb-4 md:mb-6">format_quote</span>
                   <p className="text-lg md:text-2xl lg:text-3xl font-medium text-on-surface italic mb-6 md:mb-8 leading-relaxed">
                      "{testimonials[activeTestimonial].text}"
                   </p>
                   <div>
                      <h4 className="text-primary font-headline font-black uppercase tracking-widest text-base md:text-lg">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest mt-1">{testimonials[activeTestimonial].role}</p>
                   </div>
                </motion.div>
             </AnimatePresence>
          </div>
          
          <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12">
             {testimonials.map((_, i) => (
               <button 
                key={i} 
                onClick={() => setActiveTestimonial(i)}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${i === activeTestimonial ? 'bg-primary w-6 md:w-8' : 'bg-on-surface/20'}`}
               />
             ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-8 bg-surface-container-low border-t border-on-surface/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tighter text-on-surface mb-4">
              {t('academy.faq.title')}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={false}
                className={`glass-card overflow-hidden border ${activeFaq === index ? 'border-primary/50' : 'border-on-surface/10'} rounded-2xl transition-colors`}
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center group"
                >
                  <span className={`text-lg font-headline font-bold uppercase transition-colors ${activeFaq === index ? 'text-primary' : 'text-on-surface/80 group-hover:text-on-surface'}`}>
                    {faq.q}
                  </span>
                  <span className={`material-symbols-outlined transition-transform duration-300 ${activeFaq === index ? 'rotate-180 text-primary' : 'text-on-surface/30'}`}>
                    expand_more
                  </span>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-on-surface-variant leading-relaxed text-base md:text-lg">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
