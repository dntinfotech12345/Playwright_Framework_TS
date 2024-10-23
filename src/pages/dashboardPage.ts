import { Page, expect } from "@playwright/test";
import {PlaywrightWrapper} from "../helper/wrapper/playwrightWrappers";
import { fixture } from "../../src/hooks/pageFixture";

export class DashboardPage {

    private base: PlaywrightWrapper;
    
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        acceptAll: 'uc-accept-all-button',
        perfumeTab: "//a[text()='PARFUM']",
    };

    async acceptCookies() {
        try {
            fixture.logger.info("Waiting for 'Accept All' cookies button to be visible");
            await this.page.waitForSelector(`data-testid=${this.Elements.acceptAll}`, { state: 'visible', timeout: 10000 });
            
            fixture.logger.info("Clicking 'Accept All' cookies button");
            await this.page.getByTestId(this.Elements.acceptAll).click();
            
            fixture.logger.info("Accepted all cookies");
        } catch (error) {
            fixture.logger.error("Failed to accept cookies via the UI. Clearing cookies programmatically.", error);

            await this.page.context().clearCookies();
            fixture.logger.info("Cleared cookies programmatically after failure.");
        }
    }
    

    async clickPerfumeTab() {
        fixture.logger.info("Waiting for the 'Perfume' tab to be visible");
        await this.page.waitForSelector(this.Elements.perfumeTab, { state: 'visible', timeout: 10000 });
        
        fixture.logger.info("Clicking the 'Perfume' tab");
        await this.base.waitAndClick(this.Elements.perfumeTab);
        
        fixture.logger.info("Navigated to the 'Perfume' section");
    }

    async getDashboardPageTitle() {
        fixture.logger.info("Waiting for the dashboard page to fully load");
        await this.page.waitForLoadState("domcontentloaded");
        
        fixture.logger.info("Fetching the dashboard page title");
        const title = await this.page.title();
        
        fixture.logger.info(`Dashboard page title is: ${title}`);
        return title;
    }
}
