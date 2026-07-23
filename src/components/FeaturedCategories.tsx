import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Sparkles, Filter } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface FeaturedCategoriesProps {
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  onOpenCustomizer: () => void;
  currency?: Currency;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  onAddToCart,
  onOpenCustomizer,
  currency = 'USD',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'pillow', name: 'Custom Pet Pillows' },
    { id: 'mug', name: 'Custom Pet Mugs' },
    { id: 'blanket', name: 'Sherpa Blankets' },
    { id: 'apparel', name: 'T-Shirts & Hoodies' },
    { id: 'memorial', name: '❤️ Memorial Collection' },
    { id: 'accessories', name: 'Keychains & Totes' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory || (activeCategory === 'memorial' && p.isMemorial));

  return (
    <section id="shop-section" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#F5EFE6] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#5C4033] border border-[#E5D7C6]">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Personalized Pet Product Collection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2E2B]">
              Handcrafted Custom Products
            </h2>
            <p className="text-sm text-[#795548] max-w-xl">
              Every item is personalized using your uploaded pet photo with high-definition eco dyes and premium materials.
            </p>
          </div>

          {/* Custom Cutout Pillow Feature Banner */}
          <button
            onClick={onOpenCustomizer}
            className="bg-[#5C4033] text-white px-6 py-3.5 rounded-2xl font-bold text-xs plush-shadow hover:bg-[#3D2E2B] transition-all flex items-center space-x-2 self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4 text-[#E5C158]" />
            <span>Launch Cutout Pillow Customizer →</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? cat.id === 'memorial'
                    ? 'bg-[#C86D51] text-white border-[#C86D51] shadow-sm'
                    : 'bg-[#5C4033] text-white border-[#5C4033] shadow-sm'
                  : 'bg-white text-[#5C4033] border-[#E5D7C6] hover:bg-[#F5EFE6]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-[#E5D7C6] p-4 plush-shadow hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
            >
              {/* Product Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5EFE6]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Badges */}
                {product.badge && (
                  <span className={`absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm ${
                    product.isMemorial ? 'bg-[#C86D51] text-white' : 'bg-[#E5C158] text-[#3D2E2B]'
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-extrabold text-sm text-[#3D2E2B] group-hover:text-[#C86D51] transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-[#795548] line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-lg font-extrabold text-[#3D2E2B]">{formatPrice(product.price, currency)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through ml-2">{formatPrice(product.originalPrice, currency)}</span>
                    )}
                  </div>

                  <div className="flex items-center text-xs font-bold text-[#D4AF37]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="ml-1 text-[#3D2E2B]">{product.rating}</span>
                    <span className="text-[10px] text-gray-400 ml-0.5">({product.reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  if (product.id === 'prod-cutout-pillow') {
                    onOpenCustomizer();
                  } else {
                    onAddToCart({
                      productId: product.id,
                      name: product.name,
                      category: product.category,
                      price: product.price,
                      isMemorial: product.isMemorial,
                      quantity: 1,
                      image: product.image,
                    });
                  }
                }}
                className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
                  product.id === 'prod-cutout-pillow'
                    ? 'bg-[#5C4033] hover:bg-[#3D2E2B] text-white plush-shadow'
                    : 'bg-[#F5EFE6] hover:bg-[#5C4033] text-[#5C4033] hover:text-white border border-[#E5D7C6]'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{product.id === 'prod-cutout-pillow' ? 'Customize Cutout Pillow' : 'Add to Cart'}</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
