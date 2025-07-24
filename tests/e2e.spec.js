const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { DashboardPage } = require('../pages/dashboardPage');
const { MyInfoPage } = require('../pages/myInfoPage');
const { loadTestData } = require('../utils/dataLoader');

test('End-to-End: Login, Edit MyInfo, Logout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const myInfoPage = new MyInfoPage(page);

  // Step 1: Login
  // await loginPage.gotoLoginPage();
  // await loginPage.login('Admin', 'admin123');
  await loginPage.loginAs('Admin','admin123');
  await expect(page).toHaveURL(/dashboard/);

  // Step 2: Navigate to My Info
  await dashboardPage.gotoMyInfo();

  // Step 3: Fill Personal Details
  await myInfoPage.fillPersonalDetails({
    firstName: 'Ratan',
    lastName: 'Akki',
    empID:'6969',
    drivingLicence:'EBHPA66779',
    gender: 'Male',
    nationality: 'Indian',
    dob: '2001-12-06'
  });

  // Optional: verify updated values (for real app with persistence)

  // Step 4: Logout
  await dashboardPage.logout();
  await expect(page).toHaveURL(/auth\/login/);
});


test.describe('🔐 Login Tests', () => {
  
  const loginData = loadTestData('loginData.json');

  
  // await loginPage.loginAs('InvalidUser','wrongpass');

  // const errorMsg = await page.locator('.oxd-alert-content-text');
  // await expect(errorMsg).toHaveText('Invalid credentials');

  loginData.forEach(({ name, username, password, expectedUrlRegex, expectedError, shouldSucceed, tag }) => {
     test(`${tag} ${name}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAs(username, password);

    if (shouldSucceed) {
      await expect(page).toHaveURL(new RegExp(expectedUrlRegex));
    } else {
      const errorMsg = await page.locator('.oxd-alert-content-text');
      await expect(errorMsg).toHaveText(expectedError);
    }
  });
});


});