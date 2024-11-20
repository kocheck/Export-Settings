import 'figma-plugin-ds-svelte/styles/figma-plugin-ds.css';
import App from './PluginUI.svelte';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
