import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function useSEO({ title, description, canonicalPath, ogImage, noIndex }: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    const suffix = ' | NBOX AI';
    const fullTitle = title.endsWith(suffix) ? title : `${title}${suffix}`;
    document.title = fullTitle;

    // Helper to update/create meta by name
    const updateMetaName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to update/create meta by property
    const updateMetaProperty = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Update Description
    updateMetaName('description', description);

    // 3. Update Robots
    if (noIndex) {
      updateMetaName('robots', 'noindex, nofollow');
    } else {
      updateMetaName('robots', 'index, follow');
    }

    // 3. Update Canonical URL
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://nboxai.io';
    const currentPath = canonicalPath || (typeof window !== 'undefined' ? window.location.pathname : '');
    const fullUrl = `${siteUrl}${currentPath}`;
    
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullUrl);

    // 4. Update Open Graph Tags
    updateMetaProperty('og:title', fullTitle);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:url', fullUrl);
    
    const resolvedOgImage = ogImage || `${siteUrl}/logo.png`;
    updateMetaProperty('og:image', resolvedOgImage);

    // 5. Update Twitter Card Tags
    updateMetaName('twitter:title', fullTitle);
    updateMetaName('twitter:description', description);
    updateMetaName('twitter:image', resolvedOgImage);
  }, [title, description, canonicalPath, ogImage, noIndex]);
}

export default function SEO(props: SEOProps) {
  useSEO(props);
  return null;
}
