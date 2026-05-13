import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { MaterialIcon } from '../components/MaterialIcon';

type ContactCopy = {
  pageTitle: string;
  sectionTitle: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  placeholders: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  submit: string;
  sending: string;
  cooldown: (sec: number) => string;
  errors: {
    network: string;
    missing: string;
    invalidEmail: string;
    rateLimit: string;
    generic: string;
  };
  thanks: {
    title: string;
    body: string;
    close: string;
  };
};

const MAPS_LINK = 'https://www.google.com/maps/place/286+%C4%90.+29+Th%C3%A1ng+3,+H%C3%B2a+Xu%C3%A2n,+%C4%90%C3%A0+N%E1%BA%B5ng+550000/data=!4m2!3m1!1s0x31421a031ec24dcb:0xa0b3219ac53073af';
const MAPS_EMBED_SRC = 'https://www.google.com/maps?q=286+%C4%90%C6%B0%E1%BB%9Dng+29%2F3%2C+H%C3%B2a+Xu%C3%A2n%2C+C%E1%BA%A9m+L%E1%BB%87%2C+%C4%90%C3%A0+N%E1%BA%B5ng&output=embed';

const COOLDOWN_KEY = 'contact-cooldown-until';
const COOLDOWN_AFTER_SUCCESS_SEC = 60;
const SESSION_HISTORY_KEY = 'contact-submit-history';
const SESSION_LIMIT = 3;
const SESSION_WINDOW_MS = 60 * 60 * 1000;

function loadCooldown(): number {
  if (typeof window === 'undefined') return 0;
  const v = Number(window.localStorage.getItem(COOLDOWN_KEY));
  if (!v || Number.isNaN(v)) return 0;
  const remaining = Math.ceil((v - Date.now()) / 1000);
  return remaining > 0 ? remaining : 0;
}

function setCooldown(seconds: number) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(COOLDOWN_KEY, String(Date.now() + seconds * 1000));
}

function loadHistory(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SESSION_HISTORY_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    const now = Date.now();
    return arr.filter((t) => typeof t === 'number' && now - t < SESSION_WINDOW_MS);
  } catch {
    return [];
  }
}

function pushHistory(): number[] {
  if (typeof window === 'undefined') return [];
  const arr = [...loadHistory(), Date.now()];
  window.localStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(arr));
  return arr;
}

