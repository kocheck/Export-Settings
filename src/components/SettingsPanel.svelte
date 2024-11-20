<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { settings } from '../stores/settings';
  import { Button, Switch, SelectMenu, IconButton } from 'figma-plugin-ds-svelte';
  import { showToast } from '../stores/toast';

  export let show = false;

  const themeOptions = [
    { value: 'system', text: 'System' },
    { value: 'light', text: 'Light' },
    { value: 'dark', text: 'Dark' }
  ];

  const previewSizeOptions = [
    { value: 'small', text: 'Small' },
    { value: 'medium', text: 'Medium' },
    { value: 'large', text: 'Large' }
  ];

  async function handleReset() {
    if (confirm('Are you sure you want to reset all settings?')) {
      await settings.reset();
      showToast.success('Settings reset to defaults');
    }
  }
</script>

{#if show}
  <div class="settings-overlay" transition:fade on:click|self={() => show = false}>
    <div class="settings-panel" transition:slide>
      <header class="settings-header">
        <h2>Plugin Settings</h2>
        <IconButton on:click={() => show = false} />
      </header>

      <div class="settings-content">
        <section>
          <h3>General</h3>
          <div class="setting-item">
            <SelectMenu
              label="Default Platform"
              bind:value={$settings.defaultPlatform}
              items={[
                { value: 'iOS', text: 'iOS' },
                { value: 'Android', text: 'Android' },
                { value: 'Web', text: 'Web' }
              ]}
            />
          </div>

          <div class="setting-item">
            <Switch
              bind:checked={$settings.useAdvancedMode}
            >
              Enable Advanced Mode by Default
            </Switch>
          </div>

          <div class="setting-item">
            <Switch
              bind:checked={$settings.autoCloseOnApply}
            >
              Auto-close After Applying
            </Switch>
          </div>
        </section>

        <section>
          <h3>Appearance</h3>
          <div class="setting-item">
            <SelectMenu
              label="Theme"
              bind:value={$settings.theme}
              items={themeOptions}
            />
          </div>

          <div class="setting-item">
            <SelectMenu
              label="Preview Size"
              bind:value={$settings.previewSize}
              items={previewSizeOptions}
            />
          </div>

          <div class="setting-item">
            <Switch
              bind:checked={$settings.showPreviews}
            >
              Show Export Previews
            </Switch>
          </div>
        </section>

        <section>
          <h3>Recent Items</h3>
          <div class="setting-item">
            <label>
              Maximum Recent Items
              <input
                type="number"
                bind:value={$settings.maxRecentItems}
                min="0"
                max="10"
              />
            </label>
          </div>
        </section>

        <div class="settings-actions">
          <Button
            on:click={handleReset}
            variant="secondary"
            destructive
          >
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .settings-overlay {
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

  .settings-panel {
    background: var(--figma-color-bg);
    border-radius: 8px;
    width: 400px;
    max-height: 90vh;
    overflow-y: auto;
  }

  .settings-header {
    padding: 16px;
    border-bottom: 1px solid var(--figma-color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  .settings-content {
    padding: 16px;
  }

  section {
    margin-bottom: 24px;
  }

  h3 {
    margin: 0 0 12px;
    font-size: 14px;
    font-weight: 600;
    color: var(--figma-color-text-secondary);
  }

  .setting-item {
    margin-bottom: 12px;
  }

  .settings-actions {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid var(--figma-color-border);
  }

  input[type="number"] {
    width: 60px;
    padding: 4px 8px;
    border: 1px solid var(--figma-color-border);
    border-radius: 4px;
    margin-left: 8px;
  }
</style>