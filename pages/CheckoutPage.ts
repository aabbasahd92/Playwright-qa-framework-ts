import { Page, Locator } from '@playwright/test';

/** TS port of pages/checkout_page.py */
export class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly successHeader: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator("[data-test='firstName']");
    this.lastName = page.locator("[data-test='lastName']");
    this.postalCode = page.locator("[data-test='postalCode']");
    this.continueButton = page.locator("[data-test='continue']");
    this.finishButton = page.locator("[data-test='finish']");
    this.errorMessage = page.locator("[data-test='error']");
    this.successHeader = page.locator("[data-test='complete-header']");
    this.cancelButton = page.locator("[data-test='cancel']");
  }

  async fillDetails(first: string, last: string, postal: string): Promise<void> {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(postal);
  }

  async continueCheckout(): Promise<void> {
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async getError(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? '';
  }

  async isOrderComplete(): Promise<boolean> {
    return this.successHeader.isVisible();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
