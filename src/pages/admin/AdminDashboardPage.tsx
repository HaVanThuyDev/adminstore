import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { productService } from '../../services/productService';
import { consultationService } from '../../services/consultationService';
import { Badge } from '../../components/common/Badge';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  MessageSquare, 
  Users, 
  DollarSign, 
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  FileSignature
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [orders, setOrders] = useState(() => orderService.getAll());
  const [products, setProducts] = useState(() => productService.getAll());
  const [consultations, setConsultations] = useState(() => consultationService.getAll());

  useEffect(() => {
    // Fetch live data from Backend API
    orderService.fetchAll().then((data) => {
      if (Array.isArray(data)) setOrders(data);
    });
    productService.fetchAll().then((data) => {
      if (Array.isArray(data)) setProducts(data);
    });
    consultationService.fetchAll().then((data) => {
      if (Array.isArray(data)) setConsultations(data);
    });
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'DEMO_CANCELLED' ? o.total : 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'DEMO_PENDING').length;
  const newConsultationsCount = consultations.filter((c) => c.status === 'NEW').length;

  const revenueChartData = [
    { month: 'T10/25', revenue: 65, orders: 4 },
    { month: 'T11/25', revenue: 90, orders: 6 },
    { month: 'T12/25', revenue: 140, orders: 9 },
    { month: 'T01/26', revenue: 180, orders: 11 },
    { month: 'T02/26', revenue: 210, orders: 14 },
    { month: 'T03/26', revenue: 290, orders: 19 },
  ];

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'DEMO_COMPLETED':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Hoàn thành</span>;
      case 'DEMO_PROCESSING':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">Đang xử lý</span>;
      case 'DEMO_CANCELLED':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800">Đã hủy</span>;
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">Chờ duyệt</span>;
    }
  };

  return (
    <div className="w-full space-y-7">
      {/* Top Banner Notice */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
            Tổng quan Hệ thống Quản trị 2HT
            <span className="text-[11px] bg-cyan-50 text-cyan-700 border border-cyan-200 px-2.5 py-0.5 rounded-full font-bold">
              BẢNG ĐIỀU HÀNH
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Báo cáo tổng hợp số liệu kinh doanh giải pháp phần mềm, hợp đồng và tiến độ xử lý khách hàng.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/invoices"
            className="text-xs font-bold text-cyan-600 hover:text-cyan-700 bg-cyan-50 hover:bg-cyan-100 px-3 py-1.5 rounded-xl border border-cyan-200/80 transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" /> Hóa đơn VAT
          </Link>
          <Link
            to="/admin/contracts"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl border border-indigo-200/80 transition-colors flex items-center gap-1.5"
          >
            <FileSignature className="w-3.5 h-3.5" /> Hợp đồng CA
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
            <span>Doanh số phần mềm</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {totalRevenue.toLocaleString('vi-VN')} đ
          </div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-2.5">
            <TrendingUp className="w-3.5 h-3.5" /> +24% so với kỳ trước
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
            <span>Hệ sinh thái sản phẩm</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{products.length} gói</div>
          <div className="text-xs text-slate-500 flex items-center gap-1 mt-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Sẵn sàng chuyển giao
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
            <span>Đơn hàng chờ xác nhận</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600">{pendingOrdersCount} đơn</div>
          <div className="text-xs text-slate-500 mt-2.5">Cần đối soát & bàn giao</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
            <span>Yêu cầu tư vấn (Lead)</span>
            <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-cyan-700">{newConsultationsCount} liên hệ</div>
          <div className="text-xs text-slate-500 mt-2.5">Chờ chuyên gia liên hệ lại</div>
        </div>
      </div>

      {/* 2 Recharts Charts (Clean White Background with Modern Palette) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Biểu đồ doanh thu giải pháp (Triệu VNĐ)</h3>
              <p className="text-xs text-slate-500">Tăng trưởng doanh số qua 6 tháng gần nhất</p>
            </div>
            <span className="text-[11px] text-cyan-700 font-bold bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
              Theo tháng
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '1rem',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    color: '#0F172A',
                    fontWeight: 600,
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0891B2" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Bar Chart */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Số lượng hợp đồng phần mềm</h3>
            <p className="text-xs text-slate-500">Số đơn đặt hàng phát sinh theo kỳ</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '1rem',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    color: '#0F172A',
                    fontWeight: 600,
                  }}
                />
                <Bar dataKey="orders" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables: Recent Orders & Recent Consultations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-cyan-600" /> Đơn hàng chuyển giao gần đây
            </h3>
            <Link to="/admin/orders" className="text-xs font-semibold text-cyan-600 hover:underline">
              Xem tất cả →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 bg-slate-50/50">
                  <th className="py-2.5 px-3 font-semibold">Mã đơn</th>
                  <th className="py-2.5 px-3 font-semibold">Doanh nghiệp / Khách hàng</th>
                  <th className="py-2.5 px-3 font-semibold">Giá trị</th>
                  <th className="py-2.5 px-3 font-semibold">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-cyan-700">{order.id}</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{order.customer.fullName}</div>
                      <div className="text-[11px] text-slate-500">{order.customer.company || 'Doanh nghiệp'}</div>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      {order.total.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="py-3 px-3">{getOrderStatusBadge(order.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Consultations */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600" /> Yêu cầu tư vấn mới
            </h3>
            <Link to="/admin/consultations" className="text-xs font-semibold text-indigo-600 hover:underline">
              Xem tất cả →
            </Link>
          </div>

          <div className="space-y-2.5">
            {consultations.slice(0, 4).map((c) => (
              <div key={c.id} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-150 space-y-1.5 text-xs hover:border-cyan-400 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{c.fullName}</span>
                  <span className="text-[11px] font-mono font-semibold text-cyan-700">{c.phone}</span>
                </div>
                <div className="text-slate-600 text-xs line-clamp-1">{c.serviceInterest}</div>
                <div className="text-[11px] text-indigo-600 font-semibold">Ngân sách dự kiến: {c.estimatedBudget}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
