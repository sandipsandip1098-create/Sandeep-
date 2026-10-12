import React from 'react';
import {
  Cake,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Heart,
  Instagram,
  Facebook,
  Sparkles
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';

export const Footer: React.FC = () => {
  const {
    t,
    setSelectedCategory,
    setIsOrderTrackerOpen,
    setIsFeedbackOpen,
    setIsNotificationsOpen,
    activeOrder
  } = useBakery();

  return (
    <footer className="bg-amber-950 text-amber-100/90 pt-14 pb-8 border-t border-amber-900 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-amber-950 font-bold shadow-md">
                <Cake className="w-6 h-6 text-amber-950" />
              </div>
              <div>
                <span className="font-serif-bakery text-xl font-bold text-white tracking-tight">
                  {t('संदीप बेकरी', 'Sandeep Bakery')}
                </span>
                <span className="block text-[11px] text-amber-300">
                  {t('आर्टिसन पेस्ट्री व फ्रेश बेक्स', 'Artisan Bakery & Patisserie')}
                </span>
              </div>
            </div>

            <p className="text-xs text-amber-200/80 leading-relaxed">
              {t(
                'हम हर दिन शुद्ध सामग्री, बिना किसी मिलावट और 100% प्यार के साथ ताज़ा केक, ब्रेड और कुकीज़ तैयार करते हैं।',
                'Crafting celebration cakes, crisp artisan breads and decadent desserts baked fresh every morning.'
              )}
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t('100% हाइजीन व सुरक्षा प्रमाणित', '100% Certified Safe & Hygenic')}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-bakery font-bold text-white text-base">
              {t('डिजिटल मेनू श्रेणियां', 'Digital Menu')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setSelectedCategory('cakes')}
                  className="hover:text-amber-300 transition-colors"
                >
                  🎂 {t('सेलिब्रेशन केक (Cakes)', 'Celebration Cakes')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('pastries')}
                  className="hover:text-amber-300 transition-colors"
                >
                  🍰 {t('मुलायम पेस्ट्रीज (Pastries)', 'Fresh Pastries')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('breads')}
                  className="hover:text-amber-300 transition-colors"
                >
                  🥖 {t('आर्टिसन ब्रेड व क्रोइसैन (Breads)', 'Artisan Breads')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('cookies')}
                  className="hover:text-amber-300 transition-colors"
                >
                  🍪 {t('कुकीज़ व नानखटाई (Cookies)', 'Cookies & Biscuits')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('savouries')}
                  className="hover:text-amber-300 transition-colors"
                >
                  🥟 {t('गर्म पफ व पैटी (Savouries)', 'Warm Savouries')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Tracking */}
          <div className="space-y-3">
            <h4 className="font-serif-bakery font-bold text-white text-base">
              {t('ग्राहक सुविधाएं', 'Customer Care')}
            </h4>
            <ul className="space-y-2 text-xs">
              {activeOrder && (
                <li>
                  <button
                    onClick={() => setIsOrderTrackerOpen(true)}
                    className="text-amber-300 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>🛵 {t('सक्रिय ऑर्डर लाइव ट्रैक करें', 'Track Active Order')}</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => setIsFeedbackOpen(true)}
                  className="hover:text-amber-300 transition-colors"
                >
                  ⭐ {t('समीक्षा व रेटिंग दें (Review Us)', 'Write a Review')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsNotificationsOpen(true)}
                  className="hover:text-amber-300 transition-colors"
                >
                  🏷️ {t('डिस्काउंट व फेस्टिव ऑफर्स', 'View Offers & Alerts')}
                </button>
              </li>
              <li>
                <span className="text-amber-300/80">
                  💳 {t('स्वीकृत भुगतान: UPI, Card, Cash', 'Accepted: UPI, Card, Cash')}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif-bakery font-bold text-white text-base">
              {t('संपर्क व समय', 'Visit & Contact')}
            </h4>
            <div className="space-y-2 text-xs text-amber-200/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{t('दुकान 4-5, मेन मार्केट, बेकरी लेन, सिविल लाइन्स', 'Shop 4-5, Main Market, Bakery Lane, Civil Lines')}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('सुबह 8:00 AM - रात 11:00 PM (सातों दिन)', '8:00 AM - 11:00 PM (All 7 Days)')}</span>
              </p>
              <a href="tel:8555924408" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 85559 24408</span>
              </a>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>orders@sandeepbakery.in</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-amber-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-300/70">
          <p>
            © {new Date().getFullYear()} {t('संदीप बेकरी. सर्वाधिकार सुरक्षित।', 'Sandeep Bakery. All rights reserved.')}
          </p>
          <p className="flex items-center gap-1">
            <span>{t('प्रेम व ताज़गी से निर्मित', 'Baked with love & freshness')}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
