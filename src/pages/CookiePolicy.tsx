import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLenis } from '../motion/lenisStore';

const LAST_UPDATED = '12/05/2026';
const CONTACT_EMAIL = 'info.nboxvisual@gmail.com';

interface CookieRow {
  type: string;
  purpose: string;
  examples: string;
}

interface Copy {
  pageTitle: string;
  intro: string;
  updated: string;
  tableTitle: string;
  th: { type: string; purpose: string; examples: string };
  rows: CookieRow[];
  managementTitle: string;
  managementBody: string[];
  contactLabel: string;
  contactBody: string;
}

const COPY: Record<'vi' | 'en', Copy> = {
  vi: {
    pageTitle: 'CHÍNH SÁCH COOKIE',
    intro:
      'NBOX AI hạn chế tối đa việc sử dụng cookie. Website hiện chỉ dùng localStorage và sessionStorage của trình duyệt để lưu tùy chọn hiển thị, KHÔNG dùng cookie quảng cáo hay theo dõi xuyên domain. Tài liệu này nêu rõ những gì chúng tôi lưu và cách bạn quản lý.',
    updated: 'Cập nhật lần cuối',
    tableTitle: 'CÁC LOẠI CHÚNG TÔI SỬ DỤNG',
    th: { type: 'Loại', purpose: 'Mục đích', examples: 'Ví dụ thực tế' },
    rows: [
      {
        type: 'Cookie thiết yếu (Essential)',
        purpose:
          'Đảm bảo các chức năng cơ bản của website hoạt động (điều hướng SPA, lưu trạng thái form).',
        examples:
          'Không có cookie HTTP. Chỉ sử dụng bộ nhớ session của trình duyệt khi bạn điền form liên hệ.',
      },
      {
        type: 'Tùy chọn (Preference)',
        purpose:
          'Ghi nhớ tùy chọn cá nhân của bạn để lần sau quay lại không cần thiết lập lại.',
        examples:
          'localStorage key “app-theme” (giao diện sáng/tối), thuộc tính ngôn ngữ html[lang] (vi/en).',
      },
      {
        type: 'Phân tích (Analytics)',
        purpose:
          'Đo lường hiệu suất tải trang và lỗi để chúng tôi cải thiện trải nghiệm. Dữ liệu được ẩn danh hóa.',
        examples:
          'Không thu thập trên website hiện tại. Khi bổ sung trong tương lai, chúng tôi sẽ thông báo trước.',
      },
    ],
    managementTitle: 'CÁCH BẠN QUẢN LÝ',
    managementBody: [
      'Xóa dữ liệu lưu trữ cục bộ: vào cài đặt trình duyệt → Privacy → Clear browsing data → chọn “Cookies and other site data”.',
      'Tắt JavaScript: nhiều trình duyệt cho phép tắt JS theo từng website. Lưu ý: NBOX AI là Single Page App nên hầu hết chức năng sẽ ngừng hoạt động.',
      'Chế độ ẩn danh (Incognito / InPrivate): mọi dữ liệu được xóa khi đóng tab. Phù hợp khi bạn dùng máy chung.',
      'Nếu bạn nghi ngờ NBOX AI thu thập dữ liệu ngoài phạm vi mô tả tại đây, vui lòng gửi email để chúng tôi điều tra.',
    ],
    contactLabel: 'Câu hỏi về cookie',
    contactBody:
      'Mọi thắc mắc hoặc khiếu nại liên quan tới việc xử lý cookie, vui lòng gửi email cho chúng tôi.',
  },
  en: {
    pageTitle: 'COOKIE POLICY',
    intro:
      'NBOX AI minimizes the use of cookies. The website currently uses only browser localStorage and sessionStorage to remember UI preferences. NO advertising or cross-domain tracking cookies. This document explains exactly what we store and how you can manage it.',
    updated: 'Last updated',
    tableTitle: 'WHAT WE USE',
    th: { type: 'Type', purpose: 'Purpose', examples: 'Real examples' },
    rows: [
      {
        type: 'Essential',
        purpose:
          'Keep core website functions working (SPA navigation, form state).',
        examples:
          'No HTTP cookies. Browser session memory is only used when you fill in the contact form.',
      },
      {
        type: 'Preference',
        purpose:
          'Remember your settings so you do not have to reconfigure on each visit.',
        examples:
          'localStorage key “app-theme” (light/dark UI), html[lang] attribute (vi/en).',
      },
      {
        type: 'Analytics',
        purpose:
          'Measure page-load performance and errors to improve experience. Data is anonymized.',
        examples:
          'Not collected on the current website. We will notify you in advance if we add this in the future.',
      },
    ],
    managementTitle: 'HOW TO MANAGE',
    managementBody: [
      'Clear local storage: browser settings → Privacy → Clear browsing data → choose “Cookies and other site data”.',
      'Disable JavaScript: many browsers let you disable JS per site. Note: NBOX AI is a Single Page App and most features will stop working.',
      'Incognito / InPrivate mode: data is cleared when the tab closes — useful on shared computers.',
      'If you suspect NBOX AI collects data beyond what is described here, please email us so we can investigate.',
    ],
    contactLabel: 'Cookie questions',
    contactBody:
      'For any concerns or complaints about cookie handling, please email us.',
  },
};

