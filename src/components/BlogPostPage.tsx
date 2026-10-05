import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, User, Tag, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { BlogPost } from '../types';
import { fetchBlogPostBySlug, fetchBlogPosts } from '../lib/supabase';
import { Img } from './Img';

interface BlogPostPageProps {
  slug: string;
}

const SITE_URL = 'https://unikatno-siveno.vercel.app';

/** Ubacuje/detira JSON-LD i meta tagove za jedan blog post. */
function usePostSeo(post: BlogPost | null, slug: string) {
  useEffect(() => {
    if (!post) return;

    const title = `${post.title} | Unikatno šiveno – Jelena Erić`;
    const desc = post.excerpt || 'Priča iza unikatne kreacije iz ateljea Jelena Erić.';
    const url = `${SITE_URL}/blog/${slug}`;
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', desc);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', url);

    // Article structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-blog-post', 'true');
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: desc,
      url,
      datePublished: post.created_at,
      dateModified: post.updated_at || post.created_at,
      author: { '@type': 'Person', name: post.author || 'Jelena Erić' },
      publisher: {
        '@type': 'Organization',
        name: 'Unikatno šiveno – Jelena Erić',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      image: post.image || `${SITE_URL}/logo.png`,
      inLanguage: 'sr',
    });
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (prevDesc) document.querySelector('meta[name="description"]')?.setAttribute('content', prevDesc);
      script.remove();
    };
  }, [post, slug]);
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing' | 'offline'>('loading');

  useEffect(() => {
    let alive = true;
    setStatus('loading');

    fetchBlogPostBySlug(slug).then((found) => {
      if (!alive) return;
      if (found) {
        setPost(found);
        setStatus('ready');
        return;
      }
      // Rezerva: Supabase možda nije dostupan — pokušaj preko pune liste
      fetchBlogPosts().then((all) => {
        if (!alive) return;
        const match = all.find((p) => p.slug === slug);
        if (match) {
          setPost(match);
          setStatus('ready');
        } else {
          setStatus(all.length === 0 ? 'offline' : 'missing');
        }
      });
    });

    return () => {
      alive = false;
    };
  }, [slug]);

  usePostSeo(status === 'ready' ? post : null, slug);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e0d4]">
      <header className="border-b border-[#c9a96e]/20 bg-[#111111]/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#e8e0d4]/70 hover:text-[#c9a96e] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Početna
          </a>
          <a
            href="/#blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c9a96e] hover:text-[#e8e0d4] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Svi članci
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {status === 'loading' && (
          <div className="space-y-6 animate-pulse">
            <div className="h-4 w-40 bg-[#111111] border border-[#e8e0d4]/10" />
            <div className="h-10 w-3/4 bg-[#111111] border border-[#e8e0d4]/10" />
            <div className="aspect-[16/9] w-full bg-[#111111] border border-[#e8e0d4]/10" />
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-[#111111] border border-[#e8e0d4]/10" />
              ))}
            </div>
          </div>
        )}

        {status === 'ready' && post && (
          <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-medium mb-4">
              <Tag className="w-3.5 h-3.5" />
              <span>{post.category}</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light leading-tight mb-5">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#e8e0d4]/70 font-sans mb-8 pb-8 border-b border-[#e8e0d4]/10">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#c9a96e]" />
                {post.author || 'Jelena Erić'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#c9a96e]" />
                {new Date(post.created_at).toLocaleDateString('sr-Latn-RS', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            {post.image && (
              <div className="relative aspect-[16/9] overflow-hidden border border-[#e8e0d4]/15 mb-8 bg-[#111111]">
                <Img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent pointer-events-none" />
              </div>
            )}

            {post.excerpt && (
              <p className="font-serif-luxury text-lg sm:text-xl italic text-[#c9a96e]/90 leading-relaxed mb-6">
                {post.excerpt}
              </p>
            )}

            <div className="text-sm sm:text-base text-[#e8e0d4]/85 font-sans leading-loose whitespace-pre-wrap">
              {post.content}
            </div>

            <footer className="mt-12 pt-8 border-t border-[#c9a96e]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href="/#blog"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c9a96e] hover:text-[#e8e0d4] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Nazad na sve članke
              </a>
              <a
                href="/#kontakt"
                className="text-xs uppercase tracking-[0.2em] text-[#e8e0d4]/60 hover:text-[#c9a96e] transition-colors"
              >
                Zakaži konsultacije
              </a>
            </footer>
          </motion.article>
        )}

        {(status === 'missing' || status === 'offline') && (
          <div className="text-center py-20">
            <p className="font-serif-luxury text-2xl mb-3">
              {status === 'missing' ? 'Članak nije pronađen' : 'Sadržaj trenutno nije dostupan'}
            </p>
            <p className="text-sm text-[#e8e0d4]/60 mb-6 font-sans">
              {status === 'missing'
                ? 'Možda je uklonjen ili link nije ispravan.'
                : 'Proverite vezu ili pokušajte ponovo kasnije.'}
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#c9a96e]/50 text-[#c9a96e] text-xs uppercase tracking-[0.2em] hover:bg-[#c9a96e]/10 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Na početnu stranicu
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPostPage;
