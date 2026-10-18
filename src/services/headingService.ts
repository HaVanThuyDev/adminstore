import { SiteHeading } from '../types/heading';
import { initialHeadings } from '../data/initialHeadings';
import { storage, STORAGE_KEYS } from './storage';

export const headingService = {
  getAll(): SiteHeading[] {
    return storage.get<SiteHeading[]>(STORAGE_KEYS.HEADINGS, initialHeadings);
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

  save(heading: SiteHeading): SiteHeading {
    const list = this.getAll();
    const index = list.findIndex((h) => h.id === heading.id);
    if (index >= 0) {
      list[index] = { ...heading };
    } else {
      list.push({ ...heading });
    }
    storage.set(STORAGE_KEYS.HEADINGS, list);
    return heading;
  },

  updateValue(id: string, newValue: string): boolean {
    const list = this.getAll();
    const item = list.find((h) => h.id === id);
    if (item) {
      item.value = newValue;
      return storage.set(STORAGE_KEYS.HEADINGS, list);
    }
    return false;
  },

  delete(id: string): boolean {
    const list = this.getAll().filter((h) => h.id !== id);
    return storage.set(STORAGE_KEYS.HEADINGS, list);
  },

  resetToDefault(): void {
    storage.set(STORAGE_KEYS.HEADINGS, initialHeadings);
  },
};
