import { ConsultationRequest } from '../types/consultation';

export const initialConsultations: ConsultationRequest[] = [
  {
    id: 'REQ-2026-001',
    fullName: 'Đỗ Quốc Khánh',
    email: 'khanh.do@vietbuild.demo.vn',
    phone: '0903 555 888',
    company: 'Công ty Xây dựng & Bất động sản VietBuild',
    serviceInterest: 'Phần mềm quản lý cư dân (2HT Residence)',
    estimatedBudget: '50 - 100 triệu VNĐ',
    message: 'Chúng tôi đang chuẩn bị bàn giao dự án căn hộ 3 block tại Bình Dương, muốn tìm hiểu giải pháp vận hành phần mềm và app cư dân.',
    status: 'IN_PROGRESS',
    assignedTo: 'Chuyên viên Trần Hoàng (Kinh doanh)',
    notes: 'Đã hẹn họp trực tuyến vào 14h Thứ Năm để demo hệ thống.',
    createdAt: '2026-03-28T08:20:00Z'
  },
  {
    id: 'REQ-2026-002',
    fullName: 'Vũ Thùy Linh',
    email: 'linh.vu@fashionhub.demo.vn',
    phone: '0938 111 222',
    company: 'Thương hiệu Thời trang FashionHub',
    serviceInterest: 'Thương mại điện tử & Đa sàn (2HT E-Commerce)',
    estimatedBudget: '30 - 50 triệu VNĐ',
    message: 'Cần nâng cấp website bán hàng và kết nối tự động tồn kho với 2 gian hàng Shopee Mall và TikTok Shop.',
    status: 'NEW',
    assignedTo: 'Chưa phân công',
    createdAt: '2026-03-29T10:15:00Z'
  },
  {
    id: 'REQ-2026-003',
    fullName: 'Hoàng Minh Đức',
    email: 'duc.hm@finholdings.demo.vn',
    phone: '0919 666 333',
    company: 'Tập đoàn FinHoldings',
    serviceInterest: 'Giải pháp phần mềm may đo theo yêu cầu',
    estimatedBudget: 'Trên 100 triệu VNĐ',
    message: 'Muốn thiết kế cổng thông tin quản trị tài chính nội bộ và phê duyệt điện tử tích hợp chữ ký số HSM.',
    status: 'CONTACTED',
    assignedTo: 'Giám đốc Giải pháp Lê Hùng',
    notes: 'Đã gửi tài liệu giới thiệu năng lực (Portfolio & Case Study).',
    createdAt: '2026-03-26T15:30:00Z'
  }
];
