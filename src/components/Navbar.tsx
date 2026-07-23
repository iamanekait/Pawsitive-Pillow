import React, { useState } from 'react';
import { Heart, ShoppingBag, Search, Menu, X, Sparkles, MapPin, Truck, HelpCircle, PhoneCall } from 'lucide-react';
import { Currency } from '../types';

interface NavbarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  cartCount?: number;
  openCart?: () => void;
  onOpenCart?: () => void;
  wishlistCount?: number;
  currency?: Currency;
  setCurrency?: (cur: Currency) => void;
  openTracker?: () => void;
  onOpenTracker?: () => void;
  onOpenCustomizer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'home',
  setActiveTab,
  cartCount = 0,
  openCart,
  onOpenCart,
  wishlistCount = 0,
  currency = 'USD',
  setCurrency,
  openTracker,
  onOpenTracker,
  onOpenCustomizer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabClick = (tabId: string) => {
    if (setActiveTab) {
      setActiveTab(tabId);
    }
    if (tabId === 'customizer') {
      if (onOpenCustomizer) onOpenCustomizer();
      else {
        const el = document.getElementById('customizer-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (tabId === 'memorial') {
      const el = document.getElementById('memorial-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'shop') {
      const el = document.getElementById('shop-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'blog') {
      const el = document.getElementById('blog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'about') {
      const el = document.getElementById('about-section') || document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById(tabId) || document.getElementById(`${tabId}-section`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCart = () => {
    if (onOpenCart) onOpenCart();
    else if (openCart) openCart();
  };

  const handleOpenTracker = () => {
    if (onOpenTracker) onOpenTracker();
    else if (openTracker) openTracker();
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'customizer', label: '✨ Build My Pillow', isHighlight: true },
    { id: 'shop', label: 'Shop Products' },
    { id: 'memorial', label: 'Forever in Our Hearts ❤️', isMemorial: true },
    { id: 'about', label: 'Our Story' },
    { id: 'blog', label: 'Pet Blog' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E5D7C6]/80 transition-all">
      {/* Top Banner */}
      <div className="bg-[#5C4033] text-[#FDFBF7] text-xs py-1.5 px-4 text-center font-medium flex items-center justify-between">
        <div className="hidden sm:flex items-center space-x-2 text-[#E5C158]">
          <MapPin className="w-3.5 h-3.5" />
          <span>Handcrafted in Durgapur, West Bengal</span>
        </div>
        <div className="mx-auto sm:mx-0 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>FREE AI Background Removal & Express Worldwide Shipping!</span>
          <span className="hidden md:inline font-bold underline cursor-pointer ml-2" onClick={() => handleTabClick('customizer')}>
            Upload Photo Now →
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={handleOpenTracker} className="hover:text-[#E5C158] flex items-center space-x-1 transition-colors">
            <Truck className="w-3.5 h-3.5" />
            <span>Track Order</span>
          </button>
          <div className="flex items-center space-x-1">
            <span className="text-gray-300">Currency:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency && setCurrency(e.target.value as Currency)}
              className="bg-transparent text-[#E5C158] font-bold focus:outline-none cursor-pointer"
            >
              <option value="USD" className="text-black">USD ($)</option>
              <option value="INR" className="text-black">INR (₹)</option>
              <option value="EUR" className="text-black">EUR (€)</option>
              <option value="GBP" className="text-black">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleTabClick('home')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#5C4033] to-[#795548] flex items-center justify-center text-white plush-shadow transform hover:scale-105 transition-all">
              <span className="font-rounded font-extrabold text-xl tracking-tight text-[#E5C158]">PP</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-rounded font-extrabold text-2xl tracking-tight text-[#3D2E2B]">Pawsitive</span>
                <span className="font-serif-luxury text-2xl italic font-semibold text-[#C86D51]">Pillow</span>
              </div>
              <p className="text-[10px] text-[#795548] font-medium tracking-wider uppercase">Custom Pet Artistry & Memorials</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  activeTab === item.id
                    ? item.isMemorial
                      ? 'bg-[#C86D51] text-white shadow-sm'
                      : 'bg-[#5C4033] text-white shadow-sm'
                    : item.isHighlight
                    ? 'bg-[#E5C158]/20 text-[#5C4033] border border-[#E5C158]/50 hover:bg-[#E5C158]/30 font-bold'
                    : item.isMemorial
                    ? 'text-[#C86D51] hover:bg-[#C86D51]/10 font-bold'
                    : 'text-[#5C4033] hover:bg-[#F5EFE6]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-2xl hover:bg-[#F5EFE6] text-[#5C4033] transition-colors"
              title="Search Products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Order Tracker */}
            <button
              onClick={handleOpenTracker}
              className="hidden sm:flex p-2.5 rounded-2xl hover:bg-[#F5EFE6] text-[#5C4033] transition-colors"
              title="Track Order Status"
            >
              <Truck className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <div className="relative">
              <button
                onClick={() => handleTabClick('shop')}
                className="p-2.5 rounded-2xl hover:bg-[#F5EFE6] text-[#5C4033] transition-colors"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 text-[#C86D51]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#C86D51] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </div>

            {/* Cart Button */}
            <button
              onClick={handleOpenCart}
              className="flex items-center space-x-2 bg-[#5C4033] text-white px-4 py-2.5 rounded-2xl plush-shadow hover:bg-[#3D2E2B] transition-all transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-[#E5C158]" />
              <span className="font-bold text-xs">Cart</span>
              {cartCount > 0 && (
                <span className="bg-[#E5C158] text-[#3D2E2B] font-extrabold text-[11px] px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl hover:bg-[#F5EFE6] text-[#5C4033]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="bg-[#F5EFE6] border-b border-[#E5D7C6] py-3 px-4 transition-all">
          <div className="max-w-2xl mx-auto flex items-center space-x-3">
            <Search className="w-5 h-5 text-[#795548]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search custom pet pillows, memorial mugs, blankets..."
              className="w-full bg-white px-4 py-2 rounded-xl border border-[#E5D7C6] text-sm focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
              autoFocus
            />
            <button
              onClick={() => {
                if (searchQuery.trim()) handleTabClick('shop');
                setSearchOpen(false);
              }}
              className="bg-[#5C4033] text-white px-4 py-2 rounded-xl text-xs font-bold"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFBF7] border-b border-[#E5D7C6] px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                handleTabClick(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-[#5C4033] text-white'
                  : item.isMemorial
                  ? 'text-[#C86D51] bg-[#C86D51]/10 font-bold'
                  : 'text-[#5C4033] hover:bg-[#F5EFE6]'
              }`}
            >
              <span>{item.label}</span>
              {item.isHighlight && <span className="bg-[#E5C158] text-[#3D2E2B] text-[10px] px-2 py-0.5 rounded-full font-bold">New</span>}
            </button>
          ))}
          <div className="pt-2 border-t border-[#E5D7C6] flex justify-between items-center px-2">
            <button onClick={handleOpenTracker} className="text-xs font-semibold text-[#5C4033] flex items-center space-x-1">
              <Truck className="w-4 h-4 text-[#C86D51]" />
              <span>Track Order</span>
            </button>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-500">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency && setCurrency(e.target.value as Currency)}
                className="bg-white border border-[#E5D7C6] rounded-lg px-2 py-1 font-bold text-[#5C4033]"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
