import React, { useState } from 'react';
import { orderService } from '../../services/orderService';
import { DemoOrder, OrderStatus } from '../../types/order';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  RotateCcw,
  CheckCircle2,
  Clock,
  XCircle,
  Building,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { toast } from 'sonner';

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<DemoOrder[]>(() => orderService.getAll());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<DemoOrder | null>(null);

  const refreshOrders = () => {
    setOrders(orderService.getAll());
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    orderService.updateStatus(orderId, newStatus);
    refreshOrders();
    toast.success(`Đã cập nhật trạng thái đơn ${orderId} thành ${newStatus}`);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleDelete = (orderId: string) => {
    if (window.confirm(`Xóa đơn hàng demo ${orderId}?`)) {
      orderService.delete(orderId);
      refreshOrders();
      toast.info(`Đã xóa đơn ${orderId}`);
      if (selectedOrder?.id === orderId) setSelectedOrder(null);
    }
  };

  const handleReset = () => {
    if (window.confirm('Khôi phục danh sách đơn hàng demo mặc định?')) {
      orderService.resetToDefault();
      refreshOrders();
      toast.info('Đã khôi phục dữ liệu đơn hàng mẫu');
    }
  };

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        (o.customer.company && o.customer.company.toLowerCase().includes(q))
      );
    }
    return true;
  });

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-primary-light" />
            Quản lý Đơn hàng Demo ({orders.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Quản lý các đơn đặt giải pháp phần mềm được khách hàng tạo từ giỏ hàng và thanh toán.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleReset}
          icon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          Khôi phục đơn mẫu
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo mã đơn (VD: 2HT-ORD-1092) hoặc tên khách hàng..."
            className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-primary"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-600 focus:outline-none focus:border-primary w-full sm:w-auto"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="DEMO_PENDING">Chờ duyệt (DEMO_PENDING)</option>
          <option value="DEMO_PROCESSING">Đang xử lý (DEMO_PROCESSING)</option>
          <option value="DEMO_COMPLETED">Đã hoàn thành (DEMO_COMPLETED)</option>
          <option value="DEMO_CANCELLED">Đã hủy (DEMO_CANCELLED)</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider">
                <th className="p-4">Mã đơn</th>
                <th className="p-4">Khách hàng / Doanh nghiệp</th>
                <th className="p-4">Sản phẩm & Số lượng</th>
                <th className="p-4">Tổng tiền</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <span className="font-mono font-bold text-slate-900">{order.id}</span>
                    <span className="text-[10px] text-slate-500 block">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-700">{order.customer.fullName}</div>
                    <div className="text-[11px] text-slate-500">{order.customer.company || 'Doanh nghiệp'}</div>
                    <div className="text-[10px] text-slate-500">{order.customer.phone}</div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-0.5">
                      {order.items.map((it, i) => (
                        <div key={i} className="text-slate-600">
                          {it.productName} <span className="text-slate-500 font-mono">(x{it.quantity})</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-accent">
                    {order.total.toLocaleString('vi-VN')} đ
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-[11px] text-slate-600 focus:outline-none focus:border-primary"
                    >
                      <option value="DEMO_PENDING">DEMO_PENDING</option>
                      <option value="DEMO_PROCESSING">DEMO_PROCESSING</option>
                      <option value="DEMO_COMPLETED">DEMO_COMPLETED</option>
                      <option value="DEMO_CANCELLED">DEMO_CANCELLED</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-100 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Chi tiết đơn hàng: ${selectedOrder.id}` : ''}
        subtitle="Thông tin khách hàng, gói sản phẩm và thanh toán demo."
        maxWidth="xl"
      >
        {selectedOrder && (
          <div className="space-y-6 text-xs">
            {/* Customer Box */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm mb-2">Thông tin khách hàng</h4>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>Họ tên: <strong className="text-slate-900">{selectedOrder.customer.fullName}</strong></div>
                <div>Điện thoại: <strong className="text-slate-900">{selectedOrder.customer.phone}</strong></div>
                <div>Email: <strong className="text-slate-900">{selectedOrder.customer.email}</strong></div>
                <div>Công ty: <strong className="text-slate-900">{selectedOrder.customer.company || '—'}</strong></div>
              </div>
              {selectedOrder.customer.notes && (
                <div className="pt-2 text-slate-500">Ghi chú: {selectedOrder.customer.notes}</div>
              )}
            </div>

            {/* Items Box */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Sản phẩm & Gói dịch vụ</h4>
              {selectedOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between p-3 rounded-lg bg-white border border-slate-200 text-slate-700">
                  <div>
                    <div className="font-bold">{it.productName}</div>
                    <div className="text-[11px] text-slate-500">Số lượng: {it.quantity}</div>
                  </div>
                  <div className="font-bold text-accent">
                    {it.price > 0 ? `${(it.price * it.quantity).toLocaleString('vi-VN')} đ` : 'Báo giá'}
                  </div>
                </div>
              ))}
            </div>

            {/* Total breakdown */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <div className="flex justify-between text-slate-500">
                <span>Tạm tính:</span>
                <span>{selectedOrder.subtotal.toLocaleString('vi-VN')} đ</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Giảm giá ({selectedOrder.promoCode}):</span>
                  <span>-{selectedOrder.discount.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Tổng giá trị đơn:</span>
                <span className="text-accent">{selectedOrder.total.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-slate-500">Cập nhật trạng thái:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleStatusChange(selectedOrder.id, 'DEMO_COMPLETED')}
                >
                  Duyệt hoàn thành
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleStatusChange(selectedOrder.id, 'DEMO_CANCELLED')}
                >
                  Hủy đơn
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
