<script lang="ts">
  import { SelectMenu } from 'figma-plugin-ds-svelte';
  import { currentLanguage, supportedLanguages, loadLanguage } from '../i18n';
  import type { Language } from '../i18n';

  const languageOptions = Object.entries(supportedLanguages).map(([code, name]) => ({
    value: code,
    text: name
  }));

  async function handleLanguageChange(event: CustomEvent) {
    const newLang = event.detail as Language;
    await loadLanguage(newLang);
  }
</script>

<div class="language-selector">
  <SelectMenu
    label="Language"
    value={$currentLanguage}
    items={languageOptions}
    on:change={handleLanguageChange}
  />
</div>

<style>
  .language-selector {
    margin: 8px 0;
  }
</style>