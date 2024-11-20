import { writable } from 'svelte/store';

export interface PluginSettings {
  defaultPlatform?: string;
  useAdvancedMode?: boolean;
  autoCloseOnApply?: boolean;
  showPreviews?: boolean;
  customPresets?: string[];
  recentlyUsed?: string[];
  theme?: 'light' | 'dark' | 'system';
  previewSize?: 'small' | 'medium' | 'large';
  maxRecentItems?: number;
}

const DEFAULT_SETTINGS: PluginSettings = {
  defaultPlatform: 'iOS',
  useAdvancedMode: false,
  autoCloseOnApply: false,
  showPreviews: true,
  customPresets: [],
  recentlyUsed: [],
  theme: 'system',
  previewSize: 'medium',
  maxRecentItems: 5,
};

function createSettingsStore() {
  const { subscribe, set, update } =
    writable<PluginSettings>(DEFAULT_SETTINGS);

  return {
    subscribe,
    update,
    set,
    async init() {
      try {
        const stored = await figma.clientStorage.getAsync(
          'plugin-settings'
        );
        if (stored) {
          set({ ...DEFAULT_SETTINGS, ...stored });
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    },
    async updateSetting<K extends keyof PluginSettings>(
      key: K,
      value: PluginSettings[K]
    ) {
      update((settings) => {
        const updated = { ...settings, [key]: value };
        figma.clientStorage.setAsync('plugin-settings', updated);
        return updated;
      });
    },
    async reset() {
      set(DEFAULT_SETTINGS);
      await figma.clientStorage.setAsync(
        'plugin-settings',
        DEFAULT_SETTINGS
      );
    },
  };
}

export const settings = createSettingsStore();
