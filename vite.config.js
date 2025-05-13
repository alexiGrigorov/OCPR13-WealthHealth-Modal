// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Output as a library
    lib: {
      // Entry point to your package
      entry: 'src/index.js',
      // Global name for UMD/IIFE builds (if you ever use them)
      name: 'ModalComponent',
      // File names for each format
      fileName: (format) => `ocpr13-wealthhealth-modal.${format}.js`,
    },
    // Externalize peer deps so they’re not bundled
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables for UMD builds (if you use them)
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
