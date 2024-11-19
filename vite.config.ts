import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        dev: false,
        css: 'injected',
      },
    }),
    viteSingleFile(),
  ],
  build: {
    target: 'esnext',
    minify: 'terser',
    cssCodeSplit: false,
    outDir: 'dist',
    rollupOptions: {
      input: {
        ui: 'index.html',
        code: 'src/code.ts',
      },
      output: {
        entryFileNames: '[name].js',
        format: 'iife',
      },
    },
  },
});
