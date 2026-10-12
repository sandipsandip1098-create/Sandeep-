import React from 'react';
import {
  X,
  Bell,
  Sparkles,
  Gift,
  Check,
  Tag,
  Clock,
  Send,
  CheckCheck
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';

export const NotificationsModal: React.FC = () => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    t
  } = useBakery();

  if (!isNotificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-amber-200 max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 bg-amber-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-700 text-white shadow-xs">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-bakery font-bold text-lg text-amber-950">
                {t('नोटिफिकेशन्स व फेस्टिव ऑफर्स', 'Notifications & Festive Offers')}
              </h2>
              <p className="text-xs text-stone-500">
                {t('नए डिस्काउंट्स व फ्रेश बेक अलर्ट्स', 'Special discounts and fresh bake alerts')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsAsRead}
              className="text-xs text-amber-800 hover:text-amber-950 font-semibold p-1 hover:bg-amber-100 rounded-md transition-colors"
              title={t('सभी को पढ़ा हुआ मार्क करें', 'Mark all as read')}
            >
              <CheckCheck className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1.5 rounded-full hover:bg-stone-200/60 text-stone-500 hover:text-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of Notifications */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-3 flex-1">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <Bell className="w-10 h-10 mx-auto text-stone-300 mb-2" />
              <p className="text-sm font-medium">
                {t('कोई नई सूचना नहीं है', 'No new notifications')}
              </p>
            </div>
          ) : (
            notifications.map((notif) => {
              const isFestive = notif.type === 'festive';
              const isOffer = notif.type === 'offer';

              return (
                <div
                  key={notif.id}
                  onClick={() => markNotificationAsRead(notif.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    !notif.isRead
                      ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                      : 'bg-white border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4
                          className={`text-xs sm:text-sm font-bold ${
                            !notif.isRead ? 'text-amber-950' : 'text-stone-700'
                          }`}
                        >
                          {t(notif.title.hi, notif.title.en)}
                        </h4>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                        )}
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed">
                        {t(notif.message.hi, notif.message.en)}
                      </p>
                    </div>

                    <span className="text-[10px] text-stone-400 shrink-0 whitespace-nowrap">
                      {notif.date}
                    </span>
                  </div>

                  {/* Promo coupon if attached */}
                  {notif.couponCode && (
                    <div className="mt-2.5 pt-2 border-t border-amber-200/50 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                        <Tag className="w-3 h-3 text-amber-700" />
                        <span>{notif.couponCode}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard?.writeText(notif.couponCode!);
                        }}
                        className="text-[11px] text-amber-800 hover:text-amber-950 font-semibold"
                      >
                        {t('कूपन कॉपी करें', 'Copy Code')}
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-100 bg-amber-50/50 flex items-center justify-between text-xs text-stone-500">
          <span>
            🔔 {t('पुश अलर्ट्स सक्रिय हैं', 'Push alerts active')}
          </span>
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold transition-colors"
          >
            {t('ठीक है', 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
};
