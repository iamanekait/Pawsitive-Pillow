import React, { useState, useRef } from 'react';
import { Upload, RotateCw, ZoomIn, ZoomOut, Sparkles, Check, Heart, Gift, Wand2, RefreshCw, Layers, ShieldCheck, ShoppingBag } from 'lucide-react';
import { CustomizerState, CartItem, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface CustomizerStudioProps {
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  onDirectCheckout: (item: Omit<CartItem, 'id'>) => void;
  currency?: Currency;
}

const SAMPLE_PET_PHOTOS = [
  {
    name: 'Golden Retriever (Milo)',
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Fluffy Cat (Luna)',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Cute Frenchie (Bruno)',
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Adorable Rabbit (Oliver)',
    url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80',
  },
];

const FONTS = [
  { id: 'font-rounded', name: 'Quicksand (Rounded)', class: 'font-rounded' },
  { id: 'font-serif-luxury', name: 'Playfair (Luxury Serif)', class: 'font-serif-luxury' },
  { id: 'font-sans', name: 'Jakarta (Modern)', class: 'font-sans' },
  { id: 'font-mono', name: 'Playful Mono', class: 'font-mono' },
];

export const CustomizerStudio: React.FC<CustomizerStudioProps> = ({
  onAddToCart,
  onDirectCheckout,
  currency = 'USD',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<CustomizerState>({
    petName: 'Milo',
    petType: 'dog',
    photoUrl: SAMPLE_PET_PHOTOS[0].url,
    cropScale: 1,
    rotation: 0,
    backgroundRemoved: true,
    selectedFont: 'font-rounded',
    fontColor: '#5C4033',
    size: '16-inch',
    material: 'ultra-velvet',
    backingPattern: 'paw-prints',
    isMemorialOrder: false,
    memorialMessage: 'Forever in our hearts ❤️',
    includeGiftBox: false,
    quantity: 1,
  });

  const [aiRemovingBg, setAiRemovingBg] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Price Calculation
  const basePrices = {
    '12-inch': 29.99,
    '16-inch': 39.99,
    '20-inch': 49.99,
    '24-inch': 64.99,
  };

  const unitPrice = basePrices[state.size] + (state.includeGiftBox ? 4.99 : 0);
  const totalPrice = unitPrice * state.quantity;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setState((s) => ({ ...s, photoUrl: url, backgroundRemoved: false }));
      triggerAiBgRemoval();
    }
  };

  const triggerAiBgRemoval = () => {
    setAiRemovingBg(true);
    setTimeout(() => {
      setAiRemovingBg(false);
      setState((s) => ({ ...s, backgroundRemoved: true }));
    }, 1200);
  };

  const handleAddToCart = () => {
    onAddToCart({
      productId: 'prod-cutout-pillow',
      name: state.isMemorialOrder ? `Custom Memorial Cutout Pillow (${state.petName})` : `Custom Pet Cutout Pillow (${state.petName})`,
      category: 'pillow',
      price: unitPrice,
      size: state.size,
      material: state.material === 'ultra-velvet' ? 'Ultra-Soft Plush Velvet' : 'Organic Cotton',
      petName: state.petName,
      photoUrl: state.photoUrl || undefined,
      isMemorial: state.isMemorialOrder,
      memorialMessage: state.isMemorialOrder ? state.memorialMessage : undefined,
      quantity: state.quantity,
      image: state.photoUrl || SAMPLE_PET_PHOTOS[0].url,
    });
    setSuccessMsg('Added to cart! 🎉');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <section id="customizer-section" className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#F5EFE6]/60">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full text-xs font-bold text-[#5C4033] border border-[#E5D7C6]">
            <Wand2 className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Interactive 3D & 2D Customizer Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2E2B]">
            Design Your Custom Pet Cutout Pillow
          </h2>
          <p className="text-sm sm:text-base text-[#795548]">
            Upload your pet's photo, preview background removal, choose custom dimensions, and add a personalized name or memorial message.
          </p>
        </div>

        {/* Customizer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live Canvas Preview Studio */}
          <div className="lg:col-span-6 space-y-4 sticky top-24">
            <div className="relative w-full h-[450px] sm:h-[520px] rounded-3xl bg-white plush-shadow border-2 border-[#E5D7C6] overflow-hidden flex items-center justify-center p-6">
              
              {/* Backing Pattern Background simulation */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: state.backingPattern === 'paw-prints' 
                  ? 'radial-gradient(#5C4033 1px, transparent 1px)' 
                  : state.backingPattern === 'floral'
                  ? 'radial-gradient(#C86D51 1.5px, transparent 1.5px)'
                  : 'none',
                backgroundSize: '20px 20px'
              }} />

              {/* Pillow Cushion Cutout Frame */}
              <div
                className="relative transition-all duration-300 max-w-[85%] max-h-[85%] flex items-center justify-center"
                style={{
                  transform: `scale(${state.cropScale}) rotate(${state.rotation}deg)`,
                }}
              >
                {/* Outer Plush Stitching Outline */}
                <div className={`relative p-3 rounded-[40px] transition-all ${
                  state.backgroundRemoved 
                    ? 'border-4 border-dashed border-[#E5C158] shadow-2xl bg-white' 
                    : 'border-2 border-[#E5D7C6] shadow-lg'
                }`}>
                  {/* Photo Element */}
                  {state.photoUrl ? (
                    <img
                      src={state.photoUrl}
                      alt="Pet Preview"
                      className="max-h-[320px] sm:max-h-[360px] object-contain rounded-[30px]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-64 h-64 bg-[#F5EFE6] rounded-3xl flex flex-col items-center justify-center text-[#795548] p-6 text-center">
                      <Upload className="w-10 h-10 mb-2 text-[#C86D51]" />
                      <p className="text-sm font-bold">No Photo Uploaded Yet</p>
                      <p className="text-xs text-gray-500 mt-1">Select a sample below or upload your pet photo</p>
                    </div>
                  )}

                  {/* Pet Name Overlay Tag on Pillow */}
                  {state.petName && (
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#5C4033] text-white px-4 py-1.5 rounded-xl shadow-lg border border-[#E5D7C6] whitespace-nowrap">
                      <span className={`text-sm font-bold ${FONTS.find(f => f.id === state.selectedFont)?.class || ''}`} style={{ color: state.fontColor === '#5C4033' ? '#FDFBF7' : state.fontColor }}>
                        {state.petName}
                      </span>
                    </div>
                  )}

                  {/* Memorial Badge Option */}
                  {state.isMemorialOrder && (
                    <div className="absolute -top-3 right-2 bg-[#C86D51] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
                      <Heart className="w-3 h-3 fill-current" />
                      <span>In Loving Memory</span>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Processing Overlay */}
              {aiRemovingBg && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-[#5C4033] z-20 space-y-3">
                  <Wand2 className="w-10 h-10 text-[#E5C158] animate-spin" />
                  <p className="font-bold text-base">AI Contour Cutout in Progress...</p>
                  <p className="text-xs text-[#795548]">Detecting pet silhouette, ears, and fur edges</p>
                </div>
              )}

              {/* Top Controls Toolbar */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-[#E5D7C6] shadow-sm">
                <button
                  onClick={() => setState((s) => ({ ...s, cropScale: Math.min(1.4, s.cropScale + 0.1) }))}
                  className="p-1.5 hover:bg-[#F5EFE6] rounded-xl text-[#5C4033]"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setState((s) => ({ ...s, cropScale: Math.max(0.7, s.cropScale - 0.1) }))}
                  className="p-1.5 hover:bg-[#F5EFE6] rounded-xl text-[#5C4033]"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setState((s) => ({ ...s, rotation: (s.rotation + 90) % 360 }))}
                  className="p-1.5 hover:bg-[#F5EFE6] rounded-xl text-[#5C4033]"
                  title="Rotate Photo"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Quick Sample Pet Selectors */}
            <div className="bg-white p-4 rounded-2xl border border-[#E5D7C6] shadow-sm space-y-2">
              <p className="text-xs font-bold text-[#5C4033]">Or Test With Our Sample Pets:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SAMPLE_PET_PHOTOS.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => setState((s) => ({ ...s, photoUrl: sample.url, petName: sample.name.split(' ')[0] }))}
                    className={`flex items-center space-x-2 p-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      state.photoUrl === sample.url
                        ? 'bg-[#5C4033] text-white border-[#5C4033]'
                        : 'bg-[#FDFBF7] text-[#5C4033] border-[#E5D7C6] hover:bg-[#F5EFE6]'
                    }`}
                  >
                    <img src={sample.url} alt={sample.name} className="w-7 h-7 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <span className="truncate">{sample.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Customization Form & Options */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5D7C6] plush-shadow space-y-6">
            
            {/* Step 1: Upload Photo */}
            <div className="space-y-3">
              <label className="block text-sm font-extrabold text-[#3D2E2B]">
                Step 1: Upload Your Pet's Photo
              </label>
              
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto flex-1 bg-[#5C4033] hover:bg-[#3D2E2B] text-white px-5 py-3 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-sm"
                >
                  <Upload className="w-4 h-4 text-[#E5C158]" />
                  <span>Upload High-Res Photo</span>
                </button>

                <button
                  onClick={triggerAiBgRemoval}
                  className="w-full sm:w-auto bg-[#E5C158]/20 hover:bg-[#E5C158]/30 text-[#5C4033] px-4 py-3 rounded-2xl font-bold text-xs border border-[#E5C158]/50 flex items-center justify-center space-x-1.5"
                >
                  <Wand2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Auto Contour & Remove Bg</span>
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <p className="text-[11px] text-gray-500">
                💡 Tip: Well-lit photos with your pet sitting or standing work best. Our designers verify every cutout before printing!
              </p>
            </div>

            {/* Step 2: Personalization (Pet Name & Fonts) */}
            <div className="space-y-3 pt-3 border-t border-[#E5D7C6]">
              <label className="block text-sm font-extrabold text-[#3D2E2B]">
                Step 2: Add Pet's Name & Font
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-xs font-semibold text-[#795548] mb-1 block">Pet's Name</span>
                  <input
                    type="text"
                    value={state.petName}
                    onChange={(e) => setState((s) => ({ ...s, petName: e.target.value }))}
                    placeholder="e.g. Milo, Bella"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5D7C6] text-sm focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
                  />
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#795548] mb-1 block">Font Style</span>
                  <select
                    value={state.selectedFont}
                    onChange={(e) => setState((s) => ({ ...s, selectedFont: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5D7C6] text-sm focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
                  >
                    {FONTS.map((f) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Choose Size & Material */}
            <div className="space-y-3 pt-3 border-t border-[#E5D7C6]">
              <label className="block text-sm font-extrabold text-[#3D2E2B]">
                Step 3: Select Pillow Size
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: '12-inch', name: '12 Inch (Mini)', price: formatPrice(29.99, currency) },
                  { id: '16-inch', name: '16 Inch (Most Popular)', price: formatPrice(39.99, currency), isPopular: true },
                  { id: '20-inch', name: '20 Inch (Hug Size)', price: formatPrice(49.99, currency) },
                  { id: '24-inch', name: '24 Inch (Life Size)', price: formatPrice(64.99, currency) },
                ].map((sizeOpt) => (
                  <button
                    key={sizeOpt.id}
                    onClick={() => setState((s) => ({ ...s, size: sizeOpt.id as any }))}
                    className={`relative p-3 rounded-2xl border text-center transition-all ${
                      state.size === sizeOpt.id
                        ? 'bg-[#5C4033] text-white border-[#5C4033] shadow-md'
                        : 'bg-[#FDFBF7] text-[#5C4033] border-[#E5D7C6] hover:bg-[#F5EFE6]'
                    }`}
                  >
                    {sizeOpt.isPopular && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#E5C158] text-[#3D2E2B] text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                        Popular
                      </span>
                    )}
                    <p className="text-xs font-bold">{sizeOpt.name}</p>
                    <p className={`text-xs ${state.size === sizeOpt.id ? 'text-[#E5C158]' : 'text-gray-500'}`}>{sizeOpt.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Special Memorial Collection Check */}
            <div className="pt-3 border-t border-[#E5D7C6] bg-[#C86D51]/5 p-4 rounded-2xl border border-[#C86D51]/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-[#C86D51] fill-current" />
                  <span className="font-extrabold text-sm text-[#3D2E2B]">Forever in Our Hearts Memorial Order</span>
                </div>
                <input
                  type="checkbox"
                  checked={state.isMemorialOrder}
                  onChange={(e) => setState((s) => ({ ...s, isMemorialOrder: e.target.checked }))}
                  className="w-5 h-5 accent-[#C86D51] cursor-pointer"
                />
              </div>

              {state.isMemorialOrder && (
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-semibold text-[#795548] block">Memorial Inscription / Dates</span>
                  <input
                    type="text"
                    value={state.memorialMessage}
                    onChange={(e) => setState((s) => ({ ...s, memorialMessage: e.target.value }))}
                    placeholder="e.g. Forever in our hearts (2012 - 2026)"
                    className="w-full px-3 py-2 rounded-xl border border-[#C86D51]/40 text-xs bg-white focus:outline-none"
                  />
                  <p className="text-[10px] text-[#C86D51] italic">
                    ❤️ We will include a complimentary handwritten sympathy card and gentle memory gift wrapping with this order.
                  </p>
                </div>
              )}
            </div>

            {/* Step 5: Quantity & Add to Cart */}
            <div className="pt-4 border-t border-[#E5D7C6] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-[#795548]">Quantity:</span>
                  <div className="flex items-center bg-[#F5EFE6] rounded-xl border border-[#E5D7C6]">
                    <button
                      onClick={() => setState((s) => ({ ...s, quantity: Math.max(1, s.quantity - 1) }))}
                      className="px-3 py-1 font-bold text-[#5C4033] hover:bg-white rounded-l-xl"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-[#3D2E2B]">{state.quantity}</span>
                    <button
                      onClick={() => setState((s) => ({ ...s, quantity: s.quantity + 1 }))}
                      className="px-3 py-1 font-bold text-[#5C4033] hover:bg-white rounded-r-xl"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Total Price</span>
                  <span className="text-2xl font-extrabold text-[#3D2E2B]">{formatPrice(totalPrice, currency)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#5C4033] hover:bg-[#3D2E2B] text-white py-3.5 rounded-2xl font-extrabold text-sm plush-shadow flex items-center justify-center space-x-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E5C158]" />
                  <span>Add To Cart</span>
                </button>

                <button
                  onClick={() => {
                    handleAddToCart();
                    onDirectCheckout({
                      productId: 'prod-cutout-pillow',
                      name: `Custom Pet Cutout Pillow (${state.petName})`,
                      category: 'pillow',
                      price: unitPrice,
                      quantity: state.quantity,
                      image: state.photoUrl || SAMPLE_PET_PHOTOS[0].url,
                    });
                  }}
                  className="w-full bg-[#E5C158] hover:bg-[#d4af37] text-[#3D2E2B] py-3.5 rounded-2xl font-extrabold text-sm plush-shadow flex items-center justify-center space-x-2 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#3D2E2B]" />
                  <span>Buy Now (1-Click)</span>
                </button>
              </div>

              {/* Success Alert */}
              {successMsg && (
                <div className="bg-[#87A96B]/20 border border-[#87A96B] text-[#2D4519] p-3 rounded-2xl text-xs font-bold text-center flex items-center justify-center space-x-2">
                  <Check className="w-4 h-4 text-[#87A96B]" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-gray-500 pt-2">
                <div className="flex items-center justify-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#87A96B]" />
                  <span>100% Satisfaction</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <RefreshCw className="w-3.5 h-3.5 text-[#5C4033]" />
                  <span>Free Proof Check</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Heart className="w-3.5 h-3.5 text-[#C86D51]" />
                  <span>Made With Love</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
