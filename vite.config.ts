import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
const env = loadEnv('', process.cwd())
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['esm-dep > cjs-dep']
  },
  server: {
    port: 3000
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
    outDir: 'D:\\folder-build/dist',
    // Thư mục đầu ra của build
    assetsDir: 'assets', // Thư mục chứa các tài sản (hình ảnh, font chữ, ...)
    sourcemap: true // Tạo sourcemap cho mã đầu ra
  },
  define: {
    'process.env.VITE_DEBUG': JSON.stringify(env.VITE_DEBUG)
  }
})
