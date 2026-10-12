import React from 'react';
import {
  Star,
  Clock,
  Wand2,
  Plus,
  Check,
  Sparkles,
  Flame,
  Info
} from 'lucide-react';
import { BakeryItem } from '../types/bakery';
import { useBakery } from '../context/BakeryContext';

interface MenuCardProps {
  item: BakeryItem;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const {
    t,
    addToCart,
    setCustomizingItem,
    cart,
    updateQuantity
  } = useBakery();

  // Check if standard (non-customized) version of this item is already in cart
  const cartItem = cart.find((ci) => ci.item.id === item.id && !ci.customization);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-amber-100/90 shadow-xs hover:shadow-xl hover:border-amber-200 transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-amber-100/30">
        <img
          src={item.image}
          alt={t(item.name.hi, item.name.en)}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />

        {/* Gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          {/* Pure Veg Tag */}
          {item.isVeg && (
            <div className="bg-white/95 backdrop-blur-xs px-1.5 py-1 rounded-md shadow-xs flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-xs border-2 border-emerald-600 flex items-center justify-center p-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </div>
            </div>
          )}

          {item.isBestseller && (
            <span className="bg-amber-500/95 text-amber-950 font-bold text-[11px] px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1 backdrop-blur-xs">
              <Flame className="w-3 h-3 fill-amber-950" />
              <span>{t('बेस्टसेलर', 'Bestseller')}</span>
            </span>
          )}

          {item.isFestiveSpecial && (
            <span className="bg-rose-600 text-white font-bold text-[11px] px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{t('फेस्टिव स्पेशल', 'Festive')}</span>
            </span>
          )}
        </div>

        {/* Preparation Time */}
        <div className="absolute bottom-2.5 right-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>{item.preparationTimeMin} {t('मिनट', 'min')}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Rating & Review */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md border border-amber-200/60 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{item.rating}</span>
              <span className="text-stone-400 font-normal">({item.reviewsCount})</span>
            </div>

            {item.calories && (
              <span className="text-[11px] text-stone-500 font-medium">
                {item.calories}
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <h3 className="font-serif-bakery font-bold text-lg text-amber-950 line-clamp-1 group-hover:text-amber-700 transition-colors">
              {t(item.name.hi, item.name.en)}
            </h3>
            <p className="text-[11px] text-stone-500 font-medium">
              {t(item.name.en, item.name.hi)}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {t(item.description.hi, item.description.en)}
          </p>
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="pt-4 mt-3 border-t border-amber-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-stone-600 uppercase font-bold block">
              {item.isCustomizable ? t('शुरुआती मूल्य', 'Starts at') : t('मूल्य', 'Price')}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-amber-950 font-sans">
                ₹{item.basePrice}
              </span>
              {item.isCustomizable && (
                <span className="text-[11px] text-stone-500 font-normal">
                  / 0.5 kg
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          {item.isCustomizable ? (
            <button
              onClick={() => setCustomizingItem(item)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs shadow-md shadow-amber-800/15 hover:scale-105 active:scale-95 transition-all"
            >
              <Wand2 className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('कस्टमाइज़ करें', 'Customize')}</span>
            </button>
          ) : cartItem ? (
            <div className="flex items-center bg-amber-50 border border-amber-300 rounded-xl overflow-hidden">
              <button
                onClick={() => updateQuantity(cartItem.cartItemId, -1)}
                className="w-7 h-7 flex items-center justify-center font-bold text-amber-900 hover:bg-amber-200 transition-colors"
              >
                -
              </button>
              <span className="w-7 text-center font-bold text-xs text-amber-950">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                className="w-7 h-7 flex items-center justify-center font-bold text-amber-900 hover:bg-amber-200 transition-colors"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(item)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs border border-amber-300 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-amber-800" />
              <span>{t('ऐड करें', 'Add')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
