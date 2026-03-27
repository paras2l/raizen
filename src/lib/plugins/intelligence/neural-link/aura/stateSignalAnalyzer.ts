import { AuraSignal } from './auraTypes';

export class StateSignalAnalyzer {
  public analyze(signals: AuraSignal[]): number {
    if (signals.length === 0) return 0.5; // Default neutral energy
    
    const totalWeight = signals.reduce((acc, s) => acc + s.weight, 0);
    const weightedSum = signals.reduce((acc, s) => acc + (s.value * s.weight), 0);
    
    return weightedSum / totalWeight;
  }
}
