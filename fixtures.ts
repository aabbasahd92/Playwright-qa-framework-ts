import { test as base, Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

/**
 * This file is the architectural translation point of the port.
 *
 * The Python framework wires page objects into tests via pytest fixtures
 * declared in conftest.py (`login`, `products`, `logged_in`, `cart`, `checkout`).
 * Playwright Test has its own native fixture system that does the same job —
 * dependency-injected, auto-cleaned-up objects handed to each test function —
 * so instead of hand-rolling a DI layer, this extends `test` with the same
 * fixture names the Python suite uses. Anyone who has read conftest.py will
 * recognize this immediately; the mechanism is idiomatic Playwright Test,
 * not a literal syntax-for-syntax translation.
 */
type Fixtures = {
  login: LoginPage;
  products: ProductsPage;
  loggedIn: Page;
  cart: CartPage;
  checkout: CheckoutPage;
};

export const test = base.extend<Fixtures>({
  login: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  products: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await use(productsPage);
  },

  loggedIn: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await use(page);
  },

  cart: async ({ loggedIn }, use) => {
    await use(new CartPage(loggedIn));
  },

  checkout: async ({ loggedIn }, use) => {
    await use(new CheckoutPage(loggedIn));
  },
});

export { expect } from '@playwright/test';
