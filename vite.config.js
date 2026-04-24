import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 如果有代理配置，也在这里添加
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9901',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})