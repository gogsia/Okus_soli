'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { INSTAGRAM_DISPLAY_COUNT } from '@/lib/constants';

interface InstagramPost {
  id: string;
  caption?: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      try {
        const res = await fetch('/api/instagram', { signal: controller.signal });
        if (!res.ok) { setError(true); return; }
        const data = await res.json();
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts.slice(0, INSTAGRAM_DISPLAY_COUNT));
        } else {
          setError(true);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchPosts();
    return () => controller.abort();
  }, []);

  // Don't render section if no token configured / no posts
  if (!loading && (error || posts.length === 0)) {
    return null;
  }

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label mb-4">Pratite nas</p>
          <h2
            className="text-4xl md:text-5xl mb-4 font-display"
          >
            <span className="text-sun">@</span>okus_solibypakai
          </h2>
          <p
            className="max-w-md mx-auto text-base font-serif italic text-secondary"
          >
            Svakodnevni trenuci iz pekare. Pravi kruh, pravo svjetlo, pravi život.
          </p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-xl animate-pulse bg-earth"
                style={{ animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
        )}

        {/* Posts grid */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {posts.map((post, i) => (
              <motion.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group relative aspect-square rounded-xl overflow-hidden block"
                aria-label={post.caption ? post.caption.slice(0, 80) : 'Instagram post'}
              >
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.06]"
                  style={{
                    backgroundImage: `url(${
                      post.media_type === 'VIDEO'
                        ? post.thumbnail_url || post.media_url
                        : post.media_url
                    })`,
                    backgroundColor: 'var(--color-earth)',
                  }}
                />

                {/* Video indicator */}
                {post.media_type === 'VIDEO' && (
                  <div className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="white">
                      <path d="M0 0l10 6-10 6z" />
                    </svg>
                  </div>
                )}

                {/* Carousel indicator */}
                {post.media_type === 'CAROUSEL_ALBUM' && (
                  <div className="absolute top-3 right-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="drop-shadow">
                      <rect x="2" y="2" width="16" height="16" rx="2" />
                      <rect x="6" y="6" width="16" height="16" rx="2" />
                    </svg>
                  </div>
                )}

                {/* Hover overlay with caption */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end p-3">
                  {post.caption && (
                    <p className="text-white text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
                      {post.caption}
                    </p>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Follow CTA */}
        {!loading && posts.length > 0 && (
          <div className="text-center mt-10">
            <a
              href="https://www.instagram.com/okus_solibypakai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:scale-[1.02] border-[1.5px] border-hearth text-hearth font-sans"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              Pratite nas na Instagramu
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
