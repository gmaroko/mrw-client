import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  port: process.env.PORT || 5173,
  plugins: [react()],
})