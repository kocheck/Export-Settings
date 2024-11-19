import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'src/main.ts',
        ui: 'src/ui.html',
      },
      output: {
        entryFileNames: '[name].js',
        format: 'iife',
      },
    },
  },
});
