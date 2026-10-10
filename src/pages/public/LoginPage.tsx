import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/common/Button';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  LockKeyhole, 
  PhoneCall, 
  BarChart3, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Database,
  Puzzle,
  Laptop
} from 'lucide-react';
import isometricLaptopImg from '../../assets/isometric-laptop-transparent.png';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Modern Content & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-6 max-w-xl mx-auto lg:mx-0"
          >
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-700 text-xs font-bold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
              <span>Trải nghiệm toàn bộ dịch vụ trực tiếp</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Nền tảng Doanh nghiệp 2HT
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
              Giải pháp chuyển đổi số và công nghệ toàn diện cho doanh nghiệp của bạn.
            </p>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Khám phá đầy đủ 6 phần mềm công nghệ và giải pháp số hóa. Gửi yêu cầu tư vấn trực tiếp nhanh chóng & bảo mật mà không cần tài khoản thành viên.
            </p>

            {/* Security Highlight Card */}
            <div className="p-4 sm:p-4.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-600 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Tiếp cận nhanh chóng & bảo mật:</span>
              </div>
              <p className="text-[12px] text-slate-500 leading-relaxed pl-6">
                Mọi thông tin liên hệ và trao đổi giải pháp đều được kỹ sư bảo mật 2HT tiếp nhận và phản hồi riêng qua Zalo hoặc Hotline.
              </p>
            </div>

            {/* Actions: Primary & Secondary Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link to="/products">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="px-6 shadow-md"
                >
                  Khám phá sản phẩm ngay
                </Button>
              </Link>

              <Link to="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<PhoneCall className="w-4 h-4 text-cyan-600" />}
                  className="px-6"
                >
                  Liên hệ chuyên gia tư vấn
                </Button>
              </Link>
            </div>

            {/* Footnote */}
            <div className="pt-1 text-[11px] text-slate-600 italic">
              * Website mở công khai — Khách hàng không cần đăng ký hay đăng nhập tài khoản cá nhân.
            </div>

            {/* Management portal hint */}
            <div className="pt-4 border-t border-slate-100">
              <Link
                to="/admin/login"
                className="text-xs text-slate-600 hover:text-cyan-600 font-semibold transition-colors inline-flex items-center gap-1.5"
              >
                <LockKeyhole className="w-3.5 h-3.5" />
                <span>Cổng truy cập dành riêng cho Ban Quản Lý 2HT</span>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Authentic Isometric 3D Laptop Graphic from User Reference */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-7 relative flex items-center justify-center lg:justify-end"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Isometric Laptop Graphic Container */}
            <div className="relative w-full max-w-[680px] xl:max-w-[720px] flex items-center justify-center p-0">
              <motion.img
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                src={isometricLaptopImg}
                alt="2HT Enterprise Suite Isometric 3D Laptop Visual"
                className="w-full h-auto max-h-[560px] xl:max-h-[600px] scale-105 xl:scale-110 object-contain drop-shadow-[0_25px_60px_rgba(30,58,138,0.16)] select-none pointer-events-none"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
