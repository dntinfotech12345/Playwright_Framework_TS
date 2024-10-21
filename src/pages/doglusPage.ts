import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../../src/hooks/pageFixture";

export class DoglusPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        accept_all: 'uc-accept-all-button',
        perfumeTab: "//a[text()='PARFUM']",
        perfumePageDropdown: (filterOption: string) => `//div[@class='facet__title' and text()= '${filterOption}']`,
        highlightFilterOption: (filterOption: string) => `//div[@class='facet-option__label']//div[text()='${filterOption}']`,
        scrollOnHeadline: "//h1[@class='headline-bold product-overview__headline']",
        selectDropdownValue: "//div[@class='facet-option__checkbox--rating-stars']",
        filteredProducts: "//button[@class='button button__primary facet__close-button']",
    }

    async acceptCookies() {
        await this.page.waitForTimeout(10000);
        this.page.getByTestId('uc-accept-all-button').click();
    }

    async clickPerfumeTab() {
        await this.base.waitAndClick(this.Elements.perfumeTab);
    }

    async getPerfumePageTitle() {
        await this.page.waitForLoadState("networkidle");
        return await this.page.title();

    }

    async selectPerfumePageDropdown(filterOption: string) {
        await this.page.locator("//input[@data-testid='typeAhead-input']").hover();
        const dropdownLocator = this.Elements.perfumePageDropdown(filterOption);
        // Click the dropdown option
        await this.base.waitAndClick(dropdownLocator);
        await this.page.waitForTimeout(5000);
    }

    async selectDropdownOption(filterOption: string) {
        // Construct the dynamic locator based on the filter option passed
        const filterOptionHi = this.Elements.highlightFilterOption(filterOption);
        // Click the dropdown option
        await this.base.waitAndClick(filterOptionHi);
        await this.page.waitForTimeout(5000);
    }

    async getTheFilterTextAndVerify(actualFilterText: string) {
       // Get the list of elements that match the selector for the filter buttons
       const filters = await this.page.$$('//button[@class="selected-facets__value"]');

       // Extract the text from each filter button element
       const filterTexts: string[] = await Promise.all(
           filters.map(async (filter) => await filter.textContent())
       );
   
       // Ensure that the actualFilterText is in the list of filter texts using Playwright assertions
       expect(filterTexts).toContain(
           actualFilterText);
    }


}