# 2HT Information Technology — Premium React Website

> **“Technology That Builds Your Future.”**  
> *Kiến tạo giải pháp số. Nâng tầm doanh nghiệp.*

Website cao cấp giới thiệu và trưng bày hệ sinh thái phần mềm tự phát triển của thương hiệu **2HT Information Technology**. Được xây dựng hoàn chỉnh bằng React, TypeScript, Tailwind CSS, Framer Motion, Recharts và Sonner.

---

## 🚀 Hướng Dẫn Chạy Dự Án

### Yêu cầu môi trường
* **Node.js**: v18+ hoặc v20+ (Khuyến nghị Node 20+)
* **NPM**: v9+ hoặc v10+

### Các bước cài đặt và khởi chạy:

```bash
# 1. Cài đặt các phụ thuộc (nếu chưa cài)
npm install

# 2. Chạy môi trường phát triển (Dev Server)
npm run dev
```

Sau khi chạy lệnh `npm run dev`, mở trình duyệt tại:
👉 `http://localhost:3000`

### Build phiên bản Production:
```bash
npm run build
npm run preview
```

---

## 🎨 Design System & Định Hướng Nghệ Thuật

* **Nền chính (Main Background)**: `#080D19` (Deep Cyber Space)
* **Nền phụ (Secondary Background)**: `#0E1628` (Dark Slate Glass)
* **Màu thương hiệu (Primary Brand)**: `#6366F1` (Indigo Glow)
* **Màu điểm nhấn (Accent Brand)**: `#22D3EE` (Cyan Electric)
* **Màu chữ chính**: `#F8FAFC`
* **Màu chữ phụ**: `#94A3B8`
* **Viền kính & Glow**: `rgba(148, 163, 184, 0.16)` và `rgba(99, 102, 241, 0.35)`
* **Phong cách**: Modern SaaS, Glassmorphism cao cấp, viền phát sáng đa tầng, không dùng template đại trà.

---

## 📦 Hệ Sinh Thái Sản Phẩm Demo

1. **2HT E-Commerce**: Nền tảng thương mại điện tử đa kênh, đồng bộ Shopee, TikTok Shop, quản lý đa kho.
2. **2HT Residence**: Phần mềm số hóa quản lý vận hành chung cư & khu đô thị, tạo hóa đơn tự động & VietQR động.
3. **2HT Business**: Hệ thống quản trị doanh nghiệp tổng thể (ERP Lite), phê duyệt e-approval không giấy tờ.
4. **2HT Sales**: Phần mềm quản lý bán hàng, CRM và phễu cơ hội thông minh.
5. **2HT HRM**: Quản lý nhân sự, chấm công FaceID/GPS và tự động tính bảng lương.
6. **2HT Finance**: Quản trị tài chính, dự báo dòng tiền và kiểm soát trần ngân sách.

Mỗi sản phẩm đều có:
- Visual UI Preview độc quyền.
- Chế độ **Trải nghiệm Live Demo Sandbox** tương tác trực tiếp trong modal.
- Bảng giá minh họa & các gói triển khai (Tiêu chuẩn vs Doanh nghiệp).
- FAQs và thông số kiến trúc kỹ thuật.

---

## 🌐 Danh Sách Các Trang & Routing

### 1. Website Công Khai (`Public Layout`)
* `/`: Trang chủ với Hero 2 cột tương tác, Trust metrics, Featured products, Categories, Why choose 2HT, Tech stack, Projects showcase, 6-step timeline, Testimonials, Blog và CTA.
* `/products`: Danh mục sản phẩm đầy đủ với bộ lọc danh mục, khoảng giá, lọc Live demo, tìm kiếm theo công nghệ và sắp xếp.
* `/products/:slug`: Chi tiết sản phẩm, chọn gói dịch vụ, thêm vào giỏ, xem mockup trực quan.
* `/cart`: Trang giỏ hàng, cập nhật số lượng, xóa sản phẩm, nhập mã giảm giá (`TECH2026`, `WELCOME2HT`).
* `/checkout`: Form thanh toán thử nghiệm, chọn phương thức thanh toán (VietQR demo, Chuyển khoản demo, Hóa đơn VAT demo).
* `/order-success/:orderId`: Xác nhận đơn hàng, sinh mã VietQR demo, lưu trữ trong localStorage.
* `/solutions`: Giải pháp số hóa theo từng ngành dọc (PropTech, Retail, Enterprise).
* `/services`: Dịch vụ may đo phần mềm theo yêu cầu, DevOps, Microservices.
* `/projects` & `/projects/:slug`: Portfolio showcase và chi tiết bài toán - giải pháp - kết quả đo lường.
* `/blog` & `/blog/:slug`: Bài viết chia sẻ kiến thức chuyên sâu từ các kỹ sư 2HT.
* `/about`: Giới thiệu tầm nhìn, sứ mệnh, văn hóa kỹ thuật 2HT.
* `/contact`: Biểu mẫu tư vấn lưu trực tiếp vào cơ sở dữ liệu localStorage.
* `/login` & `/register`: Đăng nhập/Đăng ký demo nhanh với 1 cú nhấp chuột.
* `/account`: Quản lý hồ sơ cá nhân và xem lịch sử các đơn hàng demo đã tạo.

### 2. Quản Trị Viên (`Admin Dashboard` — `/admin`)
* `/admin`: Tổng quan doanh thu demo, biểu đồ Recharts (Doanh thu & Đơn hàng), danh sách đơn mới nhất.
* `/admin/products`: CRUD sản phẩm đầy đủ (Thêm mới, Chỉnh sửa, Xóa, Bật/Tắt trạng thái xuất bản, Khôi phục mẫu).
* `/admin/orders`: Quản lý danh sách đơn hàng, tìm kiếm mã đơn, lọc trạng thái, cập nhật trạng thái (`DEMO_PENDING` -> `DEMO_PROCESSING` -> `DEMO_COMPLETED` -> `DEMO_CANCELLED`).
* `/admin/customers`: Tổng hợp danh sách khách hàng doanh nghiệp, tổng chi tiêu demo.
* `/admin/consultations`: Danh sách yêu cầu tư vấn từ khách hàng, phân công chuyên viên, cập nhật tiến độ.
* `/admin/blogs`: Quản lý danh sách bài viết.
* `/admin/settings`: Tùy biến thương hiệu 2HT (Tên công ty, Slogan, Email, Hotline, Địa chỉ, Bản quyền) và đồng bộ ngay lập tức tới Header/Footer.

---

## 🛡️ Lưu Ý Về Môi Trường Thử Nghiệm

* Dự án hiện tại được xây dựng hoàn chỉnh ở tầng **FRONTEND**.
* Mọi thao tác đặt hàng, cập nhật sản phẩm, gửi liên hệ và cấu hình hệ thống được lưu an toàn trong `localStorage` của trình duyệt và duy trì ngay cả khi refresh trang.
* Không có thông tin tài chính nhạy cảm hoặc giao dịch ngân hàng thật nào diễn ra.
