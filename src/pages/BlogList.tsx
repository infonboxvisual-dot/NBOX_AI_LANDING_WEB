import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { fetchBlogPosts, getCachedBlogPosts, isCacheFresh, type BlogPostSummary } from '../lib/blogApi';

const COPY = {
  vi: {
    eyebrow: 'NBOX Blog',
    title: 'GÓC NHÌN NBOX AI',
    desc: 'Cập nhật kiến thức mới nhất về AI cho kiến trúc, render 3D, bất động sản và workflow sáng tạo.',
    empty: 'Các bài viết mới sẽ được cập nhật sớm.',
    error: 'Không thể tải bài viết, vui lòng thử lại sau.',
    loading: 'Đang tải bài viết...',
    readMore: 'Đọc tiếp',
    publishedOn: 'Đăng ngày',
  },
  en: {
    eyebrow: 'NBOX Blog',
    title: 'NBOX AI INSIGHTS',
    desc: 'Latest knowledge on AI for architecture, 3D render, real estate, and creative workflow.',
    empty: 'New articles will be updated soon.',
    error: 'Failed to load posts. Please try again later.',
    loading: 'Loading posts...',
    readMore: 'Read more',
    publishedOn: 'Published on',
  },
};

function formatDate(iso: string | null, lang: 'vi' | 'en'): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function BlogList() {
  const { language } = useLanguage();
  const copy = COPY[language];
  const [posts, setPosts] = useState<BlogPostSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    const queryStr = new URLSearchParams({ lang: language, limit: '30' }).toString();
    const cacheKey = `list-${queryStr}`;

    // SWR Step 1: Read stale data immediately
    const staleData = getCachedBlogPosts(language, { limit: 30 });
    if (staleData) {
      setPosts(staleData.items);
    } else {
      setPosts(null); // Show loading only if no cache exists
    }
    setError(null);

    // If cache is fresh (within 30 seconds), skip background revalidation request
    if (isCacheFresh(cacheKey, 30000) && staleData) {
      return;
    }

    // SWR Step 2: Fetch fresh data in the background
    fetchBlogPosts(language, { limit: 30 })
      .then((data) => {
        if (cancelled) return;
        
        // SWR Step 3: Compare and update UI if changed
        const isSame = staleData && JSON.stringify(staleData.items) === JSON.stringify(data.items);
        if (!isSame) {
          setPosts(data.items);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        // If we don't have stale data, display error
        if (!staleData) {
          setError(copy.error);
          setPosts([]);
        } else {
          console.warn('Background blog fetch failed:', err);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [language, copy.error]);

  useSEO({
    title: copy.title,
    description: copy.desc,
    canonicalPath: '/blog'
  });

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-20">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mb-10 md:mb-14"
        >
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">
            {copy.eyebrow}
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight text-on-background">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-2xl text-on-surface-variant text-sm md:text-base leading-relaxed">
            {copy.desc}
          </p>
        </motion.header>

        {posts === null ? (
          <div className="text-on-surface-variant text-sm">{copy.loading}</div>
        ) : error ? (
          <div className="text-red-400 text-sm">{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-on-surface-variant text-sm">{copy.empty}</div>
        ) : (
          <div className="space-y-6">
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} lang={language} copy={copy} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

interface BlogCardProps {
  post: BlogPostSummary;
  index: number;
  lang: 'vi' | 'en';
  copy: (typeof COPY)['vi'];
}

function BlogCard({ post, index, lang, copy }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: Math.min(index * 0.04, 0.3) }}
      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-white/10 bg-surface-container-low transition hover:border-primary/40 shadow-sm"
    >
      <div className="flex-1">
        {post.publishedAt && (
          <div className="text-[11px] text-on-surface-variant/70 mb-2 font-mono">
            {copy.publishedOn} {formatDate(post.publishedAt, lang)}
          </div>
        )}
        <Link to={`/blog/${post.slug}`}>
          <h2 className="font-headline text-xl font-bold text-on-background leading-snug group-hover:text-primary transition">
            {post.title}
          </h2>
        </Link>
        {post.excerpt && (
          <p className="mt-2.5 text-sm text-on-surface-variant line-clamp-2 leading-relaxed">{post.excerpt}</p>
        )}
      </div>
      <div className="flex items-center sm:self-center shrink-0 gap-3">
        <span className="text-[9px] uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded text-on-surface-variant font-semibold font-mono">
          {post.lang}
        </span>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 text-xs font-semibold text-primary hover:bg-primary/20 transition"
        >
          {copy.readMore}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </motion.article>
  );
}
