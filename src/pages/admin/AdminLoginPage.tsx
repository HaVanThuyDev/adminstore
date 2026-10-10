import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/authContext';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import isometricLaptopImg from '../../assets/isometric-laptop-transparent.png';

export const AdminLoginPage: React.FC = () => {
  const { loginDemo } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('admin@2ht-tech.demo.vn');
  const [password, setPassword] = useState('admin@secure2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error('Vui lòng nhập tên tài khoản quản trị');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      loginDemo(username, 'admin');
      toast.success('Xác thực Ban Quản Lý thành công. Chào mừng bạn trở lại!');
      navigate('/admin');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#223366] flex items-center justify-center p-3 sm:p-6 lg:p-8 font-sans selection:bg-cyan-500/20 selection:text-cyan-700">
      {/* Outer Browser/App Card Frame with Rounded Corners */}
      <div className="w-full max-w-5xl bg-white rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-[0_30px_90px_-20px_rgba(10,20,50,0.6)] flex flex-col md:flex-row min-h-[560px] sm:min-h-[600px] border border-white/20 relative">
        
        {/* LEFT COLUMN: Clean White Form (35% - 40% width) */}
        <div className="w-full md:w-[380px] lg:w-[410px] bg-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between relative z-10 flex-shrink-0">
          
          {/* Top Logo / Brand Title */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo-transparent.png"
                alt="2HT Technology"
                className="h-9 w-auto object-contain"
              />
            </div>
          </div>

          {/* Center: Circular User Avatar & Form */}
          <div className="my-auto py-6 sm:py-8 space-y-6">
            {/* Circular Avatar Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full border-[2.5px] border-[#223366] flex items-center justify-center text-[#223366] bg-slate-50/50 shadow-inner">
                <User className="w-10 h-10 stroke-[1.75]" />
              </div>
            </div>

            {/* Login Inputs */}
            <form onSubmit={handleAdminLogin} className="space-y-4">
              {/* Username Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="USERNAME"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-full border-[1.5px] border-slate-300 text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 uppercase tracking-wider focus:outline-none focus:border-[#223366] focus:ring-1 focus:ring-[#223366] transition-all bg-slate-50/30"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="PASSWORD"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-full border-[1.5px] border-slate-300 text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 tracking-wider focus:outline-none focus:border-[#223366] focus:ring-1 focus:ring-[#223366] transition-all bg-slate-50/30"
                />
              </div>

              {/* Pill CTA Button: LOGIN */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-full bg-[#2B3A67] hover:bg-[#1E2B52] active:scale-[0.98] text-white text-xs sm:text-sm font-black uppercase tracking-widest shadow-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? 'AUTHENTICATING...' : 'LOGIN'}
              </button>

              {/* Remember me & Forgot Password Row */}
              <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded-full text-[#223366] focus:ring-0 border-slate-300 cursor-pointer accent-[#223366]"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => toast.info('Vui lòng liên hệ Trưởng ban CNTT để cấp lại quyền mật khẩu nội bộ.')}
                  className="hover:underline text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
            </form>
          </div>

          {/* Bottom Triple Pagination Dots */}
          <div className="flex justify-center items-center gap-2 pt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#223366]" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
        </div>

        {/* RIGHT COLUMN: Liquid Wave Artistic Backdrop with Welcome Title */}
        <div className="flex-1 relative overflow-hidden bg-gradient-to-tr from-[#1E2B52] via-[#2B4B82] to-[#1E3A6E] flex flex-col justify-between p-8 sm:p-10 lg:p-12 min-h-[420px] md:min-h-0">
          
          {/* Fluid Modern Mesh Gradient Wave Artwork */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Wave 1: Sand/Champagne Gold Highlight */}
            <div className="absolute -top-[25%] -right-[15%] w-[120%] h-[120%] rounded-[45%] bg-gradient-to-br from-[#F5DEB3]/75 via-[#FFE4B5]/45 to-transparent blur-3xl transform rotate-12 opacity-80" />
            
            {/* Wave 2: Cyan/Sky Deep Contrast */}
            <div className="absolute -bottom-[20%] -left-[20%] w-[110%] h-[110%] rounded-[50%] bg-gradient-to-tr from-[#0EA5E9]/50 via-[#38BDF8]/30 to-transparent blur-3xl transform -rotate-12" />
            
            {/* Wave 3: Organic Central Flow */}
            <div className="absolute top-[20%] left-[10%] w-[80%] h-[70%] rounded-full bg-gradient-to-r from-[#FDE68A]/35 via-[#93C5FD]/25 to-transparent blur-2xl transform rotate-45" />
          </div>

          {/* Top Mini Navigation Bar on Wave */}
          <div className="relative z-10 flex items-center justify-between text-xs font-semibold text-white/90">
            <div className="hidden sm:flex items-center gap-6 uppercase tracking-wider text-[11px] text-white/80">
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/products" className="hover:text-white transition-colors">Products</Link>
              <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <Link
                to="/"
                className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider transition-all border border-white/25"
              >
                Website
              </Link>
            </div>
          </div>

          {/* Isometric 3D Laptop Showcase (Vùng khoanh tròn) */}
          <div className="relative z-10 my-auto py-2 sm:py-4 flex items-center justify-center">
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex items-center justify-center max-w-full transform-gpu will-change-transform"
            >
              {/* Soft ambient glow behind laptop */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-400/25 via-blue-400/20 to-amber-200/20 rounded-full blur-2xl -z-10" />

              <img
                src={isometricLaptopImg}
                alt="2HT Technology Platform Dashboard"
                width={1400}
                height={1045}
                loading="eager"
                decoding="async"
                className="w-[280px] sm:w-[350px] lg:w-[410px] h-auto object-contain drop-shadow-[0_22px_45px_rgba(3,10,30,0.5)] select-none pointer-events-none"
              />
            </motion.div>
          </div>

          {/* Lower Right Content: Big Welcome Hero */}
          <div className="relative z-10 mt-auto pt-2 sm:pt-4 max-w-lg space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
              Welcome.
            </h1>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal max-w-sm drop-shadow-sm">
              Hệ thống quản trị và điều hành tập trung giải pháp phần mềm 2HT Information Technology.
            </p>

            <div className="pt-1 text-xs text-white/80">
              <span>Cổng truy cập bảo mật cao cấp </span>
              <strong className="text-white font-bold ml-1">• Phiên bản 2026</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
