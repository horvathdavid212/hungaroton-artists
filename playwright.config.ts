import { defineConfig, devices } from '@playwright/test'

const frontendPort = 3100
const mockApiPort = 3101
const frontendUrl = `http://127.0.0.1:${frontendPort}`
const mockApiUrl = `http://127.0.0.1:${mockApiPort}`

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  outputDir: 'test-results',
  reporter: 'list',
  retries: 0,
  timeout: 30_000,
  use: {
    baseURL: frontendUrl,
    trace: 'retain-on-failure'
  },
  webServer: [
    {
      command: `node tests/mock-artists-api.mjs ${mockApiPort}`,
      name: 'Mock artists API',
      reuseExistingServer: false,
      timeout: 30_000,
      url: `${mockApiUrl}/__health`
    },
    {
      command: `npm run build && node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port ${frontendPort}`,
      env: {
        ...process.env,
        ARTISTS_API_URL: `${mockApiUrl}/api/artists`,
        NEXT_TELEMETRY_DISABLED: '1'
      },
      name: 'Next app',
      reuseExistingServer: false,
      stderr: 'pipe',
      stdout: 'pipe',
      timeout: 120_000,
      url: `${frontendUrl}/en?page=1`
    }
  ],
  workers: 1,
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {
          height: 960,
          width: 1280
        }
      }
    }
  ]
})
