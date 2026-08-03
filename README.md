# Playwright QA Framework — TypeScript Port

A TypeScript port of [`aabbasahd92/Playwright-qa-framework`](https://github.com/aabbasahd92/Playwright-qa-framework)
(the original Python/pytest framework: 200+ tests, 18 modules, 8 page objects,
full REST API CRUD suite, service virtualization via `route()` interception).

This is a real, runnable `@playwright/test` project — not a syntax demo. It ports
17 representative tests and 4 page objects to TypeScript on Playwright's native
test runner, covering the same three capability areas as the Python original:
Page Object Model UI testing, REST API CRUD, and network-level service
virtualization (mocking, fault injection, blocked requests).


---

## What's here

```
├── pages/                   4 page objects (Login, Products, Cart, Checkout)
├── tests/                   17 tests across 5 spec files
│   ├── auth.spec.ts             — 3 tests  (login validation)
│   ├── checkout.spec.ts         — 3 tests  (E2E cart → checkout flow)
│   ├── products.spec.ts         — 3 tests  (sorting, cart state)
│   ├── api-crud.spec.ts         — 5 tests  (GET/POST/PUT/DELETE + a real API quirk)
│   └── mock-api.spec.ts         — 3 tests  (route() interception / service virtualization)
├── fixtures.ts               native Playwright Test fixtures (replaces conftest.py)
├── playwright.config.ts      3-browser config, screenshot/video/trace settings
├── .github/workflows/        CI workflow (GitHub Actions)
└── tsconfig.json
```

## Why 17 tests, not all 200+

This is a **representative port**, matching the JMeter and Azure DevOps scaffolds
built the same way: enough breadth to prove the pattern transfers cleanly across
every category the original suite covers, without mechanically re-typing 200 tests
that would demonstrate nothing additional. Each spec file's comment block states
which original Python tests it drew from and why the rest were left out (usually:
near-duplicate assertions on the same code path, e.g. 6 sort-direction variants
where 2 already prove the pattern).

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm

## Setup

```bash
git clone <this-repo-url>
cd playwright-qa-framework-ts
npm install
npx playwright install        # downloads Chromium, Firefox, WebKit
```

If `npx playwright install` needs system dependencies on Linux and you hit
missing-library errors, run:

```bash
npx playwright install --with-deps
```

## Running the tests

```bash
npm test                  # full suite, all 3 browsers, headless
npm run test:chromium     # Chromium only — fastest for local iteration
npm run test:headed       # watch the browser while tests run
npm run test:ui           # Playwright's interactive UI mode — best for debugging
npm run test:api          # API CRUD suite only (no browser needed)
npm run test:list         # list all discoverable tests without running them
npm run typecheck         # tsc --noEmit — verify the project compiles cleanly
```

After a run:

```bash
npm run report             # opens the HTML report (pass/fail, traces, screenshots)
```

## What each spec file proves

| File | Original Python source | What it demonstrates |
|---|---|---|
| `auth.spec.ts` | `tests/test_e2e.py` (login section) | Page Object Model, fixture-driven test setup |
| `checkout.spec.ts` | `tests/test_e2e.py` (checkout section) | Multi-page-object E2E flow, state carried across pages |
| `products.spec.ts` | `tests/test_products.py` | Data assertions, sort-order validation |
| `api-crud.spec.ts` | `tests/test_api.py` | Full REST CRUD via `request` fixture, no browser |
| `mock-api.spec.ts` | `tests/test_mock_api.py` | Service virtualization: `route.fulfill()`, `route.abort()`, fault injection |

## Architecture notes for reviewers

- **Fixtures replace `conftest.py`.** Playwright Test has its own native
  dependency-injection fixture system. `fixtures.ts` extends `test` with the
  same fixture names the Python suite uses (`login`, `products`, `loggedIn`,
  `cart`, `checkout`) so the mapping is legible to anyone who's read the
  original — but it's idiomatic Playwright Test, not a line-by-line transliteration.
- **`pytest.ini`'s multi-browser + parallel settings** map to `projects[]` and
  `workers` in `playwright.config.ts`.
- **Route interception syntax is nearly 1:1** between Python and TypeScript —
  `page.route()`, `route.fulfill()`, `route.abort()` are the same API surface
  in both language bindings. This is the lowest-risk part of the port.
- **The API CRUD suite intentionally keeps a documented API quirk** (JSONPlaceholder
  returns `500` instead of `404` for `PUT` on a nonexistent resource) rather than
  replacing it with a clean, textbook example — matching the original Python
  suite's philosophy of testing what a system actually does, not just what a
  spec implies it should do.

## Known limitation of this scaffold's validation

This project was built and verified in a sandboxed environment without open
internet access to arbitrary domains (only package registries were reachable).
That means:

- **TypeScript compiles cleanly** (`npm run typecheck` passes, verified).
- **Playwright discovers and lists all 17 tests correctly across all 3 browser
  projects** (`npm run test:list`, verified — 51 total test executions: 17 × 3 browsers).
- **The API and UI tests have not been executed live from this sandbox** — the
  target sites (`saucedemo.com`, `jsonplaceholder.typicode.com`) and the
  Playwright browser-binary CDN were both blocked by the sandbox's network
  allowlist. Every test is a faithful, verified-by-compilation port of an
  original test that passes in the Python suite against the same live
  targets, but "compiles and is discovered correctly" is a different claim
  than "ran green here." Run `npm test` on your own machine to get a live
  pass/fail result — this is expected to be a first-run pass given the direct
  1:1 mapping from the working Python original.
