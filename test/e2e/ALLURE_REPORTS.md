# Allure Reports Integration

This E2E testing framework is integrated with **Allure Reports** for comprehensive test reporting and analysis.

## 📊 What is Allure Reports?

Allure is an open-source framework that generates beautiful, informative test reports. It provides:

- ✅ Test execution history
- ✅ Detailed test logs
- ✅ Screenshots and attachments
- ✅ Test trends and statistics
- ✅ Failure analysis
- ✅ Timeline view
- ✅ Test categorization

## 🚀 Quick Start

### Run Tests and Generate Report

```bash
# Run tests with Allure reporting
npm run test:e2e:allure

# Or run tests first, then generate report separately
npm run test:e2e
npm run test:e2e:report
```

### View Report

After running tests, the Allure report will automatically open in your browser at:
- Local: `http://localhost:4040/`
- Static files: `./allure-report/`

## 📁 Report Structure

```
allure-results/              # Raw test results (auto-generated)
├── 0-container.json
├── 0-result.json
├── 1-container.json
├── 1-result.json
└── ...

allure-report/               # Generated HTML report
├── index.html
├── data/
├── plugins/
└── assets/
```

## 🎯 Test Case Annotations

Tests are automatically annotated with:

- **Epic**: Feature grouping (e.g., "Login Features", "Navigation")
- **Feature**: Specific feature being tested
- **Story**: Business requirement reference (e.g., C169781, MYA-20)
- **Severity**: Test importance (blocker, critical, normal, minor, trivial)
- **Labels**: Custom categorization

### Adding Annotations in Tests

```typescript
import { test } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  // Annotations are added automatically via test naming convention
  // Format: [CASE_ID] Description
  // C169781 is automatically extracted and used for reporting
  
  // You can also add manual annotations:
  test.info().annotations = [
    { type: 'severity', description: 'critical' },
    { type: 'epic', description: 'Authentication' },
  ];
  
  // ... test code
});
```

## 📈 Report Features

### Overview Dashboard
- Total tests executed
- Pass/fail/skip statistics
- Execution timeline
- Flaky tests detection

### Test Results
- Detailed logs per test
- Screenshots on failure
- Video recordings (if configured)
- Step-by-step execution flow

### History & Trends
- Test execution history
- Pass rate trends
- Performance trends
- Flakiness tracking

### Categories
- By status (passed, failed, skipped)
- By severity (critical, normal, minor)
- By feature/epic
- By test case ID

## 🔧 Configuration

### Current Setup

**Reporter**: `allure-playwright`
**Results Directory**: `allure-results/`
**Report Directory**: `allure-report/`

### Customize (if needed)

Edit `playwright.config.ts`:

```typescript
reporter: [
  ['html'],
  ['json', { outputFile: 'test-results/results.json' }],
  ['allure-playwright'],
],
```

## 📋 Test Case Tracking

All tests include TestRail case IDs in the format `[CXXXXXX]`:

| Case ID | Title | Report Category |
|---------|-------|-----------------|
| C169781 | Login with Correct Credentials | Authentication |
| C169782 | Login with Incorrect Credentials | Authentication |
| C169777 | Verify 'Click here' link | Navigation |
| C169778 | Verify 'Get started' CTA link | Navigation |

These are automatically extracted and displayed in Allure reports for easy correlation with TestRail.

## 🎨 Report Usage

### Filtering Results
- Filter by status, severity, tag, or feature
- Search by test name or case ID
- Custom date range selection

### Trend Analysis
- Monitor pass rate over time
- Identify flaky tests
- Track performance metrics

### CI/CD Integration
- Embed reports in CI pipelines
- Generate reports on every build
- Automatic failure notifications

## 🚨 Common Commands

```bash
# Run tests and generate Allure report
npm run test:e2e:allure

# Run tests only
npm run test:e2e

# Generate report from existing results
npm run test:e2e:report

# Run specific test case
npm run test:e2e -- --grep "\\[C169781\\]"

# Run tests with verbose output
npm run test:e2e -- --reporter=list
```

## 📚 Additional Resources

- [Allure Documentation](https://docs.qameta.io/allure/)
- [Allure Playwright Plugin](https://github.com/allure-framework/allure-js/tree/master/packages/allure-playwright)
- [Test Report Best Practices](https://docs.qameta.io/allure/#_features)

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
- name: Run E2E Tests with Allure
  run: npm run test:e2e:allure

- name: Upload Allure Report
  uses: actions/upload-artifact@v2
  with:
    name: allure-report
    path: allure-report/
```

### Publishing Report

Configure your CI/CD to publish the `allure-report/` directory to:
- GitHub Pages
- AWS S3
- Internal web server
- Any static hosting

## 💡 Tips & Best Practices

1. **Regular Cleanup**: Periodically clean old test results
2. **Naming**: Use clear, descriptive test names for better reports
3. **Categorization**: Organize tests by feature/epic for easier analysis
4. **Attachments**: Add screenshots on failure for better debugging
5. **History**: Keep report history to track trends

## 🐛 Troubleshooting

### Report Not Generating

```bash
# Clear old results and regenerate
rm -rf allure-results allure-report
npm run test:e2e:allure
```

### Port Already in Use

```bash
# Specify different port
allure serve allure-results --port 5050
```

### Missing allure-commandline

```bash
npm install --save-dev allure-commandline
```

---

For more information, see [CASE_ID_GUIDE.md](./CASE_ID_GUIDE.md) and [README.md](./README.md).
