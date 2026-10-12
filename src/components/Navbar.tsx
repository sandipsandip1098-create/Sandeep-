import React from 'react';
import {
  ShoppingBag,
  Bell,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Settings2,
  Cake,
  Truck
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    unreadNotificationsCount,
    setIsNotificationsOpen,
    activeOrder,
    setIsOrderTrackerOpen,
    setIsStaffManagerOpen
  } = useBakery();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100/80 shadow-xs">
      {/* Top micro bar for bakery open hours & helpline */}
      <div className="bg-amber-900 text-amber-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              {t('सुबह 8:00 से रात 11:00 बजे तक खुला', 'Open 8:00 AM - 11:00 PM')}
            </span>
            <span className="hidden sm:flex items-center gap-1 text-amber-200">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              {t('मेन मार्केट, बेकरी लेन, सिविल लाइन्स', 'Main Market, Bakery Lane, Civil Lines')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:8555924408"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-300" />
              <span>{t('ऑर्डर हेल्पलाइन: +91 85559 24408', 'Helpline: +91 85559 24408')}</span>
            </a>
            
            {/* Quick staff / admin simulation toggle */}
            <button
              onClick={() => setIsStaffManagerOpen(true)}
              className="hidden md:flex items-center gap-1 text-[11px] bg-amber-800/80 hover:bg-amber-700 text-amber-200 px-2 py-0.5 rounded transition-colors"
              title={t('स्टाफ कंट्रोल: ऑर्डर स्टेटस बदलें', 'Staff Controls: simulate order progression')}
            >
              <Settings2 className="w-3 h-3" />
              <span>{t('स्टाफ डेमो', 'Staff Demo')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Cake className="w-7 h-7 text-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif-bakery text-2xl font-bold text-amber-950 tracking-tight">
                {t('संदीप बेकरी', 'Sandeep Bakery')}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                100% {t('ताज़ा', 'Fresh')}
              </span>
            </div>
            <p className="text-xs text-stone-500 font-medium">
              {t('आर्टिसन केक, पेस्ट्री व फ्रेश बेक्स', 'Artisan Cakes, Pastries & Fresh Bakes')}
            </p>
          </div>
        </div>

        {/* Right action tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active order live tracking tracker badge */}
          {activeOrder && (
            <button
              onClick={() => setIsOrderTrackerOpen(true)}
              className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs animate-pulse"
            >
              <Truck className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">{t('लाइव ऑर्डर ट्रैक करें', 'Track Live Order')}</span>
              <span className="sm:hidden">{t('ट्रैकिंग', 'Track')}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </button>
          )}

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-2 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 border border-stone-200 transition-colors"
            title={language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
          >
            <span className="text-sm">🌐</span>
            <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
          </button>

          {/* Push Notifications button */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/70 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-amber-800" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white rounded-full text-[11px] font-bold flex items-center justify-center shadow-xs">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-3.5 sm:px-4 py-2.5 rounded-xl font-medium shadow-md shadow-amber-700/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-amber-800 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-amber-600">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-[11px] text-amber-200 uppercase font-semibold">
                {t('कार्ट', 'Cart')}
              </span>
              <span className="text-xs font-bold">
                {cartCount > 0 ? `₹${cartSubtotal}` : t('खाली', 'Empty')}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
