import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/wp-json': {
        target: 'https://franciscal57.sg-host.com/demosle',
        changeOrigin: true,
        secure: false,
      },
      '/wc-api': {
        target: 'https://franciscal57.sg-host.com/demosle',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
