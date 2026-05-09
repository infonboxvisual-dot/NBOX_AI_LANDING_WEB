import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { MaterialIcon } from '../components/MaterialIcon';

interface ServiceDetail {
  prices: { label: string; value: string }[];
  requirements: { title: string; items: string[] }[];
}

interface Service {
  id: number;
  title: string;
  subtitle: string;
  features: string[];
  image?: string;
  video?: string;
  icon: string;
  details: ServiceDetail;
}

const ServiceMedia = ({ service }: { service: Service }) => {
  const [monaEnabled, setMonaEnabled] = useState(false);
  const ensureMonaPreconnect = () => {
    const id = 'mona-preconnect';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'preconnect';
    link.href = 'https://video.mona-cloud.com';
    document.head.appendChild(link);
  };

  return (
    <div className="w-full md:w-[440px] flex-shrink-0">
      <div className="bg-black aspect-video rounded-2xl overflow-hidden flex items-center justify-center relative border border-on-surface/10 shadow-2xl group">
        {service.video ? (
          service.video.includes('mona-cloud.com') ? (
            monaEnabled ? (
              <iframe 
                src={service.video}
                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                loading="lazy"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={service.title}
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  ensureMonaPreconnect();
                  setMonaEnabled(true);
                }}
                className="flex h-full w-full flex-col items-center justify-center gap-4 bg-black/30 px-8 text-center"
              >
                <div className="rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary">
                  {service.title}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  Click to load video
                </div>
              </button>
            )
          ) : (
            <video 
              src={service.video} 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
            />
          )
        ) : (
          <div className="relative w-full h-full">
            <img 
              src={service.image} 
              className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-105 transition-all duration-700" 
              alt="" 
            />
            <div className="absolute inset-0 bg-on-surface/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        )}
        <div className="absolute inset-0 border-[8px] border-on-surface/5 pointer-events-none rounded-2xl"></div>
      </div>
    </div>
  );
};

