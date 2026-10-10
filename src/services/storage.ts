/**
 * Safe localStorage wrapper with error handling and fallback
 */

export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      if (typeof window === 'undefined') return defaultValue;
      const item = window.localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn(`[Storage] Failed to read key "${key}":`, error);
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): boolean {
    try {
      if (typeof window === 'undefined') return false;
      window.localStorage.setItem(key, JSON.stringify(value));
      // Dispatch custom event for cross-tab or component listeners
      window.dispatchEvent(new CustomEvent(`storage:${key}`, { detail: value }));
      return true;
    } catch (error) {
      console.warn(`[Storage] Failed to write key "${key}":`, error);
      return false;
    }
  },

  remove(key: string): boolean {
    try {
      if (typeof window === 'undefined') return false;
      window.localStorage.removeItem(key);
      window.dispatchEvent(new CustomEvent(`storage:${key}`, { detail: null }));
      return true;
    } catch (error) {
      console.warn(`[Storage] Failed to remove key "${key}":`, error);
      return false;
    }
  },
};

export const STORAGE_KEYS = {
  PRODUCTS: '2ht_products_data_v1',
  ORDERS: '2ht_orders_data_v1',
  CONSULTATIONS: '2ht_consultations_data_v1',
  CART: '2ht_cart_items_v1',
  SETTINGS: '2ht_site_settings_v1',
  AUTH: '2ht_demo_user_auth_v1',
  PROJECTS: '2ht_projects_data_v1',
  BLOGS: '2ht_blogs_data_v1',
};
