import { PredictionResult } from './types';

export class PredictionCache {
  private cache: Map<string, PredictionResult> = new Map();
  private maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  store(result: PredictionResult) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
    this.cache.set(result.predictionId, result);
    // console.log(`[PREDICT-CACHE] Intelligence saved for ID: ${result.predictionId}`);
  }

  get(predictionId: string): PredictionResult | undefined {
    return this.cache.get(predictionId);
  }

  getAll(): PredictionResult[] {
    return Array.from(this.cache.values());
  }

  clear() {
    this.cache.clear();
  }
}
