exports.MyInfoPage = class MyInfoPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('input[name="firstName"]');
    this.middleName= page.locator('input[name="middleName"]');
    this.lastName = page.locator('input[name="lastName"]');
    this.empID=page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[2]/div[1]/div[1]/div/div[2]/input');
    this.drivingLicence=page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[2]/div[2]/div[1]/div/div[2]/input');
    this.genderMale = page.locator('label:has(input[value="1"])'); // Male radio
    this.genderFemale = page.locator('label:has(input[value="2"])'); // Female radio
    this.nationalityDropdown = page.locator('.oxd-select-text-input').nth(0);
    this.dateOfBirth = page.locator('(//input[@placeholder="yyyy-dd-mm"])[2]');
    this.saveButton = page.locator('(//button[normalize-space()="Save"])[1]');
  }

  async fillPersonalDetails({ firstName, lastName,empID,drivingLicence, gender, nationality, dob }) {
    await this.firstName.fill(firstName);
    await this.middleName.fill(" ");
    await this.lastName.fill(lastName);
    await this.empID.fill(empID);
    await this.drivingLicence.fill(drivingLicence);
    if (gender.toLowerCase() === 'male') {
      await this.genderMale.click();
    } else {
      await this.genderFemale.click();
    }

    await this.nationalityDropdown.click();
    await this.page.locator(`div[role="option"]:has-text("${nationality}")`).click();

    // await this.dateOfBirth.fill('');

    // await this.dateOfBirth.fill(dob);

    await this.saveButton.click();
  }
};
