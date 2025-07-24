exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;
    this.myInfoTab = page.locator('a:has-text("My Info")');
    this.profileDropdown = page.locator('.oxd-userdropdown-name');
    this.logoutLink = page.locator('a:has-text("Logout")');
  }

  async gotoMyInfo() {
    await this.myInfoTab.click();
  }

  async logout() {
    await this.profileDropdown.click();
    await this.logoutLink.click();
  }
};
