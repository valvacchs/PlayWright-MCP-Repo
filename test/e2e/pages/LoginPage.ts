import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../utils/selectors';
import { TestUser } from '../data/users';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page, 'LoginPage');
  }

  async goto(baseUrl: string) {
    await super.goto(baseUrl);
  }

  async login(user: TestUser) {
    this.logger.step(1, 'Verify login form is loaded');
    await this.verifyPageLoaded();
    await this.takeScreenshot('login-initial');

    this.logger.step(2, `Enter email: ${user.email}`);
    try {
      // Try multiple email selectors
      await this.page.fill('input[type="email"]', user.email);
    } catch {
      try {
        await this.page.fill('input[name*="email"]', user.email);
      } catch {
        await this.page.fill('input[type="text"]', user.email);
      }
    }
    this.logger.success('Email field filled');

    this.logger.step(3, 'Enter password');
    await this.page.fill('input[type="password"]', user.password);
    this.logger.success('Password field filled');

    this.logger.step(4, 'Click login button');
    try {
      await this.page.click('button[type="submit"]');
    } catch {
      await this.page.click('button:has-text("Sign In")');
    }
    this.logger.success('Login button clicked');

    this.logger.step(5, 'Wait for navigation');
    await this.waitForTimeout(3000);
    await this.takeScreenshot('login-after');
  }

  async verifyPageLoaded() {
    this.logger.info('Verifying login page elements');

    try {
      // Wait for email input to be available (try multiple selectors)
      await this.page.waitForSelector(
        'input[type="email"], input[name*="email"], input[placeholder*="email"], input[placeholder*="Email"]',
        { timeout: 5000 }
      );

      // Wait for password input
      await this.page.waitForSelector(
        'input[type="password"]',
        { timeout: 5000 }
      );

      this.logger.success('All login page elements visible');
      return true;
    } catch (e) {
      this.logger.error('Login page elements not visible');
      return false;
    }
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}
