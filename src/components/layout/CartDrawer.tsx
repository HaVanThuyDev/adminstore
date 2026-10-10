import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../store/cartContext';
import { Button } from '../common/Button';
import { DemoNoticeBadge } from '../common/DemoNoticeBadge';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    itemCount 
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartDrawerOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-background-secondary border-l border-border shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary-light" />
                  <h3 className="text-lg font-bold text-text-main">
                    Giỏ hàng ({itemCount})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  aria-label="Đóng giỏ hàng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Demo Notice */}
              <div className="px-6 py-2 bg-cyan-500/10 border-b border-cyan-500/20 text-[11px] text-cyan-300">
                Lưu ý: Mọi giao dịch tại đây là mô phỏng demo thử nghiệm nghiệp vụ.
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-4">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium text-slate-700">Giỏ hàng đang trống</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs">
                      Hãy khám phá các giải pháp phần mềm của 2HT và thêm vào giỏ để trải nghiệm quy trình thanh toán demo.
                    </p>
                    <Button
                      size="sm"
                      variant="primary"
                      className="mt-6"
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        navigate('/products');
                      }}
                    >
                      Khám phá sản phẩm
                    </Button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={`${item.productId}-${item.planId || 'default'}`}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex gap-3 relative group"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-slate-900 truncate">
                          {item.productName}
                        </h4>
                        {item.planName && (
                          <div className="text-xs text-primary-light font-mono mt-0.5">
                            {item.planName}
                          </div>
                        )}
                        <div className="text-xs font-bold text-accent mt-2">
                          {item.price > 0
                            ? `${(item.price * item.quantity).toLocaleString('vi-VN')} đ`
                            : 'Liên hệ báo giá'}
                        </div>

                        {/* Quantity Controls */}
                        {item.price > 0 && (
                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.planId, item.quantity - 1)
                              }
                              className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 text-xs transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-semibold text-slate-900 px-1">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.planId, item.quantity + 1)
                              }
                              className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 text-xs transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId, item.planId)}
                        className="text-slate-500 hover:text-red-400 p-1 self-start transition-colors"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border bg-background/90 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Tạm tính:</span>
                    <span className="font-bold text-slate-900 text-base">
                      {subtotal.toLocaleString('vi-VN')} đ
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="md" onClick={handleViewCart}>
                      Xem chi tiết giỏ
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleCheckout}
                      icon={<ArrowRight className="w-4 h-4" />}
                      iconPosition="right"
                    >
                      Đặt hàng Demo
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
