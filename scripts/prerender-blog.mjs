/**
 * Prerender các trang chi tiết bài viết blog thành file HTML tĩnh trong thư mục dist/blog/[slug]/index.html.
 * Chạy tự động sau khi build (postbuild hook) để phục vụ SEO crawler (Facebook, Zalo, Telegram,...)
 * khi chia sẻ link, mà không cần Server-Side Rendering (SSR).
 *
 * Bỏ qua silently nếu build không cài đặt được -> không block quá trình build chính.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DIST_PATH = path.join(PROJECT_ROOT, "dist");
const TEMPLATE_PATH = path.join(DIST_PATH, "index.html");

const SITE_URL = (process.env.SITEMAP_SITE_URL || "https://nboxai.io").replace(/\/+$/, "");
const API_BASE = (process.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

function readEnvFromDotenv() {
  if (process.env.VITE_API_BASE_URL) return;
  try {
    const envFile = path.join(PROJECT_ROOT, ".env");
    if (!fs.existsSync(envFile)) return;
    const raw = fs.readFileSync(envFile, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx <= 0) continue;
      const key = trimmed.slice(0, idx).trim();
      let value = trimmed.slice(idx + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // ignore
  }
}

readEnvFromDotenv();

const apiBase = (process.env.VITE_API_BASE_URL || API_BASE || "").replace(/\/+$/, "");

async function prerender() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.warn("[prerender] Bỏ qua: Không tìm thấy file dist/index.html (Hãy chạy npm run build trước).");
    return;
  }

  if (!apiBase) {
    console.warn("[prerender] Bỏ qua: VITE_API_BASE_URL chưa được cấu hình.");
    return;
  }

  try {
    // 1. Lấy danh sách bài viết từ Backend
    const res = await fetch(`${apiBase}/v1/posts/sitemap`);
    if (!res.ok) {
      console.warn(`[prerender] BE trả về status ${res.status}, dừng prerender.`);
      return;
    }
    const payload = await res.json();
    if (!payload?.success || !Array.isArray(payload.data)) {
      console.warn("[prerender] Response shape không hợp lệ, dừng prerender.");
      return;
    }

    const posts = payload.data;
    const template = fs.readFileSync(TEMPLATE_PATH, "utf8");

    console.log(`[prerender] Bắt đầu sinh HTML tĩnh cho ${posts.length} bài viết...`);

    for (const postInfo of posts) {
      const slug = String(postInfo?.slug || "").trim();
      if (!slug) continue;

      // Lấy chi tiết bài viết từ Backend
      const detailRes = await fetch(`${apiBase}/v1/posts/${slug}`);
      if (!detailRes.ok) {
        console.warn(`[prerender] Không lấy được chi tiết bài viết: ${slug}`);
        continue;
      }
      const detailPayload = await detailRes.json();
      if (!detailPayload?.success || !detailPayload?.data) continue;

      const post = detailPayload.data;
      const title = `${post.seoTitle || post.title} | NBOX AI`;
      const desc = (post.seoDescription || post.excerpt || "").trim();
      const img = post.ogImage || post.coverImage || `${SITE_URL}/logo.jpg`;
      const canonical = post.canonical || `${SITE_URL}/blog/${slug}`;

      // Tạo schema article JSON-LD
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": desc,
        "image": img ? [img] : undefined,
        "datePublished": post.publishedAt,
        "dateModified": post.updatedAt,
        "inLanguage": post.lang === "vi" ? "vi-VN" : "en-US",
        "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
        "author": { "@type": "Organization", "name": "NBOX AI" },
        "publisher": {
          "@type": "Organization",
          "name": "NBOX AI",
          "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.jpg` }
        }
      };

      const schemaHtml = `<script type="application/ld+json">${JSON.stringify(articleSchema).replace(/</g, "\\u003c")}</script>`;

      // Thay thế metadata trong index.html
      let html = template;

      // Xóa thẻ title mặc định nếu có
      html = html.replace(/<title>.*?<\/title>/gi, "");

      // Tạo nhóm tag SEO chèn vào head
      const seoTags = `
  <title>${title}</title>
  <meta name="description" content="${desc.replace(/"/g, "&quot;")}" />
  <link rel="canonical" href="${canonical}" />
  ${post.noIndex ? '<meta name="robots" content="noindex, nofollow" />' : ""}
  <meta property="og:title" content="${title.replace(/"/g, "&quot;")}" />
  <meta property="og:description" content="${desc.replace(/"/g, "&quot;")}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${img}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title.replace(/"/g, "&quot;")}" />
  <meta name="twitter:description" content="${desc.replace(/"/g, "&quot;")}" />
  <meta name="twitter:image" content="${img}" />
  ${schemaHtml}
`;

      // Chèn meta tags vào sau thẻ <head>
      html = html.replace("<head>", `<head>${seoTags}`);

      // Ghi file tĩnh vào dist/blog/[slug]/index.html
      const outputDir = path.join(DIST_PATH, "blog", slug);
      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(path.join(outputDir, "index.html"), html, "utf8");
    }

    console.log(`[prerender] Đã hoàn thành sinh ${posts.length} bài viết tĩnh vào thư mục dist.`);
  } catch (err) {
    console.error("[prerender] Lỗi quá trình prerender:", err?.message || err);
  }
}

prerender();
