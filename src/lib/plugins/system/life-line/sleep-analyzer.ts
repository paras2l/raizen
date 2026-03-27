export class SleepStateAnalyzer {
  isAbnormalInactivity(durationMs: number): boolean {
    console.log(`[LIFELINE-SLEEP] Analyzing device state. Inactivity duration: ${durationMs}ms`);
    return false;
  }
}
