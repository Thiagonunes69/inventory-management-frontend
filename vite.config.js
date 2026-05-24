import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0"
  },

  preview: {
    host: "0.0.0.0",
    allowedHosts: [
      "inventory-management-frontend-production-4499.up.railway.app"
    ]
  }
})