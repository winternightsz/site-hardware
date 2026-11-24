import { defineConfig } from '@playwright/test'
import baseConfig from './playwright.config'
import viteConfig from './vite.config'

export default defineConfig({
  ...baseConfig,
  testDir: './tests/production',
  timeout: 90_000,
  outputDir: './test-results/production',
  use: { ...baseConfig.use, baseURL: 'http://127.0.0.1:4175' + (viteConfig.base ?? '/') },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4175 --strictPort',
    url: 'http://127.0.0.1:4175' + (viteConfig.base ?? '/'),
    reuseExistingServer: false,
    timeout: 30_000,
  },
})
