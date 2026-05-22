import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      "inventory-management-frontend-production-975d.up.railway.app"
    ]
  }
})