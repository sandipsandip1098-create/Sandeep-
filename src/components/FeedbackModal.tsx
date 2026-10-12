import React, { useState } from 'react';
import {
  X,
  Star,
  Sparkles,
  MessageSquare,
  Check,
  Send,
  Heart,
  ThumbsUp
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';

export const FeedbackModal: React.FC = () => {
  const { isFeedbackOpen, setIsFeedbackOpen, addReview, activeOrder, t } = useBakery();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState(
    activeOrder?.customerDetails?.name || 'अंजली मेहता'
  );
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'बेहतरीन स्वाद 🍰',
    'सटीक कस्टमाइज़ेशन ✍️'
  ]);
  const [submitted, setSubmitted] = useState(false);

  if (!isFeedbackOpen) return null;

  const tagOptions = [
    'बेहतरीन स्वाद 🍰',
    'सटीक कस्टमाइज़ेशन ✍️',
    'समय पर डिलीवरी ⚡',
    'ताज़ा और स्पंजी 🤤',
    'शानदार पैकेजिंग 🎁',
    '100% शाकाहारी 🌱',
    'संतुष्ट ग्राहक 💖'
  ];

  const ratingDescriptions: Record<number, { hi: string; en: string }> = {
    5: { hi: 'लाजवाब व उत्कृष्ट! 🌟🌟🌟🌟🌟', en: 'Outstanding & Delicious! 🌟' },
    4: { hi: 'बहुत स्वादिष्ट व अच्छा 👍', en: 'Very Good & Fresh 👍' },
    3: { hi: 'संतोषजनक (अच्छा) 👌', en: 'Good & Satisfactory 👌' },
    2: { hi: 'ठीक-ठाक 😐', en: 'Average Experience 😐' },
    1: { hi: 'सुधार की आवश्यकता 👎', en: 'Needs Improvement 👎' }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview({
      customerName: customerName.trim() || 'शुभचिंतक ग्राहक',
      rating,
      comment: comment.trim(),
      tags: selectedTags,
      itemName: activeOrder?.items[0]?.item.name.hi || 'बेल्जियन चॉकलेट ट्रफल केक',
      verifiedBuyer: true
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsFeedbackOpen(false);
      setComment('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-amber-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 bg-amber-50/70">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-700 text-white shadow-xs">
              <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
            </span>
            <div>
              <h2 className="font-serif-bakery font-bold text-lg text-amber-950">
                {t('फीडबैक व रेटिंग साझा करें', 'Customer Feedback & Rating')}
              </h2>
              <p className="text-xs text-stone-500">
                {t('आपका अनुभव हमारे लिए बहुत कीमती है', 'Your experience shapes our craftsmanship')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFeedbackOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-200/60 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 fill-emerald-600" />
            </div>
            <h3 className="font-serif-bakery font-bold text-xl text-stone-900">
              {t('फीडबैक के लिए बहुत-बहुत धन्यवाद!', 'Thank You for Your Feedback!')}
            </h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              {t(
                'आपकी समीक्षा हमारी वेबसाइट पर जोड़ दी गई है। संदीप बेकरी परिवार की तरफ से हार्दिक शुभकामनाएं!',
                'Your verified review has been published. Happy celebrations from Sandeep Bakery!'
              )}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {/* Star Rating Selector */}
            <div className="text-center space-y-2 py-2 bg-amber-50/50 rounded-2xl border border-amber-200/60 p-4">
              <label className="text-xs font-bold text-amber-950 block">
                {t('अपना रेटिंग स्कोर चुनें', 'Choose your rating')}
              </label>

              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const currentDisplay = hoverRating || rating;
                  const isFilled = star <= currentDisplay;

                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-hidden"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          isFilled
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <p className="text-xs font-bold text-amber-900 font-serif-bakery">
                {t(ratingDescriptions[rating].hi, ratingDescriptions[rating].en)}
              </p>
            </div>

            {/* Customer Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-800 block">
                {t('आपका नाम', 'Your Name')}
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={t('उदा. अमित शर्मा', 'e.g. Amit Sharma')}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-stone-900 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            {/* Tags / Compliments */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-800 block">
                {t('क्विक कॉम्प्लिमेंट्स (Compliments Tags)', 'Compliments')}
              </label>

              <div className="flex flex-wrap gap-1.5">
                {tagOptions.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        isSelected
                          ? 'border-amber-600 bg-amber-100 text-amber-950 font-bold'
                          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-800 block">
                {t('विस्तृत समीक्षा (Detailed Review)', 'Detailed Review')} *
              </label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t(
                  'केक का स्वाद, सॉफ्टनेस, डिलीवरी का अनुभव या कस्टमाइज़ेशन कैसा लगा...',
                  'Tell us about cake taste, sponge softness, delivery or customization...'
                )}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 resize-none placeholder:text-stone-400"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-800/20 flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>{t('फीडबैक सबमिट करें', 'Submit Feedback')}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
