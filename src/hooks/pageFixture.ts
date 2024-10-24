import { Page } from "@playwright/test";
import { Logger } from "winston";

// Define the fixture type with specific properties
interface Fixture {
    page: Page | undefined;
    logger: Logger | undefined;
}

// Initialize the fixture object with correct types
export const fixture: Fixture = {
    page: undefined,
    logger: undefined,
};
