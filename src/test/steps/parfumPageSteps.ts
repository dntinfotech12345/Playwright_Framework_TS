import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { HomePage } from "../../pages/homePage";
import { ParfumPage } from "../../pages/parfumPage";
import { fixture } from "../../hooks/pageFixture";
import { Assert } from "../../helper/wrapper/assert";
import * as data from "../../test-data/douglasPage.json";

let homePage: HomePage;
let parfumPage: ParfumPage;
let assert: Assert;

setDefaultTimeout(60 * 1000 * 5);

Given('User navigates to the application', async function () {
  homePage =new HomePage(fixture.page);
  parfumPage =new ParfumPage(fixture.page);
  assert =new Assert(fixture.page);
  await fixture.page.goto(process.env.BASEURL);
  assert.assertURLContains(data.homePage.dashboardUrl);
  await homePage.acceptCookies();
});

When('User click on {string} tab', async function (parfumPage: string) {
  assert.assertTitleContains(data.homePage.title);
  await homePage.clickHomePageTab(parfumPage);
});

Then('Verify user on the parfum page', async function () {
  assert.assertURLContains(data.parfumPage.parfumPageUrl);
  assert.assertTitle(data.parfumPage.title);
});

When('I select the {string} dropdown', async function (dropDownOption: string) {
  await parfumPage.selectParfumPageDropdown(dropDownOption);
});

Then('I select the {string} filter option from the dropdown', async function (filterOption: string) {
  await parfumPage.selectDropdownOption(filterOption);
});

Then('Verify the {string} filter is applied', async function (filterText: string) {
  await parfumPage.getTheFilterTextAndVerify(filterText);
  await parfumPage.verifyTheFilterTagAcrossPages(filterText);
});
