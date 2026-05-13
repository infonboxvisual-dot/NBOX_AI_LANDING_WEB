# Telegram Bot — Contact Form Setup

Form `/contact` gửi tin nhắn qua Telegram khi user submit (thay vì mailto). Backend là Vercel serverless function `api/contact.ts`.

## 1. Tạo Telegram Bot

1. Mở Telegram, search `@BotFather` (có check xanh chính chủ).
2. Gõ `/newbot` → trả lời 2 câu:
   - Tên hiển thị bot, vd `NBOX AI Contact`.
   - Username bot, kết thúc bằng `_bot`, vd `nbox_ai_contact_bot`.
3. BotFather trả về **API token** dạng `123456789:ABC-DEF...`. **Lưu token này — đó là `TELEGRAM_BOT_TOKEN`**.

## 2. Lấy Chat ID (nơi bot gửi tin nhắn về)

Có 2 option phổ biến:

### Option A: Gửi vào DM cá nhân của bạn
1. Search bot vừa tạo, bấm **Start** để mở chat.
2. Gõ tin nhắn bất kỳ (vd "hi") để bot biết bạn tồn tại.
3. Mở URL: `https://api.telegram.org/bot<TOKEN>/getUpdates` (thay `<TOKEN>` bằng token thật).
4. Tìm trong JSON: `"chat":{"id":123456789,"first_name":...}`. Số `id` đó là **chat ID** (số dương).

### Option B: Gửi vào nhóm (recommended cho team)
1. Tạo group mới trên Telegram, thêm bot vào group.
2. Gõ một tin nhắn trong group (`/start@nbox_ai_contact_bot`).
3. Mở `https://api.telegram.org/bot<TOKEN>/getUpdates`.
4. Tìm `"chat":{"id":-1001234567890,"title":"..."}`. ID nhóm thường âm và bắt đầu bằng `-100...`.

**Lưu chat ID đó — đó là `TELEGRAM_CHAT_ID`**.

## 3. Set env vars trên Vercel

1. Vào Vercel dashboard → project `nbox-ai-landing-web` → **Settings → Environment Variables**.
2. Add 2 biến (Environments: Production + Preview + Development):
   - `TELEGRAM_BOT_TOKEN` = `<token từ bước 1>`
   - `TELEGRAM_CHAT_ID` = `<chat id từ bước 2>`
3. Bấm **Save**.
4. Redeploy: vào tab **Deployments**, deploy mới nhất → menu 3 chấm → **Redeploy** (đảm bảo dùng env mới).

## 4. Test local (tùy chọn)

Local dev `npm run dev` không tự chạy `/api/*` (Vite không hiểu Vercel function). Test API bằng:

```bash
# Cài Vercel CLI
npm i -g vercel

# Login + link project
vercel login
vercel link

# Tải env vars về local .env.local
vercel env pull

# Chạy local với serverless functions
vercel dev
```

Mở `http://localhost:3000/contact`, submit form → Telegram nhận tin.

## 5. Bảo vệ chống spam

API `api/contact.ts` đã có:

- **Honeypot field** — bot điền hidden `website` field, server trả 200 silent (bot tưởng thành công).
- **Min fill time** — submit < 1.5s sau khi load form → silent reject.
- **Rate limit per IP** — tối đa 5 submit / 10 phút / IP (in-memory; reset khi function cold-start nhưng vẫn ngăn được attack burst).
- **Validation** — tên, email, message bắt buộc; email regex hợp lệ.

Frontend `Contact.tsx`:

- **Cooldown 60s** sau submit thành công (lưu localStorage).
- **Session limit 3 lần / giờ** (cùng browser, localStorage).
- **Submit button disable** trong thời gian cooldown / loading.

## 6. Troubleshooting

| Lỗi | Nguyên nhân | Cách fix |
|---|---|---|
| `telegram_not_configured` | Env vars chưa set | Set trong Vercel, redeploy |
| `telegram_error` | Token sai hoặc bot chưa được /start | Kiểm tra token, gửi `/start` cho bot trong chat |
| `telegram_unreachable` | Vercel function không gọi được Telegram | Hiếm; check Vercel logs |
| `rate_limited` | IP đã gửi 5+ lần trong 10 phút | Đợi hoặc đổi IP |
| Tin không tới group | Bot chưa được add vào group hoặc privacy mode bật | `/setprivacy` qua BotFather → Disable |

## 7. Tin nhắn Telegram mẫu

```
📩 Liên hệ mới từ website

Họ tên: Nguyễn Văn A
Email: a@example.com
SĐT: 0909 123 456

Nội dung:
Mình muốn tư vấn gói ứng dụng cho công ty 10 người...
```
