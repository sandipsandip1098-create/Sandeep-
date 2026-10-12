import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Phone,
  User,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Building2,
  AlertCircle,
  Truck,
  Store,
  Sparkles
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { OrderType, PaymentMethod, CustomerDetails } from '../types/bakery';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderType?: OrderType;
  appliedCoupon?: { code: string; discountAmount: number };
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  initialOrderType = 'delivery',
  appliedCoupon
}) => {
  const { cart, cartSubtotal, placeOrder, setIsOrderTrackerOpen, t } = useBakery();

  const [step, setStep] = useState<1 | 2>(1); // 1: Address/Details, 2: Payment
  const [orderType, setOrderType] = useState<OrderType>(initialOrderType);

  // Customer & Delivery Details
  const [name, setName] = useState('रोहित शर्मा');
  const [phone, setPhone] = useState('9876543210');
  const [address, setAddress] = useState('फ्लैट 402, शांति अपार्टमेंट्स, सेक्टर 14');
  const [landmark, setLandmark] = useState('सिटी मॉल के पास');
  const [pincode, setPincode] = useState('110001');
  const [deliverySlot, setDeliverySlot] = useState('अभी तुरंत (40-50 मिनट में)');

  // Payment Options
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [cardNumber, setCardNumber] = useState('4532 8901 2345 6789');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('789');
  const [cardHolder, setCardHolder] = useState('Rohit Sharma');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const deliveryFee = orderType === 'takeaway' || cartSubtotal >= 499 ? 0 : 40;
  const gst = Math.round(cartSubtotal * 0.05);
  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const grandTotal = Math.max(0, cartSubtotal + gst + deliveryFee - discount);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      return;
    }
    setStep(2);
  };

  const handleFinalPayment = () => {
    setIsProcessing(true);

    // Simulate safe fast bank authorization (1.2 seconds)
    setTimeout(() => {
      const customerDetails: CustomerDetails = {
        name,
        phone,
        address: orderType === 'delivery' ? address : 'बेकरी काउंटर (Takeaway Counter)',
        landmark: orderType === 'delivery' ? landmark : undefined,
        pincode: orderType === 'delivery' ? pincode : undefined,
        deliverySlot
      };

      placeOrder({
        items: cart,
        orderType,
        customerDetails,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        appliedCoupon,
        subtotal: cartSubtotal,
        taxes: gst,
        deliveryFee,
        total: grandTotal,
        estimatedDeliveryMinutes: orderType === 'takeaway' ? 20 : 45
      });

      setIsProcessing(false);
      onClose();
      setIsOrderTrackerOpen(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-amber-200 max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 bg-amber-50/70">
          <div>
            <h2 className="font-serif-bakery font-bold text-xl text-amber-950">
              {step === 1
                ? t('डिलीवरी व संपर्क विवरण', 'Delivery & Contact Details')
                : t('सुरक्षित ऑनलाइन भुगतान', 'Secure Online Payment')}
            </h2>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-500">
              <span className={`font-semibold ${step === 1 ? 'text-amber-800' : 'text-emerald-700'}`}>
                1. {t('विवरण', 'Details')}
              </span>
              <span>→</span>
              <span className={`font-semibold ${step === 2 ? 'text-amber-800' : 'text-stone-400'}`}>
                2. {t('भुगतान (₹' + grandTotal + ')', 'Payment (₹' + grandTotal + ')')}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200/60 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1">
          {step === 1 ? (
            <form onSubmit={handleStep1Submit} className="space-y-5">
              {/* Delivery vs Takeaway Switcher */}
              <div className="bg-amber-50/60 p-1.5 rounded-2xl border border-amber-200 flex gap-1">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    orderType === 'delivery'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-amber-950'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>{t('होम डिलीवरी (Home Delivery)', 'Home Delivery')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    orderType === 'takeaway'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-amber-950'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>{t('टेक-अवे पिकअप (Takeaway Pickup)', 'Takeaway Pickup')}</span>
                </button>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-700" />
                    <span>{t('ग्राहक का नाम', 'Full Name')} *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('अपना नाम लिखें', 'Your Name')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/40 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-700" />
                    <span>{t('मोबाइल नंबर (OTP व अपडेट के लिए)', 'Phone Number')} *</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-stone-200 bg-stone-100 text-stone-600 text-xs font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2.5 rounded-r-xl border border-stone-200 bg-stone-50/40 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Address (Only for Home Delivery) */}
              {orderType === 'delivery' ? (
                <div className="space-y-3 p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                    <MapPin className="w-4 h-4 text-amber-700" />
                    <span>{t('डिलीवरी का पता (Delivery Address)', 'Delivery Address')}</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 block">
                      {t('मकान/फ्लैट सं., अपार्टमेंट व कॉलोनी', 'House / Flat No., Apartment')} *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t('पूरा पता दर्ज करें...', 'Full delivery address...')}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700 block">
                        {t('लैंडमार्क (पहचान)', 'Nearby Landmark')}
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder={t('उदा. मंदिर या स्कूल के पास', 'e.g. Near City Mall')}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700 block">
                        {t('पिनकोड (Pincode)', 'Pincode')}
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="110001"
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-700 text-white shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div className="text-xs space-y-1">
                    <h4 className="font-bold text-amber-950">
                      {t('संदीप बेकरी मुख्य शाखा से पिकअप', 'Pickup from Sandeep Bakery Main Branch')}
                    </h4>
                    <p className="text-stone-600">
                      {t(
                        'दुकान नं. 4-5, मेन मार्केट, बेकरी लेन, सिविल लाइन्स। हेल्पलाइन: +91 85559 24408। ऑर्डर 20 मिनट में काउंटर पर तैयार रहेगा।',
                        'Shop 4-5, Main Market, Bakery Lane. Helpline: +91 85559 24408. Ready in 20 minutes.'
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* Delivery Time Slot */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t('समय स्लॉट चुनें (Delivery / Pickup Time Slot)', 'Select Time Slot')}</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    t('अभी तुरंत (40-50 मिनट में)', 'Right Now (40-50 min)'),
                    t('आज शाम 6:00 - 8:00 बजे', 'Today 6:00 - 8:00 PM'),
                    t('कल सुबह 10:00 - 12:00 बजे', 'Tomorrow 10:00 AM - 12:00 PM')
                  ].map((slot) => {
                    const isSelected = deliverySlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setDeliverySlot(slot)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                          isSelected
                            ? 'border-amber-700 bg-amber-100 text-amber-950'
                            : 'border-stone-200 bg-white text-stone-600 hover:bg-amber-50'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 1 Next Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-lg shadow-amber-800/20 flex items-center justify-center gap-2 transition-transform active:scale-98"
                >
                  <span>{t('भुगतान के लिए आगे बढ़ें (Pay ₹' + grandTotal + ')', 'Proceed to Payment (₹' + grandTotal + ')')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* STEP 2: PAYMENT METHODS */
            <div className="space-y-6">
              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-amber-700 bg-amber-50 text-amber-950 font-bold shadow-xs'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-amber-700" />
                  <span className="text-xs">UPI (GPay/PhonePe)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-amber-700 bg-amber-50 text-amber-950 font-bold shadow-xs'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-700" />
                  <span className="text-xs">{t('कार्ड (Debit/Credit)', 'Card')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-amber-700 bg-amber-50 text-amber-950 font-bold shadow-xs'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-amber-700" />
                  <span className="text-xs">
                    {orderType === 'delivery' ? t('कैश ऑन डिलीवरी', 'Cash on Deliv.') : t('काउंटर पर नकद', 'Pay Counter')}
                  </span>
                </button>
              </div>

              {/* UPI Tab Content */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4 p-5 rounded-2xl bg-amber-50/40 border border-amber-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                      {t('पसंदीदा UPI ऐप चुनें या QR स्कैन करें', 'Choose UPI App or Scan QR')}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {t('100% सुरक्षित NPCI UPI', '100% Secure NPCI')}
                    </span>
                  </div>

                  {/* UPI Apps Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'gpay', name: 'Google Pay', icon: '🟢', bg: 'bg-white' },
                      { id: 'phonepe', name: 'PhonePe', icon: '🟣', bg: 'bg-white' },
                      { id: 'paytm', name: 'Paytm', icon: '🔵', bg: 'bg-white' },
                      { id: 'qr', name: 'QR Code', icon: '📷', bg: 'bg-white' }
                    ].map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => setUpiApp(app.id as any)}
                        className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all ${
                          upiApp === app.id
                            ? 'border-amber-700 bg-amber-100 text-amber-950 shadow-xs'
                            : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <span>{app.icon}</span>
                        <span>{app.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Live Simulated UPI QR Box */}
                  <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className="w-28 h-28 bg-stone-900 rounded-xl p-2 shrink-0 flex items-center justify-center shadow-inner">
                      {/* Realistic SVG representation of stylized payment QR code */}
                      <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm-4-2h2v4h-2v-4zm4 4h4v4h-4v-4zm-4 2h2v2h-2v-2zm-2-4h2v2h-2v-2zm-2 2h2v4h-2v-4z" />
                      </svg>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-bold text-stone-900 block">
                        {t('स्कैन & पे: संदीप बेकरी आधिकारिक UPI', 'Scan & Pay: Sandeep Bakery UPI')}
                      </span>
                      <p className="text-[11px] text-stone-500 font-mono">
                        UPI ID: sandeepbakery@okhdfcbank
                      </p>
                      <p className="text-xs font-extrabold text-amber-900">
                        {t('भुगतान राशि:', 'Pay Amount:')} ₹{grandTotal}
                      </p>
                      <p className="text-[10px] text-stone-400">
                        {t('अपने फोन से किसी भी UPI ऐप से स्कैन करें', 'Scan using any UPI app on your device')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Tab Content */}
              {paymentMethod === 'card' && (
                <div className="space-y-3.5 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-800 block">
                      {t('कार्ड नंबर (Card Number)', 'Card Number')}
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 0000 0000 0000"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono text-sm bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-800 block">
                        {t('समाप्ति तिथि (MM/YY)', 'Expiry (MM/YY)')}
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono text-sm bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-800 block">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-800 block">
                      {t('कार्डधारक का नाम', 'Cardholder Name')}
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Rohit Sharma"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm bg-white"
                    />
                  </div>
                </div>
              )}

              {/* COD Tab Content */}
              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-950">
                    <Banknote className="w-4 h-4 text-amber-700" />
                    <span>
                      {orderType === 'delivery'
                        ? t('डिलीवरी के समय नकद भुगतान (COD)', 'Cash on Delivery (COD)')
                        : t('बेकरी काउंटर पर पिकअप के समय भुगतान', 'Pay at Bakery Counter')}
                    </span>
                  </div>
                  <p className="text-stone-600">
                    {orderType === 'delivery'
                      ? t(
                          'डिलीवरी राइडर के पास खुला कैश या डिलीवरी के वक्त UPI से पे करने का विकल्प उपलब्ध रहेगा।',
                          'Pay with cash or scan delivery rider QR code at your doorstep.'
                        )
                      : t(
                          'काउंटर पर कैश, कार्ड या UPI द्वारा भुगतान कर अपना ताज़ा पैक किया हुआ ऑर्डर प्राप्त करें।',
                          'Pay conveniently at the bakery counter during pickup.'
                        )}
                  </p>
                </div>
              )}

              {/* Back to Step 1 & Pay Now Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-2xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold transition-colors"
                >
                  {t('← पीछे जाएं', '← Back')}
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleFinalPayment}
                  className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-extrabold text-sm shadow-xl shadow-emerald-700/25 flex items-center justify-center gap-2 transition-transform active:scale-98 disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('पेमेंट प्रोसेस हो रहा है...', 'Processing Payment...')}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>
                        {paymentMethod === 'cod'
                          ? t('ऑर्डर कन्फर्म करें (₹' + grandTotal + ')', 'Confirm Order (₹' + grandTotal + ')')
                          : t('पे करें और ऑर्डर कन्फर्म करें (₹' + grandTotal + ')', 'Pay & Confirm Order (₹' + grandTotal + ')')}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
