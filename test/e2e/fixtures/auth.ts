import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { testUsers } from '../data/users';
import { getConfig } from '../config/environments';

type AuthFixtures = {
  authenticatedPage: Page;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    test.setTimeout(120000);
    const config = getConfig();
    const loginPage = new LoginPage(page);

    try {
      // Navigate to app and login
      await loginPage.goto(config.baseUrl);
      await loginPage.login(testUsers.validUser);
    } catch (e) {
      console.log('Authentication setup failed:', e);
    }

    // Use the authenticated page in tests
    await use(page);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});

export { expect } from '@playwright/test';
