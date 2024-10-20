import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { DoglusPage } from "../../pages/doglusPage"
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import * as data from "../../helper/util/test-data/registerUser.json";

let doglusPage: DoglusPage;
let assert: Assert;

When('User click on perfume page', async function () {
    doglusPage = new DoglusPage(fixture.page);
    assert = new Assert(fixture.page);
    await doglusPage.acceptCookies();
    await doglusPage.clickPerfumeTab();
});


Then('Verify user on the perfume page', async function () {
    assert.assertTitle(await doglusPage.getPerfumePageTitle());
});

When('I select the {string} filter from the dropdown', async function (dropDownOption:string) {     
    await doglusPage.selectPerfumePageDropdown(dropDownOption);
  });

  Then('I select the {string} filter option from the dropdown', async function (filterOption:string) {
    await doglusPage.selectDropdownOption(filterOption);
  
  });

  Then('Verify the {string} filter is applied', async function (filterText:string) {
     await doglusPage.getTheFilterTextAndVerify(filterText);
    
  });