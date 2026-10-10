import { DemoOrder } from '../types/order';

export const initialOrders: DemoOrder[] = [
  {
    id: '2HT-ORD-1092',
    customer: {
      fullName: 'Nguyễn Văn Thịnh',
      email: 'thinh.nguyen@saigonretail.demo.vn',
      phone: '0908 123 456',
      company: 'Công ty Cổ phần Sài Gòn Retail',
      notes: 'Yêu cầu hỗ trợ demo kết nối thử nghiệm sàn Shopee',
      address: 'Quận 1, TP. Hồ Chí Minh'
    },
    items: [
      {
        productId: 'prod-ecommerce-01',
        productName: '2HT E-Commerce (Gói Doanh Nghiệp)',
        productSlug: '2ht-ecommerce',
        planId: 'ecom-pro',
        planName: 'Gói Doanh Nghiệp',
        price: 32000000,
        quantity: 1,
        mockupType: 'ecommerce'
      }
    ],
    subtotal: 32000000,
    discount: 3200000,
    promoCode: 'TECH2026',
    total: 28800000,
    paymentMethod: 'demo_bank_transfer',
    status: 'DEMO_PROCESSING',
    createdAt: '2026-03-28T09:30:00Z',
    updatedAt: '2026-03-28T10:00:00Z',
    isDemoNoticeAcknowledged: true
  },
  {
    id: '2HT-ORD-1091',
    customer: {
      fullName: 'Phạm Thu Hương',
      email: 'huong.pt@greenresidence.demo.vn',
      phone: '0912 345 678',
      company: 'Ban Quản Trị Tòa Nhà Green Tower',
      notes: 'Cần tích hợp gửi thông báo phí qua Zalo ZNS',
      address: 'Cầu Giấy, Hà Nội'
    },
    items: [
      {
        productId: 'prod-residence-02',
        productName: '2HT Residence (Gói Tòa Nhà Đơn)',
        productSlug: '2ht-residence',
        planId: 'res-standard',
        planName: 'Gói Tòa Nhà Đơn',
        price: 28000000,
        quantity: 1,
        mockupType: 'residence'
      }
    ],
    subtotal: 28000000,
    discount: 0,
    total: 28000000,
    paymentMethod: 'demo_vnpay_qr',
    status: 'DEMO_COMPLETED',
    createdAt: '2026-03-27T14:15:00Z',
    updatedAt: '2026-03-27T16:00:00Z',
    isDemoNoticeAcknowledged: true
  },
  {
    id: '2HT-ORD-1090',
    customer: {
      fullName: 'Lê Minh Tuấn',
      email: 'tuan.le@vietlogistics.demo.vn',
      phone: '0988 777 999',
      company: 'Việt Logistics Corp',
      notes: 'Triển khai cho 80 nhân sự khối văn phòng',
      address: 'Hải An, Hải Phòng'
    },
    items: [
      {
        productId: 'prod-hrm-05',
        productName: '2HT HRM (Gói Tiêu Chuẩn)',
        productSlug: '2ht-hrm',
        planId: 'hrm-pro',
        planName: 'Gói Tiêu Chuẩn',
        price: 22000000,
        quantity: 1,
        mockupType: 'hrm'
      }
    ],
    subtotal: 22000000,
    discount: 2200000,
    promoCode: 'TECH2026',
    total: 19800000,
    paymentMethod: 'demo_corporate_invoice',
    status: 'DEMO_PENDING',
    createdAt: '2026-03-29T11:45:00Z',
    updatedAt: '2026-03-29T11:45:00Z',
    isDemoNoticeAcknowledged: true
  }
];
