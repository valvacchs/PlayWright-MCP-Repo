import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../utils/selectors';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page, 'DashboardPage');
  }

  async verifyLoggedIn() {
    this.logger.info('Verifying user is logged in');
    const url = this.page.url();

    if (url.includes('/login') || url.includes('/auth')) {
      this.logger.error('User is still on login page');
      return false;
    }

    this.logger.success('User is logged in');
    return true;
  }

  async getUsername(): Promise<string | null> {
    return this.getText(selectors.dashboard.userMenu);
  }

  async logout() {
    this.logger.info('Logging out');
    await this.click(selectors.dashboard.userMenu, 'User menu');
    await this.waitForTimeout(500);
    await this.click(selectors.dashboard.logout, 'Logout button');
    this.logger.success('Logged out');
  }

  async waitForDashboardLoad() {
    this.logger.info('Waiting for dashboard to load');
    await this.waitForTimeout(2000);
    this.logger.success('Dashboard loaded');
  }
}
