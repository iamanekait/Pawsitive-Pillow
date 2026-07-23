import React from 'react';
import { Upload, Scissors, HeartHandshake, Truck, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartCustomizer: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartCustomizer }) => {
  const steps = [
    {
      num: '01',
      title: 'Upload Your Pet Photo',
      desc: 'Snap a clear picture of your dog, cat, bird, or rabbit. Any phone photo works great!',
      icon: Upload,
      color: 'bg-[#E5C158]',
    },
    {
      num: '02',
      title: 'Precision Cutout Art',
      desc: 'Our AI software & expert artists remove the background and map exact body contours.',
      icon: Scissors,
      color: 'bg-[#87A96B]',
    },
    {
      num: '03',
      title: 'Print & Sew With Love',
      desc: 'Handcrafted in Durgapur using eco-friendly dyes and ultra-plush velvet fabric.',
      icon: HeartHandshake,
      color: 'bg-[#C86D51]',
    },
    {
      num: '04',
      title: 'Delivered To Your Door',
      desc: 'Wrapped in gift-ready packaging with real-time tracking straight to your home.',
      icon: Truck,
      color: 'bg-[#5C4033]',
    },
  ];

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F5EFE6]/50">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C86D51]">Simple & Seamless</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2E2B]">
            How Your Custom Pet Pillow Is Created
          </h2>
          <p className="text-sm text-[#795548]">
            From a simple phone photo to a huggable custom pillow in 4 easy steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-[#E5D7C6] plush-shadow hover:-translate-y-1 transition-all space-y-4 relative z-10"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${step.color} text-white flex items-center justify-center plush-shadow`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-rounded font-extrabold text-3xl text-[#E5D7C6]">
                    {step.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-extrabold text-base text-[#3D2E2B]">{step.title}</h3>
                  <p className="text-xs text-[#795548] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={onStartCustomizer}
            className="bg-[#5C4033] hover:bg-[#3D2E2B] text-white px-8 py-4 rounded-2xl font-extrabold text-sm plush-shadow transition-all inline-flex items-center space-x-2"
          >
            <span>Start Creating My Pillow Now</span>
            <ArrowRight className="w-4 h-4 text-[#E5C158]" />
          </button>
        </div>

      </div>
    </section>
  );
};
