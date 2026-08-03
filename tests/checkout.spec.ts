import { test, expect } from '../fixtures';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

/**
 * TS port of the E2E checkout tests in tests/test_e2e.py.
 * Selected 3 of the 6 checkout scenarios as representative:
 * full happy-path E2E, one validation failure, and the cancel flow.
 */

test('full E2E checkout: add items, pay, confirm', async ({ loggedIn }) => {
  const products = new ProductsPage(loggedIn);
  await products.addProductToCart(0);
  await products.addProductToCart(1);
  await products.cartIcon.click();

  const cart = new CartPage(loggedIn);
  expect(await cart.getItemCount()).toBe(2);
  await cart.checkout();

  const checkout = new CheckoutPage(loggedIn);
  await checkout.fillDetails('Ahmed', 'Abbas', '12345');
  await checkout.continueCheckout();
  await checkout.finish();
  expect(await checkout.isOrderComplete()).toBe(true);
});

test('checkout blocks missing first name', async ({ loggedIn }) => {
  const products = new ProductsPage(loggedIn);
  await products.addProductToCart(0);
  await products.cartIcon.click();

  const cart = new CartPage(loggedIn);
  await cart.checkout();

  const checkout = new CheckoutPage(loggedIn);
  await checkout.fillDetails('', 'Abbas', '12345');
  await checkout.continueCheckout();
  expect(await checkout.getError()).toContain('First Name is required');
});

test('cancel checkout returns to cart', async ({ loggedIn }) => {
  const products = new ProductsPage(loggedIn);
  await products.addProductToCart(0);
  await products.cartIcon.click();

  const cart = new CartPage(loggedIn);
  await cart.checkout();

  const checkout = new CheckoutPage(loggedIn);
  await checkout.cancel();
  expect(loggedIn.url()).toContain('/cart');
});
