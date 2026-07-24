import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      q: 'What kind of pet photos work best for a cutout pillow?',
      a: 'Photos taken in good lighting at your pet’s eye level work best! Ensure your pet is sitting or standing naturally with no paws or ears hidden behind furniture or blankets. Don’t worry about the background—our AI & design team removes it for free!',
    },
    {
      q: 'How long does production and shipping take?',
      a: 'Every custom pillow is handcrafted with care in our Durgapur, West Bengal facility. Handcrafting & printing takes 2–4 business days. Standard shipping takes 3–5 business days with full real-time order tracking.',
    },
    {
      q: 'What material is the custom pet pillow made of?',
      a: 'We use ultra-soft, hug-proof plush velvet fabric stuffed with premium hypoallergenic cotton filling. Dyes are non-toxic, eco-friendly, and machine washable without fading.',
    },
    {
      q: 'Can I order a memorial pillow for a pet who passed away?',
      a: 'Yes, absolutely. Our "Forever in Our Hearts ❤️" collection is dedicated to pet loss remembrance. We treat every memorial order with utmost compassion, providing complimentary sympathy wrapping and optional angel halo additions.',
    },
    {
      q: 'Can I preview my custom cutout before it gets printed?',
      a: 'Yes! Our design team sends a free digital proof via email/SMS if requested, allowing you to approve the contour cut before we begin sewing.',
    },
    {
      q: 'Do you ship internationally from India?',
      a: 'Yes, we ship worldwide! Orders within India arrive in 3-5 days, while international orders typically take 6-10 business days.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) => f.q.toLowerCase().includes(searchTerm.toLowerCase()) || f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="faq-section" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F5EFE6]/40 scroll-mt-16 sm:scroll-mt-20 overflow-hidden relative">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-white px-3.5 py-1.5 rounded-full text-xs font-bold text-[#5C4033] border border-[#E5D7C6]">
            <HelpCircle className="w-3.5 h-3.5 text-[#C86D51]" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2E2B]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#795548]">
            Everything you need to know about photo uploads, materials, crafting in Durgapur, and memorial orders.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-lg mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions e.g. photo, shipping, memorial..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-[#E5D7C6] text-sm focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
          />
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E5D7C6] overflow-hidden plush-shadow transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between font-bold text-sm text-[#3D2E2B] hover:text-[#C86D51] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#C86D51]" /> : <ChevronDown className="w-5 h-5 text-[#5C4033]" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#795548] leading-relaxed border-t border-[#F5EFE6] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
