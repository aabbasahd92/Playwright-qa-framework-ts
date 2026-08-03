import { test, expect } from '../fixtures';

/**
 * TS port of a representative slice of tests/test_products.py.
 * Full Python file has 10 tests (sort orders, name/price validation, cart add);
 * these 3 cover the distinct behaviors — sorting logic, data validity, cart state —
 * without repeating near-duplicate sort-direction assertions.
 */

test('products load with default A-Z sort', async ({ products }) => {
  expect(await products.getProductCount()).toBe(6);
  const names = await products.getProductNames();
  expect(names).toEqual([...names].sort());
});

test('price sort high-to-low orders correctly', async ({ products }) => {
  await products.sortBy('hilo');
  const prices = await products.getProductPrices();
  const sortedDesc = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sortedDesc);
});

test('adding multiple items updates cart badge', async ({ products }) => {
  await products.addProductToCart(0);
  await products.addProductToCart(1);
  await products.addProductToCart(2);
  expect(await products.getCartCount()).toBe(3);
});
