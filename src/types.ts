export type PlatformType = 'ios' | 'android' | 'web';

export interface ExportConstraint {
  type: 'SCALE' | 'WIDTH' | 'HEIGHT';
  value: number;
}

export interface ExportSetting {
  format: string;
  suffix: string;
  constraint?: ExportConstraint;
}

export interface ExportPreset {
  id: string;
  name: string;
  platform: PlatformType;
  settings: ExportSetting[];
}

export interface PluginMessage {
  type: string;
  data?: any;
}
