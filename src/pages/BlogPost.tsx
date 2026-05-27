import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { fetchBlogPost, getCachedBlogPost, isCacheFresh, type BlogPostDetail } from '../lib/blogApi';

const COPY = {
  vi: {
    back: '← Tất cả bài viết',
    notFound: 'Không tìm thấy bài viết.',
    loading: 'Đang tải...',
    publishedOn: 'Đăng ngày',
    langMismatchPrefix: 'Bài viết này có bản tiếng',
    langMismatchSuffix: '. Chuyển ngôn ngữ để đọc.',
    minRead: 'phút đọc',
  },
  en: {
    back: '← All posts',
    notFound: 'Post not found.',
    loading: 'Loading...',
    publishedOn: 'Published on',
    langMismatchPrefix: 'This article is in',
    langMismatchSuffix: '. Switch language to read.',
    minRead: 'min read',
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

function readingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

const SITE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://nboxai.io';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const copy = COPY[language];
  const [post, setPost] = useState<BlogPostDetail | null | undefined>(undefined);

  const seoTitle = post ? (post.seoTitle || post.title) : 'Blog';
  const seoDescription = post ? (post.seoDescription || post.excerpt || '') : '';
  const canonicalPath = post ? `/blog/${post.slug}` : `/blog/${slug || ''}`;
  const ogImg = post ? (post.ogImage || post.coverImage || '') : '';
  const noIndex = post ? post.noIndex : false;

  useSEO({
    title: post ? `${seoTitle}` : 'Blog',
    description: seoDescription,
    canonicalPath,
    ogImage: ogImg || undefined,
    noIndex
  });

  useEffect(() => {
    let cancelled = false;
    if (!slug) {
      setPost(null);
      return;
    }

    const cacheKey = `post-${slug}`;

    // SWR Step 1: Read stale data immediately
    const staleData = getCachedBlogPost(slug);
    if (staleData) {
      setPost(staleData);
    } else {
      setPost(undefined); // Show loading only if no cache exists
    }

    // If cache is fresh (within 30 seconds), skip background revalidation request
    if (isCacheFresh(cacheKey, 30000) && staleData) {
      return;
    }

    // SWR Step 2: Fetch fresh data in the background
    fetchBlogPost(slug)
      .then((data) => {
        if (cancelled) return;
        
        // SWR Step 3: Compare and update UI if changed
        const isSame = staleData && JSON.stringify(staleData) === JSON.stringify(data);
        if (!isSame) {
          setPost(data);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        // If we don't have stale data, display error (null)
        if (!staleData) {
          setPost(null);
        } else {
          console.warn('Background blog post fetch failed:', err);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (post === undefined) {
    return (
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-20 text-on-surface-variant text-sm">
        {copy.loading}
      </section>
    );
  }

  if (post === null) {
    return (
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-20">
        <Link to="/blog" className="text-primary text-sm hover:underline">
          {copy.back}
        </Link>
        <div className="mt-6 text-on-surface-variant">{copy.notFound}</div>
      </section>
    );
  }

  const ogImage = post.ogImage || post.coverImage || `${SITE_URL}/logo.jpg`;
  const canonical = post.canonical || `${SITE_URL}/blog/${post.slug}`;
  const langMismatch = post.lang !== language;
  const minutes = readingMinutes(post.content);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: seoDescription,
    image: ogImage ? [ogImage] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: post.lang === 'vi' ? 'vi-VN' : 'en-US',
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    author: { '@type': 'Organization', name: 'NBOX AI' },
    publisher: {
      '@type': 'Organization',
      name: 'NBOX AI',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.jpg` },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c'),
        }}
      />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Link to="/blog" className="text-primary text-xs font-semibold hover:underline">
            {copy.back}
          </Link>

          {langMismatch && (
            <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-xs text-primary">
              {copy.langMismatchPrefix} <strong>{post.lang.toUpperCase()}</strong>
              {copy.langMismatchSuffix}
            </div>
          )}

          <header className="mt-6">
            <h1 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-on-background leading-tight">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-on-surface-variant">
              {post.publishedAt && (
                <span>
                  {copy.publishedOn} {formatDate(post.publishedAt, language)}
                </span>
              )}
              <span aria-hidden>•</span>
              <span>
                {minutes} {copy.minRead}
              </span>
              {post.focusKeyword && (
                <>
                  <span aria-hidden>•</span>
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-primary">{post.focusKeyword}</span>
                </>
              )}
            </div>
          </header>

          {post.coverImage && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black">
              <img src={post.coverImage} alt={post.title} className="h-auto w-full object-cover" />
            </div>
          )}

          <div className="prose-blog mt-10 text-on-background">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </motion.div>
      </article>
    </>
  );
}
