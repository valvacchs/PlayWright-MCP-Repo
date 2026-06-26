import { Page, expect } from '@playwright/test';
import { Logger } from '../utils/logger';

export class BasePage {
  readonly page: Page;
  readonly logger: Logger;

  constructor(page: Page, testName: string = 'Test') {
    this.page = page;
    this.logger = new Logger(testName);
  }

  async goto(url: string) {
    this.logger.info(`Navigating to ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    this.logger.success(`Page loaded: ${this.page.url()}`);
  }

  async fill(selector: string, value: string, label: string = selector) {
    this.logger.info(`Filling ${label} with value`);
    await this.page.fill(selector, value);
    this.logger.success(`${label} filled`);
  }

  async click(selector: string, label: string = selector) {
    this.logger.info(`Clicking ${label}`);
    await this.page.click(selector);
    this.logger.success(`${label} clicked`);
  }

  async waitForSelector(selector: string, label: string = selector, timeout = 10000) {
    this.logger.info(`Waiting for ${label}`);
    await this.page.waitForSelector(selector, { timeout });
    this.logger.success(`${label} visible`);
  }

  async isVisible(selector: string): Promise<boolean> {
    try {
      return await this.page.isVisible(selector);
    } catch {
      return false;
    }
  }

  async getText(selector: string): Promise<string> {
    const text = await this.page.textContent(selector);
    return text || '';
  }

  async takeScreenshot(name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}-${timestamp}.png`;
    this.logger.info(`Taking screenshot: ${filename}`);
    await this.page.screenshot({ path: `test-results/${filename}` });
  }

  async waitForNavigation(timeout = 10000) {
    this.logger.info('Waiting for navigation');
    await this.page.waitForNavigation({ timeout });
    this.logger.success(`Navigation complete: ${this.page.url()}`);
  }

  async waitForTimeout(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}
