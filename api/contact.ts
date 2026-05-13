// Vercel Serverless Function — receives contact form, forwards to Telegram.
// Env vars (set in Vercel project settings → Environment Variables):
//   TELEGRAM_BOT_TOKEN  — from @BotFather
//   TELEGRAM_CHAT_ID    — your chat / group ID (use @userinfobot to find)
//
// Anti-abuse: in-memory IP rate limit + honeypot field + payload validation.

type VercelRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body: unknown;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  setHeader: (key: string, value: string) => VercelResponse;
  json: (body: unknown) => void;
  end: () => void;
};

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  hp?: string;
  ts?: number;
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipBucket = new Map<string, { count: number; windowStart: number }>();

const CTRL_CHAR_RE = /\p{Cc}/gu;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string') return fwd.split(',')[0]!.trim();
  if (Array.isArray(fwd)) return fwd[0] ?? 'unknown';
  return 'unknown';
}

function rateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const entry = ipBucket.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipBucket.set(ip, { count: 1, windowStart: now });
    return { allowed: true, retryAfterSec: 0 };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfterSec = Math.ceil((entry.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSec };
  }
  entry.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

function sanitize(raw: unknown, max = 2000): string {
  if (typeof raw !== 'string') return '';
  return raw.replace(CTRL_CHAR_RE, '').trim().slice(0, max);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    res.status(500).json({ ok: false, error: 'telegram_not_configured' });
    return;
  }

  let payload: ContactPayload;
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body as ContactPayload);
  } catch {
    res.status(400).json({ ok: false, error: 'invalid_json' });
    return;
  }

  if (payload.hp && payload.hp.length > 0) {
    res.status(200).json({ ok: true });
    return;
  }

  const name = sanitize(payload.name, 120);
  const email = sanitize(payload.email, 200);
  const phone = sanitize(payload.phone, 40);
  const message = sanitize(payload.message, 2000);

  if (!name || !email || !message) {
    res.status(400).json({ ok: false, error: 'missing_required' });
    return;
  }
  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ ok: false, error: 'invalid_email' });
    return;
  }

  if (typeof payload.ts === 'number') {
    const elapsed = Date.now() - payload.ts;
    if (elapsed < 1500) {
      res.status(200).json({ ok: true });
      return;
    }
  }

  const ip = clientIp(req);
  const { allowed, retryAfterSec } = rateLimit(ip);
  if (!allowed) {
    res.setHeader('Retry-After', String(retryAfterSec));
    res.status(429).json({ ok: false, error: 'rate_limited', retryAfterSec });
    return;
  }

  const text =
    `<b>📩 Liên hệ mới từ website</b>\n\n` +
    `<b>Họ tên:</b> ${escapeHtml(name)}\n` +
    `<b>Email:</b> ${escapeHtml(email)}\n` +
    (phone ? `<b>SĐT:</b> ${escapeHtml(phone)}\n` : '') +
    `\n<b>Nội dung:</b>\n${escapeHtml(message)}`;

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    if (!tgRes.ok) {
      const errBody = await tgRes.text().catch(() => '');
      console.error('Telegram API error', tgRes.status, errBody);
      res.status(502).json({ ok: false, error: 'telegram_error' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Telegram fetch failed', err);
    res.status(502).json({ ok: false, error: 'telegram_unreachable' });
  }
}
