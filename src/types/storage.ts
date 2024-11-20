import type { ExportPreset } from '../types';

const CUSTOM_PRESETS_KEY = 'lazyExport.customPresets';
const USER_PREFERENCES_KEY = 'lazyExport.preferences';

interface UserPreferences {
  lastUsedPlatform?: string;
  defaultAdvancedMode?: boolean;
  customPresetIds?: string[];
}

export const storage = {
  async getCustomPresets(): Promise<ExportPreset[]> {
    try {
      const data = await figma.clientStorage.getAsync(
        CUSTOM_PRESETS_KEY
      );
      return data || [];
    } catch (error) {
      console.error('Failed to load custom presets:', error);
      return [];
    }
  },

  async saveCustomPreset(preset: ExportPreset): Promise<void> {
    try {
      const presets = await this.getCustomPresets();
      const existingIndex = presets.findIndex(
        (p) => p.id === preset.id
      );

      if (existingIndex >= 0) {
        presets[existingIndex] = preset;
      } else {
        presets.push(preset);
      }

      await figma.clientStorage.setAsync(CUSTOM_PRESETS_KEY, presets);
    } catch (error) {
      throw new Error(
        `Failed to save custom preset: ${error.message}`
      );
    }
  },

  async deleteCustomPreset(presetId: string): Promise<void> {
    try {
      const presets = await this.getCustomPresets();
      const filteredPresets = presets.filter(
        (p) => p.id !== presetId
      );
      await figma.clientStorage.setAsync(
        CUSTOM_PRESETS_KEY,
        filteredPresets
      );
    } catch (error) {
      throw new Error(
        `Failed to delete custom preset: ${error.message}`
      );
    }
  },

  async getUserPreferences(): Promise<UserPreferences> {
    try {
      const prefs = await figma.clientStorage.getAsync(
        USER_PREFERENCES_KEY
      );
      return prefs || {};
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return {};
    }
  },

  async saveUserPreferences(prefs: UserPreferences): Promise<void> {
    try {
      await figma.clientStorage.setAsync(USER_PREFERENCES_KEY, prefs);
    } catch (error) {
      throw new Error(`Failed to save preferences: ${error.message}`);
    }
  },
};
