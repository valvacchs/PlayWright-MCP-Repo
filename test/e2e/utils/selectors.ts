export const selectors = {
  // Login Page
  login: {
    emailInput: 'input[type="email"]',
    emailInputFallback: 'input[type="text"]',
    passwordInput: 'input[type="password"]',
    submitButton: 'button[type="submit"]',
    signInButton: 'button:has-text("Sign In")',
    forgotPasswordLink: 'a:has-text("Forgot")',
    rememberMeCheckbox: 'input[type="checkbox"]',
  },

  // Dashboard
  dashboard: {
    header: '[data-testid="dashboard-header"]',
    userMenu: '[data-testid="user-menu"]',
    logout: 'a:has-text("Logout"), button:has-text("Logout")',
  },

  // Common
  common: {
    loader: '.loader, [role="progressbar"]',
    alert: '[role="alert"]',
    error: '.error, [class*="error"]',
  },
};
