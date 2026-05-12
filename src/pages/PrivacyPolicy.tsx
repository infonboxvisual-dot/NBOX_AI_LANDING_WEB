import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLenis } from '../motion/lenisStore';

const LAST_UPDATED = '12/05/2026';
const CONTACT_EMAIL = 'info.nboxvisual@gmail.com';
const COMPANY_ADDRESS_VI = '286 Đường 29/3, Hòa Xuân, Cẩm Lệ, Đà Nẵng, Việt Nam';
const COMPANY_ADDRESS_EN = '286 29/3 Street, Hoa Xuan, Cam Le, Da Nang, Vietnam';

interface Section {
  id: string;
  title: string;
  body: (string | string[])[];
}

interface Copy {
  pageTitle: string;
  intro: string;
  updated: string;
  tocLabel: string;
  contactLabel: string;
  contactBody: string;
  sections: Section[];
}

const COPY: Record<'vi' | 'en', Copy> = {
  vi: {
    pageTitle: 'CHÍNH SÁCH BẢO MẬT',
    intro:
      'NBOX AI (NBOX Visual) cam kết bảo vệ quyền riêng tư của bạn. Tài liệu này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và chia sẻ dữ liệu cá nhân khi bạn truy cập website, mua ứng dụng hoặc sử dụng dịch vụ AI của chúng tôi.',
    updated: 'Cập nhật lần cuối',
    tocLabel: 'NỘI DUNG CHÍNH',
    contactLabel: 'Liên hệ về quyền riêng tư',
    contactBody:
      'Mọi câu hỏi, yêu cầu chỉnh sửa hoặc xóa dữ liệu cá nhân vui lòng gửi về email bên dưới. Chúng tôi sẽ phản hồi trong vòng 14 ngày làm việc.',
    sections: [
      {
        id: 'scope',
        title: '1. Phạm vi áp dụng',
        body: [
          'Chính sách này áp dụng cho tất cả người truy cập website nbox-ai-landing-web, khách hàng mua ứng dụng AI NBOX, học viên các khóa học NBOX Academy và doanh nghiệp đặt giải pháp custom.',
          'Bằng việc tiếp tục sử dụng dịch vụ, bạn đồng ý với các điều khoản dưới đây. Nếu không đồng ý, bạn nên ngừng sử dụng website và dịch vụ của chúng tôi.',
        ],
      },
      {
        id: 'data-collected',
        title: '2. Dữ liệu chúng tôi thu thập',
        body: [
          'Thông tin liên hệ: Họ tên, email, số điện thoại, link mạng xã hội bạn cung cấp qua form liên hệ hoặc đăng ký Google Forms.',
          'Thông tin giao dịch: Tên gói ứng dụng/khóa học đã chọn, số thiết bị, ghi chú thanh toán. Thanh toán được xử lý qua kênh ngoài (chuyển khoản, hóa đơn VAT) — chúng tôi KHÔNG lưu thông tin thẻ tín dụng.',
          'Dữ liệu sản phẩm: Hình ảnh, prompt, mô hình 3D bạn upload/tạo ra khi sử dụng ứng dụng AI NBOX. Dữ liệu này được lưu cục bộ trên thiết bị của bạn; chỉ gửi tới API AI khi bạn chủ động generate.',
          'Dữ liệu kỹ thuật: Loại trình duyệt, hệ điều hành, ngôn ngữ hiển thị (vi/en), tùy chọn giao diện (lưu localStorage), referrer URL.',
          'Cookie & lưu trữ cục bộ: Xem chi tiết tại Chính sách Cookie.',
        ],
      },
      {
        id: 'purpose',
        title: '3. Mục đích sử dụng dữ liệu',
        body: [
          [
            'Cung cấp ứng dụng và dịch vụ AI bạn đã mua/đăng ký.',
            'Phản hồi yêu cầu liên hệ, hỗ trợ kỹ thuật, hóa đơn VAT.',
            'Cập nhật thông tin về sản phẩm mới, khuyến mãi (chỉ khi bạn cho phép).',
            'Cải thiện trải nghiệm sử dụng dựa trên dữ liệu kỹ thuật ẩn danh.',
            'Tuân thủ nghĩa vụ pháp lý theo quy định của Việt Nam.',
          ],
        ],
      },
      {
        id: 'plans',
        title: '4. Phân biệt theo gói dịch vụ',
        body: [
          'Gói Business / Enterprise / Private: Toàn bộ dữ liệu bạn xử lý trong ứng dụng được giữ hoàn toàn riêng tư. KHÔNG dùng để train AI. KHÔNG trưng bày công khai trừ khi bạn ký văn bản đồng ý riêng.',
          'Doanh nghiệp custom app: Triển khai trên hạ tầng riêng theo thỏa thuận, dữ liệu thuộc quyền sở hữu tuyệt đối của doanh nghiệp.',
        ],
      },
      {
        id: 'sharing',
        title: '5. Chia sẻ dữ liệu với bên thứ ba',
        body: [
          'Chúng tôi KHÔNG bán dữ liệu cá nhân của bạn cho bất kỳ bên nào. Chúng tôi chỉ chia sẻ dữ liệu trong các trường hợp:',
          [
            'Nhà cung cấp hạ tầng AI chỉ dùng những dữ liệu cần thiết để thực thi yêu cầu generate của bạn.',
            'Đối tác thanh toán/ngân hàng — khi bạn chủ động chuyển khoản hoặc yêu cầu xuất hóa đơn.',
            'Cơ quan nhà nước có thẩm quyền — khi có yêu cầu hợp pháp bằng văn bản.',
          ],
        ],
      },
      {
        id: 'retention',
        title: '6. Thời gian lưu trữ',
        body: [
          'Thông tin liên hệ qua form: tối đa 24 tháng kể từ lần tương tác cuối, sau đó xóa khỏi hộp thư của chúng tôi.',
          'Thông tin giao dịch & hóa đơn VAT: lưu tối thiểu 10 năm theo quy định kế toán Việt Nam.',
          'Dữ liệu kỹ thuật ẩn danh: lưu vô thời hạn cho mục đích thống kê.',
          'Bạn có quyền yêu cầu xóa sớm hơn (xem mục 9).',
        ],
      },
      {
        id: 'security',
        title: '7. Bảo mật dữ liệu',
        body: [
          'Website sử dụng kết nối HTTPS toàn trang.',
          'Form liên hệ gửi trực tiếp qua mailto, không qua server trung gian của bên thứ ba.',
          'Ứng dụng cài đặt cục bộ trên thiết bị của bạn — license key cá nhân hóa, không thể chia sẻ.',
          'Đội ngũ NBOX AI chỉ truy cập dữ liệu khi cần thiết cho việc hỗ trợ và đã ký NDA nội bộ.',
        ],
      },
      {
        id: 'children',
        title: '8. Trẻ em dưới 13 tuổi',
        body: [
          'Dịch vụ NBOX AI dành cho người trên 13 tuổi. Trẻ em dưới 13 tuổi chỉ được sử dụng dưới sự giám sát và đồng ý của phụ huynh/người giám hộ hợp pháp.',
          'Nếu phát hiện đã thu thập dữ liệu trẻ em không đúng quy định, chúng tôi sẽ xóa trong vòng 30 ngày sau khi nhận thông báo.',
        ],
      },
      {
        id: 'rights',
        title: '9. Quyền của bạn',
        body: [
          'Bạn có các quyền sau đối với dữ liệu cá nhân:',
          [
            'Quyền truy cập — biết chúng tôi đang lưu gì về bạn.',
            'Quyền chỉnh sửa — yêu cầu sửa thông tin không chính xác.',
            'Quyền xóa — yêu cầu xóa dữ liệu (trừ phần buộc lưu theo luật).',
            'Quyền chuyển dữ liệu — yêu cầu nhận bản sao dữ liệu của bạn.',
          ],
        ],
      },
      {
        id: 'international',
        title: '10. Người dùng ngoài Việt Nam',
        body: [
          'Đối với người dùng tại EU/UK: chúng tôi tôn trọng các nguyên tắc cơ bản của GDPR, bao gồm quyền truy cập, chỉnh sửa và xóa dữ liệu.',
          'Đối với người dùng tại Mỹ: chúng tôi áp dụng các nguyên tắc minh bạch tương đương CCPA/CPRA.',
          'Đối với người dùng Singapore và Đông Nam Á: tuân thủ tinh thần PDPA.',
          'Dữ liệu được lưu trữ tại Việt Nam và có thể được xử lý tại bất kỳ quốc gia nào nơi đối tác AI của chúng tôi hoạt động.',
        ],
      },
      {
        id: 'cookies',
        title: '11. Cookie và công nghệ tương tự',
        body: [
          'Website hiện chỉ sử dụng localStorage cho tùy chọn giao diện (theme, ngôn ngữ). Không có cookie quảng cáo hay theo dõi từ bên thứ ba.',
          'Chi tiết đầy đủ tại Chính sách Cookie.',
        ],
      },
      {
        id: 'changes',
        title: '12. Thay đổi chính sách',
        body: [
          'Chính sách này có thể được cập nhật theo thay đổi luật pháp Việt Nam hoặc phạm vi dịch vụ của NBOX AI. Mọi thay đổi sẽ được công bố tại trang này kèm ngày cập nhật mới.',
          'Đối với thay đổi trọng yếu, chúng tôi sẽ thông báo trước qua email cho khách hàng có hoạt động trong 6 tháng gần nhất.',
        ],
      },
      {
        id: 'governing-law',
        title: '13. Luật áp dụng',
        body: [
          'Chính sách này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp phát sinh sẽ được giải quyết tại Tòa án có thẩm quyền tại Đà Nẵng, Việt Nam.',
        ],
      },
      {
        id: 'contact',
        title: '14. Liên hệ',
        body: [
          `Email: ${CONTACT_EMAIL}`,
          `Địa chỉ: ${COMPANY_ADDRESS_VI}`,
          'Giờ làm việc: Thứ 2 – Thứ 7, 8:30 – 18:00 (Thứ 7 làm xen kẽ tuần)',
        ],
      },
    ],
  },
  en: {
    pageTitle: 'PRIVACY POLICY',
    intro:
      'NBOX AI (NBOX Visual) is committed to protecting your privacy. This document explains how we collect, use, store and share personal data when you visit our website, purchase apps, or use our AI services.',
    updated: 'Last updated',
    tocLabel: 'CONTENTS',
    contactLabel: 'Privacy contact',
    contactBody:
      'For any questions, edits, or deletion requests regarding your personal data, please email us. We respond within 14 business days.',
    sections: [
      {
        id: 'scope',
        title: '1. Scope',
        body: [
          'This policy applies to all visitors of nbox-ai-landing-web, customers purchasing NBOX AI apps, NBOX Academy students, and enterprises requesting custom solutions.',
          'By continuing to use our services, you agree to the terms below. If you do not agree, please stop using our website and services.',
        ],
      },
      {
        id: 'data-collected',
        title: '2. Data we collect',
        body: [
          'Contact information: Full name, email, phone, social media link you provide via contact form or Google Forms registrations.',
          'Transaction information: Selected app/course package, device count, payment notes. Payments are processed through external channels (bank transfer, VAT invoice) — we DO NOT store credit-card data.',
          'Product data: Images, prompts, 3D models you upload/generate using NBOX AI apps. This data is stored locally on your device and only sent to AI APIs when you actively generate.',
          'Technical data: Browser type, OS, display language (vi/en), theme preference (stored in localStorage), referrer URL.',
          'Cookies & local storage: See the Cookie Policy for details.',
        ],
      },
      {
        id: 'purpose',
        title: '3. How we use data',
        body: [
          [
            'Provide the AI app or service you purchased.',
            'Respond to contact requests, technical support, and VAT invoicing.',
            'Send updates about new products or promotions (only if you opt in).',
            'Improve user experience through anonymous technical metrics.',
            'Comply with Vietnamese legal obligations.',
          ],
        ],
      },
      {
        id: 'plans',
        title: '4. Plan-based distinctions',
        body: [
          'Business / Enterprise / Private plans: All data you process in the app stays fully private. NOT used for AI training. NOT publicly displayed unless you sign a separate written agreement.',
          'Enterprise custom apps: Deployed on dedicated infrastructure per contract; data is the absolute property of the contracting business.',
        ],
      },
      {
        id: 'sharing',
        title: '5. Sharing with third parties',
        body: [
          'We DO NOT sell your personal data. We share only in these cases:',
          [
            'AI infrastructure providers only use data strictly required to fulfill your generation request.',
            'Payment/banking partners — when you initiate bank transfer or request a VAT invoice.',
            'Government authorities — only when legally compelled by written request.',
          ],
        ],
      },
      {
        id: 'retention',
        title: '6. Data retention',
        body: [
          'Contact form information: up to 24 months from last interaction, then deleted from our inbox.',
          'Transaction & VAT invoice records: kept at least 10 years per Vietnamese accounting law.',
          'Anonymous technical data: kept indefinitely for analytics.',
          'You may request earlier deletion (see section 9).',
        ],
      },
      {
        id: 'security',
        title: '7. Security',
        body: [
          'The website uses site-wide HTTPS.',
          'Contact form submits via direct mailto, not through third-party intermediary servers.',
          'Apps are installed locally on your device — personalized license keys, non-shareable.',
          'NBOX AI team only accesses data when required for support, under internal NDA.',
        ],
      },
      {
        id: 'children',
        title: '8. Children under 13',
        body: [
          'NBOX AI services are intended for users aged 13 and over. Children under 13 may only use the service under parental or legal-guardian supervision and consent.',
          'If we discover any data collected from a child under 13 without proper consent, we will delete it within 30 days of notice.',
        ],
      },
      {
        id: 'rights',
        title: '9. Your rights',
        body: [
          'You have the following rights regarding your personal data:',
          [
            'Right of access — to know what data we hold about you.',
            'Right to rectification — request corrections to inaccurate information.',
            'Right to deletion — request removal of your data (except records legally required to retain).',
            'Right to data portability — request a copy of your data.',
          ],
        ],
      },
      {
        id: 'international',
        title: '10. International users',
        body: [
          'EU/UK users: we respect the core principles of GDPR, including rights of access, rectification, and erasure.',
          'US users: we apply transparency principles equivalent to CCPA/CPRA.',
          'Singapore and Southeast Asia users: we follow the spirit of PDPA.',
          'Data is stored in Vietnam and may be processed in any country where our AI partners operate.',
        ],
      },
      {
        id: 'cookies',
        title: '11. Cookies and similar technologies',
        body: [
          'The website currently uses only localStorage for UI preferences (theme, language). No advertising or third-party tracking cookies.',
          'See the Cookie Policy for full details.',
        ],
      },
      {
        id: 'changes',
        title: '12. Changes to this policy',
        body: [
          'This policy may be updated to reflect changes in Vietnamese law or in our service scope. Any changes will be published here with a new "Last updated" date.',
          'For material changes, we will email active customers (those who interacted in the last 6 months) ahead of time.',
        ],
      },
      {
        id: 'governing-law',
        title: '13. Governing law',
        body: [
          'This policy is governed by Vietnamese law. Any disputes will be resolved at the competent courts in Da Nang, Vietnam.',
        ],
      },
      {
        id: 'contact',
        title: '14. Contact',
        body: [
          `Email: ${CONTACT_EMAIL}`,
          `Address: ${COMPANY_ADDRESS_EN}`,
          'Business hours: Mon–Sat, 8:30 AM – 6:00 PM (Saturdays alternating weeks)',
        ],
      },
    ],
  },
};

