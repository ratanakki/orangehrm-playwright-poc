const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 30000,
  use: {
    headless: true,
    screenshot: 'on',      // 📸 Only on failure
    video: 'retain-on-failure',         // 🎥 Only on failure
    trace: 'on',            // 🧭 enable tracing on retry
    viewport: { width: 1280, height: 720 },
  },
  reporter: [['html', { open: 'always' }]], // 📄 HTML reporter
  testDir: './tests',
  outputDir: 'test-results/',
   screenshot: 'on',      // 📸 Only on failure
    video: 'retain-on-failure',         // 🎥 Only on failure
    trace: 'on',            // 🧭 enable tracing on retry
    viewport: { width: 1280, height: 720 },
});
