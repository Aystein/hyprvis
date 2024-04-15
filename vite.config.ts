import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: 'src/lib/index.tsx',
      name: 'MyLib',
      formats: ['es'],
      fileName: (format) => `my-lib.js`,
    },
    rollupOptions: {
      external: /^react/,
    }
  },
})