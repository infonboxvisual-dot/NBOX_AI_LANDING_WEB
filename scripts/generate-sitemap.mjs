/**
 * Generate sitemap.xml dong tu list bai blog tren BE.
 * Chay tu dong qua `npm run build` (prebuild hook).
 *
 * Bo qua silently neu BE khong khai dat duoc -> giu sitemap.xml tinh hien co
 * (khong block build).
 *
 * Env can:
 *   VITE_API_BASE_URL  (vd: http://localhost:4000)
 *   SITEMAP_SITE_URL   (mac dinh: https://nboxai.io)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SITEMAP_PATH = path.join(PROJECT_ROOT, "public", "sitemap.xml");

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

const STATIC_URLS = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/workspace", priority: "0.9", changefreq: "weekly" },
  { loc: "/services", priority: "0.9", changefreq: "weekly" },
  { loc: "/courses", priority: "0.9", changefreq: "weekly" },
  { loc: "/courses/course-render-ai", priority: "0.7", changefreq: "monthly" },
  { loc: "/courses/course-video-ai", priority: "0.7", changefreq: "monthly" },
  { loc: "/enterprise", priority: "0.8", changefreq: "monthly" },
  { loc: "/contact", priority: "0.6", changefreq: "monthly" },
  { loc: "/blog", priority: "0.8", changefreq: "daily" },
  { loc: "/privacy", priority: "0.3", changefreq: "yearly" },
  { loc: "/terms", priority: "0.3", changefreq: "yearly" },
  { loc: "/cookies", priority: "0.3", changefreq: "yearly" },
];

async function fetchBlogEntries() {
  if (!apiBase) {
    console.warn("[sitemap] Skip blog routes — VITE_API_BASE_URL chua set");
    return [];
  }
  try {
    const res = await fetch(`${apiBase}/v1/posts/sitemap`);
    if (!res.ok) {
      console.warn(`[sitemap] BE tra ve ${res.status}, skip blog routes`);
      return [];
    }
    const payload = await res.json();
    if (!payload?.success || !Array.isArray(payload.data)) {
      console.warn("[sitemap] response shape khong hop le, skip blog routes");
      return [];
    }
    return payload.data;
  } catch (err) {
    console.warn(`[sitemap] khong goi duoc ${apiBase}/v1/posts/sitemap:`, err?.message || err);
    return [];
  }
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function buildXml({ staticUrls, blogEntries }) {
  const today = todayIso();
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>'];
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  for (const u of staticUrls) {
    lines.push("  <url>");
    lines.push(`    <loc>${SITE_URL}${u.loc}</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push(`    <changefreq>${u.changefreq}</changefreq>`);
    lines.push(`    <priority>${u.priority}</priority>`);
    lines.push("  </url>");
  }

  for (const entry of blogEntries) {
    const slug = String(entry?.slug || "").trim();
    if (!slug) continue;
    const updated = (entry?.updatedAt || entry?.publishedAt || "").slice(0, 10) || today;
    lines.push("  <url>");
    lines.push(`    <loc>${SITE_URL}/blog/${slug}</loc>`);
    lines.push(`    <lastmod>${updated}</lastmod>`);
    lines.push("    <changefreq>monthly</changefreq>");
    lines.push("    <priority>0.6</priority>");
    lines.push("  </url>");
  }

  lines.push("</urlset>");
  return lines.join("\n") + "\n";
}

const blogEntries = await fetchBlogEntries();
const xml = buildXml({ staticUrls: STATIC_URLS, blogEntries });

fs.mkdirSync(path.dirname(SITEMAP_PATH), { recursive: true });
fs.writeFileSync(SITEMAP_PATH, xml, "utf8");
console.log(
  `[sitemap] Wrote ${SITEMAP_PATH} (${STATIC_URLS.length} static + ${blogEntries.length} blog URLs)`
);
