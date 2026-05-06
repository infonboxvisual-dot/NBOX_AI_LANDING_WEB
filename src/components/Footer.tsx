import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  
  return (
    <footer id="footer" className="w-full py-20 bg-surface-container mt-auto font-sans relative overflow-hidden">
      {/* Background Gradient Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-16 mb-20">
          {/* Product Section */}
          <div className="space-y-6">
            <h4 className="text-on-surface font-headline font-bold uppercase tracking-[0.2em] text-xs">
              {language === 'vi' ? 'Sản phẩm' : 'Product'}
            </h4>
            <div className="flex flex-col gap-4">
              <a href="#partners" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">
                {language === 'vi' ? 'Bảng giá' : 'Pricing'}
              </a>
              <a href="#design-in-action" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">
                {language === 'vi' ? 'Tính năng' : 'Features'}
              </a>
              <a href="#services" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">
                {language === 'vi' ? 'Thư viện' : 'Gallery'}
              </a>
            </div>
          </div>

          {/* Company Section */}
          <div className="space-y-6">
            <h4 className="text-on-surface font-headline font-bold uppercase tracking-[0.2em] text-xs">
              {language === 'vi' ? 'Công ty' : 'Company'}
            </h4>
            <div className="flex flex-col gap-4">
              <a href="#" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">
                {language === 'vi' ? 'Tuyển dụng' : 'Careers'}
              </a>
            </div>
          </div>

          {/* Legal Section */}
          <div className="space-y-6">
            <h4 className="text-on-surface font-headline font-bold uppercase tracking-[0.2em] text-xs">
              {language === 'vi' ? 'Pháp lý' : 'Legal'}
            </h4>
            <div className="flex flex-col gap-4">
              <a href="#" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">
                {language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
              </a>
              <a href="#" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">
                {language === 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service'}
              </a>
              <a href="#" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">
                {language === 'vi' ? 'Chính sách Cookie' : 'Cookie Policy'}
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6 lg:col-span-2">
            <h4 className="text-on-surface font-headline font-bold uppercase tracking-[0.2em] text-xs">
              {language === 'vi' ? 'Liên hệ chúng tôi' : 'Contact Us'}
            </h4>
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <a href="mailto:support@nbox.ai" className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-all text-sm group">
                  <div className="w-10 h-10 rounded-lg bg-on-surface/5 flex items-center justify-center border border-on-surface/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  support@nbox.ai
                </a>
                <div className="flex items-center gap-4 text-on-surface-variant text-sm">
                  <div className="w-10 h-10 rounded-lg bg-on-surface/5 flex items-center justify-center border border-on-surface/10">
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  Singapore / Vietnam
                </div>
              </div>

              {/* Connect Section */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/30">
                  {language === 'vi' ? 'Kết nối' : 'Connect'}
                </p>
                <div className="flex gap-4">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-on-surface/5 flex items-center justify-center border border-on-surface/5 text-on-surface-variant hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                    <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                    </svg>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-on-surface/5 flex items-center justify-center border border-on-surface/5 text-on-surface-variant hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                    <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-on-surface/5 flex items-center justify-center border border-on-surface/5 text-on-surface-variant hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                    <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                    </svg>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-on-surface/5 flex items-center justify-center border border-on-surface/5 text-on-surface-variant hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                    <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-10 border-t border-on-surface/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="text-on-surface font-headline font-black uppercase tracking-tighter text-2xl group-hover:text-primary transition-colors">NBOX AI</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-on-surface/30 text-[10px] md:text-xs font-headline font-bold uppercase tracking-[0.2em] text-center">
            <span>© 2026 NBOX AI. All rights reserved.</span>
            <div className="hidden md:block w-1 h-1 bg-on-surface/10 rounded-full"></div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-on-surface transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-on-surface transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
