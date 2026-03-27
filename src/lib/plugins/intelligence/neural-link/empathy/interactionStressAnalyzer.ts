import { StressLevel } from './empathyTypes';
import { EmpathyConfig } from './empathyConfig';

export class InteractionStressAnalyzer {
  public analyze(intensityScore: number): StressLevel {
    if (intensityScore >= EmpathyConfig.THRESHOLDS.CRITICAL) return 'CRITICAL';
    if (intensityScore >= EmpathyConfig.THRESHOLDS.ELEVATED) return 'ELEVATED';
    return 'STABLE';
  }
}
