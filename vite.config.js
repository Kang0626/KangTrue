import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  publicDir: 'public',
  server: {
    port: 5173,
    open: false,
    host: true,
    watch: {
      ignored: ['**/Downloads/**', '**/caseStudy_01/**', '**/data/**', '**/dataset/**', '**/scripts/**']
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  assetsInclude: ['**/*.splat', '**/*.ply', '**/*.ksplat', '**/*.sog', '**/*.spz']
});
