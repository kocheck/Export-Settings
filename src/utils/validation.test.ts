import { describe, it, expect } from 'vitest';
import {
  validateExportSetting,
  validatePreset,
  isValidSelection,
} from './validation';
import { createMockNode } from '../test/helpers';

describe('validation utils', () => {
  describe('isValidSelection', () => {
    it('should return false for empty selection', () => {
      expect(isValidSelection([])).toBe(false);
    });

    it('should return true for valid selection', () => {
      const nodes = [createMockNode()];
      expect(isValidSelection(nodes)).toBe(true);
    });
  });

  describe('validateExportSetting', () => {
    it('should validate export format', () => {
      const setting = { format: 'PNG', suffix: '@2x' };
      const errors = validateExportSetting(setting);
      expect(errors).toHaveLength(0);
    });

    it('should detect missing format', () => {
      const setting = { suffix: '@2x' } as any;
      const errors = validateExportSetting(setting);
      expect(errors).toContain('Export format is required');
    });

    it('should validate constraint values', () => {
      const setting = {
        format: 'PNG',
        suffix: '@2x',
        constraint: { type: 'SCALE', value: 0 },
      };
      const errors = validateExportSetting(setting);
      expect(errors).toContain(
        'Constraint value must be greater than 0'
      );
    });
  });
});
