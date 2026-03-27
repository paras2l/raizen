import { EnvironmentalSignal } from './types';

export class ChaosIndexCalculator {
  calculate(signals: EnvironmentalSignal[]): number {
    if (signals.length === 0) return 0;
    
    const sum = signals.reduce((acc, sig) => acc + sig.severity, 0);
    const index = sum / signals.length;
    
    console.log(`[SIXTH-SENSE-CHAOS] Computed Global Chaos Index: ${index.toFixed(2)}`);
    return index;
  }
}
