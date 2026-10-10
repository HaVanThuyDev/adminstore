import { BlogPost } from '../types/blog';

export const initialBlogs: BlogPost[] = [
  {
    id: 'blog-01',
    slug: 'chuyen-doi-so-doanh-nghiep-2026',
    title: 'Xu hướng chuyển đổi số 2026: Từ tự động hóa quy trình đến trí tuệ nhân tạo thực chiến',
    excerpt: 'Làm thế nào để doanh nghiệp vừa và nhỏ (SMEs) không bị bỏ lại phía sau trong làn sóng số hóa toàn diện năm 2026.',
    content: `Trong bối cảnh nền kinh tế số phát triển như vũ bão, việc chuyển đổi số không còn là một lựa chọn xa xỉ mà là điều kiện sống còn của mọi doanh nghiệp. 

### 1. Tại sao doanh nghiệp SMEs cần hành động ngay hôm nay?
Rất nhiều lãnh đạo doanh nghiệp nghĩ rằng chuyển đổi số chỉ dành cho các tập đoàn lớn với ngân sách hàng tỷ đồng. Tuy nhiên, sự thật là chính các doanh nghiệp SMEs mới là những đơn vị nhận được tỷ suất hoàn vốn (ROI) cao nhất khi số hóa. Việc loại bỏ quy trình giấy tờ thủ công, thống nhất dữ liệu khách hàng và theo dõi dòng tiền theo thời gian thực giúp tiết kiệm đến 40% chi phí vận hành.

### 2. Các trụ cột chuyển đổi số cốt lõi
- **Trụ cột 1 - Hợp nhất dữ liệu khách hàng (CRM & Omnichannel):** Đảm bảo mọi điểm chạm của khách hàng đều được ghi nhận chính xác.
- **Trụ cột 2 - Tự động hóa quy trình nội bộ (ERP Lite & E-Approval):** Rút ngắn chu kỳ phê duyệt từ nhiều ngày xuống vài giờ.
- **Trụ cột 3 - Kiểm soát tài chính minh bạch:** Cung cấp số liệu tài chính thời gian thực giúp ban lãnh đạo đưa ra quyết định dựa trên dữ liệu.

Tại 2HT Information Technology, chúng tôi đồng hành cùng doanh nghiệp từ giai đoạn khảo sát nghiệp vụ đến khi nghiệm thu vận hành thực tế.`,
    category: 'Chuyển đổi số',
    tags: ['Chuyển đổi số', 'SMEs', 'Chiến lược công nghệ', 'ERP'],
    author: {
      name: 'Nguyễn Huy Hoàng',
      role: 'Chief Technology Officer (2HT)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-03-20',
    readTime: '6 phút đọc',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true
  },
  {
    id: 'blog-02',
    slug: 'kien-truc-microservices-spring-boot-react',
    title: 'Xây dựng hệ thống SaaS quy mô lớn với React, Spring Boot và Docker',
    excerpt: 'Chia sẻ kinh nghiệm thiết kế kiến trúc phần mềm chịu tải cao, module hóa và tối ưu hiệu suất từ đội ngũ kỹ sư 2HT.',
    content: `Khi quy mô người dùng tăng trưởng từ hàng nghìn lên hàng trăm nghìn phiên truy cập đồng thời, một kiến trúc monolithic nguyên khối thường bộc lộ những hạn chế lớn về khả năng mở rộng.

### 1. Lợi thế khi kết hợp React và Spring Boot
React ở tầng Frontend mang đến trải nghiệm người dùng siêu mượt mà nhờ cơ chế Virtual DOM và hệ sinh thái thư viện phong phú. Trong khi đó, Spring Boot ở tầng Backend cung cấp sự ổn định, an toàn kiểu dữ liệu mạnh mẽ của Java, cùng khả năng xử lý đa luồng ấn tượng.

### 2. Đóng gói và điều phối với Docker & Kubernetes
Bằng cách container hóa từng dịch vụ thông qua Docker, quy trình CI/CD trở nên nhất quán trên mọi môi trường phát triển, thử nghiệm và production.

### 3. Tối ưu hóa cơ sở dữ liệu và Caching với Redis
Sử dụng Redis cache cho các truy vấn dữ liệu tĩnh hoặc bảng giá sản phẩm giúp giảm tải hơn 80% áp lực truy vấn lên cơ sở dữ liệu quan hệ MySQL/PostgreSQL.`,
    category: 'Công nghệ phần mềm',
    tags: ['React', 'Spring Boot', 'Docker', 'Kiến trúc SaaS', 'Microservices'],
    author: {
      name: 'Trần Minh Tuấn',
      role: 'Principal Software Architect (2HT)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-03-15',
    readTime: '8 phút đọc',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'blog-03',
    slug: 'kinh-nghiem-xay-dung-website-chuan-seo-chuyen-nghiep',
    title: '7 Tiêu chuẩn kỹ thuật bắt buộc khi xây dựng website doanh nghiệp cao cấp năm 2026',
    excerpt: 'Những yếu tố tiên quyết giúp website vừa tạo ấn tượng thương hiệu uy tín, vừa đạt điểm Core Web Vitals tuyệt đối.',
    content: `Website doanh nghiệp chính là bộ mặt đại diện trực tuyến 24/7. Một website thiếu chuyên nghiệp hoặc tải chậm sẽ đánh mất khách hàng tiềm năng ngay từ những giây đầu tiên.

### 1. Tốc độ tải trang dưới 1.2 giây (Core Web Vitals)
Google đánh giá cao các website có chỉ số LCP (Largest Contentful Paint) và CLS (Cumulative Layout Shift) tối ưu. Sử dụng các kỹ thuật SSR, Lazy Loading ảnh và nén WebP/AVIF là yêu cầu tiên quyết.

### 2. Thiết kế Mobile-First và tương thích đa kích thước
Hơn 70% lượt truy cập hiện nay đến từ thiết bị di động. Giao diện phải được thiết kế trau chuốt, thao tác nút bấm thuận tiện và không bị vỡ bố cục trên mọi kích thước màn hình.

### 3. Tính bảo mật và chứng chỉ SSL/TLS
Không chỉ là ổ khóa xanh HTTPS, website cần được bảo vệ chống lại các lỗ hổng XSS, CSRF và tuân thủ các quy định bảo vệ dữ liệu người dùng.`,
    category: 'Xây dựng website',
    tags: ['Web Design', 'UI/UX', 'SEO', 'Performance', 'Core Web Vitals'],
    author: {
      name: 'Lê Hoàng Anh',
      role: 'Lead UI/UX Designer (2HT)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-03-10',
    readTime: '5 phút đọc',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
  }
];
