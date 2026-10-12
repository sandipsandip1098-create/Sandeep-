import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  BakeryItem,
  CartItem,
  CategoryType,
  CustomizationDetails,
  Language,
  NotificationItem,
  Order,
  OrderStatus,
  ReviewItem
} from '../types/bakery';
import { INITIAL_NOTIFICATIONS, INITIAL_REVIEWS } from '../data/bakeryData';
import { sound } from '../utils/audio';

interface BakeryContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (hiText: string, enText: string) => string;
  
  // Catalog & Filter
  selectedCategory: CategoryType;
  setSelectedCategory: (cat: CategoryType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  vegOnly: boolean;
  setVegOnly: (v: boolean) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: BakeryItem, customization?: CustomizationDetails, quantity?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  
  // Customization
  customizingItem: BakeryItem | null;
  setCustomizingItem: (item: BakeryItem | null) => void;
  
  // Modals & Panels
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderTrackerOpen: boolean;
  setIsOrderTrackerOpen: (open: boolean) => void;
  isFeedbackOpen: boolean;
  setIsFeedbackOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isStaffManagerOpen: boolean;
  setIsStaffManagerOpen: (open: boolean) => void;

  // Active Order & History
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  ordersHistory: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'statusHistory'>) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  
  // Notifications
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  
  // Reviews
  reviews: ReviewItem[];
  addReview: (review: Omit<ReviewItem, 'id' | 'date'>) => void;
}

const BakeryContext = createContext<BakeryContextType | undefined>(undefined);