export default function CookiePolicy() {
  const { language } = useLanguage();
  const copy = COPY[language];

  useLayoutEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="overflow-hidden px-6 pb-24 pt-12 md:px-8 md:pb-32 md:pt-16">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 md:mb-16"
        >
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-primary md:text-xs">
            {copy.updated}: {LAST_UPDATED}
          </p>
          <h1 className="font-headline text-3xl font-black uppercase tracking-tighter text-on-surface md:text-5xl lg:text-6xl">
            {copy.pageTitle}
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-on-surface-variant md:text-base">
            {copy.intro}
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="mb-6 font-headline text-xl font-black uppercase tracking-tight text-on-surface md:text-2xl">
            {copy.tableTitle}
          </h2>
          <div className="overflow-hidden rounded-2xl border border-on-surface/10">
            <table className="w-full text-left text-sm md:text-base">
              <thead className="bg-on-surface/5">
                <tr>
                  <th className="p-4 font-headline text-[10px] font-black uppercase tracking-[0.2em] text-primary md:p-6 md:text-xs">
                    {copy.th.type}
                  </th>
                  <th className="p-4 font-headline text-[10px] font-black uppercase tracking-[0.2em] text-primary md:p-6 md:text-xs">
                    {copy.th.purpose}
                  </th>
                  <th className="hidden p-4 font-headline text-[10px] font-black uppercase tracking-[0.2em] text-primary md:table-cell md:p-6 md:text-xs">
                    {copy.th.examples}
                  </th>
                </tr>
              </thead>
              <tbody>
                {copy.rows.map((row, i) => (
                  <tr key={i} className="border-t border-on-surface/10">
                    <td className="p-4 align-top font-headline font-black uppercase text-on-surface md:p-6">
                      {row.type}
                    </td>
                    <td className="p-4 align-top leading-relaxed text-on-surface-variant md:p-6">
                      {row.purpose}
                      <p className="mt-3 text-xs italic text-on-surface-variant/80 md:hidden">
                        {row.examples}
                      </p>
                    </td>
                    <td className="hidden p-4 align-top leading-relaxed text-on-surface-variant md:table-cell md:p-6">
                      {row.examples}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="mb-6 font-headline text-xl font-black uppercase tracking-tight text-on-surface md:text-2xl">
            {copy.managementTitle}
          </h2>
          <ul className="space-y-3 text-sm leading-relaxed text-on-surface-variant md:text-base">
            {copy.managementBody.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="glass-card rounded-2xl border border-primary/30 p-6 shadow-2xl md:rounded-3xl md:p-10"
        >
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-primary md:text-xs">
            {copy.contactLabel}
          </p>
          <p className="mb-6 text-sm leading-relaxed text-on-surface md:text-base">{copy.contactBody}</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3 font-headline text-xs font-black uppercase tracking-[0.2em] text-on-primary shadow-[0_0_30px_rgba(164,88,42,0.35)] transition-transform hover:scale-[1.02] active:scale-95 md:text-sm"
          >
            {CONTACT_EMAIL}
          </a>
          <div className="mt-8 flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant md:text-xs">
            <Link to="/privacy" className="transition-colors hover:text-primary">
              {language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
            </Link>
            <span className="text-on-surface/20">/</span>
            <Link to="/terms" className="transition-colors hover:text-primary">
              {language === 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service'}
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
