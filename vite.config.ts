import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import removeConsole from 'vite-plugin-remove-console';
import tsconfigPaths from 'vite-tsconfig-paths';
import { qrcode } from 'vite-plugin-qrcode';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), removeConsole(), tsconfigPaths(), qrcode()],
});
