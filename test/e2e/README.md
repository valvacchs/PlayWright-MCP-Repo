# E2E Testing Framework

Enterprise-grade E2E testing framework for MyAccount UI using Playwright.

## 📁 Structure

```
test/e2e/
├── specs/                          # Test files organized by feature
│   ├── home-page-login/           # Feature folder (MYA-20)
│   │   ├── login.spec.ts          # [C169781] Login tests
│   │   └── README.md              # Feature documentation
│   ├── TEMPLATE.spec.ts           # Template for new tests
│   └── dashboard.spec.ts          # [C350411] Dashboard tests
├── pages/                          # Page Object Model
│   ├── BasePage.ts                # Base class with common methods
│   ├── LoginPage.ts
│   └── DashboardPage.ts
├── fixtures/                       # Playwright fixtures with auto-setup
│   └── auth.ts                    # Authentication fixture
├── utils/                          # Helper utilities
│   ├── logger.ts                  # Structured logging
│   ├── selectors.ts               # Element selectors
│   └── testCaseId.ts              # Case ID utilities
├── config/                         # Configuration
│   └── environments.ts            # Environment settings
├── data/                           # Test data
│   └── users.ts                   # Test user credentials
├── README.md                       # Framework documentation
└── CASE_ID_GUIDE.md               # Case ID integration guide
```

## 🚀 Getting Started

### Run all tests
```bash
npm run test:e2e
```

### Run with UI mode
```bash
npm run test:e2e:ui
```

### Run in debug mode
```bash
npm run test:e2e:debug
```

### Run specific test file
```bash
npm run test:e2e -- test/e2e/specs/login.spec.ts
```

### Run specific browser
```bash
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=firefox
npm run test:e2e -- --project=webkit
```

## 🏗️ Architecture

### Page Object Model (POM)

Each page has a corresponding class that encapsulates:
- Element selectors
- User interactions
- Page-specific assertions

```typescript
// Example usage in tests
test('login flow', async ({ loginPage }) => {
  await loginPage.goto(config.baseUrl);
  await loginPage.login(testUsers.validUser);
  expect(await loginPage.verifyLoggedIn()).toBe(true);
});
```

### Fixtures

Fixtures provide pre-configured page objects and auto-setup/cleanup:

```typescript
test('authenticated page access', async ({ authenticatedPage, dashboardPage }) => {
  // User is already logged in via fixture
  expect(await dashboardPage.verifyLoggedIn()).toBe(true);
});
```

### Logger

All interactions are logged with structured output:

```
[LoginPage] ℹ️  Navigating to https://myaccount-ui.qa.cinchhs.com/
[LoginPage] ✓ Page loaded
[LoginPage] Step 1: Navigate to login page
[LoginPage] Step 2: Enter email
```

## ⚙️ Configuration

### Environment Setup

Set environment via `TEST_ENV`:

```bash
TEST_ENV=qa npm run test:e2e      # QA
TEST_ENV=staging npm run test:e2e # Staging
TEST_ENV=production npm run test:e2e # Production
```

Add new environments in `config/environments.ts`:

```typescript
export const environments = {
  qa: { baseUrl: '...', ... },
  staging: { baseUrl: '...', ... },
  production: { baseUrl: '...', ... },
};
```

### Test Data

User credentials are in `data/users.ts`:

```typescript
export const testUsers = {
  validUser: { email: '...', password: '...' },
  invalidUser: { email: '...', password: '...' },
};
```

## 🔍 Selectors

Element selectors are centralized in `utils/selectors.ts` for easy updates when UI changes:

```typescript
export const selectors = {
  login: {
    emailInput: 'input[type="email"]',
    passwordInput: 'input[type="password"]',
    submitButton: 'button[type="submit"]',
  },
};
```

## 📝 Best Practices

1. **Use Page Objects** — Never use selectors directly in tests
2. **Centralize Selectors** — Add selectors to `utils/selectors.ts`
3. **Use Fixtures** — Leverage auto-setup for common scenarios
4. **Log Everything** — Use Logger for debugging
5. **Data-driven** — Use test data from `data/` directory
6. **One assertion per test** (ideally) — Keep tests focused

## 🔗 Test Case Mapping

All tests are tagged with TestRail case IDs in the format `[CXXXXXX]`:

| Test Case | Title | Feature | File | Status |
|---|---|---|---|---|
| **C169781** | Login with Correct Credentials | Home page with Login | `specs/home-page-login/login.spec.ts` | ✓ Active |
| **C350411** | Verify Locksmith Category Hidden | Dashboard | `specs/dashboard.spec.ts` | ✓ Active |

### Running Specific Case Tests

```bash
# Run all tests for case C169781
npm run test:e2e -- --grep "\\[C169781\\]"

# Run all tests for case C350411
npm run test:e2e -- --grep "\\[C350411\\]"
```

## 📸 Screenshots & Reports

- Screenshots: `test-results/*.png`
- HTML report: `playwright-report/`
- View report: `npx playwright show-report`

## 🛠️ Adding New Tests

1. Copy `specs/TEMPLATE.spec.ts`
2. Replace `CASE_ID` with TestRail case ID
3. Replace `CASE_TITLE` with case title
4. Prefix all test names with `[CASE_ID]`
5. Implement test scenarios

### Example

```typescript
const CASE_ID = 'C169781'; // TestRail case ID
const CASE_TITLE = 'Login with Correct Credentials';

test.describe(`[${CASE_ID}] ${CASE_TITLE}`, () => {
  test(`[${CASE_ID}] should login successfully`, async ({ loginPage }) => {
    await loginPage.goto(config.baseUrl);
    await loginPage.login(testUsers.validUser);
    expect(await loginPage.verifyLoggedIn()).toBe(true);
  });

  test(`[${CASE_ID}] should display error on invalid credentials`, async ({ loginPage }) => {
    await loginPage.goto(config.baseUrl);
    await loginPage.login(testUsers.invalidUser);
    expect(await loginPage.verifyError()).toBe(true);
  });
});
```

### Page Object Example

```typescript
// pages/MyPage.ts
export class MyPage extends BasePage {
  async clickButton() {
    await this.click(selectors.myPage.button, 'My Button');
  }
}

// specs/my.spec.ts - Already has case ID
test(`[${CASE_ID}] test feature`, async ({ page }) => {
  const myPage = new MyPage(page);
  await myPage.clickButton();
});
```

## 🐛 Troubleshooting

### Tests timeout
- Check `TEST_ENV` and `baseUrl`
- Increase timeout: `test.setTimeout(120000)`

### Selectors don't match
- Run in UI mode: `npm run test:e2e:ui`
- Update selectors in `utils/selectors.ts`

### Pages not loading
- Verify network connectivity
- Check environment URL
- Use debug mode: `npm run test:e2e:debug`

## 📚 Resources

- [Playwright Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-page)
