import { Page, Locator } from '@playwright/test';

/**
 * TS port of pages/login_page.py.
 * Same locators, same method names — only the syntax changed
 * (Python's snake_case methods kept as camelCase per TS convention).
 */
export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator("[data-test='username']");
    this.password = page.locator("[data-test='password']");
    this.loginButton = page.locator("[data-test='login-button']");
    this.errorMessage = page.locator("[data-test='error']");
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async getError(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? '';
  }

  isLoggedIn(): boolean {
    return this.page.url().includes('/inventory');
  }
}
