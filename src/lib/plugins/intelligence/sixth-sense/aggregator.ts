import { EnvironmentalSignal } from './types';

export class SignalAggregator {
  aggregate(signals: EnvironmentalSignal[]): EnvironmentalSignal[] {
    console.log(`[SIXTH-SENSE-AGGREGATOR] Normalizing ${signals.length} disparate environmental nodes.`);
    return signals; // Simple bypass for now
  }
}
