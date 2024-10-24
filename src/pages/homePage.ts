import { Page, expect } from "@playwright/test";
import {PlaywrightWrapper} from "../helper/wrapper/playwrightWrapper";
import { fixture } from "../hooks/pageFixture";

export class HomePage {

    private base: PlaywrightWrapper;
    
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        acceptAll: 'uc-accept-all-button',
        headingTabName:(tabName:string) =>`//a[@type='nav-heading' and text()='${tabName}']`
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
    

    async clickHomePageTab(tabName:string) {
        fixture.logger.info("Waiting for the 'parfum' tab to be visible");
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForSelector(this.Elements.headingTabName(tabName), { state: 'visible', timeout: 5000 });
        
        fixture.logger.info("Clicking the 'parfum' tab");
        await this.base.waitAndClick(this.Elements.headingTabName(tabName));
        
        fixture.logger.info(`Navigated to the ${tabName} page`);
    }

    async getHomePageTitle() {
        fixture.logger.info("Waiting for the dashboard page to fully load");
        await this.page.waitForLoadState("domcontentloaded");
        
        fixture.logger.info("Fetching the dashboard page title");
        const title = await this.page.title();
        
        fixture.logger.info(`Dashboard page title is: ${title}`);
        return title;
    }
}
