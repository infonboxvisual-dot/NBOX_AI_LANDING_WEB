import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Check, Copy, ExternalLink, Gift, KeyRound, MonitorSmartphone, Sparkles } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';

const RENDER_APP_URL = 'https://render.nboxai.io/';
const GUIDE_DOC_URL = 'https://docs.google.com/presentation/d/1Gno7_J8RtRonWZb3BapjNTofiZahBAlNMuEdJy84D54/edit?usp=sharing';
const PAYMENT_URL = 'https://payment.nboxai.io/';
const ZALO_PHONE = '0818058511';
const ZALO_URL = `https://zalo.me/${ZALO_PHONE}`;

const COPY = {
  vi: {
    seoTitle: 'Quà tặng ưu đãi học viên AI Agent',
    seoDesc:
      'Hướng dẫn học viên khóa AI AGENT nhận quà: khóa RENDER AI THỰC CHIẾN và App Render Online miễn phí thuê vĩnh viễn, cùng cách mua và kích hoạt key Gateway.',
    copy: 'Sao chép',
    copied: 'Đã sao chép',
    badge: 'Quà tặng có giới hạn',
    heroTitle: 'Hướng dẫn học viên',
    heroAccent: 'AI Agent nhận quà',
    heroDesc: 'Dành riêng cho học viên AI AGENT đã thanh toán thành công.',
    heroCta: 'Xem cách nhận quà',
    openApp: 'Mở App Render Online',
    artRender: 'Thực chiến · Trọn đời',
    artApp: 'Miễn phí thuê vĩnh viễn',
    giftsKicker: 'Quyền lợi của bạn',
    giftsTitle: 'Hai món quà, thêm sức mạnh cho workflow AI',
    giftsDesc: 'Nhận quyền lợi theo hướng dẫn bên dưới sau khi thanh toán khóa AI AGENT thành công.',
    gifts: [
      {
        tag: 'QUÀ TẶNG 01',
        title: 'Khóa RENDER AI THỰC CHIẾN',
        desc: 'Khóa học sẽ được tự động thêm vào tài khoản học tập của bạn trong vòng vài tiếng sau khi thanh toán thành công khóa AI AGENT KIẾN TRÚC SƯ.',
        foot: 'Tự động cấp quyền · Truy cập trọn đời',
      },
      {
        tag: 'QUÀ TẶNG 02',
        title: 'App Render Online',
        desc: 'Miễn phí phí thuê ứng dụng vĩnh viễn và sử dụng toàn bộ chức năng app. Key Gateway tạo ảnh được mua riêng theo nhu cầu.',
        foot: 'Miễn phí thuê app · Gateway mua riêng',
      },
    ],
    stepsKicker: 'Hướng dẫn từng bước',
    stepsTitle: 'Nhận quyền truy cập của bạn',
    stepsDesc: 'Làm theo thứ tự bên dưới để quá trình cấp quyền diễn ra thuận lợi.',
    panel1Title: 'Nhận khóa RENDER AI',
    panel1Sub: 'Không cần đăng ký thêm',
    p1s1Title: 'Kiểm tra tài khoản học tập',
    p1s1: 'Sau khi thanh toán AI AGENT thành công, khóa RENDER AI THỰC CHIẾN sẽ tự động được thêm vào tài khoản trong vòng vài tiếng.',
    p1s2Title: 'Chưa thấy khóa học?',
    p1s2: 'Vui lòng chờ vài tiếng để hệ thống cập nhật. Nếu vẫn chưa có, liên hệ admin để được kiểm tra.',
    panel2Title: 'Truy cập App Render Online',
    panel2Sub: 'Tạo tài khoản và gửi yêu cầu duyệt',
    p2s1Title: 'Mở ứng dụng',
    p2s1: 'Truy cập App Render Online bằng đường dẫn bên dưới.',
    p2s2Title: 'Tạo tài khoản và gửi yêu cầu',
    p2s2: 'Làm theo hướng dẫn trong tài liệu.',
    p2s2Link: 'Mở tài liệu hướng dẫn',
    p2s3Title: 'Nhắn admin để được duyệt',
    p2s3Pre: 'Liên hệ Phương NBOX qua Zalo',
    p2s3Post: 'và cung cấp email dùng để đăng ký app.',
    sampleMessage:
      'Em duyệt cho anh vào App Render với nhé. Anh là học viên khóa AI AGENT, email tài khoản của anh là [email đăng ký].',
    copyMessage: 'Sao chép tin nhắn mẫu',
    noteLabel: 'Lưu ý:',
    note: 'Hãy gửi đúng email đã đăng ký trên App Render Online để admin kiểm tra và cấp quyền.',
    contactZalo: 'Liên hệ admin trên Zalo',
    gatewayKicker: 'Kích hoạt tạo ảnh',
    gatewayTitle: 'Mua và nhập key Gateway',
    gatewayDesc: 'App Render Online được miễn phí phí thuê. Để tạo ảnh, bạn cần mua key Gateway riêng theo nhu cầu sử dụng.',
    gatewayCardTitle: 'Mua thêm Gateway tạo ảnh',
    gatewayCardDesc: 'Thực hiện theo hướng dẫn minh họa bên dưới. Gateway được mua riêng theo nhu cầu sử dụng.',
    paidTag: 'Key mua riêng',
    imageAlt:
      'Hướng dẫn trực quan 5 bước mua Gateway tạo ảnh trên NBOX AI: truy cập trang thanh toán, chọn Tôi đã dùng rồi, chọn Mua Gateway, thanh toán và sao chép key, nhập key vào app và lưu.',
    imageCaption: 'Hình minh họa chi tiết các thao tác trên trang thanh toán và trong App Render Online.',
    buyGateway: 'Mua Gateway ngay',
    supportKicker: 'Cần hỗ trợ?',
    supportTitle: 'Liên hệ Phương NBOX',
    supportDesc: 'Nếu cần hỗ trợ nhận quà, cấp quyền truy cập app hoặc kích hoạt Gateway, hãy liên hệ admin qua Zalo.',
    zaloBtn: 'Nhắn Zalo 0818 058 511',
    copyPhone: 'Sao chép số điện thoại',
  },
  en: {
    seoTitle: 'Gifts & Offers for AI Agent Students',
    seoDesc:
      'How AI AGENT students claim their gifts: the PRACTICAL RENDER AI course and lifetime free rental of the Render Online app, plus how to buy and activate a Gateway key.',
    copy: 'Copy',
    copied: 'Copied',
    badge: 'Limited-time gifts',
    heroTitle: 'Gift guide for',
    heroAccent: 'AI Agent students',
    heroDesc: 'Exclusively for AI AGENT students who have completed payment.',
    heroCta: 'See how to claim',
    openApp: 'Open Render Online App',
    artRender: 'Practical · Lifetime',
    artApp: 'Free rental forever',
    giftsKicker: 'Your benefits',
    giftsTitle: 'Two gifts to power up your AI workflow',
    giftsDesc: 'Claim your benefits by following the guide below after paying for the AI AGENT course.',
    gifts: [
      {
        tag: 'GIFT 01',
        title: 'PRACTICAL RENDER AI course',
        desc: 'The course is automatically added to your learning account within a few hours after you successfully pay for the AI AGENT FOR ARCHITECT course.',
        foot: 'Auto-granted access · Lifetime access',
      },
      {
        tag: 'GIFT 02',
        title: 'Render Online App',
        desc: 'Lifetime free app rental with full access to every feature. The image-generation Gateway key is purchased separately as needed.',
        foot: 'Free app rental · Gateway sold separately',
      },
    ],
    stepsKicker: 'Step-by-step guide',
    stepsTitle: 'Get your access',
    stepsDesc: 'Follow the steps below in order so your access is granted smoothly.',
    panel1Title: 'Get the RENDER AI course',
    panel1Sub: 'No extra registration needed',
    p1s1Title: 'Check your learning account',
    p1s1: 'After your AI AGENT payment succeeds, the PRACTICAL RENDER AI course is added to your account automatically within a few hours.',
    p1s2Title: "Don't see the course yet?",
    p1s2: 'Please allow a few hours for the system to update. If it still isn’t there, contact the admin to check.',
    panel2Title: 'Access the Render Online App',
    panel2Sub: 'Create an account and request approval',
    p2s1Title: 'Open the app',
    p2s1: 'Go to the Render Online App using the link below.',
    p2s2Title: 'Create an account and send a request',
    p2s2: 'Follow the instructions in the guide.',
    p2s2Link: 'Open the guide',
    p2s3Title: 'Message the admin for approval',
    p2s3Pre: 'Contact Phương NBOX on Zalo',
    p2s3Post: 'and provide the email you used to sign up for the app.',
    sampleMessage:
      "Hi, please approve my access to the Render App. I'm an AI AGENT student and my account email is [your sign-up email].",
    copyMessage: 'Copy sample message',
    noteLabel: 'Note:',
    note: 'Make sure to send the exact email registered on the Render Online App so the admin can verify and grant access.',
    contactZalo: 'Contact admin on Zalo',
    gatewayKicker: 'Enable image generation',
    gatewayTitle: 'Buy and enter a Gateway key',
    gatewayDesc: 'The Render Online App is rental-free. To generate images, you need to buy a separate Gateway key based on your usage.',
    gatewayCardTitle: 'Buy an image-generation Gateway',
    gatewayCardDesc: 'Follow the illustrated guide below. Gateway is purchased separately based on your needs.',
    paidTag: 'Key sold separately',
    imageAlt:
      'Illustrated 5-step guide to buying an image-generation Gateway on NBOX AI: open the payment page, choose “I’ve used it before”, choose Buy Gateway, pay and copy the key, then paste the key into the app and save.',
    imageCaption: 'Detailed illustration of the steps on the payment page and inside the Render Online App (in Vietnamese).',
    buyGateway: 'Buy Gateway now',
    supportKicker: 'Need help?',
    supportTitle: 'Contact Phương NBOX',
    supportDesc: 'If you need help claiming gifts, getting app access, or activating Gateway, contact the admin on Zalo.',
    zaloBtn: 'Zalo 0818 058 511',
    copyPhone: 'Copy phone number',
  },
};

