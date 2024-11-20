/**
 * Represents an export setting configuration
 * @category Types
 */
export interface ExportSetting {
  /** The format to export (PNG, JPG, SVG, PDF) */
  format: string;

  /** Optional suffix to add to the exported file name */
  suffix?: string;

  /** Constraint settings for the export */
  constraint?: {
    /** Type of constraint (SCALE, WIDTH, HEIGHT) */
    type: 'SCALE' | 'WIDTH' | 'HEIGHT';
    /** Value for the constraint */
    value: number;
  };

  /** SVG-specific export options */
  svgOutlineText?: boolean;
  svgSimplifyStroke?: boolean;
  svgIdAttribute?: boolean;
}

/**
 * Represents a complete export preset configuration
 * @category Types
 */
export interface ExportPreset {
  /** Unique identifier for the preset */
  id: string;

  /** Display name of the preset */
  name: string;

  /** Target platform for the preset */
  platform: string;

  /** Array of export settings */
  settings: ExportSetting[];
}

export type ExportFormat = 'PNG' | 'JPG' | 'SVG' | 'PDF';
export type ConstraintType = 'SCALE' | 'WIDTH' | 'HEIGHT';
export type PlatformType = 'iOS' | 'Android' | 'Web' | 'Custom';

export interface PluginMessage {
  type: 'applySettings' | 'clearSettings' | 'cancel';
  platform?: PlatformType;
  isAdvanced?: boolean;
  name?: string;
}
