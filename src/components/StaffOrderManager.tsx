import React, { useState } from 'react';
import {
  X,
  ChefHat,
  Truck,
  CheckCircle2,
  Package,
  Sparkles,
  Settings,
  Bell,
  RefreshCw,
  Eye,
  Volume2
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { OrderStatus } from '../types/bakery';

export const StaffOrderManager: React.FC = () => {
  const {
    isStaffManagerOpen,
    setIsStaffManagerOpen,
    activeOrder,
    ordersHistory,
    updateOrderStatus,
    setActiveOrder,
    setIsOrderTrackerOpen,
    addReview,
    t
  } = useBakery();

  if (!isStaffManagerOpen) return null;

  const statusList: { key: OrderStatus; labelHi: string; icon: string }[] = [
    { key: 'placed', labelHi: '1. स्वीकार हुआ (Placed)', icon: '🕒' },
    { key: 'baking', labelHi: '2. बेकिंग चालू (Baking)', icon: '👨‍🍳' },
    { key: 'quality_check', labelHi: '3. पैकिंग पूर्ण (Boxed)', icon: '📦' },
    { key: 'out_for_delivery', labelHi: '4. डिलीवरी पर निकला (Rider Out)', icon: '🛵' },
    { key: 'delivered', labelHi: '5. डिलीवर हुआ (Delivered)', icon: '🎉' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-amber-200 max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 bg-amber-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-800 text-amber-200">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-bakery font-bold text-lg">
                {t('संदीप बेकरी स्टाफ व लाइव सिमुलेटर', 'Sandeep Bakery Staff & Order Simulator')}
              </h2>
              <p className="text-xs text-amber-200">
                {t('लाइव ऑर्डर ट्रैकिंग को टेस्ट करने के लिए कंट्रोल पैनल', 'Interactive panel to simulate real-time bakery workflow')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsStaffManagerOpen(false)}
            className="p-1.5 rounded-full hover:bg-amber-800 text-amber-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Active Order Control Card */}
          {activeOrder ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 font-semibold block">
                    {t('सक्रिय ऑर्डर', 'Current Active Order')}
                  </span>
                  <h3 className="font-bold text-base text-amber-950 font-mono">
                    {activeOrder.orderNumber}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    setIsStaffManagerOpen(false);
                    setIsOrderTrackerOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs hover:bg-amber-800"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t('ट्रैकर स्क्रीन खोलें', 'Open Tracker UI')}</span>
                </button>
              </div>

              {/* Status Change Buttons */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-950 block">
                  {t('ऑर्डर का स्टेटस बदलें (ट्रैकिंग में तुरंत बदलाव देखें):', 'Change Status (Updates Live Tracking):')}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {statusList.map((st) => {
                    const isCurrent = activeOrder.status === st.key;
                    return (
                      <button
                        key={st.key}
                        onClick={() => updateOrderStatus(activeOrder.id, st.key)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all ${
                          isCurrent
                            ? 'border-amber-700 bg-amber-800 text-white shadow-xs'
                            : 'border-stone-300 bg-white hover:bg-amber-100/60 text-stone-700'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{st.icon}</span>
                          <span>{st.labelHi}</span>
                        </span>
                        {isCurrent && <CheckCircle2 className="w-4 h-4 text-amber-300" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Items in active order */}
              <div className="pt-2 border-t border-amber-200 text-xs text-stone-600">
                <span className="font-bold text-stone-800">{t('ग्राहक:', 'Customer:')}</span>{' '}
                {activeOrder.customerDetails.name} ({activeOrder.customerDetails.phone}) |{' '}
                <span className="font-bold text-stone-800">{t('प्रकार:', 'Type:')}</span>{' '}
                {activeOrder.orderType === 'delivery' ? t('होम डिलीवरी', 'Home Delivery') : t('टेक-अवे', 'Takeaway')}
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-2">
              <ChefHat className="w-8 h-8 text-stone-400 mx-auto" />
              <p className="text-sm font-semibold text-stone-700">
                {t('वर्तमान में कोई सक्रिय ऑर्डर नहीं है', 'No active order currently')}
              </p>
              <p className="text-xs text-stone-500">
                {t(
                  'कृपया पहले मेनू से कोई आइटम कार्ट में जोड़ें और चेकआउट करें।',
                  'Please add bakery items to cart and checkout to track live.'
                )}
              </p>
            </div>
          )}

          {/* Past Orders History Selector (if any) */}
          {ordersHistory.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                {t('सभी पिछले ऑर्डर्स (' + ordersHistory.length + ')', 'All Past Orders')}
              </h4>

              <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                {ordersHistory.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => setActiveOrder(ord)}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                      activeOrder?.id === ord.id
                        ? 'bg-amber-100 border-amber-400 font-bold'
                        : 'bg-white border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <span className="font-mono">{ord.orderNumber}</span>
                      <span className="text-stone-500 ml-2">₹{ord.total}</span>
                    </div>
                    <span className="text-[11px] text-amber-800 uppercase font-semibold">
                      {ord.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            onClick={() => setIsStaffManagerOpen(false)}
            className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold transition-colors"
          >
            {t('बंद करें', 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
};
