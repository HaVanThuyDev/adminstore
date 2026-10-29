import { Product } from '../types/product';
import { initialProducts } from '../data/initialProducts';
import { storage, STORAGE_KEYS } from './storage';
import { apiClient } from './apiClient';

let inFlightProductFetch: Promise<Product[]> | null = null;

export const productService = {
  getAll(): Product[] {
    return storage.get<Product[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
  },

  async fetchAll(): Promise<Product[]> {
    if (inFlightProductFetch) {
      return inFlightProductFetch;
    }

    inFlightProductFetch = (async () => {
      try {
        const data = await apiClient.get<Product[]>('/products?all=true');
        if (Array.isArray(data) && data.length > 0) {
          storage.set(STORAGE_KEYS.PRODUCTS, data);
          return data;
        }
      } catch (e) {
        console.warn('Backend chưa sẵn sàng, dùng cache local');
      } finally {
        inFlightProductFetch = null;
      }
      return this.getAll();
    })();

    return inFlightProductFetch;
  },

  getPublished(): Product[] {
    return this.getAll().filter((p) => p.isPublished);
  },

  getBySlug(slug: string): Product | undefined {
    return this.getAll().find((p) => p.slug === slug);
  },

  getById(id: string): Product | undefined {
    return this.getAll().find((p) => p.id === id);
  },

  async save(product: Product): Promise<Product> {
    const list = this.getAll();
    const index = list.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      list[index] = { ...product, updatedAt: new Date().toISOString() };
      storage.set(STORAGE_KEYS.PRODUCTS, list);
      try {
        await apiClient.put(`/products/${product.id}`, product);
      } catch (e) {}
    } else {
      list.unshift({ ...product, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      storage.set(STORAGE_KEYS.PRODUCTS, list);
      try {
        await apiClient.post('/products', product);
      } catch (e) {}
    }
    return product;
  },

  async delete(id: string): Promise<boolean> {
    const list = this.getAll().filter((p) => p.id !== id);
    storage.set(STORAGE_KEYS.PRODUCTS, list);
    try {
      await apiClient.delete(`/products/${id}`);
    } catch (e) {}
    return true;
  },

  async togglePublish(id: string): Promise<boolean> {
    const list = this.getAll();
    const item = list.find((p) => p.id === id);
    if (item) {
      item.isPublished = !item.isPublished;
      item.updatedAt = new Date().toISOString();
      storage.set(STORAGE_KEYS.PRODUCTS, list);
      try {
        await apiClient.patch(`/products/${id}/toggle-publish`);
      } catch (e) {}
      return true;
    }
    return false;
  },

  resetToDefault(): void {
    storage.set(STORAGE_KEYS.PRODUCTS, initialProducts);
  }
};
