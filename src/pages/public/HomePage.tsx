import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productService } from '../../services/productService';
import { blogService } from '../../services/blogService';
import { headingService } from '../../services/headingService';
import { initialProjects } from '../../data/initialProjects';
import { useSettings } from '../../store/settingsContext';
import { useCart } from '../../store/cartContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { SectionHeading } from '../../components/common/SectionHeading';
import { DemoNoticeBadge } from '../../components/common/DemoNoticeBadge';
import { EcosystemHeroVisual } from '../../components/mockups/EcosystemHeroVisual';
import { SoftwarePreviewCard } from '../../components/mockups/SoftwarePreviewCard';
import { LiveProductDemoModal } from '../../components/mockups/LiveProductDemoModal';
import { Product } from '../../types/product';
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Code, 
  Database, 
  Server, 
  Cloud, 
  BarChart, 
  Smartphone, 
  Globe, 
  Terminal,
  Clock,
  Quote,
  Eye,
  ShoppingBag
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { settings } = useSettings();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const products = productService.getPublished().slice(0, 6);

  const [selectedDemoProduct, setSelectedDemoProduct] = useState<Product | null>(null);

  const techCategories = [
    {
      group: 'Frontend Ecosystem',
      icon: Code,
      items: ['React 18+', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux / Zustand', 'Vite'],
    },
    {
      group: 'Backend & Microservices',
      icon: Server,
      items: ['Java 21', 'Spring Boot 3', 'Node.js', 'NestJS', 'RESTful API', 'gRPC'],
    },
    {
      group: 'Database & Caching',
      icon: Database,
      items: ['PostgreSQL', 'MySQL', 'Redis Cache', 'MongoDB', 'Elasticsearch'],
    },
    {
      group: 'DevOps & Cloud Infrastructure',
      icon: Cloud,
      items: ['Docker Container', 'Kubernetes', 'CI/CD Pipelines', 'AWS / DigitalOcean', 'Nginx'],
    },
  ];

  const categories = [
    {
      id: 'website',
      name: 'Website Doanh nghiệp',
      count: 'Cao cấp',
      icon: Globe,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/15 border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-slate-950 shadow-[0_0_16px_rgba(34,211,238,0.22)]',
      cardBorder: 'hover:border-cyan-500/60 hover:shadow-cyan-500/10',
      titleHover: 'group-hover:text-cyan-400',
    },
    {
      id: 'management',
      name: 'Phần mềm Quản lý',
      count: 'ERP & BQL',
      icon: Layers,
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/15 border-indigo-500/30 group-hover:bg-indigo-500 group-hover:text-slate-900 shadow-[0_0_16px_rgba(99,102,241,0.22)]',
      cardBorder: 'hover:border-indigo-500/60 hover:shadow-indigo-500/10',
      titleHover: 'group-hover:text-indigo-400',
    },
    {
      id: 'ecommerce',
      name: 'Thương mại Điện tử',
      count: 'Đa kênh Omnichannel',
      icon: ShoppingBag,
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-500/15 border-rose-500/30 group-hover:bg-rose-500 group-hover:text-slate-900 shadow-[0_0_16px_rgba(244,63,94,0.22)]',
      cardBorder: 'hover:border-rose-500/60 hover:shadow-rose-500/10',
      titleHover: 'group-hover:text-rose-400',
    },
    {
      id: 'finance',
      name: 'Tài chính & Dòng tiền',
      count: 'Cashflow Radar',
      icon: BarChart,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/15 border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-slate-950 shadow-[0_0_16px_rgba(16,185,129,0.22)]',
      cardBorder: 'hover:border-emerald-500/60 hover:shadow-emerald-500/10',
      titleHover: 'group-hover:text-emerald-400',
    },
    {
      id: 'hrm',
      name: 'Nhân sự & Chấm công',
      count: 'FaceID GPS',
      icon: Cpu,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/15 border-amber-500/30 group-hover:bg-amber-500 group-hover:text-slate-950 shadow-[0_0_16px_rgba(245,158,11,0.22)]',
      cardBorder: 'hover:border-amber-500/60 hover:shadow-amber-500/10',
      titleHover: 'group-hover:text-amber-400',
    },
    {
      id: 'custom',
      name: 'May đo theo yêu cầu',
      count: 'Bespoke Software',
      icon: Terminal,
      iconColor: 'text-fuchsia-400',
      iconBg: 'bg-fuchsia-500/15 border-fuchsia-500/30 group-hover:bg-fuchsia-500 group-hover:text-slate-900 shadow-[0_0_16px_rgba(217,70,239,0.22)]',
      cardBorder: 'hover:border-fuchsia-500/60 hover:shadow-fuchsia-500/10',
      titleHover: 'group-hover:text-fuchsia-400',
    },
  ];

  const steps = [
    { number: '01', title: 'Tiếp nhận & Khảo sát', desc: 'Lắng nghe bài toán doanh nghiệp, đánh giá hiện trạng nghiệp vụ và xác định mục tiêu số hóa.' },
    { number: '02', title: 'Phân tích & Lộ trình', desc: 'Lập bản đặc tả yêu cầu kỹ thuật (BRD), kiến trúc giải pháp và dự toán chi phí minh bạch.' },
    { number: '03', title: 'Thiết kế UI/UX Chuẩn mực', desc: 'Xây dựng wireframe, prototype tương tác cao cấp theo nhận diện thương hiệu độc quyền.' },
    { number: '04', title: 'Phát triển & Tích hợp', desc: 'Lập trình mã sạch với React, Spring Boot, tối ưu bảo mật và kết nối API hệ thống.' },
    { number: '05', title: 'Kiểm thử & Triển khai', desc: 'Kiểm thử tải, bảo mật đa tầng, đóng gói Docker và bàn giao hạ tầng thực tế.' },
    { number: '06', title: 'Bảo trì & Nâng cấp 24/7', desc: 'Đồng hành hỗ trợ kỹ thuật trọn đời, định kỳ tối ưu hiệu năng và cập nhật công nghệ mới.' },
  ];

  const demoTestimonials = [
    {
      quote: 'Giải pháp phần mềm quản lý của 2HT giúp quy trình vận hành tòa nhà của chúng tôi giảm 80% thời gian xử lý thủ công và cư dân rất hài lòng với mã VietQR tự động.',
      author: 'Nguyễn Thanh Tùng',
      title: 'Giám đốc Vận hành — Dự án Đô thị Sài Gòn (Nội dung Demo minh họa)',
      company: 'Vinahome Tower',
    },
    {
      quote: 'Kiến trúc microservices và tốc độ phản hồi dưới 1 giây giúp nền tảng thương mại điện tử của công ty chúng tôi chạy cực kỳ êm ái ngay cả trong những đợt sale nghìn đơn.',
      author: 'Lê Hoàng Yến',
      title: 'Head of E-Commerce — NovaMart Retail (Nội dung Demo minh họa)',
      company: 'Nova Group',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-16">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1400px] h-[650px] bg-hero-glow pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 xl:col-span-6 space-y-6 sm:space-y-7"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold text-accent tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
                <span>2HT INFORMATION TECHNOLOGY</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-black tracking-tight text-slate-900 leading-[1.2]">
                <span className="block">Kiến tạo giải pháp số.</span>
                <span className="text-gradient-primary block mt-1.5 sm:mt-2">
                  Nâng tầm doanh nghiệp.
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Khám phá hệ sinh thái phần mềm do <strong className="text-slate-900">2HT</strong> tự phát triển, giúp doanh nghiệp vận hành thông minh hơn, tối ưu quy trình và tăng tốc chuyển đổi số.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/products')}
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Khám phá sản phẩm
                </Button>

                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate('/contact')}
                  icon={<Sparkles className="w-4 h-4 text-cyan-400" />}
                >
                  Trao đổi với chuyên gia
                </Button>
              </div>

              {/* Capability highlights */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs max-w-xl">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900">100%</div>
                  <div className="text-slate-500 mt-0.5">Mã nguồn làm chủ</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-cyan-400">Microservices</div>
                  <div className="text-slate-500 mt-0.5">Kiến trúc sẵn sàng mở rộng</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">&lt; 1s</div>
                  <div className="text-slate-500 mt-0.5">Tốc độ tải tối ưu</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: High-tech Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end"
            >
              <EcosystemHeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & TECH STACK SECTION */}
      <section className="relative border-y border-slate-200/80 bg-slate-50/70 backdrop-blur-md py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-5">
            {/* Title Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-200/60 border border-slate-300/60 text-slate-700">
              <Code className="w-4 h-4 text-cyan-600" />
              <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                Công nghệ cốt lõi:
              </span>
            </div>

            {/* Tech badges with authentic brand icons */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {/* React & TypeScript */}
              <div className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-cyan-400 hover:shadow-sm transition-all cursor-default">
                <svg className="w-4 h-4 text-[#06B6D4] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <ellipse cx="12" cy="12" rx="10" ry="4.5" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-cyan-600 transition-colors whitespace-nowrap">
                  React & TypeScript
                </span>
              </div>

              {/* Spring Boot (Java) */}
              <div className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-400 hover:shadow-sm transition-all cursor-default">
                <svg className="w-4 h-4 text-[#10B981] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.16 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.02 10.02 0 0022 12c0-5.52-4.48-10-10-10z" />
                </svg>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors whitespace-nowrap">
                  Spring Boot (Java)
                </span>
              </div>

              {/* Node.js & NestJS */}
              <div className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-green-500 hover:shadow-sm transition-all cursor-default">
                <svg className="w-4 h-4 text-[#22C55E] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
                  <path d="M12 22V12" />
                  <path d="M21 7l-9 5-9-5" />
                </svg>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-green-600 transition-colors whitespace-nowrap">
                  Node.js & NestJS
                </span>
              </div>

              {/* Docker & Kubernetes */}
              <div className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-500 hover:shadow-sm transition-all cursor-default">
                <svg className="w-4 h-4 text-[#3B82F6] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  Docker & Kubernetes
                </span>
              </div>

              {/* MySQL & PostgreSQL */}
              <div className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-500 hover:shadow-sm transition-all cursor-default">
                <svg className="w-4 h-4 text-[#6366F1] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                  MySQL & PostgreSQL
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Hệ sinh thái phần mềm "
            title="Khám phá hệ sinh thái sản phẩm."
            description="Những giải pháp phần mềm được nghiên cứu và phát triển để giải quyết bài toán thực tế của doanh nghiệp hiện đại."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Visual Preview Header (Unique for each product!) */}
                <div className="p-3.5 bg-slate-50/70 border-b border-slate-100">
                  <SoftwarePreviewCard
                    type={product.mockupType}
                    previewImage={product.previewImage}
                    name={product.name}
                  />
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Category & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        {product.categoryName}
                      </span>
                      {product.featuredBadge && (
                        <Badge variant={product.badgeVariant || 'primary'} size="sm">
                          {product.featuredBadge}
                        </Badge>
                      )}
                    </div>

                    {/* Name & Tagline */}
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-1">
                      {product.tagline}
                    </p>

                    {/* Short Description */}
                    <p className="text-sm text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {product.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white text-slate-600 border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-xs text-slate-500">Giá đề xuất demo:</span>
                      <span className="text-base font-extrabold text-slate-900">
                        {product.basePrice > 0
                          ? `${product.basePrice.toLocaleString('vi-VN')} đ`
                          : 'Liên hệ báo giá'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedDemoProduct(product)}
                        icon={<Play className="w-3.5 h-3.5 text-accent" />}
                      >
                        Dùng thử
                      </Button>

                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => navigate(`/products/${product.slug}`)}
                        icon={<ArrowRight className="w-3.5 h-3.5" />}
                        iconPosition="right"
                      >
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/products')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Xem toàn bộ danh mục sản phẩm 2HT
            </Button>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT CATEGORIES SECTION */}
      <section className="relative bg-slate-50/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Danh mục giải pháp"
            title="Lựa chọn lĩnh vực bạn quan tâm."
            description="Tập trung nguồn lực vào bài toán chuyển đổi số cụ thể cho từng mô hình doanh nghiệp."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => navigate(`/products?category=${cat.id}`)}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer group flex flex-col items-center justify-center space-y-3 shadow-xs hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${cat.iconColor} ${cat.iconBg} group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-cyan-400 transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{cat.count}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE 2HT SECTION */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-bold text-accent uppercase">
                <ShieldCheck className="w-3.5 h-3.5" /> Năng lực vượt trội
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Tại sao doanh nghiệp chọn hợp tác ?
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Chúng tôi không cung cấp những template dựng sẵn đại trà. Mỗi sản phẩm phần mềm của 2HT là sự kết tinh giữa năng lực phân tích nghiệp vụ thực chiến và tư duy kiến trúc công nghệ hiện đại.
              </p>
              <div className="pt-2">
                <Button
                  size="md"
                  variant="primary"
                  onClick={() => navigate('/about')}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Tìm hiểu thêm 
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Phát triển theo nhu cầu thực tế',
                  desc: 'Bám sát luồng vận hành thực tiễn của doanh nghiệp Việt Nam, không nhồi nhét tính năng thừa.',
                  icon: Layers,
                },
                {
                  title: 'Giao diện hiện đại & Tối ưu UI/UX',
                  desc: 'Thiết kế trực quan, giảm thiểu số bước thao tác của người dùng và tăng tốc năng suất làm việc.',
                  icon: Sparkles,
                },
                {
                  title: 'Kiến trúc mở rộng Microservices',
                  desc: 'Dễ dàng tích hợp thêm module mới, kết nối sàn TMĐT, cổng thanh toán hoặc hệ thống thứ ba qua API.',
                  icon: Cpu,
                },
                {
                  title: 'Bảo mật đa tầng & Mã nguồn tự chủ',
                  desc: 'Kiểm soát tuyệt đối mã nguồn, tuân thủ tiêu chuẩn an toàn thông tin và sao lưu tự động.',
                  icon: ShieldCheck,
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. TECHNOLOGY STACK SECTION */}
      <section className="relative bg-slate-50/70 py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Công nghệ & Hạ tầng"
            title="Ngăn xếp công nghệ hàng đầu thế giới."
            description="2HT áp dụng các ngôn ngữ, framework và công nghệ điện toán đám mây tiên tiến nhất để đảm bảo độ bền vững cho sản phẩm."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCategories.map((group, i) => {
              const Icon = group.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4"
                >
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{group.group}</h3>
                  </div>

                  <ul className="space-y-2">
                    {group.items.map((tech) => (
                      <li
                        key={tech}
                        className="text-xs text-slate-600 flex items-center gap-2 font-mono"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. PROJECTS SHOWCASE SECTION */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Portfolio & Case Studies"
            title="Dự án tiêu biểu đã triển khai."
            description="Minh chứng thực tế cho năng lực công nghệ và hiệu quả chuyển đổi số của 2HT."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {initialProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={() => navigate(`/projects/${project.slug}`)}
              >
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={project.featuredImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <span className="absolute top-4 left-4 text-[11px] font-semibold bg-white/95 backdrop-blur-md border border-slate-200 text-cyan-600 px-2.5 py-1 rounded-full shadow-sm">
                    {project.industry}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{project.subtitle}</p>
                    <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-cyan-600 font-semibold">
                    <span>Xem case study chi tiết</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WORKING PROCESS SECTION */}
      <section className="relative bg-slate-50/70 py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div
                key={s.number}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all space-y-3 relative overflow-hidden group"
              >
                <div className="text-3xl font-black text-slate-300 group-hover:text-cyan-500 transition-colors font-mono">
                  {s.number}
                </div>
                <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS (Transparent Demo Notice) */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Đánh giá minh họa"
            title="Khách hàng nói gì về giải pháp ?"
            description="Nội dung đánh giá mô phỏng theo khảo sát thực nghiệm nghiệp vụ."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {demoTestimonials.map((t, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white border border-slate-200/80 space-y-6 relative shadow-sm"
              >
                <Quote className="w-10 h-10 text-cyan-500/30" />
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  “{t.quote}”
                </p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.author}</div>
                    <div className="text-xs text-slate-500">{t.title}</div>
                  </div>
                  <Badge variant="outline" size="sm">Demo Review</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. BLOG SECTION */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-cyan-600">
                Kiến thức & Góc nhìn công nghệ
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-2">
                Bài viết mới nhất từ chuyên gia 
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-xs font-semibold text-cyan-600 hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              Xem tất cả bài viết <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogService.getAll().slice(0, 3).map((b) => (
              <div
                key={b.id}
                onClick={() => navigate(`/blog/${b.slug}`)}
                className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all cursor-pointer group flex flex-col"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={b.coverImage}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-semibold bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full text-cyan-700 border border-slate-200 shadow-sm">
                    {b.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                      <Clock className="w-3 h-3" />
                      <span>{b.readTime}</span>
                      <span>•</span>
                      <span>{b.publishedAt}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-500 transition-colors line-clamp-2">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {b.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                    <img
                      src={b.author.avatar}
                      alt={b.author.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>{b.author.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CTA SECTION */}
      <section className="relative pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 border border-blue-400/30 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl text-white">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-white uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" /> Bắt đầu dự án cùng chúng tôi
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Bạn có ý tưởng? Hãy cùng chúng tôi hiện thực hóa.
              </h2>

              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Đội ngũ kỹ sư và chuyên gia giải pháp của chúng tôi luôn sẵn sàng hỗ trợ tư vấn kiến trúc, giải pháp phần mềm tối ưu nhất cho bài toán của bạn.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate('/contact')}
                  icon={<ArrowRight className="w-5 h-5 text-blue-600" />}
                  iconPosition="right"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-bold border-transparent"
                >
                  Bắt đầu dự án ngay
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/products')}
                  className="border-white/60 text-slate-900 hover:bg-white/15 hover:border-white"
                >
                  Khám phá sản phẩm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Demo Modal */}
      <LiveProductDemoModal
        product={selectedDemoProduct}
        isOpen={!!selectedDemoProduct}
        onClose={() => setSelectedDemoProduct(null)}
      />
    </div>
  );
};
