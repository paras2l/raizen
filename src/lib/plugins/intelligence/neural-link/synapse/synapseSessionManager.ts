import { IntentPrediction } from './synapseTypes';
import { synapseLogger } from './synapseLogger';

export class SynapseSessionManager {
  private predictionCount = 0;
  private successCount = 0;

  public async recordPrediction(prediction: IntentPrediction) {
    this.predictionCount++;
    await synapseLogger.log(`Synapse prediction registered in session: ${prediction.id}`);
  }

  public recordSuccess(latencySavedMs: number) {
    this.successCount++;
    synapseLogger.optimized('SESSION_ACCUMULATOR', latencySavedMs);
  }

  public getAccuracyReport() {
    return {
        predictions: this.predictionCount,
        accuracy: this.predictionCount > 0 ? (this.successCount / this.predictionCount) * 100 : 0
    };
  }
}
