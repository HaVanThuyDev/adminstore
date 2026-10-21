import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../store/authContext';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  Sliders, 
  LogOut, 
  Globe, 
  Menu, 
  X,
  ChevronRight,
  ShieldCheck,
  FileText,
  FileSignature,
  Type,
  Newspaper
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // BẢO VỆ ROUTE ADMIN: Nếu chưa đăng nhập hoặc không phải admin thì chặn truy cập
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { label: 'Tổng quan (Dashboard)', href: '/admin', icon: LayoutDashboard },
    { label: 'Quản lý sản phẩm', href: '/admin/products', icon: Package },
    { label: 'Quản lý bài viết', href: '/admin/blogs', icon: Newspaper },
    { label: 'Quản lý tiêu đề', href: '/admin/headings', icon: Type },
    { label: 'Quản lý đơn hàng demo', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Quản lý Hóa đơn VAT', href: '/admin/invoices', icon: FileText },
    { label: 'Hợp đồng điện tử', href: '/admin/contracts', icon: FileSignature },
    { label: 'Yêu cầu tư vấn (Lead)', href: '/admin/consultations', icon: MessageSquare },
    { label: 'Cấu hình hệ thống', href: '/admin/settings', icon: Sliders },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-50 flex text-slate-800 font-sans">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen flex flex-col shadow-2xl lg:shadow-none flex-shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-1/2 -left-32 lg:left-0 hidden lg:flex'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <img
              src="/logo-transparent.png"
              alt="2HT Technology"
              className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]"
            />
            <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/25 font-semibold font-mono">
              PORTAL
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-900 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Nav */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-primary/20 text-cyan-400 border border-primary/30 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Sidebar Bottom Footer */}
        <div className="p-3 border-t border-slate-200 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Xem trang chủ Website
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div className="truncate">
              <div className="font-semibold text-slate-800 truncate">{user?.fullName || 'Quản trị viên'}</div>
              <div className="text-[10px] text-emerald-400">Quyền: Quản trị tối cao (Demo)</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-100 transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-slate-700 font-medium">Bảng điều khiển 2HT</span>
              <ChevronRight className="w-3 h-3 text-slate-500" />
              <span className="text-cyan-400 font-semibold">
                {navItems.find((n) => isActive(n.href))?.label || 'Quản trị'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[11px] text-cyan-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Chế độ Admin Demo: Dữ liệu CRUD cập nhật trực tiếp vào localStorage
            </div>

            <Link
              to="/"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-300 shadow-xs transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              Website
            </Link>
          </div>
        </header>

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
