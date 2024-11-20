import type { ExportPreset } from '../types';

export const IOS_PRESET: ExportPreset = {
  id: 'ios-default',
  name: 'iOS Default',
  platform: 'ios',
  settings: [
    {
      format: 'PNG',
      suffix: '@1x',
      constraint: { type: 'SCALE', value: 1 },
    },
    {
      format: 'PNG',
      suffix: '@2x',
      constraint: { type: 'SCALE', value: 2 },
    },
    {
      format: 'PNG',
      suffix: '@3x',
      constraint: { type: 'SCALE', value: 3 },
    },
  ],
};

export const IOS_ADVANCED_PRESET: ExportPreset = {
  id: 'ios-advanced',
  name: 'iOS Advanced',
  platform: 'ios',
  settings: [
    {
      format: 'PDF',
      suffix: '',
      constraint: { type: 'SCALE', value: 1 },
    },
    ...IOS_PRESET.settings,
  ],
};

export const ANDROID_PRESET: ExportPreset = {
  id: 'android-default',
  name: 'Android Default',
  platform: 'android',
  settings: [
    {
      format: 'PNG',
      suffix: 'mdpi',
      constraint: { type: 'SCALE', value: 1 },
    },
    {
      format: 'PNG',
      suffix: 'hdpi',
      constraint: { type: 'SCALE', value: 1.5 },
    },
    {
      format: 'PNG',
      suffix: 'xhdpi',
      constraint: { type: 'SCALE', value: 2 },
    },
    {
      format: 'PNG',
      suffix: 'xxhdpi',
      constraint: { type: 'SCALE', value: 3 },
    },
  ],
};

export const ANDROID_ADVANCED_PRESET: ExportPreset = {
  id: 'android-advanced',
  name: 'Android Advanced',
  platform: 'android',
  settings: [
    {
      format: 'SVG',
      suffix: '',
      constraint: { type: 'SCALE', value: 1 },
    },
    ...ANDROID_PRESET.settings,
  ],
};

export const WEB_PRESET: ExportPreset = {
  id: 'web-default',
  name: 'Web Default',
  platform: 'web',
  settings: [
    {
      format: 'SVG',
      suffix: '',
      constraint: { type: 'SCALE', value: 1 },
    },
    {
      format: 'PNG',
      suffix: '@2x',
      constraint: { type: 'SCALE', value: 2 },
    },
  ],
};

export const WEB_ADVANCED_PRESET: ExportPreset = {
  id: 'web-advanced',
  name: 'Web Advanced',
  platform: 'web',
  settings: [
    ...WEB_PRESET.settings,
    {
      format: 'PNG',
      suffix: '@3x',
      constraint: { type: 'SCALE', value: 3 },
    },
  ],
};
