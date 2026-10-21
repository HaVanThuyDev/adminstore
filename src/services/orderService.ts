import { DemoOrder, OrderStatus } from '../types/order';
import { initialOrders } from '../data/initialOrders';
import { storage, STORAGE_KEYS } from './storage';
import { apiClient } from './apiClient';

export const orderService = {
  getAll(): DemoOrder[] {
    return storage.get<DemoOrder[]>(STORAGE_KEYS.ORDERS, initialOrders);
  },

  async fetchAll(): Promise<DemoOrder[]> {
    try {
      const data = await apiClient.get<DemoOrder[]>('/orders');
      if (Array.isArray(data) && data.length > 0) {
        storage.set(STORAGE_KEYS.ORDERS, data);
        return data;
      }
    } catch (e) {
      console.warn('Backend chưa sẵn sàng, dùng cache local');
    }
    return this.getAll();
  },

  getById(id: string): DemoOrder | undefined {
    return this.getAll().find((o) => o.id === id);
  },

  async createOrder(orderData: Omit<DemoOrder, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { id?: string; status?: OrderStatus }): Promise<DemoOrder> {
    const list = this.getAll();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: DemoOrder = {
      ...orderData,
      id: orderData.id || `2HT-ORD-${randomSuffix}`,
      status: orderData.status || 'DEMO_PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDemoNoticeAcknowledged: true,
    };
    list.unshift(newOrder);
    storage.set(STORAGE_KEYS.ORDERS, list);

    try {
      await apiClient.post('/orders/checkout', {
        customerName: newOrder.customerName,
        customerEmail: newOrder.customerEmail,
        customerPhone: newOrder.customerPhone,
        customerCompany: newOrder.companyName,
        total: newOrder.totalAmount,
        paymentMethod: newOrder.paymentMethod,
        notes: newOrder.notes,
      });
    } catch (e) {}

    return newOrder;
  },

  async update(id: string, data: Partial<DemoOrder>): Promise<DemoOrder | null> {
    const list = this.getAll();
    const index = list.findIndex((o) => o.id === id);
    if (index >= 0) {
      list[index] = {
        ...list[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      storage.set(STORAGE_KEYS.ORDERS, list);

      try {
        await apiClient.patch(`/orders/${id}/status`, {
          status: data.status,
          paymentStatus: data.paymentStatus,
        });
      } catch (e) {}

      return list[index];
    }
    return null;
  },

  async updateStatus(id: string, status: OrderStatus): Promise<DemoOrder | null> {
    return this.update(id, { status });
  },

  delete(id: string): boolean {
    const list = this.getAll().filter((o) => o.id !== id);
    return storage.set(STORAGE_KEYS.ORDERS, list);
  },

  deleteMany(ids: string[]): boolean {
    const idSet = new Set(ids);
    const list = this.getAll().filter((o) => !idSet.has(o.id));
    return storage.set(STORAGE_KEYS.ORDERS, list);
  },

  resetToDefault(): void {
    storage.set(STORAGE_KEYS.ORDERS, initialOrders);
  }
};
