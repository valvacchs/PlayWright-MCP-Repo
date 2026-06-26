# TestRail Case ID Integration Guide

## 📋 Overview

All E2E tests are linked to TestRail case IDs using the format `[CXXXXXX]`.

## ✅ Case ID Format

Every test file and test case must include:

```typescript
const CASE_ID = 'C169781';  // TestRail case ID
const CASE_TITLE = 'Login with Correct Credentials';  // Case title

test.describe(`[${CASE_ID}] ${CASE_TITLE}`, () => {
  test(`[${CASE_ID}] test scenario`, async ({ loginPage }) => {
    // Test implementation
  });
});
```

## 🔍 Current Test Cases

| Case ID | Title | File | Tests |
|---------|-------|------|-------|
| **C169781** | Login with Correct Credentials | `login.spec.ts` | 3 |
| **C350411** | Verify Locksmith Category Hidden | `dashboard.spec.ts` | 1 |
| **C123456** | (Template) | `TEMPLATE.spec.ts` | 2 |

## 🚀 Running Tests by Case ID

### Run specific case
```bash
# Run all tests for case C169781
npm run test:e2e -- --grep "\\[C169781\\]"

# Run all tests for case C350411
npm run test:e2e -- --grep "\\[C350411\\]"
```

### View test list with case IDs
```bash
npm run test:e2e -- --reporter=list --project=chromium
```

Output example:
```
✓ [C169781] Login with Correct Credentials › [C169781] should display correct page title
✓ [C350411] Verify Locksmith Category Hidden › [C350411] should display dashboard URL
```

## 📝 Adding New Tests

### Step 1: Get Case ID from TestRail
```
TestRail URL: https://cchs.testrail.com
Project: P693 (Customer Experience)
Case ID: C169781 (example)
```

### Step 2: Copy Template
```bash
cp test/e2e/specs/TEMPLATE.spec.ts test/e2e/specs/feature-name.spec.ts
```

### Step 3: Update Case ID and Title
```typescript
const CASE_ID = 'C169781';
const CASE_TITLE = 'Login with Correct Credentials';
```

### Step 4: Add Prefix to All Tests
```typescript
test(`[${CASE_ID}] should do something`, async ({ loginPage }) => {
  // ✓ Prefixed with [CASE_ID]
});
```

## 🔗 Test Output Integration

Tests display case IDs in:
- ✓ Console output
- ✓ HTML report (playwright-report/)
- ✓ Test results
- ✓ CI/CD logs

Example test output:
```
PASS  [chromium] › test/e2e/specs/login.spec.ts:12:3
      [C169781] Login with Correct Credentials
      [C169781] should display correct page title ✓
```

## 🏗️ Best Practices

1. **Always use CASE_ID constant** — Don't hardcode case IDs
2. **Prefix describe blocks** — `test.describe(\`[${CASE_ID}] ...\`)`
3. **Prefix each test** — `test(\`[${CASE_ID}] ...\`)`
4. **Match TestRail title** — Keep CASE_TITLE in sync with TestRail
5. **One test file per case** — Unless case has multiple scenarios
6. **Update README** — Add new cases to test case mapping table

## 🔄 Reporting to TestRail

When tests run:
- Case ID is visible in console output
- Test results can be manually updated in TestRail
- Future: Automated sync via TestRail API

### Manual TestRail Update
1. Run test suite
2. Check console output for case IDs
3. Go to TestRail case
4. Update result with test output

## 📚 Examples

### Single test
```typescript
const CASE_ID = 'C169781';
const CASE_TITLE = 'Login with Correct Credentials';

test.describe(`[${CASE_ID}] ${CASE_TITLE}`, () => {
  test(`[${CASE_ID}] should login successfully`, async ({ loginPage }) => {
    await loginPage.goto(config.baseUrl);
    expect(true).toBe(true);
  });
});
```

### Multiple tests per case
```typescript
const CASE_ID = 'C169781';
const CASE_TITLE = 'Login with Correct Credentials';

test.describe(`[${CASE_ID}] ${CASE_TITLE}`, () => {
  test(`[${CASE_ID}] should login successfully`, async ({ loginPage }) => {
    // Test 1
  });

  test(`[${CASE_ID}] should display error on invalid credentials`, async ({ loginPage }) => {
    // Test 2
  });

  test(`[${CASE_ID}] should remember user preference`, async ({ loginPage }) => {
    // Test 3
  });
});
```

## ❓ FAQ

**Q: What if a test doesn't have a case ID?**
A: Use template and create case in TestRail first, or prefix with `[TODO-CXXXXXX]`

**Q: Can multiple cases share one test file?**
A: Not recommended. Create separate files for each case.

**Q: How do I know the correct case ID?**
A: Check TestRail dashboard or API: `GET /api/v2/get_case/{case_id}`

**Q: Can I change case ID later?**
A: Yes, but update all test prefixes and README mapping table.
