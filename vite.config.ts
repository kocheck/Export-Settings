import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';
import preprocess from 'svelte-preprocess';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  const isUiBuild = process.env.BUILD_TYPE === 'ui';

  return {
    plugins: [
      ...(isUiBuild
        ? [
            svelte({
              preprocess: preprocess(),
              compilerOptions: {
                dev: process.env.NODE_ENV !== 'production',
              },
            }),
            viteSingleFile(),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      include: ['figma-plugin-ds-svelte'],
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      outDir: 'dist',
      assetsInlineLimit: 100000000,
      chunkSizeWarningLimit: 100000000,
      cssCodeSplit: false,
      brotliSize: false,
      rollupOptions: {
        input: isUiBuild ? 'index.html' : 'src/code.ts',
        output: {
          format: 'iife',
          entryFileNames: isUiBuild ? 'ui.html' : 'code.js',
          inlineDynamicImports: true,
        },
      },
    },
  };
});
