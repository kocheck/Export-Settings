<script lang="ts">
  import { fade } from 'svelte/transition';
  import { shortcuts } from '../utils/shortcuts';

  export let show = false;

  const shortcutList = shortcuts.getShortcuts();
</script>

{#if show}
  <div class="shortcuts-overlay" transition:fade on:click|self={() => show = false}>
    <div class="shortcuts-modal" role="dialog" aria-label="Keyboard Shortcuts">
      <h2>Keyboard Shortcuts</h2>
      <div class="shortcuts-list">
        {#each shortcutList as { key, description }}
          <div class="shortcut-item">
            <kbd>{key}</kbd>
            <span>{description}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .shortcuts-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .shortcuts-modal {
    background: var(--figma-color-bg);
    border-radius: 8px;
    padding: 24px;
    min-width: 320px;
    max-width: 480px;
  }

  h2 {
    margin: 0 0 16px;
    font-size: 16px;
    font-weight: 600;
  }

  .shortcuts-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .shortcut-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  kbd {
    padding: 4px 8px;
    border-radius: 4px;
    background: var(--figma-color-bg-secondary);
    font-family: monospace;
    font-size: 12px;
  }
</style>