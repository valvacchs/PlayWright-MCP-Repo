# Home page with Login Tests

Feature tests for MyAccount home page login functionality.

## 📋 Test Cases

### [C169781] Login with Correct Credentials

**Status**: Active  
**Jira Issue**: MYA-20  
**Parent Issue**: MYA-1  

#### Description
Verify that users can successfully log in to the MyAccount portal using valid credentials.

#### Prerequisites
- User is on the login page
- Valid test account with email and password

#### Test Scenarios

1. **[C169781] should display correct page title**
   - Verify the login page displays the correct title
   - Expected: Title contains "Cinch"

2. **[C169781] should verify all login page elements are present**
   - Verify email input field is visible
   - Verify password input field is visible
   - Verify login button is visible

3. **[C169781] should successfully login with valid credentials**
   - Enter valid email: `valva+33@cchs.com`
   - Enter valid password: `Accion@2024`
   - Click login button
   - Verify redirect to dashboard (URL should not contain /login or /auth)

#### Test Data

| Field | Value |
|-------|-------|
| Email | `valva+33@cchs.com` |
| Password | `Accion@2024` |

#### Expected Results

- ✓ User is successfully authenticated
- ✓ User is redirected to dashboard
- ✓ User session is established

---

### [C169782] Login with Incorrect Credentials

**Status**: Active  
**Jira Issue**: MYA-20  
**Parent Issue**: MYA-1  

#### Description
Verify that users cannot log in with incorrect credentials and appropriate error handling is displayed.

#### Prerequisites
- User is on the login page

#### Test Scenarios

1. **[C169782] should display error message with invalid email**
   - Enter invalid email (e.g., `invalid@cchs.com`)
   - Enter password
   - Click login button
   - Verify error message is displayed
   - Verify user remains on login page

2. **[C169782] should display error message with incorrect password**
   - Enter valid email: `valva+33@cchs.com`
   - Enter incorrect password: `WrongPassword123`
   - Click login button
   - Verify error message is displayed
   - Verify user remains on login page (not redirected)

3. **[C169782] should not login with empty credentials**
   - Leave email and password fields empty
   - Click login button
   - Verify validation error or stays on login page
   - Verify user is not logged in

#### Test Data

| Field | Value |
|-------|-------|
| Valid Email | `valva+33@cchs.com` |
| Invalid Email | `invalid@cchs.com` |
| Wrong Password | `WrongPassword123` |

#### Expected Results

- ✗ User is NOT authenticated
- ✗ User remains on login page
- ✓ Error message is displayed
- ✓ Session is NOT established

## 🚀 Running Tests

### Run all tests in this folder
```bash
npm run test:e2e
```

### Run specific case
```bash
# Run C169781 tests
npm run test:e2e -- --grep "\\[C169781\\]"

# Run C169782 tests
npm run test:e2e -- --grep "\\[C169782\\]"

# Run C169777 tests
npm run test:e2e -- --grep "\\[C169777\\]"

# Run C169778 tests
npm run test:e2e -- --grep "\\[C169778\\]"

# Run all login tests
npm run test:e2e -- test/e2e/specs/home-page-login/
```

### Run with UI mode
```bash
npm run test:e2e:ui
```

### Run in debug mode
```bash
npm run test:e2e:debug
```

## 📁 File Structure

```
Home page with Login/
├── login.spec.ts    # Test implementation
└── README.md        # This file
```

## 🔗 References

### Test Cases
- **C169781**: https://cchs.testrail.com/index.php?/cases/view/169781
- **C169782**: https://cchs.testrail.com/index.php?/cases/view/169782
- **C169777**: https://cchs.testrail.com/index.php?/cases/view/169777
- **C169778**: https://cchs.testrail.com/index.php?/cases/view/169778

### Jira & App
- **Jira Issue**: MYA-20 (My Account - Home page with Login)
- **App URL**: https://myaccount-ui.qa.cinchhs.com/

## 📝 Notes

- All tests use the `validUser` test data from `data/users.ts`
- Page elements are defined in `utils/selectors.ts`
- Page interactions are in `pages/LoginPage.ts`
- Page assertions are verified in `pages/DashboardPage.ts`

## ⚠️ Known Issues

- Selectors may need updates if UI changes
- Some tests timeout on slow networks

## 🔄 Maintenance

- Update selectors in `utils/selectors.ts` if UI elements change
- Update test data in `data/users.ts` if credentials change
- Update this README when adding new test cases
