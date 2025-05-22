import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  server: {
    host: 'localhost', // ou "::" para IPv6
    port: 8080, // Porta padrão alternativa: 5173
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
