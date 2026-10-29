import { SiteSettings } from '../types/settings';
import { initialSiteSettings } from '../data/siteSettings';
import { storage, STORAGE_KEYS } from './storage';
import { apiClient } from './apiClient';

let inFlightSettingsFetch: Promise<SiteSettings> | null = null;

export const settingsService = {
  get(): SiteSettings {
    return storage.get<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSiteSettings);
  },

  async fetch(): Promise<SiteSettings> {
    if (inFlightSettingsFetch) {
      return inFlightSettingsFetch;
    }

    inFlightSettingsFetch = (async () => {
      try {
        const data = await apiClient.get<SiteSettings>('/settings');
        if (data && data.brandName) {
          storage.set(STORAGE_KEYS.SETTINGS, data);
          return data;
        }
      } catch (e) {
        console.warn('Backend chưa sẵn sàng, dùng cache local');
      } finally {
        inFlightSettingsFetch = null;
      }
      return this.get();
    })();

    return inFlightSettingsFetch;
  },

  async update(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = this.get();
    const updated = { ...current, ...settings };
    storage.set(STORAGE_KEYS.SETTINGS, updated);

    try {
      await apiClient.put('/settings', updated);
    } catch (e) {}

    return updated;
  },

  reset(): SiteSettings {
    storage.set(STORAGE_KEYS.SETTINGS, initialSiteSettings);
    return initialSiteSettings;
  }
};
