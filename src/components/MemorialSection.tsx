import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Flame, Plus, ShieldCheck, Star, MessageSquare } from 'lucide-react';
import { PRODUCTS, MEMORIAL_STORIES, INITIAL_CANDLES } from '../data/mockData';
import { CandleTribute, CartItem, Currency } from '../types';
import { formatPrice } from '../utils/currency';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot, addDoc, query, orderBy, limit } from 'firebase/firestore';

interface MemorialSectionProps {
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  onOpenCustomizer: () => void;
  currency?: Currency;
}

export const MemorialSection: React.FC<MemorialSectionProps> = ({
  onAddToCart,
  onOpenCustomizer,
  currency = 'USD',
}) => {
  const [candles, setCandles] = useState<CandleTribute[]>(INITIAL_CANDLES);
  const [newPetName, setNewPetName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newSender, setNewSender] = useState('');
  const [showCandleModal, setShowCandleModal] = useState(false);
  const [candleLitSuccess, setCandleLitSuccess] = useState(false);

  const memorialProducts = PRODUCTS.filter((p) => p.isMemorial || p.category === 'memorial');

  // Real-time Firestore sync for memorial candles
  useEffect(() => {
    const candlesPath = 'memorialCandles';
    const candlesQuery = query(collection(db, candlesPath), orderBy('createdAt', 'desc'), limit(50));

    const unsubscribe = onSnapshot(
      candlesQuery,
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedCandles: CandleTribute[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              petName: data.petName || 'Beloved Pet',
              message: data.message || '',
              sender: data.authorName || 'A Loving Pet Parent',
              litAt: 'Recently',
            };
          });
          setCandles(loadedCandles);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, candlesPath);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLightCandle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPetName || !newMessage) return;

    const candleSender = newSender || auth.currentUser?.displayName || 'A Loving Pet Parent';

    const newCandle: CandleTribute = {
      id: `cand-${Date.now()}`,
      petName: newPetName,
      message: newMessage,
      sender: candleSender,
      litAt: 'Just now',
    };

    // Optimistic local update
    setCandles([newCandle, ...candles]);

    // Save to Firestore
    try {
      await addDoc(collection(db, 'memorialCandles'), {
        petName: newPetName,
        message: newMessage,
        authorName: candleSender,
        authorId: auth.currentUser?.uid || 'anonymous',
        candlesLit: 1,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.warn('Could not persist candle to Firestore:', error);
    }

    setNewPetName('');
    setNewMessage('');
    setNewSender('');
    setCandleLitSuccess(true);
    setTimeout(() => {
      setCandleLitSuccess(false);
      setShowCandleModal(false);
    }, 2000);
  };

  return (
    <section id="memorial-section" className="py-16 lg:py-24 bg-gradient-to-b from-[#F4EFEA] via-[#EFE6DC] to-[#F8F4EE] px-4 sm:px-6 lg:px-8 border-y border-[#E5D7C6] scroll-mt-16 sm:scroll-mt-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Banner Card */}
        <div className="relative rounded-3xl overflow-hidden glass-panel-dark text-[#FDFBF7] p-8 sm:p-12 lg:p-16 plush-shadow-lg border border-[#785A50]">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1600&q=80"
              alt="Pet Memorial Background"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#C86D51]/30 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-[#E5C158] border border-[#C86D51]/50">
              <Heart className="w-4 h-4 fill-[#C86D51] text-[#C86D51]" />
              <span>Dedicated Pet Loss & Remembrance Collection</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury italic font-normal tracking-tight text-[#FDFBF7]">
              Forever in Our Hearts ❤️
            </h2>

            <p className="text-lg sm:text-xl text-[#E5D7C6] font-light leading-relaxed">
              "Love Never Leaves. Because Some Best Friends Stay With Us Forever."
            </p>

            <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
              When a beloved pet crosses the Rainbow Bridge, their gentle spirit remains woven into every corner of our lives. Our memorial collection offers soft, comforting keepsakes to carry their memory everywhere and keep them close to your heart.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenCustomizer}
                className="bg-[#C86D51] hover:bg-[#b0583e] text-white px-8 py-4 rounded-2xl font-bold text-sm plush-shadow transition-all flex items-center space-x-2"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Create a Memorial Gift</span>
              </button>

              <button
                onClick={() => setShowCandleModal(true)}
                className="bg-white/10 hover:bg-white/20 text-[#E5C158] px-6 py-4 rounded-2xl font-bold text-sm border border-[#E5C158]/40 transition-all flex items-center space-x-2"
              >
                <Flame className="w-4 h-4 text-[#E5C158] animate-pulse" />
                <span>Light a Remembrance Candle</span>
              </button>
            </div>
          </div>
        </div>

        {/* Memorial Products Showcase */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#3D2E2B]">
              Comforting Memorial Keepsakes
            </h3>
            <p className="text-sm text-[#795548] max-w-xl mx-auto">
              Handcrafted with compassion in Durgapur. Every memorial product comes wrapped in soft memory packaging with a complimentary sympathy note.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {memorialProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-3xl border border-[#E5D7C6] p-4 plush-shadow hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5EFE6]">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-[#C86D51] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center space-x-1">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>Memorial</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-[#3D2E2B] group-hover:text-[#C86D51] transition-colors">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{prod.description}</p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-lg font-extrabold text-[#3D2E2B]">{formatPrice(prod.price, currency)}</span>
                      {prod.originalPrice && (
                        <span className="text-xs text-gray-400 line-through ml-2">{formatPrice(prod.originalPrice, currency)}</span>
                      )}
                    </div>
                    <div className="flex items-center text-xs font-bold text-[#D4AF37]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="ml-1">{prod.rating}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddToCart({
                      productId: prod.id,
                      name: prod.name,
                      category: prod.category,
                      price: prod.price,
                      isMemorial: true,
                      quantity: 1,
                      image: prod.image,
                    });
                  }}
                  className="w-full bg-[#C86D51] hover:bg-[#b0583e] text-white py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Customize Memorial Item</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Candle Tribute Wall */}
        <div className="bg-white rounded-3xl border border-[#E5D7C6] p-8 plush-shadow space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E5D7C6] pb-6">
            <div>
              <h3 className="text-2xl font-extrabold text-[#3D2E2B] flex items-center space-x-2">
                <Flame className="w-6 h-6 text-[#E5C158] fill-[#E5C158]" />
                <span>Digital Rainbow Bridge Tribute Wall</span>
              </h3>
              <p className="text-xs text-[#795548] mt-1">
                Light a virtual candle to honor your beloved pet and leave a message of remembrance.
              </p>
            </div>

            <button
              onClick={() => setShowCandleModal(true)}
              className="bg-[#5C4033] hover:bg-[#3D2E2B] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Light a Candle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {candles.map((candle) => (
              <div key={candle.id} className="bg-[#FDFBF7] p-5 rounded-2xl border border-[#E5D7C6] space-y-3 relative">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#E5C158]/20 flex items-center justify-center text-[#D4AF37]">
                    <Flame className="w-5 h-5 fill-current animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#3D2E2B]">{candle.petName}</h4>
                    <p className="text-[10px] text-gray-500">Lit by {candle.sender} • {candle.litAt}</p>
                  </div>
                </div>

                <p className="text-xs text-[#795548] italic font-serif-luxury">
                  "{candle.message}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Remembrance Stories */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-extrabold text-[#3D2E2B]">
              Stories from Pet Parents
            </h3>
            <p className="text-xs text-[#795548]">
              Read how custom memorial cutout pillows brought comfort to grieving families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MEMORIAL_STORIES.map((story) => (
              <div key={story.id} className="bg-white p-6 rounded-3xl border border-[#E5D7C6] plush-shadow space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={story.productImage}
                    alt={story.petName}
                    className="w-14 h-14 rounded-2xl object-cover border border-[#E5D7C6]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#3D2E2B]">{story.petName}</h4>
                    <p className="text-xs text-[#C86D51] font-semibold">{story.petSpecies} ({story.years})</p>
                  </div>
                </div>

                <p className="text-xs text-[#795548] leading-relaxed italic">
                  "{story.story}"
                </p>

                <div className="pt-2 border-t border-[#E5D7C6] flex items-center justify-between text-[11px] text-gray-500">
                  <span className="font-bold text-[#3D2E2B]">{story.ownerName}</span>
                  <span>{story.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Light Candle Modal */}
      {showCandleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl max-w-md w-full border border-[#E5D7C6] space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#E5D7C6] pb-3">
              <h3 className="font-extrabold text-lg text-[#3D2E2B] flex items-center space-x-2">
                <Flame className="w-5 h-5 text-[#E5C158] fill-current" />
                <span>Light a Remembrance Candle</span>
              </h3>
              <button onClick={() => setShowCandleModal(false)} className="text-gray-400 hover:text-black font-bold">
                ✕
              </button>
            </div>

            {candleLitSuccess ? (
              <div className="py-8 text-center space-y-3">
                <Flame className="w-12 h-12 text-[#E5C158] fill-current mx-auto animate-bounce" />
                <h4 className="font-extrabold text-base text-[#3D2E2B]">Your Candle Has Been Lit ❤️</h4>
                <p className="text-xs text-gray-600">May your pet's warm memory bring comfort to your heart.</p>
              </div>
            ) : (
              <form onSubmit={handleLightCandle} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#5C4033] block mb-1">Pet's Name *</label>
                  <input
                    type="text"
                    required
                    value={newPetName}
                    onChange={(e) => setNewPetName(e.target.value)}
                    placeholder="e.g. Barnaby, Cleo"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5D7C6] text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5C4033] block mb-1">Your Name / Family Name</label>
                  <input
                    type="text"
                    value={newSender}
                    onChange={(e) => setNewSender(e.target.value)}
                    placeholder="e.g. Sarah & David"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5D7C6] text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5C4033] block mb-1">Remembrance Message *</label>
                  <textarea
                    required
                    rows={3}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write a gentle message for your pet..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5D7C6] text-sm focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C86D51] hover:bg-[#b0583e] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-colors"
                >
                  Light Candle Now
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
