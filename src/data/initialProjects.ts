import { Project } from '../types/project';

export const initialProjects: Project[] = [
  {
    id: 'proj-01',
    slug: 'vinahome-digital-residence',
    title: 'Hệ thống Quản lý Vận hành Đô thị Thông minh Vinahome',
    subtitle: 'Số hóa quản lý 12 tòa chung cư cao cấp với hơn 4.500 hộ dân cư',
    clientType: 'Tập đoàn Bất động sản Vinahome (Demo Case)',
    industry: 'Bất động sản & Smart City',
    description: 'Xây dựng giải pháp quản trị số đồng bộ giữa ban quản lý tòa nhà và cư dân, tích hợp thanh toán hóa đơn tự động và quản lý bãi đỗ xe thông minh.',
    challenge: 'Quy trình thu phí dịch vụ và tiếp nhận khiếu nại trước đây thực hiện thủ công qua giấy tờ và tin nhắn rời rạc, dẫn đến thất thoát dữ liệu và cư dân bức xúc vì phản hồi chậm.',
    solution: '2HT Information Technology triển khai giải pháp 2HT Residence tùy biến, cung cấp cổng web quản lý trung tâm và app di động cho cư dân với tính năng VietQR động.',
    result: [
      'Giảm 92% thời gian đối soát công nợ hàng tháng của ban quản lý',
      'Tỷ lệ cư dân thanh toán hóa đơn đúng hạn đạt trên 98%',
      'Tăng chỉ số hài lòng của cư dân (CSAT) từ 65% lên 94%'
    ],
    technologies: ['React', 'Spring Boot', 'PostgreSQL', 'Docker', 'Redis', 'Tailwind CSS'],
    metrics: [
      { label: 'Căn hộ kết nối', value: '4,500+' },
      { label: 'Giao dịch / tháng', value: '18,000+' },
      { label: 'Thời gian phản hồi', value: '< 15 phút' },
      { label: 'Độ hài lòng', value: '98%' }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'
    ],
    completionYear: '2026'
  },
  {
    id: 'proj-02',
    slug: 'nova-retail-omnichannel',
    title: 'Nền tảng Thương mại Điện tử Đa kênh NovaMart',
    subtitle: 'Hệ thống E-Commerce kết nối 45 chuỗi cửa hàng bán lẻ và 3 sàn TMĐT',
    clientType: 'Chuỗi Bán lẻ Nova Retail (Demo Case)',
    industry: 'Bán lẻ & Thương mại điện tử',
    description: 'Chuyển đổi số toàn diện kênh bán lẻ trực tuyến, đồng bộ tồn kho thời gian thực với hệ thống ERP kho tổng và các sàn Shopee, TikTok Shop.',
    challenge: 'Tồn kho ảo trên các sàn thương mại điện tử thường xuyên gây hủy đơn hàng, hệ thống web cũ tải chậm vào giờ cao điểm livestream.',
    solution: 'Triển khai kiến trúc Headless Commerce 2HT E-Commerce với Redis cache và kiến trúc vi dịch vụ chịu tải cao, tích hợp webhook đồng bộ kho hai chiều.',
    result: [
      'Tốc độ tải trang giảm xuống 0.7s trên thiết bị di động',
      'Loại bỏ 100% tình trạng hủy đơn do sai lệch tồn kho sàn TMĐT',
      'Doanh số bán hàng online tăng trưởng 210% sau 3 tháng triển khai'
    ],
    technologies: ['Next.js', 'React', 'Java', 'MySQL', 'Kafka', 'Docker'],
    metrics: [
      { label: 'Doanh thu online tăng', value: '+210%' },
      { label: 'Tốc độ tải web', value: '0.7s' },
      { label: 'Cửa hàng đồng bộ', value: '45 Chi nhánh' },
      { label: 'Tỷ lệ đơn thành công', value: '99.4%' }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80'
    ],
    completionYear: '2026'
  },
  {
    id: 'proj-03',
    slug: 'techcorp-internal-erp',
    title: 'Hệ thống Quản trị & Điều hành Doanh nghiệp TechCorp',
    subtitle: 'Số hóa quy trình vận hành, phê duyệt điện tử và nhân sự cho 250 nhân viên',
    clientType: 'Tập đoàn Công nghệ TechCorp (Demo Case)',
    industry: 'Doanh nghiệp & Công nghệ',
    description: 'Triển khai giải pháp 2HT Business kết hợp 2HT HRM giúp loại bỏ hoàn toàn quy trình ký duyệt giấy tờ và kiểm soát dòng ngân sách minh bạch.',
    challenge: 'Quy trình phê duyệt tờ trình và đề xuất tạm ứng chi phí mất trung bình 3-5 ngày qua nhiều cấp lãnh đạo.',
    solution: 'Thiết kế quy trình e-approval linh hoạt trên nền tảng web và app di động, hỗ trợ ký số và thông báo tức thời qua Slack & Zalo.',
    result: [
      'Rút ngắn thời gian phê duyệt hồ sơ từ 4 ngày xuống còn 2 giờ',
      'Tiết kiệm hơn 300 triệu đồng chi phí in ấn và lưu trữ giấy tờ mỗi năm',
      'Tự động hóa hoàn toàn bảng tính lương hàng tháng không còn sai sót'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Spring Boot', 'MySQL'],
    metrics: [
      { label: 'Thời gian duyệt', value: '2 Giờ' },
      { label: 'Chi phí tiết kiệm', value: '300Tr / năm' },
      { label: 'Nhân sự vận hành', value: '250+' },
      { label: 'Số quy trình chuẩn hóa', value: '42 Quy trình' }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'
    ],
    completionYear: '2025'
  }
];
