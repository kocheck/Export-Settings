<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import type { ExportSetting } from '../types';
  import { formatExportSize } from '../utils/preview';

  export let settings: ExportSetting[] = [];
  export let selectedNodes: SceneNode[] = [];

  let previews: Map<string, string> = new Map();
  let loading = true;
  let error: string | null = null;

  $: totalExports = settings.length * selectedNodes.length;

  onMount(async () => {
    await loadPreviews();
  });

  async function loadPreviews() {
    loading = true;
    error = null;
    previews.clear();

    try {
      // Request previews from the plugin
      parent.postMessage({
        pluginMessage: {
          type: 'generatePreviews',
          nodeIds: selectedNodes.map(node => node.id)
        }
      }, '*');
    } catch (err) {
      error = err.message;
    }
  }

  // Handle preview data from the plugin
  window.onmessage = (event) => {
    const msg = event.data.pluginMessage;
    if (msg.type === 'previewGenerated') {
      previews.set(msg.nodeId, msg.preview);
      previews = previews; // Trigger reactivity
      loading = false;
    }
  };
</script>

<div class="preview-container">
  <header class="preview-header">
    <h3>Export Preview</h3>
    <span class="preview-count">
      {selectedNodes.length} items selected
    </span>
  </header>

  {#if loading}
    <div class="preview-loading" transition:fade>
      Generating previews...
    </div>
  {:else if error}
    <div class="preview-error" transition:fade>
      {error}
    </div>
  {:else}
    <div class="preview-grid" transition:slide>
      {#each selectedNodes as node (node.id)}
        <div class="preview-item">
          <div class="preview-image">
            {#if previews.has(node.id)}
              <img
                src={previews.get(node.id)}
                alt={`Preview of ${node.name}`}
                width="100"
                height="100"
              />
            {:else}
              <div class="preview-placeholder">
                No preview
              </div>
            {/if}
          </div>
          <div class="preview-info">
            <span class="preview-name">{node.name}</span>
            <div class="export-sizes">
              {#each settings as setting}
                <span class="export-size">
                  {formatExportSize(setting, node.width, node.height)}
                  <span class="export-format">.{setting.format.toLowerCase()}</span>
                </span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <footer class="preview-footer">
      <span>Total exports: {totalExports}</span>
    </footer>
  {/if}
</div>

<style>
  .preview-container {
    background: var(--figma-color-bg-secondary);
    border-radius: 8px;
    padding: 16px;
    margin: 8px 0;
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }

  .preview-count {
    font-size: 12px;
    color: var(--figma-color-text-secondary);
  }

  .preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 16px;
  }

  .preview-item {
    background: var(--figma-color-bg);
    border-radius: 6px;
    overflow: hidden;
  }

  .preview-image {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--figma-color-bg-tertiary);
  }

  .preview-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .preview-placeholder {
    color: var(--figma-color-text-secondary);
    font-size: 12px;
  }

  .preview-info {
    padding: 8px;
  }

  .preview-name {
    font-size: 12px;
    font-weight: 500;
    display: block;
    margin-bottom: 4px;
  }

  .export-sizes {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .export-size {
    font-size: 11px;
    color: var(--figma-color-text-secondary);
    background: var(--figma-color-bg-tertiary);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .export-format {
    color: var(--figma-color-text-brand);
  }

  .preview-footer {
    font-size: 12px;
    color: var(--figma-color-text-secondary);
    text-align: right;
  }

  .preview-loading,
  .preview-error {
    text-align: center;
    padding: 32px;
    color: var(--figma-color-text-secondary);
  }

  .preview-error {
    color: var(--figma-color-text-danger);
  }
</style>