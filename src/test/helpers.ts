import { render } from '@testing-library/svelte';
import type { RenderResult } from '@testing-library/svelte';

export function createMockNode(overrides = {}) {
  return {
    id: 'test-node-1',
    name: 'Test Node',
    type: 'RECTANGLE',
    width: 100,
    height: 100,
    exportSettings: [],
    clone: vi.fn(),
    remove: vi.fn(),
    exportAsync: vi.fn(),
    ...overrides,
  };
}

export function setupTest(Component: any, props = {}) {
  return render(Component, { props }) as RenderResult;
}
