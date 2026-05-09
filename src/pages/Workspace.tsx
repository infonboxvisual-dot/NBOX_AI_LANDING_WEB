import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MaterialIcon } from '../components/MaterialIcon';

interface WorkspaceItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
  image: string;
  link: string;
  videoUrl: string;
  tips: string[];
}

export default function Workspace() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'catalog' | 'pro'>('catalog');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const apps: WorkspaceItem[] = [
    { id: 'app1', title: 'NBOX RENDERING', desc: 'Professional architectural rendering with high-speed neural clusters.', icon: 'architecture', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXnAvFguPWsfDncIsiz_VTsRbZnLD-ijwKpsba8dgOpyZOwbvEPpw4IAIEephJnVt2IFPnCQlgPp2C8f5LPdx13rRLuUafk0h137sv7TUUoM5BkFhczENA-Hdd5l4LgoU7P8v-DBtzEsYnq7KGP1wBymFAmFKjifmjsVtFJadkj1lrN-ADv54kFiw6EerlDj1oTYSBUiUmGcKPLLGBLuT8d9YdZ7iEslxdmowi1tTNOtLesnq16RndHiXPrFubMHInhrzM366NE7o', link: '#', videoUrl: 'https://cdn.pixabay.com/video/2023/10/22/186105-877234674_tiny.mp4', tips: ['Tip 1', 'Tip 2'] },
    { id: 'app2', title: 'NBOX VIDEO', desc: 'AI-driven architectural cinematography.', icon: 'videocam', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiHOvPFEKw1VyaXlRGxUoCFirSwT5nsuWwddavtt4uvYh8aVVooLc7qJIXhGI2wulimwKTuyAeTi6gn6KWHgG19msyeUG5THHTzkNd43Av3_XfZSepraQTNnsEmUj1I3yTtKCo1ZYnfXJAtHsJN5HmlGWj1UVCjJ_PBgNtCTBLcXz6NgD_7hk8wZiAPG1PfETde758tUOfFhiONtAA1e2UTMBSJz2OiDnbxNEeW5V5G4UPRmLrOAoj6hrO1jj0W2co_AkwgTO0vgc', link: '#', videoUrl: 'https://cdn.pixabay.com/video/2023/06/15/167389-836792349_tiny.mp4', tips: ['Tip 1', 'Tip 2'] },
    { id: 'app3', title: 'NBOX VISUAL', desc: 'Intuitive spatial visualization.', icon: 'visibility', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcbHGx3_ulsG9DjNHHiZGsVdMaoTqBNmWYh2Nn_m6-vbn0toA-Rv95pXJikbBGfHF039Z23L2NfYJmHbxhPNh4N7MNV9t37r8Aqto2KTJhn_gJvTxhkaFUO2tF_D9IHRbhDk2s5fzKboiBB5QkPu_-YobXLHKm4sJ3vFDasgvGwE8eix9vyjQW4idVvm0mkz46QVfYz2uP_Sq_CV7pV8ne48rEOIIpuVGfM0zGx-yVb01xD8oWO8lseIyl3ZpS5aJlES4TkLiO25g', link: '#', videoUrl: 'https://cdn.pixabay.com/video/2023/04/10/158223-816223456_tiny.mp4', tips: ['Tip 1', 'Tip 2'] },
    { id: 'app4', title: 'NBOX TEXTURELAB', desc: 'AI-generated PBR textures and materials.', icon: 'texture', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfvYCcvy8jPV4Sf7GO9vvpVS1j54uAbafCSVMUuhlNSrYhFv-cmAoIrrCyAOGWXxbEhXObjnmgdrSTcUgRqUvv8Hm-8VlgSfOvpzPkVokKTMvCVeSjoU-QcVeIpODVJ0W5CLS0e8pXL-eG1oenpb24ddXJW7vWoKkM2kN9PK_oK8P0QmvhG2v8Ul-5t0Jk_Aav7dm-7P06oHppiu3f8pzYTXatnh5bJB8va2vaVrNNcNURg6J4PeUB2-_hxHMh5L25ypyM5k1ykGc', link: '#', videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70830-536838345_tiny.mp4', tips: ['Tip 1', 'Tip 2'] },
    { id: 'app5', title: 'NBOX HUMAN ENHANCER', desc: 'Realistic human placement in 3D renders.', icon: 'person_add', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz7VBt6V9kpy-aPdVw-A5uySo4R5XrNPuakPTX1IDboGqwNAoyBL2oQHls_lv1vEyiCREEXqmkYSR6aqQMUt4hhWP-SEcEmYfAue_NolZr5rNmMrtl5ihgdGPbZsTsAEhilxAO4w2SD3NWMWHJPwNJc1fgTrutqdn3kvl0prdoqurczBkGolraH3iPM5kfFuXBt0H7B-p30L4AazH071OhBe6teYZp7OsK-aor5FLdDGybz126YV0HbqnFdXKqEAFb-cVeMkpXbck', link: '#', videoUrl: 'https://cdn.pixabay.com/video/2023/07/26/173362-848834674_tiny.mp4', tips: ['Tip 1', 'Tip 2'] },
    { id: 'app6', title: 'NBOX VIRTUAL STAGING', desc: 'Instant virtual interior decoration.', icon: 'meeting_room', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcS4WcTe9SvXk3HJ52pKdESTD43mxFiRthZh5XXgMNGu4imnZJtzBJWCqZGnGK9lGQlVikvZlKUi5EuwmDeqOmSx09sGwKD9K35Kd7duBJ9ZSZNz3oKQiAzTZYv8TK1UFQgArY5fOEgi6ku8SVZq8oVAbYdcHi2uz3plfQG8h8KtxuHBefiSGNXTq9I8cNi3gqbuLd8KzW6cIsSMvKEILTqeoI4PzPC4YeuDcm9MRcizJiHRJdc-gPXIzNd3n8ehWb3PQJHAUyspk', link: '#', videoUrl: 'https://cdn.pixabay.com/video/2023/08/11/175623-853683456_tiny.mp4', tips: ['Tip 1', 'Tip 2'] },
    { id: 'app7', title: 'NBOX PROMPT', desc: 'Expert prompts for architectural models.', icon: 'integration_instructions', image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2070&auto=format&fit=crop', link: '#', videoUrl: 'https://cdn.pixabay.com/video/2023/10/22/186105-877234674_tiny.mp4', tips: ['Tip 1', 'Tip 2'] },
    { id: 'app8', title: 'NBOX PHOTO ENHANCER', desc: 'Upscale and improve photo quality.', icon: 'photo_filter', image: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2070&auto=format&fit=crop', link: '#', videoUrl: 'https://cdn.pixabay.com/video/2023/06/15/167389-836792349_tiny.mp4', tips: ['Tip 1', 'Tip 2'] },
    { id: 'app9', title: 'NBOX KITCHEN DESIGN', desc: 'Specialized kitchen layout AI.', icon: 'kitchen', image: 'https://images.unsplash.com/photo-1556911220-e15224bbafb0?q=80&w=2070&auto=format&fit=crop', link: '#', videoUrl: 'https://cdn.pixabay.com/video/2023/04/10/158223-816223456_tiny.mp4', tips: ['Tip 1', 'Tip 2'] },
  ];

  const tools: WorkspaceItem[] = [
    {
       id: 'tool1',
       title: 'NBOX RENDERING FLOW',
       desc: 'Streamlined workflow for perfect renders.',
       icon: 'flowsheet',
       image: 'https://images.unsplash.com/photo-1581291417067-285a6b26d246?q=80&w=2070&auto=format&fit=crop',
       link: '#',
       videoUrl: 'https://cdn.pixabay.com/video/2021/11/22/98330-649234567_tiny.mp4',
       tips: ['Tip 1', 'Tip 2']
    },
    {
       id: 'tool2',
       title: 'NBOX VIDEO FLOW',
       desc: 'Professional video pipeline for AI motion.',
       icon: 'movie_edit',
       image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
       link: '#',
       videoUrl: 'https://cdn.pixabay.com/video/2023/10/22/186105-877234674_tiny.mp4',
       tips: ['Tip 1', 'Tip 2']
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
            {language === 'vi' ? 'DANH SÁCH ỨNG DỤNG' : 'AI APPLICATIONS'}
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
              <div className="flex justify-center">
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
              </div>

              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center transition-all duration-500 ${activeTab === 'pro' ? 'max-w-5xl mx-auto md:grid-cols-2 lg:grid-cols-2' : ''}`}>
                {(activeTab === 'catalog' ? apps : tools).map((item, i) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedItemId(item.id)}
                    className={`glass-card rounded-xl overflow-hidden cursor-pointer group hover:border-primary/40 transition-all border border-on-surface/10 flex flex-col w-full h-full ${activeTab === 'pro' ? 'max-w-xl p-2' : ''}`}
                  >
                    <div className={`relative overflow-hidden ${activeTab === 'pro' ? 'aspect-video rounded-lg' : 'aspect-video'}`}>
                       <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={item.title} />
                       <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                       <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary border border-primary/30">
                          <MaterialIcon name={item.icon} className="size-[18px] text-primary" strokeWidth={2} />
                        </div>
                    </div>
                    <div className={`${activeTab === 'pro' ? 'p-8' : 'p-5'} flex-grow`}>
                      <h3 className={`font-headline font-black uppercase mb-3 group-hover:text-primary transition-colors tracking-tight line-clamp-1 ${activeTab === 'pro' ? 'text-2xl' : 'text-lg'}`}>{item.title}</h3>
                      <p className={`text-on-surface-variant leading-relaxed line-clamp-2 ${activeTab === 'pro' ? 'text-sm' : 'text-[10px]'}`}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
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
                 <video src={selectedItem?.videoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                 <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 bg-gradient-to-t from-black to-transparent">
                    <span className="text-primary font-headline font-black uppercase text-[10px] md:text-xs tracking-widest">{t('workspace.modal.video')}</span>
                 </div>
                 <button 
                  onClick={() => setSelectedItemId(null)}
                  className="absolute top-4 left-4 md:top-8 md:left-8 bg-surface/30 hover:bg-surface/50 text-on-surface backdrop-blur-xl px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 md:gap-3 transition-all border border-on-surface/20"
                >
                  <MaterialIcon name="west" className="size-4 shrink-0 md:size-[18px]" strokeWidth={2} />
                  <span className="font-headline font-bold uppercase text-[9px] md:text-xs tracking-widest">Back to Apps</span>
                </button>
              </div>

              <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-20 flex flex-col justify-between">
                <div className="space-y-8 md:space-y-12">
                  <div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-on-surface mb-4 md:mb-6 underline decoration-primary decoration-2 md:decoration-4 underline-offset-4 md:underline-offset-8">{selectedItem?.title}</h2>
                    <p className="text-on-surface-variant text-base md:text-xl leading-relaxed">{selectedItem?.desc}</p>
                  </div>
                  
                  <div className="space-y-4 md:space-y-6">
                    <h4 className="text-primary font-headline font-black uppercase text-xs md:text-sm tracking-widest">{t('workspace.modal.tips')}</h4>
                    <ul className="grid grid-cols-1 gap-3 md:gap-4">
                      {selectedItem?.tips.map((tip, i) => (
                        <li key={i} className="flex gap-3 md:gap-4 items-center glass-card p-3 md:p-4 rounded-xl border border-on-surface/5">
                           <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(255,122,47,0.5)]" />
                           <span className="text-xs md:text-sm font-medium text-on-surface">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-12 md:mt-16 pt-8 border-t border-on-surface/5">
                  <a 
                    href={selectedItem?.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full block bg-primary py-4 md:py-6 rounded-xl md:rounded-2xl text-on-primary font-headline font-black uppercase tracking-widest text-lg md:text-xl text-center shadow-[0_0_40px_rgba(255,122,47,0.4)] hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    {t('workspace.modal.link')}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
