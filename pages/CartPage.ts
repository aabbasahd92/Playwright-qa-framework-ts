import { Page, Locator } from '@playwright/test';

/** TS port of pages/cart_page.py */
export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShopping: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator("[data-test='inventory-item']");
    this.checkoutButton = page.locator("[data-test='checkout']");
    this.continueShopping = page.locator("[data-test='continue-shopping']");
    this.removeButtons = page.locator("[data-test^='remove']");
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async removeItem(index: number): Promise<void> {
    await this.removeButtons.nth(index).click();
  }
}
