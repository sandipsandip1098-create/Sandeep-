export type CategoryType = 'all' | 'cakes' | 'pastries' | 'breads' | 'cookies' | 'savouries' | 'cupcakes';

export type Language = 'hi' | 'en';

export interface BakeryItem {
  id: string;
  name: {
    hi: string;
    en: string;
  };
  description: {
    hi: string;
    en: string;
  };
  category: CategoryType;
  basePrice: number;
  image: string;
  rating: number;
  reviewsCount: number;
  isVeg: boolean;
  isBestseller?: boolean;
  isFestiveSpecial?: boolean;
  preparationTimeMin: number;
  calories?: string;
  availableWeights?: number[]; // in kg, e.g. [0.5, 1, 1.5, 2, 3]
  availableFlavors?: string[];
  isCustomizable: boolean;
}

export interface AddOnOption {
  id: string;
  name: {
    hi: string;
    en: string;
  };
  price: number;
  icon?: string;
}

export interface CustomizationDetails {
  weightKg: number;
  flavor: string;
  isEggless: boolean;
  cakeMessage: string;
  specialInstructions: string;
  selectedAddOns: AddOnOption[];
  photoReferenceUrl?: string;
}

export interface CartItem {
  cartItemId: string;
  item: BakeryItem;
  quantity: number;
  customization?: CustomizationDetails;
  itemTotal: number;
}

export type OrderType = 'delivery' | 'takeaway';

export type PaymentMethod = 'upi' | 'card' | 'cod' | 'netbanking';

export type OrderStatus = 'placed' | 'baking' | 'quality_check' | 'out_for_delivery' | 'delivered';

export interface OrderStatusStep {
  status: OrderStatus;
  title: {
    hi: string;
    en: string;
  };
  description: {
    hi: string;
    en: string;
  };
  timeEstimated: string;
  completedAt?: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address?: string;
  landmark?: string;
  pincode?: string;
  deliverySlot: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  orderType: OrderType;
  customerDetails: CustomerDetails;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  appliedCoupon?: {
    code: string;
    discountAmount: number;
  };
  subtotal: number;
  taxes: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
  }[];
  riderDetails?: {
    name: string;
    phone: string;
    vehicleNumber: string;
    photo: string;
  };
  estimatedDeliveryMinutes: number;
}

export interface ReviewItem {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  tags: string[];
  itemName?: string;
  verifiedBuyer: boolean;
}

export interface NotificationItem {
  id: string;
  title: {
    hi: string;
    en: string;
  };
  message: {
    hi: string;
    en: string;
  };
  date: string;
  couponCode?: string;
  type: 'offer' | 'festive' | 'alert' | 'order';
  isRead: boolean;
}
