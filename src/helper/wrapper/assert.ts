import { expect, Page } from "@playwright/test";

export default class Assert {

    constructor(private page: Page) { }

    async assertTitle(title: string) {
        await expect(this.page).toHaveTitle(title);
    }

    async assertTitleContains(title: string) {
        const pageTitle = await this.page.title();
        expect(pageTitle).toContain(title);
    }

    async assertURL(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    async assertURLContains(title: string) {
        const pageURL = this.page.url();
        expect(pageURL).toContain(title);
    }

    async assertElementVisible(locator: string) {
        const element = this.page.locator(locator);
        await expect(element).toBeVisible();
    }

    async assertElementContainsText(locator: string, text: string) {
        const element = this.page.locator(locator);
        const elementText = await element.textContent();
        expect(elementText).toContain(text);
    }

    async assertElementExists(locator: string) {
        const element = this.page.locator(locator);
        await expect(element).toBeTruthy();
    }

    async assertElementHidden(locator: string) {
        const element = this.page.locator(locator);
        await expect(element).toBeHidden();
    }

}