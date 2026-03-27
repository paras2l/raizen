import { ContextSignal } from './types';

export class SignalAggregator {
  aggregate(signals: ContextSignal[]): Record<string, ContextSignal[]> {
    console.log(`[PREDICT-AGGREGATOR] Fusing ${signals.length} signals into mission context.`);
    
    // Groups signals by topic overlap or time proximity
    const clusters: Record<string, ContextSignal[]> = {};

    signals.forEach(s => {
      // Very basic normalization for clustering
      const key = s.topic.split(' ')[0].toLowerCase();
      if (!clusters[key]) clusters[key] = [];
      clusters[key].push(s);
    });

    return clusters;
  }
}
