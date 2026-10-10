import { Product } from '../types/product';
import { initialProducts } from '../data/initialProducts';
import { storage, STORAGE_KEYS } from './storage';

export const productService = {
  getAll(): Product[] {
    return storage.get<Product[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
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

  save(product: Product): Product {
    const list = this.getAll();
    const index = list.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      list[index] = { ...product, updatedAt: new Date().toISOString() };
    } else {
      list.unshift({ ...product, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    storage.set(STORAGE_KEYS.PRODUCTS, list);
    return product;
  },

  delete(id: string): boolean {
    const list = this.getAll().filter((p) => p.id !== id);
    return storage.set(STORAGE_KEYS.PRODUCTS, list);
  },

  togglePublish(id: string): boolean {
    const list = this.getAll();
    const item = list.find((p) => p.id === id);
    if (item) {
      item.isPublished = !item.isPublished;
      item.updatedAt = new Date().toISOString();
      return storage.set(STORAGE_KEYS.PRODUCTS, list);
    }
    return false;
  },

  resetToDefault(): void {
    storage.set(STORAGE_KEYS.PRODUCTS, initialProducts);
  }
};
