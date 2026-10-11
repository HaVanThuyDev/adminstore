import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../store/cartContext';
import { useAuth } from '../../store/authContext';
import { Button } from '../common/Button';
import { SearchModal } from '../common/SearchModal';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  User, 
  LayoutDashboard,
  ExternalLink,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Building2,
  Briefcase,
  Users,
  DollarSign,
  ShoppingCart,
  PhoneCall,
  Home,
  Layers,
  FolderGit2,
  FileText,
  Info,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(true);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [location.pathname]);

  const handleMouseEnterProducts = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setProductsDropdownOpen(true);
  };

  const handleMouseLeaveProducts = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 200);
  };

  const navLinks = [
    { label: 'Trang chủ', href: '/', icon: Home },
    { label: 'Sản phẩm', href: '/products', isDropdown: true, icon: ShoppingCart },
    { label: 'Giải pháp', href: '/solutions', icon: Layers },
    { label: 'Dự án', href: '/projects', icon: FolderGit2 },
    { label: 'Blog', href: '/blog', icon: FileText },
    { label: 'Giới thiệu', href: '/about', icon: Info },
    { label: 'Liên hệ', href: '/contact', icon: Phone },
  ];

  const productItems = [
    { name: '2HT E-Commerce', slug: '2ht-ecommerce', desc: 'Bán hàng đa kênh & Shopee Sync', icon: ShoppingCart, color: 'text-cyan-600 bg-cyan-50' },
    { name: '2HT Residence', slug: '2ht-residence', desc: 'Quản lý cư dân & VietQR tự động', icon: Building2, color: 'text-blue-600 bg-blue-50' },
    { name: '2HT Business', slug: '2ht-business', desc: 'Quản trị ERP & e-Approval', icon: Briefcase, color: 'text-indigo-600 bg-indigo-50' },
    { name: '2HT Sales', slug: '2ht-sales', desc: 'CRM bán hàng & phễu Deal', icon: TrendingUp, color: 'text-amber-600 bg-amber-50' },
    { name: '2HT HRM', slug: '2ht-hrm', desc: 'Nhân sự & FaceID GPS', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
    { name: '2HT Finance', slug: '2ht-finance', desc: 'Dòng tiền Cashflow & Cảnh báo nợ', icon: DollarSign, color: 'text-teal-600 bg-teal-50' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Backdrop for mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 right-0 z-40 flex flex-col items-center pointer-events-none transition-all duration-300">
        {/* Main Navigation Bar */}
        <div
          className={`pointer-events-auto w-full transition-all duration-500 ${
            isScrolled
              ? 'mt-2.5 sm:mt-4 w-[95%] max-w-6xl rounded-2xl bg-white/95 backdrop-blur-2xl shadow-[0_16px_50px_-12px_rgba(15,23,42,0.12)] px-4 sm:px-6 py-2.5 border border-slate-200/80 ring-1 ring-slate-900/[0.04]'
              : 'bg-white/90 backdrop-blur-md border-b border-slate-200/70 px-4 sm:px-6 lg:px-8 py-3'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
            {/* Left: Brand Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <img
                src="/logo-transparent.png"
                alt="2HT Information Technology"
                className="h-8 sm:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-shrink-0">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                if (link.isDropdown) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={handleMouseEnterProducts}
                      onMouseLeave={handleMouseLeaveProducts}
                    >
                      <Link
                        to={link.href}
                        className={`px-3 py-1.5 rounded-xl text-[13px] xl:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                          active
                            ? 'text-cyan-700 bg-cyan-50 border border-cyan-200/80 shadow-xs font-semibold'
                            : 'text-slate-700 hover:text-cyan-600 hover:bg-slate-100/80'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                            productsDropdownOpen ? 'rotate-180 text-cyan-600' : ''
                          }`}
                        />
                      </Link>

                      {/* Desktop Dropdown Menu */}
                      <AnimatePresence>
                        {productsDropdownOpen && (
                          <div className="absolute top-full -left-16 sm:-left-20 pt-2 z-50">
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.98 }}
                              transition={{ duration: 0.2 }}
                              className="w-[660px] max-w-[90vw] bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-5 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.18)]"
                            >
                              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" /> Hệ sinh thái 6 phần mềm 2HT
                                </span>
                                <Link
                                  to="/products"
                                  className="text-xs text-primary font-semibold hover:text-cyan-600 hover:underline flex items-center gap-1 transition-colors"
                                >
                                  Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                {productItems.map((p) => {
                                  const Icon = p.icon;
                                  return (
                                    <Link
                                      key={p.slug}
                                      to={`/products/${p.slug}`}
                                      className="p-3.5 rounded-xl bg-slate-50/70 hover:bg-white border border-slate-100 hover:border-cyan-500/40 hover:shadow-md transition-all flex items-start gap-3.5 group"
                                    >
                                      <div className={`p-2.5 rounded-xl ${p.color} mt-0.5 flex-shrink-0 shadow-xs group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-5 h-5" />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <div className="text-[13px] font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">
                                          {p.name}
                                        </div>
                                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                          {p.desc}
                                        </div>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-3 py-1.5 rounded-xl text-[13px] xl:text-sm font-medium whitespace-nowrap transition-all ${
                      active
                        ? 'text-cyan-700 bg-cyan-50 border border-cyan-200/80 shadow-xs font-semibold'
                        : 'text-slate-700 hover:text-cyan-600 hover:bg-slate-100/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Search */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-cyan-600 hover:border-cyan-400 hover:bg-cyan-50/50 transition-all shadow-xs"
                aria-label="Tìm kiếm"
                title="Tìm kiếm (Ctrl+K)"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* CTA Consultation Button */}
              <div className="hidden sm:block">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => (window.location.href = '/contact')}
                >
                  Tư vấn ngay
                </Button>
              </div>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-xl border transition-all lg:hidden shadow-xs ${
                  mobileMenuOpen
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
                }`}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer - FULL WIDTH EXPANDED */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-auto lg:hidden w-[95%] max-w-lg mt-2 rounded-2xl bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-2xl p-4 sm:p-5 max-h-[82vh] overflow-y-auto"
            >
              {/* Top Drawer Info */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" /> Menu Điều hướng
                </span>
                <span className="text-[11px] text-slate-500">2HT Technology</span>
              </div>

              <div className="space-y-1.5">
                {/* 1. Trang chu */}
                <Link
                  to="/"
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive('/')
                      ? 'bg-cyan-50 text-cyan-700 border border-cyan-200/80 shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Home className="w-4 h-4 text-cyan-600" />
                  <span>Trang chủ</span>
                </Link>

                {/* 2. San pham Accordion */}
                <div className="rounded-xl border border-slate-200/80 overflow-hidden bg-slate-50/60">
                  <div
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="flex items-center justify-between px-3.5 py-2.5 cursor-pointer hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                      <ShoppingCart className="w-4 h-4 text-cyan-600" />
                      <span>Hệ sinh thái Sản phẩm</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        mobileProductsOpen ? 'rotate-180 text-cyan-600' : ''
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-white border-t border-slate-200/80 px-2 py-2 space-y-1"
                      >
                        {productItems.map((p) => {
                          const Icon = p.icon;
                          return (
                            <Link
                              key={p.slug}
                              to={`/products/${p.slug}`}
                              className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-cyan-600 transition-colors"
                            >
                              <div className={`p-1.5 rounded-lg ${p.color} shrink-0`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-bold leading-tight">{p.name}</div>
                                <div className="text-[10px] text-slate-500 truncate">{p.desc}</div>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            </Link>
                          );
                        })}

                        <Link
                          to="/products"
                          className="flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold text-cyan-600 hover:underline border-t border-slate-100 mt-1"
                        >
                          <span>Xem toàn bộ 6 sản phẩm</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Giai phap */}
                <Link
                  to="/solutions"
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive('/solutions')
                      ? 'bg-cyan-50 text-cyan-700 border border-cyan-200/80 shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <div className="flex-1 flex items-center justify-between">
                    <span>Giải pháp công nghệ</span>
                    <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-mono">
                      ERP & Cloud
                    </span>
                  </div>
                </Link>

                {/* 4. Du an */}
                <Link
                  to="/projects"
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive('/projects')
                      ? 'bg-cyan-50 text-cyan-700 border border-cyan-200/80 shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <FolderGit2 className="w-4 h-4 text-amber-600" />
                  <span>Dự án tiêu biểu</span>
                </Link>

                {/* 5. Blog */}
                <Link
                  to="/blog"
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive('/blog')
                      ? 'bg-cyan-50 text-cyan-700 border border-cyan-200/80 shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Bài viết & Tin tức</span>
                </Link>

                {/* 6. Gioi thieu */}
                <Link
                  to="/about"
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive('/about')
                      ? 'bg-cyan-50 text-cyan-700 border border-cyan-200/80 shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Info className="w-4 h-4 text-slate-600" />
                  <span>Về chúng tôi</span>
                </Link>

                {/* 7. Lien he */}
                <Link
                  to="/contact"
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive('/contact')
                      ? 'bg-cyan-50 text-cyan-700 border border-cyan-200/80 shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Phone className="w-4 h-4 text-rose-600" />
                  <span>Liên hệ & Báo giá</span>
                </Link>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-3 border-t border-slate-200 space-y-2.5">
                <Button
                  size="md"
                  variant="primary"
                  fullWidth
                  onClick={() => (window.location.href = '/contact')}
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  Yêu cầu tư vấn giải pháp
                </Button>

                <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Hotline kỹ thuật: <strong className="text-slate-800">0383 717 785</strong></span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};
