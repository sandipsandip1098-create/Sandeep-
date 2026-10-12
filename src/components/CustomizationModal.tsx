import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Heart,
  Check,
  Plus,
  Scale,
  Smile,
  Type,
  FileText,
  Gift,
  Leaf
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { ADD_ON_OPTIONS } from '../data/bakeryData';
import { AddOnOption, CustomizationDetails } from '../types/bakery';

export const CustomizationModal: React.FC = () => {
  const { customizingItem, setCustomizingItem, addToCart, t } = useBakery();

  if (!customizingItem) return null;

  const weights = customizingItem.availableWeights || [0.5, 1.0, 1.5, 2.0];
  const flavors = customizingItem.availableFlavors || [
    'क्लासिक बेल्जियन चॉकलेट',
    'शाही रसमलाई',
    'रेड वेलवेट क्रीम'
  ];

  const [selectedWeight, setSelectedWeight] = useState<number>(weights[0] || 0.5);
  const [selectedFlavor, setSelectedFlavor] = useState<string>(flavors[0]);
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [cakeMessage, setCakeMessage] = useState<string>('Happy Birthday! 🎉');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnOption[]>([]);

  // Compute calculated price
  const weightMultiplier = selectedWeight / 0.5;
  const basePriceForWeight = Math.round(customizingItem.basePrice * weightMultiplier);
  const addOnsTotal = selectedAddOns.reduce((acc, curr) => acc + curr.price, 0);
  const finalPrice = basePriceForWeight + addOnsTotal;

  const toggleAddOn = (addon: AddOnOption) => {
    if (selectedAddOns.some((a) => a.id === addon.id)) {
      setSelectedAddOns((prev) => prev.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddOns((prev) => [...prev, addon]);
    }
  };

  const quickMessages = [
    'Happy Birthday 🎂',
    'Happy Anniversary 💖',
    'Congratulations! 🌟',
    'Best Wishes ✨',
    'शुभ जन्मदिन 🍰'
  ];

  const handleAddToCart = () => {
    const details: CustomizationDetails = {
      weightKg: selectedWeight,
      flavor: selectedFlavor,
      isEggless,
      cakeMessage: cakeMessage.trim(),
      specialInstructions: specialInstructions.trim(),
      selectedAddOns
    };

    addToCart(customizingItem, details, 1);
    setCustomizingItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-amber-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 bg-amber-50/50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-600 text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-serif-bakery font-bold text-xl text-amber-950">
                {t('केक कस्टमाइज़ेशन', 'Cake Customization')}
              </h2>
              <p className="text-xs text-stone-500">
                {t(customizingItem.name.hi, customizingItem.name.en)}
              </p>
            </div>
          </div>

          <button
            onClick={() => setCustomizingItem(null)}
            className="p-2 rounded-full hover:bg-stone-200/60 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Visual Live Cake Preview Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 text-white p-5 shadow-inner">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Cake Thumbnail with Live Message Simulation */}
              <div className="relative w-36 h-36 shrink-0 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-xl group">
                <img
                  src={customizingItem.image}
                  alt={customizingItem.name.hi}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                  <span className="text-[10px] text-amber-300 font-medium uppercase tracking-wider">
                    {t('केक पर लाइव संदेश', 'Live Frosted Text')}
                  </span>
                  <p className="text-xs font-serif-bakery font-bold text-white drop-shadow-md break-words line-clamp-2 px-1 text-center italic">
                    {cakeMessage || t('(नाम/संदेश लिखें)', '(Type message)')}
                  </p>
                </div>
              </div>

              {/* Dynamic specifications summary */}
              <div className="space-y-1.5 text-center sm:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isEggless ? t('100% शाकाहारी (एगलेस)', '100% Eggless') : t('एग सहित', 'With Egg')}</span>
                </div>
                <h3 className="text-base font-bold text-white font-serif-bakery">
                  {t(customizingItem.name.hi, customizingItem.name.en)}
                </h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-amber-200">
                  <span className="bg-white/10 px-2 py-0.5 rounded-md font-medium">
                    ⚖️ {selectedWeight} kg
                  </span>
                  <span className="bg-white/10 px-2 py-0.5 rounded-md font-medium">
                    🍫 {selectedFlavor}
                  </span>
                  {selectedAddOns.length > 0 && (
                    <span className="bg-white/10 px-2 py-0.5 rounded-md font-medium">
                      🎁 +{selectedAddOns.length} {t('ऐड-ऑन', 'Add-ons')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 1. Weight Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-bold text-amber-950">
                <Scale className="w-4 h-4 text-amber-700" />
                <span>{t('1. केक का वज़न चुनें (Select Weight)', '1. Select Weight')}</span>
              </label>
              <span className="text-xs text-stone-500">
                {t('मूल्य वज़न के अनुसार बदलता है', 'Price scales proportionally')}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {weights.map((w) => {
                const isSelected = selectedWeight === w;
                const weightPrice = Math.round(customizingItem.basePrice * (w / 0.5));
                return (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setSelectedWeight(w)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-amber-700 bg-amber-50/80 ring-2 ring-amber-600/30 shadow-xs'
                        : 'border-stone-200 bg-stone-50/40 hover:bg-stone-50 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-base text-amber-950">
                        {w} kg
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-amber-700 text-white flex items-center justify-center text-xs">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-stone-600 block">
                      ₹{weightPrice}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {w <= 0.5 ? t('3-4 लोग', '3-4 Servings') : w <= 1.0 ? t('6-8 लोग', '6-8 Servings') : t('12-16 लोग', '12-16 Servings')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Flavor Selection */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-amber-950">
              <Smile className="w-4 h-4 text-amber-700" />
              <span>{t('2. केक का पसंदीदा फ्लेवर (Select Flavor)', '2. Select Flavor')}</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {flavors.map((flv) => {
                const isSelected = selectedFlavor === flv;
                return (
                  <button
                    key={flv}
                    type="button"
                    onClick={() => setSelectedFlavor(flv)}
                    className={`px-4 py-2.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-700 bg-amber-100 text-amber-950 font-bold shadow-xs'
                        : 'border-stone-200 bg-white hover:bg-amber-50 text-stone-700'
                    }`}
                  >
                    <span>{flv}</span>
                    {isSelected && <Check className="w-4 h-4 text-amber-700" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Dietary Choice (Eggless vs Regular) */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-amber-950 block">
              {t('3. खान-पान प्राथमिकता (Dietary Preference)', '3. Dietary Preference')}
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsEggless(true)}
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  isEggless
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-600'
                }`}
              >
                <div className="w-4 h-4 rounded-xs border-2 border-emerald-600 flex items-center justify-center p-0.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                </div>
                <span>{t('100% शाकाहारी (एगलेस)', '100% Eggless (Pure Veg)')}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEggless(false)}
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  !isEggless
                    ? 'border-amber-700 bg-amber-50 text-amber-950 ring-2 ring-amber-600/20'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-600'
                }`}
              >
                <div className="w-4 h-4 rounded-xs border-2 border-amber-800 flex items-center justify-center p-0.5">
                  <div className="w-2 h-2 rounded-full bg-amber-800" />
                </div>
                <span>{t('रेगुलर केक (एग सहित)', 'Regular Cake (With Egg)')}</span>
              </button>
            </div>
          </div>

          {/* 4. Name / Message on Cake */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-amber-950">
              <Type className="w-4 h-4 text-amber-700" />
              <span>{t('4. केक पर लिखा जाने वाला नाम या संदेश', '4. Name or Message on Cake')}</span>
              <span className="text-xs font-normal text-stone-400">({t('निःशुल्क', 'Free')})</span>
            </label>

            <input
              type="text"
              maxLength={40}
              value={cakeMessage}
              onChange={(e) => setCakeMessage(e.target.value)}
              placeholder={t('उदा. Happy Birthday Priya 🎉', 'e.g. Happy Birthday Priya 🎉')}
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50/40 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition-all placeholder:text-stone-400"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5">
              {quickMessages.map((msg) => (
                <button
                  key={msg}
                  type="button"
                  onClick={() => setCakeMessage(msg)}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 text-xs transition-colors"
                >
                  {msg}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Special Baker Instructions */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-amber-950">
              <FileText className="w-4 h-4 text-amber-700" />
              <span>{t('5. बेकर शेफ के लिए विशेष निर्देश', '5. Special Baker Instructions')}</span>
              <span className="text-xs font-normal text-stone-400">({t('वैकल्पिक', 'Optional')})</span>
            </label>

            <textarea
              rows={2}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder={t('जैसे: कम मीठा रखें, क्रीम की लेयर पतली रखें, आदि...', 'e.g. Less sugar, thin cream layer, etc...')}
              className="w-full px-4 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition-all placeholder:text-stone-400 resize-none"
            />
          </div>

          {/* 6. Celebration Add-ons Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-bold text-amber-950">
                <Gift className="w-4 h-4 text-amber-700" />
                <span>{t('6. जश्न के लिए ऐड-ऑन (Party Add-ons)', '6. Party Add-ons')}</span>
              </label>
              <span className="text-xs text-stone-400">
                {selectedAddOns.length} {t('चुने गए', 'Selected')}
              </span>
            </div>

            <div className="space-y-2">
              {ADD_ON_OPTIONS.map((addon) => {
                const isSelected = selectedAddOns.some((a) => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/70 shadow-xs'
                        : 'border-stone-200 hover:border-amber-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{addon.icon || '🎁'}</span>
                      <div>
                        <p className="font-semibold text-xs sm:text-sm text-stone-800">
                          {t(addon.name.hi, addon.name.en)}
                        </p>
                        <p className="text-[11px] text-amber-800 font-bold">
                          +₹{addon.price}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'bg-amber-700 border-amber-700 text-white'
                          : 'border-stone-300 text-transparent'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer with Price Calculation and Submit */}
        <div className="p-4 sm:p-5 border-t border-amber-100 bg-amber-50/80 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-stone-500 font-semibold block uppercase">
              {t('कुल कस्टमाइज़्ड मूल्य', 'Total Customized Price')}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-amber-950 font-sans">
                ₹{finalPrice}
              </span>
              <span className="text-xs text-stone-500">
                ({selectedWeight} kg)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCustomizingItem(null)}
              className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors"
            >
              {t('रद्द करें', 'Cancel')}
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white text-xs sm:text-sm font-bold shadow-lg shadow-amber-800/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('कार्ट में जोड़ें', 'Add to Cart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
