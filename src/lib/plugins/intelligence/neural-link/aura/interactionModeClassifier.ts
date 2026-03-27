import { InteractionMode } from './auraTypes';
import { AuraConfig } from './auraConfig';

export class InteractionModeClassifier {
  public classify(energyScore: number): InteractionMode {
    if (energyScore >= AuraConfig.MODES.DEEP_WORK.threshold) return 'DEEP_WORK';
    if (energyScore >= AuraConfig.MODES.EXPLORATION.threshold) return 'EXPLORATION';
    if (energyScore >= AuraConfig.MODES.REST.threshold) return 'REST';
    
    return 'LEARNING'; // Default fallback
  }
}
