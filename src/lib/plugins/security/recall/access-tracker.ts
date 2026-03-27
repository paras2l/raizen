export class FailedAccessTracker {
  private failures = 0;

  recordFailure(): number {
    this.failures++;
    console.warn(`[RECALL-ACCESS] Authentication failure recorded. Count: ${this.failures}`);
    return this.failures;
  }

  reset() {
    this.failures = 0;
  }
}
