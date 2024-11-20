<script lang="ts">
  import { Button, Input, IconButton, Disclosure } from 'figma-plugin-ds-svelte';
  import type { ExportSetting, ExportPreset } from '../types';

  export let onSave: (preset: ExportPreset) => void;
  export let onCancel: () => void;
  export let initialPreset: Partial<ExportPreset> = {};

  let name = initialPreset.name || '';
  let platform = initialPreset.platform || 'Custom';
  let settings: ExportSetting[] = initialPreset.settings || [
    {
      format: 'PNG',
      suffix: '',
      constraint: { type: 'SCALE', value: 1 }
    }
  ];

  function addSetting() {
    settings = [...settings, {
      format: 'PNG',
      suffix: '',
      constraint: { type: 'SCALE', value: 1 }
    }];
  }

  function removeSetting(index: number) {
    settings = settings.filter((_, i) => i !== index);
  }

  function handleSubmit() {
    const preset: ExportPreset = {
      id: initialPreset.id || `custom-${Date.now()}`,
      name,
      platform,
      settings
    };
    onSave(preset);
  }
</script>

<div class="custom-preset-form">
  <div class="form-row">
    <Input
      bind:value={name}
      placeholder="Preset Name"
      required
    />
  </div>

  <Disclosure label="Export Settings">
    {#each settings as setting, i}
      <div class="setting-row">
        <select bind:value={setting.format}>
          <option value="PNG">PNG</option>
          <option value="JPG">JPG</option>
          <option value="SVG">SVG</option>
          <option value="PDF">PDF</option>
        </select>

        <Input
          bind:value={setting.suffix}
          placeholder="Suffix"
        />

        <IconButton
          on:click={() => removeSetting(i)}
          iconName="trash"
        />
      </div>
    {/each}

    <Button
      on:click={addSetting}
      variant="secondary"
    >
      Add Export Setting
    </Button>
  </Disclosure>

  <div class="form-actions">
    <Button
      on:click={handleSubmit}
      variant="primary"
      disabled={!name || settings.length === 0}
    >
      Save Preset
    </Button>
    <Button
      on:click={onCancel}
      variant="secondary"
    >
      Cancel
    </Button>
  </div>
</div>

<style>
  .custom-preset-form {
    padding: 16px;
  }

  .form-row {
    margin-bottom: 16px;
  }

  .setting-row {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    align-items: center;
  }

  .form-actions {
    display: flex;
    gap: 8px;
    margin-top: 16px;
  }
</style>