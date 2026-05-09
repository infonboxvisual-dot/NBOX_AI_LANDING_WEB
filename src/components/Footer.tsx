import { useLanguage } from '../context/LanguageContext';
import { MaterialIcon } from '../components/MaterialIcon';

export default function Footer() {
  const { language } = useLanguage();
  
  return (
    <footer id="footer" className="relative mt-auto w-full overflow-hidden bg-surface-container py-20 font-sans">
      <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/35 to-transparent"></div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-16">
          <div className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/80">
              NBOX AI
            </p>
            <h4 className="max-w-sm text-3xl font-headline font-black uppercase tracking-tighter text-on-surface md:text-4xl">
              {language === 'vi' ? (
                <>
                  AI cho
                  <br />
                  kiến trúc, render, video.
                </>
              ) : (
                'AI for architecture, render, video.'
              )}
            </h4>
            <p className="max-w-sm text-sm leading-relaxed text-on-surface-variant md:text-base">
              {language === 'vi'
                ? 'Tối giản, rõ ràng, tập trung cho người dùng chuyên nghiệp.'
                : 'Minimal, clear, focused for professionals.'}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface">
                {language === 'vi' ? 'Pháp lý' : 'Legal'}
              </h4>
              <div className="flex flex-col gap-4">
                <a href="#" className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary">
                  {language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
                </a>
                <a href="#" className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary">
                  {language === 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service'}
                </a>
                <a href="#" className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary">
                  {language === 'vi' ? 'Chính sách Cookie' : 'Cookie Policy'}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface">
              {language === 'vi' ? 'Liên hệ chúng tôi' : 'Contact Us'}
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:info.nboxvisual@gmail.com"
                className="flex items-center gap-4 text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-on-surface/10 bg-on-surface/5">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                info.nboxvisual@gmail.com
              </a>
              <span className="flex items-center gap-4 text-sm font-medium text-on-surface-variant">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-on-surface/10 bg-on-surface/5">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                Da Nang, Viet Nam
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface">
              {language === 'vi' ? 'Kết nối' : 'Connect'}
            </h4>
            <div className="flex gap-4">
              <a
                href="https://academy.nboxvietnam.vn/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-on-surface/10 bg-on-surface/5 text-on-surface-variant transition-colors hover:border-primary/60 hover:text-primary"
              >
                <MaterialIcon name="language" className="size-[22px] shrink-0" strokeWidth={2} />
              </a>

              <a
                href="https://www.tiktok.com/@nbox.ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-on-surface/10 bg-on-surface/5 text-on-surface-variant transition-colors hover:border-primary/60 hover:text-primary"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                  <path d="M17.4 3c.5 2.7 2.1 4.3 4.6 4.5v3.2c-1.6.1-3.1-.4-4.5-1.2v6.2c0 4-3.2 7.3-7.3 7.3-4.6 0-8-4.4-6.8-8.9.9-3.1 3.6-5.3 6.8-5.3.4 0 .8 0 1.2.1v3.4c-.4-.2-.8-.3-1.2-.3-2 0-3.6 1.6-3.6 3.6 0 2.4 2.3 4.1 4.6 3.4 1.5-.5 2.5-1.9 2.5-3.4V1h3.7v2z"/>
                </svg>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=100000256443989&locale=vi_VN"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-on-surface/10 bg-on-surface/5 text-on-surface-variant transition-colors hover:border-primary/60 hover:text-primary"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.5V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/>
                </svg>
              </a>

              <a
                href="https://www.youtube.com/@nboxai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-on-surface/10 bg-on-surface/5 text-on-surface-variant transition-colors hover:border-primary/60 hover:text-primary"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12c0 2 0 4 .5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.8.5-3.8.5-5.8s0-4-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-on-surface/5 pt-10 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            <div className="flex cursor-pointer items-center gap-2 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="text-2xl font-headline font-black uppercase tracking-tighter text-on-surface transition-colors group-hover:text-primary">NBOX AI</span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 text-center text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-on-surface/30 md:flex-row md:items-center">
            <span>© 2026 NBOX AI. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
