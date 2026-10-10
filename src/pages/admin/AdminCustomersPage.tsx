import React, { useState } from 'react';
import { orderService } from '../../services/orderService';
import { Users, Search, Mail, Phone, Building, ShoppingCart, DollarSign } from 'lucide-react';

export const AdminCustomersPage: React.FC = () => {
  const orders = orderService.getAll();
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique customers from orders
  const customerMap = new Map<string, {
    fullName: string;
    email: string;
    phone: string;
    company?: string;
    orderCount: number;
    totalSpent: number;
    lastOrderDate: string;
  }>();

  orders.forEach((ord) => {
    const key = ord.customer.email.toLowerCase() || ord.customer.fullName;
    const existing = customerMap.get(key);
    if (existing) {
      existing.orderCount += 1;
      existing.totalSpent += ord.total;
    } else {
      customerMap.set(key, {
        fullName: ord.customer.fullName,
        email: ord.customer.email,
        phone: ord.customer.phone,
        company: ord.customer.company,
        orderCount: 1,
        totalSpent: ord.total,
        lastOrderDate: ord.createdAt,
      });
    }
  });

  const customers = Array.from(customerMap.values()).filter((c) =>
    c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.company && c.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-primary-light" />
          Quản lý Khách hàng Doanh nghiệp ({customers.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Dữ liệu khách hàng được tổng hợp từ các đơn đặt hàng và yêu cầu giải pháp thử nghiệm.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm theo tên, email hoặc công ty..."
          className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-primary"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider">
                <th className="p-4">Khách hàng</th>
                <th className="p-4">Doanh nghiệp</th>
                <th className="p-4">Liên hệ</th>
                <th className="p-4">Số đơn hàng</th>
                <th className="p-4">Tổng chi tiêu Demo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{c.fullName}</div>
                    <div className="text-[11px] text-slate-500">{c.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-600 font-medium">{c.company || 'Doanh nghiệp'}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-600 font-mono">{c.phone}</span>
                  </td>
                  <td className="p-4 font-bold text-slate-900">
                    {c.orderCount} đơn
                  </td>
                  <td className="p-4 font-bold text-accent text-sm">
                    {c.totalSpent.toLocaleString('vi-VN')} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
