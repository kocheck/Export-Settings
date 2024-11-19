import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        dev: false,
      },
    }),
    viteSingleFile(),
  ],
  build: {
    target: 'esnext',
    minify: 'terser',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    outDir: 'dist',
    rollupOptions: {
      input: {
        ui: 'index.html',
        code: 'src/code.ts',
      },
      output: {
        format: 'iife',
        entryFileNames: '[name].js',
        inlineDynamicImports: true,
      },
    },
  },
});
