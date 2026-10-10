import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../store/cartContext';
import { Button } from '../../components/common/Button';
import { DemoNoticeBadge } from '../../components/common/DemoNoticeBadge';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ChevronRight, 
  Tag, 
  ShieldCheck 
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    discount, 
    total, 
    promoCode, 
    applyPromoCode, 
    removePromoCode 
  } = useCart();
  const navigate = useNavigate();

  const [inputCode, setInputCode] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Giỏ hàng của bạn đang trống</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Bạn chưa chọn sản phẩm nào. Hãy khám phá hệ sinh thái giải pháp phần mềm của 2HT để trải nghiệm quy trình đặt hàng demo.
        </p>
        <div className="pt-2">
          <Button variant="primary" size="lg" onClick={() => navigate('/products')}>
            Khám phá sản phẩm ngay
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-cyan-400 transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-900 font-medium">Giỏ hàng</span>
      </div>

      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Giỏ hàng của bạn</h1>
          <p className="text-xs text-slate-500 mt-1">
            Kiểm tra các gói giải pháp phần mềm đã chọn trước khi tiến hành thanh toán demo.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 p-2 rounded-lg hover:bg-red-500/10 transition-colors font-medium border border-red-500/20"
        >
          <Trash2 className="w-4 h-4" /> Làm rỗng giỏ
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items Table */}
        <div className="lg:col-span-8 bg-[#F8FAFC] border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
          <div className="divide-y divide-slate-200">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.planId || 'def'}`}
                className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <h3 className="text-base font-bold text-slate-900">{item.productName}</h3>
                  {item.planName && (
                    <span className="text-xs text-cyan-400 font-mono block mt-0.5">
                      {item.planName}
                    </span>
                  )}
                  <div className="text-sm font-semibold text-cyan-400 mt-2">
                    {item.price > 0
                      ? `${item.price.toLocaleString('vi-VN')} đ`
                      : 'Liên hệ báo giá'}
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  {item.price > 0 && (
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.planId, item.quantity - 1)
                        }
                        className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-300 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-xs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-mono font-bold text-slate-900 px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.planId, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-300 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="text-right min-w-[120px]">
                    <div className="text-base font-bold text-slate-900">
                      {item.price > 0
                        ? `${(item.price * item.quantity).toLocaleString('vi-VN')} đ`
                        : 'Báo giá'}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.productId, item.planId)}
                    className="text-slate-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                    title="Xóa sản phẩm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary & Coupon */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
              Tóm tắt đơn hàng demo
            </h3>

            {/* Promo Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Mã ưu đãi demo (VD: TECH2026)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Nhập mã giảm giá..."
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 uppercase placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <Button size="sm" variant="outline" type="submit">
                  Áp dụng
                </Button>
              </div>

              {promoCode && (
                <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800 mt-2">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Tag className="w-3.5 h-3.5" /> Đã áp dụng: {promoCode}
                  </span>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-slate-500 hover:text-red-400 text-[11px] underline"
                  >
                    Hủy
                  </button>
                </div>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-3 pt-4 border-t border-slate-200 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Tạm tính:</span>
                <span className="text-slate-900 font-medium">
                  {subtotal.toLocaleString('vi-VN')} đ
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Giảm giá ({promoCode}):</span>
                  <span>-{discount.toLocaleString('vi-VN')} đ</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500">
                <span>VAT (Mô phỏng):</span>
                <span>0 đ (Bao gồm)</span>
              </div>

              <div className="flex justify-between text-lg font-extrabold text-slate-900 pt-4 border-t border-slate-200">
                <span>Tổng cộng demo:</span>
                <span className="text-cyan-400">{total.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

            <Button
              size="lg"
              variant="primary"
              fullWidth
              onClick={() => navigate('/checkout')}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Tiến hành đặt hàng Demo
            </Button>

            <div className="pt-2">
              <DemoNoticeBadge
                variant="subtle"
                message="Đơn hàng mô phỏng thử nghiệm, không thu tiền thật."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