export const BakeryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('royal_bakery_lang') as Language) || 'hi';
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('royal_bakery_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals
  const [customizingItem, setCustomizingItem] = useState<BakeryItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isStaffManagerOpen, setIsStaffManagerOpen] = useState(false);

  // Orders
  const [ordersHistory, setOrdersHistory] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('royal_bakery_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem('royal_bakery_active_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('royal_bakery_notifs');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('royal_bakery_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('royal_bakery_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('royal_bakery_orders', JSON.stringify(ordersHistory));
  }, [ordersHistory]);

  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem('royal_bakery_active_order', JSON.stringify(activeOrder));
    } else {
      localStorage.removeItem('royal_bakery_active_order');
    }
  }, [activeOrder]);

  useEffect(() => {
    localStorage.setItem('royal_bakery_notifs', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('royal_bakery_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('royal_bakery_lang', lang);
  };

  const t = (hiText: string, enText: string) => {
    return language === 'hi' ? hiText : enText;
  };

  const addToCart = (item: BakeryItem, customization?: CustomizationDetails, quantity = 1) => {
    sound.playAdd();
    setCart((prev) => {
      // Calculate unit price including weight multiplier & add-ons
      let unitPrice = item.basePrice;
      if (customization) {
        if (customization.weightKg) {
          // base price is for 0.5kg
          unitPrice = Math.round((item.basePrice / 0.5) * customization.weightKg);
        }
        const addOnsPrice = (customization.selectedAddOns || []).reduce((acc, curr) => acc + curr.price, 0);
        unitPrice += addOnsPrice;
      }

      // Check if duplicate customizable item or normal item
      const itemKey = customization
        ? `${item.id}-${customization.weightKg}-${customization.flavor}-${customization.cakeMessage}-${(customization.selectedAddOns || []).map(a => a.id).sort().join('_')}`
        : item.id;

      const existingIndex = prev.findIndex((ci) => ci.cartItemId === itemKey);

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        next[existingIndex].itemTotal = next[existingIndex].quantity * unitPrice;
        return next;
      } else {
        return [
          ...prev,
          {
            cartItemId: itemKey,
            item,
            quantity,
            customization,
            itemTotal: quantity * unitPrice
          }
        ];
      }
    });
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.cartItemId === cartItemId) {
            const newQty = ci.quantity + delta;
            if (newQty <= 0) return null;
            const singleUnitPrice = ci.itemTotal / ci.quantity;
            return {
              ...ci,
              quantity: newQty,
              itemTotal: Math.round(newQty * singleUnitPrice)
            };
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartSubtotal = cart.reduce((acc, curr) => acc + curr.itemTotal, 0);

  const placeOrder = (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'statusHistory'>
  ): Order => {
    const orderId = `RB-${Date.now().toString().slice(-6)}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      orderNumber: `#${orderId}`,
      createdAt: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }) + ', आज',
      status: 'placed',
      statusHistory: [
        {
          status: 'placed',
          timestamp: 'अभी-अभी (Just now)'
        }
      ],
      riderDetails: {
        name: 'विक्रम राठौर (Vikram)',
        phone: '+91 98765 43210',
        vehicleNumber: 'DL 04 BE 4892',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      estimatedDeliveryMinutes: orderData.orderType === 'takeaway' ? 20 : 45
    };

    setActiveOrder(newOrder);
    setOrdersHistory((prev) => [newOrder, ...prev]);
    clearCart();
    sound.playOrderSuccess();

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    // Add push notification for placed order
    const orderNotif: NotificationItem = {
      id: `notif-order-${Date.now()}`,
      title: {
        hi: `🎉 ऑर्डर कन्फर्म हुआ! (${newOrder.orderNumber})`,
        en: `🎉 Order Confirmed! (${newOrder.orderNumber})`
      },
      message: {
        hi: `आपका बेकरी ऑर्डर सफलतापूर्वक स्वीकार किया गया है। बेकर शेफ जल्द ही बेकिंग शुरू करेंगे।`,
        en: `Your order has been received. Our bakers are preparing your items fresh!`
      },
      date: 'अभी-अभी',
      type: 'order',
      isRead: false
    };

    setNotifications((prev) => [orderNotif, ...prev]);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const timestamp = new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' });
    sound.playStepDing();

    const statusNames: Record<OrderStatus, { hi: string; en: string }> = {
      placed: { hi: 'ऑर्डर स्वीकार हुआ', en: 'Order Accepted' },
      baking: { hi: 'ओवन में बेकिंग शुरू 👨‍🍳', en: 'Baking in Progress 👨‍🍳' },
      quality_check: { hi: 'गुणवत्ता जांच व गिफ्ट बॉक्सिंग 🎁', en: 'Quality Check & Boxed 🎁' },
      out_for_delivery: { hi: 'डिलीवरी के लिए निकला 🛵', en: 'Out for Delivery 🛵' },
      delivered: { hi: 'सफलतापूर्वक डिलीवर हुआ 🥳', en: 'Delivered Successfully 🥳' }
    };

    // Update active order if matches
    if (activeOrder && activeOrder.id === orderId) {
      const updatedOrder: Order = {
        ...activeOrder,
        status: newStatus,
        statusHistory: [
          ...activeOrder.statusHistory,
          {
            status: newStatus,
            timestamp: `${timestamp}`
          }
        ]
      };
      setActiveOrder(updatedOrder);

      // Trigger celebration if delivered
      if (newStatus === 'delivered') {
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.5 }
          });
        } catch {
          // ignore
        }
      }
    }

    // Also update in ordersHistory
    setOrdersHistory((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: newStatus,
            statusHistory: [
              ...ord.statusHistory,
              { status: newStatus, timestamp }
            ]
          };
        }
        return ord;
      })
    );

    // Push notification update
    const notifUpdate: NotificationItem = {
      id: `notif-stat-${Date.now()}`,
      title: {
        hi: `📦 ऑर्डर स्टेटस अपडेट: ${statusNames[newStatus].hi}`,
        en: `📦 Order Update: ${statusNames[newStatus].en}`
      },
      message: {
        hi: `ऑर्डर ${orderId} का स्टेटस अब "${statusNames[newStatus].hi}" है।`,
        en: `Order ${orderId} is now ${statusNames[newStatus].en}.`
      },
      date: 'अभी',
      type: 'order',
      isRead: false
    };

    setNotifications((prev) => [notifUpdate, ...prev]);
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const addReview = (newRev: Omit<ReviewItem, 'id' | 'date'>) => {
    const rev: ReviewItem = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'अभी-अभी'
    };
    setReviews((prev) => [rev, ...prev]);
    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch {
      // ignore
    }
  };

  return (
    <BakeryContext.Provider
      value={{
        language,
        setLanguage,
        t,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        vegOnly,
        setVegOnly,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        customizingItem,
        setCustomizingItem,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        isFeedbackOpen,
        setIsFeedbackOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isStaffManagerOpen,
        setIsStaffManagerOpen,
        activeOrder,
        setActiveOrder,
        ordersHistory,
        placeOrder,
        updateOrderStatus,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        reviews,
        addReview
      }}
    >
      {children}
    </BakeryContext.Provider>
  );
};

export const useBakery = () => {
  const context = useContext(BakeryContext);
  if (!context) {
    throw new Error('useBakery must be used within a BakeryProvider');
  }
  return context;
};
