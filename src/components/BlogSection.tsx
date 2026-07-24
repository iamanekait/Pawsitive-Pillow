import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, X } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog-section" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F5EFE6]/30 scroll-mt-16 sm:scroll-mt-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white px-3.5 py-1.5 rounded-full text-xs font-bold text-[#5C4033] border border-[#E5D7C6]">
            <BookOpen className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Pawsitive Stories & Advice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2E2B]">
            Pet Parenting & Memorial Journal
          </h2>
          <p className="text-sm text-[#795548]">
            Tips on taking perfect pet cutout photos, understanding the pet-human bond, and navigating pet loss with love.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-[#E5D7C6] overflow-hidden plush-shadow hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-[#F5EFE6]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-[#5C4033] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-[11px] text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-extrabold text-base text-[#3D2E2B] line-clamp-2 hover:text-[#C86D51] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#795548] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-xs font-bold text-[#5C4033] hover:text-[#C86D51] flex items-center space-x-1 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl border border-[#E5D7C6] p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-[#E5D7C6] flex items-center justify-center font-bold text-gray-600 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="bg-[#5C4033] text-white text-[10px] font-bold px-3 py-1 rounded-full">
              {selectedPost.category}
            </span>

            <h2 className="text-2xl font-extrabold text-[#3D2E2B]">
              {selectedPost.title}
            </h2>

            <div className="flex items-center space-x-3 text-xs text-gray-500 border-b border-[#E5D7C6] pb-4">
              <span className="font-bold text-[#3D2E2B]">{selectedPost.author}</span>
              <span>•</span>
              <span>{selectedPost.date}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-64 object-cover rounded-2xl border border-[#E5D7C6]"
              referrerPolicy="no-referrer"
            />

            <div className="text-sm text-[#3D2E2B] leading-relaxed whitespace-pre-line font-serif-luxury">
              {selectedPost.content}
            </div>

            <div className="pt-4 border-t border-[#E5D7C6] flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="bg-[#5C4033] text-white px-6 py-2.5 rounded-xl font-bold text-xs"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
