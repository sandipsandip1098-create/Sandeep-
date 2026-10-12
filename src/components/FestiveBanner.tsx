import React, { useState } from 'react';
import { Sparkles, Gift, Tag, Check, ArrowRight, Wand2 } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { AVAILABLE_COUPONS } from '../data/bakeryData';

export const FestiveBanner: React.FC = () => {
  const { t, setSelectedCategory } = useBakery();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      {/* Hero Showcase Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 text-white shadow-xl">
        {/* Subtle decorative background circles */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-amber-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-700/60 text-amber-200 text-xs font-semibold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>{t('त्योहारी व बर्थडे स्पेशल ऑफर', 'Festive & Birthday Special Deals')}</span>
            </div>

            <h1 className="font-serif-bakery text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              {t('हर जश्न में घोलें मिठास,', 'Every Celebration Deserves')}
              <br />
              <span className="text-amber-300">
                {t('ताज़े बेक किए गए स्वाद के साथ!', 'Fresh Artisan Delights!')}
              </span>
            </h1>

            <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed">
              {t(
                'प्रीमियम केक, मुलायम पेस्ट्री, आर्टिसन ब्रेड और कुरकुरी कुकीज़। मनपसंद फ्लेवर, वज़न और केक पर नाम लिखवाने की विशेष सुविधा के साथ।',
                'Premium cakes, luscious pastries, artisan breads & gourmet cookies. Live customization with names, weights & flavors.'
              )}
            </p>

            {/* Quick action buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => setSelectedCategory('cakes')}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-sm shadow-md shadow-amber-400/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Wand2 className="w-4 h-4" />
                <span>{t('कस्टम केक डिज़ाइन करें', 'Design Custom Cake')}</span>
              </button>

              <button
                onClick={() => {
                  const menuEl = document.getElementById('digital-menu');
                  menuEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 flex items-center gap-2 transition-colors"
              >
                <span>{t('डिजिटल मेनू देखें', 'Explore Digital Menu')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Featured Offer Pill Card */}
          <div className="w-full md:w-auto flex flex-col gap-3">
            <div className="bg-amber-950/70 border border-amber-600/40 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-lg max-w-sm mx-auto md:mx-0">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Gift className="w-4 h-4 text-amber-400" />
                <span>{t('सीमित समय का डिस्काउंट कूपन', 'Limited Time Discount')}</span>
              </div>

              <div className="space-y-2.5">
                {AVAILABLE_COUPONS.slice(0, 2).map((coupon) => (
                  <div
                    key={coupon.code}
                    className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 hover:border-amber-400/50 rounded-xl p-2.5 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-mono font-bold text-amber-200 text-sm tracking-wide">
                          {coupon.code}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-300">
                        {t(coupon.description.hi, coupon.description.en)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                        copiedCode === coupon.code
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {copiedCode === coupon.code ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>{t('कॉपी हुआ', 'Copied')}</span>
                        </>
                      ) : (
                        <span>{t('कूपन कॉपी', 'Copy')}</span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
