import { defineConfig } from '@playwright/test'
import viteConfig from './vite.config'

const basePath = viteConfig.base ?? '/'
export default defineConfig({
  testDir: './tests/browser',
  workers: 1,
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173' + basePath,
    channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge',
    headless: true,
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'mobile', use: { viewport: { width: 320, height: 740 }, hasTouch: true, isMobile: true } },
    { name: 'phone-375', use: { viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true } },
    { name: 'phone-390', use: { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } },
    { name: 'tablet-768', use: { viewport: { width: 768, height: 1024 }, hasTouch: true } },
    { name: 'laptop-1024', use: { viewport: { width: 1024, height: 768 } } },
    { name: 'desktop', use: { viewport: { width: 1280, height: 900 } } },
  ],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173' + basePath,
    reuseExistingServer: false,
    timeout: 30_000,
  },
})
