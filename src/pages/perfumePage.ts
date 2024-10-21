import { Page,expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";


export class PerfumePage {

    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        perfumePageDropdown: (filterOption: string) => `//div[@class='facet__title' and text()= '${filterOption}']`,
        highlightFilterOption: (filterOption: string) => `//div[@class='facet-option__label']//div[text()='${filterOption}']`,
        searchBar: "//input[@data-testid='typeAhead-input']",
        appliedFilters: "//button[@class='selected-facets__value']"
    }

    async getPerfumePageTitle() {
        await this.page.waitForLoadState("domcontentloaded");
        return await this.page.title();

    }

    async selectPerfumePageDropdown(filterOption: string) {
        await this.page.locator(this.Elements.searchBar).hover();
        const dropdownLocator = this.Elements.perfumePageDropdown(filterOption);
        await this.base.waitAndClick(dropdownLocator);
    }

    async selectDropdownOption(filterOption: string) {
        const filterOptionHi = this.Elements.highlightFilterOption(filterOption);
        await this.base.waitAndClick(filterOptionHi);
    }

    async getTheFilterTextAndVerify(actualFilterText: string) {
        // Get the list of elements
        await this.page.waitForSelector(this.Elements.appliedFilters, { state: 'visible', timeout: 10000 });
        const filters = await this.page.$$(this.Elements.appliedFilters);

        // Extract the text
        const filterTexts: string[] = await Promise.all(
        filters.map(async (filter) => await filter.textContent()));

        // assertions
        expect(filterTexts).toContain(actualFilterText);
    }


}