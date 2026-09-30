// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,

  timeout: 60000,

  reporter: 'html',

  use: {
    headless: Boolean(process.env.CI),
    screenshot: 'on',
    trace: 'on',
    video: 'on',
  },

  projects: [
    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],

        viewport: null,

        deviceScaleFactor: undefined,

        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
});