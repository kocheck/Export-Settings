import { vi } from 'vitest';

// Mock Figma API
global.figma = {
  ui: {
    onmessage: vi.fn(),
    postMessage: vi.fn(),
  },
  clientStorage: {
    getAsync: vi.fn(),
    setAsync: vi.fn(),
  },
  notify: vi.fn(),
  closePlugin: vi.fn(),
  currentPage: {
    selection: [],
  },
} as any;

// Mock window.parent for UI messages
global.parent = {
  postMessage: vi.fn(),
} as any;
