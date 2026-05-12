import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import { MaterialIcon } from '../components/MaterialIcon';

export default function Partners() {
  const { t, language } = useLanguage();
  
  const partners = [
    'PENTA', 'ANHOUSES', 'ĐẢO NGỌC PLUS', 'HOMETALK', 'HOME DESIGN',
    'HAAN GROUP', 'REAL HOUSE', 'METIS', '349 DESIGN', 'NHẬT HOÀNG PHÁT',
    'NICE HOUSE', 'VHOUSE', 'HAXIS', 'TROC DESIGN', 'NGUYÊN THÀNH HOME'
  ];

  const deployedApps = [
    { image: '/companies/cpn1.png' },
    { image: '/companies/cpn2.png' },
    { image: '/companies/cpn3.png' },
    { image: '/companies/cpn5.png' },
    { image: '/companies/cpn6.png' },
    { image: '/companies/cpn7.png' },
    { image: '/companies/cpn8.png' },
    { image: '/companies/cpn9.png' },
  ];

  const pricingPackages = [
    { id: 0, name: t('partners.pricing.basic'), price: '8.000.000', devices: t('partners.pricing.devices.basic'), isPro: true },
    { id: 1, name: t('partners.pricing.standard_pkg'), price: '15.000.000', devices: t('partners.pricing.devices.standard') },
    { id: 2, name: t('partners.pricing.business'), price: '20.000.000', devices: t('partners.pricing.devices.business') },
    { id: 3, name: t('partners.pricing.enterprise'), price: '30.000.000', devices: t('partners.pricing.devices.enterprise') },
    { id: 4, name: t('partners.pricing.private'), price: t('partners.pricing.negotiable'), devices: t('partners.pricing.devices.private'), negotiable: true }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [pricingActiveIndex, setPricingActiveIndex] = useState(0);
  const [activePackageTab, setActivePackageTab] = useState('audience');

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % deployedApps.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + deployedApps.length) % deployedApps.length);

  const nextPricingSlide = () => setPricingActiveIndex((prev) => (prev + 1) % pricingPackages.length);
  const prevPricingSlide = () => setPricingActiveIndex((prev) => (prev - 1 + pricingPackages.length) % pricingPackages.length);

  const getSlideClass = (index: number) => {
    const diff = (index - activeIndex + deployedApps.length) % deployedApps.length;
    
    if (diff === 0) return "z-30 opacity-100 scale-100 translate-x-0 cursor-default";
    if (diff === 1) return "z-20 opacity-40 scale-75 translate-x-[25%] sm:translate-x-[30%] rotate-y-[-25deg] blur-sm cursor-pointer";
    if (diff === deployedApps.length - 1) return "z-20 opacity-40 scale-75 -translate-x-[25%] sm:-translate-x-[30%] rotate-y-[25deg] blur-sm cursor-pointer";
    return "z-10 opacity-0 scale-50 pointer-events-none";
  };

  const getPricingSlideClass = (index: number) => {
    const diff = (index - pricingActiveIndex + pricingPackages.length) % pricingPackages.length;
    
    if (diff === 0) return "z-30 opacity-100 scale-100 translate-x-0 cursor-default";
    if (diff === 1) return "z-20 opacity-40 scale-75 translate-x-[20%] sm:translate-x-[40%] translate-z-[-200px] rotate-y-[-35deg] blur-[2px] cursor-pointer";
    if (diff === pricingPackages.length - 1) return "z-20 opacity-40 scale-75 -translate-x-[20%] sm:-translate-x-[40%] translate-z-[-200px] rotate-y-[35deg] blur-[2px] cursor-pointer";
    return "z-10 opacity-0 scale-50 pointer-events-none";
  };

  return (
    <main className="overflow-hidden editorial-grid">
      {/* Deployed Solutions 3D Carousel */}
      <section className="overflow-hidden border-b border-on-surface/5 bg-background px-6 pb-12 pt-16">
        <div className="text-center mb-16">
           <h2 className="text-4xl md:text-6xl font-headline font-black uppercase tracking-tighter mb-4 text-on-surface">
             {language === 'vi' ? (
               <>
                 <span className="text-primary">30+</span> GIẢI PHÁP ĐÃ TRIỂN KHAI
               </>
             ) : (
               <>
                 DEPLOYED <span className="text-primary">30+</span> SOLUTIONS
               </>
             )}
           </h2>
           <p className="text-on-surface-variant max-w-2xl mx-auto">{t('partners.deployed.desc')}</p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto h-[300px] sm:h-[400px] md:h-[500px] mt-12 mb-12 flex items-center justify-center perspective-[1500px]">
          <div className="relative w-full h-full flex items-center justify-center">
            {deployedApps.map((app, i) => (
              <div 
                key={i}
                onClick={() => i !== activeIndex && setActiveIndex(i)}
                className={`absolute w-[60%] sm:w-[70%] aspect-video rounded-2xl overflow-hidden transition-all duration-700 ease-in-out border border-on-surface/20 shadow-2xl ${getSlideClass(i)}`}
              >
                <img 
                  alt={`Slide ${i}`} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer" 
                  crossOrigin="anonymous" 
                  src={app.image} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
              </div>
            ))}
          </div>

          <button 
            onClick={prevSlide}
            className="absolute left-0 sm:-left-4 md:-left-8 z-40 p-3 rounded-full bg-on-surface/5 border border-on-surface/10 hover:bg-on-surface/10 text-on-surface backdrop-blur-md transition-all group" 
            aria-label="Previous image"
          >
            <MaterialIcon name="arrow_back_ios_new" className="size-7 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 sm:-right-4 md:-right-8 z-40 p-3 rounded-full bg-on-surface/5 border border-on-surface/10 hover:bg-on-surface/10 text-on-surface backdrop-blur-md transition-all group" 
            aria-label="Next image"
          >
            <MaterialIcon name="arrow_forward_ios" className="size-7 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
          </button>

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            {deployedApps.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-on-surface/20 hover:bg-on-surface/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Auto-sliding Logo Cloud */}
      <section className="editorial-grid overflow-hidden border-y border-on-surface/5 bg-surface-container-low py-24">
        <div className="logos-carousel">
          <div className="logos-track">
            {/* Set 1 */}
            {partners.map((name, i) => (
              <div key={`logo-1-${i}`} className="logo-item flex flex-col items-center justify-center">
                <div className="text-on-surface/40 font-headline font-black text-2xl md:text-3xl tracking-[0.2em] hover:text-primary hover:scale-110 transition-all duration-500 cursor-pointer select-none">
                  {name}
                </div>
              </div>
            ))}
            {/* Set 2 (Duplicate for infinite scroll) */}
            {partners.map((name, i) => (
              <div key={`logo-2-${i}`} className="logo-item flex flex-col items-center justify-center">
                <div className="text-on-surface/40 font-headline font-black text-2xl md:text-3xl tracking-[0.2em] hover:text-primary hover:scale-110 transition-all duration-500 cursor-pointer select-none">
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate App Package Sections */}
      <section className="editorial-grid relative overflow-hidden bg-surface-container px-6 py-24">
        {/* Background glow effects */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Tab Navigation like Design in Action */}
          <div className="mb-20">
             <div className="flex flex-wrap justify-center gap-4 mb-16">
                {[
                  { id: 'audience', label: t('partners.custom_app.title'), icon: 'group' },
                  { id: 'benefits', label: t('partners.benefits.title'), icon: 'star' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePackageTab(tab.id)}
                    className={`flex items-center gap-4 px-8 py-5 rounded-2xl font-headline font-black uppercase text-sm tracking-widest transition-all duration-300 ${
                      activePackageTab === tab.id 
                        ? 'bg-primary text-on-primary shadow-[0_10px_30px_rgba(255,122,47,0.3)]' 
                        : 'bg-on-surface/5 text-on-surface/50 hover:bg-on-surface/10'
                    }`}
                  >
                    <MaterialIcon name={tab.icon} className="size-6 shrink-0" strokeWidth={2} />
                    {tab.label}
                  </button>
                ))}
             </div>

             <div className="min-h-[500px]">
                {activePackageTab === 'audience' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid md:grid-cols-3 gap-8"
                  >
                    {[
                      { num: 1, icon: 'trending_up', color: 'from-blue-500/20 to-transparent' },
                      { num: 2, icon: 'bolt', color: 'from-primary/20 to-transparent' },
                      { num: 3, icon: 'language', icon_name: 'public', color: 'from-purple-500/20 to-transparent' }
                    ].map((item, idx) => (
                      <div key={item.num} className="glass-card p-10 rounded-[2rem] border border-on-surface/10 flex flex-col items-center text-center group hover:border-primary/40 transition-all relative overflow-hidden h-full">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                           <MaterialIcon name={item.icon_name || item.icon} className="size-[10rem] text-primary" strokeWidth={1.25} />
                        </div>
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                          <MaterialIcon name={item.icon_name || item.icon} className="size-12 text-primary group-hover:text-on-primary" strokeWidth={2} />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-headline font-black text-on-surface mb-6 uppercase tracking-tight relative z-10 whitespace-nowrap overflow-hidden text-ellipsis">
                          {t(`partners.custom_app.card${item.num}.title`)}
                        </h3>
                        <p className="text-on-surface-variant text-sm md:text-base font-medium leading-relaxed italic relative z-10 px-4">
                          {t(`partners.custom_app.card${item.num}.desc`)}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activePackageTab === 'benefits' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {[
                      { num: 1, icon: 'architecture' },
                      { num: 2, icon: 'tune' },
                      { num: 3, icon: 'group_add' },
                      { num: 4, icon: 'support_agent' },
                      { num: 5, icon: 'verified_user' },
                      { num: 6, icon: 'receipt_long' }
                    ].map((item, idx) => (
                      <div key={item.num} className="glass-card p-6 md:p-10 rounded-[2rem] flex flex-col items-center text-center gap-6 min-h-[220px] border border-on-surface/10 hover:border-primary/30 transition-all duration-500 relative overflow-hidden group h-full">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/card:opacity-10 transition-opacity">
                          <MaterialIcon name={item.icon} className="size-[10rem] -rotate-12 text-primary" strokeWidth={1.25} />
                        </div>
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                          <MaterialIcon name={item.icon} className="size-9 text-primary group-hover:text-on-primary md:size-10" strokeWidth={2.25} />
                        </div>
                        <span className="text-lg md:text-2xl font-headline font-black text-on-surface uppercase tracking-tight leading-tight relative z-10">
                          {t(`partners.benefit${item.num}`)}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
             </div>
          </div>

          {/* Pricing Section (3D Carousel Reverted) */}
          <div className="mb-32">
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-4xl md:text-7xl font-headline font-black uppercase text-on-surface tracking-tighter mb-6 px-4">
                {language === 'vi' ? <>BẢNG GIÁ <span className="italic">CHO 1 ỨNG DỤNG</span></> : <>PRICING <span className="italic">PER APP</span></>}
              </h2>
              <div className="inline-block px-8 py-3 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
                <p className="text-primary font-headline font-bold uppercase tracking-[0.2em] text-[10px] md:text-sm">
                  {t('partners.pricing.subtitle')}
                </p>
              </div>
            </div>
            
            <div className="relative w-full max-w-6xl mx-auto h-[640px] sm:h-[720px] md:h-[800px] flex items-center justify-center perspective-[2000px]">
              <div className="relative w-full h-full flex items-center justify-center">
                {pricingPackages.map((pkg, i) => (
                  <motion.div
                    key={i}
                    onClick={() => i !== pricingActiveIndex && setPricingActiveIndex(i)}
                    className={`absolute w-[300px] sm:w-[370px] md:w-[440px] h-[580px] sm:h-[660px] md:h-[740px] glass-card border border-on-surface/10 p-6 sm:p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col transition-all duration-700 ease-in-out shadow-xl ${getPricingSlideClass(i)}`}
                  >
                     {/* Background shield icon */}
                     <div className="absolute top-0 right-0 p-6 sm:p-10 opacity-5 pointer-events-none">
                        <MaterialIcon name="shield" className="size-[7rem] text-primary sm:size-[9rem]" strokeWidth={1.2} />
                     </div>

                    <div className="mb-6 sm:mb-10 relative z-10">
                      <h3 className="text-2xl sm:text-4xl font-headline font-black mb-2 sm:mb-4 uppercase text-on-surface tracking-tighter">{pkg.name}</h3>
                      <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-primary rounded-full"></div>
                    </div>
                    
                    <div className="mb-8 sm:mb-12 relative z-10">
                      <p className="text-[9px] sm:text-[11px] text-on-surface-variant font-headline font-black uppercase tracking-widest mb-2 sm:mb-3">{language === 'vi' ? 'Giá trọn đời' : 'Lifetime price'}</p>
                      <div className="flex items-baseline gap-1 sm:gap-2">
                        <span className={`${pkg.negotiable ? 'text-2xl sm:text-4xl' : 'text-3xl sm:text-5xl md:text-6xl'} font-headline font-black text-on-surface tracking-tighter`}>{pkg.price}</span>
                        {!pkg.negotiable && <span className="text-sm sm:text-xl md:text-2xl font-headline font-black text-on-surface/40 font-mono">₫</span>}
                      </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4 flex-grow relative z-10 mb-4 sm:mb-6">
                       <div className="flex gap-3 sm:gap-5 items-center group/item p-3 sm:p-4 bg-on-surface/5 rounded-xl sm:rounded-2xl border border-on-surface/5">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(255,122,47,0.4)]">
                            <MaterialIcon name="devices" className="size-5 text-on-primary sm:size-6" strokeWidth={2.5} />
                          </div>
                          <span className="text-[10px] sm:text-xs uppercase font-black text-primary tracking-widest">{pkg.devices}</span>
                        </div>

                      {[
                        language === 'vi' ? 'Tốc độ render Standard' : 'Standard render speed',
                        language === 'vi' ? 'Hỗ trợ ưu tiên 24/7' : '24/7 Priority support',
                        language === 'vi' ? 'Tính năng truy cập sớm' : 'Early access features'
                      ].map((item, fIdx) => (
                        <div key={fIdx} className="flex gap-3 sm:gap-5 items-center group/item px-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20">
                            <MaterialIcon name="check" className="size-3.5 text-green-600 sm:size-4" strokeWidth={3} />
                          </div>
                          <span className="text-[11px] sm:text-sm uppercase font-bold text-on-surface/70 tracking-widest leading-tight">{item}</span>
                        </div>
                      ))}
                      
                      <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-on-surface/5">
                         <p className="text-[9px] sm:text-[10px] text-on-surface/30 italic leading-relaxed text-right">
                           {t('partners.pricing.note')}
                         </p>
                      </div>
                    </div>

                    <Link
                      to="/contact"
                      className="w-full block text-center py-4 sm:py-5 bg-on-surface text-surface hover:bg-primary hover:text-on-primary rounded-xl sm:rounded-2xl font-headline font-black uppercase text-xs sm:text-sm tracking-widest shadow-2xl transition-all duration-300 mt-auto active:scale-95"
                    >
                      {t('partners.pricing.choose')}
                    </Link>

                    {pkg.isPro && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[12px] font-black uppercase px-8 py-3 rounded-full shadow-[0_10px_30px_rgba(255,122,47,0.5)] border border-on-surface/20 z-20 whitespace-nowrap">
                        {language === 'vi' ? 'PHỔ BIẾN' : 'MOST POPULAR'}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Carousel Controls */}
              <button 
                onClick={prevPricingSlide}
                className="absolute left-0 sm:-left-24 md:-left-32 z-40 p-3 sm:p-4 rounded-2xl bg-on-surface/5 border border-on-surface/10 hover:bg-primary text-on-surface hover:text-on-primary backdrop-blur-md transition-all group shadow-2xl" 
                aria-label="Previous plan"
              >
                <MaterialIcon name="arrow_back_ios_new" className="size-7 sm:size-8 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
              </button>
              
              <button 
                onClick={nextPricingSlide}
                className="absolute right-0 sm:-right-24 md:-right-32 z-40 p-3 sm:p-4 rounded-2xl bg-on-surface/5 border border-on-surface/10 hover:bg-primary text-on-surface hover:text-on-primary backdrop-blur-md transition-all group shadow-2xl" 
                aria-label="Next plan"
              >
                <MaterialIcon name="arrow_forward_ios" className="size-7 sm:size-8 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </button>

              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
                {pricingPackages.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setPricingActiveIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,122,47,0.2)] ${i === pricingActiveIndex ? 'w-12 bg-primary' : 'w-2.5 bg-on-surface/20 hover:bg-on-surface/40'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
