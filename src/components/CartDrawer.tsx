import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  Truck,
  Store,
  Sparkles,
  Check,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { OrderType } from '../types/bakery';
import { AVAILABLE_COUPONS } from '../data/bakeryData';

interface CartDrawerProps {
  onProceedToCheckout: (appliedCouponData?: { code: string; discountAmount: number }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    t
  } = useBakery();

  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  // Delivery fee logic: Free for takeaway, free for orders above ₹499, otherwise ₹40
  const deliveryFee = orderType === 'takeaway' || cartSubtotal >= 499 ? 0 : 40;
  const gst = Math.round(cartSubtotal * 0.05);

  // Calculate discount if coupon applied
  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount = appliedCoupon.discountAmount;
  }

  const grandTotal = Math.max(0, cartSubtotal + gst + deliveryFee - discountAmount);

  const applyCoupon = (codeToApply: string) => {
    const cleanedCode = codeToApply.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === cleanedCode);

    if (!found) {
      setCouponError(t('अमान्य कूपन कोड। कृपया सही कोड दर्ज करें।', 'Invalid promo code. Please enter a valid coupon.'));
      return;
    }

    if (cartSubtotal < found.minOrderAmount) {
      setCouponError(
        t(
          `यह कूपन न्यूनतम ₹${found.minOrderAmount} के ऑर्डर पर ही मान्य है।`,
          `This coupon requires a minimum order of ₹${found.minOrderAmount}.`
        )
      );
      return;
    }

    let calculatedDiscount = 0;
    if (found.discountPercentage) {
      calculatedDiscount = Math.round((cartSubtotal * found.discountPercentage) / 100);
      if (found.maxDiscount && calculatedDiscount > found.maxDiscount) {
        calculatedDiscount = found.maxDiscount;
      }
    } else if (found.flatDiscount) {
      calculatedDiscount = found.flatDiscount;
    }

    setAppliedCoupon({
      code: found.code,
      discountAmount: calculatedDiscount
    });
    setCouponError(null);
    setCouponCode('');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    onProceedToCheckout(appliedCoupon || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-amber-100 flex items-center justify-between bg-amber-50/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-700 text-white shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-bakery font-bold text-lg text-amber-950">
                {t('आपकी कार्ट', 'Your Bakery Cart')}
              </h2>
              <p className="text-xs text-stone-500">
                {cartCount} {t('स्वादिष्ट आइटम', 'delicious items')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartCount > 0 && (
              <button
                onClick={clearCart}
                className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors"
                title={t('पूरी कार्ट खाली करें', 'Clear cart')}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <ShoppingBag className="w-10 h-10 opacity-70" />
            </div>
            <div>
              <h3 className="font-serif-bakery font-bold text-lg text-amber-950">
                {t('आपकी कार्ट अभी खाली है!', 'Your cart is empty!')}
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mt-1">
                {t(
                  'हमारे स्वादिष्ट डिजिटल मेनू से ताज़े केक, पेस्ट्री या कुकीज़ चुनें और मिठास का आनंद लें।',
                  'Pick fresh cakes, warm pastries or artisan cookies from our digital menu.'
                )}
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs shadow-md shadow-amber-800/20"
            >
              {t('मेनू देखें', 'Explore Menu')}
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable Cart Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {/* Delivery vs Takeaway Switcher */}
              <div className="bg-amber-50/70 p-1.5 rounded-2xl border border-amber-200 flex gap-1">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                    orderType === 'delivery'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-amber-950 hover:bg-white/60'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>{t('होम डिलीवरी (45 मि)', 'Home Delivery (45m)')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                    orderType === 'takeaway'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-amber-950 hover:bg-white/60'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>{t('टेक-अवे पिकअप (20 मि)', 'Takeaway / Pickup (20m)')}</span>
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cart.map((ci) => {
                  return (
                    <div
                      key={ci.cartItemId}
                      className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 flex gap-3 hover:border-amber-300 transition-colors"
                    >
                      <img
                        src={ci.item.image}
                        alt={ci.item.name.hi}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-semibold text-xs sm:text-sm text-amber-950 truncate">
                              {t(ci.item.name.hi, ci.item.name.en)}
                            </h4>
                            <button
                              onClick={() => removeFromCart(ci.cartItemId)}
                              className="text-stone-400 hover:text-rose-600 p-0.5"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Customization Details Badges */}
                          {ci.customization && (
                            <div className="mt-1 space-y-0.5 text-[11px] text-stone-600">
                              <div className="flex flex-wrap gap-1 items-center">
                                <span className="bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-medium">
                                  {ci.customization.weightKg} kg
                                </span>
                                <span className="bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-medium">
                                  {ci.customization.flavor}
                                </span>
                                <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">
                                  {ci.customization.isEggless ? t('एगलेस', 'Eggless') : t('एग सहित', 'With Egg')}
                                </span>
                              </div>

                              {ci.customization.cakeMessage && (
                                <p className="text-[11px] text-amber-900 font-semibold italic truncate">
                                  ✍️ &quot;{ci.customization.cakeMessage}&quot;
                                </p>
                              )}

                              {ci.customization.selectedAddOns?.length > 0 && (
                                <p className="text-[10px] text-stone-500">
                                  + {ci.customization.selectedAddOns.map((a) => t(a.name.hi, a.name.en)).join(', ')}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between pt-2 mt-1 border-t border-stone-200/50">
                          <div className="flex items-center bg-white border border-stone-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(ci.cartItemId, -1)}
                              className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-amber-950">
                              {ci.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(ci.cartItemId, 1)}
                              className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-bold text-sm text-amber-950">
                            ₹{ci.itemTotal}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon Section */}
              <div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                  <Tag className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t('डिस्काउंट कूपन कोड', 'Promo Coupon Code')}</span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 p-2.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-mono font-bold text-xs text-emerald-900">
                          {appliedCoupon.code}
                        </span>
                        <p className="text-[10px] text-emerald-700">
                          {t(`₹${appliedCoupon.discountAmount} की बचत हुई!`, `Saved ₹${appliedCoupon.discountAmount}!`)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
                    >
                      {t('हटाएं', 'Remove')}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder={t('उदा. FESTIVE20', 'e.g. FESTIVE20')}
                      className="flex-1 px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs uppercase font-mono tracking-wider focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      onClick={() => applyCoupon(couponCode)}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      {t('लागू करें', 'Apply')}
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-[11px] text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{couponError}</span>
                  </p>
                )}

                {/* Quick available coupon chips */}
                {!appliedCoupon && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {AVAILABLE_COUPONS.map((cpn) => (
                      <button
                        key={cpn.code}
                        onClick={() => applyCoupon(cpn.code)}
                        className="text-[10px] bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 px-2 py-1 rounded-md font-mono font-semibold transition-colors"
                      >
                        🏷️ {cpn.code}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Bill Breakdown */}
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>{t('आइटम सबटोटल', 'Items Subtotal')}</span>
                  <span className="font-semibold text-stone-900">₹{cartSubtotal}</span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>{t('जीएसटी (5% टैक्स)', 'GST (5% Tax)')}</span>
                  <span className="font-semibold text-stone-900">₹{gst}</span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>
                    {orderType === 'delivery'
                      ? t('डिलीवरी शुल्क (होम डिलीवरी)', 'Delivery Fee')
                      : t('टेक-अवे शुल्क', 'Takeaway Fee')}
                  </span>
                  <span className="font-semibold text-stone-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase">{t('निःशुल्क (FREE)', 'FREE')}</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>{t('कूपन डिस्काउंट', 'Coupon Discount')}</span>
                    <span className="font-bold">-₹{discountAmount}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-sm font-bold text-amber-950">
                  <span>{t('कुल देय राशि', 'Grand Total')}</span>
                  <span className="text-lg font-black font-sans">₹{grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Bottom Checkout Button */}
            <div className="p-4 border-t border-amber-100 bg-white">
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold text-sm shadow-xl shadow-amber-800/20 flex items-center justify-between transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <div className="text-left">
                  <span className="text-[10px] text-amber-200 uppercase block font-medium">
                    {orderType === 'delivery' ? t('होम डिलीवरी', 'Home Delivery') : t('टेक-अवे पिकअप', 'Takeaway')}
                  </span>
                  <span className="text-base font-extrabold font-sans">₹{grandTotal}</span>
                </div>

                <div className="flex items-center gap-1.5 text-amber-100">
                  <span>{t('चेकआउट करें', 'Proceed to Pay')}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
