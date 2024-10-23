import { Page } from "@playwright/test";

export class PlaywrightWrapper {
    constructor(private page: Page) {}

    async goto(url: string) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded",
        });
    }

    async waitAndClick(locator: string) {
        const element = this.page.locator(locator);
        await element.waitFor({
            state: "visible",
        });
        await element.click();
    }

    async navigateTo(link: string) {
        await Promise.all([
            this.page.click(link),
            this.page.waitForLoadState('load'),
        ]);
    }

    async fillInput(locator: string, text: string) {
        const element = this.page.locator(locator);
        await element.waitFor({
            state: "visible",
        });
        await element.fill(text);
    }

    async getText(locator: string): Promise<string> {
        const element = this.page.locator(locator);
        await element.waitFor({
            state: "visible",
        });
        return await element.innerText();
    }

    async isVisible(locator: string): Promise<boolean> {
        const element = this.page.locator(locator);
        return await element.isVisible();
    }

    async waitForElementToBeHidden(locator: string) {
        const element = this.page.locator(locator);
        await element.waitFor({
            state: "hidden",
        });
    }

    
}
