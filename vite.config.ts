import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';
import preprocess from 'svelte-preprocess';
import path from 'path';

// Create separate configs for UI and code
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
    build: {
      target: 'esnext',
      minify: 'terser',
      cssCodeSplit: false,
      outDir: 'dist',
      rollupOptions: {
        input: isUiBuild ? 'index.html' : 'src/code.ts',
        output: {
          format: 'iife',
          entryFileNames: isUiBuild ? 'ui.js' : 'code.js',
          inlineDynamicImports: true,
        },
      },
      watch: process.env.NODE_ENV === 'development' ? {} : null,
    },
  };
});
