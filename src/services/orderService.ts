import { DemoOrder, OrderStatus } from '../types/order';
import { initialOrders } from '../data/initialOrders';
import { storage, STORAGE_KEYS } from './storage';

export const orderService = {
  getAll(): DemoOrder[] {
    return storage.get<DemoOrder[]>(STORAGE_KEYS.ORDERS, initialOrders);
  },

  getById(id: string): DemoOrder | undefined {
    return this.getAll().find((o) => o.id === id);
  },

  createOrder(orderData: Omit<DemoOrder, 'id' | 'createdAt' | 'updatedAt' | 'status'>): DemoOrder {
    const list = this.getAll();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: DemoOrder = {
      ...orderData,
      id: `2HT-ORD-${randomSuffix}`,
      status: 'DEMO_PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDemoNoticeAcknowledged: true,
    };
    list.unshift(newOrder);
    storage.set(STORAGE_KEYS.ORDERS, list);
    return newOrder;
  },

  updateStatus(id: string, status: OrderStatus): DemoOrder | null {
    const list = this.getAll();
    const order = list.find((o) => o.id === id);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      storage.set(STORAGE_KEYS.ORDERS, list);
      return order;
    }
    return null;
  },

  delete(id: string): boolean {
    const list = this.getAll().filter((o) => o.id !== id);
    return storage.set(STORAGE_KEYS.ORDERS, list);
  },

  resetToDefault(): void {
    storage.set(STORAGE_KEYS.ORDERS, initialOrders);
  }
};
