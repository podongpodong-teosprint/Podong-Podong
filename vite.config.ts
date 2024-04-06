import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import vitePluginSvgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react(), tsconfigPaths(), vitePluginSvgr(), splitVendorChunkPlugin()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            const match = /\/src\/assets\/svgs\/.*\.svg\?react$/.exec(id);
            if (match) {
              return `svgs`;
            }
          },
        },
      },
    },
  };
});