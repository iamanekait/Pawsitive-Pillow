import React from 'react';
import { Award, ShieldCheck, Heart, Sparkles, Printer, Lock, Truck, CheckCircle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Exact Pet Replica',
      desc: 'Our contour cutting technology matches your pet’s exact body shape, fur color, and posture.',
      icon: Award,
    },
    {
      title: 'Ultra-Soft Hug Velvet',
      desc: 'Crafted with premium hypoallergenic plush velvet that feels irresistibly soft and comfortable to hold.',
      icon: Heart,
    },
    {
      title: 'Printed in High Resolution',
      desc: 'High-definition eco-friendly sublimation printing ensures vivid colors that never fade or wash out.',
      icon: Printer,
    },
    {
      title: 'Handcrafted in Durgapur',
      desc: 'Proudly printed, cut, and sewn with extreme care and attention to detail in Durgapur, West Bengal.',
      icon: Sparkles,
    },
    {
      title: 'Free Background Removal',
      desc: 'Our AI and human artists remove distracting backgrounds for free to isolate your pet perfectly.',
      icon: ShieldCheck,
    },
    {
      title: 'Fast & Secure Delivery',
      desc: 'Safe checkout with real-time order tracking updates from crafting to your front door.',
      icon: Truck,
    },
  ];

  return (
    <section id="about-us-section" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#5C4033]">The Pawsitive Difference</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2E2B]">
            Why Thousands Choose Pawsitive Pillow
          </h2>
          <p className="text-sm text-[#795548]">
            We treat every order like our own pet. Here is why pet parents love our custom products.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-[#F5EFE6]/40 p-6 rounded-3xl border border-[#E5D7C6] plush-shadow hover:bg-white transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#5C4033] text-[#E5C158] flex items-center justify-center plush-shadow">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-[#3D2E2B]">{p.title}</h3>
                <p className="text-xs text-[#795548] leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Stats Strip */}
        <div className="bg-[#5C4033] text-white rounded-3xl p-8 plush-shadow grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="font-rounded font-extrabold text-3xl sm:text-4xl text-[#E5C158]">100,000+</p>
            <p className="text-xs text-[#E5D7C6] mt-1 font-medium">Pets Turned Into Pillows</p>
          </div>

          <div>
            <p className="font-rounded font-extrabold text-3xl sm:text-4xl text-[#E5C158]">4.95 / 5</p>
            <p className="text-xs text-[#E5D7C6] mt-1 font-medium">Average Star Rating</p>
          </div>

          <div>
            <p className="font-rounded font-extrabold text-3xl sm:text-4xl text-[#E5C158]">100%</p>
            <p className="text-xs text-[#E5D7C6] mt-1 font-medium">Hug-Proof Plush Guarantee</p>
          </div>

          <div>
            <p className="font-rounded font-extrabold text-3xl sm:text-4xl text-[#E5C158]">Durgapur</p>
            <p className="text-xs text-[#E5D7C6] mt-1 font-medium">West Bengal Artisan Hub</p>
          </div>
        </div>

      </div>
    </section>
  );
};
