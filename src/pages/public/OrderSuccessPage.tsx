import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { 
  CheckCircle2, 
  QrCode, 
  ArrowRight, 
  Home, 
  ShoppingBag, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const order = orderService.getById(orderId || '');

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Không tìm thấy đơn hàng</h2>
        <p className="text-slate-500 text-sm">
          Mã đơn hàng không tồn tại trong bộ nhớ thử nghiệm của trình duyệt.
        </p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Trở về trang chủ
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Top Banner */}
      <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Đặt đơn hàng thử nghiệm thành công!
        </h1>

        <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Đơn hàng của bạn đã được ghi nhận vào hệ thống lưu trữ Frontend Demo với mã đơn:{' '}
          <span className="font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-white border border-slate-200">
            {order.id}
          </span>
        </p>

        {/* Demo Warning */}
        <div className="inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-800 px-3.5 py-1.5 rounded-full text-xs text-emerald-300 mt-2">
          <AlertCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Trạng thái: DEMO_PENDING (Mô phỏng thử nghiệm, không thu tiền thật)</span>
        </div>
      </div>

      {/* Simulated QR Code for VNPay / VietQR */}
      {order.paymentMethod === 'demo_vnpay_qr' && (
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 text-center space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center justify-center gap-2">
            <QrCode className="w-4 h-4 text-cyan-400" /> Mã VietQR Demo mô phỏng chuyển khoản
          </h3>
          <p className="text-xs text-slate-500">
            Trong môi trường thực tế, khách hàng quét mã này bằng ứng dụng ngân hàng hoặc ví VNPay để thanh toán tự động.
          </p>

          <div className="w-44 h-44 bg-white p-3 rounded-2xl mx-auto flex flex-col items-center justify-center shadow-md border-2 border-cyan-400/30">
            <div className="w-full h-full border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-800 font-mono text-xs">
              <QrCode className="w-20 h-20 text-slate-900 mb-1" />
              <span className="text-[10px] font-bold text-blue-600">VIETQR DEMO</span>
              <span className="text-[9px] text-slate-600 font-bold">{order.id}</span>
            </div>
          </div>

          <div className="text-xs text-slate-500 space-y-1">
            <div>Số tiền mô phỏng: <strong className="text-cyan-400">{order.total.toLocaleString('vi-VN')} đ</strong></div>
            <div>Nội dung chuyển khoản mô phỏng: <code className="text-cyan-400 font-mono bg-white px-1 py-0.5 rounded border border-slate-200">{order.id}</code></div>
          </div>
        </div>
      )}

      {/* Order Details */}
      <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
          Chi tiết đơn hàng & Khách hàng
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block">Khách hàng:</span>
            <span className="font-semibold text-slate-900 text-sm">{order.customer.fullName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Email liên hệ:</span>
            <span className="text-slate-600">{order.customer.email}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Số điện thoại:</span>
            <span className="text-slate-600">{order.customer.phone}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Doanh nghiệp:</span>
            <span className="text-slate-600">{order.customer.company || 'Doanh nghiệp thử nghiệm'}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
            Sản phẩm đã chọn:
          </span>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-white border border-slate-200">
                <div>
                  <div className="font-bold text-slate-900">{item.productName}</div>
                  <div className="text-slate-500">Số lượng: {item.quantity}</div>
                </div>
                <div className="font-bold text-cyan-400">
                  {item.price > 0 ? `${(item.price * item.quantity).toLocaleString('vi-VN')} đ` : 'Báo giá'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
          <span className="text-slate-500">Tổng giá trị đơn hàng demo:</span>
          <span className="text-xl font-black text-cyan-400">{order.total.toLocaleString('vi-VN')} đ</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Button variant="outline" size="md" onClick={() => navigate('/')} icon={<Home className="w-4 h-4" />}>
          Trang chủ
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/admin/orders')}
          icon={<ExternalLink className="w-4 h-4" />}
          iconPosition="right"
        >
          Xem đơn hàng trong Admin Demo
        </Button>
      </div>
    </div>
  );
};
