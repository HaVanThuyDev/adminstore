import { Product } from '../types/product';

export const initialProducts: Product[] = [
  {
    id: 'prod-ecommerce-01',
    slug: '2ht-ecommerce',
    name: '2HT E-Commerce',
    tagline: 'Nền tảng thương mại điện tử đa kênh thế hệ mới',
    category: 'ecommerce',
    categoryName: 'Thương mại điện tử',
    description: 'Giải pháp thương mại điện tử trọn gói với hiệu năng vượt trội, quản lý đa kho, tích hợp cổng thanh toán và tối ưu tỷ lệ chuyển đổi cho doanh nghiệp bán lẻ.',
    longDescription: '2HT E-Commerce được xây dựng dựa trên kiến trúc microservices và headless commerce. Hệ thống cung cấp khả năng chịu tải hàng trăm nghìn phiên truy cập đồng thời, tích hợp đầy đủ công cụ quản lý bán hàng đa kênh, đồng bộ sàn thương mại điện tử (Shopee, Lazada, TikTok Shop), quản lý tồn kho thời gian thực và tự động hóa marketing.',
    techStack: ['React', 'Next.js', 'Spring Boot', 'MySQL', 'Redis', 'Docker'],
    basePrice: 15000000,
    featuredBadge: 'Sản phẩm tiêu biểu',
    badgeVariant: 'primary',
    hasLiveDemo: true,
    mockupType: 'ecommerce',
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      {
        title: 'Kiến trúc Headless Commerce',
        description: 'Tách biệt frontend trải nghiệm mượt mà và backend mạnh mẽ giúp tốc độ tải trang dưới 0.8s.',
        iconName: 'Zap'
      },
      {
        title: 'Đồng bộ đa sàn thương mại',
        description: 'Đồng bộ tự động sản phẩm, đơn hàng, tồn kho với Shopee, TikTok Shop, Lazada từ một màn hình duy nhất.',
        iconName: 'RefreshCw'
      },
      {
        title: 'Thanh toán & Vận chuyển tự động',
        description: 'Kết nối VNPay, MoMo, ZaloPay và các đơn vị giao hàng GHTK, GHN, Viettel Post.',
        iconName: 'CreditCard'
      },
      {
        title: 'Phân tích dữ liệu & AI gợi ý',
        description: 'Dashboard trực quan hóa hành vi khách hàng và cá nhân hóa trải nghiệm mua sắm.',
        iconName: 'BarChart3'
      }
    ],
    plans: [
      {
        id: 'ecom-starter',
        name: 'Gói Tiêu Chuẩn',
        price: 15000000,
        billingCycle: 'vĩnh viễn',
        description: 'Phù hợp cho cửa hàng và thương hiệu đang mở rộng quy mô kinh doanh online.',
        features: ['Web bán hàng chuẩn SEO', 'Quản lý tối đa 5,000 sản phẩm', 'Tích hợp 3 cổng thanh toán', 'Bảo hành kỹ thuật 12 tháng']
      },
      {
        id: 'ecom-pro',
        name: 'Gói Doanh Nghiệp',
        price: 32000000,
        billingCycle: 'vĩnh viễn',
        description: 'Dành cho chuỗi bán lẻ, quản lý đa kho và đồng bộ sàn thương mại điện tử chuyên sâu.',
        features: ['Đầy đủ tính năng gói Tiêu chuẩn', 'Không giới hạn sản phẩm & băng thông', 'Đồng bộ Shopee, TikTok Shop, Lazada', 'Quản lý đa chi nhánh & đa kho', 'Hỗ trợ kỹ thuật 24/7'],
        isPopular: true
      }
    ],
    faqs: [
      {
        question: '2HT E-Commerce có hỗ trợ chuyển đổi dữ liệu từ hệ thống cũ không?',
        answer: 'Có. Đội ngũ kỹ thuật của 2HT hỗ trợ trích xuất, chuẩn hóa và import toàn bộ dữ liệu sản phẩm, khách hàng và lịch sử đơn hàng từ WordPress/WooCommerce, Haravan, Shopify sang nền tảng 2HT.'
      },
      {
        question: 'Hệ thống có chạy mượt vào các dịp sale khuyến mãi lớn không?',
        answer: 'Hệ thống được thiết kế chịu tải cao với Redis cache, load balancing và cơ sở dữ liệu tối ưu hóa chỉ số đánh index, đảm bảo vận hành ổn định trong các chiến dịch Mega Sale.'
      }
    ],
    isPublished: true,
    rating: 4.9,
    reviewsCount: 38,
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-03-20T10:00:00Z'
  },
  {
    id: 'prod-residence-02',
    slug: '2ht-residence',
    name: '2HT Residence',
    tagline: 'Phần mềm quản lý vận hành chung cư & khu đô thị số',
    category: 'management',
    categoryName: 'Phần mềm quản lý',
    description: 'Hệ thống số hóa toàn diện nghiệp vụ quản lý ban quản lý, cư dân, hóa đơn dịch vụ, kiểm soát an ninh và tiếp nhận phản ánh trực tuyến.',
    longDescription: '2HT Residence cung cấp portal ban quản trị tập trung và ứng dụng cư dân di động. Hệ thống tự động hóa lập hóa đơn phí dịch vụ điện nước, gửi thông báo qua SMS/App notification, quản lý thẻ cư dân, bãi đỗ xe và quản lý tài sản chung cư minh bạch, chính xác.',
    techStack: ['React', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    basePrice: 28000000,
    featuredBadge: 'Smart City Solution',
    badgeVariant: 'accent',
    hasLiveDemo: true,
    mockupType: 'residence',
    previewImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      {
        title: 'Tự động hóa lập hóa đơn phí dịch vụ',
        description: 'Tự động tính phí quản lý, điện, nước, gửi thông báo kèm mã QR thanh toán đến từng căn hộ.',
        iconName: 'Receipt'
      },
      {
        title: 'Tiếp nhận phản ánh 24/7',
        description: 'Cư dân gửi khiếu nại, phản ánh bảo trì trực tiếp qua App, theo dõi tiến độ xử lý minh bạch.',
        iconName: 'MessageSquare'
      },
      {
        title: 'Quản lý phương tiện & bãi xe',
        description: 'Tích hợp nhận diện biển số, quản lý vé tháng và thẻ gửi xe thông minh cho cư dân.',
        iconName: 'Car'
      },
      {
        title: 'Sổ tay cư dân & tiện ích',
        description: 'Đăng ký sử dụng hồ bơi, phòng gym, tiệc BBQ, sân tennis nhanh chóng ngay trên ứng dụng.',
        iconName: 'Calendar'
      }
    ],
    plans: [
      {
        id: 'res-standard',
        name: 'Gói Tòa Nhà Đơn',
        price: 28000000,
        billingCycle: 'vĩnh viễn',
        description: 'Dành cho 1 tòa chung cư quy mô dưới 400 căn hộ.',
        features: ['Portal ban quản lý web', 'Quản lý thu chi & dịch vụ', 'Tiếp nhận phản ánh trực tuyến', 'Đào tạo chuyển giao công nghệ']
      },
      {
        id: 'res-complex',
        name: 'Gói Cụm Khu Đô Thị',
        price: 55000000,
        billingCycle: 'vĩnh viễn',
        description: 'Dành cho khu phức hợp, cụm chung cư hoặc chuỗi dự án bất động sản.',
        features: ['Không giới hạn số block/tòa nhà', 'Tích hợp hệ thống camera & bãi xe thông minh', 'Custom phân quyền đa cấp BQL/BQT', 'Bảo trì trọn gói 2 năm'],
        isPopular: true
      }
    ],
    faqs: [
      {
        question: 'Phần mềm có kết nối được với các ngân hàng để đối soát thanh toán tự động không?',
        answer: 'Có. 2HT Residence hỗ trợ sinh VietQR động theo từng mã căn hộ kèm webhook đối soát tức thì khi cư dân chuyển khoản.'
      }
    ],
    isPublished: true,
    rating: 4.85,
    reviewsCount: 24,
    createdAt: '2026-01-20T08:00:00Z',
    updatedAt: '2026-03-18T10:00:00Z'
  },
  {
    id: 'prod-business-03',
    slug: '2ht-business',
    name: '2HT Business',
    tagline: 'Hệ thống quản trị doanh nghiệp tổng thể (ERP Lite)',
    category: 'management',
    categoryName: 'Quản trị doanh nghiệp',
    description: 'Nền tảng hợp nhất dữ liệu phòng ban, quản lý dự án, tài liệu công việc, tự động hóa quy trình phê duyệt nội bộ và báo cáo KPI.',
    longDescription: '2HT Business giải quyết bài toán phân mảnh thông tin trong doanh nghiệp vừa và nhỏ (SMEs). Tích hợp quản lý quy trình phê duyệt (e-approval), lịch biểu, tài liệu phân quyền nghiêm ngặt, chấm công và bảng điều khiển trực quan theo thời gian thực.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Spring Boot', 'MySQL', 'Docker'],
    basePrice: 35000000,
    featuredBadge: 'Được đề xuất cho SMEs',
    badgeVariant: 'primary',
    hasLiveDemo: true,
    mockupType: 'business',
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      {
        title: 'Quy trình phê duyệt số (E-Approval)',
        description: 'Tạo luồng duyệt tờ trình, đề xuất mua sắm, nghỉ phép linh hoạt theo nhiều cấp lãnh đạo.',
        iconName: 'CheckCircle2'
      },
      {
        title: 'Quản lý dự án & công việc Kanban',
        description: 'Giao việc, theo dõi tiến độ sprint, deadline và năng suất làm việc của từng nhân sự.',
        iconName: 'Kanban'
      },
      {
        title: 'Kho số hóa tài liệu doanh nghiệp',
        description: 'Lưu trữ, gắn nhãn bảo mật và phân quyền truy cập hồ sơ pháp lý, hợp đồng chặt chẽ.',
        iconName: 'FolderLock'
      },
      {
        title: 'Báo cáo tổng quan thời gian thực',
        description: 'Biểu đồ trực quan giúp ban giám đốc nắm bắt chỉ số hoạt động tức thời.',
        iconName: 'PieChart'
      }
    ],
    plans: [
      {
        id: 'biz-growth',
        name: 'Gói Tiêu Chuẩn',
        price: 35000000,
        billingCycle: 'vĩnh viễn',
        description: 'Tối ưu cho doanh nghiệp quy mô 20 - 100 nhân sự.',
        features: ['Đầy đủ module công việc & quy trình', 'Tối đa 100 tài khoản', 'Dung lượng lưu trữ tài liệu 50GB', 'Hỗ trợ kỹ thuật văn phòng']
      },
      {
        id: 'biz-enterprise',
        name: 'Gói May Đo Doanh Nghiệp',
        price: 0,
        billingCycle: 'vĩnh viễn',
        description: 'Tùy chỉnh tính năng riêng biệt theo văn hóa và quy trình doanh nghiệp.',
        features: ['Không giới hạn tài khoản nhân sự', 'Tùy biến luồng quy trình phức tạp', 'Triển khai Private Cloud hoặc On-Premise', 'SLA cam kết phản hồi 15 phút'],
        isPopular: true
      }
    ],
    faqs: [
      {
        question: 'Có thể triển khai trên máy chủ riêng của công ty chúng tôi không?',
        answer: 'Hoàn toàn có thể. 2HT hỗ trợ đóng gói Docker image và triển khai trực tiếp lên hạ tầng On-premise hoặc Private Cloud theo tiêu chuẩn an ninh riêng của quý khách.'
      }
    ],
    isPublished: true,
    rating: 4.95,
    reviewsCount: 31,
    createdAt: '2026-02-01T08:00:00Z',
    updatedAt: '2026-03-25T10:00:00Z'
  },
  {
    id: 'prod-sales-04',
    slug: '2ht-sales',
    name: '2HT Sales',
    tagline: 'Phần mềm quản lý bán hàng & CRM thông minh',
    category: 'custom',
    categoryName: 'Bán hàng & CRM',
    description: 'Tối ưu phễu bán hàng, quản lý thông tin khách hàng tiềm năng, theo dõi doanh số nhân viên và tự động hóa chăm sóc khách hàng.',
    longDescription: '2HT Sales là vũ khí đắc lực của đội ngũ kinh doanh. Ứng dụng quản lý toàn bộ vòng đời khách hàng từ lúc tạo Lead, tiếp cận, báo giá đến khi chốt hợp đồng và tái mua hàng, giúp gia tăng 40% hiệu suất bán hàng.',
    techStack: ['React', 'TypeScript', 'Spring Boot', 'MySQL', 'Redis'],
    basePrice: 18000000,
    featuredBadge: 'Tăng trưởng doanh thu',
    badgeVariant: 'warning',
    hasLiveDemo: true,
    mockupType: 'sales',
    previewImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      {
        title: 'Quản lý phễu cơ hội (Sales Pipeline)',
        description: 'Kéo thả cơ hội kinh doanh trực quan, nhận diện nút thắt trong phễu bán hàng.',
        iconName: 'TrendingUp'
      },
      {
        title: 'Hồ sơ khách hàng 360 độ',
        description: 'Lịch sử cuộc gọi, email, báo giá và tương tác được lưu trữ trọn vẹn trong một hồ sơ.',
        iconName: 'Users'
      },
      {
        title: 'Tạo báo giá & đơn hàng nhanh',
        description: 'Mẫu báo giá chuẩn chuyên nghiệp xuất PDF tức thì chỉ với vài cú nhấp chuột.',
        iconName: 'FileText'
      },
      {
        title: 'Báo cáo KPI doanh số tự động',
        description: 'Đo lường năng suất từng nhân viên kinh doanh, tỷ lệ chốt deal và dự báo doanh thu.',
        iconName: 'Target'
      }
    ],
    plans: [
      {
        id: 'sales-base',
        name: 'Gói Cơ Bản',
        price: 18000000,
        billingCycle: 'vĩnh viễn',
        description: 'Dành cho đội ngũ kinh doanh từ 5 đến 15 nhân viên.',
        features: ['Quản lý khách hàng & Lead', 'Báo giá & Đơn hàng', 'App di động cho Sales thị trường', 'Bảo hành hệ thống 1 năm']
      },
      {
        id: 'sales-advance',
        name: 'Gói Nâng Cao',
        price: 36000000,
        billingCycle: 'vĩnh viễn',
        description: 'Dành cho doanh nghiệp bán hàng đa kênh & telesales quy mô lớn.',
        features: ['Tích hợp tổng đài ảo IP Phone', 'Tự động phân bổ Lead thông minh', 'Chiến dịch email marketing tự động', 'API kết nối ERP và phần mềm kế toán']
      }
    ],
    faqs: [
      {
        question: 'Có tích hợp tổng đài nghe gọi trực tiếp trên phần mềm không?',
        answer: 'Có, hệ thống hỗ trợ tích hợp WebRTC với các nhà mạng tổng đài VoIP phổ biến như Stringee, CMC, VNPT để bấm gọi ngay trên giao diện web.'
      }
    ],
    isPublished: true,
    rating: 4.88,
    reviewsCount: 19,
    createdAt: '2026-02-10T08:00:00Z',
    updatedAt: '2026-03-22T10:00:00Z'
  },
  {
    id: 'prod-hrm-05',
    slug: '2ht-hrm',
    name: '2HT HRM',
    tagline: 'Hệ thống quản lý nhân sự & chấm công tiền lương',
    category: 'hrm',
    categoryName: 'Nhân sự HRM',
    description: 'Tự động hóa chấm công GPS/Wifi, tính lương chuẩn xác theo công thức linh hoạt, quản lý hồ sơ nhân sự và đánh giá hiệu suất nhân viên.',
    longDescription: '2HT HRM thay thế hoàn toàn bảng tính Excel phức tạp. Tích hợp máy chấm công nhận diện khuôn mặt, quản lý ngày phép, hợp đồng lao động, bảo hiểm và bảng lương tự động với tính năng gửi phiếu lương bảo mật qua email/App cá nhân.',
    techStack: ['React', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    basePrice: 22000000,
    featuredBadge: 'Chấm công thông minh',
    badgeVariant: 'accent',
    hasLiveDemo: true,
    mockupType: 'hrm',
    previewImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      {
        title: 'Chấm công đa hình thức linh hoạt',
        description: 'Kết nối máy chấm công vân tay/FaceID, chấm công vị trí GPS di động cho nhân viên công tác.',
        iconName: 'Fingerprint'
      },
      {
        title: 'Tính lương tự động chuẩn xác',
        description: 'Tự động tổng hợp giờ công, làm thêm giờ (OT), phạt đi trễ, giảm trừ gia cảnh và bảo hiểm.',
        iconName: 'Calculator'
      },
      {
        title: 'Số hóa hợp đồng lao động',
        description: 'Cảnh báo hạn hợp đồng lao động sắp hết hạn, lưu trữ hồ sơ bằng cấp chuyên môn an toàn.',
        iconName: 'Award'
      },
      {
        title: 'Cổng thông tin nhân viên tự phục vụ',
        description: 'Nhân viên xem phiếu lương, đăng ký nghỉ phép, xem ngày công trực tiếp trên điện thoại.',
        iconName: 'Smartphone'
      }
    ],
    plans: [
      {
        id: 'hrm-pro',
        name: 'Gói Tiêu Chuẩn',
        price: 22000000,
        billingCycle: 'vĩnh viễn',
        description: 'Phù hợp cho công ty từ 30 đến 150 nhân sự.',
        features: ['Module hồ sơ nhân sự & hợp đồng', 'Chấm công máy vân tay & GPS', 'Bảng tính lương tự động', 'Gửi phiếu lương bảo mật qua email']
      },
      {
        id: 'hrm-corp',
        name: 'Gói Tập Đoàn',
        price: 48000000,
        billingCycle: 'vĩnh viễn',
        description: 'Dành cho doanh nghiệp nhiều chi nhánh, ca kíp phức tạp (nhà máy, F&B, chuỗi siêu thị).',
        features: ['Xếp ca kíp tự động không giới hạn', 'Đánh giá KPI & OKRs định kỳ', 'Cổng tuyển dụng nội bộ', 'Bảo trì kỹ thuật trọn đời']
      }
    ],
    faqs: [
      {
        question: 'Hệ thống có tự động cập nhật mức đóng bảo hiểm xã hội mới nhất không?',
        answer: 'Có. Quản trị viên có thể cấu hình bảng tỷ lệ bảo hiểm và mức lương cơ sở theo các quy định mới nhất bất cứ lúc nào.'
      }
    ],
    isPublished: true,
    rating: 4.9,
    reviewsCount: 27,
    createdAt: '2026-02-15T08:00:00Z',
    updatedAt: '2026-03-24T10:00:00Z'
  },
  {
    id: 'prod-finance-06',
    slug: '2ht-finance',
    name: '2HT Finance',
    tagline: 'Phần mềm quản trị tài chính & dòng tiền doanh nghiệp',
    category: 'finance',
    categoryName: 'Tài chính kế toán',
    description: 'Kiểm soát dòng tiền thu chi, dự báo tài chính, quản lý ngân sách phòng ban và tối ưu chi phí vận hành cho lãnh đạo doanh nghiệp.',
    longDescription: '2HT Finance mang đến bức tranh tài chính sắc nét và tức thời cho chủ doanh nghiệp. Hệ thống phân bổ ngân sách chi tiết theo dự án, theo dõi hóa đơn công nợ phải thu/phải trả và mô hình hóa dự báo dòng tiền bằng biểu đồ trực quan.',
    techStack: ['React', 'TypeScript', 'Spring Boot', 'MySQL', 'Docker'],
    basePrice: 25000000,
    featuredBadge: 'Quản trị dòng tiền',
    badgeVariant: 'primary',
    hasLiveDemo: true,
    mockupType: 'finance',
    previewImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      {
        title: 'Giám sát dòng tiền thực thời (Cash Flow)',
        description: 'Biểu đồ dòng tiền thu - chi theo ngày, tuần, quý giúp kiểm soát nguy cơ thâm hụt tiền mặt.',
        iconName: 'DollarSign'
      },
      {
        title: 'Quản lý công nợ tự động',
        description: 'Nhắc nhở công nợ đến hạn, phân loại tuổi nợ khách hàng và cảnh báo đối tác rủi ro cao.',
        iconName: 'Clock'
      },
      {
        title: 'Kiểm soát ngân sách phòng ban',
        description: 'Cảnh báo tự động khi khoản chi vượt ngân sách đã duyệt, ngăn chặn lãng phí dòng tiền.',
        iconName: 'ShieldAlert'
      },
      {
        title: 'Báo cáo lãi lỗ theo từng dự án',
        description: 'Tính toán tỷ suất lợi nhuận (ROI) của từng hợp đồng/dự án để tối ưu hóa quyết định đầu tư.',
        iconName: 'LineChart'
      }
    ],
    plans: [
      {
        id: 'fin-standard',
        name: 'Gói Quản Trị Dòng Tiền',
        price: 25000000,
        billingCycle: 'vĩnh viễn',
        description: 'Dành cho doanh nghiệp thương mại & dịch vụ.',
        features: ['Quản lý quỹ tiền mặt & tài khoản ngân hàng', 'Quản lý công nợ mua - bán', 'Báo cáo thu chi & P&L cơ bản', 'Bảo hành kỹ thuật 12 tháng']
      },
      {
        id: 'fin-advanced',
        name: 'Gói Kiểm Soát Ngân Sách Chuyên Sâu',
        price: 49000000,
        billingCycle: 'vĩnh viễn',
        description: 'Dành cho công ty có nhiều dự án, chi nhánh hoặc phòng ban độc lập.',
        features: ['Kiểm soát trần ngân sách đa cấp', 'Dự báo dòng tiền tương lai với AI', 'Đồng bộ sao kê ngân hàng tự động', 'Tùy biến báo cáo tài chính quản trị']
      }
    ],
    faqs: [
      {
        question: 'Dữ liệu tài chính có được sao lưu tự động và bảo mật không?',
        answer: 'Có. Hệ thống hỗ trợ cơ chế mã hóa dữ liệu cơ sở dữ liệu cấp độ cột (Column-level encryption) và tự động tạo bản sao lưu snapshot hàng ngày.'
      }
    ],
    isPublished: true,
    rating: 4.92,
    reviewsCount: 22,
    createdAt: '2026-02-20T08:00:00Z',
    updatedAt: '2026-03-27T10:00:00Z'
  }
];
