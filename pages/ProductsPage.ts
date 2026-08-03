import { Page, Locator } from '@playwright/test';

/** TS port of pages/products_page.py */
export class ProductsPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly productItems: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator("[data-test='product-sort-container']");
    this.productNames = page.locator("[data-test='inventory-item-name']");
    this.productPrices = page.locator("[data-test='inventory-item-price']");
    this.productItems = page.locator("[data-test='inventory-item']");
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator("[data-test='shopping-cart-badge']");
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com');
    await this.page.fill("[data-test='username']", 'standard_user');
    await this.page.fill("[data-test='password']", 'secret_sauce');
    await this.page.click("[data-test='login-button']");
  }

  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.productPrices.allTextContents();
    return prices.map((p) => parseFloat(p.replace('$', '')));
  }

  async getProductCount(): Promise<number> {
    return this.productItems.count();
  }

  async addProductToCart(index: number): Promise<void> {
    const buttons = this.page.locator("[data-test^='add-to-cart']");
    await buttons.nth(index).click();
  }

  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return parseInt(text ?? '0', 10);
    }
    return 0;
  }
}
