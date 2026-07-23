import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Gift, Check, ShieldCheck, Heart } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/currency';
import { db, auth } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currency?: Currency;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency = 'USD',
}) => {
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Checkout Form
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 75;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === 'PAWSITIVE15') {
      const disc = subtotal * 0.15;
      setDiscountAmount(disc);
      setDiscountApplied(true);
    } else if (discountCode.toUpperCase() === 'PAWSITIVE10') {
      const disc = subtotal * 0.10;
      setDiscountAmount(disc);
      setDiscountApplied(true);
    } else {
      alert('Invalid coupon code. Try "PAWSITIVE15"!');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);

    try {
      await addDoc(collection(db, 'orders'), {
        userId: auth.currentUser?.uid || 'guest',
        customerName: customerName || 'Guest Pet Lover',
        customerEmail: customerEmail || auth.currentUser?.email || 'guest@example.com',
        shippingAddress: `${address}, ${city}`,
        items: cartItems.map((item) => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          size: item.size || '16-inch',
          customPetName: item.customPetName || '',
        })),
        total: total,
        currency: currency,
        status: 'Handcrafting in Durgapur',
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Could not persist order to Firestore:', err);
    }

    setTimeout(() => {
      onClearCart();
    }, 2000);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
        <div className="bg-[#FDFBF7] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#E5D7C6]">
          
          {/* Cart Header */}
          <div className="p-5 border-b border-[#E5D7C6] flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#5C4033]" />
              <h3 className="font-extrabold text-lg text-[#3D2E2B]">Your Cart ({cartItems.length})</h3>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-black">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#F5EFE6] px-5 py-3 border-b border-[#E5D7C6] space-y-1 text-xs">
            {subtotal >= freeShippingThreshold ? (
              <p className="font-bold text-[#2D4519] flex items-center space-x-1">
                <Check className="w-4 h-4 text-[#87A96B]" />
                <span>You unlocked FREE Express Worldwide Shipping!</span>
              </p>
            ) : (
              <p className="text-[#795548]">
                Add <span className="font-bold text-[#3D2E2B]">{formatPrice(freeShippingThreshold - subtotal, currency)}</span> more for FREE Express Shipping!
              </p>
            )}
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#87A96B] h-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#E5D7C6] mx-auto" />
                <p className="font-bold text-sm text-[#3D2E2B]">Your cart is currently empty</p>
                <p className="text-xs text-gray-400">Design a custom pet cutout pillow to get started!</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-[#E5D7C6] flex space-x-3 plush-shadow">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#E5D7C6]"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-xs text-[#3D2E2B] line-clamp-1">{item.name}</h4>
                      <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.petName && <p className="text-[10px] text-[#C86D51] font-bold">Pet: {item.petName}</p>}
                    {item.size && <p className="text-[10px] text-gray-500">Size: {item.size}</p>}

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center bg-[#F5EFE6] rounded-lg border border-[#E5D7C6]">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-2 py-0.5 font-bold text-xs text-[#5C4033]">-</button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-2 py-0.5 font-bold text-xs text-[#5C4033]">+</button>
                      </div>

                      <span className="font-extrabold text-sm text-[#3D2E2B]">{formatPrice(item.price * item.quantity, currency)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-[#E5D7C6] bg-white space-y-4">
              
              {/* Discount Code Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Coupon (e.g. PAWSITIVE15)"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E5D7C6] focus:outline-none uppercase"
                />
                <button
                  onClick={handleApplyDiscount}
                  className="bg-[#5C4033] text-white px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Apply
                </button>
              </div>

              {discountApplied && (
                <p className="text-xs text-[#87A96B] font-bold flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>15% Discount Applied (-{formatPrice(discountAmount, currency)})</span>
                </p>
              )}

              {/* Totals */}
              <div className="space-y-1.5 text-xs text-[#795548]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#87A96B]">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between font-extrabold text-base text-[#3D2E2B] pt-2 border-t border-[#E5D7C6]">
                  <span>Total</span>
                  <span>{formatPrice(total, currency)}</span>
                </div>
              </div>

              <button
                onClick={() => setShowCheckoutModal(true)}
                className="w-full bg-[#5C4033] hover:bg-[#3D2E2B] text-white py-3.5 rounded-2xl font-extrabold text-sm plush-shadow flex items-center justify-center space-x-2 transition-all"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#E5C158]" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] max-w-lg w-full rounded-3xl border border-[#E5D7C6] p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold"
            >
              <X className="w-5 h-5" />
            </button>

            {orderComplete ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#87A96B] text-white rounded-full flex items-center justify-center mx-auto plush-shadow">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-extrabold text-2xl text-[#3D2E2B]">Order Confirmed! 🎉</h3>
                <p className="text-xs text-[#795548] max-w-xs mx-auto">
                  Thank you! Your custom pet cutout order has been routed to our Durgapur artisan craft facility. Track your order status using ID <span className="font-bold text-[#3D2E2B]">PP-98241</span>.
                </p>
                <button
                  onClick={() => {
                    setShowCheckoutModal(false);
                    onClose();
                  }}
                  className="bg-[#5C4033] text-white px-6 py-2.5 rounded-xl font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="border-b border-[#E5D7C6] pb-3">
                  <h3 className="font-extrabold text-lg text-[#3D2E2B]">Secure Checkout</h3>
                  <p className="text-xs text-gray-500">Handcrafted & Dispatched from Durgapur, West Bengal</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-[#5C4033] block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Aniket D."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D7C6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#5C4033] block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="e.g. sales@pawsitivepillow.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D7C6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#5C4033] block mb-1">Delivery Address *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House / Street / Area"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D7C6] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-[#5C4033] block mb-1">City / Location *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Durgapur, Kolkata, Mumbai"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D7C6] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-[#5C4033] block mb-1">Payment Method</label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D7C6] focus:outline-none font-bold"
                      >
                        <option value="upi">UPI / GPay / PhonePe</option>
                        <option value="card">Credit / Debit Card</option>
                        <option value="cod">Cash on Delivery</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5D7C6] space-y-3">
                  <div className="flex justify-between font-extrabold text-sm text-[#3D2E2B]">
                    <span>Total Amount Payable</span>
                    <span>{formatPrice(total, currency)}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#5C4033] hover:bg-[#3D2E2B] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-colors"
                  >
                    Place Custom Pet Order Now
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
