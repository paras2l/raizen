import { DeadlineInfo, UrgencyLevel } from './types';

export class UrgencyAnalyzer {
  analyze(deadline: DeadlineInfo, complexity: number): number {
    const timeFactor = 1 / (deadline.remainingSeconds / 60);
    const score = (timeFactor * complexity);
    
    console.log(`[OVERCLOCK-URGENCY] Computed mission urgency score: ${score.toFixed(2)}`);
    return Math.min(score, 1.0);
  }

  mapToLevel(score: number): UrgencyLevel {
    if (score > 0.8) return 'critical';
    if (score > 0.5) return 'high';
    if (score > 0.2) return 'medium';
    return 'low';
  }
}
