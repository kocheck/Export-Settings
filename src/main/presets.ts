import { Preset, ExportSetting } from '../types';

const createIOSPresets = (): Preset => ({
  id: 'ios-default',
  name: 'iOS Default',
  platform: 'iOS',
  isDefault: true,
  settings: [
    {
      format: 'PNG',
      suffix: '@3x',
      constraint: { type: 'SCALE', value: 3 },
    },
    {
      format: 'PNG',
      suffix: '@2x',
      constraint: { type: 'SCALE', value: 2 },
    },
    {
      format: 'PNG',
      suffix: '@1x',
      constraint: { type: 'SCALE', value: 1 },
    },
  ],
});

const createAndroidPresets = (): Preset => ({
  id: 'android-default',
  name: 'Android Default',
  platform: 'Android',
  isDefault: true,
  settings: [
    {
      format: 'PNG',
      suffix: '/drawable-xxxhdpi',
      constraint: { type: 'SCALE', value: 4 },
    },
    {
      format: 'PNG',
      suffix: '/drawable-xxhdpi',
      constraint: { type: 'SCALE', value: 3 },
    },
    {
      format: 'PNG',
      suffix: '/drawable-xhdpi',
      constraint: { type: 'SCALE', value: 2 },
    },
    {
      format: 'PNG',
      suffix: '/drawable-hdpi',
      constraint: { type: 'SCALE', value: 1.5 },
    },
    {
      format: 'PNG',
      suffix: '/drawable-mdpi',
      constraint: { type: 'SCALE', value: 1 },
    },
  ],
});

export const DEFAULT_PRESETS: Preset[] = [
  createIOSPresets(),
  createAndroidPresets(),
];