type Copy = (typeof COPY)['vi'];

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

function CopyButton({ value, label, copiedLabel, className = '' }: { value: string; label: string; copiedLabel: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement('textarea');
      area.value = value;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-bold text-primary-container transition-colors hover:border-primary/60 hover:bg-primary/20 ${className}`}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? copiedLabel : label}
    </button>
  );
}

function LinkBox({ href, text, c }: { href: string; text: string; c: Copy }) {
  return (
    <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-on-surface/10 bg-surface-container-high px-3 py-2.5 text-xs">
      <a href={href} target="_blank" rel="noopener noreferrer" className="min-w-0 break-all font-semibold text-primary-container hover:underline">
        {text} ↗
      </a>
      <CopyButton value={href} label={c.copy} copiedLabel={c.copied} />
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[30px_1fr] gap-3">
      <span className="grid size-7 place-items-center rounded-lg border border-primary/40 bg-primary/10 text-xs font-black text-primary-container">
        {n}
      </span>
      <div>
        <h4 className="mb-1 text-sm font-bold text-on-surface">{title}</h4>
        <div className="text-[13px] leading-relaxed text-on-surface-variant">{children}</div>
      </div>
    </div>
  );
}

function SectionHead({ kicker, title, desc }: { kicker: string; title: string; desc: string }) {
  return (
    <motion.div {...reveal} className="mb-8 max-w-2xl">
      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">{kicker}</p>
      <h2 className="mt-3 font-headline text-2xl font-black uppercase tracking-tight text-on-surface md:text-4xl">{title}</h2>
      <p className="mt-3 text-sm text-on-surface-variant md:text-base">{desc}</p>
    </motion.div>
  );
}

function PanelTitle({ n, title, sub }: { n: string; title: string; sub: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary font-black text-on-primary shadow-[0_0_20px_rgba(203,123,62,0.3)]">
        {n}
      </span>
      <div>
        <h3 className="font-headline text-lg font-black uppercase tracking-tight text-on-surface md:text-xl">{title}</h3>
        <p className="text-xs text-on-surface-variant">{sub}</p>
      </div>
    </div>
  );
}

const primaryBtn =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-headline text-xs font-black uppercase tracking-[0.12em] text-on-primary shadow-[0_0_30px_rgba(203,123,62,0.3)] transition-transform hover:scale-[1.02] md:text-sm';
const secondaryBtn =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 px-6 py-3.5 font-headline text-xs font-black uppercase tracking-[0.12em] text-primary-container transition-colors hover:bg-primary/10 md:text-sm';

const GIFT_ICONS = [Sparkles, MonitorSmartphone];

export default function GiftGuide() {
  const { language } = useLanguage();
  const c = language === 'vi' ? COPY.vi : COPY.en;

  useSEO({
    title: c.seoTitle,
    description: c.seoDesc,
    canonicalPath: '/qua-tang-uu-dai',
  });

  return (
    <main className="editorial-grid overflow-hidden">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-14 md:px-8 md:pb-16 md:pt-20">
        <div className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-primary-container">
              <span className="size-1.5 animate-pulse rounded-full bg-primary-container shadow-[0_0_10px_rgba(224,160,106,0.8)]" />
              {c.badge}
            </span>
            <h1 className="font-headline text-4xl font-black uppercase leading-[1.05] tracking-tighter text-on-surface md:text-6xl">
              {c.heroTitle}
              <br />
              <span className="bg-gradient-to-r from-primary-container via-secondary to-primary bg-clip-text italic text-transparent">
                {c.heroAccent}
              </span>
            </h1>
            <p className="max-w-xl text-base text-on-surface-variant md:text-lg">{c.heroDesc}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#steps" className={primaryBtn}>
                {c.heroCta} <ArrowDown className="size-4" />
              </a>
              <a href={RENDER_APP_URL} target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
                {c.openApp} <ExternalLink className="size-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto grid h-72 w-full max-w-sm place-items-center md:h-80"
            aria-hidden="true"
          >
            <div className="absolute size-56 rounded-full bg-[radial-gradient(circle_at_35%_28%,#f3c9a2_0,#e0a06a_20%,#a4582a_52%,transparent_70%)] opacity-90 blur-[1px] md:size-64" />
            <motion.div
              className="absolute h-36 w-80 rounded-[50%] border border-primary-container/40"
              style={{ rotate: -30 }}
              animate={{ rotate: [-30, 330] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute top-4 left-0 glass-card rounded-2xl border border-primary/20 px-4 py-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="mb-1.5 size-5 text-primary-container" />
              <strong className="block text-xs font-black text-on-surface">RENDER AI</strong>
              <span className="text-[11px] text-on-surface-variant">{c.artRender}</span>
            </motion.div>
            <motion.div
              className="absolute right-0 bottom-6 glass-card rounded-2xl border border-primary/20 px-4 py-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <MonitorSmartphone className="mb-1.5 size-5 text-primary-container" />
              <strong className="block text-xs font-black text-on-surface">APP ONLINE</strong>
              <span className="text-[11px] text-on-surface-variant">{c.artApp}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gifts */}
      <section id="gifts" className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
        <SectionHead kicker={c.giftsKicker} title={c.giftsTitle} desc={c.giftsDesc} />
        <div className="grid gap-6 md:grid-cols-2">
          {c.gifts.map(({ tag, title, desc, foot }, i) => {
            const Icon = GIFT_ICONS[i];
            return (
              <motion.article
                key={tag}
                {...reveal}
                className="glass-card relative overflow-hidden rounded-2xl border border-on-surface/10 p-6 transition-colors hover:border-primary/30 md:p-8"
              >
                <div className="pointer-events-none absolute -top-20 -right-16 size-48 rounded-full bg-primary/10 blur-2xl" />
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-black tracking-[0.15em] text-primary-container">
                    {tag}
                  </span>
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/15 text-primary-container">
                    <Icon className="size-6" />
                  </span>
                </div>
                <h3 className="mt-5 font-headline text-xl font-black uppercase tracking-tight text-on-surface md:text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{desc}</p>
                <div className="mt-5 flex items-center gap-2 border-t border-on-surface/10 pt-4 text-xs text-on-surface/80">
                  <Check className="size-4 text-primary-container" /> {foot}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="scroll-mt-24 mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
        <SectionHead kicker={c.stepsKicker} title={c.stepsTitle} desc={c.stepsDesc} />
        <div className="grid items-start gap-6 md:grid-cols-2">
          <motion.article {...reveal} className="glass-card rounded-2xl border border-on-surface/10 p-6 md:p-8">
            <PanelTitle n="01" title={c.panel1Title} sub={c.panel1Sub} />
            <div className="grid gap-5">
              <Step n={1} title={c.p1s1Title}>{c.p1s1}</Step>
              <Step n={2} title={c.p1s2Title}>{c.p1s2}</Step>
            </div>
          </motion.article>

          <motion.article {...reveal} className="glass-card rounded-2xl border border-on-surface/10 p-6 md:p-8">
            <PanelTitle n="02" title={c.panel2Title} sub={c.panel2Sub} />
            <div className="grid gap-5">
              <Step n={1} title={c.p2s1Title}>
                {c.p2s1}
                <LinkBox href={RENDER_APP_URL} text="render.nboxai.io" c={c} />
              </Step>
              <Step n={2} title={c.p2s2Title}>
                {c.p2s2}
                <LinkBox href={GUIDE_DOC_URL} text={c.p2s2Link} c={c} />
              </Step>
              <Step n={3} title={c.p2s3Title}>
                {c.p2s3Pre} <strong className="text-on-surface">{ZALO_PHONE}</strong> {c.p2s3Post}
                <div className="mt-3 rounded-xl border border-dashed border-primary/40 bg-surface-container-high p-3.5 text-[13px] text-on-surface/85">
                  “{c.sampleMessage}”
                  <div className="mt-3">
                    <CopyButton value={c.sampleMessage} label={c.copyMessage} copiedLabel={c.copied} />
                  </div>
                </div>
              </Step>
            </div>
            <div className="mt-5 rounded-xl border border-primary/25 bg-primary/10 p-3.5 text-xs text-on-surface-variant">
              <strong className="text-primary-container">{c.noteLabel}</strong> {c.note}
            </div>
            <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className={`${primaryBtn} mt-5 w-full sm:w-auto`}>
              {c.contactZalo} <ExternalLink className="size-4" />
            </a>
          </motion.article>
        </div>
      </section>

      {/* Gateway */}
      <section id="gateway" className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
        <SectionHead kicker={c.gatewayKicker} title={c.gatewayTitle} desc={c.gatewayDesc} />
        <motion.div {...reveal} className="glass-card relative overflow-hidden rounded-2xl border border-primary/25 p-6 md:p-8">
          <div className="pointer-events-none absolute -top-32 -right-20 size-64 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row">
            <div>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-black tracking-[0.15em] text-primary-container">
                GATEWAY SETUP
              </span>
              <h3 className="mt-3 font-headline text-xl font-black uppercase tracking-tight text-on-surface md:text-2xl">
                {c.gatewayCardTitle}
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">{c.gatewayCardDesc}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-primary-container/40 bg-primary-container/10 px-3 py-1.5 text-[11px] font-bold text-primary-container">
              <KeyRound className="size-3.5" /> {c.paidTag}
            </span>
          </div>

          <figure className="relative mx-auto mt-8 max-w-3xl">
            <img
              src="/app/gift-gateway-guide.webp"
              alt={c.imageAlt}
              width={1024}
              height={1536}
              loading="lazy"
              className="block h-auto w-full rounded-xl border border-primary/30 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            />
            <figcaption className="mt-3 text-center text-xs text-on-surface-variant">{c.imageCaption}</figcaption>
          </figure>

          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={PAYMENT_URL} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
              {c.buyGateway} <ExternalLink className="size-4" />
            </a>
            <a href={RENDER_APP_URL} target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
              {c.openApp} <ExternalLink className="size-4" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Support */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-12 md:px-8 md:pb-28 md:pt-16">
        <motion.div
          {...reveal}
          className="glass-card flex flex-col items-start justify-between gap-6 rounded-2xl border border-primary/25 bg-[radial-gradient(ellipse_at_100%_0%,rgba(164,88,42,0.18),transparent_55%)] p-6 md:flex-row md:items-center md:p-10"
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">{c.supportKicker}</p>
            <h2 className="mt-2 font-headline text-2xl font-black uppercase tracking-tight text-on-surface md:text-3xl">{c.supportTitle}</h2>
            <p className="mt-2 max-w-xl text-sm text-on-surface-variant">{c.supportDesc}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
              <Gift className="size-4" /> {c.zaloBtn}
            </a>
            <CopyButton value={ZALO_PHONE} label={c.copyPhone} copiedLabel={c.copied} className="justify-center px-4 py-3.5" />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
