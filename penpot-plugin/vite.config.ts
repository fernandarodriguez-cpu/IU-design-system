import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.ts'),
        index: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: '[name]-v030.js',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
