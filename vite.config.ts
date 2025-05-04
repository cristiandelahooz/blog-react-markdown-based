import KumaUI from '@kuma-ui/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    KumaUI({
      wasm: true
    })
  ]
})
