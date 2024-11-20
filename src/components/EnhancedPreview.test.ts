import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import EnhancedPreview from './EnhancedPreview.svelte';
import { createMockNode } from '../test/helpers';

describe('EnhancedPreview', () => {
  const mockSettings = [
    {
      format: 'PNG',
      suffix: '@2x',
      constraint: { type: 'SCALE', value: 2 },
    },
  ];

  const mockNodes = [
    createMockNode({ name: 'Test Node 1' }),
    createMockNode({ name: 'Test Node 2' }),
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render preview items for each node', () => {
    const { getAllByText } = render(EnhancedPreview, {
      props: {
        settings: mockSettings,
        selectedNodes: mockNodes,
      },
    });

    expect(getAllByText(/Test Node/)).toHaveLength(2);
  });

  it('should show loading state while generating previews', () => {
    const { getByText } = render(EnhancedPreview, {
      props: {
        settings: mockSettings,
        selectedNodes: mockNodes,
      },
    });

    expect(getByText('Generating previews...')).toBeInTheDocument();
  });
});
