import { FormEvent, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

type ContactCopy = {
  pageTitle: string;
  sectionTitle: string;
  name: string;
  email: string;
  phone: string;
  social: string;
  message: string;
  placeholders: {
    name: string;
    email: string;
    phone: string;
    social: string;
    message: string;
  };
  submit: string;
};

export default function Contact() {
  const { language } = useLanguage();

  const copy = useMemo<ContactCopy>(() => {
    if (language === 'vi') {
      return {
        pageTitle: 'LIÊN HỆ',
        sectionTitle: 'Gửi thông tin cho chúng tôi',
        name: 'Họ và tên',
        email: 'Email',
        phone: 'Số điện thoại',
        social: 'Link mạng xã hội',
        message: 'Nội dung liên hệ',
        placeholders: {
          name: 'Nhập họ và tên',
          email: 'vidu@email.com',
          phone: '09xx xxx xxx',
          social: 'https://…',
          message: 'Nhập nội dung bạn muốn gửi…',
        },
        submit: 'GỬI LIÊN HỆ',
      };
    }

    return {
      pageTitle: 'CONTACT',
      sectionTitle: 'Send us a message',
      name: 'Full name',
      email: 'Email',
      phone: 'Phone number',
      social: 'Social media link',
      message: 'Message',
      placeholders: {
        name: 'Your full name',
        email: 'you@example.com',
        phone: '+84 …',
        social: 'https://…',
        message: 'How can we help you?',
      },
      submit: 'SEND MESSAGE',
    };
  }, [language]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [social, setSocial] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = [
      `${copy.name}: ${name}`,
      `${copy.email}: ${email}`,
      `${copy.phone}: ${phone}`,
      `${copy.social}: ${social}`,
      '',
      `${copy.message}:`,
      message,
    ].join('\n');

    const mailto = `mailto:info.nboxvisual@gmail.com?subject=${encodeURIComponent(
      language === 'vi' ? `[LIÊN HỆ WEB] ${name || 'Khách'}` : `[WEB CONTACT] ${name || 'Guest'}`
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  return (
    <main className="overflow-hidden px-6 pb-20 pt-10 md:px-8 md:pb-28 md:pt-14">
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center md:mb-12">
          <h1 className="font-headline text-3xl font-black uppercase tracking-tighter text-on-surface md:text-5xl">
            {copy.pageTitle}
          </h1>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass-card rounded-2xl border border-on-surface/10 p-6 shadow-2xl md:rounded-3xl md:p-10"
        >
          <h2 className="mb-8 font-headline text-lg font-bold uppercase tracking-wide text-on-surface md:text-xl">
            {copy.sectionTitle}
          </h2>

          <form onSubmit={onSubmit} className="space-y-6 md:space-y-7">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="block text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                {copy.name}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={copy.placeholders.name}
                className="w-full rounded-xl border border-outline-variant/25 bg-surface-variant/40 p-4 font-sans text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none md:p-5 md:text-base"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="block text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                {copy.email}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={copy.placeholders.email}
                className="w-full rounded-xl border border-outline-variant/25 bg-surface-variant/40 p-4 font-sans text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none md:p-5 md:text-base"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-phone" className="block text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                {copy.phone}
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={copy.placeholders.phone}
                className="w-full rounded-xl border border-outline-variant/25 bg-surface-variant/40 p-4 font-sans text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none md:p-5 md:text-base"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-social" className="block text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                {copy.social}
              </label>
              <input
                id="contact-social"
                name="social"
                type="url"
                inputMode="url"
                value={social}
                onChange={(e) => setSocial(e.target.value)}
                placeholder={copy.placeholders.social}
                className="w-full rounded-xl border border-outline-variant/25 bg-surface-variant/40 p-4 font-sans text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none md:p-5 md:text-base"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="block text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                {copy.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={copy.placeholders.message}
                className="min-h-[140px] w-full resize-y rounded-xl border border-outline-variant/25 bg-surface-variant/40 p-4 font-sans text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none md:p-5 md:text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-4 font-headline text-sm font-black uppercase tracking-[0.2em] text-on-primary shadow-[0_0_40px_rgba(203,123,62,0.28)] transition-transform hover:scale-[1.01] active:scale-[0.99] md:py-5 md:text-base"
            >
              {copy.submit}
            </button>
          </form>
        </motion.section>
      </div>
    </main>
  );
}
