import React, { useState } from 'react';
import { Truck, CheckCircle, Clock, MapPin, Package, X, Search } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ isOpen, onClose }) => {
  const [orderId, setOrderId] = useState('PP-98241');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/track-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrderData(data.order);
      } else {
        setError('Order not found. Please check your order ID.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] max-w-lg w-full rounded-3xl border border-[#E5D7C6] p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-[#3D2E2B] flex items-center space-x-2">
            <Truck className="w-5 h-5 text-[#C86D51]" />
            <span>Track Your Custom Pet Order</span>
          </h3>
          <p className="text-xs text-[#795548]">
            Enter your Pawsitive Pillow order number (e.g. PP-98241 or PP-77102) to view live progress.
          </p>
        </div>

        {/* Lookup Form */}
        <form onSubmit={handleTrack} className="flex gap-2">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. PP-98241"
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5D7C6] text-sm focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#5C4033] hover:bg-[#3D2E2B] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? 'Searching...' : 'Track'}</span>
          </button>
        </form>

        {error && <p className="text-xs text-red-500 font-bold">{error}</p>}

        {/* Results Display */}
        {orderData && (
          <div className="bg-white p-5 rounded-2xl border border-[#E5D7C6] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5D7C6] pb-3 text-xs">
              <div>
                <p className="font-extrabold text-[#3D2E2B]">Order ID: {orderData.id}</p>
                <p className="text-gray-500">{orderData.product}</p>
              </div>
              <span className="bg-[#87A96B]/20 text-[#2D4519] text-[10px] font-bold px-2.5 py-1 rounded-full">
                {orderData.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-[#5C4033]">
                <span>Progress ({orderData.step} / {orderData.totalSteps})</span>
                <span>Est: {orderData.estimatedDelivery}</span>
              </div>
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#87A96B] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${(orderData.step / orderData.totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Facility & Carrier */}
            <div className="text-[11px] text-[#795548] space-y-1 bg-[#F5EFE6] p-3 rounded-xl">
              <p><span className="font-bold text-[#3D2E2B]">Craft Facility:</span> {orderData.origin}</p>
              <p><span className="font-bold text-[#3D2E2B]">Courier Partner:</span> {orderData.carrier}</p>
            </div>

            {/* Timeline */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-[#3D2E2B]">Live Status Updates:</p>
              <div className="space-y-2 text-xs">
                {orderData.timeline.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <div className="mt-0.5">
                      {item.time === 'In Progress' ? (
                        <Clock className="w-4 h-4 text-[#E5C158] animate-spin" />
                      ) : item.time === 'Upcoming' ? (
                        <div className="w-3.5 h-3.5 rounded-full border border-gray-300 ml-0.5" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-[#87A96B]" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-[#3D2E2B] text-[11px]">{item.status}</p>
                      <p className="text-[10px] text-gray-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
