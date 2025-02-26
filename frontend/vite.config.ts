import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  },
  preview: {
    port: 4177
  },
  base: '/load/',
  resolve: {
    alias: {
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  }
})
