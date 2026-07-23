import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CustomizerStudio } from './components/CustomizerStudio';
import { MemorialSection } from './components/MemorialSection';
import { FeaturedCategories } from './components/FeaturedCategories';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { GallerySection } from './components/GallerySection';
import { BlogSection } from './components/BlogSection';
import { FaqSection } from './components/FaqSection';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AuthModal } from './components/AuthModal';
import { AiChatbot } from './components/AiChatbot';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';

import { CartItem, Currency } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleAddToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setCartItems((prev) => [newItem, ...prev]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToCustomizer = () => {
    const el = document.getElementById('customizer-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMemorial = () => {
    const el = document.getElementById('memorial-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3D2E2B] font-sans selection:bg-[#E5C158]/30 selection:text-[#3D2E2B]">
      
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenCustomizer={scrollToCustomizer}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="space-y-0">
        {/* Hero with Interactive 3D Pillow Stage & Before/After Slider */}
        <Hero
          onStartCustomizing={scrollToCustomizer}
          onExploreMemorial={scrollToMemorial}
        />

        {/* Interactive Customizer Studio */}
        <CustomizerStudio
          currency={currency}
          onAddToCart={handleAddToCart}
          onDirectCheckout={(item) => {
            handleAddToCart(item);
            setIsCartOpen(true);
          }}
        />

        {/* Forever in Our Hearts Memorial Collection & Digital Candle Tribute Wall */}
        <MemorialSection
          currency={currency}
          onAddToCart={handleAddToCart}
          onOpenCustomizer={scrollToCustomizer}
        />

        {/* Featured Product Catalog */}
        <FeaturedCategories
          currency={currency}
          onAddToCart={handleAddToCart}
          onOpenCustomizer={scrollToCustomizer}
        />

        {/* How It Works (4 Steps) */}
        <HowItWorks onStartCustomizer={scrollToCustomizer} />

        {/* Why Choose Us (Pawsitive Difference) */}
        <WhyChooseUs />

        {/* Customer Reviews & Testimonials */}
        <Testimonials />

        {/* Pets & Cutout Pillows Community Gallery */}
        <GallerySection />

        {/* Pet Journal & Advice Blog */}
        <BlogSection />

        {/* FAQs */}
        <FaqSection />
      </main>

      {/* Footer with Dubey Conglomerate Credit */}
      <Footer
        onOpenCustomizer={scrollToCustomizer}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currency={currency}
      />

      {/* Live Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
      />

      {/* Firebase Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Floating AI Chatbot (Gemini Server API Integration) */}
      <AiChatbot />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

    </div>
  );
}
