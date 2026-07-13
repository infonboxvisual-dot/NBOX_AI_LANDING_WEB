import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { MaterialIcon } from '../components/MaterialIcon';
import { BlurImage } from '../components/BlurImage';

interface AppItem {
  kind: 'app';
  id: string;
  title: string;
  descKey: string;
  icon: string;
  image: string;
  youtubeUrl: string;
  accessUrl: string;
}

interface ToolItem {
  kind: 'tool';
  id: string;
  title: string;
  descKey: string;
  icon: string;
  image: string;
  youtubeUrl: string;
  signupUrl: string;
}

type WorkspaceItem = AppItem | ToolItem;

const DEFAULT_SIGNUP = 'https://forms.gle/zSRaodPnrnv5Si7X7';

export default function Workspace() {
  const { t, language } = useLanguage();

  useSEO({
    title: language === 'vi' ? 'NBOX AI App - Danh sách ứng dụng AI kiến trúc' : 'NBOX AI App - AI Architectural App Catalog',
    description: language === 'vi'
      ? 'Truy cập hệ thống ứng dụng AI kiến trúc chuyên dụng của NBOX AI: NBOX Rendering, NBOX Video, NBOX Visual, NBOX Texturelab, NBOX Virtual Staging,...'
      : 'Access NBOX AI\'s specialized architectural AI applications: NBOX Rendering, NBOX Video, NBOX Visual, NBOX Texturelab, NBOX Virtual Staging,...',
    canonicalPath: '/workspace'
  });
  const [activeTab, setActiveTab] = useState<'catalog' | 'pro'>('catalog');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [showSoonVideo, setShowSoonVideo] = useState(false);

  const apps: AppItem[] = [
    { kind: 'app', id: 'app1', title: 'NBOX RENDERING', descKey: 'workspace.app1.desc', icon: 'architecture', image: '/app/render.webp', youtubeUrl: 'https://www.youtube.com/watch?v=RpS66NWqj8I', accessUrl: 'https://render.nboxai.io' },
    { kind: 'app', id: 'app2', title: 'NBOX VIDEO', descKey: 'workspace.app2.desc', icon: 'videocam', image: '/app/video.webp', youtubeUrl: 'https://www.youtube.com/watch?v=wEDOLDRNGKU', accessUrl: 'https://video.nboxai.io' },
    { kind: 'app', id: 'app3', title: 'NBOX VISUAL', descKey: 'workspace.app3.desc', icon: 'visibility', image: '/app/visual.webp', youtubeUrl: 'https://www.youtube.com/watch?v=DhouOh2Yrec', accessUrl: 'https://visual.nboxai.io' },
    { kind: 'app', id: 'app4', title: 'NBOX TEXTURELAB', descKey: 'workspace.app4.desc', icon: 'texture', image: '/app/texture.webp', youtubeUrl: 'https://www.youtube.com/watch?v=Ll08ASOGPvU', accessUrl: 'https://texturelab.nboxai.io' },
    { kind: 'app', id: 'app5', title: 'NBOX HUMAN ENHANCER', descKey: 'workspace.app5.desc', icon: 'person_add', image: '/app/human-enhancer.webp', youtubeUrl: 'https://www.youtube.com/watch?v=jiRpMfQWzno', accessUrl: 'https://human-enhancer.nboxai.io' },
    { kind: 'app', id: 'app6', title: 'NBOX VIRTUAL STAGING', descKey: 'workspace.app6.desc', icon: 'meeting_room', image: '/app/virtual.webp', youtubeUrl: 'https://www.youtube.com/watch?v=kyleUz33uAM', accessUrl: 'https://virtual-staging.nboxai.io' },
    { kind: 'app', id: 'app7', title: 'NBOX PROMPT', descKey: 'workspace.app7.desc', icon: 'integration_instructions', image: '/app/prompt.webp', youtubeUrl: 'https://www.youtube.com/watch?v=FVD83vRLnqg', accessUrl: 'https://prompt.nboxai.io' },
    { kind: 'app', id: 'app8', title: 'NBOX PHOTO ENHANCER', descKey: 'workspace.app8.desc', icon: 'photo_filter', image: '/app/photo-enhancer.webp', youtubeUrl: 'https://www.youtube.com/watch?v=BC6dbWfG9T4', accessUrl: 'https://render-enhancer.nboxai.io' },
    { kind: 'app', id: 'app9', title: 'NBOX KITCHEN DESIGN', descKey: 'workspace.app9.desc', icon: 'kitchen', image: '/app/kitchen.webp', youtubeUrl: 'https://www.youtube.com/watch?v=SibPfsk2G_c', accessUrl: 'https://kitchen-cabinet.nboxai.io' },
    { kind: 'app', id: 'app10', title: 'NBOX RENDERING SYNC', descKey: 'workspace.app10.desc', icon: 'sync', image: '/app/render-sync.webp', youtubeUrl: '', accessUrl: 'https://render-sync.nboxai.io/' },
    { kind: 'app', id: 'app11', title: 'NBOX UPSCALE', descKey: 'workspace.app11.desc', icon: 'zoom_in', image: '/app/upscale.webp', youtubeUrl: '', accessUrl: 'https://upscale.nboxai.io/' },
    { kind: 'app', id: 'app12', title: 'NBOX MATERIAL', descKey: 'workspace.app12.desc', icon: 'grid_view', image: '/app/material.webp', youtubeUrl: '', accessUrl: 'https://material.nboxai.io/' },
    { kind: 'app', id: 'app13', title: 'NBOX 3D', descKey: 'workspace.app13.desc', icon: 'deployed_code', image: '/app/image-to-3d.webp', youtubeUrl: '', accessUrl: 'https://image-to-3d.nboxai.io/' },
  ];

  const tools: ToolItem[] = [
    {
       kind: 'tool',
       id: 'tool1',
       title: 'NBOX RENDERING FLOW',
       descKey: 'workspace.tool1.desc',
       icon: 'flowsheet',
       image: '/app/tool-render.webp',
       youtubeUrl: 'https://www.youtube.com/watch?v=s-eICQbZhiE',
       signupUrl: DEFAULT_SIGNUP,
    },
    {
       kind: 'tool',
       id: 'tool2',
       title: 'NBOX VIDEO FLOW',
       descKey: 'workspace.tool2.desc',
       icon: 'movie_edit',
       image: '/app/tool-video.webp',
       youtubeUrl: 'https://www.youtube.com/watch?v=xGObmRoBaOU',
       signupUrl: DEFAULT_SIGNUP,
    }
  ];

  const selectedItem = [...apps, ...tools].find(item => item.id === selectedItemId);

  return (
    <main className="editorial-grid overflow-hidden pt-12">
      <div className="max-w-7xl mx-auto px-8 text-center mb-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-headline font-black uppercase tracking-tighter text-on-surface">
            {language === 'vi' ? (
              <>DANH SÁCH <span className="text-primary">ỨNG DỤNG AI</span></>
            ) : (
              <><span className="text-primary">AI</span> APPS</>
            )}
          </h1>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-20 min-h-screen relative">
        <AnimatePresence mode="wait">
          {!selectedItemId ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-16"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="p-1 glass-card rounded-xl flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className={`px-8 py-3 rounded-lg font-headline font-extrabold uppercase text-xs tracking-widest transition-all ${
                      activeTab === 'catalog' ? 'bg-primary text-on-primary shadow-[0_0_20px_rgba(255,122,47,0.3)]' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {t('workspace.tabs.catalog')}
                  </button>
                  <button
                    onClick={() => setActiveTab('pro')}
                    className={`px-8 py-3 rounded-lg font-headline font-extrabold uppercase text-xs tracking-widest transition-all ${
                      activeTab === 'pro' ? 'bg-primary text-on-primary shadow-[0_0_20px_rgba(255,122,47,0.3)]' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {t('workspace.tabs.pro')}
                  </button>
                </div>

                {activeTab === 'catalog' && (
                  <a
                    href="https://www.youtube.com/watch?v=D1G3pPSxiX0"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 md:gap-3 bg-primary text-on-primary px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-headline font-black uppercase text-xs md:text-sm tracking-widest shadow-[0_0_30px_rgba(255,122,47,0.35)] hover:scale-[1.03] active:scale-95 transition-all"
                  >
                    <MaterialIcon name="how_to_reg" className="size-4 md:size-5" strokeWidth={2.5} />
                    {language === 'vi' ? 'ĐĂNG KÝ ỨNG DỤNG AI' : 'REGISTER AI APP'}
                  </a>
                )}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className={
                  activeTab === 'pro'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto'
                    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
                }
              >
                {(activeTab === 'catalog' ? apps : tools).map((item, i) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    className={`glass-card rounded-xl overflow-hidden cursor-pointer group border border-on-surface/10 flex flex-col w-full h-full transition-all duration-500 hover:border-primary hover:shadow-[0_0_30px_rgba(255,122,47,0.4)] hover:scale-[1.02] ${activeTab === 'pro' ? 'p-3 md:rounded-2xl' : ''}`}
                  >
                    <div className={`relative overflow-hidden ${activeTab === 'pro' ? 'aspect-video rounded-xl' : 'aspect-video'}`}>
                      <BlurImage
                        src={item.image}
                        alt={item.title}
                        eager={i < 4}
                        imgClassName="transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 pointer-events-none"></div>
                      <div className={`absolute top-3 left-3 rounded-lg bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary border border-primary/30 ${activeTab === 'pro' ? 'w-10 h-10' : 'w-8 h-8'}`}>
                        <MaterialIcon name={item.icon} className={activeTab === 'pro' ? 'size-6 text-primary' : 'size-[18px] text-primary'} strokeWidth={2} />
                      </div>
                    </div>
                    <div className={`${activeTab === 'pro' ? 'p-8 md:p-10' : 'p-5'} flex-grow`}>
                      <h3 className={`font-headline font-black uppercase mb-3 group-hover:text-primary transition-colors tracking-tight line-clamp-1 ${activeTab === 'pro' ? 'text-2xl md:text-3xl' : 'text-lg'}`}>{item.title}</h3>
                      <p className={`text-on-surface-variant leading-relaxed line-clamp-2 ${activeTab === 'pro' ? 'text-sm md:text-base' : 'text-[10px]'}`}>{t(item.descKey)}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass-card rounded-2xl md:rounded-[3rem] overflow-hidden flex flex-col lg:flex-row border border-on-surface/10"
            >
              <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto bg-black relative min-h-[300px] md:min-h-[400px]">
                 {selectedItem && (
                   <BlurImage src={selectedItem.image} alt={selectedItem.title} eager />
                 )}
                 <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 bg-gradient-to-t from-black to-transparent pointer-events-none">
                    <span className="text-primary font-headline font-black uppercase text-[10px] md:text-xs tracking-widest">{t('workspace.modal.preview')}</span>
                 </div>
                 <button
                  onClick={() => setSelectedItemId(null)}
                  className="absolute top-4 left-4 md:top-8 md:left-8 bg-surface/30 hover:bg-surface/50 text-on-surface backdrop-blur-xl px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 md:gap-3 transition-all border border-on-surface/20"
                >
                  <MaterialIcon name="west" className="size-4 shrink-0 md:size-[18px]" strokeWidth={2} />
                  <span className="font-headline font-bold uppercase text-[9px] md:text-xs tracking-widest">{t('workspace.modal.back')}</span>
                </button>
              </div>

              <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-20 flex flex-col justify-between">
                <div className="space-y-8 md:space-y-12">
                  <div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-on-surface mb-4 md:mb-6 underline decoration-primary decoration-2 md:decoration-4 underline-offset-4 md:underline-offset-8">{selectedItem?.title}</h2>
                    <p className="text-on-surface-variant text-base md:text-xl leading-relaxed">{selectedItem ? t(selectedItem.descKey) : ''}</p>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <h4 className="text-primary font-headline font-black uppercase text-xs md:text-sm tracking-widest">{t('workspace.modal.guide')}</h4>
                    <a
                      href={selectedItem?.youtubeUrl || undefined}
                      target={selectedItem?.youtubeUrl ? '_blank' : undefined}
                      rel="noreferrer"
                      onClick={(e) => {
                        if (!selectedItem?.youtubeUrl) {
                          e.preventDefault();
                          setShowSoonVideo(true);
                        }
                      }}
                      className="flex items-center gap-4 glass-card p-4 md:p-5 rounded-xl border border-on-surface/10 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center shrink-0 group-hover:bg-red-600 transition-colors">
                        <MaterialIcon name="play_arrow" className="size-7 md:size-8 text-red-600 group-hover:text-white" strokeWidth={2.5} />
                      </div>
                      <span className="font-headline font-black uppercase text-xs md:text-sm tracking-widest text-on-surface flex-grow">{t('workspace.modal.guide.btn')}</span>
                      <MaterialIcon name="open_in_new" className="size-4 md:size-5 text-on-surface-variant shrink-0" strokeWidth={2} />
                    </a>
                  </div>
                </div>

                <div className="mt-12 md:mt-16 pt-8 border-t border-on-surface/5">
                  {selectedItem?.kind === 'tool' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <Link
                        to="/contact?topic=toolflow"
                        className="w-full flex items-center justify-center gap-2 bg-primary py-4 md:py-5 rounded-xl md:rounded-2xl text-on-primary font-headline font-black uppercase tracking-widest text-sm md:text-base text-center shadow-[0_0_40px_rgba(255,122,47,0.4)] hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        {t('workspace.modal.download')}
                      </Link>
                      <a
                        href={selectedItem.signupUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-on-surface/5 border border-primary/40 py-4 md:py-5 rounded-xl md:rounded-2xl text-on-surface font-headline font-black uppercase tracking-widest text-sm md:text-base text-center hover:bg-primary/10 hover:border-primary hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        <MaterialIcon name="how_to_reg" className="size-4 md:size-5 text-primary" strokeWidth={2.5} />
                        {t('workspace.modal.register')}
                      </a>
                    </div>
                  ) : (
                    <a
                      href={selectedItem?.accessUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-primary py-4 md:py-6 rounded-xl md:rounded-2xl text-on-primary font-headline font-black uppercase tracking-widest text-lg md:text-xl text-center shadow-[0_0_40px_rgba(255,122,47,0.4)] hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <MaterialIcon name="bolt" className="size-5 md:size-6" strokeWidth={2.5} />
                      {t('workspace.modal.access')}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showSoonVideo && (
          <motion.div
            key="soon-video-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-6 py-10 backdrop-blur-md"
            onClick={() => setShowSoonVideo(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              key="soon-video-card"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card relative max-w-md w-full rounded-3xl border border-primary/30 p-8 text-center shadow-[0_30px_60px_rgba(0,0,0,0.5)] md:p-10"
            >
              <button
                type="button"
                onClick={() => setShowSoonVideo(false)}
                aria-label={language === 'vi' ? 'Đóng' : 'Close'}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-on-surface/5 text-on-surface-variant transition-colors hover:bg-on-surface/10 hover:text-on-surface"
              >
                <MaterialIcon name="close" className="size-5" strokeWidth={2} />
              </button>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 border border-primary/30">
                <MaterialIcon name="smart_display" className="size-9 text-primary" strokeWidth={2} />
              </div>
              <h3 className="mb-3 font-headline text-2xl font-black uppercase tracking-tighter text-on-surface md:text-3xl">
                {language === 'vi' ? 'HƯỚNG DẪN SỬ DỤNG' : 'VIDEO TUTORIAL'}
              </h3>
              <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">
                {language === 'vi'
                  ? 'Video hướng dẫn sử dụng cho ứng dụng này sẽ sớm được cập nhật.'
                  : 'The instructional video for this application will be updated soon.'}
              </p>
              <button
                type="button"
                onClick={() => setShowSoonVideo(false)}
                className="mt-8 w-full rounded-xl bg-primary py-3 font-headline text-xs font-black uppercase tracking-[0.2em] text-on-primary shadow-[0_0_30px_rgba(164,88,42,0.35)] transition-transform hover:scale-[1.01] active:scale-95 md:text-sm"
              >
                {language === 'vi' ? 'ĐÓNG' : 'CLOSE'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
