import { BlogPost } from '../types/blog';
import { initialBlogs } from '../data/initialBlogs';
import { storage, STORAGE_KEYS } from './storage';
import { apiClient } from './apiClient';

export const blogService = {
  getAll(): BlogPost[] {
    return storage.get<BlogPost[]>(STORAGE_KEYS.BLOGS, initialBlogs);
  },

  async fetchAll(): Promise<BlogPost[]> {
    try {
      const data = await apiClient.get<BlogPost[]>('/blogs');
      if (Array.isArray(data) && data.length > 0) {
        storage.set(STORAGE_KEYS.BLOGS, data);
        return data;
      }
    } catch (e) {
      console.warn('Backend chưa sẵn sàng, dùng cache local');
    }
    return this.getAll();
  },

  getBySlug(slug: string): BlogPost | undefined {
    return this.getAll().find((b) => b.slug === slug);
  },

  getById(id: string): BlogPost | undefined {
    return this.getAll().find((b) => b.id === id);
  },

  async save(blog: BlogPost): Promise<BlogPost> {
    const list = this.getAll();
    const index = list.findIndex((b) => b.id === blog.id);
    if (index >= 0) {
      list[index] = { ...blog };
      storage.set(STORAGE_KEYS.BLOGS, list);
      try {
        await apiClient.put(`/blogs/${blog.id}`, blog);
      } catch (e) {}
    } else {
      list.unshift({ ...blog });
      storage.set(STORAGE_KEYS.BLOGS, list);
      try {
        await apiClient.post('/blogs', blog);
      } catch (e) {}
    }
    return blog;
  },

  async delete(id: string): Promise<boolean> {
    const list = this.getAll().filter((b) => b.id !== id);
    storage.set(STORAGE_KEYS.BLOGS, list);
    try {
      await apiClient.delete(`/blogs/${id}`);
    } catch (e) {}
    return true;
  },

  async toggleFeatured(id: string): Promise<boolean> {
    const list = this.getAll();
    const item = list.find((b) => b.id === id);
    if (item) {
      item.isFeatured = !item.isFeatured;
      storage.set(STORAGE_KEYS.BLOGS, list);
      try {
        await apiClient.patch(`/blogs/${id}/toggle-featured`);
      } catch (e) {}
      return true;
    }
    return false;
  },

  resetToDefault(): void {
    storage.set(STORAGE_KEYS.BLOGS, initialBlogs);
  },
};
