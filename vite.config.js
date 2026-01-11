import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/sign-up': 'http://localhost:8080',
      '/login': 'http://localhost:8080',
      '/create-task': 'http://localhost:8080',
      '/All-Task': 'http://localhost:8080',
      '/update-task': 'http://localhost:8080',
      '/delete-task': 'http://localhost:8080',
      '/Task': 'http://localhost:8080',
    }
  }
})
