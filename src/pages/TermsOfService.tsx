import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLenis } from '../motion/lenisStore';

const LAST_UPDATED = '12/05/2026';
const CONTACT_EMAIL = 'info.nboxvisual@gmail.com';

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
    pageTitle: 'ĐIỀU KHOẢN DỊCH VỤ',
    intro:
      'Bằng việc sử dụng website nbox-ai-landing-web, mua ứng dụng AI NBOX, đăng ký khóa học hoặc dịch vụ AI của chúng tôi, bạn đồng ý chịu sự điều chỉnh của các điều khoản dưới đây. Vui lòng đọc kỹ trước khi sử dụng.',
    updated: 'Cập nhật lần cuối',
    tocLabel: 'NỘI DUNG CHÍNH',
    contactLabel: 'Liên hệ pháp lý',
    contactBody:
      'Mọi câu hỏi liên quan đến điều khoản dịch vụ, license, bảo hành hoặc tranh chấp vui lòng gửi email cho chúng tôi.',
    sections: [
      {
        id: 'acceptance',
        title: '1. Chấp nhận điều khoản',
        body: [
          'Khi truy cập website hoặc sử dụng bất kỳ dịch vụ nào của NBOX AI, bạn xác nhận đã đọc, hiểu và đồng ý tuân thủ toàn bộ điều khoản này.',
          'Nếu không đồng ý, vui lòng ngừng truy cập và không sử dụng dịch vụ.',
        ],
      },
      {
        id: 'eligibility',
        title: '2. Điều kiện sử dụng',
        body: [
          'Bạn cần đủ 13 tuổi trở lên. Người dưới 18 tuổi cần có sự đồng ý của phụ huynh/người giám hộ khi giao dịch thương mại.',
          'Bạn cam kết cung cấp thông tin chính xác khi đăng ký, mua hàng hoặc liên hệ. Mọi thông tin sai lệch có thể dẫn đến việc chấm dứt dịch vụ mà không hoàn tiền.',
        ],
      },
      {
        id: 'products',
        title: '3. Sản phẩm và dịch vụ',
        body: [
          'NBOX AI cung cấp:',
          [
            'Ứng dụng AI cài đặt cục bộ (Rendering, Video, Visual, TextureLab, Human Enhancer, Virtual Staging, Prompt, Photo Enhancer, Kitchen Design).',
            'Công cụ AI Flow (Rendering Flow, Video Flow).',
            'Các khóa học trực tuyến NBOX Academy (Render AI, Video AI).',
            'Dịch vụ AI theo dự án (render, cải thiện ảnh, làm phim kiến trúc).',
            'Gói ứng dụng custom cho doanh nghiệp.',
          ],
          'Mô tả, giá, và tính năng có thể thay đổi mà không cần báo trước. Đơn hàng đã thanh toán giữ điều khoản tại thời điểm giao dịch.',
        ],
      },
      {
        id: 'license',
        title: '4. License sử dụng ứng dụng',
        body: [
          'Khi mua ứng dụng AI NBOX, bạn được cấp ứng dụng cùng key gateway để sử dụng, không độc quyền, không chuyển nhượng, trọn đời theo số lượng thiết bị đã chọn.',
          'License KHÔNG bao gồm: quyền chia sẻ tài khoản, phân phối lại, bán lại, hoặc cung cấp dịch vụ trên nền tảng NBOX cho bên thứ ba.',
          'NBOX AI có quyền thu hồi license nếu phát hiện vi phạm hoặc gian lận, không hoàn tiền các đợt sử dụng đã phát sinh.',
        ],
      },
      {
        id: 'content-ownership',
        title: '5. Quyền sở hữu nội dung do bạn tạo ra',
        body: [
          'Bạn giữ toàn bộ quyền sở hữu (bản quyền) đối với hình ảnh, video, prompt, mô hình 3D do bạn tạo ra bằng ứng dụng/dịch vụ NBOX AI.',
          'Đối với gói Business / Enterprise / Private: nội dung của bạn hoàn toàn riêng tư, KHÔNG dùng train AI, KHÔNG hiển thị công khai trừ khi có thỏa thuận riêng bằng văn bản.',
        ],
      },
      {
        id: 'payment',
        title: '6. Thanh toán và hóa đơn',
        body: [
          'Giá niêm yết là giá VND, chưa bao gồm thuế VAT 8% và phí mua key gateway (nếu có), trừ khi nêu rõ.',
          'Thanh toán qua chuyển khoản ngân hàng Việt Nam, hoặc qua các kênh khác do NBOX AI chỉ định.',
          'Doanh nghiệp được hỗ trợ xuất hóa đơn VAT đầy đủ trong vòng 30 ngày kể từ ngày thanh toán.',
          'Đơn hàng dịch vụ render/video bắt đầu được thực hiện sau khi nhận đủ thông tin yêu cầu và tạm ứng (nếu áp dụng).',
        ],
      },
      {
        id: 'refund',
        title: '7. Chính sách hoàn tiền & sửa đổi',
        body: [
          'Ứng dụng AI và khóa học: KHÔNG hoàn tiền sau khi đã kích hoạt license hoặc cấp tài khoản học, do tính chất sản phẩm số.',
          'Dịch vụ render/video theo dự án: miễn phí chỉnh sửa nhỏ. Mỗi lượt chỉnh sửa lớn hoặc làm lại tính phí 75% theo bảng giá.',
          'Trường hợp NBOX AI không thể bàn giao đúng cam kết do lỗi từ phía chúng tôi, khách hàng được hoàn lại phần chưa thực hiện.',
        ],
      },
      {
        id: 'prohibited',
        title: '8. Hành vi bị cấm',
        body: [
          'Bạn cam kết KHÔNG:',
          [
            'Sao chép, dịch ngược (reverse engineer), giải mã hoặc xâm phạm bảo mật của ứng dụng.',
            'Tạo bản sao trái phép, phân phối lại license, hoặc xây dựng sản phẩm cạnh tranh dựa trên công nghệ NBOX AI.',
            'Tự động scrape website, gửi spam hoặc tấn công tài nguyên (DDoS).',
            'Tạo nội dung vi phạm pháp luật Việt Nam: khiêu dâm trẻ em, bạo lực, vu khống, xâm phạm danh dự, hoặc giả mạo người thật mà không có sự đồng ý.',
            'Tải lên nội dung vi phạm bản quyền của bên thứ ba.',
          ],
          'Vi phạm có thể dẫn đến chấm dứt license ngay lập tức, không hoàn tiền, và có thể bị truy cứu trách nhiệm pháp lý.',
        ],
      },
      {
        id: 'ip',
        title: '9. Sở hữu trí tuệ của NBOX AI',
        body: [
          'Mọi mã nguồn, model AI, thiết kế giao diện, logo, nội dung khóa học và tài liệu đào tạo của NBOX AI thuộc bản quyền của NBOX AI và đối tác.',
          'Việc sử dụng dịch vụ KHÔNG cấp cho bạn bất kỳ quyền sở hữu trí tuệ nào đối với tài sản của NBOX AI.',
        ],
      },
      {
        id: 'warranty',
        title: '10. Bảo hành và hỗ trợ',
        body: [
          'Ứng dụng AI NBOX được bảo hành cập nhật trong 10 năm kể từ ngày mua, bao gồm: vá lỗi, cải tiến tính năng cơ bản, và tương thích với các bản cập nhật model AI thông dụng.',
          'Mỗi gói ứng dụng có nhóm hỗ trợ riêng (Zalo) với phản hồi nhanh trong giờ làm việc.',
          'Tính năng đột phá hoàn toàn mới có thể được phát hành dưới dạng tùy chọn nâng cấp có phí riêng.',
        ],
      },
      {
        id: 'disclaimer',
        title: '11. Miễn trừ trách nhiệm',
        body: [
          'Dịch vụ được cung cấp "nguyên trạng" (as-is). Tuy NBOX AI nỗ lực vận hành ổn định, chúng tôi KHÔNG cam kết:',
          [
            'Dịch vụ AI có sẵn 100% thời gian, không gián đoạn.',
            'Mọi kết quả AI generate đều đáp ứng kỳ vọng chủ quan của khách hàng.',
            'Bảo toàn dữ liệu khách lưu cục bộ — bạn có trách nhiệm sao lưu file của mình.',
          ],
          'NBOX AI không chịu trách nhiệm cho thiệt hại gián tiếp như mất lợi nhuận, mất cơ hội kinh doanh, hoặc mất uy tín phát sinh từ việc sử dụng dịch vụ.',
        ],
      },
      {
        id: 'liability',
        title: '12. Giới hạn trách nhiệm',
        body: [
          'Tổng trách nhiệm bồi thường của NBOX AI trong mọi tình huống không vượt quá số tiền khách hàng đã thanh toán cho NBOX AI trong 12 tháng gần nhất.',
        ],
      },
      {
        id: 'termination',
        title: '13. Chấm dứt dịch vụ',
        body: [
          'NBOX AI có quyền tạm ngừng hoặc chấm dứt license của bạn nếu bạn vi phạm các điều khoản tại mục 8, hoặc theo yêu cầu của cơ quan nhà nước có thẩm quyền.',
          'Bạn có thể yêu cầu chấm dứt dịch vụ và xóa dữ liệu cá nhân bất cứ lúc nào (xem Chính sách bảo mật mục 9). Khoản phí đã thanh toán cho license trọn đời/dịch vụ đã giao sẽ không được hoàn lại.',
        ],
      },
      {
        id: 'governing-law',
        title: '14. Luật áp dụng & tranh chấp',
        body: [
          'Các điều khoản này được điều chỉnh bởi pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.',
          'Mọi tranh chấp sẽ ưu tiên giải quyết thông qua thương lượng trong vòng 30 ngày. Nếu không thành, tranh chấp sẽ được giải quyết tại Tòa án có thẩm quyền tại thành phố Đà Nẵng, Việt Nam.',
        ],
      },
    ],
  },
  en: {
    pageTitle: 'TERMS OF SERVICE',
    intro:
      'By using nbox-ai-landing-web, purchasing NBOX AI apps, enrolling in courses, or using our AI services, you agree to be bound by the terms below. Please read carefully before using.',
    updated: 'Last updated',
    tocLabel: 'CONTENTS',
    contactLabel: 'Legal contact',
    contactBody:
      'For any questions related to the terms of service, licensing, warranty, or disputes, please email us.',
    sections: [
      {
        id: 'acceptance',
        title: '1. Acceptance',
        body: [
          'By accessing the website or using any NBOX AI service, you confirm that you have read, understood, and agreed to follow these terms in full.',
          'If you do not agree, please stop accessing and using our services.',
        ],
      },
      {
        id: 'eligibility',
        title: '2. Eligibility',
        body: [
          'You must be at least 13 years old. Users under 18 require parental or guardian consent to make commercial transactions.',
          'You agree to provide accurate information when registering, purchasing, or contacting us. Misrepresentation may result in service termination without refund.',
        ],
      },
      {
        id: 'products',
        title: '3. Products and services',
        body: [
          'NBOX AI offers:',
          [
            'Locally installed AI apps (Rendering, Video, Visual, TextureLab, Human Enhancer, Virtual Staging, Prompt, Photo Enhancer, Kitchen Design).',
            'AI Flow tools (Rendering Flow, Video Flow).',
            'NBOX Academy online courses (Render AI, Video AI).',
            'Per-project AI services (rendering, image enhancement, architecture filmmaking).',
            'Custom app packages for enterprises.',
          ],
          'Descriptions, prices, and features may change without notice. Paid orders are governed by the terms in effect at the time of transaction.',
        ],
      },
      {
        id: 'license',
        title: '4. App license',
        body: [
          'When you purchase an NBOX AI app, you are granted the app together with a key gateway to use, non-exclusive, non-transferable, and lifetime for the chosen number of devices.',
          'The license does NOT include: account sharing rights, redistribution, resale, or providing third-party services on the NBOX platform.',
          'NBOX AI reserves the right to revoke the license upon detecting violations or fraud, with no refund for usage already accrued.',
        ],
      },
      {
        id: 'content-ownership',
        title: '5. Ownership of your content',
        body: [
          'You retain all ownership (copyright) of images, videos, prompts, and 3D models you create using NBOX AI apps/services.',
          'For Business / Enterprise / Private plans: your content stays fully private, NOT used for AI training, NOT publicly displayed unless covered by a separate written agreement.',
        ],
      },
      {
        id: 'payment',
        title: '6. Payment and invoicing',
        body: [
          'Listed prices are in VND, exclusive of 8% VAT and any gateway-key purchase fee, unless stated otherwise.',
          'Payment via Vietnamese bank transfer or any other channel designated by NBOX AI.',
          'Businesses receive full VAT invoices within 30 days of payment.',
          'Render/video service orders begin after we receive complete brief and deposit (if applicable).',
        ],
      },
      {
        id: 'refund',
        title: '7. Refund & revision policy',
        body: [
          'AI apps and courses: NO refunds after license activation or course access is granted, due to the digital nature of the product.',
          'Per-project render/video services: minor revisions are free. Each major revision or full redo is billed at 75% of the listed rate.',
          'If NBOX AI cannot deliver as promised due to our fault, the unfulfilled portion will be refunded.',
        ],
      },
      {
        id: 'prohibited',
        title: '8. Prohibited conduct',
        body: [
          'You agree NOT to:',
          [
            'Copy, reverse engineer, decompile, or attack the app’s security.',
            'Make unauthorized copies, redistribute licenses, or build competing products based on NBOX AI technology.',
            'Automatically scrape the website, send spam, or attack our resources (DDoS).',
            'Generate content that violates Vietnamese law: child pornography, violence, defamation, harassment, or impersonating real people without consent.',
            'Upload content that infringes third-party copyrights.',
          ],
          'Violations may result in immediate license termination without refund and potential legal action.',
        ],
      },
      {
        id: 'ip',
        title: '9. NBOX AI intellectual property',
        body: [
          'All source code, AI models, UI design, logos, course content, and training materials of NBOX AI are owned by NBOX AI and partners.',
          'Use of our services does NOT grant you any intellectual property rights over NBOX AI assets.',
        ],
      },
      {
        id: 'warranty',
        title: '10. Warranty and support',
        body: [
          'NBOX AI apps include 10 years of update warranty from purchase date, covering: bug fixes, basic feature improvements, and compatibility with popular AI model updates.',
          'Each app plan has a dedicated support group (Zalo) with fast response during business hours.',
          'Major new feature releases may be offered as separately paid upgrades.',
        ],
      },
      {
        id: 'disclaimer',
        title: '11. Disclaimer',
        body: [
          'The service is provided "as is". While NBOX AI strives for stable operation, we do NOT guarantee:',
          [
            'The AI service is available 100% of the time, without interruption.',
            'Every AI-generated result meets the customer’s subjective expectations.',
            'Preservation of data you store locally — you are responsible for backing up your files.',
          ],
          'NBOX AI is not liable for indirect damages such as lost profits, lost business opportunities, or reputational harm arising from the use of the service.',
        ],
      },
      {
        id: 'liability',
        title: '12. Limitation of liability',
        body: [
          'NBOX AI’s total compensation liability in any situation shall not exceed the amount the customer has paid to NBOX AI in the most recent 12 months.',
        ],
      },
      {
        id: 'termination',
        title: '13. Termination',
        body: [
          'NBOX AI may suspend or terminate your license if you breach Section 8 or upon legal request from competent authorities.',
          'You may request service termination and personal-data deletion at any time (see Privacy Policy §9). Fees already paid for lifetime licenses or delivered services are non-refundable.',
        ],
      },
      {
        id: 'governing-law',
        title: '14. Governing law & disputes',
        body: [
          'These terms are governed by the laws of the Socialist Republic of Vietnam.',
          'Disputes will first be resolved through good-faith negotiation within 30 days. Failing that, they will be resolved at the competent court in Da Nang City, Vietnam.',
        ],
      },
    ],
  },
};

export default function TermsOfService() {
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
                <a href={`#${s.id}`} className="block py-1 transition-colors hover:text-primary">
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
            <Link to="/privacy" className="transition-colors hover:text-primary">
              {language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
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
