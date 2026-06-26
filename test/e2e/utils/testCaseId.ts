import { test } from '@playwright/test';

/**
 * Decorator to link a test to a TestRail case ID
 * Usage: caseId('C169781')
 */
export function caseId(id: string) {
  return test.extend({
    // Store the case ID in test metadata
  }).annotate('testrail', id);
}

/**
 * Tag a test with one or more case IDs
 * Usage: test.tag('@C169781', '@C350411')
 */
export function withCaseId(id: string | string[]) {
  const ids = Array.isArray(id) ? id : [id];
  return ids.map((cid) => `@${cid}`);
}

/**
 * Get case IDs from test title
 * Extracts IDs in format: [C123456]
 */
export function extractCaseIds(testTitle: string): string[] {
  const matches = testTitle.match(/\[C\d+\]/g) || [];
  return matches.map((m) => m.slice(1, -1)); // Remove brackets
}

/**
 * Format test title with case ID
 * Usage: formatTestTitle('Login with correct credentials', 'C169781')
 * Returns: '[C169781] Login with correct credentials'
 */
export function formatTestTitle(title: string, caseId: string): string {
  return `[${caseId}] ${title}`;
}
