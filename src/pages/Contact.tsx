import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t, language } = useLanguage();

  const socialLinks = [
    { label: 'Facebook', value: '@nbox.ai.architect', icon: 'facebook' },
    { label: 'Instagram', value: '@nbox_neural', icon: 'photo_camera' },
    { label: 'YouTube', value: 'Nbox AI Lab', icon: 'video_library' },
    { label: 'LinkedIn', value: 'NBOX AI CORP', icon: 'business' },
  ];

  const contactOptions = [
    { label: 'Customer Support', value: 'neural@nbox.ai', icon: 'bolt' },
    { label: 'Enterprise', value: 'architect@nbox.ai', icon: 'business_center' },
    { label: 'Academy', value: 'learn@nbox.ai', icon: 'school' },
  ];

  return (
    <main className="overflow-hidden pt-8 md:pt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center mb-8 md:mb-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-headline font-black uppercase tracking-tighter text-on-surface">
            {language === 'vi' ? 'KẾT NỐI VỚI CHÚNG TÔI' : 'GET IN TOUCH'}
          </h1>
        </motion.div>
      </div>

      {/* Contact Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
          {/* Channels */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-headline font-black uppercase tracking-tight mb-6 md:mb-8 drop-shadow-sm text-on-surface">{t('contact.journey.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {contactOptions.map((opt, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="glass-card p-6 md:p-8 rounded-xl border border-on-surface/10 flex flex-col items-start gap-4 group"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary border border-primary/30 group-hover:bg-primary group-hover:text-on-primary transition-all">
                      <span className="material-symbols-outlined">{opt.icon}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-1">{opt.label}</p>
                      <p className="text-on-surface font-headline font-bold text-lg">{opt.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Ecosystem */}
            <div>
              <h2 className="text-2xl md:text-3xl font-headline font-black uppercase tracking-tight mb-6 md:mb-8 drop-shadow-sm text-on-surface">{t('contact.social.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                 {socialLinks.map((social, i) => (
                  <motion.a 
                    key={i}
                    href="#"
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 md:gap-6 p-4 md:p-6 glass-card rounded-xl border border-on-surface/10 hover:border-primary/40 group transition-all"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-surface-variant border border-on-surface/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                       <span className="material-symbols-outlined text-2xl">{social.icon}</span>
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{social.label}</p>
                       <p className="text-on-surface font-headline font-bold">{social.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 rounded-2xl md:rounded-3xl border border-on-surface/10 shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 p-4 md:p-8">
               <span className="text-primary/20 font-headline font-black text-4xl md:text-6xl uppercase tracking-tighter">NBOX</span>
            </div>
            <h3 className="text-xl md:text-2xl font-headline font-bold uppercase mb-6 md:mb-8 text-on-surface">{t('contact.network.title')}</h3>
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary">Full Name</label>
                <input className="w-full bg-surface-variant/50 border border-outline-variant/20 rounded-lg p-4 md:p-5 text-sm md:text-base text-on-surface focus:outline-none focus:border-primary transition-all font-sans" placeholder="ARCHITECT NAME" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary">Department</label>
                <input className="w-full bg-surface-variant/50 border border-outline-variant/20 rounded-lg p-4 md:p-5 text-sm md:text-base text-on-surface focus:outline-none focus:border-primary transition-all font-sans" placeholder="COMPANY / FIRM" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary">Manifesto</label>
                <textarea rows={4} className="w-full bg-surface-variant/50 border border-outline-variant/20 rounded-lg p-4 md:p-5 text-sm md:text-base text-on-surface focus:outline-none focus:border-primary transition-all font-sans resize-none" placeholder="YOUR COLLABORATION VISION..." />
              </div>
              <button className="w-full bg-primary py-4 md:py-6 rounded-xl text-on-primary font-headline font-black uppercase tracking-[0.2em] text-sm md:text-base shadow-[0_0_40px_rgba(255,122,47,0.3)] hover:scale-[1.02] active:scale-95 transition-all">
                Submit Frequency
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lab Join */}
      <section className="mb-20 md:mb-32 px-6 md:px-8">
        <div className="max-w-7xl mx-auto glass-card rounded-2xl md:rounded-3xl p-8 md:p-16 lg:p-24 border border-on-surface/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 justify-between">
            <div className="max-w-2xl text-center md:text-left">
               <h2 className="text-3xl md:text-6xl font-headline font-black uppercase tracking-tighter mb-4 text-on-surface">{t('contact.lab.title')}</h2>
               <p className="text-on-surface-variant text-base md:text-lg italic">{t('contact.lab.desc')}</p>
            </div>
            <button className="w-full md:w-auto whitespace-nowrap px-8 md:px-10 py-4 md:py-5 rounded-lg border-2 border-primary text-primary font-headline font-black uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all text-sm md:text-base">
               {t('contact.lab.cta')}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
