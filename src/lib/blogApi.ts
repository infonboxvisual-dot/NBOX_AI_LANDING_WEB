// API client cho /v1/posts/* (public BE).
// BE: c:/AI/nbox app/nbox-be-backup-ggcloud/nextjs/app/v1/posts/*

export interface BlogPostSummary {
  id: string;
  slug: string;
  lang: 'vi' | 'en';
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  focusKeyword: string | null;
  seoScore: number;
  status: 'draft' | 'published';
  publishedAt: string | null;
  updatedAt: string;
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage: string | null;
  canonical: string | null;
  noIndex: boolean;
  createdAt: string;
}

export interface BlogSitemapEntry {
  slug: string;
  lang: 'vi' | 'en';
  updatedAt: string;
  publishedAt: string | null;
}

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

interface ApiSuccess<T> {
  success: true;
  data: T;
}
interface ApiError {
  success: false;
  error: { code: string; message: string };
}
type ApiResult<T> = ApiSuccess<T> | ApiError;

async function apiGet<T>(path: string): Promise<T> {
  if (!API_BASE) {
    throw new Error('VITE_API_BASE_URL chua duoc cau hinh');
  }
  const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  const payload = (await res.json().catch(() => null)) as ApiResult<T> | null;
  if (!payload) throw new Error(`Loi parse response (HTTP ${res.status})`);
  if (payload.success === true) {
    return payload.data;
  }
  throw new Error(payload.error.message);
}

const CACHE_PREFIX = 'nbox-blog-';

export function getCachedBlogPosts(
  lang: 'vi' | 'en',
  options: { page?: number; limit?: number } = {}
): { items: BlogPostSummary[]; page: number; limit: number; hasMore: boolean } | null {
  if (typeof window === 'undefined') return null;
  try {
    const q = new URLSearchParams({ lang });
    if (options.page) q.set('page', String(options.page));
    if (options.limit) q.set('limit', String(options.limit));
    const raw = localStorage.getItem(CACHE_PREFIX + `list-${q.toString()}`);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (entry && Array.isArray(entry.data?.items)) {
      return entry.data;
    }
  } catch {}
  return null;
}

export function getCachedBlogPost(slug: string): BlogPostDetail | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + `post-${slug}`);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (entry && entry.data) {
      return entry.data;
    }
  } catch {}
  return null;
}

export function isCacheFresh(key: string, ttlMs = 45000): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return false;
    const entry = JSON.parse(raw);
    if (entry && typeof entry.timestamp === 'number') {
      return Date.now() - entry.timestamp < ttlMs;
    }
  } catch {}
  return false;
}

export async function fetchBlogPosts(
  lang: 'vi' | 'en',
  options: { page?: number; limit?: number } = {}
): Promise<{ items: BlogPostSummary[]; page: number; limit: number; hasMore: boolean }> {
  const q = new URLSearchParams({ lang });
  if (options.page) q.set('page', String(options.page));
  if (options.limit) q.set('limit', String(options.limit));
  const queryStr = q.toString();

  const data = await apiGet<{ items: BlogPostSummary[]; page: number; limit: number; hasMore: boolean }>(`/v1/posts?${queryStr}`);
  
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(
        CACHE_PREFIX + `list-${queryStr}`,
        JSON.stringify({ data, timestamp: Date.now() })
      );
    } catch (e) {
      console.warn('Failed to write to blog list cache:', e);
    }
  }
  return data;
}

export async function fetchBlogPost(slug: string): Promise<BlogPostDetail> {
  const data = await apiGet<BlogPostDetail>(`/v1/posts/${encodeURIComponent(slug)}`);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(
        CACHE_PREFIX + `post-${slug}`,
        JSON.stringify({ data, timestamp: Date.now() })
      );
    } catch (e) {
      console.warn('Failed to write to blog post cache:', e);
    }
  }
  return data;
}

export async function fetchBlogSitemap(): Promise<BlogSitemapEntry[]> {
  return apiGet<BlogSitemapEntry[]>(`/v1/posts/sitemap`);
}
