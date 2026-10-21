import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../store/cartContext';
import { useAuth } from '../../store/authContext';
import { orderService } from '../../services/orderService';
import { Button } from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/Input';
import { DemoNoticeBadge } from '../../components/common/DemoNoticeBadge';
import { 
  ChevronRight, 
  ShieldCheck, 
  QrCode, 
  Building, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { toast } from 'sonner';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, discount, total, promoCode, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [company, setCompany] = useState(user?.company || '');
  const [address, setAddress] = useState('Quận 1, TP. Hồ Chí Minh (Demo Address)');
  const [notes, setNotes] = useState('Yêu cầu bản demo kiểm thử và bàn giao tài liệu kỹ thuật.');

  const [paymentMethod, setPaymentMethod] = useState<'demo_vnpay_qr' | 'demo_bank_transfer' | 'demo_corporate_invoice'>('demo_vnpay_qr');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Chưa có sản phẩm nào để thanh toán</h2>
        <p className="text-slate-500 text-sm">Vui lòng chọn sản phẩm vào giỏ hàng trước khi đặt hàng.</p>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Xem danh mục sản phẩm
        </Button>
      </div>
    );
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Vui lòng nhập email hợp lệ';
    if (!phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    setIsSubmitting(true);

    try {
      const createdOrder = await orderService.createOrder({
        customer: {
          fullName,
          email,
          phone,
          company,
          address,
          notes,
        },
        items: items,
        subtotal,
        discount,
        promoCode: promoCode || undefined,
        total,
        paymentMethod,
        isDemoNoticeAcknowledged: true,
      });

      clearCart();
      toast.success('Đặt hàng thành công!', {
        description: `Mã đơn hàng: ${createdOrder.id}`,
      });
      navigate(`/order-success/${createdOrder.id}`);
    } catch (err: any) {
      toast.error('Lỗi khi tạo đơn hàng', { description: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-cyan-400 transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link to="/cart" className="hover:text-cyan-400 transition-colors">
          Giỏ hàng
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-900 font-medium">Thanh toán Demo</span>
      </div>

      {/* Demo Warning Banner */}
      <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/25 p-4 sm:p-5 flex items-start gap-4 text-xs text-cyan-200">
        <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-cyan-300 text-sm">CHẾ ĐỘ THANH TOÁN MÔ PHỎNG (DEMO ONLY)</div>
          <p className="mt-1 leading-relaxed text-cyan-100/90">
            Hệ thống đang hoạt động ở giai đoạn Frontend Demo. Khi nhấn nút đặt hàng, hệ thống sẽ lưu đơn hàng mô phỏng vào <strong>localStorage</strong> của trình duyệt và chuyển trạng thái thành <code>DEMO_PENDING</code>. Không có khoản tiền thật nào bị trừ và không yêu cầu thẻ tín dụng thật.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Customer Information Form */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
              1. Thông tin doanh nghiệp & khách hàng
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Họ và tên người đại diện"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={errors.fullName}
                placeholder="Nguyễn Văn A"
              />
              <Input
                label="Email công việc"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="contact@company.vn"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Số điện thoại"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                placeholder="0909 123 456"
              />
              <Input
                label="Tên doanh nghiệp / Công ty"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Công ty TNHH Giải Pháp Số"
              />
            </div>

            <Input
              label="Địa chỉ trụ sở / văn phòng (Demo)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Địa chỉ doanh nghiệp..."
            />

            <Textarea
              label="Ghi chú thêm về yêu cầu triển khai"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Yêu cầu riêng về số lượng tài khoản, tính năng tùy chỉnh hoặc thời gian bàn giao..."
            />
          </div>

          {/* Payment Method Selector */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
              2. Phương thức thanh toán mô phỏng (Demo)
            </h2>

            <div className="space-y-3">
              {[
                {
                  id: 'demo_vnpay_qr',
                  title: 'Quét mã VietQR / VNPay Demo (Khuyên dùng)',
                  desc: 'Hệ thống sẽ sinh mã QR demo mô phỏng để quét kiểm thử luồng đối soát tự động.',
                  icon: QrCode,
                },
                {
                  id: 'demo_bank_transfer',
                  title: 'Chuyển khoản ngân hàng doanh nghiệp (Demo)',
                  desc: 'Nhận thông tin số tài khoản ủy nhiệm chi thử nghiệm của 2HT.',
                  icon: Building,
                },
                {
                  id: 'demo_corporate_invoice',
                  title: 'Hợp đồng & Hóa đơn VAT điện tử (Demo)',
                  desc: 'Phát hành biên bản thỏa thuận cung cấp phần mềm và xuất hóa đơn thử nghiệm.',
                  icon: CreditCard,
                },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-primary/20 border-cyan-400 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-300'}`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-bold text-slate-900">{m.title}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{m.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Review & Submit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 shadow-xl space-y-6 sticky top-28">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
              Sản phẩm trong đơn ({items.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.planId || 'def'}`}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex-1 pr-3">
                    <div className="font-semibold text-slate-900 truncate">{item.productName}</div>
                    <div className="text-slate-500 font-mono">SL: {item.quantity}</div>
                  </div>
                  <div className="font-bold text-cyan-400">
                    {item.price > 0
                      ? `${(item.price * item.quantity).toLocaleString('vi-VN')} đ`
                      : 'Báo giá'}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-200 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Tạm tính:</span>
                <span className="text-slate-900 font-medium">{subtotal.toLocaleString('vi-VN')} đ</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Giảm giá ({promoCode}):</span>
                  <span>-{discount.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-3 border-t border-slate-200">
                <span>Tổng thanh toán demo:</span>
                <span className="text-cyan-400">{total.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

            <Button
              size="lg"
              variant="primary"
              fullWidth
              type="submit"
              isLoading={isSubmitting}
            >
              Xác nhận & Tạo đơn hàng Demo
            </Button>

            <div className="text-[11px] text-slate-500 text-center leading-relaxed">
              Bằng việc xác nhận, bạn đồng ý trải nghiệm quy trình đơn hàng mô phỏng phục vụ đánh giá năng lực phần mềm 2HT.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
