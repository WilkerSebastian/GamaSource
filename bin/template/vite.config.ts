import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        entryFileNames: `public/[name].js`,
        chunkFileNames: `public/[name].js`,
        assetFileNames: `public/assets/[name].[ext]`,
      },
    },
    target: "es6",
    emptyOutDir: true,
    minify: false,
    assetsDir: 'public',
    assetsInlineLimit: 0,
    outDir: 'dist'
  },
  base: "./"
});
