import { FocusConfig } from './focusConfig';
import { CognitiveMetrics, FocusState } from './focusTypes';
import { focusLogger } from './focusLogger';

export class CognitiveLoadAnalyzer {
  private metrics: CognitiveMetrics[] = [];
  private readonly windowSizeMs = FocusConfig.DURATIONS.FRAGMENTATION_WINDOW_MS;

  public async analyze(newMetric: Omit<CognitiveMetrics, 'timestamp'>): Promise<FocusState> {
    const timestamp = Date.now();
    this.metrics.push({ ...newMetric, timestamp });
    
    // Clean up old metrics
    this.metrics = this.metrics.filter(m => timestamp - m.timestamp < this.windowSizeMs);

    const averageInteractionDensity = this.calculateAverageDensity();
    const loadScore = this.calculateLoadScore(averageInteractionDensity);

    if (loadScore > FocusConfig.THRESHOLDS.CRITICAL_OVERLOAD) {
        await focusLogger.warn('CRITICAL COGNITIVE OVERLOAD DETECTED');
        return 'CRITICAL_OVERLOAD';
    }
    if (loadScore > FocusConfig.THRESHOLDS.DEEP_FOCUS_LOAD) return 'DEEP_FOCUS';
    if (loadScore > FocusConfig.THRESHOLDS.ELEVATED_LOAD) return 'ELEVATED';

    return 'NORMAL';
  }

  private calculateAverageDensity(): number {
    if (this.metrics.length === 0) return 0;
    const sum = this.metrics.reduce((acc, m) => acc + m.interactionDensity, 0);
    return sum / this.metrics.length;
  }

  private calculateLoadScore(density: number): number {
    // Simplified score: 1.0 = Max Density
    return Math.min(density / 100, 1.0);
  }
}
