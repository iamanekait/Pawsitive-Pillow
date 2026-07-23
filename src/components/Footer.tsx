import React, { useState } from 'react';
import { Heart, Mail, MapPin, Send, Check } from 'lucide-react';

interface FooterProps {
  onOpenCustomizer: () => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCustomizer, onOpenTracker }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    } catch (err) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#3D2E2B] text-[#FDFBF7] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#5C4033] relative overflow-hidden">
      
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#E5C158 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Top Section: Brand Info + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 border-b border-[#5C4033]">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#5C4033] border border-[#E5C158]/50 flex items-center justify-center text-[#E5C158] plush-shadow">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="font-rounded font-extrabold text-2xl tracking-tight text-[#FDFBF7]">
                Pawsitive Pillow
              </span>
            </div>

            <p className="text-xs text-[#E5D7C6] max-w-md leading-relaxed">
              Transforming beloved pets into high-quality custom cutout pillows, mugs, and keepsakes that preserve precious memories forever. Every product is handcrafted with love in Durgapur, West Bengal.
            </p>

            <div className="space-y-1 text-xs text-[#E5D7C6] pt-1">
              <p className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#E5C158]" />
                <span>Durgapur, West Bengal, India</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#E5C158]" />
                <a href="mailto:sales@pawsitivepillow.com" className="hover:underline">
                  sales@pawsitivepillow.com
                </a>
              </p>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 bg-[#5C4033]/60 p-6 rounded-3xl border border-[#785A50] space-y-3">
            <h4 className="font-extrabold text-sm text-[#FDFBF7] flex items-center space-x-2">
              <Heart className="w-4 h-4 text-[#C86D51] fill-current" />
              <span>Get 15% Off Your First Custom Order</span>
            </h4>
            <p className="text-xs text-[#E5D7C6]">
              Subscribe to receive exclusive pet care guides, photo tips, and discounts.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 pt-1">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#3D2E2B] border border-[#785A50] text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#E5C158]"
              />
              <button
                type="submit"
                className="bg-[#E5C158] hover:bg-[#d4af37] text-[#3D2E2B] px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1 transition-colors"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-[#87A96B] font-bold flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>Thank you! Check your inbox for code PAWSITIVE15.</span>
              </p>
            )}
          </div>

        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-[#E5D7C6]">
          <div className="space-y-3">
            <h5 className="font-extrabold text-sm text-white uppercase tracking-wider">Custom Shop</h5>
            <ul className="space-y-2">
              <li><button onClick={onOpenCustomizer} className="hover:text-white">Custom Pet Cutout Pillow</button></li>
              <li><a href="#shop-section" className="hover:text-white">Custom Pet Ceramic Mugs</a></li>
              <li><a href="#shop-section" className="hover:text-white">Custom Pet T-Shirts & Hoodies</a></li>
              <li><a href="#shop-section" className="hover:text-white">Cozy Sherpa Blankets</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-extrabold text-sm text-white uppercase tracking-wider">Special Collections</h5>
            <ul className="space-y-2">
              <li><a href="#memorial-section" className="hover:text-white text-[#C86D51] font-bold">❤️ Forever in Our Hearts</a></li>
              <li><a href="#memorial-section" className="hover:text-white">Digital Candle Tribute Wall</a></li>
              <li><a href="#blog-section" className="hover:text-white">Pet Loss Comfort Journal</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-extrabold text-sm text-white uppercase tracking-wider">Customer Care</h5>
            <ul className="space-y-2">
              <li><button onClick={onOpenTracker} className="hover:text-white font-bold text-[#E5C158]">Track Your Order</button></li>
              <li><a href="#faq-section" className="hover:text-white">Photo Upload Guidelines</a></li>
              <li><a href="#faq-section" className="hover:text-white">Shipping & Returns</a></li>
              <li><a href="#faq-section" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-extrabold text-sm text-white uppercase tracking-wider">Quality & Craft</h5>
            <ul className="space-y-2">
              <li><a href="#customizer-section" className="hover:text-white">100% Hug-Proof Velvet</a></li>
              <li><a href="#customizer-section" className="hover:text-white">HD Sublimation Print</a></li>
              <li><a href="#customizer-section" className="hover:text-white">Exact Cutout Guarantee</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Required Footer Attribution */}
        <div className="pt-8 border-t border-[#5C4033] text-center text-xs text-gray-400 space-y-2">
          <p>© {new Date().getFullYear()} Pawsitive Pillow. All Rights Reserved. Crafted with love in Durgapur, West Bengal.</p>

          <p className="text-sm font-medium text-gray-300">
            Developed by <a href="https://dubeyconglomerate.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#E5C158] font-bold hover:underline">Dubey Conglomerate</a>
          </p>
        </div>

      </div>
    </footer>
  );
};
