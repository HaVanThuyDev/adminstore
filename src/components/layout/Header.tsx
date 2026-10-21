import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../store/cartContext';
import { useAuth } from '../../store/authContext';
import { productService } from '../../services/productService';
import { Product } from '../../types/product';
import { Button } from '../common/Button';
import { SearchModal } from '../common/SearchModal';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
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
  Globe,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { totalItems, setIsCartDrawerOpen } = useCart();
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
    { label: 'Trang chủ', href: '/' },
    { label: 'Sản phẩm', href: '/products', isDropdown: true },
    { label: 'Giải pháp', href: '/solutions' },
    { label: 'Dự án', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Liên hệ', href: '/contact' },
  ];

  const [products, setProducts] = useState<Product[]>(() => productService.getPublished().slice(0, 6));

  useEffect(() => {
    productService.fetchAll().then((all) => {
      if (Array.isArray(all) && all.length > 0) {
        setProducts(all.filter((p) => p.isPublished).slice(0, 6));
      }
    });

    const handleStorage = () => {
      setProducts(productService.getPublished().slice(0, 6));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const getProductIcon = (p: Product) => {
    switch (p.category) {
      case 'ecommerce':
        return { icon: ShoppingCart, color: 'text-cyan-600 bg-cyan-50' };
      case 'management':
        return { icon: Building2, color: 'text-blue-600 bg-blue-50' };
      case 'finance':
        return { icon: DollarSign, color: 'text-teal-600 bg-teal-50' };
      case 'hrm':
        return { icon: Users, color: 'text-emerald-600 bg-emerald-50' };
      case 'website':
        return { icon: Globe, color: 'text-indigo-600 bg-indigo-50' };
      default:
        return { icon: Briefcase, color: 'text-amber-600 bg-amber-50' };
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] flex justify-center pointer-events-none">
        {/* Main Navigation Bar */}
        <div
          className={`pointer-events-auto transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled
              ? 'mt-3 sm:mt-4 w-[95%] max-w-6xl rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-2xl shadow-[0_16px_50px_-12px_rgba(15,23,42,0.12)] px-4 sm:px-6 py-2.5 border-beam-container ring-1 ring-slate-900/[0.04]'
              : 'w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-4 sm:px-6 lg:px-8 py-3.5'
          }`}
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Brand Logo (Transparent Image) */}
              <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
                <img
                  src="/logo-transparent.png"
                  alt="2HT Information Technology"
                  className="h-9 sm:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]"
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

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {productsDropdownOpen && (
                            <div className="absolute top-full -left-16 sm:-left-20 pt-2 z-50">
                              <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="w-[660px] max-w-[90vw] bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-5 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/[0.04]"
                              >
                                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-cyan-500" /> Hệ sinh thái {products.length} giải pháp 2HT
                                  </span>
                                  <Link
                                    to="/products"
                                    className="text-xs text-primary font-semibold hover:text-cyan-600 hover:underline flex items-center gap-1 transition-colors"
                                  >
                                    Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
                                  </Link>
                                </div>

                                <div className="grid grid-cols-2 gap-3 max-h-[380px] overflow-y-auto">
                                  {products.map((p) => {
                                    const { icon: Icon, color } = getProductIcon(p);
                                    return (
                                      <Link
                                        key={p.id}
                                        to={`/products/${p.slug}`}
                                        onClick={() => setProductsDropdownOpen(false)}
                                        className="p-3 rounded-xl bg-slate-50/70 hover:bg-white border border-slate-100 hover:border-cyan-500/40 hover:shadow-md transition-all flex items-start gap-3 group"
                                      >
                                        {p.previewImage ? (
                                          <img
                                            src={p.previewImage}
                                            alt={p.name}
                                            className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200 mt-0.5 group-hover:scale-105 transition-transform shadow-xs"
                                          />
                                        ) : (
                                          <div className={`p-2.5 rounded-xl ${color} mt-0.5 flex-shrink-0 shadow-xs group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-5 h-5" />
                                          </div>
                                        )}
                                        <div className="min-w-0 flex-1">
                                          <div className="text-[13px] font-bold text-slate-800 group-hover:text-cyan-600 transition-colors truncate">
                                            {p.name}
                                          </div>
                                          <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                            {p.tagline || p.description}
                                          </div>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>

                                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/80 px-3.5 py-2.5 rounded-xl border border-slate-150">
                                  <span className="text-slate-600 font-medium">
                                    Cần giải pháp theo yêu cầu riêng?
                                  </span>
                                  <Link
                                    to="/contact"
                                    className="text-cyan-600 font-bold hover:text-cyan-700 hover:underline transition-colors"
                                  >
                                    Tư vấn ngay →
                                  </Link>
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
                  className="p-2 rounded-xl bg-white border border-slate-200/90 text-slate-700 hover:text-cyan-600 hover:border-cyan-500/40 hover:bg-cyan-50/50 transition-all shadow-xs"
                  aria-label="Tìm kiếm"
                  title="Tìm kiếm (Ctrl+K)"
                >
                  <Search className="w-4 h-4" />
                </button>





                {/* CTA Consultation */}
                <div className="hidden sm:block">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => (window.location.href = '/contact')}
                  >
                    Tư vấn ngay
                  </Button>
                </div>

                {/* Mobile Hamburger */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-600 hover:text-slate-900 lg:hidden shadow-xs"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={`pointer-events-auto lg:hidden bg-white/95 backdrop-blur-2xl border border-slate-200/80 px-4 py-5 shadow-2xl ${
                isScrolled ? 'w-[95%] max-w-6xl mt-2 rounded-2xl' : 'w-full border-b'
              }`}
            >
              <div className="space-y-1 mb-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                      isActive(link.href)
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200">
                <Button
                  size="sm"
                  variant="primary"
                  fullWidth
                  onClick={() => (window.location.href = '/contact')}
                >
                  Tư vấn ngay
                </Button>
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
