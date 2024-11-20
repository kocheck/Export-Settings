import type { ExportSetting, ExportPreset } from '../types';

export function isValidSelection(nodes: readonly SceneNode[]): boolean {
  return nodes && nodes.length > 0;
}

export function validateExportSetting(setting: ExportSetting): string[] {
  const errors: string[] = [];

  if (!setting.format) {
    errors.push('Export format is required');
  }

  if (setting.constraint) {
    if (setting.constraint.value <= 0) {
      errors.push('Constraint value must be greater than 0');
    }
    if (!['SCALE', 'WIDTH', 'HEIGHT'].includes(setting.constraint.type)) {
      errors.push('Invalid constraint type');
    }
  }

  return errors;
}

export function validatePreset(preset: ExportPreset): string[] {
  const errors: string[] = [];

  if (!preset.id) errors.push('Preset ID is required');
  if (!preset.name) errors.push('Preset name is required');
  if (!preset.platform) errors.push('Platform is required');
  if (!preset.settings || preset.settings.length === 0) {
    errors.push('Preset must contain at least one export setting');
  }

  // Validate each export setting
  preset.settings.forEach((setting, index) => {
    const settingErrors = validateExportSetting(setting);
    if (settingErrors.length > 0) {
      errors.push(`Export setting ${index + 1}: ${settingErrors.join(', ')}`);
    }
  });

  return errors;
}
