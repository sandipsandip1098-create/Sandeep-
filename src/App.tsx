import React, { useState } from 'react';
import { BakeryProvider, useBakery } from './context/BakeryContext';
import { Navbar } from './components/Navbar';
import { FestiveBanner } from './components/FestiveBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { MenuCard } from './components/MenuCard';
import { CustomizationModal } from './components/CustomizationModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTracker } from './components/OrderTracker';
import { FeedbackModal } from './components/FeedbackModal';
import { NotificationsModal } from './components/NotificationsModal';
import { StaffOrderManager } from './components/StaffOrderManager';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { BAKERY_ITEMS } from './data/bakeryData';
import {
  Cake,
  Truck,
  Sparkles,
  ShoppingBag,
  HeartHandshake,
  UtensilsCrossed,
  Layers,
  Croissant,
  Cookie,
  Flame,
  CheckCircle2,
  Clock
} from 'lucide-react';

const BakeryContent: React.FC = () => {
  const {
    selectedCategory,
    searchQuery,
    vegOnly,
    isCheckoutOpen,
    setIsCheckoutOpen,
    activeOrder,
    setIsOrderTrackerOpen,
    setIsStaffManagerOpen,
    t
  } = useBakery();

  const [appliedCheckoutCoupon, setAppliedCheckoutCoupon] = useState<{
    code: string;
    discountAmount: number;
  } | undefined>(undefined);

  // Filter items according to search, category and vegOnly
  const filteredItems = BAKERY_ITEMS.filter((item) => {
    // 1. Category check
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    // 2. Veg check
    if (vegOnly && !item.isVeg) {
      return false;
    }
    // 3. Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchHi = item.name.hi.toLowerCase().includes(q) || item.description.hi.toLowerCase().includes(q);
      const matchEn = item.name.en.toLowerCase().includes(q) || item.description.en.toLowerCase().includes(q);
      if (!matchHi && !matchEn) return false;
    }
    return true;
  });

  const handleProceedToCheckout = (couponData?: { code: string; discountAmount: number }) => {
    setAppliedCheckoutCoupon(couponData);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-stone-900 selection:bg-amber-200">
      <Navbar />

      <main className="flex-1">
        {/* Festive Promotional Hero */}
        <FestiveBanner />

        {/* Floating Active Order Alert Bar (if order is in progress) */}
        {activeOrder && activeOrder.status !== 'delivered' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div
              onClick={() => setIsOrderTrackerOpen(true)}
              className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 text-white p-3.5 sm:p-4 rounded-2xl shadow-lg flex items-center justify-between cursor-pointer hover:opacity-95 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-emerald-100 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-200">
                      {t('लाइव ऑर्डर सक्रिय', 'Live Order Active')}
                    </span>
                    <span className="font-mono text-xs font-bold bg-white/20 px-2 py-0.5 rounded">
                      {activeOrder.orderNumber}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {t('स्थिति:', 'Status:')}{' '}
                    {activeOrder.status === 'placed' && t('ऑर्डर स्वीकार हुआ 🕒', 'Order Placed 🕒')}
                    {activeOrder.status === 'baking' && t('ओवन में बेकिंग चालू 👨‍🍳', 'Baking in Oven 👨‍🍳')}
                    {activeOrder.status === 'quality_check' && t('पैकिंग व बॉक्सिंग पूर्ण 📦', 'Packed in Signature Box 📦')}
                    {activeOrder.status === 'out_for_delivery' && t('डिलीवरी के लिए निकल चुका है 🛵', 'Out for Delivery 🛵')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold bg-white/20 px-3 py-1.5 rounded-xl group-hover:bg-white/30 transition-colors">
                <span>{t('ट्रैकिंग देखें', 'Track Live')}</span>
                <span>→</span>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter & Search Section */}
        <CategoryFilter />

        {/* Digital Menu Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Section header info */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif-bakery font-bold text-2xl text-amber-950">
                {selectedCategory === 'all' && t('हमारा डिजिटल मेनू', 'Our Complete Digital Menu')}
                {selectedCategory === 'cakes' && t('विशेष सेलिब्रेशन केक', 'Celebration Cakes')}
                {selectedCategory === 'pastries' && t('ताज़ा पेस्ट्री व स्लाइस', 'Fresh Pastries & Slices')}
                {selectedCategory === 'breads' && t('आर्टिसन ब्रेड व क्रोइसैन', 'Artisan Breads')}
                {selectedCategory === 'cookies' && t('स्वादिष्ट कुकीज़ व नानखटाई', 'Cookies & Biscuits')}
                {selectedCategory === 'savouries' && t('गरमागरम नमकीन व पफ', 'Warm Savouries & Puffs')}
                {selectedCategory === 'cupcakes' && t('डिलाइटफुल कपकेक्स', 'Delightful Cupcakes')}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {t(
                  `${filteredItems.length} स्वादिष्ट विकल्प उपलब्ध हैं`,
                  `${filteredItems.length} delicious options ready to bake`
                )}
              </p>
            </div>

            {/* Quality USP highlights */}
            <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-stone-600">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {t('100% शुद्ध सामग्री', 'Pure Ingredients')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-amber-600" />
                {t('उसी दिन ताज़ा बेक', 'Fresh Same-Day Bake')}
              </span>
            </div>
          </div>

          {/* Menu Items Grid */}
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-amber-200/60 max-w-lg mx-auto space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto text-amber-700">
                <UtensilsCrossed className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-serif-bakery font-bold text-xl text-amber-950">
                {t('कोई आइटम नहीं मिला', 'No Items Found')}
              </h3>
              <p className="text-xs text-stone-500">
                {t(
                  'आपके खोजे गए शब्द या फिल्टर के अनुसार कोई परिणाम नहीं मिला। कृपया दूसरा कीवर्ड खोजें।',
                  'No match for your search criteria. Try clearing search filters.'
                )}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>

        {/* Value Proposition Banners */}
        <section className="bg-amber-100/50 py-10 border-y border-amber-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                  <Cake className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-amber-950">
                    {t('कस्टम केक डिज़ाइनिंग', 'Custom Cake Designing')}
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {t('वज़न, फ्लेवर व केक पर नाम लिखवाने का विशेष विकल्प।', 'Pick custom weight, flavors & write custom messages on cake.')}
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-amber-950">
                    {t('टेक-अवे या होम डिलीवरी', 'Takeaway or Home Delivery')}
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {t('थर्मल इंसुलेटेड बॉक्स में सुरक्षित और तेज डिलीवरी।', 'Choose 20-min takeaway or fast thermal doorstep delivery.')}
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-amber-950">
                    {t('सुरक्षित UPI व कार्ड पेमेंट', 'Secure UPI & Online Payments')}
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {t('GPay, PhonePe, QR कोड, कार्ड व कैश ऑन डिलीवरी।', 'Instant QR scan, cards, netbanking or Cash on Delivery.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews & Feedback Section */}
        <CustomerReviews />
      </main>

      {/* Modals & Drawers */}
      <CustomizationModal />
      <CartDrawer onProceedToCheckout={handleProceedToCheckout} />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        appliedCoupon={appliedCheckoutCoupon}
      />
      <OrderTracker />
      <FeedbackModal />
      <NotificationsModal />
      <StaffOrderManager />

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BakeryProvider>
      <BakeryContent />
    </BakeryProvider>
  );
}
