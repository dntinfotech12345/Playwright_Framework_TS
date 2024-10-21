import { Page,expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";


export class DashboardPage {

    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        acceptAll: 'uc-accept-all-button',
        perfumeTab: "//a[text()='PARFUM']",
    }

    async acceptCookies() {
        await this.page.waitForSelector(`data-testid=${this.Elements.acceptAll}`, { state: 'visible', timeout: 10000 });
        this.page.getByTestId(this.Elements.acceptAll).click();
    }

    async clickPerfumeTab() {
        await this.page.waitForSelector(this.Elements.perfumeTab, { state: 'visible', timeout: 10000 });
        await this.base.waitAndClick(this.Elements.perfumeTab);
    }

}