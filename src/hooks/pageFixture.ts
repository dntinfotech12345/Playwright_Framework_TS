import { Page } from "@playwright/test";
import { Logger } from "winston";

interface Fixture {
    page: Page | undefined;
    logger: Logger | undefined;
}

export const fixture: Fixture = {
    page: undefined,
    logger: undefined,
};
