<script lang="ts">
  import { IconButton, Text } from 'figma-plugin-ds-svelte';
  import type { ExportSetting } from '../types';

  export let settings: ExportSetting[] = [];
  export let selectedNodeCount: number = 0;

  $: totalExports = settings.length * selectedNodeCount;

  function getPreviewText(setting: ExportSetting): string {
    const format = setting.format.toLowerCase();
    const scale = setting.constraint?.value || 1;
    const suffix = setting.suffix || '';
    return `${suffix}${scale}x.${format}`;
  }
</script>

<div class="preview-container">
  <div class="preview-header">
    <Text weight="bold">Export Preview</Text>
    <Text>{selectedNodeCount} items selected</Text>
  </div>

  {#if settings.length > 0}
    <div class="preview-list">
      {#each settings as setting}
        <div class="preview-item">
          <div class="format-badge {setting.format.toLowerCase()}">
            {setting.format}
          </div>
          <Text>{getPreviewText(setting)}</Text>
          {#if setting.constraint}
            <Text class="scale">{setting.constraint.value}x</Text>
          {/if}
        </div>
      {/each}
    </div>
    <div class="preview-footer">
      <Text>Total exports: {totalExports}</Text>
    </div>
  {:else}
    <div class="empty-state">
      <Text>No export settings selected</Text>
    </div>
  {/if}
</div>

<style>
  .preview-container {
    background: var(--figma-color-bg-secondary);
    border-radius: 8px;
    padding: 12px;
    margin: 8px 0;
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .preview-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .preview-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background: var(--figma-color-bg);
    border-radius: 6px;
  }

  .format-badge {
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
  }

  .format-badge.png { background: #E9F3FF; color: #0066FF; }
  .format-badge.jpg { background: #FFE9E9; color: #FF0000; }
  .format-badge.svg { background: #E9FFE9; color: #00AA00; }
  .format-badge.pdf { background: #FFE9F3; color: #AA0055; }

  .scale {
    margin-left: auto;
    color: var(--figma-color-text-secondary);
  }

  .empty-state {
    text-align: center;
    padding: 16px;
    color: var(--figma-color-text-secondary);
  }

  .preview-footer {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--figma-color-border);
    text-align: right;
  }
</style>