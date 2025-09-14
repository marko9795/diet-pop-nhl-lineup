import { Lineup, CustomPop, AppState } from '../types';
import { createEmptyLineup } from './lineup';

const STORAGE_KEYS = {
  LINEUP: 'dietpop_lineup',
  CUSTOM_POPS: 'dietpop_custom_pops',
  APP_SETTINGS: 'dietpop_settings'
} as const;

// Lineup storage
export const saveLineup = (lineup: Lineup): void => {
  try {
    const serialized = JSON.stringify(lineup, (key, value) => {
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    });
    localStorage.setItem(STORAGE_KEYS.LINEUP, serialized);
  } catch (error) {
    console.error('Failed to save lineup:', error);
  }
};

export const loadLineup = (): Lineup => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LINEUP);
    if (!stored) {
      return createEmptyLineup();
    }

    const parsed = JSON.parse(stored, (key, value) => {
      if (key === 'createdAt' || key === 'updatedAt') {
        return new Date(value);
      }
      return value;
    });

    // Validate that it has the correct structure
    if (!parsed.id || !parsed.positions) {
      console.warn('Invalid lineup format, creating new lineup');
      return createEmptyLineup();
    }

    return parsed;
  } catch (error) {
    console.error('Failed to load lineup:', error);
    return createEmptyLineup();
  }
};

// Custom pops storage
export const saveCustomPops = (customPops: CustomPop[]): void => {
  try {
    const serialized = JSON.stringify(customPops, (key, value) => {
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    });
    localStorage.setItem(STORAGE_KEYS.CUSTOM_POPS, serialized);
  } catch (error) {
    console.error('Failed to save custom pops:', error);
  }
};

export const loadCustomPops = (): CustomPop[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_POPS);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored, (key, value) => {
      if (key === 'createdAt') {
        return new Date(value);
      }
      return value;
    });

    // Validate structure
    if (!Array.isArray(parsed)) {
      console.warn('Invalid custom pops format, returning empty array');
      return [];
    }

    return parsed;
  } catch (error) {
    console.error('Failed to load custom pops:', error);
    return [];
  }
};

// Add a single custom pop
export const addCustomPop = (customPop: CustomPop): void => {
  const existing = loadCustomPops();
  existing.push(customPop);
  saveCustomPops(existing);
};

// Remove a custom pop
export const removeCustomPop = (popId: string): void => {
  const existing = loadCustomPops();
  const filtered = existing.filter(pop => pop.id !== popId);
  saveCustomPops(filtered);
};

// Update a custom pop
export const updateCustomPop = (popId: string, updates: Partial<CustomPop>): void => {
  const existing = loadCustomPops();
  const index = existing.findIndex(pop => pop.id === popId);

  if (index !== -1) {
    existing[index] = { ...existing[index], ...updates };
    saveCustomPops(existing);
  }
};

// App settings storage
interface AppSettings {
  theme: 'dark' | 'light';
  autoSave: boolean;
  showLineupStats: boolean;
  preferredView: 'grid' | 'list';
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  autoSave: true,
  showLineupStats: true,
  preferredView: 'grid'
};

export const saveAppSettings = (settings: Partial<AppSettings>): void => {
  try {
    const existing = loadAppSettings();
    const updated = { ...existing, ...settings };
    localStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save app settings:', error);
  }
};

export const loadAppSettings = (): AppSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
    if (!stored) {
      return DEFAULT_SETTINGS;
    }

    const parsed = JSON.parse(stored);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch (error) {
    console.error('Failed to load app settings:', error);
    return DEFAULT_SETTINGS;
  }
};

// Clear all app data
export const clearAllData = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Failed to clear app data:', error);
  }
};

// Export app data as JSON
export const exportAppData = () => {
  try {
    const data = {
      lineup: loadLineup(),
      customPops: loadCustomPops(),
      settings: loadAppSettings(),
      exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `dietpop-lineup-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  } catch (error) {
    console.error('Failed to export app data:', error);
  }
};

// Import app data from JSON
export const importAppData = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);

          // Validate structure
          if (data.lineup) {
            saveLineup(data.lineup);
          }
          if (data.customPops && Array.isArray(data.customPops)) {
            saveCustomPops(data.customPops);
          }
          if (data.settings) {
            saveAppSettings(data.settings);
          }

          resolve(true);
        } catch (error) {
          console.error('Failed to parse imported data:', error);
          reject(false);
        }
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('Failed to read import file:', error);
      reject(false);
    }
  });
};

// Get storage usage info
export const getStorageInfo = () => {
  try {
    const lineup = localStorage.getItem(STORAGE_KEYS.LINEUP);
    const customPops = localStorage.getItem(STORAGE_KEYS.CUSTOM_POPS);
    const settings = localStorage.getItem(STORAGE_KEYS.APP_SETTINGS);

    const sizes = {
      lineup: lineup ? new Blob([lineup]).size : 0,
      customPops: customPops ? new Blob([customPops]).size : 0,
      settings: settings ? new Blob([settings]).size : 0
    };

    const total = Object.values(sizes).reduce((sum, size) => sum + size, 0);

    return {
      ...sizes,
      total,
      totalFormatted: `${(total / 1024).toFixed(2)} KB`
    };
  } catch (error) {
    console.error('Failed to get storage info:', error);
    return { lineup: 0, customPops: 0, settings: 0, total: 0, totalFormatted: '0 KB' };
  }
};