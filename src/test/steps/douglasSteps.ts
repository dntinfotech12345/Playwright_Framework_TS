import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { DashboardPage } from "../../pages/dashboardPage";
import { PerfumePage } from "../../pages/perfumePage";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";

let dashboardPage: DashboardPage;
let perfumePage: PerfumePage;
let assert: Assert;
setDefaultTimeout(60 * 1000 * 1);

Given('User navigates to the application', async function () {
  dashboardPage = new DashboardPage(fixture.page);
  perfumePage = new PerfumePage(fixture.page);
  assert = new Assert(fixture.page);
  await fixture.page.goto(process.env.BASEURL);
  fixture.logger.info("Navigated to the application");
  await dashboardPage.acceptCookies();
  fixture.logger.info("Accepted cookies");

});

When('User click on perfume page', async function () {
  await dashboardPage.clickPerfumeTab();
  fixture.logger.info("User clicked on perfume page");
});

Then('Verify user on the perfume page', async function () {
  const title = await perfumePage.getPerfumePageTitle();  
  fixture.logger.info(`Page title retrieved: ${title}`);
  assert.assertTitle(title);
  fixture.logger.info("Verified user is on the perfume page");
});

When('I select the {string} filter from the dropdown', async function (dropDownOption: string) {
  fixture.logger.info(`Selecting filter option: ${dropDownOption}`);
  await perfumePage.selectPerfumePageDropdown(dropDownOption);
  fixture.logger.info(`Selected filter: ${dropDownOption}`);
});

Then('I select the {string} filter option from the dropdown', async function (filterOption: string) {
  fixture.logger.info(`Selecting filter option from dropdown: ${filterOption}`);
  await perfumePage.selectDropdownOption(filterOption);
  fixture.logger.info(`Filter option selected from dropdown: ${filterOption}`);
});

Then('Verify the {string} filter is applied', async function (filterText: string) {
  fixture.logger.info(`Verifying if filter is applied: ${filterText}`);
  await perfumePage.getTheFilterTextAndVerify(filterText);
  fixture.logger.info(`Verified filter is applied: ${filterText}`);
});
