const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { DashboardPage } = require('../pages/dashboardPage');

test.describe('🔐 Login Tests', () => {
  const loginData = [
    {
      name: '✅ Valid login with Admin',
      username: 'Admin',
      password: 'admin123',
      expectedUrlRegex: /dashboard/,
      shouldSucceed: true,
      tags: ['smoke']
    },
    {
      name: '❌ Invalid login with wrong credentials',
      username: 'InvalidUser',
      password: 'wrongpass',
      expectedError: 'Invalid credentials',
      shouldSucceed: false,
      tags: ['regression']
    }
  ];

  for (const { name, username, password, expectedUrlRegex, expectedError, shouldSucceed,tags } of loginData) {
    test(name, async ({ page },testInfo) => {
      const loginPage = new LoginPage(page);
      await loginPage.loginAs(username, password);

        // Attach tags for CLI filtering
      for (const tag of tags) {
        testInfo.annotations.push({ type: 'tag', description: tag });
      }

      if (shouldSucceed) {
        await expect(page).toHaveURL(expectedUrlRegex);
      } else {
        const errorMsg = await page.locator('.oxd-alert-content-text');
        await expect(errorMsg).toHaveText(expectedError);
      }
    });
  }
});