export default function Contact() {
  const { language, t } = useLanguage();

  const copy = useMemo<ContactCopy>(() => {
    if (language === 'vi') {
      return {
        pageTitle: 'LIÊN HỆ',
        sectionTitle: 'Gửi thông tin cho chúng tôi',
        name: 'Họ và tên',
        email: 'Email',
        phone: 'Số điện thoại',
        message: 'Nội dung liên hệ',
        placeholders: {
          name: 'Nhập họ và tên',
          email: 'vidu@email.com',
          phone: '09xx xxx xxx',
          message: 'Nhập nội dung bạn muốn gửi…',
        },
        submit: 'GỬI LIÊN HỆ',
        sending: 'ĐANG GỬI…',
        cooldown: (sec) => `VUI LÒNG CHỜ ${sec}S`,
        errors: {
          network: 'Không thể kết nối tới máy chủ. Vui lòng thử lại.',
          missing: 'Vui lòng điền đầy đủ Họ tên, Email và Nội dung.',
          invalidEmail: 'Email không hợp lệ.',
          rateLimit: 'Bạn đã gửi quá nhiều lần. Vui lòng thử lại sau.',
          generic: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
        },
        thanks: {
          title: 'CẢM ƠN BẠN!',
          body: 'Cảm ơn bạn đã tin tưởng dịch vụ bên chúng tôi. Đội ngũ hỗ trợ sẽ liên hệ bạn trong thời gian sớm nhất.',
          close: 'ĐÓNG',
        },
      };
    }

    return {
      pageTitle: 'CONTACT',
      sectionTitle: 'Send us a message',
      name: 'Full name',
      email: 'Email',
      phone: 'Phone number',
      message: 'Message',
      placeholders: {
        name: 'Your full name',
        email: 'you@example.com',
        phone: '+84 …',
        message: 'How can we help you?',
      },
      submit: 'SEND MESSAGE',
      sending: 'SENDING…',
      cooldown: (sec) => `PLEASE WAIT ${sec}S`,
      errors: {
        network: 'Could not reach the server. Please try again.',
        missing: 'Please fill in Name, Email, and Message.',
        invalidEmail: 'Invalid email address.',
        rateLimit: 'Too many submissions. Please try again later.',
        generic: 'Something went wrong. Please try again later.',
      },
      thanks: {
        title: 'THANK YOU!',
        body: 'Thanks for reaching out. Our team will contact you as soon as possible.',
        close: 'CLOSE',
      },
    };
  }, [language]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [hp, setHp] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showThanks, setShowThanks] = useState(false);
  const [cooldownSec, setCooldownSecState] = useState(0);
  const mountedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    setCooldownSecState(loadCooldown());
  }, []);

  // Tick cooldown countdown every second when active.
  useEffect(() => {
    if (cooldownSec <= 0) return;
    const id = setInterval(() => {
      setCooldownSecState((prev) => {
        const next = prev - 1;
        return next > 0 ? next : 0;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [cooldownSec]);

  const submitDisabled = status === 'loading' || cooldownSec > 0;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitDisabled) return;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMsg(copy.errors.missing);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('error');
      setErrorMsg(copy.errors.invalidEmail);
      return;
    }

    const history = loadHistory();
    if (history.length >= SESSION_LIMIT) {
      setStatus('error');
      setErrorMsg(copy.errors.rateLimit);
      setCooldown(COOLDOWN_AFTER_SUCCESS_SEC);
      setCooldownSecState(COOLDOWN_AFTER_SUCCESS_SEC);
      return;
    }

    setStatus('loading');
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          hp,
          ts: mountedAtRef.current,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; retryAfterSec?: number };

      if (res.ok && data.ok) {
        pushHistory();
        setCooldown(COOLDOWN_AFTER_SUCCESS_SEC);
        setCooldownSecState(COOLDOWN_AFTER_SUCCESS_SEC);
        setShowThanks(true);
        setStatus('idle');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        mountedAtRef.current = Date.now();
        return;
      }

      if (res.status === 429) {
        const wait = data.retryAfterSec ?? COOLDOWN_AFTER_SUCCESS_SEC;
        setCooldown(wait);
        setCooldownSecState(wait);
        setStatus('error');
        setErrorMsg(copy.errors.rateLimit);
        return;
      }

      setStatus('error');
      if (data.error === 'invalid_email') setErrorMsg(copy.errors.invalidEmail);
      else if (data.error === 'missing_required') setErrorMsg(copy.errors.missing);
      else setErrorMsg(copy.errors.generic);
    } catch {
      setStatus('error');
      setErrorMsg(copy.errors.network);
    }
  };

  const fieldClass =
    'w-full rounded-xl border border-outline-variant/25 bg-surface-variant/40 p-4 font-sans text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none md:p-4 md:text-base disabled:opacity-50 disabled:cursor-not-allowed';
  const labelClass = 'block text-[10px] font-black uppercase tracking-[0.2em] text-primary';

  const submitLabel =
    cooldownSec > 0 ? copy.cooldown(cooldownSec) : status === 'loading' ? copy.sending : copy.submit;

  return (
    <main className="overflow-hidden px-6 pb-20 pt-10 md:px-8 md:pb-28 md:pt-14">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center md:mb-12">
          <h1 className="font-headline text-3xl font-black uppercase tracking-tighter text-on-surface md:text-5xl">
            {copy.pageTitle}
          </h1>
        </motion.div>

        <motion.section
          id="contact-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mx-auto mb-10 max-w-4xl glass-card rounded-2xl border border-on-surface/10 p-6 shadow-2xl md:mb-14 md:rounded-3xl md:p-10"
        >
          <h2 className="mb-8 font-headline text-lg font-bold uppercase tracking-wide text-on-surface md:text-xl">
            {copy.sectionTitle}
          </h2>

          <form onSubmit={onSubmit} className="space-y-5 md:space-y-6" noValidate>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              <div className="space-y-2">
                <label htmlFor="contact-name" className={labelClass}>{copy.name}</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  disabled={status === 'loading'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={copy.placeholders.name}
                  className={fieldClass}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-phone" className={labelClass}>{copy.phone}</label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  disabled={status === 'loading'}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={copy.placeholders.phone}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className={labelClass}>{copy.email}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={status === 'loading'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={copy.placeholders.email}
                className={fieldClass}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className={labelClass}>{copy.message}</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                disabled={status === 'loading'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={copy.placeholders.message}
                className="min-h-[120px] w-full resize-y rounded-xl border border-outline-variant/25 bg-surface-variant/40 p-4 font-sans text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none md:p-4 md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Honeypot — hidden from humans, bots will fill it. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
              <label>
                Website
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                />
              </label>
            </div>

            {errorMsg && (
              <p
                role="alert"
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={submitDisabled}
              className="w-full rounded-xl bg-primary py-4 font-headline text-sm font-black uppercase tracking-[0.2em] text-on-primary shadow-[0_0_40px_rgba(203,123,62,0.28)] transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 md:py-5 md:text-base"
            >
              {submitLabel}
            </button>
          </form>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
        >
          <div className="glass-card rounded-2xl border border-on-surface/10 p-6 shadow-2xl md:rounded-3xl md:p-10">
            <h2 className="mb-8 font-headline text-lg font-bold uppercase tracking-wide text-on-surface md:text-xl">
              {t('contact.info.title')}
            </h2>

            <div className="space-y-5 md:space-y-6">
              <a
                href="mailto:info.nboxvisual@gmail.com"
                className="group flex items-start gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary md:h-12 md:w-12">
                  <MaterialIcon name="mail" className="size-5 md:size-[22px]" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{t('contact.info.email')}</p>
                  <p className="mt-1 break-all font-sans text-sm text-on-surface md:text-base">info.nboxvisual@gmail.com</p>
                </div>
              </a>

              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary md:h-12 md:w-12">
                  <MaterialIcon name="location_on" className="size-5 md:size-[22px]" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{t('contact.info.address')}</p>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-on-surface md:text-base">{t('contact.info.address_val')}</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary md:h-12 md:w-12">
                  <MaterialIcon name="schedule" className="size-5 md:size-[22px]" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{t('contact.info.hours')}</p>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-on-surface md:text-base">{t('contact.info.hours_val')}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-on-surface/5 pt-6 md:mt-10 md:pt-8">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary">{t('contact.info.social')}</p>
              <div className="flex gap-3">
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

          <div className="glass-card overflow-hidden rounded-2xl border border-on-surface/10 shadow-2xl md:rounded-3xl">
            <iframe
              title="NBOX AI office map"
              src={MAPS_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-full min-h-[320px] w-full border-0 md:min-h-[420px]"
            />
          </div>
        </motion.section>
      </div>

      <AnimatePresence>
        {showThanks && (
          <motion.div
            key="thanks-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-6 py-10 backdrop-blur-md"
            onClick={() => setShowThanks(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="thanks-title"
          >
            <motion.div
              key="thanks-card"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card relative max-w-md w-full rounded-3xl border border-primary/30 p-8 text-center shadow-[0_30px_60px_rgba(0,0,0,0.5)] md:p-10"
            >
              <button
                type="button"
                onClick={() => setShowThanks(false)}
                aria-label={copy.thanks.close}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-on-surface/5 text-on-surface-variant transition-colors hover:bg-on-surface/10 hover:text-on-surface"
              >
                <MaterialIcon name="close" className="size-5" strokeWidth={2} />
              </button>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 border border-primary/30">
                <MaterialIcon name="check_circle" className="size-9 text-primary" strokeWidth={2} />
              </div>
              <h3 id="thanks-title" className="mb-3 font-headline text-2xl font-black uppercase tracking-tighter text-on-surface md:text-3xl">
                {copy.thanks.title}
              </h3>
              <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">
                {copy.thanks.body}
              </p>
              <button
                type="button"
                onClick={() => setShowThanks(false)}
                className="mt-8 w-full rounded-xl bg-primary py-3 font-headline text-xs font-black uppercase tracking-[0.2em] text-on-primary shadow-[0_0_30px_rgba(164,88,42,0.35)] transition-transform hover:scale-[1.01] active:scale-95 md:text-sm"
              >
                {copy.thanks.close}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
