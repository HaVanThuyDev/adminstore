import { BlogPost } from '../types/blog';
import { initialBlogs } from '../data/initialBlogs';
import { storage, STORAGE_KEYS } from './storage';

export const blogService = {
  getAll(): BlogPost[] {
    return storage.get<BlogPost[]>(STORAGE_KEYS.BLOGS, initialBlogs);
  },

  getBySlug(slug: string): BlogPost | undefined {
    return this.getAll().find((b) => b.slug === slug);
  },

  getById(id: string): BlogPost | undefined {
    return this.getAll().find((b) => b.id === id);
  },

  save(blog: BlogPost): BlogPost {
    const list = this.getAll();
    const index = list.findIndex((b) => b.id === blog.id);
    if (index >= 0) {
      list[index] = { ...blog };
    } else {
      list.unshift({ ...blog });
    }
    storage.set(STORAGE_KEYS.BLOGS, list);
    return blog;
  },

  delete(id: string): boolean {
    const list = this.getAll().filter((b) => b.id !== id);
    return storage.set(STORAGE_KEYS.BLOGS, list);
  },

  toggleFeatured(id: string): boolean {
    const list = this.getAll();
    const item = list.find((b) => b.id === id);
    if (item) {
      item.isFeatured = !item.isFeatured;
      return storage.set(STORAGE_KEYS.BLOGS, list);
    }
    return false;
  },

  resetToDefault(): void {
    storage.set(STORAGE_KEYS.BLOGS, initialBlogs);
  },
};
