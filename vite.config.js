import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      // Safest tree-shaking: keep all exports from problematic deps
      // Fixes lucide-react ReferenceError where some icons got stripped
      treeshake: 'safest',
      output: {
        manualChunks: {
          'lucide-react': ['lucide-react'],
          framer: ['framer-motion'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['lucide-react', 'framer-motion'],
  },
});