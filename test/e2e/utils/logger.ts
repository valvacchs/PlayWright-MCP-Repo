export class Logger {
  private testName: string;

  constructor(testName: string) {
    this.testName = testName;
  }

  info(message: string) {
    console.log(`[${this.testName}] ℹ️  ${message}`);
  }

  success(message: string) {
    console.log(`[${this.testName}] ✓ ${message}`);
  }

  error(message: string) {
    console.error(`[${this.testName}] ✗ ${message}`);
  }

  warn(message: string) {
    console.warn(`[${this.testName}] ⚠️  ${message}`);
  }

  step(stepNumber: number, description: string) {
    console.log(`[${this.testName}] Step ${stepNumber}: ${description}`);
  }
}
