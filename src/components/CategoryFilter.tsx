import React from 'react';
import {
  Cake,
  Croissant,
  Cookie,
  Flame,
  Search,
  CheckCircle2,
  Sparkles,
  UtensilsCrossed,
  Layers,
  Leaf
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { CategoryType } from '../types/bakery';

export const CategoryFilter: React.FC = () => {
  const {
    t,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    vegOnly,
    setVegOnly
  } = useBakery();

  const categories: { id: CategoryType; labelHi: string; labelEn: string; icon: React.ReactNode }[] = [
    {
      id: 'all',
      labelHi: 'सभी स्वादिष्ट आइटम',
      labelEn: 'All Delights',
      icon: <UtensilsCrossed className="w-4 h-4" />
    },
    {
      id: 'cakes',
      labelHi: 'स्पेशल केक',
      labelEn: 'Celebration Cakes',
      icon: <Cake className="w-4 h-4" />
    },
    {
      id: 'pastries',
      labelHi: 'मुलायम पेस्ट्री',
      labelEn: 'Pastries & Slices',
      icon: <Layers className="w-4 h-4" />
    },
    {
      id: 'breads',
      labelHi: 'आर्टिसन ब्रेड',
      labelEn: 'Artisan Breads',
      icon: <Croissant className="w-4 h-4" />
    },
    {
      id: 'cookies',
      labelHi: 'कुकीज़ व बिस्कुट',
      labelEn: 'Cookies & Bakes',
      icon: <Cookie className="w-4 h-4" />
    },
    {
      id: 'savouries',
      labelHi: 'गर्म नमकीन पफ',
      labelEn: 'Warm Savouries',
      icon: <Flame className="w-4 h-4" />
    },
    {
      id: 'cupcakes',
      labelHi: 'कपकेक्स व मफिन',
      labelEn: 'Cupcakes',
      icon: <Sparkles className="w-4 h-4" />
    }
  ];

  return (
    <div id="digital-menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      {/* Search and Veg Toggle Header */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-amber-100 shadow-xs">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('केक, पेस्ट्री, ब्रेड या कुकीज़ खोजें...', 'Search cakes, pastries, breads, cookies...')}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-amber-50/50 border border-amber-200/60 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-stone-900 placeholder:text-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-200 hover:bg-stone-300 w-5 h-5 rounded-full flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>

        {/* Veg Only Switch */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
              vegOnly
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs ring-2 ring-emerald-500/20'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <div className="w-4 h-4 rounded-xs border-2 border-emerald-600 flex items-center justify-center p-0.5">
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
            </div>
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('100% शुद्ध शाकाहारी (एगलेस)', '100% Pure Veg (Eggless)')}</span>
            {vegOnly && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          </button>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-amber-800 text-white shadow-md shadow-amber-900/20 scale-[1.02]'
                  : 'bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-900 border border-amber-200/60'
              }`}
            >
              <span className={isActive ? 'text-amber-300' : 'text-amber-700'}>
                {cat.icon}
              </span>
              <span>{t(cat.labelHi, cat.labelEn)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
