import React, { useState } from 'react';
import { Sparkles, Heart, ShieldCheck, Star, ArrowRight, Upload, CheckCircle2, Award, Play } from 'lucide-react';

interface HeroProps {
  onStartCustomizer?: () => void;
  onStartCustomizing?: () => void;
  onExploreShop?: () => void;
  onExploreMemorial?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartCustomizer,
  onStartCustomizing,
  onExploreShop,
  onExploreMemorial,
}) => {
  const handleStartCustomizer = () => {
    if (onStartCustomizer) onStartCustomizer();
    else if (onStartCustomizing) onStartCustomizing();
    else {
      const el = document.getElementById('customizer-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreShop = () => {
    if (onExploreShop) onExploreShop();
    else {
      const el = document.getElementById('shop-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreMemorial = () => {
    if (onExploreMemorial) onExploreMemorial();
    else {
      const el = document.getElementById('memorial-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 px-4 sm:px-6 lg:px-8 min-h-[550px] flex items-center justify-center">
      {/* Background Video / Picture behind the hero text */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center brightness-100"
        >
          <source src="https://rtd91ogeqfgmjtna.public.blob.vercel-storage.com/Pawsitive%20Pillow.mp4" type="video/mp4" />
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=80"
            alt="Happy Pets Background"
            className="w-full h-full object-cover object-center"
          />
        </video>
        {/* Dark/Warm Gradient Overlay for contrast and readability - 15% lighter for higher video visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A1E1C]/65 via-[#3D2E2B]/60 to-[#2A1E1C]/70 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          
          {/* Top Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-[#5C4033] border border-white/40 shadow-lg">
            <div className="flex -space-x-1">
              <span className="w-2.5 h-2.5 bg-[#87A96B] rounded-full animate-ping" />
              <span className="w-2.5 h-2.5 bg-[#87A96B] rounded-full" />
            </div>
            <span className="text-[#C86D51] font-extrabold">#1 Handcrafted Cutout Pillows</span>
            <span className="text-gray-400">•</span>
            <span>100,000+ Pets Hugged</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-md">
            Turn Your Pet Into a Pillow You'll{' '}
            <span className="font-serif-luxury italic font-normal text-[#E5C158] relative">
              Treasure Forever.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#E5C158]/80" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,15 Q50,5 100,15" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-amber-100/90 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-sm">
            Upload a photograph of your dog, cat, bird, or exotic pet. We craft an exact replica cutout pillow matching their body, ears, posture, and fur colors in ultra-soft hug-proof velvet.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleStartCustomizer}
              className="w-full sm:w-auto bg-[#E5C158] hover:bg-[#D4AF37] text-[#3D2E2B] px-8 py-4 rounded-2xl font-bold text-base shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-3 group"
            >
              <Upload className="w-5 h-5 text-[#3D2E2B] group-hover:scale-110 transition-transform" />
              <span>Create My Pet Pillow</span>
              <ArrowRight className="w-5 h-5 text-[#3D2E2B] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleExploreShop}
              className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white backdrop-blur-md px-6 py-4 rounded-2xl font-bold text-base border border-white/40 transition-all flex items-center justify-center space-x-2 shadow-md"
            >
              <span>Shop All Products</span>
            </button>

            <button
              onClick={handleExploreMemorial}
              className="w-full sm:w-auto bg-[#C86D51]/40 hover:bg-[#C86D51]/60 text-white backdrop-blur-md px-5 py-4 rounded-2xl font-bold text-sm border border-[#C86D51]/60 transition-all flex items-center justify-center space-x-1.5 shadow-md"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Memorial Collection</span>
            </button>
          </div>

          {/* Social Proof Star Ratings */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 border-t border-white/20">
            <div className="flex items-center space-x-2">
              <div className="flex text-[#E5C158]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-extrabold text-sm text-white">4.95 / 5.0</span>
              <span className="text-xs text-amber-200/80">(3,800+ Verified Reviews)</span>
            </div>

            <div className="flex items-center space-x-4 text-xs font-semibold text-amber-100/90">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-[#87A96B]" />
                <span>Exact Pet Replica Guarantee</span>
              </span>
              <span className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-[#E5C158]" />
                <span>Durgapur Handcrafted</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
