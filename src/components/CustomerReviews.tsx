import React from 'react';
import {
  Star,
  Quote,
  CheckCircle,
  MessageSquarePlus,
  Heart,
  Sparkles
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';

export const CustomerReviews: React.FC = () => {
  const { reviews, setIsFeedbackOpen, t } = useBakery();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header and Rating Overview */}
      <div className="bg-gradient-to-br from-amber-100/70 via-amber-50 to-orange-50/50 p-6 sm:p-8 rounded-3xl border border-amber-200/80 mb-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 text-amber-900 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{t('प्रमाणित ग्राहक समीक्षाएं', 'Verified Customer Testimonials')}</span>
            </div>

            <h2 className="font-serif-bakery text-2xl sm:text-3xl font-bold text-amber-950">
              {t('ग्राहकों का प्यार व अनुभव', 'Loved by Cake Lovers Across Town')}
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              {t(
                'हमारे प्रत्येक बेक्ड प्रोडक्ट में ताज़गी, शुद्धता और प्यार शामिल होता है। जानिए हमारे खुश ग्राहकों की राय।',
                'From birthdays to anniversary surprises, our customers cherish every fresh slice.'
              )}
            </p>
          </div>

          {/* Rating Summary Block & Write Review CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xl font-sans">
                4.9
              </div>
              <div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[11px] text-stone-500 font-medium">
                  {t('1,250+ 5-स्टार रेटिंग्स', '1,250+ 5-Star Reviews')}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="px-5 py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-900/15 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-300" />
              <span>{t('समीक्षा जोड़ें', 'Write Review')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white p-5 rounded-2xl border border-amber-100 hover:border-amber-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Stars & Date */}
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-stone-400 font-medium">{rev.date}</span>
              </div>

              {/* Review Text */}
              <p className="text-xs text-stone-700 leading-relaxed italic">
                &quot;{rev.comment}&quot;
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {rev.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-md font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author info */}
            <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-amber-950">{rev.customerName}</h4>
                {rev.itemName && (
                  <p className="text-[10px] text-stone-400 truncate max-w-[150px]">
                    {rev.itemName}
                  </p>
                )}
              </div>

              {rev.verifiedBuyer && (
                <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>{t('वेरीफाइड', 'Verified')}</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