const ServiceItem: React.FC<{ service: Service; onOpenDetails: (id: number | null) => void; t: any }> = ({ service, onOpenDetails, t }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row gap-8 md:gap-16 items-start"
    >
      <ServiceMedia service={service} />

      <div className="flex-grow space-y-8">
        <div className="space-y-6">
          <h2 className="whitespace-normal break-words text-[clamp(1.35rem,2.2vw,2.75rem)] font-headline font-black uppercase tracking-tight leading-none text-on-surface">
            {service.title}
          </h2>
          
          <p className="text-on-surface-variant text-lg md:text-2xl font-bold leading-tight italic border-l-4 border-primary pl-6">
            {service.subtitle}
          </p>

          <ul className="space-y-4 pt-4">
            {service.features.map((feature, fIdx) => (
              <motion.li 
                key={fIdx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: fIdx * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className="mt-2.5 w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_rgba(255,122,47,0.6)]"></div>
                <span className="text-on-surface/80 text-lg md:text-xl font-medium leading-snug group-hover:text-on-surface transition-colors">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="pt-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenDetails(service.id)}
            className="bg-primary text-on-primary px-10 py-4 rounded-xl font-headline font-black uppercase text-sm tracking-widest transition-all shadow-[0_10px_30px_rgba(255,122,47,0.2)] hover:shadow-primary/40"
          >
            {t('services.details.btn')}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceDetailsModal = ({ service, onClose, t }: { service: Service | null; onClose: () => void; t: any }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      >
          <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto orange-scrollbar rounded-[2rem] border border-on-surface/20 shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-8 md:p-12 bg-on-surface/5">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-primary font-headline font-black uppercase text-sm tracking-[0.2em]">D. {t('services.details.title')}</p>
                <h3 className="whitespace-normal break-words text-[clamp(1.55rem,2.7vw,2.65rem)] font-headline font-black uppercase tracking-tighter leading-none text-on-surface">
                  {service.title.split('. ')[1]}
                </h3>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-on-surface/5 border border-on-surface/10 flex items-center justify-center hover:bg-on-surface/10 transition-colors"
              >
                <MaterialIcon name="close" className="size-6 text-on-surface" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-12">
            {/* Pricing Table */}
            <div className="overflow-hidden rounded-2xl border border-on-surface/10">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {service.details.prices.map((row, i) => (
                    <tr key={i} className="border-b border-on-surface/10 last:border-0 hover:bg-on-surface/5 transition-colors">
                      <td className="p-6 md:px-10 text-on-surface font-bold text-lg border-r border-on-surface/10">{row.label}</td>
                      <td className="p-6 md:px-10 text-primary font-black text-xl text-right md:text-left">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {service.details.requirements.map((req, i) => (
                <div key={i} className="space-y-6">
                  <h4 className="text-xl font-headline font-black uppercase tracking-tight text-on-surface/90 underline decoration-primary decoration-2 underline-offset-8">
                    {req.title}
                  </h4>
                  <ul className="space-y-4">
                    {req.items.map((item, j) => (
                      <li key={j} className="flex gap-4 group">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-on-surface/70 font-medium leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 md:p-12 bg-on-surface/5 border-t border-on-surface/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-on-surface/40">
              <MaterialIcon name="info" className="size-5 shrink-0 text-on-surface/40" strokeWidth={2} />
              <p className="text-xs uppercase tracking-widest font-headline font-bold">NBOX AI ARCHITECTURAL SERVICES</p>
            </div>
            <button 
              onClick={onClose}
              className="bg-primary text-on-primary px-10 py-4 rounded-xl font-headline font-black uppercase text-sm tracking-widest shadow-[0_0_30px_rgba(255,122,47,0.3)] hover:scale-105 active:scale-95 transition-all"
            >
              OK
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Services = () => {
  const { t, language } = useLanguage();
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  const services: Service[] = [
    {
      id: 1,
      title: t('services.render.title'),
      subtitle: t('services.render.subtitle'),
      features: [
        t('services.render.f1'),
        t('services.render.f2'),
        t('services.render.f3'),
        t('services.render.f4'),
      ],
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop',
      icon: 'architecture',
      details: {
        prices: [
          { label: t('services.details.render.price.1'), value: t('services.details.render.price.1.val') },
          { label: t('services.details.render.price.2'), value: t('services.details.render.price.2.val') },
          { label: t('services.details.render.price.3'), value: t('services.details.render.price.3.val') }
        ],
        requirements: [
          { title: t('services.details.render.req.title'), items: [t('services.details.render.req.1'), t('services.details.render.req.2')] },
          { title: t('services.details.render.edit.title'), items: [t('services.details.render.edit.1'), t('services.details.render.edit.2')] }
        ]
      }
    },
    {
      id: 2,
      title: t('services.improve.title'),
      subtitle: t('services.improve.subtitle'),
      features: [
        t('services.improve.f1'),
        t('services.improve.f2'),
        t('services.improve.f3'),
        t('services.improve.f4'),
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      icon: 'auto_awesome',
      details: {
        prices: [
          { label: t('services.details.render.price.1'), value: t('services.details.render.price.1.val') },
          { label: t('services.details.render.price.2'), value: t('services.details.render.price.2.val') },
          { label: t('services.details.render.price.3'), value: t('services.details.render.price.3.val') }
        ],
        requirements: [
          { title: t('services.details.render.req.title'), items: [t('services.details.render.req.1'), t('services.details.render.req.2')] },
          { title: t('services.details.render.edit.title'), items: [t('services.details.render.edit.1'), t('services.details.render.edit.2')] }
        ]
      }
    },
    {
      id: 3,
      title: t('services.video.title'),
      subtitle: t('services.video.subtitle'),
      features: [
        t('services.video.f1'),
        t('services.video.f2'),
        t('services.video.f3'),
      ],
      video: 'https://video.mona-cloud.com/api/video/?user=28065060&video=1743152133-bi-kip-01&protected=False&version=v2&token=gAAAAABn5mZR41IHRUShuRHTypXBu00l7H-HYNXqCFR4sLULhzAH6FRWKfhKMMOgpbGsOCBSb8Vl6MNAISaSx6NiaO8jAECFwkHUcujBTvkx158mHd0p0iI%3D&autoplay=true&fitVideo=true&draggable=true&controller=false&loop=true&muted=true',
      icon: 'movie',
      details: {
        prices: [
          { label: t('services.details.video.price.1'), value: t('services.details.video.price.1.val') },
          { label: t('services.details.video.price.2'), value: t('services.details.video.price.2.val') },
          { label: t('services.details.video.price.3'), value: t('services.details.video.price.3.val') }
        ],
        requirements: [
          { title: t('services.details.video.req.title'), items: [t('services.details.video.req.1'), t('services.details.video.req.2'), t('services.details.video.req.3')] }
        ]
      }
    }
  ];

  const currentService = services.find(s => s.id === selectedServiceId) || null;

  return (
    <div className="editorial-grid min-h-screen bg-background px-6 pb-20 pt-8 md:px-6 md:pb-20 md:pt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center mb-8 md:mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="whitespace-normal break-words text-[clamp(1.45rem,3.6vw,4rem)] font-headline font-black uppercase tracking-tighter leading-none text-on-surface">
            {language === 'vi' ? (
              <>
                DỊCH VỤ AI KIẾN TRÚC &
                <br />
                <span className="block text-primary font-headline font-black">BẤT ĐỘNG SẢN</span>
              </>
            ) : (
              <>
                AI ARCHITECTURE &
                <br />
                <span className="block text-primary font-headline font-black">REAL ESTATE SERVICES</span>
              </>
            )}
          </h1>
          <p className="text-on-surface-variant text-base md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            {t('services.desc')}
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-8 mt-12 md:mt-16">
        <div className="space-y-24">
          {services.map((service) => (
            <ServiceItem 
              key={service.id} 
              service={service} 
              onOpenDetails={setSelectedServiceId} 
              t={t} 
            />
          ))}
        </div>
      </div>

      <ServiceDetailsModal 
        service={currentService} 
        onClose={() => setSelectedServiceId(null)} 
        t={t} 
      />
    </div>
  );
};

export default Services;
