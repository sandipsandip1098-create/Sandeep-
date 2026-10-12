import React from 'react';
import {
  X,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Printer,
  Share2,
  Star,
  Sparkles,
  ChefHat,
  Package,
  Store,
  ChevronRight,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { OrderStatus } from '../types/bakery';

export const OrderTracker: React.FC = () => {
  const {
    activeOrder,
    isOrderTrackerOpen,
    setIsOrderTrackerOpen,
    setIsFeedbackOpen,
    updateOrderStatus,
    t
  } = useBakery();

  if (!isOrderTrackerOpen || !activeOrder) return null;

  const steps: {
    status: OrderStatus;
    titleHi: string;
    titleEn: string;
    descHi: string;
    descEn: string;
    icon: React.ReactNode;
  }[] = [
    {
      status: 'placed',
      titleHi: 'ऑर्डर स्वीकार हुआ',
      titleEn: 'Order Accepted',
      descHi: 'बेकरी मैनेजर द्वारा ऑर्डर कन्फर्म किया गया।',
      descEn: 'Order received and confirmed by the bakery manager.',
      icon: <CheckCircle2 className="w-5 h-5" />
    },
    {
      status: 'baking',
      titleHi: 'ओवन में बेकिंग व तैयारी',
      titleEn: 'Baking & Crafting',
      descHi: 'मास्टर शेफ द्वारा ताज़ा बेकिंग व आइसिंग की जा रही है।',
      descEn: 'Our master baker is whisking fresh sponge and frosting.',
      icon: <ChefHat className="w-5 h-5" />
    },
    {
      status: 'quality_check',
      titleHi: 'गुणवत्ता जांच व गिफ्ट बॉक्सिंग',
      titleEn: 'Quality Check & Boxed',
      descHi: 'केक मैसेज चेक हुआ और हाइजेनिक बॉक्स में पैक किया गया।',
      descEn: 'Inspected for perfection and packaged in signature box.',
      icon: <Package className="w-5 h-5" />
    },
    {
      status: 'out_for_delivery',
      titleHi: activeOrder.orderType === 'delivery' ? 'डिलीवरी के लिए निकल गया' : 'पिकअप के लिए तैयार है',
      titleEn: activeOrder.orderType === 'delivery' ? 'Out for Delivery' : 'Ready for Counter Pickup',
      descHi:
        activeOrder.orderType === 'delivery'
          ? 'राइडर आपके पते की ओर निकल चुका है।'
          : 'कृपया बेकरी काउंटर से अपना ऑर्डर प्राप्त करें।',
      descEn:
        activeOrder.orderType === 'delivery'
          ? 'Delivery partner is on their way with thermal bag.'
          : 'Ready at the front counter for pickup.',
      icon: activeOrder.orderType === 'delivery' ? <Truck className="w-5 h-5" /> : <Store className="w-5 h-5" />
    },
    {
      status: 'delivered',
      titleHi: activeOrder.orderType === 'delivery' ? 'सफलतापूर्वक डिलीवर हुआ' : 'ऑर्डर प्राप्त हुआ',
      titleEn: activeOrder.orderType === 'delivery' ? 'Delivered Fresh' : 'Order Picked Up',
      descHi: 'आशा है आपको स्वाद बहुत पसंद आएगा! फीडबैक साझा करें।',
      descEn: 'Enjoy every bite! Please rate your experience.',
      icon: <Sparkles className="w-5 h-5" />
    }
  ];

  const statusOrder: OrderStatus[] = ['placed', 'baking', 'quality_check', 'out_for_delivery', 'delivered'];
  const currentIndex = statusOrder.indexOf(activeOrder.status);

  const handleNextStatus = () => {
    if (currentIndex < statusOrder.length - 1) {
      updateOrderStatus(activeOrder.id, statusOrder[currentIndex + 1]);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = `मेरा संदीप बेकरी ऑर्डर ${activeOrder.orderNumber}! कुल राशि: ₹${activeOrder.total}। लाइव स्टेटस: ${activeOrder.status}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-amber-200 max-h-[92vh]">
        {/* Tracker Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 bg-amber-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-700 text-white shadow-xs">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-bakery font-bold text-xl text-amber-950">
                  {t('लाइव ऑर्डर ट्रैकिंग', 'Live Order Tracking')}
                </h2>
                <span className="font-mono text-xs font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                  {activeOrder.orderNumber}
                </span>
              </div>
              <p className="text-xs text-stone-500">
                {t('ऑर्डर समय:', 'Placed at:')} {activeOrder.createdAt}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="p-2 rounded-full hover:bg-stone-200/60 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Tracker Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1">
          {/* Estimated Time & Status Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 text-white shadow-lg relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {activeOrder.status === 'delivered'
                    ? t('ऑर्डर पूरा हो चुका है', 'Order Completed')
                    : t('अनुमानित डिलीवरी समय', 'Estimated Time of Arrival')}
                </span>
                <h3 className="text-2xl font-bold font-serif-bakery text-white">
                  {activeOrder.status === 'delivered'
                    ? t('डिलीवर हो चुका है! 🎉', 'Delivered Fresh! 🎉')
                    : activeOrder.orderType === 'delivery'
                    ? `~${activeOrder.estimatedDeliveryMinutes} ${t('मिनट में पहुंचेगा', 'Minutes')}`
                    : `~20 ${t('मिनट में काउंटर पर तैयार', 'Minutes for Pickup')}`}
                </h3>
                <p className="text-xs text-amber-200">
                  {activeOrder.orderType === 'delivery'
                    ? t(`डिलीवरी पता: ${activeOrder.customerDetails.address}`, `Delivering to: ${activeOrder.customerDetails.address}`)
                    : t('पिकअप: संदीप बेकरी मुख्य काउंटर', 'Pickup: Sandeep Bakery Counter')}
                </p>
              </div>

              {/* Status progression control button (Direct Staff / Evaluator simulation) */}
              <div className="flex flex-col items-center sm:items-end gap-2">
                {currentIndex < statusOrder.length - 1 ? (
                  <button
                    onClick={handleNextStatus}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
                  >
                    <span>{t('अगला स्टेटस अपडेट करें →', 'Next Stage Update →')}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsOrderTrackerOpen(false);
                      setIsFeedbackOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Star className="w-4 h-4 fill-white" />
                    <span>{t('फीडबैक व रेटिंग दें ⭐', 'Rate Experience ⭐')}</span>
                  </button>
                )}
                <span className="text-[10px] text-amber-300/80">
                  {t('चरण ' + (currentIndex + 1) + ' / 5', 'Step ' + (currentIndex + 1) + ' of 5')}
                </span>
              </div>
            </div>
          </div>

          {/* 5-Step Visual Timeline */}
          <div className="space-y-4 bg-amber-50/40 p-5 rounded-2xl border border-amber-200/80">
            <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-700" />
              <span>{t('लाइव ऑर्डर प्रोग्रेस टाइमलाइन', 'Live Order Timeline')}</span>
            </h4>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-200">
              {steps.map((step, idx) => {
                const isPassed = idx <= currentIndex;
                const isCurrent = idx === currentIndex;

                return (
                  <div key={step.status} className="relative group">
                    {/* Step Dot */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-amber-600 text-white ring-4 ring-amber-300/50 shadow-md scale-110'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 text-stone-400'
                      }`}
                    >
                      {step.icon}
                    </div>

                    {/* Step Text */}
                    <div className="ml-2">
                      <div className="flex items-center gap-2">
                        <h5
                          className={`text-sm font-bold ${
                            isCurrent
                              ? 'text-amber-900 font-extrabold'
                              : isPassed
                              ? 'text-stone-800'
                              : 'text-stone-400'
                          }`}
                        >
                          {t(step.titleHi, step.titleEn)}
                        </h5>
                        {isCurrent && (
                          <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.2 rounded-md animate-pulse">
                            {t('वर्तमान में जारी', 'In Progress')}
                          </span>
                        )}
                        {isPassed && !isCurrent && (
                          <span className="text-[10px] text-emerald-700 font-semibold">
                            ✓ {t('संपन्न', 'Completed')}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {t(step.descHi, step.descEn)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Rider Card (Only if delivery and rider out) */}
          {activeOrder.orderType === 'delivery' && activeOrder.riderDetails && (
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={activeOrder.riderDetails.photo}
                  alt={activeOrder.riderDetails.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-300"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-stone-500">
                      {t('डिलीवरी पार्टनर:', 'Delivery Partner:')}
                    </span>
                    <span className="text-xs font-bold text-stone-900">
                      {activeOrder.riderDetails.name}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    {t('वाहन सं:', 'Vehicle:')} {activeOrder.riderDetails.vehicleNumber}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${activeOrder.riderDetails.phone}`}
                className="px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-800" />
                <span>{t('कॉल करें', 'Call Rider')}</span>
              </a>
            </div>
          )}

          {/* Ordered Items Summary */}
          <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
              {t('ऑर्डर किए गए आइटम (' + activeOrder.items.length + ')', 'Ordered Items (' + activeOrder.items.length + ')')}
            </h4>

            <div className="space-y-2.5">
              {activeOrder.items.map((ci) => (
                <div key={ci.cartItemId} className="flex justify-between items-start text-xs">
                  <div>
                    <span className="font-bold text-amber-950">
                      {t(ci.item.name.hi, ci.item.name.en)} × {ci.quantity}
                    </span>
                    {ci.customization && (
                      <p className="text-[11px] text-stone-500">
                        {ci.customization.weightKg} kg, {ci.customization.flavor}
                        {ci.customization.cakeMessage && ` | ✍️ "${ci.customization.cakeMessage}"`}
                      </p>
                    )}
                  </div>
                  <span className="font-bold text-stone-900">₹{ci.itemTotal}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-xs font-bold">
              <span>{t('कुल भुगतान:', 'Total Paid:')}</span>
              <span className="text-sm font-black text-amber-950">₹{activeOrder.total}</span>
            </div>
          </div>
        </div>

        {/* Tracker Footer Action Buttons */}
        <div className="p-4 sm:p-5 border-t border-amber-100 bg-amber-50/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintReceipt}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('रसीद प्रिंट / सेव', 'Print Receipt')}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{t('व्हाट्सएप शेयर', 'Share on WhatsApp')}</span>
            </button>
          </div>

          <button
            onClick={() => {
              setIsOrderTrackerOpen(false);
              setIsFeedbackOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
          >
            <Star className="w-3.5 h-3.5 text-amber-300" />
            <span>{t('रेटिंग व समीक्षा साझा करें', 'Give Feedback')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
