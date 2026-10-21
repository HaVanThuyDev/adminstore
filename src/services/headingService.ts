import { SiteHeading } from '../types/heading';
import { initialHeadings } from '../data/initialHeadings';
import { storage, STORAGE_KEYS } from './storage';
import { apiClient } from './apiClient';

export const headingService = {
  // Đồng bộ nhanh từ localStorage để UI không bị giật
  getAll(): SiteHeading[] {
    return storage.get<SiteHeading[]>(STORAGE_KEYS.HEADINGS, initialHeadings);
  },

  // Gọi trực tiếp API Backend MySQL
  async fetchAll(): Promise<SiteHeading[]> {
    try {
      const data = await apiClient.get<SiteHeading[]>('/headings');
      if (Array.isArray(data) && data.length > 0) {
        storage.set(STORAGE_KEYS.HEADINGS, data);
        return data;
      }
    } catch (e) {
      console.warn('Backend chưa sẵn sàng, dùng cache local');
    }
    return this.getAll();
  },

  getByKey(key: string): string {
    const headings = this.getAll();
    const heading = headings.find((h) => h.key === key);
    return heading?.value || '';
  },

  getByPage(page: string): SiteHeading[] {
    return this.getAll().filter((h) => h.page === page);
  },

  getBySection(section: string): SiteHeading[] {
    return this.getAll().filter((h) => h.section === section);
  },

  async save(heading: SiteHeading): Promise<SiteHeading> {
    const list = this.getAll();
    const index = list.findIndex((h) => h.id === heading.id);
    if (index >= 0) {
      list[index] = { ...heading };
      storage.set(STORAGE_KEYS.HEADINGS, list);
      try {
        await apiClient.put(`/headings/${heading.id}`, heading);
      } catch (e) {}
    } else {
      list.push({ ...heading });
      storage.set(STORAGE_KEYS.HEADINGS, list);
      try {
        await apiClient.post('/headings', heading);
      } catch (e) {}
    }
    return heading;
  },

  async updateValue(id: string, newValue: string): Promise<boolean> {
    const list = this.getAll();
    const item = list.find((h) => h.id === id);
    if (item) {
      item.value = newValue;
      storage.set(STORAGE_KEYS.HEADINGS, list);
      try {
        await apiClient.patch(`/headings/${id}/value`, { value: newValue });
      } catch (e) {}
      return true;
    }
    return false;
  },

  async delete(id: string): Promise<boolean> {
    const list = this.getAll().filter((h) => h.id !== id);
    storage.set(STORAGE_KEYS.HEADINGS, list);
    try {
      await apiClient.delete(`/headings/${id}`);
    } catch (e) {}
    return true;
  },

  resetToDefault(): void {
    storage.set(STORAGE_KEYS.HEADINGS, initialHeadings);
  },
};
