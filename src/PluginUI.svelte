<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { toasts, showToast } from './stores/toast.ts';
  import Toast from './components/Toast.svelte';
  import Spinner from './components/Spinner.svelte';
  import EnhancedPreview from './components/EnhancedPreview.svelte';
  import SettingsPanel from './components/SettingsPanel.svelte';
  import type { PlatformType, ExportPreset } from './types';
  import { shortcuts } from './utils/shortcuts';
  import { history } from './utils/history';
  import ShortcutsHelp from './components/ShortcutsHelp.svelte';
  import { settings } from './stores/settings';
  import { t, loadLanguage, currentLanguage, isRTL } from './i18n';
  import LanguageSelector from './components/LanguageSelector.svelte';
  import './styles/rtl.css';

  let isLoading = false;
  let error: string | null = null;
  let selectedPlatform: PlatformType | null = null;
  let selectedPreset: ExportPreset | null = null;
  let showShortcuts = false;
  let showSettings = false;

  $: documentDir = $isRTL ? 'rtl' : 'ltr';

  onMount(async () => {
    await settings.init();

    // Apply initial settings
    if ($settings.defaultPlatform) {
      selectedPlatform = $settings.defaultPlatform;
    }

    if ($settings.useAdvancedMode) {
      isAdvancedExportChecked = true;
    }

    // Register keyboard shortcuts
    shortcuts.register({
      key: 'z',
      cmd: true,
      handler: () => handleUndo(),
      description: 'Undo'
    });

    shortcuts.register({
      key: 'z',
      cmd: true,
      shift: true,
      handler: () => handleRedo(),
      description: 'Redo'
    });

    shortcuts.register({
      key: '/',
      cmd: true,
      handler: () => showShortcuts = !showShortcuts,
      description: 'Show/Hide Shortcuts'
    });

    shortcuts.register({
      key: 'Enter',
      cmd: true,
      handler: () => handleApplySettings(),
      description: 'Apply Settings'
    });

    // Cleanup on unmount
    return () => {
      shortcuts.unregister('z');
      shortcuts.unregister('/');
      shortcuts.unregister('Enter');
    };

    // Load initial language
    await loadLanguage($currentLanguage);
  });

  async function handlePresetSelect(event) {
    try {
      isLoading = true;
      error = null;
      selectedPlatform = event.detail;
      selectedPreset = await getPresetForPlatform(selectedPlatform);
      showToast.success(`Loaded ${selectedPlatform} preset`);
    } catch (err) {
      error = err.message;
      showToast.error(err.message);
    } finally {
      isLoading = false;
    }
  }

  async function handleUndo() {
    if (!history.canUndo()) return;

    const previousState = history.undo();
    if (previousState) {
      await applyHistoryState(previousState);
      showToast.info('Undo');
    }
  }

  async function handleRedo() {
    if (!history.canRedo()) return;

    const nextState = history.redo();
    if (nextState) {
      await applyHistoryState(nextState);
      showToast.info('Redo');
    }
  }

  async function applyHistoryState(state: HistoryState) {
    selectedPreset = state.preset;
    // Notify plugin to update selection
    parent.postMessage({
      pluginMessage: {
        type: 'restoreSelection',
        nodeIds: state.selection
      }
    }, '*');
  }

  async function handleApplySettings() {
    if (!selectedPreset) return;

    try {
      isLoading = true;
      error = null;

      // Save current state to history
      history.push({
        preset: selectedPreset,
        selection: figma.currentPage.selection.map(node => node.id)
      });

      parent.postMessage({
        pluginMessage: {
          type: 'applySettings',
          preset: selectedPreset
        }
      }, '*');
    } catch (err) {
      error = err.message;
      showToast.error(err.message);
    } finally {
      isLoading = false;
    }
  }

  // Add to toolbar
  function openSettings() {
    showSettings = true;
  }
</script>
<div
  class="plugin-wrapper"
  dir={documentDir}
  class:rtl={$isRTL}
>
  {#if isLoading}
    <div class="loading-overlay" transition:fade>
      <Spinner size={32} />
    </div>
  {/if}

  <div class="plugin-content" class:is-loading={isLoading}>
    <div class="plugin-content">
      <div class="section">
        <Text weight="bold">{t('export.platform')}</Text>
        <SelectMenu
          on:select={handlePresetSelect}
          items={menuItems}
          placeholder="Select Platform"
          value={selectedPlatform}
        />
      </div>

      {#if selectedPreset}
        <EnhancedPreview
          settings={selectedPreset.settings}
          selectedNodes={figma.currentPage.selection}
        />

        <SettingsPanel
          preset={selectedPreset}
          onSave={handleApplySettings}
          onReset={() => selectedPreset = getPresetForPlatform(selectedPlatform)}
        />
      {/if}

      <div class="section actions">
        <Button
          on:click={() => showCustomPresetForm = true}
          variant="secondary"
        >
          {t('export.createPreset')}
        </Button>
        <Button
          on:click={() => parent.postMessage({ pluginMessage: { type: 'clearSettings' } }, '*')}
          variant="secondary"
          destructive
        >
          {t('export.deletePreset')}
        </Button>
      </div>
    </div>

    {#if error}
      <div class="error-message" transition:slide>
        {error}
      </div>
    {/if}
  </div>

  {#each $toasts as toast (toast.id)}
    <Toast
      type={toast.type}
      message={toast.message}
      duration={toast.duration}
      on:dismiss={() => toasts.remove(toast.id)}
    />
  {/each}

  <div class="toolbar">
    <button
      class="icon-button"
      on:click={() => handleUndo()}
      disabled={!history.canUndo()}
      aria-label="Undo"
    >
      ↩
    </button>
    <button
      class="icon-button"
      on:click={() => handleRedo()}
      disabled={!history.canRedo()}
      aria-label="Redo"
    >
      ↪
    </button>
    <button
      class="icon-button"
      on:click={() => showShortcuts = true}
      aria-label="Show Keyboard Shortcuts"
    >
      ⌨
    </button>
    <button
      class="icon-button"
      on:click={openSettings}
      aria-label="Settings"
    >
      ⚙️
    </button>
  </div>

  <ShortcutsHelp bind:show={showShortcuts} />
  <SettingsPanel bind:show={showSettings} />
</div>

<style>
  .plugin-wrapper {
    position: relative;
    height: 100%;
    padding: 16px;
    background: var(--figma-color-bg);
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(var(--figma-color-bg-rgb), 0.8);
    z-index: 100;
  }

  .plugin-content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
    opacity: 1;
    transition: opacity 0.2s;
  }

  .plugin-content.is-loading {
    opacity: 0.5;
    pointer-events: none;
  }

  .error-message {
    padding: 12px;
    border-radius: 6px;
    background: var(--figma-color-bg-danger);
    color: var(--figma-color-text-onbrand);
  }

  .toolbar {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    gap: 4px;
  }

  .icon-button {
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    background: var(--figma-color-bg-secondary);
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .icon-button:hover {
    opacity: 1;
  }

  .icon-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .theme-dark {
    --figma-color-bg: #2c2c2c;
    --figma-color-text: #ffffff;
    /* Add other dark theme variables */
  }

  .plugin-wrapper.rtl {
    /* RTL specific styles */
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
                 'Arial', sans-serif;
  }

  /* Adjust margins and paddings for RTL */
  :global([dir="rtl"]) .section {
    margin-left: 0;
    margin-right: 16px;
  }

  :global([dir="rtl"]) .button-icon {
    margin-right: 0;
    margin-left: 8px;
  }
</style>
