export type OrderStatus = 'DEMO_PENDING' | 'DEMO_PROCESSING' | 'DEMO_COMPLETED' | 'DEMO_CANCELLED';

export interface OrderItem {
  productId: string;
  productName: string;
  productSlug: string;
  planId?: string;
  planName?: string;
  price: number;
  quantity: number;
  mockupType?: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
  address?: string;
}

export interface DemoOrder {
  id: string; // e.g. "2HT-ORD-83921"
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  promoCode?: string;
  total: number;
  paymentMethod: 'demo_bank_transfer' | 'demo_vnpay_qr' | 'demo_corporate_invoice';
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  isDemoNoticeAcknowledged: boolean;
}
