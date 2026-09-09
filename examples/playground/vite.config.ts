import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  // GitHub Pages部署配置
  base: process.env.VITE_BASE_URL || '/',
  
  plugins: [vue()],
  
  resolve: {
    alias: [
      // 样式入口需在包名前匹配，否则会被下面规则误吞
      {
        find: 'vue-mathjax-beautiful/dist/style.css',
        replacement: resolve(__dirname, '../../packages/core/src/styles/index.scss'),
      },
      // 开发模式直接指向包源码，避免依赖未构建的 dist 产物并支持 HMR
      {
        find: 'vue-mathjax-beautiful',
        replacement: resolve(__dirname, '../../packages/core/src/index.ts'),
      },
      { find: '@', replacement: resolve(__dirname, 'src') },
    ],
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // 使用现代编译器API
      }
    }
  },

  server: {
    port: 3000,
    open: false
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          ui: ['lucide-vue-next', 'vue-i18n']
        }
      }
    }
  }
}) 