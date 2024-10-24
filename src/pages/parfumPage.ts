import { Page, expect } from "@playwright/test";
import {PlaywrightWrapper} from "../helper/wrapper/playwrightWrapper";
import { fixture } from "../hooks/pageFixture";

export class ParfumPage {

    private base: PlaywrightWrapper;
    
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        parfumPageDropdown: (dropdownOption: string) => `//div[@class='facet__title' and text()= '${dropdownOption}']`,
        highlightFilterOption: (filterOption: string) => `//div[@class='facet-option__label']//div[text()='${filterOption}']`,
        searchBar: "//input[@data-testid='typeAhead-input']",
        filterTag:(filterTag: string) => `//div[contains(@data-testid,'product-eyecatcher') and text()='${filterTag}']`,
        appliedFilters: "//button[@class='selected-facets__value']",
        pageInfoLocator:"//div[@data-testid='pagination-title-dropdown']",
        nextPageArrow:"//a[@data-testid='pagination-arrow-right']"
    };

    async getParfumPageTitle() {
        fixture.logger.info("Waiting for the parfum page to fully load");
        await this.page.waitForLoadState("domcontentloaded");
        
        fixture.logger.info("Fetching the parfum page title");
        const title = await this.page.title();
        
        fixture.logger.info(`parfum page title is: ${title}`);
        return title;
    }

    async selectParfumPageDropdown(filterOption: string) {
        fixture.logger.info("Hovering over the search bar to ensure dropdown visibility");
        await this.page.locator(this.Elements.searchBar).hover();
        
        fixture.logger.info(`Selecting dropdown filter option: ${filterOption}`);
        const dropdownLocator = this.Elements.parfumPageDropdown(filterOption);
        await this.base.waitAndClick(dropdownLocator);
        
        fixture.logger.info(`Dropdown filter option '${filterOption}' selected`);
    }

    async selectDropdownOption(filterOption: string) {
        fixture.logger.info(`Selecting filter option: ${filterOption} from the dropdown`);
        const filterOpt = this.Elements.highlightFilterOption(filterOption);
        
        // Click the filter option
        await this.base.waitAndClick(filterOpt);
        fixture.logger.info(`Filter option '${filterOption}' selected`);
    }
    
    async getTheFilterTextAndVerify(actualFilterText: string) {
        // Get the list of elements
        await this.page.waitForSelector(this.Elements.appliedFilters, { state: 'visible', timeout: 5000 });
        const filters = await this.page.$$(this.Elements.appliedFilters);

        // Extract the text
        const filterTexts: string[] = await Promise.all(
        filters.map(async (filter) => await filter.textContent()));

        // assertions
        expect(filterTexts).toContain(actualFilterText);
    }

    async verifyTheFilterTagAcrossPages(actualFilterText: string) {
        let currentPage = 1;
        let totalPages = 1;
    
        // Get total pages from the page info
        const pageInfoText = await this.page.locator(this.Elements.pageInfoLocator).textContent();
       
        if (pageInfoText) {
            const match = pageInfoText.match(/Seite (\d+) von (\d+)/);
            if (match) {
                currentPage = parseInt(match[1]); 
                totalPages = parseInt(match[2]); 
            }
        }
    
        fixture.logger.info(`Total pages to validate: ${totalPages}`);
    
        // Loop through all pages until the last one
        while (currentPage <= totalPages) {
            fixture.logger.info(`Validating filter tag on page ${currentPage} of ${totalPages}`);
            
            // Wait for filter tag to become visible on the current page
            await this.page.waitForSelector(this.Elements.filterTag(actualFilterText), { state: 'visible', timeout: 5000 });
    
            // Extract filter text(s) from the current page
            const filters = await this.page.$$(this.Elements.filterTag(actualFilterText));
            const filterTexts: string[] = await Promise.all(
                filters.map(async (filter) => await filter.textContent())
            );
    
            // Verify the filter text
            fixture.logger.info(`Verifying if the applied filters contain: '${actualFilterText}' on page ${currentPage}`);
            expect(filterTexts).toContain(actualFilterText);
            fixture.logger.info("Filter verification successful on this page");
    
            // If we are not on the last page, click the "Next" button to go to the next page
            if (currentPage < totalPages) {
                fixture.logger.info(`Navigating to page ${currentPage + 1}`);
                const nextPageButton = await this.page.$(this.Elements.nextPageArrow);
                if (nextPageButton) {
                    await nextPageButton.click();
                    await this.page.waitForLoadState('domcontentloaded');
                    currentPage++;
                } else {
                    fixture.logger.error("Next page button not found, stopping pagination.");
                    break;
                }
            } else {
                fixture.logger.info("Reached the last page, stopping pagination.");
                break;
            }
        }
    }
    
}
