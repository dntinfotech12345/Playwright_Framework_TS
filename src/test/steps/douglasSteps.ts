import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { DashboardPage } from "../../pages/dashboardPage";
import { PerfumePage } from "../../pages/perfumePage";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import * as data from "../../test-data/douglasPage.json";

let dashboardPage: DashboardPage;
let perfumePage: PerfumePage;
let assert: Assert;

setDefaultTimeout(60 * 1000 * 5);

Given('User navigates to the application', async function () {
  dashboardPage = new DashboardPage(fixture.page);
  perfumePage = new PerfumePage(fixture.page);
  assert = new Assert(fixture.page);

  await fixture.page.goto(process.env.BASEURL);
  assert.assertURLContains(data.dashboard.dashboardUrl);
  await dashboardPage.acceptCookies();
});

When('User click on perfume page', async function () {
  assert.assertTitleContains(data.dashboard.title);
  await dashboardPage.clickPerfumeTab();
});

Then('Verify user on the perfume page', async function () {
  assert.assertURLContains(data.perfume.perfumePageUrl);
  assert.assertTitle(data.perfume.title);
});

When('I select the {string} filter from the dropdown', async function (dropDownOption: string) {
  await perfumePage.selectPerfumePageDropdown(dropDownOption);
});

Then('I select the {string} filter option from the dropdown', async function (filterOption: string) {
  await perfumePage.selectDropdownOption(filterOption);
});

Then('Verify the {string} filter is applied', async function (filterText: string) {
  await perfumePage.getTheFilterTextAndVerify(filterText);
  await perfumePage.verifyTheFilterTagAcrossPages(filterText);
});
