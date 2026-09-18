import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowRight, X, Clock } from 'lucide-react';
import { BlogPost } from '../types';
import { fetchBlogPosts } from '../lib/supabase';
import { useScrollAnimation, staggerItemVariants } from '../hooks/useScrollAnimation';

interface BlogSectionProps {
  onOpenDetails?: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = React.memo(({ onOpenDetails }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { getVariants, getInViewOptions } = useScrollAnimation();
  const inViewOptions = getInViewOptions();

  useEffect(() => {
    fetchBlogPosts().then(setPosts);
  }, []);

  if (posts.length === 0) return null;

  return (
    <>
      <section className="py-16 bg-[#0a0a0a] text-[#e8e0d4] relative border-b border-[#c9a96e]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewOptions}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <motion.div variants={getVariants(staggerItemVariants)} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-medium mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Unikatno Šiveni Blog</span>
            </motion.div>
            <motion.h2 variants={getVariants(staggerItemVariants)} className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-light text-[#e8e0d4] tracking-tight mb-3">
              Priče iza kreacija
            </motion.h2>
            <motion.div variants={getVariants(staggerItemVariants)} className="w-12 h-px bg-[#c9a96e] mx-auto mb-3" />
            <motion.p variants={getVariants(staggerItemVariants)} className="text-xs sm:text-sm text-[#e8e0d4]/65 font-light">
              Otkrijte inspiraciju, tehnike i priče koje stoje iza svake unikatne kreacije
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {posts.slice(0, 3).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOptions}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer bg-[#111111] border border-[#e8e0d4]/10 hover:border-[#c9a96e]/40 transition-all"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 text-[8px] uppercase tracking-wider bg-[#c9a96e] text-[#0a0a0a] font-sans font-semibold">
                    {post.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-serif-luxury text-lg text-[#e8e0d4] group-hover:text-[#c9a96e] transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#e8e0d4]/60 line-clamp-2 mb-3 font-sans">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[9px] text-[#e8e0d4]/40 font-sans">
                      <Clock className="w-3 h-3" />
                      {new Date(post.created_at).toLocaleDateString('sr-Latn-RS')}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#c9a96e] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm" onClick={() => setSelectedPost(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="relative w-full max-w-2xl bg-[#111111] border border-[#e8e0d4]/20 shadow-2xl overflow-hidden text-[#e8e0d4] my-auto max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-3 right-3 p-2 bg-[#0a0a0a]/80 text-[#e8e0d4] hover:text-[#c9a96e] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <span className="absolute bottom-3 left-3 px-2 py-0.5 text-[8px] uppercase tracking-wider bg-[#c9a96e] text-[#0a0a0a] font-sans font-semibold">
                  {selectedPost.category}
                </span>
              </div>
              <div className="p-6 overflow-y-auto">
                <h2 className="font-serif-luxury text-2xl text-[#e8e0d4] mb-2">{selectedPost.title}</h2>
                <div className="flex items-center gap-3 text-[10px] text-[#e8e0d4]/50 font-sans mb-4">
                  <span>{selectedPost.author}</span>
                  <span>•</span>
                  <span>{new Date(selectedPost.created_at).toLocaleDateString('sr-Latn-RS', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="prose prose-sm prose-invert max-w-none text-sm text-[#e8e0d4]/80 font-sans leading-relaxed whitespace-pre-wrap">
                  {selectedPost.content}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});
