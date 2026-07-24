import React, { useState, useEffect } from 'react';
import { Truck, CheckCircle, Clock, MapPin, Package, X, Search, Radio, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, onSnapshot, setDoc, updateDoc, collection, query, where } from 'firebase/firestore';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ isOpen, onClose }) => {
  const [searchOrderId, setSearchOrderId] = useState('PP-98241');
  const [activeTrackingId, setActiveTrackingId] = useState('PP-98241');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [error, setError] = useState('');
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [userOrders, setUserOrders] = useState<any[]>([]);

  // 1. Live Realtime Firestore Listener for current logged-in user's orders
  useEffect(() => {
    if (!auth.currentUser) return;

    const ordersQuery = query(
      collection(db, 'orders'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      ordersQuery,
      (snapshot) => {
        const loaded: any[] = [];
        snapshot.forEach((docSnap) => {
          loaded.push({ id: docSnap.id, ...docSnap.data() });
        });
        setUserOrders(loaded);
      },
      (err) => {
        console.warn('Error fetching user orders live:', err);
      }
    );

    return () => unsubscribe();
  }, [isOpen, auth.currentUser]);

  // 2. Live Realtime Firestore Listener for the active tracked Order ID
  useEffect(() => {
    if (!isOpen || !activeTrackingId) return;

    setLoading(true);
    setError('');

    const cleanId = activeTrackingId.trim().toUpperCase();
    const docRef = doc(db, 'orders', cleanId);

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      docRef,
      async (snapshot) => {
        setIsLiveConnected(true);
        if (snapshot.exists()) {
          setOrderData({ id: snapshot.id, ...snapshot.data() });
          setLoading(false);
        } else {
          // Document does not exist in Firestore yet.
          // Fetch default template from backend API & seed Firestore so real-time listener takes over!
          try {
            const res = await fetch('/api/track-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderId: cleanId }),
            });
            const data = await res.json();
            if (data.success && data.order) {
              const seedData = {
                ...data.order,
                createdAt: new Date().toISOString(),
                liveSynced: true,
              };
              // Save to Firestore - this will immediately trigger the onSnapshot listener callback above!
              await setDoc(docRef, seedData, { merge: true });
            } else {
              setError('Order not found in system.');
              setOrderData(null);
              setLoading(false);
            }
          } catch (fetchErr) {
            setError('Could not connect to tracking server.');
            setLoading(false);
          }
        }
      },
      (firestoreErr) => {
        setIsLiveConnected(false);
        handleFirestoreError(firestoreErr, OperationType.GET, `orders/${cleanId}`);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isOpen, activeTrackingId]);

  if (!isOpen) return null;

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchOrderId.trim()) return;
    setActiveTrackingId(searchOrderId.trim().toUpperCase());
  };

  // Helper to advance production stage in real-time on Firestore
  const handleAdvanceProduction = async () => {
    if (!orderData || !orderData.id) return;
    const currentStep = orderData.step || 1;
    const totalSteps = orderData.totalSteps || 5;

    if (currentStep >= totalSteps) {
      alert('This order has already reached final delivery status!');
      return;
    }

    const nextStep = currentStep + 1;
    const stagesMap: Record<number, string> = {
      2: 'AI Contour Art & Photo Vector Approved',
      3: 'High-Def Eco-Velvet Sublimation Printing',
      4: 'Precision Hand Sewing & Hypoallergenic Plush Filling',
      5: 'Dispatched from Durgapur Craft Hub - En Route',
    };

    const newStatus = stagesMap[nextStep] || 'In Transit';

    // Update updated timeline
    const updatedTimeline = [...(orderData.timeline || [])];
    if (updatedTimeline[currentStep]) {
      updatedTimeline[currentStep] = {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: newStatus,
      };
    }

    try {
      const docRef = doc(db, 'orders', orderData.id);
      await updateDoc(docRef, {
        step: nextStep,
        status: newStatus,
        timeline: updatedTimeline,
        lastUpdated: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error advancing production step:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FDFBF7] max-w-lg w-full rounded-3xl border border-[#E5D7C6] p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="flex items-center justify-between pr-8">
            <h3 className="text-xl font-extrabold text-[#3D2E2B] flex items-center space-x-2">
              <Truck className="w-5 h-5 text-[#C86D51]" />
              <span>Live Order Tracker</span>
            </h3>

            {/* Realtime Connection Indicator */}
            {isLiveConnected && (
              <span className="flex items-center space-x-1.5 bg-green-50 text-green-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-green-200">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Firebase Live Sync</span>
              </span>
            )}
          </div>
          <p className="text-xs text-[#795548]">
            Real-time status updates from our Durgapur handcrafting facility.
          </p>
        </div>

        {/* Saved Orders Quick Select (if available) */}
        {userOrders.length > 0 && (
          <div className="space-y-1.5 bg-[#F5EFE6] p-3 rounded-2xl border border-[#E5D7C6]">
            <p className="text-[11px] font-bold text-[#5C4033] flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Your Placed Orders ({userOrders.length}):</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {userOrders.map((uo) => (
                <button
                  key={uo.id}
                  onClick={() => {
                    setSearchOrderId(uo.id);
                    setActiveTrackingId(uo.id);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-xl font-semibold border transition-all ${
                    activeTrackingId === uo.id
                      ? 'bg-[#5C4033] text-white border-[#5C4033]'
                      : 'bg-white text-[#5C4033] border-[#E5D7C6] hover:bg-[#E5D7C6]'
                  }`}
                >
                  #{uo.id.slice(0, 10)} ({uo.status || 'Received'})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lookup Form */}
        <form onSubmit={handleTrackSubmit} className="flex gap-2">
          <input
            type="text"
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
            placeholder="Enter Order ID e.g. PP-98241"
            className="flex-1 px-4 py-2.5 rounded-2xl border border-[#E5D7C6] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#5C4033] bg-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#5C4033] hover:bg-[#3D2E2B] text-white px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center space-x-1.5 transition-all shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? 'Syncing...' : 'Track'}</span>
          </button>
        </form>

        {error && <p className="text-xs text-red-500 font-bold bg-red-50 p-3 rounded-xl border border-red-200">{error}</p>}

        {/* Live Results Display */}
        {orderData && (
          <div className="bg-white p-5 rounded-2xl border border-[#E5D7C6] space-y-4 shadow-sm relative overflow-hidden">
            {/* Header Badge */}
            <div className="flex items-start justify-between border-b border-[#E5D7C6] pb-3 text-xs">
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-extrabold text-[#3D2E2B] text-sm">Order #{orderData.id}</p>
                  <Radio className="w-3.5 h-3.5 text-green-600 animate-pulse" />
                </div>
                <p className="text-gray-500 text-[11px] mt-0.5">{orderData.product || 'Custom Cutout Pet Pillow'}</p>
              </div>
              <span className="bg-[#87A96B]/20 text-[#2D4519] text-[11px] font-extrabold px-3 py-1 rounded-full border border-[#87A96B]/30 shrink-0">
                {orderData.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-[#5C4033]">
                <span>Stage Progress ({orderData.step || 1} / {orderData.totalSteps || 5})</span>
                <span className="text-[#87A96B]">Est: {orderData.estimatedDelivery || '3-5 Business Days'}</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden p-0.5 border border-gray-200">
                <div
                  className="bg-gradient-to-r from-[#87A96B] to-[#5C4033] h-full transition-all duration-700 rounded-full shadow-inner"
                  style={{ width: `${((orderData.step || 1) / (orderData.totalSteps || 5)) * 100}%` }}
                />
              </div>
            </div>

            {/* Live Advance Demo Simulation Button */}
            <div className="bg-[#F5EFE6] p-3 rounded-xl border border-[#E5D7C6] flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold text-[#3D2E2B] flex items-center space-x-1">
                  <Zap className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Realtime Production Demo</span>
                </p>
                <p className="text-[10px] text-gray-500">Test Firebase live listener by advancing stage.</p>
              </div>
              <button
                type="button"
                onClick={handleAdvanceProduction}
                className="bg-[#C86D51] hover:bg-[#A6543B] text-white text-[10px] font-bold px-3 py-1.5 rounded-xl transition-all shadow-sm active:scale-95"
              >
                Advance Stage 🚀
              </button>
            </div>

            {/* Facility & Carrier */}
            <div className="text-[11px] text-[#795548] space-y-1 bg-[#FDFBF7] p-3 rounded-xl border border-[#E5D7C6]/60">
              <p><span className="font-bold text-[#3D2E2B]">Craft Facility:</span> {orderData.origin || 'Durgapur Craft Facility, West Bengal'}</p>
              <p><span className="font-bold text-[#3D2E2B]">Courier Partner:</span> {orderData.carrier || 'Express Pet Courier'}</p>
            </div>

            {/* Timeline */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-extrabold text-[#3D2E2B]">Live Status Log (Firebase Stream):</p>
                <span className="text-[10px] text-gray-400 italic">Auto-updates live</span>
              </div>
              
              <div className="space-y-2 text-xs">
                {orderData.timeline && Array.isArray(orderData.timeline) ? (
                  orderData.timeline.map((item: any, idx: number) => {
                    const isCurrent = idx + 1 === (orderData.step || 1);
                    const isDone = idx + 1 < (orderData.step || 1);

                    return (
                      <div
                        key={idx}
                        className={`flex items-start space-x-2.5 p-2 rounded-xl transition-all ${
                          isCurrent ? 'bg-[#F5EFE6] border border-[#E5D7C6]' : ''
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isCurrent ? (
                            <Clock className="w-4 h-4 text-[#C86D51] animate-spin" />
                          ) : isDone ? (
                            <CheckCircle className="w-4 h-4 text-[#87A96B]" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-gray-300 ml-0.5 mt-0.5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`text-[11px] font-bold ${isCurrent ? 'text-[#C86D51]' : 'text-[#3D2E2B]'}`}>
                            {item.status}
                          </p>
                          <p className="text-[10px] text-gray-400">{item.time || 'Scheduled'}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-gray-500">Connecting to production logs...</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