export default function PrivacyPolicy() {
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

        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          aria-label={copy.tocLabel}
          className="glass-card mb-12 rounded-2xl border border-on-surface/10 p-6 md:mb-16 md:p-8"
        >
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-primary md:text-xs">
            {copy.tocLabel}
          </p>
          <ol className="grid gap-x-6 gap-y-2 text-sm text-on-surface-variant md:grid-cols-2">
            {copy.sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block py-1 transition-colors hover:text-primary"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>

        <div className="space-y-10 md:space-y-14">
          {copy.sections.map((section, idx) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, delay: Math.min(idx * 0.02, 0.2) }}
              className="scroll-mt-24"
            >
              <h2 className="mb-4 font-headline text-xl font-black uppercase tracking-tight text-on-surface md:mb-6 md:text-2xl">
                {section.title}
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-on-surface-variant md:text-base">
                {section.body.map((para, pIdx) =>
                  Array.isArray(para) ? (
                    <ul key={pIdx} className="space-y-2 pl-1">
                      {para.map((item, iIdx) => (
                        <li key={iIdx} className="flex gap-3">
                          <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={pIdx}>{para}</p>
                  ),
                )}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="glass-card mt-16 rounded-2xl border border-primary/30 p-6 shadow-2xl md:mt-20 md:rounded-3xl md:p-10"
        >
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-primary md:text-xs">
            {copy.contactLabel}
          </p>
          <p className="mb-6 text-sm leading-relaxed text-on-surface md:text-base">
            {copy.contactBody}
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3 font-headline text-xs font-black uppercase tracking-[0.2em] text-on-primary shadow-[0_0_30px_rgba(164,88,42,0.35)] transition-transform hover:scale-[1.02] active:scale-95 md:text-sm"
          >
            {CONTACT_EMAIL}
          </a>
          <div className="mt-8 flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant md:text-xs">
            <Link to="/terms" className="transition-colors hover:text-primary">
              {language === 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service'}
            </Link>
            <span className="text-on-surface/20">/</span>
            <Link to="/cookies" className="transition-colors hover:text-primary">
              {language === 'vi' ? 'Chính sách Cookie' : 'Cookie Policy'}
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
