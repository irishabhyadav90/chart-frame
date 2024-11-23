import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), tsconfigPaths()],
  resolve: {
    alias: {
      '@pages': '/src/pages',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@api': '/src/api',
      '@utils': '/src/utils',
      '@types-api': '/src/types',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.stlouisfed.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/fred'),
      },
    },
  },
});
