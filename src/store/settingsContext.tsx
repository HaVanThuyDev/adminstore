import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteSettings } from '../types/settings';
import { settingsService } from '../services/settingsService';
import { toast } from 'sonner';

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    return settingsService.get();
  });

  useEffect(() => {
    // Fetch live settings from MySQL Backend API
    settingsService.fetch().then((liveData) => {
      if (liveData && liveData.brandName) {
        setSettings(liveData);
      }
    });
  }, []);

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = await settingsService.update(newSettings);
    setSettings(updated);
    toast.success('Đã lưu cấu hình hệ thống thành công');
  };

  const resetSettings = () => {
    const reset = settingsService.reset();
    setSettings(reset);
    toast.info('Đã khôi phục cấu hình mặc định');
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
