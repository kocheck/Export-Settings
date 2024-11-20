import { describe, it, expect, beforeEach, vi } from 'vitest';
import { settings } from './settings';
import { get } from 'svelte/store';

describe('settings store', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    figma.clientStorage.getAsync.mockReset();
    figma.clientStorage.setAsync.mockReset();
  });

  it('should initialize with default settings', async () => {
    figma.clientStorage.getAsync.mockResolvedValue(null);
    await settings.init();
    const currentSettings = get(settings);

    expect(currentSettings.defaultPlatform).toBe('iOS');
    expect(currentSettings.useAdvancedMode).toBe(false);
  });

  it('should update and persist settings', async () => {
    await settings.updateSetting('defaultPlatform', 'Android');

    expect(figma.clientStorage.setAsync).toHaveBeenCalled();
    const currentSettings = get(settings);
    expect(currentSettings.defaultPlatform).toBe('Android');
  });

  it('should reset settings to defaults', async () => {
    await settings.updateSetting('defaultPlatform', 'Web');
    await settings.reset();

    const currentSettings = get(settings);
    expect(currentSettings.defaultPlatform).toBe('iOS');
  });
});
