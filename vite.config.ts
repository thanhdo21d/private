import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3100
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  build: {
    target: 'esnext', // Đối tượng JavaScript mục tiêu (browserslist)
    outDir: 'dist', // Thư mục đầu ra của build
    assetsDir: 'assets', // Thư mục chứa các tài sản (hình ảnh, font chữ, ...)
    sourcemap: true // Tạo sourcemap cho mã đầu ra
  }
})
