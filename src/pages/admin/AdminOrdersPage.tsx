import React, { useState, useMemo } from 'react';
import { orderService } from '../../services/orderService';
import { productService } from '../../services/productService';
import { DemoOrder, OrderStatus } from '../../types/order';
import { Product } from '../../types/product';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Trash2, 
  Eye, 
  Edit,
  Download,
  RotateCcw,
  CheckCircle2,
  Clock,
  XCircle,
  Building,
  User,
  Phone,
  Mail,
  FileSpreadsheet,
  Calendar,
  CreditCard,
  DollarSign,
  Package,
  X
} from 'lucide-react';
import { toast } from 'sonner';

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<DemoOrder[]>(() => orderService.getAll());
  const [products] = useState<Product[]>(() => productService.getAll());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [paymentFilter, setPaymentFilter] = useState<string>('ALL');
  
  // Selection for bulk actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals state
  const [selectedOrder, setSelectedOrder] = useState<DemoOrder | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<DemoOrder | null>(null);

  // Form state for Adding new order
  const [newOrderForm, setNewOrderForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    address: '',
    notes: '',
    productId: products[0]?.id || '',
    quantity: 1,
    paymentMethod: 'demo_bank_transfer' as DemoOrder['paymentMethod'],
    status: 'DEMO_PENDING' as OrderStatus,
  });

  const refreshOrders = () => {
    setOrders(orderService.getAll());
    setSelectedIds([]);
  };

  // Status badge renderer
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'DEMO_COMPLETED':
        return <Badge variant="success" size="sm">Đã hoàn thành</Badge>;
      case 'DEMO_PROCESSING':
        return <Badge variant="accent" size="sm">Đang xử lý</Badge>;
      case 'DEMO_CANCELLED':
        return <Badge variant="warning" size="sm">Đã hủy</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Chờ duyệt (PENDING)</Badge>;
    }
  };

  const getPaymentName = (method: string) => {
    switch (method) {
      case 'demo_bank_transfer':
        return 'Chuyển khoản (VietQR)';
      case 'demo_vnpay_qr':
        return 'VNPay QR';
      case 'demo_corporate_invoice':
        return 'Hóa đơn doanh nghiệp';
      default:
        return method;
    }
  };

  // Filtered orders
  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
      if (paymentFilter !== 'ALL' && o.paymentMethod !== paymentFilter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchId = o.id.toLowerCase().includes(q);
        const matchName = o.customer.fullName.toLowerCase().includes(q);
        const matchPhone = o.customer.phone.toLowerCase().includes(q);
        const matchEmail = o.customer.email.toLowerCase().includes(q);
        const matchCompany = o.customer.company ? o.customer.company.toLowerCase().includes(q) : false;
        const matchItem = o.items.some((it) => it.productName.toLowerCase().includes(q));
        return matchId || matchName || matchPhone || matchEmail || matchCompany || matchItem;
      }
      return true;
    });
  }, [orders, searchTerm, statusFilter, paymentFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = orders.length;
    const completed = orders.filter((o) => o.status === 'DEMO_COMPLETED').length;
    const pending = orders.filter((o) => o.status === 'DEMO_PENDING').length;
    const revenue = orders
      .filter((o) => o.status === 'DEMO_COMPLETED')
      .reduce((sum, o) => sum + o.total, 0);
    return { total, completed, pending, revenue };
  }, [orders]);

  // Handle Quick Status Change
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    orderService.updateStatus(orderId, newStatus);
    refreshOrders();
    toast.success(`Đã cập nhật trạng thái đơn ${orderId}`);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // Handle Delete Single
  const handleDelete = (orderId: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng ${orderId}?`)) {
      orderService.delete(orderId);
      refreshOrders();
      toast.success(`Đã xóa đơn hàng ${orderId}`);
      if (selectedOrder?.id === orderId) setSelectedOrder(null);
      if (editingOrder?.id === orderId) setEditingOrder(null);
    }
  };

  // Handle Bulk Delete
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Xóa ${selectedIds.length} đơn hàng đã chọn?`)) {
      orderService.deleteMany(selectedIds);
      refreshOrders();
      toast.success(`Đã xóa thành công ${selectedIds.length} đơn hàng`);
    }
  };

  // Handle Reset to Default
  const handleReset = () => {
    if (window.confirm('Khôi phục danh sách đơn hàng demo mẫu ban đầu?')) {
      orderService.resetToDefault();
      refreshOrders();
      toast.info('Đã khôi phục dữ liệu đơn hàng mẫu');
    }
  };

  // Handle Create New Order
  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderForm.fullName.trim() || !newOrderForm.phone.trim()) {
      toast.error('Vui lòng điền Họ tên và Số điện thoại');
      return;
    }

    const selectedProduct = products.find((p) => p.id === newOrderForm.productId) || products[0];
    const price = selectedProduct ? selectedProduct.basePrice : 15000000;
    const subtotal = price * Number(newOrderForm.quantity);
    const total = subtotal;

    orderService.createOrder({
      customer: {
        fullName: newOrderForm.fullName.trim(),
        phone: newOrderForm.phone.trim(),
        email: newOrderForm.email.trim() || 'demo@2ht.vn',
        company: newOrderForm.company.trim() || undefined,
        address: newOrderForm.address.trim() || undefined,
        notes: newOrderForm.notes.trim() || undefined,
      },
      items: [
        {
          productId: selectedProduct ? selectedProduct.id : 'demo-product',
          productName: selectedProduct ? selectedProduct.name : 'Giải pháp phần mềm 2HT',
          productSlug: selectedProduct ? selectedProduct.slug : '2ht-product',
          price: price,
          quantity: Number(newOrderForm.quantity),
          mockupType: selectedProduct?.mockupType || 'business',
        },
      ],
      subtotal,
      discount: 0,
      total,
      paymentMethod: newOrderForm.paymentMethod,
      status: newOrderForm.status,
      isDemoNoticeAcknowledged: true,
    });

    refreshOrders();
    setIsAddModalOpen(false);
    toast.success('Thêm mới đơn hàng thành công!');
    // Reset form
    setNewOrderForm({
      fullName: '',
      phone: '',
      email: '',
      company: '',
      address: '',
      notes: '',
      productId: products[0]?.id || '',
      quantity: 1,
      paymentMethod: 'demo_bank_transfer',
      status: 'DEMO_PENDING',
    });
  };

  // Handle Save Edit
  const handleUpdateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;

    orderService.update(editingOrder.id, {
      customer: editingOrder.customer,
      status: editingOrder.status,
      paymentMethod: editingOrder.paymentMethod,
      total: editingOrder.total,
    });

    refreshOrders();
    setEditingOrder(null);
    toast.success(`Cập nhật đơn hàng ${editingOrder.id} thành công!`);
  };

  // Handle Export to CSV (Excel)
  const handleExportCSV = () => {
    if (filtered.length === 0) {
      toast.warning('Không có đơn hàng nào để xuất báo cáo');
      return;
    }

    const headers = [
      'Mã Đơn Hàng',
      'Khách Hàng',
      'Số Điện Thoại',
      'Email',
      'Doanh Nghiệp',
      'Địa Chỉ',
      'Sản Phẩm',
      'Số Lượng',
      'Tổng Tiền (VNĐ)',
      'Phương Thức Thanh Toán',
      'Trạng Thái',
      'Ngày Tạo'
    ];

    const rows = filtered.map((o) => [
      `"${o.id}"`,
      `"${o.customer.fullName.replace(/"/g, '""')}"`,
      `"${o.customer.phone}"`,
      `"${o.customer.email}"`,
      `"${(o.customer.company || '').replace(/"/g, '""')}"`,
      `"${(o.customer.address || '').replace(/"/g, '""')}"`,
      `"${o.items.map((it) => it.productName).join('; ').replace(/"/g, '""')}"`,
      `"${o.items.reduce((sum, it) => sum + it.quantity, 0)}"`,
      `"${o.total}"`,
      `"${getPaymentName(o.paymentMethod)}"`,
      `"${o.status}"`,
      `"${new Date(o.createdAt).toLocaleString('vi-VN')}"`
    ]);

    // CSV format with UTF-8 BOM so Excel opens Vietnamese characters correctly
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Bao_Cao_Don_Hang_2HT_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Đã xuất báo cáo ${filtered.length} đơn hàng thành công!`);
  };

  // Toggle select all
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filtered.map((o) => o.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Toggle select single
  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <ShoppingCart className="w-7 h-7 text-cyan-600" />
            Quản lý Đơn hàng
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Theo dõi, cập nhật trạng thái đơn hàng, xuất báo cáo tài chính và chuyển đổi số.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            title="Khôi phục danh sách đơn demo"
          >
            Khôi phục mẫu
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={handleExportCSV}
            icon={<FileSpreadsheet className="w-4 h-4 text-emerald-600" />}
            title="Xuất danh sách ra file Excel / CSV"
          >
            Xuất báo cáo ({filtered.length})
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Thêm đơn hàng
          </Button>
        </div>
      </div>

      {/* 2. Top Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tổng đơn hàng</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{stats.total}</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">Đã hoàn thành</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{stats.completed}</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">Đang chờ xử lý</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{stats.pending}</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-cyan-600 uppercase tracking-wider">Doanh thu hoàn thành</div>
          <div className="text-xl sm:text-2xl font-black text-cyan-600 mt-1">
            {stats.revenue.toLocaleString('vi-VN')} đ
          </div>
        </div>
      </div>

      {/* 3. Search and Filters Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo mã đơn (VD: 2HT-ORD-xxxx), tên khách, SĐT, công ty hoặc sản phẩm..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-9 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-cyan-500 focus:bg-white w-full md:w-48"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="DEMO_PENDING">Chờ duyệt (PENDING)</option>
            <option value="DEMO_PROCESSING">Đang xử lý (PROCESSING)</option>
            <option value="DEMO_COMPLETED">Đã hoàn thành (COMPLETED)</option>
            <option value="DEMO_CANCELLED">Đã hủy (CANCELLED)</option>
          </select>

          {/* Payment Method Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-cyan-500 focus:bg-white w-full md:w-52"
          >
            <option value="ALL">Mọi phương thức thanh toán</option>
            <option value="demo_bank_transfer">Chuyển khoản (VietQR)</option>
            <option value="demo_vnpay_qr">VNPay QR</option>
            <option value="demo_corporate_invoice">Hóa đơn doanh nghiệp</option>
          </select>
        </div>

        {/* Bulk Action Bar if items selected */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between p-2.5 bg-cyan-50 border border-cyan-200 rounded-xl text-xs text-cyan-900">
            <span>Đang chọn <strong>{selectedIds.length}</strong> đơn hàng</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Xóa các đơn đã chọn
              </button>
              <button
                onClick={() => setSelectedIds([])}
                className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium"
              >
                Bỏ chọn
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Orders Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={filtered.length > 0 && selectedIds.length === filtered.length}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                  />
                </th>
                <th className="p-4">Mã đơn & Ngày</th>
                <th className="p-4">Khách hàng & Doanh nghiệp</th>
                <th className="p-4">Sản phẩm & Giải pháp</th>
                <th className="p-4">Tổng tiền</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <Package className="w-10 h-10 mx-auto mb-2 text-slate-300 stroke-[1.5]" />
                    <span>Không tìm thấy đơn hàng nào phù hợp với bộ lọc</span>
                  </td>
                </tr>
              ) : (
                filtered.map((order) => {
                  const isSelected = selectedIds.includes(order.id);
                  return (
                    <tr
                      key={order.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isSelected ? 'bg-cyan-50/40' : ''
                      }`}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(order.id)}
                          className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                        />
                      </td>
                      <td className="p-4">
                        <span className="font-mono font-bold text-slate-900 block">{order.id}</span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{order.customer.fullName}</div>
                        <div className="text-[11px] text-cyan-700 font-medium">
                          {order.customer.company || 'Cá nhân / Doanh nghiệp'}
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{order.customer.phone}</span>
                          <span>•</span>
                          <span>{order.customer.email}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          {order.items.map((it, i) => (
                            <div key={i} className="text-slate-700 font-medium flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                              <span className="truncate max-w-[200px]">{it.productName}</span>
                              <span className="text-slate-400 font-mono text-[11px]">(x{it.quantity})</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-extrabold text-slate-900 text-sm block">
                          {order.total.toLocaleString('vi-VN')} đ
                        </span>
                        <span className="text-[10px] text-slate-500 block truncate max-w-[140px]">
                          {getPaymentName(order.paymentMethod)}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                          className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-700 focus:outline-none focus:border-cyan-500 shadow-2xs"
                        >
                          <option value="DEMO_PENDING">Chờ duyệt (PENDING)</option>
                          <option value="DEMO_PROCESSING">Đang xử lý (PROCESSING)</option>
                          <option value="DEMO_COMPLETED">Đã hoàn thành (COMPLETED)</option>
                          <option value="DEMO_CANCELLED">Đã hủy (CANCELLED)</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {/* View details */}
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 transition-colors"
                            title="Xem chi tiết đơn hàng"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit order */}
                          <button
                            onClick={() => setEditingOrder({ ...order })}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                            title="Chỉnh sửa đơn hàng"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Delete order */}
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Xóa đơn hàng"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. MODAL: Thêm đơn hàng mới (Add Order) */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Thêm đơn hàng mới"
        subtitle="Tạo mới đơn đặt mua giải pháp phần mềm cho khách hàng."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Họ và tên khách hàng *</label>
              <input
                type="text"
                required
                value={newOrderForm.fullName}
                onChange={(e) => setNewOrderForm({ ...newOrderForm, fullName: e.target.value })}
                placeholder="VD: Nguyễn Văn An"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Số điện thoại *</label>
              <input
                type="text"
                required
                value={newOrderForm.phone}
                onChange={(e) => setNewOrderForm({ ...newOrderForm, phone: e.target.value })}
                placeholder="VD: 0912 345 678"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Email liên hệ</label>
              <input
                type="email"
                value={newOrderForm.email}
                onChange={(e) => setNewOrderForm({ ...newOrderForm, email: e.target.value })}
                placeholder="VD: an.nguyen@company.vn"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Doanh nghiệp / Tổ chức</label>
              <input
                type="text"
                value={newOrderForm.company}
                onChange={(e) => setNewOrderForm({ ...newOrderForm, company: e.target.value })}
                placeholder="VD: Công ty TNHH SmartRetail"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Địa chỉ giao dịch</label>
            <input
              type="text"
              value={newOrderForm.address}
              onChange={(e) => setNewOrderForm({ ...newOrderForm, address: e.target.value })}
              placeholder="VD: Tòa nhà Landmark 81, P. 22, Bình Thạnh, TP.HCM"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1">Chọn sản phẩm giải pháp *</label>
              <select
                value={newOrderForm.productId}
                onChange={(e) => setNewOrderForm({ ...newOrderForm, productId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.basePrice.toLocaleString('vi-VN')} đ
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Số lượng</label>
              <input
                type="number"
                min={1}
                value={newOrderForm.quantity}
                onChange={(e) => setNewOrderForm({ ...newOrderForm, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Phương thức thanh toán</label>
              <select
                value={newOrderForm.paymentMethod}
                onChange={(e) => setNewOrderForm({ ...newOrderForm, paymentMethod: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
              >
                <option value="demo_bank_transfer">Chuyển khoản (VietQR)</option>
                <option value="demo_vnpay_qr">VNPay QR</option>
                <option value="demo_corporate_invoice">Hóa đơn doanh nghiệp</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Trạng thái đơn</label>
              <select
                value={newOrderForm.status}
                onChange={(e) => setNewOrderForm({ ...newOrderForm, status: e.target.value as OrderStatus })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
              >
                <option value="DEMO_PENDING">Chờ duyệt (DEMO_PENDING)</option>
                <option value="DEMO_PROCESSING">Đang xử lý (DEMO_PROCESSING)</option>
                <option value="DEMO_COMPLETED">Đã hoàn thành (DEMO_COMPLETED)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Ghi chú yêu cầu kỹ thuật</label>
            <textarea
              rows={2}
              value={newOrderForm.notes}
              onChange={(e) => setNewOrderForm({ ...newOrderForm, notes: e.target.value })}
              placeholder="Yêu cầu riêng về tích hợp API, hạ tầng máy chủ..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <Button size="sm" variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
              Hủy
            </Button>
            <Button size="sm" variant="primary" type="submit">
              Xác nhận tạo đơn
            </Button>
          </div>
        </form>
      </Modal>

      {/* 6. MODAL: Chỉnh sửa đơn hàng (Edit Order) */}
      <Modal
        isOpen={!!editingOrder}
        onClose={() => setEditingOrder(null)}
        title={editingOrder ? `Chỉnh sửa đơn hàng: ${editingOrder.id}` : ''}
        subtitle="Cập nhật thông tin khách hàng, trạng thái và tổng tiền thanh toán."
        maxWidth="lg"
      >
        {editingOrder && (
          <form onSubmit={handleUpdateOrder} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Họ và tên khách hàng</label>
                <input
                  type="text"
                  required
                  value={editingOrder.customer.fullName}
                  onChange={(e) =>
                    setEditingOrder({
                      ...editingOrder,
                      customer: { ...editingOrder.customer, fullName: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Số điện thoại</label>
                <input
                  type="text"
                  required
                  value={editingOrder.customer.phone}
                  onChange={(e) =>
                    setEditingOrder({
                      ...editingOrder,
                      customer: { ...editingOrder.customer, phone: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={editingOrder.customer.email}
                  onChange={(e) =>
                    setEditingOrder({
                      ...editingOrder,
                      customer: { ...editingOrder.customer, email: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Tên công ty / Doanh nghiệp</label>
                <input
                  type="text"
                  value={editingOrder.customer.company || ''}
                  onChange={(e) =>
                    setEditingOrder({
                      ...editingOrder,
                      customer: { ...editingOrder.customer, company: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Trạng thái đơn</label>
                <select
                  value={editingOrder.status}
                  onChange={(e) =>
                    setEditingOrder({ ...editingOrder, status: e.target.value as OrderStatus })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
                >
                  <option value="DEMO_PENDING">Chờ duyệt (DEMO_PENDING)</option>
                  <option value="DEMO_PROCESSING">Đang xử lý (DEMO_PROCESSING)</option>
                  <option value="DEMO_COMPLETED">Đã hoàn thành (DEMO_COMPLETED)</option>
                  <option value="DEMO_CANCELLED">Đã hủy (DEMO_CANCELLED)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Phương thức thanh toán</label>
                <select
                  value={editingOrder.paymentMethod}
                  onChange={(e) =>
                    setEditingOrder({ ...editingOrder, paymentMethod: e.target.value as any })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
                >
                  <option value="demo_bank_transfer">Chuyển khoản (VietQR)</option>
                  <option value="demo_vnpay_qr">VNPay QR</option>
                  <option value="demo_corporate_invoice">Hóa đơn doanh nghiệp</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Tổng tiền (VNĐ)</label>
                <input
                  type="number"
                  value={editingOrder.total}
                  onChange={(e) =>
                    setEditingOrder({ ...editingOrder, total: Number(e.target.value) || 0 })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white font-bold text-cyan-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Ghi chú đơn hàng</label>
              <textarea
                rows={2}
                value={editingOrder.customer.notes || ''}
                onChange={(e) =>
                  setEditingOrder({
                    ...editingOrder,
                    customer: { ...editingOrder.customer, notes: e.target.value },
                  })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:border-cyan-500 focus:bg-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <Button size="sm" variant="outline" type="button" onClick={() => setEditingOrder(null)}>
                Hủy
              </Button>
              <Button size="sm" variant="primary" type="submit">
                Lưu thay đổi
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* 7. MODAL: Chi tiết đơn hàng (View Details) */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Chi tiết đơn hàng: ${selectedOrder.id}` : ''}
        subtitle="Thông tin khách hàng, gói sản phẩm và thanh toán."
        maxWidth="lg"
      >
        {selectedOrder && (
          <div className="space-y-5 text-xs">
            {/* Customer Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-cyan-600" /> Thông tin khách hàng
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                <div>Họ tên: <strong className="text-slate-900">{selectedOrder.customer.fullName}</strong></div>
                <div>Điện thoại: <strong className="text-slate-900">{selectedOrder.customer.phone}</strong></div>
                <div>Email: <strong className="text-slate-900">{selectedOrder.customer.email}</strong></div>
                <div>Doanh nghiệp: <strong className="text-slate-900">{selectedOrder.customer.company || '—'}</strong></div>
              </div>
              {selectedOrder.customer.address && (
                <div className="text-slate-600 pt-1">Địa chỉ: {selectedOrder.customer.address}</div>
              )}
              {selectedOrder.customer.notes && (
                <div className="pt-2 text-slate-500 italic border-t border-slate-200">
                  Ghi chú: {selectedOrder.customer.notes}
                </div>
              )}
            </div>

            {/* Items Box */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Package className="w-4 h-4 text-cyan-600" /> Sản phẩm & Gói giải pháp
              </h4>
              {selectedOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-white border border-slate-200 text-slate-700">
                  <div>
                    <div className="font-bold text-slate-900">{it.productName}</div>
                    <div className="text-[11px] text-slate-500">Số lượng: {it.quantity}</div>
                  </div>
                  <div className="font-extrabold text-cyan-600">
                    {it.price > 0 ? `${(it.price * it.quantity).toLocaleString('vi-VN')} đ` : 'Báo giá'}
                  </div>
                </div>
              ))}
            </div>

            {/* Total breakdown */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Tạm tính:</span>
                <span>{selectedOrder.subtotal.toLocaleString('vi-VN')} đ</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Giảm giá ({selectedOrder.promoCode}):</span>
                  <span>-{selectedOrder.discount.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Tổng thanh toán:</span>
                <span className="text-cyan-600 text-base">{selectedOrder.total.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Trạng thái:</span>
                {getStatusBadge(selectedOrder.status)}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const o = selectedOrder;
                    setSelectedOrder(null);
                    setEditingOrder({ ...o });
                  }}
                  icon={<Edit className="w-3.5 h-3.5" />}
                >
                  Chỉnh sửa
                </Button>

                {selectedOrder.status !== 'DEMO_COMPLETED' && (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleStatusChange(selectedOrder.id, 'DEMO_COMPLETED')}
                    icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                  >
                    Duyệt hoàn thành
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
