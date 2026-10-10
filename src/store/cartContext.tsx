import React, { createContext, useContext, useState, useEffect } from 'react';
import { OrderItem } from '../types/order';
import { storage, STORAGE_KEYS } from '../services/storage';
import { toast } from 'sonner';

interface CartContextType {
  items: OrderItem[];
  addToCart: (item: Omit<OrderItem, 'quantity'>, quantity?: number) => void;
  updateQuantity: (productId: string, planId: string | undefined, quantity: number) => void;
  removeFromCart: (productId: string, planId?: string) => void;
  clearCart: () => void;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
  totalItems: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const PROMO_CODES: Record<string, number> = {
  'TECH2026': 0.10, // 10% off
  'WELCOME2HT': 0.15, // 15% off
  'INNOVATION': 0.20, // 20% off
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<OrderItem[]>(() => {
    return storage.get<OrderItem[]>(STORAGE_KEYS.CART, []);
  });

  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    storage.set(STORAGE_KEYS.CART, items);
  }, [items]);

  const addToCart = (newItem: Omit<OrderItem, 'quantity'>, quantity: number = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === newItem.productId && i.planId === newItem.planId
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { ...newItem, quantity }];
      }
    });

    toast.success(`Đã thêm "${newItem.productName}" vào giỏ hàng`, {
      description: 'Bạn có thể xem giỏ hàng hoặc tiếp tục chọn sản phẩm.',
      action: {
        label: 'Xem giỏ hàng',
        onClick: () => setIsCartDrawerOpen(true),
      },
    });
  };

  const updateQuantity = (productId: string, planId: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, planId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.planId === planId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, planId?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && (planId === undefined || i.planId === planId)))
    );
    toast.info('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode('');
    setDiscountPercent(0);
  };

  const applyPromoCode = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    if (PROMO_CODES[upper]) {
      setPromoCode(upper);
      setDiscountPercent(PROMO_CODES[upper]);
      toast.success(`Áp dụng mã ${upper} thành công!`, {
        description: `Giảm giá ${(PROMO_CODES[upper] * 100).toFixed(0)}% cho đơn hàng demo.`,
      });
      return true;
    } else {
      toast.error('Mã giảm giá không hợp lệ', {
        description: 'Thử dùng mã: TECH2026 hoặc WELCOME2HT',
      });
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * discountPercent);
  const total = Math.max(0, subtotal - discount);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        promoCode,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discount,
        total,
        itemCount,
        totalItems: itemCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
