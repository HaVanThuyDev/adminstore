import { SiteSettings } from '../types/settings';
import { initialSiteSettings } from '../data/siteSettings';
import { storage, STORAGE_KEYS } from './storage';

export const settingsService = {
  get(): SiteSettings {
    return storage.get<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSiteSettings);
  },

  update(settings: Partial<SiteSettings>): SiteSettings {
    const current = this.get();
    const updated = { ...current, ...settings };
    storage.set(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  reset(): SiteSettings {
    storage.set(STORAGE_KEYS.SETTINGS, initialSiteSettings);
    return initialSiteSettings;
  }
};
