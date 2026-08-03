import { test, expect } from '../fixtures';

/**
 * TS port of a representative slice of the login tests in tests/test_e2e.py.
 * Original file has 5 login scenarios; kept 3 that cover distinct behaviors
 * (success, wrong credentials, account-level lockout) and dropped the two
 * near-duplicate empty-field validation cases.
 */

test('valid login succeeds', async ({ login }) => {
  await login.login('standard_user', 'secret_sauce');
  expect(login.isLoggedIn()).toBe(true);
});

test('invalid credentials show error', async ({ login }) => {
  await login.login('wrong_user', 'wrong_pass');
  expect(await login.getError()).toContain('Epic sadface');
});

test('locked out user is blocked', async ({ login }) => {
  await login.login('locked_out_user', 'secret_sauce');
  expect(await login.getError()).toContain('locked out');
});
