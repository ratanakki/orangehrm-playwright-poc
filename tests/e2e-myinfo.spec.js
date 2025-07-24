const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { DashboardPage } = require('../pages/dashboardPage');
const { MyInfoPage } = require('../pages/myInfoPage');

test.describe('🧾 My Info Update Flow', () => {
  test('Update personal details and logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const myInfoPage = new MyInfoPage(page);

    await loginPage.loginAs('Admin', 'admin123');
    await expect(page).toHaveURL(/dashboard/);

    await dashboardPage.gotoMyInfo();

    await myInfoPage.fillPersonalDetails({
      firstName: 'Ratan',
      lastName: 'Akki',
      empID:'6969',
      drivingLicence:'EBHPA66779',
      gender: 'Male',
      nationality: 'Indian',
      dob: '2001-12-06'
    });

    await dashboardPage.logout();
    await expect(page).toHaveURL(/auth\/login/);
  });
});
