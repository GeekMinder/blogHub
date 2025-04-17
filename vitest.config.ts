import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            // 分离 Vue 和相关库
            vue: ['vue', 'vue-router', 'pinia'],
            // 分离第三方 UI 库（例如 Element Plus）
            element: ['@arco-design/web-vue'],
          },
        },
      },
    },
  }),
)
