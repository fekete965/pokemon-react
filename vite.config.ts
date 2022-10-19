import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      api: path.resolve(__dirname, 'api'),
      assets: path.resolve(__dirname, 'src', 'assets'),
      context: path.resolve(__dirname, 'src', 'context'),
      components: path.resolve(__dirname, 'src', 'components'),
      models: path.resolve(__dirname, 'models'),
      routes: path.resolve(__dirname, 'src', 'routes'),
      utils: path.resolve(__dirname, 'utils'),
    },
  },
})
